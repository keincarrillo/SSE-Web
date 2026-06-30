# Plan de Refactor — SSE-Web

> Documento generado con las skills: `clean-code`, `gsap-react`, `gsap-core`, `vercel-react-best-practices`, `tailwind-design-system`

---

## Problem Statement

El codebase funciona correctamente, pero acumula varios problemas de mantenimiento que se vuelven más costosos conforme crece:

- Lógica GSAP duplicada en múltiples archivos (hooks locales, registros de plugin repetidos).
- Un bug silencioso: el GSAP ticker **nunca se limpia** en `ServicesPage` porque se intenta remover `lenis.raf` directamente cuando lo que se añadió fue una función flecha anónima.
- Reglas CSS duplicadas en `index.css` (los bloques `[data-gsap]` y `@keyframes pulse-subtle` aparecen dos veces exactas).
- Los datos de servicios existen en **dos formas paralelas** (`Services.tsx` y `ServicesPage.tsx`) sin fuente de verdad única.
- `ServicesPage.tsx` es un archivo de ~500 líneas que contiene tipos, datos, 2 hooks locales y 6 sub-componentes, todo junto.
- `src/data/` existe y está vacío mientras los datos viven hardcodeados dentro de componentes.
- Colores hardcodeados (`#c9aa65`, `#C9A84C`, `rgba(201,170,101,…)`) dispersos en lugar de usar las variables de diseño del `@theme`.
- Keyframes y estilos inyectados via `<style>` tags JSX (`PulseStyles`, `ShimmerStyles`, `Marquee`) en lugar de estar en el CSS global.
- Assets sin organizar: 21 archivos mezclados en la raíz de `assets/`, y `assets/figures/` mezcla SVGs de iconos de servicios, webps de redes sociales y fotos de bocas bajo un nombre vago.
- `src/components/icons/` existe vacía desde el inicio del proyecto.

---

## Solution

Refactor incremental en 7 fases, cada una en commits independientes y desplegables. El orden prioriza arquitectura de código primero (datos, lógica, estructura de componentes) y organización de archivos al final. Ningún commit rompe el build ni el comportamiento visible.

---

## Commits

### Fase 1 — Limpiar CSS duplicado ✅

**Commit 1 — `fix(css): eliminar bloques [data-gsap] y @keyframes duplicados en index.css`**
Borrar el segundo bloque idéntico de reglas `[data-gsap="fade-up/in/left/right/line/scale"]` y el segundo bloque de `@keyframes pulse-subtle` + `.animate-pulse-subtle` en `src/index.css`. Verificar que las reglas restantes cubren todos los usos en el proyecto.

---

### Fase 2 — GSAP: registrar plugin una sola vez y corregir bug de ticker ✅

**Commit 2 — `refactor(gsap): mover gsap.registerPlugin(ScrollTrigger) a main.tsx`**
Añadir `gsap.registerPlugin(ScrollTrigger)` en `src/main.tsx` (una sola vez, antes del render). Eliminar todas las llamadas `gsap.registerPlugin(ScrollTrigger)` de los cuatro archivos que la repiten: `useLenis.ts`, `useScrollReveal.ts`, `Hero.tsx` y `ServicesPage.tsx`.

**Commit 3 — `fix(gsap): corregir memory leak del ticker en usePageLenis`**
En `ServicesPage.tsx`, la función `usePageLenis` registra el ticker con una función flecha anónima `time => { lenis.raf(time * 1000) }` pero intenta removerla con `gsap.ticker.remove(lenis.raf)`, que nunca coincide con la referencia. La función `usePageLenis` se elimina completamente en el Commit 4, resolviendo el bug de raíz.

---

### Fase 3 — Eliminar hooks duplicados en ServicesPage ✅

**Commit 4 — `refactor(ServicesPage): eliminar usePageLenis, reusar useLenis del hook existente`**
Borrar la función `usePageLenis` de `ServicesPage.tsx`. Importar `useLenis` desde `../../hooks/useLenis` y llamarlo en el componente `ServicesPage` exactamente igual que lo hace el componente `Home` en `App.tsx`. El scroll-to-top al navegar a `/servicios` lo gestiona el componente `ScrollToTop` existente en `App.tsx`, por lo que no se necesita `useLayoutEffect` adicional.

**Commit 5 — `refactor(ServicesPage): eliminar useServiceReveal, reusar useScrollReveal`**
Borrar la función `useServiceReveal` de `ServicesPage.tsx`. En el componente `ServiceSection`, importar `useScrollReveal` desde `../../hooks/useScrollReveal` y reemplazar el `useRef` + `useServiceReveal` por `const sectionRef = useScrollReveal()`. El hook ya maneja `fade-up`, `fade-left` y `fade-right` con los mismos valores predeterminados.

