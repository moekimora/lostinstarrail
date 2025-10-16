// starrailmap.js — lazy-load overlays to avoid startup lag

function initialize(map, options = {}) {
  const {
    minZoom = 0,
    maxZoom = 5,
    startZoom = 0
  } = options;

  return L.map(map, {
    minZoom,
    maxZoom,
    maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
    maxBoundsViscosity: 1,
    attributionControl: false,
  }).setView([0, 0], startZoom);
}

// usage:
var starrailMap = initialize('starrailmap'); // defaults to 0
var resultMap = initialize('resultmap', { minZoom: 1, startZoom: 1 });


const bounds = [[-90, -180], [90, 180]];

// Overlay descriptors — overlay property will be created lazily
function addOverlay(name, imageUrl) {
  return {
    name: name,
    imageUrl: imageUrl,
    bounds: bounds,
    visible: false,
    overlay: null,      // will hold L.imageOverlay instance when created
    preloaded: false    // used by optional hover-preload
  };
}

var overlays = [
  addOverlay('Master Control Zone', 'starrailmap/hst/hst-1.png'),
  addOverlay('Base Zone', 'starrailmap/hst/hst-2.png'),
  addOverlay('Storage Zone - B1', 'starrailmap/hst/hst-3b1.png'),
  addOverlay('Storage Zone - F1', 'starrailmap/hst/hst-3f1.png'),
  addOverlay('Storage Zone - F2', 'starrailmap/hst/hst-3f2.png'),
  addOverlay('Supply Zone - F1', 'starrailmap/hst/hst-4f1.png'),
  addOverlay('Supply Zone - F2', 'starrailmap/hst/hst-4f2.png'),
  addOverlay('Seclusion Zone - F1', 'starrailmap/hst/hst-5f1.png'),
  addOverlay('Seclusion Zone - F2', 'starrailmap/hst/hst-5f2.png'),
  addOverlay('Seclusion Zone - F3', 'starrailmap/hst/hst-5f3.png'),
  addOverlay('Administrative District - B1', 'starrailmap/j6/j6-1b1.png'),
  addOverlay('Administrative District - F1', 'starrailmap/j6/j6-1f1.png'),
  addOverlay('Outlying Snow Plains', 'starrailmap/j6/j6-2.png'),
  addOverlay('Backwater Pass', 'starrailmap/j6/j6-3.png'),
  addOverlay('Silvermane Guards Restricted Zone', 'starrailmap/j6/j6-4.png'),
  addOverlay('Corridor of Fading Echoes', 'starrailmap/j6/j6-5.png'),
  addOverlay('Everwinter Hill', 'starrailmap/j6/j6-6.png'),
  addOverlay('Pillars of Creation', 'starrailmap/j6/j6-7.png'),
  addOverlay('Old Weapon Testing Ground - F1', 'starrailmap/j6/j6-8f1.png'),
  addOverlay('Old Weapon Testing Ground - F2', 'starrailmap/j6/j6-8f2.png'),
  addOverlay('Boulder Town', 'starrailmap/j6/j6-9.png'),
  addOverlay('Great Mine', 'starrailmap/j6/j6-10.png'),
  addOverlay('Rivet Town - F1', 'starrailmap/j6/j6-11f1.png'),
  addOverlay('Rivet Town - F2', 'starrailmap/j6/j6-11f2.png'),
  addOverlay('Robot Settlement - F1', 'starrailmap/j6/j6-12f1.png'),
  addOverlay('Robot Settlement - F2', 'starrailmap/j6/j6-12f2.png'),
  addOverlay('Central Starskiff Haven', 'starrailmap/txl/txl-1.png'),
  addOverlay('Cloudford - F1', 'starrailmap/txl/txl-2f1.png'),
  addOverlay('Cloudford - F2', 'starrailmap/txl/txl-2f2.png'),
  addOverlay('Stargazer Navalia', 'starrailmap/txl/txl-3.png'),
  addOverlay('Exalting Sanctum', 'starrailmap/txl/txl-4.png'),
  addOverlay('Aurum Alley', 'starrailmap/txl/txl-5.png'),
  addOverlay('Divination Commission - F1', 'starrailmap/txl/txl-6f1.png'),
  addOverlay('Divination Commission - F2', 'starrailmap/txl/txl-6f2.png'),
  addOverlay('Artisanship Commission', 'starrailmap/txl/txl-7.png'),
  addOverlay('Fyxestroll Garden', 'starrailmap/txl/txl-8.png'),
  addOverlay('Alchemy Commission - F1', 'starrailmap/txl/txl-9f1.png'),
  addOverlay('Alchemy Commission - F2', 'starrailmap/txl/txl-9f2.png'),
  addOverlay('Scalegorge Waterscape', 'starrailmap/txl/txl-10.png'),
  addOverlay('The Shackling Prison - F1', 'starrailmap/txl/txl-11f1.png'),
  addOverlay('The Shackling Prison - B1', 'starrailmap/txl/txl-11b1.png'),
  addOverlay('The Shackling Prison - B2', 'starrailmap/txl/txl-11b2.png'),
  addOverlay('The Shackling Prison - B3', 'starrailmap/txl/txl-11b3.png'),
  addOverlay('The Shackling Prison - B4', 'starrailmap/txl/txl-11b4.png'),
  addOverlay('Skysplitter - F1', 'starrailmap/txl/txl-12f1.png'),
  addOverlay('Skysplitter - F2', 'starrailmap/txl/txl-12f2.png'),
  addOverlay('Skysplitter - F3', 'starrailmap/txl/txl-12f3.png')
];

