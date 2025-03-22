function toggleSettings() {
    // Define a single array of elements to toggle
    const elements = [
        document.querySelector('.settings-map1'),
        document.querySelector('.settings-map2'),
        document.querySelector('.settings-map3'),
        document.querySelector('.settings-map4'),
        document.querySelector('.settings-container'),
        document.querySelector('.settings-app'),
        document.querySelector('.settings-logo'),
        document.querySelector('.settings-text'),
        document.querySelector('.settings-map'),
        document.querySelector('.settings-gamerulestext'),
        document.querySelector('.settings-gamerulestimer'),
        document.querySelector('.settings-displayTime'),
        document.querySelector('.slider1'),
        document.querySelector('.settings-gamerulesseetime'),
        document.querySelector('.settings-displaySeeTime'),
        document.querySelector('.slider2'),
        document.querySelector('.settings-gameruleshold'),
        document.querySelector('.settings-displayHold'),
        document.querySelector('.hold-switch'),
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

    // Apply toggle effect for each element
    elements.forEach((element) => {
        if (element) {
            applyToggleEffect(element);
        }
    });
}
function applyToggleEffect(element) {
    element.classList.toggle('active');
    if (element.classList.contains('active')) {
        element.style.display = 'flex';
        setTimeout(() => {
            element.style.opacity = '1';
            if (!element.classList.contains('settings-container')) {
                element.style.transform = 'translateY(2%)';
            }
        }, 10);
    } else {
        element.style.opacity = '0';
        if (!element.classList.contains('settings-container')) {
            element.style.transform = 'translateY(-2%)';
        }
        setTimeout(() => {
            element.style.display = 'none';
        }, 500);
    }
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
    map.element.addEventListener('mouseover', () => {
        map.element.style.transform = 'scale(1.05)';
        map.element.style.transition = 'transform 0.3s ease';
    });

    map.element.addEventListener('mouseout', () => {
        map.element.style.transform = 'scale(1)';
    });
});

const sliders = [
    { sliderId: "Range", outputId: "Time" },
    { sliderId: "Range2", outputId: "SeeTime" },
    { sliderId: "Range3", outputId: "Round", minValue: 5 },
];

sliders.forEach(({ sliderId, outputId, minValue }) => {
    const slider = document.getElementById(sliderId);
    const output = document.getElementById(outputId);

    slider.addEventListener('input', () => {
        output.value = slider.value;
    });

    output.addEventListener('input', () => {
        slider.value = output.value;
    });

    output.value = slider.value;

    if (minValue && output.value < minValue) {
        output.value = minValue;
        slider.value = minValue;
    }
});

// Ensure 'round' value is synchronized with 'Round'
let round = parseInt(document.getElementById("Round").value);
const slider3 = document.getElementById("Range3");
const output3 = document.getElementById("Round");

slider3.addEventListener('input', () => {
    round = parseInt(slider3.value);
    output3.value = round;
});
output3.addEventListener('input', () => {
    round = parseInt(output3.value);
    slider3.value = round;
});