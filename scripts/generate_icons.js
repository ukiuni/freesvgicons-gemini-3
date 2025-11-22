const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/icons');
const DATA_FILE = path.join(__dirname, '../public/data.json');
const COUNT = 10000;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// --- Data Definitions ---

const NOUNS = {
    'star': {
        path: '<polygon points="50,15 61,39 87,39 66,54 74,79 50,66 26,79 34,54 13,39 39,39" />',
        ja: '星'
    },
    'heart': {
        path: '<path d="M50,85 C50,85 15,55 15,30 C15,15 25,5 40,5 C48,5 50,15 50,15 C50,15 52,5 60,5 C75,5 85,15 85,30 C85,55 50,85 50,85 Z" />',
        ja: 'ハート'
    },
    'circle': {
        path: '<circle cx="50" cy="50" r="35" />',
        ja: '円'
    },
    'square': {
        path: '<rect x="20" y="20" width="60" height="60" rx="5" />',
        ja: '四角'
    },
    'triangle': {
        path: '<polygon points="50,15 85,80 15,80" />',
        ja: '三角'
    },
    'diamond': {
        path: '<polygon points="50,10 90,50 50,90 10,50" />',
        ja: 'ダイヤ'
    },
    'cloud': {
        path: '<path d="M25,60 A15,15 0 0,1 35,35 A20,20 0 0,1 65,35 A15,15 0 0,1 75,60 Z" />',
        ja: '雲'
    },
    'moon': {
        path: '<path d="M40,10 A30,30 0 1,0 70,70 A20,20 0 1,1 40,10 Z" />',
        ja: '月'
    },
    'sun': {
        path: '<circle cx="50" cy="50" r="20" /><path d="M50,10 L50,20 M50,80 L50,90 M10,50 L20,50 M80,50 L90,50 M22,22 L29,29 M71,71 L78,78 M22,78 L29,71 M71,29 L78,22" stroke-width="5" stroke-linecap="round" />',
        ja: '太陽'
    },
    'house': {
        path: '<polygon points="50,15 90,45 90,85 10,85 10,45" /><rect x="40" y="60" width="20" height="25" fill="white" />',
        ja: '家'
    },
    'tree': {
        path: '<path d="M50,10 L80,60 L60,60 L60,90 L40,90 L40,60 L20,60 Z" />',
        ja: '木'
    },
    'flower': {
        path: '<circle cx="50" cy="50" r="10" /><circle cx="50" cy="25" r="10" /><circle cx="75" cy="50" r="10" /><circle cx="50" cy="75" r="10" /><circle cx="25" cy="50" r="10" />',
        ja: '花'
    },
    'face': {
        path: '<circle cx="50" cy="50" r="35" /><circle cx="35" cy="40" r="5" fill="white"/><circle cx="65" cy="40" r="5" fill="white"/><path d="M35,60 Q50,75 65,60" stroke="white" stroke-width="3" fill="none" />',
        ja: '顔'
    },
    'user': {
        path: '<circle cx="50" cy="35" r="15" /><path d="M20,85 Q50,55 80,85" />',
        ja: 'ユーザー'
    },
    'check': {
        path: '<polyline points="20,50 40,70 80,30" stroke-width="10" stroke-linecap="round" fill="none" />',
        ja: 'チェック'
    },
    'cross': {
        path: '<line x1="20" y1="20" x2="80" y2="80" stroke-width="10" stroke-linecap="round" /><line x1="80" y1="20" x2="20" y2="80" stroke-width="10" stroke-linecap="round" />',
        ja: 'バツ'
    },
    'arrow': {
        path: '<line x1="20" y1="50" x2="80" y2="50" stroke-width="10" stroke-linecap="round" /><polyline points="50,20 80,50 50,80" stroke-width="10" stroke-linecap="round" fill="none" />',
        ja: '矢印'
    },
    'gear': {
        path: '<circle cx="50" cy="50" r="20" stroke-width="15" stroke-dasharray="10 5" fill="none" />',
        ja: '歯車'
    },
    'lock': {
        path: '<rect x="30" y="40" width="40" height="40" rx="5" /><path d="M35,40 V25 A15,15 0 0,1 65,25 V40" fill="none" stroke-width="5" />',
        ja: '鍵'
    },
    'mail': {
        path: '<rect x="15" y="25" width="70" height="50" rx="5" /><polyline points="15,25 50,55 85,25" fill="none" stroke-width="3" />',
        ja: 'メール'
    },
    // Add more shapes to reach higher variety potential if needed, but 20 is good start.
    // Let's add a few more simple ones.
    'music': {
        path: '<path d="M30,60 V30 H60 V60" stroke-width="5" /><circle cx="20" cy="70" r="10" /><circle cx="70" cy="70" r="10" />',
        ja: '音楽'
    },
    'camera': {
        path: '<rect x="20" y="30" width="60" height="50" rx="5" /><circle cx="50" cy="55" r="15" fill="none" stroke-width="5" /><rect x="35" y="20" width="30" height="10" />',
        ja: 'カメラ'
    },
    'book': {
        path: '<rect x="20" y="20" width="60" height="60" rx="5" /><line x1="50" y1="20" x2="50" y2="80" stroke-width="2" />',
        ja: '本'
    },
    'bell': {
        path: '<path d="M50,20 A20,20 0 0,0 30,40 V60 H70 V40 A20,20 0 0,0 50,20 Z" /><circle cx="50" cy="70" r="5" />',
        ja: 'ベル'
    },
    'gift': {
        path: '<rect x="25" y="40" width="50" height="40" /><rect x="20" y="30" width="60" height="10" /><line x1="50" y1="30" x2="50" y2="80" stroke-width="5" />',
        ja: 'ギフト'
    },
    'lightning': {
        path: '<polygon points="40,5 60,5 40,50 70,50 30,95 45,40 20,40" />',
        ja: '雷'
    },
    'snowflake': {
        path: '<path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" stroke-width="5" stroke-linecap="round" />',
        ja: '雪の結晶'
    }
};

