"use strict";

const SYMBOL_ORDER = [
  "seal",
  "tone",
  "guide",
  "antipode",
  "occult",
  "analog",
  "wavespellTone",
  "wavespellSeal",
  "yearTone",
  "yearSeal",
];

const SEAL_SECTION_INDEX = {
  seal: 0,
  yearSeal: 1,
  guide: 2,
  antipode: 3,
  occult: 4,
  analog: 5,
  wavespellSeal: 6,
};

const TONE_SYMBOLS = new Set(["tone", "yearTone", "wavespellTone"]);
const dateForm = document.getElementById("date-form");
const symbolLinks = document.querySelectorAll("[data-symbol]");

let currentReading = null;
let latestReadingHTML = null;

/** Build an image using the exact filename casing in the supplied archive. */
function renderSymbolImage(symbol, value, description) {
  const isTone = TONE_SYMBOLS.has(symbol);
  const filename = `${isTone ? "TONE" : "GLYPH"}${value}.GIF`;
  const className = `symbol-image${isTone ? " tone-image" : ""}`;
  const height = isTone ? 30 : 100;

  return `<img class="${className}" src="${filename}" alt="${description}"
    width="100" height="${height}">`;
}

function renderSealExplanation(seal, sectionIndex) {
  return `${ORACLE_HEADINGS[sectionIndex]}<br>
    ${renderSymbolImage("seal", seal, SEAL_NAMES[seal])}<br>
    ${SEAL_DESCRIPTIONS[seal]}<br>${ORACLE_DESCRIPTIONS[sectionIndex]}`;
}

/** Render one symbol's explanation without modifying calculation state. */
function renderExplanation(symbol, reading) {
  const value = reading[symbol];

  if (TONE_SYMBOLS.has(symbol)) {
    const tone = TONES[value];
    const headings = {
      tone: "Tone of the day",
      yearTone: "Tone of the Year",
      wavespellTone: "Tone one starts the Wavespell",
    };
    const meditation = symbol === "tone" ? `.  Daily meditation- ${tone.meditation}` : "";

    return `${renderSymbolImage(symbol, value, tone.name)}<br>
      ${headings[symbol]}<br>
      Tone ${value} ${tone.name}, creative power to <u>${tone.power}</u>,action of
      <u>${tone.action}</u>${meditation}`;
  }

  const sealExplanation = renderSealExplanation(value, SEAL_SECTION_INDEX[symbol]);
  if (symbol === "seal") {
    return `${renderSymbolImage("tone", reading.tone, TONES[reading.tone].name)}<br>
      Tone ${reading.tone} ${TONES[reading.tone].name}<br>
      ${sealExplanation}<br>
      Kin ${reading.kin} of 260 day cycle(20 wavespells of 13 tones).`;
  }

  if (symbol === "yearSeal" || symbol === "wavespellSeal") {
    const tone = symbol === "yearSeal" ? reading.yearTone : reading.wavespellTone;
    return `Tone ${tone} ${TONES[tone].name}<br>
      ${renderSymbolImage("tone", tone, TONES[tone].name)}<br>
      ${sealExplanation}`;
  }

  return sealExplanation;
}

/** The full reading includes the same six-symbol daily diagram as the original. */
function renderDailyDiagram(reading) {
  const image = (symbol) => {
    const value = reading[symbol];
    const description = TONE_SYMBOLS.has(symbol) ? TONES[value].name : SEAL_NAMES[value];
    return renderSymbolImage(symbol, value, description);
  };

  return `<table class="oracle-grid" aria-label="Daily oracle">
    <tbody>
      <tr><td></td><td>${image("tone")}</td><td></td></tr>
      <tr><td></td><td>${image("guide")}</td><td></td></tr>
      <tr>
        <td>${image("antipode")}</td>
        <td>${image("seal")}</td>
        <td>${image("analog")}</td>
      </tr>
      <tr><td></td><td>${image("occult")}</td><td></td></tr>
    </tbody>
  </table>`;
}

