var guessButton = document.querySelector('.guess-btn');
var nextRoundButton = document.querySelector('.next-round');
var playButton = document.querySelector('.play');
var guessWrapper = document.querySelector('.guess-wrapper');

var currentImage = null;

var seed;
var uniqueID;
var canvas;
standardCheckbox = document.getElementById('Standard');
survivalCheckbox = document.getElementById('Survival');

function countdown() {
  loadingScreen.style.display = 'none';
  if (countdownInterval) {
      stopCountdown();
  } else {
      startCountdown();
  }
  if (countdownIntervalS) {
      stopSCountdown();
  } else {
      startSCountdown();
  }
}

playButton.addEventListener('click', function () {
loadingScreen.style.display = 'flex';
// seed system (v1.0.24)
var inputElement = document.getElementById('Input');
// Get the value of the input
var seedValue = inputElement.value.trim();
// Check if the input is blank
if (seedValue === '') {
    // Generate a random length between 1 and 16
    var randomseedLength = Math.floor(Math.random() * 10) + 5;
    // Generate a random seed with the specified length
    var randomSeed = Math.floor(Math.random() * (Math.pow(10, randomseedLength)));
    var sign = Math.random() < 0.5 ? -1 : 1;
    seed = randomSeed * sign;
    // Use the random seed value
    console.log('Random Seed:', seed);
} else {
    // Convert the provided seed value to a number if it's a string
    var parsedSeed = parseInt(seedValue, 10); // Ensure to specify the radix (base) as 10 for decimal numbers
    if (!isNaN(parsedSeed)) {
        seed = parsedSeed;
        // Use the parsed seed value
        console.log('Provided Seed:', seed);
    } else {
        // Convert the string into a seed
        var stringSeed = 1;
        for (var i = 0; i < seedValue.length; i++) {
            stringSeed += seedValue.charCodeAt(i); // Sum the character codes to create a seed from the string
        }
        seed = stringSeed;
        console.log('String Seed:', seed);
    }
}
    var seedText = document.createElement('div');
    seedText.className = 'seedtext';
    if (seedValue === '') {
        seedText.innerHTML = 'Random Seed<br>' + seed;
    } else {
      if (!isNaN(parsedSeed)) {
        seedText.innerHTML = 'Provided Seed<br>' + parsedSeed;
      } else {
        seedText.innerHTML = 'Provided Seed<br>' + seedValue + ' (' + seed + ')';
      }
    }
    document.body.appendChild(seedText);
    seedText.style.display = 'block';

    function generateuniqueID(seed, roundElement) {
      var uniqueIDs = new Set(); // Use a Set to store unique numbers
      var seedRandom = function(seed) {
        var x = Math.sin(seed) * 10000;
        return Math.abs(x - Math.floor(x));
      };
    
      var getRandomNumber = function(mapId) {
        if (mapId === 0) {
          // Randomize among all numbers
          return Math.floor(seedRandom(seed) * images.length);
        } else if (mapId === 1) {
          return Math.floor(seedRandom(seed) * 254);
        } else if (mapId === 2) {
          return Math.floor(seedRandom(seed) * 298) + 255;
        } else if (mapId === 3) {
          return Math.floor(seedRandom(seed) * 600) + 553;
        } else {
          // Handle other mapId values or fallback to randomize among all numbers
          return Math.floor(seedRandom(seed) * images.length);
        }
      };
    
      if (standardCheckbox.checked) {
      while (uniqueIDs.size < roundElement) {
        var randomNumber = getRandomNumber(mapId); // Generate random number based on mapId
        uniqueIDs.add(randomNumber);
        seed++; // Increase the seed for the next number
      }
      return Array.from(uniqueIDs); // Convert the Set to an Array and return
    } else {
      while (uniqueIDs.size < 250) {
        var randomNumber = getRandomNumber(mapId); // Generate random number based on mapId
        uniqueIDs.add(randomNumber);
        seed++; // Increase the seed for the next number
      }
      return Array.from(uniqueIDs); // Convert the Set to an Array and return
    }
  }
    var roundElement = parseInt(document.getElementById('Round').value);
    uniqueID = generateuniqueID(seed, roundElement);
    
    // Log the unique random numbers to the console
    console.log("Unique ID:", uniqueID);

    // Choose a random image
    randomIndex = uniqueID[currentRound - 1];
    currentImage = images[randomIndex];
    currentMapLocation = images[randomIndex].currentLocation;
    // console.log('Current map location:', currentMapLocation);

    // Display the image
    var imageElement = document.createElement('img');
    imageElement.src = currentImage.imageUrl;

    if (BAWCheckbox.checked) {
        imageElement.style.filter += ' grayscale()';
    }
    if (InvertCheckbox.checked) {
        imageElement.style.filter += ' invert()';
    }
    if (PixelateCheckbox.checked) {
      let pixelateHandler = function() {
          const pixelSize = 10; // Adjust the pixel size as needed
  
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.width = imageElement.width;
          canvas.height = imageElement.height;
  
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height, 0, 0, imageElement.width / pixelSize, imageElement.height / pixelSize);
          ctx.drawImage(canvas, 0, 0, imageElement.width / pixelSize, imageElement.height / pixelSize, 0, 0, imageElement.width, imageElement.height);
  
          imageElement.src = canvas.toDataURL();
          canvas.remove(); // Remove the canvas element after use
      };
      imageElement.addEventListener('load', pixelateHandler, { once: true });
    }
    if (ScrambleCheckbox.checked) {
      let scrambleHandler = function() {
          var canvas = document.createElement('canvas');
          canvas.width = imageElement.width;
          canvas.height = imageElement.height;
          canvas.willReadFrequently = true;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);
  
          var sliceWidth = imageElement.width / 2;
          var sliceHeight = imageElement.height / 3;
  
          var slices = [
              ctx.getImageData(0, 0, sliceWidth, sliceHeight),
              ctx.getImageData(sliceWidth, 0, sliceWidth, sliceHeight),
              ctx.getImageData(0, sliceHeight, sliceWidth, sliceHeight),
              ctx.getImageData(sliceWidth, sliceHeight, sliceWidth, sliceHeight),
              ctx.getImageData(0, sliceHeight * 2, sliceWidth, sliceHeight),
              ctx.getImageData(sliceWidth, sliceHeight * 2, sliceWidth, sliceHeight)
          ];
  
          // Randomize the order of the slices
          for (var i = slices.length - 1; i > 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              [slices[i], slices[j]] = [slices[j], slices[i]];
          }

          // Clear the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
  
          // Draw the randomized and flipped slices back to the canvas
          ctx.putImageData(slices[0], 0, 0);
          ctx.putImageData(slices[1], sliceWidth, 0);
          ctx.putImageData(slices[2], 0, sliceHeight);
          ctx.putImageData(slices[3], sliceWidth, sliceHeight);
          ctx.putImageData(slices[4], 0, sliceHeight * 2);
          ctx.putImageData(slices[5], sliceWidth, sliceHeight * 2);
  
          imageElement.src = canvas.toDataURL();
          canvas.remove();
      };
    imageElement.addEventListener('load', scrambleHandler, { once: true });
    }
    countdown();

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
var imageElement = document.createElement('img');
imageElement.src = currentImage.imageUrl;

