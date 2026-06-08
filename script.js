/*
 * MC-INMO-5F — Demo estática con prueba de link genérico.
 * JavaScript mínimo: valida el input localmente, hace eco del link recibido
 * y orquesta la simulación visual del flujo LINK -> TRANSFORMACIÓN -> OFERTA.
 *
 * IMPORTANTE: el link NO se consulta. No hay fetch, scraping, APIs, navegación
 * automática, descarga de imágenes ni extracción de datos reales. La oferta
 * usa siempre los datos ficticios ya definidos en el HTML.
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

  // Tiempo simulado entre estados (solo efecto visual).
  var STEP_DELAY = 700;

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

  // Validación mínima local (sin consultar nada): ¿parece un link?
  // No bloquea por dominios reales; acepta cualquier link genérico como texto.
  function looksLikeLink(value) {
    if (/\s/.test(value)) { return false; }
    return /^https?:\/\/\S+\.\S+/i.test(value) || /^\S+\.\S{2,}/.test(value);
  }

  function resetSteps() {
    steps.forEach(function (step) {
      step.classList.remove("active", "done");
    });
  }

  function runStep(index) {
    if (index >= steps.length) {
      // Todos los estados completados -> mostrar la oferta (datos ficticios).
      revealOffer();
      return;
    }

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

    // F. Validación mínima del input.
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

    // C. Eco del link recibido (solo se muestra, no se consulta).
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

  if (btn) {
    btn.addEventListener("click", startTransformation);
  }
  // Limpiar el mensaje de error al editar el link.
  if (input) {
    input.addEventListener("input", clearError);
  }
})();
