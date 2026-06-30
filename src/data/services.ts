// ─── Assets: service images ───────────────────────────────────────────────────
import blanqueamiento1 from '../assets/services/blanqueamiento1.webp'
import blanqueamiento2 from '../assets/services/blanqueamiento2.webp'
import blanqueamiento3 from '../assets/services/blanqueamiento3.webp'
import bracketsImg from '../assets/services/brackets.webp'
import carillas1 from '../assets/services/carillas1.webp'
import carillas2 from '../assets/services/carillas2.webp'
import carillas3 from '../assets/services/carillas3.webp'
import limpieza from '../assets/services/limpieza.webp'
import protesis1 from '../assets/services/protesis1.webp'
import protesis2 from '../assets/services/protesis2.webp'
import protesis3 from '../assets/services/protesis3.webp'

// ─── Assets: home grid icons ──────────────────────────────────────────────────
import bracketsIcon from '../assets/icons/brackets.svg'
import smileIcon from '../assets/icons/smile.svg'
import starIcon from '../assets/icons/star.svg'
import toothIcon from '../assets/icons/tooth.svg'
import valuationIcon from '../assets/icons/valuation.svg'

// ─── Types ────────────────────────────────────────────────────────────────────
export type BgVariant = 'white' | 'green'

/**
 * size controls the home-grid layout:
 *   'sm'       → short card (left/right column)
 *   'lg'       → tall card (left/right column)
 *   'featured' → central gold card (always Diseño de sonrisa)
 */
export interface ServiceData {
  id: string
  title: string
  subtitle: string
  /** Short text shown in the home service cards. */
  summary: string
  /** Full text shown in the /servicios detail page. */
  description: string
  images: string[]
  bg: BgVariant
  highlights: { label: string; detail: string }[]
  /** SVG icon used in home grid cards. */
  icon: string
  /** Hash-link to the detail section, e.g. "/servicios#protesis". */
  href: string
  size: 'sm' | 'lg' | 'featured'
}

