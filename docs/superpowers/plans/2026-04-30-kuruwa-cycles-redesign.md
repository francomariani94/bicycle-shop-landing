# Kuruwa Cycles Landing Page Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current "Fran's Bike Atelier" landing page with the "Kuruwa Cycles" design from `landing-design.pen`, updating all components, styling, fonts, colors, and content.

**Architecture:** This is a full visual redesign of an existing Astro + Tailwind site. We modify every existing component file and the shared config/layout. The page structure changes from 4 content sections (Hero, Services, About, Contact) to 6 sections (Hero, Services, Philosophy, Testimonials, CTA, Footer). Two new components are added (Testimonials, CTA), the About component is replaced by Philosophy, and the Contact component is removed (contact is now a CTA section with buttons). The hero image and workshop image from the .pen file are already exported to `images/`.

**Tech Stack:** Astro 6, Tailwind CSS 3, Google Fonts (Anton, Inter, Geist Mono), Playwright (tests)

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/config.ts` | Update brand name, tagline, remove whatsapp/formspree |
| Modify | `src/layouts/Layout.astro` | Update fonts (Anton, Inter, Geist Mono), title, body bg |
| Modify | `src/styles/global.css` | Add CSS custom properties for design tokens |
| Modify | `tailwind.config.mjs` | Update font families and colors |
| Modify | `src/components/Nav.astro` | Dark transparent nav with Kuruwa Cycles branding |
| Modify | `src/components/Hero.astro` | Full-bleed image hero with Anton headline |
| Modify | `src/components/Services.astro` | 3-column cards with Lucide icons |
| Rewrite | `src/components/About.astro` → Philosophy section | 2-col layout with image, text, stats |
| Create | `src/components/Testimonials.astro` | 3 testimonial cards |
| Rewrite | `src/components/Contact.astro` → CTA section | Dark CTA with two buttons |
| Modify | `src/components/Footer.astro` | 3-column footer with nav, hours, copyright |
| Modify | `src/pages/index.astro` | Add Testimonials and CTA, remove old Contact |
| Modify | `tests/smoke.spec.ts` | Update title check |
| Modify | `tests/hero.spec.ts` | Update hero CTA selectors |
| Modify | `tests/services.spec.ts` | Update for 3-card layout |
| Modify | `tests/about.spec.ts` | Update for Philosophy section |
| Modify | `tests/contact.spec.ts` | Update for CTA section |
| Modify | `tests/nav.spec.ts` | Update for new nav links |
| Modify | `tests/footer.spec.ts` | Update for new footer structure |

---

### Task 1: Update Config, Tailwind, Layout, and Global Styles

**Files:**
- Modify: `src/config.ts`
- Modify: `tailwind.config.mjs`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update `src/config.ts`**

```typescript
export const SITE = {
  name: "Kuruwa Cycles",
  tagline: "Honest bike care, one ride at a time",
  year: new Date().getFullYear(),
};
```

- [ ] **Step 2: Update `tailwind.config.mjs`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#C8372D',
        'fg-primary': '#1A1A1A',
        'fg-secondary': '#666666',
        'surface-dark': '#1A1A1A',
        'surface-warm': '#F5F3F0',
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Update `src/styles/global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 4: Update `src/layouts/Layout.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Kuruwa Cycles",
  description = "Honest bike care, one ride at a time.",
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Geist+Mono:wght@400;500&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-white text-fg-primary font-body">
    <slot />
  </body>
</html>
```

- [ ] **Step 5: Commit**

```bash
git add src/config.ts tailwind.config.mjs src/styles/global.css src/layouts/Layout.astro
git commit -m "feat: update config, fonts, and design tokens for Kuruwa Cycles redesign"
```

---

### Task 2: Nav Component

**Files:**
- Modify: `src/components/Nav.astro`

- [ ] **Step 1: Rewrite `src/components/Nav.astro`**

The nav overlays the hero image with transparent background. White text, Geist Mono font, spaced links.

