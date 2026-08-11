// 2° Baits App JavaScript
const catches = [];
const LURES = [
    "Bladed Jig",
    "Heavy Cover Bladed Jig",
    "Mini Bladed Jig",
    "Finesse Jig",
    "Swim Jig",
    "Texas Rig",
    "Flipping Jig",
    "Ned Rig",
    "Drop Shot",
    "Neko Rig",
    "Walking Bait",
    "Plopper",
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
    "30"
];

const WATER_TEMPS = [
    "<40°F",
    "40–49°F",
    "50–59°F",
    "60–69°F",
    "70–79°F",
    "80–89°F",
    "90°F+"
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
let fishingLocation = null;
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
const WATER_STORAGE_KEY = "ramrodWaters";
const waterSelect = document.getElementById("waterName");

if (waterSelect) {
    const savedWaters = JSON.parse(localStorage.getItem(WATER_STORAGE_KEY) || "[]");

    savedWaters.forEach(function(water) {
        const option = document.createElement("option");
        option.value = water;
        option.textContent = water;
        waterSelect.insertBefore(option, waterSelect.lastElementChild);
    });

    waterSelect.addEventListener("change", function() {
        if (waterSelect.value === "remove-water") {
    const waters = JSON.parse(localStorage.getItem(WATER_STORAGE_KEY) || "[]");

    if (!waters.length) {
        alert("No saved waters to remove.");
        waterSelect.value = "Select Water";
        return;
    }

    const choice = window.prompt(
        "Enter the number of the water to remove:\n" +
        waters.map(function(water, index) {
            return (index + 1) + ". " + water;
        }).join("\n")
    );

    const index = parseInt(choice, 10) - 1;

    if (index < 0 || index >= waters.length) {
        waterSelect.value = "Select Water";
        return;
    }

    const removedWater = waters.splice(index, 1)[0];
    localStorage.setItem(WATER_STORAGE_KEY, JSON.stringify(waters));

    Array.from(waterSelect.options).forEach(function(option) {
        if (option.value === removedWater) option.remove();
    });

    waterSelect.value = "Select Water";
    alert(removedWater + " removed.");
    return;
}
        if (waterSelect.value !== "add-water") return;

        const waterName = window.prompt("Enter water name:");

        if (!waterName || !waterName.trim()) {
            waterSelect.value = "Select Water";
            return;
        }

        const cleanName = waterName.trim();
        const waters = JSON.parse(localStorage.getItem(WATER_STORAGE_KEY) || "[]");

        if (!waters.includes(cleanName)) {
            waters.push(cleanName);
            localStorage.setItem(WATER_STORAGE_KEY, JSON.stringify(waters));

            const option = document.createElement("option");
            option.value = cleanName;
            option.textContent = cleanName;
            waterSelect.insertBefore(option, waterSelect.lastElementChild);
        }

        waterSelect.value = cleanName;
    });
}
const saveButton = document.getElementById("saveCatch");



if (saveButton) {
    saveButton.addEventListener("click", function() {
        const catchData = {
           waterName: document.getElementById("waterName").value,
            species: document.getElementById("species").value,
weight: document.getElementById("weight").value,
length: document.getElementById("length").value,
waterTemp: document.getElementById("waterTemp").value,
waterClarity: document.getElementById("waterClarity").value,
            weather: document.getElementById("weather").value,
            wind: document.getElementById("wind").value,
        lure: document.getElementById("lure").value,
                    notes: document.getElementById("notes").value.trim(),
            latitude: null,
longitude: null,
        };

        if (
  catchData.waterName === "Select Water" ||
            catchData.species === "Select Species" ||
  catchData.weight === "Select Weight" ||
 catchData.length === "Select Length" ||
catchData.waterTemp === "Select Water Temp" ||
catchData.lure === "Select Lure" ||
catchData.weather === "Select Weather" ||
            catchData.wind === "Select Wind" ||
            catchData.waterClarity === "Select Water Clarity"
 
) {
  alert("Select all fields before saving.");
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
    (lastCatch.waterName ? lastCatch.waterName + "<br>" : "") +
     lastCatch.species + "<br>" +
(Math.floor(Number(lastCatch.weight)) + " lb " + Math.round((Number(lastCatch.weight) % 1) * 16) + " oz") + " | " + lastCatch.length + "<br><br>" +lastCatch.waterTemp + "<br>" +
lastCatch.wind + " | " + lastCatch.weather + "<br>" +
lastCatch.waterClarity + "<br>" +
lastCatch.lure;
    if (lastCatch.notes) {
        const notesElement = document.createElement("div");
        notesElement.textContent = "Notes: " + lastCatch.notes;
        lastCatchElement.appendChild(notesElement);
    }
}
    const totalFishElement = document.getElementById("totalFish");

if (totalFishElement) {
  const validCatches = catches.filter(catchItem =>
    catchItem.species && catchItem.species !== "Select Species" &&
    catchItem.weight && catchItem.weight !== "Select Weight" &&
    catchItem.length && catchItem.length !== "Select Length" &&
    catchItem.waterTemp && catchItem.waterTemp !== "Select Water Temp" &&
catchItem.waterClarity && catchItem.waterClarity !== "Select Water Clarity" &&
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
    (Math.floor(Number(biggestFish.weight)) + " lb " + Math.round((Number(biggestFish.weight) % 1) * 16) + " oz") + "<br>" + 
    biggestFish.length + "<br>" +
    biggestFish.weather + "<br>" +
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
const topWaterElement = document.getElementById("topWater");

if (topWaterElement && catches.length > 0) {
    const waterCounts = {};

    catches.forEach((catchData) => {
        if (catchData.waterName) {
            waterCounts[catchData.waterName] = (waterCounts[catchData.waterName] || 0) + 1;
        }
    });

    const waterNames = Object.keys(waterCounts);

    if (waterNames.length > 0) {
        const topWater = waterNames.reduce((top, water) =>
            waterCounts[water] > waterCounts[top] ? water : top
        );

        topWaterElement.textContent =
            topWater + " — " + waterCounts[topWater] + " fish";
    }
}
const recentCatchesElement = document.getElementById("recentCatches");
const waterFilter = document.getElementById("waterFilter");
const topLureHereElement = document.getElementById("topLureHere");
const bestWeatherHereElement = document.getElementById("bestWeatherHere");
const bestClarityHereElement = document.getElementById("bestClarityHere");
const bestWindHereElement = document.getElementById("bestWindHere");
const bestTempHereElement = document.getElementById("bestTempHere");
function renderRecentCatches(selectedWater) {
    const filteredCatches = selectedWater === "all"
        ? catches
        : catches.filter((catchData) => catchData.waterName === selectedWater);
const lureCounts = {};

filteredCatches.forEach((catchData) => {
    if (!catchData.lure) return;
    lureCounts[catchData.lure] = (lureCounts[catchData.lure] || 0) + 1;
});

if (topLureHereElement) {
    if (selectedWater === "all") {
        topLureHereElement.style.display = "none";
    } else {
        const topLure = Object.keys(lureCounts).reduce((best, lure) =>
            !best || lureCounts[lure] > lureCounts[best] ? lure : best,
            null
        );

        if (topLure) {
            topLureHereElement.textContent =
                "TOP LURE HERE: " + topLure + " — " + lureCounts[topLure] + " fish";
        } else {
            topLureHereElement.textContent = "TOP LURE HERE: No lure data yet.";
        }

        topLureHereElement.style.display = "block";
    }
}
    const weatherCounts = {};

filteredCatches.forEach((catchData) => {
    if (!catchData.weather) return;
    weatherCounts[catchData.weather] = (weatherCounts[catchData.weather] || 0) + 1;
});

if (bestWeatherHereElement) {
    if (selectedWater === "all") {
        bestWeatherHereElement.style.display = "none";
    } else {
        const bestWeather = Object.keys(weatherCounts).reduce((best, weather) =>
            !best || weatherCounts[weather] > weatherCounts[best] ? weather : best,
            null
        );

        if (bestWeather) {
            bestWeatherHereElement.textContent =
                "BEST WEATHER HERE: " + bestWeather + " — " + weatherCounts[bestWeather] + " fish";
        } else {
            bestWeatherHereElement.textContent = "BEST WEATHER HERE: No weather data yet.";
        }

        bestWeatherHereElement.style.display = "block";
    }
}
    const clarityCounts = {};

filteredCatches.forEach((catchData) => {
    if (!catchData.waterClarity) return;
    clarityCounts[catchData.waterClarity] = (clarityCounts[catchData.waterClarity] || 0) + 1;
});

if (bestClarityHereElement) {
    if (selectedWater === "all") {
        bestClarityHereElement.style.display = "none";
    } else {
        const bestClarity = Object.keys(clarityCounts).reduce((best, clarity) =>
            !best || clarityCounts[clarity] > clarityCounts[best] ? clarity : best,
            null
        );

        if (bestClarity) {
            bestClarityHereElement.textContent =
                "BEST WATER CLARITY HERE: " + bestClarity + " — " + clarityCounts[bestClarity] + " fish";
        } else {
            bestClarityHereElement.textContent = "BEST WATER CLARITY HERE: No clarity data yet.";
        }

        bestClarityHereElement.style.display = "block";
    }
}
    const windCounts = {};

filteredCatches.forEach((catchData) => {
    if (!catchData.wind) return;
    windCounts[catchData.wind] = (windCounts[catchData.wind] || 0) + 1;
});

if (bestWindHereElement) {
    if (selectedWater === "all") {
        bestWindHereElement.style.display = "none";
    } else {
        const bestWind = Object.keys(windCounts).reduce((best, wind) =>
            !best || windCounts[wind] > windCounts[best] ? wind : best,
            null
        );

        if (bestWind) {
            bestWindHereElement.textContent =
                "BEST WIND HERE: " + bestWind + " — " + windCounts[bestWind] + " fish";
        } else {
            bestWindHereElement.textContent = "BEST WIND HERE: No wind data yet.";
        }

        bestWindHereElement.style.display = "block";
    }
}
    const tempCounts = {};

filteredCatches.forEach((catchData) => {
    if (!catchData.waterTemp) return;
    tempCounts[catchData.waterTemp] = (tempCounts[catchData.waterTemp] || 0) + 1;
});

if (bestTempHereElement) {
    if (selectedWater === "all") {
        bestTempHereElement.style.display = "none";
    } else {
        const bestTemp = Object.keys(tempCounts).reduce((best, temp) =>
            !best || tempCounts[temp] > tempCounts[best] ? temp : best,
            null
        );

        if (bestTemp) {
            bestTempHereElement.textContent =
                "BEST WATER TEMP HERE: " + bestTemp + " — " + tempCounts[bestTemp] + " fish";
        } else {
            bestTempHereElement.textContent = "BEST WATER TEMP HERE: No temperature data yet.";
        }

        bestTempHereElement.style.display = "block";
    }
}
    const recentCatches = filteredCatches.slice(-5).reverse();

    if (recentCatches.length === 0) {
        recentCatchesElement.textContent = "No catches for this water.";
        return;
    }

    recentCatchesElement.innerHTML = recentCatches.map((catchData) =>
        (catchData.dateCaught ? catchData.dateCaught + "<br>" : "") +
        (catchData.waterName ? catchData.waterName + "<br>" : "") +
        catchData.species + "<br>" +
        (Math.floor(Number(catchData.weight)) + " lb " + Math.round((Number(catchData.weight) % 1) * 16) + " oz") + " | " + catchData.length + "<br>" +
        (catchData.waterTemp ? catchData.waterTemp + "<br>" : "") +
        (catchData.wind || catchData.weather ? [catchData.wind, catchData.weather].filter(Boolean).join(" | ") + "<br>" : "") +
        (catchData.waterClarity ? catchData.waterClarity + "<br>" : "") +
        catchData.lure + "<br>" +
(catchData.notes ? "Notes: " + catchData.notes.replaceAll("<", "&lt;").replaceAll(">", "&gt;") + "<br>" : "") +
"<br>________<br><br>"
    ).join("");
}

if (recentCatchesElement && catches.length > 0) {
    const availableWaters = [...new Set(
        catches.map((catchData) => catchData.waterName).filter(Boolean)
    )];

    if (waterFilter) {
        availableWaters.forEach((water) => {
            const option = document.createElement("option");
            option.value = water;
            option.textContent = water;
            waterFilter.appendChild(option);
        });

        waterFilter.addEventListener("change", function() {
            renderRecentCatches(waterFilter.value);
        });
    }

    renderRecentCatches("all");
}
const enterButton = document.getElementById("enterButton");

if (enterButton) {
    enterButton.addEventListener("click", function() {
        window.location.href = "dashboard.html";
    });
}

const backupButton = document.getElementById("backupCatches");

if (backupButton) {
    backupButton.addEventListener("click", function() {
        const backupData = {
            version: 1,
            exportedAt: new Date().toISOString(),
            catches: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
            waters: JSON.parse(localStorage.getItem("ramrodWaters") || "[]")
        };

        const backupBlob = new Blob(
            [JSON.stringify(backupData, null, 2)],
            { type: "application/json" }
        );
        const backupUrl = URL.createObjectURL(backupBlob);
        const downloadLink = document.createElement("a");

        downloadLink.href = backupUrl;
        downloadLink.download = "ramrod-backup-" + new Date().toISOString().slice(0, 10) + ".json";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();

        setTimeout(() => URL.revokeObjectURL(backupUrl), 1000);
    });
}

const restoreButton = document.getElementById("restoreBackup");
const restoreFileInput = document.getElementById("restoreFile");

if (restoreButton && restoreFileInput) {
    restoreButton.addEventListener("click", function() {
        restoreFileInput.click();
    });

    restoreFileInput.addEventListener("change", function() {
        const backupFile = restoreFileInput.files[0];

        if (!backupFile) {
            return;
        }

        const reader = new FileReader();

        reader.addEventListener("load", function() {
            try {
                const backupData = JSON.parse(reader.result);

                if (
                    !backupData ||
                    !Array.isArray(backupData.catches) ||
                    !Array.isArray(backupData.waters)
                ) {
                    throw new Error("Invalid backup");
                }

                if (!confirm("Restore this backup? Current catches and saved waters will be replaced.")) {
                    restoreFileInput.value = "";
                    return;
                }

                localStorage.setItem(STORAGE_KEY, JSON.stringify(backupData.catches));
                localStorage.setItem("ramrodWaters", JSON.stringify(backupData.waters));

                alert("RAMROD backup restored.");
                window.location.reload();
            } catch (error) {
                alert("That is not a valid RAMROD backup file.");
                restoreFileInput.value = "";
            }
        });

        reader.readAsText(backupFile);
    });
}

const startTripButton = document.getElementById("startTripButton");

if (startTripButton) {
    startTripButton.addEventListener("click", function() {
        const activeTrip = JSON.parse(localStorage.getItem("ramrodActiveTrip") || "null");

        if (activeTrip) {
            alert("A trip is already active.");
            return;
        }

        const newTrip = {
            id: Date.now().toString(),
            startedAt: new Date().toISOString()
        };

        localStorage.setItem("ramrodActiveTrip", JSON.stringify(newTrip));
        alert("Trip started.");
    });
}

const endTripButton = document.getElementById("endTripButton");

if (endTripButton) {
    endTripButton.addEventListener("click", function() {
        const activeTrip = JSON.parse(localStorage.getItem("ramrodActiveTrip") || "null");

        if (!activeTrip) {
            alert("No active trip.");
            return;
        }

        const savedTrips = JSON.parse(localStorage.getItem("ramrodTrips") || "[]");

        activeTrip.endedAt = new Date().toISOString();
        savedTrips.push(activeTrip);

        localStorage.setItem("ramrodTrips", JSON.stringify(savedTrips));
        localStorage.removeItem("ramrodActiveTrip");

        alert("Trip ended.");
    });
}

const tripHistoryElement = document.getElementById("tripHistory");

if (tripHistoryElement) {
    const savedTrips = JSON.parse(localStorage.getItem("ramrodTrips") || "[]");

    if (savedTrips.length > 0) {
        tripHistoryElement.innerHTML = savedTrips
            .slice()
            .reverse()
            .map((trip) => {
                const started = trip.startedAt ? new Date(trip.startedAt).toLocaleString() : "Unknown start";
                const ended = trip.endedAt ? new Date(trip.endedAt).toLocaleString() : "Unknown end";

                return started + "<br>" + ended + "<br><br>";
            })
            .join("");
    }
}
