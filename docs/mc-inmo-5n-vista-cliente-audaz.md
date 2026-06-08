# MC-INMO-5N — Rediseño "Audaz" de la vista cliente

## Objetivo del ciclo

Implementar el diseño `Offer Card Final - Audaz.html` entregado por Claude
Design como rediseño mobile-first de la vista cliente pública. Sin tocar
el producto: sigue siendo estático, sin backend, sin base de datos, sin
persistencia, sin scraping, sin IA real.

## Origen del diseño

Handoff de `claude.ai/design` (proyecto "guadalupe 2"). Archivo principal:
`Offer Card Final - Audaz.html`. El README del bundle marcó este archivo
como el diseño primario a implementar. Las 9 cards del prototipo son un
feed; nuestra app renderiza una única card por link compartido, así que
se implementa la *anatomía* de la card y se descarta el wrapper de feed.

## Aspectos del diseño implementados

1. **Banda RE/MAX tricolor** (5px) arriba de la card.
2. **Galería full-bleed** (230px de alto, sin padding lateral, esquinas
   rectas dentro de la card redondeada), con:
   - thumbs overlay sobre gradiente al pie
   - badge de conteo de fotos arriba a la derecha
3. **Agent strip** posterior a la galería:
   - avatar GC
   - nombre + sub "RE/MAX Buró"
   - badge "Agente verificada ✦" en dorado
4. **Precio primero, prominente** (serif, 2.1rem, peso 800),
   con `precio de referencia` como nota chica al costado, y tags
   `En venta` / zona debajo. Bloque con borde inferior.
5. **Title post-precio**, serif, 1.22rem.
6. **Ubicación** chica en gris, con pin 📍.
7. **Specs como pills horizontales** (3 pills en fila): icono + valor
   (ej. `🏠 2 amb.`, `📐 48 m²`, `🚿 1 baño`).
8. **Descripción** con eyebrow uppercase + cuerpo 14px.
9. **Diferenciales** en grid 2 columnas con check rojo.
10. **CTA WhatsApp** verde, full-width, 17px padding vertical.
11. **Trust box** azul claro con check.
12. **Contact box horizontal**: avatar + identidad + 3 dots de contacto.
13. **Legal placeholder** centrado, itálico, 11px.
14. **Foot flag** amarillo con leyenda DEMO PÚBLICA.

## Adaptaciones (vs. prototipo)

- El feed-header del prototipo se omite: la app entrega una única card
  por link, no un feed.
- CTA: el prototipo usa `wa.me/...`. La app mantiene `#contacto-cliente`
  como placeholder, sin WhatsApp real.
- Contact dots: en el prototipo son `<a>` con `tel:` / `mailto:`. La
  app los deja como `<span>` placeholder (no abren apps externas, no
  hay número/mail reales).
- "Agente verificada" es un sello visual demo, no representa una
  verificación real.
- Tope `max-width` de la card 460px (mobile) / 480px (desktop) para no
  encerrar la pieza en una columna ridículamente angosta.

## Archivos modificados

- `index.html` — restructura `#client-view` al layout Audaz.
- `styles.css` — nuevo bloque `.client-view--audaz` (scoped).
- `script.js` — `txtPriceValue()` para extraer solo el valor del precio
  desde Guadalupe, así el rediseño puede renderizar valor y nota como
  spans separados sin pisar la nota en el round-trip.
- `docs/mc-inmo-5n-vista-cliente-audaz.md` — este documento.

## Compatibilidad

- Vista Guadalupe: intacta. No se tocaron `#offer-section`, editor,
  exportador, ni el bloque `client-gen`.
- Round-trip del link cliente: todos los IDs (`c-title`, `c-op`,
  `c-zone`, `c-price`, `c-loc`, `c-amb`, `c-sup`, `c-bath`, `c-desc`,
  `c-diff1/2/3`, `c-cta`) se preservan. El script no requirió cambios
  de mapeo: solo se ajustó la extracción del precio para no incluir la
  nota.
- `c-amb` y `c-bath` quedan como spans internos con texto sufijo
  (` amb.`, ` baño`) fuera del span; el round-trip vuelca solo el valor.

## Cómo probar

### Local

1. Abrir `index.html` en el navegador.
2. Vista Guadalupe: pegar link → transformar → editar (título / precio
   no editable, pero descripción + diffs + CTA sí) → generar link
   cliente → copiar → abrir en otra pestaña.
3. Verificar que la vista cliente se ve con:
   - banda RE/MAX arriba
   - galería full-bleed 230px con thumbs overlay y badge de fotos
   - agent strip con badge verificada
   - precio grande primero, con tags abajo
   - título serif post-precio
   - 3 specs pills en fila
   - descripción + diferenciales 2-col
   - CTA verde full-width
   - trust box + contact box horizontal
   - foot flag DEMO PÚBLICA
4. Probar en 360 / 390 / 430 / 768 / 1280 px.

### Público

URL pública base: `https://szlapakariel-ux.github.io/Inmobiliaria-/`.
GitHub Pages republicará `main` automáticamente. Verificación visual a
cargo de Ariel en navegador / celular real.

## Confirmaciones

- Sin backend / base de datos / persistencia / localStorage / cookies. ✅
- Sin fetch / API / scraping. ✅
- Sin IA real. ✅
- Sin imágenes reales / assets / logos externos. ✅
- Sin dependencias / CDNs / workflows / secrets. ✅
- No se tocó Railway. ✅
- No hubo deploy alternativo. ✅
- No se modificaron documentos anteriores. ✅
- CTA placeholder (sin `wa.me`, sin `tel:`, sin `mailto:`). ✅

## Rollback

Revertir el PR vuelve la vista cliente al estado de MC-INMO-5M.
No hay migraciones, no hay datos persistidos.

## Próximo microciclo recomendado

MC-INMO-5O — soporte de imágenes en la galería:
- carga de fotos por URL data: o por hash (con cuidado por el tamaño
  del link)
- o simplemente mejorar el placeholder cuando no hay fotos.