```astro
<nav class="absolute top-0 left-0 right-0 z-50 px-16 py-10 flex justify-between items-center">
  <span class="font-mono text-sm font-medium text-white tracking-[3px]">KURUWA CYCLES</span>
  <div class="flex items-center gap-8">
    <a href="#services" class="font-mono text-xs text-white tracking-[2px] hover:opacity-70 transition-opacity">SERVICES</a>
    <a href="#about" class="font-mono text-xs text-white tracking-[2px] hover:opacity-70 transition-opacity">ABOUT</a>
    <a href="#contact" class="font-mono text-xs text-white tracking-[2px] hover:opacity-70 transition-opacity">BOOK NOW</a>
  </div>
</nav>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: redesign Nav with transparent overlay for hero"
```

---

### Task 3: Hero Component

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Rewrite `src/components/Hero.astro`**

Full-bleed background image hero. Large Anton headline "YOUR BIKE DESERVES CARE". Subtitle + red CTA button. The hero image is at `/images/generated-1777548324583.png` — copy it to `public/hero.jpg` first.

```bash
cp images/generated-1777548324583.png public/hero.jpg
```

```astro
<section id="hero" class="relative min-h-screen flex flex-col justify-between overflow-hidden">
  <div class="absolute inset-0 z-0">
    <img src="/hero.jpg" alt="" class="w-full h-full object-cover" aria-hidden="true" />
    <div class="absolute inset-0 bg-black/40"></div>
  </div>

  <div class="relative z-10 flex-1"></div>

  <div class="relative z-10 px-16 pb-16 flex flex-col gap-8 max-w-3xl">
    <h1 class="font-display text-[120px] leading-[0.9] text-white">
      YOUR BIKE<br />DESERVES CARE
    </h1>
    <div class="max-w-lg flex flex-col gap-6">
      <p class="font-body text-lg text-white/90 leading-relaxed">
        I fix bikes the way I'd want mine fixed — with patience, honesty, and real attention to detail.
      </p>
      <div>
        <a
          href="#contact"
          class="inline-block bg-accent text-white font-mono text-[13px] font-medium tracking-[2px] px-8 py-4 hover:bg-red-700 transition-colors"
        >
          GET IN TOUCH
        </a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro public/hero.jpg
git commit -m "feat: redesign Hero with full-bleed image and Anton headline"
```

---

### Task 4: Services Component

**Files:**
- Modify: `src/components/Services.astro`

- [ ] **Step 1: Rewrite `src/components/Services.astro`**

3 service cards in a row. Each has a Lucide icon (rendered as inline SVG), uppercase title, and description. Section label "SERVICES" + large "HOW CAN I HELP?" heading.

```astro
---
const services = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    title: 'TUNE-UP',
    description: "Shifts not feeling right? Brakes squeaking? I'll go through everything and get your ride feeling smooth again.",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>`,
    title: 'RESTORATION',
    description: "Got an old bike collecting dust? I love bringing them back to life — cleaning, rebuilding, and making them rideable again.",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    title: 'CUSTOM BUILD',
    description: "Want something built just for you? I'll help pick the right parts and put it all together, piece by piece.",
  },
];
---

