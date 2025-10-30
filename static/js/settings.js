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

  // Choose display mode: inputs/inline elements might want 'inline-flex'
  const displayMode = (element.tagName === 'INPUT' || element.classList.contains('switch')) ? 'inline-flex' : 'flex';

  if (element.classList.contains('active')) {
    element.style.display = displayMode;
    // small delay so transition/animation can run
    setTimeout(() => {
      element.style.opacity = '1';
      if (!element.classList.contains('settings-container')) {
        element.style.transform = 'translateY(2%)';
      }
      // Immediately update the play-info so toggles are reflected
      if (typeof updatePlayInfo === 'function') updatePlayInfo();
    }, 10);
  } else {
    element.style.opacity = '0';
    if (!element.classList.contains('settings-container')) {
      element.style.transform = 'translateY(-2%)';
    }
    // hide after animation
    setTimeout(() => {
      element.style.display = 'none';
      if (typeof updatePlayInfo === 'function') updatePlayInfo();
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

function formatTimeShort(totalSeconds) {
  totalSeconds = Number(totalSeconds) || 0;
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  if (m > 0 && s === 0) return `${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

// --------- Robust switch detection + listeners ----------

// A more robust detector: works when selector is the input itself,
// when the selector is a wrapper that contains an input, or when state
// is represented by aria/data attributes or classes.
function getSwitchState(selector) {
  const el = document.querySelector(selector);
  if (!el) return false;

  // 1) If the element *is* an input checkbox/radio, read .checked
  if (el.matches('input[type="checkbox"], input[type="radio"]')) {
    return !!el.checked;
  }

  // 2) Look for an input inside the wrapper (common pattern)
  const innerInput = el.querySelector('input[type="checkbox"], input[type="radio"]');
  if (innerInput) return !!innerInput.checked;

  // 3) ARIA attributes
  const ariaChecked = el.getAttribute('aria-checked');
  if (ariaChecked !== null) return ariaChecked === 'true';

  const ariaPressed = el.getAttribute('aria-pressed');
  if (ariaPressed !== null) return ariaPressed === 'true';

  // 4) data-* attributes (data-active="true" or data-state="1")
  if (typeof el.dataset !== 'undefined') {
    if (el.dataset.active !== undefined) {
      return el.dataset.active === 'true' || el.dataset.active === '1';
    }
    if (el.dataset.checked !== undefined) {
      return el.dataset.checked === 'true' || el.dataset.checked === '1';
    }
  }

  // 5) Common "active" / "on" / "checked" class names used by UI toggles
  if (el.classList.contains('active') || el.classList.contains('on') || el.classList.contains('checked')) {
    return true;
  }

  // 6) fallback: check specific attributes you may use
  const attr = el.getAttribute('data-state') || el.getAttribute('data-active');
  if (attr !== null) return attr === 'true' || attr === '1';

  return false;
}

// Helper: attach listeners to switches so UI changes always update label
function attachSwitchListeners() {
  const switchSelectors = [
    '.standard-switch', '.survival-switch', '.superstition-switch',
    '.invert-switch', '.pixelate-switch', '.scramble-switch', '.baw-switch', '.hold-switch'
  ];

  switchSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(wrapper => {
      if (!wrapper) return;

      // If the wrapper *is* an input, listen to it directly
      if (wrapper.matches('input[type="checkbox"], input[type="radio"]')) {
        wrapper.addEventListener('change', updatePlayInfo);
        return;
      }

      // If there's an input inside, listen to that input
      const inner = wrapper.querySelector('input[type="checkbox"], input[type="radio"]');
      if (inner) {
        inner.addEventListener('change', updatePlayInfo);
        // also keep a click on the wrapper (some code toggles wrapper class)
        wrapper.addEventListener('click', () => setTimeout(updatePlayInfo, 10));
        return;
      }

      // For pseudo-switches (no input), listen for clicks and attribute mutations
      wrapper.addEventListener('click', () => setTimeout(updatePlayInfo, 10));

      // Watch for attribute changes (class/aria/data changes) so updatePlayInfo reacts
      try {
        const mo = new MutationObserver(() => {
          // small debounce so rapid class toggles don't thrash UI
          if (attachSwitchListeners._debounce) clearTimeout(attachSwitchListeners._debounce);
          attachSwitchListeners._debounce = setTimeout(updatePlayInfo, 8);
        });
        mo.observe(wrapper, { attributes: true, attributeFilter: ['class', 'aria-checked', 'aria-pressed', 'data-active', 'data-state', 'data-checked'] });
      } catch (e) {
        // MutationObserver may fail in older browsers; click listener still helps
      }
    });
  });
}

// call once (safe to call multiple times)
attachSwitchListeners();

function updatePlayInfo() {
  const infoEl = document.getElementById('playInfo');
  if (!infoEl) return;

  // --- Game mode detection ---
  let mode = 'Standard';
  if (getSwitchState('.survival-switch')) mode = 'Survival';
  else if (getSwitchState('.superstition-switch')) mode = 'Superstition';
  else if (getSwitchState('.standard-switch')) mode = 'Standard';

  // --- Time / SeeTime ---
  const timeVal = Number(document.getElementById('Time')?.value || 0);
  const seeVal  = Number(document.getElementById('SeeTime')?.value || 0);
  const timeStr = formatTimeShort(timeVal);
  const seeStr  = formatTimeShort(seeVal);

  // --- Filters / rules ---
  const filterMap = [
    { sel: '.baw-switch',      name: 'BAW' },
    { sel: '.invert-switch',   name: 'Inverted' },
    { sel: '.pixelate-switch', name: 'Pixelated' },
    { sel: '.scramble-switch', name: 'Scrambled' },
  ];
  const activeFilters = filterMap.filter(f => getSwitchState(f.sel)).map(f => f.name);

  // --- Hold / Rounds ---
  const holdActive = getSwitchState('.hold-switch');
  const roundVal = Number(document.getElementById('Round')?.value || 0);

  // Build body items in requested order: Rounds, Time, SeeTime, Hold, Filters
  const bodyParts = [];
  if (roundVal > 0) bodyParts.push(`${roundVal} rounds`);
  bodyParts.push(timeStr);
  if (seeVal > 0) bodyParts.push(`See ${seeStr}`);
  if (holdActive) bodyParts.push('Hold');
  if (activeFilters.length) bodyParts.push(activeFilters.join(', '));

  // Final assembly with gamemode first, dash, then the body joined by spaces
  const body = bodyParts.join(', ');
  infoEl.textContent = `(${mode} - ${body})`;
}

// -------------------------
// Ensure UI changes trigger updatePlayInfo
// -------------------------
// 1) range / numeric / input wiring (keep existing listeners + ensure update)
document.querySelectorAll('input[type="range"], input[type="number"], input#Time, input#SeeTime, input#Round, #Time, #SeeTime, #Round').forEach(el => {
  if (!el) return;
  el.addEventListener('input', updatePlayInfo);
  el.addEventListener('change', updatePlayInfo);
});

// 2) switches: listen for clicks/changes (keeps working for both real inputs and pseudo-switch elements)
[
  '.standard-switch', '.survival-switch', '.superstition-switch',
  '.invert-switch', '.pixelate-switch', '.scramble-switch', '.baw-switch', '.hold-switch'
].forEach(sel => {
  const el = document.querySelector(sel);
  if (!el) return;
  if (el instanceof HTMLInputElement) el.addEventListener('change', updatePlayInfo);
  else el.addEventListener('click', () => {
    // If a non-input switch is clicked, it probably calls applyToggleEffect which already calls updatePlayInfo,
    // but call it here too to be safe.
    setTimeout(updatePlayInfo, 10);
  });
});

// 3) map clicks already call changeColor; if changeColor exists, keep it patched to call updatePlayInfo:
if (typeof changeColor === 'function') {
  const origChangeColor = changeColor;
  changeColor = function(selectedMap) {
    origChangeColor(selectedMap);
    updatePlayInfo();
  };
}

// 4) map direct click binding (safe extra)
document.querySelectorAll('.settings-map1, .settings-map2, .settings-map3, .settings-map4').forEach(mapEl => {
  if (!mapEl) return;
  mapEl.addEventListener('click', () => setTimeout(updatePlayInfo, 10));
});

// 5) make sure toggleSettings triggers update after toggles (defensive)
if (typeof toggleSettings === 'function') {
  const origToggleSettings = toggleSettings;
  toggleSettings = function() {
    origToggleSettings();
    setTimeout(updatePlayInfo, 20);
  };
}

// 6) populate on load
document.addEventListener('DOMContentLoaded', updatePlayInfo);
updatePlayInfo();