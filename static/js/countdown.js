let countdownInterval, countdownIntervalS, countdownIntervalH;
let countdownValue = 0, previousCountdownValue = 0, countdownValueS = 0, previousCountdownValueS = 0, holdCountdownValue = 0;
function startTCountdown() {
  const sliderValue = document.getElementById("Time").value;
  countdownValue = parseFloat(sliderValue);
  if (countdownValue > 0) {
    previousCountdownValue = countdownValue;
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
  if (countdownValue <= 0) {
    displayElement.style.display = "none";
    displayTimeUp.style.display = "block";
    displayTimeUp.textContent = "Time up!";
    stopTCountdown();
    stopSCountdown();
    muffleAudio();
    guessOverlay.style.display = 'block';
    nextRoundButton.style.display = 'block';
    document.getElementById("countdown-s-text").style.display = "none";
    console.log('Score:', 0);
    guessWrapper.style.zIndex = '4';
    guessButtonActivated = true;
    nextRoundButtonActivated = false;
  } else {
    displayElement.style.display = "block";
    displayTimeUp.style.display = "none";
    displayElement.textContent = `${formattedMinutes} : ${formattedSeconds}`;
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
  if (countdownValueS <= 0) {
    toggleElementVisibility(displayElement, false);
  } else {
    toggleElementVisibility(displayElement, true, `👁 ${formattedMinutes} : ${formattedSeconds}`);
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
  if (holdSwitch.checked) {
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
  if (holdCountdownValue <= 0) {
    toggleElementVisibility(displayElement, false);
  } else {
    toggleElementVisibility(displayElement, true, `✋ ${formattedSeconds}.${formattedMilliseconds}`);
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