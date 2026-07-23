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

Static HTML/CSS/vanilla JS, no build step or dependencies. Shared styles and interactions live in `assets/css/style.css` and `assets/js/main.js`.

Brand tokens (colors, radii, type scale) are defined as CSS custom properties at the top of `style.css`:

- Primary `#ec5628` · Secondary `#5799d2` · Tertiary `#ffcc02`
- Typeface: Public Sans (Google Fonts)

## Running locally

Just open `index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8000
```
