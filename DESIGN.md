---
name: "Hyprnx Portfolio"
description: "Personal portfolio for To Duc Anh — cutting-edge data engineer, transmitted from the deep."
colors:
  void: "#0f1318"
  surface: "#181d23"
  raised: "#222930"
  border: "#2e3640"
  text-primary: "#e8ecef"
  text-secondary: "#a8b2bc"
  text-muted: "#6e7a86"
  signal-cyan: "#4ec8d4"
  signal-cyan-dim: "#2a8a96"
  beacon-gold: "#d4a84e"
  beacon-gold-bright: "#e0be6e"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
  section: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.beacon-gold}"
    textColor: "{colors.void}"
    rounded: "{rounded.md}"
    padding: "0.875rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.beacon-gold-bright}"
    textColor: "{colors.void}"
    rounded: "{rounded.md}"
    padding: "0.875rem 2rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "0.875rem 2rem"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "0.875rem 2rem"
  nav-bar:
    backgroundColor: "oklch(8% 0.015 230 / 0.85)"
    textColor: "{colors.text-secondary}"
    padding: "1.25rem 1.5rem"
  skill-tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "0.375rem 0.875rem"
  skill-tag-accent:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.signal-cyan}"
    rounded: "{rounded.sm}"
    padding: "0.375rem 0.875rem"
  stat-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "3rem"
  contact-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "3rem"
---

# Design System: Hyprnx Portfolio

## 1. Overview

**Creative North Star: "The Deep Signal"**

Something transmitting from far away that rewards those who tune in. The origin is mysterious; the message is clear; the presence is unmistakable. This system treats the portfolio not as a document but as a transmission: a signal broadcast from a mind that builds infrastructure at scale and thinks in futures.

The visual language is dark, atmospheric, and deliberately restrained. Depth comes from tonal layering and ambient light, not from stacked shadows or busy decoration. Every surface sits in a void-like space where subtle cyan glows drift like distant nebulae, and a single warm gold frequency cuts through as the call to action. The effect is cinematic without being theatrical.

This system explicitly rejects: generic AI-generated portfolio templates, static lifeless backgrounds, Bootstrap resume layouts, particle effects as decoration, corporate SaaS hero-metric grids, and the "developer dark mode with neon green" reflex. If someone could guess the palette from the category name alone, the design has failed.

**Key Characteristics:**
- Tonal depth over shadow elevation. Surfaces are distinguished by lightness steps, not drop shadows.
- Dual-frequency color: cool cyan signal + warm gold beacon. Everything else is tinted neutral.
- Monospace labels as system voice. JetBrains Mono carries metadata, navigation cues, and technical markers.
- Living backgrounds. Grid lines, ambient glows, and scanline textures create an environment that breathes.
- Bold type at display scale, restrained everywhere else. The hierarchy is steep and intentional.

## 2. Colors

A committed dual-frequency palette: cool cyan carries identity and information; warm gold carries action and urgency. Everything else is void, tinted toward hue 230 (a blue-gray that reads as deep space, not flat black).

