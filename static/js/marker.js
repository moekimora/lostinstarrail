let starrailMarker = null;
let resultMapMarker = null;
let correctMarker = null;
let line = null;

const customIcon = L.icon({
    iconUrl: 'static/media/icons/z-marker2.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});
const icon = L.icon({
    iconUrl: 'static/media/icons/z-marker.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});
const addMarker = latlng => {
    removeMarker();
    starrailMarker = L.marker(latlng, { icon }).addTo(starrailMap);
    if (currentMap === currentMapLocation) {
        resultMapMarker = L.marker(latlng, { icon }).addTo(resultMap);
        resultMapMarker.bindTooltip("Your guess", { className: 'guess-tooltip', maxWidth: 200 });
        if (correctMarker) {
            drawLine(resultMapMarker.getLatLng(), correctMarker.getLatLng());
        }
    }
};
const removeMarker = () => {
    if (starrailMarker) {
        starrailMap.removeLayer(starrailMarker);
        starrailMarker = null;
    }
    if (resultMapMarker) {
        resultMap.removeLayer(resultMapMarker);
        resultMapMarker = null;
    }
    removeLine();
};
const drawLine = (startLatLng, endLatLng) => {
    removeLine();
    line = L.polyline([startLatLng, endLatLng], { color: 'red', dashArray: '6 , 6' }).addTo(resultMap);
};
const removeLine = () => {
    if (line) {
        resultMap.removeLayer(line);
        line = null;
    }
};
const onMapClick = e => {
    addMarker(e.latlng);
    guessButton.classList.add('has-marker');
};
starrailMap.on('click', onMapClick);
function handleMarker() {
  if (!currentImage) return;

  // Remove previous correct marker (if any)
  if (correctMarker) {
    try { resultMap.removeLayer(correctMarker); } catch (e) { /* ignore */ }
    correctMarker = null;
  }

  // Create and add correct marker
  correctMarker = L.marker([currentImage.lat, currentImage.lng], { icon: customIcon }).addTo(resultMap);
  correctMarker.bindTooltip("Click to see image", { className: 'guess-tooltip', maxWidth: 200 });

  // Helper to open preview: prefer existing openImagePreview, otherwise fallback to window.open
  const openPreview = (typeof openImagePreview === 'function')
    ? openImagePreview
    : function(src, alt = '') { if (!src) return; window.open(src, '_blank'); };

  // Make the marker clickable to show the currentImage
  correctMarker.on('click', () => {
    const src = currentImage && (currentImage.imageUrl || currentImage.url || currentImage.src);
    try {
      openPreview(src, `Round ${currentRound || ''}`);
    } catch (err) {
      console.warn('Error opening image preview:', err);
      if (src) window.open(src, '_blank');
    }
  });

  // Try to set pointer cursor on the marker's DOM element (may be undefined until after render)
  setTimeout(() => {
    try {
      const el = correctMarker && correctMarker.getElement && correctMarker.getElement();
      if (el) el.style.cursor = 'pointer';
    } catch (e) { /* ignore */ }
  }, 40);

  // If user already placed a resultMapMarker (their guess), draw line and fly to midpoint
  if (resultMapMarker) {
    drawLine(resultMapMarker.getLatLng(), correctMarker.getLatLng());

    // Calculate midpoint
    const midLat = (resultMapMarker.getLatLng().lat + correctMarker.getLatLng().lat) / 2;
    const midLng = (resultMapMarker.getLatLng().lng + correctMarker.getLatLng().lng) / 2;
    const midPoint = L.latLng(midLat, midLng);

    // Calculate distance (meters according to your calculateDistance)
    const d = calculateDistance(
      resultMapMarker.getLatLng().lat,
      resultMapMarker.getLatLng().lng,
      correctMarker.getLatLng().lat,
      correctMarker.getLatLng().lng
    );

    // Zoom logic (same thresholds as before)
    const getZoomLevel = (distance) => {
      if (distance < 1.5) return 5;
      if (distance < 5) return 4;
      if (distance < 35) return 3;
      if (distance < 70) return 2;
      if (distance < 100) return 1;
      return resultMap.getZoom();
    };
    const zoomLevel = getZoomLevel(d);

    // Fly to midpoint
    resultMap.flyTo(midPoint, zoomLevel, {
      animate: true,
      duration: 1
    });
  }
}

guessButton.addEventListener('click', handleMarker);

nextRoundButton.addEventListener('click', () => {
    if (currentImage) {
        resultMap.removeLayer(correctMarker);
        resultMap.removeLayer(resultMapMarker);
        correctMarker = null;
        resultMapMarker = null;
        removeLine();
    }
});
