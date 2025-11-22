var guessButton = document.querySelector('.guess-btn');
var nextRoundButton = document.querySelector('.next-round');
var playButton = document.querySelector('.play');
var guessWrapper = document.querySelector('.guess-wrapper');
var guessHelper = document.getElementById('guessHelper');

var currentImage = null;
var imageElement;

standardCheckbox = document.getElementById('Standard');
survivalCheckbox = document.getElementById('Survival');
superstitionCheckbox = document.getElementById('Superstition');

var guessedRounds = [];

let originalImageUrl = null;

playButton.addEventListener('click', function () {
  loadingScreen.style.display = 'flex';
  seed();
  // Choose a random image
  randomIndex = uniqueID[currentRound - 1];
  currentImage = images[randomIndex];
  currentMapLocation = images[randomIndex].currentLocation;
  originalImageUrl = currentImage.imageUrl; // store original

  // Display the image
  imageElement = document.createElement('img');
  imageElement.src = originalImageUrl;
  imageElement.classList.add('random-image');
  document.body.appendChild(imageElement);

  let isImageLoaded = false;
  imageElement.addEventListener('load', function () {
    if (isImageLoaded) return; // extra safety
    isImageLoaded = true;
    loadingScreen.style.display = 'none';
    filter();
    // If Superstition mode and it's a superstition round -> show it
    if (superstitionCheckbox.checked && (currentRound - 1) % 5 === 0) {
      superstitionStart();
    } else {
      // apply filters and start the timers
      
      startCountdown();
    }
  }, { once: true }); // <--- IMPORTANT: the handler is removed after firing once
  });
    
var survivalCondition = null;

function playNextRound() {
  loadingScreen.style.display = 'flex';
  guessOverlay.style.display = 'none';
  guessResult.textContent = '';
  guessHelper.style.display = 'none';
  guessWrapper.style.zIndex = '-1';

  randomIndex = uniqueID[currentRound - 1];
  currentImage = images[randomIndex];
  currentMapLocation = images[randomIndex].currentLocation;

  guessButton.classList.remove('has-marker');

  var existingImage = document.querySelector('.random-image');
  if (existingImage) existingImage.remove();

  originalImageUrl = currentImage.imageUrl;
  imageElement = document.createElement('img');
  imageElement.src = originalImageUrl;
  imageElement.classList.add('random-image');
  document.body.appendChild(imageElement);

  let isImageLoaded = false;
  imageElement.addEventListener('load', function () {
    if (isImageLoaded) return;
    isImageLoaded = true;
    loadingScreen.style.display = 'none';
    filter();
    if (superstitionCheckbox.checked && (currentRound - 1) % 5 === 0) {
      superstitionStart();
    } else {
      
      startCountdown();
    }
  }, { once: true });

// Hide the next round button
nextRoundButton.style.display = 'none';
if (starrailMarker) {
starrailMap.removeLayer(starrailMarker);
}
var resultMap = document.querySelector('#resultmap');
  resultMap.style.opacity = '0';
  resultMap.style.pointerEvents = 'none';
}

var guessButton = document.getElementById('guessButton');
var guessOverlay = document.getElementById('guessOverlay');
var score;
var distance;

function calculateDistance(lat1, lon1, lat2, lon2) {
    const r = 56.5; // Radius
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = r * c;
    return d;
}

// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

var backMenu = document.querySelector('.menu-btn');
var guessButtonActivated = false;
var nextRoundButtonActivated = false;

var resultText;
var guessResult = document.getElementById('guessResult');
var guessHelper = document.getElementById('guessHelper');

var displayElement = document.getElementById("countdown-text");
var displaySElement = document.getElementById("countdown-s-text");

function animateScoreEaseOut(targetScore, element, duration = 1000, delay = 500, callback = null, startScore = 0) {
    // show starting number
    element.textContent = String(startScore);
    setTimeout(() => {
        let startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            let progress = Math.min(elapsed / duration, 1);
            progress = easeOutQuad(progress);
            const current = Math.floor(startScore + (targetScore - startScore) * progress);
            element.textContent = current;

            if (elapsed < duration) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = targetScore;
                if (callback) callback();
            }
        }

        requestAnimationFrame(animate);
    }, delay);
}

function isSameZoneDifferentFloor(correctLocation, guessedLocation) {
  function baseName(name) {
    return name.split(" - ")[0].trim();
  }

  return (
    baseName(correctLocation) === baseName(guessedLocation) &&
    correctLocation !== guessedLocation
  );
}

