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
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function generateuniqueID(seed, roundElement) {
  const rng = mulberry32(seed);

  function getRandomNumber(mapId) {
    const r = rng();
    if (mapId === 0) {
      return Math.floor(r * images.length);
    } else if (mapId === 1) {
      return Math.floor(r * 254);
    } else if (mapId === 2) {
      return Math.floor(r * 298) + 255;
    } else if (mapId === 3) {
      return Math.floor(r * 600) + 553;
    } else {
      return Math.floor(r * images.length);
    }
  }

  var maxElement = standardCheckbox.checked
    ? roundElement
    : (Math.floor(currentRound / 100) + 1) * roundLimit;

  while (uniqueIDs.length < maxElement) {
    var randomNumber = getRandomNumber(mapId);
    uniqueIDs.push(randomNumber);
  }

  return uniqueIDs;
}

function generateNextBatch() {
  if (currentRound % 100 === 0) {
    uniqueID = generateuniqueID(seed + currentRound, currentRound);
    console.log('Generated Next Batch:', uniqueID);
  }
}

document.getElementById('guessButton').addEventListener('click', generateNextBatch);

//debug
//debug
// --------- KMP Table Builder (kept for compatibility, not required for per-seed check) ----------
function buildKMPTable(pattern) {
  const pi = new Array(pattern.length).fill(0);
  let j = 0;
  for (let i = 1; i < pattern.length; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) j = pi[j - 1];
    if (pattern[i] === pattern[j]) j++;
    pi[i] = j;
  }
  return pi;
}