function getSymbolDescription(symbol, reading) {
  const value = reading[symbol];

  if (TONE_SYMBOLS.has(symbol)) {
    const prefix = { tone: "Day tone. ", yearTone: "Year tone. ", wavespellTone: "Wavespell tone. " };
    const tone = TONES[value];
    return `${prefix[symbol]}${value} is ${tone.name}, ${tone.power}-${tone.action}`;
  }

  let prefix = "";
  if (symbol === "seal") {
    prefix = `(${TONES[reading.tone].name}) `;
  } else if (symbol === "yearSeal") {
    prefix = `(${TONES[reading.yearTone].name}) `;
  } else if (symbol === "wavespellSeal") {
    prefix = `(${TONES[reading.wavespellTone].name}) `;
  }

  return `${prefix}${SEAL_NAMES[value]} is the ${ORACLE_HEADINGS[SEAL_SECTION_INDEX[symbol]]}.`;
}

function updateSymbolImages(reading) {
  for (const link of symbolLinks) {
    const symbol = link.dataset.symbol;
    const image = document.getElementById(symbol);
    const value = reading[symbol];
    const isTone = TONE_SYMBOLS.has(symbol);

    image.src = `${isTone ? "TONE" : "GLYPH"}${value}.GIF`;
    image.alt = isTone ? TONES[value].name : SEAL_NAMES[value];
    link.title = getSymbolDescription(symbol, reading);
  }
}

/** Send content rather than accessing another local file frame's document. */
function sendReading(content) {
  latestReadingHTML = `<!doctype html>
    <html lang="en">
      <head><title>TimeSpell Oracle Information</title></head>
      <body><div class="reading">${content}</div></body>
    </html>`;

  // Local file origins require '*'; the receiver verifies the sending frame.
  parent.frames["info"].postMessage(
    { type: "timespell-info", html: latestReadingHTML },
    "*",
  );
}

function showFullReading() {
  const explanations = SYMBOL_ORDER.map((symbol) =>
    `<hr>${renderExplanation(symbol, currentReading)}`,
  ).join("\n");

  sendReading(renderDailyDiagram(currentReading) + explanations);
}

function calculateFromForm() {
  const fields = dateForm.elements;
  currentReading = calculateOracle(
    Number(fields.year.value),
    Number(fields.month.value),
    Number(fields.day.value),
  );

  updateSymbolImages(currentReading);
  showFullReading();
  window.status = "TimeSpell day finder";
}

function initialize() {
  const today = new Date();
  dateForm.elements.year.value = today.getFullYear();
  dateForm.elements.month.value = today.getMonth() + 1;
  dateForm.elements.day.value = today.getDate();
  calculateFromForm();
}

dateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateFromForm();
});

document.getElementById("help-button").addEventListener("click", () => {
  window.confirm(
    "Enter a gregorian date using numbers, then click 'Dial' to see the Oracle for that date.  " +
    "Partial oracle readings can be generated by clicking on the glyph images.  " +
    "To PRINT a reading: click on the right frame then choose file/'print frame'",
  );
});

for (const link of symbolLinks) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    sendReading(renderExplanation(link.dataset.symbol, currentReading));
    window.status = "TimeSpell day finder";
  });

  link.addEventListener("mouseover", () => {
    window.status = getSymbolDescription(link.dataset.symbol, currentReading);
  });

  link.addEventListener("mouseout", () => {
    window.status = "TimeSpell day finder";
  });
}

window.addEventListener("message", (event) => {
  const fromInfoFrame = event.source === parent.frames["info"];
  if (fromInfoFrame && event.data?.type === "timespell-info-ready" && latestReadingHTML !== null) {
    parent.frames["info"].postMessage(
      { type: "timespell-info", html: latestReadingHTML },
      "*",
    );
  }
});

// Deferred scripts run after the calculator's HTML has been parsed.
initialize();