function triggerConfetti(targetElement = null, confettiCount = 120, intensity = 0.75) {
  // Adaptive heuristics (tweak thresholds if you want)
  const supportsReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hwConcurrency = navigator.hardwareConcurrency || 4;
  const dpr = window.devicePixelRatio || 1;

  // Heuristics for low-end devices
  const lowEnd = hwConcurrency <= 2 || dpr > 2 || /Mobi|Android/i.test(navigator.userAgent);

  // Respect reduced-motion
  if (supportsReducedMotion) {
    confettiCount = Math.min(confettiCount, 18);
    intensity = Math.min(intensity, 0.6);
  }

  // Scale confetti count by device capability
  let canvasCount = confettiCount;
  let domForegroundCount = Math.max(6, Math.round(confettiCount * 0.8)); // few 3D DOM pieces
  if (lowEnd) {
    canvasCount = Math.max(18, Math.round(confettiCount * 0.28));
    domForegroundCount = Math.min(domForegroundCount, 6);
  } else if (hwConcurrency <= 4) {
    canvasCount = Math.max(32, Math.round(confettiCount * 0.5));
    domForegroundCount = Math.min(domForegroundCount, 10);
  } else {
    canvasCount = confettiCount;
  }

  // limit absolute counts (safety)
  canvasCount = Math.min(800, canvasCount);
  domForegroundCount = Math.min(16, domForegroundCount);

  const warmColors = ["#FFD700", "#FF69B4", "#ff6969", "#00FFFF", "#ADFF2F", "#FFA500"];

  // create container
  const container = document.createElement("div");
  container.className = "confetti-container";
  Object.assign(container.style, {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    overflow: "visible",
    zIndex: 99,
    perspective: "900px",
    transformStyle: "preserve-3d"
  });
  document.body.appendChild(container);

  // compute origin
  let originX = window.innerWidth / 2;
  let originY = window.innerHeight * 0.3;
  if (targetElement && targetElement.getBoundingClientRect) {
    const r = targetElement.getBoundingClientRect();
    originX = r.left + r.width / 2;
    originY = r.top + r.height / 2;
  }

  // small flash (keep light-weight)
  if (!supportsReducedMotion) {
    const flash = document.createElement("div");
    Object.assign(flash.style, {
      position: "absolute",
      left: (originX - 50) + "px",
      top: (originY - 50) + "px",
      width: (100 * intensity) + "px",
      height: (100 * intensity) + "px",
      borderRadius: "50%",
      pointerEvents: "none",
      background: "radial-gradient(circle, rgba(255,255,220,0.95) 0%, rgba(255,150,40,0.85) 30%, rgba(255,80,10,0.4) 60%, rgba(0,0,0,0) 72%)",
      transform: "scale(0.6)",
      opacity: "1",
      zIndex: 99999,
      willChange: "transform, opacity"
    });
    container.appendChild(flash);
    flash.animate([
      { transform: "scale(0.6)", opacity: 1 },
      { transform: `scale(${2 + intensity})`, opacity: 0 }
    ], { duration: 420 + intensity * 200, easing: "ease-out", fill: "forwards" });
    setTimeout(() => { try { flash.remove(); } catch(e) {} }, 900 + intensity * 300);
  }

  // --- Canvas bulk particles (fast) ---
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { alpha: true });
  canvas.style.position = "absolute";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = 99998;
  container.appendChild(canvas);

  // particles
  const particles = [];
  const now = performance.now();
  for (let i = 0; i < canvasCount; i++) {
    // depth (fake 3D): 0 (near) -> 1 (far)
    const depth = Math.random();
    const isSpark = Math.random() < 0.28;
    const speed = (120 + Math.random() * 420) * (1 - depth * 0.6) * intensity;
    const angle = (Math.random() * Math.PI * 2);
    const size = (isSpark ? (2 + Math.random() * 4) : (8 + Math.random() * 18)) * (1 - depth * 0.5) * intensity;
    particles.push({
      x: originX + (Math.random() - 0.5) * 40 * intensity,
      y: originY + (Math.random() - 0.5) * 30 * intensity,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * 0.6 - 140 * (1 - depth),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      size,
      color: warmColors[Math.floor(Math.random() * warmColors.length)],
      alpha: 1 - depth * 0.6,
      gravity: 0.25 + Math.random() * 0.35,
      life: 2200 + Math.random() * 3000 * (1 + depth * 0.6),
      birth: now,
      depth
    });
  }

  // render loop
  let rafId = null;
  function renderCanvas(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const current = t;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const age = current - p.birth;
      if (age > p.life) continue;

      // simple physics integrated at fixed dt approximation
      const dt = Math.min(32, age === 0 ? 16 : (16)); // keep stable
      p.x += p.vx * (dt / 1000);
      p.y += p.vy * (dt / 1000) + p.gravity * (dt / 1000) * 16;
      p.vy += p.gravity * 0.03;

      p.rotation += p.rotationSpeed * (dt / 16);

      const lifeRatio = 1 - (age / p.life);
      const drawAlpha = lifeRatio * p.alpha;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      // fake perspective tilt by scaling Y based on depth
      const tiltScale = 1 - p.depth * 0.28;
      ctx.scale(tiltScale, 1);
      ctx.globalAlpha = Math.max(0, drawAlpha);
      ctx.fillStyle = p.color;
      // draw small rounded rectangle quickly
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    // remove dead particles occasionally to keep loop light
    // (but keep array size stable; we simply stop drawing expired ones)
    // stop condition
    const stillAlive = particles.some(p => (current - p.birth) < p.life);
    if (stillAlive) {
      rafId = requestAnimationFrame(renderCanvas);
    } else {
      // cleanup canvas after short fade to let DOM foreground remain
      setTimeout(() => {
        try { canvas.remove(); } catch(e) {}
      }, 800);
    }
  }
  rafId = requestAnimationFrame(renderCanvas);

  // --- Small number of DOM 3D foreground "chunks" for real 3D feel ---
  const fgFragment = document.createDocumentFragment();
  const fgEls = [];
  const fgCount = domForegroundCount;

  // cap durations (keeps animations fast on low-end)
  const fgDurationBase = lowEnd ? 1100 : 1700;
  const fgExtra = lowEnd ? 600 : 1400;

  for (let i = 0; i < fgCount; i++) {
    const el = document.createElement("div");
    el.className = "confetti-3d";
    const isSpark = Math.random() < 0.25;
    const sz = Math.round((isSpark ? (4 + Math.random() * 6) : (18 + Math.random() * 36)) * intensity);
    Object.assign(el.style, {
      position: "absolute",
      left: (originX + (Math.random() - 0.5) * 40 * intensity) + "px",
      top: (originY + (Math.random() - 0.5) * 26 * intensity) + "px",
      width: (isSpark ? 3 : sz) + "px",
      height: (isSpark ? (10 + Math.random() * 26) * intensity : sz) + "px",
      background: warmColors[Math.floor(Math.random() * warmColors.length)],
      borderRadius: isSpark ? "2px" : "4px",
      transformStyle: "preserve-3d",
      willChange: "transform, opacity",
      pointerEvents: "none",
      zIndex: 99999
    });

    fgFragment.appendChild(el);
    fgEls.push({ el, isSpark });
  }
  container.appendChild(fgFragment);

  // animate foreground DOM pieces with Web Animations API
  fgEls.forEach((o, idx) => {
    const el = o.el;
    const isSpark = o.isSpark;
    const angle = Math.random() * Math.PI * 2;
    const baseV = 420 + Math.random() * 380;
    const depthFactor = 1.0 - Math.random() * 0.6;
    const vx = Math.cos(angle) * baseV * depthFactor * (1 + Math.random() * 0.4);
    const vy = Math.sin(angle) * baseV * depthFactor * (1 + Math.random() * 0.4);
    const vz = (Math.random() - 0.5) * 700 * (1 - depthFactor);
    const rotX = Math.random() * 720 + 360;
    const rotY = Math.random() * 720 + 360;
    const dur = Math.round(fgDurationBase + Math.random() * fgExtra) * (1 + (1 - depthFactor) * 0.6);

    const keyframes = [
      { transform: `translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1)`, opacity: 1 },
      { transform: `translate3d(${vx * 0.4}px, ${vy * 0.4}px, ${vz * 0.35}px) rotateX(${rotX * 0.4}deg) rotateY(${rotY * 0.4}deg) scale(1)`, opacity: 0.95, offset: 0.45 },
      { transform: `translate3d(${vx}px, ${vy}px, ${vz}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(0.95)`, opacity: 0 }
    ];

    // stagger delay so not everything moves exactly at same time
    const anim = el.animate(keyframes, {
      duration: Math.max(700, dur),
      easing: "cubic-bezier(.22,.9,.3,1)",
      delay: Math.random() * 120,
      fill: "forwards"
    });

    // cleanup element after animation ends
    anim.onfinish = () => { try { el.remove(); } catch(e) {} };
    // safety: remove after dur+500ms in case onfinish not fired
    setTimeout(() => { try { el.remove(); } catch(e) {} }, dur + 800);
  });

  // final cleanup of container after everything done
  const maxDuration = Math.max(4500, Math.round(3000 + confettiCount * 10 * intensity));
  setTimeout(() => {
    try {
      rafId && cancelAnimationFrame(rafId);
      canvas.remove();
      // remove any leftover fg els
      try { container.remove(); } catch(e) {}
    } catch (e) {}
  }, maxDuration);
}

