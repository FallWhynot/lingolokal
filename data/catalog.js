/* LingoLokal: 11-Language Catalog, Phonetic Converters (Romaji->Hiragana & Romaji->Hangul), and Schema v1.0 Template Generator */
(function (global) {
  'use strict';

  const LANGUAGE_CATALOG = [
    {
      code: 'ja',
      stamp: '日',
      name_id: 'Jepang',
      name_native: '日本語',
      tts_lang: 'ja-JP',
      script_type: 'hiragana_katakana_kanji',
      phonetic_input: 'romaji_to_kana',
      roadmap_levels: ['A0', 'N5', 'N4', 'N3', 'N2', 'N1'],
      focus: 'Hiragana, Travel, Anime & JLPT',
      signature: 'Latihan Konbini & Frasa Anime',
      sample_word: { native: 'こんにちは', romaji: 'konnichiwa', meaning: 'Halo / Selamat siang' },
      quick_chips: ['konnichiwa', 'arigatou', 'sumimasen', 'nihongo']
    },
    {
      code: 'ko',
      stamp: '한',
      name_id: 'Korea',
      name_native: '한국어',
      tts_lang: 'ko-KR',
      script_type: 'hangul',
      phonetic_input: 'romaji_to_hangul',
      roadmap_levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      focus: 'Hangul, Harian, K-Drama & TOPIK',
      signature: 'Frasa K-Drama & Sistem 반말/존댓말',
      sample_word: { native: '안녕하세요', romaji: 'annyeonghaseyo', meaning: 'Halo (sapaan sopan)' },
      quick_chips: ['annyeonghaseyo', 'gamsahamnida', 'saranghaeyo', 'hangugeo']
    },
    {
      code: 'en',
      stamp: 'En',
      name_id: 'Inggris',
      name_native: 'English',
      tts_lang: 'en-US',
      script_type: 'latin',
      phonetic_input: 'none',
      roadmap_levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      focus: 'Percakapan, Bisnis & IELTS/TOEFL',
      signature: 'Latihan Wawancara & Presentasi',
      sample_word: { native: 'Good morning', romaji: 'good morning', meaning: 'Selamat pagi' },
      quick_chips: []
    },
    {
      code: 'zh',
      stamp: '中',
      name_id: 'Mandarin',
      name_native: '中文',
      tts_lang: 'zh-CN',
      script_type: 'hanzi_pinyin',
      phonetic_input: 'none',
      roadmap_levels: ['A0', 'HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'],
      focus: 'Pinyin, 4 Nada, Hanzi & HSK 3.0',
      signature: 'Latihan 4 Nada & Radikal Hanzi',
      sample_word: { native: '你好', romaji: 'ni hao', meaning: 'Halo' },
      quick_chips: []
    },
    {
      code: 'de',
      stamp: 'De',
      name_id: 'Jerman',
      name_native: 'Deutsch',
      tts_lang: 'de-DE',
      script_type: 'latin',
      phonetic_input: 'none',
      roadmap_levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      focus: 'Der/Die/Das, Kasus & Goethe',
      signature: 'Drill Artikel Der/Die/Das',
      sample_word: { native: 'Guten Tag', romaji: 'guten tag', meaning: 'Selamat siang' },
      quick_chips: []
    },
    {
      code: 'ar',
      stamp: 'ع',
      name_id: 'Arab',
      name_native: 'العربية',
      tts_lang: 'ar-SA',
      script_type: 'arabic',
      phonetic_input: 'none',
      roadmap_levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      focus: 'Hijaiyah, Harakat & Percakapan',
      signature: 'Bacaan Berharakat & Arah Kanan-Kiri',
      sample_word: { native: 'مرحبا', romaji: 'marhaban', meaning: 'Halo' },
      quick_chips: []
    },
    {
      code: 'es',
      stamp: 'Es',
      name_id: 'Spanyol',
      name_native: 'Español',
      tts_lang: 'es-ES',
      script_type: 'latin',
      phonetic_input: 'none',
      roadmap_levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      focus: 'Ser/Estar, Konjugasi & DELE',
      signature: 'Pola Konjugasi & Ser vs Estar',
      sample_word: { native: 'Buenos días', romaji: 'buenos dias', meaning: 'Selamat pagi' },
      quick_chips: []
    },
    {
      code: 'fr',
      stamp: 'Fr',
      name_id: 'Prancis',
      name_native: 'Français',
      tts_lang: 'fr-FR',
      script_type: 'latin',
      phonetic_input: 'none',
      roadmap_levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      focus: 'Le/La, Pelafalan & DELF/DALF',
      signature: 'Liaison & Gender Kata Benda',
      sample_word: { native: 'Bonjour', romaji: 'bonjour', meaning: 'Halo / Selamat siang' },
      quick_chips: []
    },
    {
      code: 'nl',
      stamp: 'Nl',
      name_id: 'Belanda',
      name_native: 'Nederlands',
      tts_lang: 'nl-NL',
      script_type: 'latin',
      phonetic_input: 'none',
      roadmap_levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      focus: 'De/Het, Serapan & NT2',
      signature: 'Kognat Indonesia-Belanda & De/Het',
      sample_word: { native: 'Goedemorgen', romaji: 'goedemorgen', meaning: 'Selamat pagi' },
      quick_chips: []
    },
    {
      code: 'ru',
      stamp: 'Ру',
      name_id: 'Rusia',
      name_native: 'Русский',
      tts_lang: 'ru-RU',
      script_type: 'cyrillic',
      phonetic_input: 'none',
      roadmap_levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      focus: 'Aksara Kiril, 6 Kasus & TORFL',
      signature: 'Aksara Kiril & Tabel 6 Kasus',
      sample_word: { native: 'Привет', romaji: 'privet', meaning: 'Hai' },
      quick_chips: []
    },
    {
      code: 'th',
      stamp: 'ไท',
      name_id: 'Thailand',
      name_native: 'ภาษาไทย',
      tts_lang: 'th-TH',
      script_type: 'thai',
      phonetic_input: 'none',
      roadmap_levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      focus: 'Aksara Thai, 5 Nada & Travel',
      signature: 'Peta 5 Nada & Frasa Wisata',
      sample_word: { native: 'สวัสดี', romaji: 'sawatdi', meaning: 'Halo' },
      quick_chips: []
    }
  ];

  // --- Romaji to Hiragana real-time converter ---
  const ROMAJI_TABLE = {
    kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
    sha: 'しゃ', shu: 'しゅ', sho: 'しょ', sya: 'しゃ', syu: 'しゅ', syo: 'しょ',
    cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ', tya: 'ちゃ', tyu: 'ちゅ', tyo: 'ちょ',
    nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
    hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
    mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
    rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
    gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
    ja: 'じゃ', ju: 'じゅ', jo: 'じょ', jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ',
    bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
    pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
    shi: 'し', chi: 'ち', tsu: 'つ', fu: 'ふ',
    ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
    sa: 'さ', si: 'し', su: 'す', se: 'せ', so: 'そ',
    ta: 'た', ti: 'ち', tu: 'つ', te: 'て', to: 'と',
    na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
    ha: 'は', hi: 'ひ', hu: 'ふ', he: 'へ', ho: 'ほ',
    ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
    ya: 'や', yu: 'ゆ', yo: 'よ',
    ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
    wa: 'わ', wi: 'ゐ', we: 'ゑ', wo: 'を',
    ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
    za: 'ざ', ji: 'じ', zi: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
    da: 'だ', di: 'ぢ', du: 'づ', de: 'で', do: 'ど',
    ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
    pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
    a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お'
  };

  function romajiToHiragana(input) {
    if (!input) return '';
    const src = String(input).toLowerCase();
    if (src.trim() === 'konnichiwa') return 'こんにちは';
    if (src.trim() === 'konbanwa') return 'こんばんは';
    let out = '';
    let i = 0;
    const vowels = 'aeiouy';
    while (i < src.length) {
      const ch = src[i];
      if (ch === ' ' || ch === '?' || ch === '!' || ch === ',' || ch === '.') {
        out += ch === '?' ? '？' : ch === ',' ? '、' : ch === '.' ? '。' : ch;
        i++;
        continue;
      }
      // Double consonant -> small tsu (exclude 'n')
      if (i + 1 < src.length && ch === src[i + 1] && ch !== 'n' && /[bcdfghjklmpqrstvwxz]/.test(ch)) {
        out += 'っ';
        i++;
        continue;
      }
      // Check 'nn' or 'n' before non-vowel
      if (ch === 'n') {
        const next = src[i + 1];
        if (next === "'") {
          out += 'ん';
          i += 2;
          continue;
        }
        if (next === 'n') {
          out += 'ん';
          i += (src[i + 2] && vowels.includes(src[i + 2])) ? 1 : 2;
          continue;
        }
        if (!next || (!vowels.includes(next) && next !== 'n')) {
          out += 'ん';
          i++;
          continue;
        }
      }
      // Match 3, 2, 1 chars
      const c3 = src.slice(i, i + 3);
      if (ROMAJI_TABLE[c3]) {
        out += ROMAJI_TABLE[c3];
        i += 3;
        continue;
      }
      const c2 = src.slice(i, i + 2);
      if (ROMAJI_TABLE[c2]) {
        out += ROMAJI_TABLE[c2];
        i += 2;
        continue;
      }
      if (ROMAJI_TABLE[ch]) {
        out += ROMAJI_TABLE[ch];
        i += 1;
        continue;
      }
      out += ch;
      i++;
    }
    return out;
  }

  // --- Romaji to Hangul phonetic converter (covers common phrases + syllable assembler) ---
  const KO_PHRASES = {
    annyeonghaseyo: '안녕하세요',
    annyeong: '안녕',
    gamsahamnida: '감사합니다',
    kamsahamnida: '감사합니다',
    gomawo: '고마워',
    gomawoyo: '고마워요',
    saranghaeyo: '사랑해요',
    saranghae: '사랑해',
    joesonghamnida: '죄송합니다',
    mianhae: '미안해',
    mianhaeyo: '미안해요',
    hangugeo: '한국어',
    hanguk: '한국',
    juseyo: '주세요',
    igeo: '이거',
    eolmayeyo: '얼마예요',
    eodiyeyo: '어디예요',
    jeogiyo: '저기요',
    jinjjayo: '진짜요',
    jinjja: '진짜',
    gwaenchanayo: '괜찮아요',
    daebak: '대박',
    eotteokhae: '어떡해',
    isseoyo: '있어요',
    eopseoyo: '없어요',
    ne: '네',
    aniyo: '아니요',
    bap: '밥',
    mul: '물',
    keopi: '커피',
    masisseoyo: '맛있어요',
    bogosipeo: '보고 싶어',
    sugo: '수고'
  };

  const CHO = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
  const JUNG = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
  const JONG = ['','g','kk','gs','n','nj','nh','d','l','lg','lm','lb','ls','lt','lp','lh','m','b','bs','s','ss','ng','j','ch','k','t','p','h'];

  function romajiToHangul(input) {
    if (!input) return '';
    const cleaned = String(input).trim().toLowerCase();
    if (KO_PHRASES[cleaned]) return KO_PHRASES[cleaned];

    // Word-by-word lookup + syllable composition fallback
    return cleaned.split(/(\s+|[?!.,])/).map((token) => {
      if (!token || /^\s+$/.test(token) || /^[?!.,]$/.test(token)) return token;
      if (KO_PHRASES[token]) return KO_PHRASES[token];
      return composeHangulWord(token);
    }).join('');
  }

  function composeHangulWord(word) {
    let out = '';
    let i = 0;
    const len = word.length;
    const isVowelChar = (c) => 'aeiouyw'.includes(c);

    while (i < len) {
      // Match initial consonant
      let choIdx = 11; // silent ieung ㅇ
      const c2 = word.slice(i, i + 2);
      const c1 = word[i];
      if (['kk','tt','pp','ss','jj','ch'].includes(c2)) {
        choIdx = CHO.indexOf(c2);
        i += 2;
      } else if (!isVowelChar(c1) && /[a-z]/.test(c1)) {
        const mapped = c1 === 'l' ? 'r' : c1;
        const idx = CHO.indexOf(mapped);
        if (idx !== -1) {
          choIdx = idx;
          i += 1;
        } else {
          out += c1;
          i += 1;
          continue;
        }
      }

      // Match vowel (longest first: 3, 2, 1)
      let jungIdx = -1;
      for (const size of [3, 2, 1]) {
        const v = word.slice(i, i + size);
        const idx = JUNG.indexOf(v);
        if (idx !== -1) {
          jungIdx = idx;
          i += size;
          break;
        }
      }
      if (jungIdx === -1) {
        out += c1;
        if (choIdx === 11) i++;
        continue;
      }

      // Match optional batchim (final consonant) only if not followed by vowel
      let jongIdx = 0;
      if (i < len) {
        const rem2 = word.slice(i, i + 2);
        const rem1 = word[i];
        const nextAfter2 = word[i + 2];
        const nextAfter1 = word[i + 1];

        if (rem2 === 'ng' && (!nextAfter2 || !isVowelChar(nextAfter2))) {
          jongIdx = JONG.indexOf('ng');
          i += 2;
        } else if (!isVowelChar(rem1) && /[a-z]/.test(rem1) && (!nextAfter1 || !isVowelChar(nextAfter1))) {
          const mappedJ = rem1 === 'r' ? 'l' : rem1;
          const jIdx = JONG.indexOf(mappedJ);
          if (jIdx > 0) {
            jongIdx = jIdx;
            i += 1;
          }
        }
      }

      const code = 0xAC00 + (choIdx * 21 + jungIdx) * 28 + jongIdx;
      out += String.fromCharCode(code);
    }
    return out;
  }

  function convertPhonetic(langCode, text) {
    if (langCode === 'ja') return romajiToHiragana(text);
    if (langCode === 'ko') return romajiToHangul(text);
    return text;
  }

  function buildJsonTemplate(langCode) {
    const meta = LANGUAGE_CATALOG.find((l) => l.code === langCode) || LANGUAGE_CATALOG[2];
    const lvl0 = meta.roadmap_levels[0] || 'A0';
    const lvl1 = meta.roadmap_levels[1] || 'A1';
    return {
      schema_version: '1.0',
      language: {
        code: meta.code,
        name_id: meta.name_id,
        name_native: meta.name_native,
        tts_lang: meta.tts_lang,
        script_type: meta.script_type,
        phonetic_input: meta.phonetic_input,
        roadmap_levels: meta.roadmap_levels
      },
      modules: [
        {
          id: `${meta.code}-${lvl0.toLowerCase()}-dasar`,
          level: lvl0,
          order: 1,
          title: `Pengenalan Dasar & Sapaan ${meta.name_id}`,
          category: 'dasar',
          estimated_minutes: 15,
          objectives: [
            `Mengenal bunyi dan sapaan inti bahasa ${meta.name_id}`,
            'Mempraktikkan frasa perkenalan singkat dengan audio TTS'
          ]
        }
      ],
      flashcards: [
        {
          id: `${meta.code}-fc-001`,
          module_id: `${meta.code}-${lvl0.toLowerCase()}-dasar`,
          level: lvl0,
          category: 'sapaan',
          front: meta.sample_word.native,
          reading: meta.sample_word.native,
          romaji: meta.sample_word.romaji,
          meaning_id: meta.sample_word.meaning,
          mnemonic: 'Ucapkan perlahan bersama tombol audio untuk mengunci pelafalan.',
          example_native: meta.sample_word.native,
          example_romaji: meta.sample_word.romaji,
          example_id: meta.sample_word.meaning,
          srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
        }
      ],
      quizzes: [
        {
          id: `${meta.code}-q-001`,
          module_id: `${meta.code}-${lvl0.toLowerCase()}-dasar`,
          type: 'multiple_choice',
          prompt: `Apa arti "${meta.sample_word.native}" dalam bahasa Indonesia?`,
          options: [meta.sample_word.meaning, 'Sampai jumpa', 'Terima kasih', 'Permisi'],
          answer: meta.sample_word.meaning,
          explanation_id: `"${meta.sample_word.native}" (${meta.sample_word.romaji}) berarti "${meta.sample_word.meaning}".`
        }
      ],
      dialogs: [
        {
          id: `${meta.code}-d-001`,
          module_id: `${meta.code}-${lvl0.toLowerCase()}-dasar`,
          title: `Sapaan Pertama (${meta.name_id})`,
          situation: 'Menyapa kenalan baru secara sopan.',
          register: 'polite',
          roles: { A: 'Anda', B: 'Teman Baru' },
          lines: [
            {
              role: 'A',
              native: meta.sample_word.native,
              reading: meta.sample_word.native,
              romaji: meta.sample_word.romaji,
              translation_id: meta.sample_word.meaning,
              notes: 'Sapaan pembuka standar.'
            }
          ]
        }
      ],
      readings: [
        {
          id: `${meta.code}-r-001`,
          module_id: `${meta.code}-${lvl0.toLowerCase()}-dasar`,
          title: `Bacaan Mini ${meta.name_id}`,
          level: lvl1,
          sentences: [
            {
              native: meta.sample_word.native,
              romaji: meta.sample_word.romaji,
              translation_id: meta.sample_word.meaning,
              tokens: [
                {
                  surface: meta.sample_word.native,
                  reading: meta.sample_word.native,
                  romaji: meta.sample_word.romaji,
                  meaning_id: meta.sample_word.meaning,
                  saveable: true
                }
              ]
            }
          ],
          comprehension_check: {
            question: 'Apa fungsi frasa pada bacaan singkat di atas?',
            options: ['Menyapa lawan bicara', 'Menanyakan harga', 'Meminta tagihan'],
            answer_index: 0,
            explanation_id: 'Frasa tersebut dipakai untuk menyapa lawan bicara.'
          }
        }
      ],
      grammar: [
        {
          id: `${meta.code}-g-001`,
          module_id: `${meta.code}-${lvl0.toLowerCase()}-dasar`,
          level: lvl0,
          pattern: meta.sample_word.native,
          formula: `${meta.sample_word.native} + konteks sopan`,
          meaning_id: `Digunakan sebagai sapaan dasar (${meta.sample_word.meaning}).`,
          common_mistakes_id: 'Perhatikan intonasi akhir dan situasi formal atau santai.',
          examples: [
            {
              native: meta.sample_word.native,
              romaji: meta.sample_word.romaji,
              translation_id: meta.sample_word.meaning
            }
          ],
          related_quiz_ids: [`${meta.code}-q-001`]
        }
      ]
    };
  }

  global.LingoData = global.LingoData || {};
  global.LingoData.LANGUAGE_CATALOG = LANGUAGE_CATALOG;
  global.LingoData.romajiToHiragana = romajiToHiragana;
  global.LingoData.romajiToHangul = romajiToHangul;
  global.LingoData.convertPhonetic = convertPhonetic;
  global.LingoData.buildJsonTemplate = buildJsonTemplate;
})(window);
