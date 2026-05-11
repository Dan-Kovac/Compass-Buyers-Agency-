# Compass OS · Responses to Nick's questions

Final email body. Plain text formatting (no markdown asterisks) so it pastes clean into Gmail / Google Docs. AU English, no em dashes.

---

Hey Nick,

Bullets under each so we can walk through them on the call.


1. YOUR TIME AND AVAILABILITY

- Roadmap Digital is wound down to legacy hosting only. Consulting under my personal brand going forward.
- Compass OS and Sportsbet are the only two things on my plate for the full 16 weeks.
- Engineer not locked in yet. Mid-weight backend/integrations contractor handling the plumbing where I don't want to be a bottleneck. CV through to you before they touch the project.


2. COST BREAKDOWN

$50,000 fixed.

Two invoice cadences (your call):
- 3 invoices (default, tax-aligned): $19,500 / $19,500 / $11,000
- 4 monthly invoices: $12,500 × 4

Optional Month 5: +$12,500, only if M4 review surfaces something worth doing.

Milestone vitals vs flex if budget pressure is real:
- M1 Compliance + Foundation. Vital: compliance file structure, multi-tenant DB, auth, audit log. Flex: archive-grade historical backfill.
- M2 Sales Engine. Vital: brief extraction, proposal generation in WhatsApp via Bruce, live shareable link. Nothing flexes.
- M3 Property Log + Close. Vital: log, matching, custom search, closed-loop onboarding. Flex: Stripe integration (pending Xero answer).
- M4 Growth + Handover. Most flex here. Deferrable: SEO agent, newsletter agent, suburb reports, website editor, BI dashboard, dormant flags. Recommendation: keep them, SEO agent alone replaces ~$15k/yr in retainer fees.

Off-ramp: first two invoices ($39k) cover M1 + M2 sign-off. Final $11k only commits Compass to M3 + M4 once M2 is in the team's hands.

Pause / exit: IP yours from day one. No refund on signed-off milestones. 30-day pause clause. Contract assignable.

Engineer sits inside the $50k. No extra invoice. Fractional across 16 weeks, heaviest M1 and M3.

Platform running costs (Compass pays directly post-launch): ~$825/mo total. Cloud + Bruce VPS ~$190, Anthropic API ~$500, WhatsApp/email/domains/backups ~$135. Stripe and DocuSign pass-through.


3. SCOPE AND MILESTONE VALUE

Each milestone delivers something Compass uses immediately:
- M1: compliance foundation live, every client filed correctly.
- M2: Sales Engine in the team's hands. Faster closes during the build.
- M3: property log feeding deals + closed-loop onboarding.
- M4: growth layer live, full handover.

Dashboard v1 from M2 onwards tracks: sales velocity (target sub-60min discovery-to-proposal), proposal output baseline vs M4, deals attributable to the build, property log capture/match/convert rates, audit-readiness score.

Benchmark: this isn't a $15-$20k AI app. You're paying for external opinion, agentic systems expertise, testing discipline, and custom IP that lets Compass move quicker than any other agency.


4. PRE-BUILT VS CUSTOM

Off-the-shelf fails Compass three ways:
- Too much (HubSpot, GoHighLevel): bloated, team won't use it.
- Too little: no compliance, no property log, no agent layer.
- Wrong shape: not built around WhatsApp-first, voice-note briefs, off-market by phone.

Custom means the system bends around how the team works.


5. TRAINING AND EVOLUTION

- File-managed skills: each agent has skill files the team can edit. Update the file, agent updates its behaviour. Live.
- Bruce feedback loop: tell Bruce when a match is off, Bruce updates its own logic.
- New procedure or new team member = a skill file, not a build request.
- Self-healing: agents monitor their own outputs and flag drift rather than failing silently.


6. OFFBOARDING, SETTLEMENT, COMPLIANCE CAPTURE

Non-negotiable scope. Handled through Bruce's reminders engine. Offboarding sequence, settlement checklist, compliance capture at key dates all wired as Bruce-triggered reminder workflows. Procedure detail locked with you and Chris in M1.


7. AUTO-CAPTURE

Everything entered into the OS is captured against the right client record automatically: forms, file uploads, Bruce conversations, generated documents.