guessButton.addEventListener('click', function() {
    if (!guessButton.classList.contains('has-marker')) return;

    var resultMap = document.querySelector('#resultmap');
    resultMap.style.opacity = '1';
    resultMap.style.pointerEvents = 'auto';

    if (currentMap === currentMapLocation && starrailMarker) {
        var playerMarker = starrailMarker.getLatLng();

        // assign to the global variables (was 'let distance' before)
        distance = calculateDistance(
            playerMarker.lat,
            playerMarker.lng,
            currentImage.lat,
            currentImage.lng
        );

        // assign to global 'score' (was 'let score' before)
        score = distance < 3 ? 5000 : Math.max(0, 5000 - (distance - 3) * 29.333);
        score = Math.ceil(score);
        if (score >= 4500) {
          triggerConfetti();
        }

        // add base score to total now
        currentScore += score;

        displayElement.style.display = "none";
        displaySElement.style.display = "none";

        resultText = `Your guess was <span style='color: rgb(255, 228, 107)'>${distance.toFixed(2)}m</span> away from the correct location. <br><span id="animated-score" style='color: rgb(255, 228, 107); font-size: 80px; display: block; text-align: center'>0</span></br>`;
        guessResult.innerHTML = resultText;

        let animatedScoreElement = document.getElementById("animated-score");

        // Step 1: animate base score (0 -> score)
        animateScoreEaseOut(score, animatedScoreElement, 1500, 500, () => {
            // Step 2: apply buffs/debuffs (they now read the global 'score' and 'distance')
            // Step 2: apply buffs/debuffs and get individual deltas
            let beforeBuffScore = currentScore;
            let deltas = [];
            if (typeof applyActiveBuffsAndDebuffs === "function") {
                deltas = applyActiveBuffsAndDebuffs(); // array of numbers
            }
            let afterBuffScore = currentScore;

            if (deltas.length > 0) {
                let runningScore = score; // start from base score
                deltas.forEach((delta, index) => {
                    setTimeout(() => {
                        // popup for this delta
                        let popupElement = document.createElement("span");
                        popupElement.textContent = (delta > 0 ? "+" : "") + delta;
                        popupElement.style.position = "absolute";
                        popupElement.style.left = "50%";
                        popupElement.style.top = "55%";
                        popupElement.style.transform = "translateX(-50%)";
                        popupElement.style.fontSize = "40px";
                        popupElement.style.fontWeight = "bold";
                        popupElement.style.color = delta > 0 ? "limegreen" : "crimson";
                        popupElement.style.opacity = "1";
                        popupElement.style.transition = "all 900ms ease";
                        animatedScoreElement.parentNode.appendChild(popupElement);

                        setTimeout(() => {
                            popupElement.style.top = "45%";
                            popupElement.style.opacity = "0";
                        }, 50);
                        setTimeout(() => popupElement.remove(), 1000);

                        // animate yellow score from runningScore → runningScore+delta
                        animateScoreEaseOut(runningScore + delta, animatedScoreElement, 1000, 0, null, runningScore);
                        runningScore += delta;
                    }, index * 1200); // stagger animations
                });
            }
        });

    } else if (starrailMarker) {
    let compensation = 0;
    let message = "Your guess was incorrect!";

    if (isSameZoneDifferentFloor(currentMapLocation, currentMap)) {
        compensation = 500;
        message = `Your guess was <span style='color: rgb(255, 228, 107)'>close</span>!`;
    }

    score = compensation; // either 500 or 0
    currentScore += score;

    displayElement.style.display = "none";
    displaySElement.style.display = "none";

    resultText = `
      ${message} The correct location is 
      <span style='color: rgb(255, 228, 107)'>${currentMapLocation}</span>.
      <br>
      <span id="animated-score" 
            style='color: rgb(255, 228, 107); font-size: 80px; display: inline-block; text-align: center'>
            0
      </span>
      <br>
    `;
    guessResult.innerHTML = resultText;

    let animatedScoreElement = document.getElementById("animated-score");

    // animate base score (0 -> compensation)
    animateScoreEaseOut(score, animatedScoreElement, 800, 200, () => {
        let deltas = [];
        if (typeof applyActiveBuffsAndDebuffs === "function") {
            deltas = applyActiveBuffsAndDebuffs();
        }
        if (Array.isArray(deltas) && deltas.length > 0) {
            let runningScore = score;
            deltas.forEach((delta, index) => {
                setTimeout(() => {
                    let popupElement = document.createElement("span");
                    popupElement.textContent = (delta > 0 ? "+" : "") + delta;
                    popupElement.style.position = "absolute";
                    popupElement.style.left = "50%";
                    popupElement.style.top = "55%";
                    popupElement.style.transform = "translateX(-50%)";
                    popupElement.style.fontSize = "40px";
                    popupElement.style.fontWeight = "bold";
                    popupElement.style.color = delta > 0 ? "limegreen" : "crimson";
                    popupElement.style.opacity = "1";
                    popupElement.style.transition = "all 900ms ease";
                    animatedScoreElement.parentNode.appendChild(popupElement);

                    setTimeout(() => {
                        popupElement.style.top = "45%";
                        popupElement.style.opacity = "0";
                    }, 50);
                    setTimeout(() => popupElement.remove(), 1000);

                    animateScoreEaseOut(
                        runningScore + delta,
                        animatedScoreElement,
                        1000,
                        0,
                        null,
                        runningScore
                    );
                    runningScore += delta;
                }, index * 1200);
            });
        }
    });
}

let guessedLatLngObj = null;
if (starrailMarker && starrailMarker.getLatLng) {
  const gl = starrailMarker.getLatLng();
  guessedLatLngObj = { lat: gl.lat, lng: gl.lng };
}

const correctLatLngObj = { lat: currentImage.lat, lng: currentImage.lng };

guessedRounds.push({
  roundNumber: currentRound,
  guessedMapName: currentMap,
  correctMapName: currentMapLocation,
  guessedLatLng: guessedLatLngObj,
  correctLatLng: correctLatLngObj,
  wasCorrect: (currentMap === currentMapLocation),
  scoreEarned: score || 0
});

    guessOverlay.style.display = 'block';
    nextRoundButton.style.display = 'block';
    guessHelper.style.display = 'block';
    guessWrapper.style.zIndex = '4';
    stopCountdown();
});


