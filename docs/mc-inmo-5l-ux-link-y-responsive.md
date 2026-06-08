# MC-INMO-5L — UX del link cliente + responsive (evidencia)

**ID:** MC-INMO-5L
**Tipo:** Mejora de UX/responsive sobre la demo estática
**Repo:** `szlapakariel-ux/Inmobiliaria-`
**Base:** `main` (MC-INMO-5K cerrado; tip `675bd25`)
**Rama:** `feat/mc-inmo-5l-ux-link-y-responsive`

## Objetivo del ciclo

Corregir dos problemas detectados por Ariel en la demo pública, sin salir del
modelo estático (sin backend, base de datos, Railway, scraping, fetch/API, IA real,
datos/imágenes reales ni deploy alternativo):

1. **Link cliente demasiado largo** y mala experiencia para compartirlo.
2. **Vista cliente poco responsive** (angosta, texto chico, mal uso del ancho).

## Problemas detectados por Ariel

- El link generado mostraba una URL larguísima (≈1297 caracteres) como salida
  principal, ocupando la pantalla.
- La tarjeta de la vista cliente quedaba encerrada en una columna fija de 420 px:
  angosta en mobile/desktop, con tipografía pequeña.

## Cambios aplicados

### A. UX del link compartible

- **A.1 — La URL deja de ser protagonista.** El bloque ahora muestra primero las
  acciones (Generar / Copiar / Compartir / Abrir vista cliente) y un estado breve.
  La URL completa quedó en un `<details>` colapsado ("Ver link completo").
- **A.2 — URL mucho más corta** (sin backend ni base de datos):
  - Claves abreviadas en el payload (`t,o,z,p,l,a,s,b,d,f1,f2,f3,c`).
  - **Se omiten los campos que no cambiaron** respecto del demo por defecto
    (snapshot inicial); al decodificar, los ausentes conservan el default del HTML.
  - Codificación compacta **JSON → UTF-8 → base64 URL-safe** (`btoa(unescape(
    encodeURIComponent(...)))`, con `+/`→`-_` y sin `=`), evitando el inflado por
    `%xx` del esquema anterior.
  - Resultado medido: **1297 → 54 caracteres** sin ediciones; **≈271** con una
    edición típica (título + descripción + 2 diferenciales + CTA).
- **A.3 — Compartir nativo.** Botón "Compartir link" con **Web Share API**
  (`navigator.share`), visible solo si el navegador lo soporta; si no, cae a copiar.
  No abre WhatsApp real, no usa `wa.me`, no abre apps externas automáticamente.
- **A.4 — Mensajes claros y cortos:** "Link cliente listo para compartir." y aviso
  "Este link contiene datos de demo dentro de la URL. No cargues datos reales,
  privados o sensibles."

### B. Responsive real de la vista cliente

- Tarjeta de ancho **fluido** (`max-width: min(680px, 100%)`, `width: 100%`) en
  lugar de la columna fija de 420 px — mobile-first y cómoda en desktop/tablet sin
  encerrarla en una columna ridículamente angosta.
- Tipografía y spacing con `clamp()`: título, precio, ubicación, specs, descripción,
  diferenciales, CTA e intro escalan según el ancho.
- Galería placeholder más alta en pantallas grandes (`clamp(190px, 34vw, 300px)`).
- CTA más ancho y cómodo al tacto.
- Ajustes `@media (min-width: 720px)` para que la propuesta respire en desktop.
- Todo scopeado a `.client-view` / `body.mode-client`: **no altera** el mockup
  "teléfono" de la vista Guadalupe.

## Archivos modificados / creados

| Archivo | Cambio |
|---|---|
| `index.html` | Reestructura del bloque "Generar link para cliente" (acciones al frente, botón Compartir, URL en `<details>` colapsado). |
| `script.js` | Encoding compacto + omisión de defaults + claves cortas; `shareClientLink` (Web Share API) con feature-detect; snapshot de defaults. |
| `styles.css` | Responsive de la vista cliente (ancho fluido + `clamp()`), estilos del `<details>` y de las acciones. |
| `README.md` | Documenta compartir mejorado, link más corto y vista cliente responsive. |
| `docs/mc-inmo-5l-ux-link-y-responsive.md` | Este archivo (evidencia). |

