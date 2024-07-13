var guessButton = document.querySelector('.guess-btn');
var nextRoundButton = document.querySelector('.next-round');
var playButton = document.querySelector('.play');
var guessWrapper = document.querySelector('.guess-wrapper');

var currentImage = null;
var imageElement;

var seed;
var uniqueID;

standardCheckbox = document.getElementById('Standard');
survivalCheckbox = document.getElementById('Survival');
superstitionCheckbox = document.getElementById('Superstition');

playButton.addEventListener('click', function () {
loadingScreen.style.display = 'flex';
  seed();
  // Choose a random image
  randomIndex = uniqueID[currentRound - 1];
  currentImage = images[randomIndex];
  currentMapLocation = images[randomIndex].currentLocation;
  // console.log('Current map location:', currentMapLocation);

  // Display the image
  imageElement = document.createElement('img');
  imageElement.src = currentImage.imageUrl;
  
  let isImageLoaded = false;
  imageElement.addEventListener('load', function () {
    if (superstitionCheckbox.checked) {
        superstitionStart();
    } else {
      if (!isImageLoaded) {
        isImageLoaded = true;
        loadingScreen.style.display = 'none';
        startCountdown();
        startSCountdown();
      }
    }
  });

  // Apply Filters
  filter();

  imageElement.classList.add('random-image');
  document.body.appendChild(imageElement);
  });
    
var survivalCondition = null;

function playNextRound() {
  loadingScreen.style.display = 'flex';
  guessOverlay.style.display = 'none';
  guessResult.textContent = '';
  guessWrapper.style.zIndex = '-1'; // Fix z-index value
  // Choose a random image
  randomIndex = uniqueID[currentRound - 1];
  currentImage = images[randomIndex];
  currentMapLocation = images[randomIndex].currentLocation;
  // console.log('Current map location:', currentMapLocation);

  // Reset marker class
  guessButton.classList.remove('has-marker');

  // Remove existing image
  var existingImage = document.querySelector('.random-image');
  if (existingImage) {
    existingImage.remove();
  }

  // Display the new image
  imageElement = document.createElement('img');
  imageElement.src = currentImage.imageUrl;


  let isImageLoaded = false;
    imageElement.addEventListener('load', function () {
    if (superstitionCheckbox.checked && (currentRound - 1) % 5 === 0) {
        superstitionStart();
    } else {
    if (!isImageLoaded) {
      isImageLoaded = true;
      loadingScreen.style.display = 'none';
      startCountdown();
      startSCountdown();
    }
  }
});


  // Apply Filters
  filter();

  imageElement.classList.add('random-image');
  document.body.appendChild(imageElement);

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
    const earthRadius = 69; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
}

// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

var backMenu = document.querySelector('.menu-btn');
var guessButtonActivated = false;
var nextRoundButtonActivated = false;

var resultText;
var guessResult;

