let countdownInterval;
let countdownValue = 0;
let previousCountdownValue = 0;
function startCountdown() {
  const sliderValue = document.getElementById("Time").value;
  countdownValue = parseFloat(sliderValue);
  if (countdownValue > 0) {
    previousCountdownValue = countdownValue;
    updateDisplay();
    countdownInterval = setInterval(() => {
      countdownValue = Math.max(0, countdownValue - 0.1);
      updateDisplay();
      if (countdownValue <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
    }, 100);
  }
}
function stopCountdown() {
  clearInterval(countdownInterval);
  countdownInterval = null;
}
function resetCountdown() {
  countdownValue = previousCountdownValue;
  updateDisplay();
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
    stopCountdown();
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
