import { uiText, mapText } from '../lang/translations.js';
import { flow } from '../data/flow-data.js';

const supportedLanguages = ['ru', 'en'];
const CANVAS_SIZE = 4200;
const CANVAS_CENTER = CANVAS_SIZE / 2;
const NODE_DISTANCE = 420;
const VERTICAL_SPREAD = 0.85;

const headlineEl = document.getElementById('headline');
const leadEl = document.getElementById('lead');
const progressTrackEl = document.getElementById('progressTrack');
const progressLabelEl = document.getElementById('progressLabel');
const flowTrackEl = document.getElementById('flowTrack');
const mapSpaceEl = document.getElementById('mapSpace');
const mapPanEl = document.getElementById('mapPan');
const mapCanvasEl = document.getElementById('mapCanvas');
const mapLinksEl = document.getElementById('mapLinks');
const historySectionEl = document.getElementById('historySection');
const panelControlsEl = document.getElementById('controlPanel');
const panelToggleBtn = document.getElementById('panelToggle');
const panelToggleLabel = document.getElementById('panelToggleLabel');
const panelScrim = document.getElementById('panelScrim');
const langButtons = document.querySelectorAll('.lang-button');
const langSwitcher = document.querySelector('.lang-switcher');
const classicLinkEl = document.getElementById('classicLink');
const sourceLinkEl = document.getElementById('sourceLink');
const backBtn = document.getElementById('backButton');
const resetBtn = document.getElementById('resetButton');
const mobileViewport = window.matchMedia('(max-width: 768px)');

if (historySectionEl) {
  historySectionEl.setAttribute('role', 'log');
  historySectionEl.setAttribute('aria-live', 'polite');
  historySectionEl.setAttribute('aria-relevant', 'additions');
}

const browserLang = (navigator.language || navigator.userLanguage || 'ru').slice(0, 2).toLowerCase();
const defaultLang = supportedLanguages.includes(browserLang) ? browserLang : 'ru';

const state = {
  lang: defaultLang,
  steps: [{ nodeId: 'start', optionIndex: null }],
  selectedMaterial: null
};

const pan = { x: 0, y: 0 };
let scale = 1;
const SCALE_MIN = 0.45;
const SCALE_MAX = 2.75;
let pendingFocusIndex = 0;
let panelExpanded = !mobileViewport.matches;
const initialView = { panX: pan.x, panY: pan.y, scale };
let initialViewCaptured = false;

const dragState = {
  active: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  startPanX: 0,
  startPanY: 0
};

const touchState = {
  pointers: new Map(),
  previousDistance: null
};

langButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

backBtn.addEventListener('click', () => goBack());
resetBtn.addEventListener('click', () => resetFlow());