guessButton.addEventListener('click', function() {
    if (guessButton.classList.contains('has-marker')) {
      if (currentMap === currentMapLocation) {
        var resultMap = document.querySelector('#resultmap');
        resultMap.style.opacity = '1';
        resultMap.style.pointerEvents = 'auto';

    if (starrailMarker) {
        var playerMarker = starrailMarker.getLatLng();
        distance = calculateDistance(
        playerMarker.lat,
        playerMarker.lng,
        currentImage.lat,
        currentImage.lng
        );

        if (distance > 30) {
          score = Math.max(0, 5000 - distance * 24);
        } else if (distance > 20) {
          score = Math.max(0, 5000 - distance * 16);
        } else if (distance > 10) {
          score = Math.max(0, 5000 - distance * 8);
        } else if (distance < 1) {
            score = 5000
        } else {
        score = Math.max(0, 5000 - distance * 4);
        }
        score = Math.ceil(score); // Round up the score to the nearest whole number
        updateScore();
        
        var displayElement = document.getElementById("countdown-text");
        displayElement.style.display = "none";
        var displaySElement = document.getElementById("countdown-s-text");
        displaySElement.style.display = "none";

        
        // Create the text string
        resultText = `Your guess was <span style='color: rgb(255, 228, 107)'>${distance.toFixed(2)}m</span> away from the correct location. <br><span style='color: rgb(255, 228, 107); font-size: 80px; display: block; text-align: center'>${score}</span></br>`;

        guessResult = document.getElementById('guessResult');
        guessResult.insertAdjacentHTML('beforeend', resultText);

        //console.log('Image Latitude:', currentImage.lat);
        //console.log('Image Longitude:', currentImage.lng);
        //console.log('Distance:', distance);
        console.log('Score:', score);
    } else {
        console.log('Marker not set');
    }
    guessOverlay.style.display = 'block';
    nextRoundButton.style.display = 'block';
    guessWrapper.style.zIndex = '4'; // Fix z-index value
    stopCountdown();
    stopSCountdown();
      } else {
        var resultMap = document.querySelector('#resultmap');
        resultMap.style.opacity = '1';
        resultMap.style.pointerEvents = 'auto';

    if (starrailMarker) {
        score = 0;
        updateScore();

        var displayElement = document.getElementById("countdown-text");
        displayElement.style.display = "none";
        var displaySElement = document.getElementById("countdown-s-text");
        displaySElement.style.display = "none";

        
        // Create the text string
        resultText = `Your guess was incorrect! The correct location is <span style='color: rgb(255, 228, 107)'>${currentMapLocation}</span>. <br><span style='color: rgb(255, 228, 107); font-size: 80px; display: block; text-align: center'>${score}</span></br>`;

        guessResult = document.getElementById('guessResult');
        guessResult.insertAdjacentHTML('beforeend', resultText);

        //console.log('Image Latitude:', currentImage.lat);
        //console.log('Image Longitude:', currentImage.lng);
        //console.log('Distance:', distance);
        console.log('Score:', score);
    } else {
        console.log('Marker not set');
    }
    guessOverlay.style.display = 'block';
    nextRoundButton.style.display = 'block';
    guessWrapper.style.zIndex = '4'; // Fix z-index value
    stopCountdown();
    stopSCountdown();
      }
    }
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
slider3.oninput = function() {
  round = parseInt(this.value);
  output3.value = round;
  updateRoundInfo();
};

output3.oninput = function() {
  round = parseInt(this.value);
  slider3.value = round;
  updateRoundInfo();
};

round = parseInt(output3.value);

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

var debuff1 = document.getElementById("debuff1");
var debuff2 = document.getElementById("debuff2");
var debuff3 = document.getElementById("debuff3");
var debuff4 = document.getElementById("debuff4");
var buff1 = document.getElementById("buff1");
var buff2 = document.getElementById("buff2");
var buff3 = document.getElementById("buff3");
var buff4 = document.getElementById("buff4");

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
    if (superstitionCheckbox.checked) {
      survivalCondition = 1000;
    } else {
    survivalCondition = 500;
    }
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
          survivalCondition += 1500;
        } else if (currentRound < 31) {
          diff2.style.display = "none";
          diff3.style.display = "block";
          survivalCondition += 2000;
        } else if (currentRound < 41) {
          diff3.style.display = "none";
          diff4.style.display = "block";
          survivalCondition += 2500;
        } else if (currentRound < 51) {
          diff4.style.display = "none";
          diff5.style.display = "block";
          survivalCondition += 3500;
        } else if (currentRound < 61) {
          diff5.style.display = "none";
          diff6.style.display = "block";
          survivalCondition += 5000;
        } else if (currentRound < 71) {
          diff6.style.display = "none";
          diff7.style.display = "block";
          survivalCondition += 6000;
        } else if (currentRound < 81) {
          diff7.style.display = "none";
          diff8.style.display = "block";
          survivalCondition += 7000;
        } else {
          diff8.style.display = "none";
          diff9.style.display = "block";
          survivalCondition += 9000;
        }
        
      } else if (survivalCheckbox.checked) {
        if (currentRound < 6) {
          survivalCondition += 500;
        } else if (currentRound < 11) {
          diff1.style.display = "none";
          diff2.style.display = "block";
          survivalCondition += 750;
        } else if (currentRound < 16) {
          diff2.style.display = "none";
          diff3.style.display = "block";
          survivalCondition += 1000;
        } else if (currentRound < 21) {
          diff3.style.display = "none";
          diff4.style.display = "block";
          survivalCondition += 1250;
        } else if (currentRound < 26) {
          diff4.style.display = "none";
          diff5.style.display = "block";
          survivalCondition += 1750;
        } else if (currentRound < 31) {
          diff5.style.display = "none";
          diff6.style.display = "block";
          survivalCondition += 2500;
        } else if (currentRound < 36) {
          diff6.style.display = "none";
          diff7.style.display = "block";
          survivalCondition += 3000;
        } else if (currentRound < 41) {
          diff7.style.display = "none";
          diff8.style.display = "block";
          survivalCondition += 3500;
        } else {
          diff8.style.display = "none";
          diff9.style.display = "block";
          survivalCondition += 4500;
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
  stopSCountdown();
}

// Call updateRoundInfo initially to display the initial round value
updateRoundInfo();


