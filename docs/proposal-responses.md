# Compass OS · Responses to Nick's questions

Draft email. Bullet points only — we'll talk through each one live. Australian English, no em dashes, buyer-framed, plain.

---

Hey Nick,

Thanks for these. Rather than write essays, I've put short bullets under each so we can work through them together on the call. Where I can't give you a clean answer yet I've said so.

---

**1. Your time and availability**

- Full transparency: I've wound Roadmap Digital down to a small handful of legacy hosting clients. No new project work there. Going forward I'm consulting under my personal brand only.
- Once we kick off Compass OS, this and Sportsbit are the only two things on my plate. I'm not taking on anything else for the duration of the build.
- You're getting consistent, focused time across the 16 weeks. Not shared with a roster of other clients.
- On the engineer: I haven't locked them in yet, and I want to be upfront about that.
- I can do every part of this build myself. The reason I'm bringing in a second pair of hands is specifically the backend plumbing — the bits where the tools talk to each other and the architecture has to be right first time. That's the area I'm least willing to be a bottleneck on.
- Plan is a mid-weight engineer: senior enough to push back on architecture, not so senior that the rate breaks the model. Once they're locked in I'll send their CV through before they touch the project.
- Worst case, if hiring slips, I cover that work myself. The timeline doesn't move.

**2. Cost breakdown**

- $50,000 + GST, fixed. Same number it's been since the first version of the proposal went to you. Optional Month 5 sits on top at +$12,500 and only triggers if the M4 review turns up something worth doing, by mutual agreement.
- Covers four months, four delivery milestones, and 100% Compass ownership of infrastructure, accounts and IP from day one.
- Two invoice cadences, same total, your call:
  - **3 invoices (default, tax-aligned across two FYs):** $19,500 kick-off / $19,500 at M2 / $11,000 at M4.
  - **4 monthly invoices:** $12,500 at kick-off then $12,500 at each of M1, M2, M3 acceptance.

**You're not locked into the full $50k on day one**

- The work is structured as four milestones with a sign-off gate at each one. That's the off-ramp built in.
- On the 3-invoice cadence, the first two invoices ($39,000) get Compass through M1 + M2 sign-off. The final $11,000 only commits you to M3 + M4 once you've seen M2 land and you're happy with the trajectory.
- What you'd have at the $39k checkpoint (M2 signed off):
  - Compliance + foundation: secure login, client records, file storage, audit log, per-client compliance folder structure
  - The Sales Engine: brief extraction from voice/chat, branded proposal templates, Bruce drafting proposals in WhatsApp, live shareable proposal link
- If M3 + M4 don't feel right at that point, we have a scope conversation, not a sunk-cost one.

**Where scope could flex if we needed to tighten the build**

- The non-negotiables, from my read of the agency's actual workflow:
  - Sales flow (proposal generation in WhatsApp, live link) — M2
  - Property log (parse RE.com.au / Domain links + manual off-market entry) — M3
  - Property matching (brief ↔ property, both directions) — M3
  - Custom search across the log — M3
  - Compliance file structure underneath all of it — M1
- The clearest deferral candidates if we wanted to reduce scope:
  - M4 growth layer: SEO agent, newsletter agent, suburb report agent, website editor agent — useful, not vital for the OS to start paying back
  - Reminders engine and dormant-client flags — high-value but can be added once the log is live
  - Dashboard v3 BI — v1/v2 already give you the operational view; the deep BI cut can wait
  - Archive-grade historical backfill — already flagged as out of MVP
  - Stripe integration — already flagged as outside MVP pending the Xero question
- My recommendation: keep the full $50k scope. The M4 growth layer is where a lot of the recurring-savings ROI lives (SEO retainer replacement alone is ~$15k/year). But if budget pressure is real, we have a clear conversation about what stays and what slides.

**Inside the $50k: how the build resources itself**

