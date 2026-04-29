# Fran's Bike Atelier — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page static website for Fran's Bike Atelier with Bold & Urban styling, a WhatsApp contact button, and a Formspree email form.

**Architecture:** Astro static site with Tailwind CSS. Each page section is an isolated Astro component assembled in `src/pages/index.astro`. Contact is fully client-side: a `wa.me` link for WhatsApp and Formspree for email. Playwright handles end-to-end tests against the local dev server.

**Tech Stack:** Astro 4, Tailwind CSS 3, Formspree, Playwright, Vercel

---

## File Map

| File | Responsibility |
|---|---|
| `astro.config.mjs` | Astro config with Tailwind integration |
| `tailwind.config.mjs` | Color palette and font config |
| `playwright.config.ts` | Playwright test runner config |
| `src/config.ts` | Site-wide constants (phone, Formspree ID, location) |
| `src/styles/global.css` | Tailwind directives + smooth scroll |
| `src/layouts/Layout.astro` | Base HTML shell (meta, title, body) |
| `src/pages/index.astro` | Assembles all sections into the single page |
| `src/components/Nav.astro` | Sticky top nav with logo and anchor links |
| `src/components/Hero.astro` | Dark hero with headline, subtext, and CTA buttons |
| `src/components/Services.astro` | 2-column grid of 4 service cards |
| `src/components/About.astro` | Photo + bio paragraph section |
| `src/components/Contact.astro` | WhatsApp button + Formspree email form |
| `src/components/Footer.astro` | Copyright and location tag |
| `tests/smoke.spec.ts` | Page loads, title correct, all sections present |
| `tests/nav.spec.ts` | Nav brand name, anchor links present |
| `tests/hero.spec.ts` | Hero visible, both CTA buttons present |
| `tests/services.spec.ts` | 4 service cards present with expected titles |
| `tests/about.spec.ts` | About section visible, has image |
| `tests/contact.spec.ts` | WhatsApp link format valid, form fields present |
| `tests/footer.spec.ts` | Footer visible with brand name |
| `vercel.json` | Vercel deployment config |
| `.gitignore` | Ignores node_modules, dist, .astro, .superpowers |

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `playwright.config.ts`, `.gitignore`

- [ ] **Step 1: Scaffold Astro project**

```bash
npm create astro@latest . -- --template minimal --typescript strict --no-install
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D @astrojs/tailwind tailwindcss
npm install -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 3: Configure Astro with Tailwind**

Replace `astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
});
```

- [ ] **Step 4: Configure Tailwind**

Create `tailwind.config.mjs`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ff4d00',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Create Playwright config**

Create `playwright.config.ts`:
```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:4321',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 6: Update .gitignore**

Append to `.gitignore`:
```
.superpowers/
test-results/
playwright-report/
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```
Expected: `Local  http://localhost:4321/` printed in terminal. Stop with Ctrl+C.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project with Tailwind and Playwright"
```

---

### Task 2: Site Config

**Files:**
- Create: `src/config.ts`

- [ ] **Step 1: Create site config**

Create `src/config.ts`:
```ts
export const SITE = {
  name: "Fran's Bike Atelier",
  tagline: "Repairs, tune-ups, custom builds, and emergency roadside help",
  location: "Buenos Aires",
  // Digits only, with country code. E.g. Argentina +54 → "5491155551234"
  whatsappNumber: "5491100000000",
  // Sign up at formspree.io, create a form, paste the ID from the endpoint URL here
  formspreeId: "YOUR_FORMSPREE_ID",
  year: new Date().getFullYear(),
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx astro check
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/config.ts
git commit -m "chore: add site config constants"
```

---

### Task 3: Layout Component

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/smoke.spec.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/smoke.spec.ts`:
```ts
import { test, expect } from '@playwright/test';

test('page has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Fran's Bike Atelier/);
});

test('page has meta description', async ({ page }) => {
  await page.goto('/');
  const meta = page.locator('meta[name="description"]');
  await expect(meta).toHaveAttribute('content', /.+/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx playwright test tests/smoke.spec.ts
```
Expected: FAIL — default Astro title doesn't match.

- [ ] **Step 3: Create global CSS**

Create `src/styles/global.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 4: Create Layout component**

Create `src/layouts/Layout.astro`:
```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Fran's Bike Atelier",
  description = "Your neighborhood bicycle mechanic — repairs, tune-ups, custom builds, and emergency roadside help.",
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
  </head>
  <body class="bg-[#f7f7f7] text-[#111] font-sans">
    <slot />
  </body>
</html>
```

- [ ] **Step 5: Update index page to use Layout**

Replace `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout>
  <p>hello</p>
</Layout>
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
npx playwright test tests/smoke.spec.ts
```
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/styles/global.css src/layouts/Layout.astro src/pages/index.astro tests/smoke.spec.ts
git commit -m "feat: add base Layout component"
```

---

### Task 4: Nav Component

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/nav.spec.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/nav.spec.ts`:
```ts
import { test, expect } from '@playwright/test';

test('nav shows brand name', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav')).toContainText("Fran's Bike");
  await expect(page.locator('nav')).toContainText('Atelier');
});

