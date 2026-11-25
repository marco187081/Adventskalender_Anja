(function () {
  const appPath = location.pathname.replace(/\/(?:index|admin)\.html$/i, '/');
  const appScope = appPath.split('/').filter(Boolean).join('/') || 'root';
  const STORAGE_KEY = `advent_calendar_state_v1_${appScope}`;
  const USER_SESSION_KEY = 'advent_user_session';
  const ADMIN_SESSION_KEY = 'advent_admin_session';

  const DEFAULT_STATE = {
    pageTitle: 'Mein Weihnachtswunder',
    greeting: 'Für dich, meine Liebe – ich freue mich auf all die kleinen Momente mit dir.',
    unlockMode: 'date',
    countdownEnabled: true,
    musicEnabled: true,
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    backgroundImages: [],
    backgroundMessage: 'Hallo Anja',
    loginPassword: 'weihnachtswunder',
    adminPassword: 'adventadmin',
    doors: [
      { id: 1, title: 'Willkommen', subtitle: 'Unser erstes Türchen', description: 'Ein kleiner Anfang für die schönsten Momente mit dir.', content: '<p>Mein Weihnachtswunder beginnt heute mit dir.</p><p>Ich wünsche dir so viel Ruhe, Liebe und kleine Freuden in dieser Zeit.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 2, title: 'Unsere Liebe', subtitle: 'Ein kleiner Liebesnachweis', description: 'Du bist die schönste Weihnachtsstimmung, die ich mir vorstellen kann.', content: '<p>Du machst jeden Tag schöner.</p><p>Ich liebe die Art, wie du die Welt mit Wärme und Leichtigkeit erfüllst.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 3, title: 'Kleine Freuden', subtitle: 'Die schönen Dinge', description: 'Manchmal sind die besten Dinge die ganz kleinen.', content: '<p>Ein Lächeln, eine Umarmung, ein Abend zu zweit.</p><p>Gerade diese Momente sind goldwert.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 4, title: 'Unser Schatz', subtitle: 'Ein wertvoller Moment', description: 'Du bist ein Geschenk, das ich nie mehr missen möchte.', content: '<p>Wenn ich an dich denke, kommt ein warmes Gefühl in mich.</p><p>Du bist mein Zuhause und meine beste Erinnerung.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 5, title: 'Abenteuer', subtitle: 'Gemeinsam', description: 'Die schönsten Reisen sind die, die wir gemeinsam erleben.', content: '<p>Ich freue mich auf alle kleinen Abenteuer, die wir noch erleben werden.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 6, title: 'Heimelig', subtitle: 'Die schönsten Räume', description: 'Zu Hause bin ich am liebsten mit dir.', content: '<p>Alles wird mir leichter, wenn du da bist.</p><p>Ich liebe die Nähe zu dir und die Ruhe, die du in mich bringst.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 7, title: 'Danksagung', subtitle: 'Für dich', description: 'Danke für deine Wärme, deinen Humor und dein Herz.', content: '<p>Ich bin dankbar für jedes Gespräch, jeden Moment und jede gemeinsame Erinnerung.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 8, title: 'Zauber', subtitle: 'Die Magie in dir', description: 'Es gibt etwas Besonderes an dir, das alles heller macht.', content: '<p>Du bringst Licht in die dunkelsten Tage.</p><p>Vielleicht genau deshalb fühlt sich alles mit dir so besonders an.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 9, title: 'Kuschelzeit', subtitle: 'Die beste Gewohnheit', description: 'Kleine Momente, in denen wir einfach da sind.', content: '<p>Wenn wir uns aneinander kuscheln, fühlt sich alles richtig an.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 10, title: 'Lächeln', subtitle: 'Deines', description: 'Wenn du lächelst, geht die Welt ein bisschen leichter.', content: '<p>Ich könnte Stunden nur dein Lächeln ansehen.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 11, title: 'Stille', subtitle: 'Die ruhige Seite', description: 'Manchmal sind die schönsten Momente ganz leise.', content: '<p>Nur du und ich und die Zeit, die stehen bleibt.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 12, title: 'Sterne', subtitle: 'Unser Himmel', description: 'Wenn ich dich sehe, ist mein Himmel klarer.', content: '<p>Du bist wie ein Stern, der alles heller macht.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 13, title: 'Fantasie', subtitle: 'Die Zukunft', description: 'Die beste Zukunft ist die, die wir teilen.', content: '<p>Ich freue mich auf all die Dinge, die wir noch erleben.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 14, title: 'Märchen', subtitle: 'Wie im Film', description: 'Manchmal fühlt sich Liebe wie ein kleines Wunder an.', content: '<p>Kein Tag mit dir ist gewöhnlich – alles fühlt sich besonders an.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 15, title: 'Festtag', subtitle: 'Unser Weihnachtsgefühl', description: 'Ich liebe, wie du die Weihnachtszeit mit Sonne füllst.', content: '<p>Für mich ist Weihnachten am schönsten, wenn ich mit dir zusammen bin.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 16, title: 'Glow', subtitle: 'Die Wellen deiner Nähe', description: 'Du machst die Welt warm und freundlich.', content: '<p>Wenn du bist, fühlt sich alles leichter an und ein bisschen schöner.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 17, title: 'Glueck', subtitle: 'Ein Geschenk', description: 'Du bist eines der größten Glücke in meinem Leben.', content: '<p>Ich bin so dankbar für dich.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 18, title: 'Genau richtig', subtitle: 'Wie du bist', description: 'Es gibt keinen Grund, dich zu ändern. Du bist perfekt so.', content: '<p>Ich liebe dich genau so, wie du bist.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 19, title: 'Familie', subtitle: 'Unsere Welt', description: 'Die kleinsten Dinge mit dir sind meine liebsten Erinnerungen.', content: '<p>Ich liebe die Zeit, in der wir nur wir sind.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 20, title: 'Augenblicke', subtitle: 'Die wertvollsten', description: 'Jeder Moment mit dir zählt, egal wie klein er ist.', content: '<p>Manchmal sind die schönsten Dinge die, die keiner fotografiert.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 21, title: 'Zukunft', subtitle: 'Gemeinsam', description: 'Ich sehe uns in vielen schönen Jahren, Lachen und Abenteuern.', content: '<p>Ich freue mich auf alles, was wir noch zusammen schaffen werden.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 22, title: 'Sofort', subtitle: 'Für dich', description: 'Wenn ich dich liebe, dann immer und ohne Zweifel.', content: '<p>Du bist mein Lieblingsort und meine größte Freude.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 23, title: 'Späte Nacht', subtitle: 'Mit dir', description: 'Die beste Nacht ist die, in der du neben mir bist.', content: '<p>Ich mag die ruhigen Momente, in denen die Welt vor uns zurücktritt.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false },
      { id: 24, title: 'Weihnachten', subtitle: 'Mein Lieblingsgeschenk', description: 'Du bist die schönste Überraschung, die ich je bekommen habe.', content: '<p>Für dich wünsche ich ein wunderschönes Weihnachten, voll Liebe, Wärme und unvergesslicher Momente.</p><p>Ich liebe dich.</p>', images: [], videos: [], links: [], active: true, manualUnlocked: false, opened: false }
    ]
  };

  function clone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function getStoredState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return clone(DEFAULT_STATE);
    }

    try {
      return JSON.parse(raw);
    } catch (error) {
      return clone(DEFAULT_STATE);
    }
  }

  function saveState(state) {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  async function loadSharedState() {
    let remoteState = null;
    try {
      const response = await fetch('./content.json', { cache: 'no-store' });
      if (response.ok) {
        remoteState = await response.json();
      } else if (location.protocol !== 'file:') {
        console.error(`content.json could not be loaded (HTTP ${response.status}).`);
      }
    } catch (error) {
      if (location.protocol !== 'file:') {
        console.error('content.json could not be loaded.', error);
      }
    }

    if (!remoteState || !Array.isArray(remoteState.doors)) {
      return location.protocol === 'file:';
    }

    const rawLocalState = localStorage.getItem(STORAGE_KEY);
    if (!rawLocalState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ensureDoorList(remoteState)));
      return true;
    }

    let localState;
    try {
      localState = JSON.parse(rawLocalState);
    } catch (error) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ensureDoorList(remoteState)));
      return true;
    }

    const remoteTime = Date.parse(remoteState && remoteState.updatedAt);
    const localTime = Date.parse(localState.updatedAt);
    if (Number.isFinite(remoteTime) && (!Number.isFinite(localTime) || remoteTime > localTime)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ensureDoorList(remoteState)));
    }
    return true;
  }

  function getCurrentDateInfo() {
    const now = new Date();
    return {
      month: now.getMonth(),
      date: now.getDate(),
      year: now.getFullYear()
    };
  }

  function getDoorUnlockState(door, state) {
    const { month, date } = getCurrentDateInfo();
    const isDecember = month === 11;
    const dateUnlocked = isDecember && Number(door.id) <= Number(date);

    return Boolean(door.manualUnlocked || state.unlockMode === 'all' || dateUnlocked);
  }

  function ensureDoorList(state) {
    if (!Array.isArray(state.doors) || state.doors.length !== 24) {
      state.doors = clone(DEFAULT_STATE.doors);
    }

    state.doors = state.doors.map((door, index) => {
      const fallback = clone(DEFAULT_STATE.doors[index]);
      const normalized = { ...fallback, ...door };
      normalized.id = index + 1;
      normalized.images = Array.isArray(normalized.images) ? normalized.images : [];
      normalized.videos = Array.isArray(normalized.videos) ? normalized.videos : [];
      normalized.links = Array.isArray(normalized.links) ? normalized.links : [];
      normalized.active = normalized.active !== false;
      normalized.manualUnlocked = Boolean(normalized.manualUnlocked);
      normalized.opened = Boolean(normalized.opened);
      return normalized;
    });

    state.backgroundImages = Array.isArray(state.backgroundImages)
      ? state.backgroundImages.filter(Boolean)
      : [];
    state.backgroundMessage = state.backgroundMessage || 'Hallo Anja';

    return state;
  }

  function sanitizeHtml(input) {
    const value = typeof input === 'string' ? input : '';
    const wrapper = document.createElement('div');
    wrapper.innerHTML = value;
    wrapper.querySelectorAll('script, iframe, object, embed, style').forEach((node) => node.remove());
    return wrapper.innerHTML;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatLinkLabel(link) {
    const stringValue = typeof link === 'string' ? link : (link && link.url) || '';
    return stringValue.replace(/^https?:\/\//i, '').replace(/\/$/, '') || 'Link';
  }

  function renderDoorMarkup(door) {
    const unlocked = getDoorUnlockState(door, getStoredState());
    const isOpen = Boolean(door.opened);
    const statusText = isOpen ? 'Geöffnet' : unlocked ? 'Freigeschaltet' : 'Gesperrt';
    const title = door.title || `Türchen ${door.id}`;
    const subtitle = door.subtitle || 'Weihnachtsfreude';

    return `
      <button type="button" class="door-card ${isOpen ? 'is-open' : ''} ${unlocked ? '' : 'is-locked'}" data-door-id="${door.id}" aria-label="${escapeHtml(title)} öffnen">
        <span class="door-face">
          <span class="door-number">${door.id}</span>
          <span class="door-content">
            <span>
              <span class="door-title">${escapeHtml(title)}</span>
              <span class="door-subtitle">${escapeHtml(subtitle)}</span>
            </span>
            <span class="door-pill">${statusText}</span>
          </span>
        </span>
      </button>
    `;
  }

  function openDoorModal(doorId) {
    const state = ensureDoorList(getStoredState());
    const door = state.doors.find((entry) => Number(entry.id) === Number(doorId));
    const modal = document.getElementById('doorModal');
    if (!door || !modal) return;

    const inner = document.getElementById('modalBody');
    const title = document.getElementById('modalTitle');
    const doorLabel = document.getElementById('doorNumberLabel');
    const isUnlocked = getDoorUnlockState(door, state);

    if (!door.active || !isUnlocked) {
      return;
    }

    door.opened = true;
    saveState(state);
    document.getElementById('doorGrid').innerHTML = state.doors.map(renderDoorMarkup).join('');
    bindDoorCards();

    title.textContent = door.title || `Türchen ${door.id}`;
    doorLabel.textContent = `Türchen ${door.id}`;

    const images = (door.images || []).map((src) => `
      <div class="media-item">
        <img src="${escapeHtml(src)}" alt="${escapeHtml(door.title || 'Türchen-Bild')}" />
      </div>
    `).join('');

    const videos = (door.videos || []).map((src) => `
      <div class="media-item">
        <video controls src="${escapeHtml(src)}" preload="metadata"></video>
      </div>
    `).join('');

    const links = (door.links || []).map((link) => {
      const url = typeof link === 'string' ? link : (link && link.url) || '#';
      const label = typeof link === 'string' ? formatLinkLabel(link) : (link && link.label) || formatLinkLabel(url);
      return `<a class="link-chip" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
    }).join('');

    const bodyContent = sanitizeHtml(door.content || '');
    const richContent = `
      ${door.description ? `<p class="modal-text">${escapeHtml(door.description)}</p>` : ''}
      ${bodyContent ? `<div class="modal-text">${bodyContent}</div>` : ''}
      ${images || videos ? `<div class="media-gallery">${images}${videos}</div>` : ''}
      ${links ? `<div class="link-list">${links}</div>` : ''}
    `;

    inner.innerHTML = richContent;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    updateModalNavigation(doorId);
  }

  function closeDoorModal() {
    const modal = document.getElementById('doorModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  }

  function updateModalNavigation(currentId) {
    const state = ensureDoorList(getStoredState());
    const prevBtn = document.getElementById('prevDoorBtn');
    const nextBtn = document.getElementById('nextDoorBtn');
    const total = state.doors.length;
    const currentIndex = Number(currentId) - 1;

    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= total - 1;

    prevBtn.onclick = () => {
      const prevDoor = state.doors[Math.max(0, currentIndex - 1)];
      if (prevDoor) openDoorModal(prevDoor.id);
    };
    nextBtn.onclick = () => {
      const nextDoor = state.doors[Math.min(total - 1, currentIndex + 1)];
      if (nextDoor) openDoorModal(nextDoor.id);
    };
  }

  function bindDoorCards() {
    document.querySelectorAll('[data-door-id]').forEach((button) => {
      button.addEventListener('click', () => {
        const doorId = Number(button.dataset.doorId);
        openDoorModal(doorId);
      });
    });
  }

  function updateCountdown() {
    const countdownPanel = document.getElementById('daysValue');
    if (!countdownPanel) return;

    const target = new Date(new Date().getFullYear(), 11, 24, 0, 0, 0);
    const now = new Date();
    let remaining = target.getTime() - now.getTime();

    if (remaining < 0) {
      remaining = 0;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById('daysValue').textContent = String(days).padStart(2, '0');
    document.getElementById('hoursValue').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutesValue').textContent = String(minutes).padStart(2, '0');
    document.getElementById('secondsValue').textContent = String(seconds).padStart(2, '0');

    if (remaining === 0) {
      document.body.classList.add('christmas-reached');
      document.querySelector('.hero-copy h1').textContent = 'Merry Christmas, meine Liebe';
    }
  }

  function renderDecorativeScene(state) {
    const scene = document.getElementById('decorScene');
    if (!scene) return;

    const backgroundImages = (state.backgroundImages || []).slice(0, 4).map((src, index) => `
      <img src="${escapeHtml(src)}" alt="Weihnachtsfoto ${index + 1}" class="scene-photo scene-photo-${index + 1}" />
    `).join('');

    scene.innerHTML = `
      <div class="tree tree-left">
        <div class="tree-trunk"></div>
        <div class="tree-layer layer-1"></div>
        <div class="tree-layer layer-2"></div>
        <div class="tree-layer layer-3"></div>
        <div class="tree-lights">
          <span class="light l1"></span>
          <span class="light l2"></span>
          <span class="light l3"></span>
          <span class="light l4"></span>
          <span class="light l5"></span>
          <span class="light l6"></span>
        </div>
      </div>
      <div class="tree tree-right">
        <div class="tree-trunk"></div>
        <div class="tree-layer layer-1"></div>
        <div class="tree-layer layer-2"></div>
        <div class="tree-layer layer-3"></div>
        <div class="tree-lights">
          <span class="light l1"></span>
          <span class="light l2"></span>
          <span class="light l3"></span>
          <span class="light l4"></span>
          <span class="light l5"></span>
          <span class="light l6"></span>
        </div>
      </div>
      <div class="photo-collage">${backgroundImages || '<div class="photo-placeholder"></div>'}</div>
      <div class="santa-sledge" aria-hidden="true">
        <div class="santa">
          <div class="santa-hat"></div>
          <div class="santa-face"></div>
          <div class="santa-body"></div>
        </div>
        <div class="sleigh">
          <span class="sleigh-runner"></span>
          <span class="sleigh-runner"></span>
        </div>
        <div class="speech-bubble">${escapeHtml(state.backgroundMessage || 'Hallo Anja')}</div>
      </div>
    `;
  }

  function renderHomePage() {
    const state = ensureDoorList(getStoredState());
    const titleTag = document.querySelector('title');
    if (titleTag) {
      titleTag.textContent = state.pageTitle || 'Mein Weihnachtswunder';
    }

    renderDecorativeScene(state);

    document.getElementById('headerTitle').textContent = state.pageTitle || 'Mein Weihnachtswunder';
    document.getElementById('greetingText').textContent = state.greeting || 'Für dich, meine Liebe.';
    const loginTitle = document.getElementById('loginTitle');
    if (loginTitle) loginTitle.textContent = state.pageTitle || 'Mein Weihnachtswunder';

    const doorGrid = document.getElementById('doorGrid');
    if (doorGrid) {
      doorGrid.innerHTML = state.doors.map((door) => renderDoorMarkup(door)).join('');
      bindDoorCards();
    }

    const musicButton = document.getElementById('toggleMusicBtn');
    if (musicButton) {
      musicButton.textContent = state.musicEnabled ? '♪ Musik an' : '♪ Musik aus';
      musicButton.addEventListener('click', () => {
        const currentState = ensureDoorList(getStoredState());
        currentState.musicEnabled = !currentState.musicEnabled;
        saveState(currentState);
        toggleBackgroundMusic(currentState.musicEnabled, currentState.musicUrl);
        musicButton.textContent = currentState.musicEnabled ? '♪ Musik an' : '♪ Musik aus';
      });
    }

    const loginScreen = document.getElementById('loginScreen');
    const calendarApp = document.getElementById('calendarApp');
    const savedLogin = sessionStorage.getItem(USER_SESSION_KEY) === 'true';

    if (!savedLogin) {
      loginScreen.classList.remove('hidden');
      calendarApp.classList.add('hidden');
      return;
    }

    loginScreen.classList.add('hidden');
    calendarApp.classList.remove('hidden');

    if (state.countdownEnabled) {
      updateCountdown();
      setInterval(updateCountdown, 1000);
    } else {
      document.querySelector('.countdown-panel').style.display = 'none';
    }

    toggleBackgroundMusic(state.musicEnabled, state.musicUrl);
  }

  function toggleBackgroundMusic(enabled, musicUrl) {
    if (!musicUrl || !enabled) {
      const audioElement = document.querySelector('#bgMusic');
      if (audioElement) {
        audioElement.pause();
      }
      return;
    }

    let audioElement = document.querySelector('#bgMusic');
    if (!audioElement) {
      audioElement = document.createElement('audio');
      audioElement.id = 'bgMusic';
      audioElement.setAttribute('loop', 'loop');
      audioElement.volume = 0.18;
      document.body.appendChild(audioElement);
    }

    if (!audioElement.src || audioElement.src !== musicUrl) {
      audioElement.src = musicUrl;
    }

    audioElement.play().catch(() => {
      // Autoplay is blocked until the user interacts with the page.
    });
  }

  function initHomeLogin() {
    const form = document.getElementById('loginForm');
    const message = document.getElementById('loginMessage');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const password = document.getElementById('loginPassword').value.trim();
      const state = ensureDoorList(getStoredState());
      if (password === state.loginPassword) {
        sessionStorage.setItem(USER_SESSION_KEY, 'true');
        message.textContent = '';
        renderHomePage();
      } else {
        message.textContent = 'Falsches Passwort. Probiere es noch einmal.';
      }
    });
  }

  function showToast(message) {
    const toast = document.getElementById('adminToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
      toast.classList.remove('visible');
    }, 2200);
  }

  function populateDoorList(state) {
    const list = document.getElementById('doorList');
    if (!list) return;

    list.innerHTML = state.doors.map((door) => `
      <button type="button" class="door-list-item ${door.active ? '' : 'disabled'} ${door.id === Number(document.getElementById('doorIdInput')?.value || 1) ? 'is-selected' : ''}" data-door-list-id="${door.id}">
        <span>
          <strong>Türchen ${door.id}</strong>
          <small>${escapeHtml(door.title || 'Ohne Titel')}</small>
        </span>
        <span class="door-status">${door.opened ? 'Offen' : (door.active ? 'Aktiv' : 'Aus')}</span>
      </button>
    `).join('');

    list.querySelectorAll('[data-door-list-id]').forEach((item) => {
      item.addEventListener('click', () => {
        const selectedId = Number(item.dataset.doorListId);
        loadDoorIntoEditor(selectedId);
      });
    });
  }

  function fillSettingsForm(state) {
    const pageTitle = document.getElementById('pageTitleInput');
    const greeting = document.getElementById('greetingInput');
    const unlockMode = document.getElementById('unlockModeInput');
    const countdownEnabled = document.getElementById('countdownEnabledInput');
    const musicEnabled = document.getElementById('musicEnabledInput');
    const musicUrl = document.getElementById('musicUrlInput');
    const backgroundImages = document.getElementById('backgroundImagesInput');
    const backgroundMessage = document.getElementById('backgroundMessageInput');
    const loginPassword = document.getElementById('loginPasswordInput');
    const adminPassword = document.getElementById('adminPasswordInput');

    if (pageTitle) pageTitle.value = state.pageTitle || '';
    if (greeting) greeting.value = state.greeting || '';
    if (unlockMode) unlockMode.value = state.unlockMode || 'date';
    if (countdownEnabled) countdownEnabled.checked = Boolean(state.countdownEnabled);
    if (musicEnabled) musicEnabled.checked = Boolean(state.musicEnabled);
    if (musicUrl) musicUrl.value = state.musicUrl || '';
    if (backgroundImages) backgroundImages.value = (state.backgroundImages || []).join('\n');
    if (backgroundMessage) backgroundMessage.value = state.backgroundMessage || 'Hallo Anja';
    if (loginPassword) loginPassword.value = state.loginPassword || '';
    if (adminPassword) adminPassword.value = state.adminPassword || '';
  }

  function loadDoorIntoEditor(doorId) {
    const state = ensureDoorList(getStoredState());
    const door = state.doors.find((entry) => Number(entry.id) === Number(doorId));
    if (!door) return;

    document.getElementById('doorIdInput').value = door.id;
    document.getElementById('doorTitleInput').value = door.title || '';
    document.getElementById('doorSubtitleInput').value = door.subtitle || '';
    document.getElementById('doorDescriptionInput').value = door.description || '';
    document.getElementById('doorContentInput').value = door.content || '';
    document.getElementById('doorImagesInput').value = (door.images || []).join('\n');
    document.getElementById('doorVideosInput').value = (door.videos || []).join('\n');
    document.getElementById('doorLinksInput').value = (door.links || []).join('\n');
    document.getElementById('doorActiveInput').checked = door.active !== false;
    document.getElementById('doorManualUnlockInput').checked = Boolean(door.manualUnlocked);
    document.getElementById('doorOpenedInput').checked = Boolean(door.opened);

    document.querySelectorAll('.door-list-item').forEach((item) => {
      item.classList.toggle('is-selected', Number(item.dataset.doorListId) === Number(door.id));
    });
  }

  function saveCurrentDoor() {
    const state = ensureDoorList(getStoredState());
    const selectedId = Number(document.getElementById('doorIdInput').value || 1);
    const door = state.doors.find((entry) => Number(entry.id) === selectedId);

    if (!door) return;

    door.title = document.getElementById('doorTitleInput').value.trim();
    door.subtitle = document.getElementById('doorSubtitleInput').value.trim();
    door.description = document.getElementById('doorDescriptionInput').value.trim();
    door.content = document.getElementById('doorContentInput').value.trim();
    door.images = parseInputLines(document.getElementById('doorImagesInput').value);
    door.videos = parseInputLines(document.getElementById('doorVideosInput').value);
    door.links = parseInputLines(document.getElementById('doorLinksInput').value);
    door.active = document.getElementById('doorActiveInput').checked;
    door.manualUnlocked = document.getElementById('doorManualUnlockInput').checked;
    door.opened = document.getElementById('doorOpenedInput').checked;

    saveState(state);
    populateDoorList(state);
    showToast('Türchen gespeichert');
  }

  function parseInputLines(value) {
    return String(value || '')
      .split(/\n|,/) 
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function initAdminLogin() {
    const form = document.getElementById('adminLoginForm');
    const screen = document.getElementById('adminLoginScreen');
    const app = document.getElementById('adminApp');
    const message = document.getElementById('adminLoginMessage');

    if (!form) return;

    const renderAdminState = () => {
      const isLoggedIn = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
      if (isLoggedIn) {
        screen.classList.add('hidden');
        app.classList.remove('hidden');
        const state = ensureDoorList(getStoredState());
        fillSettingsForm(state);
        renderDecorativeScene(state);
        populateDoorList(state);
        loadDoorIntoEditor(1);
      } else {
        screen.classList.remove('hidden');
        app.classList.add('hidden');
      }
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const state = ensureDoorList(getStoredState());
      const value = document.getElementById('adminPassword').value.trim();

      if (value === state.adminPassword) {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        message.textContent = '';
        renderAdminState();
      } else {
        message.textContent = 'Falsches Admin-Passwort.';
      }
    });

    document.getElementById('adminLogoutBtn')?.addEventListener('click', () => {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      renderAdminState();
    });

    renderAdminState();
  }

  function initAdminInteractions() {
    const state = ensureDoorList(getStoredState());

    document.getElementById('settingsForm')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const nextState = ensureDoorList(getStoredState());
      nextState.pageTitle = document.getElementById('pageTitleInput').value.trim() || 'Mein Weihnachtswunder';
      nextState.greeting = document.getElementById('greetingInput').value.trim() || 'Für dich, meine Liebe.';
      nextState.unlockMode = document.getElementById('unlockModeInput').value;
      nextState.countdownEnabled = document.getElementById('countdownEnabledInput').checked;
      nextState.musicEnabled = document.getElementById('musicEnabledInput').checked;
      nextState.musicUrl = document.getElementById('musicUrlInput').value.trim();
      nextState.backgroundImages = parseInputLines(document.getElementById('backgroundImagesInput').value);
      nextState.backgroundMessage = document.getElementById('backgroundMessageInput').value.trim() || 'Hallo Anja';
      renderDecorativeScene(nextState);
      saveState(nextState);
      showToast('Einstellungen gespeichert');
    });

    document.getElementById('passwordForm')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const nextState = ensureDoorList(getStoredState());
      nextState.loginPassword = document.getElementById('loginPasswordInput').value.trim() || nextState.loginPassword;
      nextState.adminPassword = document.getElementById('adminPasswordInput').value.trim() || nextState.adminPassword;
      saveState(nextState);
      showToast('Passwörter gespeichert');
    });

    document.getElementById('doorEditorForm')?.addEventListener('submit', (event) => {
      event.preventDefault();
      saveCurrentDoor();
    });

    document.getElementById('resetDoorsBtn')?.addEventListener('click', () => {
      const nextState = ensureDoorList(getStoredState());
      nextState.doors = nextState.doors.map((door) => ({ ...door, opened: false, manualUnlocked: false }));
      saveState(nextState);
      populateDoorList(nextState);
      loadDoorIntoEditor(1);
      showToast('Türchen zurückgesetzt');
    });

    document.getElementById('exportJsonBtn')?.addEventListener('click', () => {
      const payload = JSON.stringify(ensureDoorList(getStoredState()), null, 2);
      const blob = new Blob([payload], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'content.json';
      anchor.click();
      URL.revokeObjectURL(url);
      showToast('JSON-Datei exportiert');
    });

    document.getElementById('importJsonBtn')?.addEventListener('click', () => {
      document.getElementById('jsonFileInput').click();
    });

    document.getElementById('jsonFileInput')?.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          const nextState = ensureDoorList(parsed);
          saveState(nextState);
          fillSettingsForm(nextState);
          populateDoorList(nextState);
          loadDoorIntoEditor(1);
          showToast('JSON importiert');
        } catch (error) {
          showToast('JSON-Datei ungültig');
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    });

    fillSettingsForm(state);
    populateDoorList(state);
    loadDoorIntoEditor(1);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const page = document.body.dataset.page;
    const sharedStateLoaded = await loadSharedState();
    if (!sharedStateLoaded) {
      const messageId = page === 'admin' ? 'adminLoginMessage' : 'loginMessage';
      const message = document.getElementById(messageId);
      if (message) {
        message.textContent = 'Kalenderdaten konnten nicht geladen werden. Bitte lade die Seite erneut.';
      }
      return;
    }

    if (page === 'home') {
      initHomeLogin();
      renderHomePage();
      document.querySelectorAll('[data-close-modal]').forEach((element) => {
        element.addEventListener('click', closeDoorModal);
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeDoorModal();
        }
      });
      return;
    }

    if (page === 'admin') {
      renderDecorativeScene(ensureDoorList(getStoredState()));
      initAdminLogin();
      initAdminInteractions();
    }
  });
})();
