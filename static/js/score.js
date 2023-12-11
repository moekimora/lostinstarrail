var guessButton = document.querySelector('.guess-btn');
            var nextRoundButton = document.querySelector('.next-round');
            var playButton = document.querySelector('.play');

            var images = [
            {
                imageUrl: 'randommap/1.png',
                lat: -52.784217647288315, // Example latitude assigned beforehand
                lng: -43.33419442176821, // Example longitude assigned beforehand
                currentLocation: "Master Control Zone",
            },
            {
                imageUrl: 'randommap/2.png',
                lat: -38.20779273881535, // Example latitude assigned beforehand
                lng: -35.846315338022, // Example longitude assigned beforehand
                currentLocation: "Master Control Zone",
            },
            {
                imageUrl: 'randommap/3.png',
                lat: 49.85775686236894, // Example latitude assigned beforehand
                lng: 0.025180578231811527, // Example longitude assigned beforehand
                currentLocation: "Master Control Zone",
            },
            {
                imageUrl: 'randommap/4.png',
                lat: 8.999990334313432, // Example latitude assigned beforehand
                lng: 20.10067139638987, // Example longitude assigned beforehand
                currentLocation: "Master Control Zone",
            },
            {
                imageUrl: 'randommap/5.png',
                lat: -52.67777197485139,
                lng: 10.249789953231826,
                currentLocation: "Master Control Zone",
            },
            {
                imageUrl: 'randommap/6.png',
                lat: -65.6214572532182,
                lng: 98.02322745323181,
                currentLocation: "Master Control Zone",
            },
            {
                imageUrl: 'randommap/7.png',
                lat: -60.64021983575442,
                lng: -84.99207849088639,
                currentLocation: "Master Control Zone",
            },
            {
                imageUrl: 'randommap/8.png',
                lat: 20.687489687323254,
                lng: 18.00559478034203,
                currentLocation: "Master Control Zone",
            },
            {
                imageUrl: 'randommap/9.png',
                lat: 59.23627314941806,
                lng: 52.24891841411593,
                currentLocation: "Base Zone",
            },
            {
                imageUrl: 'randommap/10.png',
                lat: 5.062444398588828,
                lng: -1.4669018983840878,
                currentLocation: "Base Zone",
            },
            {
                imageUrl: 'randommap/11.png',
                lat: 77.01999919166653,
                lng: -32.52364754676819,
                currentLocation: "Base Zone",
            },
            {
                imageUrl: 'randommap/12.png',
                lat: -2.7375792765186855,
                lng: -28.571025556035735,
                currentLocation: "Base Zone",
            },
            {
                imageUrl: 'randommap/13.png',
                lat: -7.061532431999891,
                lng: 17.75016751443934,
                currentLocation: "Base Zone",
            },
            {
                imageUrl: 'randommap/14.png',
                lat: -30.637322771834707,
                lng: -1.8770581483840945,
                currentLocation: "Base Zone",
            },
            {
                imageUrl: 'randommap/15.png',
                lat: -75.44035402936733,
                lng: 5.889826764819378,
                currentLocation: "Base Zone",
            },
            {
                imageUrl: 'randommap/16.png',
                lat: -67.42893540805736,
                lng: -1.8832325935363772,
                currentLocation: "Base Zone",
            },
            {
                imageUrl: 'randommap/17.png',
                lat: -25.571914322416273,
                lng: -132.5773989897143,
                currentLocation: "Storage Zone - B1",
            },
            {
                imageUrl: 'randommap/18.png',
                lat: 0.1731944026012125,
                lng: -98.81749035496823,
                currentLocation: "Storage Zone - B1",
            },
            {
                imageUrl: 'randommap/19.png',
                lat: -21.836707117729134,
                lng: -134.4131934799682,
                currentLocation: "Storage Zone - F1",
            },
            {
                imageUrl: 'randommap/20.png',
                lat: 8.611343143910357,
                lng: -78.37325677580749,
                currentLocation: "Storage Zone - F1",
            },
            {
                imageUrl: 'randommap/21.png',
                lat: -28.096619203395605,
                lng: -62.435756921768196,
                currentLocation: "Storage Zone - F1",
            },
            {
                imageUrl: 'randommap/22.png',
                lat: 13.326817719081692,
                lng: 20.65018057823184,
                currentLocation: "Storage Zone - F1",
            },
            {
                imageUrl: 'randommap/23.png',
                lat: -7.041385284408406,
                lng: 69.28299307823183,
                currentLocation: "Storage Zone - F1",
            },
            {
                imageUrl: 'randommap/24.png',
                lat: -38.02308335117713,
                lng: 95.185439350436,
                currentLocation: "Storage Zone - F1",
            },
            {
                imageUrl: 'randommap/25.png',
                lat: -44.149698366967904,
                lng: 145.89432120323187,
                currentLocation: "Storage Zone - F1",
            },
            {
                imageUrl: 'randommap/26.png',
                lat: 30.146311645513244,
                lng: -74.8283350467682,
                currentLocation: "Storage Zone - F1",
            },
            {
                imageUrl: 'randommap/27.png',
                lat: -44.170715787372586,
                lng: -6.360164880752551,
                currentLocation: "Storage Zone - F2",
            },
            {
                imageUrl: 'randommap/28.png',
                lat: 11.352139643098683,
                lng: 38.108829259872465,
                currentLocation: "Storage Zone - F2",
            },
            {
                imageUrl: 'randommap/29.png',
                lat: -8.918460508833506,
                lng: -28.512022510598623,
                currentLocation: "Storage Zone - F2",
            },
            {
                imageUrl: 'randommap/30.png',
                lat: 26.40621743793929,
                lng: 48.128360509872465,
                currentLocation: "Storage Zone - F2",
            },
            {
                imageUrl: 'randommap/31.png',
                lat: -37.531875774977195,
                lng: 66.73553824424745,
                currentLocation: "Storage Zone - F2",
            },
            {
                imageUrl: 'randommap/32.png',
                lat: -45.489406297446884,
                lng: 43.095925948816536,
                currentLocation: "Storage Zone - F2",
            },
            {
                imageUrl: 'randommap/33.png',
                lat: -22.400196960319015,
                lng: -42.78624773025512,
                currentLocation: "Supply Zone - F1",
            },
            {
                imageUrl: 'randommap/34.png',
                lat: -3.5550910548497585,
                lng: -101.46148324012756,
                currentLocation: "Supply Zone - F1",
            },
            {
                imageUrl: 'randommap/35.png',
                lat: 16.918001478364722,
                lng: -40.758358240127556,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/36.png',
                lat: 36.410596674662024,
                lng: -59.36187386512756,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/37.png',
                lat: -4.913103442817133,
                lng: -141.75109148025513,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/38.png',
                lat: 48.65131111604312,
                lng: -137.64952898025516,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/39.png',
                lat: -41.06939865150142,
                lng: -144.09484148025513,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/40.png',
                lat: 9.768156439944173,
                lng: -8.912655115127578,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/41.png',
                lat: -2.2246336167699585,
                lng: -9.967342615127558,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/42.png',
                lat: 50.12145631546137,
                lng: 31.10687613487244,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/43.png',
                lat: 42.337903948379996,
                lng: 42.679141759872465,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/44.png',
                lat: 20.931799753305228,
                lng: 36.84398698608634,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/45.png',
                lat: -6.683434667049421,
                lng: 26.5565019384532,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/46.png',
                lat: -7.884330783217611,
                lng: 52.58544266049624,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/47.png',
                lat: 9.102772971744097,
                lng: 117.79953181743622,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/48.png',
                lat: -7.042064975992389,
                lng: 132.36007869243625,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/49.png',
                lat: -30.171773975798445,
                lng: 118.53766986543292,
                currentLocation: "Supply Zone - F2",
            },
            {
                imageUrl: 'randommap/50.png',
                lat: -8.033234239949975,
                lng: 109.98549598086582,
                currentLocation: "Supply Zone - F2",
            },

            // ... Add more images and their assigned coordinates here
            ];

            var currentImage = null;


            function playNextRound() {
                guessOverlay.style.display = 'none';
                guessResult.textContent = '';
                startCountdown();
                startSCountdown();
                var audio = document.getElementById('gameaudio');
                audio.volume = 0.2;
            // Choose a random image
            randomIndex = Math.floor(Math.random() * images.length);
            currentImage = images[randomIndex];
            currentMapLocation = images[randomIndex].currentLocation;
            console.log('Current map location:', currentMapLocation);
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
            imageElement.classList.add('random-image');
            document.body.appendChild(imageElement);


            // Hide the next round button
            nextRoundButton.style.display = 'none';
            if (marker) {
            starrailMap.removeLayer(marker);
            }

            var resultMap = document.querySelector('#resultmap');
                resultMap.style.opacity = '0';
                resultMap.style.pointerEvents = 'none';
            }
            
            playButton.addEventListener('click', function () {
            // Choose a random image
            randomIndex = Math.floor(Math.random() * images.length);
            currentImage = images[randomIndex];
            currentMapLocation = images[randomIndex].currentLocation;
            console.log('Current map location:', currentMapLocation);
            
            // Display the image
            var imageElement = document.createElement('img');
            imageElement.src = currentImage.imageUrl;
            imageElement.classList.add('random-image');
            document.body.appendChild(imageElement);
            });

