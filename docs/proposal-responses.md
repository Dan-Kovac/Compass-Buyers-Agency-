# Compass OS · Responses to Nick's 11 questions

Final email body. Plain text formatting, no markdown asterisks. AU English, no em dashes, Dan voice, no AI wording.

---

Hey Nick,

Direct answers under each. Happy to dig deeper on the call.


1. YOUR TIME AND AVAILABILITY

- Roadmap Digital is wound down to a handful of legacy hosting clients. No new project work there. Consulting under my personal brand going forward.
- Compass OS and Sportsbet are the only two things on my plate for the full 16 weeks. Nothing else.
- You're getting focused, consistent time. Not shared with a roster of other clients.
- Engineer is a mid-weight overseas contractor, backend and integrations focus. Handles platform foundation, integration plumbing, backend architecture, and testing. Not yet locked in. CV through to you before they touch the project.
- If the engineer can't continue mid-build: I cover their scope myself. Timeline doesn't move. I can do everything they do. I'm bringing them in to avoid being a bottleneck on the backend, not because I need them to deliver.


2. COST BREAKDOWN AND PAYMENT STRUCTURE

Three buckets inside the $50k:
- My time (lead delivery, product, design, agent build, training): ~65%
- Engineer (backend foundation, integrations, testing): ~15%
- Infrastructure and tech stack during build (Supabase, hosting, Anthropic API, WhatsApp Business setup, domains, monitoring): ~10%
- Buffer / contingency: ~10%

Payment timing assuming kick-off late May 2026:
- Invoice 1 (kick-off, late May): $19,500. Pre-June 30.
- Invoice 2 (M2 acceptance, early August): $19,500. New FY.
- Invoice 3 (M4 acceptance, mid-September): $11,000. New FY.
- Pre-June 30: $19,500. New FY: $30,500.
- If your accountant wants closer to $20k pre-EOFY, easy to round Invoice 1 up and rebalance.

Month 5: agreed, no fixed $12.5k block. Hourly rate (~$180/hr) or a monthly retainer scaled to what's actually needed. We'll shape it at the M4 review.


3. BUILD COST RATIONALISATION

- Acknowledged on the $40k vs $50k mix-up. Proposal has been $50k since the first version went over.
- Reference points for your accountant:
  - Custom CRM + agent system built by a Sydney digital agency: $80k-$150k for this scope.
  - Same scope built solo by a senior Sydney contractor at $200+/hr: $100k+ on labour alone.
  - Off-the-shelf AI app builder (Base44, Lovable): $15k-$20k. Doesn't cover compliance, property log, multi-tenant client portal, or production-grade integrations.
- $50k sits deliberately between the AI app builder floor and the traditional dev shop ceiling. Made possible because Claude Code accelerates the build without sacrificing quality.
- What you're paying for above a pure code spend: external operator opinion, agentic systems expertise, testing discipline, custom IP that's licensable beyond Stage 1.


4. PRE-BUILT VS CUSTOM

Pre-built components we reuse, not coded from scratch:
- Supabase: database, auth, file storage, real-time
- Anthropic Claude: language model + agent runtime
- Twilio or 360dialog: WhatsApp Business API
- DocuSign: contract execution
- Tiptap (or similar): rich text for proposals

What's custom: the layer that wires these together for how Compass operates. Compliance file structure, property log + matching, Bruce's behaviour, client portal, multi-tenant architecture.

On 80%-there platforms: scoped hard. The closest candidates (HubSpot + Zapier, GoHighLevel, monday + automations) get you 40-50% there with significant compromise on how the team actually works. The 50-60% that's missing is exactly the stuff that matters most: compliance moat, property log, WhatsApp-first sales engine.

OS is the CRM. Replaces what you've got. Not alongside.


5. HOW MUCH CAN WE TRAIN AND EVOLVE THIS OURSELVES