function updateScore() {
  if (standardCheckbox.checked) {
    score = Math.ceil(score);
    currentScore += score;
    if (round == 1) {
      nextRoundButton.classList.add('view-result');
      nextRoundButton.innerText = 'View Result';
    }
  } else {
    score = Math.ceil(score);
    currentScore += score;
    // Survival mode, check if current score is less than survival condition
    if (currentScore < survivalCondition) {
      nextRoundButton.classList.add('view-result');
      nextRoundButton.innerText = 'View Result';
    }
  }
}

currentRound = 1;
currentScore = 0;
finalScore = 0;

var diff1 = document.getElementById("diff1");
var diff2 = document.getElementById("diff2");
var diff3 = document.getElementById("diff3");
var diff4 = document.getElementById("diff4");
var diff5 = document.getElementById("diff5");
var diff6 = document.getElementById("diff6");

var filter1 = document.getElementById("filter1");
var filter2 = document.getElementById("filter2");
var filter3 = document.getElementById("filter3");
var filter4 = document.getElementById("filter4");

document.querySelector(".play").addEventListener("click", function() {
  if (standardCheckbox.checked) {
    currentRound = 1;
    currentScore = 0;
    finalScore = 0;
    updateRoundInfo();
    //console.log("Round: " + currentRound + "/" + round);
    //console.log("Current Score: " + currentScore);
    //console.log("Final Score: " + finalScore);
  } else {
    currentRound = 1;
    currentScore = 0;
    finalScore = 0;
    survivalCondition = 1000;
    updateRoundInfo();
    diff1.style.display = "block";
    //console.log("Round: " + currentRound);
    //console.log("Current Score: " + currentScore);
    //console.log("Final Score: " + finalScore);
    console.log("Survival Condition: " + survivalCondition);
  }
});


