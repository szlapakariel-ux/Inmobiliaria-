# Inmobiliaria — Demo MC-INMO-5A

Demo técnica mínima, local y segura del flujo:

**LINK → TRANSFORMACIÓN → OFERTA PROFESIONAL CON SELLO DE GUADALUPE**

> Frase madre: **De link genérico a oferta profesional con tu sello.**

La demo muestra cómo un link genérico de una publicación se transforma,
mediante estados simulados, en una oferta profesional con la identidad de
**Guadalupe Cabrera**.

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
3. Pegá/usá el link ficticio precargado y presioná **"Transformar en oferta profesional"**.
4. Observá los estados simulados y la oferta final generada.

## Qué es y qué NO es

Esta demo:

- Usa **datos ficticios** (ver `docs/demo-scope.md`).
- **No es producción.**
- **No usa Railway.**
- **No tiene deploy** de ningún tipo.
- **No hace scraping** de portales ni de ningún sitio.
- **No tiene backend** (es 100% estática: HTML/CSS/JS).
- **No usa datos reales** de propiedades, personas ni portales.
- **No usa imágenes de terceros** — las galerías son placeholders en HTML/CSS.
- **No hace fetch, no llama APIs, no abre el link ficticio.**
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

Demo MC-INMO-5A — datos ficticios, no publicar.