test('nav has anchor links to page sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href="#services"]')).toBeVisible();
  await expect(page.locator('nav a[href="#about"]')).toBeVisible();
  await expect(page.locator('nav a[href="#contact"]')).toBeVisible();
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx playwright test tests/nav.spec.ts
```
Expected: FAIL

- [ ] **Step 3: Create Nav component**

Create `src/components/Nav.astro`:
```astro
<nav class="sticky top-0 z-50 bg-white border-b border-gray-100 px-7 py-3.5 flex justify-between items-center">
  <div class="font-black text-sm uppercase tracking-widest text-[#111]">
    Fran's Bike<span class="font-light text-[#ff4d00]"> Atelier</span>
  </div>
  <div class="flex items-center gap-5 text-xs font-semibold uppercase tracking-widest text-gray-500">
    <a href="#services" class="hover:text-[#111] transition-colors">Services</a>
    <a href="#about" class="hover:text-[#111] transition-colors">About</a>
    <a href="#contact" class="bg-[#ff4d00] text-white px-3 py-1.5 rounded-sm hover:bg-orange-600 transition-colors">
      Contact
    </a>
  </div>
</nav>
```

- [ ] **Step 4: Add Nav to index page**

Replace `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
---

<Layout>
  <Nav />
</Layout>
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx playwright test tests/nav.spec.ts
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Nav.astro src/pages/index.astro tests/nav.spec.ts
git commit -m "feat: add Nav component"
```

---

### Task 5: Hero Section

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/hero.spec.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/hero.spec.ts`:
```ts
import { test, expect } from '@playwright/test';

test('hero section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#hero')).toBeVisible();
});

test('hero has both CTA buttons', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#hero a[href="#contact"]')).toBeVisible();
  await expect(page.locator('section#hero a[href="#services"]')).toBeVisible();
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx playwright test tests/hero.spec.ts
```
Expected: FAIL

- [ ] **Step 3: Create Hero component**

Create `src/components/Hero.astro`:
```astro
---
import { SITE } from '../config';
---

<section id="hero" class="bg-[#111] px-7 py-16 relative overflow-hidden">
  <p class="text-xs uppercase tracking-[3px] text-[#ff4d00] mb-3">
    {SITE.location} · Mobile &amp; Workshop
  </p>

  <h1 class="text-4xl font-black uppercase leading-tight text-white tracking-tight">
    Your Bike<br />
    Deserves<br />
    <span class="text-[#ff4d00]">Expert Hands.</span>
  </h1>

  <div class="w-10 h-0.5 bg-[#ff4d00] my-5"></div>

  <p class="text-sm text-gray-400 leading-relaxed max-w-xs">
    {SITE.tagline}. I come to you, or you come to my workshop.
  </p>

  <div class="flex gap-3 mt-7">
    <a
      href="#contact"
      class="bg-[#ff4d00] text-white px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors"
    >
      Get in Touch
    </a>
    <a
      href="#services"
      class="border border-gray-600 text-gray-400 px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-widest hover:border-gray-400 transition-colors"
    >
      See Services ↓
    </a>
  </div>
</section>
```

- [ ] **Step 4: Add Hero to index page**

Replace `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
---

<Layout>
  <Nav />
  <Hero />
</Layout>
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx playwright test tests/hero.spec.ts
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro tests/hero.spec.ts
git commit -m "feat: add Hero section"
```

---

### Task 6: Services Section

**Files:**
- Create: `src/components/Services.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/services.spec.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/services.spec.ts`:
```ts
import { test, expect } from '@playwright/test';

test('services section has 4 cards', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#services');
  await expect(section).toBeVisible();
  await expect(section.locator('[data-service]')).toHaveCount(4);
});

test('services section has all expected service names', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#services');
  await expect(section).toContainText('Repairs & Tune-ups');
  await expect(section).toContainText('Custom Builds');
  await expect(section).toContainText('Emergency');
  await expect(section).toContainText('Mobile or Workshop');
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx playwright test tests/services.spec.ts
```
Expected: FAIL

- [ ] **Step 3: Create Services component**

