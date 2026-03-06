# SFS Brand Guidelines
## Secured Financial Services

---

## Identity

**Full Name:** Secured Financial Services
**Abbreviation:** SFS
**Tagline:** Clarity. Compliance. Confidence.
**Target Clients:** Small businesses and individuals needing bookkeeping, tax preparation, financial reporting, and business advisory services.
**Brand Adjectives:** Trustworthy, authoritative, precise, approachable, steady

---

## Logo

**File:** `93352576-B8DB-4D09-9953-ADB3F239AAF8.PNG`

- Shield icon with "SFS" monogram — represents security and protection
- "SECURED FINANCIAL SERVICES" in bold serif small-caps
- "SERVICES" flanked by decorative horizontal rules
- Tagline in elegant serif italic: *Clarity. Compliance. Confidence.*

**Logo Usage Rules:**
- Always maintain clear space equal to the height of the "S" in "SFS" around all sides
- Never stretch, rotate, recolor, or add effects to the logo
- On dark backgrounds, use a white version of the logo
- Minimum width: 180px digital / 1.5 inches print

---

## Color Palette

| Name             | Hex       | Usage                                      |
|------------------|-----------|--------------------------------------------|
| Navy Primary     | `#2B3668` | Logo, headings, primary buttons, nav       |
| Navy Deep        | `#1E2748` | Footer, dark section backgrounds           |
| Navy Light       | `#3D4F8A` | Hover states, secondary accents            |
| Warm White       | `#F8F7F4` | Page backgrounds, card fills               |
| Soft Cream       | `#EEE9DF` | Section alternates, subtle borders         |
| Gold Accent      | `#B8972E` | Highlights, decorative rules, icon accents |
| Gold Light       | `#D4AE4A` | Hover on gold elements                     |
| Text Dark        | `#1A1A2E` | Body text, paragraphs                      |
| Text Mid         | `#4A4A6A` | Subtext, captions, metadata                |
| Border Subtle    | `#D8D4CC` | Dividers, card borders                     |

**Palette Logic:**
- Navy is the dominant color — used for authority and trust
- Gold is the accent — used sparingly for highlights, never as a background
- Warm white and cream replace pure white — they feel warmer and more premium
- Never use default Tailwind blue/indigo as substitutes

---

## Typography

### Heading Font: Cormorant Garamond
- Google Fonts: `Cormorant Garamond` (weights: 400, 500, 600, 700)
- Use for: H1, H2, H3, section titles, hero text
- Tracking: `-0.03em` on large headings
- Style: Elegant, authoritative, financial-grade serif

### Body Font: DM Sans
- Google Fonts: `DM Sans` (weights: 300, 400, 500)
- Use for: Body copy, nav links, buttons, captions, form labels
- Line-height: `1.75` on body text
- Style: Clean, modern, highly readable

### Monospace (numbers/data): DM Mono
- Google Fonts: `DM Mono` (weight: 400)
- Use for: Financial figures, stats, percentages, pricing
- Style: Precise, technical, trustworthy

### Type Scale
| Element      | Font               | Size      | Weight | Transform    |
|--------------|--------------------|-----------|--------|--------------|
| H1           | Cormorant Garamond | 56–72px   | 600    | none         |
| H2           | Cormorant Garamond | 40–48px   | 600    | none         |
| H3           | Cormorant Garamond | 28–32px   | 500    | none         |
| H4           | DM Sans            | 18–20px   | 500    | uppercase    |
| Body Large   | DM Sans            | 18px      | 400    | none         |
| Body         | DM Sans            | 16px      | 400    | none         |
| Caption      | DM Sans            | 13–14px   | 300    | none         |
| Data/Numbers | DM Mono            | 14–16px   | 400    | none         |
| Button       | DM Sans            | 14px      | 500    | uppercase    |

---

## Spacing System

Base unit: **8px**

| Token  | Value | Usage                          |
|--------|-------|--------------------------------|
| xs     | 8px   | Icon padding, tight gaps       |
| sm     | 16px  | Inner card padding, form gaps  |
| md     | 24px  | Component spacing              |
| lg     | 40px  | Section sub-spacing            |
| xl     | 64px  | Section padding (vertical)     |
| 2xl    | 96px  | Major section separators       |
| 3xl    | 128px | Hero/top section padding       |

