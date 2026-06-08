# MC-INMO-5M — Legibilidad mobile de la vista cliente

## Objetivo del ciclo

Mejorar la legibilidad de la vista cliente pública en celular sin tocar el
producto ni romper la vista PC. Mantener el modelo estático actual (sin
backend, sin base de datos, sin persistencia, sin scraping, sin IA real).

## Problema detectado por Ariel

- En PC, la vista cliente se ve bien.
- El link cliente funciona y abre la propuesta.
- En celular, la vista se ve "como una tarjeta de PC achicada":
  - texto chico
  - contenido comprimido
  - poca legibilidad sin hacer zoom
  - CTA pequeño
  - bloques legales/datos clave microscópicos

## Cambios aplicados

Todos los cambios son CSS, scoped a `.client-view` (vista cliente
pública). No se tocó la lógica ni la vista Guadalupe.

1. Aumento de los mínimos de `clamp()` para tipografía clave de la vista
   cliente: título, precio, ubicación, descripción, diferenciales,
   datos clave (specs), CTA, aviso legal, bloque de confianza.
2. Bloque `@media (max-width: 560px)` específico para `body.mode-client`:
   - reduce padding lateral del `main` para que la card aproveche
     mejor el ancho del celular
   - ajusta padding interno del `offer-body`
   - radio de la card un poco menor para sensación mobile
   - galería principal con altura fija más sensata en mobile
   - `diffs` en columna única para evitar líneas cortas e ilegibles
   - `specs` con padding interno mayor para ser táctil
   - `contact-box` con wrap para no apretar contenido
3. CTA con padding mínimo de 16px en mobile y tipografía 1.05rem mínimo:
   queda táctil, ancho y claro.
4. Tags con tipografía mínima 0.82rem y padding 5px 12px: legibles.
5. Specs (`spec-val` 1.15rem mínimo, `spec-key` 0.82rem mínimo): datos
   clave bien visibles.
6. Descripción y diferenciales en 1.02rem mínimo con `line-height: 1.6`
   y color más contrastado (`#2c3344`).
7. `legal-placeholder` sube de 0.72rem a 0.82rem mínimo, line-height
   1.5: legible aunque sigue en segundo plano.

PC: la rama `@media (min-width: 720px)` no se tocó. Los `clamp()` techo
están entre 0.88rem y 2.2rem, en línea con el estado previo, por lo que
PC mantiene la misma jerarquía visual y la pieza no queda exageradamente
grande.

## Archivos modificados

- `styles.css` — únicamente bloque MC-INMO-5L/5M (vista cliente).
- `docs/mc-inmo-5m-mobile-vista-cliente.md` — este documento.

No se tocó `index.html` (el `<meta viewport>` ya estaba presente con
`width=device-width, initial-scale=1.0`).
No se tocó `script.js`.
No se modificaron documentos anteriores.

## Anchos usados para validar

- 360px
- 390px
- 430px
- 768px
- 1280px

En todos los anchos chicos la card usa el ancho disponible con márgenes
de ~10px; en 768px+ aplica el max-width de 680px de la card; en 1280px
mantiene la presentación de escritorio.

## Confirmaciones

- PC sigue OK: techos de `clamp()` y rama `min-width: 720px` sin cambios
  relevantes en jerarquía.
- Link cliente sigue OK: no se tocó generación, parsing ni round-trip.
- Mobile mejora: tipografía mínima más legible, CTA táctil, datos clave
  visibles, padding lateral del `main` reducido para aprovechar pantalla.
- No se tocó Railway.
- No hubo backend, deploy alternativo, datos reales ni assets.
- No hay localStorage ni cookies.
- No hay fetch / API / scraping.
- No hay IA real.

## Cómo probar

### Local

1. Abrir `index.html` en el navegador.
2. Vista Guadalupe: pegar link → transformar → editar → generar link
   cliente.
3. Copiar el link generado y abrirlo en otra pestaña: debe entrar en
   modo cliente (`body.mode-client`) mostrando solo la pieza.
4. Probar el ancho mobile con DevTools en 360 / 390 / 430 px.
5. Probar 768 px y 1280 px.

### Público

URL pública base:
`https://szlapakariel-ux.github.io/Inmobiliaria-/`

Si el entorno remoto bloquea `github.io`, la verificación pública queda
a cargo de Ariel desde un navegador real.

## Rollback

Revertir el PR de MC-INMO-5M devuelve la vista cliente al estado de
MC-INMO-5L. No hay migraciones, no hay datos persistidos, no hay nada
que limpiar.

## Criterio de éxito

- En celular la vista cliente se lee cómoda sin hacer zoom.
- PC sigue prolijo.
- Link cliente sigue funcionando.
- Vista Guadalupe intacta.

## Próximo microciclo recomendado

MC-INMO-5N — pulido visual de la galería placeholder (mejor uso del
espacio en mobile cuando no hay imágenes reales) o bien preparar el
formato del texto exportable para WhatsApp manual.
