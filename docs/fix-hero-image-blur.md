# Fix: Remove diffuse overlay from hero image

## Symptom

Hero doctors image (`team.webp`) behind the gradient overlay. On desktop (`md:`), a semi-transparent green gradient overlays the image from 90% opacity at top to 20% at bottom, making the image look faded/diffuse ("difuminado").

## Root cause

Hero.tsx line 50:

```tsx
<div className="absolute inset-0 z-10 bg-linear-to-b from-green/90 via-green/65 via-45% to-green/20" />
```

This creates a green gradient overlay (`z-10`) that sits between the image (`z-0`) and the text content (`z-20`). The high opacity green at top (90%) and midpoint (65%) heavily obscures the image.

## Fix

Remove the gradient overlay div entirely. The image will be fully visible behind the content.

### Risk: text readability

The content layer (`z-20`) has white/light text:
- `text-white` (title)
- `text-white/90` (subtitle)
- `text-gold` (accent span)

Without the dark overlay, white text may be hard to read against light areas of the image. If this occurs, alternatives:
- Add a dark semi-transparent overlay only behind the text (smaller area)
- Add `drop-shadow` or text shadow to the text
- Darken the image itself

## Files changed

- `src/components/Hero/Hero.tsx` — remove `<div>` with gradient (line 50)

No CSS changes, no JS changes.