const ADJECTIVES = {
    'red': { color: '#F44336', ja: '赤い' },
    'light-red': { color: '#EF9A9A', ja: '薄い赤い' },
    'dark-red': { color: '#B71C1C', ja: '濃い赤い' },
    'pink': { color: '#E91E63', ja: 'ピンクの' },
    'light-pink': { color: '#F48FB1', ja: '薄いピンクの' },
    'dark-pink': { color: '#880E4F', ja: '濃いピンクの' },
    'purple': { color: '#9C27B0', ja: '紫の' },
    'light-purple': { color: '#CE93D8', ja: '薄い紫の' },
    'dark-purple': { color: '#4A148C', ja: '濃い紫の' },
    'indigo': { color: '#3F51B5', ja: '藍色の' },
    'light-indigo': { color: '#9FA8DA', ja: '薄い藍色の' },
    'dark-indigo': { color: '#1A237E', ja: '濃い藍色の' },
    'blue': { color: '#2196F3', ja: '青い' },
    'light-blue': { color: '#81D4FA', ja: '薄い青い' },
    'dark-blue': { color: '#0D47A1', ja: '濃い青い' },
    'cyan': { color: '#00BCD4', ja: '水色の' },
    'light-cyan': { color: '#80DEEA', ja: '薄い水色の' },
    'dark-cyan': { color: '#006064', ja: '濃い水色の' },
    'teal': { color: '#009688', ja: '青緑の' },
    'light-teal': { color: '#80CBC4', ja: '薄い青緑の' },
    'dark-teal': { color: '#004D40', ja: '濃い青緑の' },
    'green': { color: '#4CAF50', ja: '緑の' },
    'light-green': { color: '#A5D6A7', ja: '薄い緑の' },
    'dark-green': { color: '#1B5E20', ja: '濃い緑の' },
    'lime': { color: '#CDDC39', ja: '黄緑の' },
    'light-lime': { color: '#E6EE9C', ja: '薄い黄緑の' },
    'dark-lime': { color: '#827717', ja: '濃い黄緑の' },
    'yellow': { color: '#FFEB3B', ja: '黄色の' },
    'light-yellow': { color: '#FFF59D', ja: '薄い黄色の' },
    'dark-yellow': { color: '#F57F17', ja: '濃い黄色の' },
    'amber': { color: '#FFC107', ja: '琥珀色の' },
    'light-amber': { color: '#FFE082', ja: '薄い琥珀色の' },
    'dark-amber': { color: '#FF6F00', ja: '濃い琥珀色の' },
    'orange': { color: '#FF9800', ja: 'オレンジの' },
    'light-orange': { color: '#FFCC80', ja: '薄いオレンジの' },
    'dark-orange': { color: '#E65100', ja: '濃いオレンジの' },
    'deep-orange': { color: '#FF5722', ja: '濃いオレンジの' },
    'brown': { color: '#795548', ja: '茶色の' },
    'grey': { color: '#9E9E9E', ja: '灰色の' },
    'blue-grey': { color: '#607D8B', ja: 'ブルーグレーの' },
    'black': { color: '#333333', ja: '黒い' },
    'dark': { color: '#1a1a1a', ja: '暗い' },
    'slate': { color: '#475569', ja: 'スレート色の' },
    'zinc': { color: '#52525b', ja: '亜鉛色の' }
};

