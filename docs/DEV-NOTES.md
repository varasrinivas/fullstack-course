# Development Notes — how this course was built and verified

A record of the authoring session (July 2026) so future maintainers know what was
done, what was actually tested, and which decisions were deliberate.

## What was built

- **m02–m18** authored into `player/index.html` following the m01 gold standard
  (m01 shipped with the kit). All 18 modules pass `scripts/validate-module.ps1 -All`.
- **Player engine fix**: added a `hashchange` listener — back/forward buttons and
  manual `#mXX` URL edits now switch modules (they silently didn't before).
- **`labs/`**: a completed reference solution for every lab track, each one
  *executed and verified* on a real machine — not just written.

## Verification evidence (all observed, not assumed)

| Lab | Proof |
|---|---|
| m03/m04 Angular | browser-driven: /menu → add items → /cart shows them via shared CartService |
| m06 single-spa | :9000/biryani ↔ /dosa mount/swap two real Angular MFEs, no reload, zero console errors |
| m07–m09 NestJS | all endpoints pass incl. failure path (stubs down → clean 502) |
| m10–m12 Spring | cross-service call returns PAID-1; billing down → order saves as PENDING_PAYMENT |
| m14 Camunda | deployed to Camunda 8 Run 8.8, worker completed the job, instance state COMPLETED via API |
| m15/m16 Kafka | console produce/consume/replay; then Spring producer → NestJS kafkajs consumer flipped an order status |
| m17 capstone | full flow across all six systems: POST /orders → Camunda instance → worker → billing → Kafka → status PAID-1 |

## Deliberate decisions

- **Angular CLI pinned to major 20** in all lab text (`npx @angular/cli@20`):
  `@latest` (v21+) requires a newer Node than the course baseline. Pinning keeps
  the printed steps working.
- **Reference solutions commit `package-lock.json`** so "worked when tested" is
  reproducible.
- **BPMN gateway design**: the `no` flow carries the condition (`=paid = false`)
  and `yes` is the default flow — so an instance started with only `{ orderId }`
  takes the happy path. "Take payment" and "Quality check" are undefined tasks
  (pass-through in Zeebe) so the process completes with only the notify-kitchen
  worker running.
- **Graceful degradation everywhere**: kiosk-7 works without Kafka and without
  Camunda (warns and continues); billing-service works without Kafka. Each lab
  stage runs standalone.

## Version-drift traps (the reason the reference solutions exist)

1. **single-spa-angular's schematic** still generates NgModule-era files; Angular
   17+ apps are standalone. Fixed files live in `labs/t1-single-spa/*/`
   (`main.single-spa.ts`, `angular.json` build options). The schematic also skips
   its final `npm install`.
2. **Module-format mismatch**: current `webpack-config-single-spa` emits native
   ESM; single-spa-angular emits UMD. The root config forces
   `libraryTarget: "system"` and loads everything through SystemJS.
3. **Zeebe refuses on low disk** (`RESOURCE_EXHAUSTED`): Camunda 8 Run needs
   ~2 GB free where it runs. Lab text says 4+ GB to be safe.
4. **kafkajs consumers connect once at startup** — start Kafka before the kiosk,
   or restart the kiosk (m16/m17 lab text notes this).

## Environment notes (authoring machine)

- Windows 10, PowerShell 5.1 (not 7): `validate-module.ps1` is saved as UTF-8
  **with BOM** so 5.1 parses its emoji. Keep the BOM.
- Docker via **Rancher Desktop** (moby). Its Kubernetes (k3s) fails to start on
  this machine (`ECONNRESET` on :6443) and takes the Docker engine down with it —
  k8s is disabled (`rdctl set --kubernetes.enabled=false`) so the labs work.
- Camunda 8 Run installed at `D:\tmp\c8run-8.8.30` (kept off the nearly-full C:).
