# Compass OS · Responses to Nick's questions

Draft email. Bullet points only — we'll talk through each one live. Australian English, no em dashes, plain.

---

Hey Nick,

Bullets under each so we can work through them on the call.

**1. Your time and availability**

- Roadmap Digital is wound down to a small handful of legacy hosting clients. No new project work there. Going forward I'm consulting under my personal brand only.
- Once we kick off, Compass OS and Sportsbet are the only two things on my plate. Nothing else for the duration of the build.
- You're getting consistent, focused time across the 16 weeks. Not shared with a roster of other clients.
- On the engineer: I haven't locked them in yet, and I want to be upfront about that. They handle the backend plumbing — the bits where the tools talk to each other and the architecture has to be right first time. That's the area I'm least willing to be a bottleneck on.
- Plan is a mid-weight engineer: senior enough to push back on architecture, not so senior that the rate breaks the model. Once they're locked in I'll send their CV through before they touch the project.

**2. Cost breakdown**

Milestone-by-milestone, what's vital and what could flex if budget pressure is real:

- **M1 — Compliance + Foundation.** Vital: compliance file structure, multi-tenant database, auth, audit log, per-client folders. Flex: archive-grade historical backfill (can land post-launch).
- **M2 — Sales Engine.** Vital: brief extraction from voice/chat, proposal generation in WhatsApp via Bruce, live shareable proposal link. Nothing flexes here, this is core.
- **M3 — Property Log + Close.** Vital: property log, brief-to-property matching, custom search across the log, closed-loop onboarding. Flex: Stripe integration (already flagged as outside MVP pending the Xero question).
- **M4 — Growth + Handover.** Most flex sits here. Deferrable: SEO agent, newsletter agent, suburb reports, website editor, BI dashboard, dormant-client flags. My recommendation is to keep them — the SEO agent alone replaces ~$15k/year in retainer fees.

*Cost*

- $50,000 fixed, two invoice cadences (your call):
  - **3 invoices (default, tax-aligned across two FYs):** $19,500 / $19,500 / $11,000
  - **4 monthly invoices:** $12,500 × 4
- Optional Month 5 sits on top at +$12,500, only triggers if the M4 review turns up something worth doing.
- **Off-ramp built in.** On the 3-invoice cadence, the first two invoices ($39,000) cover M1 + M2 sign-off. The final $11,000 only commits Compass to M3 + M4 once you've seen M2 land.
- **Pause or exit:** IP is yours from day one. No refund on signed-off milestones. 30-day pause clause. Contract assignable on ownership change.

*Inside the $50k*

- The engineer sits inside the $50k. No extra invoice to Compass for their time.
- Engineer profile: mid-weight full-stack contractor, backend / integrations bias. Comfortable with Postgres + multi-tenant, auth, API plumbing (WhatsApp, DocuSign, Anthropic, Xero/Stripe), parser pipelines. Testing discipline non-negotiable.
- Engagement shape: fractional across the 16 weeks. Heaviest in M1 (foundation) and M3 (property log + closed loop). Lighter in M2 and M4.

*Platform running costs (post-launch, paid by Compass directly)*

- Cloud hosting + Bruce VPS: ~$190/mo
- Anthropic API (usage-based, midpoint): ~$500/mo
- WhatsApp messaging, transactional email, domains/monitoring/backups: ~$135/mo
- **Total: ~$825/mo.** Stripe and DocuSign pass-through. Anthropic API is the variable line — prompt caching and tuning should pull it lower over time.

**3. Scope, milestone value, and how to benchmark this**

- Each milestone delivers something Compass uses immediately. You're not waiting until Month 4 to see the build pay back.
  - **M1:** compliance foundation live, every client filed correctly. Sleep-at-night value from week four.
  - **M2:** Sales Engine in the team's hands. Faster closes start happening during the build.
  - **M3:** property log feeding deals + closed-loop onboarding. Off-market intel stops getting lost in WhatsApp threads.
  - **M4:** growth layer live, full handover.
- Personal aim: this should pay itself off before it's even live. Faster proposals + new website + Google ads = more closed deals during the 16 weeks. ROI compounds mid-build.
- On benchmarking: you could say "an AI app might cost $15k-$20k in 2026." That framing misses what you're paying for. Not an app. An external opinion in your systems, deep understanding of how agentic systems actually work, testing discipline, and custom IP that lets Compass move quicker than any other agency. The right benchmark isn't an AI app builder — it's the cost of being the only buyers agency with this operating layer.

