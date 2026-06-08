# MC-INMO-5E — Aplicación de dirección visual segura (evidencia)

**ID:** MC-INMO-5E
**Tipo:** Implementación visual segura (HTML/CSS)
**Repo:** `szlapakariel-ux/Inmobiliaria-`
**Base:** MC-INMO-5D — commit `main` `ba2bd58`
**Rama:** `feat/mc-inmo-5e-aplicar-direccion-visual`

Objetivo: aplicar a la demo la dirección visual validada en MC-INMO-5D para el flujo:

**LINK → TRANSFORMACIÓN → OFERTA PROFESIONAL CON SELLO DE GUADALUPE**

Frase madre: *"De link genérico a oferta profesional con tu sello."*

> Este ciclo modifica la demo solo para aplicar dirección visual segura. No
> habilita Railway, deploy, backend, WhatsApp real, datos reales, scraping,
> imágenes reales, assets ni producción.

---

## Cambios aplicados

### A — Layout de 3 momentos
La demo se reorganizó en tres momentos numerados y diferenciados:
1. **① Link recibido** — campo estilo navegador con el link ficticio.
2. **② Transformación simulada** — estados animados (datos detectados →
   información ordenada → texto comercial → oferta lista con sello).
3. **③ Tu oferta profesional con sello de Guadalupe** — card mobile de oferta.

El recorrido LINK → TRANSFORMACIÓN → OFERTA queda explícito por numeración y
separación visual.

### B — Jerarquía editorial
- Bloque de concepto con eyebrow "— El concepto", titular fuerte en
  **tipografía serif del sistema** y bajada explicativa.
- Palabras clave destacadas: "oferta profesional" (rojo) y "tu sello" (azul).
- Mejor separación entre secciones (cards con sombra, espaciado).
- Fuentes 100 % del sistema (stack serif: Iowan/Palatino/Georgia/Times;
  stack sans del sistema). **Sin Google Fonts, sin CDN, sin dependencias.**

### C — Numeración visual
Badges circulares ①②③ (texto + CSS, sin imágenes) en cada momento.

### D — Card mobile de oferta refinada
- Encabezado con Guadalupe Cabrera + referencia textual "RE/MAX Buró".
- Tags (Venta · USD 118.000 / Palermo, CABA), título serif, precio con
  "precio de referencia", datos clave en cajas, descripción, diferenciales
  en 2 columnas, CTA placeholder, bloque de confianza y contacto.
- Estética de pieza propia (boutique), no ficha de portal.

### E — Banda RE/MAX/Buró segura
- Banda superior tricolor (rojo/blanco/azul) recreada **por CSS** (`.brand-band`),
  sin isologotipo ni imagen.
- "RE/MAX Buró" usado solo como **texto**.
- **Nota de marca:** la marca textual RE/MAX/Buró se usa porque es la identidad
  declarada por Guadalupe; **no se incorporan assets externos** (logos,
  isologotipos, imágenes de marca). El footer lo aclara explícitamente.

### F — Bloque legal / matrícula
Placeholder claro, sin datos reales ni inventados:
> "Datos legales / matrícula: pendiente de carga autorizada."

No se inventaron nombres de corredores, matrículas ni CPI.

### G — Legibilidad mobile
- Tamaños mínimos razonables (cuerpo ≥0.8rem).
- Breakpoints ≤560px y ≤380px: titular y card escalan; diferenciales pasan a
  1 columna en angosto; link input y thumbs ajustados; badge DEMO compacto.
- Menor saturación y mejor espaciado.

---

## Elementos de MC-INMO-5D aplicados

| Elemento (backlog H1) | Estado |
|---|---|
| Jerarquía visual editorial | Aplicado |
| Orden de bloques (concepto → ① → ② → ③) | Aplicado |
| Contraste Antes/Después (link genérico vs oferta propia) | Aplicado |
| Card mobile de oferta refinada | Aplicado |
| Aviso DEMO visible (badge + franja al pie) | Aplicado |
| CTA placeholder verde estilo WhatsApp (`#contacto`) | Aplicado |
| Estilos de etiquetas/tags y datos clave | Aplicado |
| Numeración ①②③ | Aplicado |
| Banda RE/MAX por color CSS (sin isologotipo) | Aplicado |
| Tipografía serif para titulares (del sistema, sin CDN) | Aplicado |

## Pendiente para assets autorizados (backlog H2 — NO en este ciclo)

- Logo / isologotipo RE/MAX/Buró oficial.
- Fotos propias de propiedades (galería sigue en placeholder).
- Paleta y tipografía definitivas licenciadas.
- Datos de matrícula / corredores responsables reales y autorizados
  (hoy placeholder).

---

## Archivos modificados / creados

| Archivo | Cambio |
|---|---|
| `index.html` | Reestructurado con los 3 momentos y card de oferta |
| `styles.css` | Dirección visual editorial completa |
| `docs/mc-inmo-5e-aplicar-direccion-visual.md` | Creado (este archivo) |
| `script.js` | Sin cambios (hooks de simulación intactos) |

No modificados: `README.md`, `docs/demo-scope.md` ni documentos anteriores.

---

## Confirmaciones de seguridad

- ✅ No se usaron imágenes ni logos externos (galería = placeholder CSS).
- ✅ No se tocó Railway.
- ✅ No hubo deploy.
- ✅ No hubo backend.
- ✅ No se usaron datos reales (datos ficticios de la demo, sin cambios).
- ✅ No se inventó matrícula ni datos legales (placeholder explícito).
- ✅ Sin fetch, scraping, APIs, dependencias, CDNs ni imports externos.
- ✅ Sin Google Fonts — solo fuentes del sistema.
- ✅ Link ficticio `https://portal-ejemplo.invalid/propiedad-demo-123` sin cambios.
- ✅ CTA WhatsApp sigue siendo `href="#contacto"` (placeholder).
- ✅ No se creó `assets/`.

---

## Criterio de éxito

- Abre localmente con solo abrir `index.html`.
- Se entiende mejor el flujo Link → Transformación → Oferta.
- Se visualizan los tres momentos ①②③.
- La oferta final parece más profesional (pieza propia de Guadalupe).
- La frase madre sigue visible (header + cierre).
- El aviso DEMO sigue visible (badge + franja).
- El CTA sigue siendo placeholder.
- Legible en celular angosto.

---

## Rollback

Cambios solo en `index.html` y `styles.css`. Para revertir:
- Antes del merge: cerrar el PR y eliminar la rama `feat/mc-inmo-5e-aplicar-direccion-visual`.
- Después del merge: `git revert <sha>` del merge en `main`, o restaurar ambos
  archivos desde el commit `5aecabf` (estado MC-INMO-5C).

No hay infraestructura, servicios ni datos externos que limpiar.

---

## Próximo microciclo recomendado

**MC-INMO-5F — Identidad visual con assets autorizados (backlog H2).** Solo si
Guadalupe provee material: incorporar logo/isologotipo autorizado, fotos propias
de propiedades y datos de matrícula reales, además de paleta/tipografía
definitivas. Seguirá prohibido (H3): WhatsApp real, Railway, deploy, backend,
scraping, datos reales fuera de los provistos, formularios, captura de leads,
CRM y producción.

---

> Esta demo no habilita producción, deploy, Railway, WhatsApp real, backend,
> scraping, datos reales ni publicación comercial.
