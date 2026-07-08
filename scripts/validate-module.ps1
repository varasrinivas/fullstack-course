# validate-module.ps1 — enforces CLAUDE.md Golden Rules on player/index.html
# Usage: .\scripts\validate-module.ps1 -ModuleId m03   (or -All)
param(
  [string]$ModuleId,
  [switch]$All,
  [string]$PlayerPath = "$PSScriptRoot\..\player\index.html"
)

$ErrorActionPreference = "Stop"
$html = Get-Content -Raw $PlayerPath
$failures = @()

function Get-ModuleBlock([string]$id) {
  # Extract the MODS object for a module by id (naive brace matching from `id:"mXX"`)
  $startIdx = $html.IndexOf("id:`"$id`"")
  if ($startIdx -lt 0) { return $null }
  $open = $html.LastIndexOf("{", $startIdx)
  $depth = 0
  for ($i = $open; $i -lt $html.Length; $i++) {
    if ($html[$i] -eq '{') { $depth++ }
    elseif ($html[$i] -eq '}') { $depth--; if ($depth -eq 0) { return $html.Substring($open, $i - $open + 1) } }
  }
  return $null
}

function Test-Module([string]$id) {
  $script:failures = @()
  $block = Get-ModuleBlock $id
  if (-not $block) { Write-Host "❌ $id — not found in MODS" -f Red; return $false }

  # Required MODS fields
  foreach ($f in 'track:','trackName:','title:','minutes:','concepts:','analogyBeat:','quiz:') {
    if ($block -notmatch [regex]::Escape($f)) { $script:failures += "missing field $f" }
  }

  # Required body sections, in order
  $sections = 'class="analogy"','class="concept"','class="diagram"','class="lab"','class="quiz"','class="recap"','class="next"'
  $pos = -1
  foreach ($s in $sections) {
    $idx = $block.IndexOf($s)
    if ($idx -lt 0) { $script:failures += "missing section $s" }
    elseif ($idx -lt $pos) { $script:failures += "section out of order: $s" }
    else { $pos = $idx }
  }

  # Golden rules
  if ($block -notmatch '<svg') { $script:failures += "no inline SVG diagram" }
  if ($block -notmatch 'figcaption') { $script:failures += "diagram missing dual caption" }
  if ($block -notmatch 'data-pane="u"' -or $block -notmatch 'data-pane="b"') {
    $script:failures += "lab missing dual-path tabs (Understand It / Build It with AI)" }
  if ($block -notmatch 'Acceptance criteria') { $script:failures += "Build-It-with-AI lab missing acceptance criteria" }
  $quizCount = ([regex]::Matches($block, 'why\s*:')).Count
  if ($quizCount -lt 3) { $script:failures += "quiz has $quizCount questions; need 3 (each with a 'why')" }
  if ($block -notmatch 'In the food court') { $script:failures += "recap must start with 'In the food court'" }

  # Crispness: prose word count (strip tags/svg/pre)
  $prose = $block -replace '(?s)<svg.*?</svg>','' -replace '(?s)<pre>.*?</pre>','' -replace '<[^>]+>',' '
  $words = ($prose -split '\s+' | Where-Object { $_ }).Count
  if ($words -gt 1600) { $script:failures += "too long: ~$words words of prose (Golden Rule 4: keep it crisp)" }

  # Analogy character discipline
  $chars = 'Anu','Farid','Meenakshi','Kiosk-7','Kitchen','ticket rail','counter'
  $hits = ($chars | Where-Object { $block -match $_ }).Count
  if ($hits -lt 2) { $script:failures += "analogy beat weak: fewer than 2 recurring story elements used" }

  if ($script:failures.Count -eq 0) {
    Write-Host "✅ $id — all checks passed ($words words)" -f Green; return $true
  } else {
    Write-Host "❌ $id — $($script:failures.Count) failure(s):" -f Red
    $script:failures | ForEach-Object { Write-Host "   • $_" -f Yellow }
    return $false
  }
}

if ($All) {
  $ids = [regex]::Matches($html, 'id:"(m\d\d)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
  $ok = $true
  foreach ($id in $ids) { if (-not (Test-Module $id)) { $ok = $false } }
  if (-not $ok) { exit 1 }
} elseif ($ModuleId) {
  if (-not (Test-Module $ModuleId)) { exit 1 }
} else {
  Write-Host "Usage: validate-module.ps1 -ModuleId m01   |   -All"
}
