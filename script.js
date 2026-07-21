// 2° Baits App JavaScript
const catches = [];
const LURES = [
    "Workhorse",
    "Mini",
    "Heavy Cover Workhorse",
    "Heavy Cover Mini",
    "Karashi",
    "Swim Jig",
    "Other"
];
const SPECIES = [
    "Largemouth Bass",
    "Smallmouth Bass",
    "Spotted Bass"
];
const WEIGHTS = [
    "<1 lb",
    "1 lb",
    "2 lbs",
    "3 lbs",
    "4 lbs",
    "5 lbs",
    "6 lbs",
    "7 lbs",
    "8 lbs",
    "9 lbs",
    "10+ lbs"
];
const LENGTHS = [
    '<10"',
    '10"',
    '11"',
    '12"',
    '13"',
    '14"',
    '15"',
    '16"',
    '17"',
    '18"',
    '19"',
    '20"',
    '21"',
    '22"',
    '23"',
    '24"',
    '25"',
    '26"',
    '27"',
    '28"',
    '29"',
    '30"+'
];
const WEATHER = [
    "Sunny",
    "Partly Cloudy",
    "Cloudy",
    "Rain",
    "Storm"
];
const WATER_CLARITY = [
    "Clear",
    "Slightly Stained",
    "Stained",
    "Muddy"
];
const WIND = [
    "Calm",
    "Light",
    "Moderate",
    "Strong"
];
const WIND_DIRECTION = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
    "Variable"
];
const BAROMETRIC = [
    "Rising",
    "Stable",
    "Falling"
];
const FISH_STAGE = [
    "Pre-Spawn",
    "Spawn",
    "Post-Spawn",
    "Summer",
    "Fall",
    "Winter"
];
const STORAGE_KEY = "twoDegreeBaitsCatches";
function saveCatch(catchData) {
    catches.push(catchData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(catches));
}
function loadCatches() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
        catches.push(...JSON.parse(saved));
    }
}


loadCatches();
function createCatch(data) {
    const newCatch = {
        ...data,
        id: Date.now(),
dateCaught: new Date().toLocaleString()
    };

    saveCatch(newCatch);
}
function getCatches() {
    return catches;
}
window.getCatches = getCatches;
window.createCatch = createCatch;
window.saveCatch = saveCatch;
console.log("2° Baits app loaded");
const saveButton = document.getElementById("saveCatch");

if (saveButton) {
    saveButton.addEventListener("click", function() {
        const catchData = {
            species: document.getElementById("species").value,
            weight: document.getElementById("weight").value,
            length: document.getElementById("length").value,
            lure: document.getElementById("lure").value
        };

        if (
  catchData.species === "Select Species" ||
  catchData.weight === "Select Weight" ||
  catchData.length === "Select Length" ||
  catchData.lure === "Select Lure"
) {
  alert("Select all four fields before saving.");
  return;
}
        createCatch(catchData);
        console.log(catchData);
        window.location.href = "my-catches.html";
    });
}
const lastCatchElement = document.getElementById("lastCatch");

if (lastCatchElement && catches.length > 0) {
  const lastCatch = catches[catches.length - 1];

 lastCatchElement.innerHTML =
    (lastCatch.dateCaught ? lastCatch.dateCaught + "<br><br>" : "") +
    lastCatch.species + "<br>" +
    lastCatch.weight + "<br>" +
    lastCatch.length + "<br>" +
    lastCatch.lure;
}
    const totalFishElement = document.getElementById("totalFish");

if (totalFishElement) {
  const validCatches = catches.filter(catchItem =>
    catchItem.species && catchItem.species !== "Select Species" &&
    catchItem.weight && catchItem.weight !== "Select Weight" &&
    catchItem.length && catchItem.length !== "Select Length" &&
    catchItem.lure && catchItem.lure !== "Select Lure"
);
  

  totalFishElement.textContent = validCatches.length;
}

const biggestFishElement = document.getElementById("biggestFish");

if (biggestFishElement && catches.length > 0) {
  const biggestFish = catches.reduce((biggest, current) => {
  const biggestWeight = parseFloat(biggest.weight);
  const currentWeight = parseFloat(current.weight);

  if (Number.isNaN(biggestWeight)) return current;
  if (Number.isNaN(currentWeight)) return biggest;

  return currentWeight > biggestWeight ? current : biggest;
});
  biggestFishElement.innerHTML =
    biggestFish.species + "<br>" +
    biggestFish.weight + "<br>" +
    biggestFish.length + "<br>" +
    biggestFish.lure;
}
const topLureElement = document.getElementById("topLure");

if (topLureElement && catches.length > 0) {
    const lureCounts = {};

    catches.forEach((catchData) => {
        if (catchData.lure && catchData.lure !== "Select Lure") {
            lureCounts[catchData.lure] = (lureCounts[catchData.lure] || 0) + 1;
        }
    });

    const lureNames = Object.keys(lureCounts);

if (lureNames.length > 0) {
    const topLure = lureNames.reduce((top, lure) =>
        lureCounts[lure] > lureCounts[top] ? lure : top
    );

    topLureElement.textContent = topLure + " — " + lureCounts[topLure] + " fish";
}
}
const topSpeciesElement = document.getElementById("topSpecies");

if (topSpeciesElement && catches.length > 0) {
    const speciesCounts = {};

    catches.forEach((catchData) => {
        if (catchData.species && catchData.species !== "Select Species") {
            speciesCounts[catchData.species] = (speciesCounts[catchData.species] || 0) + 1;
        }
    });

    const speciesNames = Object.keys(speciesCounts);

    if (speciesNames.length > 0) {
        const topSpecies = speciesNames.reduce((top, species) =>
            speciesCounts[species] > speciesCounts[top] ? species : top
        );

        topSpeciesElement.textContent =
            topSpecies + " — " + speciesCounts[topSpecies] + " fish";
    }
}

const enterButton = document.getElementById("enterButton");

if (enterButton) {
    enterButton.addEventListener("click", function() {
        window.location.href = "dashboard.html";
    });
}

