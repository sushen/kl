// script.js for Kuberas Lotus Ecosystem Map

const projectData = {
    KuberasLotus: {
        name: "Kuberas Lotus",
        description: "Core research engine for advanced trading strategies and market analysis.",
        url: "https://github.com/sushen/KuberasLotus"
    },
    TrailblazerGrip: {
        name: "TrailblazerGrip",
        description: "Strategy research framework for developing and testing trading algorithms.",
        url: "https://github.com/sushen/TrailblazerGrip"
    },
    TinyTrailTitan: {
        name: "TinyTrailTitan",
        description: "Automated trailing trading bot for efficient trade management.",
        url: "https://github.com/sushen/TinyTrailTitan"
    },
    TradingAi: {
        name: "TradingAi",
        description: "Trading tools platform providing comprehensive trading solutions.",
        url: "https://github.com/sushen/TradingAi"
    },
    TradingAiWorld: {
        name: "TradingAiWorld",
        description: "Web ecosystem platform for integrated trading experiences.",
        url: "https://github.com/sushen/TradingAiWorld"
    },
    TradingAiMonitoringSystem: {
        name: "TradingAiMonitoringSystem",
        description: "Signal monitoring and analytics system for real-time insights.",
        url: "https://github.com/sushen/TradingAiMonitoringSystem"
    },
    MobileTradingAi: {
        name: "MobileTradingAi",
        description: "Mobile trading interface for on-the-go trading access.",
        url: "https://github.com/sushen/MobileTradingAi"
    },
    TradingAilicense: {
        name: "TradingAilicense",
        description: "Software licensing system for managing trading software access.",
        url: "https://github.com/sushen/TradingAilicense"
    },
    Open_Source_Community_Ai: {
        name: "Open_Source_Community_Ai",
        description: "Community collaboration platform for open-source AI development.",
        url: "https://github.com/sushen/Open_Source_Community_Ai"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    drawConnections();
    setupNodeClicks();
    setupModal();
});

function drawConnections() {
    const svg = document.getElementById('connections');
    const map = document.getElementById('ecosystem-map');
    const centerNode = document.querySelector('.center-node');
    const firstLayerNodes = document.querySelectorAll('.first-layer');
    const secondLayerNodes = document.querySelectorAll('.second-layer');

    const centerRect = centerNode.getBoundingClientRect();
    const mapRect = map.getBoundingClientRect();

    const centerX = centerRect.left + centerRect.width / 2 - mapRect.left;
    const centerY = centerRect.top + centerRect.height / 2 - mapRect.top;

    // Connect center to first layer
    firstLayerNodes.forEach(node => {
        const rect = node.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - mapRect.left;
        const y = rect.top + rect.height / 2 - mapRect.top;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        svg.appendChild(line);
    });

    // Connect first layer to second layer (simplified, connect each first to nearest seconds)
    // For simplicity, connect each first to all seconds, but that might be too many lines.
    // Since it's a map, perhaps connect in a way that makes sense, but for now, just connect center to all.
    // To make it look like layers, connect first layer to center, and second to first.
    // But to keep simple, connect all to center.
    secondLayerNodes.forEach(node => {
        const rect = node.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - mapRect.left;
        const y = rect.top + rect.height / 2 - mapRect.top;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        svg.appendChild(line);
    });
}

function setupNodeClicks() {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        node.addEventListener('click', function() {
            const project = this.dataset.project;
            const data = projectData[project];
            if (data) {
                showModal(data);
            }
        });
    });
}

function setupModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('close-modal');
    const openRepoBtn = document.getElementById('open-repo');

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    openRepoBtn.addEventListener('click', () => {
        const url = openRepoBtn.dataset.url;
        if (url) {
            window.open(url, '_blank');
        }
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

function showModal(data) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const openRepoBtn = document.getElementById('open-repo');

    title.textContent = data.name;
    description.textContent = data.description;
    openRepoBtn.dataset.url = data.url;

    modal.classList.remove('hidden');
}
