function togglePlay() {
    // show game ui
    var gameStat = document.getElementById('game-stat');
    gameStat.style.display = 'flex';

    // hide ui
    var video = document.getElementById('loadingscreen');
    var homelogo = document.getElementById('homelogo');
    var home = document.getElementById('home');
    var version = document.getElementById('version');
    var playButton = document.getElementById('play-button');
    var settingsButton = document.getElementById('settings-button');
    var options = document.getElementById('options');
    var credits = document.getElementById('credits');

    video.style.display = 'none';
    homelogo.style.display = 'none';
    home.style.display = 'none';
    version.style.display = 'none';
    playButton.style.display = 'none';
    settingsButton.style.display = 'none';
    options.style.display = 'none';
    credits.style.display = 'none';

    // toggle map - enable interactivity and low opacity
    var starrailMap = document.querySelector('#starrailmap');
    starrailMap.style.opacity = '0.2';
    starrailMap.style.pointerEvents = 'auto';

    // Add .active to the wrapper so hover rules will apply from CSS
    var starrailWrapper = document.getElementById('starrailmap-wrapper');
    if (starrailWrapper) starrailWrapper.classList.add('active');

    var dropdownBtn = document.querySelector('.dropdown-btn');
    dropdownBtn.style.display = 'block';

    var guessButton = document.querySelector('.guess-btn');
    guessButton.style.display = 'block';

    var audio = document.getElementById('gameaudio');
    var volume = localStorage.getItem('volume');
    if (volume == null) {
        volume = 20;
    }
    audio.volume = volume / 100;
    audio.addEventListener('ended', function() {
        audio.currentTime = 0; // Reset the audio to the beginning
        audio.play(); // Start playing again
    });
    audio.play();
}
