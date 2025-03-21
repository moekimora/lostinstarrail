function toggleSettings() {
    // Define an array of settings maps
    var settingsMaps = [
    document.querySelector('.settings-map1'),
    document.querySelector('.settings-map2'),
    document.querySelector('.settings-map3'),
    document.querySelector('.settings-map4'),
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

    // Settings transition
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
    document.querySelector('.settings-gamemodessuperstitiontext'),
    document.querySelector('.settings-gamemodessurvivalinfo'),
    document.querySelector('.settings-gamemodessuperstitioninfo'),
    document.querySelector('.standard-switch'),
    document.querySelector('.survival-switch'),
    document.querySelector('.superstition-switch'),
    ];

    elements.forEach(function(element) {
    toggleElement(element);
    });
}

//map
var mapId = 0;

var maps = [
    { element: document.querySelector('.settings-map1'), id: 0, name: 'Random' },
    { element: document.querySelector('.settings-map2'), id: 1, name: 'Herta Space Station' },
    { element: document.querySelector('.settings-map3'), id: 2, name: 'Jarilo-VI' },
    { element: document.querySelector('.settings-map4'), id: 3, name: 'The Xianzhou Luofu' },
  ];
  maps[0].element.style.border = '2px solid #180872';
  document.getElementById("map-info").innerHTML = "<span class='map-text'>Map</span><br>Random";
  
  function changeColor(selectedMap) {
    mapId = selectedMap.id;
    maps.forEach(map => {
        map.element.style.border = map.id === mapId ? '2px solid #180872' : '';
    });
    document.getElementById("map-info").innerHTML = `<span class='map-text'>Map</span><br>${selectedMap.name}`;
  }
  
  // Attach event listeners to all map elements
  maps.forEach(map => {
    map.element.addEventListener('click', () => changeColor(map));
  });  

var slider = document.getElementById("Range");
var output = document.getElementById("Time");

// Update the current slider value (each time you drag the slider handle)
slider.addEventListener('input', () => {
    output.value = slider.value;
});
output.addEventListener('input', () => {
    slider.value = output.value;
});
output.value = slider.value;

var slider2 = document.getElementById("Range2");
var output2 = document.getElementById("SeeTime");

slider2.addEventListener('input', () => {
    output2.value = slider2.value;
});
output2.addEventListener('input', () => {
    slider2.value = output2.value;
});
output2.value = slider2.value;

var slider3 = document.getElementById("Range3");
var output3 = document.getElementById("Round");

slider3.addEventListener('input', () => {
    output3.value = slider3.value;
});
output3.addEventListener('input', () => {
    slider3.value = output3.value;
});
output3.value = slider3.value;

if (output3.value < 1) {
    output3.value = 5;
}