---

### Fase 4 — Extraer datos a `src/data/` ✅

**Commit 6 — `feat(data): crear src/data/services.ts como fuente de verdad única`**
Crear `src/data/services.ts` con:

- Un tipo `ServiceData` con todos los campos necesarios para ambas vistas: `id`, `title`, `subtitle`, `summary` (texto corto para cards del home), `description` (texto completo para la página de detalle), `images`, `bg` (`'white' | 'green'`), `highlights` (`{ label, detail }[]`), `icon` (SVG import), `href`, y `size` (`'sm' | 'lg' | 'featured'` para el layout del home).
- Un array `SERVICES` exportado con los 5 servicios completos.

**Commit 7 — `refactor(Services): importar datos desde src/data/services.ts`**
En `Services.tsx`, eliminar los arrays `LEFT`, `FEATURED`, `RIGHT`, `ALL_MOBILE` y los imports de iconos SVG. Derivarlos desde `SERVICES` importado usando una función `toCardData` que mapea `summary` → `description` para el texto corto de las cards del home. Verificar que el layout desktop (grid asimétrico) y el carrusel móvil funcionan sin cambios visuales.

**Commit 8 — `refactor(ServicesPage): importar datos desde src/data/services.ts`**
En `ServicesPage.tsx`, eliminar los 11 imports de imágenes, el tipo `BgVariant` inline y el array `SERVICES` local (~140 líneas). Importar `SERVICES`, `BgVariant` y `ServiceData` desde `src/data/services.ts`. La página de detalle usa `service.description` (texto completo).

---

### Fase 5 — Descomponer ServicesPage.tsx en componentes ✅

**Commit 9 — `refactor(ServicesPage): extraer ServiceVisual a su propio archivo`**
Crear `src/components/ServicesPage/ServiceVisual.tsx` con el componente `ServiceVisual` (carrusel de imágenes con autoplay, dots y pausa en hover) y el ícono auxiliar `Check`. Exportar ambos.

**Commit 10 — `refactor(ServicesPage): extraer ServiceSection a su propio archivo`**
Crear `src/components/ServicesPage/ServiceSection.tsx` con el componente `ServiceSection` y su lógica de layout (alternancia par/impar, colores según `bg`). Usa `useScrollReveal` y `ServiceVisual`.

**Commit 11 — `refactor(ServicesPage): extraer PageHeader a su propio archivo`**
Crear `src/components/ServicesPage/PageHeader.tsx` con la sección de encabezado (badge, título, bajada, chips de navegación, wave SVG). La animación de entrada usa `useEffect` + `gsap.context` sin scrollTrigger ya que los elementos son visibles al montar.

**Commit 12 — `refactor(ServicesPage): extraer CtaSection a su propio archivo`**
Crear `src/components/ServicesPage/CtaSection.tsx` con la sección de llamada a la acción final. Usa `useEffect` + `gsap.context` con scrollTrigger.

**Commit 13 — `refactor(ServicesPage): limpiar ServicesPage.tsx como componente de composición`**
`ServicesPage.tsx` queda con menos de 40 líneas: importaciones, `useLenis()`, el efecto de hash-scroll y el JSX de composición (`PageHeader`, `ServiceSection` × n, `CtaSection`, `Footer`).

---

### Fase 6 — Tokens de diseño y CSS global ✅

**Commit 14 — `refactor(css): mover keyframes de style-tags JSX a index.css`**
Añadir en `src/index.css`:

- Variables RGB en `:root`: `--color-gold-rgb`, `--color-gold-light-rgb`, `--color-green-rgb` (necesarias para `rgba()` en keyframes).
- `@keyframes floatTooth` + `.tooth-float` (de `PulseStyles` en `Services.tsx`).
- `@keyframes pulseGold/pulseGreen` + `.icon-pulse-gold/green` (de `PulseStyles`).
- `@keyframes shimmer` + `.btn-shimmer` / `.shimmer-inner` (unificado — antes duplicado en `Services.tsx` y `Promotions.tsx`).
- `.service-card-clickable` hover/active (de `PulseStyles`).
- `@keyframes marquee` + `.marquee-track` (de `Marquee` en `Promotions.tsx`).
- `.promo-card` hover (de `ShimmerStyles` en `Promotions.tsx`).

Eliminar los componentes `PulseStyles`, `ShimmerStyles` y el `<style>` inline de `Marquee`.

**Commit 15 — `refactor(css): reemplazar colores hardcodeados con variables CSS`**
Buscar todas las ocurrencias de colores hex hardcodeados en props `style={{...}}` y reemplazarlos:

