var uniqueIDs = [];
var roundLimit = 100;
function seed() {
    // seed system (v1.0.24)
    var inputElement = document.getElementById('Input');
    // Get the value of the input
    var seedValue = inputElement.value.trim();
    // Check if the input is blank
    if (seedValue === '') {
        // Generate a random length between 1 and 16
        var randomseedLength = Math.floor(Math.random() * 10) + 5;
        // Generate a random seed with the specified length
        var randomSeed = Math.floor(Math.random() * (Math.pow(10, randomseedLength)));
        var sign = Math.random() < 0.5 ? -1 : 1;
        seed = randomSeed * sign;
        // Use the random seed value
        console.log('Random Seed:', seed);
    } else {
        // Convert the provided seed value to a number if it's a string
        var parsedSeed = parseInt(seedValue, 10); // Ensure to specify the radix (base) as 10 for decimal numbers
        if (!isNaN(parsedSeed)) {
            seed = parsedSeed;
            // Use the parsed seed value
            console.log('Provided Seed:', seed);
        } else {
            // Convert the string into a seed
            var stringSeed = 1;
            for (var i = 0; i < seedValue.length; i++) {
                stringSeed += seedValue.charCodeAt(i); // Sum the character codes to create a seed from the string
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
        seedText.innerHTML = 'Provided Seed<br>' + parsedSeed;
        } else {
        seedText.innerHTML = 'Provided Seed<br>' + seedValue + ' (' + seed + ')';
        }
    }
    document.body.appendChild(seedText);
    seedText.style.display = 'block';

      var roundElement = parseInt(document.getElementById('Round').value);
      uniqueID = generateuniqueID(seed, roundElement);
      
      // Log the unique random numbers to the console
      console.log("Unique ID:", uniqueID);
}
function generateuniqueID(seed, roundElement) {
  var seedRandom = function(seed) {
    var x = Math.sin(seed) * 10000;
    return Math.abs(x - Math.floor(x));
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
    var randomNumber = getRandomNumber(mapId); // Generate random number based on mapId
    uniqueIDs.push(randomNumber);
    seed++; // Increase the seed for the next number
  }
  return uniqueIDs;
}
function generateNextBatch() {
  if (currentRound % 100 === 0) {
    uniqueID = generateuniqueID(seed + currentRound, currentRound);
    console.log("Generated Next Batch:", uniqueID);
  }
}
// Event listener for the click event of the guessButton
document.getElementById('guessButton').addEventListener('click', generateNextBatch);