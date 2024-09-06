var debuff1 = document.getElementById("debuff1");
var debuff2 = document.getElementById("debuff2");
var debuff3 = document.getElementById("debuff3");
var debuff4 = document.getElementById("debuff4");
var debuff5 = document.getElementById("debuff5");
var debuff51 = document.getElementById("debuff5-1");
var debuff52 = document.getElementById("debuff5-2");
var debuff53 = document.getElementById("debuff5-3");
var debuff54 = document.getElementById("debuff5-4");
var debuff6 = document.getElementById("debuff6");
var debuff61 = document.getElementById("debuff6-1");
var debuff62 = document.getElementById("debuff6-2");
var debuff63 = document.getElementById("debuff6-3");
var debuff64 = document.getElementById("debuff6-4");
var debuff65 = document.getElementById("debuff6-5");
var debuff66 = document.getElementById("debuff6-6");
var debuff67 = document.getElementById("debuff6-7");
var debuff68 = document.getElementById("debuff6-8");
var debuff69 = document.getElementById("debuff6-9");
var debuff610 = document.getElementById("debuff6-10");
var buff1 = document.getElementById("buff1");
var buff2 = document.getElementById("buff2");
var buff3 = document.getElementById("buff3");
var buff4 = document.getElementById("buff4");
var buff5 = document.getElementById("buff5");
var buff51 = document.getElementById("buff5-1");
var buff52 = document.getElementById("buff5-2");
var buff53 = document.getElementById("buff5-3");
var buff54 = document.getElementById("buff5-4");
var buff6 = document.getElementById("buff6");

var correctGuesses = 0;
var incorrectGuesses = 0;
var lugubriousIncorrectGuesses = 0;

