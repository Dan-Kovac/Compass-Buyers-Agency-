# Compass OS — Brain Dump & Working Document

**Status:** Living document. Captured during initial brain-dump session after workshop prep meeting with Compass.
**Owner:** Dan Kovac (Roadmap Digital)
**Client:** Compass Buyers Agency
**Related artefacts:** Miro workshop board — https://miro.com/app/board/uXjVHeHK-Vk=/

---

## Table of contents

1. [Project overview](#1-project-overview)
2. [Business context & economics](#2-business-context--economics)
3. [Engagement model](#3-engagement-model)
4. [The three surfaces](#4-the-three-surfaces)
5. [Bruce — persona and behaviour](#5-bruce--persona-and-behaviour)
6. [Core design principle: passive capture](#6-core-design-principle-passive-capture)
7. [Golden path — end-to-end client flow](#7-golden-path--end-to-end-client-flow)
8. [Property log — the competitive moat](#8-property-log--the-competitive-moat)
9. [Automations & trigger engine](#9-automations--trigger-engine)
10. [Compliance & per-client export](#10-compliance--per-client-export)
11. [BI / dashboards & performance framing](#11-bi--dashboards--performance-framing)
12. [What stays intentionally manual](#12-what-stays-intentionally-manual)
13. [Infrastructure & access](#13-infrastructure--access)
14. [Historical backfill — separate workstream](#14-historical-backfill--separate-workstream)
15. [Open questions & pre-Friday to-dos](#15-open-questions--pre-friday-to-dos)
16. [Suggested workstream split](#16-suggested-workstream-split)

---

## 1. Project overview

Build a custom operating system ("Compass OS") for Compass Buyers Agency that replaces their current ad-hoc WhatsApp + personal-tool stack with:

- A unified CRM owning all client data
- An AI agent (Bruce) embedded in WhatsApp that captures, acts, and automates
- Automated proposal, Client Authority Form (CAF), and payment flow
- A property log database that matches off-market properties to client briefs in real time
- A compliance layer satisfying licensee record-keeping obligations
- A BI / dashboard layer for performance visibility and business intelligence
- A historical database migrating all records since inception (2.5-3 years)

The project also connects to the recently launched marketing website (`compassagency.com.au`) — website data flows into the Compass OS dashboard for full-funnel visibility.

---

## 2. Business context & economics

- Active for **2.5 to 3 years**
- Based in **Southern Gold Coast (QLD) and New South Wales** — compliance must cover both state regimes
- Average deal: **$25,000 fee + $4,000/month retainer**
- Doing **10-15 deals per month** (sometimes more)
- Revenue is healthy → infra spend should match production standards; AU-hosted for data residency

The business's primary differentiator is their **relationships with real estate agents who bring off-market properties**. This is the IP and the moat. The OS must protect and extend it.

---

## 3. Engagement model

- **IP:** Compass owns 100% of all code, infra, data, and domain names
- **Operating entity:** Dan consults via **Roadmap Digital**
- **Access pattern:** Dan sets up his own admin accounts on Compass-owned systems (Compass-domain email, admin-collab on infra). Compass is the root owner of everything; Dan is invited as admin. If engagement ends, Compass revokes access and nothing breaks.
- **No Roadmap-owned components** in the Compass stack — clean work-for-hire

**Commercial shape (TBD):** likely fixed-price build + monthly retainer for ops/support/feature work. Worth formalising before build starts.

---

## 4. The three surfaces

| Surface | Used for | Primary device |
|---|---|---|
| **WhatsApp (Bruce)** | Capture, natural-language action, quick questions | Phone |
| **Compass OS web app** | Review, browse, approve, dashboards, per-client exports | Desktop |
| **Email (Bruce outbound)** | Proposals, daily briefings, client-facing docs forwarded by agent | Either |

**Web app has three main areas:**
1. Sales journey / pipeline view
2. Property log browser
3. Dashboards + BI

The property log lives in the web app but gets **fed** through WhatsApp (agents voice-note or drop links; Bruce structures and files). The sales pipeline lives in the web app but **moves** through WhatsApp events.

---

## 5. Bruce — orchestrator + persona

**Architecture (decision 2026-04-26): Bruce is a thin orchestrator with specialised sub-agents.**

Bruce himself is routing + DB writes + persona-consistent reply formatting. The hard work (extraction, generation, parsing, matching) happens in sub-agents. Each sub-agent is independently promptable, testable, replaceable, and scoped — minimal context, fewer hallucinations, lower token cost.

### V1 sub-agents

| Sub-agent | Job | Used by |
|---|---|---|
| **Brief Extractor** | Granola transcript or free-text → structured brief (location, budget, beds/baths, timeline, motivations) | Discovery → proposal flow |
| **Proposal Writer** | Brief + template + brand voice → HTML proposal | First-draft generation |
| **Proposal Editor** | Existing proposal + edit instruction → revised HTML | Iteration loop ("change strategy section") |
| **Property Parser** | realestate.com.au / domain.com.au URL + agent context → structured property record | Property log capture |
| **Property Matcher** | Brief ↔ property log → ranked matches (rule-based in v1, semantic in v2) | Brief created or new property added |
| **Compliance Filer** | Any artefact (email, photo, doc) → filed against right client + tagged | Forwarded emails, dropped photos |

### Orchestrator flow

```
WhatsApp message → Bruce
   ↓
Bruce classifies intent (create client? draft proposal? log property? edit?)
   ↓
Bruce gathers context from DB (which client? which proposal version? which agent?)
   ↓
Bruce invokes the right sub-agent with structured input
   ↓
Bruce writes sub-agent result to DB, formats response for agent
   ↓
Bruce → agent: terse confirmation + link
```

### Why this matters for the build
- Faster development iteration — each sub-agent built and tuned independently
- Lower hallucination risk — minimal context per sub-agent
- Cheaper to run — most actions don't need full conversation history
- Easy to extend — new capabilities = new sub-agent + register with Bruce. Phase 2 (semantic matching, CAF generation, content agents) just slots in.
- Native Claude pattern — Claude Agent SDK supports declarative sub-agent definition + orchestrator invocation

---



**Persona:**
- Short-backhand software operator. Direct. Gets things done.
- Not chatty. No fluff. Confirms action, not intent.
- Internal team tool. Not client-facing.
- No emojis. No "happy to help." No corporate chirpiness.

**Behaviour — DM-only with team members:**
- Bruce operates exclusively in 1:1 DMs with Compass team members
- Bruce is **not** in client group chats. Compliance capture comes from team discipline, not silent observation. The team takes notes during/after client calls and feeds Bruce diligently.
- Agents DM Bruce like an assistant: "Just spoke to X, create a proposal, brief is Y", "New off-market — [link + context]", voice notes after calls, etc.
- Bruce creates clients, drafts proposals, ingests properties, generates documents, triggers automations, answers data questions
- Iterates with agent: "change this, fix that, regenerate"
- Delivers outputs to agent's email for agent to forward to client

**The trade-off (accepted by Compass):** Records exist because the team builds them, not because the system auto-captures. If an agent doesn't message Bruce after a call, that activity isn't logged. Mitigated by making the Bruce DM workflow extremely low-friction (see capture mechanisms below).

**Capture mechanisms (designed for team discipline, not vigilance):**
1. **Voice notes are first-class.** 30-second voice note after a call → Bruce transcribes, extracts structured info (client, content, next action), files. No typing required.
2. **Email-to-Bruce.** Forward client emails to `bruce@compassbuyersagency.com.au` → Bruce ingests + files against the right client.
3. **Link + context for properties.** Drop a realestate.com.au / domain.com.au link + free-text context → Bruce parses + structures + photos.
4. **Light weekly nudge.** End-of-week: "Bruce noticed no activity logged for 3 active clients this week — anything to capture?" Once a week. Optional. Never feels like surveillance.

**Tech decision (revised 2026-04-26): Bruce on Baileys, single number, can be added to groups.**

Rationale: Compass wants the option to add Bruce to client groups when useful. Cloud API doesn't support groups, period. Choosing groups capability over enterprise SLA.

Behaviour profile:
- DM with team: active assistant, full responsiveness
- Client groups (when added): silent observer by default, responds only when @-mentioned by team
- Conservative outbound rate to reduce ban-detection risk

Compliance architecture: WhatsApp is a *transport*, not the source of truth. Every message Bruce processes mirrors into Compass OS as an append-only event log. If Bruce's number is banned for a day, the records remain in the OS — recovery is re-pairing, not data loss.

Operational mitigations: rate-limit outbound, daily heartbeat monitoring, automated alerts on session drop, documented re-pair runbook delivered in M4 handover docs.

When to revisit: if Compass scales past ~50 concurrent client groups or starts servicing institutional/regulated clients (SMSF, etc.) where compliance posture demands enterprise-grade transport, move to dual-stack (Cloud API for Bruce DM + Baileys for "Compass Records" silent group archive). Not v1.

**Voice example (what good looks like):**
> Agent: "Bruce, new client John Smith, wants 3br in Byron, budget $3M"
> Bruce: "Client created. Drafting proposal — 2 min."
> Bruce: "Proposal ready: [link]. Emailed to you."
> Agent: "Change the strategy section to emphasise off-market"
> Bruce: "Updated. Resent."

**Technical note:** Bruce has his own WhatsApp business number. Runs on a cloud VPS in AU region (Hetzner Sydney, DigitalOcean Sydney, or Fly.io). Uses unofficial WhatsApp library (Baileys or wrapper provider) because Meta's official Cloud API does not support group chats — and groups are non-negotiable for this architecture.

---

## 6. Core design principle: passive capture

**The rule that makes the whole system work.** The team should not feel like they're logging activity all day. Bruce *observes* and files. Every friction point is a design failure.

This means:
- Voice notes over forms
- Photos dropped in WhatsApp are auto-filed against the client + property
- "Just spoke to X" in chat becomes a logged interaction entry
- Stage movement is **inferred** from events (CAF signed → engaged; payment confirmed → active), not manually toggled
- Natural language commands — no command prefix required. Bruce parses intent from phrases like *"create new client"*, *"update this for [client]"*, *"send this proposal"*, *"add this to the property log"*
- BI and performance tracking work **because** capture is invisible. If we don't nail this, adoption dies and the dashboard has nothing to show.

**UX success metric:** how little the team notices they're using the system.

---

## 7. Golden path — end-to-end client flow

```
Discovery call (external)
   ↓
Agent DMs Bruce: "Create new client [name/email/mobile/brief]"
   ↓
Bruce creates client profile + drafts templated HTML proposal
   ↓
Agent iterates with Bruce in WhatsApp DM ("change X, regenerate")
   ↓
Agent sends final proposal to client
   ↓
Client accepts → intake form fires to capture more detail
   ↓
Form data auto-populates DocuSign CAF (Client Authority Form — mandatory)
   ↓
Client signs CAF → payment request
   ↓
Payment confirmed → WhatsApp group auto-created with client + team + Bruce
   ↓
Property sourcing begins
   → Property log scanned for existing matches
   → Matches fired to team + relevant listing agents
   → Active search kicks off for new properties
   ↓
Inspections (agent uploads photos to WhatsApp → Bruce files)
   ↓
Shortlist 2-3 properties
   ↓
Offer negotiation (MANUAL — agent + client + vendor)
   ↓
Contract → pest & building inspection (reminder via Bruce)
   ↓
Settlement approaching → 5-day final inspection reminder
   ↓
Settlement complete
   ↓
Retention / dormant resurrection — periodic re-engagement when new
property matches surface against previously-unfinished briefs
```

---

## 8. Property log — the competitive moat

The property log is **the most important differentiated piece of the system**. Compass's value is off-market access, and the log captures it.

**How it gets populated (passive capture):**
- Agent speaks to a listing agent, drops a message to Bruce: *"Spoke to [agent], here's a property coming to market in two months, [link or details]"*
- Bruce parses, structures, files into the log
- Bruce prompts for missing fields if critical data is absent

**Structured fields:**
- Location (suburb, street, postcode)
- Price range or exact price
- Beds / baths / parking
- Property type + features
- Status (off-market / coming to market / on-market / under offer / sold)
- Source agent (relationship data — who gave us this)
- Expected availability date
- Notes (vendor motivation, dealbreakers, etc.)
- Photos / links

**Matching (bi-directional):**
- **New brief → scan property log** → surface matches to team within minutes + ping relevant listing agents
- **New property added → scan open briefs** → surface matches to agents handling those clients
- Matching logic: rule-based (price band, bed count, location) + likely semantic (pgvector for brief/property description overlap)

**As soon as a client's brief is locked and they've paid, the system instantly shows how many off-market matches already exist in the log.** This is a powerful moment — the client sees value immediately.

**Dormant client resurrection:**
- Old briefs + fresh property additions = automatic re-engagement candidates
- Example: *"Spoke to John 2 months ago, not ready then, here's a fit now — worth a call?"*

---

## 9. Automations & trigger engine

Key triggers fire on events, not schedules where possible:

| Trigger | Event | Action |
|---|---|---|
| New client created | Bruce command in DM | Profile created, proposal drafted |
| Proposal accepted | Client click / agent flag | Intake form sent |
| Intake form submitted | Form webhook | DocuSign CAF generated + sent |
| CAF signed | DocuSign webhook | Payment request generated |
| Payment confirmed | Stripe webhook | WhatsApp group created, client + team + Bruce added |
| Brief captured | Form submission | Property-log scan fires |
| New property added | Bruce logs to property log | Open-briefs scan fires |
| Contract signed | Agent logs in chat | Pest & building reminder scheduled |
| Settlement date - 5 days | Scheduled | Final inspection reminder to agent |
| Last client contact > N days + dormant brief | Scheduled | Re-engagement surfaced to agent |

**Daily briefing (v2, deferred):** Bruce emails each team member each morning with calls to make, inspections scheduled, settlements approaching. Requires several weeks of captured data to be useful.

---

## 10. Compliance & per-client export

**Hard licensee requirement.** For any client, the team must be able to one-click export a complete activity record.

**Covered standards:**
- REBAA (Real Estate Buyers Agents Association) guidelines
- **QLD Fair Trading** (Gold Coast clients)
- **NSW Fair Trading** (NSW clients)
- Compass straddles the border — both regimes apply depending on the client's property location

**Per-client export must include:**
- All interactions (calls, emails, meetings, WhatsApp transcripts)
- All properties inspected + dates + photos taken on-site
- All documents (proposal, CAF, contracts, settlement records)
- All stage transitions with timestamps
- All compliance artefacts (consents, disclosures, conflict-of-interest register entries)
- Payment records

**Specific capture point to bulletproof: inspection photos.**
- Agent visits property with client → takes photos → drops into WhatsApp
- Bruce parses context ("here's the photos from the Byron inspection today") and files against client + property
- Without this, inspection evidence is reconstructed from memory later — weakest link in the chain

---

## 11. BI / dashboards & performance framing

**What the dashboard shows:**
- Pipeline by stage (counts + value)
- Conversion % by stage
- Average time in stage (overall and per agent)
- Sales velocity (deals per agent per month)
- Revenue + retainer MRR
- Property-log health (count, matches made, conversion from match to offer)
- Website / marketing attribution (discovery call source)
- Dormant client re-engagement activity

**Framing — learning, not surveillance.** This is the team's own tool to understand themselves and improve. Not a productivity-policing stick. Explicit design rule: **nothing in the UX should feel like a timesheet**. This ties directly to the passive-capture principle — if agents had to manually log to produce these numbers, they'd resent it. They don't, because Bruce captures silently.

---

## 12. What stays intentionally manual

Not everything should be automated. These stay human:

- **Offer negotiation.** Shortlist → agent talks to client → confirms offer + date → agent talks to vendor. Relationship-driven. This is where agents earn their fee. Bruce captures outcomes but doesn't drive the conversation.
- **Final proposal approval.** Bruce drafts, agent approves or iterates, agent sends. No Bruce-to-client proposal sends without human sign-off.
- **Stage moves that require judgement.** Some transitions are inferred (CAF signed = engaged). Others an agent confirms.
- **Client conversations.** Bruce listens in groups but does not speak to clients unless @-mentioned, and even then, rarely.

---

## 13. Infrastructure & access

**Hosting:** Cloud VPS in AU region, billed to Compass. Hetzner Sydney / DigitalOcean Sydney / Fly.io. Not a physical Mac mini on-site — cloud is more resilient and easier to operate remotely.

**Likely stack (preliminary):**
- **Web app + API:** Next.js on Vercel (pairs with existing website skill)
- **DB + auth + storage:** Supabase (Sydney region) — gives Postgres, auth, row-level security, file storage, realtime in one vendor. Candidate primary vendor.
- **Semantic search (property matching):** pgvector extension in Postgres
- **Background jobs / triggers:** Inngest or Trigger.dev (event-driven, plays well with webhooks)
- **Bruce server:** Node app running Baileys (or wrapper), VPS-hosted
- **AI:** Claude API (Anthropic)
- **Transactional email:** Resend or Postmark
- **Payments:** Stripe
- **Document signing:** DocuSign (CAF already uses it)
- **Monitoring:** Sentry + Betterstack

**Ownership table:**

| Thing | Owner | Dan's role |
|---|---|---|
| Domain + Google Workspace | Compass | Super-admin via Compass-domain email |
| WhatsApp business number / SIM | Compass entity | Admin |
| Cloud infra (Vercel / Supabase / VPS) | Compass billing | Admin collaborator |
| Code repo | Compass GitHub org | Contributor |
| 1Password vault | Compass | Shared vault access |
| Client data + files | Compass | Admin access, revocable |

---

## 14. Historical backfill — separate workstream

**Scope:** Migrate every client record since Compass's inception (~2.5-3 years) into Compass OS, structured to satisfy REBAA + QLD + NSW compliance standards. Goal: if audited at any time, records are complete and export-ready.

**Source material:**
- Old WhatsApp chats (on personal phones — hardest to extract cleanly)
- Email accounts (multiple, per team member)
- Google Drive / Dropbox folders
- DocuSign historical CAFs
- Possibly WayHub (GHL) records
- Personal notes

**Approach:**
1. **Inventory first.** Before parsing anything, map what exists and where. Identify gaps.
2. **Same schema as live.** Historical records land in the same Postgres as go-forward, flagged `source: historical` with `data_quality` indicator (complete / partial / reconstructed). No separate archive system.
3. **AI-assisted parsing.** Claude is good at turning messy email threads into structured events ("client X, discovery call on date Y, brief: 3br in Mermaid, budget $2.5M"). Semi-automated ingestion.
4. **Human QA sampling.** Dan is QA lead; may hire a contractor to support. Not a job for Nick or the agents — they need to be doing deals.
5. **Don't fabricate gaps.** If a 2022 client has no inspection photos, record says "photos not retained" — never invent. Auditors tolerate gaps, not fabrication.
6. **Sequence after live-schema stability.** Start after live system has run for 2-3 weeks and the schema isn't moving.

**Audit risk notes:**
- No current interim audit risk per Dan's read
- Flag to Compass: as they scale, the value of having this complete backfill grows — worth framing as business continuity / risk mitigation, not compliance-theatre
- This is its own **separate SOW** with its own scope, budget, and timeline. Don't absorb into the main build or it sinks the main build.

**Effort estimate:** Likely 30-40% of total project effort if done thoroughly. Material workstream.

---

## 15. Open questions & pre-Friday to-dos

### For Nick
- Which of the "Ways of Working" non-negotiables are day-one vs nice-to-have?
- List of compliance artefacts a licensee must produce on request (rough dump is fine)
- Top 3 manual tasks worth paying to eliminate first
- Current state of each CRM candidate: what's used vs dormant in WayHub (GHL)? Any prior exposure to Pipedrive / Attio / Day.ai?
- KPI dashboard prototype — what data does it pull today, what's missing?
- Are any agents on the team likely to resist Bruce being in their client chats? Change-management is the biggest adoption risk.

### Technical decisions to lock
- WhatsApp route: confirm unofficial API approach (Baileys or wrapper provider) given official Cloud API does not support groups
- CRM direction: **custom-build Compass OS** (current direction) vs off-the-shelf (WayHub/Pipedrive/Attio/Day.ai). Assumption is custom, but worth explicitly confirming with Nick.
- Primary infra vendor: Supabase (AU) as the single-vendor default, unless there's a reason to split
- Host for Bruce server: Hetzner Sydney vs DigitalOcean Sydney vs Fly.io AU

### Commercial decisions
- Fixed-price build + retainer, or hourly?
- Exit clause: define now while everyone's happy
- Separate SOW for the historical backfill workstream
- Budget for a contractor to support historical backfill QA if Dan can't cover alone

### Compliance
- Confirm state-specific record-keeping requirements (QLD Fair Trading + NSW Fair Trading + REBAA)
- Confirm statutory retention period — since inception, or last 7 years?

---

## 16. Suggested workstream split

Four distinct workstreams, sequenced roughly in this order:

**Workstream A — Compass OS core build**
- Data model
- Web app (login, sales journey view, property log browser, dashboards v1)
- Bruce agent (WhatsApp integration, capture, DM commands)
- Proposal automation
- DocuSign CAF automation
- Payment integration
- WhatsApp group auto-creation
- Reminder / trigger engine (core events)
- Per-client compliance export
- Monitoring + ops

**Workstream B — Property log + matching engine**
- Property log schema (structured + semantic fields)
- Ingestion via Bruce (natural language → structured entry)
- Bi-directional matching (new brief vs log, new property vs briefs)
- Agent notification flow
- Dashboard view

**Workstream C — Historical backfill (separate SOW)**
- Inventory of source material
- Extraction pipelines (WhatsApp exports, email dumps, Drive folders)
- AI-assisted parsing to structured events
- Human QA and validation
- Ingestion into Compass OS with quality flags
- Compliance gap report per client

**Workstream D — Dashboard + BI v2**
- Deeper metrics (time-in-stage per agent, conversion funnels, attribution)
- Daily briefing email (data-dependent, requires ≥4 weeks of captured data)
- Dormant client re-engagement logic
- Marketing-site → OS data pipeline

**Rough sequence:** A first (with B's property log schema built alongside), then the active matching logic, then D layered on top. C runs in parallel from week ~4 onwards once the schema is stable.

---

## Working notes — space to keep adding

_(Add new brain-dumps below — don't rewrite above unless correcting a fact.)_

---

## Session 2 decisions (2026-04-25)

### Commercial shape — locked
- **$12,500 AUD/month over 4 months = $50,000 total**
- Optional extension to 5 months (= $62.5k) if month-4 review surfaces meaningful residual scope. Frame it as an option, not a default.
- Checkpoint-based delivery, with value visible at each stage so Compass has confidence the project is on track
- Below market for full scope; justification is long-term relationship + future retainer + the v1 scope discipline below
- 3 months considered and rejected — would require cutting more than already cut

### Architecture — cloud-primary, not Mac Mini
- **Production system runs in cloud (Sydney AU region)** — Compass OS web app, database, file storage, Bruce server
- All infra accounts billed to Compass; Dan + any contractor are admin collaborators
- AU-region hosting satisfies data residency and licensee compliance — local hosting is not required
- **Mac Mini at office is optional and secondary** — if used, it's a Claude Code workstation for the team to interact with the OS at admin level, run scripts, and use Cowork. It is NOT the primary host for Bruce, the database, or production traffic.
- Reasoning: Compass cannot afford "the office router rebooted" to take Bruce down. Cloud is more resilient, easier to operate remotely, satisfies compliance, and "Compass owns it" doesn't require local hosting.

### Anthropic / Claude account structure
- **Anthropic account owned and billed by Compass**
- Used by: Bruce + Compass OS agents (via API), and the team's Claude Code / Cowork seats
- Single account = single billing line, single audit trail, easier admin

### v1 scope — full 4-month engagement (locked)
The v1 delivers four high-leverage outcomes: **legal protection (historical compliance archive + ongoing compliance file structure)**, **conversion velocity (proposal engine)**, **property log moat**, and **closed-loop client onboarding (CAF + payment)**.

**In scope (Phase 1, this $50k engagement):**
- Compass OS foundation: auth, client records, per-client file storage
- Per-client compliance file organisation (forward-looking)
- **Historical compliance archive** — archive-grade, not fully structured. Per-client folders for every client since inception, populated from Compass's existing client filing structure (Drive/Dropbox) + DocuSign CAFs pulled in. Email threads NOT bulk-imported (descoped 2026-04-26 — not high enough value for the effort). Searchable. *Audit posture: "if asked, we can produce records for any client."* (See Historical workstream split below.) ~1.5 weeks alongside foundation.
- Bruce on **Baileys (unofficial WhatsApp library)**, single number, hosted on cloud VPS Sydney. DM-active with team, silent observer in client groups (responds only when @-mentioned). One Bruce entity, one number, addable to client groups when needed.
- Granola call → brief extraction → proposal generation
- **Dual-format proposals with single canonical URL (decision 2026-04-26):**
  - HTML live link primary. Hosted natively in Compass OS at `proposals.compassbuyersagency.com.au/p/<token>` — no external hosting service needed (TinyHost / similar not required). Each proposal route reads from DB, renders dynamically.
  - **One canonical URL per proposal** — always shows the latest version. Agent iterates with Bruce, refreshes link, sees update. No new links to juggle.
  - DB stores every version under the hood (audit trail + rollback)
  - PDF snapshot generated at the "send to client" moment, frozen at that version, attached to the email alongside the live link, archived to `/clients/<id>/proposals/v<n>.pdf` for compliance
  - Post-send edits generate a new version and (if material) a new PDF — agent decides whether to notify client
- Property log capture — Bruce ingests realestate.com.au / domain.com.au links + agent context, parses, stores with photos. Manual/context-only ingestion for pure off-market properties
- Property log browser in web app
- Basic rule-based matching (new property ↔ open briefs by location + price band)
- Brief → CAF auto-population (DocuSign integration)
- Stripe payment integration with payment-triggered automations
- Client profile with notes + document log
- Basic reminders engine (pest/building, settlement -5d, follow-up dates)
- Dashboards v1 (pipeline, basic metrics)
- Production hardening, monitoring, team training, handover docs

**Historical work — explicit split (important for Nick conversation):**
- **v1 (in scope):** *Archive-grade*. Files filed, searchable, retrievable. Compliance-defensible if audited. ~2-3 weeks alongside foundation.
- **v2 (separate SOW post-engagement):** *Structured*. AI-parsed into typed interaction/inspection/property records, gap-flagged, full timeline reconstruction per client. The original 30-40%-effort workstream.

**Explicitly out of scope (Phase 2 / separate SOW):**
- Historical *structuring* (the second part of the historical split above)
- Bruce in client group chats (already deferred — team discipline model accepted)
- Semantic property matching (pgvector for fuzzy fit)
- External property enrichment (CoreLogic / PriceFinder, comparable sales, suburb analytics, flood/BAL, school zones)
- Daily briefings (needs ≥4 weeks of accumulated data to be useful)
- Dormant client resurrection
- Deep BI / per-agent funnel analysis

**Explicitly out of scope (Phase 3 / separate SOW, much later):**
- Marketing agents (SEO, website management, backlink)
- Sanity content draft/review agents
- Multi-tenant activation (architecture is multi-tenant-ready in v1; activating tenant #2 = separate work)
- Stripe payment integration + automatic WhatsApp group creation
- BI dashboards (also needs data accumulation first)
- Content / site / SEO agents (Sanity integration for blog/page drafting)
- Daily briefings + dormant client resurrection
- Historical backfill (separate SOW)

### Why this v1 is the right v1
- **Legal cover** — compliance file structure protects against audit risk and is foundational for everything else
- **Conversion lever** — fastest, sharpest proposals from a discovery call directly translate to higher win rate at $25k a deal
- **Foundation built right** — the data model and OS skeleton are reusable for everything in the deferred list, so v1 is not throwaway
- **Fits the budget** — $50k over 4 months is achievable solo for this scope with discipline; the original full scope was not

### Discovery → proposal flow (the headline MVP feature)

```
Discovery call (recorded in Granola)
     ↓
Granola webhook on call complete → Compass OS
     ↓
Brief-extraction agent: pulls structured brief from transcript
(location, budget, beds/baths, timeline, motivations, constraints)
     ↓
Proposal agent: generates HTML from template + brief + brand
     ↓
Live link emailed to agent (web-hosted, not PDF)
     ↓
Agent iterates with Bruce in WhatsApp DM ("change X, regenerate")
     ↓
Agent forwards live link to client
     ↓
Client engagement tracked (opens, scrolls, time-on-section)
```

**Why a live link, not a PDF:**
- Tweak after sending without re-sending
- Engagement analytics — opens, scrolls, time-on-section = follow-up signal
- Premium feel matches Compass brand
- Easy to layer interactive elements later (signing, payment, scheduling)

**Granola integration:** Granola shipped an API. Confirm what's accessible (transcript, summary, action items). Webhook-on-call-complete is the right trigger.

### 4-month sprint plan (locked, with month-5 as optional extension)

| Month | Theme | Headline checkpoint |
|---|---|---|
| **1 — Foundation + archive + first proposal win** | OS skeleton, auth, client records, per-client file storage, Bruce on Baileys (DM with team), historical archive ingestion (DocuSign CAFs + Compass's existing client filing structure), **thin proposal engine v1** — brief in via Bruce DM, templated HTML live-link out | **Demo to Nick:** Agent DMs Bruce a client + brief → Bruce returns a live-link branded proposal. Plus: any historical client searchable with all their files. |
| **2 — Granola + property log + proposal polish** | Granola integration (call → brief extraction), property log capture (Bruce URL+context ingestion), basic property↔brief matching, proposal iteration loop polish | Discovery call → live proposal in <10 min, end-to-end. Agent drops a listing link → property appears in log with photos. |
| **3 — Convert + onboard** | Brief → CAF auto-population (DocuSign), Stripe payment, payment-triggered automations, client profile depth (notes + docs log) | Full client journey discovery → proposal → CAF → paid, all in the system |
| **4 — Operate + handover** | Reminders engine (pest/building, settlement -5d, follow-ups), dashboards v1, hardening, monitoring, team training, handover docs | System is live, team trained, handover complete |
| **5 (optional)** | Triggered by month-4 review: residual scope, bug-fix tail, additional polish, or first piece of Phase 2 work | Decided at end of month 4 |

### Reverse-engineered phase plan (for the long-term picture)

```
Phase 3 (months 9-12+, separate SOW)  Marketing OS + BI depth
  ├── SEO agent + website management agent + backlink agent
  ├── Sanity content agents with draft/review flow
  ├── Deep BI (per-agent funnels, attribution, MRR forecasting)
  └── Multi-tenant activated for franchise #2

Phase 2 (months 5-8, separate SOW)  Depth + scale
  ├── Bruce v2 (groups via dual-stack? voice quality, weekly nudges)
  ├── Property matching: semantic (pgvector) + enrichment
  ├── Historical structuring (v2 of the historical split)
  ├── Dormant client resurrection
  └── Daily briefings (data-driven)

Phase 1 (months 1-4, THIS engagement, $50k)  Foundation
  └── See sprint plan above
```

### Site integration + content agents — clarified

The Compass website (compassagency.com.au) uses Sanity. There is a clear path to wire it into Compass OS later, but it is **not v1 scope**.

When done (post-MVP):
- Site form submissions → Compass OS API → leads created
- GA / PostHog events → OS dashboard for full-funnel attribution
- Content agents draft to Sanity as **draft documents** (not direct publish)
- Team approves in Sanity Studio with their existing workflow
- Audit trail captures which agent drafted what, when, approved by whom

This keeps the team's Sanity Studio editing workflow intact, prevents AI slop from reaching production, and gives the OS dashboard a complete view of marketing → revenue.

### Contractor model — when needed
At $50k over 4 months, the budget is too tight to bring in a contractor *and* maintain Dan's margin. Decision logic:
- If MVP scope holds and Dan can stay full-time on it → solo is viable
- If Dan needs to split time with other clients → bring in a part-time engineer 1-2 days/week (~$15-20k for the build), and either accept the margin hit or renegotiate scope/fee with Nick
- Any contractor gets a Compass-domain admin email, GitHub collaborator access, scoped 1Password vault — same access model as Dan
- IP flows clean to Compass via the contractor agreement

### Open items still to confirm with Nick
- Final v1 scope sign-off on the MVP described above
- Confirmation of the $50k/4-month commercial shape
- Anthropic account ownership and Claude Code seat allocation
- Whether the team wants a Mac Mini workstation in the office (cosmetic only, not load-bearing)
- Hard line on no historical backfill in this engagement — separate SOW later
- Confirm long-term franchise vision and that the OS should be designed accordingly
- Confirm SOW IP clause covers Compass's right to sublicense the OS to franchisees

---

## Long-term franchise vision — design lens

Compass intends to franchise / replicate the model into other states. The OS must be designed with this lens from day one. Cost to bake in now: ~5-10% extra discipline. Cost to retrofit later: ~50%+ effort.

### Principle
**Multi-tenant-ready, not multi-tenant-active.** v1 has one tenant (Compass NSW/QLD). The architecture assumes more will come. Adding tenant #2 should be a config change, not a rewrite.

### What this changes in v1 (small, mostly invisible)
1. **`tenant_id` on every table** from day one. Row-level security scopes every query. One row in `tenants` initially.
2. **Tenant-scoped auth** — users belong to a tenant; session/JWT carries `tenant_id`; Bruce knows which tenant he's serving.
3. **Tenant-scoped file storage** — per-tenant namespace from the start.
4. **State-aware compliance layer** — compliance rules (record-keeping, CAF templates, retention periods) stored as data attached to tenants, not hardcoded. NSW Compass = NSW + QLD rules. VIC franchise = VIC rules. Same code, different config.
5. **Branding + voice as data** — logo, colours, proposal template, brand voice rules live in tenant config. White-label-ready.
6. **Per-tenant Bruce number + API keys** — no shared credentials. Each franchise gets its own Bruce, its own Anthropic key (or sub-key under HQ depending on commercial model).
7. **HQ-aggregation concept exists in the model** — even with one tenant, support a "network view" so cross-franchise BI, royalty calc, and benchmarking can layer on later without schema changes.

### Strategic decisions for Compass to make (not blocking v1, but soon)
- **Network property log** — should off-market properties be visible across franchises? Strong network moat, but franchisees may resist sharing their best leads. Likely opt-in per property.
- **Cross-franchise referrals** — Sydney client wants Gold Coast property → handoff to Gold Coast franchise with revenue split. OS supports this natively.
- **HQ vs franchise data ownership** — what's franchisee-private vs HQ-visible? Royalty calculations need HQ visibility into deal flow.
- **Mandatory vs optional tech** — is OS part of the franchise package, or optional? Mandatory locks in consistency, audit, brand.
- **State compliance coverage** — every state (VIC, SA, WA, etc.) needs its rules captured. Not v1 work; architecture must accommodate.

### Commercial implication for Compass
This is no longer just an internal tool — it's the operational backbone of a franchise system. Compass becomes part-agency, part-SaaS. The OS underwrites the franchise pitch: "join Compass, get the OS, plug in and run." Each new franchise = recurring licence fee + standardised quality.

### IP clause to add to SOW
Standard work-for-hire usually covers it, but make explicit: **Compass's ownership includes the right to sublicense the OS to franchisees in their franchise network**. One sentence avoids ambiguity later when Compass becomes the SaaS vendor to its own franchisees.

