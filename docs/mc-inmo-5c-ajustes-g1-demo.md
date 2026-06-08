# MC-INMO-5C — Ajustes G1 sobre la demo (evidencia)

**ID:** MC-INMO-5C
**Tipo:** Mejora de claridad comunicacional (solo ajustes G1)
**Repo:** `szlapakariel-ux/Inmobiliaria-`
**Base:** MC-INMO-5B — commit `main` `fa5f6d0`
**Rama:** `feat/mc-inmo-5c-ajustes-g1-demo`

Objetivo: aplicar los ajustes mínimos de claridad detectados en la validación
MC-INMO-5B para mejorar la comprensión del flujo:

**LINK → TRANSFORMACIÓN → OFERTA PROFESIONAL CON SELLO DE GUADALUPE**

---

## Cambios aplicados (solo ajustes G1)

### G1-A — Frase madre en el cierre
- Agregado bloque `.closing-claim` al final de la oferta con la frase
  *"De link genérico a oferta profesional con tu sello."* + confirmación
  *"Eso es exactamente lo que acabas de ver."*
- Fondo oscuro (contraste con el resto de la oferta) para que funcione
  como conclusión del recorrido, no como texto decorativo.

### G1-B — Bloque Antes / Después
- Agregada sección `.before-after` al inicio del flujo (antes del bloque
  de entrada), visible sin necesidad de interactuar.
- Dos columnas: "Antes" (link genérico, fondo neutro) / "Después" (oferta
  con sello, fondo dorado suave), con flecha central.
- En mobile ≤520px colapsa a layout vertical para mantener legibilidad.

### G1-C — Avisos de simulación más visibles
- Banner global `.demo-banner` amplificado: ahora incluye los 5 recordatorios
  ("datos ficticios · no publicar · no consulta internet · no scraping ·
  no publica nada") en lugar de solo "DEMO".
- Agregados dos bloques `.sim-notice` (fondo azul claro, borde visible):
  uno en el bloque de entrada (sobre el link ficticio) y otro en la sección
  de proceso (durante la transformación). Tamaño de fuente legible (0.9rem),
  no minimizado.

### G1-D — Simplificación de la oferta final
- Descripción recortada a 3 oraciones clave (eliminada la oración de
  "gastronomía").
- Etiquetas de specs abreviadas ("Total", "Cubierta") para más claridad.
- Reducidos paddings internos levemente para mejorar densidad visual.

### G1-E — Mobile angosto
- Breakpoint ≤520px: bloque Antes/Después colapsa a columna vertical;
  specs pasa a 2 columnas.
- Breakpoint ≤360px: link input con fuente más chica; galería de thumbs
  pasa a 2 columnas (58px alto); step labels y botón más compactos;
  frase de cierre reducida.

---

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `index.html` | Todos los ajustes G1-A, B, C, D |
| `styles.css` | Estilos para G1-A, B, C, D, E |
| `docs/mc-inmo-5c-ajustes-g1-demo.md` | Creado (este archivo) |

## Archivos NO modificados (confirmado)

| Archivo | Estado |
|---|---|
| `script.js` | Sin cambios (diff vacío vs main) |
| `README.md` | Sin cambios |
| `docs/demo-scope.md` | Sin cambios |
| `docs/mc-inmo-5b-validacion-local-demo.md` | Sin cambios |

---

## Confirmaciones de seguridad

- ✅ Solo se aplicaron ajustes G1 (claridad comunicacional).
- ✅ No se tocó Railway.
- ✅ No hubo deploy.
- ✅ No hubo backend.
- ✅ No se usaron datos reales.
- ✅ No se agregaron imágenes (galerías siguen siendo placeholders CSS).
- ✅ No hay fetch, scraping ni llamadas API.
- ✅ No hay dependencias externas.
- ✅ No hay workflows, secrets ni archivos fuera de scope.
- ✅ El link ficticio sigue siendo `https://portal-ejemplo.invalid/propiedad-demo-123`.
- ✅ El CTA WhatsApp sigue siendo `href="#contacto"` (placeholder sin número real).
- ✅ No se creó `assets/`.

---

## Criterio de éxito

La demo actualizada cumple MC-INMO-5C si:
- Abre localmente con solo abrir `index.html`.
- El bloque Antes/Después es visible antes de interactuar.
- La frase madre aparece tanto en el header como al cierre de la oferta.
- Los avisos de simulación son visibles (no en letra mínima).
- La oferta final se lee sin saturación.
- Se ve razonablemente bien en celular angosto (≤360px).
- No hay fetch, API, scraping, backend, datos reales ni imágenes de terceros.

---

## Rollback

Los cambios son solo sobre `index.html` y `styles.css`. Para revertir:
- Antes del merge: cerrar el PR y eliminar la rama `feat/mc-inmo-5c-ajustes-g1-demo`.
- Después del merge: `git revert <sha>` del commit de merge en `main`,
  o restaurar ambos archivos desde el commit `6a925d7` (MC-INMO-5A).

No hay infraestructura, servicios ni datos externos que limpiar.

---

## Próximo microciclo recomendado

**MC-INMO-5D — Ciclo visual (G2):** definir identidad visual definitiva
(logo, paleta, tipografía) y aplicarla a la demo, usando solo activos propios
o autorizados. Sigue sin habilitar nada de G3 (Railway, deploy, WhatsApp real,
backend, scraping, datos reales, imágenes de terceros, formularios, leads,
CRM, producción).

---

> Esta demo no habilita producción, deploy, Railway, WhatsApp real, backend,
> scraping, datos reales ni publicación comercial.
