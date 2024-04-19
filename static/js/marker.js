var starrailMarker = null;
var resultMapMarker = null;

function addMarker(latlng) {
    const icon = L.icon({
        iconUrl: 'static/media/icons/z-marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });

    // Remove existing markers
    removeMarker();
    
    // Add marker to starrailMap
    starrailMarker = L.marker(latlng, { icon }).addTo(starrailMap);
    
    // Add marker to resultMap
    resultMapMarker = L.marker(latlng, { icon }).addTo(resultMap);
    resultMapMarker.bindTooltip("Your guess: " + currentMap, {className: 'guess-tooltip', maxWidth: 200});
}

function removeMarker() {
    if (starrailMarker) {
        starrailMap.removeLayer(starrailMarker);
        starrailMarker = null;
    }
    
    if (resultMapMarker) {
        resultMap.removeLayer(resultMapMarker);
        resultMapMarker = null;
    }
}

function onMapClick(e) {
    addMarker(e.latlng);
    guessButton.classList.add('has-marker');
}

starrailMap.on('click', onMapClick);