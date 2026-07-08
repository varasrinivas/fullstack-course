# The Spice Route Food Court — Recurring Analogy System

Every concept in this course is taught through one continuous story: a busy food court
called **The Spice Route**. The same characters appear in every module. Never invent
new characters; never break the mapping.

## Characters

| Character | Role in story | Maps to |
|---|---|---|
| **Anu** | A hungry customer | The end user / browser |
| **Farid** | The floor manager who decides which stall counter is open where | **single-spa** root config |
| Stall counters (Biryani Counter, Dosa Counter, Juice Counter) | Where Anu browses menus & orders | **Angular** microfrontend apps |
| **Kiosk-7** | The central self-order kiosk that knows how to talk to every kitchen | **NestJS** BFF / API gateway |
| The kitchens (Biryani Kitchen, Dosa Kitchen, Billing Room) | Independent teams, own stoves, own recipes, own pantry | **Spring Boot** microservices (each with its own DB) |
| **Steward Meenakshi** | Follows a laminated order checklist: take payment → notify kitchen → quality check → hand over | **Camunda** (BPMN process engine) |
| **The ticket rail** | A rail where anyone can pin a ticket; kitchens watch it and grab tickets meant for them. Tickets stay on the rail even after being read. | **Kafka** (topics, producers, consumers, retention) |
| The daily specials board | One board, many readers, updated by whoever has news | Kafka topic (broadcast) |
| The order token number | "Order #42" Anu tracks on the screen | Correlation ID / process instance key |

## Canonical mappings (use these exact sentences when introducing each tool)

- **Angular** → "Each stall builds its own counter: menu board, buttons, screens. The counter is everything Anu sees and touches at that stall."
- **single-spa** → "Farid doesn't cook anything. He just decides which counters are open and where they appear on the floor — and he can swap a counter without closing the food court."
- **NestJS (BFF)** → "Anu shouldn't have to walk to three kitchens. Kiosk-7 takes one order and quietly talks to every kitchen for her, then shows one combined receipt."
- **Spring Boot** → "Each kitchen is its own business: its own chefs, its own pantry, its own way of working. If the Dosa Kitchen's stove breaks, biryani still ships."
- **Camunda** → "Meenakshi never guesses. Her laminated checklist says exactly what happens after payment, who to call, how long to wait, and what to do if a kitchen doesn't answer. The checklist is a drawing everyone — even the owner — can read."
- **Kafka** → "Kitchens don't shout at each other. They pin tickets on the rail. The Billing Room pins 'PAID-#42'; the Biryani Kitchen sees it and starts cooking. Nobody waits on the phone."

## Story arc across the course

1. **T0** — Anu's first visit: walk the floor, meet everyone (big-picture architecture).
2. **T1** — Build one stall counter (Angular), then let Farid manage two counters (single-spa).
3. **T2** — Install Kiosk-7 (NestJS) so Anu orders from one place.
4. **T3** — Open two kitchens (Spring Boot) with their own pantries.
5. **T4** — Give Meenakshi her checklist (Camunda BPMN) for the order flow.
6. **T5** — Install the ticket rail (Kafka) so kitchens stop phoning each other.
7. **T6** — Capstone: Order #42 travels the whole food court end to end.

## Rules

- Analogy paragraphs use present tense, concrete verbs, and at most 4 sentences per beat.
- After every analogy beat, immediately show the mapping table (analogy → tech term).
- Diagrams label boxes with BOTH names: e.g., "Kiosk-7 (NestJS BFF)".
- The capstone module must narrate Order #42 as a timeline: each step names the character AND the technology acting.