Create `src/components/Services.astro`:
```astro
---
const services = [
  {
    icon: '🔧',
    title: 'Repairs & Tune-ups',
    description: 'Full diagnostics, brakes, gears, wheels — everything your bike needs.',
    accent: 'orange',
  },
  {
    icon: '⚙️',
    title: 'Custom Builds',
    description: 'Upgrades, component swaps, and dream builds from the ground up.',
    accent: 'dark',
  },
  {
    icon: '🚨',
    title: 'Emergency / Roadside',
    description: "Stuck on your route? I'll come to you.",
    accent: 'orange',
  },
  {
    icon: '🏠',
    title: 'Mobile or Workshop',
    description: 'Your place or my workshop — whatever works best for you.',
    accent: 'dark',
  },
];
---

<section id="services" class="px-7 py-14 bg-[#f7f7f7]">
  <p class="text-xs uppercase tracking-[3px] text-[#ff4d00] mb-1.5">What I Do</p>
  <h2 class="text-2xl font-black uppercase text-[#111] mb-8">Services</h2>

  <div class="grid grid-cols-2 gap-3">
    {services.map((s) => (
      <div
        data-service
        class={`bg-white p-4 border-l-[3px] ${s.accent === 'orange' ? 'border-[#ff4d00]' : 'border-[#111]'}`}
      >
        <span class="text-xl">{s.icon}</span>
        <h3 class="text-xs font-bold uppercase text-[#111] mt-1.5">{s.title}</h3>
        <p class="text-xs text-gray-500 mt-1 leading-relaxed">{s.description}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 4: Add Services to index page**

Replace `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
---

<Layout>
  <Nav />
  <Hero />
  <Services />
</Layout>
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx playwright test tests/services.spec.ts
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Services.astro src/pages/index.astro tests/services.spec.ts
git commit -m "feat: add Services section"
```

---

### Task 7: About Section

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/about.spec.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/about.spec.ts`:
```ts
import { test, expect } from '@playwright/test';

test('about section is visible with heading', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#about');
  await expect(section).toBeVisible();
  await expect(section).toContainText('About Fran');
});

test('about section has an image element', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#about img')).toBeVisible();
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx playwright test tests/about.spec.ts
```
Expected: FAIL

- [ ] **Step 3: Create About component**

Create `src/components/About.astro`:
```astro
<section id="about" class="px-7 py-14 bg-white">
  <p class="text-xs uppercase tracking-[3px] text-[#ff4d00] mb-1.5">The Mechanic</p>
  <h2 class="text-2xl font-black uppercase text-[#111] mb-6">About Fran</h2>

  <div class="flex gap-5 items-start">
    <img
      src="/fran.jpg"
      alt="Fran — bicycle mechanic"
      width="64"
      height="64"
      class="w-16 h-16 object-cover rounded-sm flex-shrink-0 bg-gray-200"
    />
    <p class="text-sm text-gray-600 leading-relaxed">
      Hi, I'm Fran. I've been fixing and building bikes for years and I believe
      every bike — from a beat-up commuter to a custom build — deserves proper
      attention. I work with riders of all levels and treat every job like it's
      my own bike.
    </p>
  </div>

  <div class="w-10 h-0.5 bg-[#ff4d00] mt-7"></div>
</section>
```

- [ ] **Step 4: Add a placeholder photo**

Create a 64×64 grey placeholder at `public/fran.jpg`. You can use any small image file renamed to `fran.jpg`. Replace it with a real photo later.

- [ ] **Step 5: Add About to index page**

Replace `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import About from '../components/About.astro';
---

<Layout>
  <Nav />
  <Hero />
  <Services />
  <About />
</Layout>
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
npx playwright test tests/about.spec.ts
```
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/About.astro src/pages/index.astro tests/about.spec.ts
git commit -m "feat: add About section"
```

---

### Task 8: Contact Section

**Files:**
- Create: `src/components/Contact.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/contact.spec.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/contact.spec.ts`:
```ts
import { test, expect } from '@playwright/test';

test('contact section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#contact')).toBeVisible();
});

test('WhatsApp button has valid wa.me link', async ({ page }) => {
  await page.goto('/');
  const btn = page.locator('a[href^="https://wa.me/"]');
  await expect(btn).toBeVisible();
  const href = await btn.getAttribute('href');
  expect(href).toMatch(/^https:\/\/wa\.me\/\d+/);
});

