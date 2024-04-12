 //play
 function togglePlay() {
    //show ui
    var gameStat = document.getElementById('game-stat');
    gameStat.style.display = 'flex';

    //hide ui
    var video = document.getElementById('loadingscreen');
    var homelogo = document.getElementById('homelogo');
    var home = document.getElementById('home');
    var version = document.getElementById('version');
    var playButton = document.getElementById('play-button');
    var settingsButton = document.getElementById('settings-button');

    video.style.display = 'none';
    homelogo.style.display = 'none';
    home.style.display = 'none';
    version.style.display = 'none';
    playButton.style.display = 'none';
    settingsButton.style.display = 'none';


    //toggle map
    var starrailMap = document.querySelector('#starrailmap');
    starrailMap.style.opacity = '1';
    starrailMap.style.pointerEvents = 'auto';

    const dropdownBtn = document.querySelector('.dropdown-btn');
    dropdownBtn.style.display = 'block';

    const guessButton = document.querySelector('.guess-btn');
    guessButton.style.display = 'block';

    var audio = document.getElementById('gameaudio');
    var volume = Range4.value / 100;
    audio.volume = volume;
    audio.addEventListener('ended', function() {
        audio.currentTime = 0; // Reset the audio to the beginning
        audio.play(); // Start playing again
      });
      
      audio.play();

}