*How we measure if it worked*

- Live on Dashboard v1 from M2 onwards:
  - **Sales velocity:** time from discovery to live proposal link (target under 60 minutes)
  - **Proposal output:** baseline now vs M4
  - **Deals attributable to the build:** extra closes during the 16 weeks
  - **Property log:** captured per week, matches surfaced, % converted
  - **Compliance:** audit-readiness score, Chris signs off monthly, target 100% by M4

**4. Pre-built vs custom**

- Off-the-shelf systems fail Compass in three predictable ways:
  - **Too much** (HubSpot, GoHighLevel): bloated, the team doesn't use them. You've lived this.
  - **Too little:** don't cover compliance, the property log, or the agentic layer. You'd still build half of it.
  - **Wrong shape:** not built around how you actually operate (WhatsApp-first, voice-note briefs, off-market by phone).
- Custom means the system bends around how the team works, not the other way around.

**5. Training, evolution, and self-improvement**

- Once built, the OS tunes itself with Compass in the driver's seat. No developer ticket needed to evolve it.
- **File-managed skills layer:** each agent has a folder of skills and reference files anyone on the team can edit. Update the file, the agent updates its behaviour. Live.
- **Feedback loop on Bruce:** when Bruce surfaces a property match that's off, you tell Bruce why. Bruce updates its own matching logic.
- Net effect: the longer the team uses it, the sharper it gets. New procedure or new team member = a skill file, not a build request.
- Self-healing built in: the system monitors its own outputs, flags drift, and asks for correction rather than failing silently.

**6. Offboarding, settlement, compliance capture**

- This is non-negotiable scope. Compliance reminders are core to the system, not an add-on.
- Handled through the reminders engine built into Bruce. You'll see it in the prototype.
- Offboarding sequence, settlement checklist, compliance capture at key dates — all wired as Bruce-triggered reminder workflows.
- Procedure detail gets locked down with you and Chris inside M1, as part of the build.

**7. Auto-capture (data and email)**

- Confirmed: anything entered into the OS is automatically captured against the right client record. Forms, file uploads, Bruce conversations, generated documents.
- Email auto-capture: each team member gets their own user and connects their Gmail. Bruce scans inbound and outbound, identifies the client, files it against the right record. Locked in inside M1.
- Bulletproof fallback: BCC-to-capture address. Less elegant but always works.

**8. Data portability, platform portability, compliance structure**

- **Data:** Supabase. Top-tier infrastructure, frankly overkill for Stage 1 — picked deliberately so we never need to migrate up. Full export on demand, regular backups. Compass owns the data outright.
- **WhatsApp / messaging portability:** Bruce isn't tied to WhatsApp. Connecting to iMessage, SMS or any other channel is straightforward. Only constraint: team commits to one channel at a time.
- **WhatsApp Business API:** Bruce sits behind a WhatsApp Business number via a Business Solution Provider (Twilio or 360dialog). Costs already inside the ~$80/mo line. Team's personal WhatsApp untouched.
- **Privacy (Australian Privacy Principles):** Sydney region, data stays in Australia. Consent at intake, right-to-access export, deletion-on-request, encryption at rest and in transit, audit log on every record access. No data sold or shared. Anthropic processes inputs but doesn't train on API traffic (contractual).
- **Compliance structure:** the architecture in the proposal is the starting frame. Detailed requirements get worked through with you and Chris inside M1. By M1 sign-off the compliance shape is locked.

**9. AI tooling stability and model risk**

- Real risk and one I've felt myself. Worth being honest about.
- Where the market sits: Claude Code (Anthropic) is the world-class backend for serious commercial builds. Tools like Base44 and Lovable have a place for prototypes, not for systems your business runs on.
- **Portability insurance is the file structure.** Agents, skills, training data, architecture — all stored as files in a deliberate structure. If a better model or platform appears in twelve months, we lift the file tree across. Not a rebuild.
- **Model deprecation:** Anthropic gives 12-month notice. Any deprecation-driven migration within 12 months of handover is on me, no extra charge.
- I'm building the same architecture pattern at Sportsbet right now for the product team — same approach, different domain (designers and developers instead of clients). Happy to share the prototype later today so you can see the pattern in action.
- The Sportsbet lesson: at enterprise scale it always comes back to "each team needs its own custom operating system, its own interface, and bespoke tools layered on top." That's exactly what we're building for Compass.