- I'm not pricing this against an hourly ledger. The $50k is priced against the outcome: a productised OS that Compass owns outright, recurring savings inside year one, and a foundation that's licensable or franchisable beyond Stage 1. That framing matters because what we're charging for is the system, not a timesheet.
- That said, here's the honest shape of the team and the cost stack so you know what you're actually getting.

*The engineer sitting alongside me*

- Profile: mid-weight full-stack contractor with a backend / integrations bias. Comfortable with Postgres + multi-tenant data modelling, auth and RBAC, API plumbing across WhatsApp, DocuSign, Anthropic, Xero/Stripe, plus parser pipelines for RE.com.au and Domain. Testing discipline non-negotiable.
- Engagement shape: fractional across the 16 weeks, not full-time. Heaviest in M1 (foundation, multi-tenant schema, auth, file storage, audit log) and M3 (property log parsing, matching engine, DocuSign + CAF flow). Lighter in M2 and M4.
- The four areas where they plug in — these are the specific zones where I want a second pair of hands rather than risk being the bottleneck:
  - Wiring the integrations end-to-end (WhatsApp, DocuSign, Anthropic, parsers, Xero/Stripe if it lands)
  - Standing up the platform foundation (DB, auth, multi-tenant, file storage, audit log)
  - Pressure-testing the backend architecture so it scales past Stage 1
  - Testing discipline across the agent pipelines
- They sit inside the $50k. No extra invoice to Compass for their time.

*Platform running costs (post-launch, paid by Compass directly)*

- These were in the original proposal but worth restating so there's no surprise. Indicative monthly run rate once live:
  - Cloud hosting (DB + app): ~$150/mo
  - Bruce VPS (Sydney): ~$40/mo
  - Anthropic API (usage-based, midpoint estimate): ~$500/mo
  - WhatsApp messaging: ~$80/mo
  - Transactional email: ~$25/mo
  - Domains, monitoring, backups: ~$30/mo
  - **Expected total: ~$825/mo**
- Stripe and DocuSign are pass-through and already paid by Compass.
- Anthropic API is the variable line. Prompt caching and tuning should pull this lower as the system matures.

**On the back end**

- Happy to move to a retainer model from Month 5 onwards if that suits how you want to keep evolving the OS. We can shape that closer to handover once we know what's actually useful to keep building.

**3. Scope, milestone value, and how to benchmark this**

- Each milestone delivers something Compass uses immediately. You're not waiting until Month 4 to see the build pay back.
  - **M1 sign-off:** the foundation is live. Compliance file structure, audit log, secure login, every client filed correctly. Sleep-at-night value from week four.
  - **M2 sign-off:** the Sales Engine is in the team's hands. Bruce drafting proposals in WhatsApp, branded templates, live shareable links. Faster closes start happening during the build.
  - **M3 sign-off:** property log feeding deals + closed-loop onboarding. The moat starts compounding. Off-market intel gets captured instead of lost in WhatsApp threads.
  - **M4 sign-off:** growth layer live. SEO agent, newsletter agent, suburb reports, dashboards, full handover.
- Personal aim of mine: this project should pay itself off before it's even live. Faster proposals plus the new website plus Google ads bringing more leads should mean more closed deals during the 16 weeks. ROI starts compounding mid-build, not after.
- On how to benchmark this internally — fair question, worth saying clearly:
  - You could look at this and say "an AI app might cost $15k to $20k in 2026." That framing misses what you're paying for.
  - You're not paying for an app. You're paying for an external opinion in your systems, someone who understands how agentic systems actually work and how to get quality outputs from them, someone with testing discipline who'll bring this to life in the team's hands, and a custom internal IP that lets Compass move quicker than any other agency.
  - The right benchmark isn't an AI app builder. It's the cost of being the only buyers agency in the market with this operating layer. There isn't a comparable.

**4. Pre-built vs custom**