What the team controls without a developer:
- Proposal templates, brief structures, output tone
- Agent skills (Bruce, SEO agent, newsletter agent, etc) — managed as editable files
- Bruce's matching logic via real-time feedback (tell Bruce when a match is off, Bruce updates itself)
- Reminder sequences and compliance checklists
- New procedures or new team members = a skill file, not a build request

What needs engineering:
- Schema changes (new data types)
- New integrations
- New agent categories
- Major UI changes

Post-handover bugs and small fixes:
- 30-day window after handover where I fix anything that breaks because of how we built it, no charge.
- Beyond that: small monthly retainer or pay-per-incident, your call.
- Self-healing built in: agents flag drift in their own outputs rather than failing silently. Most issues surface for review before they become problems.


6. OFFBOARDING, SETTLEMENT COMPLIANCE AND AUTO-CAPTURE

Core scope. Not an add-on.

Settlement close-out checklist (living, inside the OS):
- B&P ordered → contracts exchanged → final inspection → settlement confirmed → post-settlement archive.
- Each stage fires Bruce reminders to the right agent at the right time.
- Visible status against every active deal.

Auto-capture sweep — yes, this is the right call:
- When a deal hits a defined stage, Bruce runs a sweep across the linked Gmail thread, the WhatsApp history for that client, and the OS itself.
- Bruce identifies document types (signed contract, B&P report, finance approval, correspondence) using Claude.
- Files everything into the correct slot in the client folder.
- Flags any missing items against the close-out checklist so the agent knows what's outstanding before settlement.
- Exactly where the compliance story tightens.


7. DATA, STORAGE AND PORTABILITY

- Supabase Sydney: enterprise-grade Postgres backend.
- Backups: daily automated with 7-day point-in-time recovery on the Pro tier.
- Redundancy: built-in across availability zones in the Sydney region.
- Additional layer: weekly off-region backup to a second cloud provider for true disaster recovery.
- Migration if needed: data is standard Postgres. Full SQL export anytime. Any Postgres-compatible host can take it.
- Disaster recovery: documented runbook included in handover. Restore-to-working-state target under 4 hours.


8. WHATSAPP RELIABILITY AND COMPLIANCE ARCHITECTURE

Two answers because there are two questions.

WhatsApp fallback if Meta disrupts access:
- Bruce isn't tied to WhatsApp. The same Twilio account that runs WhatsApp Business API also runs SMS and email.
- If WhatsApp drops, Bruce switches to SMS for the team and clients. Email fallback for longer-form content.
- Day-to-day operations don't stop. Team and clients get notified of the channel switch.
- Recovery when WhatsApp comes back: minutes, not days.

Compliance — being completely upfront:
- What's in the current proposal is my interpretation of audit-ready, drawn from QLD and NSW Fair Trading guidance. It has not been reviewed by a compliance specialist.
- For an existential layer like this, that's not good enough on its own.
- Recommended approach: engage a compliance specialist in M1 to review and sign off on the structure. Cost can sit inside the build budget, or use the consultant Compass already trusts. Your offer to assist on this is exactly the right move.
- Once a specialist signs off, the structure is legally defensible. That's the bar.


9. AI SHELF LIFE AND PRODUCTION EXPERIENCE

Architecture holding up 12-24 months:
- Portability insurance is the file structure. Agents, skills, training data, system architecture all stored as files in a deliberate structure. If a better model or platform appears, we lift the file tree across. Not a rebuild.
- Anthropic gives 12-month deprecation notice on production models. Migrations between Claude versions are usually trivial when the file structure is clean. Any deprecation-driven migration within 12 months of handover is on me, no extra charge.
- API change: most breaking changes hit the integration layer (well-isolated, well-tested). Agent skills themselves rarely break across versions.

