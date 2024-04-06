// settings appear and stuff
function toggleSettings() {
    // Define an array of settings maps
    var settingsMaps = [
    document.querySelector('.settings-map1'),
    document.querySelector('.settings-map2'),
    document.querySelector('.settings-map3'),
    document.querySelector('.settings-map4'),
    document.querySelector('.settings-map5')
    ];

    // Loop through the settings maps
    settingsMaps.forEach(function(settingsMap) {
    settingsMap.classList.toggle('active');

    if (settingsMap.classList.contains('active')) {
        settingsMap.style.display = 'flex';
        setTimeout(function() {
        settingsMap.style.opacity = '1';
        settingsMap.style.transform = 'translateY(5%)';
        }, 10);
    } else {
        settingsMap.style.opacity = '0';
        settingsMap.style.transform = 'translateY(-5%)';
        setTimeout(function() {
        settingsMap.style.display = 'none';
        }, 500);
    }
    });

    // settings transition
    // Define an array of elements
    var settingsElements = [
    {
        element: document.querySelector('.settings-container'),
        transitionDelay: 10,
        transitionDuration: 500,
        translateY: '0%',
        opacity: '1'
    },
    {
        element: document.querySelector('.settings-app'),
        transitionDelay: 10,
        transitionDuration: 500,
        translateY: '2%',
        opacity: '1'
    },
    {
        element: document.querySelector('.settings-logo'),
        transitionDelay: 10,
        transitionDuration: 500,
        translateY: '5%',
        opacity: '1'
    },
    {
        element: document.querySelector('.settings-text'),
        transitionDelay: 10,
        transitionDuration: 500,
        translateY: '5%',
        opacity: '1'
    },
    {
        element: document.querySelector('.settings-map'),
        transitionDelay: 10,
        transitionDuration: 500,
        translateY: '5%',
        opacity: '1'
    }
    ];

    // Loop through the elements
    settingsElements.forEach(function(elementData) {
    var element = elementData.element;
    element.classList.toggle('active');

    if (element.classList.contains('active')) {
        element.style.display = 'flex';
        setTimeout(function() {
        element.style.opacity = elementData.opacity;
        element.style.transform = 'translateY(' + elementData.translateY + ')';
        }, elementData.transitionDelay);
    } else {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-2%)';
        setTimeout(function() {
        element.style.display = 'none';
        }, elementData.transitionDuration); // Adjust the delay to match the transition duration
    }
    });

    function toggleElement(element) {
    element.classList.toggle('active');

    if (element.classList.contains('active')) {
        element.style.display = 'flex';
        setTimeout(function() {
        element.style.opacity = '1';
        element.style.transform = 'translateY(5%)';
        }, 10);
    } else {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-5%)';
        setTimeout(function() {
        element.style.display = 'none';
        }, 500); // Adjust the delay to match the transition duration
    }
    }

    var elements = [
    document.querySelector('.settings-gamerulestext'),
    document.querySelector('.settings-gamerulestimer'),
    document.querySelector('.settings-displayTime'),
    document.querySelector('.slider1'),
    document.querySelector('.settings-gamerulesseetime'),
    document.querySelector('.settings-displaySeeTime'),
    document.querySelector('.slider2'),
    document.querySelector('.settings-gamerulebaw'),
    document.querySelector('.settings-gameruleinvert'),
    document.querySelector('.settings-gamerulepixelate'),
    document.querySelector('.settings-gamerulescramble'),
    document.querySelector('.settings-gameruleround'),
    document.querySelector('.settings-displayRound'),
    document.querySelector('.slider3'),
    document.querySelector('.settings-seedtext'),
    document.querySelector('.seedinput'),
    document.querySelector('.settings-filterstext'),
    document.querySelector('.baw-switch'),
    document.querySelector('.invert-switch'),
    document.querySelector('.pixelate-switch'),
    document.querySelector('.scramble-switch'),
    document.querySelector('.settings-gamemodestext'),
    document.querySelector('.settings-gamemodesstandardtext'),
    document.querySelector('.settings-gamemodessurvivaltext'),
    document.querySelector('.standard-switch'),
    document.querySelector('.survival-switch')
    ];

    elements.forEach(function(element) {
    toggleElement(element);
    });
}