- `#c9aa65` / `#C9A84C` → `var(--color-gold-light)`
- `#4e5839` → `var(--color-green)`
- Gradientes con `rgba(201,170,101,X)` en glints de `Problem.tsx` → `var(--color-gold-light)`
- Archivos afectados: `Problem.tsx`, `ServiceVisual.tsx`, `PageHeader.tsx`, `CtaSection.tsx`.

**Commit 16 — `refactor(Problem): reemplazar estilos de tipografía inline con clases display`**
En `Problem.tsx`, el `<h2>` usa cinco propiedades inline de fuente. Reemplazar por la clase `display-md font-semibold` (cubre `fontFamily`, `lineHeight`, `letterSpacing`, `fontWeight`) y mantener solo `fontSize` inline (su valor difiere de `display-md`).

---

### Fase 7 — Reorganización de assets y limpieza de carpetas vacías

**Commit 17 — `refactor(assets): crear estructura de carpetas por categoría y mover archivos`**
Crear las subcarpetas `brand/`, `icons/`, `social/`, `team/` y `testimonials/` dentro de `src/assets/`. Mover cada archivo a su categoría:

| Categoría       | Archivos                                                              | Origen            |
| --------------- | --------------------------------------------------------------------- | ----------------- |
| `brand/`        | `logo_blanco.svg`, `logo_negro.svg`                                   | `assets/`         |
| `icons/`        | `brackets.svg`, `smile.svg`, `star.svg`, `tooth.svg`, `valuation.svg` | `assets/figures/` |
| `social/`       | `facebook.webp`, `instagram.webp`, `mouth1.webp`, `mouth2.webp`       | `assets/figures/` |
| `team/`         | `team.webp`, `profesional1-4.webp`, `banner1-2.webp`                  | `assets/`         |
| `testimonials/` | `consultorio.webp`, `testimony1-8.webp`                               | `assets/`         |

`problem.webp` y `tooth.webp` quedan en la raíz de `assets/` — son imágenes de sección única sin categoría que las agrupe.

**Commit 18 — `refactor(imports): actualizar rutas de assets en todos los componentes afectados`**
Actualizar los imports en los seis archivos afectados:

| Archivo            | Cambio                                                                       |
| ------------------ | ---------------------------------------------------------------------------- |
| `Navbar.tsx`       | `assets/logo_*.svg` → `assets/brand/logo_*.svg`                              |
| `Hero.tsx`         | `assets/team.webp` → `assets/team/team.webp`                                 |
| `Team.tsx`         | `assets/profesional*.webp`, `assets/banner*.webp` → `assets/team/`           |
| `Testimonials.tsx` | `assets/consultorio.webp`, `assets/testimony*.webp` → `assets/testimonials/` |
| `Social.tsx`       | `assets/figures/*.webp` → `assets/social/`                                   |
| `data/services.ts` | `assets/figures/*.svg` → `assets/icons/`                                     |

Ejecutar `bun run build` para confirmar que TypeScript resuelve todos los módulos.

**Commit 19 — `refactor(cleanup): eliminar carpetas vacías`**
Eliminar `src/assets/figures/` (vaciada en el commit anterior) y `src/components/icons/` (nunca tuvo contenido). La estructura final de `assets/` queda:

```
src/assets/
├── brand/          logo_blanco.svg · logo_negro.svg
├── icons/          brackets.svg · smile.svg · star.svg · tooth.svg · valuation.svg
├── services/       blanqueamiento1-3.webp · brackets.webp · carillas1-3.webp · limpieza.webp · protesis1-3.webp
├── social/         facebook.webp · instagram.webp · mouth1-2.webp
├── team/           team.webp · profesional1-4.webp · banner1-2.webp
├── testimonials/   consultorio.webp · testimony1-8.webp
├── problem.webp
└── tooth.webp
```

---

## Decision Document

