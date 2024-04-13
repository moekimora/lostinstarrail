var audio = document.getElementById("gameaudio");
var guessButton = document.getElementById("guessButton");
var nextRoundButton = document.getElementById("next-round");

var audioContext;
var gainNode;
var filterNode;

// Function to create AudioContext after a user gesture
function createAudioContext() {
// Check if AudioContext is supported
if (typeof window.AudioContext !== 'undefined') {
    // Create AudioContext if it doesn't exist
    if (!audioContext) {
    audioContext = new AudioContext();
    gainNode = audioContext.createGain();
    filterNode = audioContext.createBiquadFilter();

    // Connect the audio element to the gain node
    var source = audioContext.createMediaElementSource(audio);
    source.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    }
}
}

guessButton.addEventListener("click", function() {
    if (guessButton.classList.contains('has-marker')) {
        createAudioContext(); // Create AudioContext on button click
  filterNode.type = "lowpass"; // Set the filter type to lowpass
  filterNode.frequency.value = 1000; // Adjust the cutoff frequency for the muffle effect
    }
});

nextRoundButton.addEventListener("click", function() {
  createAudioContext(); // Create AudioContext on button click
  filterNode.type = "allpass"; // Set the filter type back to allpass (no effect)
  filterNode.frequency.value = 0; // Set the filter frequency to 0 (no effect)
});

function muffleAudio() {
  createAudioContext(); // Create AudioContext for muffle effect
  filterNode.type = "lowpass"; // Set the filter type to lowpass
  filterNode.frequency.value = 1000; // Adjust the cutoff frequency for the muffle effect
}

var audioLeft = document.querySelector('.options-audioleft');
var audioRight = document.querySelector('.options-audioright');
var audioName = document.querySelector('.audioname');

var audioList = [
  "Cosmic Sacrifice For Love",
  "Space Walk",
  "Order",
  "Anthropic Domain",
  "Halfway House"
];

var audioIndex = 0;
// Check if a default audio is stored in sessionStorage
var defaultAudio = sessionStorage.getItem('defaultAudio');
if (defaultAudio) {
  audioIndex = audioList.indexOf(defaultAudio);
  updateAudio(defaultAudio);
} else {
  updateAudio(audioList[audioIndex]);
}

audioLeft.addEventListener('click', function() {
  audioIndex = (audioIndex - 1 + audioList.length) % audioList.length;
  updateAudio(audioList[audioIndex]);
});

audioRight.addEventListener('click', function() {
  audioIndex = (audioIndex + 1) % audioList.length;
  updateAudio(audioList[audioIndex]);
});

function updateAudio(audioTitle) {
  audioName.textContent = audioTitle;
  var audio = document.getElementById('gameaudio');
  audio.src = "static/media/audio/" + audioTitle + ".mp3";
  audio.load();
  sessionStorage.setItem('defaultAudio', audioTitle);
}