Base44-style horizon tools:
- Real watch item. The AI-app-builder space is moving fast. In 12 months, Base44 v2 or similar might do 60% of what we're building.
- The 40% that won't be off-the-shelf in 12 months: compliance file structure, multi-tenant client portal, property log + bi-directional matching, Bruce's bespoke behaviour. That's the moat.
- If a better tool appears for any individual layer, the file structure means we swap it in. Not betting on Anthropic specifically.

Production experience:
- Sportsbet is the same architecture pattern in production right now for the product team. Same approach, different domain (designers and developers instead of clients). Real users, real workflows. Happy to share the prototype today.
- Outside Sportsbet: smaller agentic systems for past clients. Compass OS is the most ambitious bespoke OS I've architected start-to-finish. Being upfront about that.


10. TEAM SETUP ON CLAUDE AND BRAND EXECUTION

Team setup on Claude:
- Yes, folded in. Step 1 of the build is Claude Business Account, whole team on Claude.ai with co-work access, plus a starter set of skills (proposal creation, custom property searches).
- Workspace setup, account hygiene, team training: all in scope.

Brand and design work:
- Bruce + Claude Design can execute brand-aligned content: marketing copy, blog, social, basic design briefs, in-app design tokens.
- Full V2 brand identity (logo system, brand guidelines, visual identity) needs a brand designer, not an agent. Bruce delivers against an established brand system but isn't a brand creator.
- If V2 brand is wanted alongside, I can scope it as parallel work with a designer I'd recommend. Not part of the $50k.

Client-friendly login (yes, in scope):
- Phase 1 (M3, read-only): client sees their brief, matched properties with thumbs up/down feedback, document vault, key dates, status. Same shape as the Google Sheet you use now, plus document access.
- Phase 2 (M4 or post-handover, interactive): clients upload directly, message Bruce inside the portal, update preferences.


11. WHAT HAVE WE MISSED

Gaps and risks worth flagging from my side:

- Compliance specialist review (covered in Q8). Biggest risk, easiest to lock down.
- Team adoption. The OS is only as valuable as how often the team uses it. M2-M3 needs heavy team engagement to bed it in. Worth planning a one-day workshop early in M2.
- Property listing parser fragility. RE.com.au and Domain change their HTML occasionally. Parsers break. Monitoring + maintenance baked in, but this is the line that needs the most ongoing attention.
- Brand identity (covered in Q10). If V2 brand is wanted alongside, scope it as parallel work.
- Historical email and WhatsApp data hygiene. Stage-triggered auto-capture works clean going forward. Historical sweep across years of past threads is a separate exercise — worth scoping if you want it.

Franchise and multi-tenant architecture:
- Genuinely baked into M1, not aspirational. Database schema is multi-tenant from the first migration. M1 includes a shadow tenant for isolation testing.
- One of the reasons M1 is the foundation milestone. We don't bolt this on later.


Happy to jump on a call.

Dan

---

## Planning notes (internal, NOT in email to Nick)

Cost stack as a percentage breakdown:
- Dan's time + delivery margin: ~50-60% (target clear ~$25k+ after tax)
- Income tax on profit: ~15-25%
- Engineering (overseas mid-tier, $50-$70/hr AUD target): ~10-15%
- Platform / tooling during build: ~5%
- Buffer / unknowns: residual

Working assumptions:
- Dan: ~15 hrs/week × 16 weeks = ~240 hrs at a target effective rate of $180+/hr.
- Engineer: 5-10 hrs/week, fractional, overseas.
- Net target: clear ~$25k minimum from the project after tax and costs.

Risk-of-overrun framing for proposal update: "if the build takes longer than planned, that's on us, not on Compass."

Proposal updates to do:
- Percentage-share visual on the Investment page.
- Strengthen fixed-price / risk-on-Dan framing under section 07.
- Bake the M2 off-ramp into the Investment section as a feature.
- Promote the reminders engine in section 02 to non-negotiable status.
- Add Q3-style benchmarking ($80-150k agency, $100k+ senior contractor, $15-20k AI app builder) into the rationalisation narrative.
