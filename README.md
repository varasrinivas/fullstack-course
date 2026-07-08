# The Spice Route Food Court — Course Authoring Kit

[![GitHub Repo](https://img.shields.io/badge/GitHub-varasrinivas%2Ffullstack--course-C4531F?logo=github&logoColor=white)](https://github.com/varasrinivas/fullstack-course)

A Claude Code kit for building a beginner-friendly, analogy-driven course on
**Angular · single-spa · NestJS · Spring Boot · Camunda · Kafka**.

18 modules · 7 tracks · ~7.5 hours · one continuous story.

## What's inside

```
fullstack-course-kit/
├── CLAUDE.md                  # Claude Code rules, design system, slash commands
├── docs/
│   ├── ANALOGY.md             # The Spice Route Food Court — characters & mappings
│   └── MODULE-PLAN.md         # All 18 modules: concepts, beats, labs
├── labs/                      # Smoke-tested reference solutions for every lab
│   ├── README.md              #   module → folder map + version/compat notes
│   ├── t1-angular/ t1-single-spa/ t2-nestjs/
│   └── t3-spring/ t4-camunda/ t5-kafka/
├── player/
│   └── index.html             # Single-file player (MODS array). m01 is fully built
│                              #   as the gold-standard reference module.
└── scripts/
    └── validate-module.ps1    # Enforces structure, crispness, analogy discipline
```

## Workflow with Claude Code

```powershell
cd fullstack-course-kit
claude
```

Then, module by module:

```
/plan-module m02        # Claude proposes concepts, analogy beat, diagram, lab
# review, approve
/build-module m02       # Claude writes the MODS entry + auto-validates
/course-status          # progress dashboard
```

Manual validation any time:

```powershell
.\scripts\validate-module.ps1 -ModuleId m02
.\scripts\validate-module.ps1 -All
```

## Why m01 matters

Open `player/index.html` in a browser — module m01 shows the exact target quality:
order-ticket header, analogy beat → mapping table → dual-caption SVG diagram →
dual-path lab → 3-question quiz → "In the food court…" recap. Every module m02–m18
must match that shape (the validator enforces it).

## Lab prerequisites (students)

Windows 11 + PowerShell 7, VS Code, Node 20+, Java 21 + Maven, Docker Desktop.
Everything runs on localhost — no cloud accounts.
