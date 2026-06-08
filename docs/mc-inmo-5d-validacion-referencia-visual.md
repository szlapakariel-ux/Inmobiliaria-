# MC-INMO-5D — Validación documental de la referencia visual

**ID:** MC-INMO-5D
**Tipo:** Validación documental visual (no implementación)
**Repo:** `szlapakariel-ux/Inmobiliaria-`
**Base:** MC-INMO-5C — commit `main` `5aecabf`
**Rama:** `docs/mc-inmo-5d-validacion-referencia-visual`
**Referencia analizada:** `De link genérico a oferta profesional — Guadalupe Cabrera.pdf`
(maqueta exportada desde Claude Design, provista por Guadalupe en la sesión)

Producto bajo dirección visual:

**LINK → TRANSFORMACIÓN → OFERTA PROFESIONAL CON SELLO DE GUADALUPE**

Frase madre: *"De link genérico a oferta profesional con tu sello."*

> Este ciclo **no modifica la demo**. Evalúa si la maqueta sirve como dirección
> para un próximo ciclo técnico de aplicación visual en HTML/CSS.

---

## Nota sobre marca (§6)

**Marca RE/MAX / Buró: aceptada como parte de la identidad declarada por
Guadalupe, con restricción de no incorporar assets externos no provistos.**

La maqueta usa "RE/MAX Buró" como referencia textual junto al nombre de
Guadalupe, y una banda superior tricolor (rojo/blanco/azul) que evoca la paleta
de la marca. El propio pie de la maqueta aclara: *"No reproduce isologotipos de
terceros; las marcas mencionadas pertenecen a sus titulares."* Esto es
coherente con el alcance: referencia textual sí, isologotipo/asset oficial no.

---

## Descripción de la maqueta (lo que se ve)

Pieza vertical tipo landing, dividida en tres momentos que calzan con el flujo:

1. **Encabezado + concepto:** banda superior tricolor; identidad "Guadalupe
   Cabrera · Agente inmobiliaria · RE/MAX Buró" con monograma "GC"; badge
   "DEMO · DATOS FICTICIOS · NO PUBLICAR" arriba a la derecha. Antetítulo
   "— EL CONCEPTO" y titular en **tipografía serif** con palabras destacadas en
   rojo ("oferta profesional") y azul ("tu sello"). Bajada explicativa.
2. **Dos cards de proceso:**
   - ① "Pegás el link de la publicación" → muestra un campo tipo navegador con
     `https://portal-ejemplo.invalid/propiedad-demo-123` y placeholders grises;
     caption "Ficha de portal genérica, sin tu marca, igual a las demás."
   - ② "Se ordena y toma tu sello" → checklist con tildes: datos detectados
     (precio, ambientes, m²) · información ordenada y jerarquizada · texto
     comercial generado y editable · oferta lista con el sello de Guadalupe.
3. **③ Tu oferta profesional:** mockup de teléfono (formato mobile real) con la
   oferta, rodeado de anotaciones: PRESENTACIÓN (galería + título cuidado),
   REDACCIÓN (texto comercial propio), ACCIÓN (CTA directo a WhatsApp),
   TU SELLO (contacto y confianza).

