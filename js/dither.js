// Floyd–Steinberg dithering with Nord palette
function applyFloydSteinbergDithering(imageData) {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  
  // Create a copy to work with (we'll modify in place)
  const result = new Uint8ClampedArray(data);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      
      const oldR = result[idx];
      const oldG = result[idx + 1];
      const oldB = result[idx + 2];
      const oldA = result[idx + 3];
      
      // Find closest Nord color
      const closest = findClosestColor(oldR, oldG, oldB);
      const [newR, newG, newB] = closest.rgb;
      
      result[idx] = newR;
      result[idx + 1] = newG;
      result[idx + 2] = newB;
      // Keep alpha as is (though we'll handle transparency)
      result[idx + 3] = oldA;
      
      // Calculate error
      const errR = oldR - newR;
      const errG = oldG - newG;
      const errB = oldB - newB;
      
      // Distribute error to neighbors using Floyd–Steinberg coefficients
      // Right: 7/16
      if (x + 1 < width) {
        const nIdx = (y * width + x + 1) * 4;
        result[nIdx] += errR * 7 / 16;
        result[nIdx + 1] += errG * 7 / 16;
        result[nIdx + 2] += errB * 7 / 16;
      }
      
      // Below-left: 3/16
      if (y + 1 < height && x - 1 >= 0) {
        const nIdx = ((y + 1) * width + x - 1) * 4;
        result[nIdx] += errR * 3 / 16;
        result[nIdx + 1] += errG * 3 / 16;
        result[nIdx + 2] += errB * 3 / 16;
      }
      
      // Below: 5/16
      if (y + 1 < height) {
        const nIdx = ((y + 1) * width + x) * 4;
        result[nIdx] += errR * 5 / 16;
        result[nIdx + 1] += errG * 5 / 16;
        result[nIdx + 2] += errB * 5 / 16;
      }
      
      // Below-right: 1/16
      if (y + 1 < height && x + 1 < width) {
        const nIdx = ((y + 1) * width + x + 1) * 4;
        result[nIdx] += errR * 1 / 16;
        result[nIdx + 1] += errG * 1 / 16;
        result[nIdx + 2] += errB * 1 / 16;
      }
    }
  }
  
  return new ImageData(result, width, height);
}
