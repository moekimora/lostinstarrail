function toggleCredits() {
    var creditsElements = [
        {
            element: document.querySelector('.credits-container'),
            transitionDelay: 10,
            transitionDuration: 500,
            translateY: '0%',
            opacity: '1'
        },
        {
            element: document.querySelector('.credits-text'),
            transitionDelay: 10,
            transitionDuration: 500,
            translateY: '2%',
            opacity: '1'
        },
        {
            element: document.querySelector('.credits-content'),
            transitionDelay: 10,
            transitionDuration: 500,
            translateY: '2%',
            opacity: '1'
        },
        ];
    
        // Loop through the elements
        creditsElements.forEach(function(elementData) {
        var Celement = elementData.element;
        Celement.classList.toggle('active');
    
        if (Celement.classList.contains('active')) {
            Celement.style.display = 'flex';
            setTimeout(function() {
            Celement.style.opacity = elementData.opacity;
            Celement.style.transform = 'translateY(' + elementData.translateY + ')';
            }, elementData.transitionDelay);
        } else {
            Celement.style.opacity = '0';
            Celement.style.transform = 'translateY(-2%)';
            setTimeout(function() {
            Celement.style.display = 'none';
            }, elementData.transitionDuration); // Adjust the delay to match the transition duration
        }
        });
    
}
function toggleOptions() {
    var optionsElements = [
        {
            element: document.querySelector('.options-container'),
            transitionDelay: 10,
            transitionDuration: 500,
            translateY: '0%',
            opacity: '1'
        },
        {
            element: document.querySelector('.options-text'),
            transitionDelay: 10,
            transitionDuration: 500,
            translateY: '2%',
            opacity: '1'
        },
        {
            element: document.querySelector('.options-app'),
            transitionDelay: 10,
            transitionDuration: 500,
            translateY: '0%',
            opacity: '1'
        },
        ];
    
        // Loop through the elements
        optionsElements.forEach(function(elementData) {
        var Oelement = elementData.element;
        Oelement.classList.toggle('active');
    
        if (Oelement.classList.contains('active')) {
            Oelement.style.display = 'flex';
            setTimeout(function() {
            Oelement.style.opacity = elementData.opacity;
            Oelement.style.transform = 'translateY(' + elementData.translateY + ')';
            }, elementData.transitionDelay);
        } else {
            Oelement.style.opacity = '0';
            Oelement.style.transform = 'translateY(-2%)';
            setTimeout(function() {
            Oelement.style.display = 'none';
            }, elementData.transitionDuration); // Adjust the delay to match the transition duration
        }
        });
        function toggleOElement(element) {
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
            document.querySelector('.options-volume'),
            document.querySelector('.options-volumetext'),
            document.querySelector('.volume'),
            document.querySelector('.options-audioleft'),
            document.querySelector('.options-audioright'),
            document.querySelector('.audioname'),
            ];
        
            elements.forEach(function(element) {
            toggleOElement(element);
            });
}
var slider4 = document.getElementById("Range4");
var output4 = document.getElementById("Volume");

// Get the saved volume value from localStorage
var savedVolume = sessionStorage.getItem('volume');

// Set the saved volume as the initial value for the slider
if (savedVolume !== null && !isNaN(savedVolume)) {
  slider4.value = savedVolume;
  output4.innerHTML = savedVolume;
} else {
  // Use a default value if no saved volume is found
  slider4.value = 20; // Set your desired default value here
  output4.innerHTML = slider4.value;
}

slider4.oninput = function() {
  output4.innerHTML = this.value;
  sessionStorage.setItem('volume', this.value);
}