Dentro del teléfono: header con Guadalupe, galería placeholder ("Foto del
inmueble") + 3 thumbs, tags "Venta · USD 118.000" y "Palermo, CABA", título
serif "Departamento 2 ambientes con balcón en Palermo", precio "USD 118.000 ·
precio de referencia", ubicación, specs (2 amb / 48 m² / 1 baño), descripción,
diferenciales, CTA verde "Consultar por WhatsApp", caja "Guadalupe te acompaña",
bloque de contacto con íconos, y al pie "DEMO — DATOS FICTICIOS — NO PUBLICAR".

Paleta observada: fondo crema/beige cálido; acentos rojo y azul (paleta RE/MAX);
verde para el CTA de WhatsApp; dorado/ámbar para el badge DEMO; tinta oscura
para texto. Tipografía **serif editorial** en titulares + sans en cuerpo.

---

## A. Coherencia con la frase madre

- **Visible:** sí, como titular principal en serif grande, primer foco de la pieza.
- **Promesa central:** sí; "oferta profesional" (rojo) y "tu sello" (azul)
  resaltan los dos conceptos clave.
- **Conexión con antes/después:** sí; el titular anticipa y las cards ① (link
  genérico) vs ③ (oferta propia) materializan el contraste. La frase también
  cierra al pie ("tu publicación, con tu sello").
- **¿Decorativa?:** no; está integrada al recorrido y reforzada al cierre.

**Dictamen A: clara.**

---

## B. Coherencia con el flujo

Se distinguen los tres momentos con numeración explícita ①②③:
- **Entrada del link:** card ① con campo de navegador y link ficticio.
- **Transformación simulada:** card ② con checklist de lo que "se ordena".
- **Salida profesional:** mockup ③ "Tu oferta profesional".
- **Resultado con sello de Guadalupe:** identidad presente en header del teléfono,
  caja "Guadalupe te acompaña" y bloque de contacto.

La numeración y la separación visual (cards arriba, teléfono abajo) hacen el
recorrido legible. Único matiz: la "transformación" se comunica como lista de
resultados (qué queda ordenado) más que como un estado en progreso; en la demo
HTML el progreso animado ya cubre eso.

**Dictamen B: claro.**

---

## C. Identidad de Guadalupe

- **Nombre:** presente en header de la pieza y dentro del teléfono.
- **Rol:** "Agente inmobiliaria" explícito.
- **RE/MAX Buró:** referencia textual coherente (no isologotipo).
- **Tono profesional:** la tipografía serif editorial + paleta sobria elevan la
  pieza por encima de una ficha de portal; se siente "boutique".
- **Pieza propia:** sí; las anotaciones "TU SELLO / Tu contacto y confianza" y la
  caja de acompañamiento personalizan la oferta.
- **Acompañamiento personal:** explícito ("Guadalupe te acompaña en todo el
  proceso: desde la consulta inicial hasta la visita").

**Dictamen C: identidad clara.**

---

## D. Claridad comercial

En <30 segundos se entiende:
- **Qué se ofrece:** transformar un link genérico en una oferta profesional.
- **Beneficio:** presentación clara, ordenada, con identidad propia.
- **Qué cambia vs mandar un link:** el contraste card ① (genérica, igual a las
  demás) vs ③ (pieza propia) lo muestra directamente.
- **Acción siguiente:** CTA "Consultar por WhatsApp" (visualmente destacado).
- **Por qué le sirve a Guadalupe:** posiciona su marca personal y profesionaliza
  su comunicación con propietarios/compradores.

**Dictamen D: clara.**

---

## E. Uso posible en la demo HTML/CSS

| Elemento de la maqueta | Clasificación |
|---|---|
| Layout general (concepto → 2 cards → oferta mobile) | Aplicable en próximo ciclo |
| Jerarquía visual (eyebrow + titular + bajada) | Aplicable en próximo ciclo |
| Bloque superior de promesa (titular con palabras destacadas) | Aplicable (con color, sin asset) |
| Card ① link de entrada (estilo navegador) | Aplicable en próximo ciclo |
| Card ② transformación (checklist) | Aplicable en próximo ciclo |
| Card mobile de oferta (estructura) | Aplicable (ya existe, refinar) |
| CTA visual WhatsApp (verde, ícono) | Aplicable como **placeholder** `#contacto` |
| Aviso DEMO (badge + pie) | Aplicable en próximo ciclo |
| Estilo de etiquetas/tags ("Venta · USD…") | Aplicable en próximo ciclo |
| Estilo de datos clave (cajas de specs) | Aplicable en próximo ciclo |
| Bloque de confianza ("Guadalupe te acompaña") | Aplicable en próximo ciclo |
| Estructura de cierre (frase madre al pie) | Aplicable en próximo ciclo |
| Tipografía serif editorial en titulares | **Requiere ajuste** (font self-hosted o web-safe; sin CDN/dependencia externa) |
| Banda tricolor RE/MAX | **Requiere ajuste** (recrear con CSS por color; sin isologotipo) |
| Galería con "Foto del inmueble" | **No aplicar todavía** (mantener placeholder; sin imágenes reales) |
| "Corredores responsables: …" / matrícula | **No aplicar todavía** (ver Riesgos G; no inventar datos legales) |
| Anotaciones laterales (presentación/redacción/acción/sello) | Aplicable como recurso explicativo (opcional en mobile) |

---

## F. Legibilidad mobile

- **Card mobile de oferta:** diseñada nativamente en formato teléfono → buena base.
- **Tamaño de textos:** algunas anotaciones laterales y captions se ven pequeños
  en la maqueta; al pasar a HTML hay que subir tamaños mínimos (≥0.8rem) y
  reflujar las anotaciones laterales debajo/dentro en pantallas angostas.
- **Jerarquía:** correcta (titular > bajada > cards > oferta).
- **Cantidad de información:** la oferta es densa pero ordenada; mantener el
  trabajo de simplificación G1-D ya aplicado en MC-INMO-5C.
- **Bloque de link:** legible; el link largo debe poder cortar (word-break) en
  angosto.
- **CTA / avisos demo:** bien dimensionados y contrastados.
- **Riesgo de textos chicos:** presente en captions y "corredores responsables".

**Dictamen F: apta con ajustes** (subir tamaños mínimos y reflujar anotaciones).

---

## G. Riesgos

| Riesgo | Nivel | Mitigación sugerida |
|---|---|---|
| Parecer oferta real | Bajo | Badge superior + pie "DEMO — DATOS FICTICIOS — NO PUBLICAR" + "precio de referencia" + "No constituye oferta comercial activa". |
| Parecer copia de portal | Bajo | La pieza es deliberadamente distinta (serif, sello propio); el propio relato la contrasta con la ficha de portal. |
| Usar datos reales | Bajo | Datos ficticios marcados; mantener exactamente los de la demo actual. |
| Usar imágenes sin permiso | Bajo | Galería es placeholder ("Foto del inmueble"); no incorporar fotos reales en 5E. |
| Prometer automatización inexistente | Medio | El relato "en segundos lo convertís" sugiere un motor que hoy es simulado. Mantener avisos de "transformación simulada" (ya presentes en la demo) al aplicarlo. |
| Parecer producto terminado | Medio | Mantener badge/pie DEMO prominentes; no quitar avisos de simulación al refinar visual. |
| Confundir maqueta con publicación comercial | Bajo | Pie explícito; reforzar en la demo. |
| Mal uso de marca externa (RE/MAX/Buró) | Medio | Solo referencia **textual**; no descargar/reproducir isologotipos; recrear banda por color CSS. Marca aceptada como identidad declarada por Guadalupe (§6). |
| **Dato legal / matrícula ("Corredores responsables: …")** | **Medio-alto** | La maqueta incluye un texto tipo matrícula/colegiatura. **No inventar ni trasladar matrículas/CPI a la demo** salvo que Guadalupe provea datos reales y autorizados. En 5E, dejar este bloque como placeholder genérico (p. ej. "Corredores responsables: a completar") o omitirlo. |
| Textos demasiado pequeños | Medio | Subir tamaños mínimos al pasar a HTML (ver F). |

---

## H. Backlog visual

### H1 — Aplicable en próximo ciclo técnico (seguro, sin imágenes reales)
- Jerarquía visual: eyebrow "EL CONCEPTO" + titular con palabras en rojo/azul + bajada.
- Orden de bloques: concepto → card ① link → card ② transformación → oferta mobile.
- Contraste Antes/Después reforzado con el estilo de card ① vs oferta ③.
- Card mobile de oferta refinada (tags, specs en cajas, diferenciales en 2 col).
- Aviso DEMO visible (badge superior + franja al pie).
- CTA placeholder verde estilo WhatsApp (`#contacto`, sin link real).
- Estilos de etiquetas/tags y de datos clave.
- Mayor claridad de flujo con numeración ①②③.
- Banda superior tricolor recreada **por color CSS** (sin isologotipo).
- Tipografía serif para titulares **solo si** se resuelve self-hosted/web-safe (sin dependencia/CDN externo); si no, usar serif del sistema.

### H2 — Requiere assets autorizados (no en 5E sin material provisto)
- Logo / isologotipo RE/MAX/Buró oficial.
- Fotos propias de propiedades.
- Paleta definitiva y tipografía definitiva licenciada.
- Marca gráfica final / identidad visual formal.
- Datos de matrícula / corredores responsables reales y autorizados.

### H3 — No habilitado todavía
WhatsApp real · Railway · deploy · backend · scraping · datos reales ·
imágenes reales · formularios · captura de leads · CRM · producción ·
publicación comercial.

---

## Resumen de dictámenes por dimensión

| Dim. | Tema | Dictamen |
|---|---|---|
| A | Coherencia con la frase madre | Clara |
| B | Coherencia con el flujo | Claro |
| C | Identidad de Guadalupe | Identidad clara |
| D | Claridad comercial | Clara |
| F | Legibilidad mobile | Apta con ajustes |

---

## Dictamen final

```txt
REFERENCIA_VISUAL_APTA_CON_AJUSTES
```

**Justificación:** La maqueta comunica con claridad la frase madre (A) y el flujo
LINK → TRANSFORMACIÓN → OFERTA (B), tiene identidad propia de Guadalupe fuerte
(C) y claridad comercial alta (D). Sirve como **dirección visual** sólida para la
demo. Requiere ajustes antes de aplicarse: legibilidad mobile (F), recrear la
banda/marca por CSS sin isologotipos, resolver la tipografía serif sin
dependencias externas, mantener galería en placeholder, y **tratar con cuidado el
bloque de "corredores responsables/matrícula"** (no inventar datos legales). Por
eso el dictamen es *apta con ajustes*, no *apta para aplicar tal cual*.

> Este ciclo no modifica la demo ni habilita imágenes, assets, logos externos,
> WhatsApp real, Railway, deploy, backend, scraping, datos reales ni publicación
> comercial.

---

## Próximo microciclo recomendado

**MC-INMO-5E — Aplicar dirección visual segura a la demo HTML/CSS.** Podrá
modificar `index.html` y `styles.css` para incorporar la jerarquía, el layout de
3 momentos, los estilos de cards/tags/specs y el tratamiento de la oferta mobile
de esta referencia. Seguirá **prohibido**: imágenes reales, assets/logos
externos, dependencias/CDN de fuentes, Railway, deploy, backend, WhatsApp real,
datos reales, scraping y producción. Tratamiento especial: banda RE/MAX por color
CSS, tipografía serif self-hosted o del sistema, y bloque de matrícula como
placeholder hasta contar con datos reales autorizados de Guadalupe.
