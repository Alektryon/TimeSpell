"use strict";

window.addEventListener("message", (event) => {
  const fromCalculator = event.source === parent.frames["fant"];
  const isReading = event.data?.type === "timespell-info";
  const hasHTML = typeof event.data?.html === "string";

  if (!fromCalculator || !isReading || !hasHTML) {
    return;
  }

  const reading = new DOMParser().parseFromString(event.data.html, "text/html");
  document.title = reading.title || "TimeSpell Oracle Information";

  // Replace only the body content so the stylesheet and message listener survive.
  document.body.innerHTML = reading.body.innerHTML;
  window.scrollTo(0, 0);
});

// Let the calculator replay the latest reading if it finished loading first.
parent.frames["fant"].postMessage({ type: "timespell-info-ready" }, "*");
