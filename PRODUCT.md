# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters, hiring managers and technical leads evaluating Carlos Caravantes for a full-time role, likely remote and international. They arrive from LinkedIn, GitHub, or a shared CV link. They have a few minutes to decide whether he is worth an interview, and they want to see what kind of systems he builds, how senior he is, and where his strengths lie.

Secondary: companies or individuals who want to hire him for a specific project (data engineering, AI automation, software). Freelance work matters, but finding a job comes first.

## Product Purpose

A personal portfolio for Carlos Caravantes, a data, software and AI engineer based in Puerto Vallarta, MX. It turns his CV into explorable evidence: professional case studies, architecture diagrams and small in-browser labs. Success means a qualified visitor understands his range and seniority quickly, then contacts him or downloads his CV.

## Positioning

He builds data platforms in production (Azure, Microsoft Fabric, SAP ingestion, DataOps) and conversational AI automation (n8n, agents), and he has led microservice and integration work. The portfolio shows this range as a connected system instead of a list of skills. The professional cases come from real roles, and the labs are working interactive demos rather than screenshots.

## Operating Context

- Static site: `v3.html` plus `assets/` (CSS, vanilla JS, local SVG). No build step, backend or dependencies. Google Fonts load with local fallbacks.
- The project catalog lives in `assets/projects.js` (`PORTFOLIO_PROJECTS`, `PORTFOLIO_AREAS`). Counts, filters and the project map are calculated from it.
- Contact form: it opens a WhatsApp draft that the visitor reviews and sends. Email (mailto), GitHub and LinkedIn links are also offered. No contact backend.
- Deep links: `v3.html#project/<id>` opens a case study directly.
- The core content (intro, experience, education, contact, CV) must stay usable without JavaScript.

## Capabilities and Constraints

- Language: **bilingual ES/EN with a language switcher** (decided and implemented 2026-11-06). Spanish lives in the HTML (no-JS baseline); English and JS-generated strings live in `assets/i18n.js`; catalog entries carry an `en` override. All visible copy, metadata and catalog entries must exist in both languages.
- CV: `cv.html` is the English, printable, reverse-chronological CV built only from `CV.txt` facts. `CV.txt` stays as the plain-text original. A designed PDF and a Spanish CV do not exist yet.
- Catalog: 7 entries. 3 professional cases (Globant, Zentrol, Axity) summarize CV experience with explanatory diagrams. 3 labs (vision/perimeter, classification boundary, distributed resilience) run locally on synthetic data. 1 entry is the portfolio itself.
- Labs do not train models, use the camera or connect to real infrastructure. The camera-based MediaPipe demo in V2 was dropped.
- Project map: drag, connect, undo and reset are local to the session and never change the catalog.
- Respect reduced motion. The particle effect turns off under reduced motion, outside the viewport and on hidden tabs.
- Undecided: hosting/deploy target and domain (the CV lists www.caravantes.xyz, not confirmed as the deploy target).

## Brand Commitments

- **Caravantes AI is Carlos's personal brand**, not a company or studio. Copy speaks in the first person as one engineer and must not suggest a team or agency.
- Assets: the interlaced mark (`assets/brand/caravantes-mark.svg`, a manual working reconstruction, not the master vector), the original handwritten signature/logo (`logo-primary-2026-09-12.png`), and the tagline "Tech-driven. AI-enhanced."
- **Visual world (decided 2026-11-07):** the V2 night-sky look (`V2/v3.html`) is the final style: near-black ground, particle field, glass panels, light beams converging on a core, gradient words. Indigo carries the atmosphere; Caravantes emerald carries the mark and primary actions. Inter + JetBrains Mono for text; Space Grotesk only in the wordmark. V2 content (fake telemetry, PRISM.OS, stock images, invented projects) stays out.
- Voice: curious, a builder, lifelong learner ("A true master is an eternal student"). Confident without hype.
- Rationale for the chosen brand route: `BRAND-PROPOSAL.md`. Comparison of alternatives: `brand-concept.html`.

## Evidence on Hand

- `CV.txt`: the authoritative source for roles, dates, education and languages (Spanish native, English C1, German B1, Japanese A2). Plain text only; no PDF CV exists yet.
- Experience: JLL (Data Engineer Full Stack, Jun 2026–present: EDP integration pipelines, APIs on the Databricks SQL Statement Execution API, Genie Agents deployment/tuning, MCP, metric views, Genie ontology/context layer; added by Carlos 2026-11-07), Globant (Senior Advanced Azure Data Engineer, Mar 2025–May 2026; confirmed by Carlos 2026-11-06 — the "sSENIOR" in CV.txt is a typo, not Semi-Senior), Zentrol LLC (AI Software Automation Engineer, Sep 2025–Jan 2026), Axity (Data Engineer → DataOps → Tech Lead, Jan 2022–Mar 2025), Dev.F (Sensei, Apr–Sep 2022; on cv.html only, dropped from the home page as least relevant). Titles (Carlos, 2026-11-07): DataOps & Cloud Engineer | Full Stack Software & AI Engineer | Automotive/HPC Enthusiast.
- Education: Master in AI Software Development (Big School & Universidad Isabel I, 2025), Automatic Control Engineering (IPN ESIME Zacatenco, 2017–2021), Programming Technician (CBTis 68), McGill advanced English (2021).
- Public profiles: github.com/CarlosCaravanTsz, linkedin.com/in/carloscaravantsz, carloscara28@hotmail.com.
- **Absent, do not fabricate:** metrics, client names beyond employers, testimonials, public repos or live deployments for the professional cases, uptime/latency figures, version numbers. V2 included invented projects ("Enterprise Knowledge Graph", "Autonomous Finance Agent", …), stock Unsplash imagery and fake system telemetry. None of that is real evidence.

## Product Principles

1. **Everything shown is true.** Every claim traces back to the CV or to a demo that runs on the page. Synthetic data is labeled as synthetic.
2. **Hiring first.** A recruiter must be able to read seniority, range and contact path within the first scroll. Exploration rewards curiosity but never blocks that path.
3. **Show the system, not the buzzwords.** Architecture, flows and working labs replace generic "AI/futuristic" decoration.
4. **One person, one voice.** A personal brand: first person, warm and precise, consistent in both languages.
5. **Works for everyone.** Content survives without JavaScript, with reduced motion, by keyboard and on mobile.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Keyboard access is required for every interaction, including map editing and labs (already partly implemented). Honor `prefers-reduced-motion`. The bilingual switch must update `lang` attributes.