// ─── Data ─────────────────────────────────────────────────────────────────────
export const SERVICES: ServiceData[] = [
  {
    id: 'protesis',
    title: 'Prótesis',
    subtitle: 'Restaura tu sonrisa con naturalidad',
    summary:
      'Tratamientos que permiten reemplazar o restaurar piezas dentales perdidas o dañadas, devolviendo función, estética y seguridad al sonreír.',
    description:
      'Tratamientos que permiten reemplazar o restaurar piezas dentales perdidas o dañadas, devolviendo función, estética y seguridad al sonreír. Utilizamos materiales de alta calidad que imitan perfectamente la apariencia y resistencia de tus dientes naturales.',
    images: [protesis1, protesis2, protesis3],
    bg: 'white',
    highlights: [
      {
        label: 'Materiales premium',
        detail:
          'Porcelana y zirconio de última generación para resultados que duran años.'
      },
      {
        label: 'Adaptación personalizada',
        detail:
          'Cada prótesis se diseña a medida según la anatomía y tono dental del paciente.'
      },
      {
        label: 'Función y estética',
        detail:
          'Recupera la capacidad de morder, masticar y hablar con total confianza.'
      }
    ],
    icon: smileIcon,
    href: '/servicios#protesis',
    size: 'sm'
  },
  {
    id: 'ortodoncia',
    title: 'Ortodoncia',
    subtitle: 'Alinea tu mordida, transforma tu vida',
    summary:
      'Procedimientos enfocados en corregir la posición de los dientes y la mordida, mejorando tanto la estética como la funcionalidad de la sonrisa.',
    description:
      'Procedimientos enfocados en corregir la posición de los dientes y la mordida, mejorando tanto la estética como la funcionalidad de la sonrisa. Contamos con opciones de brackets metálicos, cerámicos y alineadores transparentes.',
    images: [bracketsImg],
    bg: 'green',
    highlights: [
      {
        label: 'Brackets y alineadores',
        detail:
          'Opciones para cada estilo de vida: metálicos, cerámicos o invisibles.'
      },
      {
        label: 'Seguimiento continuo',
        detail:
          'Citas de control periódicas para ajustar el tratamiento según tu evolución.'
      },
      {
        label: 'Resultados duraderos',
        detail:
          'Retenedores y plan post-tratamiento para mantener tu nueva sonrisa.'
      }
    ],
    icon: bracketsIcon,
    href: '/servicios#ortodoncia',
    size: 'lg'
  },
  {
    id: 'diseno-sonrisa',
    title: 'Diseño de sonrisa',
    subtitle: 'Tu sonrisa ideal, diseñada para ti',
    summary:
      'Tratamiento estético enfocado en mejorar la forma, tamaño y color de los dientes para lograr una sonrisa más armónica y natural, adaptada a cada paciente.',
    description:
      'El diseño de sonrisa es un proceso estético y personalizado en el que analizamos tu rostro, tus dientes y tu personalidad para crear una sonrisa armónica y natural que realmente te represente.',
    images: [carillas1, carillas2, carillas3],
    bg: 'white',
    highlights: [
      {
        label: 'Diagnóstico digital',
        detail:
          'Simulación previa en pantalla para que veas tu resultado antes de comenzar.'
      },
      {
        label: 'Tratamiento integral',
        detail:
          'Combinamos carillas, contorneado y blanqueamiento según lo que necesites.'
      },
      {
        label: 'Armonía facial',
        detail:
          'Diseñamos tu sonrisa considerando tu rostro, labios y personalidad.'
      }
    ],
    icon: starIcon,
    href: '/servicios#diseno-sonrisa',
    size: 'featured'
  },
  {
    id: 'blanqueamiento',
    title: 'Blanqueamiento dental',
    subtitle: 'Brillo seguro y resultados visibles',
    summary:
      'Tratamiento que aclara el tono de los dientes y devuelve luminosidad a la sonrisa de forma segura y controlada.',
    description:
      'Tratamiento que aclara el tono de los dientes y devuelve luminosidad a la sonrisa de forma segura y controlada. Utilizamos agentes blanqueadores de uso profesional que garantizan resultados notables en pocas sesiones.',
    images: [blanqueamiento1, blanqueamiento2, blanqueamiento3],
    bg: 'green',
    highlights: [
      {
        label: 'Hasta 8 tonos más claro',
        detail:
          'Resultados visibles desde la primera sesión con mínima sensibilidad.'
      },
      {
        label: 'Procedimiento supervisado',
        detail:
          'Siempre bajo control profesional para proteger tu esmalte y encías.'
      },
      {
        label: 'Mantenimiento sencillo',
        detail:
          'Te orientamos con hábitos y cuidados para prolongar el efecto del blanqueamiento.'
      }
    ],
    icon: toothIcon,
    href: '/servicios#blanqueamiento',
    size: 'lg'
  },
  {
    id: 'valoracion-limpieza',
    title: 'Valoración y limpieza dental',
    subtitle: 'La base de una salud bucal perfecta',
    summary:
      'Revisión completa de tu salud bucal y limpieza profunda para eliminar placa y sarro, manteniendo tu sonrisa sana y lista para cualquier tratamiento.',
    description:
      'Evaluación completa de tu salud bucal para detectar problemas a tiempo y recomendar el tratamiento ideal, seguida de una limpieza profesional que elimina placa, sarro y manchas para mantener dientes más sanos y encías fuertes.',
    images: [limpieza],
    bg: 'white',
    highlights: [
      {
        label: 'Revisión completa',
        detail:
          'Exploración de dientes, encías, oclusión y tejidos blandos con registro fotográfico.'
      },
      {
        label: 'Limpieza profesional',
        detail:
          'Eliminamos placa, sarro y manchas de forma segura para mantener tus dientes y encías sanos.'
      },
      {
        label: 'Plan preventivo',
        detail:
          'Salimos de la consulta con un plan claro para mantener tu salud bucal a largo plazo.'
      }
    ],
    icon: valuationIcon,
    href: '/servicios#valoracion-limpieza',
    size: 'sm'
  }
]