if (panelToggleBtn) {
  panelToggleBtn.addEventListener('click', () => {
    const isExpanded = panelToggleBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;
    setPanelExpanded(nextState, { origin: panelToggleBtn });
    if (nextState && panelControlsEl) {
      panelControlsEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

if (panelScrim) {
  panelScrim.addEventListener('click', () => setPanelExpanded(false));
}

if (typeof mobileViewport.addEventListener === 'function') {
  mobileViewport.addEventListener('change', handleViewportChange);
} else if (typeof mobileViewport.addListener === 'function') {
  mobileViewport.addListener(handleViewportChange);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileViewport.matches && panelExpanded) {
    setPanelExpanded(false);
  }
});

if (mapSpaceEl) {
  mapSpaceEl.addEventListener('pointerdown', handlePointerDown);
  mapSpaceEl.addEventListener('pointermove', handlePointerMove);
  mapSpaceEl.addEventListener('pointerup', handlePointerEnd);
  mapSpaceEl.addEventListener('pointercancel', handlePointerEnd);
  mapSpaceEl.addEventListener('pointerleave', handlePointerEnd);
  mapSpaceEl.addEventListener('wheel', handleWheel, { passive: false });
}

applyTransform();
setPanelExpanded(panelExpanded, { skipFocus: true });
setLanguage(state.lang, true);
render();

function translate(value) {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object') {
    if (value[state.lang]) {
      return value[state.lang];
    }
    if (value.ru) {
      return value.ru;
    }
    if (value.en) {
      return value.en;
    }
    for (const lang of supportedLanguages) {
      if (value[lang]) {
        return value[lang];
      }
    }
  }
  return '';
}

function updatePanelToggleText() {
  if (!panelToggleBtn || !panelToggleLabel) {
    return;
  }
  panelToggleLabel.textContent = translate(uiText.panelToggleLabel);
  const isExpanded = panelToggleBtn.getAttribute('aria-expanded') !== 'false';
  const ariaText = isExpanded ? uiText.panelToggleHide : uiText.panelToggleShow;
  panelToggleBtn.setAttribute('aria-label', translate(ariaText));
}

function setPanelExpanded(expanded, options = {}) {
  if (!panelControlsEl || !panelToggleBtn) {
    return;
  }
  const { skipFocus = false, origin = null } = options;
  panelExpanded = expanded;
  const isMobile = mobileViewport.matches;
  panelControlsEl.classList.toggle('is-collapsed', !expanded);
  panelControlsEl.setAttribute('aria-hidden', expanded ? 'false' : 'true');
  panelToggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  panelToggleBtn.classList.toggle('is-active', expanded);
  if (panelScrim) {
    panelScrim.classList.toggle('is-visible', expanded && isMobile);
    if (!isMobile) {
      panelScrim.classList.remove('is-visible');
    }
  }
  if (!expanded && !skipFocus) {
    const target = origin || panelToggleBtn;
    if (target && typeof target.focus === 'function') {
      target.focus();
    }
  }
  updatePanelToggleText();
}

function handleViewportChange(event) {
  if (event.matches) {
    panelExpanded = false;
    setPanelExpanded(false, { skipFocus: true });
  } else {
    panelExpanded = true;
    setPanelExpanded(true, { skipFocus: true });
  }
}

function setLanguage(lang, skipRender = false) {
  if (!supportedLanguages.includes(lang)) {
    lang = 'ru';
  }
  state.lang = lang;
  document.documentElement.lang = state.lang;
  document.title = translate(uiText.pageTitle);
  headlineEl.textContent = translate(uiText.heading);
  leadEl.textContent = translate(uiText.lead);
  if (classicLinkEl) {
    classicLinkEl.textContent = translate(uiText.classicLink);
  }
  if (sourceLinkEl) {
    sourceLinkEl.textContent = translate(uiText.sourceLink);
  }
  langSwitcher.setAttribute('aria-label', translate(uiText.languageSwitcher));
  updatePanelToggleText();
  updateLangButtons();
  updateActions();
  if (!skipRender) {
    render();
  }
}

function updateLangButtons() {
  langButtons.forEach((button) => {
    if (button.dataset.lang === state.lang) {
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
    }
  });
}

function render() {
  ensureSelectedMaterialValid();
  renderProgress();
  renderFlow();
  renderSidePanel();
  updateActions();
}

function ensureSelectedMaterialValid() {
  if (!state.selectedMaterial) {
    return;
  }
  const matchStep = state.steps.find((step) => step.nodeId === state.selectedMaterial.nodeId);
  if (!matchStep) {
    state.selectedMaterial = null;
    return;
  }
  const node = flow[matchStep.nodeId];
  if (!node || node.type !== 'result') {
    state.selectedMaterial = null;
    return;
  }
  if (!Array.isArray(node.materials) || !node.materials[state.selectedMaterial.materialIndex]) {
    state.selectedMaterial = null;
  }
}

function renderProgress() {
  progressTrackEl.innerHTML = '';
  state.steps.forEach((step, index) => {
    const node = flow[step.nodeId];
    if (!node) {
      return;
    }
    const dot = document.createElement('span');
    dot.className = 'progress-node';
    if (index === state.steps.length - 1) {
      if (node.type === 'result') {
        dot.classList.add('is-result');
      } else {
        dot.classList.add('is-current');
      }
    } else {
      dot.classList.add('is-complete');
    }
    dot.textContent = index + 1;
    dot.title = translate(node.title) || translate(mapText.stepLabel) + ' ' + (index + 1);
    progressTrackEl.appendChild(dot);
  });
  progressLabelEl.textContent = translate(mapText.progressLegend) + ': ' + state.steps.length;
}

function renderFlow() {
  flowTrackEl.innerHTML = '';
  mapLinksEl.innerHTML = '';
  const positions = computeStepPositions();

  state.steps.forEach((step, index) => {
    const node = flow[step.nodeId];
    if (!node) {
      return;
    }
    const article = document.createElement('article');
    article.className = 'flow-step';
    article.dataset.stepIndex = String(index);
    article.dataset.type = node.type;
    if (index === state.steps.length - 1) {
      article.dataset.status = node.type === 'result' ? 'result' : 'current';
    } else {
      article.dataset.status = 'complete';
    }

    const position = positions[index];
    const left = CANVAS_CENTER + position.x;
    const top = CANVAS_CENTER + position.y;
    article.style.left = left + 'px';
    article.style.top = top + 'px';

    const header = document.createElement('header');
    header.className = 'step-header';

    const badge = document.createElement('span');
    badge.className = 'step-index';
    badge.textContent = index + 1;
    header.appendChild(badge);

    const titleEl = document.createElement('h2');
    titleEl.className = 'step-title';
    titleEl.textContent = translate(node.title) || translate(mapText.stepLabel) + ' ' + (index + 1);
    header.appendChild(titleEl);

    article.appendChild(header);

    const body = document.createElement('div');
    body.className = 'step-body';
    article.appendChild(body);

    if (node.type === 'question') {
      const question = document.createElement('p');
      question.className = 'step-question';
      question.textContent = translate(node.text);
      body.appendChild(question);

      if (node.description) {
        const description = document.createElement('p');
        description.className = 'step-description';
        description.textContent = translate(node.description);
        body.appendChild(description);
      }

      const optionsWrap = document.createElement('div');
      optionsWrap.className = 'option-list';

      node.options.forEach((option, optionIndex) => {
        const optionBtn = document.createElement('button');
        optionBtn.type = 'button';
        optionBtn.className = 'option-node';
        optionBtn.dataset.stepIndex = String(index);
        optionBtn.dataset.optionIndex = String(optionIndex);

        const label = document.createElement('span');
        label.className = 'option-label';
        label.textContent = translate(option.label);
        optionBtn.appendChild(label);

        const noteText = translate(option.note);
        if (noteText) {
          const note = document.createElement('span');
          note.className = 'option-note';
          note.textContent = noteText;
          optionBtn.appendChild(note);
        }

        const selectedIndex = step.optionIndex;
        const isSelected = selectedIndex !== null && selectedIndex === optionIndex;
        const isCurrent = index === state.steps.length - 1;

        if (selectedIndex !== null && !isSelected) {
          optionBtn.classList.add('is-faded');
        }
        if (isSelected) {
          optionBtn.classList.add('is-selected');
        }
        optionBtn.title = isCurrent ? translate(mapText.optionCurrent) : translate(mapText.branchHint);

        optionBtn.addEventListener('click', () => handleOption(index, optionIndex));
        optionsWrap.appendChild(optionBtn);
      });

      body.appendChild(optionsWrap);
    } else if (node.type === 'result') {
      const badgeEl = document.createElement('span');
      badgeEl.className = 'result-badge';
      badgeEl.textContent = translate(mapText.resultBadge);
      body.appendChild(badgeEl);

      const descriptionText = translate(node.description);
      if (descriptionText) {
        const info = document.createElement('p');
        info.className = 'step-description';
        info.textContent = descriptionText;
        body.appendChild(info);
      }

      const materials = Array.isArray(node.materials) ? node.materials : [];
      const hasMaterials = materials.length > 0;
      const selection = hasMaterials && state.selectedMaterial && state.selectedMaterial.nodeId === step.nodeId
        ? materials[state.selectedMaterial.materialIndex]
        : null;

      if (hasMaterials) {
        const choicesWrap = document.createElement('div');
        choicesWrap.className = 'material-choice-list';

        materials.forEach((material, materialIndex) => {
          const choiceBtn = document.createElement('button');
          choiceBtn.type = 'button';
          choiceBtn.className = 'material-choice';
          const isActive = !!(state.selectedMaterial && state.selectedMaterial.nodeId === step.nodeId && state.selectedMaterial.materialIndex === materialIndex);
          if (isActive) {
            choiceBtn.classList.add('is-active');
          }
          choiceBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');

          const nameSpan = document.createElement('span');
          nameSpan.className = 'material-name';
          nameSpan.textContent = translate(material.name);
          choiceBtn.appendChild(nameSpan);

          choiceBtn.title = translate(mapText.resultSelectPrompt);

          choiceBtn.addEventListener('click', () => {
            const alreadySelected = state.selectedMaterial && state.selectedMaterial.nodeId === step.nodeId && state.selectedMaterial.materialIndex === materialIndex;
            state.selectedMaterial = alreadySelected ? null : { nodeId: step.nodeId, materialIndex };
            render();
          });

          choicesWrap.appendChild(choiceBtn);
        });

        body.appendChild(choicesWrap);
      }

      if (selection) {
        const detailCard = document.createElement('article');
        detailCard.className = 'material-card';

        const heading = document.createElement('h3');
        heading.textContent = translate(selection.name);
        detailCard.appendChild(heading);

        const props = document.createElement('div');
        props.className = 'material-props';

        const flame = document.createElement('p');
        flame.innerHTML = '<span>' + (state.lang === 'ru' ? 'Цвет пламени:' : 'Flame colour:') + '</span> ' + translate(selection.flame);
        props.appendChild(flame);

        const odour = document.createElement('p');
        odour.innerHTML = '<span>' + (state.lang === 'ru' ? 'Запах:' : 'Odour:') + '</span> ' + translate(selection.odour);
        props.appendChild(odour);

        const speed = document.createElement('p');
        speed.innerHTML = '<span>' + (state.lang === 'ru' ? 'Скорость горения:' : 'Burn rate:') + '</span> ' + translate(selection.speed);
        props.appendChild(speed);

        const other = document.createElement('p');
        other.innerHTML = '<span>' + (state.lang === 'ru' ? 'Другие признаки:' : 'Other traits:') + '</span> ' + translate(selection.other);
        props.appendChild(other);

        detailCard.appendChild(props);
        body.appendChild(detailCard);
      } else {
        const hint = document.createElement('p');
        hint.className = 'panel-placeholder';
        hint.textContent = translate(mapText.resultSelectPrompt);
        body.appendChild(hint);
      }
    }

    flowTrackEl.appendChild(article);
  });

  drawConnections();

  if (pendingFocusIndex !== null) {
    focusOnStep(pendingFocusIndex);
    pendingFocusIndex = null;
  }
}

function computeStepPositions() {
  const positions = [];
  state.steps.forEach((step, index) => {
    if (index === 0) {
      positions.push({ x: 0, y: 0 });
      return;
    }
    const prevStep = state.steps[index - 1];
    const prevPosition = positions[index - 1];
    const prevNode = flow[prevStep.nodeId];
    let optionIndex = prevStep.optionIndex || 0;
    if (prevStep.optionIndex === null) {
      optionIndex = 0;
    }
    let totalOptions = 1;
    if (prevNode && Array.isArray(prevNode.options) && prevNode.options.length) {
      totalOptions = prevNode.options.length;
    }
    const offset = computeOffset(optionIndex, totalOptions);
    positions.push({
      x: prevPosition.x + offset.x,
      y: prevPosition.y + offset.y
    });
  });
  return positions;
}

function computeOffset(optionIndex, totalOptions) {
  if (totalOptions <= 1) {
    return { x: NODE_DISTANCE, y: 0 };
  }
  const spread = Math.min(Math.PI * 0.85, Math.PI * 0.5 + totalOptions * 0.12);
  const ratio = totalOptions === 1 ? 0.5 : optionIndex / (totalOptions - 1);
  const angle = (ratio - 0.5) * spread;
  const x = Math.cos(angle) * NODE_DISTANCE;
  const y = Math.sin(angle) * NODE_DISTANCE * VERTICAL_SPREAD;
  return { x, y };
}

function drawConnections() {
  if (!mapLinksEl) {
    return;
  }
  mapLinksEl.innerHTML = '';
  for (let index = 1; index < state.steps.length; index += 1) {
    const prevEl = flowTrackEl.querySelector('[data-step-index="' + (index - 1) + '"]');
    const currentEl = flowTrackEl.querySelector('[data-step-index="' + index + '"]');
    if (!prevEl || !currentEl) {
      continue;
    }
    const x1 = prevEl.offsetLeft + prevEl.offsetWidth / 2;
    const y1 = prevEl.offsetTop + prevEl.offsetHeight / 2;
    const x2 = currentEl.offsetLeft + currentEl.offsetWidth / 2;
    const y2 = currentEl.offsetTop + currentEl.offsetHeight / 2;
    const dx = (x2 - x1) * 0.45;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = 'M ' + x1 + ' ' + y1 + ' C ' + (x1 + dx) + ' ' + y1 + ' ' + (x2 - dx) + ' ' + y2 + ' ' + x2 + ' ' + y2;
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'rgba(56, 189, 248, 0.42)');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    mapLinksEl.appendChild(path);
  }
}

