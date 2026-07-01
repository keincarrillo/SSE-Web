# Fix: Android card flicker in Problem popup

## Symptom

The card inside the `Problem` popup ("¿Hace cuánto no visitas al dentista?") flickers/titila on Android Chrome. iOS Safari and desktop Chrome are unaffected.

Confirmed by user: the card itself trembles/flickers while visible (not an overlay flash).

## Root cause

Two factors combine on Android Chrome only:

### 1. No GPU compositing layer on the card

The `.modal-card` element hosts `AmbientEffects` — a decorative component with ~20 continuously-animating GSAP tweens (orbs, particles, lines, glints with `repeat: -1`). These trigger constant repaints on every animation frame.

On iOS and desktop, browsers auto-promote elements to GPU compositing layers when they detect frequent repaints. Android Chrome does not — without explicit CSS hints, the card repaints in software, causing visible flickering.

### 2. `backdrop-filter` on the overlay

`.modal-overlay` applies `backdrop-filter: blur(8px)`. Elements with backdrop-filter are expensive to composite. On Android Chrome, this further degrades repaint performance for child elements, exacerbating the flicker.

## Fix

Add explicit GPU compositing hints to both `.modal-overlay` and `.modal-card`:

- **`will-change`** — hints the browser to promote to a GPU layer before the animation starts
- **`backface-visibility: hidden`** — forces GPU compositing in WebKit/Blink
- **`transform: translateZ(0)`** — (overlay only) additional GPU promotion trigger for Android Chrome

These properties are purely declarative — they have zero visual effect. They only affect compositing strategy.

## Files changed

- `src/index.css` — `.modal-overlay` and `.modal-card` CSS rules

No JavaScript, no component logic, no markup changes.

## Trade-offs

- Slightly increased memory usage (GPU layers consume VRAM)
- `will-change` is a hint, not a guarantee — safe to apply
- No visual or layout changes
