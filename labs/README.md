# Reference Solutions — The Spice Route Food Court

Completed, **smoke-tested** solutions for every lab track. Use them when you're stuck,
or to diff against your own work. Building them yourself (per the modules) is the course;
these are the answer key.

| Folder | Modules | What's inside |
|---|---|---|
| `t1-angular/biryani-counter` | m03, m04 | Angular 20 app: menu + cart pages, shared `CartService`, routes |
| `t1-single-spa/` | m06 | `spice-root` (root config, port 9000) + `biryani-counter` & `dosa-counter` (Angular MFEs via single-spa-angular) |
| `t2-nestjs/kiosk-7` | m07–m09, m19, m16, m17 | NestJS BFF: hello, orders (DTO + service), receipt fan-out, GraphQL layer (m19: `order.type.ts` + `orders.resolver.ts` over the same OrdersService), Kafka `RailConsumer`, and `ChecklistService` (m17 glue #1) |
| `t2-nestjs/stubs` | m09 | `db.json` for `npx json-server db.json --port 3100` |
| `t3-spring/biryani-kitchen` | m10 | Hello World, `GET /hello`, port 8080 |
| `t3-spring/kitchen-orders` | m11 | Controller → service → repository with JPA + H2, port 8080 |
| `t3-spring/order-service` | m12 | Orders + `BillingClient` (RestClient), port 8081, graceful `PENDING_PAYMENT` |
| `t3-spring/billing-service` | m12, m16 | `POST /bills` + Kafka producer to `order.paid`, port 8082 |
| `t4-camunda/order-process.bpmn` | m13, m14 | The laminated checklist, executable (process id `order-fulfilment`) |
| `t4-camunda/steward-worker` | m14, m17 | `worker.js` (m14: log + complete), `worker-m17.js` (m17 glue #2 — the bell rings billing for real), `deploy-and-start.js` (deploy + start an instance without the Modeler) |
| `t5-kafka/docker-compose.yml` | m15, m16 | Single-broker Kafka (KRaft) on `localhost:9092` |

## Running

Node projects: `npm install` first (node_modules are not shipped), then `npm start`
(or `node worker.js` for the steward worker).
Spring projects: `./mvnw spring-boot:run` (downloads dependencies on first run).
Kafka: `docker compose up -d` in `t5-kafka/`.
Camunda: install **Camunda 8 Run** separately (camunda.com → Download), `.\c8run.exe start`,
then deploy `order-process.bpmn` from the Modeler to `localhost:26500` — or skip the
Modeler with `node deploy-and-start.js 42` in `steward-worker/`.

### The m17 capstone glue

The capstone wires everything together with two files, both verified end to end:

- **Glue #1** — `t2-nestjs/kiosk-7/src/orders/checklist.service.ts`: on every
  `POST /orders`, the kiosk starts a Camunda `order-fulfilment` instance with the
  orderId. If Camunda isn't running it logs a warning and continues, so the
  m07–m09 labs still work standalone.
- **Glue #2** — `t4-camunda/steward-worker/worker-m17.js`: the `notify-kitchen`
  handler calls billing (`POST :8082/bills?orderId=N`), which pins `PAID-N` on the
  rail; kiosk-7's `RailConsumer` grabs it and flips the order status.

Startup order and the full trace commands are in the root `README.md`
("The whole food court at once").

## Version pins & compatibility notes (learned by actually running these)

- **Angular CLI is pinned to major 20** (`npx @angular/cli@20`). Newer majors require a
  newer Node than the course's baseline (Node 20/22 LTS).
- **single-spa-angular's schematic generates an NgModule-style `main.single-spa.ts`.**
  Angular 17+ default apps are *standalone*, so the reference rewrites it with
  `bootstrapApplication` (see `t1-single-spa/*/src/main.single-spa.ts`). The `'**'` →
  `EmptyRouteComponent` route keeps each MFE quiet on the other's URLs. The schematic
  also leaves stale build options in `angular.json` (fixed here) and skips the final
  `npm install` — run it yourself after `ng add`.
- **Module-format mismatch:** current `webpack-config-single-spa` emits native ESM,
  while single-spa-angular emits UMD. The reference root config forces
  `libraryTarget: "system"` in `webpack.config.js` and loads everything through
  SystemJS (see `spice-root/src/index.ejs`) so all pieces speak one format. Serve MFEs
  with `npm run serve:single-spa:<name> -- --port 4201` (and `4202`).
- **kiosk-7's `RailConsumer` degrades gracefully**: without Kafka on :9092 it logs a
  warning and continues — so the m07–m09 labs run without Docker.
- **billing-service works in two eras**: before Kafka exists (m12) the producer failure
  is caught and the HTTP response still returns; with Kafka up (m16) it pins the ticket.
