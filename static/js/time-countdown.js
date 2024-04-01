var countdownInterval;
var countdownValue = 0;
var previousCountdownValue = 0;

function startCountdown() {
  var sliderValue = document.getElementById("Range").value;
  countdownValue = parseInt(sliderValue);
  previousCountdownValue = countdownValue;
  updateDisplay();

  countdownInterval = setInterval(function() {
    countdownValue--;
    updateDisplay();
  }, 1000);
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
  var minutes = Math.floor(countdownValue / 60);
  var seconds = countdownValue % 60;

  // Format the minutes and seconds with leading zeros if necessary
  var formattedMinutes = minutes.toString().padStart(2, '0');
  var formattedSeconds = seconds.toString().padStart(2, '0');

  var displayElement = document.getElementById("countdown-text");
  var displayTimeUp = document.getElementById("countdown-timeup");
  if (countdownValue < 0) {
    displayElement.style.display = "none";
    displayTimeUp.style.display = "block";
    displayTimeUp.textContent = "Time up!";
    stopCountdown();
    stopSCountdown();
    guessOverlay.style.display = 'block';
    nextRoundButton.style.display = 'block';
    muffleAudio();

    var displaySElement = document.getElementById("countdown-s-text");
    displaySElement.style.display = "none";
    var score;
      score = 0
    console.log('Score:', score);
  } else {
    displayElement.style.display = "block";
    displayTimeUp.style.display = "none";
    displayElement.textContent = "Time: " + formattedMinutes + ":" + formattedSeconds;
  }
}

document.getElementsByClassName("countdown-text").style.display = "none";

// Call updateDisplay initially to display the initial countdown value
updateDisplay();