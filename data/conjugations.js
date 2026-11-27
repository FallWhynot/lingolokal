/* LingoLokal: Conjugation & Form Pattern Trainer Data (All 11 Languages) */
(function (global) {
  'use strict';

  const CONJUGATION_DATA = {
    ja: {
      modeTitle: 'Pelatih Konjugasi Jepang',
      modeSubtitle: 'Latih perubahan verba (Ichidan/Godan) dan adjektiva ke bentuk sopan, lampau, negatif, serta bentuk -te.',
      forms: ['Sopan (-masu)', 'Bentuk -te', 'Lampau Sopan', 'Negatif Sopan', 'Santai Lampau'],
      items: [
        { id: 'ja-c1', base: '食べる (taberu)', meaning_id: 'makan', group: 'Ichidan (-ru)', targetForm: 'Sopan (-masu)', answer: '食べます', romaji: 'tabemasu', hintRule: 'Verba Ichidan: buang る (ru), tambahkan ます (masu).', distractors: ['食べります', '食べました', '食べません'] },
        { id: 'ja-c2', base: '食べる (taberu)', meaning_id: 'makan', group: 'Ichidan (-ru)', targetForm: 'Bentuk -te', answer: '食べて', romaji: 'tabete', hintRule: 'Verba Ichidan: buang る (ru), tambahkan て (te).', distractors: ['食べって', '食べんで', '食べいた'] },
        { id: 'ja-c3', base: '飲む (nomu)', meaning_id: 'minum', group: 'Godan (-mu)', targetForm: 'Bentuk -te', answer: '飲んで', romaji: 'nonde', hintRule: 'Godan berakhiran む/ぶ/ぬ berubah menjadi んで (nde).', distractors: ['飲て', '飲って', '飲いて'] },
        { id: 'ja-c4', base: '書く (kaku)', meaning_id: 'menulis', group: 'Godan (-ku)', targetForm: 'Bentuk -te', answer: '書いて', romaji: 'kaite', hintRule: 'Godan berakhiran く (ku) berubah menjadi いて (ite).', distractors: ['書って', '書んで', '書きて'] },
        { id: 'ja-c5', base: '行く (iku)', meaning_id: 'pergi', group: 'Godan (pengecualian)', targetForm: 'Bentuk -te', answer: '行って', romaji: 'itte', hintRule: 'Pengecualian penting: 行く menjadi 行って (itte), bukan 行いて.', distractors: ['行いて', '行んで', '行きて'] },
        { id: 'ja-c6', base: '見る (miru)', meaning_id: 'melihat', group: 'Ichidan (-ru)', targetForm: 'Lampau Sopan', answer: '見ました', romaji: 'mimashita', hintRule: 'Buang る, tambahkan ました (mashita) untuk lampau sopan.', distractors: ['見ます', '見ません', '見った'] },
        { id: 'ja-c7', base: '話す (hanasu)', meaning_id: 'berbicara', group: 'Godan (-su)', targetForm: 'Negatif Sopan', answer: '話しません', romaji: 'hanashimasen', hintRule: 'Ubah す -> し, lalu tambahkan ません (masen).', distractors: ['話します', '話さない', '話しました'] },
        { id: 'ja-c8', base: '買う (kau)', meaning_id: 'membeli', group: 'Godan (-u)', targetForm: 'Santai Lampau', answer: '買った', romaji: 'katta', hintRule: 'Godan berakhiran う/つ/る berubah menjadi った (tta) di bentuk lampau santai.', distractors: ['買いた', '買んだ', '買いました'] },
        { id: 'ja-c9', base: 'する (suru)', meaning_id: 'melakukan', group: 'Irreguler', targetForm: 'Bentuk -te', answer: 'して', romaji: 'shite', hintRule: 'Verba tidak beraturan する berubah menjadi して (shite).', distractors: ['すって', 'すて', 'した'] },
        { id: 'ja-c10', base: '来る (kuru)', meaning_id: 'datang', group: 'Irreguler', targetForm: 'Negatif Sopan', answer: '来ません', romaji: 'kimasen', hintRule: '来る dibaca き (ki) sebelum akhiran ます/ません.', distractors: ['来ます', '来ない', '来ました'] }
      ]
    },
    ko: {
      modeTitle: 'Pelatih Konjugasi Korea',
      modeSubtitle: 'Latih perubahan akar kata kerja Korea ke gaya sopan santai (-아/어요), formal (-습니다), dan bentuk lampau.',
      forms: ['Sopan (-아/어요)', 'Formal (-습니다)', 'Lampau Sopan', 'Masa Depan'],
      items: [
        { id: 'ko-c1', base: '가다 (gada)', meaning_id: 'pergi', group: 'Vokal ㅏ', targetForm: 'Sopan (-아/어요)', answer: '가요', romaji: 'gayo', hintRule: 'Akar 가 berakhiran vokal ㅏ, bergabung dengan 아요 menjadi 가요.', distractors: ['가어요', '갔어요', '갑니다'] },
        { id: 'ko-c2', base: '먹다 (meokda)', meaning_id: 'makan', group: 'Vokal ㅓ', targetForm: 'Sopan (-아/어요)', answer: '먹어요', romaji: 'meogeoyo', hintRule: 'Vokal akar bukan ㅏ/ㅗ, tambahkan 어요 (eoyo).', distractors: ['먹아요', '먹었어요', '먹습니다'] },
        { id: 'ko-c3', base: '하다 (hada)', meaning_id: 'melakukan', group: 'Verba 하다', targetForm: 'Sopan (-아/어요)', answer: '해요', romaji: 'haeyo', hintRule: 'Semua verba berakhiran 하다 berubah menjadi 해요 di bentuk sopan.', distractors: ['하아요', '하어요', '했어요'] },
        { id: 'ko-c4', base: '보다 (boda)', meaning_id: 'melihat', group: 'Vokal ㅗ', targetForm: 'Lampau Sopan', answer: '봤어요', romaji: 'bwasseoyo', hintRule: '보 + 았어요 menyatu menjadi 봤어요 (bwasseoyo).', distractors: ['봐요', '보어요', '볼 거예요'] },
        { id: 'ko-c5', base: '마시다 (masida)', meaning_id: 'minum', group: 'Vokal ㅣ', targetForm: 'Sopan (-아/어요)', answer: '마셔요', romaji: 'masyeoyo', hintRule: '시 + 어요 berkontraksi menjadi 셔요 (syeoyo).', distractors: ['마시아요', '마셨어요', '마십니다'] },
        { id: 'ko-c6', base: '읽다 (ikda)', meaning_id: 'membaca', group: 'Konsonan akhir', targetForm: 'Formal (-습니다)', answer: '읽습니다', romaji: 'ikseumnida', hintRule: 'Jika akar berakhiran konsonan (batchim), tambahkan 습니다.', distractors: ['읽ㅂ니다', '읽어요', '읽었어요'] },
        { id: 'ko-c7', base: '오다 (oda)', meaning_id: 'datang', group: 'Vokal ㅗ', targetForm: 'Formal (-습니다)', answer: '옵니다', romaji: 'omnida', hintRule: 'Akar tanpa batchim (오) menerima ㅂ니다 -> 옵니다.', distractors: ['오습니다', '와요', '왔어요'] },
        { id: 'ko-c8', base: '사다 (sada)', meaning_id: 'membeli', group: 'Vokal ㅏ', targetForm: 'Masa Depan', answer: '살 거예요', romaji: 'sal geoyeyo', hintRule: 'Tanpa batchim: tambahkan ㄹ 거예요 untuk rencana masa depan.', distractors: ['사을 거예요', '사요', '샀어요'] },
        { id: 'ko-c9', base: '공부하다 (gongbuhada)', meaning_id: 'belajar', group: 'Verba 하다', targetForm: 'Lampau Sopan', answer: '공부했어요', romaji: 'gongbuhaesseoyo', hintRule: '하다 di bentuk lampau sopan selalu menjadi 했어요.', distractors: ['공부해요', '공부합니다', '공부할 거예요'] }
      ]
    },
    en: {
      modeTitle: 'Pelatih Konjugasi & Tenses Inggris',
      modeSubtitle: 'Latih bentuk lampau tidak beraturan (Past Simple), Past Participle, dan present orang ketiga tunggal.',
      forms: ['Past Simple (V2)', 'Past Participle (V3)', '3rd Person (He/She)', 'Present Continuous'],
      items: [
        { id: 'en-c1', base: 'go', meaning_id: 'pergi', group: 'Irregular', targetForm: 'Past Simple (V2)', answer: 'went', romaji: '/went/', hintRule: 'Verba tidak beraturan: go -> went -> gone.', distractors: ['goed', 'gone', 'going'] },
        { id: 'en-c2', base: 'write', meaning_id: 'menulis', group: 'Irregular', targetForm: 'Past Participle (V3)', answer: 'written', romaji: '/ˈrɪt.ən/', hintRule: 'Pola write -> wrote -> written (dipakai setelah have/has).', distractors: ['wrote', 'writed', 'writing'] },
        { id: 'en-c3', base: 'study', meaning_id: 'belajar', group: 'Regular (-y)', targetForm: '3rd Person (He/She)', answer: 'studies', romaji: '/ˈstʌd.iz/', hintRule: 'Konsonan + y berubah menjadi -ies pada subjek he/she/it.', distractors: ['studys', 'studied', 'studying'] },
        { id: 'en-c4', base: 'take', meaning_id: 'mengambil', group: 'Irregular', targetForm: 'Past Simple (V2)', answer: 'took', romaji: '/tʊk/', hintRule: 'Verba tidak beraturan: take -> took -> taken.', distractors: ['taked', 'taken', 'takes'] },
        { id: 'en-c5', base: 'speak', meaning_id: 'berbicara', group: 'Irregular', targetForm: 'Past Participle (V3)', answer: 'spoken', romaji: '/ˈspoʊ.kən/', hintRule: 'Pola speak -> spoke -> spoken.', distractors: ['spoke', 'speaked', 'speaking'] },
        { id: 'en-c6', base: 'run', meaning_id: 'berlari', group: 'CVC doubling', targetForm: 'Present Continuous', answer: 'running', romaji: '/ˈrʌn.ɪŋ/', hintRule: 'Kata satu suku kata berpola konsonan-vokal-konsonan menggandakan huruf akhir sebelum -ing.', distractors: ['runing', 'ran', 'runs'] },
        { id: 'en-c7', base: 'buy', meaning_id: 'membeli', group: 'Irregular', targetForm: 'Past Simple (V2)', answer: 'bought', romaji: '/bɔːt/', hintRule: 'Pola -ought: buy -> bought -> bought.', distractors: ['buyed', 'brought', 'buys'] },
        { id: 'en-c8', base: 'watch', meaning_id: 'menonton', group: 'Regular (-ch)', targetForm: '3rd Person (He/She)', answer: 'watches', romaji: '/ˈwɒtʃ.ɪz/', hintRule: 'Akhiran -ch, -sh, -s, -x, -o menerima -es.', distractors: ['watchs', 'watched', 'watching'] }
      ]
    },
    zh: {
      modeTitle: 'Pelatih Partikel Aspek & Penggolong Mandarin',
      modeSubtitle: 'Mandarin tidak mengonjugasi verba. Latih penanda aspek (了/过/在) dan kata penggolong (measure words) yang tepat.',
      forms: ['Aspek Selesai (了)', 'Pengalaman (过)', 'Sedang Berlangsung (在)', 'Kata Penggolong'],
      items: [
        { id: 'zh-c1', base: '吃 (chī) = makan', meaning_id: 'sudah makan', group: 'Partikel Aspek', targetForm: 'Aspek Selesai (了)', answer: '吃了', romaji: 'chī le', hintRule: 'Tambahkan 了 tepat setelah kata kerja untuk menandai aksi selesai.', distractors: ['在吃', '吃过', '不吃'] },
        { id: 'zh-c2', base: '去 (qù) = pergi', meaning_id: 'pernah pergi', group: 'Partikel Aspek', targetForm: 'Pengalaman (过)', answer: '去过', romaji: 'qù guo', hintRule: 'Gunakan 过 (guo) setelah verba untuk menyatakan pernah mengalami sesuatu.', distractors: ['去了', '在去', '要去'] },
        { id: 'zh-c3', base: '看书 (kàn shū) = membaca buku', meaning_id: 'sedang membaca buku', group: 'Partikel Aspek', targetForm: 'Sedang Berlangsung (在)', answer: '在看书', romaji: 'zài kàn shū', hintRule: 'Letakkan 在 (zài) di depan kata kerja untuk aksi yang sedang berlangsung.', distractors: ['看书了', '看过书', '看书在'] },
        { id: 'zh-c4', base: '一 ___ 书 (satu buku)', meaning_id: 'penggolong untuk buku', group: 'Measure Word', targetForm: 'Kata Penggolong', answer: '本', romaji: 'běn', hintRule: '本 (běn) dipakai khusus untuk benda berjilid seperti buku dan majalah.', distractors: ['杯', '个', '只'] },
        { id: 'zh-c5', base: '一 ___ 茶 (secangkir teh)', meaning_id: 'penggolong untuk minuman cangkir', group: 'Measure Word', targetForm: 'Kata Penggolong', answer: '杯', romaji: 'bēi', hintRule: '杯 (bēi) digunakan untuk minuman dalam gelas atau cangkir.', distractors: ['本', '张', '个'] },
        { id: 'zh-c6', base: '两 ___ 人 (dua orang)', meaning_id: 'penggolong umum untuk orang', group: 'Measure Word', targetForm: 'Kata Penggolong', answer: '个', romaji: 'gè', hintRule: '个 (gè) adalah penggolong paling umum untuk orang dan benda umum.', distractors: ['本', '条', '杯'] },
        { id: 'zh-c7', base: '学 (xué) = belajar', meaning_id: 'pernah belajar', group: 'Partikel Aspek', targetForm: 'Pengalaman (过)', answer: '学过', romaji: 'xué guo', hintRule: 'Verba + 过 menandakan pengalaman di masa lalu.', distractors: ['在学', '学了', '想学'] },
        { id: 'zh-c8', base: '听音乐 (tīng yīnyuè)', meaning_id: 'sedang mendengarkan musik', group: 'Partikel Aspek', targetForm: 'Sedang Berlangsung (在)', answer: '在听音乐', romaji: 'zài tīng yīnyuè', hintRule: '在 diletakkan sebelum verba utama 听.', distractors: ['听音乐了', '听过音乐', '听在音乐'] }
      ]
    },
    de: {
      modeTitle: 'Pelatih Konjugasi Jerman',
      modeSubtitle: 'Latih akhiran verba Präsens sesuai subjek (ich, du, er/sie, wir) serta verba kuat sein & haben.',
      forms: ['ich (Saya)', 'du (Kamu)', 'er/sie (Dia)', 'wir (Kami)'],
      items: [
        { id: 'de-c1', base: 'lernen', meaning_id: 'belajar', group: 'Reguler', targetForm: 'ich (Saya)', answer: 'lerne', romaji: 'LER-ne', hintRule: 'Hapus -en untuk mendapat akar (lern-), lalu tambah -e untuk ich.', distractors: ['lernst', 'lernt', 'lernen'] },
        { id: 'de-c2', base: 'lernen', meaning_id: 'belajar', group: 'Reguler', targetForm: 'du (Kamu)', answer: 'lernst', romaji: 'lernst', hintRule: 'Subjek du selalu menerima akhiran -st.', distractors: ['lerne', 'lernt', 'lernen'] },
        { id: 'de-c3', base: 'sein', meaning_id: 'menjadi / adalah', group: 'Irreguler', targetForm: 'er/sie (Dia)', answer: 'ist', romaji: 'ist', hintRule: 'Konjugasi sein: ich bin, du bist, er/sie/es ist.', distractors: ['bin', 'bist', 'sind'] },
        { id: 'de-c4', base: 'haben', meaning_id: 'memiliki', group: 'Irreguler', targetForm: 'du (Kamu)', answer: 'hast', romaji: 'hast', hintRule: 'Huruf b hilang pada du hast dan er hat.', distractors: ['habst', 'habe', 'habt'] },
        { id: 'de-c5', base: 'sprechen', meaning_id: 'berbicara', group: 'Ubah Vokal e->i', targetForm: 'er/sie (Dia)', answer: 'spricht', romaji: 'shprikht', hintRule: 'Verba kuat sprechen mengubah vokal e -> i untuk du dan er/sie.', distractors: ['sprecht', 'spreche', 'sprechen'] },
        { id: 'de-c6', base: 'kommen', meaning_id: 'datang', group: 'Reguler', targetForm: 'wir (Kami)', answer: 'kommen', romaji: 'KOM-en', hintRule: 'Untuk wir dan sie/Sie, verba kembali ke bentuk infinitif (-en).', distractors: ['komme', 'kommst', 'kommt'] },
        { id: 'de-c7', base: 'trinken', meaning_id: 'minum', group: 'Reguler', targetForm: 'er/sie (Dia)', answer: 'trinkt', romaji: 'trinkt', hintRule: 'Akar trink- + -t untuk er/sie/es.', distractors: ['trinke', 'trinkst', 'trinken'] },
        { id: 'de-c8', base: 'fahren', meaning_id: 'berkendara', group: 'Umlaut a->ä', targetForm: 'du (Kamu)', answer: 'fährst', romaji: 'ferst', hintRule: 'Verba kuat fahren mendapat umlaut ä pada du dan er/sie.', distractors: ['fahrst', 'fahre', 'fährt'] }
      ]
    },
    ar: {
      modeTitle: 'Pelatih Tasrif Fiil Arab',
      modeSubtitle: 'Latih perubahan kata kerja Arab (Fiil Madhi lampau dan Fiil Mudhari kini) sesuai dhamir (Saya, Kamu, Dia).',
      forms: ['Ana (Saya - Kini)', 'Anta (Kamu Lk - Kini)', 'Huwa (Dia Lk - Lampau)', 'Nahnu (Kami - Kini)'],
      items: [
        { id: 'ar-c1', base: 'كَتَبَ (kataba)', meaning_id: 'menulis', group: 'Tsulatsi', targetForm: 'Ana (Saya - Kini)', answer: 'أَكْتُبُ', romaji: 'aktubu', hintRule: 'Awalan أَ (a-) menandai subjek Ana (saya) pada Fiil Mudhari.', distractors: ['يَكْتُبُ', 'تَكْتُبُ', 'نَكْتُبُ'] },
        { id: 'ar-c2', base: 'كَتَبَ (kataba)', meaning_id: 'menulis', group: 'Tsulatsi', targetForm: 'Nahnu (Kami - Kini)', answer: 'نَكْتُبُ', romaji: 'naktubu', hintRule: 'Awalan نَ (na-) menandai subjek Nahnu (kami).', distractors: ['أَكْتُبُ', 'يَكْتُبُ', 'تَكْتُبُ'] },
        { id: 'ar-c3', base: 'شَرِبَ (syariba)', meaning_id: 'minum', group: 'Tsulatsi', targetForm: 'Anta (Kamu Lk - Kini)', answer: 'تَشْرَبُ', romaji: 'tasyrabu', hintRule: 'Awalan تَ (ta-) digunakan untuk Anta (kamu laki-laki).', distractors: ['أَشْرَبُ', 'يَشْرَبُ', 'نَشْرَبُ'] },
        { id: 'ar-c4', base: 'ذَهَبَ (dzahaba)', meaning_id: 'pergi', group: 'Tsulatsi', targetForm: 'Ana (Saya - Kini)', answer: 'أَذْهَبُ', romaji: 'adzhabu', hintRule: 'Gunakan awalan أَ (a-) untuk saya sedang/akan pergi.', distractors: ['يَذْهَبُ', 'تَذْهَبُ', 'نَذْهَبُ'] },
        { id: 'ar-c5', base: 'قَرَأَ (qaraa)', meaning_id: 'membaca', group: 'Tsulatsi', targetForm: 'Huwa (Dia Lk - Lampau)', answer: 'قَرَأَ', romaji: 'qaraa', hintRule: 'Bentuk dasar kamus Arab adalah Fiil Madhi untuk Huwa (dia laki-laki).', distractors: ['يَقْرَأُ', 'أَقْرَأُ', 'تَقْرَأُ'] },
        { id: 'ar-c6', base: 'أَكَلَ (akala)', meaning_id: 'makan', group: 'Tsulatsi', targetForm: 'Nahnu (Kami - Kini)', answer: 'نَأْكُلُ', romaji: 'na-kulu', hintRule: 'Awalan نَ (na-) menunjukkan kami sedang/akan makan.', distractors: ['آكُلُ', 'تَأْكُلُ', 'يَأْكُلُ'] },
        { id: 'ar-c7', base: 'دَرَسَ (darasa)', meaning_id: 'belajar', group: 'Tsulatsi', targetForm: 'Anta (Kamu Lk - Kini)', answer: 'تَدْرُسُ', romaji: 'tadrusu', hintRule: 'Tambahkan awalan تَ pada akar د-ر-س.', distractors: ['أَدْرُسُ', 'نَدْرُسُ', 'يَدْرُسُ'] }
      ]
    },
    es: {
      modeTitle: 'Pelatih Konjugasi Spanyol',
      modeSubtitle: 'Latih konjugasi verba berakhiran -ar, -er, -ir pada Presente dan Pretérito Indefinido.',
      forms: ['yo (Presente)', 'tú (Presente)', 'nosotros (Presente)', 'yo (Lampau)'],
      items: [
        { id: 'es-c1', base: 'hablar', meaning_id: 'berbicara', group: 'Verba -ar', targetForm: 'yo (Presente)', answer: 'hablo', romaji: 'A-blo', hintRule: 'Buang -ar, tambah -o untuk subjek yo.', distractors: ['hablas', 'habla', 'hablé'] },
        { id: 'es-c2', base: 'hablar', meaning_id: 'berbicara', group: 'Verba -ar', targetForm: 'tú (Presente)', answer: 'hablas', romaji: 'A-blas', hintRule: 'Verba -ar untuk tú selalu berakhiran -as.', distractors: ['hablo', 'hables', 'hablan'] },
        { id: 'es-c3', base: 'comer', meaning_id: 'makan', group: 'Verba -er', targetForm: 'nosotros (Presente)', answer: 'comemos', romaji: 'ko-ME-mos', hintRule: 'Verba -er untuk nosotros menerima akhiran -emos.', distractors: ['comamos', 'comimos', 'comen'] },
        { id: 'es-c4', base: 'vivir', meaning_id: 'tinggal', group: 'Verba -ir', targetForm: 'nosotros (Presente)', answer: 'vivimos', romaji: 'bi-BI-mos', hintRule: 'Verba -ir untuk nosotros berakhiran -imos.', distractors: ['vivemos', 'viven', 'vivo'] },
        { id: 'es-c5', base: 'hablar', meaning_id: 'berbicara', group: 'Verba -ar', targetForm: 'yo (Lampau)', answer: 'hablé', romaji: 'a-BLE', hintRule: 'Pretérito untuk yo pada verba -ar berakhiran -é.', distractors: ['hablo', 'habló', 'hablaba'] },
        { id: 'es-c6', base: 'ser', meaning_id: 'menjadi / adalah', group: 'Irreguler', targetForm: 'yo (Presente)', answer: 'soy', romaji: 'soi', hintRule: 'Ser tidak beraturan: yo soy, tú eres, él es.', distractors: ['eres', 'es', 'somos'] },
        { id: 'es-c7', base: 'tener', meaning_id: 'memiliki', group: 'Irreguler', targetForm: 'tú (Presente)', answer: 'tienes', romaji: 'TYE-nes', hintRule: 'Vokal e berubah menjadi ie pada tú tienes.', distractors: ['tenes', 'tengo', 'tiene'] }
      ]
    },
    fr: {
      modeTitle: 'Pelatih Konjugasi Prancis',
      modeSubtitle: 'Latih konjugasi Présent untuk verba -er serta verba inti être, avoir, dan aller.',
      forms: ['je (Saya)', 'tu (Kamu)', 'nous (Kami)', 'vous (Anda)'],
      items: [
        { id: 'fr-c1', base: 'parler', meaning_id: 'berbicara', group: 'Verba -er', targetForm: 'je (Saya)', answer: 'parle', romaji: 'parl', hintRule: 'Buang -er, tambah -e untuk je.', distractors: ['parles', 'parlons', 'parlez'] },
        { id: 'fr-c2', base: 'parler', meaning_id: 'berbicara', group: 'Verba -er', targetForm: 'nous (Kami)', answer: 'parlons', romaji: 'par-lon', hintRule: 'Subjek nous pada verba -er berakhiran -ons.', distractors: ['parlez', 'parlent', 'parle'] },
        { id: 'fr-c3', base: 'être', meaning_id: 'menjadi / adalah', group: 'Irreguler', targetForm: 'je (Saya)', answer: 'suis', romaji: 'swi', hintRule: 'Konjugasi être: je suis, tu es, il est.', distractors: ['es', 'est', 'sommes'] },
        { id: 'fr-c4', base: 'avoir', meaning_id: 'memiliki', group: 'Irreguler', targetForm: 'vous (Anda)', answer: 'avez', romaji: 'a-ve', hintRule: 'Avoir: nous avons, vous avez, ils ont.', distractors: ['avons', 'ont', 'as'] },
        { id: 'fr-c5', base: 'aller', meaning_id: 'pergi', group: 'Irreguler', targetForm: 'tu (Kamu)', answer: 'vas', romaji: 'va', hintRule: 'Aller: je vais, tu vas, il va.', distractors: ['vais', 'va', 'allez'] },
        { id: 'fr-c6', base: 'manger', meaning_id: 'makan', group: 'Verba -ger', targetForm: 'nous (Kami)', answer: 'mangeons', romaji: 'man-zhon', hintRule: 'Pertahankan huruf e sebelum -ons agar bunyi g tetap lembut (mangeons).', distractors: ['mangons', 'mangez', 'mangent'] },
        { id: 'fr-c7', base: 'aimer', meaning_id: 'menyukai', group: 'Verba -er', targetForm: 'vous (Anda)', answer: 'aimez', romaji: 'e-me', hintRule: 'Akhiran standar subjek vous adalah -ez.', distractors: ['aimons', 'aimes', 'aiment'] }
      ]
    },
    nl: {
      modeTitle: 'Pelatih Konjugasi Belanda',
      modeSubtitle: 'Latih aturan stam dan stam+t untuk Present Tense serta bentuk lampau dasar Belanda.',
      forms: ['ik (Stam)', 'jij/hij (Stam+t)', 'wij (Plural)', 'Lampau (ik)'],
      items: [
        { id: 'nl-c1', base: 'werken', meaning_id: 'bekerja', group: 'Reguler', targetForm: 'ik (Stam)', answer: 'werk', romaji: 'werk', hintRule: 'Hapus -en untuk mendapat stam (ik werk).', distractors: ['werkt', 'werken', 'werkte'] },
        { id: 'nl-c2', base: 'werken', meaning_id: 'bekerja', group: 'Reguler', targetForm: 'jij/hij (Stam+t)', answer: 'werkt', romaji: 'werkt', hintRule: 'Untuk jij (di depan) dan hij/zij, tambahkan -t ke stam.', distractors: ['werk', 'werken', 'werkte'] },
        { id: 'nl-c3', base: 'spreken', meaning_id: 'berbicara', group: 'Vokal panjang', targetForm: 'ik (Stam)', answer: 'spreek', romaji: 'sprek', hintRule: 'Gandakan vokal e agar bunyi panjang tetap terjaga di suku kata tertutup.', distractors: ['sprek', 'spreekt', 'sprak'] },
        { id: 'nl-c4', base: 'zijn', meaning_id: 'adalah', group: 'Irreguler', targetForm: 'jij/hij (Stam+t)', answer: 'bent / is', romaji: 'bent / is', hintRule: 'Zijn tidak beraturan: ik ben, jij bent, hij is.', distractors: ['ben', 'zijn', 'was'] },
        { id: 'nl-c5', base: 'hebben', meaning_id: 'memiliki', group: 'Irreguler', targetForm: 'ik (Stam)', answer: 'heb', romaji: 'hep', hintRule: 'Konjugasi hebben: ik heb, jij hebt, hij heeft.', distractors: ['hebt', 'heeft', 'had'] },
        { id: 'nl-c6', base: 'leren', meaning_id: 'belajar', group: 'Reguler', targetForm: 'Lampau (ik)', answer: 'leerde', romaji: 'LER-de', hintRule: 'Konsonan r tidak masuk "t kofschip", jadi lampau memakai -de.', distractors: ['leerte', 'leer', 'leert'] },
        { id: 'nl-c7', base: 'wonen', meaning_id: 'tinggal', group: 'Vokal panjang', targetForm: 'wij (Plural)', answer: 'wonen', romaji: 'WO-nen', hintRule: 'Subjek jamak wij/jullie/zij memakai bentuk infinitif utuh.', distractors: ['woon', 'woont', 'woonde'] }
      ]
    },
    ru: {
      modeTitle: 'Pelatih Konjugasi Rusia',
      modeSubtitle: 'Latih konjugasi Tipe I (-ть) dan Tipe II (-ить) sesuai subjek я, ты, он/она, мы.',
      forms: ['я (Saya)', 'ты (Kamu)', 'он/она (Dia)', 'мы (Kami)'],
      items: [
        { id: 'ru-c1', base: 'читать (chitat)', meaning_id: 'membaca', group: 'Tipe I', targetForm: 'я (Saya)', answer: 'читаю', romaji: 'chitayu', hintRule: 'Tipe I berakhiran -ать: buang -ть, tambahkan -ю untuk я.', distractors: ['читаешь', 'читает', 'читаем'] },
        { id: 'ru-c2', base: 'читать (chitat)', meaning_id: 'membaca', group: 'Tipe I', targetForm: 'ты (Kamu)', answer: 'читаешь', romaji: 'chitayesh', hintRule: 'Subjek ты pada Tipe I selalu berakhiran -ешь.', distractors: ['читаю', 'читает', 'читают'] },
        { id: 'ru-c3', base: 'говорить (govorit)', meaning_id: 'berbicara', group: 'Tipe II', targetForm: 'я (Saya)', answer: 'говорю', romaji: 'govoryu', hintRule: 'Tipe II (-ить): buang -ить, tambah -ю untuk я.', distractors: ['говоришь', 'говорит', 'говорим'] },
        { id: 'ru-c4', base: 'говорить (govorit)', meaning_id: 'berbicara', group: 'Tipe II', targetForm: 'мы (Kami)', answer: 'говорим', romaji: 'govorim', hintRule: 'Subjek мы pada Tipe II berakhiran -им.', distractors: ['говорите', 'говорят', 'говорю'] },
        { id: 'ru-c5', base: 'знать (znat)', meaning_id: 'tahu', group: 'Tipe I', targetForm: 'он/она (Dia)', answer: 'знает', romaji: 'znayet', hintRule: 'Tipe I untuk он/она berakhiran -ет.', distractors: ['знаю', 'знаешь', 'знаем'] },
        { id: 'ru-c6', base: 'работать (rabotat)', meaning_id: 'bekerja', group: 'Tipe I', targetForm: 'мы (Kami)', answer: 'работаем', romaji: 'rabotayem', hintRule: 'Tipe I untuk мы menerima akhiran -ем.', distractors: ['работаю', 'работает', 'работают'] },
        { id: 'ru-c7', base: 'любить (lyubit)', meaning_id: 'mencintai / suka', group: 'Tipe II', targetForm: 'ты (Kamu)', answer: 'любишь', romaji: 'lyubish', hintRule: 'Subjek ты pada Tipe II berakhiran -ишь.', distractors: ['люблю', 'любит', 'любим'] }
      ]
    },
    th: {
      modeTitle: 'Pelatih Penanda Kala & Penggolong Thailand',
      modeSubtitle: 'Bahasa Thailand tidak mengubah bentuk kata kerja. Latih penanda waktu (กำลัง/จะ/แล้ว) dan partikel kesopanan.',
      forms: ['Sedang (กำลัง)', 'Akan (จะ)', 'Sudah (แล้ว)', 'Penggolong / Sopan'],
      items: [
        { id: 'th-c1', base: 'กิน (kin) = makan', meaning_id: 'sedang makan', group: 'Penanda Waktu', targetForm: 'Sedang (กำลัง)', answer: 'กำลังกิน', romaji: 'kam-lang kin', hintRule: 'Letakkan กำลัง (kam-lang) sebelum kata kerja untuk aksi yang sedang terjadi.', distractors: ['จะกิน', 'กินแล้ว', 'ไม่กิน'] },
        { id: 'th-c2', base: 'ไป (pai) = pergi', meaning_id: 'akan pergi', group: 'Penanda Waktu', targetForm: 'Akan (จะ)', answer: 'จะไป', romaji: 'ja pai', hintRule: 'Letakkan จะ (ja) sebelum verba untuk menyatakan masa depan.', distractors: ['กำลังไป', 'ไปแล้ว', 'ไม่ไป'] },
        { id: 'th-c3', base: 'กิน (kin) = makan', meaning_id: 'sudah makan', group: 'Penanda Waktu', targetForm: 'Sudah (แล้ว)', answer: 'กินแล้ว', romaji: 'kin laeo', hintRule: 'Letakkan แล้ว (laeo) di akhir frasa/kalimat untuk menandai selesai.', distractors: ['กำลังกิน', 'จะกิน', 'แล้วกิน'] },
        { id: 'th-c4', base: 'เรียน (rian) = belajar', meaning_id: 'sedang belajar', group: 'Penanda Waktu', targetForm: 'Sedang (กำลัง)', answer: 'กำลังเรียน', romaji: 'kam-lang rian', hintRule: 'กำลัง + verba menandai kegiatan yang sedang berlangsung sekarang.', distractors: ['จะเรียน', 'เรียนแล้ว', 'ไม่เรียน'] },
        { id: 'th-c5', base: 'ขอบคุณ (khop-khun)', meaning_id: 'terima kasih sopan (pembicara pria)', group: 'Partikel Sopan', targetForm: 'Penggolong / Sopan', answer: 'ขอบคุณครับ', romaji: 'khop-khun khrap', hintRule: 'Pembicara pria menutup kalimat sopan dengan ครับ (khrap).', distractors: ['ขอบคุณค่ะ', 'ขอบคุณไหม', 'ขอบคุณแล้ว'] },
        { id: 'th-c6', base: 'น้ำ (nam) = air', meaning_id: 'satu botol air (penggolong botol)', group: 'Penggolong', targetForm: 'Penggolong / Sopan', answer: 'ขวด', romaji: 'khuat', hintRule: 'ขวด (khuat) dipakai sebagai kata penggolong untuk benda berbentuk botol.', distractors: ['คน', 'เล่ม', 'แก้ว'] },
        { id: 'th-c7', base: 'นอน (non) = tidur', meaning_id: 'akan tidur', group: 'Penanda Waktu', targetForm: 'Akan (จะ)', answer: 'จะนอน', romaji: 'ja non', hintRule: 'จะ ditempatkan tepat di depan verba นอน.', distractors: ['กำลังนอน', 'นอนแล้ว', 'ไม่นอน'] }
      ]
    }
  };

  global.LingoData = global.LingoData || {};
  global.LingoData.CONJUGATION_DATA = CONJUGATION_DATA;
})(window);