test('contact form has required fields', async ({ page }) => {
  await page.goto('/');
  const form = page.locator('form');
  await expect(form.locator('input[name="name"]')).toBeVisible();
  await expect(form.locator('input[name="email"]')).toBeVisible();
  await expect(form.locator('textarea[name="message"]')).toBeVisible();
  await expect(form.locator('button[type="submit"]')).toBeVisible();
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx playwright test tests/contact.spec.ts
```
Expected: FAIL

- [ ] **Step 3: Create Contact component**

Create `src/components/Contact.astro`:
```astro
---
import { SITE } from '../config';

const whatsappUrl = `https://wa.me/${SITE.whatsappNumber}`;
const formspreeUrl = `https://formspree.io/f/${SITE.formspreeId}`;
---

<section id="contact" class="px-7 py-14 bg-[#111]">
  <p class="text-xs uppercase tracking-[3px] text-[#ff4d00] mb-1.5">Let's Talk</p>
  <h2 class="text-2xl font-black uppercase text-white mb-8">Get in Touch</h2>

  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-sm text-sm font-bold uppercase tracking-widest mb-8 hover:bg-green-500 transition-colors"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    Chat on WhatsApp
  </a>

  <p class="text-xs text-gray-500 text-center mb-6 uppercase tracking-widest">— or send an email —</p>

  <form action={formspreeUrl} method="POST" class="flex flex-col gap-3">
    <input
      type="text"
      name="name"
      placeholder="Your name"
      required
      class="bg-[#1e1e1e] border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-[#ff4d00] transition-colors"
    />
    <input
      type="email"
      name="email"
      placeholder="Email address"
      required
      class="bg-[#1e1e1e] border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-[#ff4d00] transition-colors"
    />
    <textarea
      name="message"
      placeholder="Tell me about your bike..."
      required
      rows="4"
      class="bg-[#1e1e1e] border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-[#ff4d00] transition-colors resize-none"
    ></textarea>
    <button
      type="submit"
      class="bg-[#ff4d00] text-white py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors"
    >
      Send Message
    </button>
  </form>
</section>
```

- [ ] **Step 4: Add Contact to index page**

Replace `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import About from '../components/About.astro';
import Contact from '../components/Contact.astro';
---

<Layout>
  <Nav />
  <Hero />
  <Services />
  <About />
  <Contact />
</Layout>
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx playwright test tests/contact.spec.ts
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.astro src/pages/index.astro tests/contact.spec.ts
git commit -m "feat: add Contact section with WhatsApp button and Formspree form"
```

---

### Task 9: Footer + Final Assembly

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/footer.spec.ts`

- [ ] **Step 1: Write failing test**

Create `tests/footer.spec.ts`:
```ts
import { test, expect } from '@playwright/test';

test('footer shows brand name and location', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
  await expect(footer).toContainText("Fran's Bike Atelier");
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx playwright test tests/footer.spec.ts
```
Expected: FAIL

- [ ] **Step 3: Create Footer component**

Create `src/components/Footer.astro`:
```astro
---
import { SITE } from '../config';
---

<footer class="bg-[#0a0a0a] px-7 py-4 flex justify-between items-center">
  <p class="text-xs text-gray-600">© {SITE.year} {SITE.name}</p>
  <p class="text-xs text-gray-600">{SITE.location} · 🚲</p>
</footer>
```

- [ ] **Step 4: Finalize index page with all sections**

Replace `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import About from '../components/About.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---

<Layout>
  <Nav />
  <main>
    <Hero />
    <Services />
    <About />
    <Contact />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 5: Run all tests**

```bash
npx playwright test
```
Expected: All PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer.astro src/pages/index.astro tests/footer.spec.ts
git commit -m "feat: add Footer and finalize page assembly"
```

---

### Task 10: Vercel Deployment

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create Vercel config**

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

- [ ] **Step 2: Test production build locally**

```bash
npm run build && npm run preview
```
Expected: Site serves at `http://localhost:4321` from `dist/`. Ctrl+C to stop.

- [ ] **Step 3: Commit**

```bash
git add vercel.json
git commit -m "chore: add Vercel deployment config"
```

- [ ] **Step 4: Push to GitHub and deploy on Vercel**

```bash
git push origin master
```

Then:
1. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
2. Vercel auto-detects Astro — click Deploy
3. After deploy, go to Settings → Domains to add your custom domain (optional)

- [ ] **Step 5: Update config with real contact details**

Edit `src/config.ts` with your real values:
- `whatsappNumber`: your number with country code, digits only (e.g. Argentina +54 9 11 → `"5491155551234"`)
- `formspreeId`: sign up at [formspree.io](https://formspree.io), create a form, copy the ID from the endpoint (e.g. `https://formspree.io/f/xabc1234` → ID is `xabc1234`)
- `location`: your neighborhood or city

```bash
git add src/config.ts
git commit -m "chore: update site config with real contact details"
git push
```

Vercel auto-redeploys on every push.
