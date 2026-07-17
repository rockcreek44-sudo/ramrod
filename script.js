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
        id: Date.now()
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
    });
}
const lastCatchElement = document.getElementById("lastCatch");

if (lastCatchElement && catches.length > 0) {
  const lastCatch = catches[catches.length - 1];

  lastCatchElement.innerHTML =
    lastCatch.species + "<br>" +
    lastCatch.weight + "<br>" +
    lastCatch.length + "<br>" +
    lastCatch.lure;
}
    const totalFishElement = document.getElementById("totalFish");

if (totalFishElement) {
  totalFishElement.textContent = catches.length;
}

}
const enterButton = document.getElementById("enterButton");

if (enterButton) {
    enterButton.addEventListener("click", function() {
        window.location.href = "dashboard.html";
    });
}

