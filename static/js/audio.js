const audio = document.getElementById("gameaudio");

let audioContext;
let gainNode;
let filterNode;

function createAudioContext() {
  if (typeof window.AudioContext !== 'undefined' && !audioContext) {
    audioContext = new AudioContext();
    gainNode = audioContext.createGain();
    filterNode = audioContext.createBiquadFilter();

    const source = audioContext.createMediaElementSource(audio);
    source.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
  }
}

guessButton.addEventListener("click", () => {
  if (guessButton.classList.contains('has-marker')) {
    createAudioContext();
    filterNode.type = "lowpass";
    filterNode.frequency.value = 1000;
  }
});
nextRoundButton.addEventListener("click", () => {
  createAudioContext();
  filterNode.type = "allpass";
  filterNode.frequency.value = 0;
});

function muffleAudio() {
  createAudioContext();
  filterNode.type = "lowpass";
  filterNode.frequency.value = 1000;
}

const audioLeft = document.querySelector('.options-audioleft');
const audioRight = document.querySelector('.options-audioright');
const audioName = document.querySelector('.audioname');
const audioList = [
  "Cosmic Sacrifice For Love",
  "Space Walk",
  "Order",
  "Anthropic Domain",
  "Halfway House"
];

let audioIndex = 0;

const defaultAudio = localStorage.getItem('defaultAudio');
if (defaultAudio) {
  audioIndex = audioList.indexOf(defaultAudio);
}
updateAudio(audioList[audioIndex]);
audioLeft.addEventListener('click', () => {
  audioIndex = (audioIndex - 1 + audioList.length) % audioList.length;
  updateAudio(audioList[audioIndex]);
});
audioRight.addEventListener('click', () => {
  audioIndex = (audioIndex + 1) % audioList.length;
  updateAudio(audioList[audioIndex]);
});
function updateAudio(audioTitle) {
  audioName.textContent = audioTitle;
  audio.src = `static/media/audio/${audioTitle}.mp3`;
  audio.load();
  localStorage.setItem('defaultAudio', audioTitle);
}