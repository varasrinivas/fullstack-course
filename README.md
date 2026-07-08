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

Windows 11 + PowerShell 7, VS Code, Node 20+, Java 21, Docker (Desktop or Rancher).
Everything runs on localhost — no cloud accounts. Maven is not needed separately —
the Spring projects ship the `mvnw` wrapper.

## Running the labs

Every lab has a completed, **smoke-tested** reference solution under `labs/`
(see `labs/README.md` for the module → folder map and version/compatibility notes).
Node projects need `npm install` once; Spring projects download dependencies on
their first `mvnw` run. One extra download for Track 4: **Camunda 8 Run**
(camunda.com → Download → Self-Managed), unzipped onto a drive with 4+ GB free.

| Track (modules) | Start it | See it work |
|---|---|---|
| T1 Angular (m03–m04) | `cd labs/t1-angular/biryani-counter` → `npm install` → `npm start` | http://localhost:4200 — add items on /menu, read them on /cart |
| T1 single-spa (m06) | 3 terminals in `labs/t1-single-spa/`: `spice-root` → `npm start`; each counter → `npm run serve:single-spa:<name> -- --port 4201` (biryani) / `4202` (dosa) | http://localhost:9000/biryani ↔ /dosa swap without a page reload |
| T2 NestJS (m07–m09) | `cd labs/t2-nestjs/kiosk-7` → `npm install` → `npm run start:dev`; stubs: `cd ../stubs` → `npx json-server db.json --port 3100` | http://localhost:3000/receipt — one receipt from two stubs |
| T3 Spring Boot (m10–m12) | `./mvnw spring-boot:run` in `biryani-kitchen` (:8080), or `order-service` (:8081) + `billing-service` (:8082) together | POST an order to :8081/orders → response carries `PAID-1` from :8082 |
| T4 Camunda (m13–m14) | `.\c8run.exe start`, then in `labs/t4-camunda/steward-worker`: `npm install` → `node deploy-and-start.js 42` → `node worker.js` | Operate at http://localhost:8080 — watch instance #42 complete |
| T5 Kafka (m15–m16) | `cd labs/t5-kafka` → `docker compose up -d` | console producer/consumer on topic `order.paid` (commands in m15) |

### The whole food court at once (m17)

Order matters — infrastructure first:

```powershell
# 1. the rail          cd labs/t5-kafka; docker compose up -d
# 2. the steward desk  .\c8run.exe start                          (Camunda 8 Run folder)
# 3. billing-service   .\mvnw spring-boot:run                     (:8082)
# 4. kiosk-7           npm run start:dev                          (:3000 — AFTER Kafka is up)
# 5. the floor         spice-root + both counters                 (:9000, :4201, :4202)
# 6. the worker        node worker-m17.js                         (labs/t4-camunda/steward-worker)
# 7. deploy once       node deploy-and-start.js 41
```

Then place Anu's order and follow the token:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/orders -ContentType "application/json" -Body '{ "item": "Hyderabadi Biryani", "qty": 1 }'
Invoke-RestMethod http://localhost:3000/orders/1/status   # flips to PAID-1 within seconds
```

One POST → Camunda instance → worker rings billing → `PAID` ticket on the rail →
the kiosk's consumer flips the status. Watch every hop in Operate (:8080) and the
terminal logs.