const BACKGROUNDS = {
    'none': {
        render: (color) => '',
        ja: '',
        en: ''
    },
    'circle': {
        render: (color) => `<circle cx="50" cy="50" r="48" fill="${color}" opacity="0.2" />`,
        ja: '丸い背景の',
        en: 'circle-bg'
    },
    'square': {
        render: (color) => `<rect x="5" y="5" width="90" height="90" rx="20" fill="${color}" opacity="0.2" />`,
        ja: '四角い背景の',
        en: 'square-bg'
    },
    'outline-circle': {
        render: (color) => `<circle cx="50" cy="50" r="48" fill="none" stroke="${color}" stroke-width="2" opacity="0.5" />`,
        ja: '丸枠の',
        en: 'outlined-circle'
    },
    'outline-square': {
        render: (color) => `<rect x="5" y="5" width="90" height="90" rx="20" fill="none" stroke="${color}" stroke-width="2" opacity="0.5" />`,
        ja: '四角枠の',
        en: 'outlined-square'
    },
    'dashed-circle': {
        render: (color) => `<circle cx="50" cy="50" r="48" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="5 5" opacity="0.5" />`,
        ja: '点線丸枠の',
        en: 'dashed-circle'
    },
    'dashed-square': {
        render: (color) => `<rect x="5" y="5" width="90" height="90" rx="20" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="5 5" opacity="0.5" />`,
        ja: '点線四角枠の',
        en: 'dashed-square'
    },
    'double-circle': {
        render: (color) => `<circle cx="50" cy="50" r="48" fill="none" stroke="${color}" stroke-width="1" opacity="0.5" /><circle cx="50" cy="50" r="44" fill="none" stroke="${color}" stroke-width="1" opacity="0.5" />`,
        ja: '二重丸枠の',
        en: 'double-circle'
    },
    'filled-square-rounded': {
        render: (color) => `<rect x="10" y="10" width="80" height="80" rx="30" fill="${color}" opacity="0.15" />`,
        ja: '丸角四角背景の',
        en: 'rounded-square-bg'
    }
};

// --- Generation Logic ---

function generateIcon(id) {
    const nounKeys = Object.keys(NOUNS);
    const adjKeys = Object.keys(ADJECTIVES);
    const bgKeys = Object.keys(BACKGROUNDS);

    // Random selection
    const nounKey = nounKeys[Math.floor(Math.random() * nounKeys.length)];
    const adjKey = adjKeys[Math.floor(Math.random() * adjKeys.length)];
    const bgKey = bgKeys[Math.floor(Math.random() * bgKeys.length)];

    const noun = NOUNS[nounKey];
    const adj = ADJECTIVES[adjKey];
    const bg = BACKGROUNDS[bgKey];

    const color = adj.color;

    // Construct SVG
    // Base shape usually takes the main color. 
    // If path has stroke but no fill defined, we apply stroke. If it has fill, we apply fill.
    // For simplicity, we'll wrap the path in a group and apply fill/stroke there, 
    // but some paths might need specific handling. 
    // Most of our paths are simple shapes or lines.

    // Heuristic: if path contains "stroke", assume it needs stroke color. Otherwise fill.
    // But actually, we can set both `fill` and `stroke` on the group. 
    // If the inner path specifies `fill="none"`, it won't be filled.

    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  ${bg.render(color)}
  <g fill="${color}" stroke="${color}" stroke-width="0">
    ${noun.path}
  </g>
</svg>`.trim();

    const nameEn = [adjKey, bg.en, nounKey].filter(Boolean).join(' ').replace(/-/g, ' ');
    const nameJa = [adj.ja, bg.ja, noun.ja].filter(Boolean).join('');

    return {
        svg: svgContent,
        tags_en: [nounKey, adjKey, bg.en].filter(Boolean),
        tags_ja: [noun.ja, adj.ja.replace('の', ''), bg.ja.replace('の', '')].filter(Boolean), // Remove 'no' particle for tags
        name_en: nameEn,
        name_ja: nameJa,
        signature: `${nounKey}-${adjKey}-${bgKey}`
    };
}

const data = [];
const generatedSignatures = new Set();

console.log(`Generating ${COUNT} icons...`);

let i = 0;
let attempts = 0;
const MAX_ATTEMPTS = COUNT * 5;

while (i < COUNT && attempts < MAX_ATTEMPTS) {
    const id = `icon_${String(i).padStart(5, '0')}`;
    const iconData = generateIcon(id);

    if (generatedSignatures.has(iconData.signature)) {
        attempts++;
        continue;
    }

    generatedSignatures.add(iconData.signature);

    const fileName = `${id}.svg`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), iconData.svg);

    data.push({
        id: id,
        path: `icons/${fileName}`,
        tags_en: iconData.tags_en,
        tags_ja: iconData.tags_ja,
        name_en: iconData.name_en,
        name_ja: iconData.name_ja
    });

    if (i % 1000 === 0) process.stdout.write('.');
    i++;
}

if (i < COUNT) {
    console.warn(`\nWarning: Only generated ${i} unique icons out of ${COUNT} requested.`);
}

fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
console.log('\nDone!');
