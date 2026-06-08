# MC-INMO-5J — Publicación de la demo en GitHub Pages (evidencia)

**ID:** MC-INMO-5J
**Tipo:** Publicación de demo estática (GitHub Pages)
**Repo:** `szlapakariel-ux/Inmobiliaria-`
**Base:** `main` (MC-INMO-5H cerrado; MC-INMO-5I encima)
**Rama:** `chore/mc-inmo-5j-publicar-demo-github-pages`

## Objetivo y motivo

Publicar la demo estática existente en una **URL pública de GitHub Pages** para
poder compartir el link con Guadalupe.

Flujo publicado:
**LINK COMO TEXTO → TRANSFORMACIÓN SIMULADA → OFERTA EDITABLE → EXPORTAR TEXTO LOCAL**

> **Decisión explícita del autor:** esta autorización revierte de forma **acotada**
> la regla anterior "NO PUBLICAR / no deploy", **solo** para este caso: demo
> estática, datos ficticios, sin backend, sin Railway, sin scraping, sin WhatsApp
> real, sin producción comercial, sin datos reales, sin imágenes reales, sin
> logos externos. Se publica como **"DEMO PÚBLICA — DATOS FICTICIOS — NO USAR
> COMERCIALMENTE"**, no como producto final ni oferta inmobiliaria real.

## Mecanismo elegido

**GitHub Pages** servido desde branch `main`, carpeta raíz `/`.
- Sin workflow / sin GitHub Actions · sin build · sin dependencias · sin Railway.
- URL pública esperada: **https://szlapakariel-ux.github.io/Inmobiliaria-/**

## Cambios de texto realizados

| Dónde | Antes | Después |
|---|---|---|
| `index.html` badge superior | `DEMO · DATOS FICTICIOS · NO PUBLICAR` | `DEMO PÚBLICA · DATOS FICTICIOS · NO USAR COMERCIALMENTE` |
| `index.html` franja de la oferta | `DEMO — DATOS FICTICIOS — NO PUBLICAR` | `DEMO PÚBLICA — DATOS FICTICIOS — NO USAR COMERCIALMENTE` |
| `script.js` texto exportable (×2) | `DEMO — datos ficticios, no publicar.` | `DEMO PÚBLICA — datos ficticios — no usar comercialmente.` |
| `README.md` | mención a ZonaProp como ejemplo | "cualquier link como texto" (genérico) + URL pública |

- **Sanitización del link real:** el ejemplo público principal es
  `https://portal-ejemplo.invalid/propiedad-demo-123`. No se presenta la demo
  como si leyera ZonaProp; no se copia contenido de ningún portal.
- **Marca RE/MAX Buró:** se mantiene como **referencia textual** de identidad
  declarada por Guadalupe. Sin logos/isologotipos/assets externos. Bloque legal
  sigue como placeholder: *"Datos legales / matrícula: pendiente de carga autorizada."*

## Archivos modificados / creados

| Archivo | Cambio |
|---|---|
| `index.html` | Avisos públicos (badge + franja) |
| `script.js` | Aviso público en el texto exportable (×2) |
| `README.md` | Sección "Demo pública" + URL + sanitización ZonaProp + ajustes |
| `docs/mc-inmo-5j-publicacion-demo-github-pages.md` | Creado (este archivo) |

No se modificó `styles.css` (no fue imprescindible). No se modificaron documentos
anteriores. No se creó `assets/`. No se agregaron imágenes ni workflows.

## URL pública

- Esperada: **https://szlapakariel-ux.github.io/Inmobiliaria-/**
- Estado: se documenta en el reporte final del ciclo tras activar Pages.

## Confirmaciones

- ✅ **Demo pública no comercial** — avisos visibles "DEMO PÚBLICA — … — NO USAR COMERCIALMENTE".
- ✅ **Datos ficticios** mantenidos.
- ✅ **El link no se consulta** — entra solo como texto (sin fetch/scraping/navegación).
- ✅ Sin scraping / API / fetch.
- ✅ **Sin IA real** — los textos los escribe el usuario.
- ✅ **Sin backend** — sitio 100% estático.
- ✅ **No se tocó Railway.**
- ✅ **Sin workflows / Actions / secrets / dependencias / CDNs.**
- ✅ Sin imágenes/assets/logos externos · sin persistencia (localStorage/cookies).

## Rollback

- Si algo falla antes de activar Pages: no activar Pages; revertir el PR si corresponde.
- Si algo falla después: desactivar GitHub Pages (source → none) o revertir el PR;
  dejar evidencia del estado final. No borrar historial. No tocar Railway.

## Criterio de éxito

- La URL pública responde y muestra la demo.
- El aviso "DEMO PÚBLICA — … — NO USAR COMERCIALMENTE" está visible.
- El flujo Link → Transformación → Oferta, la edición y la exportación funcionan.
- Sin errores básicos; sin redirecciones a WhatsApp real; sin backend/Railway/scraping.

## Próximo microciclo recomendado

**MC-INMO-5K — Presentar el link público a Guadalupe y recoger feedback.** Usar el
guion de MC-INMO-5I sobre la URL pública; registrar respuestas y decidir el
siguiente experimento (assets autorizados / propiedad real autorizada / ajuste de
narrativa). Sigue sin habilitar: producción comercial, datos reales, imágenes
reales, logos externos, WhatsApp real, backend, IA real, scraping, Railway, CRM.

---

> Esta publicación habilita únicamente una demo pública no comercial con datos
> ficticios. No habilita producción, uso con clientes reales, datos reales,
> imágenes reales, WhatsApp real, backend, IA real, scraping ni Railway.
