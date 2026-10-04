Extract all files into one folder and open index.htm in a JavaScript-enabled browser.

TimeSpell correlation:
- New Year: August 17. Dates before August 17 belong to the preceding TimeSpell year.
- Day tone: Dreamspell day tone minus 3, wrapped into 1 through 13.
- Day seal: Dreamspell day seal plus 5, wrapped into 1 through 20.
- Year tone and seal are the TimeSpell tone and seal of August 17 starting that year.
- The oracle, wavespell, and kin are calculated from the TimeSpell day tone and seal.
- The original Dreamspell leap-day/day-count convention is retained, so the offsets
  stay constant relative to the original program on every date.

Includes the previous four-digit year and information-frame fixes.
Original oracle version 2, copyright November 1997 jonic.

Source files:
- index.htm: the two-frame entry page (HTML 4.01 Frameset).
- prg.htm: the calculator form and symbol layout (HTML5).
- INFO.HTM: the explanation frame (HTML5).
- styles.css: shared presentation rules.
- data.js: the original tone, seal, and oracle descriptions.
- oracle.js: calendar correlation and pure calculation functions.
- app.js: form events, symbol images, reading markup, and frame messages.
- info.js: message validation and rendering in the explanation frame.

Scripts are ordinary deferred scripts, so the program can run directly from local
files without a server, module loader, or build step. Keep all files together.
