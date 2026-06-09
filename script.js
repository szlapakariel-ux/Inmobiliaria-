/*
 * MC-INMO-5G/5K — Demo estática: prueba de link, edición local y vista cliente.
 * JavaScript mínimo:
 *  - valida el input localmente y hace eco del link recibido (no lo consulta);
 *  - orquesta la simulación visual LINK -> TRANSFORMACIÓN -> OFERTA;
 *  - permite editar localmente el texto comercial de la oferta demo;
 *  - 5K/5L: genera un link compartible (datos en el #hash, codificación compacta
 *    URL-safe que omite los valores demo por defecto) que abre una vista cliente
 *    limpia; con copiar y compartir nativo (Web Share API) si está disponible.
 *
 * IMPORTANTE: el link NO se consulta (sin fetch, scraping, APIs, navegación
 * automática ni descarga). La edición es 100% local en el navegador: NO usa IA
 * real, NO guarda (sin localStorage, cookies ni backend) y NO publica. La oferta
 * parte siempre de datos ficticios.
 */
(function () {
  "use strict";

  var btn = document.getElementById("transform-btn");
  var input = document.getElementById("link-input");
  var errorBox = document.getElementById("link-error");
  var processSection = document.getElementById("process-section");
  var offerSection = document.getElementById("offer-section");
  var linkReceived = document.getElementById("link-received");
  var linkReceivedValue = document.getElementById("link-received-value");
  var steps = Array.prototype.slice.call(document.querySelectorAll(".step"));

  var STEP_DELAY = 700;

  /* ── Campos editables de la oferta y editor ──────────────────────────── */
  var offerFields = {
    title: document.getElementById("offer-title"),
    desc: document.getElementById("offer-desc"),
    diff1: document.getElementById("diff-1"),
    diff2: document.getElementById("diff-2"),
    diff3: document.getElementById("diff-3"),
    cta: document.getElementById("cta-text")
  };
  var editFields = {
    title: document.getElementById("edit-title"),
    desc: document.getElementById("edit-desc"),
    diff1: document.getElementById("edit-diff1"),
    diff2: document.getElementById("edit-diff2"),
    diff3: document.getElementById("edit-diff3"),
    cta: document.getElementById("edit-cta")
  };
  var applyBtn = document.getElementById("apply-edits");
  var restoreBtn = document.getElementById("restore-demo");
  var editNotice = document.getElementById("edit-notice");

  // Exportación local (solo navegador: copiar / imprimir, sin envío ni guardado).
  var generateBtn = document.getElementById("generate-export");
  var copyBtn = document.getElementById("copy-export");
  var printBtn = document.getElementById("print-export");
  var exportText = document.getElementById("export-text");
  var exportStatus = document.getElementById("export-status");

  // Textos demo originales (única fuente de verdad, en memoria).
  var demoText = {};
  function captureDemoDefaults() {
    Object.keys(offerFields).forEach(function (k) {
      demoText[k] = offerFields[k] ? offerFields[k].textContent.trim() : "";
    });
  }
  function fillEditorFrom(textObj) {
    Object.keys(editFields).forEach(function (k) {
      if (editFields[k]) { editFields[k].value = textObj[k] || ""; }
    });
  }

  /* ── Link: validación mínima y eco (sin consultar nada) ──────────────── */
  function showError(message) {
    if (!errorBox) { return; }
    errorBox.textContent = message;
    errorBox.hidden = false;
    if (input) { input.classList.add("link-input--error"); }
  }
  function clearError() {
    if (!errorBox) { return; }
    errorBox.hidden = true;
    errorBox.textContent = "";
    if (input) { input.classList.remove("link-input--error"); }
  }
  // ¿Parece un link? Acepta cualquier link genérico o real como TEXTO.
  function looksLikeLink(value) {
    if (/\s/.test(value)) { return false; }
    return /^https?:\/\/\S+\.\S+/i.test(value) || /^\S+\.\S{2,}/.test(value);
  }

  function resetSteps() {
    steps.forEach(function (step) { step.classList.remove("active", "done"); });
  }
  function runStep(index) {
    if (index >= steps.length) { revealOffer(); return; }
    var step = steps[index];
    step.classList.add("active");
    window.setTimeout(function () {
      step.classList.remove("active");
      step.classList.add("done");
      runStep(index + 1);
    }, STEP_DELAY);
  }
  function revealOffer() {
    offerSection.hidden = false;
    btn.disabled = false;
    btn.textContent = "Transformar de nuevo";
    offerSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function startTransformation() {
    var value = (input && input.value ? input.value : "").trim();
    if (value === "") {
      showError("Pegá un link para iniciar la simulación.");
      if (input) { input.focus(); }
      return;
    }
    if (!looksLikeLink(value)) {
      showError("Para esta demo, ingresá un link de ejemplo.");
      if (input) { input.focus(); }
      return;
    }
    clearError();

    // Eco del link recibido (solo se muestra, no se consulta).
    if (linkReceived && linkReceivedValue) {
      linkReceivedValue.textContent = value;
      linkReceived.hidden = false;
    }

    btn.disabled = true;
    btn.textContent = "Transformando…";
    offerSection.hidden = true;
    processSection.hidden = false;
    resetSteps();
    processSection.scrollIntoView({ behavior: "smooth", block: "start" });
    runStep(0);
  }

  /* ── Edición local del texto comercial (solo en el navegador) ────────── */
  function applyEdits() {
    var empties = 0;
    Object.keys(editFields).forEach(function (k) {
      if (!editFields[k] || !offerFields[k]) { return; }
      var v = editFields[k].value.trim();
      if (v === "") { empties++; }
      offerFields[k].textContent = v;
    });
    // F. Validación mínima: avisar campos vacíos, pero no bloquear.
    if (editNotice) {
      if (empties > 0) {
        editNotice.textContent = "Hay campos vacíos en la oferta demo.";
        editNotice.hidden = false;
      } else {
        editNotice.hidden = true;
        editNotice.textContent = "";
      }
    }
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  function restoreDemo() {
    Object.keys(offerFields).forEach(function (k) {
      if (offerFields[k]) { offerFields[k].textContent = demoText[k]; }
    });
    fillEditorFrom(demoText);
    if (editNotice) { editNotice.hidden = true; editNotice.textContent = ""; }
  }

  /* ── Exportación local del texto comercial ───────────────────────────── */
  function txt(el) {
    return el ? el.textContent.trim().replace(/\s+/g, " ") : "";
  }
  // Arma el texto a partir de los datos visibles/editados de la oferta demo.
  function buildExportText() {
    var op = txt(document.querySelector(".tag--op"));
    var zone = txt(document.querySelector(".tag--zone"));
    var price = txt(document.querySelector(".offer-price"));
    var loc = txt(document.querySelector(".offer-loc")).replace(/^📍\s*/, "");
    var specs = Array.prototype.map.call(
      document.querySelectorAll(".spec"),
      function (s) {
        return (txt(s.querySelector(".spec-val")) + " " + txt(s.querySelector(".spec-key"))).trim();
      }
    );
    var diffs = [offerFields.diff1, offerFields.diff2, offerFields.diff3]
      .map(txt)
      .filter(function (d) { return d !== ""; });

    var L = [];
    L.push("DEMO PÚBLICA — datos ficticios — no usar comercialmente.");
    L.push("");
    L.push(txt(offerFields.title));
    L.push([op, zone].filter(Boolean).join(" · "));
    if (price) { L.push(price); }
    if (loc) { L.push(loc); }
    L.push("");
    if (specs.length) { L.push("Datos clave: " + specs.join(" · ")); L.push(""); }
    L.push("Descripción:");
    L.push(txt(offerFields.desc));
    L.push("");
    if (diffs.length) {
      L.push("Diferenciales:");
      diffs.forEach(function (d) { L.push("- " + d); });
      L.push("");
    }
    L.push("Contacto (demo): " + txt(offerFields.cta) + " — placeholder, sin número real.");
    L.push("Oferta presentada por Guadalupe Cabrera · RE/MAX Buró.");
    L.push("");
    L.push("DEMO PÚBLICA — datos ficticios — no usar comercialmente.");
    return L.join("\n");
  }
  function setExportStatus(message) {
    if (!exportStatus) { return; }
    exportStatus.textContent = message;
    exportStatus.hidden = false;
  }
  function generateExport() {
    if (exportText) { exportText.value = buildExportText(); }
    setExportStatus('Texto generado. Seleccionalo y copialo, o usá "Copiar texto".');
  }
  function copyExport() {
    if (!exportText) { return; }
    if (!exportText.value) { exportText.value = buildExportText(); }
    exportText.focus();
    exportText.select();
    try { exportText.setSelectionRange(0, exportText.value.length); } catch (e) {}
    var copied = false;
    // Intento principal (funciona en file:// vía execCommand).
    try { copied = document.execCommand("copy"); } catch (e) { copied = false; }
    // Best-effort con la Clipboard API si está disponible (no envía nada externo).
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try { navigator.clipboard.writeText(exportText.value); copied = true; } catch (e) {}
    }
    setExportStatus(
      copied
        ? "Texto copiado al portapapeles."
        : "Seleccioná el texto del recuadro y copialo manualmente (Ctrl/Cmd+C)."
    );
  }
  function printExport() {
    if (exportText && !exportText.value) { exportText.value = buildExportText(); }
    window.print(); // vista de impresión nativa del navegador, sin guardar ni enviar.
  }

  /* ── MC-INMO-5K: Vista cliente + link compartible (hash local) ───────── */
  // El link cliente embebe los textos en el #hash de la URL. SIN backend, base
  // de datos, localStorage, cookies, fetch ni API: todo viaja en la propia URL.
  var clientView = document.getElementById("client-view");
  var genClientBtn = document.getElementById("generate-client-link");
  var copyClientBtn = document.getElementById("copy-client-link");
  var shareClientBtn = document.getElementById("share-client-link");
  var openClientBtn = document.getElementById("open-client-link");
  var clientLinkText = document.getElementById("client-link-text");
  var clientLinkStatus = document.getElementById("client-link-status");

  function getSpec(i) {
    var s = document.querySelectorAll(".specs .spec")[i];
    return s ? txt(s.querySelector(".spec-val")) : "";
  }
  // Extrae solo el valor del precio (sin la nota "precio de referencia")
  // para que el rediseño 5N pueda renderizar valor y nota por separado.
  function txtPriceValue() {
    var el = document.querySelector("#offer-section .offer-price");
    if (!el) { return ""; }
    var clone = el.cloneNode(true);
    var note = clone.querySelector(".offer-price-note");
    if (note) { note.parentNode.removeChild(note); }
    return clone.textContent.trim().replace(/\s+/g, " ");
  }
  // Mapa clave-corta -> id de la vista cliente (claves cortas = URL más liviana).
  var CLIENT_MAP = {
    t: "c-title", o: "c-op", z: "c-zone", p: "c-price", l: "c-loc",
    a: "c-amb", s: "c-sup", b: "c-bath", d: "c-desc",
    f1: "c-diff1", f2: "c-diff2", f3: "c-diff3", c: "c-cta"
  };
  // Snapshot de los valores demo por defecto (para omitir lo que no cambió).
  var offerDefaults = null;
  function collectFullOfferData() {
    return {
      t: txt(offerFields.title),
      o: txt(document.querySelector(".tag--op")),
      z: txt(document.querySelector(".tag--zone")),
      p: txtPriceValue(),
      l: txt(document.querySelector(".offer-loc")),
      a: getSpec(0), s: getSpec(1), b: getSpec(2),
      d: txt(offerFields.desc),
      f1: txt(offerFields.diff1), f2: txt(offerFields.diff2), f3: txt(offerFields.diff3),
      c: txt(offerFields.cta)
    };
  }
  // Solo se incluyen en el link los campos que difieren del demo por defecto.
  function collectChangedData() {
    var full = collectFullOfferData(), out = {};
    Object.keys(full).forEach(function (k) {
      if (!offerDefaults || full[k] !== offerDefaults[k]) { out[k] = full[k]; }
    });
    return out;
  }
  // Codificación compacta: JSON -> UTF-8 -> base64 URL-safe (sin %xx, +, /, =).
  function encodeData(obj) {
    var b64 = btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function decodeData(payload) {
    try {
      var b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    } catch (e) { return null; }
  }
  function buildClientUrl() {
    return location.origin + location.pathname + "#cliente=" + encodeData(collectChangedData());
  }
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) { el.textContent = value || ""; }
  }
  // Rellena la vista cliente; los campos ausentes conservan el demo por defecto.
  function fillClientView(d) {
    Object.keys(CLIENT_MAP).forEach(function (k) {
      if (Object.prototype.hasOwnProperty.call(d, k)) { setText(CLIENT_MAP[k], d[k]); }
    });
    // Diferenciales vacíos: ocultar el <li> para no dejar viñetas sueltas.
    ["c-diff1", "c-diff2", "c-diff3"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.hidden = (el.textContent.trim() === ""); }
    });
  }
  // En modo cliente se ocultan todos los paneles internos de la vista Guadalupe.
  function showClientMode() {
    document.body.classList.add("mode-client");
    // 5O: fallback para navegadores sin :has() — hide chrome global.
    document.body.classList.add("mode-client-audaz");
    var hide = document.querySelectorAll(".concept, .moment, #process-section, #offer-section");
    Array.prototype.forEach.call(hide, function (el) { el.hidden = true; });
    if (clientView) { clientView.hidden = false; }
  }
  // Si la URL trae #cliente=…, mostrar solo la vista cliente.
  function initFromHash() {
    var m = (window.location.hash || "").match(/^#cliente=(.+)$/);
    if (!m) { return; }
    var data = decodeData(m[1]);
    if (!data) { return; }
    // 5T: mergear con los defaults de Guadalupe para que los campos
    // ausentes en el link (cuando el usuario no editó) caigan al texto
    // demo, en vez de quedarse vacíos en el HTML del client-view.
    var merged = {};
    Object.keys(CLIENT_MAP).forEach(function (k) {
      merged[k] = Object.prototype.hasOwnProperty.call(data, k)
        ? data[k]
        : (offerDefaults && offerDefaults[k] ? offerDefaults[k] : "");
    });
    fillClientView(merged);
    showClientMode();
    window.scrollTo(0, 0);
  }
  function setClientStatus(msg) {
    if (!clientLinkStatus) { return; }
    clientLinkStatus.textContent = msg;
    clientLinkStatus.hidden = false;
  }
  function generateClientLink() {
    if (clientLinkText) { clientLinkText.value = buildClientUrl(); }
    setClientStatus("Link cliente listo para compartir.");
  }
  // Compartir nativo (Web Share API) si el navegador lo soporta; si no, copiar.
  function shareClientLink() {
    var url = buildClientUrl();
    if (clientLinkText) { clientLinkText.value = url; }
    if (navigator.share) {
      navigator.share({ title: "Propuesta — Guadalupe Cabrera (demo)", url: url })
        .then(function () { setClientStatus("Link compartido."); })
        .catch(function () { setClientStatus("No se completó el compartir. Podés copiar el link."); });
    } else {
      copyClientLink();
    }
  }
  function copyClientLink() {
    if (!clientLinkText) { return; }
    if (!clientLinkText.value) { clientLinkText.value = buildClientUrl(); }
    clientLinkText.focus();
    clientLinkText.select();
    try { clientLinkText.setSelectionRange(0, clientLinkText.value.length); } catch (e) {}
    var copied = false;
    try { copied = document.execCommand("copy"); } catch (e) { copied = false; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try { navigator.clipboard.writeText(clientLinkText.value); copied = true; } catch (e) {}
    }
    setClientStatus(copied
      ? "Link copiado al portapapeles."
      : "Seleccioná el link del recuadro y copialo manualmente (Ctrl/Cmd+C).");
  }
  function openClientLink() {
    var url = buildClientUrl();
    if (clientLinkText) { clientLinkText.value = url; }
    // Navegación same-origin por hash (no abre ventanas ni recursos externos).
    window.location.href = url;
    initFromHash();
  }

  /* ── Wiring ──────────────────────────────────────────────────────────── */
  captureDemoDefaults();
  fillEditorFrom(demoText);
  offerDefaults = collectFullOfferData(); // snapshot demo (para omitir defaults)
  // Mostrar "Compartir" solo si el navegador soporta Web Share API.
  if (shareClientBtn && navigator.share) { shareClientBtn.hidden = false; }

  if (btn) { btn.addEventListener("click", startTransformation); }
  if (input) { input.addEventListener("input", clearError); }
  if (applyBtn) { applyBtn.addEventListener("click", applyEdits); }
  if (restoreBtn) { restoreBtn.addEventListener("click", restoreDemo); }
  if (generateBtn) { generateBtn.addEventListener("click", generateExport); }
  if (copyBtn) { copyBtn.addEventListener("click", copyExport); }
  if (printBtn) { printBtn.addEventListener("click", printExport); }

  if (genClientBtn) { genClientBtn.addEventListener("click", generateClientLink); }
  if (copyClientBtn) { copyClientBtn.addEventListener("click", copyClientLink); }
  if (shareClientBtn) { shareClientBtn.addEventListener("click", shareClientLink); }
  if (openClientBtn) { openClientBtn.addEventListener("click", openClientLink); }
  window.addEventListener("hashchange", initFromHash);

  // Si se abrió directamente un link de cliente, mostrar solo la vista cliente.
  initFromHash();
})();
