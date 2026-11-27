/* LingoLokal: Persistent Local Storage (IndexedDB + localStorage fallback), SM-2 SRS, Dual-Rule Streak, and JSON Merger */
(function (global) {
  'use strict';

  const DB_NAME = 'LingoLokalDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'appState';
  const STATE_KEY = 'main';
  const LS_KEY = 'lingolokal_state_v1';

  function getTodayKey(offsetDays = 0) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    if (offsetDays) d.setDate(d.getDate() + offsetDays);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function getWeekKey(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    const dayOfWeek = (dt.getDay() + 6) % 7; // Mon=0..Sun=6
    dt.setDate(dt.getDate() - dayOfWeek);
    const wy = dt.getFullYear();
    const wm = String(dt.getMonth() + 1).padStart(2, '0');
    const wd = String(dt.getDate()).padStart(2, '0');
    return `${wy}-${wm}-${wd}`;
  }

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function applyBuiltInPacks(targetState) {
    const extras = (global.LingoData && Array.isArray(global.LingoData.EXTRA_PACKS))
      ? global.LingoData.EXTRA_PACKS
      : [];
    extras.forEach((pack) => {
      try {
        mergePack(targetState, deepClone(pack));
      } catch (_err) {
        // Ignore malformed pack
      }
    });
    return targetState;
  }

  function createInitialState() {
    const initial = {
      version: '1.0',
      activeLang: 'ja',
      settings: {
        targetMinutes: 20,
        targetCards: 20,
        targetModules: 1,
        slowAudio: false
      },
      onboardingDone: false,
      // Clean user history: 0 minutes, 0 streak, 0 completed modules
      completedModules: {}, // { [langCode]: { [moduleId]: true } }
      readDictionaryIds: {}, // { [langCode]: { [cardId]: true } }
      xpByLang: {},          // { [langCode]: number }
      sprintBestByLang: {},  // { [langCode]: { bestScore: 0, rounds: 0 } }
      canvasPracticedIds: {}, // { [langCode]: { [cardId]: true } }
      learnedChars: {},      // { [langCode]: { [charId]: true } }
      scriptGateBypassed: {}, // { [langCode]: true }
      proficiencyByLang: {}, // { [langCode]: 'beginner' | 'intermediate' | 'advanced' }
      studyPlans: {},        // { [langCode]: { goal, dailyMinutes, totalDays, startDate, days: [...], completedTasks: {} } }
      conjugationStats: {},  // { [langCode]: { total: 0, correct: 0, bestStreak: 0 } }
      examHistory: {},       // { [langCode]: [{ date, score, total, durationSec }] }
      minedCardIds: {},      // { [langCode]: { [cardId]: true } }
      dailyQuizMeta: {},     // { [langCode]: { date: 'YYYY-MM-DD', nonce: 0, setsDone: 0 } }
      unlockedAchievements: {}, // { [achievementId]: 'YYYY-MM-DD' }
      dailyLogs: {},        // { 'YYYY-MM-DD': { seconds: 0, cards: 0, modules: 0, quizTotal: 0, quizCorrect: 0, dictRead: 0, sprintPlayed: 0, canvasCount: 0, claimedMissions: {}, frozen: false } }
      bestStreak: 0,
      freezesUsedByWeek: {}, // { 'YYYY-MM-DD(monday)': true }
      packs: {
        ja: deepClone(global.LingoData.PACK_JA),
        ko: deepClone(global.LingoData.PACK_KO)
      }
    };
    return applyBuiltInPacks(initial);
  }

  // --- IndexedDB helpers with localStorage fallback ---
  function openDB() {
    return new Promise((resolve, reject) => {
      try {
        if (!('indexedDB' in global)) {
          reject(new Error('IndexedDB tidak tersedia'));
          return;
        }
        const req = global.indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (ev) => {
          const db = ev.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error || new Error('Gagal membuka IndexedDB'));
      } catch (err) {
        reject(err);
      }
    });
  }

  async function loadState() {
    try {
      const db = await openDB();
      const loaded = await new Promise((resolve, reject) => {
        try {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const req = store.get(STATE_KEY);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => reject(req.error);
        } catch (err) {
          reject(err);
        }
      });
      if (loaded && loaded.packs) {
        return hydrateState(loaded);
      }
    } catch (_err) {
      // Fallback to localStorage below
    }

    try {
      const raw = global.localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.packs) {
          return hydrateState(parsed);
        }
      }
    } catch (_err) {
      // Ignore storage errors and return clean state
    }

    const fresh = createInitialState();
    await saveState(fresh);
    return fresh;
  }

  async function saveState(state) {
    let savedToIdb = false;
    try {
      const db = await openDB();
      await new Promise((resolve, reject) => {
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const req = store.put(state, STATE_KEY);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        } catch (err) {
          reject(err);
        }
      });
      savedToIdb = true;
    } catch (_err) {
      savedToIdb = false;
    }

    try {
      global.localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (_err) {
      // localStorage might be full or blocked
    }
    return savedToIdb;
  }

  function hydrateState(loaded) {
    const base = createInitialState();
    const merged = {
      ...base,
      ...loaded,
      settings: { ...base.settings, ...(loaded.settings || {}) },
      completedModules: loaded.completedModules || {},
      readDictionaryIds: loaded.readDictionaryIds || {},
      xpByLang: loaded.xpByLang || {},
      sprintBestByLang: loaded.sprintBestByLang || {},
      canvasPracticedIds: loaded.canvasPracticedIds || {},
      learnedChars: loaded.learnedChars || {},
      scriptGateBypassed: loaded.scriptGateBypassed || {},
      proficiencyByLang: loaded.proficiencyByLang || {},
      studyPlans: loaded.studyPlans || {},
      conjugationStats: loaded.conjugationStats || {},
      examHistory: loaded.examHistory || {},
      minedCardIds: loaded.minedCardIds || {},
      dailyQuizMeta: loaded.dailyQuizMeta || {},
      unlockedAchievements: loaded.unlockedAchievements || {},
      dailyLogs: loaded.dailyLogs || {},
      freezesUsedByWeek: loaded.freezesUsedByWeek || {},
      packs: { ...base.packs, ...(loaded.packs || {}) }
    };
    if (!merged.packs.ja) merged.packs.ja = deepClone(global.LingoData.PACK_JA);
    if (!merged.packs.ko) merged.packs.ko = deepClone(global.LingoData.PACK_KO);
    if (typeof loaded.onboardingDone !== 'boolean') {
      const hasXp = Object.values(merged.xpByLang || {}).some((v) => v > 0);
      const hasChars = Object.values(merged.learnedChars || {}).some((m) => m && Object.keys(m).length > 0);
      const hasMods = Object.values(merged.completedModules || {}).some((m) => m && Object.keys(m).length > 0);
      merged.onboardingDone = hasXp || hasChars || hasMods;
    }
    return applyBuiltInPacks(merged);
  }

  function ensureDayLog(state, dateKey) {
    if (!state.dailyLogs[dateKey]) {
      state.dailyLogs[dateKey] = {
        seconds: 0,
        cards: 0,
        modules: 0,
        quizTotal: 0,
        quizCorrect: 0,
        dictRead: 0,
        sprintPlayed: 0,
        canvasCount: 0,
        claimedMissions: {},
        frozen: false
      };
    } else {
      const l = state.dailyLogs[dateKey];
      if (typeof l.dictRead !== 'number') l.dictRead = 0;
      if (typeof l.sprintPlayed !== 'number') l.sprintPlayed = 0;
      if (typeof l.canvasCount !== 'number') l.canvasCount = 0;
      if (!l.claimedMissions) l.claimedMissions = {};
    }
    return state.dailyLogs[dateKey];
  }

  function addXP(state, langCode, amount) {
    if (!state || !langCode || !amount) return 0;
    state.xpByLang = state.xpByLang || {};
    state.xpByLang[langCode] = (state.xpByLang[langCode] || 0) + amount;
    return state.xpByLang[langCode];
  }

  function getRankInfo(xp) {
    const val = xp || 0;
    if (val >= 700) return { title: 'Mahir', nextAt: null, pct: 100 };
    if (val >= 300) return { title: 'Percakapan', nextAt: 700, pct: Math.round(((val - 300) / 400) * 100) };
    if (val >= 100) return { title: 'Penjelajah', nextAt: 300, pct: Math.round(((val - 100) / 200) * 100) };
    return { title: 'Pemula', nextAt: 100, pct: Math.round((val / 100) * 100) };
  }

  function getDailyMissions(state) {
    const today = getTodayKey(0);
    const log = ensureDayLog(state, today);
    const claimed = log.claimedMissions || {};
    return [
      {
        id: 'm_dict',
        title: 'Baca 5 kata di Kamus 3x3',
        current: Math.min(5, log.dictRead || 0),
        target: 5,
        xp: 20,
        claimed: Boolean(claimed.m_dict),
        nav: 'dictionary',
        cta: 'Buka Kamus 3x3'
      },
      {
        id: 'm_srs',
        title: 'Ulas 5 kartu di Kartu SRS',
        current: Math.min(5, log.cards || 0),
        target: 5,
        xp: 20,
        claimed: Boolean(claimed.m_srs),
        nav: 'flashcards',
        cta: 'Buka Kartu SRS'
      },
      {
        id: 'm_sprint',
        title: 'Selesaikan 1 ronde Sprint 60 Detik',
        current: Math.min(1, log.sprintPlayed || 0),
        target: 1,
        xp: 25,
        claimed: Boolean(claimed.m_sprint),
        nav: 'sprint',
        cta: 'Mulai Sprint'
      }
    ];
  }

  function getScriptGateStatus(state, langCode) {
    const scriptPack = global.LingoData && global.LingoData.SCRIPT_DATA && global.LingoData.SCRIPT_DATA[langCode];
    if (!scriptPack) {
      return { hasGate: false, unlocked: true, learned: 0, required: 0, bypassed: false, pct: 100 };
    }
    const learned = Object.keys((state && state.learnedChars && state.learnedChars[langCode]) || {}).length;
    const required = 5;
    const bypassed = Boolean(state && state.scriptGateBypassed && state.scriptGateBypassed[langCode]);
    const unlocked = bypassed || learned >= required;
    const pct = unlocked ? 100 : Math.min(100, Math.round((learned / required) * 100));
    return { hasGate: true, unlocked, learned, required, bypassed, pct };
  }

  function computeModuleMastery(state, langCode, moduleId) {
    const pack = state && state.packs ? state.packs[langCode] : null;
    const done = Boolean(state && state.completedModules && state.completedModules[langCode] && state.completedModules[langCode][moduleId]);
    if (!pack) return { pct: done ? 100 : 0, done, masteredCards: 0, totalCards: 0 };
    const modCards = (pack.flashcards || []).filter((c) => c.module_id === moduleId);
    const totalCards = modCards.length;
    const masteredCards = modCards.filter((c) => isCardMastered(c)).length;
    if (done && totalCards === 0) return { pct: 100, done: true, masteredCards: 0, totalCards: 0 };
    const cardRatio = totalCards > 0 ? (masteredCards / totalCards) : 0;
    const pct = Math.min(100, Math.round((done ? 50 : 0) + cardRatio * (totalCards > 0 ? 50 : 100)));
    return { pct, done, masteredCards, totalCards };
  }

  function generateStudyPlan(langCode, pack, options = {}) {
    const goal = options.goal || 'conversation';
    const dailyMinutes = Number(options.dailyMinutes) || 20;
    const totalDays = Number(options.totalDays) || 14;
    const hasScript = Boolean(global.LingoData && global.LingoData.SCRIPT_DATA && global.LingoData.SCRIPT_DATA[langCode]);
    const modules = (pack && Array.isArray(pack.modules)) ? pack.modules : [];
    const srsTarget = dailyMinutes >= 30 ? 15 : dailyMinutes >= 20 ? 10 : 5;
    const conjTarget = dailyMinutes >= 30 ? 8 : 5;
    const days = [];

    for (let d = 1; d <= totalDays; d++) {
      const tasks = [];
      const mod = modules.length ? modules[(d - 1) % modules.length] : null;

      if (d <= 3 && hasScript) {
        tasks.push({ id: `d${d}-t1`, label: 'Kenali 8 huruf di Pengenalan Aksara & tes cepat', nav: 'alphabet', minutes: 6 });
      } else if (mod) {
        tasks.push({ id: `d${d}-t1`, label: `Pelajari modul: ${mod.title}`, nav: 'modules', minutes: Math.round(dailyMinutes * 0.35) });
      }

      tasks.push({ id: `d${d}-t2`, label: `Ulas ${srsTarget} kartu di Kartu SRS`, nav: 'flashcards', minutes: Math.round(dailyMinutes * 0.3) });

      if (goal === 'exam') {
        if (d % 3 === 0) {
          tasks.push({ id: `d${d}-t3`, label: 'Jalankan 1 sesi Mini Try-Out Strategi Ujian', nav: 'exam', minutes: 6 });
        } else if (d % 2 === 0) {
          tasks.push({ id: `d${d}-t3`, label: `Latih ${conjTarget} soal di Pelatih Konjugasi`, nav: 'conjugation', minutes: 5 });
        } else {
          tasks.push({ id: `d${d}-t3`, label: 'Baca teks di Bacaan Klik-Kata & tambang 1 kalimat', nav: 'readings', minutes: 6 });
        }
      } else if (goal === 'travel') {
        if (d % 2 === 0) {
          tasks.push({ id: `d${d}-t3`, label: 'Praktik 1 skenario di Dialog Role-Play', nav: 'dialogs', minutes: 6 });
        } else {
          tasks.push({ id: `d${d}-t3`, label: 'Selesaikan 1 ronde Sprint 60 Detik', nav: 'sprint', minutes: 4 });
        }
      } else {
        if (d % 3 === 0) {
          tasks.push({ id: `d${d}-t3`, label: 'Praktik 1 skenario di Dialog Role-Play', nav: 'dialogs', minutes: 6 });
        } else if (d % 2 === 0) {
          tasks.push({ id: `d${d}-t3`, label: `Latih ${conjTarget} pola di Pelatih Konjugasi`, nav: 'conjugation', minutes: 5 });
        } else {
          tasks.push({ id: `d${d}-t3`, label: 'Tambang 1 kalimat baru dari Bacaan Klik-Kata', nav: 'readings', minutes: 5 });
        }
      }

      days.push({
        day: d,
        focus: d <= 3 && hasScript ? 'Fondasi Aksara & Kosakata' : (d % 7 === 0 ? 'Evaluasi Mingguan' : (mod ? mod.level : 'Praktik Aktif')),
        tasks
      });
    }

    return {
      langCode,
      goal,
      dailyMinutes,
      totalDays,
      startDate: getTodayKey(0),
      days,
      completedTasks: {}
    };
  }

  function computeAchievements(state) {
    const gStats = computeGlobalStats(state);
    const streak = computeStreakInfo(state);
    let totalCardsReviewed = 0;
    Object.values(state.dailyLogs || {}).forEach((l) => {
      totalCardsReviewed += l.cards || 0;
    });
    let totalDictRead = 0;
    Object.values(state.readDictionaryIds || {}).forEach((m) => {
      totalDictRead += Object.keys(m || {}).length;
    });
    let bestSprintAny = 0;
    Object.values(state.sprintBestByLang || {}).forEach((s) => {
      if (s && s.bestScore > bestSprintAny) bestSprintAny = s.bestScore;
    });
    let totalCanvas = 0;
    Object.values(state.canvasPracticedIds || {}).forEach((m) => {
      totalCanvas += Object.keys(m || {}).length;
    });
    let totalCharsLearned = 0;
    Object.values(state.learnedChars || {}).forEach((m) => {
      totalCharsLearned += Object.keys(m || {}).length;
    });
    let totalConjCorrect = 0;
    Object.values(state.conjugationStats || {}).forEach((c) => {
      totalConjCorrect += (c && c.correct) ? c.correct : 0;
    });
    let totalMined = 0;
    Object.values(state.minedCardIds || {}).forEach((m) => {
      totalMined += Object.keys(m || {}).length;
    });
    let totalExams = 0;
    Object.values(state.examHistory || {}).forEach((arr) => {
      totalExams += Array.isArray(arr) ? arr.length : 0;
    });
    let totalPlanTasks = 0;
    Object.values(state.studyPlans || {}).forEach((p) => {
      if (p && p.completedTasks) totalPlanTasks += Object.keys(p.completedTasks).filter((k) => p.completedTasks[k]).length;
    });
    let totalModulesDone = 0;
    Object.values(state.completedModules || {}).forEach((m) => {
      totalModulesDone += Object.keys(m || {}).filter((k) => m[k]).length;
    });
    const activeXpLangs = Object.values(state.xpByLang || {}).filter((v) => v > 0).length;

    const raw = [
      // Konsistensi
      { id: 'streak_3', category: 'Konsistensi', tier: 'bronze', title: 'Konsisten 3 Hari', desc: 'Pertahankan streak belajar minimal 3 hari', current: streak.best, target: 3 },
      { id: 'streak_7', category: 'Konsistensi', tier: 'silver', title: 'Ritme Seminggu', desc: 'Capai streak belajar 7 hari berturut-turut', current: streak.best, target: 7 },
      { id: 'streak_30', category: 'Konsistensi', tier: 'gold', title: 'Disiplin 30 Hari', desc: 'Pertahankan streak aktif selama 30 hari', current: streak.best, target: 30 },
      { id: 'plan_3', category: 'Konsistensi', tier: 'bronze', title: 'Terjadwal Rapi', desc: 'Selesaikan 3 tugas dari Rencana Belajar', current: totalPlanTasks, target: 3 },
      // Penguasaan
      { id: 'first_srs', category: 'Penguasaan', tier: 'bronze', title: 'Langkah Pertama SRS', desc: 'Ulas minimal 1 kartu di Kartu SRS', current: totalCardsReviewed, target: 1 },
      { id: 'srs_50', category: 'Penguasaan', tier: 'silver', title: 'Memori Aktif', desc: 'Ulas total 50 kartu SRS di semua bahasa', current: totalCardsReviewed, target: 50 },
      { id: 'conj_10', category: 'Penguasaan', tier: 'bronze', title: 'Ahli Pola Bentuk', desc: 'Jawab benar 10 soal di Pelatih Konjugasi', current: totalConjCorrect, target: 10 },
      { id: 'conj_40', category: 'Penguasaan', tier: 'gold', title: 'Master Konjugasi', desc: 'Jawab benar 40 soal di Pelatih Konjugasi', current: totalConjCorrect, target: 40 },
      { id: 'script_15', category: 'Penguasaan', tier: 'silver', title: 'Pembaca Aksara', desc: 'Tandai 15 huruf/karakter dikuasai di Pengenalan Aksara', current: totalCharsLearned, target: 15 },
      { id: 'modules_5', category: 'Penguasaan', tier: 'gold', title: 'Penakluk Pohon', desc: 'Selesaikan 5 modul di Skill Tree / Jalur Modul', current: totalModulesDone, target: 5 },
      // Eksplorasi
      { id: 'kamus_9', category: 'Eksplorasi', tier: 'bronze', title: 'Penjelajah Kamus', desc: 'Tandai 9 kosakata dibaca di Kamus 3x3', current: totalDictRead, target: 9 },
      { id: 'mine_1', category: 'Eksplorasi', tier: 'bronze', title: 'Penambang Kalimat', desc: 'Tambang 1 kalimat konteks ke dek SRS', current: totalMined, target: 1 },
      { id: 'mine_10', category: 'Eksplorasi', tier: 'silver', title: 'Kolektor Konteks', desc: 'Tambang 10 kalimat dari bacaan, dialog, atau teks sendiri', current: totalMined, target: 10 },
      { id: 'canvas_5', category: 'Eksplorasi', tier: 'bronze', title: 'Penulis Aksara', desc: 'Latih 5 aksara di Kanvas Tulis', current: totalCanvas, target: 5 },
      { id: 'polyglot_3', category: 'Eksplorasi', tier: 'gold', title: 'Poliglot LingoLokal', desc: 'Kumpulkan XP di minimal 3 bahasa berbeda', current: activeXpLangs, target: 3 },
      // Tantangan
      { id: 'quiz_5', category: 'Tantangan', tier: 'bronze', title: 'Akurasi Tajam', desc: 'Jawab 5 soal quiz dengan benar', current: gStats.correctQuiz, target: 5 },
      { id: 'sprint_10', category: 'Tantangan', tier: 'silver', title: 'Kilat 60 Detik', desc: 'Raih skor minimal 10 di Sprint 60 Detik', current: bestSprintAny, target: 10 },
      { id: 'exam_1', category: 'Tantangan', tier: 'silver', title: 'Siap Ujian Resmi', desc: 'Selesaikan 1 sesi Mini Try-Out di Strategi Ujian', current: totalExams, target: 1 }
    ];

    return raw.map((item) => {
      const clamped = Math.min(item.target, item.current || 0);
      const pct = Math.round((clamped / item.target) * 100);
      return {
        ...item,
        unlocked: (item.current || 0) >= item.target,
        percent: pct,
        progress: `${clamped}/${item.target}`
      };
    });
  }

  function detectNewlyUnlockedAchievements(state) {
    if (!state) return [];
    state.unlockedAchievements = state.unlockedAchievements || {};
    const list = computeAchievements(state);
    const today = getTodayKey(0);
    const newlyUnlocked = [];
    list.forEach((ach) => {
      if (ach.unlocked && !state.unlockedAchievements[ach.id]) {
        state.unlockedAchievements[ach.id] = today;
        newlyUnlocked.push(ach);
      }
    });
    return newlyUnlocked;
  }

  function computeBadges(state) {
    return computeAchievements(state);
  }

  // --- SM-2 Spaced Repetition Algorithm ---
  // Ratings: 1 (Lupa), 3 (Sulit), 4 (Ingat), 5 (Mudah)
  function previewSM2(srs, quality) {
    const cur = srs || { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null };
    let ef = typeof cur.ease_factor === 'number' ? cur.ease_factor : 2.5;
    let interval = typeof cur.interval_days === 'number' ? cur.interval_days : 0;
    let reps = typeof cur.repetitions === 'number' ? cur.repetitions : 0;

    if (quality === 1) {
      reps = 0;
      interval = 0;
      ef = Math.max(1.3, Number((ef - 0.2).toFixed(2)));
    } else if (quality === 3) {
      interval = Math.max(1, Math.round((interval || 1) * 1.2));
      ef = Math.max(1.3, Number((ef - 0.15).toFixed(2)));
      reps = Math.max(1, reps);
    } else if (quality === 4) {
      if (reps === 0) interval = 1;
      else if (reps === 1) interval = 3;
      else interval = Math.max(1, Math.round(interval * ef));
      reps += 1;
    } else if (quality === 5) {
      if (reps === 0) interval = 4;
      else interval = Math.max(4, Math.round(interval * ef * 1.3));
      ef = Number((ef + 0.1).toFixed(2));
      reps += 1;
    }

    const dueDate = interval === 0 ? getTodayKey(0) : getTodayKey(interval);
    return {
      ease_factor: ef,
      interval_days: interval,
      repetitions: reps,
      due_date: dueDate
    };
  }

  function isCardDue(card, todayKey) {
    const srs = card.srs || {};
    if (!srs.due_date) return true;
    return srs.due_date <= todayKey;
  }

  function isCardMastered(card) {
    const srs = card.srs || {};
    return (srs.repetitions || 0) >= 2 && (srs.interval_days || 0) >= 3;
  }

  // --- Dual-Rule Streak Calculator ---
  // Achieved if: minutes >= targetMinutes OR (modules >= targetModules AND cards >= targetCards) OR frozen
  function isDayAchieved(log, settings) {
    if (!log) return false;
    if (log.frozen) return true;
    const mins = Math.floor((log.seconds || 0) / 60);
    const byTime = mins >= (settings.targetMinutes || 20);
    const byOutput = (log.modules || 0) >= (settings.targetModules || 1) && (log.cards || 0) >= (settings.targetCards || 20);
    return byTime || byOutput;
  }

  function isDayPartial(log) {
    if (!log) return false;
    return (log.seconds || 0) > 0 || (log.cards || 0) > 0 || (log.modules || 0) > 0 || (log.quizTotal || 0) > 0;
  }

  function computeStreakInfo(state) {
    const today = getTodayKey(0);
    const settings = state.settings;
    let streak = 0;

    // Start from today if achieved; otherwise check from yesterday so ongoing streak isn't broken mid-day
    const todayAchieved = isDayAchieved(state.dailyLogs[today], settings);
    let offset = todayAchieved ? 0 : -1;

    while (offset > -365) {
      const key = getTodayKey(offset);
      if (isDayAchieved(state.dailyLogs[key], settings)) {
        streak++;
        offset--;
      } else {
        break;
      }
    }

    if (streak > (state.bestStreak || 0)) {
      state.bestStreak = streak;
    }

    const weekKey = getWeekKey(today);
    const freezeUsedThisWeek = Boolean(state.freezesUsedByWeek[weekKey]);
    const freezeRemaining = freezeUsedThisWeek ? 0 : 1;

    return {
      current: streak,
      best: Math.max(streak, state.bestStreak || 0),
      todayAchieved,
      freezeRemaining,
      freezeUsedThisWeek,
      todayFrozen: Boolean(state.dailyLogs[today] && state.dailyLogs[today].frozen)
    };
  }

  function computeTodayProgress(state) {
    const today = getTodayKey(0);
    const log = state.dailyLogs[today] || { seconds: 0, cards: 0, modules: 0, quizTotal: 0, quizCorrect: 0, frozen: false };
    const s = state.settings;
    const mins = Math.floor((log.seconds || 0) / 60);
    const timePct = s.targetMinutes > 0 ? Math.min(100, Math.round((mins / s.targetMinutes) * 100)) : 0;
    const modPart = s.targetModules > 0 ? Math.min(1, (log.modules || 0) / s.targetModules) : 0;
    const cardPart = s.targetCards > 0 ? Math.min(1, (log.cards || 0) / s.targetCards) : 0;
    const outputPct = Math.round(((modPart + cardPart) / 2) * 100);
    const overallPct = log.frozen ? 100 : Math.max(timePct, outputPct);

    return {
      minutes: mins,
      seconds: log.seconds || 0,
      cards: log.cards || 0,
      modules: log.modules || 0,
      quizTotal: log.quizTotal || 0,
      quizCorrect: log.quizCorrect || 0,
      frozen: Boolean(log.frozen),
      percent: overallPct
    };
  }

  function computeGlobalStats(state) {
    let totalCards = 0;
    let masteredCards = 0;
    let totalQuiz = 0;
    let correctQuiz = 0;

    Object.values(state.packs).forEach((pack) => {
      if (!pack || !Array.isArray(pack.flashcards)) return;
      totalCards += pack.flashcards.length;
      pack.flashcards.forEach((c) => {
        if (isCardMastered(c)) masteredCards++;
      });
    });

    Object.values(state.dailyLogs).forEach((log) => {
      totalQuiz += log.quizTotal || 0;
      correctQuiz += log.quizCorrect || 0;
    });

    const quizAccuracy = totalQuiz > 0 ? Math.round((correctQuiz / totalQuiz) * 100) : null;
    return { totalCards, masteredCards, totalQuiz, correctQuiz, quizAccuracy };
  }

  // --- Merge JSON Pack (schema_version: "1.0") without overwriting existing SRS ---
  function mergePack(state, incoming) {
    if (!incoming || incoming.schema_version !== '1.0' || !incoming.language || !incoming.language.code) {
      throw new Error('Format JSON tidak valid. Pastikan schema_version "1.0" dan language.code tersedia.');
    }
    const code = String(incoming.language.code).toLowerCase();
    const existing = state.packs[code];

    if (!existing) {
      state.packs[code] = {
        schema_version: '1.0',
        language: incoming.language,
        modules: Array.isArray(incoming.modules) ? incoming.modules : [],
        flashcards: (Array.isArray(incoming.flashcards) ? incoming.flashcards : []).map((c) => ({
          ...c,
          srs: c.srs || { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
        })),
        quizzes: Array.isArray(incoming.quizzes) ? incoming.quizzes : [],
        dialogs: Array.isArray(incoming.dialogs) ? incoming.dialogs : [],
        readings: Array.isArray(incoming.readings) ? incoming.readings : [],
        grammar: Array.isArray(incoming.grammar) ? incoming.grammar : []
      };
      return {
        code,
        isNewLanguage: true,
        added: {
          modules: state.packs[code].modules.length,
          flashcards: state.packs[code].flashcards.length,
          quizzes: state.packs[code].quizzes.length,
          dialogs: state.packs[code].dialogs.length,
          readings: state.packs[code].readings.length,
          grammar: state.packs[code].grammar.length
        }
      };
    }

    const added = { modules: 0, flashcards: 0, quizzes: 0, dialogs: 0, readings: 0, grammar: 0 };

    function mergeArrayById(targetArr, sourceArr, key, preserveSrs) {
      if (!Array.isArray(sourceArr)) return;
      const byId = new Map(targetArr.map((item, idx) => [item.id, idx]));
      sourceArr.forEach((item) => {
        if (!item || !item.id) return;
        if (byId.has(item.id)) {
          const idx = byId.get(item.id);
          if (preserveSrs) {
            const oldSrs = targetArr[idx].srs;
            targetArr[idx] = { ...item, srs: oldSrs || item.srs || { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null } };
          } else {
            targetArr[idx] = { ...targetArr[idx], ...item };
          }
        } else {
          const toPush = preserveSrs
            ? { ...item, srs: item.srs || { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null } }
            : item;
          targetArr.push(toPush);
          added[key]++;
        }
      });
    }

    existing.language = { ...existing.language, ...incoming.language };
    mergeArrayById(existing.modules, incoming.modules, 'modules', false);
    mergeArrayById(existing.flashcards, incoming.flashcards, 'flashcards', true);
    mergeArrayById(existing.quizzes, incoming.quizzes, 'quizzes', false);
    mergeArrayById(existing.dialogs, incoming.dialogs, 'dialogs', false);
    mergeArrayById(existing.readings, incoming.readings, 'readings', false);
    mergeArrayById(existing.grammar, incoming.grammar, 'grammar', false);

    return { code, isNewLanguage: false, added };
  }

  function getAllowedLevelsForTier(langCode, tier, roadmapLevels) {
    const lvls = Array.isArray(roadmapLevels) && roadmapLevels.length
      ? roadmapLevels
      : ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    if (tier === 'intermediate') {
      const slice = lvls.slice(2, 4);
      return slice.length ? slice : lvls;
    }
    if (tier === 'advanced') {
      const slice = lvls.slice(4);
      return slice.length ? slice : lvls.slice(-2);
    }
    // default: beginner (first 2 levels, e.g. A0-A1, A0-N5, A0-HSK1)
    return lvls.slice(0, 2);
  }

  function getProficiencyMeta(state, langCode, roadmapLevels) {
    const tier = (state && state.proficiencyByLang && state.proficiencyByLang[langCode]) || 'beginner';
    const allowed = getAllowedLevelsForTier(langCode, tier, roadmapLevels);
    const rangeText = allowed.length > 1 ? `${allowed[0]}–${allowed[allowed.length - 1]}` : allowed[0];
    const nameMap = { beginner: 'Pemula', intermediate: 'Menengah', advanced: 'Lanjut' };
    return {
      tier,
      label: nameMap[tier] || 'Pemula',
      range: rangeText,
      fullLabel: `${nameMap[tier] || 'Pemula'} (${rangeText})`,
      allowedLevels: allowed
    };
  }

  global.LingoStorage = {
    getTodayKey,
    getWeekKey,
    createInitialState,
    loadState,
    saveState,
    ensureDayLog,
    previewSM2,
    isCardDue,
    isCardMastered,
    isDayAchieved,
    isDayPartial,
    computeStreakInfo,
    computeTodayProgress,
    computeGlobalStats,
    addXP,
    getRankInfo,
    getDailyMissions,
    getScriptGateStatus,
    getAllowedLevelsForTier,
    getProficiencyMeta,
    computeModuleMastery,
    generateStudyPlan,
    computeAchievements,
    detectNewlyUnlockedAchievements,
    computeBadges,
    mergePack
  };
})(window);