Email: each team member connects their Gmail, Bruce identifies the client and files inbound/outbound. Bulletproof fallback if OAuth has friction: BCC-to-capture address.


8. DATA AND PLATFORM PORTABILITY

Data: Supabase, Sydney region. Full export on demand, regular backups. Compass owns the data outright.

WhatsApp portability: Bruce isn't tied to WhatsApp, runs equally on iMessage, SMS, anything. Team commits to one channel at a time so history doesn't fragment.

WhatsApp Business API: Bruce sits behind a Business number via Twilio or 360dialog. Costs inside the ~$80/mo line. Team's personal WhatsApp untouched.

Privacy (APP-compliant): consent at intake, right-to-access export, deletion-on-request, encryption + audit log. Anthropic doesn't train on API traffic (contractual). DPA available.

Compliance structure: starting frame in the proposal. Detailed requirements locked in M1 with you and Chris.


9. AI TOOLING STABILITY

Claude Code (Anthropic) is the world-class backend for serious commercial builds in 2026. Base44 and Lovable are prototype tools, not production.

Portability insurance is the file structure: agents, skills, training data stored as files. Better model in 12 months = lift the file tree across, not a rebuild.

Model deprecation: Anthropic gives 12-month notice. Any deprecation-driven migration within 12 months of handover is on me, no extra charge.

Same pattern I'm building at Sportsbet right now for the product team. Happy to share the prototype today.


10. FRONT-END AND CLIENT LOGIN

Build sequence:
- Step 1: Claude Business Account live, whole team on Claude.ai with a starter set of skills. Team gets immediate value, stress-tests each agent before we productise it.
- Step 2: wrap proven agents in a proper front-end on Claude Code. Multi-tenant, compliance-grade.

Custom front-end is needed: Claude.ai can't host the per-client compliance backlog, multi-tenant audit log, property log, or structured client lifecycle.

Client login (in scope):
- Phase 1 (M3, read-only): brief, matched properties with thumbs up/down feedback, document vault, key dates, status.
- Phase 2 (M4 or post-handover, interactive): uploads, in-portal messaging with Bruce, preference updates.

Roles: Admin (Chris), Agent (team), Client (own record), Accountant (read-only for EOFY). Confirmed in M1.

Brand: same Hills/Sand/Sea-Breeze palette and MinervaModern + Aeonik typography as the website. Clients see it, can't feel like a SaaS dashboard.

Training: built into M4. Two recorded sessions (admin/compliance with you and Chris, daily workflows with the team), per-agent runbooks, Bruce as in-app help.


11. STILL OPEN + LANDING POINTS

Things to land together:
- Compliance shape detail (M1 working session with you and Chris).
- Email auto-capture exact implementation (validated in M1).
- Stripe/Xero question from the proposal: is Xero linked to Stripe today, or another flow?
- Success scoreboard agreed pre-kick-off.
- Anything from your side I haven't accounted for.

Key points:
- Fixed price, risk on us. If the build takes longer, that's on me.
- IP yours from day one.
- Off-ramp at M2 sign-off.
- ROI compounds mid-build, not after.
- Sportsbet prototype available today.
- Next step: lock a kick-off date, I send the engagement letter.


Happy to talk through any of these on the call.

Dan

---

## Planning notes (internal, NOT in email to Nick)

Cost stack as a percentage breakdown for the eventual proposal pie chart:
- Dan's time + delivery margin: ~50-60% (target clear ~$25k+ after tax)
- Income tax on profit: ~15-25%
- Engineering (overseas mid-tier, $50-$70/hr AUD target): ~10-15%
- Platform / tooling during build: ~5%
- Buffer / unknowns: residual

Working assumptions:
- Dan: ~15 hrs/week × 16 weeks = ~240 hrs at a target effective rate of $180+/hr.
- Engineer: 5-10 hrs/week, fractional, overseas.
- Net target: clear ~$25k minimum from the project after tax and costs.

Risk-of-overrun framing for proposal update: fixed-price language already in section 07, add a line making the risk allocation explicit — "if the build takes longer than planned, that's on us, not on Compass."

Proposal updates to do:
- Percentage-share visual on the Investment page.
- Strengthen fixed-price / risk-on-Dan framing under section 07.
- Bake the M2 off-ramp into the Investment section as a feature.
- Promote the reminders engine in section 02 to non-negotiable status.