function renderSidePanel() {
  if (!historySectionEl) {
    return;
  }
  historySectionEl.innerHTML = '';

  const answeredSteps = state.steps.filter((step) => {
    const node = flow[step.nodeId];
    return node && node.type === 'question' && step.optionIndex !== null;
  });

  historySectionEl.setAttribute('data-empty', answeredSteps.length ? 'false' : 'true');

  let activeQuestionIndex = state.steps.length - 1;
  if (activeQuestionIndex >= 0) {
    const activeNode = flow[state.steps[activeQuestionIndex].nodeId];
    if (!activeNode || activeNode.type !== 'question' || state.steps[activeQuestionIndex].optionIndex === null) {
      for (let idx = state.steps.length - 1; idx >= 0; idx -= 1) {
        const candidateNode = flow[state.steps[idx].nodeId];
        if (candidateNode && candidateNode.type === 'question' && state.steps[idx].optionIndex !== null) {
          activeQuestionIndex = idx;
          break;
        }
      }
    }
  }

  const headerLine = document.createElement('div');
  headerLine.className = 'route-line route-header';
  headerLine.innerHTML = '<span class="prompt">#</span><span class="content">' + translate(mapText.sidePanelTitle) + '</span>';
  historySectionEl.appendChild(headerLine);

  if (!answeredSteps.length) {
    const placeholder = document.createElement('div');
    placeholder.className = 'route-line route-placeholder';
    placeholder.innerHTML = '<span class="prompt">$</span><span class="content">' + translate(mapText.sidePanelEmpty) + '</span>';
    historySectionEl.appendChild(placeholder);
  } else {
    state.steps.forEach((step, index) => {
      const node = flow[step.nodeId];
      if (!node || node.type !== 'question' || step.optionIndex === null) {
        return;
      }
      const option = node.options[step.optionIndex];
      if (!option) {
        return;
      }

      const titleText = translate(node.title);
      const questionText = translate(node.text);
      const questionLine = document.createElement('div');
      questionLine.className = 'route-line';
      const parts = [];
      if (titleText) {
        parts.push('[' + (index + 1) + '] ' + titleText + ':');
      }
      if (questionText) {
        parts.push(questionText);
      }
      if (!parts.length) {
        parts.push('[' + (index + 1) + '] ' + translate(mapText.stepLabel));
      }
      questionLine.innerHTML = '<span class="prompt">$</span><span class="content">' + parts.join(' ') + '</span>';
      if (index === activeQuestionIndex) {
        questionLine.classList.add('is-current');
      }
      historySectionEl.appendChild(questionLine);

      const answerLine = document.createElement('div');
      answerLine.className = 'route-line route-answer';
      answerLine.innerHTML = '<span class="prompt">↳</span><span class="content">' + translate(uiText.answerLabel) + ' ' + translate(option.label) + '</span>';
      if (index === activeQuestionIndex) {
        answerLine.classList.add('is-current');
      }
      historySectionEl.appendChild(answerLine);
    });
  }

  historySectionEl.scrollTop = historySectionEl.scrollHeight;

}

