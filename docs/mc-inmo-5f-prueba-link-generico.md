# MC-INMO-5F — Prueba controlada con link genérico (evidencia)

**ID:** MC-INMO-5F
**Tipo:** Prueba controlada de entrada (input editable + validación local)
**Repo:** `szlapakariel-ux/Inmobiliaria-`
**Base:** MC-INMO-5E — commit `main` `131e4ed`
**Rama:** `feat/mc-inmo-5f-prueba-link-generico`

Objetivo: permitir que la demo muestre que un usuario puede **pegar/editar un
link genérico** y ver una transformación simulada hacia una oferta profesional,
sin consultar internet ni extraer datos reales.

**LINK → TRANSFORMACIÓN → OFERTA PROFESIONAL CON SELLO DE GUADALUPE**

> Este ciclo no habilita scraping, fetch, APIs, backend, Railway, deploy ni
> datos reales.

---

## Cambios aplicados

### A — Input editable de link
El campo de link dejó de ser `readonly`: ahora es **editable**. Viene precargado
con `https://portal-ejemplo.invalid/propiedad-demo-123` y el usuario puede
reemplazarlo por otro link genérico (como texto). Se agregó `placeholder` y se
desactivó autocompletado/corrección.

### B — No consultar internet
El link ingresado **no se usa** para fetch, scraping, API, navegación
automática, descarga de imágenes ni extracción de datos. `script.js` solo lee el
valor como texto para validarlo y mostrarlo. Mensaje en UI: *"Esta demo no
consulta internet ni extrae datos reales — solo simula la transformación
localmente."*

### C — Estado visual de "link recibido"
Al presionar "Transformar en oferta profesional", el momento ② muestra un eco:
**"Link recibido: &lt;link ingresado&gt; — no consultado, solo simulado"**,
seguido de los estados simulados (datos detectados → información ordenada →
texto comercial → oferta lista con sello).

### D — Mantener datos ficticios
La oferta final **siempre** usa los datos ficticios ya definidos (Depto 2 amb.
Palermo, USD 118.000, etc.). No cambia por el link ingresado. No se usan datos
reales ni dirección exacta real.

### E — Aviso visible
Aviso reforzado en el bloque inicial: *"Pegá un link para simular el flujo. Esta
demo no consulta internet ni extrae datos reales — solo simula la transformación
localmente."*

### F — Validación mínima del input
En `script.js`, sin validaciones complejas y sin bloquear por dominios reales:
- Campo vacío → *"Pegá un link para iniciar la simulación."*
- Texto que no parece link → *"Para esta demo, ingresá un link de ejemplo."*
- Acepta cualquier link genérico como texto (con o sin `http(s)://`).
- El mensaje de error se limpia al editar el campo.

---

## Archivos modificados / creados

| Archivo | Cambio |
|---|---|
| `index.html` | Input editable, aviso reforzado, área de error, eco de link recibido |
| `styles.css` | Estilos de error de input y de "link recibido" |
| `script.js` | Lectura/validación local del input, eco del link, simulación |
| `README.md` | Sección "Prueba con link genérico" (cómo probar, link no consultado) |
| `docs/mc-inmo-5f-prueba-link-generico.md` | Creado (este archivo) |

No se modificaron documentos anteriores. No se creó `assets/`. No se agregaron imágenes.

---

## Cómo probar localmente

1. Abrir `index.html` en el navegador (doble clic, sin servidor).
2. Editar o pegar un link en el bloque "① Link recibido".
3. Presionar **"Transformar en oferta profesional"**.
4. Verificar el eco "Link recibido", los estados simulados y la oferta final.
5. Probar el campo vacío y un texto que no sea link para ver los mensajes.

---

## Confirmaciones de seguridad

- ✅ **El link no se consulta** — no hay fetch, scraping, API, navegación
  automática ni descarga de imágenes. El valor se usa solo como texto local.
- ✅ Sin fetch/API/scraping (verificado en el diff).
- ✅ Se mantienen los datos ficticios (la oferta no cambia por el link).
- ✅ No se tocó Railway.
- ✅ No hubo deploy.
- ✅ Sin backend, base de datos, dependencias, CDNs ni imports externos.
- ✅ Sin imágenes, assets ni logos externos.
- ✅ CTA WhatsApp sigue siendo `href="#contacto"` (placeholder).
- ✅ Sin matrícula ni datos legales inventados (placeholder de 5E sin cambios).

---

## Criterio de éxito

- La demo abre localmente con `index.html`.
- Se puede pegar/editar un link en el bloque inicial.
- Al ejecutar, se muestra Link → Transformación → Oferta con eco del link.
- Campo vacío → mensaje claro; texto no-link → mensaje claro.
- La oferta final sigue usando datos ficticios.
- El CTA sigue siendo placeholder.
- Sin fetch/API/scraping, sin dependencias, sin backend, sin Railway, sin deploy.

---

## Rollback

Cambios en `index.html`, `styles.css`, `script.js`, `README.md` y un doc nuevo.
Para revertir:
- Antes del merge: cerrar el PR y eliminar la rama `feat/mc-inmo-5f-prueba-link-generico`.
- Después del merge: `git revert <sha>` del merge en `main`, o restaurar los
  archivos desde el commit `131e4ed` (estado MC-INMO-5E).

No hay infraestructura, servicios ni datos externos que limpiar.

---

## Próximo microciclo recomendado

**MC-INMO-5G — Edición asistida del texto de la oferta (simulada).** Permitir que
el usuario edite localmente el título/descripción de la oferta demo (solo en el
navegador, sin guardar ni publicar), reforzando el concepto "texto comercial
editable". Seguirá prohibido: fetch/scraping/APIs, backend, datos reales,
imágenes/assets externos, WhatsApp real, Railway, deploy y producción.

---

> Esta demo no habilita producción, deploy, Railway, WhatsApp real, backend,
> scraping, datos reales ni publicación comercial.
