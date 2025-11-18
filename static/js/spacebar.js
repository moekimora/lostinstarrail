document.addEventListener('keydown', function(event) {
  if (event.code === 'Space' && event.target.tagName !== 'INPUT') {
    var backMenu = document.querySelector('.menu-btn');
    if (backMenu && getComputedStyle(backMenu).display !== 'none') {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    if (!guessButtonActivated) {
      if (guessButton.classList.contains('has-marker')) {
        guessButton.click();
        guessButtonActivated = true;
      }
    } else if (!nextRoundButtonActivated) {
      nextRoundButton.click();
      nextRoundButtonActivated = true;
    }
  }
});
guessButton.addEventListener('click', function() {
  if (!guessButtonActivated || getComputedStyle(nextRoundButton).display === 'block') {
    guessButtonActivated = true;
    nextRoundButtonActivated = false;
  }
});
nextRoundButton.addEventListener('click', function() {
  if (!nextRoundButtonActivated) {
    nextRoundButtonActivated = true;
    guessButtonActivated = false;
  }
});