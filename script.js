/*
 * MC-INMO-5G — Demo estática con prueba de link y edición local del texto.
 * JavaScript mínimo:
 *  - valida el input localmente y hace eco del link recibido (no lo consulta);
 *  - orquesta la simulación visual LINK -> TRANSFORMACIÓN -> OFERTA;
 *  - permite editar localmente el texto comercial de la oferta demo.
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
    L.push("DEMO — datos ficticios, no publicar.");
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
    L.push("DEMO — datos ficticios, no publicar.");
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

  /* ── Wiring ──────────────────────────────────────────────────────────── */
  captureDemoDefaults();
  fillEditorFrom(demoText);

  if (btn) { btn.addEventListener("click", startTransformation); }
  if (input) { input.addEventListener("input", clearError); }
  if (applyBtn) { applyBtn.addEventListener("click", applyEdits); }
  if (restoreBtn) { restoreBtn.addEventListener("click", restoreDemo); }
  if (generateBtn) { generateBtn.addEventListener("click", generateExport); }
  if (copyBtn) { copyBtn.addEventListener("click", copyExport); }
  if (printBtn) { printBtn.addEventListener("click", printExport); }
})();