No se modificaron documentos anteriores. No se creó `assets/`. Sin imágenes,
dependencias ni workflows.

## Cómo probar localmente

1. Abrí `index.html` en el navegador.
2. Transformá, editá la oferta y "Aplicar cambios".
3. "Generar link para cliente" → la salida principal son los botones + un estado
   breve; el link completo está en "Ver link completo" (colapsado).
4. "Copiar link" copia; "Compartir link" aparece solo si el navegador soporta
   Web Share API; "Abrir vista cliente" muestra la vista limpia.
5. Probá el responsive redimensionando a ~360 / 390 / 768 / 1280 px: la tarjeta
   usa bien el ancho y el texto es legible.

## Cómo probar en la URL pública

1. Abrí `https://szlapakariel-ux.github.io/Inmobiliaria-/`.
2. Generá un link cliente y abrílo (o compartilo desde mobile).
3. Verificá la vista cliente en mobile y desktop.

> El entorno remoto de Claude no alcanza `github.io` (`HTTP 403 "Host not in
> allowlist"`, política de red del sandbox). Es una limitación del sandbox, **no**
> una falla del feature. La verificación pública final la hace Ariel desde un
> navegador real.

## Cómo funciona el link compartible mejorado

`#cliente=<base64url(JSON compacto de solo-los-campos-cambiados)>`. Al abrirlo,
`initFromHash` decodifica y rellena únicamente esos campos; el resto se mantiene con
los valores demo del HTML. Todo viaja en la propia URL — **sin servidor, sin base de
datos, sin guardado**.

## Validación local (headless, vía CDP) — resultados

- **Longitud URL:** 1297 → **54** (sin ediciones) / **271** (edición típica). ✓
- **Round-trip:** la vista cliente refleja exactamente los textos editados; campos
  omitidos conservan el default. ✓
- **Copiar / Compartir:** "Copiar link" OK; con `navigator.share` simulado, el botón
  aparece y se invoca el share (status "Link compartido."). ✓
- **Responsive:** screenshots a 360 / 390 / 768 / 1280 px — tarjeta fluida
  (`max-width: min(680px, 100%)`), tipografía legible, CTA ancho. ✓
- **Vista Guadalupe intacta:** transformación, edición y exportación siguen
  funcionando (export refleja la edición). ✓

## Confirmaciones de alcance

- ✅ **Sin backend** · **sin base de datos** · **sin persistencia**
  (`localStorage`/cookies solo aparecen en comentarios).
- ✅ **Sin `fetch`/API/scraping** · **sin IA real**.
- ✅ **Sin imágenes/assets/logos externos** · **sin `window.open`** (Web Share /
  navegación same-origin por hash).
- ✅ **No se tocó Railway** · **sin deploy alternativo** (sigue GitHub Pages, `main`
  raíz) · sin workflows/secrets/dependencias.

## Criterio de éxito

- La UX del link mejora de forma visible (acción al frente, URL colapsada, mucho
  más corta, compartir nativo).
- La vista cliente se ve bien en mobile y desktop.
- La vista Guadalupe sigue funcionando; el link cliente sigue abriendo la vista limpia.

## Rollback

- Revertir el PR si el comportamiento queda peor (`git revert`). No tocar Railway,
  no borrar historial. Como `main` se publica solo en Pages, revertir el PR revierte
  la versión pública.

## Próximo microciclo recomendado

**MC-INMO-5M — Verificación pública por Ariel (mobile + desktop) y presentación a
Guadalupe.** Ariel abre la URL pública desde navegador real, prueba generar/compartir
un link cliente y revisa el responsive en teléfono y desktop; luego se presenta a
Guadalupe usando la vista cliente como entregable. Sigue sin habilitar: producción
comercial, datos/imágenes reales, logos externos, WhatsApp real, backend, base de
datos, persistencia, IA real, scraping, Railway, dominio propio, workflows, CRM.

---

> Este ciclo solo mejora la UX del link compartible y el responsive de la vista
> cliente de demo. No habilita producción, datos reales, imágenes reales, WhatsApp
> real, backend, base de datos, persistencia, IA real, scraping ni Railway.
