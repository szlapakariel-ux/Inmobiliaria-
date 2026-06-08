# MC-INMO-5B — Validación documental local de la demo (MC-INMO-5A)

**ID:** MC-INMO-5B
**Tipo:** Validación documental (medición, no mejora)
**Repo:** `szlapakariel-ux/Inmobiliaria-`
**Base validada:** MC-INMO-5A — commit `main` `6a925d7`
**Archivos revisados (sin modificar):** `index.html`, `styles.css`, `script.js`, `README.md`, `docs/demo-scope.md`

Producto bajo validación:

**LINK → TRANSFORMACIÓN → OFERTA PROFESIONAL CON SELLO DE GUADALUPE**

Frase madre: *"De link genérico a oferta profesional con tu sello."*

> Este ciclo mide si la demo actual comunica correctamente el valor **antes** de
> avanzar a identidad visual, imágenes reales, WhatsApp real, Railway o deploy.
> No introduce cambios en la demo.

---

## A. Claridad del flujo

Flujo evaluado: `pego un link → el sistema simula transformación → aparece una oferta profesional`.

Evidencia en la demo:
- Bloque de entrada con título explícito **"Pegá el link de la publicación"** (`index.html`, sección `input-section`) y un input con el link ficticio `https://portal-ejemplo.invalid/propiedad-demo-123` en modo `readonly`.
- Botón de acción claro: **"Transformar en oferta profesional"**.
- Sección de proceso (`process-section`) con 4 estados secuenciales animados por `script.js`: *Datos detectados → Información ordenada → Texto comercial generado → Oferta lista con sello de Guadalupe*. Cada paso pasa por `active` → `done` con check visual.
- Al completar, `revealOffer()` muestra la oferta y hace scroll automático hacia ella.

Observaciones:
- El recorrido de tres etapas es legible y lineal; el scroll automático guía la lectura.
- La nota "Simulación local. No hay scraping, fetch, API ni datos reales." refuerza que la transformación es simulada.
- Punto menor: el avance es puramente temporal (700 ms por paso); no hay barra/porcentaje, pero para una demo de concepto es suficiente.

**Dictamen A: clara.**

---

## B. Frase madre

Frase: *"De link genérico a oferta profesional con tu sello."*

Evidencia:
- Aparece en el `<header>` como `brand-claim`, en tamaño destacado (1.25rem, peso 700) justo bajo el nombre de Guadalupe — visible above the fold.
- Está semánticamente conectada con el flujo: "link genérico" ↔ bloque de entrada; "oferta profesional con tu sello" ↔ salida con identidad de Guadalupe.
- También figura en `README.md` y `docs/demo-scope.md` como promesa central.

Evaluación:
- **Visible:** sí, en el encabezado.
- **Conectada con Link → Transformación → Oferta:** sí, conceptualmente; el header anticipa lo que el flujo demuestra.
- **¿Decorativa?:** parcialmente — está presente y bien ubicada, pero no se repite/refuerza en el momento de aparición de la oferta final (donde cerraría el círculo "...con tu sello"). Hoy actúa más como titular de entrada que como cierre del flujo.
- **Ayuda a explicar el valor:** sí, sintetiza la promesa.

**Dictamen B: parcialmente clara.** (Visible y conectada, pero sin refuerzo en el cierre de la oferta; ver backlog G1.)

---

## C. Valor para Guadalupe

Test: ¿una agente inmobiliaria entiende en menos de 2 minutos…?

| Pregunta | ¿Se entiende? | Evidencia |
|---|---|---|
| Qué hace la demo | Sí | Título de entrada + botón + estados + oferta final dejan claro el "antes/después". |
| Por qué le serviría | Sí (implícito) | Bloque "Guadalupe te acompaña" + "¿Sos propietario/a?" explican el beneficio. |
| Qué mejora respecto a mandar un link de portal | Parcial | El bloque para propietarios lo dice ("identidad propia", "mejor presentación"), pero no hay un contraste visual lado-a-lado link-crudo vs oferta. |
| Qué queda pendiente para una versión real | Sí | `README.md` y `demo-scope.md` listan lo no habilitado; en pantalla, los avisos DEMO lo sugieren. |
| Qué mostrarle a un propietario/comprador | Sí | La oferta final es presentable como pieza de muestra. |

Observación: el valor está, pero apoyado en texto. El "salto" link genérico → oferta se cuenta más de lo que se muestra como comparación directa.

**Dictamen C: valor parcialmente evidente.** (Evidente con lectura de los bloques; mejorable con un contraste explícito — ver backlog G1.)

---

## D. Vista mobile

Revisión técnica/documental del responsive (`styles.css`), sin screenshot.

Evidencia:
- Layout de columna única: `main { max-width: 720px; margin: 0 auto; padding: 16px }` → en celular ocupa el ancho con padding cómodo.
- `meta viewport` presente en `index.html` (`width=device-width, initial-scale=1`).
- Input full-width (`.link-input { width: 100% }`) y botón full-width (`.btn-primary { width: 100% }`) → bloque de link claro y tappeable.
- Estados de transformación en lista vertical → orden de lectura natural.
- Media query `@media (max-width: 420px)`: reduce `brand-claim`, pasa `.specs` de 3 a 2 columnas y baja el tamaño de precio → evita apretujamiento en pantallas chicas.
- CTA WhatsApp con padding generoso (`13px 22px`), visible dentro de la oferta.
- Galería: `gallery-main` 200px + thumbs en grid de 3 → proporción razonable en mobile.

Observaciones menores:
- La galería de thumbs se mantiene en 3 columnas incluso <420px (70px de alto); en equipos muy angostos quedan algo chicas, pero legibles por ser placeholders.
- Tamaños de fuente base ≥0.8rem → legible sin zoom.