if (BAWCheckbox.checked) {
    imageElement.style.filter += ' grayscale()';
}
if (InvertCheckbox.checked) {
    imageElement.style.filter += ' invert()';
}
if (PixelateCheckbox.checked) {
     let pixelateHandler = function() {
            const pixelSize = 10; // Adjust the pixel size as needed
    
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = imageElement.width;
            canvas.height = imageElement.height;
    
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height, 0, 0, imageElement.width / pixelSize, imageElement.height / pixelSize);
            ctx.drawImage(canvas, 0, 0, imageElement.width / pixelSize, imageElement.height / pixelSize, 0, 0, imageElement.width, imageElement.height);
    
            imageElement.src = canvas.toDataURL();
            canvas.remove(); // Remove the canvas element after use
        };
        imageElement.addEventListener('load', pixelateHandler, { once: true });
}
if (ScrambleCheckbox.checked) {
    let scrambleHandler = function() {
        var canvas = document.createElement('canvas');
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);

        var sliceWidth = imageElement.width / 2;
        var sliceHeight = imageElement.height / 3;

        var slices = [
            ctx.getImageData(0, 0, sliceWidth, sliceHeight),
            ctx.getImageData(sliceWidth, 0, sliceWidth, sliceHeight),
            ctx.getImageData(0, sliceHeight, sliceWidth, sliceHeight),
            ctx.getImageData(sliceWidth, sliceHeight, sliceWidth, sliceHeight),
            ctx.getImageData(0, sliceHeight * 2, sliceWidth, sliceHeight),
            ctx.getImageData(sliceWidth, sliceHeight * 2, sliceWidth, sliceHeight)
        ];

        // Randomize the order of the slices
        for (var i = slices.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [slices[i], slices[j]] = [slices[j], slices[i]];
        }

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the randomized and flipped slices back to the canvas
        ctx.putImageData(slices[0], 0, 0);
        ctx.putImageData(slices[1], sliceWidth, 0);
        ctx.putImageData(slices[2], 0, sliceHeight);
        ctx.putImageData(slices[3], sliceWidth, sliceHeight);
        ctx.putImageData(slices[4], 0, sliceHeight * 2);
        ctx.putImageData(slices[5], sliceWidth, sliceHeight * 2);

        imageElement.src = canvas.toDataURL();
        canvas.remove();
    };
    imageElement.addEventListener('load', scrambleHandler, { once: true });
}
countdown();

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
var score = null;

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