function updateNextRoundButton() {
  if (standardCheckbox.checked) {
    if (currentRound == round) {
      nextRoundButton.classList.add('view-result');
      nextRoundButton.innerText = 'View Result';
    } else {
      nextRoundButton.classList.remove('view-result');
      nextRoundButton.innerText = 'Next Round';
    }
  } else {
      nextRoundButton.classList.remove('view-result');
      nextRoundButton.innerText = 'Next Round';
    }
  }


document.querySelectorAll(".has-marker").forEach(function(button) {
  button.addEventListener("click", function() {
    if (currentRound == round) {
      finalScore = currentScore;
      updateRoundInfo();  
  }
    updateNextRoundButton();
  });
});

document.querySelector(".next-round").addEventListener("click", function() {
  if (nextRoundButton.classList.contains('view-result')) {
    updateRoundInfo(); 
    // Handle logic for the "View Result" button
    guessHelper.style.display = 'none';
    nextRoundButton.style.display = 'none';
    guessResult.textContent = '';
    guessResult.style.display = 'none';
    var finalTextElement = document.getElementById("finaltext");
    finalTextElement.style.display = "block"
    var breakdownButton = document.getElementById('breakdown-btn');
    breakdownButton.style.display = "block";
    var resultMap = document.querySelector('#resultmap');
                resultMap.style.opacity = '0';
                resultMap.style.pointerEvents = 'none';
    finalScore = currentScore;
    displayFinalScore();
    backMenu.style.display = 'block';
    backMenu.addEventListener('click', function() {
      location.reload();
     })

  } else {
    // Handle logic for the "Next Round" button
      currentRound++;
      if (superstitionCheckbox.checked && survivalCheckbox.checked) {
        if (currentRound < 11) {
          survivalCondition += 1000;
        } else if (currentRound < 21) {
          diff1.style.display = "none";
          diff2.style.display = "block";
          survivalCondition += 2500;
        } else if (currentRound < 31) {
          diff2.style.display = "none";
          diff3.style.display = "block";
          survivalCondition += 4000;
        } else if (currentRound < 41) {
          diff3.style.display = "none";
          diff4.style.display = "block";
          survivalCondition += 5500;
        } else if (currentRound < 101) {
          diff4.style.display = "none";
          diff5.style.display = "block";
          survivalCondition += 7000;
        } else if (currentRound < 201) {
          diff5.style.display = "none";
          diff6.style.display = "block";
          survivalCondition += 9500;
        } else if (currentRound < 301) {
          diff6.style.display = "none";
          diff7.style.display = "block";
          survivalCondition += 9800;
        } else if (currentRound < 501) {
          diff7.style.display = "none";
          diff8.style.display = "block";
          survivalCondition += 10500;
        } else {
          diff8.style.display = "none";
          diff9.style.display = "block";
          survivalCondition += 12000;
        }
        
      } else if (survivalCheckbox.checked) {
        if (currentRound < 6) {
          survivalCondition += 1000;
        } else if (currentRound < 11) {
          diff1.style.display = "none";
          diff2.style.display = "block";
          survivalCondition += 1750;
        } else if (currentRound < 16) {
          diff2.style.display = "none";
          diff3.style.display = "block";
          survivalCondition += 2500;
        } else if (currentRound < 21) {
          diff3.style.display = "none";
          diff4.style.display = "block";
          survivalCondition += 3250;
        } else if (currentRound < 51) {
          diff4.style.display = "none";
          diff5.style.display = "block";
          survivalCondition += 4000;
        } else if (currentRound < 101) {
          diff5.style.display = "none";
          diff6.style.display = "block";
          survivalCondition += 4750;
        } else if (currentRound < 201) {
          diff6.style.display = "none";
          diff7.style.display = "block";
          survivalCondition += 4900;
        } else if (currentRound < 501) {
          diff7.style.display = "none";
          diff8.style.display = "block";
          survivalCondition += 5250;
        } else {
          diff8.style.display = "none";
          diff9.style.display = "block";
          survivalCondition += 6000;
        }
      }
      updateRoundInfo();
      //console.log("Round: " + currentRound + "/" + round);
      //console.log("Current Score: " + currentScore);
      //console.log("Final Score: " + finalScore);
    playNextRound();
  }
  updateNextRoundButton();
});
updateNextRoundButton();

