# Precision Engineering — Corporate Website

Premium, responsive B2B website for **Precision Engineering**, a precision component
manufacturer serving automotive OEMs and industrial clients.

Plain static site — no build step, no dependencies. Works on GitHub Pages as-is.

## Run locally

```bash
npm install
npm run dev        # Vite with hot reload → http://localhost:8000
```

Or with zero dependencies:

```bash
python3 -m http.server 8000
```

(Vite is dev-only convenience — the site itself has no build step and deploys as-is.)

## Structure

```
index.html                            Home (hero, about, services, industries, why-us, clients, CTA)
about.html                            Story, values, milestones, certifications
services.html                         Services overview
service-sand-core.html                Sand Core Manufacturing (process, applications, specs)
service-vmc-machining.html            VMC Machining
service-impregnation.html             Impregnation (VPI)
service-conventional-machining.html   Conventional Machining
industries.html                       Industries we serve
why-us.html                           Why Choose Precision Engineering
clients.html                          Client logos, testimonials, appreciation letters
contact.html                          Inquiry form, contact cards, map placeholder
assets/css/styles.css                 Design system (tokens, components, responsive)
assets/js/main.js                     Nav, scroll reveals, counters, form handling
```

## Placeholders to replace before launch

- **Photography** — every dark tile labeled `Photo — …` marks where real facility
  photography goes (shot list is in the label text).
- **Client logos** — `Bajaj` / `Som Auto` chips plus 4 generic placeholders.
- **Contact details** — phone, email, plant address, map embed.
- **Stats & testimonials** — numbers and quotes are suggested copy; confirm with client.
- **Form backend** — `#inquiry-form` currently shows a success state client-side;
  wire to Formspree / backend endpoint when ready.

## Design system

- Type: Space Grotesk (headings) + Inter (body), Google Fonts
- Color: deep navy ink (`#0A1220`) + engineering orange (`#E8590C`)
- Breakpoints: 1020px / 880px (nav collapse) / 560px
- Motion: subtle scroll-reveals + count-up stats, disabled under `prefers-reduced-motion`
