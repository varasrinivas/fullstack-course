# Module Plan — 19 modules, 7 tracks, ~8 hours total

Crisp and short. Every track opens with a runnable Hello World.
Labs assume Windows/PowerShell, Node 20+, Java 21, Docker Desktop.

## T0 · Foundations (2 modules)
| ID | Title | Min | Core concepts | Analogy beat | Lab |
|---|---|---|---|---|---|
| m01 | Welcome to the Food Court | 15 | monolith vs microservices, microfrontends, orchestration, events — the big picture in ONE diagram | Anu's first visit; walk the floor with Farid | No code. Interactive: drag labels onto the architecture diagram |
| m02 | Your Toolbelt, Hello Everything | 20 | Node, Java, Docker verify; run one hello from each world | The food court opens its doors | `node -v`, `java -version`, `docker run hello-world`, serve one static page |

## T1 · Angular + single-spa (4 modules)
| m03 | Angular Hello World | 25 | CLI, dev server, what a component is | The Biryani Counter gets its first menu board | `npx @angular/cli new` → edit template → see hot reload |
| m04 | Components, Services & Routing | 30 | inputs/outputs, DI as "asking the manager for a tool", routes | The counter gets a menu page and a cart page | Build a 2-page menu app with a CartService |
| m05 | Why single-spa? | 20 | microfrontends, root config, registerApplication, activity functions | Farid decides which counters open on which floor tiles | No build — annotated walkthrough + diagram of root config |
| m06 | Two Counters, One Floor | 35 | mount/unmount two Angular MFEs under a single-spa root | Dosa Counter joins the Biryani Counter on the same floor | create-single-spa: root config + 2 Angular apps, route between them |

## T2 · NestJS (4 modules)
| m07 | NestJS Hello World | 20 | CLI, controller returns "Hello", decorators as "name badges" | Kiosk-7 is unboxed and switched on | `nest new` → GET /hello |
| m08 | Controllers, Providers, Modules | 25 | request pipeline, DI, DTOs | Kiosk-7 learns the menu: take an order, validate it | POST /orders with a DTO + in-memory service |
| m09 | The BFF Pattern | 25 | why a gateway, aggregation, one frontend-shaped API | Anu orders biryani + juice in ONE tap; Kiosk-7 fans out | Nest endpoint calls two stub JSON endpoints, merges the receipt |
| m19* | Custom Order Slips (GraphQL) | 25 | schema, queries, mutations, resolvers, over/under-fetching | Anu tires of set meals; Kiosk-7 rolls out custom slips | @nestjs/graphql code-first over the existing OrdersService; query + mutation in Apollo Sandbox |

*m19 was added after the original 18 shipped; ids stay stable, so it keeps the next
free number but sits after m09 in the course flow (the player orders by story, not id).

## T3 · Spring Boot (3 modules)
| m10 | Spring Boot Hello World | 20 | start.spring.io, @RestController, embedded server | The Biryani Kitchen fires its first stove | Generate project → GET /hello → run with Maven |
| m11 | REST + Layers + Data | 30 | controller/service/repository, H2, JPA basics | The kitchen keeps a pantry ledger | Orders API with H2 database |
| m12 | Two Kitchens, Two Pantries | 25 | one service = one database, service-to-service HTTP, ports | Dosa Kitchen opens next door — separate pantry! | Run order-service (8081) + billing-service (8082); order calls billing |

## T4 · Camunda (2 modules)
| m13 | Drawing the Checklist (BPMN) | 25 | BPMN symbols: events, tasks, gateways; why draw processes | Meenakshi laminates her checklist | Camunda Modeler: draw the order process (no code) |
| m14 | The Checklist Comes Alive | 35 | Camunda 8 Run, deploy, job workers, process instance | Meenakshi runs Order #42 through the checklist | Deploy BPMN, Node job worker completes "notify kitchen" task, watch in Operate |

## T5 · Kafka (2 modules)
| m15 | The Ticket Rail | 20 | topics, producers, consumers, partitions, retention — concepts only | Kitchens stop phoning; tickets go on the rail | docker compose up kafka; console producer/consumer hello |
| m16 | Kitchens That Listen | 30 | produce from Spring Boot, consume in NestJS (kafkajs), consumer groups | Billing pins PAID-#42; Biryani Kitchen grabs it | Spring producer on `order.paid` → Nest consumer logs & updates status |

## T6 · Capstone (2 modules)
| m17 | Order #42, End to End | 45 | wire everything: MFE → BFF → Camunda → services → Kafka event → UI update | Anu taps Order; we follow the token through every hand | Guided assembly of the full flow from prior labs |
| m18 | The Map on the Wall | 15 | recap mega-diagram, when to use what, where to go next | Anu leaves full and happy; Farid pins the floor map | Quiz-only + printable one-page architecture poster (SVG) |

**Totals:** 19 modules · ~485 minutes · 6 technologies (+ GraphQL) · 1 story.
