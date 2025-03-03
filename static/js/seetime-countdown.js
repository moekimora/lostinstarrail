let countdownIntervalS;
let countdownValueS = 0;
let previousCountdownValueS = 0;

function startSCountdown() {
  const sliderValue = document.getElementById("SeeTime").value;
  countdownValueS = parseInt(sliderValue);
  if (countdownValueS !== 0) {
    previousCountdownValueS = countdownValueS;
    updateSDisplay();

    countdownIntervalS = setInterval(() => {
      countdownValueS--;
      updateSDisplay();

      if (countdownValueS < 0) {
        clearInterval(countdownIntervalS);
        const existingImage = document.querySelector('.random-image');
        if (existingImage) {
          existingImage.style.display = 'none';
        }
      }
    }, 1000);
  }
}

function stopSCountdown() {
  clearInterval(countdownIntervalS);
  countdownIntervalS = null;
}

function resetSCountdown() {
  countdownValueS = previousCountdownValueS;
  updateSDisplay();
}

function updateSDisplay() {
  const minutes = Math.floor(countdownValueS / 60);
  const seconds = countdownValueS % 60;

  // Format the minutes and seconds with leading zeros if necessary
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  const displayElement = document.getElementById("countdown-s-text");
  if (countdownValueS < 0) {
    displayElement.style.display = "none";
  } else {
    displayElement.style.display = countdownValueS === countdownValue ? "none" : "block";
    if (countdownValueS !== countdownValue) {
      displayElement.textContent = '👁 ' + formattedMinutes + " : " + formattedSeconds;
    }
  }
}

document.querySelectorAll(".has-marker").forEach(button => {
  button.addEventListener("click", () => {
    stopSCountdown();
  });
});
