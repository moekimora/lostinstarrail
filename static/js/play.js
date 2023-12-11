 //play
 function togglePlay() {
    //debug test
    var timeElement = document.getElementById('Time');
    var seeTimeElement = document.getElementById('SeeTime');
    var moveCheckbox = document.getElementById('Move');
    var zoomCheckbox = document.getElementById('Zoom');
    var output = document.getElementById('Output');

    function updateOutput() {
        var moveStatus = moveCheckbox.checked ? 'checked' : 'unchecked';
        var zoomStatus = zoomCheckbox.checked ? 'checked' : 'unchecked';

        //output.innerHTML = `Time: ${timeElement.innerHTML}, SeeTime: ${seeTimeElement.innerHTML}, Move: ${moveStatus}, Zoom: ${zoomStatus}, Map: ${mapId}`;
    }

    moveCheckbox.addEventListener('change', updateOutput);
    zoomCheckbox.addEventListener('change', updateOutput);

    timeElement.addEventListener('input', updateOutput);
    seeTimeElement.addEventListener('input', updateOutput);

    updateOutput(); // Call updateOutput initially to display the initial status

    //show ui
    var gameStat = document.getElementById('game-stat');
    gameStat.style.display = 'block';

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
    audio.volume = 0.2;
    audio.addEventListener('ended', function() {
        audio.currentTime = 0; // Reset the audio to the beginning
        audio.play(); // Start playing again
      });
      
      audio.play();

}