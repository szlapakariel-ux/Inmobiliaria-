# Inmobiliaria — Demo MC-INMO-5A

Demo técnica mínima, local y segura del flujo:

**LINK → TRANSFORMACIÓN → OFERTA PROFESIONAL CON SELLO DE GUADALUPE**

> Frase madre: **De link genérico a oferta profesional con tu sello.**

La demo muestra cómo un link genérico de una publicación se transforma,
mediante estados simulados, en una oferta profesional con la identidad de
**Guadalupe Cabrera**.

---

## Demo pública

> **DEMO PÚBLICA — DATOS FICTICIOS — NO USAR COMERCIALMENTE.**

URL pública (GitHub Pages): **https://szlapakariel-ux.github.io/Inmobiliaria-/**

Es una **demostración de concepto pública y no comercial**. No es un producto
final ni una oferta inmobiliaria real. Usa datos ficticios. Sitio estático
servido por GitHub Pages desde `main` (carpeta raíz), **sin Railway, sin backend
y sin build**.

---

## Propósito

Mostrar de forma visual y controlada el concepto del producto: tomar un link
genérico y presentarlo como una oferta profesional con sello propio. Es una
**demostración de concepto**, no un producto funcional.

## Cómo abrir localmente

No requiere instalación, servidor ni build. Basta con abrir el archivo
`index.html` en cualquier navegador moderno:

1. Cloná o descargá este repositorio.
2. Hacé doble clic en `index.html` (o abrilo con tu navegador).
3. En el bloque inicial, **pegá o editá un link** genérico (viene precargado uno
   ficticio de ejemplo) y presioná **"Transformar en oferta profesional"**.
4. Observá los estados simulados y la oferta final generada.

### Prueba con link genérico

El campo de link es **editable**: podés reemplazar el ejemplo por cualquier link
genérico (como texto) y simular el flujo.

- **El link no se consulta.** Esta demo no hace fetch, scraping, ni navegación
  automática, ni descarga imágenes, ni extrae datos reales. Solo simula la
  transformación localmente.
- Si el campo está vacío, la demo pide *"Pegá un link para iniciar la simulación."*
- Si el texto no parece un link, pide *"Para esta demo, ingresá un link de ejemplo."*
- La oferta final **siempre usa los datos ficticios** ya definidos: no cambia por
  el link ingresado.
- Podés pegar **cualquier link como texto** para probar el flujo. Se usa solo como
  entrada visual: la demo **no consulta la publicación**, no lee enlaces ni copia
  contenido de ningún portal.

### Edición local del texto comercial

Tras la transformación, un panel permite **editar localmente** el texto comercial
de la oferta demo: título, descripción, diferenciales y texto del CTA.

- **"Aplicar cambios a la oferta"** actualiza la oferta visualmente, **solo en el
  navegador**. No guarda (sin localStorage, cookies ni servidor), no publica y
  **no usa IA real**.
- **"Restaurar texto demo"** vuelve a los textos ficticios originales.
- Si quedan campos vacíos, aparece un aviso suave (no bloquea).
- El CTA sigue siendo un placeholder (`#contacto`), sin número ni WhatsApp real.

### Exportar la oferta como texto (local)

Bajo la oferta, el bloque "Exportar oferta editada" arma un texto comercial con
los datos visibles/editados:

- **"Generar texto comercial"** crea el texto en un recuadro seleccionable
  (incluye el aviso *"DEMO PÚBLICA — datos ficticios — no usar comercialmente."*).
- **"Copiar texto"** intenta copiar al portapapeles; si el navegador no lo
  permite, el recuadro queda seleccionable para copiar manualmente (Ctrl/Cmd+C).
- **"Ver versión para imprimir"** abre el diálogo de impresión nativo del
  navegador (no guarda ni envía nada).

Copiar/exportar **no envía ni publica nada**: no abre WhatsApp, no usa WhatsApp
real, no hay backend, scraping, IA real ni guardado. Todo es local y manual.

## Qué es y qué NO es

Esta demo:

- Usa **datos ficticios** (ver `docs/demo-scope.md`).
- Es una **demo pública no comercial** — **no es producción** ni un producto final.
- Se publica **solo como sitio estático en GitHub Pages** (`main`, raíz). **No usa Railway.**
- **No hace scraping** de portales ni de ningún sitio.
- **No tiene backend** (es 100% estática: HTML/CSS/JS).
- **No usa datos reales** de propiedades, personas ni portales.
- **No usa imágenes de terceros** — las galerías son placeholders en HTML/CSS.
- **No usa IA real** — los textos los escribe el usuario.
- **No hace fetch, no llama APIs, no abre el link ingresado.**
- **No captura leads** ni envía mensajes: el CTA de WhatsApp es un placeholder sin acción real.

## Stack

- HTML
- CSS
- JavaScript mínimo (solo orquesta la animación de estados)

Sin frameworks, sin dependencias externas, sin base de datos, sin build.

## Archivos

| Archivo | Rol |
|---------|-----|
| `index.html` | Estructura y contenido de la demo |
| `styles.css` | Estilos e identidad visual de Guadalupe |
| `script.js` | Simulación local del flujo de transformación |
| `docs/demo-scope.md` | Alcance, restricciones, rollback y criterios |
| `README.md` | Este archivo |

---

Demo pública — datos ficticios — no usar comercialmente.
