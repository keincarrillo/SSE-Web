# SSE-Web — Smile Studio Experts

Landing page corporativa para **Smile Studio Experts**, clínica dental con sedes en **Chimalhuacán** y **Polanco** (CDMX). El sitio está diseñado para atraer nuevos pacientes, comunicar los servicios de la clínica y facilitar el contacto directo, combinando un diseño visual atractivo con un rendimiento óptimo y las mejores prácticas de SEO.

**Sitio en producción:** [smilestudioexperts.com](https://smilestudioexperts.com)

---

## Stack tecnológico

| Capa          | Tecnología                                                                 |
| ------------- | -------------------------------------------------------------------------- |
| Framework     | [React 19](https://react.dev) + [TypeScript 6](https://www.typescriptlang.org) |
| Build tool    | [Vite 8](https://vitejs.dev)                                              |
| Estilos       | [Tailwind CSS v4](https://tailwindcss.com) vía `@tailwindcss/vite`         |
| Routing       | [React Router v7](https://reactrouter.com) (SPA con `/` y `/servicios`)    |
| Animaciones   | [GSAP 3](https://gsap.com) + ScrollTrigger                                |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering)                               |
| SEO           | Meta tags, Open Graph, Twitter Card, JSON-LD (structured data)            |
| Analytics     | [Vercel Analytics](https://vercel.com/analytics)                           |
| Despliegue    | [Vercel](https://vercel.com) (build automático en cada push a `main`)      |
| Compilador    | React Compiler via Babel plugin (`babel-plugin-react-compiler`)            |

## Funcionalidades

- **Landing page completa** con secciones: Hero, Servicios, Promociones, Equipo, Testimonios, Contacto y Footer.
- **Página de servicios** (`/servicios`) con detalle de cada tratamiento dental.
- **Animaciones avanzadas** con GSAP y ScrollTrigger: revelación al hacer scroll mediante atributos `data-gsap` en los componentes.
- **Smooth scroll** global integrado con Lenis para una experiencia de navegación fluida.
- **SEO integral**: meta tags descriptivos, Open Graph para compartir en redes, Twitter Card, y datos estructurados JSON-LD para motores de búsqueda.
- **Responsive design** con Tailwind CSS v4, adaptado a móviles, tablets y escritorio.
- **Formulario de contacto** funcional en la sección Contact.
- **Rendimiento optimizado**: build con Vite, type-check con TypeScript, y compilación con React Compiler.

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

Genera la carpeta `dist/` con los archivos optimizados para producción. Incluye type-check automático (`tsc -b`).

## Lint

```bash
bun run lint
```

ESLint con flat config (ignora `dist/`).

## Preview

```bash
bun run preview
```

Sirve localmente el build de producción desde `dist/`.

## Estructura del proyecto

```
src/
├── components/
│   ├── Contact/      Formulario de contacto con validación
│   ├── Footer/       Pie de página con datos de contacto y redes
│   ├── Hero/         Sección principal con CTA
│   ├── Navbar/       Barra de navegación responsive
│   ├── Problem/      Sección que aborda el dolor del paciente
│   ├── Promotions/   Carrusel de ofertas y promociones activas
│   ├── SEO/          Meta tags + structured data (JSON-LD)
│   ├── Services/     Grid de servicios dentales
│   ├── Social/       Enlaces a redes sociales
│   ├── Team/         Presentación del equipo profesional
│   └── Testimonials/ Testimonios reales de pacientes
├── hooks/
│   ├── useLenis.ts        Hook para integrar Lenis smooth scroll
│   └── useScrollReveal.ts Hook para animaciones con Intersection Observer + GSAP
├── pages/
│   └── ServicesPage.tsx   Página detallada de servicios
├── App.tsx                Configuración de rutas y layout global
├── main.tsx               Punto de entrada de la aplicación
└── index.css              Estilos globales con Tailwind
```

## Despliegue

El despliegue es automático en **Vercel** al hacer push a la rama `main`. El archivo `vercel.json` incluye rewrites para manejar el routing SPA correctamente.

## Licencia

Privado — Smile Studio Experts.
