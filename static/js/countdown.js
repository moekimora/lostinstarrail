let countdownInterval, countdownIntervalS, countdownIntervalH;
let countdownValue = 0, previousCountdownValue = 0;
let countdownValueS = 0, previousCountdownValueS = 0;
let holdCountdownValue = 0;
let countdownTotal = 0; // full duration used for progress

// Prepare the element so the stroke can be drawn into the border area
function setupRing() {
  const el = document.getElementById("countdown-text");
  if (!el) return;

  // Ensure stroke can be drawn, but don’t override CSS box design
  el.style.boxSizing = "border-box";
  el.style.borderStyle = "solid";
  el.style.borderColor = "transparent";

  // These two are needed for the animated stroke effect
  el.style.backgroundOrigin = "border-box";
  el.style.backgroundClip = "padding-box, border-box";
}

// --- JS-only shrink-then-grow helper (Web Animations API + fallback) ---
function animateTimerScale() {
  const ids = ['countdown-text', 'countdown-s-text', 'countdown-h-text'];
  const keyframes = [
    { transform: 'scale(0.85)', offset: 0 },
    { transform: 'scale(1)', offset: 1 }
  ];
  const opts = { duration: 1200, easing: 'cubic-bezier(.2,.9,.3,1)', iterations: 1 };

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const cs = window.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;

    // Cancel any running animations so this restarts cleanly
    if (el.getAnimations) {
      el.getAnimations().forEach(a => a.cancel());
    }

    if (el.animate) {
      // Preferred: Web Animations API
      el.animate(keyframes, opts);
    } else {
      // shrink, then let transition bring it back to scale(1)
      el.style.transition = `transform ${opts.duration}ms ${opts.easing}`;
      el.style.transform = 'scale(0.85)';

      // Trigger grow on next frame
      requestAnimationFrame(() => {
        el.style.transform = 'scale(1)';
      });

      // Cleanup transition after it's done so it won't interfere with other style changes
      setTimeout(() => {
        // Only clear if still our transition (avoid clobbering)
        if (el.style.transition.includes('transform')) el.style.transition = '';
      }, opts.duration + 30);
    }
  });
}

document.addEventListener("DOMContentLoaded", setupRing);

