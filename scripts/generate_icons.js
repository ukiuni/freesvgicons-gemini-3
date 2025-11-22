const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/icons');
const DATA_FILE = path.join(__dirname, '../public/data.json');
const COUNT = 10000;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PALETTE = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
    '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
    '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#333333'
];

const SHAPES = ['circle', 'rect', 'triangle', 'diamond', 'ring', 'plus'];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateSVG(id, seed) {
    const bg = getRandomItem(PALETTE);
    let fg = getRandomItem(PALETTE);
    while (fg === bg) fg = getRandomItem(PALETTE); // Ensure contrast

    const shape = getRandomItem(SHAPES);
    let shapeSvg = '';

    // Center is 50, 50. Size is 100x100.
    switch (shape) {
        case 'circle':
            shapeSvg = `<circle cx="50" cy="50" r="30" fill="${fg}" />`;
            break;
        case 'rect':
            shapeSvg = `<rect x="25" y="25" width="50" height="50" rx="10" fill="${fg}" />`;
            break;
        case 'triangle':
            shapeSvg = `<polygon points="50,20 80,80 20,80" fill="${fg}" />`;
            break;
        case 'diamond':
            shapeSvg = `<polygon points="50,20 80,50 50,80 20,50" fill="${fg}" />`;
            break;
        case 'ring':
            shapeSvg = `<circle cx="50" cy="50" r="30" fill="none" stroke="${fg}" stroke-width="10" />`;
            break;
        case 'plus':
            shapeSvg = `<rect x="40" y="20" width="20" height="60" rx="5" fill="${fg}" /><rect x="20" y="40" width="60" height="20" rx="5" fill="${fg}" />`;
            break;
    }

    // Add a random rotation for more variety
    const rotation = Math.floor(Math.random() * 4) * 90;
    const transform = rotation > 0 ? ` transform="rotate(${rotation} 50 50)"` : '';

    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" fill="${bg}" rx="20" />
  <g${transform}>
    ${shapeSvg}
  </g>
</svg>`.trim();

    return {
        svg: svgContent,
        tags: [shape, 'geometric', 'simple'],
        colors: [bg, fg]
    };
}

const data = [];
const generatedSignatures = new Set();

console.log(`Generating ${COUNT} icons...`);

for (let i = 0; i < COUNT; i++) {
    const id = `icon_${String(i).padStart(5, '0')}`;
    let iconData;
    let signature;

    // Simple collision avoidance (though with this many combos, unlikely to loop forever)
    let attempts = 0;
    do {
        iconData = generateSVG(id, i);
        signature = iconData.svg; // Using full SVG content as uniqueness check is strict but effective
        attempts++;
        if (attempts > 10) break; // Give up and accept duplicate if really unlucky
    } while (generatedSignatures.has(signature));

    generatedSignatures.add(signature);

    const fileName = `${id}.svg`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), iconData.svg);

    data.push({
        id: id,
        path: `icons/${fileName}`,
        tags: iconData.tags,
        colors: iconData.colors
    });

    if (i % 1000 === 0) process.stdout.write('.');
}

fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
console.log('\nDone!');