// ---- Breakdown modal + render logic ----
// global tracker (keeps using same var name)
var breakdownMaps = [];

// Helper: find overlay by name (safe)
function findOverlay(name) {
  if (!window.overlays || !Array.isArray(window.overlays) || !name) return null;
  return overlays.find(o => o.name === name) || null;
}

// Helper: create and return a Leaflet map, optionally add an ImageOverlay and a marker
function createMap({ containerId, overlayName = null, markerLatLng = null, markerIcon = null, initialZoom = 1 }) {
  const map = L.map(containerId, {
    center: [0, 0],
    zoom: initialZoom,
    dragging: true,
    zoomControl: true,
    attributionControl: false,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    boxZoom: true,
    closePopupOnClick: false,
  });

  try {
    const overlayDesc = findOverlay(overlayName);
    if (overlayDesc) {
      L.imageOverlay(overlayDesc.imageUrl, overlayDesc.bounds).addTo(map);
      map.fitBounds(overlayDesc.bounds);
    } else {
      map.setView([0, 0], initialZoom);
    }

    if (markerLatLng) {
      L.marker([markerLatLng.lat, markerLatLng.lng], { icon: markerIcon }).addTo(map);
      try { map.setView([markerLatLng.lat, markerLatLng.lng], Math.max(map.getZoom(), 2)); } catch (e) {}
    }
  } catch (err) {
    console.warn('createMap error', err);
  }

  // store for cleanup
  breakdownMaps.push(map);
  return map;
}

// Helper: opens a fullscreen preview overlay for an image src
function openImagePreview(src, alt = '') {
  if (!src) return;
  // avoid duplicate preview
  if (document.getElementById('image-preview-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'image-preview-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: 1000001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.88)'
  });
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePreview();
  });

  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  Object.assign(img.style, {
    maxWidth: 'min(95vw, 1400px)',
    maxHeight: '90vh',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
  });
  img.addEventListener('click', (e) => e.stopPropagation());
  overlay.appendChild(img);


  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  Object.assign(closeBtn.style, {
    position: 'absolute',
    right: '22px',
    top: '22px',
    padding: '6px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: '#222',
    color: '#ffd',
    border: '1px solid rgba(255,255,255,0.06)',
    zIndex: 1000002
  });
  overlay.appendChild(closeBtn);
  closeBtn.addEventListener('click', closePreview);

  function onKey(e) { if (e.key === 'Escape') closePreview(); }
  document.addEventListener('keydown', onKey);

  function closePreview() {
    try { overlay.remove(); } catch (e) {}
    document.removeEventListener('keydown', onKey);
  }
}

