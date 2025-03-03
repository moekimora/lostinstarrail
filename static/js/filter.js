var canvas;
function filter() {
    if (BAWCheckbox.checked) {
        imageElement.style.filter += ' grayscale()';
        filter1.style.display = "block";
    } else {
        filter1.style.display = "none";
    }
    if (InvertCheckbox.checked) {
        imageElement.style.filter += ' invert()';
        filter2.style.display = "block";
    } else {
    filter2.style.display = "none";
    }
    if (PixelateCheckbox.checked) {
    filter3.style.display = "block";
        let pixelateHandler = function() {
            const pixelSize = 5; // Adjust the pixel size as needed
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = imageElement.width;
            canvas.height = imageElement.height;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height, 0, 0, imageElement.width / pixelSize, imageElement.height / pixelSize);
            ctx.drawImage(canvas, 0, 0, imageElement.width / pixelSize, imageElement.height / pixelSize, 0, 0, imageElement.width, imageElement.height);
            imageElement.src = canvas.toDataURL();
            canvas.remove(); // Remove the canvas element after use
        };
        imageElement.addEventListener('load', pixelateHandler, { once: true });
    } else {
    filter3.style.display = "none";
    }
    if (ScrambleCheckbox.checked) {
        filter4.style.display = "block";
        let scrambleHandler = function() {
            var canvas = document.createElement('canvas');
            canvas.width = imageElement.width;
            canvas.height = imageElement.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);

            var sliceWidth = imageElement.width / 2;
            var sliceHeight = imageElement.height / 3;

            var slices = [
                ctx.getImageData(0, 0, sliceWidth, sliceHeight),
                ctx.getImageData(sliceWidth, 0, sliceWidth, sliceHeight),
                ctx.getImageData(0, sliceHeight, sliceWidth, sliceHeight),
                ctx.getImageData(sliceWidth, sliceHeight, sliceWidth, sliceHeight),
                ctx.getImageData(0, sliceHeight * 2, sliceWidth, sliceHeight),
                ctx.getImageData(sliceWidth, sliceHeight * 2, sliceWidth, sliceHeight)
            ];
            // Randomize the order of the slices
            for (var i = slices.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                [slices[i], slices[j]] = [slices[j], slices[i]];
            }
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw the randomized and flipped slices back to the canvas
            ctx.putImageData(slices[0], 0, 0);
            ctx.putImageData(slices[1], sliceWidth, 0);
            ctx.putImageData(slices[2], 0, sliceHeight);
            ctx.putImageData(slices[3], sliceWidth, sliceHeight);
            ctx.putImageData(slices[4], 0, sliceHeight * 2);
            ctx.putImageData(slices[5], sliceWidth, sliceHeight * 2);
            imageElement.src = canvas.toDataURL();
            canvas.remove();
        };
        imageElement.addEventListener('load', scrambleHandler, { once: true });
    } else {
    filter4.style.display = "none";
    }
}