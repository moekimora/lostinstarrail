var starrailMarker = null;
var resultMapMarker = null;
var correctMarker = null;
var line = null;

var customIcon = L.icon({
    iconUrl: 'static/media/icons/z-marker2.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

guessButton.addEventListener('click', function() {
    if (currentImage) {
        if (correctMarker) {
            resultMap.removeLayer(correctMarker); // Remove previous correctMarker
        }
        correctMarker = L.marker([currentImage.lat, currentImage.lng], { icon: customIcon }).addTo(resultMap);
        correctMarker.bindTooltip("Correct location", {className: 'guess-tooltip', maxWidth: 200});
        
        if (resultMapMarker) {
            drawLine(resultMapMarker.getLatLng(), correctMarker.getLatLng());
        }
    }
});

nextRoundButton.addEventListener('click', function() {
    if (currentImage) {
        resultMap.removeLayer(correctMarker);
        correctMarker = null; // Reset correctMarker when moving to the next round
    }
});

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
    
    if (currentMap === currentMapLocation) {
        // Add marker to resultMap
        resultMapMarker = L.marker(latlng, { icon }).addTo(resultMap);
        resultMapMarker.bindTooltip("Your guess: " + currentMap, {className: 'guess-tooltip', maxWidth: 200});

        if (correctMarker) {
            drawLine(resultMapMarker.getLatLng(), correctMarker.getLatLng());
        }
    }
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

    removeLine();
}

function drawLine(startLatLng, endLatLng) {
    removeLine();
    line = L.polyline([startLatLng, endLatLng], { color: 'red', dashArray: '6 , 6' }).addTo(resultMap);
}

function removeLine() {
    if (line) {
        resultMap.removeLayer(line);
        line = null;
    }
}

function onMapClick(e) {
    addMarker(e.latlng);
    guessButton.classList.add('has-marker');
}

starrailMap.on('click', onMapClick);