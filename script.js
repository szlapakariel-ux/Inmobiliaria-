/*
 * MC-INMO-5G/5K — Demo estática: prueba de link, edición local y vista cliente.
 * JavaScript mínimo:
 *  - valida el input localmente y hace eco del link recibido (no lo consulta);
 *  - orquesta la simulación visual LINK -> TRANSFORMACIÓN -> OFERTA;
 *  - permite editar localmente el texto comercial de la oferta demo;
 *  - 5K: genera un link compartible (datos en el #hash) que abre una vista
 *    cliente limpia, sin paneles internos de edición/transformación/export.
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
  var openClientBtn = document.getElementById("open-client-link");
  var clientLinkText = document.getElementById("client-link-text");
  var clientLinkStatus = document.getElementById("client-link-status");

  function getSpec(i) {
    var s = document.querySelectorAll(".specs .spec")[i];
    return s ? txt(s.querySelector(".spec-val")) : "";
  }
  // Reúne los datos visibles/editados de la oferta (para el link cliente).
  function collectOfferData() {
    return {
      title: txt(offerFields.title),
      op: txt(document.querySelector(".tag--op")),
      zone: txt(document.querySelector(".tag--zone")),
      price: txt(document.querySelector(".offer-price")),
      loc: txt(document.querySelector(".offer-loc")),
      amb: getSpec(0),
      sup: getSpec(1),
      bath: getSpec(2),
      desc: txt(offerFields.desc),
      diff1: txt(offerFields.diff1),
      diff2: txt(offerFields.diff2),
      diff3: txt(offerFields.diff3),
      cta: txt(offerFields.cta)
    };
  }
  // Codificación segura unicode -> URI -> base64 (y su inversa).
  function encodeData(obj) { return btoa(encodeURIComponent(JSON.stringify(obj))); }
  function decodeData(payload) {
    try { return JSON.parse(decodeURIComponent(atob(payload))); }
    catch (e) { return null; }
  }
  function buildClientUrl() {
    return location.origin + location.pathname + "#cliente=" + encodeData(collectOfferData());
  }
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) { el.textContent = value || ""; }
  }
  // Rellena la vista cliente con los datos decodificados del hash.
  function fillClientView(d) {
    setText("c-title", d.title);
    setText("c-op", d.op);
    setText("c-zone", d.zone);
    setText("c-price", d.price);
    setText("c-loc", d.loc);
    setText("c-amb", d.amb);
    setText("c-sup", d.sup);
    setText("c-bath", d.bath);
    setText("c-desc", d.desc);
    setText("c-diff1", d.diff1);
    setText("c-diff2", d.diff2);
    setText("c-diff3", d.diff3);
    setText("c-cta", d.cta);
    // Diferenciales vacíos: ocultar el <li> para no dejar viñetas sueltas.
    ["c-diff1", "c-diff2", "c-diff3"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.hidden = (el.textContent.trim() === ""); }
    });
  }
  // En modo cliente se ocultan todos los paneles internos de la vista Guadalupe.
  function showClientMode() {
    document.body.classList.add("mode-client");
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
    fillClientView(data);
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
    setClientStatus("Link generado. Copialo y compartilo, o abrí la vista cliente.");
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

  if (btn) { btn.addEventListener("click", startTransformation); }
  if (input) { input.addEventListener("input", clearError); }
  if (applyBtn) { applyBtn.addEventListener("click", applyEdits); }
  if (restoreBtn) { restoreBtn.addEventListener("click", restoreDemo); }
  if (generateBtn) { generateBtn.addEventListener("click", generateExport); }
  if (copyBtn) { copyBtn.addEventListener("click", copyExport); }
  if (printBtn) { printBtn.addEventListener("click", printExport); }

  if (genClientBtn) { genClientBtn.addEventListener("click", generateClientLink); }
  if (copyClientBtn) { copyClientBtn.addEventListener("click", copyClientLink); }
  if (openClientBtn) { openClientBtn.addEventListener("click", openClientLink); }
  window.addEventListener("hashchange", initFromHash);

  // Si se abrió directamente un link de cliente, mostrar solo la vista cliente.
  initFromHash();
})();
