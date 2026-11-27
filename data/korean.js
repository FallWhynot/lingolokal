/* LingoLokal: Preloaded Korean Language Pack (schema_version: 1.0) */
(function (global) {
  'use strict';

  const PACK_KO = {
    schema_version: '1.0',
    language: {
      code: 'ko',
      name_id: 'Korea',
      name_native: '한국어',
      tts_lang: 'ko-KR',
      script_type: 'hangul',
      phonetic_input: 'romaji_to_hangul',
      roadmap_levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    },
    modules: [
      {
        id: 'ko-a0-hangul',
        level: 'A0',
        order: 1,
        title: 'Hangul Dasar & Sapaan Inti',
        category: 'hangul',
        estimated_minutes: 15,
        objectives: [
          'Membaca 5 vokal inti Hangul (아 어 오 우 이) dan fungsi konsonan ㅇ',
          'Mengucapkan sapaan wajib sopan (안녕하세요, 감사합니다, 죄송합니다)',
          'Memahami struktur blok suku kata Hangul'
        ]
      },
      {
        id: 'ko-a1-daily',
        level: 'A1',
        order: 2,
        title: 'Percakapan Harian, Kafe & Travel',
        category: 'travel',
        estimated_minutes: 25,
        objectives: [
          'Memesan minuman dan makanan dengan pola 이거 주세요 & 포장해 주세요',
          'Menanyakan harga (얼마예요?), lokasi (어디예요?), dan pembayaran kartu',
          'Memanggil staf dengan sopan menggunakan 저기요'
        ]
      },
      {
        id: 'ko-a1-kdrama',
        level: 'A1',
        order: 3,
        title: 'Frasa K-Drama & Sistem 반말/존댓말',
        category: 'kdrama',
        estimated_minutes: 20,
        objectives: [
          'Mengenali 8 ungkapan emosional paling sering muncul di K-Drama',
          'Membedakan kalimat sopan (존댓말) dan kalimat akrab (반말)',
          'Memahami budaya sapaan makan (밥 먹었어?) dan apresiasi kerja (수고했어요)'
        ]
      }
    ],
    flashcards: [
      // Module 1: A0 Hangul & Sapaan (8 cards)
      {
        id: 'ko-fc-001', module_id: 'ko-a0-hangul', level: 'A0', category: 'hangul',
        front: '아', reading: '아', romaji: 'a', meaning_id: 'Vokal A (Hangul)',
        mnemonic: 'Garis pendek mengarah ke kanan (arah matahari terbit = "A"). Lingkaran ㅇ di kiri tidak berbunyi.',
        example_native: '아침에 커피를 마셔요.', example_romaji: 'Achime keopireul masyeoyo.', example_id: 'Pagi hari saya minum kopi.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-002', module_id: 'ko-a0-hangul', level: 'A0', category: 'hangul',
        front: '어', reading: '어', romaji: 'eo', meaning_id: 'Vokal EO (seperti "o" terbuka pada "toko")',
        mnemonic: 'Garis pendek mengarah ke kiri (masuk ke dalam). Mulut dibuka santai seperti mengucapkan "o" tanpa membulatkan bibir.',
        example_native: '어디에 가요?', example_romaji: 'Eodie gayo?', example_id: 'Mau pergi ke mana?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-003', module_id: 'ko-a0-hangul', level: 'A0', category: 'hangul',
        front: '오', reading: '오', romaji: 'o', meaning_id: 'Vokal O (bulat, bibir maju)',
        mnemonic: 'Garis pendek menunjuk ke atas (over = O).',
        example_native: '오늘 날씨가 좋아요.', example_romaji: 'Oneul nalssiga joayo.', example_id: 'Cuaca hari ini bagus.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-004', module_id: 'ko-a0-hangul', level: 'A0', category: 'hangul',
        front: '우', reading: '우', romaji: 'u', meaning_id: 'Vokal U (Hangul)',
        mnemonic: 'Garis pendek menunjuk ke bawah (under = U).',
        example_native: '우유를 좋아해요.', example_romaji: 'Uyureul joahaeyo.', example_id: 'Saya suka susu.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-005', module_id: 'ko-a0-hangul', level: 'A0', category: 'hangul',
        front: '이', reading: '이', romaji: 'i', meaning_id: 'Vokal I (Hangul)',
        mnemonic: 'Satu garis tegak lurus seperti huruf "I" kapital.',
        example_native: '이름이 뭐예요?', example_romaji: 'Ireumi mwoyeyo?', example_id: 'Siapa nama Anda?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-006', module_id: 'ko-a0-hangul', level: 'A0', category: 'sapaan',
        front: '안녕하세요', reading: '안녕하세요', romaji: 'annyeonghaseyo', meaning_id: 'Halo (sapaan sopan kapan saja)',
        mnemonic: 'Bisa dipakai pagi, siang, maupun malam. Akar katanya 안녕 berarti "damai/sehat".',
        example_native: '안녕하세요, 만나서 반갑습니다.', example_romaji: 'Annyeonghaseyo, mannaseo bangapseumnida.', example_id: 'Halo, senang bertemu dengan Anda.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-007', module_id: 'ko-a0-hangul', level: 'A0', category: 'sapaan',
        front: '감사합니다', reading: '감사합니다', romaji: 'gamsahamnida', meaning_id: 'Terima kasih (formal sopan)',
        mnemonic: 'Huruf ㅂ sebelum ㄴ dibaca "m", jadi diucapkan gam-sa-ham-ni-da.',
        example_native: '도와주셔서 감사합니다.', example_romaji: 'Dowajusyeoseo gamsahamnida.', example_id: 'Terima kasih sudah membantu.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-008', module_id: 'ko-a0-hangul', level: 'A0', category: 'sapaan',
        front: '죄송합니다', reading: '죄송합니다', romaji: 'joesonghamnida', meaning_id: 'Mohon maaf (formal sopan)',
        mnemonic: 'Lebih sopan daripada 미안해요 (mianhaeyo). Gunakan kepada orang asing, staf, atau orang lebih tua.',
        example_native: '늦어서 죄송합니다.', example_romaji: 'Neujeoseo joesonghamnida.', example_id: 'Mohon maaf saya terlambat.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },

      // Module 2: A1 Percakapan Harian, Kafe & Travel (8 cards)
      {
        id: 'ko-fc-009', module_id: 'ko-a1-daily', level: 'A1', category: 'travel',
        front: '이거 주세요', reading: '이거 주세요', romaji: 'igeo juseyo', meaning_id: 'Tolong yang ini',
        mnemonic: '이거 (ini) + 주세요 (tolong beri). Frasa penyelamat saat memesan makanan sambil menunjuk menu.',
        example_native: '아이스 아메리카노 한 잔 주세요.', example_romaji: 'Aiseu amerikano han jan juseyo.', example_id: 'Tolong satu gelas es americano.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-010', module_id: 'ko-a1-daily', level: 'A1', category: 'travel',
        front: '얼마예요?', reading: '얼마예요?', romaji: 'eolmayeyo?', meaning_id: 'Berapa harganya?',
        mnemonic: '얼마 (berapa) + 예요 (kopula sopan). Naikkan intonasi di akhir kalimat.',
        example_native: '이 빵은 얼마예요?', example_romaji: 'I ppangeun eolmayeyo?', example_id: 'Roti ini berapa harganya?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-011', module_id: 'ko-a1-daily', level: 'A1', category: 'travel',
        front: '어디예요?', reading: '어디예요?', romaji: 'eodiyeyo?', meaning_id: 'Di mana?',
        mnemonic: 'Sebutkan tempat di depan lalu tambah 어디예요?',
        example_native: '지하철역이 어디예요?', example_romaji: 'Jihacheoryeogi eodiyeyo?', example_id: 'Stasiun kereta bawah tanahnya di mana?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-012', module_id: 'ko-a1-daily', level: 'A1', category: 'kafe',
        front: '포장해 주세요', reading: '포장해 주세요', romaji: 'pojanghae juseyo', meaning_id: 'Tolong dibungkus (takeaway)',
        mnemonic: '포장 (bungkus/kemas). Sangat sering dipakai di kafe dan kedai jajanan Korea.',
        example_native: '떡볶이 하나 포장해 주세요.', example_romaji: 'Tteokbokki hana pojanghae juseyo.', example_id: 'Tolong bungkus satu tteokbokki.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-013', module_id: 'ko-a1-daily', level: 'A1', category: 'kafe',
        front: '저기요', reading: '저기요', romaji: 'jeogiyo', meaning_id: 'Permisi (memanggil staf)',
        mnemonic: 'Secara harfiah berarti "di sana", dipakai untuk menarik perhatian pelayan restoran dengan sopan.',
        example_native: '저기요, 물 좀 주세요.', example_romaji: 'Jeogiyo, mul jom juseyo.', example_id: 'Permisi, minta air putih dong.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-014', module_id: 'ko-a1-daily', level: 'A1', category: 'travel',
        front: '카드 돼요?', reading: '카드 돼요?', romaji: 'kadeu dwaeyo?', meaning_id: 'Bisa bayar pakai kartu?',
        mnemonic: '돼요 berasal dari 되다 (bisa/boleh). Pola "[benda] 돼요?" sangat praktis.',
        example_native: '여기 카드 돼요?', example_romaji: 'Yeogi kadeu dwaeyo?', example_id: 'Di sini bisa pakai kartu?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-015', module_id: 'ko-a1-daily', level: 'A1', category: 'kafe',
        front: '여기서 먹을게요', reading: '여기서 먹을게요', romaji: 'yeogiseo meogeulgeyo', meaning_id: 'Saya makan/minum di sini',
        mnemonic: 'Kebalikan dari 포장해 주세요. Diucapkan saat kasir kafe bertanya makan di tempat atau bungkus.',
        example_native: '아니요, 여기서 먹을게요.', example_romaji: 'Aniyo, yeogiseo meogeulgeyo.', example_id: 'Tidak, saya makan di sini saja.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-016', module_id: 'ko-a1-daily', level: 'A1', category: 'travel',
        front: '영수증 버려 주세요', reading: '영수증 버려 주세요', romaji: 'yeongsujeung beoryeo juseyo', meaning_id: 'Struknya tolong dibuang saja',
        mnemonic: '영수증 (struk) + 버려 주세요 (tolong buang). Frasa favorit warga lokal di kasir.',
        example_native: '네, 영수증 버려 주세요.', example_romaji: 'Ne, yeongsujeung beoryeo juseyo.', example_id: 'Ya, struknya dibuang saja.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },

      // Module 3: A1 Frasa K-Drama & 반말/존댓말 (8 cards)
      {
        id: 'ko-fc-017', module_id: 'ko-a1-kdrama', level: 'A1', category: 'kdrama',
        front: '진짜요?', reading: '진짜요?', romaji: 'jinjjayo?', meaning_id: 'Benaran? / Serius?',
        mnemonic: 'Hilangkan 요 menjadi 진짜? untuk versi banmal (santai ke teman dekat).',
        example_native: '진짜요? 믿을 수 없어요!', example_romaji: 'Jinjjayo? Mideul su eopseoyo!', example_id: 'Benaran? Saya tidak bisa percaya!',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-018', module_id: 'ko-a1-kdrama', level: 'A1', category: 'kdrama',
        front: '괜찮아요', reading: '괜찮아요', romaji: 'gwaenchanayo', meaning_id: 'Tidak apa-apa / Baik-baik saja',
        mnemonic: 'Huruf ㅎ di tengah hampir melebur lembut, diucapkan gwaen-cha-na-yo.',
        example_native: '걱정하지 마세요, 괜찮아요.', example_romaji: 'Geokjeonghaji maseyo, gwaenchanayo.', example_id: 'Jangan khawatir, saya baik-baik saja.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-019', module_id: 'ko-a1-kdrama', level: 'A1', category: 'kdrama',
        front: '대박', reading: '대박', romaji: 'daebak', meaning_id: 'Luar biasa / Keren parah',
        mnemonic: 'Aslinya berarti "untung besar", kini jadi reaksi spontan saat kagum atau terkejut.',
        example_native: '대박! 이거 네가 만들었어?', example_romaji: 'Daebak! Igeo nega mandeureosseo?', example_id: 'Keren parah! Ini kamu yang bikin?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-020', module_id: 'ko-a1-kdrama', level: 'A1', category: 'kdrama',
        front: '어떡해', reading: '어떡해', romaji: 'eotteokhae', meaning_id: 'Aduh gimana dong?',
        mnemonic: 'Singkatan dari 어떻게 해. Tambah 요 (어떡해요) agar lebih sopan.',
        example_native: '어떡해, 지갑을 놓고 왔어!', example_romaji: 'Eotteokhae, jigabeul noko wasseo!', example_id: 'Aduh gimana dong, dompetku ketinggalan!',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-021', module_id: 'ko-a1-kdrama', level: 'A1', category: 'kdrama',
        front: '밥 먹었어?', reading: '밥 먹었어?', romaji: 'bap meogeosseo?', meaning_id: 'Sudah makan? (sapaan akrab)',
        mnemonic: 'Di Korea, menanyakan sudah makan atau belum sama seperti menanyakan "apa kabar?" dengan penuh perhatian.',
        example_native: '안녕, 오늘 밥 먹었어?', example_romaji: 'Annyeong, oneul bap meogeosseo?', example_id: 'Hai, hari ini sudah makan?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-022', module_id: 'ko-a1-kdrama', level: 'A1', category: 'kdrama',
        front: '말도 안 돼', reading: '말도 안 돼', romaji: 'maldo an dwae', meaning_id: 'Tidak masuk akal / Mustahil!',
        mnemonic: '말 (kata-kata) + 도 (bahkan) + 안 돼 (tidak jadi). Reaksi klasik plot twist K-Drama.',
        example_native: '말도 안 돼, 그게 사실이야?', example_romaji: 'Maldo an dwae, geuge sasiriya?', example_id: 'Mustahil, itu benar-benar terjadi?',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-023', module_id: 'ko-a1-kdrama', level: 'A1', category: 'kdrama',
        front: '수고했어요', reading: '수고했어요', romaji: 'sugohaesseoyo', meaning_id: 'Terima kasih atas kerja kerasnya',
        mnemonic: 'Diucapkan ke rekan kerja atau teman setelah menyelesaikan proyek atau shift. Hindari ke atasan yang jauh lebih senior.',
        example_native: '오늘 하루도 수고했어요.', example_romaji: 'Oneul harudo sugohaesseoyo.', example_id: 'Kerja bagus untuk hari ini juga.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      },
      {
        id: 'ko-fc-024', module_id: 'ko-a1-kdrama', level: 'A1', category: 'kdrama',
        front: '보고 싶어', reading: '보고 싶어', romaji: 'bogo sipeo', meaning_id: 'Aku kangen kamu (banmal)',
        mnemonic: 'Secara harfiah berarti "ingin melihat". Tambah 요 (보고 싶어요) untuk versi sopan.',
        example_native: '빨리 만나고 싶어, 보고 싶어.', example_romaji: 'Ppalli mannago sipeo, bogo sipeo.', example_id: 'Pengin cepat ketemu, aku kangen.',
        srs: { ease_factor: 2.5, interval_days: 0, repetitions: 0, due_date: null }
      }
    ],
    quizzes: [
      {
        id: 'ko-q-001', module_id: 'ko-a0-hangul', type: 'multiple_choice',
        prompt: 'Bagaimana pelafalan yang tepat untuk 「감사합니다」?',
        options: ['gamsahamnida', 'gamsahabnida', 'gamsahannida', 'kamsaheyo'],
        answer: 'gamsahamnida',
        explanation_id: 'Konsonan akhir ㅂ bertemu ㄴ berasimilasi menjadi bunyi "m", sehingga dibaca gamsahamnida.'
      },
      {
        id: 'ko-q-002', module_id: 'ko-a0-hangul', type: 'matching',
        prompt: 'Pasangkan 4 vokal dasar Hangul berikut dengan bunyinya.',
        pairs: [
          { left: '아', right: 'a' },
          { left: '어', right: 'eo' },
          { left: '오', right: 'o' },
          { left: '우', right: 'u' }
        ],
        explanation_id: 'Arah garis pendek menentukan bunyi: kanan (아 a), kiri (어 eo), atas (오 o), bawah (우 u).'
      },
      {
        id: 'ko-q-003', module_id: 'ko-a0-hangul', type: 'translation',
        prompt: 'Ketik sapaan sopan "Halo" dalam bahasa Korea (Hangul atau Romaji).',
        accepted_answers: ['안녕하세요', 'annyeonghaseyo'],
        explanation_id: '안녕하세요 (annyeonghaseyo) dapat dipakai sepanjang hari kepada siapa saja secara sopan.'
      },
      {
        id: 'ko-q-004', module_id: 'ko-a1-daily', type: 'word_order',
        prompt: 'Susun kalimat pesanan di kafe: "Tolong bungkus satu kopi."',
        tokens: ['주세요', '커피', '포장해', '하나'],
        answer: ['커피', '하나', '포장해', '주세요'],
        explanation_id: 'Urutan alami Korea: objek (커피) + jumlah (하나) + aksi (포장해) + permintaan (주세요).'
      },
      {
        id: 'ko-q-005', module_id: 'ko-a1-daily', type: 'fill_blank',
        prompt: 'Lengkapi kalimat memanggil pelayan: 「＿＿＿, 물 좀 주세요.」 (Permisi, minta air dong.)',
        options: ['저기요', '대박', '어떡해', '진짜요'],
        answer: '저기요',
        explanation_id: '저기요 (jeogiyo) adalah kata paling wajar untuk memanggil staf di restoran Korea.'
      },
      {
        id: 'ko-q-006', module_id: 'ko-a1-daily', type: 'multiple_choice',
        prompt: 'Kamu ingin bertanya apakah toko menerima pembayaran kartu. Mana kalimat yang benar?',
        options: ['카드 돼요?', '어디예요?', '얼마예요?', '포장해 주세요'],
        answer: '카드 돼요?',
        explanation_id: '카드 돼요? (kadeu dwaeyo?) artinya "Apakah kartu bisa digunakan?".'
      },
      {
        id: 'ko-q-007', module_id: 'ko-a1-daily', type: 'translation',
        prompt: 'Ketik "Berapa harganya?" dalam bahasa Korea (Hangul atau Romaji).',
        accepted_answers: ['얼마예요', '얼마예요?', 'eolmayeyo', 'eolmayeyo?'],
        explanation_id: '얼마예요? (eolmayeyo?) digunakan untuk menanyakan harga secara sopan.'
      },
      {
        id: 'ko-q-008', module_id: 'ko-a1-kdrama', type: 'fill_blank',
        prompt: 'Ubah kalimat santai 「보고 싶어」 menjadi bentuk sopan (존댓말) dengan menambahkan akhiran: 「보고 싶＿＿＿」',
        options: ['어요', '니다', '예요', '가'],
        answer: '어요',
        explanation_id: 'Menambahkan 요 pada akhiran -어 (보고 싶어요) langsung mengubah banmal menjadi jondaetmal.'
      },
      {
        id: 'ko-q-009', module_id: 'ko-a1-kdrama', type: 'word_order',
        prompt: 'Susun reaksi terkejut K-Drama: "Mustahil, benaran nih?"',
        tokens: ['진짜요?', '말도', '안 돼,'],
        answer: ['말도', '안 돼,', '진짜요?'],
        explanation_id: '말도 안 돼 (mustahil/tidak masuk akal) diikuti 진짜요? (benaran?).'
      },
      {
        id: 'ko-q-010', module_id: 'ko-a1-kdrama', type: 'matching',
        prompt: 'Pasangkan frasa K-Drama dengan arti bahasa Indonesianya.',
        pairs: [
          { left: '밥 먹었어?', right: 'Sudah makan?' },
          { left: '수고했어요', right: 'Terima kasih kerja kerasnya' },
          { left: '어떡해', right: 'Aduh gimana dong?' },
          { left: '괜찮아요', right: 'Tidak apa-apa' }
        ],
        explanation_id: 'Keempat frasa ini sangat sering terdengar di drama maupun percakapan harian di Seoul.'
      }
    ],
    dialogs: [
      {
        id: 'ko-d-001',
        module_id: 'ko-a1-daily',
        title: 'Pesan Kopi di Kafe Hongdae',
        situation: 'Memesan es americano untuk dibawa pulang dan membayar dengan kartu.',
        register: 'polite',
        roles: { A: 'Barista', B: 'Pelanggan (Anda)' },
        lines: [
          { role: 'A', native: '안녕하세요! 주문하시겠어요?', reading: '안녕하세요! 주문하시겠어요?', romaji: 'Annyeonghaseyo! Jumunhasigesseoyo?', translation_id: 'Halo! Sudah siap memesan?', notes: '주문하다 = memesan. Bentuk -시겠어요 sangat sopan.' },
          { role: 'B', native: '네, 아이스 아메리카노 한 잔 주세요.', reading: '네, 아이스 아메리카노 한 잔 주세요.', romaji: 'Ne, aiseu amerikano han jan juseyo.', translation_id: 'Ya, tolong satu gelas es americano.', notes: '한 잔 (han jan) adalah satuan untuk 1 gelas/cangkir.' },
          { role: 'A', native: '드시고 가세요, 포장해 드릴까요?', reading: '드시고 가세요, 포장해 드릴까요?', romaji: 'Deushigo gaseyo, pojanghae deurilkkayo?', translation_id: 'Minum di sini atau dibungkus?', notes: '드시고 가다 secara harfiah "makan lalu pergi" (dine-in).' },
          { role: 'B', native: '포장해 주세요. 얼마예요?', reading: '포장해 주세요. 얼마예요?', romaji: 'Pojanghae juseyo. Eolmayeyo?', translation_id: 'Tolong dibungkus. Berapa harganya?', notes: 'Gabungan langsung dua frasa inti kafe.' },
          { role: 'A', native: '4,500원입니다. 영수증 필요하세요?', reading: '사천오백 원입니다. 영수증 필요하세요?', romaji: 'Sacheon-obaek won-imnida. Yeongsujeung piryohaseyo?', translation_id: '4.500 won. Perlu struk?', notes: 'Kasir hampir selalu menanyakan struk di akhir transaksi.' },
          { role: 'B', native: '카드 돼요? 영수증 버려 주세요.', reading: '카드 돼요? 영수증 버려 주세요.', romaji: 'Kadeu dwaeyo? Yeongsujeung beoryeo juseyo.', translation_id: 'Bisa kartu? Struknya dibuang saja.', notes: 'Singkat, sopan, dan alami.' }
        ]
      },
      {
        id: 'ko-d-002',
        module_id: 'ko-a1-kdrama',
        title: 'Obrolan Teman Sebaya (반말)',
        situation: 'Bertemu sahabat sepulang kerja di depan stasiun.',
        register: 'casual',
        roles: { A: 'Minji', B: 'Jisoo (Anda)' },
        lines: [
          { role: 'A', native: '야, 오늘 밥 먹었어?', reading: '야, 오늘 밥 먹었어?', romaji: 'Ya, oneul bap meogeosseo?', translation_id: 'Eh, hari ini sudah makan belum?', notes: '야 (ya) hanya untuk teman sangat dekat yang seumur atau lebih muda.' },
          { role: 'B', native: '아니, 아직. 오늘 진짜 바빴어!', reading: '아니, 아직. 오늘 진짜 바빴어!', romaji: 'Ani, ajik. Oneul jinjja bappasseo!', translation_id: 'Belum. Hari ini sibuk banget!', notes: 'Bentuk lampau banmal dari 바쁘다 (sibuk).' },
          { role: 'A', native: '어떡해, 많이 피곤하겠다. 수고했어!', reading: '어떡해, 많이 피곤하겠다. 수고했어!', romaji: 'Eotteokhae, mani pigonhagetda. Sugohaesseo!', translation_id: 'Aduh kasihan, pasti capek banget. Kerja bagus hari ini!', notes: '수고했어 (tanpa 요) adalah bentuk banmal dari 수고했어요.' },
          { role: 'B', native: '고마워! 너 진짜 보고 싶었어.', reading: '고마워! 너 진짜 보고 싶었어.', romaji: 'Gomawo! Neo jinjja bogo sipeosseo.', translation_id: 'Makasih! Aku kangen banget sama kamu.', notes: '고마워 adalah versi santai dari 감사합니다.' }
        ]
      }
    ],
    readings: [
      {
        id: 'ko-r-001',
        module_id: 'ko-a1-daily',
        title: '카페에서 (Di Kafe)',
        level: 'A1',
        sentences: [
          {
            native: '서울에는 예쁜 카페가 많아요.',
            romaji: 'Seoureneun yeppeun kapega manayo.',
            translation_id: 'Di Seoul ada banyak kafe yang cantik.',
            tokens: [
              { surface: '서울에는', reading: '서울에는', romaji: 'seoureneun', meaning_id: 'di Seoul', saveable: true },
              { surface: '예쁜', reading: '예쁜', romaji: 'yeppeun', meaning_id: 'cantik / indah', saveable: true },
              { surface: '카페가', reading: '카페가', romaji: 'kapega', meaning_id: 'kafe (subjek)', saveable: true },
              { surface: '많아요.', reading: '마나요', romaji: 'manayo', meaning_id: 'banyak', saveable: true }
            ]
          },
          {
            native: '저는 보통 아이스 아메리카노를 주문해요.',
            romaji: 'Jeoneun botong aiseu amerikanoreul jumunhaeyo.',
            translation_id: 'Saya biasanya memesan es americano.',
            tokens: [
              { surface: '저는', reading: '저는', romaji: 'jeoneun', meaning_id: 'saya (sopan)', saveable: true },
              { surface: '보통', reading: '보통', romaji: 'botong', meaning_id: 'biasanya', saveable: true },
              { surface: '아이스 아메리카노를', reading: '아이스 아메리카노를', romaji: 'aiseu amerikanoreul', meaning_id: 'es americano (objek)', saveable: true },
              { surface: '주문해요.', reading: '주문해요', romaji: 'jumunhaeyo', meaning_id: 'memesan', saveable: true }
            ]
          },
          {
            native: '시간이 없으면 포장해 주세요라고 말해요.',
            romaji: 'Sigani eopseumyeon pojanghae juseyorago malhaeyo.',
            translation_id: 'Kalau tidak punya waktu, saya bilang "tolong dibungkus".',
            tokens: [
              { surface: '시간이', reading: '시간이', romaji: 'sigani', meaning_id: 'waktu', saveable: true },
              { surface: '없으면', reading: '업쓰면', romaji: 'eopseumyeon', meaning_id: 'kalau tidak ada', saveable: true },
              { surface: '포장해 주세요', reading: '포장해 주세요', romaji: 'pojanghae juseyo', meaning_id: 'tolong dibungkus', saveable: true },
              { surface: '라고 말해요.', reading: '라고 말해요', romaji: 'rago malhaeyo', meaning_id: 'berkata demikian', saveable: false }
            ]
          }
        ],
        comprehension_check: {
          question: 'Apa yang dikatakan penulis saat tidak punya waktu duduk di kafe?',
          options: [
            '포장해 주세요 (Tolong dibungkus)',
            '여기서 먹을게요 (Saya minum di sini)',
            '어디예요? (Di mana?)'
          ],
          answer_index: 0,
          explanation_id: 'Kalimat ketiga menjelaskan: 시간이 없으면 (kalau tidak ada waktu) penulis mengucapkan 포장해 주세요.'
        }
      }
    ],
    grammar: [
      {
        id: 'ko-g-001',
        module_id: 'ko-a1-daily',
        level: 'A1',
        pattern: '～ 주세요',
        formula: '[Kata Benda] + 주세요 / [Kata Kerja -아/어] + 주세요',
        meaning_id: 'Meminta benda ("Tolong berikan ...") atau meminta tolong melakukan aksi ("Tolong ...kan").',
        common_mistakes_id: 'Jangan lupa spasi antara kata benda dan 주세요 (이거 주세요), serta gunakan bentuk -아/어 sebelum 주세요 saat memohon aksi (포장해 주세요, bukan 포장하다 주세요).',
        examples: [
          { native: '물 주세요.', romaji: 'Mul juseyo.', translation_id: 'Tolong air putih.' },
          { native: '사진 찍어 주세요.', romaji: 'Sajin jjigeo juseyo.', translation_id: 'Tolong fotokan saya.' }
        ],
        related_quiz_ids: ['ko-q-004', 'ko-q-005']
      },
      {
        id: 'ko-g-002',
        module_id: 'ko-a1-daily',
        level: 'A1',
        pattern: '～예요 / ～이에요',
        formula: 'Vokal akhir + 예요 | Konsonan akhir (batchim) + 이에요',
        meaning_id: 'Kopula sopan ("adalah"). Dipakai untuk memperkenalkan diri, menanyakan harga (얼마예요?), dan lokasi (어디예요?).',
        common_mistakes_id: 'Pelajar Indonesia sering menempelkan 예요 ke semua kata. Cek huruf terakhir: kalau ada batchim (konsonan bawah) seperti 학생, wajib pakai 이에요 (학생이에요).',
        examples: [
          { native: '여기가 어디예요?', romaji: 'Yeogiga eodiyeyo?', translation_id: 'Ini di mana?' },
          { native: '저는 학생이에요.', romaji: 'Jeoneun haksaengieyo.', translation_id: 'Saya adalah pelajar.' }
        ],
        related_quiz_ids: ['ko-q-006', 'ko-q-007']
      },
      {
        id: 'ko-g-003',
        module_id: 'ko-a1-kdrama',
        level: 'A1',
        pattern: '반말 (Banmal) vs 존댓말 (Jondaetmal)',
        formula: 'Banmal (-아/어) + 요 = Jondaetmal (-아요/어요)',
        meaning_id: 'Tingkat kesopanan bahasa Korea. Cukup tambahkan 요 di akhir bentuk banmal untuk membuat kalimat sopan sehari-hari.',
        common_mistakes_id: 'Di Korea, berbicara banmal tanpa izin kepada orang yang baru dikenal (meski seumur) dianggap kasar. Mulailah selalu dengan 존댓말 (-요) sampai lawan bicara mengajak pakai banmal.',
        examples: [
          { native: '괜찮아 (Banmal) / 괜찮아요 (Jondaetmal)', romaji: 'Gwaenchana / Gwaenchanayo', translation_id: 'Tidak apa-apa (santai / sopan).' },
          { native: '밥 먹었어? (Banmal) / 식사하셨어요? (Sangat sopan)', romaji: 'Bap meogeosseo? / Siksahasyeosseoyo?', translation_id: 'Sudah makan?' }
        ],
        related_quiz_ids: ['ko-q-008', 'ko-q-009', 'ko-q-010']
      }
    ]
  };

  global.LingoData = global.LingoData || {};
  global.LingoData.PACK_KO = PACK_KO;
})(window);
