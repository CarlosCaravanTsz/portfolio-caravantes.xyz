---
name: Caravantes AI — Carlos Caravantes portfolio
description: A deep-space engineering console that carries only true CV facts.
colors:
  void: "#030305"
  void-raised: "#050507"
  panel: "#0a0a0c"
  panel-raised: "#0e0e12"
  art-well: "#08080a"
  hairline: "rgba(255, 255, 255, 0.08)"
  hairline-soft: "rgba(255, 255, 255, 0.05)"
  hairline-strong: "rgba(255, 255, 255, 0.16)"
  starlight: "#ececee"
  white: "#ffffff"
  text-soft: "rgba(255, 255, 255, 0.74)"
  text-muted: "rgba(255, 255, 255, 0.58)"
  text-faint: "rgba(255, 255, 255, 0.52)"
  indigo: "#6366f1"
  indigo-400: "#818cf8"
  indigo-300: "#a5b4fc"
  emerald-accent: "#42dcb4"
  emerald-accent-hover: "#6ae8c6"
  emerald-brand: "#00ad84"
  emerald-ink: "#03140e"
  tone-emerald: "#34d399"
  tone-rose: "#fb7185"
  tone-fuchsia: "#e879f9"
  fuchsia-mist: "#f5d0fe"
  indigo-mist: "#eef0ff"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(64px, 10.4vw, 136px)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(34px, 4vw, 52px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  role:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(22px, 2.3vw, 31px)"
    fontWeight: 500
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title-sm:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  lede:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(16px, 1.25vw, 17.5px)"
    fontWeight: 300
    lineHeight: 1.7
  small:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 500
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.08em"
  mono-data:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  wordmark:
    fontFamily: "Space Grotesk, Inter, sans-serif"
    fontSize: "23px"
    fontWeight: 600
    letterSpacing: "-0.04em"
rounded:
  badge: "7px"
  close: "12px"
  control: "14px"
  tile: "16px"
  node: "18px"
  card-sm: "20px"
  card: "24px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4vw, 40px)"
  section: "clamp(88px, 11vw, 128px)"
  page: "1280px"
  grid-gap: "24px"
  card-pad: "32px"
  card-pad-sm: "24px"
  heading-gap: "64px"
components:
  button-primary:
    backgroundColor: "{colors.emerald-accent}"
    textColor: "{colors.emerald-ink}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.emerald-accent-hover}"
    textColor: "{colors.emerald-ink}"
  button-glass:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "rgba(255, 255, 255, 0.86)"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-glass-hover:
    backgroundColor: "rgba(255, 255, 255, 0.1)"
    textColor: "{colors.white}"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.void-raised}"
    rounded: "{rounded.control}"
    height: "52px"
  button-light-hover:
    backgroundColor: "{colors.indigo-mist}"
  nav-contact:
    backgroundColor: "{colors.emerald-accent}"
    textColor: "{colors.emerald-ink}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "38px"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "rgba(255, 255, 255, 0.64)"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "38px"
  filter-chip-active:
    backgroundColor: "rgba(255, 255, 255, 0.1)"
    textColor: "{colors.white}"
  tag:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "rgba(255, 255, 255, 0.72)"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
    height: "28px"
  input:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "14px 16px"
  search-field:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.pill}"
    padding: "0 8px 0 18px"
    height: "48px"
  card-project:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.card}"
    padding: "0 24px 24px"
  card-arsenal:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  card-career:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.card-sm}"
    padding: "28px 24px"
  icon-tile:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    rounded: "{rounded.tile}"
    size: "48px"
  dialog:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.card}"
    width: "min(1080px, calc(100% - 40px))"
---

# Design System: Caravantes AI — Carlos Caravantes portfolio

## Overview

**Creative North Star: "The Honest Night Console"**