// The optimized openBreakdownModal function (drop-in)
function openBreakdownModal() {
  if (document.getElementById('breakdown-modal')) return; // already open

  // backdrop / modal container
  const modal = document.createElement('div');
  modal.id = 'breakdown-modal';
  Object.assign(modal.style, {
    position: 'fixed',
    inset: '0',
    zIndex: 999999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.55)',
    padding: '22px',
    overflowY: 'auto'
  });
  document.body.appendChild(modal);

  // clicking backdrop closes modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      cleanupBreakdown();
      try { modal.remove(); } catch (e) {}
    }
  });

  // panel
  const panel = document.createElement('div');
  panel.className = 'breakdown-panel';
  Object.assign(panel.style, {
    width: 'min(700px, 92%)',
    maxHeight: '80vh',
    overflowY: 'auto',
    background: '#121212',
    color: '#fff',
    borderRadius: '12px',
    padding: '18px 36px',
    boxSizing: 'border-box'
  });
  // prevent clicks inside panel from closing
  panel.addEventListener('click', (e) => e.stopPropagation());
  modal.appendChild(panel);

  // header
  const header = document.createElement('div');
  Object.assign(header.style, {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px'
  });
  panel.appendChild(header);

  const h = document.createElement('h3');
  h.textContent = 'Game Breakdown';
  h.style.margin = '0';
  header.appendChild(h);

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  Object.assign(closeBtn.style, {
    padding: '6px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: '#222',
    color: '#ffd',
    border: '1px solid rgba(255,255,255,0.06)'
  });
  header.appendChild(closeBtn);
  closeBtn.addEventListener('click', () => {
    cleanupBreakdown();
    try { modal.remove(); } catch (e) {}
  });

  // content container (larger gaps for scrolling/readability)
  const content = document.createElement('div');
  content.className = 'breakdown-content';
  Object.assign(content.style, {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '18px'
  });
  panel.appendChild(content);

  if (!guessedRounds || guessedRounds.length === 0) {
    const empty = document.createElement('div');
    empty.textContent = 'No guesses recorded for this session.';
    empty.style.padding = '20px';
    content.appendChild(empty);
    return;
  }

  // iterate rounds and build cards
  guessedRounds.forEach((g, index) => {
    const wasCorrect = !!g.wasCorrect || (g.guessedMapName === g.correctMapName);

    // card
    const card = document.createElement('div');
    Object.assign(card.style, {
      background: '#161616',
      borderRadius: '10px',
      padding: '12px',
      display: 'grid',
      gap: '16px',
      alignItems: 'stretch'
    });

    // header row (thumbnail + title/metadata)
    const cardHeader = document.createElement('div');
    Object.assign(cardHeader.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      marginBottom: '6px'
    });

    // find thumbnail image object (prefer stored item)
    let imgObj = g.currentImage || g.image || null;
    if (!imgObj && typeof images !== 'undefined' && Array.isArray(images) && typeof uniqueID !== 'undefined') {
      try {
        const roundIdx = uniqueID && uniqueID[g.roundNumber - 1];
        if (typeof roundIdx !== 'undefined') imgObj = images[roundIdx];
      } catch (e) { /* ignore */ }
    }
    const thumbSrc = imgObj ? (imgObj.imageUrl || imgObj.url || imgObj.src || null) : null;

    // thumbnail wrapper w/ tooltip (keeps map layout unaffected)
    if (thumbSrc) {
      const thumbWrap = document.createElement('div');
      Object.assign(thumbWrap.style, {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 144px',
        gap: '8px'
      });

      const thumb = document.createElement('img');
      thumb.src = thumbSrc;
      thumb.alt = `Round ${g.roundNumber}`;
      Object.assign(thumb.style, {
        width: '144px',
        height: '64px',
        borderRadius: '6px',
        objectFit: 'cover',
        background: '#0b0b0b',
        boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
        cursor: 'pointer'
      });

      // tooltip shown right side
      const tooltip = document.createElement('div');
      tooltip.textContent = 'Click to show image';
      Object.assign(tooltip.style, {
        position: 'relative',
        marginLeft: '8px',
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '6px 10px',
        borderRadius: '6px',
        whiteSpace: 'nowrap',
        fontSize: '12px',
        opacity: '0',
        pointerEvents: 'none',
        transition: 'opacity 0.12s ease'
      });

      // hover handlers
      thumb.addEventListener('mouseenter', () => { tooltip.style.opacity = '1'; });
      thumb.addEventListener('mouseleave', () => { tooltip.style.opacity = '0'; });

      // click -> large preview
      thumb.addEventListener('click', (ev) => { ev.stopPropagation(); openImagePreview(thumbSrc, `Round ${g.roundNumber}`); });

      thumbWrap.appendChild(thumb);
      thumbWrap.appendChild(tooltip);
      cardHeader.appendChild(thumbWrap);
    }

    // title + subtitle
    const titleWrap = document.createElement('div');
    Object.assign(titleWrap.style, { display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' });

    const title = document.createElement('div');
    title.innerHTML = `<strong>Round ${g.roundNumber}</strong> — Score: ${g.scoreEarned}`;
    Object.assign(title.style, {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    });
    titleWrap.appendChild(title);

    const subtitle = document.createElement('div');
    Object.assign(subtitle.style, {
      opacity: '0.85',
      fontSize: '13px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    });
    subtitle.textContent = wasCorrect ? (g.correctMapName || '—') : `${g.guessedMapName || '—'} → ${g.correctMapName || '—'}`;
    titleWrap.appendChild(subtitle);

    cardHeader.appendChild(titleWrap);
    card.appendChild(cardHeader);

    // maps area
    if (wasCorrect) {
      card.style.gridTemplateColumns = '1fr';

      const singleWrap = document.createElement('div');
      Object.assign(singleWrap.style, {
        minHeight: '160px',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#0c0c0c'
      });

      const label = document.createElement('div');
      label.textContent = 'Result';
      Object.assign(label.style, { fontSize: '12px', color: '#ddd', padding: '6px 4px' });
      singleWrap.appendChild(label);

      const mapDiv = document.createElement('div');
      mapDiv.id = `breakdown-result-${index}`;
      mapDiv.style.width = '100%';
      mapDiv.style.height = '220px';
      singleWrap.appendChild(mapDiv);

      card.appendChild(singleWrap);
      content.appendChild(card);

      // initialize map with both markers + connecting line if guessed exists
      setTimeout(() => {
        try {
          const rm = createMap({
            containerId: mapDiv.id,
            overlayName: g.correctMapName,
            markerLatLng: g.correctLatLng || null,
            markerIcon: customIcon,
            initialZoom: 1
          });

          if (g.guessedLatLng) {
            L.marker([g.guessedLatLng.lat, g.guessedLatLng.lng], { icon: icon }).addTo(rm).bindTooltip('Your guess');
            if (g.correctLatLng) {
              const poly = L.polyline([[g.guessedLatLng.lat, g.guessedLatLng.lng], [g.correctLatLng.lat, g.correctLatLng.lng]], { color: 'red', dashArray: '6,6' }).addTo(rm);
              const b = L.latLngBounds([[g.guessedLatLng.lat, g.guessedLatLng.lng], [g.correctLatLng.lat, g.correctLatLng.lng]]);
              rm.fitBounds(b.pad(0.45));
            } else {
              try { rm.setView([g.guessedLatLng.lat, g.guessedLatLng.lng], Math.max(rm.getZoom(), 2)); } catch (e) {}
            }
          }
        } catch (err) {
          console.warn('Breakdown (correct) map init error', err);
        }
      }, 40);

    } else {
      // incorrect -> two-column layout
      card.style.gridTemplateColumns = '1fr 1fr';
      cardHeader.style.gridColumn = '1 / -1';

      // left (guess)
      const leftWrap = document.createElement('div');
      Object.assign(leftWrap.style, {
        minHeight: '160px',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#0c0c0c'
      });
      const leftLabel = document.createElement('div');
      leftLabel.textContent = 'Your Guess';
      Object.assign(leftLabel.style, { fontSize: '12px', color: '#ddd', padding: '6px 4px' });
      leftWrap.appendChild(leftLabel);
      const lmapDiv = document.createElement('div');
      lmapDiv.id = `breakdown-starrail-${index}`;
      lmapDiv.style.width = '100%';
      lmapDiv.style.height = '200px';
      leftWrap.appendChild(lmapDiv);
      card.appendChild(leftWrap);

      // right (result only correct marker)
      const rightWrap = document.createElement('div');
      Object.assign(rightWrap.style, {
        minHeight: '160px',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#0c0c0c'
      });
      const rightLabel = document.createElement('div');
      rightLabel.textContent = 'Result';
      Object.assign(rightLabel.style, { fontSize: '12px', color: '#ddd', padding: '6px 4px' });
      rightWrap.appendChild(rightLabel);
      const rmapDiv = document.createElement('div');
      rmapDiv.id = `breakdown-result-${index}`;
      rmapDiv.style.width = '100%';
      rmapDiv.style.height = '200px';
      rightWrap.appendChild(rmapDiv);
      card.appendChild(rightWrap);

      content.appendChild(card);

      // init both maps
      setTimeout(() => {
        try {
          // guessed map (left)
          const sm = createMap({
            containerId: lmapDiv.id,
            overlayName: g.guessedMapName,
            markerLatLng: g.guessedLatLng,
            markerIcon: icon,
            initialZoom: 1
          });
          // result map (right) - only correct marker
          const rm = createMap({
            containerId: rmapDiv.id,
            overlayName: g.correctMapName,
            markerLatLng: g.correctLatLng,
            markerIcon: customIcon,
            initialZoom: 1
          });

          // if both maps exist and both latlng exist, we keep them independent (no connecting line here)
        } catch (err) {
          console.warn('Breakdown (incorrect) map init error', err);
        }
      }, 40);
    }
  });

  // scroll modal to top
  modal.scrollTop = 0;
}

// cleanup maps (call on close to free memory)
function cleanupBreakdown() {
  try {
    breakdownMaps.forEach(m => {
      if (m && m.remove) try { m.remove(); } catch (e) {}
    });
  } finally {
    breakdownMaps = [];
  }
}

// Simple direct hookup (button must exist before this runs)
document.querySelector(".breakdown-btn").addEventListener("click", openBreakdownModal);

function easeOutQuad(t) {
    return t * (2 - t);
}

function updateRoundInfo() {
  if (standardCheckbox.checked) {
  var roundInfoElement = document.getElementById("round-info");
  roundInfoElement.innerHTML = "<span class='map-text'>Round</span><br>" + currentRound + "/" + round;
  var roundScoreElement = document.getElementById("score-info");
  roundScoreElement.innerHTML = "<span class='map-text'>Score</span><br>" + currentScore
  } else {
    var roundInfoElement = document.getElementById("round-info");
    roundInfoElement.innerHTML = "<span class='map-text'>Round</span><br>" + currentRound;
    var roundScoreElement = document.getElementById("score-info");
    roundScoreElement.innerHTML = "<span class='map-text'>Score</span><br>" + currentScore + " <span class='req-text'> (Req: " + survivalCondition + ")</span>";
  }
}

function displayFinalScore() {
  var finalScoreElement = document.getElementById("final-score");
  var finalTextElement = document.getElementById("finaltext");
  if (standardCheckbox.checked) {
    finalScoreElement.textContent = finalScore;
    console.log("Final Score: " + finalScore);
    finalScoreElement.style.display = "block";
  } else {
    if (currentRound == 1) {
    finalTextElement.innerHTML = `You survived for <span style='color: rgb(255, 228, 107)'>${currentRound}</span> round!`;
    finalScoreElement.textContent = finalScore;
    console.log("Final Score: " + finalScore);
    finalScoreElement.style.display = "block";
  } else {
    finalTextElement.innerHTML = `You survived for <span style='color: rgb(255, 228, 107)'>${currentRound}</span> rounds!`;
    finalScoreElement.textContent = finalScore;
    console.log("Final Score: " + finalScore);
    finalScoreElement.style.display = "block";
  }
}
  stopCountdown();
}

// Call updateRoundInfo initially to display the initial round value
updateRoundInfo();