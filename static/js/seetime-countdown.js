var countdownIntervalS;
var countdownValueS = 0;
var previousCountdownValueS = 0;

function startSCountdown() {
  var sliderValue = document.getElementById("SeeTime").value;
  countdownValueS = parseInt(sliderValue);
  if (countdownValueS == 0) {
    // no countdown
  } else {
    previousCountdownValueS = countdownValueS;
    updateSDisplay();

    countdownIntervalS = setInterval(function() {
      countdownValueS--;
      updateSDisplay();

      if (countdownValueS < 0) {
        clearInterval(countdownIntervalS);
        var existingImage = document.querySelector('.random-image');
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
  var minutes = Math.floor(countdownValueS / 60);
  var seconds = countdownValueS % 60;

  // Format the minutes and seconds with leading zeros if necessary
  var formattedMinutes = minutes.toString().padStart(2, '0');
  var formattedSeconds = seconds.toString().padStart(2, '0');

  var displayElement = document.getElementById("countdown-s-text");
  if (countdownValueS < 0) {
    displayElement.style.display = "none";
    
  } else {
    if (countdownValueS == countdownValue) {
      displayElement.style.display = "none";
    }
    else {
    displayElement.style.display = "block";
    displayElement.textContent = '👁 ' + formattedMinutes + " : " + formattedSeconds;
    }
  }
}

document.querySelectorAll(".has-marker").forEach(function(button) {
  button.addEventListener("click", function() {
    stopSCountdown();
  });
});