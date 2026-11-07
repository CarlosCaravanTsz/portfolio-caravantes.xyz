---
version: 1
slug: "v3-html"
primary_target: "v3.html"
related_targets: []
---

# v3.html — portfolio home

Scope: the whole one-page portfolio (`v3.html`, `assets/*`). Mode: Experience with a hiring-first opening (recruiter is the primary visitor).

Audience and job: recruiters and tech leads decide in minutes whether Carlos is worth an interview; they need name, seniority, range and a contact path in the first scroll. Proof is the real CV (JLL, Globant, Zentrol, Axity; Dev.F only on cv.html), three professional case diagrams and three synthetic labs. Constraints: bilingual ES/EN, no-JS baseline, no build step or external JS libraries, reduced motion, WCAG 2.2 AA, nothing fabricated (no status/version/latency telemetry, no stock imagery).

User decisions (2026-11-07): restore the V2 (`V2/v3.html`) visual world for the final version. Indigo carries the atmosphere (particles, beams, glows), Caravantes emerald carries the brand mark and primary actions. Inter + JetBrains Mono (Space Grotesk only in the wordmark). Bring back: particle universe, technical arsenal, hub with light beams (for the specialties atlas), converging experience cards (content visible, no click-to-expand).

## Direction contract

THESIS: A deep-space engineering console that stays honest: the V2 night-sky world (particles, glass, light beams converging on a core) carries only true CV facts. It refuses V2's fake telemetry and the editorial split-hero of the previous v3.

OWN-WORLD: Ground #030305 with #0A0A0C panels, white/8% hairlines, rounded 24px glass cards with soft corner glows, indigo #6366f1/#a5b4fc light (particles, beams, gradient words), emerald #42dcb4 for the Caravantes mark and primary pills, per-area accents (emerald data, indigo AI, rose ops, fuchsia software). Inter tight display, JetBrains Mono for dates and stacks.

STORY: The visitor reads "Carlos Caravantes, Senior Data Engineer" in a starfield, sees four specialties wired into one core, the tools behind them, the cases, then four employers converging on today's role, and writes to him.

FIRST VIEWPORT: Full-height centered hero over the particle field: name at ~128px in two lines (white, then indigo-white gradient), `<Role>` cycling DataOps & Cloud Engineer / Full Stack Software & AI Engineer / Automotive/HPC Enthusiast `</Role>` at ~30px, two-line lede, emerald primary pill (see professional cases) and glass pill (CV). Fixed transparent nav: mark and wordmark top-left with a mono location line, links, ES/EN and Hablemos top-right. Mono corner notes with true facts at the bottom (location and languages left, years and current employer right); on mobile they stack under the actions with a contact link.

FORM: user-pinned direction (V2/v3.html), translated to the Caravantes brand; not drawn from a ranked list. seed:5594e05aa09597b5 (roll recorded; direction stays user-pinned)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