// Worker code string with Versioned Bitset optimization
// Worker code string: ultra-optimized inline RNG + direct target lookup + unrolled generation
const workerCode = `
(function(){
  'use strict';

  // Mulberry32 RNG inline used directly in loops (no closure)
  // mapId-based mapping inlined (no BigInt)

  function handleMessage(data, postMessageFn) {
    try {
      const imagesLength = Number(data.imagesLength || 1000);
      const mapId = typeof data.mapId === 'number' ? data.mapId : 0;
      const start = typeof data.start === 'number' ? data.start : 0;
      const end = typeof data.end === 'number' ? data.end : -1;
      const roundElement = typeof data.roundElement === 'number' ? data.roundElement : 1;
      const prefixLen = (typeof data.prefixLen === 'number') ? Math.max(0, data.prefixLen) : 0;

      // Read target
      let targetArr;
      if (data.targetBuffer) {
        targetArr = new Uint32Array(data.targetBuffer);
      } else if (Array.isArray(data.target)) {
        targetArr = new Uint32Array(data.target);
      } else {
        targetArr = new Uint32Array(0);
      }

      const L = targetArr.length;
      if (L === 0 || end < start) {
        postMessageFn([]); return;
      }

      // Determine max possible mapped value for mapId
      let maxValue;
      switch (mapId) {
        case 1: maxValue = 254; break;
        case 2: maxValue = 552; break;   // 255 + 298 - 1
        case 3: maxValue = 1152; break;  // 553 + 600 - 1
        default: maxValue = Math.max(0, imagesLength - 1); break;
      }

      // Build a fast lookup from generated value -> index in targetArr (-1 if not a target)
      // If a value appears multiple times in targetArr, only the first index is stored;
      // duplicates in targetArr are pointless for membership semantics and can be deduped earlier if needed.
      const lookupSize = maxValue + 1;
      const targetLookup = new Int32Array(lookupSize);
      for (let i = 0; i < lookupSize; i++) targetLookup[i] = -1;

      // Validate targets and populate lookup
      for (let i = 0; i < L; i++) {
        const t = targetArr[i];
        if (t < 0 || t > maxValue) {
          // target value outside possible mapped range -> impossible to match any seed in this worker
          postMessageFn([]); return;
        }
        if (targetLookup[t] === -1) targetLookup[t] = i;
        // if duplicated target values exist, they will map to the same index (duplicate is redundant)
      }

      // Per-seed temporary small buffer to mark which targets found; reuse for every seed
      const targetFound = new Uint8Array(L);

      const results = [];

      // Inline map computation per mapId to avoid function call:
      // (we'll use a small helper via switch inside the generation)
      // For floating math exactness we use multiplication by scale = 1/2^32
      const SCALE = 1 / 4294967296;

      // small helper to map u -> v (inlined per use for best JIT)
      // Generation main loop:
      for (let s = start; s <= end; s++) {
        // prefix filter (optional): quickly check the first few RNG outputs for cheap rejection
        // if prefixLen > 0, compute prefixLen values and check if any could match targets; otherwise skip
        let rngState = s >>> 0;
        let earlyReject = false;
        if (prefixLen > 0) {
          // compute prefixLen values (unrolled small)
          for (let p = 0; p < prefixLen; p++) {
            rngState = (rngState + 0x6D2B79F5) >>> 0;
            let t0 = rngState;
            t0 = Math.imul(t0 ^ (t0 >>> 15), t0 | 1) >>> 0;
            t0 ^= t0 + Math.imul(t0 ^ (t0 >>> 7), t0 | 61) >>> 0;
            const u0 = (t0 ^ (t0 >>> 14)) >>> 0;
            let v0;
            switch (mapId) {
              case 1: v0 = Math.floor(u0 * 254 * SCALE); break;
              case 2: v0 = 255 + Math.floor(u0 * 298 * SCALE); break;
              case 3: v0 = 553 + Math.floor(u0 * 600 * SCALE); break;
              default: v0 = Math.floor(u0 * imagesLength * SCALE); break;
            }
            // quick check: if v0 is not any target AND p is last prefix, we may continue but we don't reject just on absence of match.
            // We use prefix filtering in a conservative manner: if none of prefix values map to any target at all, we reject.
            // To implement that, we test lookup presence:
            if (targetLookup[v0] !== -1) {
              // prefix produced at least one possible target -> keep seed
              earlyReject = false;
              // we break prefix loop early only if we wish; but we'll just break on first match to save work
              break;
            } else {
              // no match yet; set earlyReject = true but must ensure none of next prefix values match
              earlyReject = true;
            }
          }
          if (earlyReject) {
            // none of prefix values matched any target => skip seed
            continue;
          }
        }

        // Reset found flags for this seed (fast: only zero L entries)
        if (L > 0) targetFound.fill(0);
        let remaining = L;

        // If L is zero (shouldn't happen), skip
        // Fill generation loop, unrolled 4-at-a-time for speed
        let r = 0;
        for (; r + 3 < roundElement && remaining > 0; r += 4) {
          // 1
          rngState = (rngState + 0x6D2B79F5) >>> 0;
          let t1 = rngState;
          t1 = Math.imul(t1 ^ (t1 >>> 15), t1 | 1) >>> 0;
          t1 ^= t1 + Math.imul(t1 ^ (t1 >>> 7), t1 | 61) >>> 0;
          const u1 = (t1 ^ (t1 >>> 14)) >>> 0;
          let v1;
          switch (mapId) {
            case 1: v1 = Math.floor(u1 * 254 * SCALE); break;
            case 2: v1 = 255 + Math.floor(u1 * 298 * SCALE); break;
            case 3: v1 = 553 + Math.floor(u1 * 600 * SCALE); break;
            default: v1 = Math.floor(u1 * imagesLength * SCALE); break;
          }
          const idx1 = (v1 <= maxValue) ? targetLookup[v1] : -1;
          if (idx1 !== -1 && targetFound[idx1] === 0) { targetFound[idx1] = 1; remaining--; if (remaining === 0) { results.push(s >>> 0); continue; } }

          // 2
          rngState = (rngState + 0x6D2B79F5) >>> 0;
          let t2 = rngState;
          t2 = Math.imul(t2 ^ (t2 >>> 15), t2 | 1) >>> 0;
          t2 ^= t2 + Math.imul(t2 ^ (t2 >>> 7), t2 | 61) >>> 0;
          const u2 = (t2 ^ (t2 >>> 14)) >>> 0;
          let v2;
          switch (mapId) {
            case 1: v2 = Math.floor(u2 * 254 * SCALE); break;
            case 2: v2 = 255 + Math.floor(u2 * 298 * SCALE); break;
            case 3: v2 = 553 + Math.floor(u2 * 600 * SCALE); break;
            default: v2 = Math.floor(u2 * imagesLength * SCALE); break;
          }
          const idx2 = (v2 <= maxValue) ? targetLookup[v2] : -1;
          if (idx2 !== -1 && targetFound[idx2] === 0) { targetFound[idx2] = 1; remaining--; if (remaining === 0) { results.push(s >>> 0); continue; } }

          // 3
          rngState = (rngState + 0x6D2B79F5) >>> 0;
          let t3 = rngState;
          t3 = Math.imul(t3 ^ (t3 >>> 15), t3 | 1) >>> 0;
          t3 ^= t3 + Math.imul(t3 ^ (t3 >>> 7), t3 | 61) >>> 0;
          const u3 = (t3 ^ (t3 >>> 14)) >>> 0;
          let v3;
          switch (mapId) {
            case 1: v3 = Math.floor(u3 * 254 * SCALE); break;
            case 2: v3 = 255 + Math.floor(u3 * 298 * SCALE); break;
            case 3: v3 = 553 + Math.floor(u3 * 600 * SCALE); break;
            default: v3 = Math.floor(u3 * imagesLength * SCALE); break;
          }
          const idx3 = (v3 <= maxValue) ? targetLookup[v3] : -1;
          if (idx3 !== -1 && targetFound[idx3] === 0) { targetFound[idx3] = 1; remaining--; if (remaining === 0) { results.push(s >>> 0); continue; } }

          // 4
          rngState = (rngState + 0x6D2B79F5) >>> 0;
          let t4 = rngState;
          t4 = Math.imul(t4 ^ (t4 >>> 15), t4 | 1) >>> 0;
          t4 ^= t4 + Math.imul(t4 ^ (t4 >>> 7), t4 | 61) >>> 0;
          const u4 = (t4 ^ (t4 >>> 14)) >>> 0;
          let v4;
          switch (mapId) {
            case 1: v4 = Math.floor(u4 * 254 * SCALE); break;
            case 2: v4 = 255 + Math.floor(u4 * 298 * SCALE); break;
            case 3: v4 = 553 + Math.floor(u4 * 600 * SCALE); break;
            default: v4 = Math.floor(u4 * imagesLength * SCALE); break;
          }
          const idx4 = (v4 <= maxValue) ? targetLookup[v4] : -1;
          if (idx4 !== -1 && targetFound[idx4] === 0) { targetFound[idx4] = 1; remaining--; if (remaining === 0) { results.push(s >>> 0); continue; } }
        }

        // remainder
        for (; r < roundElement && remaining > 0; r++) {
          rngState = (rngState + 0x6D2B79F5) >>> 0;
          let tt = rngState;
          tt = Math.imul(tt ^ (tt >>> 15), tt | 1) >>> 0;
          tt ^= tt + Math.imul(tt ^ (tt >>> 7), tt | 61) >>> 0;
          const uu = (tt ^ (tt >>> 14)) >>> 0;
          let vv;
          switch (mapId) {
            case 1: vv = Math.floor(uu * 254 * SCALE); break;
            case 2: vv = 255 + Math.floor(uu * 298 * SCALE); break;
            case 3: vv = 553 + Math.floor(uu * 600 * SCALE); break;
            default: vv = Math.floor(uu * imagesLength * SCALE); break;
          }
          const idxr = (vv <= maxValue) ? targetLookup[vv] : -1;
          if (idxr !== -1 && targetFound[idxr] === 0) { targetFound[idxr] = 1; remaining--; if (remaining === 0) { results.push(s >>> 0); break; } }
        }

        // if loop exited without finding all targets, do not add result (we already added only on full match)
        // continue to next seed
      }

      postMessageFn(results);
    } catch (err) {
      postMessageFn({ __workerError: String(err && err.stack ? err.stack : err) });
    }
  }

  // Browser worker
  if (typeof self !== 'undefined' && typeof self.addEventListener === 'function') {
    self.addEventListener('message', (evt) => {
      handleMessage(evt.data, (msg) => self.postMessage(msg));
    });
    return;
  }

  // Node worker_threads
  try {
    const { parentPort } = require('worker_threads');
    parentPort.on('message', (data) => {
      handleMessage(data, (msg) => parentPort.postMessage(msg));
    });
  } catch (err) {
    // not in worker context
  }
})();
`;

