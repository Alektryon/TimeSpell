"use strict";

const TONE_COUNT = 13;
const SEAL_COUNT = 20;
const KIN_COUNT = 260;
const TIMESPELL_TONE_OFFSET = -3;
const TIMESPELL_SEAL_OFFSET = 5;
const TIMESPELL_NEW_YEAR_MONTH = 8;
const TIMESPELL_NEW_YEAR_DAY = 17;

// February always contributes 28 days in the original Dreamspell convention.
// July contributes its six remaining days when counting from July 26.
const DREAMSPELL_MONTH_DAYS = [0, 31, 28, 31, 30, 31, 30, 6, 31, 30, 31, 30, 31];

/** Wrap a number into a one-based cycle, including negative offsets. */
function wrapCycle(value, length) {
  return ((value - 1) % length + length) % length + 1;
}

/** Calculate the original Dreamspell reading without changing its day count. */
function getDreamspellDay(year, month, day) {
  const yearStart = month < 7 || (month === 7 && day < 26) ? year - 1 : year;
  const yearSealIndex = ((1965 - yearStart) % 4 + 4) % 4;
  const yearSeal = wrapCycle(4 + 15 * yearSealIndex, SEAL_COUNT);
  const yearTone = wrapCycle(yearStart - 1967 + 1, TONE_COUNT);

  // January 1 is 159 counted days after July 26 of the preceding year.
  let firstMonth = 1;
  let dayDistance = 159;

  if (month > 7) {
    firstMonth = 7;
    dayDistance = 0;
  } else if (month === 7 && day >= 26) {
    firstMonth = 7;
    dayDistance = -25;
  }

  for (let currentMonth = firstMonth; currentMonth < month; currentMonth += 1) {
    dayDistance += DREAMSPELL_MONTH_DAYS[currentMonth];
  }
  dayDistance += day - 1;

  return {
    tone: wrapCycle(yearTone + dayDistance, TONE_COUNT),
    seal: wrapCycle(yearSeal + dayDistance, SEAL_COUNT),
  };
}

/** Apply the constant TimeSpell offsets to a Dreamspell day. */
function getTimeSpellDay(year, month, day) {
  const dreamspell = getDreamspellDay(year, month, day);

  return {
    tone: wrapCycle(dreamspell.tone + TIMESPELL_TONE_OFFSET, TONE_COUNT),
    seal: wrapCycle(dreamspell.seal + TIMESPELL_SEAL_OFFSET, SEAL_COUNT),
  };
}

/** Find the position where the 13-tone and 20-seal cycles coincide. */
function getKin(seal, tone) {
  for (let kin = 1; kin <= KIN_COUNT; kin += 1) {
    if (wrapCycle(kin, SEAL_COUNT) === seal && wrapCycle(kin, TONE_COUNT) === tone) {
      return kin;
    }
  }
  throw new RangeError("The tone and seal must belong to their respective cycles.");
}

/** Retain the original guide calculation, with explicit local variables. */
function getGuide(wavespellSeal, tone) {
  let guideSeal = wavespellSeal;
  let step = 1;

  if (guideSeal <= 7) {
    step += 1;
  }
  if (guideSeal <= 14) {
    step += 1;
  }

  for (let currentTone = 1; currentTone < tone; currentTone += 1) {
    const sealStep = 20 * Math.floor(step / 3) - 7;
    step += 1;
    if (step > 3) {
      step = 1;
    }
    guideSeal += sealStep;
    if (guideSeal === 14) {
      step = 2;
    }
  }

  return guideSeal;
}

/** Return all daily and yearly symbols for a Gregorian date. */
function calculateOracle(year, month, day) {
  const daily = getTimeSpellDay(year, month, day);
  const beforeNewYear = month < TIMESPELL_NEW_YEAR_MONTH ||
    (month === TIMESPELL_NEW_YEAR_MONTH && day < TIMESPELL_NEW_YEAR_DAY);
  const yearStart = beforeNewYear ? year - 1 : year;
  const yearly = getTimeSpellDay(yearStart, TIMESPELL_NEW_YEAR_MONTH, TIMESPELL_NEW_YEAR_DAY);
  const wavespellSeal = wrapCycle(daily.seal - daily.tone + 1, SEAL_COUNT);

  return {
    tone: daily.tone,
    seal: daily.seal,
    yearTone: yearly.tone,
    yearSeal: yearly.seal,
    wavespellTone: 1,
    wavespellSeal,
    guide: getGuide(wavespellSeal, daily.tone),
    antipode: wrapCycle(daily.seal + 10, SEAL_COUNT),
    analog: wrapCycle(19 - daily.seal, SEAL_COUNT),
    occult: 21 - daily.seal,
    kin: getKin(daily.seal, daily.tone),
  };
}
