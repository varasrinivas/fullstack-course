# Full-Stack Microservices Course — Claude Code Authoring Kit

**Course:** "The Spice Route Food Court" — Building Modern Applications with Angular, single-spa, NestJS, Spring Boot, Camunda & Kafka
**Audience:** Beginners. Assume zero prior knowledge of any tool in the stack. Basic JS/Java familiarity only.
**Format:** Single-file HTML player (`player/index.html`) with a `MODS` array. One module = one object in `MODS`.
**Tone:** Crisp, short, friendly. Every concept gets a food-court analogy BEFORE the technical definition.

---

## The Golden Rules (never violate)

1. **Analogy first, tech second.** Every new concept is introduced through The Spice Route Food Court (see `docs/ANALOGY.md`) before any code or jargon appears.
2. **Hello World before theory.** Every track's first lab is a runnable Hello World in under 10 minutes.
3. **One diagram per module minimum.** Inline SVG only (see Diagram Convention below). No external images.
4. **Crisp.** A module is 900–1400 words of prose max. Cut ruthlessly. If a concept needs more, split it.
5. **Dual-path labs.** Every lab has two tabs: "Understand It" (guided, copy-paste, explained line-by-line) and "Build It with AI" (a prompt the student gives to Claude Code / an AI assistant, plus acceptance criteria to verify the result).
6. **Every module ends with:** ① a 3-question knowledge check, ② a one-sentence "Food Court Recap", ③ a "What's next" teaser.

---

## Design System (locked — do not change)

- **Display font:** Fraunces (Google Fonts, 600/700, `font-optical-sizing: auto`)
- **Body font:** system-ui stack
- **Code font:** JetBrains Mono
- **Tokens (CSS custom properties in `:root`):**
  - `--ink: #1A1714` (text)
  - `--paper: #FBF7F0` (background)
  - `--stall: #C4531F` (accent — tandoor orange, used for track badges & CTAs)
  - `--steam: #2E6E63` (secondary — used for diagrams & success states)
  - `--rail: #E8DFD2` (borders, dividers, the Kafka "ticket rail" motif)
  - `--night: #241E38` (code block background)
- **Signature element:** the module header renders as a food-court *order ticket* — perforated top edge (CSS `radial-gradient` dots), module number as the "token number", track name as the "stall name".
- Layout: max-width 760px reading column, sticky left rail (desktop) / top drawer (mobile) for module navigation driven by `MODS`.

## Diagram Convention

- Inline `<svg>` blocks, `viewBox` responsive, max 640px wide.
- Palette: boxes `--paper` fill with `--ink` 1.5px stroke; message/event arrows in `--steam`; user/HTTP arrows in `--stall`; labels in JetBrains Mono 12px.
- Every diagram has a caption: *analogy reading* first, *technical reading* second.
  - Example caption: "The steward (Camunda) reads the checklist and calls each kitchen in order — the process engine executes service tasks."

## MODS Array Schema

```js
const MODS = [{
  id: "m01",
  track: "T0",            // T0..T6
  trackName: "Foundations",
  title: "Welcome to the Food Court",
  minutes: 15,            // honest estimate
  concepts: ["microfrontends", "microservices", "orchestration", "events"],
  analogyBeat: "Anu walks into the food court for the first time",
  html: `...module body...`,   // sections: .concept, .diagram, .lab, .quiz, .recap
  lab: { understand: `...`, buildWithAI: { prompt: `...`, acceptance: [ `...` ] } },
  quiz: [{ q, options: [..4], answer: 0, why }]
}, ...];
```

## Slash Commands

### /plan-module <id>
Read `docs/MODULE-PLAN.md` and `docs/ANALOGY.md`. Output a plan for the module: concepts covered, the analogy beat used, the diagram(s) to draw, lab outline, quiz topics. Do NOT write the module yet. Wait for approval.

### /build-module <id>
Build the approved plan into a complete `MODS` entry and insert it into `player/index.html` in id order. Follow Golden Rules. Run `/validate-module <id>` automatically after building.

### /build-lab <id>
(Re)build only the lab for a module. Labs must be runnable on Windows (PowerShell commands shown) with Node 20+, Java 21, and Docker Desktop. Every lab starts from a clean folder and lists exact commands. "Build It with AI" prompts must be self-contained (a student can paste them into Claude Code with no other context).

### /validate-module <id>
Run `scripts/validate-module.ps1 -ModuleId <id>`. Fix every failure before reporting done.

### /course-status
List all modules in MODS vs MODULE-PLAN.md; report built / planned / missing, total minutes, and any validation failures.

## Lab Environment Assumptions

- Windows 11, PowerShell 7, VS Code
- Node 20+, npm; Angular CLI installed per-lab via `npx`
- Java 21 + Maven (Spring Boot via `start.spring.io` zip, commands given)
- Docker Desktop for Kafka (single-broker `docker compose`) and Camunda 8 Run (or Camunda 7 Community via Docker — kit uses **Camunda 8 Run** for simplicity)
- Everything runs on localhost. No cloud accounts required.

## Module Body Section Order (enforced by validator)

1. `.ticket-header` (auto-generated from MODS fields)
2. `.analogy` — the food-court beat (2–4 short paragraphs, characters from ANALOGY.md)
3. `.concept` — the technical mapping (bulleted mapping table analogy → tech)
4. `.diagram` — at least one SVG with dual caption
5. `.lab` — dual-path tabs
6. `.quiz` — 3 questions
7. `.recap` — one sentence starting "In the food court, ..."
8. `.next` — one sentence teaser
