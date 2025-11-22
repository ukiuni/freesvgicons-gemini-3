let allIcons = [];
let visibleIcons = [];
let loadedCount = 0;
const BATCH_SIZE = 50;

const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');
const countDisplay = document.getElementById('count');
const loadingTrigger = document.getElementById('loading-trigger');
const toast = document.getElementById('toast');

// Fetch data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        allIcons = data;
        visibleIcons = allIcons;
        updateCount();
        renderNextBatch();
        setupIntersectionObserver();
    });

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    visibleIcons = allIcons.filter(icon =>
        icon.id.includes(query) ||
        (icon.name_en && icon.name_en.toLowerCase().includes(query)) ||
        (icon.name_ja && icon.name_ja.includes(query)) ||
        (icon.tags_en && icon.tags_en.some(tag => tag.toLowerCase().includes(query))) ||
        (icon.tags_ja && icon.tags_ja.some(tag => tag.includes(query)))
    );

    // Reset grid
    grid.innerHTML = '';
    loadedCount = 0;
    updateCount();
    renderNextBatch();
});

function updateCount() {
    countDisplay.textContent = `${visibleIcons.length} icons found`;
}

function renderNextBatch() {
    const nextBatch = visibleIcons.slice(loadedCount, loadedCount + BATCH_SIZE);

    const fragment = document.createDocumentFragment();

    nextBatch.forEach(icon => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${icon.path}" loading="lazy" alt="${icon.id}">
            <div class="actions">
                <button class="btn-icon" title="Copy SVG Code" onclick="copySvg('${icon.path}', event)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <button class="btn-icon" title="Download" onclick="downloadSvg('${icon.path}', event)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </button>
            </div>
        `;

        // Click card to copy (default action)
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                copySvg(icon.path);
            }
        });

        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
    loadedCount += nextBatch.length;
}

function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (loadedCount < visibleIcons.length) {
                renderNextBatch();
            }
        }
    }, { rootMargin: '200px' });

    observer.observe(loadingTrigger);
}

window.copySvg = async (path, e) => {
    if (e) e.stopPropagation();
    try {
        const response = await fetch(path);
        const text = await response.text();
        await navigator.clipboard.writeText(text);
        showToast('SVG copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
        showToast('Failed to copy');
    }
};

window.downloadSvg = (path, e) => {
    if (e) e.stopPropagation();
    const link = document.createElement('a');
    link.href = path;
    link.download = path.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2000);
}