### Primary
- **Signal Cyan** (oklch(75% 0.15 220) · approx #4ec8d4): The signature frequency. Used for the logo, section labels, accent text, timeline dots, stat numbers, and interactive link states. It is the voice of the system.
- **Signal Cyan Dim** (oklch(55% 0.1 220) · approx #2a8a96): Quieter variant for secondary accent contexts and glow falloffs.

### Secondary
- **Beacon Gold** (oklch(78% 0.14 85) · approx #d4a84e): The only warm color in the entire system. Reserved exclusively for primary call-to-action buttons and their glow halos. Its rarity is the point.
- **Beacon Gold Bright** (oklch(83% 0.14 85) · approx #e0be6e): Hover state for gold CTAs. Slightly lifted lightness, same hue.

### Neutral
- **Void** (oklch(8% 0.015 230) · approx #0f1318): The deepest background. The body itself. Not pure black; tinted toward hue 230 so it reads as space, not absence.
- **Surface** (oklch(12% 0.012 230) · approx #181d23): Cards, panels, raised containers. One step up from the void.
- **Raised** (oklch(16% 0.01 230) · approx #222930): Hover states on surfaces, tertiary elevation.
- **Border** (oklch(22% 0.015 230) · approx #2e3640): Dividers, card outlines, grid lines. Visible but never dominant.
- **Text Primary** (oklch(93% 0.01 230) · approx #e8ecef): Headings and primary body text. Not pure white; slightly cool.
- **Text Secondary** (oklch(72% 0.01 230) · approx #a8b2bc): Body paragraphs, descriptions, nav links at rest.
- **Text Muted** (oklch(52% 0.01 230) · approx #6e7a86): Timestamps, tertiary labels, stat descriptions. Recedes deliberately.

### Named Rules
**The Dual Frequency Rule.** Cyan is information. Gold is action. These two hues never swap roles, never blend into each other, and never appear on the same element. Their separation is what makes each one legible.

**The Tinted Void Rule.** No pure black (#000) and no pure white (#fff) anywhere in the system. Every neutral carries a trace of hue 230. This is what makes the palette feel like a place instead of a page.

## 3. Typography

**Display Font:** Inter (with system-ui, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace fallback)

**Character:** Inter at weight 900 is blunt and architectural at display scale, precise and readable at body scale. JetBrains Mono acts as the system's secondary voice: it speaks in labels, navigation markers, dates, and technical metadata. The pairing reads as "engineered editorial": confident enough for a magazine cover, precise enough for a terminal.

### Hierarchy
- **Display** (900, clamp(2.75rem, 7vw, 6rem), line-height 1.05, tracking -0.03em): Hero headings only. One per page. The loudest element in the system.
- **Headline** (900, clamp(2rem, 4.5vw, 3.5rem), line-height 1.1, tracking -0.02em): Section headings. Still bold, but a clear step down from display.
- **Title** (700, 1.5rem, line-height 1.25): Project titles, timeline roles, contact heading. Mid-hierarchy anchor.
- **Body** (400, 1.125rem, line-height 1.75, max-width 60ch): Paragraphs and descriptions. Generous line-height for readability against dark backgrounds.
- **Label** (JetBrains Mono 500, 0.75rem, line-height 1.4, tracking 0.1em, uppercase): Section markers, nav links, dates, tag text. The system's metadata voice.

### Named Rules
**The Two-Voice Rule.** Inter speaks in sentences. JetBrains Mono speaks in labels. Never use Inter for metadata. Never use JetBrains Mono for paragraphs. The boundary is absolute.

**The Steep Hierarchy Rule.** Display is 4-8x the size of Label. There is no gentle ramp. The scale jumps are dramatic and intentional; they create visual gravity that pulls the eye to what matters.

## 4. Elevation

This system is flat by doctrine. There are no box-shadows anywhere. Depth is conveyed entirely through tonal layering: Void → Surface → Raised, each a 4% lightness step in OKLCH. The effect is subtle and spatial, like objects receding into fog rather than floating above a plane.

Ambient depth comes from two fixed radial glows (cyan and violet, heavily blurred, slowly drifting) that sit behind all content at z-index 0. These are environmental light, not element-level elevation. A grid-line texture and scanline overlay add further spatial texture without implying hierarchy.

### Named Rules
**The No-Shadow Rule.** Shadows are prohibited. If an element needs to feel elevated, increase its background lightness by one tonal step. If it needs to feel interactive, add a border-color transition or a glow halo on the accent color. Shadows would break the void.

**The Living Void Rule.** The background is never static. Ambient glows drift on slow easing curves (20-25s cycles). The grid fades via radial mask. Scanlines add CRT texture. These layers are fixed-position and pointer-events: none; they create atmosphere without interfering with content.

## 5. Components

### Buttons
- **Shape:** Gently squared (6px radius). Not pill-shaped, not sharp. Confident without being aggressive.
- **Primary (Beacon Gold):** Gold background, void text, 700 weight, 0.9375rem. Padding 0.875rem 2rem. The only warm element on any screen.
- **Hover:** Background lifts to Beacon Gold Bright. A 30px gold glow halo fades in via box-shadow transition (0.2s). The glow is the only "shadow" in the system, and it's colored, not gray.
- **Ghost:** Transparent background, 1px border in Border color, Text Secondary text, 600 weight. Hover shifts border to Text Muted and text to Text Primary. No glow.
- **Inline Link (Mono):** JetBrains Mono 0.8125rem, Signal Cyan, with a small arrow SVG. Hover shifts to Text Primary. Used for project links and "view more" actions.

### Skill Tags
- **Style:** JetBrains Mono 0.75rem, 500 weight. Surface background, Border outline, 4px radius. Compact padding (0.375rem 0.875rem).
- **Accent Variant:** Border tinted cyan at 30% opacity, text in Signal Cyan. Used for primary/featured skills.
- **Hover:** Border-color and text-color transition (0.2s). Subtle, not dramatic.

### Cards / Containers
- **Corner Style:** Softly rounded (8px radius). Consistent across stat cards, project cards, and the contact block.
- **Background:** Surface color. One tonal step above the void.
- **Shadow Strategy:** None. Prohibited. Depth comes from the tonal step and the 1px Border outline.
- **Border:** 1px solid Border color on all sides. No colored stripes, no partial borders.
- **Internal Padding:** 1.5rem for compact cards (stats), 3rem for feature cards (projects, contact).

### Stat Cards
- **Layout:** 2x2 grid within the about section. Each card shows a monospace number in Signal Cyan (2rem, 700) and a muted label below (0.8125rem, Text Muted).
- **Character:** Data readout, not decoration. The numbers should feel like instrument readings.

### Project Cards
- **Layout:** Full-width, internally split into a 1fr/1fr grid (meta left, tags right). Collapses to single column on mobile.
- **Content:** Title (700, 1.5rem), description (Text Secondary, 1rem), highlight list with cyan monospace markers, and a mono inline link.
- **Tags:** Monospace 0.6875rem, Border outline, 3px radius, Text Muted. Metadata, not decoration.

### Navigation
- **Style:** Fixed top, full-width. Background is Void at 85% opacity with 12px backdrop blur. 1px Border bottom.
- **Logo:** JetBrains Mono 700, 1.125rem, Signal Cyan. Left-aligned.
- **Links:** Inter 0.875rem, 500 weight, Text Secondary. Hover transitions to Text Primary (0.2s).
- **Mobile:** Links collapse behind a burger icon. Expanded state is a full-width dropdown with the same blur treatment, 1px border bottom.

### Timeline
- **Structure:** Left-aligned vertical line (1px, Border color) with 9px circular dots. Active dots in Signal Cyan; past dots in Text Muted.
- **Content:** Date in mono label style (Signal Cyan or Text Muted), role as Title, org as muted text, description as Body.
- **Rhythm:** 3rem padding between items. The line and dots create a visual spine without dominating.

### Contact Block
- **Style:** Full-width card (Surface background, Border outline, 8px radius, 3rem padding). Contains a headline, body text, and an action row with Primary + Ghost buttons side by side.

## 6. Do's and Don'ts

### Do:
- **Do** use OKLCH for all color definitions. Hex approximations exist for tooling compatibility; OKLCH is canonical.
- **Do** tint every neutral toward hue 230. Even the lightest text carries a trace of the void's color temperature.
- **Do** use JetBrains Mono for all metadata: nav links, section labels, dates, tags, stat numbers, inline code references.
- **Do** keep ambient background layers (grid, glows, scanlines) at fixed position with pointer-events: none. They are environment, not content.
- **Do** respect `prefers-reduced-motion`: disable all ambient animations, glow drift, and reveal transitions.
- **Do** use the gold CTA sparingly. One, maybe two instances per page. Its power comes from scarcity.
- **Do** let content breathe. Section padding is 7rem. Paragraphs max at 60ch. Line-height is 1.75 for body text on dark backgrounds.

### Don't:
- **Don't** use box-shadows. Anywhere. For any reason. Tonal steps and colored glow halos replace them entirely.
- **Don't** use pure black (#000) or pure white (#fff). The Tinted Void Rule is absolute.
- **Don't** use generic AI-generated portfolio templates. "If it looks like someone typed 'make me a portfolio' into a chatbot, it's failed" (PRODUCT.md).
- **Don't** use static, lifeless backgrounds. "The site should breathe" (PRODUCT.md).
- **Don't** use Bootstrap or template-kit resume layouts. "The initial version of this site was exactly that. We're done with it" (PRODUCT.md).
- **Don't** use particle effects as decoration. "The second version's particle.js was decoration without purpose" (PRODUCT.md).
- **Don't** use hero-metric grids with big numbers, small labels, and gradient accents. That's the SaaS cliché.
- **Don't** default to "developer dark mode with neon green on black." That's the training-data reflex for this category (PRODUCT.md).
- **Don't** use border-left or border-right greater than 1px as colored accent stripes on cards or list items.
- **Don't** use gradient text (background-clip: text with gradient). Emphasis comes from weight and scale, not color tricks.
- **Don't** swap cyan and gold roles. Cyan is information; gold is action. The Dual Frequency Rule is non-negotiable.