**Dictamen D: apta mobile.** (Con ajustes menores opcionales en thumbs; no bloqueante.)

---

## E. Riesgo de confusión

¿Podría confundirse con algo real?

Mitigaciones presentes en la demo:
- Banner global fijo **"DEMO — datos ficticios, no publicar"** (`demo-banner`) arriba de todo.
- Flag repetido dentro de la oferta (`offer-flag`).
- Link ficticio con dominio `.invalid` (no navegable, no resoluble).
- Nota "No hay scraping, fetch, API ni datos reales" en la sección de proceso.
- CTA WhatsApp es `href="#contacto"` (ancla interna) + nota "CTA placeholder — sin número real, sin envío automático".
- Aviso de validación al pie de la oferta + footer "Datos ficticios. No es producción".

| Confusión posible | Riesgo | Por qué |
|---|---|---|
| Oferta real | Bajo | Doble banner DEMO + aviso de validación. |
| Publicación comercial activa | Bajo | "no publicar" explícito. |
| Scraping real | Bajo | Nota explícita + dominio `.invalid`. |
| Integración WhatsApp real | Bajo | CTA es ancla, sin número/wa.me. |
| Datos reales | Bajo | Datos ficticios marcados. |
| Autorizado por un portal | Bajo | Dominio ejemplo `.invalid`, sin marca de portal. |
| Producto terminado | Bajo-medio | Visualmente prolijo; alguien apurado podría creerlo más avanzado de lo que es. Mitigado por avisos, pero conviene reforzar el "esto es una muestra de concepto" al presentarlo en vivo. |

**Dictamen E: riesgo bajo.** (Único matiz: "producto terminado" en bajo-medio; mitigado por avisos — ver backlog G1/G3.)

---

## F. Señales de confianza

| Señal | ¿Presente? | Evidencia |
|---|---|---|
| Profesionalismo | Sí | Paleta sobria, dorado de acento, tarjetas con sombra, tipografía de sistema legible. |
| Sello de Guadalupe | Sí | Header con avatar "GC", nombre y rol; bloque "Guadalupe te acompaña". |
| Claridad comercial | Sí | Precio, zona, specs y diferenciales bien jerarquizados. |
| Acompañamiento | Sí | Bloques "Guadalupe te acompaña" y "¿Sos propietario/a?". |
| CTA entendible | Sí | "Consultar por WhatsApp" con estilo de botón verde reconocible. |
| Diferencia frente a link genérico | Parcial | Comunicada por texto, no por contraste visual directo. |
| Herramienta útil, no solo decorativa | Sí | El flujo interactivo (botón → estados → oferta) transmite "hace algo". |

**Dictamen F: confianza suficiente.** (Sólida; la única dimensión "parcial" es el contraste link↔oferta — ver backlog G1.)

---

## G. Backlog recomendado

### G1 — Ajustes antes de mostrar a Guadalupe (mínimos, mejoran comprensión)
- Reforzar la **frase madre en el cierre** de la oferta (no solo en el header), para cerrar el círculo "...con tu sello".
- Hacer más explícito el **contraste "link genérico vs oferta"** (p. ej. mostrar el link crudo arriba y la oferta abajo, o un rótulo "Antes / Después").
- Reforzar visualmente que **el link es ficticio** y que **la transformación es simulada** (ya hay notas; subir su jerarquía).
- Considerar simplificar levemente la **oferta final** si en la demostración en vivo resulta densa.
- Ajuste menor de **galería en mobile** muy angosto (thumbs).

> Nota: estos ajustes NO se ejecutan en MC-INMO-5B (este ciclo es medición). Quedan registrados para un microciclo de mejora posterior.

### G2 — Próximo ciclo visual (no en esta validación)
- Identidad visual definitiva, logo, paleta y tipografía propias de Guadalupe.
- Galería con imágenes **propias/autorizadas**.
- Estilo de piezas para WhatsApp/Instagram.
- Estética más cercana a la marca personal de Guadalupe.

### G3 — Ciclos futuros NO habilitados (se mantienen prohibidos)
Registrados explícitamente como **no habilitados** por esta validación:
- Railway
- deploy
- WhatsApp real
- backend
- scraping
- datos reales
- imágenes reales
- formularios
- captura de leads
- CRM
- producción

---

## Resumen de dictámenes por dimensión

| Dim. | Tema | Dictamen |
|---|---|---|
| A | Claridad del flujo | Clara |
| B | Frase madre | Parcialmente clara |
| C | Valor para Guadalupe | Valor parcialmente evidente |
| D | Vista mobile | Apta mobile |
| E | Riesgo de confusión | Riesgo bajo |
| F | Señales de confianza | Confianza suficiente |

---

## Dictamen final

```txt
APTA_CON_AJUSTES_MENORES
```

**Justificación:** La demo comunica con claridad el flujo Link → Transformación → Oferta (A clara), tiene riesgo de confusión bajo (E) y transmite confianza suficiente con el sello de Guadalupe (F), apta en mobile (D). Las únicas dimensiones por debajo del óptimo son la frase madre (B, sin refuerzo en el cierre) y el valor diferencial (C, contado por texto más que mostrado por contraste). Ninguna es bloqueante: son **ajustes menores** registrados en el backlog G1. Por lo tanto la demo es **apta para mostrarse como demo local**, idealmente acompañada de los ajustes G1, y antes de habilitar cualquier ítem de G2/G3.

> Esta validación no habilita producción, deploy, Railway, WhatsApp real, backend, scraping, datos reales ni publicación comercial.
