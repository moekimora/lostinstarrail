var marker = null;          
            function addMarker(latlng) {
                const icon = L.icon({
                    iconUrl: 'static/media/icons/z-marker.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                });

                if (marker) {
                    removeMarker();
                }

                marker = L.marker(latlng, { icon }).addTo(starrailMap);
                }

            function removeMarker() {
                if (marker) {
                    starrailMap.removeLayer(marker);
                    marker = null;
                }
            }
            function onMapClick(e) {
                addMarker(e.latlng);
                guessButton.innerText = 'Guess';
                guessButton.classList.add('has-marker');
            }

                starrailMap.on('click', onMapClick);
