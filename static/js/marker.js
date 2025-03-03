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
        resultMapMarker.bindTooltip("Your guess: " + currentMap, { className: 'guess-tooltip', maxWidth: 200 });
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
guessButton.addEventListener('click', () => {
    if (currentImage) {
        if (correctMarker) {
            resultMap.removeLayer(correctMarker);
        }
        correctMarker = L.marker([currentImage.lat, currentImage.lng], { icon: customIcon }).addTo(resultMap);
        correctMarker.bindTooltip("Correct location", { className: 'guess-tooltip', maxWidth: 200 });

        if (resultMapMarker) {
            drawLine(resultMapMarker.getLatLng(), correctMarker.getLatLng());
        }
    }
});
nextRoundButton.addEventListener('click', () => {
    if (currentImage) {
        resultMap.removeLayer(correctMarker);
        correctMarker = null;
    }
});
starrailMap.on('click', onMapClick);