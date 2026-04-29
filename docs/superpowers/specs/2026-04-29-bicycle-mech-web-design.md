# Fran's Bike Atelier — Website Design Spec

**Date:** 2026-04-29
**Project:** bicycle-mech-web

---

## Overview

A single-page static website for Fran's Bike Atelier, a bicycle mechanic side hustle. The primary goal is to make it easy for potential customers to reach Fran — via WhatsApp or email. The site establishes credibility and communicates services, but the core conversion action is contact.

---

## Visual Style

**Bold & Urban**

- Background: off-white `#f7f7f7` and dark `#111`
- Primary accent: orange `#ff4d00`
- Typography: system sans-serif, heavy weights, uppercase tracking for headings
- Service cards: white with colored left border (alternating orange / dark)
- Hero: dark background with large bold headline and orange accent text
- Contact section: dark background with orange CTA button

---

## Page Structure (Single Page, Top → Bottom)

### 1. Nav
- Logo: "Fran's Bike **Atelier**" (bold / light weight split)
- Links: Services, About, Contact (orange pill)
- Sticky on scroll

### 2. Hero
- Eyebrow: location tag (e.g. "Buenos Aires · Mobile & Workshop")
- Headline: bold, uppercase, 3 lines — last word in orange
- Divider bar in orange
- Subtext: one-liner about the service offering
- CTAs: "Get in Touch" (orange filled) + "See Services ↓" (ghost)

### 3. Services
- Section label + uppercase heading
- 4 cards in a 2-column grid, each with:
  - Emoji icon
  - Bold uppercase title
  - Short description
  - Left border: alternating orange / dark
- Cards:
  1. Repairs & Tune-ups
  2. Custom Builds
  3. Emergency / Roadside
  4. Mobile or Workshop

### 4. About Fran
- Section label + uppercase heading
- Photo (square, no border-radius) + short paragraph
- Orange divider bar below

### 5. Contact
- Dark background section
- Section label + uppercase heading
- **WhatsApp button** — prominent, links to `https://wa.me/<number>`, opens chat directly
- **Contact form** (via Formspree):
  - Name
  - Email
  - Message
  - Submit button (orange)
- Form submissions delivered to Fran's email via Formspree free tier

### 6. Footer
- Copyright
- Location tag

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Astro | Static output, fast, minimal overhead |
| Styling | Tailwind CSS | Utility-first, easy to maintain the bold/urban style |
| Contact form | Formspree | No backend needed, free tier sufficient |
| WhatsApp | `wa.me` link | Zero setup, one tap to open a chat |
| Hosting | Vercel | Free, auto-deploy on git push, custom domain |

---

## Data Flow

1. Visitor lands on site (static HTML served by Vercel CDN)
2. Visitor taps **WhatsApp button** → opens WhatsApp chat with Fran directly
3. Visitor submits **contact form** → POST to Formspree → Formspree emails Fran
4. No data stored, no backend, no database

---

## Out of Scope (This Version)

- Appointment booking / scheduling
- Pricing page
- Photo gallery / portfolio
- Blog
- Authentication

---

## Future Considerations

- Replace or supplement the contact form with a WhatsApp-first flow (already partially addressed with the `wa.me` button)
- Add a portfolio/gallery section once there are photos of work
- Add testimonials section
