let countdownIntervalS;
let holdTimeout;
let countdownValueS = 0;
let previousCountdownValueS = 0;

function startSCountdown() {
  const sliderValue = document.getElementById("SeeTime").value;
  countdownValueS = parseFloat(sliderValue);

  if (countdownValueS > 0) {
    previousCountdownValueS = countdownValueS;
    countdownValueS = 3;
    updateSDisplay("✋", "#FF6961", true); // Change emoji to ✋ and text color to pastel red during the hold

    // Start the hold timer
    holdTimeout = setInterval(() => {
      countdownValueS = Math.max(0, countdownValueS - 0.01); // Decrease hold timer by 0.01 seconds
      updateSDisplay("✋", "#FF6961", true);

      if (countdownValueS <= 0) {
        clearInterval(holdTimeout); // Clear the hold timeout

        // Restore the original countdown value
        countdownValueS = previousCountdownValueS;
        updateSDisplay("👁", "", false); // Restore emoji to 👁 and default text color after the hold

        // Restore the image after the hold
        const existingImage = document.querySelector('.random-image');
        if (existingImage) {
          existingImage.style.display = 'block';
        }

        // Start the original countdown
        countdownIntervalS = setInterval(() => {
          countdownValueS = Math.max(0, countdownValueS - 0.01);
          updateSDisplay("👁", "", false);

          if (countdownValueS <= 0) {
            clearInterval(countdownIntervalS);
            countdownIntervalS = null;
            hideImage();
          }
        }, 10);
      }
    }, 10);
    const existingImage = document.querySelector('.random-image');
    if (existingImage) {
      existingImage.style.display = 'none';
    }
  }
}

function stopSCountdown() {
  clearInterval(countdownIntervalS); // Stop the countdown interval
  countdownIntervalS = null;
  clearTimeout(holdTimeout); // Clear any active hold timeout
}

function resetSCountdown() {
  countdownValueS = previousCountdownValueS;
  updateSDisplay("👁", "", false);
}

function hideImage() {
  const existingImage = document.querySelector('.random-image');
  if (existingImage) {
    existingImage.style.display = 'none';
  }
}

function updateSDisplay(emoji = "👁", color = "", isHold = false) {
  const minutes = Math.floor(countdownValueS / 60);
  const seconds = Math.floor(countdownValueS % 60);
  const milliseconds = Math.floor((countdownValueS % 1) * 100);
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
  const displayElement = document.getElementById("countdown-s-text");
  if (countdownValueS <= 0) {
    toggleElementVisibility(displayElement, false);
  } else {
    displayElement.style.color = color;
    if (isHold) {
      toggleElementVisibility(
        displayElement,
        true,
        `${emoji} ${formattedSeconds}.${formattedMilliseconds}`
      );
    } else {
      toggleElementVisibility(
        displayElement,
        true,
        `${emoji} ${formattedMinutes} : ${formattedSeconds}`
      );
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
document.querySelectorAll(".has-marker").forEach((button) => {
  button.addEventListener("click", startSCountdown);
});