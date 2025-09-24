var seed;
var uniqueID;
var uniqueIDs = [];
var roundLimit = 100;
function seed() {
    var inputElement = document.getElementById('Input');
    var seedValue = inputElement.value.trim();
    // Check if the input is blank
    if (seedValue === '') {
        var randomseedLength = Math.floor(Math.random() * 10) + 5;
        var randomSeed = Math.floor(Math.random() * (Math.pow(10, randomseedLength)));
        var sign = Math.random() < 0.5 ? -1 : 1;
        seed = randomSeed * sign;
        console.log('Random Seed:', seed);
    } else {
        var parsedSeed = parseInt(seedValue, 10);
        if (!isNaN(parsedSeed)) {
            seed = parsedSeed;
            console.log('Provided Seed:', seed);
        } else {
            var stringSeed = 1;
            for (var i = 0; i < seedValue.length; i++) {
                stringSeed += seedValue.charCodeAt(i);
            }
            seed = stringSeed;
            console.log('String Seed:', seed);
        }
    }
    var seedText = document.createElement('div');
    seedText.className = 'seedtext';
    if (seedValue === '') {
        seedText.innerHTML = 'Random Seed<br>' + seed;
    } else {
        if (!isNaN(parsedSeed)) {
        seedText.innerHTML = 'Set Seed<br>' + parsedSeed;
        } else {
        seedText.innerHTML = 'Set Seed<br>' + seedValue + ' (' + seed + ')';
        }
    }
    document.body.appendChild(seedText);
    seedText.style.display = 'block';
      var roundElement = parseInt(document.getElementById('Round').value);
      uniqueID = generateuniqueID(seed, roundElement);
      console.log("Unique ID:", uniqueID);
}
function generateuniqueID(seed, roundElement) {
  var seedRandom = function(seed) {
    const scale = (seed * 1337 + 69420) % 233280; // Scale the seed with constants
    const circularMod = (Math.sin(seed) * scale + Math.cos(seed * scale)) % 1;
    return Math.abs(circularMod);
};

  var getRandomNumber = function(mapId) {
    if (mapId === 0) {
      return Math.floor(seedRandom(seed) * images.length);
    } else if (mapId === 1) {
      return Math.floor(seedRandom(seed) * 254);
    } else if (mapId === 2) {
      return Math.floor(seedRandom(seed) * 298) + 255;
    } else if (mapId === 3) {
      return Math.floor(seedRandom(seed) * 600) + 553;
    } else {
      return Math.floor(seedRandom(seed) * images.length);
    }
  };
  var maxElement = standardCheckbox.checked ? roundElement : (Math.floor(currentRound / 100) + 1) * roundLimit;
  while (uniqueIDs.length < maxElement) {
    var randomNumber = getRandomNumber(mapId);
    uniqueIDs.push(randomNumber);
    seed++;
  }
  return uniqueIDs;
}
function generateNextBatch() {
  if (currentRound % 100 === 0) {
    uniqueID = generateuniqueID(seed + currentRound, currentRound);
    console.log("Generated Next Batch:", uniqueID);
  }
}
document.getElementById('guessButton').addEventListener('click', generateNextBatch);

//debug
function findSeed(targetID, mapId, roundElement) {
  let testSeed = -100000; // Start testing with a very low seed value
  const maxSeed = 100000; // Define a reasonable range for testing
  var roundElement = parseInt(document.getElementById('Round').value);

  while (testSeed < maxSeed) {
      uniqueIDs = []; // Clear the array for each seed test
      const result = generateuniqueID(testSeed, roundElement);

      if (result.includes(targetID)) {
          console.log(`Found seed: ${testSeed}`);
          return testSeed;
      }
      testSeed++;
  }
  console.log("No seed found in the tested range");
  return null;
}