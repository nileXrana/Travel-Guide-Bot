const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create a colorful travel-themed icon (a globe with airplane)
const size = 512;
const centerX = size / 2;
const centerY = size / 2;
const radius = size * 0.4;

// Create a simple SVG for the favicon
const svgIcon = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Blue background circle (globe) -->
  <circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="#2196F3" />
  
  <!-- Longitude/latitude lines -->
  <path d="M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}" stroke="white" stroke-width="4" fill="none" />
  <path d="M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 0 ${centerX + radius} ${centerY}" stroke="white" stroke-width="4" fill="none" />
  <path d="M ${centerX} ${centerY - radius} A ${radius} ${radius} 0 0 1 ${centerX} ${centerY + radius}" stroke="white" stroke-width="4" fill="none" />
  <path d="M ${centerX} ${centerY - radius} A ${radius} ${radius} 0 0 0 ${centerX} ${centerY + radius}" stroke="white" stroke-width="4" fill="none" />
  
  <!-- Airplane silhouette -->
  <path d="M ${centerX - radius * 0.6} ${centerY - radius * 0.3} 
           L ${centerX + radius * 0.6} ${centerY - radius * 0.1}
           L ${centerX + radius * 0.5} ${centerY}
           L ${centerX + radius * 0.6} ${centerY + radius * 0.1}
           L ${centerX - radius * 0.6} ${centerY + radius * 0.3}
           L ${centerX - radius * 0.4} ${centerY}
           Z" fill="#FF5722" />
</svg>
`;

// Ensure the directories exist
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Write SVG to a file
fs.writeFileSync('public/travel-favicon.svg', svgIcon);

// Create various sizes of PNG icons
const sizes = [16, 32, 48, 64, 128, 192, 256, 512];

async function generateIcons() {
  // Convert SVG to PNG in different sizes
  for (const size of sizes) {
    await sharp(Buffer.from(svgIcon))
      .resize(size, size)
      .png()
      .toFile(`public/favicon-${size}x${size}.png`);
  }

  // For favicon.ico, we'll use the 32x32 PNG file
  // (Most browsers will use favicon.ico from the root if no other icon is specified)
  await sharp(Buffer.from(svgIcon))
    .resize(32, 32)
    .png()
    .toFile('public/favicon.png');
  
  // Copy the 32x32 PNG to favicon.ico (this is a simple renaming solution)
  fs.copyFileSync('public/favicon-32x32.png', 'public/favicon.ico');

  console.log('Favicon files generated successfully!');
}

generateIcons().catch(err => console.error('Error generating icons:', err)); 