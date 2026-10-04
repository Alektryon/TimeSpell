"use strict";

// Original descriptions are preserved, including their emphasis markup.
// Tones and seals use one-based indexes; index zero is unused.
const SEAL_NAMES = [
  "0",
  "Red Dragon",
  "White Wind",
  "Blue Night",
  "Yellow Seed",
  "Red Serpent",
  "White World-Bridger",
  "Blue Hand",
  "Yellow Star",
  "Red Moon",
  "White Dog",
  "Blue Monkey",
  "Yellow Human",
  "Red Skywalker",
  "White Wizard",
  "Blue Eagle",
  "White Warrior",
  "Red Earth",
  "White Mirror",
  "Blue Storm",
  "Yellow Sun"
];

const TONES = [
  null,
  {
    "name": "Magnetic",
    "power": "Unify Purpose",
    "action": "Attraction",
    "meditation": "What is this wavespell's Goal?"
  },
  {
    "name": "Lunar",
    "power": "Polarize Challenge",
    "action": "Stabilizing",
    "meditation": "What are the Obstacles for this wavespell's goal?"
  },
  {
    "name": "Electric",
    "power": "Activate Service",
    "action": "Bonding",
    "meditation": "How can this wavespell's goal be Obtained?"
  },
  {
    "name": "Self-Existing",
    "power": "Define Form",
    "action": "Measuring",
    "meditation": "What is the form of the action to obtain the wavespell goal?"
  },
  {
    "name": "Overtone",
    "power": "Empower Radiance",
    "action": "Command",
    "meditation": "Gather Resources."
  },
  {
    "name": "Rythmic",
    "power": "Organize Equality",
    "action": "Balance",
    "meditation": "Administer Challenge."
  },
  {
    "name": "Resonant",
    "power": "Channel Attunement",
    "action": "Inspiring",
    "meditation": "Attune Service to action."
  },
  {
    "name": "Galactic",
    "power": "Harmonize Integrity",
    "action": "Modeling",
    "meditation": "Action Attains form."
  },
  {
    "name": "Solar",
    "power": "Pulse Intention",
    "action": "Realizing",
    "meditation": "Action set in Motion."
  },
  {
    "name": "Planetary",
    "power": "Perfect Manifestation",
    "action": "Producing",
    "meditation": "Action and Challenge are meet."
  },
  {
    "name": "Spectral",
    "power": "Dissolve Liberation",
    "action": "Release",
    "meditation": "Action dissolves service."
  },
  {
    "name": "Crystal",
    "power": "Dedicate Cooperation",
    "action": "Universalize",
    "meditation": "Round Table meets."
  },
  {
    "name": "Cosmic",
    "power": "Endure Presence",
    "action": "Transcend",
    "meditation": "Return to Magnetic (tone 1)."
  }
];

const SEAL_DESCRIPTIONS = [
  " ",
  "Red Dragon (IMIX) <u>Nurtures</u> and emphasizes <u>Birth</u>.",
  "White Wind (IK) <u>Communicates</u> and empasizes <u>Spirit</u>.",
  "Blue Night (AKBAL) <u>Dreams</u> and emphasizes <u>Abundance</u>.",
  "Yellow Seed (KAN) <u>Targets</u> and emphsizes <u>Flowering (ideas)</u>.",
  "Red Serpent (CHICCHAN) <u>Survives</u> and emphasizes <u>Life-force (instinct)</u>.",
  "White World-Bridger(CIMI) <u>Equalizes</u> and emphasizes <u>Death (span dimensions)</u>.",
  "Blue Hand (MANIK) <u>Knows</u> and emphasizes <u>Accomplishment (heals)</u>.",
  "Yellow Star (LAMAT) <u>Beautifies</u> and emphasizes <u>Elegance</u>.",
  "Red Moon (MULUC) <u>Purifies</u> and emphasizes <u>Universal Water</u>.",
  "White Dog (OC) <u>Loves</u> and emphasizes <u>Heart (truth)</u>.",
  "Blue Monkey (CHUEN) <u>Plays</u> and emphasizes <u>Magic</u>.",
  "Yellow Human (EB) <u>Influences</u> and emphasizes <u>Free Will</u>.",
  "Red Skywalker (BEN) <u>Explores</u> and emphasizes <u>Space</u>.",
  "White Wizard (IX) <u>Enchants</u> and emphasizes <u>Timelessness</u>.",
  "Blue Eagle (MEN) <u>Creates</u> and emphasizes <u>Vision</u>.",
  "Yellow Warrior (CIB) <u>Questions</u> and emphasizes <u>Intelligence</u>.",
  "Red Earth (CABAN) <u>Evolves</u> and emphasizes <u>Navigation</u>.",
  "White Mirror (ETZNAB) <u>Reflects</u> and emphasizes <u>Endlessness</u>.",
  "Blue Storm (CAUAC) <u>Catalyzes</u> and emphasizes <u>Self-Generation</u>.",
  "Yellow Sun (AHAU) <u>Enlightens</u> and emphasizes <u>Universal Fire</u>."
];

const ORACLE_DESCRIPTIONS = [
  "The seal of the day is the basis of life destiny, with power of the solar tribe.",
  "The seal of the year is the basis of life destiny, with the power of the solar tribe.",
  "The seal for the Guide of the day modifies the oracle reading in Outcome.",
  "The seal for the Anitpode of the day modifies the oracle reading with Challenging power (strengthening memory, reconstruction).",
  "The seal for the Occult of the day modifies the oracle reading with Hidden power (the unexpected).",
  "The seal for the Analog of the day modifies the oracle reading with Like-Minded power (galactic-solar planetary power).",
  "The seal for the Wavespell sets the emphasis of the thirteen day, thirteen tone cycle."
];

const ORACLE_HEADINGS = [
  "Seal of the Day, Destiny",
  "Seal of the Year, Destiny",
  "Guide of the Day, effecting Outcome",
  "Antipode of the Day, the Challenging focus",
  "Occult of the Day, the Hidden power",
  "Analog of the Day, the Like-Minded power",
  "Seal for this Wavespell"
];