//map
var mapId = 0;

function changeColor(element) {

    var map1 = document.querySelector('.settings-map1');
    map1.style.border = '2px solid #180872'; // Set border for map1 by default
    map1.addEventListener('click', function() {
    changeColor(map1);
    });

    var map2 = document.querySelector('.settings-map2');
    map2.addEventListener('click', function() {
    changeColor(map2);
    });
    
    var map3 = document.querySelector('.settings-map3');
    map3.addEventListener('click', function() {
    changeColor(map3);
    });

    var map4 = document.querySelector('.settings-map4');
    map4.addEventListener('click', function() {
    changeColor(map4);
    });

    var map5 = document.querySelector('.settings-map5');
    map5.addEventListener('click', function() {
    changeColor(map5);
    });

    if (element === map1) {
        // Set map value to 0
        mapId = 0;
        map1.style.border = '2px solid #180872'; // Set border for map1 by default
        map2.style.border = '';
        map3.style.border = '';
        map4.style.border = '';
        map5.style.border = '';
    } else if (element === map2) {
        // Set map value to 1
        mapId = 1;
        map1.style.border = '';
        map2.style.border = '2px solid #180872';
        map3.style.border = '';
        map4.style.border = '';
        map5.style.border = '';
    } else if (element === map3) {
        // Set map value to 2
        mapId = 2;
        map1.style.border = '';
        map2.style.border = '';
        map3.style.border = '2px solid #180872';
        map4.style.border = '';
        map5.style.border = '';
    } else if (element === map4) {
        // Set map value to 3
        mapId = 3;
        map1.style.border = '';
        map2.style.border = '';
        map3.style.border = '';
        map4.style.border = '2px solid #180872';
        map5.style.border = '';
    } else if (element === map5) {
        // Set map value to 4
        mapId = 4;
        map1.style.border = '';
        map2.style.border = '';
        map3.style.border = '';
        map4.style.border = '';
        map5.style.border = '2px solid #180872';
    }
    
    // Display map name
    var roundMapElement = document.getElementById("map-info");  
        if (mapId === 0) {
            roundMapElement.innerHTML = "<span class='map-text'>Map</span><br>Random";
            } else if (mapId === 1) {
            roundMapElement.innerHTML = "<span class='map-text'>Map</span><br>Herta Space Station";
            } else if (mapId === 2) {
            roundMapElement.innerHTML = "<span class='map-text'>Map</span><br>Jarilo-VI";
            } else if (mapId === 3) {
            roundMapElement.innerHTML = "<span class='map-text'>Map</span><br>The Xianzhou Luofu";
            } else if (mapId === 4) {
            roundMapElement.innerHTML = "<span class='map-text'>Map</span><br>Penacony";
            } 
                
}

    var map1 = document.querySelector('.settings-map1');
    map1.style.border = '2px solid #180872'; // Set border for map1 by default
    map1.addEventListener('click', function() {
    changeColor(map1);
    });

    var map2 = document.querySelector('.settings-map2');
    map2.addEventListener('click', function() {
    changeColor(map2);
    });

    var map3 = document.querySelector('.settings-map3');
    map3.addEventListener('click', function() {
    changeColor(map3);
    });

    var map4 = document.querySelector('.settings-map4');
    map4.addEventListener('click', function() {
    changeColor(map4);
    });

    var map5 = document.querySelector('.settings-map5');
    map5.addEventListener('click', function() {
    changeColor(map5);
    });

var slider = document.getElementById("Range");
var output = document.getElementById("Time");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
output.innerHTML = this.value;
}

var slider2 = document.getElementById("Range2");
var output2 = document.getElementById("SeeTime");
output2.innerHTML = slider2.value;

slider2.oninput = function() {
output2.innerHTML = this.value;
}

var slider3 = document.getElementById("Range3");
var output3 = document.getElementById("Round");
output3.innerHTML = slider3.value;

slider3.oninput = function() {
output3.innerHTML = this.value;
}