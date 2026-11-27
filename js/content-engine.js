/* LingoLokal: Universal Module Content Engine (100% Offline, Deterministic) */
(function (global) {
  'use strict';

  function cleanModuleTitle(mod) {
    if (!mod || !mod.title) return '';
    const lvl = String(mod.level || '').trim();
    if (!lvl) return String(mod.title).trim();
    const escLvl = lvl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return String(mod.title).replace(new RegExp(`^${escLvl}\\s*[:·\\-]\\s*`, 'i'), '').trim() || String(mod.title).trim();
  }

  function hashStr(str) {
    let h = 2166136261;
    const s = String(str || '');
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function makeRng(seedStr) {
    let a = hashStr(seedStr) || 1;
    return function () {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(arr, rng) {
    const out = arr.slice();
    const rand = typeof rng === 'function' ? rng : Math.random;
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const tmp = out[i];
      out[i] = out[j];
      out[j] = tmp;
    }
    return out;
  }

  function uniqueStrings(list) {
    const seen = new Set();
    const out = [];
    for (let i = 0; i < list.length; i++) {
      const val = String(list[i] || '').trim();
      if (!val) continue;
      const key = val.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(val);
      }
    }
    return out;
  }

  function pickDistractors(targetVal, candidatePool, count, rng) {
    const tKey = String(targetVal || '').trim().toLowerCase();
    const uniq = uniqueStrings(candidatePool).filter((v) => v.toLowerCase() !== tKey);
    return shuffle(uniq, rng).slice(0, count);
  }

  function escapeRegex(str) {
    return String(str || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getDistractorPool(pack, mod) {
    const all = (pack && Array.isArray(pack.flashcards)) ? pack.flashcards : [];
    const sameMod = all.filter((c) => mod && c.module_id === mod.id);
    const sameLevel = all.filter((c) => mod && c.level === mod.level && c.module_id !== mod.id);
    const rest = all.filter((c) => !mod || (c.module_id !== mod.id && c.level !== mod.level));
    return sameMod.concat(sameLevel, rest);
  }

  function buildClozeQuestion(card, distractorCards, rng, idPrefix) {
    const front = String(card.front || '').trim();
    const ex = String(card.example_native || '').trim();
    if (!front || !ex || front.length < 2 || ex.length <= front.length) return null;

    // Strip trailing punctuation on front for cleaner matching
    const cleanFront = front.replace(/[?!.,。？！…]+$/g, '').trim();
    if (!cleanFront || cleanFront.length < 2) return null;

    const rx = new RegExp(escapeRegex(cleanFront), 'i');
    if (!rx.test(ex)) return null;

    const blanked = ex.replace(rx, '___');
    if (blanked === ex) return null;

    const distractors = pickDistractors(
      cleanFront,
      distractorCards.map((c) => String(c.front || '').replace(/[?!.,。？！…]+$/g, '').trim()),
      3,
      rng
    );
    if (distractors.length < 3) return null;

    const opts = shuffle([cleanFront, ...distractors], rng);
    return {
      id: `${idPrefix}-cloze-${card.id}`,
      module_id: card.module_id,
      level: card.level,
      type: 'fill_blank',
      prompt: `Lengkapi kalimat berikut: ${blanked}${card.example_id ? ` ("${card.example_id}")` : ''}`,
      options: opts,
      answer: cleanFront,
      explanation_id: `Kalimat lengkap: ${ex}${card.example_id ? ` (${card.example_id})` : ''}. "${cleanFront}" berarti "${card.meaning_id}".`
    };
  }

  function buildMeaningMc(card, distractorCards, rng, idPrefix) {
    const distractors = pickDistractors(
      card.meaning_id,
      distractorCards.map((c) => c.meaning_id),
      3,
      rng
    );
    if (distractors.length < 2) return null;
    const opts = shuffle([card.meaning_id, ...distractors], rng);
    const showRom = card.romaji && String(card.romaji).trim() !== String(card.front).trim();
    return {
      id: `${idPrefix}-meaning-${card.id}`,
      module_id: card.module_id,
      level: card.level,
      type: 'multiple_choice',
      prompt: `Apa arti dari "${card.front}"${showRom ? ` (${card.romaji})` : ''}?`,
      options: opts,
      answer: card.meaning_id,
      explanation_id: `"${card.front}"${showRom ? ` (${card.romaji})` : ''} berarti "${card.meaning_id}".`
    };
  }

  function buildReverseMc(card, distractorCards, langName, rng, idPrefix) {
    const distractors = pickDistractors(
      card.front,
      distractorCards.map((c) => c.front),
      3,
      rng
    );
    if (distractors.length < 2) return null;
    const opts = shuffle([card.front, ...distractors], rng);
    return {
      id: `${idPrefix}-rev-${card.id}`,
      module_id: card.module_id,
      level: card.level,
      type: 'multiple_choice',
      prompt: `Pilih ungkapan ${langName} yang berarti "${card.meaning_id}":`,
      options: opts,
      answer: card.front,
      explanation_id: `"${card.meaning_id}" dalam bahasa ${langName} adalah "${card.front}".`
    };
  }

  function buildMatchingQuiz(modCards, distractorCards, modId, level, rng, idPrefix) {
    const pool = modCards.slice();
    if (pool.length < 4) {
      const ids = new Set(pool.map((c) => c.id));
      for (let i = 0; i < distractorCards.length && pool.length < 4; i++) {
        if (!ids.has(distractorCards[i].id)) {
          ids.add(distractorCards[i].id);
          pool.push(distractorCards[i]);
        }
      }
    }
    const picked = shuffle(pool, rng).slice(0, 4);
    if (picked.length < 3) return null;
    return {
      id: `${idPrefix}-match-${modId}`,
      module_id: modId,
      level: level,
      type: 'matching',
      prompt: 'Pasangkan kosakata modul ini dengan artinya:',
      pairs: picked.map((c) => ({ left: c.front, right: c.meaning_id })),
      explanation_id: 'Semua pasangan kosakata modul cocok dengan tepat.'
    };
  }

  /**
   * Synthesize full varied quiz set (multiple_choice, fill_blank, word_order, translation, matching)
   * for a specific module, preserving curated quizzes first and guaranteeing at least `minCount` items.
   */
  function synthesizeModuleQuizzes(pack, modId, minCount, rngFn) {
    if (!pack || !Array.isArray(pack.modules)) return [];
    const mod = pack.modules.find((m) => m.id === modId);
    if (!mod) return [];

    const targetCount = Math.max(4, minCount || 8);
    const rng = typeof rngFn === 'function' ? rngFn : makeRng(`${pack.language && pack.language.code}|${mod.id}|qz`);
    const langName = (pack.language && pack.language.name_id) || 'asing';

    const curated = (pack.quizzes || []).filter((q) => q.module_id === mod.id);
    const out = curated.slice();
    const seenPrompts = new Set(out.map((q) => String(q.prompt || '').trim().toLowerCase()));

    const pushUnique = (q) => {
      if (!q) return false;
      const key = String(q.prompt || '').trim().toLowerCase();
      if (seenPrompts.has(key)) return false;
      seenPrompts.add(key);
      out.push(q);
      return true;
    };

    const modCards = (pack.flashcards || []).filter((c) => c.module_id === mod.id);
    const distractorCards = getDistractorPool(pack, mod);
    const orderedCards = shuffle(modCards, rng);

    // 1. Add up to 2 Cloze (fill_blank) questions from example_native
    let clozeAdded = 0;
    for (let i = 0; i < orderedCards.length && out.length < targetCount && clozeAdded < 2; i++) {
      const q = buildClozeQuestion(orderedCards[i], distractorCards, rng, 'syn');
      if (pushUnique(q)) clozeAdded++;
    }

    // 2. Add 1 Matching question if module doesn't already have one
    if (out.length < targetCount && !out.some((q) => q.type === 'matching')) {
      const mq = buildMatchingQuiz(modCards, distractorCards, mod.id, mod.level, rng, 'syn');
      pushUnique(mq);
    }

    // 3. Add Meaning MC questions from module cards
    for (let i = 0; i < orderedCards.length && out.length < targetCount; i++) {
      pushUnique(buildMeaningMc(orderedCards[i], distractorCards, rng, 'syn'));
    }

    // 4. Add Reverse MC questions from module cards
    for (let i = 0; i < orderedCards.length && out.length < targetCount; i++) {
      pushUnique(buildReverseMc(orderedCards[i], distractorCards, langName, rng, 'syn'));
    }

    // 5. If a small module (e.g. 2-3 cards) still needs more, pad with same-level or pack cards
    if (out.length < targetCount) {
      const sameLevelExtras = shuffle(
        (pack.flashcards || []).filter((c) => c.module_id !== mod.id && c.level === mod.level),
        rng
      );
      const otherExtras = shuffle(
        (pack.flashcards || []).filter((c) => c.module_id !== mod.id && c.level !== mod.level),
        rng
      );
      const padPool = sameLevelExtras.concat(otherExtras);
      for (let i = 0; i < padPool.length && out.length < targetCount; i++) {
        pushUnique(buildMeaningMc(padPool[i], distractorCards, rng, 'syn-lvl'));
      }
    }

    return out;
  }

  /**
   * Synthesize MC/fill_blank-only quizzes for Guided Lesson Step 4 & Exam Try-Out
   * (guaranteed >= minCount items, each with options[] and answer).
   */
  function synthesizeLessonMcQuizzes(pack, modId, minCount, rngFn) {
    const need = Math.max(minCount || 6, 4);
    const full = synthesizeModuleQuizzes(pack, modId, need + 5, rngFn);
    const mcOnly = full
      .filter((q) => (q.type === 'multiple_choice' || q.type === 'fill_blank') && Array.isArray(q.options) && q.options.length >= 2)
      .map((q) => ({
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        options: q.options.slice(),
        answer: q.answer,
        explanation: q.explanation_id || q.explanation || `Jawaban tepat: ${q.answer}`
      }));
    return mcOnly.slice(0, need);
  }

  /**
   * Build clickable tokens for a sentence given its source flashcard.
   */
  function buildTokensForCardSentence(card) {
    const front = String(card.front || '').trim();
    const ex = String(card.example_native || '').trim();
    const cleanFront = front.replace(/[?!.,。？！…]+$/g, '').trim();

    if (!ex) {
      return [{
        surface: front,
        reading: card.reading || front,
        romaji: card.romaji || front,
        meaning_id: card.meaning_id || '',
        saveable: true
      }];
    }

    const tokens = [];
    const rx = cleanFront.length >= 2 ? new RegExp(escapeRegex(cleanFront), 'i') : null;
    const match = rx ? ex.match(rx) : null;

    if (match && typeof match.index === 'number') {
      const before = ex.slice(0, match.index).trim();
      const hit = match[0];
      const after = ex.slice(match.index + hit.length).trim();

      if (before) {
        tokens.push({
          surface: before,
          reading: before,
          romaji: card.example_romaji || before,
          meaning_id: card.example_id || card.meaning_id || '',
          saveable: false
        });
      }
      tokens.push({
        surface: hit,
        reading: card.reading || hit,
        romaji: card.romaji || hit,
        meaning_id: card.meaning_id || '',
        saveable: true
      });
      if (after) {
        tokens.push({
          surface: after,
          reading: after,
          romaji: card.example_romaji || after,
          meaning_id: card.example_id || card.meaning_id || '',
          saveable: false
        });
      }
    } else {
      tokens.push({
        surface: ex,
        reading: card.reading || ex,
        romaji: card.example_romaji || card.romaji || ex,
        meaning_id: card.example_id || card.meaning_id || '',
        saveable: true
      });
    }

    return tokens;
  }

  /**
   * Return a curated reading for `modId` if available, otherwise synthesize
   * a clean contextual sentence reading ("Latihan Kalimat: <Module Title>")
   * directly from the module's flashcards and examples.
   */
  function synthesizeModuleReading(pack, modId) {
    if (!pack || !Array.isArray(pack.modules)) return null;
    const mod = pack.modules.find((m) => m.id === modId);
    if (!mod) return null;

    const curated = (pack.readings || []).find((r) => r.module_id === mod.id);
    if (curated) {
      return { ...curated, isCurated: true };
    }

    const modCards = (pack.flashcards || []).filter((c) => c.module_id === mod.id);
    if (modCards.length === 0) return null;

    const rng = makeRng(`${pack.language && pack.language.code}|${mod.id}|rd`);
    const selectedCards = modCards.slice(0, 6);
    const sentences = selectedCards.map((c) => ({
      native: c.example_native || c.front,
      romaji: c.example_romaji || c.romaji || c.front,
      translation_id: c.example_id || c.meaning_id || '',
      tokens: buildTokensForCardSentence(c)
    }));

    const focusCard = selectedCards[0];
    const distractorCards = getDistractorPool(pack, mod);
    const distractors = pickDistractors(
      focusCard.meaning_id,
      distractorCards.map((c) => c.meaning_id),
      3,
      rng
    );
    const compOpts = shuffle([focusCard.meaning_id, ...distractors], rng);
    const ansIdx = compOpts.indexOf(focusCard.meaning_id);

    return {
      id: `auto-rd-${mod.id}`,
      module_id: mod.id,
      level: mod.level,
      title: `Latihan Kalimat: ${cleanModuleTitle(mod)}`,
      isCurated: false,
      sentences: sentences,
      comprehension_check: ansIdx >= 0 ? {
        question: `Berdasarkan latihan kalimat di atas, apa arti dari "${focusCard.front}"?`,
        options: compOpts,
        answer_index: ansIdx,
        explanation_id: `"${focusCard.front}" berarti "${focusCard.meaning_id}". Contoh: ${focusCard.example_native || focusCard.front}`
      } : null
    };
  }

  /**
   * Return all curated readings PLUS synthesized contextual readings for
   * every module that does not yet have a curated reading.
   */
  function getAllReadingsForPack(pack) {
    if (!pack) return [];
    const curated = (pack.readings || []).map((r) => ({ ...r, isCurated: true }));
    const curatedModIds = new Set(curated.map((r) => r.module_id).filter(Boolean));
    const orderedMods = (pack.modules || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));

    const extras = [];
    for (let i = 0; i < orderedMods.length; i++) {
      const mod = orderedMods[i];
      if (curatedModIds.has(mod.id)) continue;
      const syn = synthesizeModuleReading(pack, mod.id);
      if (syn) extras.push(syn);
    }
    return curated.concat(extras);
  }

  /**
   * Synthesize rich study notes for Step 1 of Guided Lesson:
   * combines curated module grammar with mnemonic tips from flashcards.
   */
  function synthesizeModuleNotes(pack, modId) {
    if (!pack || !Array.isArray(pack.modules)) return [];
    const mod = pack.modules.find((m) => m.id === modId);
    if (!mod) return [];

    const notes = [];
    const modGrammar = (pack.grammar || []).filter((g) => g.module_id === mod.id);
    modGrammar.forEach((g) => {
      notes.push({
        title: `${g.pattern} · ${g.meaning_id}`,
        formula: g.formula || '',
        body: g.common_mistakes_id || g.explanation_id || ''
      });
    });

    if (notes.length < 2) {
      const modCards = (pack.flashcards || []).filter((c) => c.module_id === mod.id && c.mnemonic);
      for (let i = 0; i < modCards.length && notes.length < 3; i++) {
        const c = modCards[i];
        notes.push({
          title: `Tips Ingat: ${c.front} (${c.meaning_id})`,
          formula: c.example_native ? `${c.example_native}${c.example_id ? ` = ${c.example_id}` : ''}` : '',
          body: c.mnemonic
        });
      }
    }

    if (notes.length === 0 && Array.isArray(mod.objectives) && mod.objectives.length > 0) {
      notes.push({
        title: `Fokus Utama Modul ${mod.level}`,
        formula: '',
        body: mod.objectives.join(' ')
      });
    }

    return notes;
  }

  function getModuleCoverage(pack, modId) {
    if (!pack) return { cards: 0, quizzes: 0, hasReading: false, hasDialog: false, grammar: 0 };
    const cards = (pack.flashcards || []).filter((c) => c.module_id === modId).length;
    const curatedQz = (pack.quizzes || []).filter((q) => q.module_id === modId).length;
    const hasCuratedReading = (pack.readings || []).some((r) => r.module_id === modId);
    const hasCuratedDialog = (pack.dialogs || []).some((d) => d.module_id === modId);
    const grammar = (pack.grammar || []).filter((g) => g.module_id === modId).length;
    return {
      cards,
      curatedQuizzes: curatedQz,
      readyQuizzes: Math.max(curatedQz, cards > 0 ? 6 : 0),
      hasCuratedReading,
      hasReading: hasCuratedReading || cards > 0,
      hasCuratedDialog,
      grammar
    };
  }

  global.LingoContentEngine = {
    cleanModuleTitle,
    synthesizeModuleQuizzes,
    synthesizeLessonMcQuizzes,
    synthesizeModuleReading,
    getAllReadingsForPack,
    synthesizeModuleNotes,
    getModuleCoverage
  };
})(window);