function updateActions() {
  backBtn.textContent = translate(uiText.back);
  resetBtn.textContent = translate(uiText.reset);
  const canGoBack = state.steps.length > 1;
  backBtn.disabled = !canGoBack;
  backBtn.setAttribute('aria-disabled', canGoBack ? 'false' : 'true');
}

function handleOption(stepIndex, optionIndex) {
  const step = state.steps[stepIndex];
  const node = flow[step.nodeId];
  if (!node || node.type !== 'question') {
    return;
  }

  const option = node.options[optionIndex];
  if (!option) {
    return;
  }

  step.optionIndex = optionIndex;
  state.steps = state.steps.slice(0, stepIndex + 1);
  state.selectedMaterial = null;

  if (!option.next || !flow[option.next]) {
    window.alert(translate(uiText.errorLoading));
    return;
  }

  state.steps.push({ nodeId: option.next, optionIndex: null });
  pendingFocusIndex = state.steps.length - 1;
  render();
}

function goBack() {
  if (state.steps.length <= 1) {
    return;
  }
  state.steps.pop();
  state.selectedMaterial = null;
  const current = state.steps[state.steps.length - 1];
  const node = flow[current.nodeId];
  if (node && node.type === 'question') {
    current.optionIndex = null;
  }
  pendingFocusIndex = state.steps.length - 1;
  render();
}

