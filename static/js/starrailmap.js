var starrailMap = L.map('starrailmap', {
    minZoom: 0,
    maxZoom: 4,
    maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
    maxBoundsViscosity: 1
    }).setView([0, 0], 0);

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
    name: 'Pillars Of Creation',
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
];

var currentMap = overlays[0].name; // Default to first map

function toggleMapVisibility(index) {
overlays.forEach(function (overlay, i) {
    overlay.visible = (i === index);
    overlay.overlay.setOpacity(overlay.visible ? 1 : 0);
});
currentMap = overlays[index].name;
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

addClickListener('.j6-ad-b1', 7);
addClickListener('.j6-ad-f1', 8);
addClickListener('.j6-osp', 9);
addClickListener('.j6-bp', 10);
addClickListener('.j6-sgrz', 11);
addClickListener('.j6-cofe', 12);
addClickListener('.j6-eh', 13);
addClickListener('.j6-poc', 14);
addClickListener('.j6-owtg-f1', 15);
addClickListener('.j6-owtg-f2', 16);
addClickListener('.j6-bt', 17);
addClickListener('.j6-gm', 18);
addClickListener('.j6-rt-f1', 19);
addClickListener('.j6-rt-f2', 20);
addClickListener('.j6-rs-f1', 21);
addClickListener('.j6-rs-f2', 22);

addClickListener('.txl-csh', 23);
addClickListener('.txl-c-f1', 24);
addClickListener('.txl-c-f2', 25);
addClickListener('.txl-sn', 26);
addClickListener('.txl-es', 27);
addClickListener('.txl-aa', 28);
addClickListener('.txl-dc-f1', 29);
addClickListener('.txl-dc-f2', 30);
addClickListener('.txl-arc', 31);
addClickListener('.txl-fg', 32);
addClickListener('.txl-ac-f1', 33);
addClickListener('.txl-ac-f2', 34);
addClickListener('.txl-sw', 35);


overlays.forEach(function (overlay) {
overlay.overlay = L.imageOverlay(overlay.imageUrl, overlay.bounds).addTo(starrailMap);
});

toggleMapVisibility(0);