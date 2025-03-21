function toggleElements(elements) {
  elements.forEach(({ element, transitionDelay, transitionDuration, translateY, opacity }) => {
    element.classList.toggle('active');
    if (element.classList.contains('active')) {
      element.style.display = 'flex';
      setTimeout(() => {
        element.style.opacity = opacity;
        element.style.transform = `translateY(${translateY})`;
      }, transitionDelay);
    } else {
      element.style.opacity = '0';
      element.style.transform = 'translateY(-2%)';
      setTimeout(() => {
        element.style.display = 'none';
      }, transitionDuration);
    }
  });
}
function toggleCredits() {
  const creditsElements = [
    { element: document.querySelector('.credits-container'), transitionDelay: 10, transitionDuration: 500, translateY: '0%', opacity: '1' },
    { element: document.querySelector('.credits-text'), transitionDelay: 10, transitionDuration: 500, translateY: '2%', opacity: '1' },
    { element: document.querySelector('.credits-content'), transitionDelay: 10, transitionDuration: 500, translateY: '2%', opacity: '1' },
  ];
  toggleElements(creditsElements);
}
function toggleOptions() {
  const optionsElements = [
    { element: document.querySelector('.options-container'), transitionDelay: 10, transitionDuration: 500, translateY: '0%', opacity: '1' },
    { element: document.querySelector('.options-text'), transitionDelay: 10, transitionDuration: 500, translateY: '2%', opacity: '1' },
    { element: document.querySelector('.options-app'), transitionDelay: 10, transitionDuration: 500, translateY: '0%', opacity: '1' },
  ];
  toggleElements(optionsElements);
  const optionSubElements = [
    document.querySelector('.options-volume'),
    document.querySelector('.options-volumetext'),
    document.querySelector('.volume'),
    document.querySelector('.options-audioleft'),
    document.querySelector('.options-audioright'),
    document.querySelector('.audioname'),
  ];
  optionSubElements.forEach(element => {
    element.classList.toggle('active');
    if (element.classList.contains('active')) {
      element.style.display = 'flex';
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(5%)';
      }, 10);
    } else {
      element.style.opacity = '0';
      element.style.transform = 'translateY(-5%)';
      setTimeout(() => {
        element.style.display = 'none';
      }, 500);
    }
  });
}
const slider4 = document.getElementById("Range4");
const output4 = document.getElementById("Volume");
const savedVolume = localStorage.getItem('volume');
if (savedVolume !== null && !isNaN(savedVolume)) {
  slider4.value = savedVolume;
  output4.innerHTML = savedVolume;
} else {
  slider4.value = 20;
  output4.innerHTML = slider4.value;
}
slider4.oninput = function() {
  output4.innerHTML = this.value;
  localStorage.setItem('volume', this.value);
}