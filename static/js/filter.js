let baseCanvas = document.createElement("canvas");
let baseCtx = baseCanvas.getContext("2d");

/* ---------------- Main filter handler ---------------- */
function filter() {
    if (!imageElement) return;
    if (!originalImageUrl) originalImageUrl = imageElement.src;

    // Always redraw from original imageElement (already loaded)
    const w = imageElement.naturalWidth;
    const h = imageElement.naturalHeight;
    baseCanvas.width = w;
    baseCanvas.height = h;
    baseCtx.clearRect(0, 0, w, h);
    baseCtx.drawImage(imageElement, 0, 0, w, h);

    // Step 1: CSS filters
    let cssFilters = [];
    if (BAWCheckbox.checked) {
        cssFilters.push("grayscale(100%)");
        showIcon(filter1);
    } else hideIcon(filter1);

    if (InvertCheckbox.checked) {
        cssFilters.push("invert(100%)");
        showIcon(filter2);
    } else hideIcon(filter2);

    // Step 2: pixelate & scramble
    if (PixelateCheckbox.checked) {
        showIcon(filter3);
        applyPixelate(baseCanvas, baseCtx);
    } else hideIcon(filter3);

    if (ScrambleCheckbox.checked) {
        showIcon(filter4);
        applyScramble(baseCanvas, baseCtx);
    } else hideIcon(filter4);

    // Step 3: push result back into <img>
    const url = baseCanvas.toDataURL();
    imageElement.style.filter = cssFilters.join(" ");
    imageElement.src = url; // ⚠️ no superstition trigger
}

/* ---------------- Pixelate ---------------- */
function applyPixelate(canvas, ctx) {
    const pixelSize = 5;
    const w = canvas.width, h = canvas.height;
    let tempCanvas = document.createElement("canvas");
    let tctx = tempCanvas.getContext("2d");
    tempCanvas.width = w / pixelSize;
    tempCanvas.height = h / pixelSize;

    // downscale & upscale
    tctx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, w, h);
}

/* ---------------- Scramble ---------------- */
function applyScramble(canvas, ctx) {
    const w = canvas.width, h = canvas.height;
    const sliceW = w / 2, sliceH = h / 3;

    let slices = [
        ctx.getImageData(0, 0, sliceW, sliceH),
        ctx.getImageData(sliceW, 0, sliceW, sliceH),
        ctx.getImageData(0, sliceH, sliceW, sliceH),
        ctx.getImageData(sliceW, sliceH, sliceW, sliceH),
        ctx.getImageData(0, sliceH * 2, sliceW, sliceH),
        ctx.getImageData(sliceW, sliceH * 2, sliceW, sliceH)
    ];

    // shuffle
    for (let i = slices.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [slices[i], slices[j]] = [slices[j], slices[i]];
    }

    // redraw scrambled
    ctx.clearRect(0, 0, w, h);
    ctx.putImageData(slices[0], 0, 0);
    ctx.putImageData(slices[1], sliceW, 0);
    ctx.putImageData(slices[2], 0, sliceH);
    ctx.putImageData(slices[3], sliceW, sliceH);
    ctx.putImageData(slices[4], 0, sliceH * 2);
    ctx.putImageData(slices[5], sliceW, sliceH * 2);
}