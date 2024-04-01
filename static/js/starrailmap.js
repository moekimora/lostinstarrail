var starrailMap = L.map('starrailmap', {
    minZoom: 0,
    maxZoom: 5,
    maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
    maxBoundsViscosity: 1
    }).setView([0, 0], 0);


var resultMap = L.map('resultmap', {
    minZoom: 0,
    maxZoom: 5,
    maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
    maxBoundsViscosity: 1
  }).setView([0, 0], 0);

// Star Rail Map
var overlays = [
{
    name: 'Master Control Zone',
    imageUrl: 'starrailmap/hst/hst-1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Base Zone',
    imageUrl: 'starrailmap/hst/hst-2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: true,
    overlay: null
},
{
    name: 'Storage Zone - B1',
    imageUrl: 'starrailmap/hst/hst-3b1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Storage Zone - F1',
    imageUrl: 'starrailmap/hst/hst-3f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Storage Zone - F2',
    imageUrl: 'starrailmap/hst/hst-3f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Supply Zone - F1',
    imageUrl: 'starrailmap/hst/hst-4f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Supply Zone - F2',
    imageUrl: 'starrailmap/hst/hst-4f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Seclusion Zone - F1',
    imageUrl: 'starrailmap/hst/hst-5f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Seclusion Zone - F2',
    imageUrl: 'starrailmap/hst/hst-5f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Seclusion Zone - F3',
    imageUrl: 'starrailmap/hst/hst-5f3.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},

{
    name: 'Administrative District - B1',
    imageUrl: 'starrailmap/j6/j6-1b1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Administrative District - F1',
    imageUrl: 'starrailmap/j6/j6-1f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Outlying Snow Plains',
    imageUrl: 'starrailmap/j6/j6-2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Backwater Pass',
    imageUrl: 'starrailmap/j6/j6-3.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Silvermane Guards Restricted Zone',
    imageUrl: 'starrailmap/j6/j6-4.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Corridor of Fading Echoes',
    imageUrl: 'starrailmap/j6/j6-5.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Everwinter Hill',
    imageUrl: 'starrailmap/j6/j6-6.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Pillars of Creation',
    imageUrl: 'starrailmap/j6/j6-7.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Old Weapon Testing Ground - F1',
    imageUrl: 'starrailmap/j6/j6-8f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Old Weapon Testing Ground - F2',
    imageUrl: 'starrailmap/j6/j6-8f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Boulder Town',
    imageUrl: 'starrailmap/j6/j6-9.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Great Mine',
    imageUrl: 'starrailmap/j6/j6-10.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Rivet Town - F1',
    imageUrl: 'starrailmap/j6/j6-11f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Rivet Town - F2',
    imageUrl: 'starrailmap/j6/j6-11f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Robot Settlement - F1',
    imageUrl: 'starrailmap/j6/j6-12f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Robot Settlement - F2',
    imageUrl: 'starrailmap/j6/j6-12f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},

{
    name: 'Central Starskiff Haven',
    imageUrl: 'starrailmap/txl/txl-1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Cloudford - F1',
    imageUrl: 'starrailmap/txl/txl-2f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Cloudford - F2',
    imageUrl: 'starrailmap/txl/txl-2f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Stargazer Navalia',
    imageUrl: 'starrailmap/txl/txl-3.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Exalting Sanctum',
    imageUrl: 'starrailmap/txl/txl-4.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Aurum Alley',
    imageUrl: 'starrailmap/txl/txl-5.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Divination Commission - F1',
    imageUrl: 'starrailmap/txl/txl-6f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Divination Commission - F2',
    imageUrl: 'starrailmap/txl/txl-6f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Artisanship Commission',
    imageUrl: 'starrailmap/txl/txl-7.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Fyxestroll Garden',
    imageUrl: 'starrailmap/txl/txl-8.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Alchemy Commission - F1',
    imageUrl: 'starrailmap/txl/txl-9f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Alchemy Commission - F2',
    imageUrl: 'starrailmap/txl/txl-9f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Scalegorge Waterscape',
    imageUrl: 'starrailmap/txl/txl-10.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},

{
    name: 'The Reverie (Reality) - F1',
    imageUrl: 'starrailmap/p/p-1f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'The Reverie (Reality) - F2',
    imageUrl: 'starrailmap/p/p-1f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'The Reverie (Reality) - F3',
    imageUrl: 'starrailmap/p/p-1f3.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Golden Hour - F1',
    imageUrl: 'starrailmap/p/p-2f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Golden Hour - F2',
    imageUrl: 'starrailmap/p/p-2f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Golden Hour - F3',
    imageUrl: 'starrailmap/p/p-2f3.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: "Dream's Edge",
    imageUrl: 'starrailmap/p/p-3.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: "A Child's Dream",
    imageUrl: 'starrailmap/p/p-4.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'The Reverie (Dreamscape) - F1',
    imageUrl: 'starrailmap/p/p-5f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'The Reverie (Dreamscape) - F2',
    imageUrl: 'starrailmap/p/p-5f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'The Reverie (Dreamscape) - F3',
    imageUrl: 'starrailmap/p/p-5f3.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Dewlight Pavilion - F1',
    imageUrl: 'starrailmap/p/p-6f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Dewlight Pavilion - F2',
    imageUrl: 'starrailmap/p/p-6f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Dewlight Pavilion - Sandpit Model',
    imageUrl: 'starrailmap/p/p-6sm.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Clock Studios Theme Park - F1',
    imageUrl: 'starrailmap/p/p-7f1.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
{
    name: 'Clock Studios Theme Park - F2',
    imageUrl: 'starrailmap/p/p-7f2.png',
    bounds: [[-90, -180], [90, 180]],
    visible: false,
    overlay: null
},
];

var currentMap = overlays[0].name; // Default to first map

var resultMapOverlay = null; // Variable to store the current resultMap overlay

function toggleMapVisibility(index) {
  overlays.forEach(function (overlay, i) {
    overlay.visible = (i === index);
    overlay.overlay.setOpacity(overlay.visible ? 1 : 0);
  });
  currentMap = overlays[index].name;

  var selectedMapImageUrl = overlays[index].imageUrl;

  if (resultMapOverlay) {
    resultMap.removeLayer(resultMapOverlay);
  }

  resultMapOverlay = L.imageOverlay(selectedMapImageUrl, [[-90, -180], [90, 180]]).addTo(resultMap);
}


function addClickListener(selector, index) {
var element = document.querySelector(selector);
element.addEventListener('click', function () {
    toggleMapVisibility(index);
});
}

addClickListener('.hst-mcz', 0);
addClickListener('.hst-bz', 1);
addClickListener('.hst-stz-b1', 2);
addClickListener('.hst-stz-f1', 3);
addClickListener('.hst-stz-f2', 4);
addClickListener('.hst-suz-f1', 5);
addClickListener('.hst-suz-f2', 6);
addClickListener('.hst-scz-f1', 7);
addClickListener('.hst-scz-f2', 8);
addClickListener('.hst-scz-f3', 9);

addClickListener('.j6-ad-b1', 10);
addClickListener('.j6-ad-f1', 11);
addClickListener('.j6-osp', 12);
addClickListener('.j6-bp', 13);
addClickListener('.j6-sgrz', 14);
addClickListener('.j6-cofe', 15);
addClickListener('.j6-eh', 16);
addClickListener('.j6-poc', 17);
addClickListener('.j6-owtg-f1', 18);
addClickListener('.j6-owtg-f2', 19);
addClickListener('.j6-bt', 20);
addClickListener('.j6-gm', 21);
addClickListener('.j6-rt-f1', 22);
addClickListener('.j6-rt-f2', 23);
addClickListener('.j6-rs-f1', 24);
addClickListener('.j6-rs-f2', 25);

addClickListener('.txl-csh', 26);
addClickListener('.txl-c-f1', 27);
addClickListener('.txl-c-f2', 28);
addClickListener('.txl-sn', 29);
addClickListener('.txl-es', 30);
addClickListener('.txl-aa', 31);
addClickListener('.txl-dc-f1', 32);
addClickListener('.txl-dc-f2', 33);
addClickListener('.txl-arc', 34);
addClickListener('.txl-fg', 35);
addClickListener('.txl-ac-f1', 36);
addClickListener('.txl-ac-f2', 37);
addClickListener('.txl-sw', 38);

addClickListener('.p-tr-f1', 39);
addClickListener('.p-tr-f2', 40);
addClickListener('.p-tr-f3', 41);
addClickListener('.p-gh-f1', 42);
addClickListener('.p-gh-f2', 43);
addClickListener('.p-gh-f3', 44);
addClickListener('.p-de', 45);
addClickListener('.p-acd', 46);
addClickListener('.p-trd-f1', 47);
addClickListener('.p-trd-f2', 48);
addClickListener('.p-trd-f3', 49);
addClickListener('.p-dp-f1', 50);
addClickListener('.p-dp-f2', 51);
addClickListener('.p-dp-sm', 52);
addClickListener('.p-cstp-f1', 53);
addClickListener('.p-cstp-f2', 54);

overlays.forEach(function (overlay) {
overlay.overlay = L.imageOverlay(overlay.imageUrl, overlay.bounds).addTo(starrailMap);
});

toggleMapVisibility(0);

  
// Specifically reset map zoom to 0 after each round
document.querySelector(".next-round").addEventListener("click", function() {
    starrailMap.setView([0, 0], 0);
    resultMap.setView([0, 0], 0);
  });
  