A near-black sky (#030305) holds a slow particle field, a faint 64px grid, scanlines and a vignette; everything readable floats above it on dark glass panels with white hairlines. Light is the material: indigo glows breathe behind sections, light beams run from content to a central core, and gradient words pick out the second half of each heading. The console look is earned by content, not decoration. Every label, date and metric on screen is a true CV fact or the live output of an on-page lab; the world never fakes telemetry, versions or uptime.

Two lights split the work. Indigo is the atmosphere (particles, beams, glows, focus, data accents in mono). Caravantes emerald is the brand and the action: the mark, the wordmark's "AI", and every primary pill. Four area tones (emerald data, indigo AI, rose integration/ops, fuchsia software and exploration) are applied through one local `--tone` variable so a card, its tile, its border glow and its beam always agree.

Density is generous on the outer page (88–128px section rhythm, centered or split headings) and compact inside panels (12px mono metadata, 14–15px body). Motion is long-eased (cubic-bezier(0.16, 1, 0.3, 1)) and ambient; every loop and reveal stops under reduced motion, and all content is visible without JavaScript.

**Key Characteristics:**
- Near-black void with layered atmosphere: particles, grid, scanlines, radial indigo glows.
- Dark glass panels, 1px white hairlines at 5–16% opacity, 24px corners.
- Indigo for atmosphere, emerald for the brand and primary actions, per-area tones via `--tone`.
- Inter tight-tracked for everything readable; JetBrains Mono for dates, stacks, counts and metadata.
- Light beams converging on a core as the recurring signature (specialties hub, experience timeline).
- Truth over spectacle: no invented telemetry, status lights or numbers.

## Colors

A cold, near-black field lit by indigo, with a single warm-green brand voice and four area tones.

### Primary
- **Caravantes Emerald** (emerald-accent): primary pills ("Ver casos profesionales", "Hablemos", "Recorrer flujo"), share confirmations, rare emerald particles (about 7% of the field). Text on it is always Emerald Ink (#03140e). Hover lifts to emerald-accent-hover.
- **Brand Green** (emerald-brand): reserved for the wordmark's "AI" and the mark itself; not used for UI.

### Secondary
- **Atmosphere Indigo** (indigo): ambient glows (radial, 7–12% opacity), particles, the hub core halo, the name underline.
- **Beam Indigo** (indigo-400): AI area tone, beams, contact tiles, range inputs, lab dots.
- **Starlight Indigo** (indigo-300): gradient-word start color, focus ring, mono counts and years, case meta, education years, links.

### Tertiary (area tones)
- **Data Emerald** (tone-emerald): data engineering cards, nodes, JLL (current role) markers.
- **Ops Rose** (tone-rose): integration, microservices and ops.
- **Exploration Fuchsia** (tone-fuchsia): software, labs and personal work; paired with dashed borders and fuchsia-mist text.

### Neutral
- **Void** (void): page ground and section backgrounds. **Void Raised** (void-raised) behind the core disc.
- **Panel** (panel) for cards, dialogs and nodes; **Panel Raised** (panel-raised) and **Art Well** (art-well) for nested wells (project art, architecture panel).
- **Hairlines** (hairline, hairline-soft, hairline-strong): all borders and section dividers.
- **Starlight** (starlight) body text; pure white for headings and strong; **Soft / Muted / Faint** white alphas (74 / 58 / 52%) for secondary copy, metadata and mono notes.

### Named Rules
**The Two Lights Rule.** Indigo lights the world; emerald marks the person and the next action. A primary call to action is emerald; indigo is never a filled button.

**The One Tone Rule.** An area-coded element sets `--tone` / `--tone-rgb` once and derives tile icon, border glow, badge, dates and beams from it. Never hard-code a second area color into the same component.

**The Dashed Exploration Rule.** Dashed borders (fuchsia at 35–40%) mean synthetic or exploratory: labs, personal projects, the exploration node and its beam. Professional evidence is always solid-bordered.

## Typography

**Display Font:** Inter (with system-ui, Segoe UI)
**Body Font:** Inter
**Label/Mono Font:** JetBrains Mono (with ui-monospace, Cascadia Mono, Consolas)
**Wordmark Font:** Space Grotesk, wordmark only

**Character:** Inter set tight (-0.04em at display and headline sizes) reads engineered and calm; JetBrains Mono carries anything a machine would print: dates, stacks, counts, keys, ranges.

### Hierarchy
- **Display** (700, clamp 64–136px, 0.9): the hero name only, two lines, first in a white fade, second in an indigo-white-indigo gradient with a 1px indigo underline glow.
- **Role** (500, clamp 22–31px): the hero role line, flanked by mono `<Role>` tags at 14px in indigo-400 at 72% (hidden under 760px).
- **Headline** (600, clamp 34–52px, 1.05, -0.04em): section h2s; the closing phrase is a gradient word. Case dialog titles use clamp 30–42px.
- **Title** (600, 22px, -0.02em): arsenal and group headings; **Title-sm** (600, 17–19px) for project, career, education and case subheads.
- **Body** (400, 16px, 1.65); **Lede** (300, 16–17.5px, 1.7, max 60ch) for hero and section intros; panel copy at 14.5–15px, weight 300, 66–72% white.
- **Label** (JetBrains Mono 500, 12px, 0.06–0.16em tracking, uppercase for metadata rows): hero fact corners, footer meta, kind badges, result counts, form field labels, career dates.
- **Mono data** (JetBrains Mono 400, 13px): tech stacks, tool lists, education years (tabular numerals).

### Named Rules
**The Machine Print Rule.** Mono is for things a system would print (dates, stacks, counts, keyboard keys, lab values). Prose, names and actions stay in Inter.

**The Gradient Word Rule.** Each section headline may carry one gradient phrase (indigo-300 to white, 90deg) on its second half. Body text, buttons and labels never use gradient text.

**The Wordmark Rule.** Space Grotesk appears only in the "Caravantes AI" wordmark (600, 23px header, 17px footer).

## Layout

Single page, max width 1280px (`page`) with a fluid gutter (clamp 20–40px). Sections stack with clamp(88px, 11vw, 128px) block padding and a 5% white top hairline; headings sit 64px above content and are either centered or split (title left, legend or controls right, aligned to the bottom).

The hero is full-height (min 100svh, 680px floor) and centered, with true facts pinned to the bottom corners in mono uppercase. Below it, a four-column employer strip (uppercase company names, mono years) acts as a career summary. Content grids use a 24px gap: arsenal 2-up, professional cases 3-up, exploration 4-up, experience 4-up converging on a hub, education 0.8/1.2 split with a sticky heading, about and contact 1/1 splits.

Responsive steps: 1240px (exploration and timeline to 2-up, converge beams hidden), 1100px (contact to one column), 960px (menu toggle replaces nav, location line hidden, hub stacks), 760px (hero actions stack full width, corner facts stack under the actions, `<Role>` tags hidden), 380px (display drops to 56px). The project map has its own 700px breakpoint and scrolls horizontally on mobile.

## Elevation & Depth

Depth comes from light, not stacked shadows. Surfaces are flat dark panels separated by hairlines; what lifts an element is a colored glow beneath it, a translucent backdrop blur, or a soft radial light behind it. Black drop shadows appear only where an object must float over the void (node tiles at rest, the dialog).

### Shadow Vocabulary
- **Emerald lift** (`box-shadow: 0 14px 40px -14px rgba(66, 220, 180, 0.6)`): primary button hover.
- **Tone lift** (`box-shadow: 0 16px 34px -12px rgba(var(--tone-rgb), 0.55)`): atlas node tile hover/focus.
- **Node rest** (`box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.6)`): atlas node tiles at rest.
- **Core glow** (`box-shadow: 0 20px 50px -20px rgba(99, 102, 241, 0.55)`): the hub core disc and the experience orb.
- **Dialog float** (`box-shadow: 0 40px 120px -20px rgba(0, 0, 0, 0.9)`): the case dialog over a blurred 82% void backdrop.

### Named Rules
**The Light Is Depth Rule.** Lift is expressed with tone-colored glows, radial halos and blur. Hard offset shadows are not part of this world.

**The Corner Glow Rule.** Feature cards (arsenal, contact form) use a gradient border (tone at 45–50% from the top-left corner fading to 6% white) plus a blurred tone bloom in that same corner.

## Shapes

Soft-cornered and pill-driven. Large containers round at 24px (cards, dialog, education list, contact form), smaller panels at 20px (career cards, architecture and lab panels, project map), icon tiles at 16px (13px when 42px), node tiles at 18px, form controls and secondary buttons at 14px, close buttons at 12px, square-ish badges at 7px. Every chip, tag, filter, switch, nav item and primary action is a full pill (999px). Circles are reserved for the core, orb, rings and particles. Two open 64px corner brackets (26px radius) frame the hero name on desktop.

## Components

### Buttons
Confident pills that rise on hover.
- **Shape:** full pill (999px), 52px tall, 28px horizontal padding, 15px Inter 600.
- **Primary:** Caravantes Emerald on Emerald Ink; hover brightens, lifts 2px and casts the emerald lift; trailing icon nudges in its direction. Active scales to 0.97.
- **Glass:** 5% white fill, 12% white border, 10px backdrop blur, 86% white text; hover to 10% fill and white.
- **Light:** white on void, used for the form submit at 14px radius; hover to indigo-mist.
- **Compact variants:** header "Hablemos" (38px emerald pill), "Recorrer flujo" (40px emerald pill), share (40px glass pill), project "open" (44px, 14px radius, full width, 4% white).
- **Focus:** 2px indigo-300 outline, 3px offset, on every interactive element.

### Chips
- **Filter / view switch:** pills inside a 4px-padded hairline tray (3% white); inactive 64% white, active 10% white fill and white text; counts in mono indigo-300.
- **Tag:** 28px mono pill, hairline border, 72% white; tag buttons warm to the tone border on hover.
- **Area chip (active filter):** indigo 12% fill, indigo-400 40% border, pale indigo text.
- **Kind badge:** mono uppercase pill over project art with an 8px blur; lab and personal kinds use the dashed fuchsia treatment.
- **Area badge:** 7px-radius tone badge (10% fill, 30% border) naming the employers behind an arsenal card.

### Cards / Containers
- **Corner Style:** 24px (project, arsenal, contact), 20px (career, panels).
- **Background:** Panel, or Panel at 70–94% over the void.
- **Shadow Strategy:** flat; hover lifts 4px (cards) or shifts border to the tone at 35% (career). See Elevation.
- **Border:** 1px hairline-soft; feature cards use the corner-glow gradient border.
- **Internal Padding:** 32px feature cards, 24–28px content cards.
- **Project card:** 4:3 art well (tone radial glow, 18px dot grid, diagram SVG at 82% that scales to 105% on hover), body overlapping the art by 36px on professional cases, an area line in a tone badge below the title, mono context row, full-width open button.
- **Arsenal card:** 48px tone icon tile, employer badge, title, check list with tone-masked circle checks, a 4px tone dot orbiting the inner border every 12s.

### Inputs / Fields
- **Style:** 3% white fill, 12% white border, 14px radius, 14px × 16px padding, 15px white text; placeholder at 58% white; labels in mono uppercase muted.
- **Hover:** border to 22% white.
- **Focus:** 2px indigo-400 outline at 55%, 1px offset, border to indigo at 70%, fill to 5%.
- **Search:** 48px pill with leading icon and a mono `/` key cap; focus-within turns the border indigo.

### Navigation
Fixed, transparent over the hero; after scroll it compacts (22px to 14px block padding) and becomes 78% void with a 16px blur and a soft bottom hairline, and the mono location line under the wordmark fades out. Links are 14px Inter 500 pills at 66% white; active gets 6% white fill. Right side: ES/EN mono segmented pill, plain "CV" link, emerald "Hablemos" pill. Under 960px a 44px glass menu toggle opens the nav, which adds CV and Contact.

### Light Beam Hub (signature)
A 168px core (mark on a 96px disc with core glow, two counter-rotating rings, a breathing indigo halo) with four area nodes in the corners. SVG beams run from each node tile to the core: a 7px glow stroke at 32%, a 1.4px base at 62%, and a 2.6px pulse dash flowing every 3.2s; the exploration beam is dashed fuchsia. The experience section reuses the grammar: four career cards send tone beams down to an 80px orb labeled with today's role.

### Case Dialog
Native dialog, 1080px max, 24px radius, sticky header with a mono label and a 40px close button. Inside: case title, mono meta in indigo-300, lede, tags, an indigo disclosure box (synthetic/summary notice), an architecture panel of numbered nodes on a dot grid (active node indigo-bordered), and, for labs, a dashed fuchsia lab panel with range controls and tabular indigo metrics.

## Do's and Don'ts

### Do:
- **Do** keep the page on Void (#030305) with Panel (#0a0a0c) surfaces and 5–16% white hairlines.
- **Do** make every primary action an emerald pill with Emerald Ink text.
- **Do** set area color through `--tone` / `--tone-rgb` and derive borders, glows, badges and beams from it.
- **Do** use JetBrains Mono for dates, stacks, counts and lab values; tabular numerals for figures.
- **Do** express depth with tone glows, radial indigo light and backdrop blur, at 24px or 20px corners.
- **Do** mark synthetic and exploratory work with dashed fuchsia borders.
- **Do** stop every loop (particles, beams, orbits, rings, halos) and show all reveals under prefers-reduced-motion, and keep content visible without JavaScript.

### Don't:
- **Don't** show fabricated system telemetry: status lights, uptime, latency, version numbers or invented metrics.
- **Don't** place uppercase eyebrow or kicker labels above headings; a mono line above a career role is allowed only when it is the role's dates.
- **Don't** use emerald as atmosphere or indigo as a filled call to action.
- **Don't** use Space Grotesk outside the wordmark.
- **Don't** use stock photography; project imagery is diagrams drawn from the case itself.
- **Don't** use hard offset shadows or gradient fills on buttons and body text.
