// Nord color palette
// https://www.nordtheme.com/

const NORD_PALETTE = [
  // Polar Night
  [46, 52, 64],    // nord0
  [59, 66, 82],    // nord1
  [67, 76, 94],    // nord2
  [76, 86, 106],   // nord3
  // Snow Storm
  [216, 222, 233], // nord4
  [229, 233, 240], // nord5
  [236, 239, 244], // nord6
  // Frost
  [143, 188, 187], // nord7
  [136, 192, 208], // nord8
  [129, 161, 193], // nord9
  [94, 129, 172],  // nord10
  // Aurora
  [191, 97, 106],  // nord11
  [208, 135, 112], // nord12
  [235, 203, 139], // nord13
  [163, 190, 140], // nord14
  [180, 142, 173], // nord15
];

// Convert RGB array to hex
function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1);
}

// Find closest color in Nord palette using Euclidean distance
function findClosestColor(r, g, b) {
  let minDist = Infinity;
  let closestIdx = 0;
  
  for (let i = 0; i < NORD_PALETTE.length; i++) {
    const [nr, ng, nb] = NORD_PALETTE[i];
    const dist = (r - nr) ** 2 + (g - ng) ** 2 + (b - nb) ** 2;
    if (dist < minDist) {
      minDist = dist;
      closestIdx = i;
    }
  }
  
  return {
    rgb: NORD_PALETTE[closestIdx],
    hex: rgbToHex(...NORD_PALETTE[closestIdx]),
    index: closestIdx
  };
}