// --------- Dynamic Parallel Seed Finder (fixed syntax + persistent workers) ----------
// Updated dynamic pool: smaller chunkSize by default and optional onProgress callback
async function findSeedParallel(
  target,
  mapId,
  start,
  end,
  workers = 8,
  chunkSize = 1_000_000,
  roundElement = 1   // NEW param
) {
  if (!Array.isArray(target) || target.length === 0) throw new Error('target must be a non-empty array of numbers');
  const total = end - start + 1;
  if (total <= 0) return [];

  const imagesLength = (typeof images !== 'undefined' && images.length) ? images.length : 1000;
  let nextSeed = start;
  const results = new Set();
  let processed = 0;

  function getNextChunk() {
    if (nextSeed > end) return null;
    const from = nextSeed;
    const to = Math.min(end, from + chunkSize - 1);
    nextSeed = to + 1;
    return { from, to };
  }

  function makeWorkerPromise() {
  return new Promise((resolve, reject) => {
    // ---------- Browser path ----------
    if (typeof Worker !== 'undefined') {
      try {
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const w = new Worker(URL.createObjectURL(blob));

        w.onmessage = (e) => {
          const data = e.data;
          if (Array.isArray(data)) {
            data.forEach((s) => results.add(s));
          } else if (data && data.__workerError) {
            reject(new Error(data.__workerError));
            w.terminate();
            return;
          }
          const range = getNextChunk();
          if (range) {
            w.postMessage({ target, mapId, start: range.from, end: range.to, imagesLength, roundElement });
          } else {
            w.terminate();
            resolve();
          }
        };

        w.onerror = (err) => { reject(err); w.terminate(); };

        const first = getNextChunk();
        if (first) {
          w.postMessage({ target, mapId, start: first.from, end: first.to, imagesLength, roundElement });
        } else {
          w.terminate();
          resolve();
        }
      } catch (err) { reject(err); }

    // ---------- Node.js path ----------
    } else {
      try {
        const { Worker } = require('worker_threads');
        const w = new Worker(workerCode, { eval: true });

        w.on('message', (data) => {
          if (Array.isArray(data)) {
            data.forEach((s) => results.add(s));
          } else if (data && data.__workerError) {
            reject(new Error(data.__workerError));
            w.terminate();
            return;
          }
          const range = getNextChunk();
          if (range) {
            w.postMessage({ target, mapId, start: range.from, end: range.to, imagesLength, roundElement });
          } else {
            w.terminate();
            resolve();
          }
        });

        w.on('error', (err) => { reject(err); w.terminate(); });

        const first = getNextChunk();
        if (first) {
          w.postMessage({ target, mapId, start: first.from, end: first.to, imagesLength, roundElement });
        } else {
          w.terminate();
          resolve();
        }
      } catch (err) { reject(err); }
    }
  });
}


  const pool = [];
  for (let i = 0; i < workers; i++) pool.push(makeWorkerPromise());
  await Promise.all(pool);
  return Array.from(results).sort((a,b)=>a-b);
}
