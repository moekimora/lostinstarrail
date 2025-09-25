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
/**
 * findSeed(targetSeq, mapId, rounds, opts)
 *
 * - targetSeq : array of integers you want the generator to produce (required)
 * - mapId     : 0..3 (controls the getRandomNumber branch) (default 0)
 * - rounds    : how many IDs to generate per seed (must be >= targetSeq.length) (default = targetSeq.length)
 * - opts      : optional object:
 *      { start: -100000, end: 100000, prefixOnly: true, firstOnly: true }
 *        - start/end: seed search range (inclusive)
 *        - prefixOnly: if true, compare targetSeq with the generated prefix [0..tlen-1].
 *                      if false, search for targetSeq anywhere as a contiguous subsequence.
 *        - firstOnly: return only the first matching seed (true) or all matches (false)
 *
 * Returns an array of matching seeds (empty if none found).
 */
function findSeed(targetSeq, mapId = 0, rounds = null, opts = {}) {
  if (!Array.isArray(targetSeq) || targetSeq.length === 0) {
    throw new Error("targetSeq must be a non-empty array");
  }

  const start = typeof opts.start === "number" ? opts.start : -100000;
  const end = typeof opts.end === "number" ? opts.end : 100000;
  const prefixOnly = opts.prefixOnly !== undefined ? !!opts.prefixOnly : true;
  const firstOnly = opts.firstOnly !== undefined ? !!opts.firstOnly : true;

  const tlen = targetSeq.length;
  if (rounds === null) rounds = Math.max(tlen, 1);
  if (rounds < tlen) {
    throw new Error("rounds must be >= targetSeq.length");
  }

  // local copy of your seedRandom (same math as your generateuniqueID)
  function seedRandom(s) {
    const scale = (s * 1337 + 69420) % 233280;
    const circularMod = (Math.sin(s) * scale + Math.cos(s * scale)) % 1;
    return Math.abs(circularMod);
  }

  // local getRandomNumber matching your branches (use images.length if available)
  function getRandomNumberForSeedValue(s, mapIdLocal) {
    const imagesLen = (typeof images !== "undefined" && images && images.length) ? images.length : 1000;
    if (mapIdLocal === 0) {
      return Math.floor(seedRandom(s) * imagesLen);
    } else if (mapIdLocal === 1) {
      return Math.floor(seedRandom(s) * 254);
    } else if (mapIdLocal === 2) {
      return Math.floor(seedRandom(s) * 298) + 255;
    } else if (mapIdLocal === 3) {
      return Math.floor(seedRandom(s) * 600) + 553;
    } else {
      return Math.floor(seedRandom(s) * imagesLen);
    }
  }

  const matches = [];

  // iterate seed range
  for (let seedTest = start; seedTest <= end; seedTest++) {
    // generate 'rounds' numbers for this seed (note your code increments seed each push)
    const generated = new Array(rounds);
    for (let i = 0; i < rounds; i++) {
      const s = seedTest + i; // you increment seed each iteration in your code
      generated[i] = getRandomNumberForSeedValue(s, mapId);
    }

    if (prefixOnly) {
      let ok = true;
      for (let j = 0; j < tlen; j++) {
        if (generated[j] !== targetSeq[j]) { ok = false; break; }
      }
      if (ok) {
        matches.push(seedTest);
        if (firstOnly) return matches;
      }
    } else {
      // search for targetSeq anywhere as contiguous subsequence
      let found = false;
      for (let offset = 0; offset <= rounds - tlen; offset++) {
        let ok = true;
        for (let j = 0; j < tlen; j++) {
          if (generated[offset + j] !== targetSeq[j]) { ok = false; break; }
        }
        if (ok) { found = true; break; }
      }
      if (found) {
        matches.push(seedTest);
        if (firstOnly) return matches;
      }
    }
  }

  return matches;
}

// Examples:
// 1) look for a prefix match [1,2,3] with mapId 0, generate 5 values per seed, default seed range:
//    findSeed([1,2,3], 0, 5)
// 2) search seeds 0..5000 and return all matching seeds, allow subsequence anywhere:
//    findSeed([1,2,3], 0, 10, { start: 0, end: 5000, prefixOnly: false, firstOnly: false })
