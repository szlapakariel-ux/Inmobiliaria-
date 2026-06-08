# MC-INMO-5A — Alcance de la demo (demo-scope)

## Objetivo

Crear una demo técnica mínima, local y segura que muestre el flujo:

**LINK → TRANSFORMACIÓN → OFERTA PROFESIONAL CON SELLO DE GUADALUPE**

Frase madre: **De link genérico a oferta profesional con tu sello.**

La demo comunica el concepto de transformar un link genérico en una oferta
profesional con la identidad de Guadalupe Cabrera, mediante estados simulados
y datos ficticios.

> **Esta demo no habilita producción, deploy, Railway ni publicación comercial.**

## Archivos creados

- `README.md` — propósito, instrucciones de uso local y restricciones.
- `index.html` — estructura y contenido de la demo.
- `styles.css` — estilos e identidad visual.
- `script.js` — JavaScript mínimo que simula el flujo de transformación.
- `docs/demo-scope.md` — este documento.

No se creó la carpeta `assets/`. No se agregaron imágenes reales ni de terceros.
Las galerías son placeholders construidos con HTML/CSS.

## Datos ficticios usados

Todos marcados como demo:

- Título: Departamento 2 ambientes con balcón en Palermo
- Operación: Venta
- Precio: USD 118.000
- Zona: Palermo, CABA
- Ambientes: 2
- Dormitorios: 1
- Baños: 1
- Superficie total: 48 m²
- Superficie cubierta: 42 m²
- Expensas: ARS 95.000
- Estado: Muy bueno
- Apto crédito: Sí

Link ficticio usado: `https://portal-ejemplo.invalid/propiedad-demo-123`
(dominio `.invalid`, no navegable, no se consulta).

Prohibido y NO usado: datos reales de ZonaProp, RE/MAX u otros portales.

## Restricciones (respetadas)

- No hace fetch.
- No hace scraping.
- No llama APIs.
- No usa datos reales.
- No descarga imágenes.
- No usa imágenes de terceros.
- No toca Railway.
- No deploya.
- No crea backend.
- No usa base de datos.
- No instala dependencias.
- No usa frameworks ni build complejo.
- No usa producción.
- CTA de WhatsApp: placeholder, sin número real, sin API, sin envío automático,
  sin captura de leads ni seguimiento.

## Rollback

La demo está aislada en la rama `demo/mc-inmo-landing-estatica` y aporta solo
archivos nuevos estáticos. Para revertir:

- Antes del merge: cerrar el PR y/o eliminar la rama `demo/mc-inmo-landing-estatica`.
- Después del merge: revertir el commit de merge en `main`
  (`git revert <sha>`), o eliminar los archivos creados
  (`index.html`, `styles.css`, `script.js`, `docs/demo-scope.md`)
  y restaurar el `README.md` mínimo.

No hay servicios, infraestructura ni datos externos que limpiar: el rollback es
puramente de archivos en el repositorio.

## Criterio de éxito

La demo es exitosa si:

- Abre localmente con solo abrir `index.html`.
- Muestra el flujo Link → Transformación → Oferta.
- Comunica "De link genérico a oferta profesional con tu sello".
- Se ve razonablemente bien en celular.
- Parece una oferta de Guadalupe, no una ficha de portal.
- No usa datos reales.
- No usa imágenes de terceros.
- No toca Railway, no deploya, no crea backend, no instala dependencias.

## Próximos pasos recomendados

- Reemplazar placeholders visuales por una galería real **solo con imágenes
  propias/autorizadas** y consentimiento, en un microciclo aparte.
- Definir identidad visual definitiva (logo, tipografía, paleta) de Guadalupe.
- Especificar, en un ciclo futuro y con su propio análisis de seguridad/legal,
  el origen real de datos (carga manual asistida) — nunca scraping de portales.
- Diseñar el CTA de contacto real (canal, número, mensajería) con su propio
  alcance de privacidad y tratamiento de leads.

---

**Recordatorio:** Esta demo no habilita producción, deploy, Railway ni
publicación comercial.
