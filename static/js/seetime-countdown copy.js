let countdownIntervalS;
let countdownValueS = 0;
let previousCountdownValueS = 0;
function startSCountdown() {
  const sliderValue = document.getElementById("SeeTime").value;
  countdownValueS = parseFloat(sliderValue);
  if (countdownValueS > 0) {
    previousCountdownValueS = countdownValueS;
    updateSDisplay();
    countdownIntervalS = setInterval(() => {
      countdownValueS = Math.max(0, countdownValueS - 0.1);
      updateSDisplay();
      if (countdownValueS <= 0) {
        clearInterval(countdownIntervalS);
        countdownIntervalS = null;
        hideImage();
      }
    }, 100);
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
function hideImage() {
  var existingImage = document.querySelector('.random-image');
  if (existingImage) {
    existingImage.style.display = 'none';
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