function startTCountdown() {
  animateTimerScale();
  const sliderValue = document.getElementById("Time").value;
  countdownValue = parseFloat(sliderValue);
  if (countdownValue > 0) {
    previousCountdownValue = countdownValue;
    countdownTotal = countdownValue; // capture full duration for ring progress
    setupRing();
    updateDisplay();
    countdownInterval = setInterval(() => {
      countdownValue = Math.max(0, countdownValue - 0.01);
      updateDisplay();
      if (countdownValue <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
    }, 10);
  }
}

// robust marker detection
function hasMapMarker() {
  try {
    // If the marker exists and is actually on the map
    if (typeof starrailMarker !== 'undefined' && starrailMarker) {
      // Leaflet-style: marker._map exists when added to a map
      if (starrailMarker._map) return true;
      // Otherwise, marker exists but not placed yet
      return false;
    }

    return false;
  } catch (e) {
    console.warn('hasMapMarker error:', e);
    return false;
  }
}


function updateDisplay() {
  const minutes = Math.floor(countdownValue / 60);
  const seconds = Math.floor(countdownValue % 60);
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const displayElement = document.getElementById("countdown-text");

  if (!displayElement) return;

  if (countdownValue <= 0) {
    displayElement.style.display = "none";
      applyResultMapOverlay();
      handleMarker();
    // --- treat marker-as-guess: click guessButton automatically if marker exists ---
// (replaces the old tryAutoGuess IIFE)
(function tryAutoGuess() {
  const guessBtn = document.getElementById('guessButton') || document.querySelector('.guess-btn') || document.querySelector('.guess-button');

  // If a marker exists on the map, dispatch a click on the guess button.
  if (hasMapMarker()) {
    if (guessBtn) {
      guessBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    } else {
      // fallback: if no DOM button found but a marker exists, try calling the handler directly
      if (typeof guessButton === 'function') try { guessButton(); } catch(e) {}
    }
    return;
  }

    // fallback inline behavior if score.js helper isn't present
    const resultMap = document.querySelector('#resultmap');
    if (resultMap) {
      resultMap.style.opacity = '1';
      resultMap.style.pointerEvents = 'auto';
    }
    if (typeof guessResult !== 'undefined' && guessResult) {
      guessResult.innerHTML = "Your time ran out before you could make a guess!<br><span id='animated-score' style='color: rgb(255, 228, 107); font-size: 80px; display:block; text-align:center'>0</span>";
    }
    if (typeof guessOverlay !== 'undefined' && guessOverlay) guessOverlay.style.display = 'block';
    if (typeof nextRoundButton !== 'undefined' && nextRoundButton) nextRoundButton.style.display = 'block';
    if (typeof guessHelper !== 'undefined' && guessHelper) guessHelper.style.display = 'block';
    if (typeof guessWrapper !== 'undefined' && guessWrapper) guessWrapper.style.zIndex = '4';
    stopCountdown();
  }
)();

    stopTCountdown();
    stopSCountdown();
    if (typeof muffleAudio === "function") muffleAudio();

    // ✅ Show overlay + next round button
    if (typeof guessOverlay !== "undefined" && guessOverlay) {
      guessOverlay.style.display = "block";
    }
    if (typeof nextRoundButton !== "undefined" && nextRoundButton) {
      nextRoundButton.style.display = "block";
    }

    const sEl = document.getElementById("countdown-s-text");
    if (sEl) sEl.style.display = "none";

    // remove stroke at the end
    displayElement.style.backgroundImage = `linear-gradient(rgba(25, 28, 56, 1), rgba(25, 28, 56, 1))`;
    guessWrapper.style.zIndex = '4';
  } else {
    displayElement.style.display = "block";
    displayElement.textContent = `${formattedMinutes} : ${formattedSeconds}`;

    // ✅ Ring stroke progress
    const denom = (countdownTotal > 0 ? countdownTotal : (previousCountdownValue > 0 ? previousCountdownValue : countdownValue));
    let progress = denom > 0 ? (countdownValue / denom) : 0;
    progress = Math.max(0, Math.min(1, progress));

    const remainingDeg = progress * 360;
    const consumedDeg = 360 - remainingDeg;
    const ringColor = countdownValue <= 10 ? "red" : "rgb(91, 99, 206)";
    const gradient = `conic-gradient(from 0deg, transparent 0deg ${consumedDeg}deg, ${ringColor} ${consumedDeg}deg 360deg)`;

    displayElement.style.border = "4px solid transparent";
    displayElement.style.backgroundImage = `linear-gradient(rgba(25, 28, 56, 1), rgba(25, 28, 56, 1)), ${gradient}`;

    if ((countdownValue >= 26 && countdownValue <= 30) || countdownValue <= 10) {
      document.body.classList.add("warning-glow");
    } else {
      document.body.classList.remove("warning-glow");
    }
  }
}


function startSCountdown() {
  animateTimerScale();
  const sliderValue = document.getElementById("SeeTime").value;
  countdownValueS = parseFloat(sliderValue);
  if (countdownValueS > 0) {
    previousCountdownValueS = countdownValueS;
    updateSDisplay();
    countdownIntervalS = setInterval(() => {
      countdownValueS = Math.max(0, countdownValueS - 0.01);
      updateSDisplay();
      if (countdownValueS <= 0) {
        clearInterval(countdownIntervalS);
        countdownIntervalS = null;
        hideImage();
      }
    }, 10);
  }
}

function updateSDisplay() {
  const minutes = Math.floor(countdownValueS / 60);
  const seconds = Math.floor(countdownValueS % 60);
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const displayElement = document.getElementById("countdown-s-text");
  if (displayElement) {
    if (countdownValueS <= 0) {
      toggleElementVisibility(displayElement, false);
    } else {
      toggleElementVisibility(displayElement, true, `👁 ${formattedMinutes} : ${formattedSeconds}`);
    }
  }
}

function toggleElementVisibility(element, isVisible, textContent = null) {
  if (element) {
    element.style.display = isVisible ? "block" : "none";
    if (textContent !== null) {
      element.textContent = textContent;
    }
  }
}

document.querySelectorAll(".has-marker").forEach(button => {
  button.addEventListener("click", stopSCountdown);
});

function stopTCountdown() {
  clearInterval(countdownInterval);
  countdownInterval = null;
}
function resetTCountdown() {
  countdownValue = previousCountdownValue;
  updateDisplay();
}
function stopSCountdown() {
  clearInterval(countdownIntervalS);
  countdownIntervalS = null;
}
function resetSCountdown() {
  countdownValueS = previousCountdownValueS;
  updateSDisplay();
}
function hideImage() {
  const existingImage = document.querySelector('.random-image');
  if (existingImage) {
    existingImage.style.display = 'none';
  }
}
function showImage() {
  const existingImage = document.querySelector('.random-image');
  if (existingImage) {
    existingImage.style.display = 'block';
  }
}
function startCountdown() {
  const holdSwitch = document.getElementById("Hold");
  const holdTimeInput = document.getElementById("HoldTime");
  if (holdSwitch && holdSwitch.checked) {
    holdCountdownValue = parseFloat(holdTimeInput.value);
    if (holdCountdownValue > 0) {
      hideImage(); // Hide the image during the hold countdown
      updateHoldDisplay(); // Update the hold display
      countdownIntervalH = setInterval(() => {
        holdCountdownValue = Math.max(0, holdCountdownValue - 0.01);
        updateHoldDisplay();
        if (holdCountdownValue <= 0) {
          clearInterval(countdownIntervalH);
          countdownIntervalH = null;
          showImage(); // Unhide the image after countdown
          startTCountdown(); // Start the main countdown
          startSCountdown(); // Start the secondary countdown
        }
      }, 10);
    }
  } else {
    // If Hold switch is not checked, start the main countdowns directly
    startTCountdown();
    startSCountdown();
  }
}
function updateHoldDisplay() {
  const displayElement = document.getElementById("countdown-h-text");
  const seconds = Math.floor(holdCountdownValue % 60);
  const milliseconds = Math.floor((holdCountdownValue % 1) * 100);
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
  if (displayElement) {
    if (holdCountdownValue <= 0) {
      toggleElementVisibility(displayElement, false);
    } else {
      toggleElementVisibility(displayElement, true, `✋ ${formattedSeconds}.${formattedMilliseconds}`);
    }
  }
}
function stopHCountdown() {
  clearInterval(countdownIntervalH);
  countdownIntervalH = null;
}
function stopCountdown() {
  stopTCountdown();
  stopSCountdown();
  stopHCountdown();
}