- **Fuente de verdad de datos**: `src/data/services.ts` es el único lugar donde vive la información de servicios. Los componentes son solo vistas.
- **Tipo unificado `ServiceData`**: tiene dos campos de texto — `summary` (texto corto para las cards del home) y `description` (texto completo para la página de detalle). Esto evita truncar texto largo en cards pequeñas.
- **Registro de plugins GSAP**: se hace una sola vez en `main.tsx`. Ningún hook ni componente vuelve a llamar `gsap.registerPlugin`.
- **Hook `useLenis`**: es el único lugar donde se inicializa Lenis. `ServicesPage` lo reutiliza en lugar de tener su propia instancia. El scroll-to-top al cambiar de ruta lo maneja `ScrollToTop` en `App.tsx`.
- **Hook `useScrollReveal`**: es el mecanismo estándar de animación de entrada. Reemplaza cualquier `useEffect` + `gsap.context` local que replique la misma lógica.
- **Estructura de carpeta `ServicesPage/`**: los sub-componentes de la página de servicios viven en `src/components/ServicesPage/`. No son componentes reutilizables globales, por eso van en su propia carpeta y no en raíz de `components/`.
- **CSS global**: todos los `@keyframes` y clases de animación viven en `src/index.css`. No se inyectan estilos via JSX a menos que dependan de valores calculados en runtime.
- **Tokens de color**: solo se usan `var(--color-*)` o clases Tailwind que resuelven a esos tokens. Ningún hex literal en props JSX.
- **Variables RGB en `:root`**: `--color-gold-rgb`, `--color-gold-light-rgb` y `--color-green-rgb` se definen fuera del `@theme` para poder usarlos en `rgba()` dentro de keyframes, sin crear utilidades Tailwind innecesarias.
- **Organización de assets por categoría de uso**: cada subcarpeta de `assets/` agrupa archivos según la sección que los consume. Solo quedan en la raíz los assets usados por secciones diversas sin categoría clara.
- **Carpetas vacías prohibidas**: si una carpeta no contiene archivos, se elimina.
- **Sin cambios de comportamiento visual**: todas las fases son refactors puros. Si algo cambia de aspecto, el commit está incompleto.

---

## Testing Decisions

No existe suite de tests en el proyecto. La validación se hace manualmente:

- **Un buen test** verifica comportamiento observable (la página se muestra, las animaciones disparan, el scroll funciona), no detalles de implementación (qué hook se llama o cómo se registra GSAP).
- **Checklist por fase**:
  - Fase 1: verificar que todas las animaciones de scroll siguen funcionando en todas las secciones.
  - Fase 2: abrir DevTools → Performance y confirmar que el ticker de GSAP no crece indefinidamente al navegar entre rutas.
  - Fase 3: navegar a `/servicios`, volver a `/`, navegar de nuevo — confirmar que el scroll suave funciona en ambas rutas y la página vuelve al tope.
  - Fase 4: recorrer visualmente `Services` (home) y `ServicesPage` y confirmar que los textos, iconos e imágenes de cada servicio coinciden.
  - Fase 5: verificar que las animaciones de entrada de `ServicesPage` siguen disparando sección a sección al hacer scroll.
  - Fase 6: revisar que no hay colores incorrectos ni keyframes rotos en `Promotions`, `Services` y `Problem`. Confirmar que el marquee, el shimmer de botones y las animaciones de partículas siguen funcionando.
  - Fase 7: navegar por todas las secciones y confirmar que ninguna imagen aparece rota. Verificar logos en Navbar, foto del equipo en Hero, fotos de profesionales en Team, testimonios en Testimonials, e iconos sociales en Social.
- **Prior art**: no hay tests automáticos. El comando `bun run build` (typecheck + Vite build) es el único CI disponible — debe pasar sin errores después de cada commit.

---

## Out of Scope

- **Agregar tests automáticos**: el proyecto no tiene infraestructura de testing y añadirla está fuera del alcance de este refactor.
- **Cambiar el diseño visual**: ningún commit de este plan altera colores, tipografía, espaciados ni layout de forma intencional.
- **Cambiar el sistema de routing**: se mantiene `react-router-dom v7` con `BrowserRouter` y las dos rutas actuales.
- **Optimización de imágenes o assets**: la Fase 7 reorganiza la estructura de carpetas, no el formato, compresión ni tamaño de los archivos.
- **`PROMO_DEADLINE`** en `Promotions.tsx`: la fecha se computa al cargar el módulo (no persiste entre recargas). Corregirlo requeriría un backend o `localStorage` — fuera del alcance de este refactor estructural.
- **`gsap.registerPlugin(ScrollTrigger)` en `Team.tsx`**: encontrado durante el análisis pero fuera del alcance de este refactor — `Team.tsx` no fue parte de los archivos afectados originalmente. Candidato para un refactor posterior.
- **`ANIM_STYLES` inline en `Team.tsx` y `Social.tsx`**: ambos archivos inyectan CSS via template strings en JSX. Candidatos para un Commit 14 extendido en un refactor posterior.

---

## Further Notes

- Los commits de la Fase 5 (descomposición de `ServicesPage`) son los de mayor superficie de cambio. Ejecutarlos uno a uno y hacer build entre cada uno reduce el riesgo.
- La Fase 7 (reorganización de assets) debe ejecutarse en un solo bloque: mover archivos y actualizar imports en el mismo paso para que el build nunca quede en estado roto. Commit 17 y 18 pueden combinarse en la práctica.
- Al finalizar las 7 fases, los únicos archivos que quedan fuera de la convención son `Team.tsx` y `Social.tsx` (GSAP sin registrar centralmente, CSS inline). Son candidatos para una Fase 8 futura.