**10. Anything we've missed (and the front-end / client-login question)**

- Build sequence answers the front-end question:
  - **Step 1:** stand up Claude Business Account for Compass. Whole team on Claude.ai with co-work access. Deploy a starter set of skills (proposal creation, property searches) so the team gets immediate value and starts stress-testing each agent before we productise it.
  - **Step 2:** wrap the proven agents in a proper front-end on Claude Code. Multi-tenant, compliance-grade.
- Do we need the custom front-end? Yes. Claude.ai can't host the per-client compliance backlog, the multi-tenant audit log, the property log, or the structured client lifecycle. That layer has to be a real app.
- **Client login:** in scope. Phase 1 (M3, read-only) — brief, matched properties with thumbs up/down feedback, document vault, key dates, status. Phase 2 (M4 or post-handover, interactive) — uploads, in-portal messaging with Bruce, preference updates.
- **Roles:** Admin (Chris), Agent (team), Client (own record), Accountant (read-only for EOFY). Worth confirming the model in M1.
- **Brand:** the OS uses the same Hills / Sand / Sea-Breeze palette and MinervaModern + Aeonik typography as the website. Clients see this layer — it can't feel like a SaaS dashboard.
- **Training:** built into M4. Two recorded sessions (admin/compliance with you and Chris, daily workflows with the team), per-agent runbooks, Bruce as in-app help. Already in scope.

**11. Things still open, and where I want to land at the close**

*What's still open and our thinking on each*

- **The compliance shape in detail.** The architecture in the proposal is the starting frame. Detailed regulatory requirements get worked through with you and Chris in M1 alongside the research I'll do in parallel. By M1 sign-off the compliance structure is locked, validated against how the agency actually operates day-to-day.
- **Email auto-capture, exact implementation.** Direction is clear. Connection model gets validated in M1. BCC-to-capture is the bulletproof fallback if Gmail OAuth has friction.
- **Stripe and Xero.** The open question from the proposal: is Xero linked to Stripe for electronic payments today, or are clients paying another way? If Stripe is already in the flow, we wire it into closed-loop onboarding in M3. If not, payment stays manual in v1 and we pick it up post-launch.
- **Post-handover support shape.** Best discussed at the M4 review rather than now. The system is being built with self-healing factors — agents that monitor their own outputs, flag drift, and ask for correction rather than failing silently — so it's not screaming for support out of the gate.
- **The success scoreboard.** Worth agreeing the metrics together pre-kick-off so we both know what good looks like by M4. Starter set in Q3.
- **Anything from your side I haven't accounted for.** Most important one. The reason for going through these eleven questions is to surface what I haven't considered, before we start, not after. Push back on anything that doesn't feel right.

*Key landing points for the close*

- Fixed price, risk on us. If the build takes longer than planned, that's on me.
- IP yours from day one. Nothing held hostage.
- Off-ramp at M2 sign-off ($39k in, $11k still optional).
- ROI compounds mid-build, not after.
- I can share the Sportsbet prototype later today as evidence of the pattern in action.
- If there's appetite to move, we lock a kick-off date and I send the engagement letter. Step 1 (Claude Business Account spin-up) starts the week we sign.

Happy to talk through any of these in more depth on the call.

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
- Engineer working assumption: 5-10 hrs/week, fractional, overseas, $50-$70/hr AUD mid-tier.
- Net target: clear ~$25k minimum from the project after tax and costs.

**Risk-of-overrun framing — needs to land in the proposal update (gently)**

- There's inherent execution risk in fixed-price deliverables of this complexity. Timeframes may blow out.
- Cost of any overrun is absorbed by Dan, not Compass. Fixed price means fixed.
- Way to frame it in the proposal: lean on the "fixed scope, fixed price, scope changes only by mutual decision" language already in section 07 of the proposal, and add a line under that making the risk allocation explicit — something like "if the build takes longer than planned, that's on us, not on Compass."

**What needs to change in the proposal itself**

- Add the percentage-share visual (pie chart or stacked bar) on the Investment page so the cost stack is legible.
- Strengthen the fixed-price / risk-on-Dan framing under section 07.
- Bake the M2 off-ramp story into the Investment section as a feature, not a footnote.
- Promote the reminders engine in section 02 (Outcomes) to reflect its non-negotiable status.