var nextRoundButton = document.querySelector(".next-round");
var backMenu = document.querySelector('.menu-btn');
var guessButtonActivated = false;
var nextRoundButtonActivated = false;

guessButton.addEventListener('click', function() {
    if (guessButton.classList.contains('has-marker')) {
      if (currentMap === currentMapLocation) {
        var resultMap = document.querySelector('#resultmap');
        resultMap.style.opacity = '1';
        resultMap.style.pointerEvents = 'auto';

    if (starrailMarker) {
        var playerMarker = starrailMarker.getLatLng();
        var distance = calculateDistance(
        playerMarker.lat,
        playerMarker.lng,
        currentImage.lat,
        currentImage.lng
        );

        var score;
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
        
        var displayElement = document.getElementById("countdown-text");
        displayElement.style.display = "none";
        var displaySElement = document.getElementById("countdown-s-text");
        displaySElement.style.display = "none";

        
        // Create the text string
        var resultText = `Your guess was <span style='color: rgb(255, 228, 107)'>${distance.toFixed(2)}m</span> away from the correct location. <br><span style='color: rgb(255, 228, 107); font-size: 80px; display: block; text-align: center'>${score}</span></br>`;

        var guessResult = document.getElementById('guessResult');
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
        var playerMarker = starrailMarker.getLatLng();
        var distance = calculateDistance(
        playerMarker.lat,
        playerMarker.lng,
        currentImage.lat,
        currentImage.lng
        );

        score = 0;
        updateScore();

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

        var displayElement = document.getElementById("countdown-text");
        displayElement.style.display = "none";
        var displaySElement = document.getElementById("countdown-s-text");
        displaySElement.style.display = "none";

        
        // Create the text string
        var resultText = `Your guess was incorrect! The correct location is <span style='color: rgb(255, 228, 107)'>${currentMapLocation}</span>. <br><span style='color: rgb(255, 228, 107); font-size: 80px; display: block; text-align: center'>${score}</span></br>`;

        var guessResult = document.getElementById('guessResult');
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

document.querySelector(".play").addEventListener("click", function() {
  if (standardCheckbox.checked) {
    currentRound = 1;
    currentScore = 0;
    finalScore = 0;
    if (BAWCheckbox.checked) {
      filter1.style.display = "block";
    }
    if (InvertCheckbox.checked) {
      filter2.style.display = "block";
    }
    if (PixelateCheckbox.checked) {
      filter3.style.display = "block";
    }
    if (ScrambleCheckbox.checked) {
      filter4.style.display = "block";
    }
    updateRoundInfo();
    //console.log("Round: " + currentRound + "/" + round);
    //console.log("Current Score: " + currentScore);
    //console.log("Final Score: " + finalScore);
  } else {
    currentRound = 1;
    currentScore = 0;
    finalScore = 0;
    survivalCondition = 500;
    if (BAWCheckbox.checked) {
      filter1.style.display = "block";
    }
    if (InvertCheckbox.checked) {
      filter2.style.display = "block";
    }
    if (PixelateCheckbox.checked) {
      filter3.style.display = "block";
    }
    if (ScrambleCheckbox.checked) {
      filter4.style.display = "block";
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
      if (currentRound < 6) {
        survivalCondition += 500;
      } else if (currentRound < 11) {
        diff1.style.display = "none";
        diff2.style.display = "block";
        survivalCondition += 1000;
      } else if (currentRound < 21) {
        diff2.style.display = "none";
        diff3.style.display = "block";
        survivalCondition += 1750;
      } else if (currentRound < 31) {
        diff3.style.display = "none";
        diff4.style.display = "block";
        survivalCondition += 2250;
      } else if (currentRound < 41) {
        diff4.style.display = "none";
        diff5.style.display = "block";
        survivalCondition += 3000;
      } else if (currentRound < 51) {
        diff5.style.display = "none";
        diff6.style.display = "block";
        survivalCondition += 3750;
      } else if (currentRound < 101) {
        diff6.style.display = "none";
        diff7.style.display = "block";
        survivalCondition += 4500;
      } else if (currentRound < 201) {
        diff7.style.display = "none";
        diff8.style.display = "block";
        survivalCondition += 5000;
      } else {
        diff8.style.display = "none";
        diff9.style.display = "block";
        survivalCondition += 6250;
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
    roundScoreElement.innerHTML = "<span class='map-text'>Score</span><br>" + currentScore + " (Req: " + survivalCondition + ")"
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