<section id="services" class="bg-white px-[120px] py-20">
  <p class="font-mono text-xs text-fg-secondary tracking-[3px] mb-16">SERVICES</p>
  <h2 class="font-display text-[80px] leading-[0.95] text-fg-primary mb-16">HOW CAN I HELP?</h2>

  <div class="grid grid-cols-3 gap-12">
    {services.map((s) => (
      <div class="flex flex-col gap-5 py-8">
        <div class="text-fg-primary" set:html={s.icon} />
        <h3 class="font-body text-lg font-semibold text-fg-primary tracking-[1px]">{s.title}</h3>
        <p class="font-body text-[15px] text-fg-secondary leading-relaxed">{s.description}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Services.astro
git commit -m "feat: redesign Services with 3-column icon cards"
```

---

### Task 5: Philosophy (About) Component

**Files:**
- Modify: `src/components/About.astro`

- [ ] **Step 1: Copy workshop image to public**

```bash
cp images/generated-1777548305835.png public/workshop.jpg
```

- [ ] **Step 2: Rewrite `src/components/About.astro`**

Warm beige background. "MY APPROACH" label with horizontal rule. Large "EVERY BIKE IS PERSONAL" headline. Two columns: left has two paragraphs, right has workshop image and 3 stats.

```astro
<section id="about" class="bg-surface-warm px-[120px] py-20">
  <div class="flex items-center gap-6 mb-16">
    <p class="font-mono text-xs text-fg-secondary tracking-[3px] whitespace-nowrap">MY APPROACH</p>
    <div class="flex-1 h-px bg-fg-secondary/30"></div>
  </div>

  <div class="mb-16">
    <h2 class="font-display text-[120px] leading-[0.9] text-fg-primary tracking-tight">EVERY BIKE</h2>
    <h2 class="font-display text-[120px] leading-[0.9] text-fg-primary tracking-tight">IS PERSONAL</h2>
  </div>

  <div class="grid grid-cols-2 gap-20">
    <div class="flex flex-col gap-6">
      <p class="font-body text-base text-fg-primary leading-[1.7]">
        I treat every bike that comes through my door the way I'd want mine treated. No rushing, no cutting corners. I take my time, I pay attention, and I make sure everything feels right before it goes back to you.
      </p>
      <p class="font-body text-base text-fg-secondary leading-[1.7]">
        Whether it's your daily commuter or something you've had in the garage for years — it gets the same care. I'm not the fastest shop in town, but I'll make sure it's done right.
      </p>
    </div>

    <div class="flex flex-col gap-6">
      <img
        src="/workshop.jpg"
        alt="Kuruwa Cycles workshop"
        class="w-full h-[360px] object-cover"
      />
      <div class="flex gap-10">
        <div class="flex flex-col gap-1">
          <span class="font-display text-4xl text-fg-primary">EVERY</span>
          <span class="font-mono text-[11px] text-fg-secondary tracking-[2px]">BIKE MATTERS</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-display text-4xl text-fg-primary">NO</span>
          <span class="font-mono text-[11px] text-fg-secondary tracking-[2px]">SHORTCUTS</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-display text-4xl text-fg-primary">REAL</span>
          <span class="font-mono text-[11px] text-fg-secondary tracking-[2px]">CARE</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/About.astro public/workshop.jpg
git commit -m "feat: redesign About as Philosophy section with 2-col layout"
```

---

### Task 6: Testimonials Component

**Files:**
- Create: `src/components/Testimonials.astro`

- [ ] **Step 1: Create `src/components/Testimonials.astro`**

3 testimonial cards on white background. Each card has warm beige background, quote text, author name, and context line.

```astro
---
const testimonials = [
  {
    quote: "\u201CHe brought my old bike back from the dead. I honestly thought it was done for, but he took his time and now it rides better than when I bought it.\u201D",
    name: "MARCO T.",
    context: "Brought in a rusty road bike",
  },
  {
    quote: "\u201CSuper fair price and he actually explained what was wrong instead of just handing me a bill. My commute has never felt smoother.\u201D",
    name: "SARAH K.",
    context: "Needed a full tune-up",
  },
  {
    quote: "\u201CI wanted a gravel bike built just for me. He helped me pick every part, stayed in budget, and the result is exactly what I wanted.\u201D",
    name: "DAVID L.",
    context: "First custom build",
  },
];
---

<section class="bg-white px-[120px] py-20">
  <div class="flex flex-col items-center gap-16 mb-16">
    <p class="font-mono text-xs text-fg-secondary tracking-[3px]">FROM HAPPY RIDERS</p>
    <h2 class="font-display text-[64px] text-fg-primary tracking-tight text-center leading-tight">DON'T TAKE MY WORD FOR IT</h2>
  </div>

  <div class="grid grid-cols-3 gap-8">
    {testimonials.map((t) => (
      <div class="bg-surface-warm p-8 flex flex-col gap-5">
        <p class="font-body text-[15px] text-fg-primary leading-[1.7]">{t.quote}</p>
        <div class="flex flex-col gap-1">
          <span class="font-body text-[13px] font-semibold text-fg-primary">{t.name}</span>
          <span class="font-mono text-[11px] text-fg-secondary">{t.context}</span>
        </div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Testimonials.astro
git commit -m "feat: add Testimonials component with 3 review cards"
```

---

### Task 7: CTA Component (replaces Contact)

**Files:**
- Modify: `src/components/Contact.astro`

- [ ] **Step 1: Rewrite `src/components/Contact.astro`**

Dark background CTA section. "LET'S DO THIS" label, huge "BRING YOUR BIKE OVER" headline, subtitle, two buttons (filled red + outlined white), divider line at bottom.

```astro
<section id="contact" class="bg-surface-dark px-[120px] py-20 flex flex-col items-center gap-10">
  <p class="font-mono text-xs text-fg-secondary tracking-[3px]">LET'S DO THIS</p>

  <div class="flex flex-col items-center">
    <h2 class="font-display text-[140px] leading-[0.9] text-white tracking-tight text-center">BRING YOUR</h2>
    <h2 class="font-display text-[140px] leading-[0.9] text-white tracking-tight text-center">BIKE OVER</h2>
  </div>

  <p class="font-body text-lg text-fg-secondary leading-relaxed text-center">
    Drop it off, tell me what's bugging you, and I'll take care of the rest.
  </p>

  <div class="flex items-center gap-6">
    <a
      href="#contact"
      class="bg-accent text-white font-mono text-sm font-medium tracking-[2px] px-12 py-[18px] hover:bg-red-700 transition-colors"
    >
      GET IN TOUCH
    </a>
    <a
      href="mailto:hello@kuruwacycles.com"
      class="border border-white text-white font-mono text-sm font-medium tracking-[2px] px-12 py-[18px] hover:bg-white/10 transition-colors"
    >
      SEND A MESSAGE
    </a>
  </div>

  <div class="w-full h-px bg-[#333333] mt-10"></div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: replace Contact form with CTA section"
```

---

### Task 8: Footer Component

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Rewrite `src/components/Footer.astro`**

Dark footer with 3-column top row (brand + tagline, navigation links, hours), divider, bottom row (copyright + "Made with care").

```astro
---
import { SITE } from '../config';
---

<footer class="bg-surface-dark px-[120px] py-10">
  <div class="flex justify-between mb-8">
    <div class="flex flex-col gap-3">
      <span class="font-display text-2xl text-white">KURUWA CYCLES</span>
      <span class="font-body text-sm text-fg-secondary">{SITE.tagline}</span>
    </div>

    <div class="flex gap-16">
      <div class="flex flex-col gap-3">
        <span class="font-mono text-[11px] text-fg-secondary tracking-[2px]">NAVIGATE</span>
        <a href="#services" class="font-body text-sm text-white hover:opacity-70 transition-opacity">Services</a>
        <a href="#about" class="font-body text-sm text-white hover:opacity-70 transition-opacity">About</a>
        <a href="#contact" class="font-body text-sm text-white hover:opacity-70 transition-opacity">Book Now</a>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-mono text-[11px] text-fg-secondary tracking-[2px]">CONNECT</span>
        <span class="font-body text-sm text-white">Instagram</span>
        <span class="font-body text-sm text-white">Email</span>
        <span class="font-body text-sm text-white">Location</span>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <span class="font-mono text-[11px] text-fg-secondary tracking-[2px]">HOURS</span>
      <span class="font-body text-sm text-white">Tue &ndash; Sat: 9AM &ndash; 6PM</span>
      <span class="font-body text-sm text-white">Sun &ndash; Mon: Closed</span>
    </div>
  </div>

  <div class="h-px bg-[#333333] mb-8"></div>

  <div class="flex justify-between">
    <span class="font-mono text-[11px] text-fg-secondary">&copy; {SITE.year} Kuruwa Cycles. All rights reserved.</span>
    <span class="font-mono text-[11px] text-fg-secondary">Made with care</span>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: redesign Footer with 3-column layout and hours"
```

---

### Task 9: Update Page Assembly

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Update `src/pages/index.astro`**

Add the new Testimonials component and reorder sections. The Nav now overlays the Hero (both inside a wrapper or Nav is absolutely positioned so it doesn't need a separate slot).

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import About from '../components/About.astro';
import Testimonials from '../components/Testimonials.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---

<Layout>
  <Nav />
  <main>
    <Hero />
    <Services />
    <About />
    <Testimonials />
    <Contact />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add Testimonials to page assembly"
```

---

### Task 10: Update Tests

**Files:**
- Modify: `tests/smoke.spec.ts`
- Modify: `tests/hero.spec.ts`
- Modify: `tests/services.spec.ts`
- Modify: `tests/about.spec.ts`
- Modify: `tests/contact.spec.ts`
- Modify: `tests/nav.spec.ts`
- Modify: `tests/footer.spec.ts`

- [ ] **Step 1: Update `tests/smoke.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test('page has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Kuruwa Cycles/);
});

test('page has meta description', async ({ page }) => {
  await page.goto('/');
  const meta = page.locator('meta[name="description"]');
  await expect(meta).toHaveAttribute('content', /.+/);
});
```

- [ ] **Step 2: Update `tests/hero.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test('hero section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#hero')).toBeVisible();
});

test('hero has CTA button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#hero a[href="#contact"]')).toBeVisible();
});
```

- [ ] **Step 3: Update `tests/nav.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test('nav has brand name', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav')).toContainText('KURUWA CYCLES');
});

test('nav has navigation links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href="#services"]')).toBeVisible();
  await expect(page.locator('nav a[href="#about"]')).toBeVisible();
  await expect(page.locator('nav a[href="#contact"]')).toBeVisible();
});
```

- [ ] **Step 4: Update `tests/services.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test('services section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#services')).toBeVisible();
});

test('services section has 3 service cards', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#services');
  await expect(section).toContainText('TUNE-UP');
  await expect(section).toContainText('RESTORATION');
  await expect(section).toContainText('CUSTOM BUILD');
});
```

- [ ] **Step 5: Update `tests/about.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test('philosophy section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#about')).toBeVisible();
});

test('philosophy section has headline', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#about');
  await expect(section).toContainText('EVERY BIKE');
  await expect(section).toContainText('IS PERSONAL');
});
```

- [ ] **Step 6: Update `tests/contact.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test('CTA section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#contact')).toBeVisible();
});

test('CTA section has action buttons', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#contact');
  await expect(section).toContainText('GET IN TOUCH');
  await expect(section).toContainText('SEND A MESSAGE');
});
```

- [ ] **Step 7: Update `tests/footer.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test('footer is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer')).toBeVisible();
});

test('footer has brand and copyright', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer).toContainText('KURUWA CYCLES');
  await expect(footer).toContainText('All rights reserved');
});
```

- [ ] **Step 8: Run all tests**

```bash
npx playwright test
```

Expected: All tests pass.

- [ ] **Step 9: Commit**

```bash
git add tests/
git commit -m "test: update all tests for Kuruwa Cycles redesign"
```

---

### Task 11: Visual Verification and Responsive Polish

- [ ] **Step 1: Start dev server and verify**

```bash
npm run dev
```

Open `http://localhost:4321` and verify each section matches the design.

- [ ] **Step 2: Build and verify no errors**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: visual polish and responsive adjustments"
```
