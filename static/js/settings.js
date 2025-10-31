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
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  // Hours
  if (h > 0) {
    if (m === 0 && s === 0) return `${h} hr`;
    if (s === 0) return `${h} hr ${m} min`;
    return `${h} hr ${m} min ${s} sec`;
  }
  // Minutes 
  if (m > 0) {
    if (s === 0) return `${m} min`;
    return `${m} min ${s} sec`;
  }
  // Seconds
  return `${s} sec`;
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

// replace updatePlayInfo() with the version below
function escapeHtml(str) {
  return String(str).replace(/[&<>"'`=\/]/g, function (s) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;',
      '=': '&#61;',
      '/': '&#47;'
    })[s];
  });
}

function updatePlayInfo() {
  const infoEl = document.getElementById('playInfo');
  if (!infoEl) return;

  // --- Game mode detection with superstition as add-on ---
  const isStandard = getSwitchState('.standard-switch');
  const isSurvival = getSwitchState('.survival-switch');
  const isSuperstition = getSwitchState('.superstition-switch');

  let mode = 'Standard';
  if (isSurvival) mode = 'Survival';
  else if (isStandard) mode = 'Standard';
  else if (!isStandard && !isSurvival && isSuperstition) mode = 'Superstition';

  // Add-on: if superstition active with base mode, append
  if (isSuperstition && (mode === 'Standard' || mode === 'Survival')) {
    mode = `${mode} Superstition`;
  }

  // --- Time / SeeTime ---
  const timeVal = Number(document.getElementById('Time')?.value || 0);
  const seeVal = Number(document.getElementById('SeeTime')?.value || 0);

  const timeStr = timeVal > 0 ? formatTimeShort(timeVal) : 'No time limit';

  // SeeTime: if less than 10 seconds, show decimals; otherwise, normal formatting
  let seeStr;
  if (seeVal > 0) {
    if (seeVal < 10) {
      // Keep one decimal precision for short see times
      seeStr = `${parseFloat(seeVal.toFixed(2))} sec`;
    } else {
      seeStr = formatTimeShort(seeVal);
    }
  }

  // --- Filters ---
  const filterMap = [
    { sel: '.baw-switch', name: 'Black And White' },
    { sel: '.invert-switch', name: 'Invert' },
    { sel: '.pixelate-switch', name: 'Pixelate' },
    { sel: '.scramble-switch', name: 'Scramble' },
  ];
  const activeFilters = filterMap.filter(f => getSwitchState(f.sel)).map(f => f.name);

  // --- Hold / Rounds ---
  const holdActive = getSwitchState('.hold-switch');
  const holdVal = Number(document.getElementById('HoldTime')?.value || 0);
  const roundVal = Number(document.getElementById('Round')?.value || 0);

  // --- Build main info parts ---
  const mainParts = [];

  // Only include rounds if NOT Survival mode
  if (!isSurvival && roundVal > 0) {
    mainParts.push(`${roundVal} round${roundVal === 1 ? '' : 's'}`);
  }

  // Add time info
  mainParts.push(`${timeStr}`);

  // Add SeeTime if > 0
  if (seeVal > 0) mainParts.push(`${seeStr} viewing time`);

  // Add Hold if active, with value if available
  if (holdActive) {
    if (holdVal > 0) mainParts.push(`${holdVal} sec hold`);
    else mainParts.push('hold');
  }

  const mainBody = mainParts.join(', ');
  const mainText = `${mode} - ${mainBody}`;

  // --- Filters line ---
  const filtersText = activeFilters.length ? `Filters: ${activeFilters.join(', ')}` : '';

  // --- Render output safely ---
  infoEl.innerHTML =
    `<span class="play-info-main">(${escapeHtml(mainText)})</span>` +
    (filtersText ? `<span class="play-info-filters">(${escapeHtml(filtersText)})</span>` : '');
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

// Lock .play-container width to the Play button width so long one-line .play-info can't push siblings.
// Uses ResizeObserver if available and falls back to window resize.

(function keepPlayContainerFixedToButton() {
const playBtn = document.getElementById('play-button');
if (!playBtn) return;
const playContainer = playBtn.closest('.play-container');
if (!playContainer) return;

function setPlayContainerWidthBuffer(buffer = 8) {
    // Measure the rendered width of the button (includes padding)
    const rect = playBtn.getBoundingClientRect();
    const widthPx = Math.ceil(rect.width) + buffer; // small buffer so play-info sits under the button nicely
    // Lock the play container width so layout won't expand when play-info grows
    playContainer.style.width = widthPx + 'px';
    playContainer.style.minWidth = widthPx + 'px';
    playContainer.style.maxWidth = widthPx + 'px';
    // Ensure flex properties keep it stable
    playContainer.style.flex = '0 0 ' + widthPx + 'px';
}

// Initial set (defer slightly in case fonts/layout change)
function initial() {
    setTimeout(() => setPlayContainerWidthBuffer(8), 10);
}

// ResizeObserver to watch button size changes (modern browsers)
if (window.ResizeObserver) {
    try {
    const ro = new ResizeObserver(() => setPlayContainerWidthBuffer(8));
    ro.observe(playBtn);
    // Also observe the container in case styles change
    ro.observe(playContainer);
    } catch (e) {
    // fallback below
    window.addEventListener('resize', () => setPlayContainerWidthBuffer(8));
    }
} else {
    // fallback: listen to window resize
    window.addEventListener('resize', () => setPlayContainerWidthBuffer(8));
}

// React if Play text changes (MutationObserver on the button's text)
try {
    const mo = new MutationObserver(() => setPlayContainerWidthBuffer(8));
    mo.observe(playBtn, { childList: true, characterData: true, subtree: true });
} catch (e) {
    // ignore if not supported
}

// Also update after font loading (handles webfont loading)
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => setPlayContainerWidthBuffer(8)).catch(() => {});
}

// Ensure initial run after DOM content loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initial);
} else {
    initial();
}
})();