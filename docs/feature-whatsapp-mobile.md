# Feature — WhatsApp Button Mobile (Contacto)

> Botón de WhatsApp visible en mobile para cada sucursal en la sección de contacto.

---

## Problem

En mobile (`< lg`), la sección Contacto muestra un carrusel de tarjetas de sucursales. Cada tarjeta solo renderiza el iframe de Google Maps — el sidebar con info de WhatsApp y botón CTA es `hidden lg:flex`. Resultado: usuario mobile no tiene forma directa de contactar por WhatsApp desde la sección contacto.

En desktop (`lg:`), el sidebar sí muestra el botón verde de WhatsApp con icono `MessageCircle`.

---

## Solution

Agregar botón de WhatsApp visible solo en mobile dentro de `LocationCard`, debajo del mapa. Mismo estilo que el botón desktop.

---

## Implementation

### Archivo afectado

`src/components/Contact/components.tsx`

### Cambio en `LocationCard` (líneas 35-69)

Después del div del iframe (línea 65), agregar:

```tsx
<a
  href={loc.whatsapp}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Escribir por WhatsApp"
  className="lg:hidden flex items-center justify-center gap-2 mt-3 px-4 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1fc45e] hover:scale-105 transition-all duration-300 w-full"
>
  <MessageCircle className="w-5 h-5 shrink-0" />
  <span>WhatsApp</span>
</a>
```

### Detalles técnicos

| Aspecto           | Valor                                  |
| ----------------- | -------------------------------------- |
| Clase visibilidad | `lg:hidden` — solo mobile/tablet       |
| Icono             | `MessageCircle` (ya importado línea 2) |
| Color fondo       | `#25D366` (WhatsApp green)             |
| Link              | `loc.whatsapp` (mismo que desktop)     |
| fullWidth         | `w-full` — botón completo en mobile    |

### Por qué funciona

- Cada card del carousel lleva su propio botón → si en el futuro cada sucursal tiene link WhatsApp diferente, funciona sin cambios
- `lg:hidden` garantiza que en desktop no se duplica (el sidebar ya tiene su botón)
- Sin imports nuevos, sin cambios en data, sin cambios en `MobileLayout` ni `Contact.tsx`

---

## Testing

- Abrir en mobile (< 1024px) o usar DevTools responsive
- Navegar a sección Contacto
- Verificar: cada tarjeta del carrusel muestra botón verde "WhatsApp" debajo del mapa
- Verificar: botón abre `wa.me/message/3AXNNBK5CECNO1` en nueva pestaña
- Verificar: en desktop (≥ 1024px) no se duplica el botón
- Ejecutar `bun run build` sin errores

---

## Out of Scope

- Cambiar diseño visual del botón existente en desktop
- Agregar información de dirección/horario en mobile (solo botón)
- Modificar la data de sucursales
- Agregar tests automáticos
