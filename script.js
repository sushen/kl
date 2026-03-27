const projects = [
  {
    id: 'KuberasLotus',
    name: 'Kuberas Lotus',
    description: 'Core research engine',
    url: 'https://github.com/sushen/KuberasLotus',
    layer: 'center'
  },
  {
    id: 'TrailblazerGrip',
    name: 'TrailblazerGrip',
    description: 'Strategy research framework',
    url: 'https://github.com/sushen/TrailblazerGrip',
    layer: 'first'
  },
  {
    id: 'TinyTrailTitan',
    name: 'TinyTrailTitan',
    description: 'Automated trailing trading bot',
    url: 'https://github.com/sushen/TinyTrailTitan',
    layer: 'first'
  },
  {
    id: 'TradingAi',
    name: 'TradingAi',
    description: 'Trading tools platform',
    url: 'https://github.com/sushen/TradingAi',
    layer: 'first'
  },
  {
    id: 'TradingAiWorld',
    name: 'TradingAiWorld',
    description: 'Web ecosystem platform',
    url: 'https://github.com/sushen/TradingAiWorld',
    layer: 'second'
  },
  {
    id: 'TradingAiMonitoringSystem',
    name: 'TradingAiMonitoringSystem',
    description: 'Signal monitoring and analytics',
    url: 'https://github.com/sushen/TradingAiMonitoringSystem',
    layer: 'second'
  },
  {
    id: 'MobileTradingAi',
    name: 'MobileTradingAi',
    description: 'Mobile trading interface',
    url: 'https://github.com/sushen/MobileTradingAi',
    layer: 'second'
  },
  {
    id: 'TradingAilicense',
    name: 'TradingAilicense',
    description: 'Software licensing system',
    url: 'https://github.com/sushen/TradingAilicense',
    layer: 'second'
  },
  {
    id: 'Open_Source_Community_Ai',
    name: 'Open_Source_Community_Ai',
    description: 'Community collaboration platform',
    url: 'https://github.com/sushen/Open_Source_Community_Ai',
    layer: 'second'
  },
  {
    id: 'ShaplaChottor',
    name: 'ShaplaChottor',
    description: 'Civic and historical project repository',
    url: 'https://github.com/sushen/ShaplaChottor',
    layer: 'second'
  }
];

const state = {
  nodeById: new Map()
};

const map = document.getElementById('ecosystem-map');
const layer = document.getElementById('nodes-layer');
const connections = document.getElementById('connections');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const repoLink = document.getElementById('repo-link');

function createNodes() {
  layer.innerHTML = '';
  projects.forEach((project) => {
    const node = document.createElement('article');
    node.className = `node ${project.layer === 'center' ? 'center' : ''}`;
    node.dataset.id = project.id;
    node.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p>`;
    node.addEventListener('click', () => openModal(project));
    layer.appendChild(node);
    state.nodeById.set(project.id, node);
  });
}

function positionNodes() {
  const rect = map.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const firstLayer = projects.filter((p) => p.layer === 'first');
  const secondLayer = projects.filter((p) => p.layer === 'second');

  placeNode('KuberasLotus', cx, cy);

  const firstRadius = Math.min(rect.width, rect.height) * 0.27;
  firstLayer.forEach((project, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI * 2) / firstLayer.length;
    placeNode(project.id, cx + Math.cos(angle) * firstRadius, cy + Math.sin(angle) * firstRadius);
  });

  const secondRadius = Math.min(rect.width, rect.height) * 0.43;
  secondLayer.forEach((project, i) => {
    const angle = -Math.PI / 2 + 0.35 + (i * Math.PI * 2) / secondLayer.length;
    placeNode(project.id, cx + Math.cos(angle) * secondRadius, cy + Math.sin(angle) * secondRadius);
  });
}

function placeNode(id, x, y) {
  const node = state.nodeById.get(id);
  if (!node) {
    return;
  }
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
}

function drawConnections() {
  connections.innerHTML = '';
  const center = nodeCenter('KuberasLotus');
  const firstLayer = projects.filter((p) => p.layer === 'first');
  const secondLayer = projects.filter((p) => p.layer === 'second');

  firstLayer.forEach((project) => {
    drawLine(center, nodeCenter(project.id));
  });

  secondLayer.forEach((project, i) => {
    const target = nodeCenter(project.id);
    const firstNode = nodeCenter(firstLayer[i % firstLayer.length].id);
    drawLine(center, target, 0.42);
    drawLine(firstNode, target, 0.7);
  });
}

function nodeCenter(id) {
  const node = state.nodeById.get(id);
  const x = parseFloat(node.style.left || '0');
  const y = parseFloat(node.style.top || '0');
  return { x, y };
}

function drawLine(from, to, opacity = 1) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', from.x);
  line.setAttribute('y1', from.y);
  line.setAttribute('x2', to.x);
  line.setAttribute('y2', to.y);
  line.setAttribute('class', 'connection-line');
  line.style.opacity = opacity;
  connections.appendChild(line);
}

function openModal(project) {
  modalTitle.textContent = project.name;
  modalDescription.textContent = project.description;
  repoLink.href = project.url;
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

function renderMap() {
  positionNodes();
  drawConnections();
}

closeModalButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
window.addEventListener('resize', renderMap);

document.addEventListener('DOMContentLoaded', () => {
  createNodes();
  renderMap();
});
