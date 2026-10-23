const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const originalImg = document.getElementById('originalImg');
const resultCanvas = document.getElementById('resultCanvas');
const downloadBtn = document.getElementById('downloadBtn');

let currentBlob = null;

// Click to upload
uploadArea.addEventListener('click', () => {
  fileInput.click();
});

// File input change
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) {
    processImage(file);
  }
});

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    fileInput.files = e.dataTransfer.files;
    processImage(file);
  }
});

// Process image
function processImage(file) {
  // Hide results if processing new image
  resultsSection.classList.add('hidden');
  
  // Show loading
  loadingSection.classList.remove('hidden');
  
  // Read file
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      // Display original
      originalImg.src = img.src;
      
      // Process with dithering
      setTimeout(() => {
        applyDithering(img);
      }, 100);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Apply Floyd–Steinberg dithering
function applyDithering(img) {
  // Create canvas for processing
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size (limit max size for performance, but keep reasonable)
  let width = img.width;
  let height = img.height;
  const maxSize = 2048;
  
  if (width > maxSize || height > maxSize) {
    if (width > height) {
      height = (height / width) * maxSize;
      width = maxSize;
    } else {
      width = (width / height) * maxSize;
      height = maxSize;
    }
  }
  
  canvas.width = width;
  canvas.height = height;
  
  // Draw image
  ctx.drawImage(img, 0, 0, width, height);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, width, height);
  
  // Apply dithering
  const ditheredData = applyFloydSteinbergDithering(imageData);
  
  // Put back to canvas
  ctx.putImageData(ditheredData, 0, 0);
  
  // Display result
  resultCanvas.width = width;
  resultCanvas.height = height;
  const resultCtx = resultCanvas.getContext('2d');
  resultCtx.putImageData(ditheredData, 0, 0);
  
  // Convert to blob for download
  resultCanvas.toBlob((blob) => {
    currentBlob = blob;
    
    // Hide loading
    loadingSection.classList.add('hidden');
    
    // Show results
    resultsSection.classList.remove('hidden');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 'image/png');
}

// Download
downloadBtn.addEventListener('click', () => {
  if (!currentBlob) return;
  
  const url = URL.createObjectURL(currentBlob);
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  link.download = `nordify-${timestamp}.png`;
  link.href = url;
  link.click();
  
  // Clean up
  setTimeout(() => URL.revokeObjectURL(url), 100);
});
