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
  },
  {
    id: 'WaterlandPilgram',
    name: 'WaterlandPilgram',
    description: 'Supplementary automation project',
    url: 'https://github.com/sushen/WaterlandPilgram',
    layer: 'third'
  },
  {
    id: 'PersonalIntelligencePi',
    name: 'PersonalIntelligencePi',
    description: 'Supplementary intelligence assistant',
    url: 'https://github.com/sushen/PersonalIntelligencePi',
    layer: 'third'
  },
  {
    id: 'GStudentforStudent',
    name: 'GStudentforStudent',
    description: 'Supplementary student utility project',
    url: 'https://github.com/sushen/GStudentforStudent',
    layer: 'third'
  },
  {
    id: 'UpWorkJobFinder',
    name: 'UpWorkJobFinder',
    description: 'Supplementary job discovery bot',
    url: 'https://github.com/sushen/UpWorkJobFinder',
    layer: 'third'
  },
  {
    id: 'LinkedinBot',
    name: 'LinkedinBot',
    description: 'Supplementary professional network bot',
    url: 'https://github.com/sushen/LinkedinBot',
    layer: 'third'
  }
];

const state = {
  nodeById: new Map()
};

const NODE_GAP = 14;
const MAP_PADDING = 18;
const LAYER_LAYOUT = {
  first: { radiusX: 0.36, radiusY: 0.32, startAngle: -Math.PI / 2 + 0.08 },
  second: { radiusX: 0.62, radiusY: 0.54, startAngle: -Math.PI / 2 + 0.3 },
  third: { radiusX: 0.9, radiusY: 0.8, startAngle: -Math.PI / 2 - 0.2 }
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
    const classes = ['node'];
    if (project.layer === 'center') {
      classes.push('center');
    }
    if (project.layer === 'third') {
      classes.push('low-priority');
    }
    node.className = classes.join(' ');
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
  const widestNode = Math.max(...projects.map((project) => nodeSize(project.id).width));
  const tallestNode = Math.max(...projects.map((project) => nodeSize(project.id).height));
  const maxRadiusX = Math.max(0, cx - widestNode / 2 - MAP_PADDING);
  const maxRadiusY = Math.max(0, cy - tallestNode / 2 - MAP_PADDING);

  const layout = [];
  layout.push(createLayoutPoint('KuberasLotus', cx, cy, rect, true));

  ['first', 'second', 'third'].forEach((layerName) => {
    const projectsInLayer = projects.filter((project) => project.layer === layerName);
    const config = LAYER_LAYOUT[layerName];
    projectsInLayer.forEach((project, index) => {
      const angle = config.startAngle + (index * Math.PI * 2) / projectsInLayer.length;
      const targetX = cx + Math.cos(angle) * maxRadiusX * config.radiusX;
      const targetY = cy + Math.sin(angle) * maxRadiusY * config.radiusY;
      layout.push(createLayoutPoint(project.id, targetX, targetY, rect));
    });
  });

  resolveCollisions(layout, rect);
  layout.forEach((point) => placeNode(point.id, point.x, point.y));
}

function placeNode(id, x, y) {
  const node = state.nodeById.get(id);
  if (!node) {
    return;
  }
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
}

function createLayoutPoint(id, x, y, rect, locked = false) {
  const size = nodeSize(id);
  const clamped = clampToBounds(x, y, size, rect);
  return {
    id,
    x: clamped.x,
    y: clamped.y,
    targetX: clamped.x,
    targetY: clamped.y,
    width: size.width,
    height: size.height,
    locked
  };
}

function nodeSize(id) {
  const node = state.nodeById.get(id);
  if (!node) {
    return { width: 0, height: 0 };
  }
  return {
    width: node.offsetWidth,
    height: node.offsetHeight
  };
}

function clampToBounds(x, y, size, rect) {
  const minX = size.width / 2 + MAP_PADDING;
  const maxX = rect.width - size.width / 2 - MAP_PADDING;
  const minY = size.height / 2 + MAP_PADDING;
  const maxY = rect.height - size.height / 2 - MAP_PADDING;

  return {
    x: clamp(x, minX, maxX),
    y: clamp(y, minY, maxY)
  };
}

function clamp(value, min, max) {
  if (min > max) {
    return (min + max) / 2;
  }
  return Math.min(Math.max(value, min), max);
}

function resolveCollisions(layout, rect) {
  const springStrength = 0.06;
  for (let step = 0; step < 220; step += 1) {
    let hadOverlap = false;

    for (let i = 0; i < layout.length; i += 1) {
      for (let j = i + 1; j < layout.length; j += 1) {
        const a = layout[i];
        const b = layout[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const overlapX = (a.width + b.width) / 2 + NODE_GAP - Math.abs(dx);
        const overlapY = (a.height + b.height) / 2 + NODE_GAP - Math.abs(dy);

        if (overlapX <= 0 || overlapY <= 0) {
          continue;
        }

        hadOverlap = true;
        if (overlapX < overlapY) {
          const direction = dx >= 0 ? 1 : -1;
          spreadPair(a, b, direction, overlapX / 2, 'x');
        } else {
          const direction = dy >= 0 ? 1 : -1;
          spreadPair(a, b, direction, overlapY / 2, 'y');
        }
      }
    }

    layout.forEach((point) => {
      if (!point.locked) {
        point.x += (point.targetX - point.x) * springStrength;
        point.y += (point.targetY - point.y) * springStrength;
      }
      const clamped = clampToBounds(point.x, point.y, point, rect);
      point.x = clamped.x;
      point.y = clamped.y;
    });

    if (!hadOverlap) {
      break;
    }
  }
}

function spreadPair(a, b, direction, amount, axis) {
  if (a.locked && b.locked) {
    return;
  }
  if (a.locked) {
    if (axis === 'x') {
      b.x += direction * amount * 2;
    } else {
      b.y += direction * amount * 2;
    }
    return;
  }
  if (b.locked) {
    if (axis === 'x') {
      a.x -= direction * amount * 2;
    } else {
      a.y -= direction * amount * 2;
    }
    return;
  }
  if (axis === 'x') {
    a.x -= direction * amount;
    b.x += direction * amount;
  } else {
    a.y -= direction * amount;
    b.y += direction * amount;
  }
}

function drawConnections() {
  connections.innerHTML = '';
  const center = nodeCenter('KuberasLotus');
  const firstLayer = projects.filter((p) => p.layer === 'first');
  const secondLayer = projects.filter((p) => p.layer === 'second');
  const thirdLayer = projects.filter((p) => p.layer === 'third');

  firstLayer.forEach((project) => {
    drawLine(center, nodeCenter(project.id));
  });

  secondLayer.forEach((project, i) => {
    const target = nodeCenter(project.id);
    const firstNode = nodeCenter(firstLayer[i % firstLayer.length].id);
    drawLine(center, target, 0.42);
    drawLine(firstNode, target, 0.7);
  });

  thirdLayer.forEach((project, i) => {
    const target = nodeCenter(project.id);
    const secondNode = nodeCenter(secondLayer[i % secondLayer.length].id);
    drawLine(center, target, 0.22);
    drawLine(secondNode, target, 0.36);
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
