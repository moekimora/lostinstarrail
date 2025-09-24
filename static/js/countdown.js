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


document.addEventListener("DOMContentLoaded", setupRing);

function startTCountdown() {
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
function updateDisplay() {
  const minutes = Math.floor(countdownValue / 60);
  const seconds = Math.floor(countdownValue % 60);
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const displayElement = document.getElementById("countdown-text");
  const displayTimeUp = document.getElementById("countdown-timeup");

  if (!displayElement) return;

  if (countdownValue <= 0) {
    displayElement.style.display = "none";

    if (displayTimeUp) {
      displayTimeUp.style.display = "block";
      displayTimeUp.textContent = "Time up!";
    }

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
    if (displayTimeUp) displayTimeUp.style.display = "none";
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
