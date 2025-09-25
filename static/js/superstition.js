// Base icons
const debuff1 = document.getElementById("debuff1");
const debuff2 = document.getElementById("debuff2");
const debuff3 = document.getElementById("debuff3");
const debuff4 = document.getElementById("debuff4");
const debuff5 = document.getElementById("debuff5");
const debuff6 = document.getElementById("debuff6");

const buff1 = document.getElementById("buff1");
const buff2 = document.getElementById("buff2");
const buff3 = document.getElementById("buff3");
const buff4 = document.getElementById("buff4");
const buff5 = document.getElementById("buff5");
const buff6 = document.getElementById("buff6");

// Variant groups (lazy select all with prefix match)
const debuff5Variants = Array.from(document.querySelectorAll('[id^="debuff5-"]'));
const debuff6Variants = Array.from(document.querySelectorAll('[id^="debuff6-"]'));
const buff5Variants   = Array.from(document.querySelectorAll('[id^="buff5-"]'));

var correctGuesses = 0;
var incorrectGuesses = 0;
var lugubriousIncorrectGuesses = 0;

const superstitionBuffs = [
    'Nothing happens.',
    'Gain 1000 - 5000 points this round.',
    'Remove 1 - 4 random Filters.',
    'Set your score to 5000 - 25000 randomly.',
    'Gain 1000 points for each guess equal or higher than 3500 points.',
    'Gain 1000 points for each guess with distance lower than 40m.',
    'Double your score for each correct guess.',
    'For every 10m from the correct location, gain 100 points, up to 100m.',
    'Remove 1 - 4 random Debuffs.',
    'Apply 1 - 4 random Buffs.',
    'For every correct guess, gain a stack of Strict. Gain 5000 points for every 5 stack of Strict obtained.',
    'Ruan Mei: For every guess, there is a 50% chance to receive one of following: "25000 points, apply 1 Buff, remove 1 Debuff". This effect will be removed after triggering 1 time.',
];
const superstitionDebuffs = [
    'Nothing happens.',
    'Apply 1 - 4 random Filters.',
    'Deduct 1000 - 5000 points this round.',
    'Deduct 1000 points for each guess lower than 2500 points.',
    'Deduct 1000 points for each guess with distance higher than 25m. Incorrect guess will also deduct points this way.',
    'Instant game over if your guess is lower than 2500 points.',
    'Instant game over if your distance is higher than 50m. Incorrect guess will also trigger this effect.',
    'Remove 1 - 4 random Buffs.',
    'Apply 1 - 4 random Debuffs.',
    'For every incorrect guess, gain a stack of Erroneous. Deduct 10000 points for every 5 stack of Erroneous obtained.',
    'For every incorrect guess, gain a stack of Lugubrious. Deduct 500 points every round for each stack, up to 10 stacks. Every guess equal or greater than 2500 points removes 1 stack.',
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

/* ---------------- Buff/Debuff effect functions ---------------- */
/* ---------------- Helpers: centralized lists ---------------- */

function hideGroup(group) {
    group.forEach(el => hideIcon(el));
}

function showGroup(group, index) {
    group.forEach((el, i) => {
        if (i === index) {
            showIcon(el);  // load + show
        } else {
            hideIcon(el);
        }
    });
}

/* ---------------- Buff effect functions (return deltas) ---------------- */

var buff1effect = function() {
    if (typeof score !== 'undefined' && score >= 3500) {
        currentScore += 1000;
        updateRoundInfo();
        return 1000;
    }
    return 0;
};

var buff2effect = function() {
    if (typeof distance !== 'undefined' && distance < 40) {
        currentScore += 1000;
        updateRoundInfo();
        return 1000;
    }
    return 0;
};

var buff3effect = function() {
    if (typeof score !== 'undefined' && score > 0) {
        currentScore += score; // double round reward
        updateRoundInfo();
        return score;
    }
    return 0;
};

var buff4effect = function() {
    if (typeof distance !== 'undefined' && score > 0) {
        let add = Math.floor(Math.min(Math.abs(distance), 100) / 10) * 100;
        currentScore += add;
        updateRoundInfo();
        return add;
    }
    return 0;
};

var buff5effect = function() {
  if (typeof score !== 'undefined' && score > 0) correctGuesses++;

  showGroup([buff5, ...buff5Variants], correctGuesses);

  if (correctGuesses === 5) {
    buff5.style.display = 'block';
    hideGroup(buff5Variants);
    currentScore += 5000;
    correctGuesses = 0;
    updateRoundInfo();
    return 5000;
  }
  return 0;
}

var buff6effect = function() {
    var random = Math.floor(Math.random() * 100) + 1;
    if (random <= 50) { // 50% chance
        var effect = Math.floor(Math.random() * 3);
        let delta = 0;
        switch (effect) {
            case 0:
                currentScore += 25000;
                delta = 25000;
                break;
            case 1:
                addRandomBuff(1);
                break;
            case 2:
                removeRandomDebuff(1);
                break;
        }
        buff6Active = false;
        if (buff6) buff6.style.display = 'none';
        updateRoundInfo();
        return delta;
    }
    return 0;
};

/* ---------------- Debuff effect functions (return deltas) ---------------- */

var debuff1effect = function() {
    if (typeof score !== 'undefined' && score < 2500) {
        currentScore -= 1000;
        updateRoundInfo();
        return -1000;
    }
    return 0;
};

var debuff2effect = function() {
    if ((typeof distance !== 'undefined' && distance > 25) || typeof score === 'undefined' || score < 1) {
        currentScore -= 1000;
        updateRoundInfo();
        return -1000;
    }
    return 0;
};

var debuff3effect = function() {
    if (typeof score !== 'undefined' && score < 2500) {
        nextRoundButton.classList.add('view-result');
        nextRoundButton.innerText = 'View Result';
    }
    updateRoundInfo();
    return 0;
};

var debuff4effect = function() {
    if ((typeof distance !== 'undefined' && distance > 50) || typeof score === 'undefined' || score < 1) {
        nextRoundButton.classList.add('view-result');
        nextRoundButton.innerText = 'View Result';
    }
    updateRoundInfo();
    return 0;
};

var debuff5effect = function() {
  if (typeof score !== 'undefined' && score == 0) incorrectGuesses++;

  // 0..4 variants
  showGroup([debuff5, ...debuff5Variants], incorrectGuesses);

  if (incorrectGuesses === 5) {
    debuff5.style.display = 'block';
    hideGroup(debuff5Variants);
    currentScore -= 10000;
    incorrectGuesses = 0;
    updateRoundInfo();
    return -10000;
  }
  return 0;
}

// Example usage in debuff6effect
var debuff6effect = function() {
  if (typeof score !== 'undefined' && score == 0 && lugubriousIncorrectGuesses < 10) {
    lugubriousIncorrectGuesses++;
  } else if (typeof score !== 'undefined' && score >= 2500 && lugubriousIncorrectGuesses > 0) {
    lugubriousIncorrectGuesses--;
  }

  showGroup([debuff6, ...debuff6Variants], lugubriousIncorrectGuesses);

  if (lugubriousIncorrectGuesses > 0) {
    let penalty = -500 * lugubriousIncorrectGuesses;
    currentScore += penalty;
    updateRoundInfo();
    return penalty;
  }
  return 0;
}

/* ---------------- Central executor ---------------- */

function applyActiveBuffsAndDebuffs() {
    let deltas = [];

    buffItems.forEach(it => {
        if (it.isActive()) {
            let delta = it.effect();
            if (typeof delta === "number" && delta !== 0) deltas.push(delta);
        }
    });

    debuffItems.forEach(it => {
        if (it.isActive()) {
            let delta = it.effect();
            if (typeof delta === "number" && delta !== 0) deltas.push(delta);
        }
    });

    return deltas;
}


/* ---------------- Active flags (globals) ---------------- */
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

/* ---------------- Helpers: centralized lists ---------------- */

const buffItems = [
    { el: buff1, isActive: () => buff1Active, setActive: v => { buff1Active = v; }, effect: buff1effect, id: 'buff1' },
    { el: buff2, isActive: () => buff2Active, setActive: v => { buff2Active = v; }, effect: buff2effect, id: 'buff2' },
    { el: buff3, isActive: () => buff3Active, setActive: v => { buff3Active = v; }, effect: buff3effect, id: 'buff3' },
    { el: buff4, isActive: () => buff4Active, setActive: v => { buff4Active = v; }, effect: buff4effect, id: 'buff4' },
    { el: buff5, isActive: () => buff5Active, setActive: v => { buff5Active = v; }, effect: buff5effect, id: 'buff5' },
    { el: buff6, isActive: () => buff6Active, setActive: v => { buff6Active = v; }, effect: buff6effect, id: 'buff6' },
];

const debuffItems = [
    { el: debuff1, isActive: () => debuff1Active, setActive: v => { debuff1Active = v; }, effect: debuff1effect, id: 'debuff1' },
    { el: debuff2, isActive: () => debuff2Active, setActive: v => { debuff2Active = v; }, effect: debuff2effect, id: 'debuff2' },
    { el: debuff3, isActive: () => debuff3Active, setActive: v => { debuff3Active = v; }, effect: debuff3effect, id: 'debuff3' },
    { el: debuff4, isActive: () => debuff4Active, setActive: v => { debuff4Active = v; }, effect: debuff4effect, id: 'debuff4' },
    { el: debuff5, isActive: () => debuff5Active, setActive: v => { debuff5Active = v; }, effect: debuff5effect, id: 'debuff5' },
    { el: debuff6, isActive: () => debuff6Active, setActive: v => { debuff6Active = v; }, effect: debuff6effect, id: 'debuff6' },
];

/* ---------------- Random add/remove helpers ---------------- */


function removeRandomDebuff(count) {
    let active = debuffItems.filter(i => i.isActive());
    for (let i = 0; i < count && active.length > 0; i++) {
        const idx = Math.floor(Math.random() * active.length);
        const item = active.splice(idx, 1)[0];
        item.setActive(false);
        hideIcon(item.el);
    }
    // If base debuff5 is hidden, hide all its variants too
    if (debuff5 && debuff5.style.display === 'none') {
        hideGroup(debuff5Variants);
    }
    if (debuff6 && debuff6.style.display === 'none') {
        hideGroup(debuff6Variants);
    }
    updateRoundInfo();
}

function addRandomDebuff(count) {
    let inactive = debuffItems.filter(i => !i.isActive());
    for (let i = 0; i < count && inactive.length > 0; i++) {
        const idx = Math.floor(Math.random() * inactive.length);
        const item = inactive.splice(idx, 1)[0];
        item.setActive(true);
        showIcon(item.el);
    }
    updateRoundInfo();
}

function removeRandomBuff(count) {
    let active = buffItems.filter(i => i.isActive());
    for (let i = 0; i < count && active.length > 0; i++) {
        const idx = Math.floor(Math.random() * active.length);
        const item = active.splice(idx, 1)[0];
        item.setActive(false);
        hideIcon(item.el);
    }
    // If base buff5 is hidden, hide all its variants too
    if (buff5 && buff5.style.display === 'none') {
        hideGroup(buff5Variants);
    }
    updateRoundInfo();
}

function addRandomBuff(count) {
    let inactive = buffItems.filter(i => !i.isActive());
    for (let i = 0; i < count && inactive.length > 0; i++) {
        const idx = Math.floor(Math.random() * inactive.length);
        const item = inactive.splice(idx, 1)[0];
        item.setActive(true);
        showIcon(item.el);
    }
    updateRoundInfo();
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
    filter();
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
    filter();
}
/* ---------------- Apply Buff/Debuff Effects ---------------- */

function applyBuffEffect(buff) {
    if (buff === 'Gain 1000 - 5000 points this round.') {
        currentScore += Math.floor(Math.random() * 4000) + 1000;
        updateRoundInfo();
    } else if (buff === 'Remove 1 - 4 random Filters.') {
        var randomCount = Math.floor(Math.random() * 4) + 1;
        const checkedCheckboxes = [BAWCheckbox, InvertCheckbox, PixelateCheckbox, ScrambleCheckbox].filter(c => c && c.checked);
        removeRandomFilter(randomCount, checkedCheckboxes);
    } else if (buff === 'Set your score to 5000 - 25000 randomly.') {
        currentScore = Math.floor(Math.random() * 20000) + 5000;
        updateRoundInfo();
    } else if (buff === 'Gain 1000 points for each guess equal or higher than 3500 points.' && !buff1Active) {
        buff1Active = true; showIcon(buff1);
    } else if (buff === 'Gain 1000 points for each guess with distance lower than 40m.' && !buff2Active) {
        buff2Active = true; showIcon(buff2);
    } else if (buff === 'Double your score for each correct guess.' && !buff3Active) {
        buff3Active = true; showIcon(buff3);
    } else if (buff === 'For every 10m from the correct location, gain 100 points, up to 100m.' && !buff4Active) {
        buff4Active = true; showIcon(buff4);
    } else if (buff === 'Remove 1 - 4 random Debuffs.') {
        removeRandomDebuff(Math.floor(Math.random() * 4) + 1);
    } else if (buff === 'Apply 1 - 4 random Buffs.') {
        addRandomBuff(Math.floor(Math.random() * 4) + 1);
    } else if (buff === 'For every correct guess, gain a stack of Strict. Gain 5000 points for every 5 stack of Strict obtained.') {
        buff5Active = true; showIcon(buff5);
    } else if (buff === 'Ruan Mei: For every guess, there is a 50% chance to receive one of following: "25000 points, apply 1 Buff, remove 1 Debuff". This effect will be removed after triggering 1 time.') {
        buff6Active = true; showIcon(buff6);
    }
}

function applyDebuffEffect(debuff) {
    if (debuff === 'Apply 1 - 4 random Filters.') {
        addRandomFilter(Math.floor(Math.random() * 4) + 1);
    } else if (debuff === 'Deduct 1000 - 5000 points this round.') {
        currentScore -= Math.floor(Math.random() * 4000) + 1000;
        updateRoundInfo();
    } else if (debuff === 'Deduct 1000 points for each guess lower than 2500 points.' && !debuff1Active) {
        debuff1Active = true; showIcon(debuff1);
    } else if (debuff === 'Deduct 1000 points for each guess with distance higher than 25m. Incorrect guess will also deduct points this way.' && !debuff2Active) {
        debuff2Active = true; showIcon(debuff2);
    } else if (debuff === 'Instant game over if your guess is lower than 2500 points.' && !debuff3Active) {
        debuff3Active = true; showIcon(debuff3);
    } else if (debuff === 'Instant game over if your distance is higher than 50m. Incorrect guess will also trigger this effect.' && !debuff4Active) {
        debuff4Active = true; showIcon(debuff4);
    } else if (debuff === 'Remove 1 - 4 random Buffs.') {
        removeRandomBuff(Math.floor(Math.random() * 4) + 1);
    } else if (debuff === 'Apply 1 - 4 random Debuffs.') {
        addRandomDebuff(Math.floor(Math.random() * 4) + 1);
    } else if (debuff === 'For every incorrect guess, gain a stack of Erroneous. Deduct 10000 points for every 5 stack of Erroneous obtained.') {
        debuff5Active = true; showIcon(debuff5);
    } else if (debuff === 'For every incorrect guess, gain a stack of Lugubrious. Deduct 500 points every round for each stack, up to 10 stacks. Every guess equal or greater than 2500 points removes 1 stack.') {
        debuff6Active = true; showIcon(debuff6);
    }
}