- Valid question. I've scoped this in depth before recommending custom.
- Off-the-shelf systems fail Compass in three predictable ways:
  - **Too much** (HubSpot, GoHighLevel): bloated, complex, the team doesn't use them. You've already lived this with the previous setup.
  - **Too little:** don't cover compliance file structure, the property log, or the agentic layer. You'd still need to build half of it.
  - **Wrong shape:** not built around how you actually operate (WhatsApp-first, voice-note briefs, off-market intel arriving by phone call).
- Custom means the system bends around how the team works, not the other way around. That's the whole game.

**5. Training, evolution, and self-improvement**

- Once built, the OS tunes itself with Compass in the driver's seat. No developer ticket required to evolve it.
- **File-managed skills layer:** each agent has a folder of skills and reference files you (or anyone on the team) can edit. Update the file, the agent updates its behaviour. Live.
- **Feedback loop on Bruce:** when Bruce surfaces a property match that's off, you tell Bruce why. Bruce updates its own matching logic. Self-learning.
- Same pattern across all the agents (SEO, newsletter, property log, website editor).
- Net effect: the longer the team uses it, the sharper it gets. New procedure or new team member becomes a skill file, not a build request.

**6. Offboarding, settlement, compliance capture**

- Handled through the reminders engine built into Bruce. You'll see the reminders section in the prototype.
- Standard procedures (offboarding sequence, settlement checklist, compliance capture at key dates) wired as Bruce-triggered reminder workflows.
- The structure is in the proposal. The specific procedure detail (what each reminder sequence actually contains) gets locked down inside M1 with you and Chris — that's part of the build, not a separate exercise.

**7. Auto-capture (data and email)**

- Confirmed: anything entered into the OS is automatically captured against the right client record. Forms, file uploads, Bruce conversations, generated documents — all filed without manual handling.
- Email auto-capture: each team member gets their own user in the OS and connects their Gmail. Bruce scans inbound and outbound, identifies the client, files the email against the right record. The exact connection model gets validated and locked in inside M1.
- Bulletproof fallback if the Gmail connection has friction: BCC-to-capture address. Less elegant but it always works.

**8. Data migration, platform portability, compliance structure**

- **Data:** Supabase is the database backbone. Top-tier infrastructure, frankly overkill for Stage 1, picked deliberately so we never need to migrate up. Full export available on demand, regular backups baked in. Compass owns the data outright.
- **WhatsApp / messaging portability:** Bruce isn't tied to WhatsApp. Connecting Bruce to iMessage, SMS or any other channel is straightforward. The only operational constraint is the team committing to one channel at a time so message history doesn't fragment.
- **Compliance structure:** the architecture in the proposal is the starting frame. The detailed requirements get worked through with you and Chris inside M1, alongside the regulatory research I'll do in parallel. By M1 sign-off the compliance shape is locked, validated against how Compass actually operates day-to-day.

**9. AI tooling stability and model risk**

- Real risk and one I've felt myself. Worth being honest about.
- Where the market sits in May 2026: Claude Code (Anthropic) is the world-class backend for serious commercial builds. Tools like Base44 and Lovable have a place for prototypes, not for systems your business runs on.
- Building on Claude Code on a real codebase is the stable, portable, future-proof choice.
- **Portability insurance is the file structure.** Agents, skills, training data, system architecture — all stored as files in a clean, deliberate structure. If a better model or platform appears in twelve months, we lift the file tree across. Not a rebuild.
- Direct evidence I can point at: I'm building the same architecture pattern at Sportsbit right now for the product team. Same approach, different domain (graphic designers and developers instead of clients). Happy to walk you through the prototype to show the pattern in action.
- The Sportsbit lesson worth knowing: at enterprise scale it always comes back to "each team needs its own custom operating system, its own interface, and bespoke tools layered on top." That's exactly what we're building for Compass.

**10. Anything we've missed (and the client-login / front-end question)**

- The build sequence answers the front-end question directly:
  - **Step 1:** stand up Claude Business Account for Compass. Everyone on the team gets Claude.ai with co-work access. We deploy a starter set of skills (proposal creation, custom property searches, etc) so the team gets immediate value and starts stress-testing each agent we'll productise into the OS.
  - **Step 2:** wrap the proven agents in a proper front-end built on Claude Code. Multi-tenant, compliance-grade, the lot.
