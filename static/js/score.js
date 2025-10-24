var guessButton = document.querySelector('.guess-btn');
var nextRoundButton = document.querySelector('.next-round');
var playButton = document.querySelector('.play');
var guessWrapper = document.querySelector('.guess-wrapper');

var currentImage = null;
var imageElement;

standardCheckbox = document.getElementById('Standard');
survivalCheckbox = document.getElementById('Survival');
superstitionCheckbox = document.getElementById('Superstition');

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
  // intensity: 0.5 = small, 1 = normal, 1.6 = huge
  const warmColors = ["#FFD700", "#FF69B4", "#ff6969", "#00FFFF", "#ADFF2F", "#FFA500"];
  const container = document.createElement("div");
  container.className = "confetti-container";
  document.body.appendChild(container);

  // set up perspective for 3D illusion
  container.style.perspective = "1000px";
  container.style.transformStyle = "preserve-3d";
  container.style.position = "fixed";
  container.style.left = 0;
  container.style.top = 0;
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.overflow = "visible";
  container.style.pointerEvents = "none";

  // compute origin
  let originX = window.innerWidth / 2;
  let originY = window.innerHeight * 0.3;
  if (targetElement && targetElement.getBoundingClientRect) {
    const r = targetElement.getBoundingClientRect();
    originX = r.left + r.width / 2;
    originY = r.top + r.height / 2;
  }

  // --- flash (fireball burst) ---
  const flash = document.createElement("div");
  flash.className = "confetti-flash";
  const flashSize = Math.max(80, 140 * intensity);
  Object.assign(flash.style, {
    position: "absolute",
    left: originX - flashSize / 2 + "px",
    top: originY - flashSize / 2 + "px",
    width: flashSize + "px",
    height: flashSize + "px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,220,0.95) 0%, rgba(255,200,90,0.9) 30%, rgba(255,120,30,0.6) 60%, rgba(0,0,0,0) 70%)",
  });
  container.appendChild(flash);

  flash.animate(
    [
      { transform: "scale(0.6)", opacity: 1 },
      { transform: `scale(${2 + intensity})`, opacity: 0 }
    ],
    { duration: 500 + intensity * 200, easing: "ease-out", fill: "forwards" }
  );
  setTimeout(() => flash.remove(), 900 + intensity * 300);

  // --- confetti pieces ---
  const maxDuration = 12000 * intensity;

  for (let i = 0; i < confettiCount; i++) {
    const isSpark = Math.random() < 0.3;
    const el = document.createElement("div");
    container.appendChild(el);

    const color = warmColors[Math.floor(Math.random() * warmColors.length)];
    const size = (isSpark ? 3 + Math.random() * 4 : 10 + Math.random() * 24) * intensity;
    const depth = Math.random(); // 0 (front) → 1 (back)

    Object.assign(el.style, {
      position: "absolute",
      left: originX + (Math.random() - 0.5) * 60 * intensity + "px",
      top: originY + (Math.random() - 0.5) * 40 * intensity + "px",
      width: isSpark ? "2px" : size + "px",
      height: isSpark ? (10 + Math.random() * 40) * intensity + "px" : size + "px",
      background: color,
      borderRadius: isSpark ? "2px" : "4px",
      opacity: 0.95 - depth * 0.4,
      transformOrigin: "center",
      transform: `translateZ(${(depth - 0.5) * 500}px) rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`,
    });

    // motion physics
    const angle = Math.random() * Math.PI * 2;
    const baseSpeed = 350 + Math.random() * 700;
    const speed = baseSpeed * (0.6 + Math.random() * 1.1) * (1 - depth * 0.5);
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    const vz = (Math.random() - 0.5) * 600 * (1 - depth);

    const gravity = 0.18 + Math.random() * 0.22;
    const duration = Math.round((2800 + Math.random() * 4800) * intensity * (1 + depth * 0.4));

    const rotStart = Math.random() * 360;
    const rotEnd = rotStart + (isSpark ? 720 : 1440) * (0.6 + Math.random());

    // add perspective drift + slight z rotation
    el.animate(
      [
        { transform: `translate3d(0,0,0) rotateX(${rotStart}deg) rotateY(${rotStart}deg) scale(1)`, opacity: 1 },
        { transform: `translate3d(${vx * 0.6}px, ${vy * 0.6}px, ${vz * 0.5}px) rotateX(${rotStart + (rotEnd - rotStart) * 0.6}deg) rotateY(${rotStart + (rotEnd - rotStart) * 0.5}deg) scale(1)`, opacity: 0.95 },
        { transform: `translate3d(${vx}px, ${vy + gravity * duration * 0.6}px, ${vz}px) rotateX(${rotEnd}deg) rotateY(${rotEnd}deg) scale(0.95)`, opacity: 0 }
      ],
      {
        duration,
        easing: "cubic-bezier(.25,.8,.25,1)",
        delay: Math.random() * 100,
        fill: "forwards"
      }
    );

    setTimeout(() => el.remove(), duration + 500);
  }

  setTimeout(() => container.remove(), maxDuration + 1000);
}


// Patch the guessButton event
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

    guessOverlay.style.display = 'block';
    nextRoundButton.style.display = 'block';
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
    nextRoundButton.style.display = 'none';
    var displayTimeUp = document.getElementById("countdown-timeup");
    displayTimeUp.style.display = 'none';
    guessResult.textContent = '';
    guessResult.style.display = 'none';
    var finalTextElement = document.getElementById("finaltext");
    finalTextElement.style.display = "block"
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