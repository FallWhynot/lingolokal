/* LingoLokal: Preloaded Japanese Language Pack (schema_version: 1.0) */
(function (global) {
  'use strict';

  const PACK_JA = {
    schema_version: '1.0',
    language: {
      code: 'ja',
      name_id: 'Jepang',
      name_native: '日本語',
      tts_lang: 'ja-JP',
      script_type: 'hiragana_katakana_kanji',
      phonetic_input: 'romaji_to_kana',
      roadmap_levels: ['A0', 'N5', 'N4', 'N3', 'N2', 'N1']
    },
    modules: [
      {
        id: 'ja-a0-hiragana',
        level: 'A0',
        order: 1,
        title: 'Hiragana Dasar & Sapaan Inti',
        category: 'hiragana',
        estimated_minutes: 15,
        objectives: [
          'Membaca 5 vokal dasar Hiragana (あ い う え お)',
          'Mengucapkan sapaan harian sopan (pagi, siang, terima kasih, permisi)',
          'Mengenali bunyi konsonan panjang dan partikel pembuka'
        ]
      },
      {
        id: 'ja-n5-travel',
        level: 'N5',
        order: 2,
        title: 'Percakapan Travel: Konbini, Restoran & Arah',
        category: 'travel',
        estimated_minutes: 25,
        objectives: [
          'Memesan makanan dan barang dengan pola ～をください',
          'Menanyakan harga (いくらですか) dan lokasi (どこですか)',
          'Memahami pertanyaan kasir konbini (温めますか dan 袋はいりません)'
        ]
      },
      {
        id: 'ja-n5-anime',
        level: 'N5',
        order: 3,
        title: 'Percakapan Santai & Frasa Anime Populer',
        category: 'anime',
        estimated_minutes: 20,
        objectives: [
          'Memahami 8 reaksi spontan yang sering muncul di anime dan obrolan teman',
          'Membedakan bentuk santai (タメ口) dengan bentuk sopan (です/ます)',
          'Menggunakan ajakan singkat dan konfirmasi alami'
        ]
      }
    ],
    flashcards: [
      // Module 1: A0 Hiragana & Sapaan (8 cards)
      {
        id: 'ja-fc-001', module_id: 'ja-a0-hiragana', level: 'A0', category: 'hiragana',
        front: 'あ', reading: 'あ', romaji: 'a', meaning_id: 'Vokal A (Hiragana)',
        mnemonic: 'Bentuknya mirip huruf "a" kecil yang dililit garis silang di bagian atas.',
        example_native: 'あさ、コーヒーをのみます。', example_romaji: 'Asa, koohii o nomimasu.', example_id: 'Pagi hari, saya minum kopi.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-002', module_id: 'ja-a0-hiragana', level: 'A0', category: 'hiragana',
        front: 'い', reading: 'い', romaji: 'i', meaning_id: 'Vokal I (Hiragana)',
        mnemonic: 'Dua garis melengkung sejajar seperti dua huruf "i" yang berdiri berdampingan.',
        example_native: 'いま、なんじですか。', example_romaji: 'Ima, nanji desu ka.', example_id: 'Sekarang jam berapa?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-003', module_id: 'ja-a0-hiragana', level: 'A0', category: 'hiragana',
        front: 'う', reading: 'う', romaji: 'u', meaning_id: 'Vokal U (Hiragana)',
        mnemonic: 'Mirip telinga menghadap kiri dengan coretan kecil di atasnya. Bunyinya "u" tanpa memonyongkan bibir terlalu maju.',
        example_native: 'うみがきれいです。', example_romaji: 'Umi ga kirei desu.', example_id: 'Lautnya indah.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-004', module_id: 'ja-a0-hiragana', level: 'A0', category: 'hiragana',
        front: 'え', reading: 'え', romaji: 'e', meaning_id: 'Vokal E (Hiragana)',
        mnemonic: 'Bayangkan huruf Z yang sedang berjingkat seperti huruf "e" dalam "energi".',
        example_native: 'えきはちかいです。', example_romaji: 'Eki wa chikai desu.', example_id: 'Stasiunnya dekat.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-005', module_id: 'ja-a0-hiragana', level: 'A0', category: 'hiragana',
        front: 'お', reading: 'お', romaji: 'o', meaning_id: 'Vokal O (Hiragana)',
        mnemonic: 'Mirip あ tetapi melingkar rapi dengan satu titik kecil di sebelah kanan atas.',
        example_native: 'おちゃをください。', example_romaji: 'Ocha o kudasai.', example_id: 'Tolong teh hijau.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-006', module_id: 'ja-a0-hiragana', level: 'A0', category: 'sapaan',
        front: 'おはようございます', reading: 'おはようございます', romaji: 'ohayou gozaimasu', meaning_id: 'Selamat pagi (sopan)',
        mnemonic: 'Pakai versi lengkap untuk guru, atasan, atau orang baru. Ke teman dekat cukup "ohayou".',
        example_native: 'おはようございます、せんせい。', example_romaji: 'Ohayou gozaimasu, sensei.', example_id: 'Selamat pagi, guru.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-007', module_id: 'ja-a0-hiragana', level: 'A0', category: 'sapaan',
        front: 'こんにちは', reading: 'こんにちは', romaji: 'konnichiwa', meaning_id: 'Halo / Selamat siang',
        mnemonic: 'Huruf terakhir ditulis は (ha) tetapi dibaca "wa" karena berasal dari partikel topik.',
        example_native: 'こんにちは、げんきですか。', example_romaji: 'Konnichiwa, genki desu ka.', example_id: 'Halo, apa kabar?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-008', module_id: 'ja-a0-hiragana', level: 'A0', category: 'sapaan',
        front: 'すみません', reading: 'すみません', romaji: 'sumimasen', meaning_id: 'Permisi / Maaf',
        mnemonic: 'Kata paling serbaguna di Jepang: memanggil pelayan, meminta maaf ringan, hingga berterima kasih saat merepotkan orang.',
        example_native: 'すみません、メニューをください。', example_romaji: 'Sumimasen, menyuu o kudasai.', example_id: 'Permisi, tolong menunya.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },

      // Module 2: N5 Travel Konbini, Restoran & Arah (8 cards)
      {
        id: 'ja-fc-009', module_id: 'ja-n5-travel', level: 'N5', category: 'travel',
        front: '～をください', reading: '～をください', romaji: '... o kudasai', meaning_id: 'Tolong berikan ... (memesan barang)',
        mnemonic: 'Partikel を ditulis "wo" tapi diucapkan "o" halus. Tempelkan langsung setelah nama barang.',
        example_native: 'おすしをふたつください。', example_romaji: 'Osushi o futatsu kudasai.', example_id: 'Minta sushi dua porsi.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-010', module_id: 'ja-n5-travel', level: 'N5', category: 'travel',
        front: 'いくらですか', reading: 'いくらですか', romaji: 'ikura desu ka', meaning_id: 'Berapa harganya?',
        mnemonic: 'Ingat "ikura" (telur salmon yang mahal) untuk mengingat pertanyaan tentang harga.',
        example_native: 'このおにぎりはいくらですか。', example_romaji: 'Kono onigiri wa ikura desu ka.', example_id: 'Onigiri ini berapa harganya?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-011', module_id: 'ja-n5-travel', level: 'N5', category: 'travel',
        front: 'どこですか', reading: 'どこですか', romaji: 'doko desu ka', meaning_id: 'Di mana?',
        mnemonic: 'Pasangkan dengan tempat + は (wa) di depan untuk bertanya arah dengan sopan.',
        example_native: 'トイレはどこですか。', example_romaji: 'Toire wa doko desu ka.', example_id: 'Toiletnya di mana?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-012', module_id: 'ja-n5-travel', level: 'N5', category: 'konbini',
        front: '温めますか', reading: 'あたためますか', romaji: 'atatamemasu ka', meaning_id: 'Apakah mau dihangatkan?',
        mnemonic: 'Pertanyaan khas kasir konbini saat kamu membeli bento. Jawab "はい、おねがいします" jika mau.',
        example_native: 'お弁当、温めますか。', example_romaji: 'Obentou, atatamemasu ka.', example_id: 'Bentoya mau dihangatkan?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-013', module_id: 'ja-n5-travel', level: 'N5', category: 'konbini',
        front: '袋はいりません', reading: 'ふくろはいりません', romaji: 'fukuro wa irimasen', meaning_id: 'Saya tidak perlu kantong plastik',
        mnemonic: 'Fukuro = kantong. Irimasen = tidak butuh (jangan tertukar dengan imasen = tidak ada orang).',
        example_native: '大丈夫です、袋はいりません。', example_romaji: 'Daijoubu desu, fukuro wa irimasen.', example_id: 'Tidak apa-apa, tidak perlu kantong.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-014', module_id: 'ja-n5-travel', level: 'N5', category: 'travel',
        front: 'お会計お願いします', reading: 'おかいけいおねがいします', romaji: 'okaikei onegaishimasu', meaning_id: 'Tolong bon / minta tagihan',
        mnemonic: 'Ucapkan saat selesai makan di restoran sambil memberi isyarat sopan ke staf.',
        example_native: 'すみません、お会計お願いします。', example_romaji: 'Sumimasen, okaikei onegaishimasu.', example_id: 'Permisi, minta tagihannya.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-015', module_id: 'ja-n5-travel', level: 'N5', category: 'travel',
        front: 'カードで払えますか', reading: 'かーどではらえますか', romaji: 'kaado de haraemasu ka', meaning_id: 'Bisa bayar pakai kartu?',
        mnemonic: 'Partikel で (de) menandakan alat/cara pembayaran.',
        example_native: 'すみません、カードで払えますか。', example_romaji: 'Sumimasen, kaado de haraemasu ka.', example_id: 'Permisi, bisa bayar pakai kartu?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-016', module_id: 'ja-n5-travel', level: 'N5', category: 'travel',
        front: 'まっすぐ', reading: 'まっすぐ', romaji: 'massugu', meaning_id: 'Lurus terus',
        mnemonic: 'Ada っ kecil (jeda sebentar) sebelum "su". Sering dipakai bersama 行ってください (silakan jalan).',
        example_native: 'ここをまっすぐ行ってください。', example_romaji: 'Koko o massugu itte kudasai.', example_id: 'Silakan jalan lurus terus dari sini.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },

      // Module 3: N5 Percakapan Santai & Frasa Anime (8 cards)
      {
        id: 'ja-fc-017', module_id: 'ja-n5-anime', level: 'N5', category: 'anime',
        front: 'すごい', reading: 'すごい', romaji: 'sugoi', meaning_id: 'Keren / Hebat sekali',
        mnemonic: 'Kata sifat-i paling sering terdengar untuk memuji sesuatu yang mengagumkan.',
        example_native: 'うわ、この絵すごいね！', example_romaji: 'Uwa, kono e sugoi ne!', example_id: 'Wah, gambar ini keren banget ya!',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-018', module_id: 'ja-n5-anime', level: 'N5', category: 'anime',
        front: 'マジで？', reading: 'まじで？', romaji: 'maji de?', meaning_id: 'Seriusan? / Beneran?',
        mnemonic: 'Versi kasual dari 本当ですか (hontou desu ka). Hindari memakainya ke atasan atau orang yang lebih tua.',
        example_native: 'マジで？明日休みなの？', example_romaji: 'Maji de? Ashita yasumi na no?', example_id: 'Seriusan? Besok libur?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-019', module_id: 'ja-n5-anime', level: 'N5', category: 'anime',
        front: '大丈夫', reading: 'だいじょうぶ', romaji: 'daijoubu', meaning_id: 'Tidak apa-apa / Aman',
        mnemonic: 'Bisa dipakai untuk menenangkan orang ("tenang, aman") atau menolak halus ("tidak usah, terima kasih").',
        example_native: '大丈夫？けがはない？', example_romaji: 'Daijoubu? Kega wa nai?', example_id: 'Kamu baik-baik saja? Tidak terluka?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-020', module_id: 'ja-n5-anime', level: 'N5', category: 'anime',
        front: 'ちょっと待って', reading: 'ちょっとまって', romaji: 'chotto matte', meaning_id: 'Tunggu sebentar',
        mnemonic: 'Bentuk sopannya adalah ちょっと待ってください (chotto matte kudasai).',
        example_native: 'ちょっと待って、今行くよ！', example_romaji: 'Chotto matte, ima iku yo!', example_id: 'Tunggu sebentar, aku ke sana sekarang!',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-021', module_id: 'ja-n5-anime', level: 'N5', category: 'anime',
        front: 'やばい', reading: 'やばい', romaji: 'yabai', meaning_id: 'Gawat / Gila (bisa positif atau negatif)',
        mnemonic: 'Aslinya berarti "bahaya", sekarang anak muda juga memakainya untuk "enak banget" atau "keren banget".',
        example_native: 'やばい、電車に乗り遅れる！', example_romaji: 'Yabai, densha ni noriokureru!', example_id: 'Gawat, bakal ketinggalan kereta!',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-022', module_id: 'ja-n5-anime', level: 'N5', category: 'anime',
        front: 'なるほど', reading: 'なるほど', romaji: 'naruhodo', meaning_id: 'Oh begitu / Masuk akal',
        mnemonic: 'Dipakai saat kamu baru paham penjelasan seseorang. Ke atasan lebih aman bilang わかりました.',
        example_native: 'なるほど、そういうことか。', example_romaji: 'Naruhodo, sou iu koto ka.', example_id: 'Oh begitu, ternyata maksudnya itu.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-023', module_id: 'ja-n5-anime', level: 'N5', category: 'anime',
        front: '行こう', reading: 'いこう', romaji: 'ikou', meaning_id: 'Ayo berangkat / Yuk pergi',
        mnemonic: 'Bentuk ajakan santai dari 行く (iku). Bentuk sopannya adalah 行きましょう (ikimashou).',
        example_native: 'そろそろ行こう！', example_romaji: 'Sorosoro ikou!', example_id: 'Yuk kita berangkat sekarang!',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ja-fc-024', module_id: 'ja-n5-anime', level: 'N5', category: 'anime',
        front: 'わかる', reading: 'わかる', romaji: 'wakaru', meaning_id: 'Paham / Ngerti banget',
        mnemonic: 'Sering diucapkan pendek "わかる！" untuk menyetujui curhatan teman ("relatable banget!").',
        example_native: 'その気持ち、すごくわかる。', example_romaji: 'Sono kimochi, sugoku wakaru.', example_id: 'Perasaan itu, aku paham banget.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      }
    ],
    quizzes: [
      {
        id: 'ja-q-001', module_id: 'ja-a0-hiragana', type: 'multiple_choice',
        prompt: 'Manakah sapaan yang paling tepat saat memanggil pelayan restoran atau meminta maaf ringan?',
        options: ['すみません (Sumimasen)', 'おはようございます (Ohayou gozaimasu)', 'なるほど (Naruhodo)', '行こう (Ikou)'],
        answer: 'すみません (Sumimasen)',
        explanation_id: 'すみません dipakai untuk "permisi" saat memanggil staf sekaligus "maaf" ringan.'
      },
      {
        id: 'ja-q-002', module_id: 'ja-a0-hiragana', type: 'matching',
        prompt: 'Pasangkan huruf Hiragana vokal dasar dengan bunyi Romajinya.',
        pairs: [
          { left: 'あ', right: 'a' },
          { left: 'い', right: 'i' },
          { left: 'う', right: 'u' },
          { left: 'お', right: 'o' }
        ],
        explanation_id: 'Urutan 5 vokal dasar Hiragana adalah あ(a), い(i), う(u), え(e), お(o).'
      },
      {
        id: 'ja-q-003', module_id: 'ja-a0-hiragana', type: 'translation',
        prompt: 'Ketik sapaan "Halo / Selamat siang" dalam bahasa Jepang (bisa pakai Romaji, akan otomatis jadi Hiragana).',
        accepted_answers: ['こんにちは', 'konnichiwa'],
        explanation_id: 'こんにちは (konnichiwa) adalah sapaan siang standar. Huruf は di akhir dibaca "wa".'
      },
      {
        id: 'ja-q-004', module_id: 'ja-n5-travel', type: 'word_order',
        prompt: 'Urutkan kata berikut menjadi pesanan di restoran: "Minta sushi dua porsi."',
        tokens: ['ください', 'おすしを', 'ふたつ'],
        answer: ['おすしを', 'ふたつ', 'ください'],
        explanation_id: 'Dalam bahasa Jepang, objek (おすしを) lalu jumlah (ふたつ), dan kata kerja permintaan (ください) selalu di akhir.'
      },
      {
        id: 'ja-q-005', module_id: 'ja-n5-travel', type: 'fill_blank',
        prompt: 'Lengkapi pertanyaan kasir konbini: 「お弁当、＿＿＿か？」 (Bentoya mau dihangatkan?)',
        options: ['温めます (atatamemasu)', 'いりません (irimasen)', 'どこです (doko desu)', 'いくらです (ikura desu)'],
        answer: '温めます (atatamemasu)',
        explanation_id: '温めますか (atatamemasu ka) berarti "Apakah mau dihangatkan?".'
      },
      {
        id: 'ja-q-006', module_id: 'ja-n5-travel', type: 'multiple_choice',
        prompt: 'Kasir menawarkan kantong plastik, namun kamu membawa tas sendiri. Apa yang kamu ucapkan?',
        options: ['袋はいりません', 'お会計お願いします', 'いくらですか', 'まっすぐ行ってください'],
        answer: '袋はいりません',
        explanation_id: '袋はいりません (fukuro wa irimasen) artinya "Saya tidak memerlukan kantong plastik".'
      },
      {
        id: 'ja-q-007', module_id: 'ja-n5-travel', type: 'translation',
        prompt: 'Terjemahkan ke bahasa Jepang: "Berapa harganya?" (Hiragana atau Romaji).',
        accepted_answers: ['いくらですか', 'いくらですか？', 'ikura desu ka', 'ikuradesuka'],
        explanation_id: 'いくらですか (ikura desu ka) dipakai untuk menanyakan harga barang atau makanan.'
      },
      {
        id: 'ja-q-008', module_id: 'ja-n5-anime', type: 'fill_blank',
        prompt: 'Temanmu bercerita kabar mengejutkan, kamu ingin membalas santai "Seriusan?!": 「＿＿＿？本当なの？」',
        options: ['マジで', 'すみません', '袋は', 'まっすぐ'],
        answer: 'マジで',
        explanation_id: 'マジで (maji de) adalah ungkapan kaget santai yang sangat umum antar teman sebaya.'
      },
      {
        id: 'ja-q-009', module_id: 'ja-n5-anime', type: 'word_order',
        prompt: 'Susun kalimat santai: "Tunggu sebentar, aku paham kok."',
        tokens: ['わかるよ', 'ちょっと', '待って、'],
        answer: ['ちょっと', '待って、', 'わかるよ'],
        explanation_id: 'ちょっと待って (tunggu sebentar) diikuti わかるよ (aku paham kok).'
      },
      {
        id: 'ja-q-010', module_id: 'ja-n5-anime', type: 'matching',
        prompt: 'Pasangkan frasa anime santai dengan padanan bahasa Indonesianya.',
        pairs: [
          { left: 'なるほど', right: 'Oh begitu / Masuk akal' },
          { left: '行こう', right: 'Ayo berangkat' },
          { left: 'やばい', right: 'Gawat / Gila banget' },
          { left: '大丈夫', right: 'Tidak apa-apa' }
        ],
        explanation_id: 'Keempat frasa ini muncul berulang di hampir setiap episode anime dan percakapan sehari-hari.'
      }
    ],
    dialogs: [
      {
        id: 'ja-d-001',
        module_id: 'ja-n5-travel',
        title: 'Belanja Bento di Konbini',
        situation: 'Membeli bento dan teh hijau di kasir minimarket Tokyo.',
        register: 'polite',
        roles: { A: 'Kasir', B: 'Pembeli (Anda)' },
        lines: [
          { role: 'A', native: 'いらっしゃいませ！お弁当、温めますか？', reading: 'いらっしゃいませ！おべんとう、あたためますか？', romaji: 'Irasshaimase! Obentou, atatamemasu ka?', translation_id: 'Selamat datang! Bentoya mau dihangatkan?', notes: 'Kasir selalu menyapa dengan irasshaimase; kamu tidak wajib membalas sapaan ini.' },
          { role: 'B', native: 'はい、お願いします。', reading: 'はい、おねがいします。', romaji: 'Hai, onegaishimasu.', translation_id: 'Ya, tolong ya.', notes: 'Jawaban singkat paling sopan dan alami.' },
          { role: 'A', native: '袋はご入用ですか？', reading: 'ふくろはごにゅうようですか？', romaji: 'Fukuro wa go-nyuuyou desu ka?', translation_id: 'Apakah perlu kantong plastik?', notes: 'ご入用 (go-nyuuyou) adalah bentuk sangat sopan dari "perlu".' },
          { role: 'B', native: '大丈夫です、袋はいりません。', reading: 'だいじょうぶです、ふくろはいりません。', romaji: 'Daijoubu desu, fukuro wa irimasen.', translation_id: 'Tidak apa-apa, saya tidak perlu kantong.', notes: 'Menambahkan 大丈夫です di depan membuat penolakan terdengar lembut.' },
          { role: 'A', native: '680円になります。', reading: 'ろっぴゃくはちじゅうえんになります。', romaji: 'Roppyaku hachijuu en ni narimasu.', translation_id: 'Totalnya menjadi 680 yen.', notes: 'Kasir sering memakai ～になります untuk menyebut total belanja.' },
          { role: 'B', native: 'カードで払えますか？', reading: 'かーどではらえますか？', romaji: 'Kaado de haraemasu ka?', translation_id: 'Bisa bayar pakai kartu?', notes: 'Juga bisa menyebut nama kartu elektronik seperti Suica atau ICOCA.' }
        ]
      },
      {
        id: 'ja-d-002',
        module_id: 'ja-n5-anime',
        title: 'Nongkrong Setelah Kelas',
        situation: 'Dua teman dekat merencanakan makan ramen bersama.',
        register: 'casual',
        roles: { A: 'Ren', B: 'Yuki (Anda)' },
        lines: [
          { role: 'A', native: 'ねえ、駅前の新しいラーメン屋、行った？', reading: 'ねえ、えきまえのあたらしいらーめんや、いった？', romaji: 'Nee, ekimae no atarashii raamen-ya, itta?', translation_id: 'Eh, sudah ke kedai ramen baru di depan stasiun belum?', notes: 'Akhiran た (itta) adalah bentuk lampau kasual dari 行く.' },
          { role: 'B', native: 'まだ！おいしいの？', reading: 'まだ！おいしいの？', romaji: 'Mada! Oishii no?', translation_id: 'Belum! Enak memangnya?', notes: 'Partikel の dengan intonasi naik berfungsi sebagai penanya santai.' },
          { role: 'A', native: 'やばいよ、スープがすごい濃厚なんだ！', reading: 'やばいよ、すーぷがすごいのうこうなんだ！', romaji: 'Yabai yo, suupu ga sugoi noukou nanda!', translation_id: 'Gila sih, kuahnya kental banget!', notes: 'Di sini やばい bermakna positif ("enak banget").' },
          { role: 'B', native: 'マジで？じゃあ今日行こう！', reading: 'まじで？じゃあきょういこう！', romaji: 'Maji de? Jaa kyou ikou!', translation_id: 'Seriusan? Kalau gitu yuk pergi hari ini!', notes: '行こう (ikou) adalah bentuk ajakan santai.' },
          { role: 'A', native: 'ちょっと待って、財布確認する。大丈夫、ある！', reading: 'ちょっとまって、さいふかくにんする。だいじょうぶ、ある！', romaji: 'Chotto matte, saifu kakunin suru. Daijoubu, aru!', translation_id: 'Tunggu sebentar, aku cek dompet dulu. Aman, ada!', notes: 'Pola kalimat pendek khas obrolan langsung.' }
        ]
      }
    ],
    readings: [
      {
        id: 'ja-r-001',
        module_id: 'ja-n5-travel',
        title: 'コンビニで (Di Konbini)',
        level: 'N5',
        sentences: [
          {
            native: '日本にはコンビニがたくさんあります。',
            romaji: 'Nihon ni wa konbini ga takusan arimasu.',
            translation_id: 'Di Jepang ada banyak sekali konbini.',
            tokens: [
              { surface: '日本', reading: 'にほん', romaji: 'nihon', meaning_id: 'Jepang', saveable: true },
              { surface: 'には', reading: 'には', romaji: 'ni wa', meaning_id: 'di (penegas lokasi)', saveable: false },
              { surface: 'コンビニ', reading: 'こんびに', romaji: 'konbini', meaning_id: 'minimarket 24 jam', saveable: true },
              { surface: 'が', reading: 'が', romaji: 'ga', meaning_id: 'partikel subjek', saveable: false },
              { surface: 'たくさん', reading: 'たくさん', romaji: 'takusan', meaning_id: 'banyak', saveable: true },
              { surface: 'あります。', reading: 'あります', romaji: 'arimasu', meaning_id: 'ada (benda mati)', saveable: true }
            ]
          },
          {
            native: '私は毎朝コンビニでおにぎりとお茶を買います。',
            romaji: 'Watashi wa maiasa konbini de onigiri to ocha o kaimasu.',
            translation_id: 'Saya membeli onigiri dan teh hijau di konbini setiap pagi.',
            tokens: [
              { surface: '私', reading: 'わたし', romaji: 'watashi', meaning_id: 'saya', saveable: true },
              { surface: 'は', reading: 'は', romaji: 'wa', meaning_id: 'partikel topik', saveable: false },
              { surface: '毎朝', reading: 'まいあさ', romaji: 'maiasa', meaning_id: 'setiap pagi', saveable: true },
              { surface: 'コンビニで', reading: 'こんびにで', romaji: 'konbini de', meaning_id: 'di konbini (lokasi aktivitas)', saveable: false },
              { surface: 'おにぎり', reading: 'おにぎり', romaji: 'onigiri', meaning_id: 'nasi kepal Jepang', saveable: true },
              { surface: 'と', reading: 'と', romaji: 'to', meaning_id: 'dan', saveable: false },
              { surface: 'お茶', reading: 'おちゃ', romaji: 'ocha', meaning_id: 'teh hijau', saveable: true },
              { surface: 'を買います。', reading: 'をかいます', romaji: 'o kaimasu', meaning_id: 'membeli', saveable: true }
            ]
          },
          {
            native: 'コンビニはとても便利です。',
            romaji: 'Konbini wa totemo benri desu.',
            translation_id: 'Konbini sangat praktis.',
            tokens: [
              { surface: 'コンビニ', reading: 'こんびに', romaji: 'konbini', meaning_id: 'minimarket', saveable: true },
              { surface: 'は', reading: 'は', romaji: 'wa', meaning_id: 'partikel topik', saveable: false },
              { surface: 'とても', reading: 'とても', romaji: 'totemo', meaning_id: 'sangat', saveable: true },
              { surface: '便利', reading: 'べんり', romaji: 'benri', meaning_id: 'praktis / serbaguna', saveable: true },
              { surface: 'です。', reading: 'です', romaji: 'desu', meaning_id: 'kopula sopan', saveable: false }
            ]
          }
        ],
        comprehension_check: {
          question: 'Apa yang dibeli penulis di konbini setiap pagi?',
          options: [
            'Onigiri dan teh hijau',
            'Bento hangat dan kopi',
            'Ramen dan air mineral'
          ],
          answer_index: 0,
          explanation_id: 'Kalimat kedua menyebut おにぎり (onigiri) と お茶 (teh hijau) を買います (membeli).'
        }
      }
    ],
    grammar: [
      {
        id: 'ja-g-001',
        module_id: 'ja-n5-travel',
        level: 'N5',
        pattern: '～をください',
        formula: '[Kata Benda] + を + ください',
        meaning_id: 'Meminta atau memesan benda secara sopan ("Tolong berikan ...").',
        common_mistakes_id: 'Pelajar Indonesia sering menukar urutan menjadi "kudasai ocha" seperti bahasa Indonesia ("tolong teh"). Di bahasa Jepang, kata benda selalu di depan dan ください di paling akhir.',
        examples: [
          { native: 'お水をください。', romaji: 'Omizu o kudasai.', translation_id: 'Tolong air putih.' },
          { native: 'これをふたつください。', romaji: 'Kore o futatsu kudasai.', translation_id: 'Tolong yang ini dua buah.' }
        ],
        related_quiz_ids: ['ja-q-004', 'ja-q-006']
      },
      {
        id: 'ja-g-002',
        module_id: 'ja-n5-travel',
        level: 'N5',
        pattern: '～はどこですか / ～はいくらですか',
        formula: '[Topik] + は + どこ / いくら + ですか',
        meaning_id: 'Menanyakan lokasi (どこ) atau harga (いくら) suatu objek dengan bentuk sopan.',
        common_mistakes_id: 'Jangan lupa akhiran か (ka) di kalimat tanya sopan, dan hindari memakai partikel が saat topik sudah jelas; pakai は (dibaca wa).',
        examples: [
          { native: '駅はどこですか。', romaji: 'Eki wa doko desu ka.', translation_id: 'Stasiunnya di mana?' },
          { native: 'この本はいくらですか。', romaji: 'Kono hon wa ikura desu ka.', translation_id: 'Buku ini berapa harganya?' }
        ],
        related_quiz_ids: ['ja-q-005', 'ja-q-007']
      },
      {
        id: 'ja-g-003',
        module_id: 'ja-n5-anime',
        level: 'N5',
        pattern: 'Bentuk Santai (タメ口) vs Sopan (です/ます)',
        formula: 'Akar Kata Kerja / Kata Sifat tanpa です・ます',
        meaning_id: 'Membedakan register obrolan teman sebaya (行こう, わかる, マジで) dengan situasi formal atau orang asing (行きましょう, わかります, 本当ですか).',
        common_mistakes_id: 'Terlalu sering meniru dialog anime ke orang yang baru dikenal di Jepang bisa terdengar kurang sopan. Simpan bentuk santai untuk teman dekat.',
        examples: [
          { native: '一緒に行こう！ (Santai) / 一緒に行きましょう。 (Sopan)', romaji: 'Issho ni ikou! / Issho ni ikimashou.', translation_id: 'Yuk pergi bareng! / Mari kita pergi bersama.' }
        ],
        related_quiz_ids: ['ja-q-008', 'ja-q-009', 'ja-q-010']
      }
    ]
  };

  global.LingoData = global.LingoData || {};
  global.LingoData.PACK_JA = PACK_JA;
})(window);