- On whether we even need the custom front-end: yes. Claude.ai and co-work host beautiful project environments, but they can't host the per-client compliance backlog, the multi-tenant audit log, the property log, or the structured client lifecycle. That layer has to be a real app on top.
- Good news: the gap between "Claude.ai project" and "custom front-end on Claude Code" is much smaller than it used to be. Same engine, just a proper interface and database layer wrapped around it.
- **Client login:** yes, in scope. Multi-tenant from day one. Each Compass client gets their own login surface to view their brief, matched properties, documents, and status.
- **An ask back to you and the team:** please challenge my thinking. Tell me what I'm missing, what you're worried about, what you want to talk through. The whole point of going through these ten questions is to surface anything I haven't considered before we start, not after.

---

Happy to walk through any of these in more depth on the call. Where I've flagged something as not-fully-answered, that's deliberate — better to talk it through than guess.

Dan

---

## Planning notes (internal — for proposal update, NOT in email to Nick)

**Cost stack as a percentage breakdown — for the eventual proposal pie chart**

- Target shape of where the $50k goes:
  - Dan's time + delivery margin: ~50-60% (target clear ~$25k+ after tax)
  - Income tax on profit: ~15-25%
  - Engineering (overseas mid-tier contractor, target rate $50-$70/hr AUD): ~10-15%
  - Platform / tooling during build: ~5%
  - Buffer / unknowns: residual
- Dan's working assumption: ~15 hrs/week × 16 weeks = ~240 hrs at a target effective rate of $180+/hr.
- Engineer working assumption: 5-10 hrs/week, fractional, overseas, $50-$70/hr AUD mid-tier (originally floated at $40, raised to $50-70 as more realistic for the integrations work required).
- Net target: clear ~$25k minimum from the project after tax and costs.

**Risk-of-overrun framing — needs to land in the proposal update (gently)**

- There's inherent execution risk in fixed-price deliverables of this complexity. Timeframes may blow out.
- Cost of any overrun is absorbed by Dan, not Compass. Fixed price means fixed.
- We can't say this bluntly to Nick. Way to frame it in the proposal: lean on the "fixed scope, fixed price, scope changes only by mutual decision" language already in section 07 of the proposal, and add a line under that making the risk allocation explicit — something like "if the build takes longer than planned, that's on us, not on Compass."

**What needs to change in the proposal itself once we've finished answering all 10 questions**

- Add the percentage-share visual (pie chart or stacked bar) on the Investment page so the cost stack is legible.
- Strengthen the fixed-price / risk-on-Dan framing under section 07.
- Anything else that surfaces from Q3-Q10 that warrants an update.

---

## Brainstorm: gap-question answers (internal, not in email yet — for Dan to absorb and decide)

These are first-cut best guesses on the gaps I flagged. Treat as a thinking tool. Push back, refine, drop the ones that aren't worth Nick's time.

**1. What does a client actually see when they log in?**

- Phase 1 (M3, default scope): read-only view. Their brief, matched properties (with thumbs up/down feedback that feeds Bruce), document vault, key dates, status updates.
- Phase 2 (M4 or post-handover): interactive. Upload documents directly, message Bruce inside the portal, update preferences inline.
- My call: ship read-only first, layer interactivity once we've watched real clients use it.

**2. Permissions and roles**

- **Admin (Chris as licensee):** everything. Full audit log, compliance export, financial visibility.
- **Agent (team members like Lee, Nick):** own clients plus the shared property log. No compliance/financial controls.
- **Client:** their own record only.
- **Accountant/view-only:** read-only access for EOFY and tax conversations.
- Worth confirming with Chris early in M1 that this role model matches how the team actually delegates.

**3. Front-end brand and aesthetics**

