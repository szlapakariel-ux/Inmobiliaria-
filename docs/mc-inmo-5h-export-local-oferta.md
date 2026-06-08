# MC-INMO-5H — Exportación local de la oferta editada (evidencia)

**ID:** MC-INMO-5H
**Tipo:** Exportación local del texto comercial (copiar / imprimir)
**Repo:** `szlapakariel-ux/Inmobiliaria-`
**Base:** MC-INMO-5G — commit `main` `844e7b1`
**Rama:** `feat/mc-inmo-5h-export-local-oferta`

Objetivo: permitir que el usuario **copie el texto comercial editado** para usarlo
manualmente fuera de la demo.

Flujo:

**LINK COMO TEXTO → TRANSFORMACIÓN SIMULADA → OFERTA EDITABLE → COPIAR TEXTO
COMERCIAL LOCALMENTE**

> Este ciclo NO envía mensajes, NO integra WhatsApp, NO guarda, NO publica y NO
> usa backend.

---

## Cambios aplicados

### A — Bloque de exportación local
Bloque visible "Exportar oferta editada" (aparece con la oferta), con aviso:
*"Exportación local. Copiar genera un texto para usar manualmente. No envía
mensajes, no abre WhatsApp, no publica y no guarda datos."*

### B — Texto exportable
Se arma a partir de los datos visibles/editados de la oferta demo:
título editado · operación + zona · precio demo · datos clave (specs) ·
descripción editada · diferenciales editados · CTA textual editado ·
firma "Guadalupe Cabrera · RE/MAX Buró". Incluye, al inicio y al final, el aviso
**"DEMO — datos ficticios, no publicar."**

### C — Botón copiar (con fallback)
"Copiar texto" intenta copiar al portapapeles vía `document.execCommand('copy')`
(funciona en `file://`) y, como best-effort, `navigator.clipboard.writeText`
(sin enviar nada externo). Si el navegador no permite copiar, el recuadro
`textarea` queda **seleccionable** para copiar manualmente (Ctrl/Cmd+C). También
hay "Generar texto comercial" para rellenar el recuadro sin copiar.

### D — Sin envío automático
No abre WhatsApp, no envía mensajes, no usa WhatsApp API, no crea links reales de
WhatsApp, no captura leads, no guarda datos. La acción es **solo local y manual**.

### E — Vista imprimible (opcional, implementada)
"Ver versión para imprimir" usa `window.print()` (diálogo nativo del navegador).
Una regla `@media print` deja visibles solo la oferta y el texto exportable.
Sin dependencias, sin navegación externa, sin guardado.

---

## Archivos modificados / creados

| Archivo | Cambio |
|---|---|
| `index.html` | Bloque "Exportar oferta editada" (botones + recuadro de texto) |
| `styles.css` | Estilos del bloque de exportación + reglas `@media print` |
| `script.js` | `buildExportText()`, generar/copiar (con fallback), imprimir |
| `README.md` | Sección "Exportar la oferta como texto (local)" |
| `docs/mc-inmo-5h-export-local-oferta.md` | Creado (este archivo) |

No se modificaron documentos anteriores. No se creó `assets/`. No se agregaron imágenes.

---

## Cómo probar localmente

1. Abrir `index.html` en el navegador (doble clic, sin servidor).
2. Pegar un link y presionar "Transformar en oferta profesional".
3. (Opcional) Editar el texto en el panel de edición y "Aplicar cambios".
4. En "Exportar oferta editada": "Generar texto comercial" → ver el recuadro.
5. "Copiar texto" → se copia (o queda seleccionable para copiar a mano).
6. "Ver versión para imprimir" → diálogo de impresión nativo.
7. Verificar que el texto refleja las ediciones y trae el aviso DEMO.

---

## Confirmaciones de seguridad

- ✅ **La exportación es local** — el texto se arma del DOM y se copia/imprime
  en el navegador.
- ✅ **No envía ni publica** — copiar/imprimir no manda nada a ningún lado.
- ✅ **No integra WhatsApp** — no abre WhatsApp, no usa WhatsApp API, no crea
  links reales; CTA sigue siendo `#contacto` (verificado: único `href` es
  `#contacto`, `windowOpen` = 0).
- ✅ **No guarda datos** — sin localStorage, cookies, backend ni base de datos
  (verificado: `localStorage`/`document.cookie` vacíos en runtime).
- ✅ Sin fetch/API/scraping (las únicas APIs usadas son locales del navegador:
  portapapeles e impresión).
- ✅ **No hay IA real** — el texto se arma con plantillas y los textos del usuario.
- ✅ No se tocó Railway · no hubo deploy.
- ✅ Sin backend, dependencias, CDNs ni imports externos · sin imágenes/assets/logos.

---

## Criterio de éxito

- La demo abre localmente con `index.html`.
- Se puede editar el texto comercial y generar texto exportable.
- El texto exportable refleja los cambios editados.
- El botón copiar funciona o muestra fallback manual seleccionable.
- El aviso DEMO aparece en el texto exportado.
- No se abre WhatsApp, no se envía ni se guarda nada.
- Sin fetch/API/scraping, IA real, persistencia, dependencias, backend, Railway ni deploy.

---

## Rollback

Cambios en `index.html`, `styles.css`, `script.js`, `README.md` y un doc nuevo.
Para revertir:
- Antes del merge: cerrar el PR y eliminar la rama `feat/mc-inmo-5h-export-local-oferta`.
- Después del merge: `git revert <sha>` del merge en `main`, o restaurar los
  archivos desde el commit `844e7b1` (estado MC-INMO-5G).

No hay infraestructura, servicios, persistencia ni datos externos que limpiar.

---

## Próximo microciclo recomendado

**MC-INMO-5I — Guion de presentación de la demo a Guadalupe (documental).** Crear
un documento con el guion para mostrarle la demo (qué decir en cada momento del
flujo, qué resaltar, qué dejar claro que es demo). Solo documentación; sin tocar
la demo. Seguirá prohibido todo lo de H3 (WhatsApp real, Railway, deploy, backend,
IA real, scraping, datos reales, imágenes/assets externos, producción).

---

> Esta demo no habilita producción, deploy, Railway, WhatsApp real, envío
> automático, backend, scraping, IA real, datos reales ni publicación comercial.
