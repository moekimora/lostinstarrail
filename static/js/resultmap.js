var resultMap = L.map('resultmap', {
    minZoom: 0,
    maxZoom: 4,
    maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
    maxBoundsViscosity: 1
  }).setView([0, 0], 0);
  