// keep track of which overlay is currently shown
var currentOverlayIndex = null;
var currentMap = null;
var resultMapOverlay = null;

// Toggle visibility — create overlay lazily and ensure only one overlay exists on map
function toggleMapVisibility(index) {
  if (index === currentOverlayIndex) return; // already visible

  // remove previous overlay if exists
  if (currentOverlayIndex !== null) {
    const prev = overlays[currentOverlayIndex];
    if (prev && prev.overlay) {
      try { prev.overlay.remove(); } catch (e) { /* ignore */ }
      // we keep the overlay reference in case you want to re-add later,
      // but removing helps memory. If you want to fully discard it:
      // prev.overlay = null;
    }
    prev.visible = false;
  }

  const item = overlays[index];
  if (!item) return;

  // create overlay only when needed
  if (!item.overlay) {
    item.overlay = L.imageOverlay(item.imageUrl, item.bounds);
  }

  item.overlay.addTo(starrailMap);
  item.overlay.setOpacity(1);
  item.visible = true;

  currentOverlayIndex = index;
  currentMap = item.name;
}

// helper that attaches click + optional hover preload safely
function addClickListener(selector, index) {
  var element = document.querySelector(selector);
  if (!element) return; // skip missing elements gracefully

  element.addEventListener('click', function () {
    toggleMapVisibility(index);
  });

  // OPTIONAL: lightweight preload on hover so switching is snappier later
  element.addEventListener('mouseenter', function () {
    const desc = overlays[index];
    if (desc && !desc.preloaded) {
      const img = new Image();
      img.src = desc.imageUrl;
      desc.preloaded = true;
    }
  });
}

// Attach listeners only for selectors that exist
var selectors = [
  '.hst-mcz', '.hst-bz', '.hst-stz-b1', '.hst-stz-f1', '.hst-stz-f2', '.hst-suz-f1',
  '.hst-suz-f2', '.hst-scz-f1', '.hst-scz-f2', '.hst-scz-f3', '.j6-ad-b1', '.j6-ad-f1', '.j6-osp',
  '.j6-bp', '.j6-sgrz', '.j6-cofe', '.j6-eh', '.j6-poc', '.j6-owtg-f1', '.j6-owtg-f2', '.j6-bt',
  '.j6-gm', '.j6-rt-f1', '.j6-rt-f2', '.j6-rs-f1', '.j6-rs-f2', '.txl-csh', '.txl-c-f1', '.txl-c-f2',
  '.txl-sn', '.txl-es', '.txl-aa', '.txl-dc-f1', '.txl-dc-f2', '.txl-arc', '.txl-fg', '.txl-ac-f1',
  '.txl-ac-f2', '.txl-sw', '.txl-tsp-f1', '.txl-tsp-b1', '.txl-tsp-b2', '.txl-tsp-b3', '.txl-tsp-b4',
  '.txl-s-f1', '.txl-s-f2', '.txl-s-f3'
];

selectors.forEach(function (selector, index) {
  addClickListener(selector, index);
});

toggleMapVisibility(0);

// Result map overlay handling on guess — unchanged logic, but ensure we remove previous
guessButton.addEventListener('click', function () {
  var selectedOverlay = overlays.find(function (overlay) {
    return overlay.name === currentMapLocation;
  });
  if (selectedOverlay) {
    var selectedMapImageUrl = selectedOverlay.imageUrl;
    if (resultMapOverlay) {
      try { resultMap.removeLayer(resultMapOverlay); } catch (e) { /* ignore */ }
      resultMapOverlay = null;
    }
    resultMapOverlay = L.imageOverlay(selectedMapImageUrl, selectedOverlay.bounds).addTo(resultMap);
    resultMapOverlay.setOpacity(1);
  }
});

// reset map zoom to 0 after each round (unchanged)
document.querySelector(".next-round").addEventListener("click", function () {
  starrailMap.setView([0, 0], 0);
  resultMap.setView([0, 0], 0);
});
