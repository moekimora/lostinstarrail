const superstitionBuffs = [
    'Nothing happens.',
    'Gain 1000 points this round.',
    'Gain 2000 points this round.',
    'Gain 3000 points this round.',
    'Remove 1 random filter. Starts from the 2 round.',
    'Remove 2 random filters. Starts from the 2 round.',
    'Remove 3 random filters. Starts from the 2 round.',
    'Remove all filters. Starts from the 2 round.',
    'Set your score to 5000 - 25000 randomly.',
    'Gain 0 - 5000 points randomly.',
    'Gain 1000 - 10000 points randomly.',
    'Gain 1000 points for each guess equal or higher than 3500 points.',
    'Gain 1000 points for each guess with distance lower than 40m.',
    'Double your score for each correct guess.',
    'For every 10m from the correct location, gain 100 points, up to 100m.',
];
const superstitionDebuffs = [
    'Nothing happens.',
    'Apply 1 random filter. Starts from the 2 round.',
    'Apply 2 random filters. Starts from the 2 round.',
    'Apply 3 random filters. Starts from the 2 round.',
    'Apply 4 filters. Starts from the 2 round.',
    'Deduct 1000 points this round.',
    'Deduct 2000 points this round.',
    'Deduct 3000 points this round.',
    'Deduct 5000 points this round.',
    'Deduct 1000 points for each guess lower than 2500 points.',
    'Deduct 1000 points for each guess with distance higher than 25m. Incorrect guess will also deduct points this way.',
    'Lose all your points.',
    'Deduct 1000 - 10000 points randomly.',
    'Deduct 5000 - 50000 points randomly.',
    'Instant game over if your guess is lower than 2500 points.',
    'Instant game over if your distance is higher than 50m. Incorrect guess will also trigger this effect.',
];

function superstitionStart() {
    superstitionScreen.style.display = 'flex';
    superstitionText.style.display = 'block';
  
    const superstitions = [superstition1, superstition2, superstition3];
  
    for (let i = 0; i < superstitions.length; i++) {
      const randomBuff = getRandomElement(superstitionBuffs);
      const randomDebuff = getRandomElement(superstitionDebuffs);
  
      const superstition = superstitions[i];
      superstition.innerHTML = `Buff: ${randomBuff}<br><br>Debuff: ${randomDebuff}`;
      superstition.setAttribute('data-buff', randomBuff);
      superstition.setAttribute('data-debuff', randomDebuff);
      superstition.addEventListener('click', handleSuperstitionClick);
      superstition.style.display = 'block';
    }
}
  
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
  
function handleSuperstitionClick() {
    const buff = this.getAttribute('data-buff');
    const debuff = this.getAttribute('data-debuff');
  
    applyBuffEffect(buff);
    applyDebuffEffect(debuff);

    superstitionScreen.style.display = 'none';
    superstitionText.style.display = 'none';
    console.log(`Selected Buff: ${buff}`);
    console.log(`Selected Debuff: ${debuff}`);

    isImageLoaded = true;
    loadingScreen.style.display = 'none';
    startCountdown();
    startSCountdown();
}



let buff1Active = false;
let buff2Active = false;
let buff3Active = false;
let buff4Active = false;
let debuff1Active = false;
let debuff2Active = false;
let debuff3Active = false;
let debuff4Active = false;

function applyBuffEffect(buff) {
    const checkedCheckboxes = [BAWCheckbox, InvertCheckbox, PixelateCheckbox, ScrambleCheckbox].filter(checkbox => checkbox.checked);
  
    if (buff === 'Gain 1000 points this round.') {
        currentScore += 1000;
        updateRoundInfo();
    } else if (buff === 'Gain 2000 points this round.') {
        currentScore += 2000;
        updateRoundInfo();
    } else if (buff === 'Gain 3000 points this round.') {
        currentScore += 3000;
        updateRoundInfo();
    } else if (buff === 'Remove 1 random filter. Starts from the 2 round.') {
        removeRandomFilters(1, checkedCheckboxes);
    } else if (buff === 'Remove 2 random filters. Starts from the 2 round.') {
        removeRandomFilters(2, checkedCheckboxes);
    } else if (buff === 'Remove 3 random filters. Starts from the 2 round.') {
        removeRandomFilters(3, checkedCheckboxes);
    } else if (buff === 'Remove all filters. Starts from the 2 round.') {
        removeAllFilters();
    } else if (buff === 'Set your score to 5000 - 25000 randomly.') {
        currentScore = Math.floor(Math.random() * 20000) + 5000;
        updateRoundInfo();
    } else if (buff === 'Gain 0 - 5000 points randomly.') {
        currentScore += Math.floor(Math.random() * 5000);
        updateRoundInfo();
    } else if (buff === 'Gain 1000 - 10000 points randomly.') {
        currentScore += Math.floor(Math.random() * 9000) + 1000;
        updateRoundInfo();
    } else if (buff === 'Gain 1000 points for each guess equal or higher than 3500 points.' && !buff1Active) {
        buff1Active = true;
        buff1.style.display = 'block';
        guessButton.addEventListener('click', function() {
            if (score >= 3500) {
                currentScore += 1000;
            }
            updateRoundInfo();
        });
    } else if (buff === 'Gain 1000 points for each guess with distance lower than 40m.' && !buff2Active) {
        buff2Active = true;
        buff2.style.display = 'block';
        guessButton.addEventListener('click', function() {
            if (distance < 40) {
                currentScore += 1000;
            }
            updateRoundInfo();
        });
    } else if (buff === 'Double your score for each correct guess.' && !buff3Active) {
        buff3Active = true;
        buff3.style.display = 'block';
        guessButton.addEventListener('click', function() {
            updateScore();
            updateRoundInfo();
        });
    } else if (buff === 'For every 10m from the correct location, gain 100 points, up to 100m.' && !buff4Active) {
        buff4Active = true;
        buff4.style.display = 'block';
        guessButton.addEventListener('click', function() {
            currentScore += Math.floor(Math.min(Math.abs(distance), 100) / 10) * 100;
            updateRoundInfo();
        });
    }
}

