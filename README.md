# SSE-Web

Landing page para Smile Studio Experts, clínica dental en Chimalhuacán y Polanco. Desplegada en [smilestudioexperts.com](https://smilestudioexperts.com).

## Tech Stack

- **Vite 8** + **React 19** + **TypeScript 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router v7** (SPA con rutas `/` y `/servicios`)
- **GSAP 3** + ScrollTrigger (animaciones de scroll)
- **Lenis** (smooth scroll)
- **Vercel** (despliegue + analytics)

## Requisitos

- Node.js ≥ 18
- [Bun](https://bun.sh) (recomendado) o npm

## Instalación

```bash
bun install
```

## Desarrollo

```bash
bun dev
```

Servidor local en `http://localhost:5173`.

## Build

```bash
bun run build
```

Genera `dist/` para producción. Incluye type-check (`tsc -b`).

## Lint

```bash
bun run lint
```

ESLint con flat config. Ignora `dist/`.

## Estructura

```
src/
├── components/
│   ├── Contact/    Formulario de contacto
│   ├── Footer/     Pie de página
│   ├── Hero/       Sección principal
│   ├── Navbar/     Barra de navegación
│   ├── Problem/    Dolor del paciente
│   ├── Promotions/ Ofertas activas
│   ├── SEO/        Meta tags + structured data
│   ├── Services/   Servicios dentales
│   ├── Social/     Links a redes sociales
│   ├── Team/       Equipo profesional
│   └── Testimonials/ Testimonios de pacientes
├── hooks/
│   ├── useLenis.ts
│   └── useScrollReveal.ts
├── pages/
│   └── ServicesPage.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Funcionalidades

- **SEO completo**: meta tags, Open Graph, Twitter Card, structured data (JSON-LD)
- **Animaciones GSAP**: scroll reveal con `data-gsap` attributes
- **Smooth scroll**: Lenis integrado globalmente
- **React Compiler**: habilitado via Babel plugin
- **Responsive**: Tailwind CSS v4 con breakpoints móviles
- **Analytics**: Vercel Analytics integrado

## Despliegue

Automático en Vercel al hacer push a `main`. SPA con rewrites en `vercel.json`.

## Licencia

Privado — Smile Studio Experts.
