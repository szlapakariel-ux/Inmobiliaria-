# MC-INMO-5K — Vista cliente + link compartible (evidencia)

**ID:** MC-INMO-5K
**Tipo:** Feature de demo estática (vista cliente vía URL hash/fragment)
**Repo:** `szlapakariel-ux/Inmobiliaria-`
**Base:** `main` (MC-INMO-5J presente; tip `274f5ef`)
**Rama:** `feat/mc-inmo-5k-vista-cliente-link-compartible`

## Objetivo del ciclo

Separar dos vistas en la demo pública:

- **Vista Guadalupe / edición:** la actual — pegar link como texto, transformación
  simulada, edición local del texto comercial, exportar texto y **generar un link
  para cliente**.
- **Vista cliente:** muestra **solo la oferta profesional limpia**, sin el bloque
  "pegá el link", sin transformación, sin panel de edición, sin exportar, sin
  controles internos ni mensajes técnicos.

Flujo:

```
GUADALUPE: pega link → transformación simulada → edita oferta → genera link cliente
CLIENTE:   abre link → ve solo la oferta profesional limpia
```

## Cambios aplicados

| Dónde | Cambio |
|---|---|
| `index.html` | Bloque "Generar link para cliente" (botones generar/copiar/abrir + aviso de seguridad + campo seleccionable). Nueva `<section id="client-view">` con la pieza limpia. Footer: "Sin deploy" → "Sin base de datos" (ya está publicado en Pages). |
| `script.js` | Lógica 5K: `collectOfferData`, `encodeData/decodeData` (hash), `buildClientUrl`, `fillClientView`, `showClientMode`, `initFromHash`, generar/copiar/abrir link. Listener `hashchange`. |
| `styles.css` | Estilos mínimos: `.client-intro`, `.sr-only-title`, `.client-gen`, `body.mode-client`. |
| `README.md` | Documenta la vista cliente, el link por hash y las garantías. |
| `docs/mc-inmo-5k-vista-cliente-link-compartible.md` | Este archivo (evidencia). |

No se modificaron documentos anteriores. No se creó `assets/`. No se agregaron
imágenes, dependencias ni workflows.

## Mecanismo hash/fragment (sin backend)

1. En la vista Guadalupe, "Generar link para cliente" toma los textos
   visibles/editados de la oferta (`collectOfferData`).
2. Se serializan con `JSON.stringify`, se codifican de forma segura para unicode
   con `encodeURIComponent` y luego `btoa` (base64).
3. Se arma la URL: `location.origin + location.pathname + "#cliente=" + payload`.
   Ejemplo: `https://szlapakariel-ux.github.io/Inmobiliaria-/#cliente=JTdC...`
4. Al abrir esa URL, `initFromHash` detecta `#cliente=`, decodifica
   (`atob` → `decodeURIComponent` → `JSON.parse`), rellena la vista cliente y
   oculta todos los paneles internos (`body.mode-client`).

**Todo viaja dentro de la URL.** No hay servidor, base de datos ni guardado: los
datos no se persisten en ningún lado, solo existen en el `#hash` de ese link.

## Cómo probar localmente

1. Abrí `index.html` en el navegador.
2. Pegá un link de ejemplo y "Transformar en oferta profesional".
3. Editá título/descripción/diferenciales/CTA y "Aplicar cambios".
4. "Generar link para cliente" → copiá el link del recuadro (o "Abrir vista cliente").
5. Abrí ese link (o pegalo en otra pestaña): se ve **solo** la oferta limpia, sin
   paneles internos, con los textos editados.

## Cómo probar en la URL pública

1. Abrí `https://szlapakariel-ux.github.io/Inmobiliaria-/`.
2. Repetí el flujo y "Generar link para cliente".
3. El link generado apunta al mismo dominio público con `#cliente=…`.
4. Abrílo en otra pestaña/dispositivo: muestra la vista cliente limpia.

> Nota: la verificación pública final debe hacerla Ariel desde un navegador real.
> El entorno remoto de Claude no puede alcanzar `github.io` (responde
> `HTTP 403 "Host not in allowlist"` por política de red del sandbox); eso **no**
> es una falla del feature ni de GitHub Pages.

## Validación local (headless, vía CDP) — resultados

- Vista Guadalupe: badge "DEMO PÚBLICA · DATOS FICTICIOS · NO USAR COMERCIALMENTE",
  flujo + edición + exportación siguen funcionando. ✓
- "Generar link para cliente" produce URL con `#cliente=…`; el payload decodifica
  exactamente los textos editados. ✓
- "Copiar link": status "Link copiado al portapapeles." ✓
- Vista cliente (abriendo el link): `client-view` visible; `concept`, momento 1,
  `process-section` y `offer-section` **ocultos**; `body.mode-client` activo. ✓
- Campos cliente reflejan ediciones; diferencial vacío se oculta; CTA `#contacto`. ✓
- Aviso "DEMO PÚBLICA — … — NO USAR COMERCIALMENTE" presente en la vista cliente. ✓

## Confirmaciones de alcance

- ✅ **Sin backend** — sitio 100% estático (HTML/CSS/JS).
- ✅ **Sin base de datos.**
- ✅ **Sin `localStorage` ni cookies** (las palabras solo aparecen en comentarios).
- ✅ **Sin `fetch` / API / scraping** — el link no se consulta; los datos viajan en el hash.
- ✅ **Sin IA real** — los textos los escribe el usuario.
- ✅ **Sin imágenes/assets/logos externos** — galerías placeholder en HTML/CSS.
- ✅ **Sin WhatsApp real** — CTA placeholder con `href="#contacto"`.
- ✅ **Sin `window.open`** — la vista cliente se abre por navegación same-origin (hash).
- ✅ **No se tocó Railway.**
- ✅ **No hubo deploy alternativo** — sigue siendo GitHub Pages desde `main` raíz.
- ✅ **Sin workflows, secrets ni dependencias nuevas.**

## Criterio de éxito

- La vista Guadalupe sigue funcionando (no rompe 5F/5G/5H).
- Se genera un link cliente que abre una vista limpia.
- La vista cliente no muestra paneles internos y refleja los textos editados.
- CTA placeholder `#contacto`; sin WhatsApp real; sin backend/Railway/scraping.

## Rollback

- Revertir el PR si el comportamiento publicado es incorrecto (`git revert`).
- No tocar Railway. No borrar historial.
- Como `main` se publica automáticamente en Pages, revertir el PR revierte la
  versión pública.

## Próximo microciclo recomendado

**MC-INMO-5L — Verificación pública por Ariel + presentación a Guadalupe.** Ariel
abre la URL pública desde un navegador real, genera un link cliente y lo prueba en
otro dispositivo; luego se presenta el flujo a Guadalupe (guion 5I) usando la vista
cliente como entregable compartible. Sigue sin habilitar: producción comercial,
datos/imágenes reales, logos externos, WhatsApp real, backend, base de datos,
persistencia, IA real, scraping, Railway, dominio propio, workflows, CRM.

---

> Este ciclo habilita únicamente una vista cliente de demo pública no comercial con
> datos ficticios, generada por hash en la propia URL. No habilita producción, datos
> reales, imágenes reales, WhatsApp real, backend, base de datos, persistencia, IA
> real, scraping ni Railway.