function resetFlow() {
  state.steps = [{ nodeId: 'start', optionIndex: null }];
  state.selectedMaterial = null;
  pendingFocusIndex = null;
  pan.x = initialView.panX;
  pan.y = initialView.panY;
  scale = initialView.scale;
  applyTransform();
  render();
  window.requestAnimationFrame(() => {
    if (panelControlsEl) {
      panelControlsEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function focusOnStep(index) {
  if (!flowTrackEl || !mapSpaceEl) {
    return;
  }
  const nodeEl = flowTrackEl.querySelector('[data-step-index="' + index + '"]');
  if (!nodeEl) {
    return;
  }
  const spaceRect = mapSpaceEl.getBoundingClientRect();
  const nodeRect = nodeEl.getBoundingClientRect();
  const offsetX = (spaceRect.left + spaceRect.width / 2) - (nodeRect.left + nodeRect.width / 2);
  const offsetY = (spaceRect.top + spaceRect.height / 2) - (nodeRect.top + nodeRect.height / 2);
  pan.x += offsetX;
  pan.y += offsetY;
  if (!initialViewCaptured && index === 0) {
    initialView.panX = pan.x;
    initialView.panY = pan.y;
    initialView.scale = scale;
    initialViewCaptured = true;
  }
  applyTransform();
}

function centerMap() {
  pan.x = 0;
  pan.y = 0;
  scale = 1;
  applyTransform();
}

function applyTransform() {
  if (mapPanEl) {
    mapPanEl.style.setProperty('--pan-x', pan.x + 'px');
    mapPanEl.style.setProperty('--pan-y', pan.y + 'px');
  }
  if (mapCanvasEl) {
    mapCanvasEl.style.setProperty('--map-scale', scale.toFixed(4));
  }
}

function handlePointerDown(event) {
  if (!mapSpaceEl || !mapPanEl) {
    return;
  }
  if (event.target.closest('button')) {
    return;
  }

  if (event.pointerType === 'touch') {
    touchState.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (touchState.pointers.size === 1) {
      touchState.previousDistance = null;
      startDrag(event, false);
    } else if (touchState.pointers.size === 2) {
      touchState.previousDistance = getTouchDistance();
      if (dragState.active) {
        endDrag(dragState.pointerId);
      }
    }
    event.preventDefault();
    return;
  }

  if (event.pointerType === 'mouse' && event.button !== 0) {
    return;
  }

  startDrag(event, true);
}

function handlePointerMove(event) {
  if (event.pointerType === 'touch') {
    if (touchState.pointers.has(event.pointerId)) {
      touchState.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
    if (touchState.pointers.size === 1 && !dragState.active) {
      touchState.previousDistance = null;
      startDrag(event, false);
    }
    if (touchState.pointers.size >= 2) {
      const distance = getTouchDistance();
      const center = getTouchCenter();
      if (touchState.previousDistance) {
        const factor = distance / touchState.previousDistance;
        applyZoomWithOrigin(factor, center.x, center.y);
      }
      touchState.previousDistance = distance;
      event.preventDefault();
      return;
    }
  }

  if (!dragState.active || event.pointerId !== dragState.pointerId) {
    return;
  }

  const deltaX = event.clientX - dragState.startX;
  const deltaY = event.clientY - dragState.startY;
  pan.x = dragState.startPanX + deltaX;
  pan.y = dragState.startPanY + deltaY;
  applyTransform();
  event.preventDefault();
}

function handlePointerEnd(event) {
  if (event.pointerType === 'touch') {
    touchState.pointers.delete(event.pointerId);
    if (touchState.pointers.size < 2) {
      touchState.previousDistance = null;
    }
  }

  if (dragState.active && dragState.pointerId === event.pointerId) {
    endDrag(event.pointerId);
  }
}

function handleWheel(event) {
  if (!mapPanEl) {
    return;
  }

  if (event.ctrlKey || event.metaKey) {
    const zoomFactor = Math.exp(-event.deltaY * 0.0015);
    applyZoomWithOrigin(zoomFactor, event.clientX, event.clientY);
    event.preventDefault();
    return;
  }

  const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 120 : 1;
  pan.x -= event.deltaX * multiplier;
  pan.y -= event.deltaY * multiplier;
  applyTransform();
  event.preventDefault();
}

function startDrag(event, allowCapture) {
  dragState.active = true;
  dragState.pointerId = event.pointerId;
  dragState.startX = event.clientX;
  dragState.startY = event.clientY;
  dragState.startPanX = pan.x;
  dragState.startPanY = pan.y;
  if (mapSpaceEl) {
    mapSpaceEl.classList.add('is-dragging');
    if (allowCapture && mapSpaceEl.setPointerCapture) {
      try {
        mapSpaceEl.setPointerCapture(event.pointerId);
      } catch (err) {}
    }
  }
  if (mapPanEl) {
    mapPanEl.classList.add('is-dragging');
  }
}

function endDrag(pointerId) {
  if (!dragState.active) {
    return;
  }
  dragState.active = false;
  dragState.pointerId = null;
  if (mapSpaceEl) {
    mapSpaceEl.classList.remove('is-dragging');
    if (pointerId !== undefined && mapSpaceEl.releasePointerCapture) {
      try {
        mapSpaceEl.releasePointerCapture(pointerId);
      } catch (err) {}
    }
  }
  if (mapPanEl) {
    mapPanEl.classList.remove('is-dragging');
  }
}

function getTouchPoints() {
  return Array.from(touchState.pointers.values());
}

function getTouchDistance() {
  const points = getTouchPoints();
  if (points.length < 2) {
    return 0;
  }
  const [a, b] = points;
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function getTouchCenter() {
  const points = getTouchPoints();
  if (!points.length) {
    return { x: 0, y: 0 };
  }
  const sum = points.reduce((acc, point) => {
    acc.x += point.x;
    acc.y += point.y;
    return acc;
  }, { x: 0, y: 0 });
  return { x: sum.x / points.length, y: sum.y / points.length };
}

function applyZoomWithOrigin(factor, originX, originY) {
  if (!mapCanvasEl || !mapSpaceEl) {
    return;
  }
  const previousScale = scale;
  const targetScale = clampScale(previousScale * factor);
  if (!Number.isFinite(targetScale) || targetScale === previousScale) {
    scale = targetScale;
    applyTransform();
    return;
  }

  const rectBefore = mapCanvasEl.getBoundingClientRect();
  const relativeX = rectBefore.width ? (originX - rectBefore.left) / rectBefore.width : 0.5;
  const relativeY = rectBefore.height ? (originY - rectBefore.top) / rectBefore.height : 0.5;

  scale = targetScale;
  applyTransform();

  const rectAfter = mapCanvasEl.getBoundingClientRect();
  const desiredLeft = originX - relativeX * rectAfter.width;
  const desiredTop = originY - relativeY * rectAfter.height;

  pan.x += desiredLeft - rectAfter.left;
  pan.y += desiredTop - rectAfter.top;
  applyTransform();
}

function clampScale(value) {
  return Math.min(SCALE_MAX, Math.max(SCALE_MIN, value));
}
