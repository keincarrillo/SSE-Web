# Responsive Mobile-First Plan

> Prioridad: mobile (375px). No romper diseño actual, solo adaptar.

## Principios
- Mobile-first, 375px base
- Mantener carruseles y animaciones GSAP intactos
- Toques mínimos, solo donde duele
- No agregar dependencias

---

## Fase 1: Navbar overlap (crítico)

**Problema**: Navbar fixed (104px en mobile) y Hero empieza en `top:0` detrás.

**Cambios**:
- `Hero.tsx` L52: `pt-32 md:pt-24 lg:pt-44` → mantener (128px > 104px, cubre)
- Verificar que todos los anchors `#section` tengan `scroll-mt-24` para compensar navbar al hacer click en links del navbar

---

## Fase 2: Hero mobile

**Problemas en 375px**:
- Título ~32px, ocupa 3 líneas
- Stats números `text-md` = 16px → pequeño para "10,000+"
- Stats labels `text-xs` = 12px → borderline

**Cambios en `Hero.tsx`**:
- L58: `fontSize: 'clamp(2rem, 4.4vw, 5rem)'` → `fontSize: 'clamp(1.75rem, 7vw, 5rem)'`
- L84: `text-md sm:text-2xl` → `text-lg sm:text-2xl` para números
- L81: `py-1 md:py-2` → `py-2 md:py-3` para stats bar

---

## Fase 3: Services carrusel mobile

**Problemas**:
- Tooth image decorativa `w-32 h-32` ocupa espacio arriba
- Cards padding en mobile

**Cambios en `Services/MobileCarousel.tsx`**:
- L38: `w-32 h-32 sm:w-40 sm:h-40` → `w-24 h-24 sm:w-40 sm:h-40`

**Cambios en `Services/cards.tsx`**:
- L65 (ServiceCard): `p-5 sm:p-6` → `p-4 sm:p-6`
- L91 (FeaturedCard): `p-5 sm:p-6 lg:p-[75px_26px_28px]` → `p-4 sm:p-6 lg:p-[75px_26px_28px]`

---

## Fase 4: Team DoctorCard

**Problema**: Imagen height `360px` fijo → mucho espacio en 375px.

**Cambios en `Team/components.tsx`**:
- L47: `height: '360px'` → `height: 'clamp(280px, 75vw, 360px)'`

---

## Fase 5: Testimonios mobile

**Problemas**: Text sizes en mobile layout.

**Cambios en `Testimonials/Testimonials.tsx`**:
- L108: `fontSize: '22px'` → `fontSize: 'clamp(18px, 5.5vw, 22px)'`
- L109: `fontSize: '13px'` → `fontSize: 'clamp(13px, 3.5vw, 15px)'`

---

## Fase 6: Contact iframe

**Problema**: LocationCard iframe `h-56` = 224px, mucho en mobile.

**Cambios en `Contact/components.tsx`**:
- L59: `h-56` → `h-48 lg:h-56`

---

## Fase 7: Breakpoints transición

**Problema**: Team `DesktopDoctorGrid` aparece en `sm:` (640px) → apretado.

**Cambios en `Team/components.tsx`**:
- L174: `hidden sm:grid sm:grid-cols-3` → `hidden md:grid md:grid-cols-3`
- L195: `hidden sm:block` → `hidden md:block`
- L202: `hidden sm:grid lg:hidden` → `hidden md:grid lg:hidden`

---

## Archivos afectados

| Archivo | Fases |
|---|---|
| `src/components/Hero/Hero.tsx` | 1, 2 |
| `src/components/Services/MobileCarousel.tsx` | 3 |
| `src/components/Services/cards.tsx` | 3 |
| `src/components/Team/components.tsx` | 4, 7 |
| `src/components/Testimonials/Testimonials.tsx` | 5 |
| `src/components/Contact/components.tsx` | 6 |

## Verificación

1. `bun run build` — sin errores de tipo
2. `bun run lint` — sin warnings
3. Safari: resize a 375, 640, 768, 1024, 1280 → verificar que no se rompa nada