- Yes, the OS uses the same brand language as the website. Hills, Sand, Sea-Breeze palette. MinervaModern headings, Aeonik body. Same restraint, same coastal-luxury tone.
- Reason: clients see this layer. Compass is a premium brand. The OS can't feel like a SaaS dashboard if it's the surface clients meet.
- The internal admin views can be more utilitarian, but anything client-facing matches the website.

**4. Support after handover**

- 30-day post-handover bug-fix window included free. Anything that breaks because of how we built it, we fix at no charge.
- Beyond that, two options, Compass picks:
  - **Retainer:** ~$1.5k-$2k/mo. Covers monitoring, model updates, light tweaks, priority response within one business day. No 24/7. Business hours, best effort outside.
  - **Pay-per-incident:** keep me on speed dial, charged as agreed when something comes up.
- No 24/7 SLA in Stage 1. We're not running a NOC. Worth setting that expectation cleanly.

**5. Training the team**

- Built into M4 scope:
  - Two live training sessions (one with Chris and Nick on the admin/compliance layer, one with the full team on the daily workflows). Both recorded.
  - Per-agent runbook: what it does, how to update its skills, what to do when it misbehaves.
  - Bruce itself doubles as the in-app help system: ask Bruce "how do I do X?" and Bruce answers.
- Roughly 10-15 hours of my M4 time allocated here. Already in the build cost.

**6. Success metrics**

- Worth agreeing the scoreboard before kick-off so we both know what good looks like at M4.
- Suggested core metrics:
  - **Sales velocity:** time from discovery call to live proposal link (target: under 60 minutes).
  - **Proposal output:** proposals sent per week (baseline now vs M4).
  - **Deals attributable to build:** extra closes during the 16 weeks from faster proposals.
  - **Property log:** properties captured per week, matches surfaced per week, % converted.
  - **Compliance posture:** audit-readiness score (Chris signs off monthly, target 100% by M4).
- These should sit on a Dashboard v1 that's live from M2 onwards. We measure as we go, not at the end.

**7. Pause or exit mid-build**

- **IP:** Compass owns everything from day one. If Compass exits, Compass keeps whatever's been built. No code held hostage.
- **Refund:** no refund on signed-off milestones. Sign-off is the gate.
- **Pause clause:** up to 30 days pause for any reason, project resumes at the same rate. Beyond 60 days, we renegotiate scope and timeline because my availability isn't guaranteed forever.
- **Acquisition / change of ownership:** contract is assignable to the new entity with mutual consent.

**8. Privacy and data handling**

- **Region:** Supabase Sydney (ap-southeast-2). Data stays in Australia.
- **APP compliance:** baked in. Explicit consent at client intake, right-to-access export, deletion-on-request workflow.
- **Third parties:** no client data sold or shared. Anthropic processes inputs through the API but doesn't train on API traffic by default (this is contractual on their side).
- **Encryption:** at rest and in transit. Audit log records every read/write against a client record.
- **DPA:** I can provide a lightweight Data Processing Agreement if Compass needs one to give to its own clients.

**9. WhatsApp Business vs personal WhatsApp**

- Personal WhatsApp on business automation is a TOS violation. Not the path.
- Recommendation: WhatsApp Business API via a Business Solution Provider (Twilio or 360dialog). Costs already inside the ~$80/mo line in the proposal.
- Compass owns the WhatsApp Business number. Bruce sits behind it.
- The team keeps using regular WhatsApp on their phones for everything else. Bruce only answers messages to the business number.

**10. Model deprecation and migration risk**

- Anthropic gives 12-month deprecation notice on production models. Not a sudden cliff.
- Migrations between Claude versions are usually trivial if the file structure is clean (the whole reason we're building it that way).
- My commitment: any deprecation-driven migration within 12 months of handover is on me, no extra charge.
- Beyond 12 months: covered under the support retainer if engaged, otherwise scoped as a small project.

**11. ??? (need the missing question)**

- Original Nick email you pasted got truncated mid-sentence at "For a build at t..." so I never had the full list. Send me the rest of the email or tell me what Q11 actually asks and I'll draft it.
