# MC-INMO-5G — Edición local del texto de la oferta + prueba con link real (evidencia)

**ID:** MC-INMO-5G
**Tipo:** Edición local del texto comercial + prueba con link real como texto
**Repo:** `szlapakariel-ux/Inmobiliaria-`
**Base:** MC-INMO-5F — commit `main` `23d9832`
**Rama:** `feat/mc-inmo-5g-edicion-local-texto-oferta`

Objetivo: permitir que el usuario pegue un link (genérico o real, **solo como
texto**), vea la transformación simulada y **edite localmente** el título, la
descripción, los diferenciales y el texto del CTA de la oferta demo.

Flujo:

**LINK (genérico/real como texto) → TRANSFORMACIÓN SIMULADA → OFERTA PROFESIONAL
CON SELLO DE GUADALUPE → EDICIÓN HUMANA LOCAL DEL TEXTO COMERCIAL**

> Este ciclo NO consulta internet, NO scrapea, NO usa APIs, NO usa backend, NO
> guarda, NO publica y NO usa IA real.

---

## Link real de prueba (usado solo como texto de entrada)

```
https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-monoambiente-en-alquiler-1-bano-58999975.html?n_src=Listado&n_pills=SUM&n_pg=1&n_pos=20
```

- Se usa **solo como texto** de entrada en el input.
- **No se consulta la URL** · no hay fetch · no scraping · no navegación
  automática · no se extraen datos · no se descargan fotos.
- **No se copia** título, descripción ni imágenes de ZonaProp.
- La oferta final sigue usando **datos demo / textos editados manualmente**.
- Aviso visible en UI: *"Link real usado solo como ejemplo de entrada. Esta demo
  no consulta la publicación."*

Validado (headless, vía CDP):
- El input **acepta** ese link real (sin error, oferta mostrada).
- El flujo muestra **"Link recibido"** con el link real.
- La transformación sigue siendo **simulada**.
- El título de la oferta **no cambia** por el link (no depende de datos del portal).

---

## Cambios aplicados

### A — Panel de edición local
Bloque "Editá el texto comercial antes de compartir" (aparece con la oferta) con
campos para: **título**, **descripción comercial**, **diferencial 1/2/3** y
**texto del CTA**. Los campos se inicializan con los textos demo.

### B — Aplicar cambios a la oferta
Botón "Aplicar cambios a la oferta": copia los textos del editor a la oferta
**solo en el navegador** (manipulación del DOM). **Sin** servidor, localStorage,
cookies ni base de datos.

### C — Restaurar demo
Botón "Restaurar texto demo": devuelve los textos ficticios originales (fuente de
verdad en memoria) y rellena el editor con ellos.

### D — Avisos visibles
- *"Edición local de demo. No guarda, no publica y no usa IA real."*
- *"Esta demo no consulta internet, no lee publicaciones y no extrae datos reales."*

### E — Mantener datos ficticios
La edición no convierte la demo en oferta real. No se agregan datos reales,
dirección exacta, matrícula, teléfono real ni WhatsApp real. El CTA queda como
placeholder (`#contacto`).

### F — Validación mínima
Si algún campo queda vacío, se permite aplicar pero se muestra el aviso suave
*"Hay campos vacíos en la oferta demo."* (sin bloqueo ni validaciones externas).

---

## Archivos modificados / creados

| Archivo | Cambio |
|---|---|
| `index.html` | Aviso de link real, ids editables en la oferta, panel de edición |
| `styles.css` | Estilos del panel de edición y del aviso de link real |
| `script.js` | Eco del link, edición local (aplicar/restaurar), validación suave |
| `README.md` | Sección "Edición local del texto comercial" + nota de link real |
| `docs/mc-inmo-5g-edicion-local-texto-oferta.md` | Creado (este archivo) |

No se modificaron documentos anteriores. No se creó `assets/`. No se agregaron imágenes.

---

## Cómo probar localmente

1. Abrir `index.html` en el navegador (doble clic, sin servidor).
2. En "① Link recibido", pegar un link genérico **o el link real de ZonaProp** (como texto).
3. Presionar "Transformar en oferta profesional" → ver "Link recibido" y la simulación.
4. En el panel "Editá el texto comercial…", cambiar título/descripción/diferenciales/CTA.
5. "Aplicar cambios a la oferta" → la oferta se actualiza en pantalla.
6. "Restaurar texto demo" → vuelven los textos ficticios.
7. Vaciar un campo y aplicar → aparece el aviso suave.

---

## Confirmaciones de seguridad

- ✅ **El link no se consulta** (genérico o real) — solo texto local.
- ✅ **La edición es local** — manipula el DOM en el navegador.
- ✅ **No guarda ni publica** — sin localStorage, cookies, backend ni base de datos
  (verificado: `localStorage` y `document.cookie` vacíos en runtime).
- ✅ **No hay IA real** — los textos los escribe el usuario; no hay generación automática.
- ✅ Sin fetch/API/scraping (verificado en el diff).
- ✅ Se mantienen los datos ficticios (la oferta no se llena con datos del portal).
- ✅ No se tocó Railway · no hubo deploy.
- ✅ Sin backend, dependencias, CDNs ni imports externos.
- ✅ Sin imágenes, assets ni logos externos.
- ✅ CTA `href="#contacto"` placeholder · sin matrícula/datos legales inventados.

---

## Criterio de éxito

- La demo abre localmente con `index.html`.
- Se puede pegar un link genérico y el link real de ZonaProp (como texto).
- El link no se consulta; se muestra "Link recibido".
- Se puede editar título, descripción, diferenciales y texto del CTA.
- "Aplicar" actualiza la oferta; "Restaurar" vuelve a los textos demo.
- Campos vacíos → aviso suave.
- La oferta sigue marcada como demo; el CTA sigue siendo placeholder.
- Sin fetch/API/scraping, IA real, persistencia, dependencias, backend, Railway ni deploy.

---

## Rollback

Cambios en `index.html`, `styles.css`, `script.js`, `README.md` y un doc nuevo.
Para revertir:
- Antes del merge: cerrar el PR y eliminar la rama `feat/mc-inmo-5g-edicion-local-texto-oferta`.
- Después del merge: `git revert <sha>` del merge en `main`, o restaurar los
  archivos desde el commit `23d9832` (estado MC-INMO-5F).

No hay infraestructura, servicios, persistencia ni datos externos que limpiar.

---

## Próximo microciclo recomendado

**MC-INMO-5H — Exportar/compartir la oferta como texto (local).** Permitir copiar
al portapapeles el texto comercial editado (solo en el navegador, acción iniciada
por el usuario), o generar una vista imprimible local. Seguirá prohibido:
fetch/scraping/APIs, IA real, backend, persistencia en servidor, datos reales,
imágenes/assets externos, WhatsApp real, Railway, deploy y producción.

---

> Esta demo no habilita producción, deploy, Railway, WhatsApp real, backend,
> scraping, IA real, datos reales ni publicación comercial.
