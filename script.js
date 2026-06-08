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

  /* ── Wiring ──────────────────────────────────────────────────────────── */
  captureDemoDefaults();
  fillEditorFrom(demoText);

  if (btn) { btn.addEventListener("click", startTransformation); }
  if (input) { input.addEventListener("input", clearError); }
  if (applyBtn) { applyBtn.addEventListener("click", applyEdits); }
  if (restoreBtn) { restoreBtn.addEventListener("click", restoreDemo); }
})();