const superstitionBuffs = [
    'Nothing happens.',
    'Gain 1000 - 5000 points this round.',
    'Remove 1 - 4 random Filters. Starts from the 2 round.',
    'Set your score to 5000 - 25000 randomly.',
    'Gain 1000 points for each guess equal or higher than 3500 points.',
    'Gain 1000 points for each guess with distance lower than 40m.',
    'Double your score for each correct guess.',
    'For every 10m from the correct location, gain 100 points, up to 100m.',
    'Remove 1 - 4 random Debuffs.',
    'Apply 1 - 4 random Buffs.',
    '50% chance to gain 25000 points.',
    'Apply Strict. For every correct guess, gain a stack of Strict. Gain 5000 points for every 5 stack of Strict.',
    'Apply Bliss. For every guess, there is a 5% chance to receive one of following: "25000 points, apply 1 Buff, remove 1 Debuff".',
];
const superstitionDebuffs = [
    'Nothing happens.',
    'Apply 1 - 4 random Filters. Starts from the 2 round.',
    'Deduct 1000 - 5000 points this round.',
    'Deduct 1000 points for each guess lower than 2500 points.',
    'Deduct 1000 points for each guess with distance higher than 25m. Incorrect guess will also deduct points this way.',
    'Instant game over if your guess is lower than 2500 points.',
    'Instant game over if your distance is higher than 50m. Incorrect guess will also trigger this effect.',
    'Remove 1 - 4 random Buffs.',
    'Apply 1 - 4 random Debuffs.',
    '50% chance to lose 25000 points.',
    'Literally restarts your game.',
    'Apply Erroneous. For every incorrect guess, gain a stack of Erroneous. Deduct 10000 points for every 5 stack of Erroneous.',
    'Apply Lugubrious. For every incorrect guess, gain a stack of Lugubrious. Deduct 500 points every round for each stack, up to 10 stacks. Every guess equal or greater than 2500 points removes 1 stack.',
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

var buff1effect = function() {
    if (score >= 3500) {
        currentScore += 1000;
    }
    updateRoundInfo();
}
var buff2effect = function() {
    if (distance < 40) {
        currentScore += 1000;
    }
    updateRoundInfo();
}
var buff3effect = function() {
    updateScore();
    updateRoundInfo();
}
var buff4effect = function() {
    if (score > 0) {
        currentScore += Math.floor(Math.min(Math.abs(distance), 100) / 10) * 100;
        updateRoundInfo();
    }
}
var buff5effect = function() {
    if (score > 0) {
        correctGuesses++;
    }

    var buffs = [buff5, buff51, buff52, buff53, buff54];

    for (var i = 0; i < buffs.length; i++) {
        buffs[i].style.display = i === correctGuesses ? 'block' : 'none';
    }

    if (correctGuesses === 5) {
        buff5.style.display = 'block';
        buffs.slice(1).forEach(function(buff) {
            buff.style.display = 'none';
        });
        currentScore += 5000;
        correctGuesses = 0;
    }

    updateRoundInfo();
}
var buff6effect = function() {
    var random = Math.floor(Math.random() * 100) + 1;

    // There is a 5% chance for the effect to trigger
    if (random <= 5) {
        var effect = Math.floor(Math.random() * 4); 

        switch (effect) {
            case 0:
                currentScore += 25000;
                break;
            case 1:
                addRandomBuff(1);
                break;
            case 2:
                removeRandomDebuff(1);
                break;
        }
    }
    updateRoundInfo();
}
var debuff1effect = function() {
    if (score < 2500) {
        currentScore -= 1000;
    }
    updateRoundInfo();
}
var debuff2effect = function() {
    if (distance > 25 || score < 1) {
        currentScore -= 1000;
    }
    updateRoundInfo();
}
var debuff3effect = function() {
    if (score < 2500) {
        nextRoundButton.classList.add('view-result');
        nextRoundButton.innerText = 'View Result';
    }
    updateRoundInfo();
}
var debuff4effect = function() {
    if (distance > 50 || score < 1) {
        nextRoundButton.classList.add('view-result');
        nextRoundButton.innerText = 'View Result';
    }
    updateRoundInfo();
}

var debuff5effect = function() {
    if (score == 0) {
        incorrectGuesses++;
    }

    var debuffs = [debuff5, debuff51, debuff52, debuff53, debuff54];

    for (var i = 0; i < debuffs.length; i++) {
        debuffs[i].style.display = i === incorrectGuesses ? 'block' : 'none';
    }

    if (incorrectGuesses === 5) {
        debuff5.style.display = 'block';
        debuffs.slice(1).forEach(function(debuff) {
            debuff.style.display = 'none';
        });
        currentScore -= 10000;
        incorrectGuesses = 0;
    }

    updateRoundInfo();
}

var debuff6effect = function() {
    if (score == 0 && lugubriousIncorrectGuesses < 10) {
        lugubriousIncorrectGuesses++;
    } else if (score >= 2500 && lugubriousIncorrectGuesses > 0) {
        lugubriousIncorrectGuesses--;
    }

    var debuffs = [debuff6, debuff61, debuff62, debuff63, debuff64, debuff65, debuff66, debuff67, debuff68, debuff69, debuff610];

    for (var i = 0; i < debuffs.length; i++) {
        debuffs[i].style.display = i === lugubriousIncorrectGuesses ? 'block' : 'none';
        currentScore -= 500;
    }

    updateRoundInfo();
}

let buff1Active = false;
let buff2Active = false;
let buff3Active = false;
let buff4Active = false;
let buff5Active = false;
let buff6Active = false;
let debuff1Active = false;
let debuff2Active = false;
let debuff3Active = false;
let debuff4Active = false;
let debuff5Active = false;
let debuff6Active = false;

function applyBuffEffect(buff) {
    const checkedCheckboxes = [BAWCheckbox, InvertCheckbox, PixelateCheckbox, ScrambleCheckbox].filter(checkbox => checkbox.checked);
  
    if (buff === 'Gain 1000 - 5000 points this round.') {
        currentScore += Math.floor(Math.random() * 4000) + 1000;
        updateRoundInfo();
    } else if (buff === 'Remove 1 - 4 random Filters. Starts from the 2 round.') {
        var randomCount = Math.floor(Math.random() * 4) + 1;
        removeRandomFilter(randomCount, checkedCheckboxes);
    } else if (buff === 'Set your score to 5000 - 25000 randomly.') {
        currentScore = Math.floor(Math.random() * 20000) + 5000;
        updateRoundInfo();
    } else if (buff === 'Gain 1000 points for each guess equal or higher than 3500 points.' && !buff1Active) {
        buff1Active = true;
        buff1.style.display = 'block';
        guessButton.addEventListener('click', buff1effect);
    } else if (buff === 'Gain 1000 points for each guess with distance lower than 40m.' && !buff2Active) {
        buff2Active = true;
        buff2.style.display = 'block';
        guessButton.addEventListener('click', buff2effect);
    } else if (buff === 'Double your score for each correct guess.' && !buff3Active) {
        buff3Active = true;
        buff3.style.display = 'block';
        guessButton.addEventListener('click', buff3effect);
    } else if (buff === 'For every 10m from the correct location, gain 100 points, up to 100m.' && !buff4Active) {
        buff4Active = true;
        buff4.style.display = 'block';
        guessButton.addEventListener('click', buff4effect);
    } else if (buff === 'Remove 1 - 4 random Debuffs.') {
        var randomCount = Math.floor(Math.random() * 4) + 1;
        removeRandomDebuff(randomCount);
    } else if (buff === 'Apply 1 - 4 random Buffs.') {
        var randomCount = Math.floor(Math.random() * 4) + 1;
        addRandomBuff(randomCount);
    } else if (buff === '50% chance to gain 5000 points.') {
        if (Math.random() < 0.5) {
            currentScore += 25000;
        }
        updateRoundInfo();
    } else if (buff === 'Apply Strict. For every correct guess, gain a stack of Strict. Gain 5000 points for every 5 stack of Strict.') {
        buff5Active = true;
        guessButton.addEventListener('click', buff5effect);
    } else if (buff === 'Apply Bliss. For every guess, there is a 5% chance to receive one of following: "25000 points, apply 1 Buff, remove 1 Debuff".') {
        buff6Active = true;
        buff6.style.display = 'block';
        guessButton.addEventListener('click', buff6effect);
    }
}

function applyDebuffEffect(debuff) {
    if (debuff === 'Apply 1 - 4 random Filters. Starts from the 2 round.') {
        var randomCount = Math.floor(Math.random() * 4) + 1;
        addRandomFilter(randomCount);
    } else if (debuff === 'Deduct 1000 - 5000 points this round.') {
        currentScore -= Math.floor(Math.random() * 4000) + 1000;
        updateRoundInfo();
    } else if (debuff === 'Deduct 1000 points for each guess lower than 2500 points.' && !debuff1Active) {
        debuff1Active = true;
        debuff1.style.display = 'block';
        guessButton.addEventListener('click', debuff1effect);
    } else if (debuff === 'Deduct 1000 points for each guess with distance higher than 25m. Incorrect guess will also deduct points this way.' && !debuff2Active) {
        debuff2Active = true;
        debuff2.style.display = 'block';
        guessButton.addEventListener('click', debuff2effect);
    } else if (debuff === 'Instant game over if your guess is lower than 2500 points.' && !debuff3Active) {
        debuff3Active = true;
        debuff3.style.display = 'block';
        guessButton.addEventListener('click', debuff3effect);
    } else if (debuff === 'Instant game over if your distance is higher than 50m. Incorrect guess will also trigger this effect.' && !debuff4Active) {
        debuff4Active = true;
        debuff4.style.display = 'block';
        guessButton.addEventListener('click', debuff4effect);
    } else if (debuff === 'Remove 1 - 4 random Buffs.') {
        var randomCount = Math.floor(Math.random() * 4) + 1;
        removeRandomBuff(randomCount);
    } else if (debuff === 'Apply 1 - 4 random Debuffs.') {
        var randomCount = Math.floor(Math.random() * 4) + 1;
        addRandomDebuff(randomCount);
    } else if (debuff === '50% chance to lose 5000 points.') {
        if (Math.random() < 0.5) {
            currentScore -= 25000;
            updateRoundInfo();
        }
    } else if (debuff === 'Literally restarts your game.') {
        location.reload();
    } else if (debuff === 'Apply Erroneous. For every incorrect guess, gain a stack of Erroneous. Deduct 10000 points for every 5 stack of Erroneous.') {
        debuff5Active = true;
        guessButton.addEventListener('click', debuff5effect);
    } else if (debuff === 'Apply Lugubrious. For every incorrect guess, gain a stack of Lugubrious. Deduct 500 points every round for each stack, up to 10 stacks. Every guess equal or greater than 2500 points removes 1 stack.') {
        debuff6Active = true;
        guessButton.addEventListener('click', debuff6effect);
    }
}

function removeRandomFilter(count, checkedCheckboxes) {
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

function addRandomFilter(count) {
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

function removeRandomDebuff(count) {
    var debuffs = [
        { active: debuff1Active, style: debuff1, effect: debuff1effect },
        { active: debuff2Active, style: debuff2, effect: debuff2effect },
        { active: debuff3Active, style: debuff3, effect: debuff3effect },
        { active: debuff4Active, style: debuff4, effect: debuff4effect },
        { active: debuff5Active, style: debuff5, effect: debuff5effect },
        { active: debuff6Active, style: debuff6, effect: debuff6effect }
    ];
  
    // Filter active debuffs
    var activeDebuffs = debuffs.filter(function(debuff) {
        return debuff.active;
    });
  
    // Randomly select and remove debuffs
    for (var i = 0; i < count; i++) {
      if (activeDebuffs.length > 0) {
        var randomIndex = Math.floor(Math.random() * activeDebuffs.length);
        var debuffRemove = activeDebuffs[randomIndex];
        
        debuffRemove.active = false;
        debuffRemove.style.style.display = 'none';
        guessButton.removeEventListener('click', debuffRemove.effect);
        activeDebuffs.splice(randomIndex, 1);
        }
    }

    if (debuff5.style.display = 'none') {
        debuff51.style.display = 'none';
        debuff52.style.display = 'none';
        debuff53.style.display = 'none';
        debuff54.style.display = 'none';
    }
}

function removeRandomBuff(count) {
    var buffs = [
        { active: buff1Active, style: buff1, effect: buff1effect },
        { active: buff2Active, style: buff2, effect: buff2effect },
        { active: buff3Active, style: buff3, effect: buff3effect },
        { active: buff4Active, style: buff4, effect: buff4effect },
        { active: buff5Active, style: buff5, effect: buff5effect },
        { active: buff6Active, style: buff6, effect: buff6effect }
    ];
  
    // Filter active debuffs
    var activeBuffs = buffs.filter(function(buff) {
        return buff.active;
    });
  
    // Randomly select and remove debuffs
    for (var i = 0; i < count; i++) {
        if (activeBuffs.length > 0) {
            var randomIndex = Math.floor(Math.random() * activeBuffs.length);
            var buffRemove = activeBuffs[randomIndex];
            
            buffRemove.active = false;
            buffRemove.style.style.display = 'none';
            guessButton.removeEventListener('click', buffRemove.effect);
            activeBuffs.splice(randomIndex, 1);
        }
    }

    if (buff5.style.display = 'none') {
        buff51.style.display = 'none';
        buff52.style.display = 'none';
        buff53.style.display = 'none';
        buff54.style.display = 'none';
    }
}

function addRandomDebuff(count) {
    var debuffs = [
        { active: debuff1Active, style: debuff1, effect: debuff1effect },
        { active: debuff2Active, style: debuff2, effect: debuff2effect },
        { active: debuff3Active, style: debuff3, effect: debuff3effect },
        { active: debuff4Active, style: debuff4, effect: debuff4effect },
        { active: debuff5Active, style: debuff5, effect: debuff5effect },
        { active: debuff6Active, style: debuff6, effect: debuff6effect }
    ];
  
    var inactiveDebuffs = debuffs.filter(function(debuff) {
        return !debuff.active;
    });
  
    for (var i = 0; i < count; i++) {
        if (inactiveDebuffs.length > 0) {
            var randomIndex = Math.floor(Math.random() * inactiveDebuffs.length);
            var debuffToAdd = inactiveDebuffs[randomIndex];
    
            debuffToAdd.active = true;
            debuffToAdd.style.style.display = 'block';
            guessButton.addEventListener('click', debuffToAdd.effect);
            inactiveDebuffs.splice(randomIndex, 1);
        }
    }
}

function addRandomBuff(count) {
    var buffs = [
        { active: buff1Active, style: buff1, effect: buff1effect },
        { active: buff2Active, style: buff2, effect: buff2effect },
        { active: buff3Active, style: buff3, effect: buff3effect },
        { active: buff4Active, style: buff4, effect: buff4effect },
        { active: buff5Active, style: buff5, effect: buff5effect },
        { active: buff6Active, style: buff6, effect: buff6effect }
    ];
  
    var inactiveBuffs = buffs.filter(function(buff) {
        return !buff.active;
    });
  
    for (var i = 0; i < count; i++) {
        if (inactiveBuffs.length > 0) {
            var randomIndex = Math.floor(Math.random() * inactiveBuffs.length);
            var buffToAdd = inactiveBuffs[randomIndex];
    
            buffToAdd.active = true;
            buffToAdd.style.style.display = 'block';
            guessButton.addEventListener('click', buffToAdd.effect);
            inactiveBuffs.splice(randomIndex, 1);
        }
    }
}