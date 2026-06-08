/*
 * MC-INMO-5A — Demo estática.
 * JavaScript mínimo: solo orquesta la simulación visual del flujo
 * LINK -> TRANSFORMACIÓN -> OFERTA.
 *
 * No hace fetch, no scraping, no APIs, no datos reales, no red.
 * Todo es animación local de estados ya escritos en el HTML.
 */
(function () {
  "use strict";

  var btn = document.getElementById("transform-btn");
  var processSection = document.getElementById("process-section");
  var offerSection = document.getElementById("offer-section");
  var steps = Array.prototype.slice.call(document.querySelectorAll(".step"));

  // Tiempo simulado entre estados (solo efecto visual).
  var STEP_DELAY = 700;

  function resetSteps() {
    steps.forEach(function (step) {
      step.classList.remove("active", "done");
    });
  }

  function runStep(index) {
    if (index >= steps.length) {
      // Todos los estados completados -> mostrar la oferta.
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
    // Llevar la vista a la oferta generada.
    offerSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startTransformation() {
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
})();
