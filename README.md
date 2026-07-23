# GD+ — Agency Website (Concept Build)

A multi-page marketing site for **GD+**, a Dubai-based communications & events agency (a Gulf Dunes division), built from the brand's website guidelines (colors, type, Material 3–inspired shape language).

This is a concept build with placeholder/dummy content — client names, team members, and case studies are fictional and meant to be swapped for real content before launch.

## Pages

- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `case-studies.html` — Case Studies
- `contact.html` — Contact

## Stack

Static HTML with CSS and JS inlined directly in each page — no build step, no dependencies, no separate asset files. Every `.html` file is fully self-contained, so you can download any single page and open it straight in a browser and it'll look and behave exactly as intended.

Brand tokens (colors, radii, type scale) are defined as CSS custom properties at the top of each page's `<style>` block:

- Primary `#ec5628` · Secondary `#5799d2` · Tertiary `#ffcc02`
- Typeface: Public Sans (Google Fonts)

## Running locally

Just open any `.html` file directly in a browser — no server required.