function applyDebuffEffect(debuff) {

    if (debuff === 'Apply 1 random filter. Starts from the 2 round.') {
        applyRandomFilters(1);
    } else if (debuff === 'Apply 2 random filters. Starts from the 2 round.') {
        applyRandomFilters(2);
    } else if (debuff === 'Apply 3 random filters. Starts from the 2 round.') {
        applyRandomFilters(2);
    } else if (debuff === 'Apply 4 filters. Starts from the 2 round.') {
        applyAllFilters();
    } else if (debuff === 'Deduct 1000 points this round.') {
        currentScore -= 1000;
        updateRoundInfo();
    } else if (debuff === 'Deduct 2000 points this round.') {
        currentScore -= 2000;
        updateRoundInfo();
    } else if (debuff === 'Deduct 3000 points this round.') {
        currentScore -= 3000;
        updateRoundInfo();
    } else if (debuff === 'Deduct 5000 points this round.') {
        currentScore -= 5000;
        updateRoundInfo();
    } else if (debuff === 'Deduct 1000 points for each guess lower than 2500 points.' && !debuff1Active) {
        debuff1Active = true;
        debuff1.style.display = 'block';
        guessButton.addEventListener('click', function() {
            if (score < 2500) {
                currentScore -= 1000;
            }
            updateRoundInfo();
        });
    } else if (debuff === 'Deduct 1000 points for each guess with distance higher than 25m. Incorrect guess will also deduct points this way.' && !debuff2Active) {
        debuff2Active = true;
        debuff2.style.display = 'block';
        guessButton.addEventListener('click', function() {
            if (distance > 25 || score < 1) {
                currentScore -= 1000;
            }
            updateRoundInfo();
        });
    } else if (debuff === 'Lose all your points.') {
        currentScore = 0;
        updateRoundInfo();
    } else if (debuff === 'Deduct 1000 - 10000 points randomly.') {
        currentScore -= Math.floor(Math.random() * 9000) + 1000;
        updateRoundInfo();
    } else if (debuff === 'Deduct 5000 - 50000 points randomly.') {
        currentScore -= Math.floor(Math.random() * 45000) + 5000;
        updateRoundInfo();
    } else if (debuff === 'Instant game over if your guess is lower than 2500 points.' && !debuff3Active) {
        debuff3Active = true;
        debuff3.style.display = 'block';
        guessButton.addEventListener('click', function() {
            if (score < 2500) {
                nextRoundButton.classList.add('view-result');
                nextRoundButton.innerText = 'View Result';
            }
            updateRoundInfo();
        });
    } else if (debuff === 'Instant game over if your distance is higher than 50m. Incorrect guess will also trigger this effect.' && !debuff4Active) {
        debuff4Active = true;
        debuff4.style.display = 'block';
        guessButton.addEventListener('click', function() {
            if (distance > 50 || score < 1) {
                nextRoundButton.classList.add('view-result');
                nextRoundButton.innerText = 'View Result';
            }
            updateRoundInfo();
        });
    }
}

function removeRandomFilters(count, checkedCheckboxes) {
    if (checkedCheckboxes.length >= count) {
        const randomIndexes = [];
        while (randomIndexes.length < count) {
            const randomIndex = Math.floor(Math.random() * checkedCheckboxes.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }
  
      randomIndexes.forEach(index => {
        checkedCheckboxes[index].checked = false;
      });
    }
}

function removeAllFilters() {
    BAWCheckbox.checked = false;
    InvertCheckbox.checked = false;
    PixelateCheckbox.checked = false;
    ScrambleCheckbox.checked = false;
    updateRoundInfo();
}

function applyRandomFilters(count) {
    const checkboxes = [BAWCheckbox, InvertCheckbox, PixelateCheckbox, ScrambleCheckbox];
    const randomIndexes = [];
  
    while (randomIndexes.length < count) {
        const randomIndex = Math.floor(Math.random() * checkboxes.length);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }
  
    randomIndexes.forEach(index => {
        checkboxes[index].checked = true;
    });
  
    updateRoundInfo();
}
  
function applyAllFilters() {
    BAWCheckbox.checked = true;
    InvertCheckbox.checked = true;
    PixelateCheckbox.checked = true;
    ScrambleCheckbox.checked = true;
    updateRoundInfo();
}