var guessButton = document.getElementById('guessButton');
var guessOverlay = document.getElementById('guessOverlay');
var score = null;

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 50; // Radius of the Earth in kilometers
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

guessButton.addEventListener('click', function() {
    if (guessButton.classList.contains('has-marker')) {
      if (currentMap === currentMapLocation) {
        var resultMap = document.querySelector('#resultmap');
        resultMap.style.opacity = '1';
        resultMap.style.pointerEvents = 'auto';
        var audio = document.getElementById('gameaudio');
        audio.volume = 0.1;

    if (marker) {
        var playerMarker = marker.getLatLng();
        var distance = calculateDistance(
        playerMarker.lat,
        playerMarker.lng,
        currentImage.lat,
        currentImage.lng
        );

        var score;
        if (distance > 200) {
            score = Math.max(0, 5000 - distance * 50);
        } else if (distance > 100) {
        score = Math.max(0, 5000 - distance * 30);
        } else if (distance > 50) {
        score = Math.max(0, 5000 - distance * 20);
        } else if (distance > 30) {
        score = Math.max(0, 5000 - distance * 15);
        } else if (distance > 20) {
        score = Math.max(0, 5000 - distance * 10);
        } else if (distance > 10) {
        score = Math.max(0, 5000 - distance * 5);
        } else if (distance < 3) {
            score = 5000
        } else {
        score = Math.max(0, 5000 - distance);
        }
        score = Math.ceil(score); // Round up the score to the nearest whole number
        updateScore();


        function updateScore() {
            // Calculate the score based on distance or any other relevant logic
            score = Math.ceil(score); // Round up the score to the nearest whole number
            currentScore += score;
          }

        var displayElement = document.getElementById("countdown-text");
        displayElement.style.display = "none";
        var displaySElement = document.getElementById("countdown-s-text");
        displaySElement.style.display = "none";

        
        // Create the text string
        var resultText = `Your guess was <span style='color: rgb(255, 228, 107)'>${distance.toFixed(2)}m</span> away from the correct location. <br><span style='color: rgb(255, 228, 107); font-size: 80px; display: block; text-align: center'>${score}</span></br>`;

        var guessResult = document.getElementById('guessResult');
        guessResult.insertAdjacentHTML('beforeend', resultText);

        console.log('Clicked coordinates:', playerMarker.lat, playerMarker.lng);
        console.log('Image Latitude:', currentImage.lat);
        console.log('Image Longitude:', currentImage.lng);
        console.log('Distance:', distance);
        console.log('Score:', score);
    } else {
        console.log('Marker not set');
    }
    guessOverlay.style.display = 'block';
    nextRoundButton.style.display = 'block';
    stopCountdown();
    stopSCountdown();
      } else {
        var resultMap = document.querySelector('#resultmap');
        resultMap.style.opacity = '1';
        resultMap.style.pointerEvents = 'auto';
        var audio = document.getElementById('gameaudio');
        audio.volume = 0.1;

    if (marker) {
        var playerMarker = marker.getLatLng();
        var distance = calculateDistance(
        playerMarker.lat,
        playerMarker.lng,
        currentImage.lat,
        currentImage.lng
        );

        score = 0;
        updateScore();


        function updateScore() {
            // Calculate the score based on distance or any other relevant logic
            score = Math.ceil(score); // Round up the score to the nearest whole number
            currentScore += score;
          }

        var displayElement = document.getElementById("countdown-text");
        displayElement.style.display = "none";
        var displaySElement = document.getElementById("countdown-s-text");
        displaySElement.style.display = "none";

        
        // Create the text string
        var resultText = `Your guess was incorrect! The correct location is <span style='color: rgb(255, 228, 107)'>${currentMapLocation}</span>. <br><span style='color: rgb(255, 228, 107); font-size: 80px; display: block; text-align: center'>${score}</span></br>`;

        var guessResult = document.getElementById('guessResult');
        guessResult.insertAdjacentHTML('beforeend', resultText);

        console.log('Clicked coordinates:', playerMarker.lat, playerMarker.lng);
        console.log('Image Latitude:', currentImage.lat);
        console.log('Image Longitude:', currentImage.lng);
        console.log('Distance:', distance);
        console.log('Score:', score);
    } else {
        console.log('Marker not set');
    }
    guessOverlay.style.display = 'block';
    nextRoundButton.style.display = 'block';
    stopCountdown();
    stopSCountdown();
      }
    }
});

