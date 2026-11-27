/* LingoLokal: Main Application Controller (All 9 Interactive Views, Live Timer, TTS, SM-2, Quiz, Reading, Charts) */
(function (global) {
  'use strict';

  const { LANGUAGE_CATALOG, SCRIPT_DATA, LATIN_NOTES, CONJUGATION_DATA, EXAM_DATA, convertPhonetic, buildJsonTemplate } = global.LingoData;
  const Store = global.LingoStorage;

  // --- SVG Icon Library (Consistent 1.8px stroke, relevant to each function) ---
  const ICONS = {
    dashboard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>',
    alphabet: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>',
    modules: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    flashcards: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="16" height="13" rx="2"/><path d="M7 6V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/></svg>',
    quiz: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    dialogs: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    readings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    grammar: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>',
    dictionary: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    sprint: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/></svg>',
    writing: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    refresh: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>',
    stats: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>',
    settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    speaker: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    studyplan: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>',
    conjugation: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19h16"/><path d="M4 15l4-9 4 9"/><path d="M5.5 12h5"/><path d="M14 15l3-6 3 6"/><path d="M15 13h4"/></svg>',
    exam: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    lock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
  };

  const SCRIPT_GATED_VIEWS = new Set([
    'flashcards', 'conjugation', 'quiz', 'dialogs', 'readings', 'grammar', 'exam', 'dictionary', 'sprint'
  ]);

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Beranda', group: 'start', title: 'Beranda · Fokus Hari Ini' },
    { id: 'modules', label: 'Peta Belajar', group: 'start', title: 'Peta Belajar & Jalur Modul' },
    { id: 'alphabet', label: 'Kartu Aksara', group: 'start', title: 'Pengenalan Huruf & Aksara' },
    { id: 'writing', label: 'Tulis Aksara', group: 'start', title: 'Latihan Tulis Aksara' },
    { id: 'grammar', label: 'Tata Bahasa', group: 'start', title: 'Katalog Tata Bahasa' },
    { id: 'flashcards', label: 'Kartu Hafalan', group: 'practice', title: 'Kartu Hafalan Terjadwal' },
    { id: 'quiz', label: 'Quiz Harian', group: 'practice', title: 'Quiz Interaktif Harian' },
    { id: 'conjugation', label: 'Perubahan Kata', group: 'practice', title: 'Latihan Perubahan Kata' },
    { id: 'sprint', label: 'Sprint 60 Detik', group: 'practice', title: 'Mode Sprint 60 Detik' },
    { id: 'dialogs', label: 'Dialog', group: 'practice', title: 'Dialog Role-Play' },
    { id: 'readings', label: 'Bacaan', group: 'practice', title: 'Bacaan Klik-Kata & Simpan Kalimat' },
    { id: 'dictionary', label: 'Kamus 3x3', group: 'practice', title: 'Kamus Bahasa (Grid 3x3)' },
    { id: 'stats', label: 'Statistik', group: 'secondary', title: 'Statistik, Streak & Lencana' },
    { id: 'studyplan', label: 'Rencana Belajar', group: 'secondary', title: 'Rencana Belajar Personal' },
    { id: 'exam', label: 'Strategi Ujian', group: 'secondary', title: 'Strategi Ujian & Try-Out' },
    { id: 'settings', label: 'Pengaturan', group: 'secondary', title: 'Pengaturan, Import & Backup' }
  ];

  // Consolidated 6 Primary Hubs (reduces 16 flat sidebar items to 6 clear destinations)
  const HUB_NAV = [
    { id: 'hub-dashboard', label: 'Beranda', icon: 'dashboard', group: 'start', defaultView: 'dashboard', views: ['dashboard'] },
    { id: 'hub-learn', label: 'Belajar', icon: 'modules', group: 'start', defaultView: 'modules', views: ['modules', 'alphabet', 'writing', 'grammar'] },
    { id: 'hub-practice', label: 'Latihan', icon: 'flashcards', group: 'start', defaultView: 'flashcards', views: ['flashcards', 'quiz', 'conjugation', 'sprint'] },
    { id: 'hub-immerse', label: 'Imersi', icon: 'dialogs', group: 'start', defaultView: 'dialogs', views: ['dialogs', 'readings', 'dictionary'] },
    { id: 'hub-progress', label: 'Progres', icon: 'stats', group: 'secondary', defaultView: 'stats', views: ['stats', 'studyplan', 'exam'] },
    { id: 'hub-settings', label: 'Pengaturan', icon: 'settings', group: 'secondary', defaultView: 'settings', views: ['settings'] }
  ];

  const ttsWarnedLangs = new Set();

  // --- Runtime App State ---
  let state = null;
  let currentView = 'dashboard';
  let timerPaused = false;
  let timerInterval = null;
  let unsavedSeconds = 0;
  let chartInstance = null;
  let revealTimer = null;
  let deferredInstallPrompt = null;
  let swRegistered = false;

  // Per-view transient UI state
  const ui = {
    dashFilter: 'all', // all | active | importable
    dashTryInput: '',
    modLevel: 'ALL',
    modStatus: 'all', // all | done | todo
    modQuery: '',
    modViewMode: 'tree', // tree | list
    treeSelectedId: null,
    fcModule: 'ALL',
    fcDueOnly: true,
    fcMinedOnly: false,
    fcQueue: [],
    fcIndex: 0,
    fcFlipped: false,
    quizModule: 'ALL',
    quizFilterIds: null, // array of quiz IDs when launched from Grammar
    quizList: [],
    quizIdx: 0,
    quizScore: 0,
    quizAnswered: false,
    quizFeedback: null,
    quizSelectedOption: null,
    quizWordOrder: [],
    quizTranslationText: '',
    quizMatchLeft: null,
    quizMatchPairs: {}, // left -> right
    quizMatchWrong: null,
    quizFinished: false,
    quizDateKey: '',
    dialogId: null,
    dialogRoleMode: 'all', // all | A | B
    dialogShowRomaji: true,
    dialogShowTrans: true,
    dialogRevealed: {},
    readingId: null,
    readingMode: 'translation', // translation | romaji | reading | hide
    readingToken: null,
    readingCompAnswer: null,
    grammarQuery: '',
    dictLevel: 'ALL',
    dictQuery: '',
    dictBatchIds: [],
    sprintActive: false,
    sprintPaused: false,
    sprintFinished: false,
    sprintTimeLeft: 60,
    sprintScore: 0,
    sprintTotal: 0,
    sprintCombo: 0,
    sprintMaxCombo: 0,
    sprintNewRecord: false,
    sprintQuestion: null,
    sprintFlash: null, // { opt, ok }
    writeIndex: 0,
    writeShowGhost: true,
    writeStrokes: [],
    writeCustomItem: null,
    scriptTabId: null,
    scriptMode: 'table', // table | quiz
    scriptSelectedId: null,
    scriptQuizQ: null,
    scriptQuizPicked: null,
    scriptQuizStreak: 0,
    conjForm: 'ALL',
    conjMode: 'choice', // choice | type
    conjIdx: 0,
    conjPicked: null,
    conjTyped: '',
    conjShowRule: false,
    conjStreak: 0,
    examTryoutActive: false,
    examTryoutDone: false,
    examTryoutTimeLeft: 300,
    examTryoutQuestions: [],
    examTryoutIdx: 0,
    examTryoutAnswers: {},
    planGoal: 'conversation',
    planMinutes: 20,
    planDays: 14,
    achCategory: 'ALL',
    settingsTemplateLang: 'en'
  };
  let sprintInterval = null;
  let examInterval = null;
  let appReady = false;

  // --- Utilities ---
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getCatalogMeta(code) {
    return LANGUAGE_CATALOG.find((l) => l.code === code) || LANGUAGE_CATALOG[0];
  }

  function getActivePack() {
    return state && state.packs ? state.packs[state.activeLang] || null : null;
  }

  function formatTimer(totalSec) {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function showToast(message, type = 'default') {
    const region = document.getElementById('toast-region');
    if (!region) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message;
    region.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 3400);
  }

  // --- Web Speech API (1x normal / 0.75x pelan) with voice detection ---
  function updateAudioSpeedUI() {
    const btn = document.getElementById('audio-speed-btn');
    if (!btn || !state) return;
    const slow = Boolean(state.settings && state.settings.slowAudio);
    btn.textContent = slow ? '0.75x' : '1x';
    btn.classList.toggle('is-slow', slow);
    btn.setAttribute('aria-pressed', String(slow));
    btn.setAttribute('aria-label', slow ? 'Kecepatan audio pelan 0.75x (ketuk untuk normal 1x)' : 'Kecepatan audio normal 1x (ketuk untuk pelan 0.75x)');
  }

  function speakText(text, langCode, triggerBtn = null) {
    if (!text) return;
    try {
      if (!('speechSynthesis' in global)) {
        showToast('Audio TTS tidak didukung di browser ini.', 'error');
        return;
      }
      document.querySelectorAll('.audio-btn.is-speaking').forEach((b) => b.classList.remove('is-speaking'));
      const meta = getCatalogMeta(langCode || state.activeLang);
      const pack = state.packs[meta.code];
      const ttsLang = (pack && pack.language && pack.language.tts_lang) || meta.tts_lang || 'en-US';
      const voices = global.speechSynthesis.getVoices ? global.speechSynthesis.getVoices() : [];
      if (voices.length > 0 && !ttsWarnedLangs.has(meta.code)) {
        const prefix = ttsLang.split('-')[0].toLowerCase();
        const hasMatch = voices.some((v) => String(v.lang || '').toLowerCase().startsWith(prefix));
        if (!hasMatch) {
          ttsWarnedLangs.add(meta.code);
          showToast(`Paket suara ${meta.name_id} belum terpasang di perangkat ini; memakai suara default.`, 'default');
        }
      }
      global.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = ttsLang;
      utter.rate = (state && state.settings && state.settings.slowAudio) ? 0.72 : 0.92;
      if (triggerBtn) {
        triggerBtn.classList.add('is-speaking');
        const clearBtn = () => triggerBtn.classList.remove('is-speaking');
        utter.onend = clearBtn;
        utter.onerror = clearBtn;
      }
      global.speechSynthesis.speak(utter);
    } catch (_err) {
      showToast('Gagal memutar audio pelafalan.', 'error');
    }
  }

  // --- Theme Management (Modern Web Guidance: dark-mode-toggle) ---
  function getSystemTheme() {
    return global.matchMedia && global.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredScheme() {
    try {
      const v = global.localStorage.getItem('color-scheme');
      return v === 'light' || v === 'dark' ? v : null;
    } catch (_e) {
      return null;
    }
  }

  function applyColorScheme(scheme) {
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.content = scheme === 'light' || scheme === 'dark' ? scheme : 'light dark';
    }
    const sr = document.getElementById('theme-toggle-sr');
    const resolved = scheme || getSystemTheme();
    if (sr) {
      sr.textContent = resolved === 'dark' ? 'Beralih ke tema terang' : 'Beralih ke tema gelap';
    }
    if (currentView === 'stats') {
      renderStatsChart();
    } else if (currentView === 'writing') {
      redrawWritingCanvas(document.getElementById('writing-canvas'));
    }
  }

  function setColorSchemePreference(pref) {
    try {
      if (pref === 'light' || pref === 'dark') {
        global.localStorage.setItem('color-scheme', pref);
      } else {
        global.localStorage.removeItem('color-scheme');
      }
    } catch (_e) {}
    applyColorScheme(pref === 'light' || pref === 'dark' ? pref : null);
  }

  function toggleThemeTwoState() {
    const sys = getSystemTheme();
    const stored = getStoredScheme();
    const rendered = stored || sys;
    const target = rendered === 'dark' ? 'light' : 'dark';
    if (target === sys) {
      setColorSchemePreference('system');
    } else {
      setColorSchemePreference(target);
    }
  }

  // --- Mobile Navigation Drawer (Modern Web Guidance: navigation-drawer) ---
  function initMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const openBtn = document.getElementById('drawer-open');
    const closeBtn = document.getElementById('drawer-close');
    if (!drawer || !openBtn || !closeBtn) return;

    const scroller = drawer.querySelector('.Drawer-scroller');
    const sheet = drawer.querySelector('.Drawer-sheet');

    async function openDrawer() {
      if (drawer.open) return;
      drawer.showModal();
      if (!CSS.supports('scroll-initial-target', 'nearest')) {
        scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'instant' });
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      }
      scroller.scrollTo({ left: 0, behavior: 'auto' });
      openBtn.setAttribute('aria-expanded', 'true');
    }

    let closeTimer = null;

    function finishClose() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      if (drawer.open) drawer.close();
      openBtn.setAttribute('aria-expanded', 'false');
    }

    function closeDrawer() {
      if (!drawer.open) return;
      const reduced = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        finishClose();
        return;
      }
      scroller.scrollTo({ left: scroller.scrollWidth, behavior: 'auto' });
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(finishClose, 260);
    }

    scroller.addEventListener('scrollend', () => {
      if (drawer.open && scroller.scrollLeft >= sheet.offsetWidth - 4) {
        finishClose();
      }
    });

    // Backdrop fade fallback when scroll-driven animations unsupported
    if (!CSS.supports('animation-timeline: scroll()')) {
      scroller.addEventListener('scroll', () => {
        const w = sheet.offsetWidth || 1;
        const ratio = Math.max(0, Math.min(1, 1 - scroller.scrollLeft / w));
        drawer.style.setProperty('--drawer-backdrop', String(ratio));
      });
    }

    const visibleThreshold = 1 / Math.max(320, global.innerWidth);
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      if (!entry) return;
      if (drawer.open && entry.intersectionRatio < visibleThreshold) {
        finishClose();
      } else if (drawer.open && entry.intersectionRatio >= 0.99) {
        openBtn.setAttribute('aria-expanded', 'true');
      }
    }, { root: drawer, threshold: [visibleThreshold, 1] });
    observer.observe(sheet);

    openBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    drawer.addEventListener('click', (ev) => {
      if (!sheet.contains(ev.target)) closeDrawer();
    });
    drawer.addEventListener('cancel', (ev) => {
      if (ev.cancelable) {
        ev.preventDefault();
        closeDrawer();
      }
    });

    global.LingoDrawer = { open: openDrawer, close: closeDrawer };
  }

  // --- Dialog Light-Dismiss Fallback (Modern Web Guidance: dialog) ---
  function initDialogs() {
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const outside = (e, dialog) => {
        const r = dialog.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };
      document.querySelectorAll('dialog[closedby="any"]').forEach((dialog) => {
        let pressedOutside = false;
        dialog.addEventListener('pointerdown', (e) => { pressedOutside = outside(e, dialog); });
        dialog.addEventListener('pointerup', (e) => { if (pressedOutside && outside(e, dialog)) dialog.close(); });
      });
    }

    document.querySelectorAll('[data-close-dialog]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-close-dialog');
        const dlg = document.getElementById(id);
        if (dlg && dlg.open) dlg.close();
      });
    });

    // Add Card Form submission
    const addForm = document.getElementById('form-add-card');
    if (addForm) {
      addForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const pack = getActivePack();
        if (!pack) {
          showToast('Pilih bahasa aktif yang sudah punya paket materi terlebih dahulu.', 'error');
          return;
        }
        const fd = new FormData(addForm);
        const front = String(fd.get('front') || '').trim();
        const romaji = String(fd.get('romaji') || '').trim();
        const meaning = String(fd.get('meaning_id') || '').trim();
        if (!front || !romaji || !meaning) {
          showToast('Isi Teks Asli, Romaji, dan Arti terlebih dahulu.', 'error');
          return;
        }
        const moduleId = String(fd.get('module_id') || (pack.modules[0] && pack.modules[0].id) || `${state.activeLang}-custom`);
        const mod = pack.modules.find((m) => m.id === moduleId);
        const newCard = {
          id: `${state.activeLang}-custom-${Date.now()}`,
          module_id: moduleId,
          level: (mod && mod.level) || 'A0',
          category: 'pribadi',
          front,
          reading: String(fd.get('reading') || '').trim() || front,
          romaji,
          meaning_id: meaning,
          mnemonic: String(fd.get('mnemonic') || '').trim() || 'Kartu buatan pribadi.',
          example_native: String(fd.get('example_native') || '').trim(),
          example_romaji: '',
          example_id: String(fd.get('example_id') || '').trim(),
          srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
        };
        pack.flashcards.unshift(newCard);
        await persistState();
        addForm.reset();
        const dlg = document.getElementById('modal-add-card');
        if (dlg && dlg.open) dlg.close();
        showToast(`Kartu "${front}" ditambahkan ke deck SRS.`, 'success');
        rebuildFlashcardQueue();
        renderChrome();
        if (currentView === 'flashcards') renderView();
      });
    }

    // Sentence Mining Form submission
    const mineForm = document.getElementById('form-mine-sentence');
    if (mineForm) {
      mineForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const pack = getActivePack();
        if (!pack) {
          showToast('Pilih bahasa aktif yang sudah punya paket materi terlebih dahulu.', 'error');
          return;
        }
        const fd = new FormData(mineForm);
        const front = String(fd.get('front') || '').trim();
        const romaji = String(fd.get('romaji') || '').trim();
        const meaning = String(fd.get('meaning_id') || '').trim();
        const exNative = String(fd.get('example_native') || '').trim();
        const exId = String(fd.get('example_id') || '').trim();
        const note = String(fd.get('mnemonic') || '').trim();
        if (!front || !romaji || !meaning || !exNative) {
          showToast('Lengkapi kata target, cara baca, arti, dan kalimat konteksnya.', 'error');
          return;
        }
        const cardId = `${state.activeLang}-mine-${Date.now()}`;
        const newCard = {
          id: cardId,
          module_id: (pack.modules[0] && pack.modules[0].id) || `${state.activeLang}-mined`,
          level: (pack.modules[0] && pack.modules[0].level) || 'A0',
          category: 'tambang kalimat',
          source: 'mined',
          front,
          reading: front,
          romaji,
          meaning_id: meaning,
          mnemonic: note || 'Hasil Sentence Mining (i+1).',
          example_native: exNative,
          example_romaji: '',
          example_id: exId,
          srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
        };
        pack.flashcards.unshift(newCard);
        state.minedCardIds = state.minedCardIds || {};
        state.minedCardIds[state.activeLang] = state.minedCardIds[state.activeLang] || {};
        state.minedCardIds[state.activeLang][cardId] = true;
        Store.addXP(state, state.activeLang, 10);
        await persistState();
        mineForm.reset();
        const dlg = document.getElementById('modal-mine-sentence');
        if (dlg && dlg.open) dlg.close();
        showToast(`Kalimat dengan "${front}" ditambang ke Kartu SRS (+10 XP).`, 'success');
        rebuildFlashcardQueue();
        renderChrome();
        if (currentView === 'flashcards' || currentView === 'readings' || currentView === 'dialogs') renderView();
      });
    }

    // Reset Data confirmation dialog
    const resetDlg = document.getElementById('modal-reset');
    if (resetDlg) {
      resetDlg.addEventListener('close', async () => {
        const val = resetDlg.returnValue;
        resetDlg.returnValue = '';
        if (val === 'confirm') {
          state = Store.createInitialState();
          await persistState();
          resetViewStateForLang();
          renderChrome();
          navigate('dashboard');
          showToast('Semua data lokal telah direset ke kondisi bersih.', 'success');
        }
      });
    }
  }

  // --- Persistence & Live Study Timer ---
  function openMineSentenceModal(prefill = {}) {
    const dlg = document.getElementById('modal-mine-sentence');
    if (!dlg) return;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };
    setVal('mine-target-word', prefill.front);
    setVal('mine-romaji', prefill.romaji);
    setVal('mine-meaning', prefill.meaning_id);
    setVal('mine-sentence', prefill.example_native);
    setVal('mine-sentence-id', prefill.example_id);
    setVal('mine-note', prefill.mnemonic);
    dlg.showModal();
  }

  function stopExamTimer() {
    if (examInterval) {
      clearInterval(examInterval);
      examInterval = null;
    }
  }

  function notifyNewAchievements() {
    if (!appReady || !state) return;
    const newly = Store.detectNewlyUnlockedAchievements(state);
    if (newly.length > 0) {
      newly.forEach((ach) => {
        showToast(`Lencana Terbuka: ${ach.title} (${ach.tier.toUpperCase()})`, 'achievement');
      });
    }
  }

  async function persistState() {
    if (!state) return;
    notifyNewAchievements();
    await Store.saveState(state);
  }

  function startStudyTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (timerPaused || document.hidden || !state) return;
      const today = Store.getTodayKey(0);
      const log = Store.ensureDayLog(state, today);
      log.seconds = (log.seconds || 0) + 1;
      unsavedSeconds++;
      updateTimerDisplay();
      if (unsavedSeconds >= 15) {
        unsavedSeconds = 0;
        persistState();
        updateGoalBars();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const today = Store.getTodayKey(0);
    const log = state.dailyLogs[today] || { seconds: 0 };
    const formatted = formatTimer(log.seconds || 0);
    const clock = document.getElementById('timer-display');
    const dot = document.getElementById('timer-dot');
    const lbl = document.getElementById('timer-toggle-label');
    const btn = document.getElementById('timer-toggle-btn');
    if (clock) clock.textContent = formatted;
    if (dot) dot.classList.toggle('paused', timerPaused);
    if (lbl) lbl.textContent = timerPaused ? 'Lanjut' : 'Jeda';
    if (btn) btn.setAttribute('aria-label', timerPaused ? 'Lanjutkan timer belajar' : 'Jeda timer belajar');

    const dClock = document.getElementById('drawer-timer-display');
    const dDot = document.getElementById('drawer-timer-dot');
    const dLbl = document.getElementById('drawer-timer-toggle-label');
    const dBtn = document.getElementById('drawer-timer-toggle-btn');
    if (dClock) dClock.textContent = formatted;
    if (dDot) dDot.classList.toggle('paused', timerPaused);
    if (dLbl) dLbl.textContent = timerPaused ? 'Lanjut' : 'Jeda';
    if (dBtn) dBtn.setAttribute('aria-label', timerPaused ? 'Lanjutkan timer belajar' : 'Jeda timer belajar');
  }

  // --- Global Chrome (Nav, Language Selector, Streak, Goal Progress) ---
  function getDueCountForLang(langCode) {
    const pack = state.packs[langCode];
    if (!pack || !Array.isArray(pack.flashcards)) return 0;
    const today = Store.getTodayKey(0);
    return pack.flashcards.filter((c) => Store.isCardDue(c, today)).length;
  }

  function renderLangSelectors() {
    const activeMeta = getCatalogMeta(state.activeLang);
    const chevronSvg = '<svg class="lang-trigger-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

    const triggerHtml = `
      <span class="lang-trigger-stamp" aria-hidden="true">${esc(activeMeta.stamp)}</span>
      <span class="lang-trigger-text">
        <span class="lang-trigger-name">${esc(activeMeta.name_id)}</span>
        <span class="lang-trigger-native">${esc(activeMeta.name_native)}</span>
      </span>
      ${chevronSvg}
    `;

    const menuHtml = LANGUAGE_CATALOG.map((lang) => {
      const p = state.packs[lang.code];
      const selected = state.activeLang === lang.code;
      const sub = p ? `${lang.name_native} · ${p.modules.length} modul` : `${lang.name_native} · Import JSON`;
      return `
        <button type="button" class="lang-option" role="option" data-lang-option="${lang.code}" aria-selected="${selected}">
          <span class="lang-option-stamp" aria-hidden="true">${esc(lang.stamp)}</span>
          <span class="lang-option-info">
            <span class="lang-option-title">${esc(lang.name_id)}</span>
            <span class="lang-option-sub">${esc(sub)}</span>
          </span>
          ${selected ? `<span class="lang-option-check">${ICONS.check}</span>` : ''}
        </button>
      `;
    }).join('');

    ['sidebar', 'topbar'].forEach((prefix) => {
      const trig = document.getElementById(`${prefix}-lang-trigger`);
      const menu = document.getElementById(`${prefix}-lang-menu`);
      if (trig) trig.innerHTML = triggerHtml;
      if (menu) menu.innerHTML = menuHtml;
    });
  }

  let langCloseTimers = {};

  function closeAllLangPickers(restoreFocusPrefix = null) {
    ['sidebar', 'topbar'].forEach((prefix) => {
      const trig = document.getElementById(`${prefix}-lang-trigger`);
      const menu = document.getElementById(`${prefix}-lang-menu`);
      if (!trig || !menu) return;
      if (trig.getAttribute('aria-expanded') === 'true') {
        trig.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        if (langCloseTimers[prefix]) clearTimeout(langCloseTimers[prefix]);
        langCloseTimers[prefix] = setTimeout(() => {
          if (trig.getAttribute('aria-expanded') !== 'true') {
            menu.hidden = true;
          }
        }, 200);
        if (restoreFocusPrefix === prefix) trig.focus();
      }
    });
  }

  function openLangPicker(prefix) {
    const trig = document.getElementById(`${prefix}-lang-trigger`);
    const menu = document.getElementById(`${prefix}-lang-menu`);
    if (!trig || !menu) return;
    const isAlreadyOpen = trig.getAttribute('aria-expanded') === 'true';
    closeAllLangPickers();
    if (isAlreadyOpen) return;

    if (langCloseTimers[prefix]) clearTimeout(langCloseTimers[prefix]);
    menu.hidden = false;
    trig.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => {
      menu.classList.add('is-open');
      const selectedOpt = menu.querySelector('[aria-selected="true"]');
      if (selectedOpt) selectedOpt.scrollIntoView({ block: 'nearest' });
    });
  }

  function openBottomSheet(title, bodyHtml) {
    const sheet = document.getElementById('mobile-bottom-sheet');
    const titleEl = document.getElementById('bottom-sheet-title');
    const bodyEl = document.getElementById('bottom-sheet-body');
    if (!sheet || !titleEl || !bodyEl) return;
    titleEl.textContent = title || 'Detail';
    bodyEl.innerHTML = bodyHtml || '';
    if (!sheet.open) sheet.showModal();
  }

  function closeBottomSheet() {
    const sheet = document.getElementById('mobile-bottom-sheet');
    if (sheet && sheet.open) sheet.close();
  }

  function initBottomSheet() {
    const sheet = document.getElementById('mobile-bottom-sheet');
    const closeBtn = document.getElementById('bottom-sheet-close');
    const bodyEl = document.getElementById('bottom-sheet-body');
    if (!sheet || !bodyEl) return;

    if (closeBtn) closeBtn.addEventListener('click', closeBottomSheet);
    sheet.addEventListener('click', (ev) => {
      if (ev.target === sheet) closeBottomSheet();
    });

    bodyEl.addEventListener('click', (ev) => {
      const langOpt = ev.target.closest('[data-lang-option]');
      if (langOpt) {
        const code = langOpt.getAttribute('data-lang-option');
        closeBottomSheet();
        setActiveLang(code);
        return;
      }

      const speakBtn = ev.target.closest('[data-speak]');
      if (speakBtn) {
        const txt = speakBtn.getAttribute('data-speak');
        const lang = speakBtn.getAttribute('data-speak-lang') || state.activeLang;
        speakText(txt, lang);
        return;
      }

      const navBtn = ev.target.closest('[data-nav]');
      if (navBtn) {
        const target = navBtn.getAttribute('data-nav');
        closeBottomSheet();
        navigate(target);
        return;
      }

      const actBtn = ev.target.closest('[data-action]');
      if (actBtn) {
        const action = actBtn.getAttribute('data-action');
        const mod = actBtn.getAttribute('data-mod');
        closeBottomSheet();
        if (action === 'mod-to-fc' && mod) {
          navigate('flashcards', { fcModule: mod, fcDueOnly: false });
        } else if (action === 'mod-to-quiz' && mod) {
          navigate('quiz', { quizModule: mod });
        } else if (action === 'mod-to-dialog' && mod) {
          navigate('dialogs', { dialogModule: mod });
        } else {
          // Delegate back to main stage equivalent button if present
          const sel = mod
            ? `#main-content [data-action="${action}"][data-mod="${mod}"]`
            : `#main-content [data-action="${action}"]`;
          const mainBtn = document.querySelector(sel);
          if (mainBtn) mainBtn.click();
        }
      }
    });
  }

  function initLangPickers() {
    initBottomSheet();
    ['sidebar', 'topbar'].forEach((prefix) => {
      const trig = document.getElementById(`${prefix}-lang-trigger`);
      const menu = document.getElementById(`${prefix}-lang-menu`);
      if (!trig || !menu) return;

      trig.addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (prefix === 'topbar' && global.innerWidth <= 639) {
          openBottomSheet('Pilih Bahasa Belajar', `<div class="bottom-sheet-lang-list">${menu.innerHTML}</div>`);
          return;
        }
        openLangPicker(prefix);
      });

      trig.addEventListener('keydown', (ev) => {
        if (ev.key === 'ArrowDown' || ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          if (trig.getAttribute('aria-expanded') !== 'true') {
            openLangPicker(prefix);
          }
          requestAnimationFrame(() => {
            const first = menu.querySelector('[aria-selected="true"]') || menu.querySelector('.lang-option');
            if (first) first.focus();
          });
        }
      });

      menu.addEventListener('click', (ev) => {
        const opt = ev.target.closest('[data-lang-option]');
        if (!opt) return;
        const code = opt.getAttribute('data-lang-option');
        closeAllLangPickers(prefix);
        setActiveLang(code);
      });

      menu.addEventListener('keydown', (ev) => {
        const opts = Array.from(menu.querySelectorAll('.lang-option'));
        const idx = opts.indexOf(document.activeElement);
        if (ev.key === 'Escape') {
          ev.preventDefault();
          closeAllLangPickers(prefix);
        } else if (ev.key === 'ArrowDown') {
          ev.preventDefault();
          opts[(idx + 1) % opts.length]?.focus();
        } else if (ev.key === 'ArrowUp') {
          ev.preventDefault();
          opts[(idx - 1 + opts.length) % opts.length]?.focus();
        } else if (ev.key === 'Home') {
          ev.preventDefault();
          opts[0]?.focus();
        } else if (ev.key === 'End') {
          ev.preventDefault();
          opts[opts.length - 1]?.focus();
        }
      });
    });

    document.addEventListener('click', (ev) => {
      if (!ev.target.closest('.lang-picker')) {
        closeAllLangPickers();
      }
    });
  }

  function renderHubSubtabs(activeViewId) {
    const hub = HUB_NAV.find((h) => h.views.includes(activeViewId));
    if (!hub || hub.views.length <= 1) return '';
    const gate = Store.getScriptGateStatus(state, state.activeLang);
    const tabsHtml = hub.views.map((vid) => {
      const meta = NAV_ITEMS.find((n) => n.id === vid);
      if (!meta) return '';
      const active = vid === activeViewId;
      const isGated = !gate.unlocked && SCRIPT_GATED_VIEWS.has(vid);
      return `
        <button type="button" class="hub-subtab-btn ${active ? 'active' : ''} ${isGated ? 'is-gated' : ''}" data-nav="${esc(vid)}" ${active ? 'aria-current="page"' : ''}>
          ${isGated ? `<span class="hub-tab-lock">${ICONS.lock}</span>` : ''}
          <span>${esc(meta.label)}</span>
        </button>
      `;
    }).join('');
    return `<nav class="hub-subtabs" aria-label="Submenu ${esc(hub.label)}">${tabsHtml}</nav>`;
  }

  function renderNavLists() {
    const dueCount = getDueCountForLang(state.activeLang);
    const pack = getActivePack();
    const doneMods = pack
      ? pack.modules.filter((m) => state.completedModules[state.activeLang] && state.completedModules[state.activeLang][m.id]).length
      : 0;
    const totalMods = pack ? pack.modules.length : 0;
    const gate = Store.getScriptGateStatus(state, state.activeLang);

    const buildHubs = (group) => HUB_NAV.filter((h) => h.group === group).map((hub) => {
      const active = hub.views.includes(currentView);
      const targetView = (hub.id === 'hub-learn' && !gate.unlocked) ? 'alphabet' : hub.defaultView;
      let badge = '';
      if (hub.id === 'hub-learn') {
        if (!gate.unlocked) {
          badge = `<span class="nav-badge" title="Kuasai ${gate.required} huruf aksara">${gate.learned}/${gate.required}</span>`;
        } else if (totalMods > 0) {
          badge = `<span class="nav-badge-muted">${doneMods}/${totalMods}</span>`;
        }
      } else if (hub.id === 'hub-practice') {
        if (!gate.unlocked) {
          badge = `<span class="nav-lock-pill" title="Kuasai ${gate.required} huruf aksara dulu">${ICONS.lock}</span>`;
        } else if (dueCount > 0) {
          badge = `<span class="nav-badge" aria-label="${dueCount} kartu jatuh tempo">${dueCount}</span>`;
        }
      } else if (hub.id === 'hub-immerse' && !gate.unlocked) {
        badge = `<span class="nav-lock-pill" title="Kuasai ${gate.required} huruf aksara dulu">${ICONS.lock}</span>`;
      }
      return `<li><button type="button" class="nav-btn" data-nav="${targetView}" ${active ? 'aria-current="page"' : ''}>${ICONS[hub.icon]}<span>${esc(hub.label)}</span>${badge}</button></li>`;
    }).join('');

    const slots = [
      ['desktop-nav-start', 'start'],
      ['desktop-nav-secondary', 'secondary'],
      ['mobile-nav-start', 'start'],
      ['mobile-nav-secondary', 'secondary']
    ];
    slots.forEach(([id, group]) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = buildHubs(group);
    });

    // Sync mobile bottom navigation bar
    const bottomNav = document.getElementById('mobile-bottom-nav');
    if (bottomNav) {
      const learnViews = new Set(['modules', 'alphabet', 'writing', 'grammar']);
      const primaryViews = new Set(['dashboard', 'modules', 'alphabet', 'writing', 'grammar', 'flashcards', 'quiz']);
      bottomNav.querySelectorAll('.bottom-nav-btn[data-nav]').forEach((btn) => {
        const target = btn.getAttribute('data-nav');
        const isCurrent = target === currentView || (target === 'modules' && learnViews.has(currentView));
        if (isCurrent) {
          btn.setAttribute('aria-current', 'page');
        } else {
          btn.removeAttribute('aria-current');
        }
      });
      const menuBtn = document.getElementById('bottom-nav-menu-btn');
      if (menuBtn) {
        if (!primaryViews.has(currentView)) {
          menuBtn.setAttribute('aria-current', 'page');
        } else {
          menuBtn.removeAttribute('aria-current');
        }
      }
      const dueBadge = document.getElementById('bottom-nav-due');
      if (dueBadge) {
        const fcGated = !gate.unlocked && SCRIPT_GATED_VIEWS.has('flashcards');
        if (!fcGated && dueCount > 0) {
          dueBadge.textContent = dueCount > 99 ? '99+' : String(dueCount);
          dueBadge.hidden = false;
        } else {
          dueBadge.hidden = true;
        }
      }
    }
  }

  function updateGoalBars() {
    const prog = Store.computeTodayProgress(state);
    const streak = Store.computeStreakInfo(state);
    const s = state.settings;
    const metaText = prog.frozen
      ? 'Streak Freeze aktif hari ini'
      : `${prog.minutes}/${s.targetMinutes} mnt · ${prog.cards} kartu · ${prog.modules} modul`;

    ['sidebar', 'mobile'].forEach((prefix) => {
      const pct = document.getElementById(`${prefix}-goal-pct`);
      const fill = document.getElementById(`${prefix}-goal-fill`);
      const meta = document.getElementById(`${prefix}-goal-meta`);
      if (pct) pct.textContent = `${prog.percent}%`;
      if (fill) {
        fill.style.width = `${prog.percent}%`;
        fill.classList.toggle('jade', prog.percent >= 100);
      }
      if (meta) meta.textContent = metaText;
    });
    const barWrap = document.getElementById('sidebar-goal-bar-wrap');
    if (barWrap) barWrap.setAttribute('aria-valuenow', String(prog.percent));

    const streakTxt = document.getElementById('topbar-streak-text');
    if (streakTxt) streakTxt.textContent = `${streak.current} hari`;
  }

  function renderChrome() {
    if (state && state.activeLang) {
      document.documentElement.dataset.lang = state.activeLang;
    }
    renderLangSelectors();
    renderNavLists();
    updateGoalBars();
    updateTimerDisplay();
    updateAudioSpeedUI();
    const navMeta = NAV_ITEMS.find((n) => n.id === currentView);
    const topTitle = document.getElementById('topbar-title');
    if (topTitle && navMeta) topTitle.textContent = navMeta.title;
  }

  function resetViewStateForLang() {
    ui.modLevel = 'ALL';
    ui.modStatus = 'all';
    ui.modQuery = '';
    ui.fcModule = 'ALL';
    ui.fcFlipped = false;
    ui.quizModule = 'ALL';
    ui.quizFilterIds = null;
    ui.dialogId = null;
    ui.dialogRevealed = {};
    ui.readingId = null;
    ui.readingToken = null;
    ui.readingCompAnswer = null;
    ui.grammarQuery = '';
    ui.dictLevel = 'ALL';
    ui.dictQuery = '';
    ui.dictBatchIds = [];
    stopSprintTimer();
    ui.sprintActive = false;
    ui.sprintFinished = false;
    ui.writeIndex = 0;
    ui.writeStrokes = [];
    ui.writeCustomItem = null;
    ui.scriptTabId = null;
    ui.scriptMode = 'table';
    ui.scriptSelectedId = null;
    ui.scriptQuizQ = null;
    ui.scriptQuizPicked = null;
    ui.scriptQuizStreak = 0;
    ui.treeSelectedId = null;
    ui.fcMinedOnly = false;
    ui.conjForm = 'ALL';
    ui.conjIdx = 0;
    ui.conjPicked = null;
    ui.conjTyped = '';
    ui.conjShowRule = false;
    ui.conjStreak = 0;
    stopExamTimer();
    ui.examTryoutActive = false;
    ui.examTryoutDone = false;
    ui.examTryoutTimeLeft = 300;
    ui.examTryoutQuestions = [];
    ui.examTryoutIdx = 0;
    ui.examTryoutAnswers = {};
    ui.dashTryInput = '';
    rebuildFlashcardQueue();
    rebuildQuizSession();
  }

  function setActiveLang(code) {
    if (!LANGUAGE_CATALOG.some((l) => l.code === code)) return;
    state.activeLang = code;
    resetViewStateForLang();
    persistState();
    renderChrome();
    renderView(true);
  }

  function navigate(viewId, opts = {}) {
    if (!NAV_ITEMS.some((n) => n.id === viewId)) viewId = 'dashboard';
    if (currentView === 'sprint' && viewId !== 'sprint') {
      stopSprintTimer();
      ui.sprintActive = false;
    }
    if (currentView === 'exam' && viewId !== 'exam') {
      stopExamTimer();
      ui.examTryoutActive = false;
    }
    currentView = viewId;
    if (opts.lang && opts.lang !== state.activeLang) {
      state.activeLang = opts.lang;
      resetViewStateForLang();
    }
    if (opts.modLevel !== undefined) ui.modLevel = opts.modLevel;
    if (opts.fcModule !== undefined) {
      ui.fcModule = opts.fcModule;
      if (opts.fcDueOnly !== undefined) ui.fcDueOnly = opts.fcDueOnly;
      rebuildFlashcardQueue();
    }
    if (opts.quizModule !== undefined || opts.quizFilterIds !== undefined) {
      ui.quizModule = opts.quizModule || 'ALL';
      ui.quizFilterIds = opts.quizFilterIds || null;
      rebuildQuizSession();
    }
    if (opts.dialogModule !== undefined) {
      const pack = getActivePack();
      const found = pack && pack.dialogs.find((d) => d.module_id === opts.dialogModule);
      if (found) ui.dialogId = found.id;
    }
    if (opts.templateLang) {
      ui.settingsTemplateLang = opts.templateLang;
    }
    if (global.LingoDrawer) global.LingoDrawer.close();
    renderChrome();
    renderView(true);
    const main = document.getElementById('main-content');
    if (main) main.scrollTop = 0;
    global.scrollTo({ top: 0, behavior: 'auto' });
  }

  // --- Helper: Guided Beginner Path, Breadcrumbs & Next-Step Footer ---
  function getRecommendedModule(pack) {
    if (!pack || !pack.modules || pack.modules.length === 0) return null;
    const completedMap = state.completedModules[state.activeLang] || {};
    const ordered = pack.modules.slice().sort((a, b) => (a.order || 0) - (b.order || 0));
    return ordered.find((m) => !completedMap[m.id]) || ordered[ordered.length - 1];
  }

  function renderStudyBreadcrumb(currentLabel) {
    const meta = getCatalogMeta(state.activeLang);
    return `
      <nav class="study-crumb" aria-label="Jejak navigasi">
        <button type="button" class="crumb-link" data-nav="dashboard">Beranda</button>
        <span aria-hidden="true">/</span>
        <button type="button" class="crumb-link" data-nav="modules">Jalur Modul (${esc(meta.name_id)})</button>
        <span aria-hidden="true">/</span>
        <span style="color:var(--ink);font-weight:600;">${esc(currentLabel)}</span>
      </nav>
    `;
  }

  function renderNextStepBar(title, desc, btnLabel, targetView, extraAttrs = '') {
    return `
      <aside class="next-step-bar" aria-label="Langkah belajar berikutnya">
        <div>
          <span class="level-chart-label" style="display:block;margin-bottom:3px;">Langkah Berikutnya</span>
          <div style="font-weight:700;font-size:0.96rem;">${esc(title)}</div>
          <p class="guide-hint" style="margin-top:2px;">${esc(desc)}</p>
        </div>
        <button type="button" class="btn-primary" ${extraAttrs ? extraAttrs : `data-nav="${esc(targetView)}"`}>${esc(btnLabel)}</button>
      </aside>
    `;
  }

  function renderGuidedBeginnerCard(pack, meta) {
    if (!pack) {
      return `
        <section class="guide-card" aria-label="Panduan memulai bahasa baru">
          <div class="guide-head">
            <div>
              <span class="tag accent" style="margin-bottom:6px;">Mulai dari Sini</span>
              <h2 style="font-size:1.25rem;font-weight:700;">Impor Paket Materi ${esc(meta.name_id)} untuk Memulai</h2>
              <p class="page-sub" style="margin-top:4px;">Bahasa Jepang dan Korea sudah siap langsung dipelajari. Untuk ${esc(meta.name_id)}, unduh template JSON atau beralih ke Jepang/Korea.</p>
            </div>
            <div class="toolbar-group">
              <button type="button" class="btn-primary" data-action="go-import" data-lang="${meta.code}">Buka Import JSON</button>
              <button type="button" class="btn-secondary" data-action="switch-lang" data-lang="ja">Belajar Jepang Dulu</button>
            </div>
          </div>
        </section>
      `;
    }

    const mod = getRecommendedModule(pack);
    if (!mod) return '';

    const completedMap = state.completedModules[state.activeLang] || {};
    const isModDone = Boolean(completedMap[mod.id]);
    const modCards = pack.flashcards.filter((c) => c.module_id === mod.id);
    const reviewedCards = modCards.filter((c) => c.srs && (c.srs.repetitions > 0 || c.srs.due_date)).length;
    const step1Done = modCards.length > 0 && reviewedCards >= Math.min(3, modCards.length);

    const modQuizzes = pack.quizzes.filter((q) => q.module_id === mod.id);
    const today = Store.computeTodayProgress(state);
    const step2Done = today.quizTotal > 0;

    const hasDialog = pack.dialogs.some((d) => d.module_id === mod.id);
    const hasReading = pack.readings.some((r) => r.module_id === mod.id);
    const step3Action = hasDialog
      ? `data-action="mod-to-dialog" data-mod="${esc(mod.id)}"`
      : hasReading
        ? 'data-nav="readings"'
        : 'data-nav="grammar"';
    const step3Title = hasDialog ? 'Dialog Role-Play' : hasReading ? 'Bacaan Klik-Kata' : 'Pola Tata Bahasa';
    const step3Meta = hasDialog ? 'Praktik percakapan nyata' : hasReading ? 'Baca teks & simpan kata' : 'Pahami struktur kalimat';

    // Determine which step is currently recommended next
    const nextStep = !step1Done ? 1 : !step2Done ? 2 : !isModDone ? 3 : 4;
    const primaryCta = nextStep === 1
      ? { label: `Mulai Langkah 1: Pelajari Kartu (${modCards.length})`, attrs: `data-action="mod-to-fc" data-mod="${esc(mod.id)}"` }
      : nextStep === 2
        ? { label: `Lanjut Langkah 2: Kerjakan Quiz (${modQuizzes.length})`, attrs: `data-action="mod-to-quiz" data-mod="${esc(mod.id)}"` }
        : nextStep === 3
          ? { label: `Lanjut Langkah 3: ${step3Title}`, attrs: step3Action }
          : { label: 'Lihat Semua Modul', attrs: 'data-nav="modules"' };

    const doneCount = pack.modules.filter((m) => completedMap[m.id]).length;

    return `
      <section class="guide-card" aria-label="Panduan langkah belajar mandiri">
        <div class="guide-head">
          <div>
            <div class="toolbar-group" style="margin-bottom:6px;">
              <span class="tag accent">Mulai dari Sini</span>
              <span class="tag">${esc(meta.name_id)} · ${esc(mod.level)}</span>
              <span class="tag jade">Progres: ${doneCount}/${pack.modules.length} modul</span>
            </div>
            <h2 style="font-size:1.25rem;font-weight:700;line-height:1.3;">Fokus Sekarang: ${esc(mod.title)}</h2>
            <p class="guide-hint" style="margin-top:4px;">Ikuti 4 langkah berurutan di bawah ini agar belajar mandiri tetap terarah. Cukup klik langkah yang disorot.</p>
          </div>
          <button type="button" class="btn-primary" ${primaryCta.attrs}>${esc(primaryCta.label)}</button>
        </div>

        <div class="guide-steps">
          <button type="button" class="step-tile ${step1Done ? 'is-done' : nextStep === 1 ? 'is-next' : ''}" data-action="mod-to-fc" data-mod="${esc(mod.id)}">
            <span class="step-num"><span>LANGKAH 1</span><span>${step1Done ? 'Selesai' : nextStep === 1 ? 'Sekarang' : ''}</span></span>
            <span class="step-title">Kenali Kosakata (SRS)</span>
            <span class="step-meta">${reviewedCards}/${modCards.length} kartu diulas</span>
          </button>

          <button type="button" class="step-tile ${step2Done ? 'is-done' : nextStep === 2 ? 'is-next' : ''}" data-action="mod-to-quiz" data-mod="${esc(mod.id)}">
            <span class="step-num"><span>LANGKAH 2</span><span>${step2Done ? 'Aktif' : nextStep === 2 ? 'Sekarang' : ''}</span></span>
            <span class="step-title">Uji dengan Quiz</span>
            <span class="step-meta">${modQuizzes.length} soal latihan modul ini</span>
          </button>

          <button type="button" class="step-tile ${nextStep === 3 ? 'is-next' : ''}" ${step3Action}>
            <span class="step-num"><span>LANGKAH 3</span><span>${nextStep === 3 ? 'Sekarang' : ''}</span></span>
            <span class="step-title">${esc(step3Title)}</span>
            <span class="step-meta">${esc(step3Meta)}</span>
          </button>

          <button type="button" class="step-tile ${isModDone ? 'is-done' : nextStep === 4 ? 'is-next' : ''}" data-action="toggle-module-done" data-mod="${esc(mod.id)}">
            <span class="step-num"><span>LANGKAH 4</span><span>${isModDone ? 'Tercapai' : ''}</span></span>
            <span class="step-title">${isModDone ? 'Modul Selesai' : 'Tandai Modul Selesai'}</span>
            <span class="step-meta">${isModDone ? 'Lanjut ke modul berikutnya' : 'Klik jika sudah paham'}</span>
          </button>
        </div>

        <div class="guide-tip-bar">
          <span class="guide-hint">Target harian: <strong>${state.settings.targetMinutes} menit</strong> belajar atau <strong>${state.settings.targetModules} modul + ${state.settings.targetCards} kartu SRS</strong> untuk menyalakan streak.</span>
          <button type="button" class="btn-ghost btn-sm" data-nav="modules">Lihat Semua Modul (${pack.modules.length})</button>
        </div>
      </section>
    `;
  }

  function renderDailyMissionsPanel(meta) {
    const missions = Store.getDailyMissions(state);
    const langXp = (state.xpByLang && state.xpByLang[meta.code]) || 0;
    const rank = Store.getRankInfo(langXp);
    const doneCount = missions.filter((m) => m.claimed).length;

    return `
      <section class="mission-panel" aria-label="Misi mikro harian dan pangkat XP">
        <div class="toolbar-row" style="margin-bottom:0;">
          <div>
            <div class="toolbar-group" style="margin-bottom:4px;">
              <span class="tag amber">Pangkat ${esc(meta.name_id)}: ${esc(rank.title)}</span>
              <span class="tag accent mono">${langXp} XP</span>
              <span class="tag jade">Misi Hari Ini: ${doneCount}/${missions.length}</span>
            </div>
            <h2 style="font-size:1.08rem;font-weight:700;">Misi Mikro Harian</h2>
            <p class="guide-hint" style="margin-top:2px;">${rank.nextAt ? `Butuh ${rank.nextAt - langXp} XP lagi menuju pangkat berikutnya.` : 'Anda sudah mencapai pangkat tertinggi pada bahasa ini.'}</p>
          </div>
          <button type="button" class="btn-secondary btn-sm" data-nav="stats">Lihat Lencana</button>
        </div>

        <div class="mission-grid">
          ${missions.map((m) => {
            const pct = Math.min(100, Math.round((m.current / m.target) * 100));
            const ready = m.current >= m.target && !m.claimed;
            return `
              <article class="mission-item ${m.claimed ? 'claimed' : ''}">
                <div class="daily-goal-head" style="margin-bottom:2px;">
                  <span class="mission-title">${esc(m.title)}</span>
                  <span class="tag ${m.claimed ? 'jade' : 'accent'}">+${m.xp} XP</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill ${m.claimed || ready ? 'jade' : ''}" style="width:${pct}%"></div>
                </div>
                <div class="daily-goal-head" style="margin-top:4px;margin-bottom:0;">
                  <span class="mono" style="font-size:0.78rem;color:var(--ink-muted);">${m.current}/${m.target}</span>
                  ${m.claimed
                    ? `<span class="tag jade">${ICONS.check} Diklaim</span>`
                    : ready
                      ? `<button type="button" class="btn-jade btn-sm" data-action="claim-mission" data-id="${esc(m.id)}">Klaim +${m.xp} XP</button>`
                      : `<button type="button" class="btn-ghost btn-sm" data-nav="${esc(m.nav)}">${esc(m.cta)}</button>`
                  }
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  // --- Helper: Empty Pack State for Unimported Languages (R-27) ---
  function renderScriptGateLockedView(featureTitle) {
    const meta = getCatalogMeta(state.activeLang);
    const gate = Store.getScriptGateStatus(state, state.activeLang);
    return `
      ${renderStudyBreadcrumb(featureTitle)}
      <section class="card script-gate-card" aria-label="Tahap aksara terkunci">
        <div class="toolbar-group" style="margin-bottom:10px;">
          <span class="tag accent">${ICONS.lock} Tahap Terkunci</span>
          <span class="tag">Fondasi ${esc(meta.name_id)}: ${gate.learned}/${gate.required} huruf</span>
        </div>
        <h1 class="page-title" style="margin-bottom:8px;">Kenali ${gate.required} Huruf ${esc(meta.name_id)} Dulu Sebelum Masuk ${esc(featureTitle)}</h1>
        <p class="page-sub" style="margin-bottom:16px;">Agar belajar bertahap dan tidak langsung bingung membaca kata asing, kuasai minimal ${gate.required} huruf dasar di <strong>Pengenalan Aksara</strong> terlebih dahulu. Semua latihan dan modul akan terbuka otomatis setelahnya.</p>
        <div class="progress-track" style="height:10px;margin-bottom:6px;max-width:420px;">
          <div class="progress-fill jade" style="width:${gate.pct}%"></div>
        </div>
        <div class="kpi-label mono" style="margin-bottom:18px;">Progres buka kunci: ${gate.learned} / ${gate.required} huruf (${gate.pct}%)</div>
        <div class="toolbar-group">
          <button type="button" class="btn-primary" data-nav="alphabet">Mulai Pengenalan Aksara (${gate.learned}/${gate.required})</button>
          <button type="button" class="btn-secondary" data-action="script-gate-bypass">Saya sudah bisa baca aksara ini (Buka Kunci)</button>
        </div>
      </section>
    `;
  }

  function renderMissingPackState(featureName) {
    const meta = getCatalogMeta(state.activeLang);
    return `
      <section class="empty-state">
        <span class="stamp-badge lg">${esc(meta.stamp)}</span>
        <h1>Paket Materi ${esc(meta.name_id)} Belum Diimpor</h1>
        <p>Bahasa ${esc(meta.name_id)} (${esc(meta.name_native)}) siap dipakai untuk ${esc(featureName)}. Unduh template JSON skema 1.0 lalu impor paket materinya dari halaman Pengaturan.</p>
        <div class="toolbar-group" style="margin-top:8px;">
          <button type="button" class="btn-primary" data-action="go-import" data-lang="${meta.code}">Buka Import JSON ${esc(meta.name_id)}</button>
          <button type="button" class="btn-secondary" data-action="switch-lang" data-lang="ja">Kembali ke Jepang</button>
        </div>
      </section>
    `;
  }

  // ==========================================================================
  // VIEW 1: DASHBOARD 11 BAHASA (Editorial Contrasting Hero + 3 Clean Bands)
  // ==========================================================================
  function renderBentoMomentumBand(meta, pack) {
    const gate = Store.getScriptGateStatus(state, meta.code);
    const today = Store.computeTodayProgress(state);
    const dueCount = getDueCountForLang(meta.code);
    const completedMap = state.completedModules[meta.code] || {};
    const totalMods = pack ? pack.modules.length : 0;
    const doneMods = pack ? pack.modules.filter((m) => completedMap[m.id]).length : 0;
    const modPct = totalMods > 0 ? Math.round((doneMods / totalMods) * 100) : 0;

    // Behavioral Design (B = MAP + Zeigarnik Effect): surface the single closest unfinished micro-goal
    let nudgeTag = 'Langkah Terdekat';
    let nudgeTitle = `Jaga ritme belajar ${meta.name_id} hari ini`;
    let nudgeDesc = 'Mulai sesi singkat 3 menit untuk mempertahankan kebiasaan harian Anda.';
    let nudgePct = today.percent;
    let nudgeCtaLabel = 'Mulai 8 Soal Harian';
    let nudgeCtaAttr = 'data-nav="quiz"';

    if (!gate.unlocked) {
      const remain = Math.max(1, gate.required - gate.learned);
      nudgeTag = 'Hampir Terbuka · Aksara';
      nudgeTitle = `Tinggal ${remain} huruf lagi untuk membuka semua modul ${meta.name_id}`;
      nudgeDesc = `Anda sudah hafal ${gate.learned} dari ${gate.required} huruf dasar. Selesaikan sedikit lagi agar seluruh latihan terbuka otomatis.`;
      nudgePct = gate.pct;
      nudgeCtaLabel = `Hafalkan ${remain} Huruf Lagi`;
      nudgeCtaAttr = 'data-nav="alphabet"';
    } else if (today.percent > 0 && today.percent < 100) {
      const leftPct = 100 - today.percent;
      nudgeTag = `Target Harian · ${today.percent}%`;
      nudgeTitle = `Sedikit lagi tuntas (${leftPct}% tersisa untuk target hari ini)`;
      nudgeDesc = dueCount > 0
        ? `Ulas beberapa kartu SRS yang jatuh tempo agar streak hari ini aman terkunci.`
        : `Selesaikan 1 sesi quiz harian singkat agar target belajar hari ini tembus 100%.`;
      nudgePct = today.percent;
      nudgeCtaLabel = dueCount > 0 ? `Ulas ${Math.min(5, dueCount)} Kartu (~2 mnt)` : 'Lanjut Quiz Harian';
      nudgeCtaAttr = dueCount > 0 ? 'data-nav="flashcards"' : 'data-nav="quiz"';
    } else if (dueCount > 0) {
      const estMin = Math.max(1, Math.round(dueCount * 0.4));
      nudgeTag = 'Siap Diulas Hari Ini';
      nudgeTitle = `${dueCount} kartu SRS menunggu pengulangan hari ini`;
      nudgeDesc = `Mengulas tepat waktu menjaga daya ingat jangka panjang tanpa perlu menghafal ulang dari nol.`;
      nudgePct = Math.min(100, Math.max(15, modPct));
      nudgeCtaLabel = `Ulas ${dueCount} Kartu (~${estMin} mnt)`;
      nudgeCtaAttr = 'data-nav="flashcards"';
    } else if (pack && doneMods < totalMods) {
      nudgeTag = `Progres Modul · ${doneMods}/${totalMods}`;
      nudgeTitle = `Lanjutkan peta keahlian ${meta.name_id} Anda`;
      nudgeDesc = `Anda telah menuntaskan ${modPct}% modul. Pilih satu modul berikutnya di Pohon Keahlian.`;
      nudgePct = modPct;
      nudgeCtaLabel = 'Buka Pohon Keahlian';
      nudgeCtaAttr = 'data-nav="modules"';
    }

    return `
      <section class="studio-section" aria-label="Ringkasan Bento dan target terdekat">
        <div class="bento-momentum-grid">
          <article class="card bento-cell bento-zeigarnik">
            <div class="bento-cell-top">
              <span class="tag accent">${esc(nudgeTag)}</span>
              <span class="mono" style="font-size:0.82rem;font-weight:700;">${nudgePct}%</span>
            </div>
            <h2 class="bento-title">${esc(nudgeTitle)}</h2>
            <p class="kpi-label">${esc(nudgeDesc)}</p>
            <div class="progress-track" style="height:8px;"><div class="progress-fill jade" style="width:${nudgePct}%"></div></div>
            <div>
              <button type="button" class="btn-primary" ${nudgeCtaAttr}>${esc(nudgeCtaLabel)}</button>
            </div>
          </article>

          <button type="button" class="card bento-cell bento-quick-tile bento-tile-sky" data-nav="quiz">
            <span class="tag">Diperbarui Tiap Hari</span>
            <strong class="bento-tile-heading">Quiz Harian</strong>
            <span class="kpi-label">8 soal campuran baru hari ini</span>
          </button>

          <button type="button" class="card bento-cell bento-quick-tile bento-tile-jade" data-nav="${!gate.unlocked ? 'alphabet' : 'flashcards'}">
            <span class="tag ${!gate.unlocked ? 'accent' : 'jade'}">${!gate.unlocked ? `${gate.learned}/${gate.required} huruf` : `${dueCount} jatuh tempo`}</span>
            <strong class="bento-tile-heading">${!gate.unlocked ? 'Kartu Aksara' : 'Kartu SRS'}</strong>
            <span class="kpi-label">${!gate.unlocked ? '1 huruf per kartu, tanpa scroll' : 'Pengulangan terjadwal SM-2'}</span>
          </button>
        </div>
      </section>
    `;
  }

  function renderDashboardPlanStrip(meta) {
    const plan = state.studyPlans && state.studyPlans[state.activeLang];
    if (!plan || !Array.isArray(plan.days) || !plan.days.length) {
      return `
        <section class="studio-section" aria-label="Rencana belajar">
          <div class="card plan-promo-bar">
            <div>
              <span class="tag accent">Rencana Belajar Personal</span>
              <h2 style="font-size:1.08rem;font-weight:700;margin-top:6px;">Belum ada jadwal terstruktur untuk ${esc(meta.name_id)}</h2>
              <p class="kpi-label">Susun jadwal harian otomatis (14, 30, atau 60 hari) sesuai tujuan belajar dan waktu luang Anda.</p>
            </div>
            <button type="button" class="btn-primary" data-nav="studyplan">Buat Rencana Belajar</button>
          </div>
        </section>
      `;
    }
    const doneMap = plan.completedTasks || {};
    const totalTasks = plan.days.reduce((sum, d) => sum + d.tasks.length, 0);
    const doneTasks = plan.days.reduce((sum, d) => sum + d.tasks.filter((t) => doneMap[t.id]).length, 0);
    const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
    const nextDay = plan.days.find((d) => d.tasks.some((t) => !doneMap[t.id])) || plan.days[plan.days.length - 1];
    return `
      <section class="studio-section" aria-label="Rencana belajar aktif">
        <div class="card plan-promo-bar">
          <div style="flex:1;min-width:220px;">
            <div class="toolbar-group" style="margin-bottom:4px;">
              <span class="tag jade">Rencana Aktif · Hari ${nextDay.day}/${plan.totalDays}</span>
              <span class="tag">${plan.dailyMinutes} mnt/hari</span>
            </div>
            <h2 style="font-size:1.05rem;font-weight:700;">Fokus Hari ${nextDay.day}: ${esc(nextDay.focus)}</h2>
            <div class="progress-track" style="margin-top:8px;max-width:340px;"><div class="progress-fill jade" style="width:${pct}%"></div></div>
            <p class="kpi-label" style="margin-top:4px;">${doneTasks}/${totalTasks} tugas selesai (${pct}%)</p>
          </div>
          <button type="button" class="btn-primary" data-nav="studyplan">Buka Jadwal Hari ${nextDay.day}</button>
        </div>
      </section>
    `;
  }

  function renderDashboard() {
    const meta = getCatalogMeta(state.activeLang);
    const pack = getActivePack();
    const streak = Store.computeStreakInfo(state);
    const gStats = Store.computeGlobalStats(state);
    const langXp = (state.xpByLang && state.xpByLang[meta.code]) || 0;
    const rank = Store.getRankInfo(langXp);
    const sprintRec = (state.sprintBestByLang && state.sprintBestByLang[meta.code]) || { bestScore: 0, rounds: 0 };

    // Build Level Bar Chart for Active Language
    const levels = (pack && pack.language && pack.language.roadmap_levels) || meta.roadmap_levels;
    const modCounts = levels.map((lvl) => {
      const mods = pack ? pack.modules.filter((m) => m.level === lvl) : [];
      const done = mods.filter((m) => state.completedModules[meta.code] && state.completedModules[meta.code][m.id]).length;
      return { lvl, total: mods.length, done };
    });
    const maxCount = Math.max(1, ...modCounts.map((x) => x.total));

    const levelBarsHtml = modCounts.map((item) => {
      const pct = item.total > 0 ? Math.max(26, Math.round((item.total / maxCount) * 100)) : 12;
      const cls = item.total > 0 && item.done === item.total ? 'done' : item.total > 0 ? 'has-data' : '';
      return `
        <button type="button" class="hero-level-bar" data-action="jump-level" data-level="${esc(item.lvl)}" aria-label="Level ${esc(item.lvl)}: ${item.total} modul, ${item.done} selesai">
          <div class="hero-level-col ${cls}" style="height: ${pct}%"></div>
          <span class="mono" style="font-size:0.7rem;font-weight:700;">${esc(item.lvl)}</span>
          <span class="mono" style="font-size:0.68rem;opacity:0.8;">${item.total}</span>
        </button>
      `;
    }).join('');

    // Integrated Guided Active Module inside the Hero Ink Card
    let focusBandHtml = '';
    if (pack) {
      const mod = getRecommendedModule(pack);
      const completedMap = state.completedModules[state.activeLang] || {};
      const doneCount = pack.modules.filter((m) => completedMap[m.id]).length;
      if (mod) {
        const isModDone = Boolean(completedMap[mod.id]);
        const modCards = pack.flashcards.filter((c) => c.module_id === mod.id);
        const reviewedCards = modCards.filter((c) => c.srs && (c.srs.repetitions > 0 || c.srs.due_date)).length;
        const step1Done = modCards.length > 0 && reviewedCards >= Math.min(3, modCards.length);
        const modQuizzes = pack.quizzes.filter((q) => q.module_id === mod.id);
        const today = Store.computeTodayProgress(state);
        const step2Done = today.quizTotal > 0;
        const hasDialog = pack.dialogs.some((d) => d.module_id === mod.id);
        const hasReading = pack.readings.some((r) => r.module_id === mod.id);
        const step3Action = hasDialog
          ? `data-action="mod-to-dialog" data-mod="${esc(mod.id)}"`
          : hasReading
            ? 'data-nav="readings"'
            : 'data-nav="grammar"';
        const step3Title = hasDialog ? 'Dialog' : hasReading ? 'Bacaan' : 'Tata Bahasa';
        const nextStep = !step1Done ? 1 : !step2Done ? 2 : !isModDone ? 3 : 4;
        const primaryCta = nextStep === 1
          ? { label: `Mulai Langkah 1: Kartu SRS (${modCards.length})`, attrs: `data-action="mod-to-fc" data-mod="${esc(mod.id)}"` }
          : nextStep === 2
            ? { label: `Lanjut Langkah 2: Quiz (${modQuizzes.length})`, attrs: `data-action="mod-to-quiz" data-mod="${esc(mod.id)}"` }
            : nextStep === 3
              ? { label: `Lanjut Langkah 3: ${step3Title}`, attrs: step3Action }
              : { label: 'Buka Semua Modul', attrs: 'data-nav="modules"' };

        focusBandHtml = `
          <div class="hero-focus-band">
            <div class="hero-focus-head">
              <div>
                <div style="font-size:0.74rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:var(--ink-muted);">Fokus Belajar Sekarang · ${esc(mod.level)} (${doneCount}/${pack.modules.length} modul)</div>
                <div class="hero-focus-title">${esc(mod.title)}</div>
              </div>
              <button type="button" class="hero-cta-primary" ${primaryCta.attrs}>${esc(primaryCta.label)}</button>
            </div>
            <div class="hero-step-rail">
              <button type="button" class="hero-step-btn ${step1Done ? 'is-done' : nextStep === 1 ? 'is-next' : ''}" data-action="mod-to-fc" data-mod="${esc(mod.id)}">
                <span class="hero-step-idx"><span>01</span><span>${step1Done ? 'Selesai' : nextStep === 1 ? 'Mulai' : ''}</span></span>
                <span class="hero-step-name">Kartu SRS</span>
                <span class="hero-step-sub">${reviewedCards}/${modCards.length} diulas</span>
              </button>
              <button type="button" class="hero-step-btn ${step2Done ? 'is-done' : nextStep === 2 ? 'is-next' : ''}" data-action="mod-to-quiz" data-mod="${esc(mod.id)}">
                <span class="hero-step-idx"><span>02</span><span>${step2Done ? 'Aktif' : nextStep === 2 ? 'Lanjut' : ''}</span></span>
                <span class="hero-step-name">Quiz Modul</span>
                <span class="hero-step-sub">${modQuizzes.length} soal</span>
              </button>
              <button type="button" class="hero-step-btn ${nextStep === 3 ? 'is-next' : ''}" ${step3Action}>
                <span class="hero-step-idx"><span>03</span><span>${nextStep === 3 ? 'Lanjut' : ''}</span></span>
                <span class="hero-step-name">${esc(step3Title)}</span>
                <span class="hero-step-sub">Konteks nyata</span>
              </button>
              <button type="button" class="hero-step-btn ${isModDone ? 'is-done' : nextStep === 4 ? 'is-next' : ''}" data-action="toggle-module-done" data-mod="${esc(mod.id)}">
                <span class="hero-step-idx"><span>04</span><span>${isModDone ? 'Tercapai' : ''}</span></span>
                <span class="hero-step-name">${isModDone ? 'Selesai' : 'Tandai Selesai'}</span>
                <span class="hero-step-sub">+25 XP</span>
              </button>
            </div>
          </div>
        `;
      }
    }

    // Interactive Try-Now Phonetic Sandbox (for JA & KO) or Audio Preview (for others)
    const supportsPhonetic = meta.code === 'ja' || meta.code === 'ko';
    const tryValue = ui.dashTryInput || (meta.quick_chips[0] || '');
    const converted = supportsPhonetic ? convertPhonetic(meta.code, tryValue) : meta.sample_word.native;
    const quickChipsHtml = meta.quick_chips.map((w) =>
      `<button type="button" class="quick-chip-btn" data-action="try-chip" data-word="${esc(w)}">${esc(w)}</button>`
    ).join('');

    // Language Directory Filter
    const filteredLangs = LANGUAGE_CATALOG.filter((l) => {
      const has = Boolean(state.packs[l.code]);
      if (ui.dashFilter === 'active') return has;
      if (ui.dashFilter === 'importable') return !has;
      return true;
    });

    const langCardsHtml = filteredLangs.map((lang) => {
      const p = state.packs[lang.code];
      const isCurrent = lang.code === state.activeLang;
      if (p) {
        const doneMods = p.modules.filter((m) => state.completedModules[lang.code] && state.completedModules[lang.code][m.id]).length;
        const due = getDueCountForLang(lang.code);
        const modPct = p.modules.length > 0 ? Math.round((doneMods / p.modules.length) * 100) : 0;
        return `
          <article class="lang-card ${isCurrent ? 'is-active-lang' : ''}">
            <div class="lang-card-top">
              <div class="lang-card-id">
                <span class="stamp-badge">${esc(lang.stamp)}</span>
                <div>
                  <h3 class="lang-card-title">${esc(lang.name_id)}</h3>
                  <p class="lang-card-native">${esc(lang.name_native)}</p>
                </div>
              </div>
              <span class="tag ${isCurrent ? 'accent' : 'jade'}">${isCurrent ? 'Sedang Dipelajari' : `${p.modules.length} modul`}</span>
            </div>
            <p class="lang-card-focus">${esc(lang.focus)}</p>
            <div>
              <div class="daily-goal-head" style="margin-bottom:5px;">
                <span class="kpi-label">Progres modul</span>
                <span class="mono" style="font-size:0.78rem;">${doneMods}/${p.modules.length} (${modPct}%)</span>
              </div>
              <div class="progress-track"><div class="progress-fill ${modPct === 100 ? 'jade' : ''}" style="width:${modPct}%"></div></div>
            </div>
            <div class="lang-card-metrics">
              <span class="tag accent">${due} SRS</span>
              <span class="tag">${p.quizzes.length} quiz</span>
              <span class="tag">${p.dialogs.length} dialog</span>
            </div>
            <div class="lang-card-actions">
              <button type="button" class="btn-primary btn-sm" data-action="open-lang-modules" data-lang="${lang.code}">Lanjut Belajar</button>
              <button type="button" class="btn-secondary btn-sm" data-action="open-lang-srs" data-lang="${lang.code}">SRS (${due})</button>
            </div>
          </article>
        `;
      }
      return `
        <article class="lang-card ${isCurrent ? 'is-active-lang' : ''}">
          <div class="lang-card-top">
            <div class="lang-card-id">
              <span class="stamp-badge" style="background:var(--surface-subtle);color:var(--ink-muted);border-color:var(--border);">${esc(lang.stamp)}</span>
              <div>
                <h3 class="lang-card-title">${esc(lang.name_id)}</h3>
                <p class="lang-card-native">${esc(lang.name_native)}</p>
              </div>
            </div>
            <span class="tag">Siap Import</span>
          </div>
          <p class="lang-card-focus">${esc(lang.focus)}</p>
          <div class="lang-card-actions">
            <button type="button" class="btn-secondary btn-sm" data-action="go-import" data-lang="${lang.code}">${ICONS.plus} Import JSON</button>
          </div>
        </article>
      `;
    }).join('');

    return `
      <!-- Band 1: Iconic Contrasting Studio Hero + Live Sandbox -->
      <section class="studio-hero" aria-label="Ruang belajar bahasa aktif">
        <div class="hero-ink-card">
          <div class="hero-ink-top">
            <div class="dash-lang-title">
              <span class="hero-ink-stamp">${esc(meta.stamp)}</span>
              <div>
                <h1 class="hero-ink-native">${esc(meta.name_native)}</h1>
                <p class="hero-ink-sub">${esc(meta.name_id)} · ${esc(meta.focus)}</p>
              </div>
            </div>
            <div class="toolbar-group">
              <span class="hero-ink-pill coral">${esc(rank.title)} · ${langXp} XP</span>
              <span class="hero-ink-pill">${pack ? `${pack.modules.length} modul` : 'Belum diimpor'}</span>
            </div>
          </div>

          ${focusBandHtml}

          <div>
            <div class="level-chart-head" style="margin-bottom:8px;">
              <span style="font-size:0.74rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;">Jalur Level ${esc(meta.name_id)}</span>
              <span style="font-size:0.74rem;font-weight:600;opacity:0.82;">Ketuk level untuk lompat ke modul</span>
            </div>
            <div class="hero-level-strip">${levelBarsHtml}</div>
          </div>
        </div>

        <div class="hero-side-stack">
          <div class="try-box" aria-label="Coba pelafalan dan ketik fonetik">
            <span class="level-chart-label">Coba Sekarang · ${esc(meta.signature)}</span>
            <div class="try-sample-row">
              <button type="button" class="audio-btn accent-fill" data-speak="${esc(meta.sample_word.native)}" data-speak-lang="${meta.code}" aria-label="Dengarkan pelafalan ${esc(meta.sample_word.native)}">
                ${ICONS.speaker}
              </button>
              <div>
                <div class="try-native">${esc(meta.sample_word.native)}</div>
                <div class="try-romaji">${esc(meta.sample_word.romaji)}</div>
                <div class="try-meaning">${esc(meta.sample_word.meaning)}</div>
              </div>
            </div>

            ${supportsPhonetic ? `
              <div>
                <label for="dash-phonetic-input" class="field-label-sm">Ketik bunyi huruf Latin, langsung jadi ${meta.code === 'ja' ? 'Hiragana' : 'Hangul'}:</label>
                <input id="dash-phonetic-input" type="text" class="phonetic-input" value="${esc(tryValue)}" placeholder="${meta.code === 'ja' ? 'konnichiwa' : 'saranghaeyo'}" autocomplete="off">
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
                <div class="phonetic-output" id="dash-phonetic-output">${esc(converted)}</div>
                <button type="button" class="audio-btn" id="dash-phonetic-speak" aria-label="Putar hasil ketikan fonetik">${ICONS.speaker}</button>
              </div>
              <div class="toolbar-group">
                <span class="kpi-label">Coba:</span>
                ${quickChipsHtml}
              </div>
            ` : `
              <p class="page-sub" style="font-size:0.86rem;">Tekan tombol audio di atas untuk mendengar pelafalan ${esc(meta.name_id)} (${esc(meta.tts_lang)}). Semua modul ${esc(meta.name_id)} siap dipelajari di Jalur Modul.</p>
            `}
          </div>

          <div class="mini-metrics-row" aria-label="Ringkasan progres nyata">
            <div class="mini-metric">
              <div class="kpi-label">Kosakata Dikuasai</div>
              <div class="kpi-val" style="font-size:1.25rem;">${gStats.masteredCards}/${gStats.totalCards}</div>
            </div>
            <div class="mini-metric">
              <div class="kpi-label">Akurasi Quiz</div>
              <div class="kpi-val" style="font-size:1.25rem;">${gStats.quizAccuracy === null ? 'Belum ada' : `${gStats.quizAccuracy}%`}</div>
            </div>
            <div class="mini-metric">
              <div class="kpi-label">Rekor Streak</div>
              <div class="kpi-val" style="font-size:1.25rem;">${streak.best} hari</div>
            </div>
            <div class="mini-metric">
              <div class="kpi-label">Rekor Sprint (${esc(meta.name_id)})</div>
              <div class="kpi-val" style="font-size:1.25rem;">${sprintRec.bestScore}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Band 2: Bento Momentum Grid (Zeigarnik Effect + Quick Actions) -->
      ${renderBentoMomentumBand(meta, pack)}

      <!-- Band 3: Ringkasan Rencana Belajar & Misi Mikro Harian -->
      ${renderDashboardPlanStrip(meta)}
      ${renderDailyMissionsPanel(meta)}

      <!-- Compact Language Explorer & Onboarding Trigger (replaces bulky 11-card grid on Beranda) -->
      <section class="studio-section" aria-label="Jelajah bahasa dan pengaturan awal">
        <div class="card dash-compact-footer">
          <div>
            <h2 style="font-size:1rem;font-weight:700;">Ingin ganti atau jelajah 11 bahasa lain?</h2>
            <p class="kpi-label">Semua ${Object.keys(state.packs).length} bahasa aktif tersimpan offline dan bisa diganti kapan saja.</p>
          </div>
          <div class="toolbar-group">
            <button type="button" class="btn-secondary" data-action="open-catalog-sheet">Jelajah 11 Bahasa</button>
            <button type="button" class="btn-ghost" data-action="open-onboarding">Atur Ulang Target</button>
          </div>
        </div>
      </section>
    `;
  }

  // ==========================================================================
  // VIEW 2: ROADMAP & MODUL
  // ==========================================================================
  function renderModules() {
    const pack = getActivePack();
    if (!pack) return renderMissingPackState('Roadmap & Modul');
    const meta = getCatalogMeta(state.activeLang);

    const completedMap = state.completedModules[state.activeLang] || {};
    const totalMods = pack.modules.length;
    const doneMods = pack.modules.filter((m) => completedMap[m.id]).length;
    const pct = totalMods > 0 ? Math.round((doneMods / totalMods) * 100) : 0;
    const circ = 2 * Math.PI * 20;
    const offset = circ - (pct / 100) * circ;

    const levels = ['ALL', ...pack.language.roadmap_levels];
    const levelTabsHtml = levels.map((lvl) => {
      const count = lvl === 'ALL' ? totalMods : pack.modules.filter((m) => m.level === lvl).length;
      const done = lvl === 'ALL'
        ? doneMods
        : pack.modules.filter((m) => m.level === lvl && completedMap[m.id]).length;
      const label = lvl === 'ALL' ? 'Semua Level' : lvl;
      return `
        <button type="button" class="level-tab ${ui.modLevel === lvl ? 'active' : ''}" data-action="mod-level" data-level="${esc(lvl)}">
          <span>${esc(label)}</span>
          <span class="mono" style="font-size:0.75rem;color:var(--ink-muted);">${done}/${count}</span>
        </button>
      `;
    }).join('');

    const q = ui.modQuery.trim().toLowerCase();
    const filtered = pack.modules.filter((m) => {
      if (ui.modLevel !== 'ALL' && m.level !== ui.modLevel) return false;
      const isDone = Boolean(completedMap[m.id]);
      if (ui.modStatus === 'done' && !isDone) return false;
      if (ui.modStatus === 'todo' && isDone) return false;
      if (q && !m.title.toLowerCase().includes(q) && !m.objectives.join(' ').toLowerCase().includes(q)) return false;
      return true;
    }).sort((a, b) => (a.order || 0) - (b.order || 0));

    const cardsHtml = filtered.length > 0 ? filtered.map((m) => {
      const isDone = Boolean(completedMap[m.id]);
      const fcCount = pack.flashcards.filter((c) => c.module_id === m.id).length;
      const qCount = pack.quizzes.filter((qz) => qz.module_id === m.id).length;
      const dCount = pack.dialogs.filter((d) => d.module_id === m.id).length;

      return `
        <article class="module-card ${isDone ? 'completed' : ''}">
          <div>
            <div class="module-meta-row">
              <span class="tag accent">${esc(m.level)}</span>
              <span class="tag">${m.estimated_minutes || 15} menit</span>
              ${isDone ? '<span class="tag jade">Selesai</span>' : ''}
            </div>
            <h2 class="module-title">${esc(m.title)}</h2>
            <ul class="objective-list">
              ${m.objectives.map((o) => `<li>${esc(o)}</li>`).join('')}
            </ul>
            <div class="module-shortcuts">
              <button type="button" class="btn-secondary btn-sm" data-action="mod-to-fc" data-mod="${esc(m.id)}">Flashcard (${fcCount})</button>
              <button type="button" class="btn-secondary btn-sm" data-action="mod-to-quiz" data-mod="${esc(m.id)}">Quiz (${qCount})</button>
              ${dCount > 0 ? `<button type="button" class="btn-secondary btn-sm" data-action="mod-to-dialog" data-mod="${esc(m.id)}">Dialog (${dCount})</button>` : ''}
            </div>
          </div>
          <div>
            <button type="button" class="${isDone ? 'btn-jade' : 'btn-primary'}" data-action="toggle-module-done" data-mod="${esc(m.id)}">
              ${isDone ? `${ICONS.check} Selesai` : 'Tandai Selesai'}
            </button>
          </div>
        </article>
      `;
    }).join('') : `
      <div class="empty-state">
        <h2>Belum ada modul di filter ini</h2>
        <p>Pilih tab level lain atau impor paket JSON tambahan untuk mengisi level ${esc(ui.modLevel)} bahasa ${esc(meta.name_id)}.</p>
        <button type="button" class="btn-secondary" data-action="mod-level" data-level="ALL">Tampilkan Semua Level</button>
      </div>
    `;

    // --- Skill Tree Builder (Grouped by Level Tiers + Alphabet Root) ---
    const gate = Store.getScriptGateStatus(state, state.activeLang);
    const scriptPack = SCRIPT_DATA && SCRIPT_DATA[state.activeLang];
    const hasScriptRoot = Boolean(scriptPack);
    let scriptRootPct = 0;
    if (hasScriptRoot) {
      const totalChars = (scriptPack.tabs || []).reduce((s, t) => s + ((t.chars && t.chars.length) || 0), 0);
      const learnedCount = Object.keys((state.learnedChars && state.learnedChars[state.activeLang]) || {}).length;
      scriptRootPct = totalChars > 0 ? Math.min(100, Math.round((learnedCount / totalChars) * 100)) : 0;
    }

    const levelOrder = pack.language.roadmap_levels || [];
    const tierMap = new Map();
    pack.modules.slice().sort((a, b) => (a.order || 0) - (b.order || 0)).forEach((m) => {
      const key = m.level || 'Dasar';
      if (!tierMap.has(key)) tierMap.set(key, []);
      tierMap.get(key).push(m);
    });
    const orderedTiers = Array.from(tierMap.entries()).sort((a, b) => {
      const ia = levelOrder.indexOf(a[0]);
      const ib = levelOrder.indexOf(b[0]);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    const selectedTreeMod = ui.treeSelectedId
      ? pack.modules.find((m) => m.id === ui.treeSelectedId) || pack.modules[0]
      : pack.modules[0];
    if (selectedTreeMod && !ui.treeSelectedId) ui.treeSelectedId = selectedTreeMod.id;

    let treeHtml = '';
    if (ui.modViewMode === 'tree') {
      const rootNodeHtml = hasScriptRoot ? `
        <div class="tree-tier">
          <div class="tree-tier-label">Akar Fondasi Aksara</div>
          <div class="tree-tier-nodes">
            <button type="button" class="tree-node root-node ${scriptRootPct >= 50 ? 'mastered' : ''}" data-nav="alphabet">
              <div class="tree-node-top">
                <span class="tag accent">Aksara</span>
                <span class="mono tree-node-pct">${scriptRootPct}%</span>
              </div>
              <div class="tree-node-title">${esc(scriptPack.title || 'Pengenalan Aksara')}</div>
              <div class="progress-track" style="height:5px;margin-top:8px;"><div class="progress-fill jade" style="width:${scriptRootPct}%"></div></div>
            </button>
          </div>
        </div>
        <div class="tree-connector" aria-hidden="true"><span></span></div>
      ` : '';

      let prevTierDone = !hasScriptRoot || scriptRootPct >= 20;
      const tiersHtml = orderedTiers.map(([lvl, mods], tIdx) => {
        const tierDoneCount = mods.filter((m) => completedMap[m.id]).length;
        const nodesHtml = mods.map((m) => {
          const mast = Store.computeModuleMastery(state, state.activeLang, m.id);
          const isSelected = selectedTreeMod && selectedTreeMod.id === m.id;
          const isLocked = !gate.unlocked;
          const prereqHint = !isLocked && !prevTierDone && tIdx > 0;
          return `
            <button type="button" class="tree-node ${mast.done ? 'mastered' : ''} ${isSelected ? 'selected' : ''} ${isLocked ? 'is-locked' : ''} ${prereqHint ? 'prereq-hint' : ''}" data-action="tree-select-node" data-mod="${esc(m.id)}">
              <div class="tree-node-top">
                <span class="tag ${isLocked ? '' : mast.done ? 'jade' : 'accent'}">${isLocked ? `${ICONS.lock} Terkunci` : esc(m.level)}</span>
                <span class="mono tree-node-pct">${mast.pct}%</span>
              </div>
              <div class="tree-node-title">${esc(m.title)}</div>
              <div class="tree-node-meta">${isLocked ? `Kuasai ${gate.required} huruf aksara (${gate.learned}/${gate.required}) untuk membuka` : `${mast.masteredCards}/${mast.totalCards} SRS dikuasai${prereqHint ? ' · Disarankan selesaikan tier atas dulu' : ''}`}</div>
              <div class="progress-track" style="height:5px;margin-top:8px;"><div class="progress-fill ${mast.done ? 'jade' : ''}" style="width:${mast.pct}%"></div></div>
            </button>
          `;
        }).join('');
        prevTierDone = tierDoneCount > 0;
        return `
          <div class="tree-tier">
            <div class="tree-tier-label">Tier ${tIdx + 1} · Level ${esc(lvl)} (${tierDoneCount}/${mods.length} selesai)</div>
            <div class="tree-tier-nodes">${nodesHtml}</div>
          </div>
          ${tIdx < orderedTiers.length - 1 ? '<div class="tree-connector" aria-hidden="true"><span></span></div>' : ''}
        `;
      }).join('');

      let detailHtml = '';
      if (selectedTreeMod) {
        const mast = Store.computeModuleMastery(state, state.activeLang, selectedTreeMod.id);
        const fcCount = pack.flashcards.filter((c) => c.module_id === selectedTreeMod.id).length;
        const qCount = pack.quizzes.filter((qz) => qz.module_id === selectedTreeMod.id).length;
        const dCount = pack.dialogs.filter((d) => d.module_id === selectedTreeMod.id).length;
        detailHtml = !gate.unlocked ? `
          <aside class="card tree-detail-panel" aria-label="Tahap aksara terkunci">
            <div class="toolbar-group" style="margin-bottom:8px;">
              <span class="tag accent">${ICONS.lock} Terkunci</span>
              <span class="tag">Aksara ${gate.learned}/${gate.required}</span>
            </div>
            <h2 class="module-title" style="margin-bottom:8px;">Selesaikan Fondasi Aksara Dulu</h2>
            <p class="kpi-label" style="margin-bottom:12px;">Kuasai minimal ${gate.required} huruf di Pengenalan Aksara agar seluruh modul ${esc(meta.name_id)} terbuka otomatis.</p>
            <div class="progress-track" style="height:8px;margin-bottom:14px;"><div class="progress-fill jade" style="width:${gate.pct}%"></div></div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <button type="button" class="btn-primary" data-nav="alphabet">Buka Pengenalan Aksara (${gate.learned}/${gate.required})</button>
              <button type="button" class="btn-secondary btn-sm" data-action="script-gate-bypass">Saya sudah bisa baca (Buka Kunci)</button>
            </div>
          </aside>
        ` : `
          <aside class="card tree-detail-panel" aria-label="Detail node terpilih">
            <div class="toolbar-group" style="margin-bottom:8px;">
              <span class="tag accent">${esc(selectedTreeMod.level)}</span>
              <span class="tag">${selectedTreeMod.estimated_minutes || 15} menit</span>
              <span class="tag ${mast.done ? 'jade' : ''}">Penguasaan ${mast.pct}%</span>
            </div>
            <h2 class="module-title" style="margin-bottom:8px;">${esc(selectedTreeMod.title)}</h2>
            <ul class="objective-list" style="margin-bottom:14px;">
              ${selectedTreeMod.objectives.map((o) => `<li>${esc(o)}</li>`).join('')}
            </ul>
            <div class="toolbar-group" style="margin-bottom:12px;">
              <button type="button" class="btn-secondary btn-sm" data-action="mod-to-fc" data-mod="${esc(selectedTreeMod.id)}">Kartu SRS (${fcCount})</button>
              <button type="button" class="btn-secondary btn-sm" data-action="mod-to-quiz" data-mod="${esc(selectedTreeMod.id)}">Quiz (${qCount})</button>
              ${dCount > 0 ? `<button type="button" class="btn-secondary btn-sm" data-action="mod-to-dialog" data-mod="${esc(selectedTreeMod.id)}">Dialog (${dCount})</button>` : ''}
            </div>
            <button type="button" class="${mast.done ? 'btn-jade' : 'btn-primary'}" style="width:100%;" data-action="toggle-module-done" data-mod="${esc(selectedTreeMod.id)}">
              ${mast.done ? `${ICONS.check} Node Selesai` : 'Tandai Node Selesai'}
            </button>
          </aside>
        `;
      }

      treeHtml = `
        <div class="skill-tree-layout">
          <div class="skill-tree-stage card">${rootNodeHtml}${tiersHtml}</div>
          ${detailHtml}
        </div>
      `;
    }

    return `
      <div class="card roadmap-header-card">
        <div class="dash-lang-title">
          <span class="stamp-badge lg">${esc(meta.stamp)}</span>
          <div>
            <h1 class="page-title">${esc(meta.name_id)} · ${esc(meta.name_native)}</h1>
            <p class="page-sub">${esc(meta.focus)}</p>
          </div>
        </div>
        <div class="toolbar-group">
          <div class="segmented" role="group" aria-label="Mode tampilan modul">
            <button type="button" class="seg-btn ${ui.modViewMode === 'tree' ? 'active' : ''}" data-action="mod-view-mode" data-val="tree">Pohon Keahlian</button>
            <button type="button" class="seg-btn ${ui.modViewMode === 'list' ? 'active' : ''}" data-action="mod-view-mode" data-val="list">Daftar Modul</button>
          </div>
          <div class="progress-ring-wrap">
            <svg class="ring-svg" width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
              <circle class="ring-bg" cx="26" cy="26" r="20"></circle>
              <circle class="ring-fg" cx="26" cy="26" r="20" stroke-dasharray="${circ}" stroke-dashoffset="${offset}"></circle>
            </svg>
            <div>
              <div class="mono" style="font-weight:700;font-size:1rem;">${pct}%</div>
              <div class="kpi-label">${doneMods}/${totalMods} modul selesai</div>
            </div>
          </div>
        </div>
      </div>

      ${ui.modViewMode === 'tree' ? treeHtml : `
        <div class="level-tabs" role="tablist" aria-label="Filter level modul">
          ${levelTabsHtml}
        </div>

        <div class="toolbar-row">
          <div style="flex:1;min-width:220px;max-width:360px;">
            <label for="mod-search" class="sr-only">Cari modul</label>
            <input id="mod-search" type="search" class="phonetic-input" value="${esc(ui.modQuery)}" placeholder="Cari judul atau tujuan modul...">
          </div>
          <div class="segmented" role="group" aria-label="Status modul">
            <button type="button" class="seg-btn ${ui.modStatus === 'all' ? 'active' : ''}" data-action="mod-status" data-val="all">Semua</button>
            <button type="button" class="seg-btn ${ui.modStatus === 'todo' ? 'active' : ''}" data-action="mod-status" data-val="todo">Belum</button>
            <button type="button" class="seg-btn ${ui.modStatus === 'done' ? 'active' : ''}" data-action="mod-status" data-val="done">Selesai</button>
          </div>
        </div>

        <div class="module-list">${cardsHtml}</div>
      `}
    `;
  }

  // ==========================================================================
  // VIEW 3: FLASHCARD SRS (SM-2)
  // ==========================================================================
  function rebuildFlashcardQueue() {
    const pack = getActivePack();
    if (!pack) {
      ui.fcQueue = [];
      ui.fcIndex = 0;
      ui.fcFlipped = false;
      return;
    }
    const today = Store.getTodayKey(0);
    ui.fcQueue = pack.flashcards.filter((c) => {
      if (ui.fcModule !== 'ALL' && c.module_id !== ui.fcModule) return false;
      if (ui.fcMinedOnly && c.source !== 'mined') return false;
      if (ui.fcDueOnly && !Store.isCardDue(c, today)) return false;
      return true;
    }).map((c) => c.id);
    ui.fcIndex = 0;
    ui.fcFlipped = false;
  }

  function openAddCardModal() {
    const pack = getActivePack();
    if (!pack) {
      showToast('Impor paket bahasa ini dulu sebelum menambah kartu.', 'error');
      return;
    }
    const sel = document.getElementById('fc-input-module');
    if (sel) {
      sel.innerHTML = pack.modules.map((m) => `<option value="${esc(m.id)}">${esc(m.level)} · ${esc(m.title)}</option>`).join('');
    }
    const dlg = document.getElementById('modal-add-card');
    if (dlg) dlg.showModal();
  }

  function checkAutoCompleteModule(langCode, moduleId) {
    if (!moduleId || !state || !state.packs[langCode]) return false;
    state.completedModules[langCode] = state.completedModules[langCode] || {};
    if (state.completedModules[langCode][moduleId]) return false;
    const pack = state.packs[langCode];
    const mod = pack.modules.find((m) => m.id === moduleId);
    if (!mod) return false;
    const modCards = pack.flashcards.filter((c) => c.module_id === moduleId);
    if (!modCards.length) return false;
    const allReviewed = modCards.every((c) => c.srs && c.srs.repetitions > 0);
    if (!allReviewed) return false;
    state.completedModules[langCode][moduleId] = true;
    const today = Store.getTodayKey(0);
    const log = Store.ensureDayLog(state, today);
    log.modules = (log.modules || 0) + 1;
    Store.addXP(state, langCode, 25);
    showToast(`Modul "${mod.title}" otomatis selesai (+25 XP)!`, 'achievement');
    return true;
  }

  async function rateCurrentCard(quality) {
    const pack = getActivePack();
    if (!pack || ui.fcQueue.length === 0) return;
    const cardId = ui.fcQueue[ui.fcIndex];
    const card = pack.flashcards.find((c) => c.id === cardId);
    if (!card) return;

    const nextSrs = Store.previewSM2(card.srs, quality);
    card.srs = nextSrs;

    const today = Store.getTodayKey(0);
    const log = Store.ensureDayLog(state, today);
    log.cards = (log.cards || 0) + 1;
    Store.addXP(state, state.activeLang, 5);

    if (quality >= 3 && card.module_id) {
      checkAutoCompleteModule(state.activeLang, card.module_id);
    }

    // Remove from current slot; if quality === 1 (Lupa), re-queue at end of session
    ui.fcQueue.splice(ui.fcIndex, 1);
    if (quality === 1) {
      ui.fcQueue.push(cardId);
      showToast('Kartu diulang di akhir sesi ini.', 'default');
    }
    if (ui.fcIndex >= ui.fcQueue.length) ui.fcIndex = 0;
    ui.fcFlipped = false;

    await persistState();
    renderChrome();
    renderView();
  }

  function renderFlashcards() {
    const pack = getActivePack();
    if (!pack) return renderMissingPackState('Flashcard SRS');

    const modOpts = `<option value="ALL" ${ui.fcModule === 'ALL' ? 'selected' : ''}>Semua Modul (${pack.flashcards.length})</option>` +
      pack.modules.map((m) => {
        const cnt = pack.flashcards.filter((c) => c.module_id === m.id).length;
        return `<option value="${esc(m.id)}" ${ui.fcModule === m.id ? 'selected' : ''}>${esc(m.level)} · ${esc(m.title)} (${cnt})</option>`;
      }).join('');

    const currentId = ui.fcQueue[ui.fcIndex];
    const card = currentId ? pack.flashcards.find((c) => c.id === currentId) : null;

    let stageHtml = '';
    if (!card) {
      stageHtml = `
        <div class="empty-state">
          <h2>Semua kartu pada antrean ini sudah selesai</h2>
          <p>${ui.fcDueOnly ? 'Tidak ada lagi kartu SRS yang jatuh tempo hari ini untuk filter ini. Anda bisa mematikan filter jatuh tempo untuk mengulas bebas, atau menambah kartu baru.' : 'Belum ada kartu di modul ini.'}</p>
          <div class="toolbar-group" style="margin-top:8px;">
            ${ui.fcDueOnly ? '<button type="button" class="btn-primary" data-action="fc-show-all">Ulas Semua Kartu</button>' : ''}
            <button type="button" class="btn-secondary" data-action="open-add-card">${ICONS.plus} Tambah Kartu Baru</button>
          </div>
        </div>
      `;
    } else {
      const p1 = Store.previewSM2(card.srs, 1);
      const p3 = Store.previewSM2(card.srs, 3);
      const p4 = Store.previewSM2(card.srs, 4);
      const p5 = Store.previewSM2(card.srs, 5);
      const mastered = Store.isCardMastered(card);

      const showReading = card.reading && card.reading.trim() && card.reading.trim() !== card.front.trim();

      stageHtml = `
        <div class="srs-desk">
          <div class="toolbar-row" style="margin-bottom:8px;">
            <span class="kpi-label">Antrean tersisa: <strong class="mono">${ui.fcQueue.length}</strong> kartu</span>
            <span class="kpi-label desktop-only-hint">Shortcut: <kbd class="mono">Spasi</kbd> balik · <kbd class="mono">1-4</kbd> nilai · <kbd class="mono">A</kbd> audio</span>
          </div>

          <div class="srs-card-stage">
            <div class="srs-card ${!ui.fcFlipped ? 'can-flip' : ''}" ${!ui.fcFlipped ? 'data-action="fc-flip"' : ''}>
              <div class="srs-card-top">
                <div class="toolbar-group">
                  <span class="tag accent">${esc(card.level)}</span>
                  <span class="tag">${esc(card.category || 'kosakata')}</span>
                  ${mastered ? '<span class="tag jade">Dikuasai</span>' : ''}
                </div>
                <button type="button" class="audio-btn" data-speak="${esc(card.front)}" aria-label="Putar audio pelafalan ${esc(card.front)}">
                  ${ICONS.speaker}
                </button>
              </div>

              ${!ui.fcFlipped ? `
                <div class="srs-front-main">
                  <div class="srs-native-lg">${esc(card.front)}</div>
                  <p class="kpi-label">Ingat artinya dalam bahasa Indonesia, lalu balik kartu.</p>
                </div>
                <div style="text-align:center;">
                  <button type="button" class="btn-primary" data-action="fc-flip" style="min-width:200px;">Balik Kartu</button>
                </div>
              ` : `
                <div class="srs-back-main">
                  <div class="srs-back-head">
                    <div class="srs-back-front">${esc(card.front)}</div>
                    <div class="srs-reading-line">${showReading ? `${esc(card.reading)} · ` : ''}<em>${esc(card.romaji)}</em></div>
                  </div>
                  <div class="srs-meaning">${esc(card.meaning_id)}</div>
                  ${card.mnemonic ? `<div class="srs-mnemonic"><strong>Catatan:</strong> ${esc(card.mnemonic)}</div>` : ''}
                  ${card.example_native ? `
                    <div class="srs-example">
                      <div>
                        <div style="font-weight:600;">${esc(card.example_native)}</div>
                        ${card.example_romaji && card.example_romaji.trim() !== card.example_native.trim() ? `<div style="font-size:0.82rem;color:var(--ink-muted);font-style:italic;">${esc(card.example_romaji)}</div>` : ''}
                        <div style="font-size:0.86rem;color:var(--ink-muted);">${esc(card.example_id)}</div>
                      </div>
                      <button type="button" class="audio-btn" data-speak="${esc(card.example_native)}" aria-label="Putar audio contoh kalimat">
                        ${ICONS.speaker}
                      </button>
                    </div>
                  ` : ''}
                </div>
              `}
            </div>
          </div>

          ${ui.fcFlipped ? `
            <div class="sm2-grid" role="group" aria-label="Nilai ingatan SM-2">
              <button type="button" class="sm2-btn q1" data-action="fc-rate" data-q="1">
                <span class="sm2-title">1 · Lupa</span>
                <span class="sm2-interval">${p1.interval_days === 0 ? 'Ulang sesi ini' : `${p1.interval_days} hari`}</span>
              </button>
              <button type="button" class="sm2-btn q3" data-action="fc-rate" data-q="3">
                <span class="sm2-title">2 · Sulit</span>
                <span class="sm2-interval">${p3.interval_days} hari</span>
              </button>
              <button type="button" class="sm2-btn q4" data-action="fc-rate" data-q="4">
                <span class="sm2-title">3 · Ingat</span>
                <span class="sm2-interval">${p4.interval_days} hari</span>
              </button>
              <button type="button" class="sm2-btn q5" data-action="fc-rate" data-q="5">
                <span class="sm2-title">4 · Mudah</span>
                <span class="sm2-interval">${p5.interval_days} hari</span>
              </button>
            </div>
          ` : ''}
        </div>
      `;
    }

    const minedCount = pack.flashcards.filter((c) => c.source === 'mined').length;
    return `
      ${renderStudyBreadcrumb('Kartu SRS')}
      <div class="section-header">
        <div>
          <h1 class="page-title">Flashcard SRS (SM-2)</h1>
          <p class="page-sub">Klik kartu atau tekan Spasi untuk membalik, lalu beri nilai seberapa cepat Anda mengingatnya.</p>
        </div>
        <div class="toolbar-group">
          <button type="button" class="btn-secondary" data-action="open-mine-custom">Tambang Teks Sendiri</button>
          <button type="button" class="btn-primary" data-action="open-add-card">${ICONS.plus} Kartu Baru</button>
        </div>
      </div>

      <div class="toolbar-row">
        <div class="toolbar-group">
          <label for="fc-module-select" class="sr-only">Filter modul flashcard</label>
          <select id="fc-module-select" class="lang-select" style="width:auto;min-width:220px;">${modOpts}</select>
          <button type="button" class="chip ${ui.fcDueOnly ? 'active' : ''}" data-action="fc-toggle-due" aria-pressed="${ui.fcDueOnly}">
            Jatuh Tempo Hari Ini (${getDueCountForLang(state.activeLang)})
          </button>
          <button type="button" class="chip ${ui.fcMinedOnly ? 'active' : ''}" data-action="fc-toggle-mined" aria-pressed="${ui.fcMinedOnly}">
            Hasil Tambang (${minedCount})
          </button>
        </div>
      </div>

      ${stageHtml}
      ${renderNextStepBar('Sudah selesai mengulas kosakata?', 'Uji langsung ingatan Anda lewat 5 tipe soal interaktif.', 'Lanjut ke Quiz Interaktif', 'quiz', ui.fcModule !== 'ALL' ? `data-action="mod-to-quiz" data-mod="${esc(ui.fcModule)}"` : '')}
    `;
  }

  // ==========================================================================
  // VIEW 4: QUIZ 5 TIPE (WITH DAILY SEEDED REFRESH)
  // ==========================================================================
  function hashSeedString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function createSeededRng(seedStr) {
    let a = hashSeedString(seedStr) || 1;
    return function () {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function seededShuffle(arr, rng) {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = out[i];
      out[i] = out[j];
      out[j] = tmp;
    }
    return out;
  }

  function getDailyQuizMeta(langCode) {
    const today = Store.getTodayKey(0);
    state.dailyQuizMeta = state.dailyQuizMeta || {};
    const cur = state.dailyQuizMeta[langCode];
    if (!cur || cur.date !== today) {
      state.dailyQuizMeta[langCode] = { date: today, nonce: 0, setsDone: 0 };
    }
    return state.dailyQuizMeta[langCode];
  }

  function buildDynamicDailyQuizzes(pack, langCode, rng) {
    const dynamic = [];
    const cards = (pack && Array.isArray(pack.flashcards)) ? pack.flashcards : [];
    const validCards = cards.filter((c) => c && c.front && c.meaning_id);

    if (validCards.length >= 4) {
      const sampled = seededShuffle(validCards, rng).slice(0, 6);
      sampled.forEach((card, idx) => {
        const others = seededShuffle(validCards.filter((o) => o.id !== card.id && o.meaning_id !== card.meaning_id), rng).slice(0, 3);
        if (others.length === 3) {
          if (idx % 2 === 0) {
            const opts = seededShuffle([card.meaning_id, ...others.map((o) => o.meaning_id)], rng);
            dynamic.push({
              id: `daily-fc-m-${card.id}-${idx}`,
              module_id: card.module_id,
              type: 'multiple_choice',
              prompt: `Apa arti dari "${card.front}"${card.romaji ? ` (${card.romaji})` : ''}?`,
              options: opts,
              answer: card.meaning_id,
              explanation_id: `"${card.front}" (${card.romaji || '-'}) berarti "${card.meaning_id}".`
            });
          } else {
            const opts = seededShuffle([card.front, ...others.map((o) => o.front)], rng);
            dynamic.push({
              id: `daily-fc-f-${card.id}-${idx}`,
              module_id: card.module_id,
              type: 'multiple_choice',
              prompt: `Pilih ungkapan ${getCatalogMeta(langCode).name_id} yang berarti "${card.meaning_id}":`,
              options: opts,
              answer: card.front,
              explanation_id: `"${card.meaning_id}" dalam bahasa ${getCatalogMeta(langCode).name_id} adalah "${card.front}" (${card.romaji || '-'}).`
            });
          }
        }
      });

      const matchCards = seededShuffle(validCards, rng).slice(0, 4);
      if (matchCards.length === 4) {
        dynamic.push({
          id: `daily-match-${matchCards.map((c) => c.id).join('-')}`,
          module_id: matchCards[0].module_id,
          type: 'matching',
          prompt: 'Pasangkan kosakata harian berikut dengan artinya:',
          pairs: matchCards.map((c) => ({ left: c.front, right: c.meaning_id })),
          explanation_id: 'Semua pasangan kosakata harian cocok dengan tepat.'
        });
      }
    }

    const conjData = CONJUGATION_DATA && CONJUGATION_DATA[langCode];
    if (conjData && Array.isArray(conjData.items) && conjData.items.length > 0) {
      seededShuffle(conjData.items, rng).slice(0, 2).forEach((item) => {
        const opts = seededShuffle([item.answer, ...(item.distractors || [])], rng);
        dynamic.push({
          id: `daily-conj-${item.id}`,
          module_id: 'ALL',
          type: 'multiple_choice',
          prompt: `Ubah "${item.base}" (${item.meaning_id}) ke bentuk ${item.targetForm}:`,
          options: opts,
          answer: item.answer,
          explanation_id: `${item.answer} (${item.romaji}). ${item.hintRule}`
        });
      });
    }

    return dynamic;
  }

  function cloneAndShuffleQuestion(q, rng) {
    const copy = { ...q };
    if (Array.isArray(q.options)) {
      copy.options = seededShuffle(q.options, rng);
    }
    if (Array.isArray(q.tokens)) {
      copy.tokens = seededShuffle(q.tokens, rng);
    }
    if (Array.isArray(q.pairs)) {
      copy.pairs = seededShuffle(q.pairs, rng);
    }
    return copy;
  }

  function rebuildQuizSession() {
    const pack = getActivePack();
    const today = Store.getTodayKey(0);
    ui.quizDateKey = today;
    if (!pack) {
      ui.quizList = [];
      ui.quizIdx = 0;
      ui.quizFinished = false;
      return;
    }
    const dMeta = getDailyQuizMeta(state.activeLang);
    const seedStr = `${today}|${state.activeLang}|${ui.quizModule}|${dMeta.nonce}`;
    const rng = createSeededRng(seedStr);

    let list = pack.quizzes.slice();
    if (Array.isArray(ui.quizFilterIds) && ui.quizFilterIds.length > 0) {
      list = list.filter((q) => ui.quizFilterIds.includes(q.id));
      list = seededShuffle(list, rng).map((q) => cloneAndShuffleQuestion(q, rng));
    } else if (ui.quizModule !== 'ALL') {
      list = list.filter((q) => q.module_id === ui.quizModule);
      list = seededShuffle(list, rng).map((q) => cloneAndShuffleQuestion(q, rng));
    } else {
      const dynamicPool = buildDynamicDailyQuizzes(pack, state.activeLang, rng);
      const staticShuffled = seededShuffle(list, rng).slice(0, 5);
      const dynamicShuffled = seededShuffle(dynamicPool, rng).slice(0, 3);
      list = seededShuffle([...staticShuffled, ...dynamicShuffled], rng)
        .slice(0, 8)
        .map((q) => cloneAndShuffleQuestion(q, rng));
    }
    ui.quizList = list;
    ui.quizIdx = 0;
    ui.quizScore = 0;
    ui.quizFinished = false;
    resetCurrentQuizQuestion();
  }

  function resetCurrentQuizQuestion() {
    ui.quizAnswered = false;
    ui.quizFeedback = null;
    ui.quizSelectedOption = null;
    ui.quizWordOrder = [];
    ui.quizTranslationText = '';
    ui.quizMatchLeft = null;
    ui.quizMatchPairs = {};
    ui.quizMatchWrong = null;
  }

  async function recordQuizResult(isCorrect, explanation) {
    ui.quizAnswered = true;
    ui.quizFeedback = { isCorrect, explanation };
    if (isCorrect) ui.quizScore++;

    const today = Store.getTodayKey(0);
    const log = Store.ensureDayLog(state, today);
    log.quizTotal = (log.quizTotal || 0) + 1;
    if (isCorrect) {
      log.quizCorrect = (log.quizCorrect || 0) + 1;
      Store.addXP(state, state.activeLang, 10);
    }

    await persistState();
    renderChrome();
    renderView();
  }

  function renderQuiz() {
    const pack = getActivePack();
    if (!pack) return renderMissingPackState('Quiz Interaktif');

    const today = Store.getTodayKey(0);
    if (ui.quizDateKey !== today) {
      rebuildQuizSession();
    }
    const dMeta = getDailyQuizMeta(state.activeLang);

    const modOpts = `<option value="ALL" ${ui.quizModule === 'ALL' ? 'selected' : ''}>Set Harian Campuran (8 soal baru/hari)</option>` +
      pack.modules.map((m) => {
        const cnt = pack.quizzes.filter((q) => q.module_id === m.id).length;
        return `<option value="${esc(m.id)}" ${ui.quizModule === m.id ? 'selected' : ''}>${esc(m.level)} · ${esc(m.title)} (${cnt})</option>`;
      }).join('');

    const drillBanner = ui.quizFilterIds ? `
      <div class="session-banner" style="padding:12px 16px;margin-bottom:16px;">
        <div><strong>Mode Drill Tata Bahasa</strong> · Menampilkan ${ui.quizList.length} soal terkait pola yang dipilih.</div>
        <button type="button" class="btn-secondary btn-sm" data-action="quiz-clear-drill">Keluar Mode Drill</button>
      </div>
    ` : '';

    if (ui.quizList.length === 0) {
      return `
        <div class="section-header">
          <div><h1 class="page-title">Quiz 5 Tipe</h1></div>
        </div>
        ${drillBanner}
        <div class="empty-state">
          <h2>Belum ada soal quiz untuk filter ini</h2>
          <p>Pilih modul lain atau tambahkan soal baru melalui Import JSON.</p>
          <button type="button" class="btn-primary" data-action="quiz-clear-drill">Tampilkan Semua Soal</button>
        </div>
      `;
    }

    if (ui.quizFinished) {
      const pct = ui.quizList.length > 0 ? Math.round((ui.quizScore / ui.quizList.length) * 100) : 0;
      return `
        <div class="quiz-arena">
          <div class="empty-state">
            <span class="tag jade">Sesi Selesai</span>
            <h1 class="page-title">Skor Anda: ${ui.quizScore} / ${ui.quizList.length} (${pct}%)</h1>
            <p>Hasil akurasi sudah dicatat ke statistik harian Anda.</p>
            <div class="toolbar-group" style="margin-top:8px;">
              <button type="button" class="btn-primary" data-action="quiz-refresh-daily">${ICONS.refresh} Buat Set Soal Baru</button>
              <button type="button" class="btn-secondary" data-action="quiz-restart">Ulangi Set Ini</button>
              <button type="button" class="btn-secondary" data-nav="stats">Lihat Statistik</button>
            </div>
          </div>
        </div>
      `;
    }

    const q = ui.quizList[ui.quizIdx];
    const typeLabels = {
      multiple_choice: 'PILIHAN GANDA',
      fill_blank: 'ISI BAGIAN KOSONG',
      word_order: 'URUTKAN KATA',
      translation: 'TERJEMAHAN',
      matching: 'PASANGKAN KATA'
    };

    let bodyHtml = '';
    if (q.type === 'multiple_choice' || q.type === 'fill_blank') {
      bodyHtml = `
        <div class="quiz-options">
          ${q.options.map((opt) => {
            let cls = '';
            if (ui.quizAnswered) {
              if (opt === q.answer) cls = 'correct';
              else if (opt === ui.quizSelectedOption) cls = 'wrong';
            } else if (opt === ui.quizSelectedOption) {
              cls = 'selected';
            }
            return `<button type="button" class="quiz-opt-btn ${cls}" data-action="quiz-pick-opt" data-opt="${esc(opt)}" ${ui.quizAnswered ? 'disabled' : ''}><span>${esc(opt)}</span></button>`;
          }).join('')}
        </div>
        ${!ui.quizAnswered ? `<div style="margin-top:16px;display:flex;justify-content:flex-end;"><button type="button" class="btn-primary" data-action="quiz-check" ${!ui.quizSelectedOption ? 'disabled' : ''}>Cek Jawaban</button></div>` : ''}
      `;
    } else if (q.type === 'word_order') {
      const placedCounts = {};
      ui.quizWordOrder.forEach((t) => { placedCounts[t] = (placedCounts[t] || 0) + 1; });
      const usedSoFar = {};

      const dropHtml = ui.quizWordOrder.length > 0
        ? ui.quizWordOrder.map((tok, i) => `<button type="button" class="word-chip placed" data-action="quiz-wo-remove" data-idx="${i}" ${ui.quizAnswered ? 'disabled' : ''}>${esc(tok)}</button>`).join('')
        : '<span class="kpi-label">Ketuk kata di bawah sesuai urutan</span>';

      const bankHtml = q.tokens.map((tok) => {
        usedSoFar[tok] = (usedSoFar[tok] || 0) + 1;
        const isUsed = (placedCounts[tok] || 0) >= usedSoFar[tok];
        return `<button type="button" class="word-chip" data-action="quiz-wo-add" data-tok="${esc(tok)}" ${(isUsed || ui.quizAnswered) ? 'disabled' : ''}>${esc(tok)}</button>`;
      }).join('');

      bodyHtml = `
        <div class="word-drop-zone" aria-label="Susunan kalimat jawaban">${dropHtml}</div>
        <div class="word-chip-bank" aria-label="Pilihan kata">${bankHtml}</div>
        ${!ui.quizAnswered ? `<div style="display:flex;justify-content:space-between;gap:10px;"><button type="button" class="btn-ghost btn-sm" data-action="quiz-wo-clear" ${ui.quizWordOrder.length === 0 ? 'disabled' : ''}>Reset Susunan</button><button type="button" class="btn-primary" data-action="quiz-check" ${ui.quizWordOrder.length === 0 ? 'disabled' : ''}>Cek Jawaban</button></div>` : ''}
      `;
    } else if (q.type === 'translation') {
      const showPhonetic = state.activeLang === 'ja' || state.activeLang === 'ko';
      const preview = showPhonetic ? convertPhonetic(state.activeLang, ui.quizTranslationText) : '';
      bodyHtml = `
        <div class="form-field">
          <label for="quiz-trans-input">Ketik jawaban Anda (aksara asli atau Romaji):</label>
          <input id="quiz-trans-input" type="text" class="phonetic-input" value="${esc(ui.quizTranslationText)}" placeholder="Ketik jawaban di sini..." autocomplete="off" ${ui.quizAnswered ? 'disabled' : ''}>
        </div>
        ${showPhonetic ? `
          <div style="margin-bottom:14px;padding:10px 14px;background:var(--surface-subtle);border-radius:var(--radius-sm);border:1px solid var(--border);">
            <span class="kpi-label">Pratinjau fonetik (${state.activeLang === 'ja' ? 'Hiragana' : 'Hangul'}): </span>
            <strong id="quiz-phonetic-preview" style="font-size:1.15rem;color:var(--accent-text);">${esc(preview || '...')}</strong>
          </div>
        ` : ''}
        ${!ui.quizAnswered ? `<div style="display:flex;justify-content:flex-end;"><button type="button" class="btn-primary" data-action="quiz-check">Cek Jawaban</button></div>` : ''}
      `;
    } else if (q.type === 'matching') {
      const matchedLefts = Object.keys(ui.quizMatchPairs);
      const matchedRights = Object.values(ui.quizMatchPairs);
      // Deterministic shuffle of right column based on question id
      const rightItems = q.pairs.map((p) => p.right).slice().sort((a, b) => a.localeCompare(b));

      bodyHtml = `
        <p class="kpi-label" style="margin-bottom:10px;">Klik satu item di kolom kiri, lalu klik pasangannya di kolom kanan.</p>
        <div class="matching-grid">
          <div class="matching-col">
            ${q.pairs.map((p) => {
              const matched = matchedLefts.includes(p.left);
              const selected = ui.quizMatchLeft === p.left;
              const cls = matched ? 'correct' : selected ? 'selected' : '';
              return `<button type="button" class="quiz-opt-btn ${cls}" data-action="quiz-match-left" data-val="${esc(p.left)}" ${(matched || ui.quizAnswered) ? 'disabled' : ''}><span>${esc(p.left)}</span>${matched ? ICONS.check : ''}</button>`;
            }).join('')}
          </div>
          <div class="matching-col">
            ${rightItems.map((r) => {
              const matched = matchedRights.includes(r);
              const isWrong = ui.quizMatchWrong === r;
              const cls = matched ? 'correct' : isWrong ? 'wrong' : '';
              return `<button type="button" class="quiz-opt-btn ${cls}" data-action="quiz-match-right" data-val="${esc(r)}" ${(matched || ui.quizAnswered) ? 'disabled' : ''}><span>${esc(r)}</span>${matched ? ICONS.check : ''}</button>`;
            }).join('')}
          </div>
        </div>
      `;
    }

    const feedbackHtml = ui.quizFeedback ? `
      <div class="feedback-box ${ui.quizFeedback.isCorrect ? 'correct' : 'wrong'}" role="status">
        <div class="feedback-title">${ui.quizFeedback.isCorrect ? 'Tepat!' : 'Belum tepat.'}</div>
        <p>${esc(ui.quizFeedback.explanation)}</p>
        <div style="margin-top:12px;display:flex;justify-content:flex-end;">
          <button type="button" class="btn-primary" data-action="quiz-next">${ui.quizIdx + 1 < ui.quizList.length ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</button>
        </div>
      </div>
    ` : '';

    return `
      ${renderStudyBreadcrumb('Quiz Interaktif')}
      <div class="section-header">
        <div>
          <div class="toolbar-group" style="margin-bottom:4px;">
            <span class="tag jade">Set Harian · ${esc(today)}${dMeta.nonce > 0 ? ` (#${dMeta.nonce + 1})` : ''}</span>
            ${dMeta.setsDone > 0 ? `<span class="tag">Selesai hari ini: ${dMeta.setsDone} set</span>` : ''}
          </div>
          <h1 class="page-title">Quiz 5 Tipe</h1>
          <p class="page-sub">Soal diperbarui otomatis setiap hari dari gabungan modul, kosakata SRS, dan pola konjugasi.</p>
        </div>
        <div class="toolbar-group">
          <label for="quiz-mod-select" class="sr-only">Filter modul quiz</label>
          <select id="quiz-mod-select" class="lang-select" style="width:auto;min-width:210px;">${modOpts}</select>
          <button type="button" class="btn-secondary btn-sm" data-action="quiz-refresh-daily" title="Acak dan buat set soal baru sekarang">
            ${ICONS.refresh} Segarkan Soal
          </button>
        </div>
      </div>

      ${drillBanner}

      <div class="quiz-arena">
        <div class="card">
          <div class="toolbar-row" style="margin-bottom:10px;">
            <div class="toolbar-group">
              <span class="tag accent">${esc(typeLabels[q.type] || q.type)}</span>
              <span class="tag">${esc(getCatalogMeta(state.activeLang).name_id)}</span>
            </div>
            <span class="mono" style="font-size:0.85rem;color:var(--ink-muted);">Soal ${ui.quizIdx + 1}/${ui.quizList.length}</span>
          </div>
          <div class="progress-track" style="margin-bottom:14px;">
            <div class="progress-fill" style="width:${Math.round(((ui.quizIdx + (ui.quizAnswered ? 1 : 0)) / ui.quizList.length) * 100)}%"></div>
          </div>

          <h2 class="quiz-prompt">${esc(q.prompt)}</h2>
          ${bodyHtml}
          ${feedbackHtml}
        </div>
      </div>
      ${renderNextStepBar('Ingin melatih kalimat dalam percakapan nyata?', 'Gunakan mode peran untuk menyembunyikan giliran bicara Anda.', 'Lanjut ke Dialog Role-Play', 'dialogs')}
    `;
  }

  function checkCurrentQuiz() {
    const q = ui.quizList[ui.quizIdx];
    if (!q || ui.quizAnswered) return;

    if (q.type === 'multiple_choice' || q.type === 'fill_blank') {
      if (!ui.quizSelectedOption) return;
      const ok = ui.quizSelectedOption === q.answer;
      recordQuizResult(ok, q.explanation_id);
    } else if (q.type === 'word_order') {
      const ok = JSON.stringify(ui.quizWordOrder) === JSON.stringify(q.answer);
      const extra = ok ? q.explanation_id : `Urutan yang tepat: ${q.answer.join(' ')}. ${q.explanation_id}`;
      recordQuizResult(ok, extra);
    } else if (q.type === 'translation') {
      const raw = ui.quizTranslationText.trim();
      if (!raw) {
        showToast('Ketik jawaban Anda terlebih dahulu.', 'error');
        return;
      }
      const norm = (s) => String(s).toLowerCase().replace(/[?!.,？。、\s]/g, '');
      const converted = convertPhonetic(state.activeLang, raw);
      const ok = q.accepted_answers.some((ans) => norm(ans) === norm(raw) || norm(ans) === norm(converted));
      const extra = ok ? q.explanation_id : `Jawaban yang diterima: ${q.accepted_answers[0]}. ${q.explanation_id}`;
      recordQuizResult(ok, extra);
    }
  }

  // ==========================================================================
  // VIEW 5: DIALOG ROLE-PLAY
  // ==========================================================================
  function renderDialogs() {
    const pack = getActivePack();
    if (!pack) return renderMissingPackState('Dialog Role-Play');

    if (!pack.dialogs.length) {
      return `<div class="empty-state"><h1>Belum ada dialog</h1><p>Tambahkan skrip dialog melalui Import JSON.</p></div>`;
    }
    const activeDialog = pack.dialogs.find((d) => d.id === ui.dialogId) || pack.dialogs[0];
    ui.dialogId = activeDialog.id;

    const selectOpts = pack.dialogs.map((d) =>
      `<option value="${esc(d.id)}" ${d.id === activeDialog.id ? 'selected' : ''}>${esc(d.title)}</option>`
    ).join('');

    const linesHtml = activeDialog.lines.map((line, idx) => {
      const roleName = activeDialog.roles[line.role] || line.role;
      const isUserTurn = ui.dialogRoleMode !== 'all' && line.role === ui.dialogRoleMode;
      const key = `${activeDialog.id}-${idx}`;
      const isRevealed = !isUserTurn || Boolean(ui.dialogRevealed[key]);

      return `
        <article class="dialog-bubble ${line.role === 'B' ? 'role-b' : ''}">
          <div style="flex:1;min-width:0;">
            <div class="dialog-speaker">${esc(roleName)} (${esc(line.role)})</div>
            ${isRevealed ? `
              <div class="dialog-native">${esc(line.native)}</div>
              ${ui.dialogShowRomaji ? `<div class="dialog-romaji">${esc(line.romaji)}</div>` : ''}
            ` : `
              <div style="padding:10px 12px;background:var(--accent-soft);border-radius:var(--radius-sm);margin:6px 0;">
                <div style="font-size:0.84rem;font-weight:600;color:var(--accent-text);margin-bottom:4px;">Giliran Anda berbicara:</div>
                <div style="font-weight:600;margin-bottom:8px;">"${esc(line.translation_id)}"</div>
                <button type="button" class="btn-secondary btn-sm" data-action="dialog-reveal" data-key="${esc(key)}">Buka Teks Asli</button>
              </div>
            `}
            ${(ui.dialogShowTrans && isRevealed) ? `<div class="dialog-trans">${esc(line.translation_id)}</div>` : ''}
            ${line.notes ? `<div class="dialog-note">Catatan: ${esc(line.notes)}</div>` : ''}
          </div>
          <div class="dialog-line-actions">
            <button type="button" class="audio-btn" data-speak="${esc(line.native)}" aria-label="Dengarkan baris dialog ${idx + 1}">
              ${ICONS.speaker}
            </button>
            <button type="button" class="btn-ghost btn-sm" data-action="mine-from-dialog" data-idx="${idx}" title="Tambang kalimat ini ke Kartu SRS">
              Tambang
            </button>
          </div>
        </article>
      `;
    }).join('');

    return `
      ${renderStudyBreadcrumb('Dialog Role-Play')}
      <div class="section-header">
        <div>
          <h1 class="page-title">Dialog Role-Play</h1>
          <p class="page-sub">Latih percakapan nyata dengan memilih peran Anda agar teks asli disembunyikan sampai Anda siap mengeceknya.</p>
        </div>
        <select id="dialog-select" class="lang-select" style="width:auto;min-width:230px;" aria-label="Pilih skrip dialog">${selectOpts}</select>
      </div>

      <div class="card" style="margin-bottom:18px;">
        <div class="toolbar-row" style="margin-bottom:10px;">
          <div>
            <div class="toolbar-group" style="margin-bottom:4px;">
              <h2 style="font-size:1.1rem;font-weight:700;">${esc(activeDialog.title)}</h2>
              <span class="tag ${activeDialog.register === 'polite' ? 'jade' : 'amber'}">${activeDialog.register === 'polite' ? 'Sopan' : 'Kasual'}</span>
            </div>
            <p class="kpi-label">${esc(activeDialog.situation)}</p>
          </div>
        </div>

        <div class="toolbar-row" style="margin-bottom:0;">
          <div class="segmented" role="group" aria-label="Mode peran dialog">
            <button type="button" class="seg-btn ${ui.dialogRoleMode === 'all' ? 'active' : ''}" data-action="dialog-role" data-val="all">Semua</button>
            <button type="button" class="seg-btn ${ui.dialogRoleMode === 'A' ? 'active' : ''}" data-action="dialog-role" data-val="A">Saya Peran A (${esc(activeDialog.roles.A)})</button>
            <button type="button" class="seg-btn ${ui.dialogRoleMode === 'B' ? 'active' : ''}" data-action="dialog-role" data-val="B">Saya Peran B (${esc(activeDialog.roles.B)})</button>
          </div>

          <div class="toolbar-group">
            <button type="button" class="chip ${ui.dialogShowRomaji ? 'active' : ''}" data-action="dialog-toggle-romaji" aria-pressed="${ui.dialogShowRomaji}">Romaji</button>
            <button type="button" class="chip ${ui.dialogShowTrans ? 'active' : ''}" data-action="dialog-toggle-trans" aria-pressed="${ui.dialogShowTrans}">Terjemahan</button>
          </div>
        </div>
      </div>

      <div class="dialog-stream">${linesHtml}</div>
      ${renderNextStepBar('Latih pemahaman membaca teks pendek', 'Ketuk kata asing pada bacaan untuk langsung menyimpannya ke deck SRS.', 'Lanjut ke Bacaan Klik-Kata', 'readings')}
    `;
  }

  // ==========================================================================
  // VIEW 6: BACAAN KLIK-KATA (Volingo-inspired)
  // ==========================================================================
  function renderReadings() {
    const pack = getActivePack();
    if (!pack) return renderMissingPackState('Bacaan Klik-Kata');
    if (!pack.readings.length) {
      return `<div class="empty-state"><h1>Belum ada bacaan</h1><p>Impor paket bacaan bertoken melalui menu Pengaturan.</p></div>`;
    }

    const reading = pack.readings.find((r) => r.id === ui.readingId) || pack.readings[0];
    ui.readingId = reading.id;
    const isRtl = state.activeLang === 'ar';
    const readingSelectHtml = pack.readings.length > 1
      ? `<select id="reading-select" class="lang-select" style="width:auto;min-width:210px;" aria-label="Pilih teks bacaan">${pack.readings.map((r) => `<option value="${esc(r.id)}" ${r.id === reading.id ? 'selected' : ''}>${esc(r.level)} · ${esc(r.title)}</option>`).join('')}</select>`
      : '';

    const sentencesHtml = reading.sentences.map((sent, sIdx) => {
      const tokensHtml = sent.tokens.map((tok, tIdx) => {
        const isSelected = ui.readingToken && ui.readingToken.sIdx === sIdx && ui.readingToken.tIdx === tIdx;
        const showRuby = ui.readingMode === 'romaji' ? tok.romaji : ui.readingMode === 'reading' ? tok.reading : '';
        return `
          <button type="button" class="word-token ${isSelected ? 'active-token' : ''}" data-action="reading-pick-token" data-sidx="${sIdx}" data-tidx="${tIdx}">
            ${showRuby ? `<span class="token-ruby">${esc(showRuby)}</span>` : ''}
            <span class="token-surface">${esc(tok.surface)}</span>
          </button>
        `;
      }).join('');

      return `
        <div class="reading-sentence">
          <div style="flex:1;min-width:0;">
            <div class="token-line" ${isRtl ? 'dir="rtl"' : ''}>${tokensHtml}</div>
            ${ui.readingMode === 'translation' ? `<div class="reading-trans-line">${esc(sent.translation_id)}</div>` : ''}
            ${ui.readingMode === 'romaji' ? `<div class="reading-trans-line" style="font-style:italic;">${esc(sent.romaji)}</div>` : ''}
          </div>
          <button type="button" class="audio-btn" data-speak="${esc(sent.native)}" aria-label="Putar audio kalimat ${sIdx + 1}">
            ${ICONS.speaker}
          </button>
        </div>
      `;
    }).join('');

    // Word Inspector panel
    let inspectorHtml = `
      <div class="card word-inspector">
        <span class="level-chart-label">Inspektor Kata</span>
        <p class="page-sub" style="margin-top:10px;font-size:0.88rem;">Ketuk kata mana pun di teks bacaan untuk melihat cara baca, arti bahasa Indonesia, audio pelafalan, dan tombol simpan ke SRS.</p>
      </div>
    `;
    if (ui.readingToken) {
      const sent = reading.sentences[ui.readingToken.sIdx];
      const tok = sent && sent.tokens[ui.readingToken.tIdx];
      if (tok) {
        const alreadyInDeck = pack.flashcards.some((c) => c.front === tok.surface);
        inspectorHtml = `
          <div class="card word-inspector">
            <div class="toolbar-row" style="margin-bottom:10px;">
              <span class="level-chart-label">Inspektor Kata</span>
              <button type="button" class="audio-btn" data-speak="${esc(tok.surface)}" aria-label="Putar audio kata ${esc(tok.surface)}">${ICONS.speaker}</button>
            </div>
            <div style="font-size:1.9rem;font-weight:700;line-height:1.2;">${esc(tok.surface)}</div>
            <div style="font-size:0.9rem;color:var(--ink-muted);margin-top:4px;">${esc(tok.reading)} · <em>${esc(tok.romaji)}</em></div>
            <div style="font-family:var(--font-serif);font-size:1.25rem;font-weight:600;margin:12px 0 16px;">${esc(tok.meaning_id)}</div>
            ${alreadyInDeck ? `
              <button type="button" class="btn-jade" disabled style="width:100%;">${ICONS.check} Sudah ada di SRS</button>
            ` : `
              <button type="button" class="btn-primary" style="width:100%;" data-action="reading-save-srs">${ICONS.plus} Simpan Kata ke SRS</button>
            `}
            <button type="button" class="btn-secondary" style="width:100%;margin-top:8px;" data-action="mine-from-reading">
              Tambang Kalimat Utuh (i+1)
            </button>
          </div>
        `;
      }
    }

    // Comprehension check
    const comp = reading.comprehension_check;
    const compHtml = comp ? `
      <div class="card" style="margin-top:18px;">
        <span class="tag accent" style="margin-bottom:8px;">Cek Pemahaman</span>
        <h2 style="font-size:1.05rem;font-weight:700;margin-bottom:12px;">${esc(comp.question)}</h2>
        <div class="quiz-options">
          ${comp.options.map((opt, idx) => {
            let cls = '';
            if (ui.readingCompAnswer !== null) {
              if (idx === comp.answer_index) cls = 'correct';
              else if (idx === ui.readingCompAnswer) cls = 'wrong';
            }
            return `<button type="button" class="quiz-opt-btn ${cls}" data-action="reading-comp" data-idx="${idx}">${esc(opt)}</button>`;
          }).join('')}
        </div>
        ${ui.readingCompAnswer !== null ? `
          <div class="feedback-box ${ui.readingCompAnswer === comp.answer_index ? 'correct' : 'wrong'}">
            <div class="feedback-title">${ui.readingCompAnswer === comp.answer_index ? 'Benar!' : 'Belum tepat.'}</div>
            <p>${esc(comp.explanation_id)}</p>
          </div>
        ` : ''}
      </div>
    ` : '';

    return `
      ${renderStudyBreadcrumb('Bacaan Klik-Kata')}
      <div class="section-header">
        <div>
          <div class="toolbar-group" style="margin-bottom:4px;">
            <span class="tag accent">${esc(reading.level)}</span>
            <span class="tag">${esc(getCatalogMeta(state.activeLang).name_id)}</span>
          </div>
          <h1 class="page-title">${esc(reading.title)}</h1>
          <p class="page-sub">Ketuk kata mana pun untuk melihat arti dan menyimpannya ke deck SRS pribadi Anda.</p>
        </div>
        <div class="toolbar-group">
          ${readingSelectHtml}
          <div class="segmented" role="group" aria-label="Mode tampilan bacaan">
            <button type="button" class="seg-btn ${ui.readingMode === 'translation' ? 'active' : ''}" data-action="reading-mode" data-val="translation">Terjemahan</button>
            <button type="button" class="seg-btn ${ui.readingMode === 'romaji' ? 'active' : ''}" data-action="reading-mode" data-val="romaji">Romaji</button>
            <button type="button" class="seg-btn ${ui.readingMode === 'reading' ? 'active' : ''}" data-action="reading-mode" data-val="reading">Cara Baca</button>
            <button type="button" class="seg-btn ${ui.readingMode === 'hide' ? 'active' : ''}" data-action="reading-mode" data-val="hide">Sembunyi</button>
          </div>
        </div>
      </div>

      <div class="reading-layout">
        <div>
          <div class="card">${sentencesHtml}</div>
          ${compHtml}
        </div>
        ${inspectorHtml}
      </div>
      ${renderNextStepBar('Pahami struktur kalimat yang baru dibaca', 'Lihat rumus inti dan jebakan umum pelajar Indonesia di katalog tata bahasa.', 'Lanjut ke Tata Bahasa', 'grammar')}
    `;
  }

  // ==========================================================================
  // VIEW 7: KATALOG TATA BAHASA
  // ==========================================================================
  function renderGrammar() {
    const pack = getActivePack();
    if (!pack) return renderMissingPackState('Katalog Tata Bahasa');

    const q = ui.grammarQuery.trim().toLowerCase();
    const list = pack.grammar.filter((g) => {
      if (!q) return true;
      return g.pattern.toLowerCase().includes(q) ||
        g.formula.toLowerCase().includes(q) ||
        g.meaning_id.toLowerCase().includes(q);
    });

    const cardsHtml = list.length > 0 ? list.map((g) => `
      <article class="card">
        <div class="toolbar-row" style="margin-bottom:6px;">
          <div class="toolbar-group">
            <span class="tag accent">${esc(g.level)}</span>
            <h2 style="font-size:1.2rem;font-weight:700;">${esc(g.pattern)}</h2>
          </div>
          ${(g.related_quiz_ids && g.related_quiz_ids.length) ? `
            <button type="button" class="btn-primary btn-sm" data-action="grammar-drill" data-ids="${esc(g.related_quiz_ids.join(','))}">Latih Pola Ini</button>
          ` : ''}
        </div>
        <div class="grammar-formula">${esc(g.formula)}</div>
        <p style="font-size:0.94rem;">${esc(g.meaning_id)}</p>

        ${g.common_mistakes_id ? `
          <div class="pitfall-box">
            <div class="pitfall-title">Jebakan Umum Pelajar Indonesia</div>
            <p>${esc(g.common_mistakes_id)}</p>
          </div>
        ` : ''}

        <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px;">
          ${g.examples.map((ex) => `
            <div class="srs-example">
              <div>
                <div style="font-weight:600;">${esc(ex.native)}</div>
                <div style="font-size:0.82rem;color:var(--ink-muted);font-style:italic;">${esc(ex.romaji)}</div>
                <div style="font-size:0.86rem;color:var(--ink-muted);">${esc(ex.translation_id)}</div>
              </div>
              <button type="button" class="audio-btn" data-speak="${esc(ex.native)}" aria-label="Dengarkan contoh kalimat">${ICONS.speaker}</button>
            </div>
          `).join('')}
        </div>
      </article>
    `).join('') : `
      <div class="empty-state">
        <h2>Pola tidak ditemukan</h2>
        <p>Tidak ada tata bahasa yang cocok dengan "${esc(ui.grammarQuery)}".</p>
      </div>
    `;

    return `
      ${renderStudyBreadcrumb('Tata Bahasa')}
      <div class="section-header">
        <div>
          <h1 class="page-title">Katalog Tata Bahasa</h1>
          <p class="page-sub">Pola inti lengkap dengan jebakan umum pelajar Indonesia dan tombol drill quiz langsung.</p>
        </div>
        <div style="min-width:240px;flex:0 1 320px;">
          <label for="grammar-search" class="sr-only">Cari pola tata bahasa</label>
          <input id="grammar-search" type="search" class="phonetic-input" value="${esc(ui.grammarQuery)}" placeholder="Cari pola, rumus, atau arti...">
        </div>
      </div>
      <div class="grammar-list">${cardsHtml}</div>
      ${renderNextStepBar('Sudah menguasai materi modul ini?', 'Kembali ke Jalur Modul untuk menandai modul selesai dan membuka tahap berikutnya.', 'Buka Jalur Modul', 'modules')}
    `;
  }

  // ==========================================================================
  // VIEW 10: KAMUS BAHASA 3x3 GRID (WITH READ TRACKING & REFRESH)
  // ==========================================================================
  function getDictionaryPool(pack) {
    if (!pack || !Array.isArray(pack.flashcards)) return [];
    const q = ui.dictQuery.trim().toLowerCase();
    return pack.flashcards.filter((c) => {
      if (ui.dictLevel !== 'ALL' && c.level !== ui.dictLevel) return false;
      if (q) {
        const hay = `${c.front || ''} ${c.reading || ''} ${c.romaji || ''} ${c.meaning_id || ''} ${c.example_native || ''} ${c.example_id || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function ensureDictionaryBatch(pack) {
    const pool = getDictionaryPool(pack);
    const poolIds = new Set(pool.map((c) => c.id));
    const readMap = (state.readDictionaryIds && state.readDictionaryIds[state.activeLang]) || {};

    // Keep valid IDs from current batch
    let current = ui.dictBatchIds.filter((id) => poolIds.has(id));
    if (current.length === 0 && pool.length > 0) {
      // Pick up to 9 unread entries first; if fewer than 9 unread remain, show what's unread (or first 9 if all read)
      const unread = pool.filter((c) => !readMap[c.id]);
      const source = unread.length > 0 ? unread : pool;
      current = source.slice(0, 9).map((c) => c.id);
    }
    ui.dictBatchIds = current;
    return current.map((id) => pool.find((c) => c.id === id)).filter(Boolean);
  }

  async function refreshDictionaryBatch() {
    const pack = getActivePack();
    if (!pack) return;
    const pool = getDictionaryPool(pack);
    if (pool.length === 0) return;

    state.readDictionaryIds = state.readDictionaryIds || {};
    state.readDictionaryIds[state.activeLang] = state.readDictionaryIds[state.activeLang] || {};
    const readMap = state.readDictionaryIds[state.activeLang];

    const currentIds = ui.dictBatchIds.slice();
    const readInCurrent = currentIds.filter((id) => readMap[id]);
    const unreadInCurrent = currentIds.filter((id) => !readMap[id]);

    // If user hasn't manually ticked any card in current batch, treat the whole current batch as read so Refresh deals fresh words
    if (readInCurrent.length === 0 && currentIds.length > 0) {
      currentIds.forEach((id) => { readMap[id] = true; });
    }

    const keepIds = readInCurrent.length > 0 ? unreadInCurrent : [];
    const excludeSet = new Set([...keepIds, ...currentIds]);
    const freshUnread = pool.filter((c) => !readMap[c.id] && !excludeSet.has(c.id));
    const needed = Math.max(0, 9 - keepIds.length);
    const additions = freshUnread.slice(0, needed).map((c) => c.id);

    let nextBatch = [...keepIds, ...additions];
    if (nextBatch.length === 0) {
      // All entries in this filter have been read!
      ui.dictBatchIds = [];
      await persistState();
      renderView();
      showToast('Semua entri kamus di filter ini sudah dibaca. Klik Reset Status Dibaca untuk mengulang.', 'success');
      return;
    }

    ui.dictBatchIds = nextBatch;
    await persistState();
    renderView();
    const replacedCount = readInCurrent.length > 0 ? readInCurrent.length : currentIds.length;
    showToast(`Kamus diperbarui: ${replacedCount} kartu yang sudah dibaca diganti.`, 'success');
  }

  function renderDictionary() {
    const pack = getActivePack();
    if (!pack) return renderMissingPackState('Kamus Bahasa 3x3');
    const meta = getCatalogMeta(state.activeLang);
    const isRtl = state.activeLang === 'ar';

    const readMap = (state.readDictionaryIds && state.readDictionaryIds[state.activeLang]) || {};
    const totalAll = pack.flashcards.length;
    const totalRead = pack.flashcards.filter((c) => readMap[c.id]).length;
    const pool = getDictionaryPool(pack);
    const allPoolRead = pool.length > 0 && pool.every((c) => readMap[c.id]);

    const batch = ensureDictionaryBatch(pack);
    const readInBatch = batch.filter((c) => readMap[c.id]).length;

    const levels = ['ALL', ...pack.language.roadmap_levels.filter((lvl) => pack.flashcards.some((c) => c.level === lvl))];
    const levelChipsHtml = levels.map((lvl) => {
      const label = lvl === 'ALL' ? `Semua (${totalAll})` : lvl;
      return `<button type="button" class="chip ${ui.dictLevel === lvl ? 'active' : ''}" data-action="dict-level" data-level="${esc(lvl)}">${esc(label)}</button>`;
    }).join('');

    let gridHtml = '';
    if (pool.length === 0) {
      gridHtml = `
        <div class="empty-state">
          <h2>Kata tidak ditemukan</h2>
          <p>Tidak ada entri kamus yang cocok dengan pencarian "${esc(ui.dictQuery)}".</p>
          <button type="button" class="btn-secondary" data-action="dict-clear-filter">Reset Pencarian</button>
        </div>
      `;
    } else if (allPoolRead && ui.dictBatchIds.length === 0) {
      gridHtml = `
        <div class="empty-state">
          <span class="tag jade">Selesai Semua</span>
          <h2>Semua ${pool.length} kosakata kamus di filter ini sudah dibaca</h2>
          <p>Anda sudah menandai seluruh entri sebagai dibaca. Reset status dibaca untuk memulai putaran kamus baru atau pilih level lain.</p>
          <div class="toolbar-group" style="margin-top:8px;">
            <button type="button" class="btn-primary" data-action="dict-reset-read">Reset Status Dibaca</button>
            <button type="button" class="btn-secondary" data-nav="flashcards">Ulas di Kartu SRS</button>
          </div>
        </div>
      `;
    } else {
      gridHtml = `
        <div class="dict-grid" aria-label="Grid kartu kamus 3 kali 3">
          ${batch.map((c) => {
            const isRead = Boolean(readMap[c.id]);
            const showReading = c.reading && c.reading !== c.front;
            return `
              <article class="dict-card ${isRead ? 'is-read' : ''}">
                <div class="dict-card-head">
                  <div class="toolbar-group" style="gap:6px;">
                    <span class="tag accent">${esc(c.level)}</span>
                    <span class="tag">${esc(c.category || 'kosakata')}</span>
                  </div>
                  <button type="button" class="audio-btn mini" data-speak="${esc(c.front)}" aria-label="Dengarkan pelafalan ${esc(c.front)}">
                    ${ICONS.speaker}
                  </button>
                </div>

                <div>
                  <div class="dict-native" ${isRtl ? 'dir="rtl"' : ''}>${esc(c.front)}</div>
                  <div class="dict-reading">
                    ${showReading ? `<span>${esc(c.reading)}</span> · ` : ''}<em>${esc(c.romaji)}</em>
                  </div>
                </div>

                <div class="dict-meaning">${esc(c.meaning_id)}</div>

                ${c.example_native ? `
                  <div class="dict-example">
                    <div style="min-width:0;flex:1;">
                      <div class="dict-example-native" ${isRtl ? 'dir="rtl"' : ''}>${esc(c.example_native)}</div>
                      <div class="dict-example-id">${esc(c.example_id || '')}</div>
                    </div>
                    <button type="button" class="audio-btn mini" data-speak="${esc(c.example_native)}" aria-label="Dengarkan contoh kalimat">
                      ${ICONS.speaker}
                    </button>
                  </div>
                ` : ''}

                <div class="dict-card-foot">
                  <button type="button" class="dict-read-btn ${isRead ? 'active' : ''}" data-action="dict-toggle-read" data-id="${esc(c.id)}" aria-pressed="${isRead}">
                    ${ICONS.check}
                    <span>${isRead ? 'Sudah Dibaca' : 'Tandai Dibaca'}</span>
                  </button>
                  ${isRead ? '<span class="kpi-label" style="font-size:0.74rem;">Siap diganti</span>' : ''}
                </div>
              </article>
            `;
          }).join('')}
        </div>
      `;
    }

    return `
      ${renderStudyBreadcrumb('Kamus 3x3')}
      <div class="section-header">
        <div>
          <div class="toolbar-group" style="margin-bottom:4px;">
            <span class="tag accent">${esc(meta.name_id)} · ${esc(meta.name_native)}</span>
            <span class="tag jade">Dibaca: ${totalRead}/${totalAll} kata</span>
          </div>
          <h1 class="page-title">Kamus Bahasa 3x3</h1>
          <p class="page-sub">Pelajari 9 kosakata sekaligus lengkap dengan aksara asli, cara baca, arti, dan contoh kalimat. Tandai yang sudah dibaca lalu tekan Refresh untuk menggantinya dengan kosakata baru.</p>
        </div>
        <div class="toolbar-group">
          <button type="button" class="btn-primary" data-action="dict-refresh">
            ${ICONS.refresh}
            <span>${readInBatch > 0 ? `Refresh (${readInBatch} Dibaca)` : 'Refresh Kamus'}</span>
          </button>
          ${totalRead > 0 ? `<button type="button" class="btn-secondary" data-action="dict-reset-read">Reset Dibaca</button>` : ''}
        </div>
      </div>

      <div class="toolbar-row">
        <div class="chip-row">${levelChipsHtml}</div>
        <div style="min-width:220px;flex:0 1 280px;">
          <label for="dict-search" class="sr-only">Cari kata di kamus</label>
          <input id="dict-search" type="search" class="phonetic-input" value="${esc(ui.dictQuery)}" placeholder="Cari kata, ejaan, atau arti...">
        </div>
      </div>

      ${gridHtml}
      ${renderNextStepBar('Ingin menguji hafalan kosakata yang baru dibaca?', 'Buka Kartu SRS untuk mengulang kosakata dengan jadwal memori SM-2.', 'Buka Kartu SRS', 'flashcards')}
    `;
  }

  // ==========================================================================
  // VIEW 11: MODE SPRINT 60 DETIK (SPEED DRILL + HIGH SCORE)
  // ==========================================================================
  function stopSprintTimer() {
    if (sprintInterval) {
      clearInterval(sprintInterval);
      sprintInterval = null;
    }
  }

  function buildSprintQuestion(pack) {
    const cards = (pack && pack.flashcards) ? pack.flashcards : [];
    if (cards.length < 2) return null;
    const target = cards[Math.floor(Math.random() * cards.length)];
    const pool = cards.filter((c) => c.id !== target.id && c.meaning_id !== target.meaning_id);
    const distractors = [];
    const used = new Set([target.meaning_id]);
    const shuffled = pool.slice().sort(() => Math.random() - 0.5);
    for (const item of shuffled) {
      if (distractors.length >= 3) break;
      if (!used.has(item.meaning_id)) {
        used.add(item.meaning_id);
        distractors.push(item.meaning_id);
      }
    }
    const options = [target.meaning_id, ...distractors].sort(() => Math.random() - 0.5);
    return { card: target, options };
  }

  function startSprint() {
    const pack = getActivePack();
    if (!pack || pack.flashcards.length < 4) {
      showToast('Minimal 4 kosakata diperlukan untuk Mode Sprint.', 'error');
      return;
    }
    stopSprintTimer();
    ui.sprintActive = true;
    ui.sprintPaused = false;
    ui.sprintFinished = false;
    ui.sprintTimeLeft = 60;
    ui.sprintScore = 0;
    ui.sprintTotal = 0;
    ui.sprintCombo = 0;
    ui.sprintMaxCombo = 0;
    ui.sprintNewRecord = false;
    ui.sprintFlash = null;
    ui.sprintQuestion = buildSprintQuestion(pack);

    sprintInterval = setInterval(() => {
      if (!ui.sprintActive || ui.sprintPaused) return;
      ui.sprintTimeLeft--;
      const clk = document.getElementById('sprint-clock');
      const bar = document.getElementById('sprint-time-bar');
      if (clk) clk.textContent = `00:${String(Math.max(0, ui.sprintTimeLeft)).padStart(2, '0')}`;
      if (bar) bar.style.width = `${Math.max(0, Math.round((ui.sprintTimeLeft / 60) * 100))}%`;
      if (ui.sprintTimeLeft <= 0) {
        finishSprint();
      }
    }, 1000);

    renderView();
  }

  async function finishSprint() {
    stopSprintTimer();
    ui.sprintActive = false;
    ui.sprintPaused = false;
    ui.sprintFinished = true;

    const code = state.activeLang;
    state.sprintBestByLang = state.sprintBestByLang || {};
    const rec = state.sprintBestByLang[code] || { bestScore: 0, rounds: 0 };
    rec.rounds = (rec.rounds || 0) + 1;
    if (ui.sprintScore > (rec.bestScore || 0)) {
      rec.bestScore = ui.sprintScore;
      ui.sprintNewRecord = true;
    }
    state.sprintBestByLang[code] = rec;

    const log = Store.ensureDayLog(state, Store.getTodayKey(0));
    log.sprintPlayed = (log.sprintPlayed || 0) + 1;
    const earnedXp = 15 + Math.min(25, ui.sprintScore * 2);
    Store.addXP(state, code, earnedXp);

    await persistState();
    renderChrome();
    renderView();
    showToast(`Sprint selesai! +${earnedXp} XP ditambahkan.`, 'success');
  }

  function answerSprint(opt) {
    if (!ui.sprintActive || ui.sprintPaused || !ui.sprintQuestion || ui.sprintFlash) return;
    const ok = opt === ui.sprintQuestion.card.meaning_id;
    ui.sprintTotal++;
    if (ok) {
      ui.sprintScore++;
      ui.sprintCombo++;
      if (ui.sprintCombo > ui.sprintMaxCombo) ui.sprintMaxCombo = ui.sprintCombo;
    } else {
      ui.sprintCombo = 0;
    }
    ui.sprintFlash = { opt, ok };
    renderView();
    setTimeout(() => {
      if (!ui.sprintActive) return;
      ui.sprintFlash = null;
      ui.sprintQuestion = buildSprintQuestion(getActivePack());
      renderView();
    }, 280);
  }

  function renderSprint() {
    const pack = getActivePack();
    if (!pack) return renderMissingPackState('Mode Sprint 60 Detik');
    const meta = getCatalogMeta(state.activeLang);
    const rec = (state.sprintBestByLang && state.sprintBestByLang[state.activeLang]) || { bestScore: 0, rounds: 0 };
    const isRtl = state.activeLang === 'ar';

    let bodyHtml = '';
    if (!ui.sprintActive && !ui.sprintFinished) {
      bodyHtml = `
        <div class="card" style="text-align:center;padding:34px 24px;">
          <span class="tag accent" style="margin-bottom:10px;">Tantangan Cepat · ${esc(meta.name_id)}</span>
          <h2 style="font-family:var(--font-serif);font-size:1.6rem;font-weight:600;margin-bottom:8px;">Tebak Arti Secepat Mungkin dalam 60 Detik</h2>
          <p class="page-sub" style="margin:0 auto 20px;">Latih refleks pengenalan kosakata dari ${pack.flashcards.length} kartu ${esc(meta.name_id)}. Gunakan klik atau tombol angka 1 sampai 4 di keyboard.</p>
          <div class="kpi-strip" style="grid-template-columns:repeat(2,minmax(0,1fr));max-width:420px;margin:0 auto 22px;">
            <div class="kpi-card">
              <div class="kpi-label">Rekor Terbaik (${esc(meta.name_id)})</div>
              <div class="kpi-val">${rec.bestScore}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Total Ronde Selesai</div>
              <div class="kpi-val">${rec.rounds}</div>
            </div>
          </div>
          <button type="button" class="btn-primary" data-action="sprint-start" style="min-width:220px;">Mulai Sprint 60 Detik</button>
        </div>
      `;
    } else if (ui.sprintFinished) {
      const acc = ui.sprintTotal > 0 ? Math.round((ui.sprintScore / ui.sprintTotal) * 100) : 0;
      bodyHtml = `
        <div class="card" style="text-align:center;padding:32px 24px;">
          <span class="tag ${ui.sprintNewRecord ? 'amber' : 'jade'}" style="margin-bottom:10px;">${ui.sprintNewRecord ? 'Rekor Pribadi Baru!' : 'Ronde Selesai'}</span>
          <h2 style="font-family:var(--font-serif);font-size:1.75rem;font-weight:600;margin-bottom:16px;">Skor Akhir: ${ui.sprintScore} Benar</h2>
          <div class="sprint-hud" style="margin-bottom:20px;">
            <div class="sprint-stat">
              <div class="kpi-label">Akurasi</div>
              <div class="kpi-val">${acc}%</div>
            </div>
            <div class="sprint-stat">
              <div class="kpi-label">Kombo Tertinggi</div>
              <div class="kpi-val">x${ui.sprintMaxCombo}</div>
            </div>
            <div class="sprint-stat">
              <div class="kpi-label">Rekor Terbaik</div>
              <div class="kpi-val">${rec.bestScore}</div>
            </div>
          </div>
          <div class="toolbar-group" style="justify-content:center;">
            <button type="button" class="btn-primary" data-action="sprint-start">Main Lagi</button>
            <button type="button" class="btn-secondary" data-nav="dashboard">Kembali ke Beranda</button>
          </div>
        </div>
      `;
    } else if (ui.sprintQuestion) {
      const q = ui.sprintQuestion;
      bodyHtml = `
        <div class="sprint-hud">
          <div class="sprint-stat">
            <div class="kpi-label">Sisa Waktu</div>
            <div class="sprint-clock" id="sprint-clock">00:${String(ui.sprintTimeLeft).padStart(2, '0')}</div>
          </div>
          <div class="sprint-stat">
            <div class="kpi-label">Skor</div>
            <div class="kpi-val">${ui.sprintScore}</div>
          </div>
          <div class="sprint-stat">
            <div class="kpi-label">Kombo</div>
            <div class="kpi-val" style="color:var(--amber);">x${ui.sprintCombo}</div>
          </div>
        </div>

        <div class="progress-track" style="margin-bottom:16px;">
          <div class="progress-fill" id="sprint-time-bar" style="width:${Math.round((ui.sprintTimeLeft / 60) * 100)}%"></div>
        </div>

        <div class="card">
          <div class="toolbar-row" style="margin-bottom:8px;">
            <span class="tag accent">${esc(q.card.level)}</span>
            <div class="toolbar-group">
              <button type="button" class="btn-ghost btn-sm" data-action="sprint-pause">${ui.sprintPaused ? 'Lanjutkan' : 'Jeda'}</button>
              <button type="button" class="btn-ghost btn-sm" data-action="sprint-stop">Akhiri</button>
            </div>
          </div>

          <div class="sprint-prompt-box">
            <div style="display:inline-flex;align-items:center;gap:12px;">
              <div class="sprint-word" ${isRtl ? 'dir="rtl"' : ''}>${esc(q.card.front)}</div>
              <button type="button" class="audio-btn mini" data-speak="${esc(q.card.front)}" aria-label="Putar audio">${ICONS.speaker}</button>
            </div>
            <div class="dict-reading" style="margin-top:6px;"><em>${esc(q.card.romaji)}</em></div>
          </div>

          <div class="sprint-options">
            ${q.options.map((opt, idx) => {
              let cls = '';
              if (ui.sprintFlash) {
                if (opt === q.card.meaning_id) cls = 'correct';
                else if (opt === ui.sprintFlash.opt && !ui.sprintFlash.ok) cls = 'wrong';
              }
              return `<button type="button" class="quiz-opt-btn ${cls}" data-action="sprint-pick" data-opt="${esc(opt)}" ${ui.sprintPaused ? 'disabled' : ''}><span><kbd class="mono" style="opacity:0.6;margin-right:8px;">${idx + 1}</kbd>${esc(opt)}</span></button>`;
            }).join('')}
          </div>
        </div>
      `;
    }

    return `
      ${renderStudyBreadcrumb('Sprint 60 Detik')}
      <div class="section-header">
        <div>
          <h1 class="page-title">Mode Sprint 60 Detik</h1>
          <p class="page-sub">Permainan singkat untuk memanaskan ingatan kosakata dan memecahkan rekor pribadi Anda.</p>
        </div>
      </div>
      <div class="sprint-stage">${bodyHtml}</div>
    `;
  }

  // ==========================================================================
  // VIEW 12: KANVAS LATIHAN TULIS AKSARA
  // ==========================================================================
  function getWritingItems(pack) {
    const base = (pack && Array.isArray(pack.flashcards)) ? pack.flashcards : [];
    if (ui.writeCustomItem && !base.some((c) => c.id === ui.writeCustomItem.id)) {
      return [ui.writeCustomItem, ...base];
    }
    return base;
  }

  function renderWriting() {
    const pack = getActivePack();
    if (!pack) return renderMissingPackState('Kanvas Tulis Aksara');
    const meta = getCatalogMeta(state.activeLang);
    const items = getWritingItems(pack);
    if (items.length === 0) {
      return `<div class="empty-state"><h1>Belum ada kosakata</h1><p>Impor materi terlebih dahulu untuk berlatih menulis.</p></div>`;
    }
    if (ui.writeIndex >= items.length) ui.writeIndex = 0;
    const item = items[ui.writeIndex];
    const practicedMap = (state.canvasPracticedIds && state.canvasPracticedIds[state.activeLang]) || {};
    const isPracticed = Boolean(practicedMap[item.id]);
    const practicedCount = items.filter((c) => practicedMap[c.id]).length;
    const isLong = String(item.front || '').length > 4;
    const isRtl = state.activeLang === 'ar';

    return `
      ${renderStudyBreadcrumb('Tulis Aksara')}
      <div class="section-header">
        <div>
          <div class="toolbar-group" style="margin-bottom:4px;">
            <span class="tag accent">${esc(meta.name_id)} · ${esc(meta.name_native)}</span>
            <span class="tag jade">Dilatih: ${practicedCount}/${items.length}</span>
          </div>
          <h1 class="page-title">Kanvas Latihan Tulis Aksara</h1>
          <p class="page-sub">Tiru bentuk aksara langsung di kanvas pakai mouse, trackpad, atau layar sentuh. Aktifkan bayangan panduan jika baru pertama kali menulisnya.</p>
        </div>
      </div>

      <div class="writing-layout">
        <div class="card">
          <div class="toolbar-row" style="margin-bottom:14px;">
            <div>
              <div class="toolbar-group">
                <span class="tag accent">${esc(item.level)}</span>
                <span style="font-size:1.3rem;font-weight:700;" ${isRtl ? 'dir="rtl"' : ''}>${esc(item.front)}</span>
                <span class="kpi-label">(${esc(item.romaji)})</span>
                ${isPracticed ? '<span class="tag jade">Sudah Dilatih</span>' : ''}
              </div>
              <p style="font-size:0.9rem;color:var(--ink-muted);margin-top:4px;">Arti: <strong style="color:var(--ink);">${esc(item.meaning_id)}</strong></p>
            </div>
            <button type="button" class="audio-btn" data-speak="${esc(item.front)}" aria-label="Dengarkan pelafalan ${esc(item.front)}">${ICONS.speaker}</button>
          </div>

          <div class="canvas-frame">
            <div class="canvas-guide-lines" aria-hidden="true"></div>
            ${ui.writeShowGhost ? `<div class="canvas-ghost ${isLong ? 'long-text' : ''}" ${isRtl ? 'dir="rtl"' : ''} aria-hidden="true">${esc(item.front)}</div>` : ''}
            <canvas id="writing-canvas" class="writing-canvas" aria-label="Kanvas tulis untuk ${esc(item.front)}"></canvas>
            <div id="canvas-nib" class="canvas-nib" aria-hidden="true"></div>
          </div>

          <div class="toolbar-row" style="margin-top:16px;margin-bottom:0;">
            <div class="toolbar-group">
              <button type="button" class="chip ${ui.writeShowGhost ? 'active' : ''}" data-action="write-toggle-ghost" aria-pressed="${ui.writeShowGhost}">Panduan Bayangan</button>
              <button type="button" class="btn-secondary btn-sm" data-action="write-undo">Undo</button>
              <button type="button" class="btn-secondary btn-sm" data-action="write-clear">Bersihkan</button>
            </div>
            <div class="toolbar-group">
              <button type="button" class="btn-ghost btn-sm" data-action="write-prev">Sebelumnya</button>
              <button type="button" class="btn-primary btn-sm" data-action="write-done">Selesai & Lanjut (+5 XP)</button>
            </div>
          </div>
        </div>

        <aside class="card" aria-label="Pilih huruf atau kata untuk ditulis">
          <h2 style="font-size:1rem;font-weight:700;margin-bottom:6px;">Pilih Aksara / Kata (${items.length})</h2>
          <p class="kpi-label" style="margin-bottom:12px;">Bingkai hijau menandakan aksara sudah pernah Anda latih.</p>
          <div class="char-picker-grid">
            ${items.map((c, idx) => {
              const active = idx === ui.writeIndex;
              const done = Boolean(practicedMap[c.id]);
              return `
                <button type="button" class="char-pick-btn ${active ? 'active' : ''} ${done ? 'practiced' : ''}" data-action="write-pick" data-idx="${idx}" title="${esc(c.front)} (${esc(c.romaji)})">
                  <span style="max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(c.front)}</span>
                  <span style="font-size:0.65rem;font-weight:500;color:var(--ink-muted);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(c.romaji)}</span>
                </button>
              `;
            }).join('')}
          </div>
        </aside>
      </div>

      ${renderNextStepBar('Sudah lancar menulis bentuk hurufnya?', 'Uji kecepatan pengenalan kosakata Anda lewat Mode Sprint 60 Detik.', 'Coba Sprint 60 Detik', 'sprint')}
    `;
  }

  function redrawWritingCanvas(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = global.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark = (getStoredScheme() || getSystemTheme()) === 'dark';
    ctx.strokeStyle = isDark ? '#F3F1EC' : '#181715';
    ctx.lineWidth = 6 * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ui.writeStrokes.forEach((stroke) => {
      if (!stroke || stroke.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x * canvas.width, stroke[0].y * canvas.height);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x * canvas.width, stroke[i].y * canvas.height);
      }
      if (stroke.length === 1) {
        ctx.lineTo(stroke[0].x * canvas.width + 0.1, stroke[0].y * canvas.height + 0.1);
      }
      ctx.stroke();
    });
  }

  function mountWritingCanvas() {
    const canvas = document.getElementById('writing-canvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = global.devicePixelRatio || 1;
    canvas.width = Math.max(200, Math.round(rect.width * dpr));
    canvas.height = Math.max(200, Math.round(rect.height * dpr));
    redrawWritingCanvas(canvas);

    let drawing = false;
    let activeStroke = null;
    const nib = document.getElementById('canvas-nib');

    function updateNib(ev, show, isDown) {
      if (!nib || ev.pointerType === 'touch') return;
      const r = canvas.getBoundingClientRect();
      nib.style.left = `${ev.clientX - r.left}px`;
      nib.style.top = `${ev.clientY - r.top}px`;
      nib.classList.toggle('visible', show);
      nib.classList.toggle('drawing', Boolean(isDown));
    }

    function getNormPos(ev) {
      const r = canvas.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(1, (ev.clientX - r.left) / (r.width || 1))),
        y: Math.max(0, Math.min(1, (ev.clientY - r.top) / (r.height || 1)))
      };
    }

    canvas.onpointerenter = (ev) => updateNib(ev, true, drawing);
    canvas.onpointerleave = (ev) => {
      if (nib) nib.classList.remove('visible', 'drawing');
    };

    canvas.onpointerdown = (ev) => {
      ev.preventDefault();
      canvas.setPointerCapture(ev.pointerId);
      drawing = true;
      updateNib(ev, true, true);
      activeStroke = [getNormPos(ev)];
      ui.writeStrokes.push(activeStroke);
      redrawWritingCanvas(canvas);
    };

    canvas.onpointermove = (ev) => {
      updateNib(ev, true, drawing);
      if (!drawing || !activeStroke) return;
      ev.preventDefault();
      activeStroke.push(getNormPos(ev));
      redrawWritingCanvas(canvas);
    };

    const endDraw = (ev) => {
      drawing = false;
      activeStroke = null;
      if (nib && ev) updateNib(ev, true, false);
    };
    canvas.onpointerup = endDraw;
    canvas.onpointercancel = () => {
      drawing = false;
      activeStroke = null;
      if (nib) nib.classList.remove('drawing');
    };
  }

  // ==========================================================================
  // VIEW 13: PENGENALAN AKSARA (NON-LATIN ALPHABET TRAINER + MINI-QUIZ)
  // ==========================================================================
  function getActiveScriptTab(sData) {
    if (!sData || !sData.tabs || !sData.tabs.length) return null;
    const found = sData.tabs.find((t) => t.id === ui.scriptTabId) || sData.tabs[0];
    ui.scriptTabId = found.id;
    return found;
  }

  function buildScriptQuizQuestion(tab) {
    if (!tab || !tab.chars || tab.chars.length < 4) return null;
    const target = tab.chars[Math.floor(Math.random() * tab.chars.length)];
    const pool = tab.chars.filter((c) => c.id !== target.id && c.romaji !== target.romaji);
    const distractors = pool.slice().sort(() => Math.random() - 0.5).slice(0, 3).map((c) => c.romaji);
    const options = [target.romaji, ...distractors].sort(() => Math.random() - 0.5);
    return { target, options };
  }

  function extractSpeakableChar(charStr) {
    return String(charStr || '').split(/[\s/(]/)[0].trim() || charStr;
  }

  function renderAlphabet() {
    const meta = getCatalogMeta(state.activeLang);
    const sData = SCRIPT_DATA && SCRIPT_DATA[state.activeLang];

    // Latin-script languages: show concise special-letter & pronunciation guide
    if (!sData) {
      const note = (LATIN_NOTES && LATIN_NOTES[state.activeLang]) || {
        title: `Bahasa ${meta.name_id} Memakai Alfabet Latin`,
        summary: 'Anda sudah mengenal seluruh huruf dasarnya dan bisa langsung masuk ke Jalur Modul.',
        highlights: []
      };
      return `
        ${renderStudyBreadcrumb('Pengenalan Aksara')}
        <div class="section-header">
          <div>
            <span class="tag jade" style="margin-bottom:6px;">Alfabet Latin</span>
            <h1 class="page-title">${esc(note.title)}</h1>
            <p class="page-sub">${esc(note.summary)}</p>
          </div>
          <button type="button" class="btn-primary" data-nav="modules">Langsung ke Jalur Modul</button>
        </div>

        <div class="card">
          <h2 style="font-size:1.05rem;font-weight:700;">Aturan Baca & Huruf Khas ${esc(meta.name_id)}</h2>
          <div class="latin-highlight-grid">
            ${note.highlights.map((h) => `
              <div class="latin-highlight-card">
                <div style="font-size:1.45rem;font-weight:700;color:var(--accent-text);margin-bottom:4px;">${esc(h.symbol)}</div>
                <p style="font-size:0.86rem;color:var(--ink-muted);">${esc(h.sound)}</p>
              </div>
            `).join('')}
          </div>
        </div>
        ${renderNextStepBar('Sudah siap menyusun kosakata?', 'Buka Jalur Modul untuk mulai belajar kata dan kalimat praktis.', 'Buka Jalur Modul', 'modules')}
      `;
    }

    const activeTab = getActiveScriptTab(sData);
    const learnedMap = (state.learnedChars && state.learnedChars[state.activeLang]) || {};
    const allChars = sData.tabs.reduce((acc, t) => acc.concat(t.chars), []);
    const totalLearned = allChars.filter((c) => learnedMap[c.id]).length;
    const pct = allChars.length > 0 ? Math.round((totalLearned / allChars.length) * 100) : 0;
    const isRtl = state.activeLang === 'ar';

    const selectedChar = activeTab.chars.find((c) => c.id === ui.scriptSelectedId) || activeTab.chars[0];
    ui.scriptSelectedId = selectedChar.id;
    const isSelectedLearned = Boolean(learnedMap[selectedChar.id]);
    const speakGlyph = extractSpeakableChar(selectedChar.char);

    const tabsHtml = sData.tabs.map((t) => {
      const tLearned = t.chars.filter((c) => learnedMap[c.id]).length;
      return `
        <button type="button" class="level-tab ${t.id === activeTab.id ? 'active' : ''}" data-action="script-tab" data-tab="${esc(t.id)}">
          <span>${esc(t.label)}</span>
          <span class="mono" style="font-size:0.74rem;color:var(--ink-muted);">${tLearned}/${t.chars.length}</span>
        </button>
      `;
    }).join('');

    let mainAreaHtml = '';
    if (ui.scriptMode === 'quiz') {
      if (!ui.scriptQuizQ || !activeTab.chars.some((c) => c.id === ui.scriptQuizQ.target.id)) {
        ui.scriptQuizQ = buildScriptQuizQuestion(activeTab);
        ui.scriptQuizPicked = null;
      }
      const q = ui.scriptQuizQ;
      const qSpeak = extractSpeakableChar(q.target.char);
      const answered = ui.scriptQuizPicked !== null;
      const isRight = answered && ui.scriptQuizPicked === q.target.romaji;

      mainAreaHtml = `
        <div class="quiz-arena">
          <div class="card">
            <div class="toolbar-row" style="margin-bottom:8px;">
              <span class="tag accent">Tebak Cepat · ${esc(activeTab.label)}</span>
              <span class="tag amber mono">Benar beruntun: ${ui.scriptQuizStreak}</span>
            </div>

            <div class="sprint-prompt-box">
              <div style="display:inline-flex;align-items:center;gap:14px;">
                <div style="font-size:3.8rem;font-weight:700;line-height:1.1;" ${isRtl ? 'dir="rtl"' : ''}>${esc(q.target.char)}</div>
                <button type="button" class="audio-btn accent-fill" data-speak="${esc(qSpeak)}" aria-label="Dengarkan bunyi huruf">${ICONS.speaker}</button>
              </div>
              <p class="kpi-label" style="margin-top:10px;">Pilih cara baca yang tepat untuk huruf di atas.</p>
            </div>

            <div class="sprint-options">
              ${q.options.map((opt) => {
                let cls = '';
                if (answered) {
                  if (opt === q.target.romaji) cls = 'correct';
                  else if (opt === ui.scriptQuizPicked) cls = 'wrong';
                }
                return `<button type="button" class="quiz-opt-btn ${cls}" data-action="script-quiz-pick" data-opt="${esc(opt)}" ${answered ? 'disabled' : ''}><span>${esc(opt)}</span></button>`;
              }).join('')}
            </div>

            ${answered ? `
              <div class="feedback-box ${isRight ? 'correct' : 'wrong'}" role="status">
                <div class="feedback-title">${isRight ? 'Tepat!' : `Belum tepat. Cara bacanya: ${esc(q.target.romaji)}`}</div>
                <p>${esc(q.target.tip)} Contoh: ${esc(q.target.example)}</p>
                <div style="margin-top:12px;display:flex;justify-content:flex-end;">
                  <button type="button" class="btn-primary" data-action="script-quiz-next">Huruf Berikutnya</button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    } else {
      const selectedIdx = Math.max(0, activeTab.chars.findIndex((c) => c.id === selectedChar.id));
      const hasPrev = selectedIdx > 0;
      const hasNext = selectedIdx < activeTab.chars.length - 1;
      const jumpOptsHtml = activeTab.chars.map((c, idx) => {
        const mark = learnedMap[c.id] ? ' ✓' : '';
        return `<option value="${esc(c.id)}" ${c.id === selectedChar.id ? 'selected' : ''}>${idx + 1}. ${esc(c.char)} (${esc(c.romaji)})${mark}</option>`;
      }).join('');
      const exampleSpeak = extractSpeakableChar(selectedChar.example);

      mainAreaHtml = `
        <div class="script-focus-stage">
          <article class="card script-focus-card ${isSelectedLearned ? 'is-learned' : ''}" aria-label="Kartu aksara aktif">
            <div class="script-focus-top">
              <div class="toolbar-group">
                <span class="tag accent mono">${selectedIdx + 1} / ${activeTab.chars.length}</span>
                <span class="tag ${isSelectedLearned ? 'jade' : ''}">${isSelectedLearned ? 'Sudah Hafal' : 'Belum Hafal'}</span>
              </div>
              <select id="script-jump-select" class="script-jump-select" aria-label="Pilih huruf langsung">
                ${jumpOptsHtml}
              </select>
            </div>

            <div class="script-focus-hero">
              <div class="script-focus-glyph" ${isRtl ? 'dir="rtl"' : ''}>${esc(selectedChar.char)}</div>
              <div class="script-focus-reading">
                <span class="script-focus-romaji mono">${esc(selectedChar.romaji)}</span>
                <button type="button" class="audio-btn accent-fill" data-speak="${esc(speakGlyph)}" aria-label="Putar bunyi ${esc(speakGlyph)}">${ICONS.speaker}</button>
              </div>
            </div>

            <div class="script-focus-details">
              <div class="pitfall-box" style="margin:0;">
                <div class="pitfall-title">Tips & Cara Baca</div>
                <p>${esc(selectedChar.tip)}</p>
              </div>
              <div class="srs-example" style="margin:0;">
                <div>
                  <div class="kpi-label">Contoh penggunaan</div>
                  <div style="font-weight:600;margin-top:2px;">${esc(selectedChar.example)}</div>
                </div>
                <button type="button" class="audio-btn" data-speak="${esc(exampleSpeak)}" aria-label="Putar audio contoh penggunaan">${ICONS.speaker}</button>
              </div>
            </div>

            <div class="script-focus-actions">
              <button type="button" class="${isSelectedLearned ? 'btn-jade' : 'btn-primary'} script-learned-btn" data-action="script-toggle-learned" data-id="${esc(selectedChar.id)}">
                ${isSelectedLearned ? `${ICONS.check} Sudah Hafal` : 'Tandai Sudah Hafal (+3 XP)'}
              </button>
              <button type="button" class="btn-secondary" data-action="script-to-write" data-id="${esc(selectedChar.id)}">
                Latih Tulis
              </button>
            </div>

            <div class="script-focus-nav" role="group" aria-label="Navigasi huruf sebelumnya dan berikutnya">
              <button type="button" class="btn-secondary script-nav-btn" data-action="script-prev" ${!hasPrev ? 'disabled' : ''}>← Sebelumnya</button>
              <button type="button" class="btn-primary script-nav-btn" data-action="script-next" ${!hasNext ? 'disabled' : ''}>Berikutnya →</button>
            </div>
          </article>
        </div>
      `;
    }

    const gate = Store.getScriptGateStatus(state, state.activeLang);
    const gateBannerHtml = !gate.unlocked ? `
      <div class="card script-gate-banner" style="margin-bottom:16px;">
        <div style="flex:1;min-width:220px;">
          <div class="toolbar-group" style="margin-bottom:4px;">
            <span class="tag accent">${ICONS.lock} Buka Kunci Tahap Lanjut</span>
            <span class="mono" style="font-weight:700;font-size:0.86rem;">${gate.learned} / ${gate.required} huruf</span>
          </div>
          <p class="kpi-label">Tandai minimal ${gate.required} huruf di bawah sebagai <strong>Sudah Hafal</strong> untuk membuka Kartu SRS, Quiz, Dialog, dan seluruh modul ${esc(meta.name_id)}.</p>
          <div class="progress-track" style="height:7px;margin-top:8px;max-width:340px;"><div class="progress-fill jade" style="width:${gate.pct}%"></div></div>
        </div>
        <button type="button" class="btn-secondary btn-sm" data-action="script-gate-bypass">Sudah bisa baca? Lewati Kunci</button>
      </div>
    ` : gate.bypassed ? `
      <div class="toolbar-row" style="margin-bottom:12px;">
        <span class="tag jade">Kunci aksara dilewati (semua modul terbuka)</span>
        <button type="button" class="btn-ghost btn-sm" data-action="script-gate-restore">Aktifkan Kunci Bertahap Lagi</button>
      </div>
    ` : '';

    return `
      ${renderStudyBreadcrumb('Pengenalan Aksara')}
      ${gateBannerHtml}
      <div class="section-header">
        <div>
          <div class="toolbar-group" style="margin-bottom:4px;">
            <span class="tag accent">Langkah Awal · ${esc(meta.name_id)}</span>
            <span class="tag jade">Dihafal: ${totalLearned}/${allChars.length} huruf (${pct}%)</span>
          </div>
          <h1 class="page-title">${esc(sData.title)}</h1>
          <p class="page-sub">${esc(sData.subtitle)}</p>
        </div>
        <div class="segmented" role="group" aria-label="Mode latihan aksara">
          <button type="button" class="seg-btn ${ui.scriptMode === 'table' ? 'active' : ''}" data-action="script-mode" data-val="table">Kartu Huruf</button>
          <button type="button" class="seg-btn ${ui.scriptMode === 'quiz' ? 'active' : ''}" data-action="script-mode" data-val="quiz">Tebak Cepat</button>
        </div>
      </div>

      <div class="progress-track" style="margin-bottom:16px;">
        <div class="progress-fill jade" style="width:${pct}%"></div>
      </div>

      <div class="level-tabs" role="tablist" aria-label="Kelompok aksara">
        ${tabsHtml}
      </div>

      ${mainAreaHtml}
      ${renderNextStepBar('Sudah mulai akrab dengan huruf-hurufnya?', 'Lanjut ke Jalur Modul untuk mulai belajar kata, percakapan, dan pola kalimat.', 'Lanjut ke Jalur Modul', 'modules')}
    `;
  }

  // ==========================================================================
  // VIEW: RENCANA BELAJAR PERSONAL (STUDY PLAN)
  // ==========================================================================
  function renderStudyPlan() {
    const pack = getActivePack();
    if (!pack) return renderMissingPackState('Rencana Belajar');
    const meta = getCatalogMeta(state.activeLang);
    const plan = state.studyPlans && state.studyPlans[state.activeLang];

    if (!plan || !Array.isArray(plan.days) || !plan.days.length) {
      return `
        ${renderStudyBreadcrumb('Rencana Belajar')}
        <div class="section-header">
          <div>
            <h1 class="page-title">Rencana Belajar · ${esc(meta.name_id)}</h1>
            <p class="page-sub">Susun jadwal belajar harian yang terukur sesuai target, waktu luang, dan rentang hari Anda.</p>
          </div>
        </div>

        <form id="form-create-plan" class="card plan-builder-card">
          <div class="plan-step-block">
            <h2 style="font-size:1rem;font-weight:700;margin-bottom:8px;">1. Pilih Tujuan Utama</h2>
            <div class="plan-opt-grid">
              <label class="plan-radio-card ${ui.planGoal === 'conversation' ? 'active' : ''}">
                <input type="radio" name="goal" value="conversation" ${ui.planGoal === 'conversation' ? 'checked' : ''} data-action="plan-opt-goal">
                <strong>Percakapan Harian</strong>
                <span>Seimbang antara SRS, dialog, konjugasi, dan bacaan.</span>
              </label>
              <label class="plan-radio-card ${ui.planGoal === 'travel' ? 'active' : ''}">
                <input type="radio" name="goal" value="travel" ${ui.planGoal === 'travel' ? 'checked' : ''} data-action="plan-opt-goal">
                <strong>Siap Liburan & Travel</strong>
                <span>Fokus dialog transaksi, kosakata inti, dan Sprint cepat.</span>
              </label>
              <label class="plan-radio-card ${ui.planGoal === 'exam' ? 'active' : ''}">
                <input type="radio" name="goal" value="exam" ${ui.planGoal === 'exam' ? 'checked' : ''} data-action="plan-opt-goal">
                <strong>Persiapan Ujian Resmi</strong>
                <span>Rutin latihan konjugasi, bacaan, dan Mini Try-Out berwaktu.</span>
              </label>
            </div>
          </div>

          <div class="form-row-2" style="margin-top:16px;">
            <div class="form-field">
              <label for="plan-minutes-select">2. Durasi Belajar per Hari</label>
              <select id="plan-minutes-select" name="dailyMinutes" class="lang-select">
                <option value="10" ${ui.planMinutes === 10 ? 'selected' : ''}>10 menit / hari (Ringan)</option>
                <option value="20" ${ui.planMinutes === 20 ? 'selected' : ''}>20 menit / hari (Ideal)</option>
                <option value="30" ${ui.planMinutes === 30 ? 'selected' : ''}>30 menit / hari (Intensif)</option>
              </select>
            </div>
            <div class="form-field">
              <label for="plan-days-select">3. Rentang Jadwal</label>
              <select id="plan-days-select" name="totalDays" class="lang-select">
                <option value="14" ${ui.planDays === 14 ? 'selected' : ''}>14 Hari (Sprint 2 Minggu)</option>
                <option value="30" ${ui.planDays === 30 ? 'selected' : ''}>30 Hari (Target Bulanan)</option>
                <option value="60" ${ui.planDays === 60 ? 'selected' : ''}>60 Hari (Fondasi Lengkap)</option>
              </select>
            </div>
          </div>

          <div style="margin-top:18px;display:flex;justify-content:flex-end;">
            <button type="submit" class="btn-primary">Susun Jadwal ${esc(meta.name_id)} Sekarang</button>
          </div>
        </form>
      `;
    }

    const doneMap = plan.completedTasks || {};
    const totalTasks = plan.days.reduce((s, d) => s + d.tasks.length, 0);
    const doneTasks = plan.days.reduce((s, d) => s + d.tasks.filter((t) => doneMap[t.id]).length, 0);
    const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
    const goalLabel = plan.goal === 'exam' ? 'Persiapan Ujian' : plan.goal === 'travel' ? 'Liburan & Travel' : 'Percakapan Harian';

    const daysHtml = plan.days.slice(0, 14).map((d) => {
      const allDone = d.tasks.every((t) => doneMap[t.id]);
      return `
        <article class="card plan-day-card ${allDone ? 'completed' : ''}">
          <div class="toolbar-row" style="margin-bottom:10px;">
            <div class="toolbar-group">
              <span class="tag ${allDone ? 'jade' : 'accent'}">Hari ${d.day}</span>
              <strong>${esc(d.focus)}</strong>
            </div>
            ${allDone ? '<span class="tag jade">Selesai</span>' : ''}
          </div>
          <div class="plan-task-list">
            ${d.tasks.map((t) => {
              const checked = Boolean(doneMap[t.id]);
              return `
                <div class="plan-task-row ${checked ? 'is-done' : ''}">
                  <button type="button" class="plan-check-btn ${checked ? 'checked' : ''}" data-action="plan-toggle-task" data-tid="${esc(t.id)}" aria-pressed="${checked}" aria-label="Tandai tugas ${esc(t.label)}">
                    ${checked ? ICONS.check : ''}
                  </button>
                  <div class="plan-task-body">
                    <div class="plan-task-title">${esc(t.label)}</div>
                    <div class="kpi-label">Estimasi ${t.minutes} menit</div>
                  </div>
                  <button type="button" class="btn-secondary btn-sm" data-nav="${esc(t.nav)}">Mulai</button>
                </div>
              `;
            }).join('')}
          </div>
        </article>
      `;
    }).join('');

    return `
      ${renderStudyBreadcrumb('Rencana Belajar')}
      <div class="section-header">
        <div>
          <div class="toolbar-group" style="margin-bottom:4px;">
            <span class="tag accent">${esc(goalLabel)}</span>
            <span class="tag">${plan.dailyMinutes} mnt/hari · ${plan.totalDays} hari</span>
          </div>
          <h1 class="page-title">Rencana Belajar · ${esc(meta.name_id)}</h1>
          <p class="page-sub">Mulai tanggal ${esc(plan.startDate)} · ${doneTasks}/${totalTasks} tugas selesai (${pct}%).</p>
        </div>
        <div class="toolbar-group">
          <button type="button" class="btn-secondary btn-sm" data-action="plan-shift-today">Sesuaikan Jadwal ke Hari Ini</button>
          <button type="button" class="btn-ghost btn-sm" data-action="plan-reset">Ubah Target</button>
        </div>
      </div>

      <div class="card" style="margin-bottom:18px;">
        <div class="daily-goal-head" style="margin-bottom:6px;">
          <span style="font-weight:700;">Progres Keseluruhan Rencana</span>
          <span class="mono" style="font-weight:700;">${pct}%</span>
        </div>
        <div class="progress-track"><div class="progress-fill jade" style="width:${pct}%"></div></div>
      </div>

      <div class="plan-days-grid">${daysHtml}</div>
    `;
  }

  // ==========================================================================
  // VIEW: CONJUGATION TRAINER (PELATIH KONJUGASI & POLA BENTUK)
  // ==========================================================================
  function getFilteredConjugations() {
    const langData = CONJUGATION_DATA && CONJUGATION_DATA[state.activeLang];
    if (!langData || !Array.isArray(langData.items)) return [];
    if (ui.conjForm === 'ALL') return langData.items;
    return langData.items.filter((i) => i.targetForm === ui.conjForm);
  }

  function renderConjugation() {
    const langData = CONJUGATION_DATA && CONJUGATION_DATA[state.activeLang];
    const meta = getCatalogMeta(state.activeLang);
    if (!langData) return renderMissingPackState('Latihan Konjugasi');

    const list = getFilteredConjugations();
    if (ui.conjIdx >= list.length) ui.conjIdx = 0;
    const item = list[ui.conjIdx] || langData.items[0];
    const cStats = (state.conjugationStats && state.conjugationStats[state.activeLang]) || { total: 0, correct: 0, bestStreak: 0 };
    const acc = cStats.total > 0 ? Math.round((cStats.correct / cStats.total) * 100) : 0;

    // Deterministic shuffled options per item
    const rawOpts = [item.answer, ...(item.distractors || [])];
    const opts = rawOpts.slice().sort((a, b) => ((a.length * 7 + item.id.length) % 13) - ((b.length * 7 + item.id.length) % 13));

    const isAnswered = ui.conjPicked !== null;
    const isCorrect = isAnswered && ui.conjPicked.toLowerCase().trim() === item.answer.toLowerCase().trim();

    const formChipsHtml = ['ALL', ...(langData.forms || [])].map((f) => `
      <button type="button" class="chip ${ui.conjForm === f ? 'active' : ''}" data-action="conj-filter-form" data-form="${esc(f)}">
        ${f === 'ALL' ? 'Semua Bentuk' : esc(f)}
      </button>
    `).join('');

    return `
      ${renderStudyBreadcrumb('Latihan Konjugasi')}
      <div class="section-header">
        <div>
          <span class="tag accent" style="margin-bottom:6px;">${esc(meta.name_id)} · ${esc(meta.name_native)}</span>
          <h1 class="page-title">${esc(langData.modeTitle)}</h1>
          <p class="page-sub">${esc(langData.modeSubtitle)}</p>
        </div>
        <div class="segmented" role="group" aria-label="Mode latihan konjugasi">
          <button type="button" class="seg-btn ${ui.conjMode === 'choice' ? 'active' : ''}" data-action="conj-mode" data-val="choice">Pilihan Cepat</button>
          <button type="button" class="seg-btn ${ui.conjMode === 'type' ? 'active' : ''}" data-action="conj-mode" data-val="type">Ketik Jawaban</button>
        </div>
      </div>

      <div class="toolbar-row" style="margin-bottom:14px;">
        <div class="toolbar-group">${formChipsHtml}</div>
        <div class="toolbar-group">
          <span class="tag jade">Combo: ${ui.conjStreak}</span>
          <span class="tag">Akurasi: ${cStats.total > 0 ? `${acc}% (${cStats.correct}/${cStats.total})` : 'Belum ada'}</span>
        </div>
      </div>

      <div class="card conj-stage">
        <div class="toolbar-row" style="margin-bottom:12px;">
          <span class="tag">${esc(item.group)}</span>
          <span class="mono kpi-label">Soal ${ui.conjIdx + 1} / ${list.length}</span>
        </div>

        <div class="conj-prompt-card">
          <div class="kpi-label">Ubah kata dasar berikut:</div>
          <div class="conj-base-word">${esc(item.base)}</div>
          <div class="conj-meaning">Arti: <strong>${esc(item.meaning_id)}</strong></div>
          <div class="conj-target-pill">Target: <strong>${esc(item.targetForm)}</strong></div>
        </div>

        ${ui.conjMode === 'choice' ? `
          <div class="quiz-options" style="margin-top:16px;">
            ${opts.map((opt) => {
              let cls = '';
              if (isAnswered) {
                if (opt === item.answer) cls = 'correct';
                else if (opt === ui.conjPicked) cls = 'wrong';
              }
              return `<button type="button" class="quiz-opt-btn ${cls}" data-action="conj-pick" data-val="${esc(opt)}" ${isAnswered ? 'disabled' : ''}>${esc(opt)}</button>`;
            }).join('')}
          </div>
        ` : `
          <form id="form-conj-type" class="conj-type-form" style="margin-top:16px;">
            <label for="conj-type-input" class="sr-only">Ketik hasil konjugasi</label>
            <input id="conj-type-input" type="text" class="phonetic-input" value="${esc(ui.conjTyped)}" placeholder="Ketik jawaban (${esc(item.targetForm)})..." autocomplete="off" ${isAnswered ? 'disabled' : ''}>
            <button type="submit" class="btn-primary" ${isAnswered ? 'disabled' : ''}>Periksa</button>
          </form>
        `}

        <div class="toolbar-row" style="margin-top:14px;margin-bottom:0;">
          <button type="button" class="btn-ghost btn-sm" data-action="conj-toggle-rule">
            ${ui.conjShowRule ? 'Sembunyikan Rumus' : 'Lihat Rumus Singkat'}
          </button>
          ${isAnswered ? `
            <div class="toolbar-group">
              <button type="button" class="audio-btn" data-speak="${esc(item.answer)}" aria-label="Putar audio jawaban ${esc(item.answer)}">${ICONS.speaker}</button>
              <button type="button" class="btn-primary" data-action="conj-next">Soal Berikutnya</button>
            </div>
          ` : ''}
        </div>

        ${ui.conjShowRule ? `
          <div class="conj-rule-box">
            <strong>Rumus:</strong> ${esc(item.hintRule)}
          </div>
        ` : ''}

        ${isAnswered ? `
          <div class="feedback-box ${isCorrect ? 'correct' : 'wrong'}" style="margin-top:14px;">
            <div class="feedback-title">${isCorrect ? 'Tepat sekali! (+8 XP)' : `Belum tepat. Jawaban benar: ${esc(item.answer)}`}</div>
            <p>Cara baca: <strong>${esc(item.romaji)}</strong>. ${esc(item.hintRule)}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  // ==========================================================================
  // VIEW: EXAM STRATEGY & TIMED MINI TRY-OUT
  // ==========================================================================
  function buildExamTryoutQuestions() {
    const pack = getActivePack();
    const qs = [];
    if (pack && Array.isArray(pack.quizzes)) {
      pack.quizzes.filter((q) => q.type === 'multiple_choice' && Array.isArray(q.options)).slice(0, 5).forEach((q) => {
        qs.push({
          id: q.id,
          category: 'Kosakata & Tata Bahasa',
          prompt: q.prompt,
          options: q.options,
          answer: q.options[q.answer_index],
          explanation: q.explanation_id || ''
        });
      });
    }
    const conj = CONJUGATION_DATA && CONJUGATION_DATA[state.activeLang];
    if (conj && Array.isArray(conj.items)) {
      conj.items.slice(0, 3).forEach((c) => {
        const opts = [c.answer, ...(c.distractors || [])].sort();
        qs.push({
          id: `tryout-${c.id}`,
          category: 'Pola Bentuk & Konjugasi',
          prompt: `Ubah "${c.base}" (${c.meaning_id}) ke bentuk ${c.targetForm}:`,
          options: opts,
          answer: c.answer,
          explanation: c.hintRule
        });
      });
    }
    return qs.slice(0, 8);
  }

  function startExamTryout() {
    const qs = buildExamTryoutQuestions();
    if (!qs.length) {
      showToast('Belum ada soal yang cukup untuk Mini Try-Out bahasa ini.', 'error');
      return;
    }
    stopExamTimer();
    ui.examTryoutActive = true;
    ui.examTryoutDone = false;
    ui.examTryoutTimeLeft = 300;
    ui.examTryoutQuestions = qs;
    ui.examTryoutIdx = 0;
    ui.examTryoutAnswers = {};
    examInterval = setInterval(() => {
      if (!ui.examTryoutActive) {
        stopExamTimer();
        return;
      }
      ui.examTryoutTimeLeft--;
      const el = document.getElementById('exam-timer-val');
      if (el) el.textContent = formatTimer(Math.max(0, ui.examTryoutTimeLeft));
      if (ui.examTryoutTimeLeft <= 0) {
        finishExamTryout();
      }
    }, 1000);
    renderView();
  }

  async function finishExamTryout() {
    stopExamTimer();
    ui.examTryoutActive = false;
    ui.examTryoutDone = true;
    const qs = ui.examTryoutQuestions || [];
    let score = 0;
    qs.forEach((q, idx) => {
      if (ui.examTryoutAnswers[idx] === q.answer) score++;
    });
    const usedSec = Math.max(1, 300 - Math.max(0, ui.examTryoutTimeLeft));
    state.examHistory = state.examHistory || {};
    state.examHistory[state.activeLang] = state.examHistory[state.activeLang] || [];
    state.examHistory[state.activeLang].unshift({
      date: Store.getTodayKey(0),
      score,
      total: qs.length,
      durationSec: usedSec
    });
    if (state.examHistory[state.activeLang].length > 10) {
      state.examHistory[state.activeLang].length = 10;
    }
    Store.addXP(state, state.activeLang, 20 + score * 4);
    await persistState();
    renderChrome();
    renderView();
  }

  function renderExam() {
    const exam = EXAM_DATA && EXAM_DATA[state.activeLang];
    const meta = getCatalogMeta(state.activeLang);
    if (!exam) return renderMissingPackState('Strategi Ujian');

    if (ui.examTryoutActive) {
      const qs = ui.examTryoutQuestions;
      const q = qs[ui.examTryoutIdx];
      const picked = ui.examTryoutAnswers[ui.examTryoutIdx];
      return `
        ${renderStudyBreadcrumb('Mini Try-Out Ujian')}
        <div class="card">
          <div class="toolbar-row" style="margin-bottom:14px;">
            <div class="toolbar-group">
              <span class="tag accent">Mini Try-Out · ${esc(exam.examName)}</span>
              <span class="tag">${esc(q.category)}</span>
            </div>
            <div class="tryout-timer-pill mono" id="exam-timer-val">${formatTimer(ui.examTryoutTimeLeft)}</div>
          </div>
          <div class="kpi-label" style="margin-bottom:8px;">Soal ${ui.examTryoutIdx + 1} dari ${qs.length}</div>
          <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:16px;">${esc(q.prompt)}</h2>
          <div class="quiz-options">
            ${q.options.map((opt) => `
              <button type="button" class="quiz-opt-btn ${picked === opt ? 'selected-tryout' : ''}" data-action="exam-pick" data-val="${esc(opt)}">
                ${esc(opt)}
              </button>
            `).join('')}
          </div>
          <div class="toolbar-row" style="margin-top:18px;margin-bottom:0;">
            <button type="button" class="btn-ghost btn-sm" data-action="exam-cancel">Batalkan</button>
            <div class="toolbar-group">
              ${ui.examTryoutIdx > 0 ? '<button type="button" class="btn-secondary btn-sm" data-action="exam-prev">Sebelumnya</button>' : ''}
              ${ui.examTryoutIdx < qs.length - 1
                ? '<button type="button" class="btn-primary btn-sm" data-action="exam-next">Berikutnya</button>'
                : '<button type="button" class="btn-jade btn-sm" data-action="exam-submit">Selesai & Nilai</button>'}
            </div>
          </div>
        </div>
      `;
    }

    let resultBannerHtml = '';
    if (ui.examTryoutDone && ui.examTryoutQuestions.length) {
      const qs = ui.examTryoutQuestions;
      let score = 0;
      const wrongCats = new Set();
      qs.forEach((q, idx) => {
        if (ui.examTryoutAnswers[idx] === q.answer) score++;
        else wrongCats.add(q.category);
      });
      const pct = Math.round((score / qs.length) * 100);
      const usedSec = Math.max(1, 300 - Math.max(0, ui.examTryoutTimeLeft));
      const advice = wrongCats.size === 0
        ? 'Semua kategori terjawab sempurna. Anda siap naik ke tingkat kesulitan berikutnya.'
        : `Fokuskan latihan ulang pada: ${Array.from(wrongCats).join(', ')}.`;
      resultBannerHtml = `
        <div class="card exam-result-card" style="margin-bottom:18px;">
          <div class="toolbar-row" style="margin-bottom:8px;">
            <div>
              <span class="tag ${pct >= 70 ? 'jade' : 'amber'}">Hasil Mini Try-Out</span>
              <h2 style="font-size:1.3rem;font-weight:700;margin-top:6px;">Skor ${score}/${qs.length} (${pct}%)</h2>
            </div>
            <div class="mono" style="font-weight:700;">Waktu: ${formatTimer(usedSec)}</div>
          </div>
          <p class="page-sub" style="margin-bottom:12px;">${esc(advice)}</p>
          <div class="toolbar-group">
            <button type="button" class="btn-primary btn-sm" data-action="exam-start">Ulangi Mini Try-Out</button>
            <button type="button" class="btn-secondary btn-sm" data-nav="conjugation">Latih Konjugasi</button>
          </div>
        </div>
      `;
    }

    const history = (state.examHistory && state.examHistory[state.activeLang]) || [];
    const totalMins = exam.sections.reduce((s, sec) => s + sec.minutes, 0);

    return `
      ${renderStudyBreadcrumb('Strategi Ujian')}
      <div class="section-header">
        <div>
          <span class="tag accent" style="margin-bottom:6px;">${esc(meta.name_id)} · ${esc(exam.targetLevels)}</span>
          <h1 class="page-title">${esc(exam.examName)}</h1>
          <p class="page-sub">${esc(exam.passingNote)}</p>
        </div>
        <button type="button" class="btn-primary" data-action="exam-start">Mulai Mini Try-Out (5 Menit)</button>
      </div>

      ${resultBannerHtml}

      <div class="card" style="margin-bottom:18px;">
        <div class="toolbar-row" style="margin-bottom:12px;">
          <h2 style="font-size:1.05rem;font-weight:700;">Alokasi Waktu & Strategi per Sesi</h2>
          <span class="mono kpi-label">Total ~${totalMins} menit</span>
        </div>
        <div class="exam-sections-list">
          ${exam.sections.map((sec) => `
            <div class="exam-section-row">
              <div class="daily-goal-head" style="margin-bottom:4px;">
                <strong>${esc(sec.name)}</strong>
                <span class="mono" style="font-size:0.82rem;">${sec.minutes} menit · bobot ${sec.weightPct}%</span>
              </div>
              <div class="progress-track" style="height:6px;margin-bottom:6px;"><div class="progress-fill" style="width:${sec.weightPct}%"></div></div>
              <p class="kpi-label">${esc(sec.tip)}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card" style="margin-bottom:18px;">
        <h2 style="font-size:1.05rem;font-weight:700;margin-bottom:12px;">Pola Jebakan Umum di Ujian</h2>
        <div class="exam-trap-grid">
          ${exam.traps.map((t) => `
            <article class="exam-trap-card">
              <h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px;">${esc(t.title)}</h3>
              <p class="kpi-label">${esc(t.detail)}</p>
            </article>
          `).join('')}
        </div>
      </div>

      ${history.length ? `
        <div class="card">
          <h2 style="font-size:1rem;font-weight:700;margin-bottom:10px;">Riwayat Mini Try-Out (${esc(meta.name_id)})</h2>
          <div class="toolbar-group">
            ${history.slice(0, 5).map((h) => `
              <span class="tag">${esc(h.date)} · ${h.score}/${h.total} (${formatTimer(h.durationSec)})</span>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  // ==========================================================================
  // VIEW 8: STATISTIK & STREAK HARIAN
  // ==========================================================================
  function renderStats() {
    const streak = Store.computeStreakInfo(state);
    const s = state.settings;
    const today = Store.computeTodayProgress(state);

    // 90-day heatmap
    const heatCells = [];
    for (let i = 89; i >= 0; i--) {
      const dateKey = Store.getTodayKey(-i);
      const log = state.dailyLogs[dateKey];
      let cls = '';
      let statusLabel = 'Kosong';
      if (log && log.frozen) {
        cls = 'frozen';
        statusLabel = 'Streak Freeze';
      } else if (Store.isDayAchieved(log, s)) {
        cls = 'achieved';
        statusLabel = 'Target tercapai';
      } else if (Store.isDayPartial(log)) {
        cls = 'partial';
        statusLabel = 'Aktivitas sebagian';
      }
      const mins = log ? Math.floor((log.seconds || 0) / 60) : 0;
      const cards = log ? (log.cards || 0) : 0;
      const tip = `${dateKey}: ${statusLabel} (${mins} mnt, ${cards} SRS)`;
      heatCells.push(`<div class="heat-cell ${cls}" title="${esc(tip)}" data-heat-tip="${esc(tip)}" aria-label="${esc(tip)}" tabindex="0"></div>`);
    }

    // Per-language mastery
    const langProgressHtml = Object.keys(state.packs).map((code) => {
      const pack = state.packs[code];
      const meta = getCatalogMeta(code);
      const total = pack.flashcards.length;
      const mastered = pack.flashcards.filter((c) => Store.isCardMastered(c)).length;
      const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;
      return `
        <div style="margin-bottom:14px;">
          <div class="daily-goal-head" style="margin-bottom:6px;">
            <span style="font-weight:600;">${esc(meta.name_id)} (${esc(meta.name_native)})</span>
            <span class="mono" style="font-size:0.82rem;">${mastered}/${total} kartu dikuasai (${pct}%)</span>
          </div>
          <div class="progress-track"><div class="progress-fill jade" style="width:${pct}%"></div></div>
        </div>
      `;
    }).join('');

    return `
      <div class="section-header">
        <div>
          <h1 class="page-title">Statistik & Streak Harian</h1>
          <p class="page-sub">Hari tercapai jika belajar minimal ${s.targetMinutes} menit ATAU menyelesaikan ${s.targetModules} modul dan ${s.targetCards} kartu SRS, atau memakai Streak Freeze.</p>
        </div>
      </div>

      <div class="kpi-strip">
        <div class="kpi-card">
          <div class="kpi-label">Streak Aktif</div>
          <div class="kpi-val">${streak.current} hari</div>
          <div class="kpi-sub">Rekor tertinggi: ${streak.best} hari</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Belajar Hari Ini</div>
          <div class="kpi-val">${today.minutes} menit</div>
          <div class="kpi-sub">${today.cards} kartu SRS · ${today.modules} modul</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Kuota Streak Freeze</div>
          <div class="kpi-val">${streak.freezeRemaining} / 1</div>
          <div class="kpi-sub">${streak.todayFrozen ? 'Aktif untuk hari ini' : 'Reset setiap hari Senin'}</div>
        </div>
        <div class="kpi-card" style="display:flex;flex-direction:column;justify-content:space-between;">
          <div class="kpi-label">Pelindung Streak</div>
          <button type="button" class="btn-secondary btn-sm" data-action="activate-freeze" ${(streak.freezeRemaining === 0 || streak.todayFrozen || streak.todayAchieved) ? 'disabled' : ''}>
            ${streak.todayFrozen ? 'Freeze Sudah Aktif' : streak.todayAchieved ? 'Target Hari Ini Tercapai' : 'Aktifkan Freeze Hari Ini'}
          </button>
        </div>
      </div>

      <div class="card" style="margin-bottom:18px;">
        <h2 style="font-size:1.05rem;font-weight:700;margin-bottom:12px;">Menit belajar dan kartu SRS (7 hari terakhir)</h2>
        <div class="chart-container-fixed">
          <canvas id="weekly-chart" aria-label="Grafik batang menit belajar dan kartu SRS 7 hari terakhir"></canvas>
        </div>
      </div>

      <div class="settings-grid">
        <div class="card">
          <h2 style="font-size:1.05rem;font-weight:700;">Heatmap Konsistensi 90 Hari</h2>
          <div class="heatmap-grid">${heatCells.join('')}</div>
          <div class="heatmap-detail mono" id="heatmap-detail">Arahkan kursor atau fokus ke kotak tanggal untuk melihat rincian harian.</div>
          <div class="heatmap-legend">
            <span class="legend-item"><span class="legend-swatch" style="background:var(--surface-subtle);"></span>Kosong</span>
            <span class="legend-item"><span class="legend-swatch" style="background:light-dark(#F6C4B6,#592C21);"></span>Sebagian</span>
            <span class="legend-item"><span class="legend-swatch" style="background:var(--jade);"></span>Target tercapai</span>
            <span class="legend-item"><span class="legend-swatch" style="background:var(--amber);"></span>Freeze</span>
          </div>
        </div>

        <div class="card">
          <h2 style="font-size:1.05rem;font-weight:700;margin-bottom:14px;">Penguasaan per Bahasa Aktif</h2>
          ${langProgressHtml}
        </div>
      </div>

      <div class="card" style="margin-top:18px;">
        <div class="toolbar-row" style="margin-bottom:8px;">
          <div>
            <h2 style="font-size:1.05rem;font-weight:700;">Sistem Pencapaian & Lencana Bertingkat</h2>
            <p class="kpi-label">Terbuka otomatis dengan notifikasi seketika saat Anda mencapai target belajar.</p>
          </div>
          <span class="tag jade">${Store.computeAchievements(state).filter((b) => b.unlocked).length} / ${Store.computeAchievements(state).length} terbuka</span>
        </div>
        <div class="toolbar-group" style="margin-bottom:14px;">
          ${['ALL', 'Konsistensi', 'Penguasaan', 'Eksplorasi', 'Tantangan'].map((cat) => `
            <button type="button" class="chip ${ui.achCategory === cat ? 'active' : ''}" data-action="ach-cat" data-cat="${esc(cat)}">
              ${cat === 'ALL' ? 'Semua Kategori' : esc(cat)}
            </button>
          `).join('')}
        </div>
        <div class="badge-grid">
          ${Store.computeAchievements(state).filter((b) => ui.achCategory === 'ALL' || b.category === ui.achCategory).map((b) => {
            const tierLabel = b.tier === 'gold' ? 'Emas' : b.tier === 'silver' ? 'Perak' : 'Perunggu';
            return `
              <article class="badge-card ${b.unlocked ? 'unlocked' : ''}">
                <div class="daily-goal-head" style="margin-bottom:4px;">
                  <span class="ach-tier-badge ${esc(b.tier)}">${tierLabel}</span>
                  <span class="tag ${b.unlocked ? 'jade' : ''}">${b.unlocked ? 'Terbuka' : esc(b.progress)}</span>
                </div>
                <div style="font-weight:700;font-size:0.94rem;margin-bottom:2px;">${esc(b.title)}</div>
                <p class="kpi-label" style="margin-bottom:8px;">${esc(b.desc)}</p>
                <div class="progress-track" style="height:5px;"><div class="progress-fill ${b.unlocked ? 'jade' : ''}" style="width:${b.percent}%"></div></div>
              </article>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderStatsChart() {
    const canvas = document.getElementById('weekly-chart');
    if (!canvas || typeof global.Chart === 'undefined') return;
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    const labels = [];
    const minsData = [];
    const cardsData = [];
    for (let i = 6; i >= 0; i--) {
      const k = Store.getTodayKey(-i);
      const log = state.dailyLogs[k] || { seconds: 0, cards: 0 };
      labels.push(k.slice(5)); // MM-DD
      minsData.push(Math.floor((log.seconds || 0) / 60));
      cardsData.push(log.cards || 0);
    }

    const resolvedScheme = getStoredScheme() || getSystemTheme();
    const isDark = resolvedScheme === 'dark';
    const inkMuted = isDark ? '#B9B5AA' : '#3E3C37';
    const borderCol = isDark ? '#313544' : 'rgba(17, 17, 17, 0.14)';
    const barBorder = isDark ? '#EAE5D8' : '#111111';
    const accent = '#FFD13B';
    const jade = isDark ? '#7CE870' : '#8CE982';

    chartInstance = new global.Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Menit Belajar', data: minsData, backgroundColor: accent, borderColor: barBorder, borderWidth: 2, borderRadius: 4 },
          { label: 'Kartu SRS', data: cardsData, backgroundColor: jade, borderColor: barBorder, borderWidth: 2, borderRadius: 4 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: inkMuted } }
        },
        scales: {
          x: { ticks: { color: inkMuted }, grid: { display: false } },
          y: { beginAtZero: true, ticks: { precision: 0, color: inkMuted }, grid: { color: borderCol } }
        }
      }
    });
  }

  // ==========================================================================
  // VIEW 9: IMPORT & BACKUP LOKAL
  // ==========================================================================
  function renderSettings() {
    const s = state.settings;
    const storedScheme = getStoredScheme() || 'system';
    const sysLabel = getSystemTheme() === 'dark' ? 'Gelap' : 'Terang';

    const templateOpts = LANGUAGE_CATALOG.map((l) =>
      `<option value="${l.code}" ${ui.settingsTemplateLang === l.code ? 'selected' : ''}>${esc(l.name_id)} (${esc(l.code)})</option>`
    ).join('');

    return `
      <div class="section-header">
        <div>
          <h1 class="page-title">Import Materi & Backup Lokal</h1>
          <p class="page-sub">Tambah bahasa baru dari file JSON skema 1.0, atur target harian, dan cadangkan seluruh progres Anda.</p>
        </div>
      </div>

      <div class="settings-grid">
        <!-- Import JSON Pack -->
        <section class="card">
          <h2 style="font-size:1.05rem;font-weight:700;margin-bottom:6px;">Import Paket Materi JSON (Skema 1.0)</h2>
          <p class="kpi-label" style="margin-bottom:14px;">Jika bahasa sudah ada, modul/kartu/quiz baru digabungkan berdasarkan ID tanpa menghapus jadwal SRS lama Anda.</p>
          <div class="file-drop" style="margin-bottom:14px;">
            <label for="input-import-pack" style="font-weight:600;font-size:0.86rem;">Pilih file paket materi (.json)</label>
            <input id="input-import-pack" type="file" accept=".json,application/json">
          </div>

          <div style="border-top:1px solid var(--border);padding-top:14px;">
            <label for="template-lang-select" class="field-label-sm">Unduh Template JSON Valid</label>
            <div class="toolbar-group">
              <select id="template-lang-select" class="lang-select" style="flex:1;min-width:160px;">${templateOpts}</select>
              <button type="button" class="btn-secondary" data-action="download-template">Unduh Template</button>
            </div>
          </div>
        </section>

        <!-- Daily Target & Theme -->
        <section class="card">
          <h2 style="font-size:1.05rem;font-weight:700;margin-bottom:12px;">Target Harian & Tampilan</h2>
          <form id="form-daily-targets">
            <div class="form-row-2">
              <div class="form-field">
                <label for="set-target-min">Target Menit / Hari</label>
                <input id="set-target-min" name="targetMinutes" type="number" min="5" max="240" value="${s.targetMinutes}" required>
              </div>
              <div class="form-field">
                <label for="set-target-cards">Target Kartu SRS / Hari</label>
                <input id="set-target-cards" name="targetCards" type="number" min="5" max="200" value="${s.targetCards}" required>
              </div>
            </div>
            <div class="form-field">
              <label for="set-target-mods">Target Modul Selesai / Hari</label>
              <input id="set-target-mods" name="targetModules" type="number" min="1" max="10" value="${s.targetModules}" required>
            </div>
            <button type="submit" class="btn-primary">Simpan Target Harian</button>
          </form>

          <div style="border-top:1px solid var(--border);margin-top:16px;padding-top:14px;">
            <span class="field-label-sm">Tema Warna</span>
            <div class="segmented" role="group" aria-label="Pilih tema warna">
              <button type="button" class="seg-btn ${storedScheme === 'system' ? 'active' : ''}" data-action="set-theme" data-val="system">Sistem (${sysLabel})</button>
              <button type="button" class="seg-btn ${storedScheme === 'light' ? 'active' : ''}" data-action="set-theme" data-val="light">Terang</button>
              <button type="button" class="seg-btn ${storedScheme === 'dark' ? 'active' : ''}" data-action="set-theme" data-val="dark">Gelap</button>
            </div>
          </div>
        </section>

        <!-- Backup & Restore -->
        <section class="card">
          <h2 style="font-size:1.05rem;font-weight:700;margin-bottom:6px;">Export & Restore Backup Penuh</h2>
          <p class="kpi-label" style="margin-bottom:14px;">Cadangkan seluruh state aplikasi (riwayat streak, jadwal SRS, kartu pribadi, dan semua paket bahasa) ke satu file JSON.</p>
          <div class="toolbar-group" style="margin-bottom:14px;">
            <button type="button" class="btn-secondary" data-action="export-backup">Export Backup JSON</button>
          </div>
          <div class="file-drop">
            <label for="input-restore-backup" style="font-weight:600;font-size:0.86rem;">Pulihkan dari file backup (.json)</label>
            <input id="input-restore-backup" type="file" accept=".json,application/json">
          </div>
        </section>

        <!-- PWA & Offline Status -->
        <section class="card">
          <div class="toolbar-group" style="margin-bottom:6px;">
            <span class="tag ${swRegistered ? 'jade' : 'accent'}">${swRegistered ? 'PWA Siap Offline' : 'Mode Lokal'}</span>
            <span class="tag">${navigator.onLine ? 'Online' : 'Offline'}</span>
          </div>
          <h2 style="font-size:1.05rem;font-weight:700;margin-bottom:6px;">Aplikasi Offline (PWA) & Panduan Awal</h2>
          <p class="kpi-label" style="margin-bottom:14px;">LingoLokal menyimpan seluruh aset dan progres langsung di perangkat Anda agar tetap bisa dibuka tanpa sinyal internet.</p>
          <div class="toolbar-group">
            ${deferredInstallPrompt ? `<button type="button" class="btn-primary" data-action="pwa-install">Install ke Layar Utama</button>` : `<span class="kpi-label" style="font-size:0.82rem;">Tips install: di Chrome/Edge pilih <strong>Install App</strong> di menu browser; di iOS Safari ketuk <strong>Share -> Add to Home Screen</strong>.</span>`}
            <button type="button" class="btn-secondary" data-action="open-onboarding">Ulangi Panduan Awal (20 Detik)</button>
          </div>
        </section>

        <!-- Danger Zone: Reset -->
        <section class="card">
          <h2 style="font-size:1.05rem;font-weight:700;margin-bottom:6px;">Reset Semua Data Lokal</h2>
          <p class="kpi-label" style="margin-bottom:14px;">Hapus seluruh riwayat belajar dan kembalikan LingoLokal ke kondisi bersih awal (Jepang & Korea preloaded, 0 menit, 0 streak).</p>
          <button type="button" class="btn-danger" data-action="open-reset-modal">Reset Semua Data</button>
        </section>
      </div>
    `;
  }

  function downloadJsonFile(filename, dataObj) {
    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ==========================================================================
  // RENDER DISPATCHER & EVENT DELEGATION
  // ==========================================================================
  function renderView(animate = false) {
    const main = document.getElementById('main-content');
    if (!main || !state) return;

    let html = '';
    const gate = Store.getScriptGateStatus(state, state.activeLang);
    const navMeta = NAV_ITEMS.find((n) => n.id === currentView);
    if (!gate.unlocked && SCRIPT_GATED_VIEWS.has(currentView)) {
      html = renderScriptGateLockedView(navMeta ? navMeta.label : 'Latihan');
    } else {
      switch (currentView) {
        case 'dashboard': html = renderDashboard(); break;
        case 'studyplan': html = renderStudyPlan(); break;
        case 'alphabet': html = renderAlphabet(); break;
        case 'modules': html = renderModules(); break;
        case 'flashcards': html = renderFlashcards(); break;
        case 'conjugation': html = renderConjugation(); break;
        case 'quiz': html = renderQuiz(); break;
        case 'dialogs': html = renderDialogs(); break;
        case 'readings': html = renderReadings(); break;
        case 'grammar': html = renderGrammar(); break;
        case 'exam': html = renderExam(); break;
        case 'dictionary': html = renderDictionary(); break;
        case 'sprint': html = renderSprint(); break;
        case 'writing': html = renderWriting(); break;
        case 'stats': html = renderStats(); break;
        case 'settings': html = renderSettings(); break;
        default: html = renderDashboard();
      }
    }

    if (animate) {
      main.classList.remove('is-revealing');
      void main.offsetWidth; // Force reflow so reveal restarts cleanly on every tab switch
    }
    const subtabsHtml = renderHubSubtabs(currentView);
    main.innerHTML = `${subtabsHtml}${html}`;
    if (animate) {
      main.classList.add('is-revealing');
      if (revealTimer) clearTimeout(revealTimer);
      revealTimer = setTimeout(() => {
        main.classList.remove('is-revealing');
        revealTimer = null;
      }, 1150);
    }

    if (currentView === 'stats') {
      requestAnimationFrame(renderStatsChart);
    } else if (currentView === 'writing') {
      requestAnimationFrame(mountWritingCanvas);
    }
  }

  function bindGlobalEvents() {
    // Custom animated language dropdowns
    initLangPickers();

    // Timer pause/resume (desktop topbar + mobile drawer)
    ['timer-toggle-btn', 'drawer-timer-toggle-btn'].forEach((btnId) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener('click', () => {
          timerPaused = !timerPaused;
          updateTimerDisplay();
          if (timerPaused) persistState();
        });
      }
    });

    // Audio speed toggle (1x / 0.75x pelan)
    const audioSpeedBtn = document.getElementById('audio-speed-btn');
    if (audioSpeedBtn) {
      audioSpeedBtn.addEventListener('click', async () => {
        state.settings.slowAudio = !state.settings.slowAudio;
        updateAudioSpeedUI();
        await persistState();
        showToast(state.settings.slowAudio ? 'Mode audio pelan (0.75x) aktif untuk pemula.' : 'Kecepatan audio kembali normal (1x).', 'default');
      });
    }

    // Topbar theme toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        toggleThemeTwoState();
        if (currentView === 'settings') renderView();
      });
    }

    // Cross-tab theme sync
    global.addEventListener('storage', (ev) => {
      if (ev.key === 'color-scheme') {
        applyColorScheme(getStoredScheme());
        if (currentView === 'settings') renderView();
      }
    });

    // Click delegation across the entire document
    document.addEventListener('click', async (ev) => {
      const navEl = ev.target.closest('[data-nav]');
      if (navEl) {
        ev.preventDefault();
        navigate(navEl.getAttribute('data-nav'));
        return;
      }

      const speakEl = ev.target.closest('[data-speak]');
      if (speakEl) {
        speakText(speakEl.getAttribute('data-speak'), speakEl.getAttribute('data-speak-lang'), speakEl);
        return;
      }

      const actEl = ev.target.closest('[data-action]');
      if (!actEl) return;
      const action = actEl.getAttribute('data-action');

      switch (action) {
        case 'dash-filter':
          ui.dashFilter = actEl.getAttribute('data-val');
          renderView();
          break;
        case 'try-chip': {
          const w = actEl.getAttribute('data-word');
          ui.dashTryInput = w;
          const inp = document.getElementById('dash-phonetic-input');
          const out = document.getElementById('dash-phonetic-output');
          if (inp) inp.value = w;
          if (out) out.textContent = convertPhonetic(state.activeLang, w);
          break;
        }
        case 'jump-level':
          navigate('modules', { modLevel: actEl.getAttribute('data-level') });
          break;
        case 'open-lang-modules':
          navigate('modules', { lang: actEl.getAttribute('data-lang'), modLevel: 'ALL' });
          break;
        case 'open-lang-srs':
          navigate('flashcards', { lang: actEl.getAttribute('data-lang'), fcModule: 'ALL', fcDueOnly: true });
          break;
        case 'go-import':
          navigate('settings', { templateLang: actEl.getAttribute('data-lang') });
          break;
        case 'switch-lang':
          setActiveLang(actEl.getAttribute('data-lang'));
          break;
        case 'mod-level':
          ui.modLevel = actEl.getAttribute('data-level');
          renderView();
          break;
        case 'mod-status':
          ui.modStatus = actEl.getAttribute('data-val');
          renderView();
          break;
        case 'toggle-module-done': {
          const modId = actEl.getAttribute('data-mod');
          state.completedModules[state.activeLang] = state.completedModules[state.activeLang] || {};
          const wasDone = Boolean(state.completedModules[state.activeLang][modId]);
          if (wasDone) {
            delete state.completedModules[state.activeLang][modId];
            showToast('Status selesai modul dibatalkan.');
          } else {
            state.completedModules[state.activeLang][modId] = true;
            const log = Store.ensureDayLog(state, Store.getTodayKey(0));
            log.modules = (log.modules || 0) + 1;
            Store.addXP(state, state.activeLang, 25);
            showToast('Modul ditandai selesai! +25 XP dan progres harian bertambah.', 'success');
          }
          await persistState();
          renderChrome();
          renderView();
          break;
        }
        case 'mod-to-fc':
          navigate('flashcards', { fcModule: actEl.getAttribute('data-mod'), fcDueOnly: false });
          break;
        case 'mod-to-quiz':
          navigate('quiz', { quizModule: actEl.getAttribute('data-mod'), quizFilterIds: null });
          break;
        case 'mod-to-dialog':
          navigate('dialogs', { dialogModule: actEl.getAttribute('data-mod') });
          break;
        case 'open-add-card':
          openAddCardModal();
          break;
        case 'fc-toggle-due':
          ui.fcDueOnly = !ui.fcDueOnly;
          rebuildFlashcardQueue();
          renderView();
          break;
        case 'fc-show-all':
          ui.fcDueOnly = false;
          rebuildFlashcardQueue();
          renderView();
          break;
        case 'fc-flip':
          ui.fcFlipped = true;
          renderView();
          break;
        case 'fc-rate':
          await rateCurrentCard(Number(actEl.getAttribute('data-q')));
          break;
        case 'quiz-clear-drill':
          ui.quizFilterIds = null;
          ui.quizModule = 'ALL';
          rebuildQuizSession();
          renderView();
          break;
        case 'quiz-restart':
          rebuildQuizSession();
          renderView();
          break;
        case 'quiz-refresh-daily': {
          const dMeta = getDailyQuizMeta(state.activeLang);
          dMeta.nonce = (dMeta.nonce || 0) + 1;
          ui.quizFilterIds = null;
          rebuildQuizSession();
          await persistState();
          renderView(true);
          showToast(`Set soal baru (#${dMeta.nonce + 1}) siap dikerjakan.`, 'success');
          break;
        }
        case 'quiz-pick-opt':
          ui.quizSelectedOption = actEl.getAttribute('data-opt');
          renderView();
          break;
        case 'quiz-wo-add':
          ui.quizWordOrder.push(actEl.getAttribute('data-tok'));
          renderView();
          break;
        case 'quiz-wo-remove':
          ui.quizWordOrder.splice(Number(actEl.getAttribute('data-idx')), 1);
          renderView();
          break;
        case 'quiz-wo-clear':
          ui.quizWordOrder = [];
          renderView();
          break;
        case 'quiz-match-left':
          ui.quizMatchLeft = actEl.getAttribute('data-val');
          ui.quizMatchWrong = null;
          renderView();
          break;
        case 'quiz-match-right': {
          if (!ui.quizMatchLeft) {
            showToast('Pilih item di kolom kiri terlebih dahulu.');
            return;
          }
          const q = ui.quizList[ui.quizIdx];
          const rightVal = actEl.getAttribute('data-val');
          const targetPair = q.pairs.find((p) => p.left === ui.quizMatchLeft);
          if (targetPair && targetPair.right === rightVal) {
            ui.quizMatchPairs[ui.quizMatchLeft] = rightVal;
            ui.quizMatchLeft = null;
            ui.quizMatchWrong = null;
            if (Object.keys(ui.quizMatchPairs).length === q.pairs.length) {
              await recordQuizResult(true, q.explanation_id);
              return;
            }
          } else {
            ui.quizMatchWrong = rightVal;
            showToast('Pasangan belum cocok, coba lagi.', 'error');
          }
          renderView();
          break;
        }
        case 'quiz-check':
          checkCurrentQuiz();
          break;
        case 'quiz-next':
          if (ui.quizIdx + 1 < ui.quizList.length) {
            ui.quizIdx++;
            resetCurrentQuizQuestion();
          } else {
            ui.quizFinished = true;
            const dMeta = getDailyQuizMeta(state.activeLang);
            dMeta.setsDone = (dMeta.setsDone || 0) + 1;
            await persistState();
          }
          renderView();
          break;
        case 'dialog-role':
          ui.dialogRoleMode = actEl.getAttribute('data-val');
          ui.dialogRevealed = {};
          renderView();
          break;
        case 'dialog-toggle-romaji':
          ui.dialogShowRomaji = !ui.dialogShowRomaji;
          renderView();
          break;
        case 'dialog-toggle-trans':
          ui.dialogShowTrans = !ui.dialogShowTrans;
          renderView();
          break;
        case 'dialog-reveal':
          ui.dialogRevealed[actEl.getAttribute('data-key')] = true;
          renderView();
          break;
        case 'reading-mode':
          ui.readingMode = actEl.getAttribute('data-val');
          renderView();
          break;
        case 'reading-pick-token':
          ui.readingToken = {
            sIdx: Number(actEl.getAttribute('data-sidx')),
            tIdx: Number(actEl.getAttribute('data-tidx'))
          };
          renderView();
          if (global.innerWidth <= 1023) {
            requestAnimationFrame(() => {
              const insp = document.querySelector('#main-content .word-inspector');
              if (insp) openBottomSheet('Inspektor Kata', insp.innerHTML);
            });
          }
          break;
        case 'reading-save-srs': {
          const pack = getActivePack();
          const reading = pack && pack.readings.find((r) => r.id === ui.readingId);
          const sent = reading && ui.readingToken && reading.sentences[ui.readingToken.sIdx];
          const tok = sent && sent.tokens[ui.readingToken.tIdx];
          if (!pack || !tok) return;
          if (pack.flashcards.some((c) => c.front === tok.surface)) {
            showToast('Kata ini sudah ada di deck SRS Anda.');
            return;
          }
          pack.flashcards.unshift({
            id: `${state.activeLang}-read-${Date.now()}`,
            module_id: reading.module_id || (pack.modules[0] && pack.modules[0].id) || 'reading',
            level: reading.level || 'A1',
            category: 'bacaan',
            front: tok.surface,
            reading: tok.reading || tok.surface,
            romaji: tok.romaji || '',
            meaning_id: tok.meaning_id || '',
            mnemonic: `Disimpan dari bacaan "${reading.title}".`,
            example_native: sent.native,
            example_romaji: sent.romaji,
            example_id: sent.translation_id,
            srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
          });
          await persistState();
          rebuildFlashcardQueue();
          renderChrome();
          renderView();
          showToast(`"${tok.surface}" disimpan ke deck SRS.`, 'success');
          break;
        }
        case 'reading-comp':
          ui.readingCompAnswer = Number(actEl.getAttribute('data-idx'));
          renderView();
          break;
        case 'grammar-drill': {
          const ids = (actEl.getAttribute('data-ids') || '').split(',').filter(Boolean);
          navigate('quiz', { quizFilterIds: ids });
          break;
        }
        case 'dict-level':
          ui.dictLevel = actEl.getAttribute('data-level');
          ui.dictBatchIds = [];
          renderView();
          break;
        case 'dict-clear-filter':
          ui.dictQuery = '';
          ui.dictLevel = 'ALL';
          ui.dictBatchIds = [];
          renderView();
          break;
        case 'dict-toggle-read': {
          const id = actEl.getAttribute('data-id');
          state.readDictionaryIds = state.readDictionaryIds || {};
          state.readDictionaryIds[state.activeLang] = state.readDictionaryIds[state.activeLang] || {};
          const map = state.readDictionaryIds[state.activeLang];
          if (map[id]) {
            delete map[id];
          } else {
            map[id] = true;
            const log = Store.ensureDayLog(state, Store.getTodayKey(0));
            log.dictRead = (log.dictRead || 0) + 1;
          }
          await persistState();
          renderView();
          break;
        }
        case 'claim-mission': {
          const mId = actEl.getAttribute('data-id');
          const missions = Store.getDailyMissions(state);
          const targetM = missions.find((m) => m.id === mId);
          if (!targetM || targetM.claimed || targetM.current < targetM.target) return;
          const log = Store.ensureDayLog(state, Store.getTodayKey(0));
          log.claimedMissions[mId] = true;
          Store.addXP(state, state.activeLang, targetM.xp);
          await persistState();
          renderChrome();
          renderView();
          showToast(`Misi selesai! +${targetM.xp} XP ditambahkan.`, 'success');
          break;
        }
        case 'sprint-start':
          startSprint();
          break;
        case 'sprint-pause':
          ui.sprintPaused = !ui.sprintPaused;
          renderView();
          break;
        case 'sprint-stop':
          await finishSprint();
          break;
        case 'sprint-pick':
          answerSprint(actEl.getAttribute('data-opt'));
          break;
        case 'write-pick':
          ui.writeIndex = Number(actEl.getAttribute('data-idx')) || 0;
          ui.writeStrokes = [];
          renderView();
          break;
        case 'script-tab':
          ui.scriptTabId = actEl.getAttribute('data-tab');
          ui.scriptSelectedId = null;
          ui.scriptQuizQ = null;
          ui.scriptQuizPicked = null;
          renderView();
          break;
        case 'script-mode':
          ui.scriptMode = actEl.getAttribute('data-val');
          ui.scriptQuizQ = null;
          ui.scriptQuizPicked = null;
          renderView();
          break;
        case 'script-pick': {
          const cid = actEl.getAttribute('data-id');
          ui.scriptSelectedId = cid;
          const sData = SCRIPT_DATA && SCRIPT_DATA[state.activeLang];
          const tab = getActiveScriptTab(sData);
          const found = tab && tab.chars.find((c) => c.id === cid);
          renderView();
          if (found) speakText(extractSpeakableChar(found.char), state.activeLang);
          break;
        }
        case 'script-prev':
        case 'script-next': {
          const sData = SCRIPT_DATA && SCRIPT_DATA[state.activeLang];
          const tab = getActiveScriptTab(sData);
          if (!tab || !tab.chars.length) break;
          const curIdx = Math.max(0, tab.chars.findIndex((c) => c.id === ui.scriptSelectedId));
          const delta = action === 'script-next' ? 1 : -1;
          const nextIdx = Math.max(0, Math.min(tab.chars.length - 1, curIdx + delta));
          if (nextIdx !== curIdx) {
            ui.scriptSelectedId = tab.chars[nextIdx].id;
            renderView();
          }
          break;
        }
        case 'script-toggle-learned': {
          const cid = actEl.getAttribute('data-id');
          const wasUnlocked = Store.getScriptGateStatus(state, state.activeLang).unlocked;
          state.learnedChars = state.learnedChars || {};
          state.learnedChars[state.activeLang] = state.learnedChars[state.activeLang] || {};
          const map = state.learnedChars[state.activeLang];
          if (map[cid]) {
            delete map[cid];
          } else {
            map[cid] = true;
            Store.addXP(state, state.activeLang, 3);
            const nowUnlocked = Store.getScriptGateStatus(state, state.activeLang).unlocked;
            if (!wasUnlocked && nowUnlocked) {
              showToast(`Fondasi Aksara ${getCatalogMeta(state.activeLang).name_id} terbuka! Semua modul & latihan siap diakses.`, 'achievement');
            } else {
              showToast('Huruf ditandai hafal (+3 XP).', 'success');
            }
          }
          await persistState();
          renderChrome();
          renderView();
          break;
        }
        case 'script-gate-bypass': {
          state.scriptGateBypassed = state.scriptGateBypassed || {};
          state.scriptGateBypassed[state.activeLang] = true;
          await persistState();
          renderChrome();
          renderView(true);
          showToast(`Kunci aksara ${getCatalogMeta(state.activeLang).name_id} dibuka. Selamat belajar!`, 'success');
          break;
        }
        case 'script-gate-restore': {
          if (state.scriptGateBypassed) delete state.scriptGateBypassed[state.activeLang];
          await persistState();
          renderChrome();
          renderView();
          showToast('Kunci bertahap aksara diaktifkan kembali.', 'default');
          break;
        }
        case 'script-to-write': {
          const cid = actEl.getAttribute('data-id');
          const sData = SCRIPT_DATA && SCRIPT_DATA[state.activeLang];
          const tab = getActiveScriptTab(sData);
          const found = tab && tab.chars.find((c) => c.id === cid);
          if (found) {
            ui.writeCustomItem = {
              id: found.id,
              level: 'A0',
              front: extractSpeakableChar(found.char),
              romaji: found.romaji,
              meaning_id: found.tip
            };
            ui.writeIndex = 0;
            ui.writeStrokes = [];
            navigate('writing');
          }
          break;
        }
        case 'script-quiz-pick': {
          if (!ui.scriptQuizQ || ui.scriptQuizPicked !== null) return;
          const opt = actEl.getAttribute('data-opt');
          ui.scriptQuizPicked = opt;
          if (opt === ui.scriptQuizQ.target.romaji) {
            ui.scriptQuizStreak++;
            if (ui.scriptQuizStreak % 5 === 0) {
              Store.addXP(state, state.activeLang, 5);
              await persistState();
              renderChrome();
              showToast('5 tebakan huruf benar beruntun! +5 XP.', 'success');
            }
          } else {
            ui.scriptQuizStreak = 0;
          }
          renderView();
          break;
        }
        case 'script-quiz-next': {
          const sData = SCRIPT_DATA && SCRIPT_DATA[state.activeLang];
          const tab = getActiveScriptTab(sData);
          ui.scriptQuizQ = buildScriptQuizQuestion(tab);
          ui.scriptQuizPicked = null;
          renderView();
          break;
        }
        case 'write-toggle-ghost':
          ui.writeShowGhost = !ui.writeShowGhost;
          renderView();
          break;
        case 'write-undo':
          ui.writeStrokes.pop();
          redrawWritingCanvas(document.getElementById('writing-canvas'));
          break;
        case 'write-clear':
          ui.writeStrokes = [];
          redrawWritingCanvas(document.getElementById('writing-canvas'));
          break;
        case 'write-prev': {
          const items = getWritingItems(getActivePack());
          if (items.length) {
            ui.writeIndex = (ui.writeIndex - 1 + items.length) % items.length;
            ui.writeStrokes = [];
            renderView();
          }
          break;
        }
        case 'write-done': {
          const items = getWritingItems(getActivePack());
          const cur = items[ui.writeIndex];
          if (cur) {
            state.canvasPracticedIds = state.canvasPracticedIds || {};
            state.canvasPracticedIds[state.activeLang] = state.canvasPracticedIds[state.activeLang] || {};
            state.canvasPracticedIds[state.activeLang][cur.id] = true;
            const log = Store.ensureDayLog(state, Store.getTodayKey(0));
            log.canvasCount = (log.canvasCount || 0) + 1;
            Store.addXP(state, state.activeLang, 5);
            await persistState();
            ui.writeIndex = (ui.writeIndex + 1) % items.length;
            ui.writeStrokes = [];
            renderChrome();
            renderView();
            showToast(`Latihan "${cur.front}" tercatat (+5 XP).`, 'success');
          }
          break;
        }
        case 'dict-refresh':
          await refreshDictionaryBatch();
          break;
        case 'dict-reset-read': {
          state.readDictionaryIds = state.readDictionaryIds || {};
          state.readDictionaryIds[state.activeLang] = {};
          ui.dictBatchIds = [];
          await persistState();
          renderView();
          showToast('Status dibaca kamus direset. Semua kosakata siap dibaca ulang.', 'success');
          break;
        }
        case 'activate-freeze': {
          const today = Store.getTodayKey(0);
          const weekKey = Store.getWeekKey(today);
          if (state.freezesUsedByWeek[weekKey]) {
            showToast('Kuota Streak Freeze minggu ini sudah terpakai.', 'error');
            return;
          }
          state.freezesUsedByWeek[weekKey] = true;
          const log = Store.ensureDayLog(state, today);
          log.frozen = true;
          await persistState();
          renderChrome();
          renderView();
          showToast('Streak Freeze diaktifkan untuk hari ini.', 'success');
          break;
        }
        case 'set-theme':
          setColorSchemePreference(actEl.getAttribute('data-val'));
          renderView();
          break;
        case 'download-template': {
          const sel = document.getElementById('template-lang-select');
          const code = sel ? sel.value : ui.settingsTemplateLang;
          const tpl = buildJsonTemplate(code);
          downloadJsonFile(`lingolokal_template_${code}_v1.json`, tpl);
          showToast(`Template JSON bahasa ${getCatalogMeta(code).name_id} diunduh.`, 'success');
          break;
        }
        case 'export-backup':
          downloadJsonFile(`lingolokal_backup_${Store.getTodayKey(0)}.json`, state);
          showToast('Backup JSON berhasil diunduh.', 'success');
          break;
        case 'open-reset-modal': {
          const dlg = document.getElementById('modal-reset');
          if (dlg) dlg.showModal();
          break;
        }
        // --- Mobile Drawer trigger from Bottom Nav ---
        case 'open-drawer':
          if (global.LingoDrawer) global.LingoDrawer.open();
          break;
        case 'open-catalog-sheet': {
          const menu = document.getElementById('topbar-lang-menu') || document.getElementById('sidebar-lang-menu');
          if (menu) openBottomSheet('Jelajah 11 Bahasa', `<div class="bottom-sheet-lang-list">${menu.innerHTML}</div>`);
          break;
        }
        case 'open-onboarding':
          openOnboardingModal(true);
          break;
        case 'pwa-install':
          if (deferredInstallPrompt) {
            deferredInstallPrompt.prompt();
            try {
              const choice = await deferredInstallPrompt.userChoice;
              if (choice && choice.outcome === 'accepted') {
                showToast('LingoLokal berhasil ditambahkan ke perangkat Anda!', 'success');
              }
            } catch (_e) {}
            deferredInstallPrompt = null;
            renderView();
          }
          break;
        // --- Skill Tree ---
        case 'mod-view-mode':
          ui.modViewMode = actEl.getAttribute('data-val') || 'tree';
          renderView();
          break;
        case 'tree-select-node':
          ui.treeSelectedId = actEl.getAttribute('data-mod');
          renderView();
          if (global.innerWidth <= 1023) {
            requestAnimationFrame(() => {
              const panel = document.querySelector('#main-content .tree-detail-panel');
              if (panel) openBottomSheet('Detail Modul', panel.innerHTML);
            });
          }
          break;
        // --- Sentence Mining ---
        case 'fc-toggle-mined':
          ui.fcMinedOnly = !ui.fcMinedOnly;
          if (ui.fcMinedOnly) ui.fcDueOnly = false;
          rebuildFlashcardQueue();
          renderView();
          break;
        case 'open-mine-custom':
          openMineSentenceModal({ mnemonic: 'Teks tambang pribadi (i+1).' });
          break;
        case 'mine-from-reading': {
          const pack = getActivePack();
          const reading = pack && pack.readings.find((r) => r.id === ui.readingId);
          const sent = reading && ui.readingToken && reading.sentences[ui.readingToken.sIdx];
          const tok = sent && sent.tokens[ui.readingToken.tIdx];
          if (tok && sent) {
            openMineSentenceModal({
              front: tok.surface,
              romaji: tok.romaji || tok.reading || '',
              meaning_id: tok.meaning_id || '',
              example_native: sent.native || '',
              example_id: sent.translation_id || '',
              mnemonic: `Ditambang dari bacaan: ${reading.title}`
            });
          }
          break;
        }
        case 'mine-from-dialog': {
          const pack = getActivePack();
          const activeDialog = pack && pack.dialogs.find((d) => d.id === ui.dialogId);
          const idx = Number(actEl.getAttribute('data-idx'));
          const line = activeDialog && activeDialog.lines[idx];
          if (line) {
            const firstToken = String(line.native || '').split(/\s+/)[0] || line.native;
            openMineSentenceModal({
              front: firstToken,
              romaji: line.romaji || '',
              meaning_id: line.translation_id || '',
              example_native: line.native || '',
              example_id: line.translation_id || '',
              mnemonic: `Ditambang dari dialog: ${activeDialog.title}`
            });
          }
          break;
        }
        // --- Conjugation Trainer ---
        case 'conj-filter-form':
          ui.conjForm = actEl.getAttribute('data-form') || 'ALL';
          ui.conjIdx = 0;
          ui.conjPicked = null;
          ui.conjTyped = '';
          ui.conjShowRule = false;
          renderView();
          break;
        case 'conj-mode':
          ui.conjMode = actEl.getAttribute('data-val') || 'choice';
          ui.conjPicked = null;
          ui.conjTyped = '';
          renderView();
          break;
        case 'conj-toggle-rule':
          ui.conjShowRule = !ui.conjShowRule;
          renderView();
          break;
        case 'conj-pick': {
          const list = getFilteredConjugations();
          const item = list[ui.conjIdx];
          if (!item || ui.conjPicked !== null) break;
          const val = actEl.getAttribute('data-val') || '';
          ui.conjPicked = val;
          const ok = val.toLowerCase().trim() === item.answer.toLowerCase().trim();
          state.conjugationStats = state.conjugationStats || {};
          const st = state.conjugationStats[state.activeLang] || { total: 0, correct: 0, bestStreak: 0 };
          st.total++;
          if (ok) {
            st.correct++;
            ui.conjStreak++;
            if (ui.conjStreak > st.bestStreak) st.bestStreak = ui.conjStreak;
            Store.addXP(state, state.activeLang, 8);
          } else {
            ui.conjStreak = 0;
          }
          state.conjugationStats[state.activeLang] = st;
          await persistState();
          renderChrome();
          renderView();
          break;
        }
        case 'conj-next': {
          const list = getFilteredConjugations();
          ui.conjIdx = list.length ? (ui.conjIdx + 1) % list.length : 0;
          ui.conjPicked = null;
          ui.conjTyped = '';
          ui.conjShowRule = false;
          renderView();
          break;
        }
        // --- Exam Strategy & Mini Try-Out ---
        case 'exam-start':
          startExamTryout();
          break;
        case 'exam-cancel':
          stopExamTimer();
          ui.examTryoutActive = false;
          renderView();
          break;
        case 'exam-pick':
          ui.examTryoutAnswers[ui.examTryoutIdx] = actEl.getAttribute('data-val');
          renderView();
          break;
        case 'exam-prev':
          ui.examTryoutIdx = Math.max(0, ui.examTryoutIdx - 1);
          renderView();
          break;
        case 'exam-next':
          ui.examTryoutIdx = Math.min(ui.examTryoutQuestions.length - 1, ui.examTryoutIdx + 1);
          renderView();
          break;
        case 'exam-submit':
          await finishExamTryout();
          break;
        // --- Study Plan ---
        case 'plan-opt-goal':
          ui.planGoal = actEl.value || 'conversation';
          renderView();
          break;
        case 'plan-toggle-task': {
          const plan = state.studyPlans && state.studyPlans[state.activeLang];
          const tid = actEl.getAttribute('data-tid');
          if (plan && tid) {
            plan.completedTasks = plan.completedTasks || {};
            const nowDone = !plan.completedTasks[tid];
            plan.completedTasks[tid] = nowDone;
            if (nowDone) Store.addXP(state, state.activeLang, 10);
            await persistState();
            renderChrome();
            renderView();
          }
          break;
        }
        case 'plan-shift-today': {
          const plan = state.studyPlans && state.studyPlans[state.activeLang];
          if (plan) {
            plan.startDate = Store.getTodayKey(0);
            await persistState();
            showToast('Tanggal mulai rencana belajar disesuaikan ke hari ini.', 'success');
            renderView();
          }
          break;
        }
        case 'plan-reset': {
          if (state.studyPlans) delete state.studyPlans[state.activeLang];
          await persistState();
          renderView();
          break;
        }
        // --- Achievements Category Filter ---
        case 'ach-cat':
          ui.achCategory = actEl.getAttribute('data-cat') || 'ALL';
          renderView();
          break;
      }

      if (ev.target.closest('#dash-phonetic-speak')) {
        const out = document.getElementById('dash-phonetic-output');
        if (out && out.textContent.trim()) {
          speakText(out.textContent.trim(), state.activeLang);
        }
      }
    });

    // Input & Change delegation inside #main-content
    const main = document.getElementById('main-content');
    const updateHeatDetail = (ev) => {
      const cell = ev.target.closest('[data-heat-tip]');
      if (!cell) return;
      const box = document.getElementById('heatmap-detail');
      if (box) box.textContent = cell.getAttribute('data-heat-tip');
    };
    main.addEventListener('mouseover', updateHeatDetail);
    main.addEventListener('focusin', updateHeatDetail);
    main.addEventListener('input', (ev) => {
      const id = ev.target.id;
      if (id === 'dash-phonetic-input') {
        ui.dashTryInput = ev.target.value;
        const out = document.getElementById('dash-phonetic-output');
        if (out) out.textContent = convertPhonetic(state.activeLang, ui.dashTryInput);
      } else if (id === 'mod-search') {
        ui.modQuery = ev.target.value;
        renderView();
        const el = document.getElementById('mod-search');
        if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
      } else if (id === 'grammar-search') {
        ui.grammarQuery = ev.target.value;
        renderView();
        const el = document.getElementById('grammar-search');
        if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
      } else if (id === 'dict-search') {
        ui.dictQuery = ev.target.value;
        ui.dictBatchIds = [];
        renderView();
        const el = document.getElementById('dict-search');
        if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
      } else if (id === 'quiz-trans-input') {
        ui.quizTranslationText = ev.target.value;
        const prev = document.getElementById('quiz-phonetic-preview');
        if (prev) prev.textContent = convertPhonetic(state.activeLang, ui.quizTranslationText) || '...';
      } else if (id === 'conj-type-input') {
        ui.conjTyped = ev.target.value;
      }
    });

    main.addEventListener('change', async (ev) => {
      const id = ev.target.id;
      if (id === 'fc-module-select') {
        ui.fcModule = ev.target.value;
        rebuildFlashcardQueue();
        renderView();
      } else if (id === 'script-jump-select') {
        ui.scriptSelectedId = ev.target.value;
        renderView();
      } else if (id === 'quiz-mod-select') {
        ui.quizModule = ev.target.value;
        ui.quizFilterIds = null;
        rebuildQuizSession();
        renderView();
      } else if (id === 'dialog-select') {
        ui.dialogId = ev.target.value;
        ui.dialogRevealed = {};
        renderView();
      } else if (id === 'reading-select') {
        ui.readingId = ev.target.value;
        ui.readingToken = null;
        ui.readingCompAnswer = null;
        renderView();
      } else if (id === 'template-lang-select') {
        ui.settingsTemplateLang = ev.target.value;
      } else if (id === 'input-import-pack') {
        const file = ev.target.files && ev.target.files[0];
        if (!file) return;
        try {
          const text = await file.text();
          const json = JSON.parse(text);
          const res = Store.mergePack(state, json);
          await persistState();
          renderChrome();
          const langName = getCatalogMeta(res.code).name_id;
          showToast(`Paket ${langName} berhasil diimpor (+${res.added.modules} modul, +${res.added.flashcards} kartu).`, 'success');
          setActiveLang(res.code);
        } catch (err) {
          showToast(err.message || 'Gagal membaca file JSON paket materi.', 'error');
        }
        ev.target.value = '';
      } else if (id === 'input-restore-backup') {
        const file = ev.target.files && ev.target.files[0];
        if (!file) return;
        try {
          const text = await file.text();
          const json = JSON.parse(text);
          if (!json || !json.packs || !json.settings) {
            throw new Error('File backup tidak sesuai format LingoLokal.');
          }
          state = json;
          await persistState();
          resetViewStateForLang();
          renderChrome();
          renderView();
          showToast('Backup berhasil dipulihkan.', 'success');
        } catch (err) {
          showToast(err.message || 'Gagal memulihkan backup JSON.', 'error');
        }
        ev.target.value = '';
      }
    });

    main.addEventListener('submit', async (ev) => {
      if (ev.target.id === 'form-daily-targets') {
        ev.preventDefault();
        const fd = new FormData(ev.target);
        state.settings.targetMinutes = Math.max(5, Math.min(240, Number(fd.get('targetMinutes')) || 20));
        state.settings.targetCards = Math.max(5, Math.min(200, Number(fd.get('targetCards')) || 20));
        state.settings.targetModules = Math.max(1, Math.min(10, Number(fd.get('targetModules')) || 1));
        await persistState();
        renderChrome();
        showToast('Target harian berhasil diperbarui.', 'success');
      } else if (ev.target.id === 'form-create-plan') {
        ev.preventDefault();
        const pack = getActivePack();
        if (!pack) return;
        const fd = new FormData(ev.target);
        const goal = String(fd.get('goal') || ui.planGoal || 'conversation');
        const dailyMinutes = Number(fd.get('dailyMinutes')) || 20;
        const totalDays = Number(fd.get('totalDays')) || 14;
        ui.planGoal = goal;
        ui.planMinutes = dailyMinutes;
        ui.planDays = totalDays;
        state.studyPlans = state.studyPlans || {};
        state.studyPlans[state.activeLang] = Store.generateStudyPlan(state.activeLang, pack, { goal, dailyMinutes, totalDays });
        await persistState();
        showToast(`Rencana belajar ${totalDays} hari berhasil disusun.`, 'success');
        renderView(true);
      } else if (ev.target.id === 'form-conj-type') {
        ev.preventDefault();
        const list = getFilteredConjugations();
        const item = list[ui.conjIdx];
        if (!item || ui.conjPicked !== null) return;
        const val = String(ui.conjTyped || '').trim();
        if (!val) {
          showToast('Ketik jawaban Anda terlebih dahulu.', 'error');
          return;
        }
        ui.conjPicked = val;
        const ok = val.toLowerCase() === item.answer.toLowerCase().trim() || val.toLowerCase() === String(item.romaji || '').toLowerCase().trim();
        state.conjugationStats = state.conjugationStats || {};
        const st = state.conjugationStats[state.activeLang] || { total: 0, correct: 0, bestStreak: 0 };
        st.total++;
        if (ok) {
          st.correct++;
          ui.conjStreak++;
          if (ui.conjStreak > st.bestStreak) st.bestStreak = ui.conjStreak;
          Store.addXP(state, state.activeLang, 8);
        } else {
          ui.conjStreak = 0;
        }
        state.conjugationStats[state.activeLang] = st;
        await persistState();
        renderChrome();
        renderView();
      }
    });

    // Keyboard Shortcuts for Flashcard SRS (Space = flip, 1-4 = rate, A = audio) & Sprint (1-4)
    document.addEventListener('keydown', (ev) => {
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (document.querySelector('dialog[open]')) return;

      if (currentView === 'sprint' && ui.sprintActive && !ui.sprintPaused && ui.sprintQuestion) {
        if (['1', '2', '3', '4'].includes(ev.key)) {
          const idx = Number(ev.key) - 1;
          const opt = ui.sprintQuestion.options[idx];
          if (opt) {
            ev.preventDefault();
            answerSprint(opt);
          }
        }
        return;
      }

      if (currentView !== 'flashcards') return;

      if (ev.code === 'Space' && !ui.fcFlipped && ui.fcQueue.length > 0) {
        ev.preventDefault();
        ui.fcFlipped = true;
        renderView();
      } else if (ev.key.toLowerCase() === 'a' && ui.fcQueue.length > 0) {
        const pack = getActivePack();
        const card = pack && pack.flashcards.find((c) => c.id === ui.fcQueue[ui.fcIndex]);
        if (card) speakText(card.front);
      } else if (ui.fcFlipped && ['1', '2', '3', '4'].includes(ev.key)) {
        ev.preventDefault();
        const map = { '1': 1, '2': 3, '3': 4, '4': 5 };
        rateCurrentCard(map[ev.key]);
      }
    });
  }

  // --- 20-Second First-Time Onboarding Wizard ---
  const obState = { step: 1, lang: 'ja', level: 'beginner', minutes: 20 };

  function renderOnboardingStep() {
    const box = document.getElementById('onboarding-content');
    if (!box) return;
    const selMeta = getCatalogMeta(obState.lang);
    const isNonLatin = Boolean(SCRIPT_DATA && SCRIPT_DATA[obState.lang]);

    let bodyHtml = '';
    if (obState.step === 1) {
      bodyHtml = `
        <p class="kpi-label" style="margin-bottom:12px;">Langkah 1 dari 3 · Pilih bahasa utama yang ingin kamu mulai hari ini:</p>
        <div class="onboarding-lang-grid">
          ${LANGUAGE_CATALOG.map((l) => `
            <button type="button" class="ob-choice-btn ${obState.lang === l.code ? 'active' : ''}" data-ob-lang="${esc(l.code)}">
              <span class="ob-stamp">${esc(l.stamp)}</span>
              <span><strong>${esc(l.name_id)}</strong><small>${esc(l.name_native)}</small></span>
            </button>
          `).join('')}
        </div>
        <div class="dialog-actions">
          <button type="button" class="btn-ghost" data-ob-skip="1">Lewati</button>
          <button type="button" class="btn-primary" data-ob-next="2">Lanjut →</button>
        </div>
      `;
    } else if (obState.step === 2) {
      bodyHtml = `
        <p class="kpi-label" style="margin-bottom:12px;">Langkah 2 dari 3 · Seberapa akrab kamu dengan bahasa <strong>${esc(selMeta.name_id)}</strong>?</p>
        <div class="onboarding-choice-grid">
          <button type="button" class="ob-choice-btn ${obState.level === 'beginner' ? 'active' : ''}" data-ob-level="beginner">
            <strong>Pemula dari Nol</strong>
            <small>${isNonLatin ? 'Mulai pelan dari Kartu Aksara dasar dulu.' : 'Mulai dari sapaan inti & kartu hafalan dasar.'}</small>
          </button>
          <button type="button" class="ob-choice-btn ${obState.level === 'basic' ? 'active' : ''}" data-ob-level="basic">
            <strong>Sudah Bisa Baca Dasar</strong>
            <small>${isNonLatin ? 'Langsung buka semua modul, Quiz, dan Kartu Hafalan.' : 'Langsung masuk ke latihan kosakata & percakapan.'}</small>
          </button>
        </div>
        <div class="dialog-actions">
          <button type="button" class="btn-secondary" data-ob-next="1">← Kembali</button>
          <button type="button" class="btn-primary" data-ob-next="3">Lanjut →</button>
        </div>
      `;
    } else {
      bodyHtml = `
        <p class="kpi-label" style="margin-bottom:12px;">Langkah 3 dari 3 · Berapa menit waktu belajar harianmu?</p>
        <div class="onboarding-choice-grid">
          ${[
            { m: 10, t: '10 menit / hari', s: 'Santai, cocok untuk sela-sela aktivitas' },
            { m: 20, t: '20 menit / hari (Disarankan)', s: 'Ritme ideal untuk hafalan & quiz rutin' },
            { m: 30, t: '30 menit / hari', s: 'Intensif, progres cepat dalam 14 hari' }
          ].map((opt) => `
            <button type="button" class="ob-choice-btn ${obState.minutes === opt.m ? 'active' : ''}" data-ob-min="${opt.m}">
              <strong>${opt.t}</strong>
              <small>${opt.s}</small>
            </button>
          `).join('')}
        </div>
        <div class="dialog-actions">
          <button type="button" class="btn-secondary" data-ob-next="2">← Kembali</button>
          <button type="button" class="btn-primary" data-ob-finish="1">Mulai Belajar ${esc(selMeta.name_id)}</button>
        </div>
      `;
    }

    box.innerHTML = `
      <div class="dialog-head">
        <h2 id="onboarding-title">Atur Ruang Belajarmu (20 Detik)</h2>
        <button type="button" class="icon-btn" data-ob-skip="1" aria-label="Tutup panduan awal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      ${bodyHtml}
    `;
  }

  function openOnboardingModal(force = false) {
    const dlg = document.getElementById('modal-onboarding');
    if (!dlg || (!force && state && state.onboardingDone)) return;
    obState.step = 1;
    obState.lang = (state && state.activeLang) || 'ja';
    obState.level = 'beginner';
    obState.minutes = (state && state.settings && state.settings.targetMinutes) || 20;
    renderOnboardingStep();
    if (!dlg.open) dlg.showModal();
  }

  function bindOnboardingEvents() {
    const dlg = document.getElementById('modal-onboarding');
    if (!dlg) return;
    dlg.addEventListener('click', async (ev) => {
      const langBtn = ev.target.closest('[data-ob-lang]');
      if (langBtn) {
        obState.lang = langBtn.getAttribute('data-ob-lang');
        renderOnboardingStep();
        return;
      }
      const lvlBtn = ev.target.closest('[data-ob-level]');
      if (lvlBtn) {
        obState.level = lvlBtn.getAttribute('data-ob-level');
        renderOnboardingStep();
        return;
      }
      const minBtn = ev.target.closest('[data-ob-min]');
      if (minBtn) {
        obState.minutes = Number(minBtn.getAttribute('data-ob-min')) || 20;
        renderOnboardingStep();
        return;
      }
      const nextBtn = ev.target.closest('[data-ob-next]');
      if (nextBtn) {
        obState.step = Number(nextBtn.getAttribute('data-ob-next')) || 1;
        renderOnboardingStep();
        return;
      }
      if (ev.target.closest('[data-ob-skip]')) {
        state.onboardingDone = true;
        await persistState();
        if (dlg.open) dlg.close();
        return;
      }
      if (ev.target.closest('[data-ob-finish]')) {
        state.activeLang = obState.lang;
        state.settings.targetMinutes = obState.minutes;
        state.onboardingDone = true;
        const isNonLatin = Boolean(SCRIPT_DATA && SCRIPT_DATA[obState.lang]);
        if (isNonLatin && obState.level === 'basic') {
          state.scriptGateBypassed = state.scriptGateBypassed || {};
          state.scriptGateBypassed[obState.lang] = true;
        }
        const pack = state.packs[obState.lang];
        if (pack) {
          state.studyPlans = state.studyPlans || {};
          state.studyPlans[obState.lang] = Store.generateStudyPlan(obState.lang, pack, {
            goal: 'conversation',
            dailyMinutes: obState.minutes,
            totalDays: 14
          });
        }
        resetViewStateForLang();
        await persistState();
        if (dlg.open) dlg.close();
        const startView = (isNonLatin && obState.level === 'beginner') ? 'alphabet' : 'dashboard';
        navigate(startView);
        showToast(`Ruang belajar ${getCatalogMeta(obState.lang).name_id} siap (${obState.minutes} mnt/hari)!`, 'success');
      }
    });
  }

  function initPwaSupport() {
    global.addEventListener('beforeinstallprompt', (ev) => {
      ev.preventDefault();
      deferredInstallPrompt = ev;
      if (currentView === 'settings') renderView();
    });
    global.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      if (currentView === 'settings') renderView();
    });
    global.addEventListener('offline', () => {
      showToast('Mode Offline aktif. Semua materi & progres tetap aman tersimpan lokal.', 'default');
    });
    global.addEventListener('online', () => {
      showToast('Koneksi kembali online.', 'success');
    });
    const isHttp = global.location && (global.location.protocol === 'http:' || global.location.protocol === 'https:');
    if (isHttp && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
        .then(() => {
          swRegistered = true;
          if (currentView === 'settings') renderView();
        })
        .catch(() => {});
    }
  }

  // --- Bootstrap ---
  async function init() {
    applyColorScheme(getStoredScheme());
    initMobileDrawer();
    initDialogs();
    bindGlobalEvents();
    bindOnboardingEvents();
    initPwaSupport();

    state = await Store.loadState();
    Store.detectNewlyUnlockedAchievements(state);
    appReady = true;
    resetViewStateForLang();
    renderChrome();
    renderView(true);
    startStudyTimer();
    if (!state.onboardingDone) {
      requestAnimationFrame(() => openOnboardingModal(false));
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