**Max content width:** 1200px
**Content padding (mobile):** 20px sides
**Content padding (desktop):** 40px sides

---

## Shadow System

Never use flat `shadow-md`. Use layered, color-tinted shadows.

```css
/* Card shadow */
box-shadow:
  0 1px 2px rgba(43, 54, 104, 0.04),
  0 4px 12px rgba(43, 54, 104, 0.08),
  0 16px 32px rgba(43, 54, 104, 0.06);

/* Elevated shadow (hover, modal) */
box-shadow:
  0 2px 4px rgba(43, 54, 104, 0.06),
  0 8px 24px rgba(43, 54, 104, 0.12),
  0 24px 48px rgba(43, 54, 104, 0.08);

/* Floating shadow (dropdown, tooltip) */
box-shadow:
  0 4px 8px rgba(43, 54, 104, 0.08),
  0 16px 40px rgba(43, 54, 104, 0.16);
```

---

## Border Radius

| Element          | Radius  |
|------------------|---------|
| Buttons          | 4px     |
| Cards            | 8px     |
| Input fields     | 4px     |
| Image containers | 6px     |
| Badges/Tags      | 2px     |
| Modals           | 10px    |

Sharp and restrained — this is a financial firm, not a startup.

---

## Button Styles

**Primary Button**
- Background: `#2B3668`
- Text: `#F8F7F4`
- Border: none
- Hover: `#1E2748` + translate Y -1px
- Active: `#1E2748` + translate Y 0

**Secondary Button**
- Background: transparent
- Border: 1.5px solid `#2B3668`
- Text: `#2B3668`
- Hover: Background `#2B3668`, text `#F8F7F4`

**Gold CTA Button**
- Background: `#B8972E`
- Text: `#F8F7F4`
- Use sparingly — only for the most important call to action per page

All buttons: letter-spacing `0.08em`, uppercase, DM Sans 500, 14px.

---

## Motion & Animation

- **Only animate:** `transform` and `opacity` — never `transition-all`
- **Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-out) for entrances
- **Duration:** 300ms interactions, 500–700ms page load reveals
- **Staggered reveals:** Use `animation-delay` in 100ms increments for lists/cards
- **Hover lifts:** `translateY(-2px)` on cards, `translateY(-1px)` on buttons
- No bounce, no spin, no dramatic effects — this is a financial brand

---

## Backgrounds & Depth

**Surface layering system:**
1. Base: `#F8F7F4` (warm white)
2. Elevated: `#FFFFFF` (pure white for cards)
3. Floating: `#FFFFFF` + shadow (modals, dropdowns)

**Dark sections** (footer, hero variants): `#1E2748` background with `#F8F7F4` text

**Texture:** Subtle SVG grain/noise filter at 3–5% opacity to add depth to hero sections

**Decorative elements:** Thin horizontal gold rules (`#B8972E`, 1px, 40–60px wide) as section dividers or heading underlines — echoing the logo style

---

## Imagery Guidelines

- Photography should feel professional, human, and warm — not stock-generic
- Apply a gradient overlay: `linear-gradient(to top, rgba(30,39,72,0.7), transparent)`
- Tint layer: navy at 15–20% opacity with `mix-blend-multiply`
- Avoid cliche money/calculator imagery — prefer people, offices, handshakes

---

## Voice & Tone

| Do                                          | Don't                                |
|---------------------------------------------|--------------------------------------|
| "We help you understand your numbers."      | "Leverage synergistic financial KPIs"|
| "Tax season, handled."                      | "Comprehensive holistic tax solutions"|
| "Your books, clean and current."            | "Best-in-class bookkeeping services" |
| Direct, confident, clear                    | Jargon-heavy, vague, corporate-bland |

**Tone pillars:** Trustworthy, Precise, Human, Calm

---

## Services Reference

1. Bookkeeping
2. Tax Preparation
3. Financial Reporting
4. Business Advisory