currentRound = 1;
round = parseInt(slider3.value);
currentScore = 0;
finalScore = 0;

document.querySelector(".play").addEventListener("click", function() {
  currentRound = 1;
  currentScore = 0;
  finalScore = 0;
  updateRoundInfo();
  console.log("Round: " + currentRound + "/" + round);
  console.log("Current Score: " + currentScore);
  console.log("Final Score: " + finalScore);
});

var nextRoundButton = document.querySelector(".next-round");

function updateNextRoundButton() {
  if (currentRound == round) {
    nextRoundButton.classList.add('view-result');
    nextRoundButton.innerText = 'View Result';
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

     var backMenu = document.getElementById('menu-btn');
     backMenu.style.display = 'block';
     backMenu.addEventListener('click', function() {
      location.reload();
     })

  } else {
    // Handle logic for the "Next Round" button
    if (currentRound < round) {
      currentRound++;
      updateRoundInfo();
      console.log("Round: " + currentRound + "/" + round);
      console.log("Current Score: " + currentScore);
      console.log("Final Score: " + finalScore);
    }
    playNextRound();
  }
  updateNextRoundButton();
});


updateNextRoundButton();

function updateRoundInfo() {
  var roundInfoElement = document.getElementById("round-info");
  roundInfoElement.textContent = "Round: " + currentRound + "/" + round;
  var roundScoreElement = document.getElementById("score-info");
  roundScoreElement.textContent = "Score: " + currentScore
}

function displayFinalScore() {
  var finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = finalScore;
  console.log("Final Score: " + finalScore);
  finalScoreElement.style.display = "block";
  stopCountdown();
  stopSCountdown();
  
}

slider3.oninput = function() {
  round = parseInt(this.value);
  output3.innerHTML = round;
  updateRoundInfo();
};

// Call updateRoundInfo initially to display the initial round value
updateRoundInfo();
