function muffledAudio() {
var audioContext = new AudioContext();
var audioElement = document.getElementById('gameaudio');
var sourceNode = audioContext.createMediaElementSource(audioElement);
var muffledEffectNode = audioContext.createBiquadFilter();

// Apply muffled effect settings
muffledEffectNode.type = 'lowpass';
muffledEffectNode.frequency.value = 1000;
muffledEffectNode.Q.value = 1;

// Connect the audio nodes
sourceNode.disconnect();
sourceNode.connect(muffledEffectNode);
muffledEffectNode.connect(audioContext.destination);

// Start playing the audio
audioElement.play();
}