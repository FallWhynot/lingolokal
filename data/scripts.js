/* LingoLokal: Structured Script & Alphabet Learning Data (JA, KO, AR, RU, TH, ZH + Latin pronunciation tips) */
(function (global) {
  'use strict';

  const SCRIPT_DATA = {
    ja: {
      isNonLatin: true,
      title: 'Aksara Jepang: Hiragana & Katakana',
      subtitle: 'Kuasai 46 huruf dasar Hiragana (kata asli Jepang) dan Katakana (kata serapan) sebelum masuk ke kosakata dan pola kalimat.',
      tabs: [
        {
          id: 'hiragana',
          label: 'Hiragana (46)',
          cols: 5,
          chars: [
            { id: 'ja-h-a', char: 'あ', romaji: 'a', tip: 'Seperti "a" pada kata "apel".', example: 'あさ (asa · pagi)' },
            { id: 'ja-h-i', char: 'い', romaji: 'i', tip: 'Seperti "i" pada "ikan".', example: 'いぬ (inu · anjing)' },
            { id: 'ja-h-u', char: 'う', romaji: 'u', tip: 'Bunyi "u" tanpa memonyongkan bibir terlalu maju.', example: 'うみ (umi · laut)' },
            { id: 'ja-h-e', char: 'え', romaji: 'e', tip: 'Seperti "e" pada "ember".', example: 'えき (eki · stasiun)' },
            { id: 'ja-h-o', char: 'お', romaji: 'o', tip: 'Seperti "o" pada "obat".', example: 'おちゃ (ocha · teh)' },
            { id: 'ja-h-ka', char: 'か', romaji: 'ka', tip: 'Konsonan k + a.', example: 'かさ (kasa · payung)' },
            { id: 'ja-h-ki', char: 'き', romaji: 'ki', tip: 'Konsonan k + i.', example: 'き (ki · pohon)' },
            { id: 'ja-h-ku', char: 'く', romaji: 'ku', tip: 'Mirip paruh burung "ku".', example: 'くつ (kutsu · sepatu)' },
            { id: 'ja-h-ke', char: 'け', romaji: 'ke', tip: 'Konsonan k + e.', example: 'けさ (kesa · pagi ini)' },
            { id: 'ja-h-ko', char: 'こ', romaji: 'ko', tip: 'Dua garis datar pendek.', example: 'ここ (koko · di sini)' },
            { id: 'ja-h-sa', char: 'さ', romaji: 'sa', tip: 'Konsonan s + a.', example: 'さかな (sakana · ikan)' },
            { id: 'ja-h-shi', char: 'し', romaji: 'shi', tip: 'Dibaca "syi" lembut, bukan "si" keras.', example: 'しろ (shiro · putih)' },
            { id: 'ja-h-su', char: 'す', romaji: 'su', tip: 'Konsonan s + u.', example: 'すし (sushi)' },
            { id: 'ja-h-se', char: 'せ', romaji: 'se', tip: 'Konsonan s + e.', example: 'せかい (sekai · dunia)' },
            { id: 'ja-h-so', char: 'そ', romaji: 'so', tip: 'Konsonan s + o.', example: 'そら (sora · langit)' },
            { id: 'ja-h-ta', char: 'た', romaji: 'ta', tip: 'Mirip huruf "t" dan "a".', example: 'たべる (taberu · makan)' },
            { id: 'ja-h-chi', char: 'ち', romaji: 'chi', tip: 'Dibaca "ci" seperti "cinta".', example: 'ちず (chizu · peta)' },
            { id: 'ja-h-tsu', char: 'つ', romaji: 'tsu', tip: 'Gabungan "ts" lembut + u.', example: 'つき (tsuki · bulan)' },
            { id: 'ja-h-te', char: 'て', romaji: 'te', tip: 'Konsonan t + e.', example: 'て (te · tangan)' },
            { id: 'ja-h-to', char: 'と', romaji: 'to', tip: 'Konsonan t + o.', example: 'とり (tori · burung)' },
            { id: 'ja-h-na', char: 'な', romaji: 'na', tip: 'Konsonan n + a.', example: 'なつ (natsu · musim panas)' },
            { id: 'ja-h-ni', char: 'に', romaji: 'ni', tip: 'Konsonan n + i.', example: 'にほん (nihon · Jepang)' },
            { id: 'ja-h-nu', char: 'ぬ', romaji: 'nu', tip: 'Berakhir simpul melingkar.', example: 'いぬ (inu · anjing)' },
            { id: 'ja-h-ne', char: 'ね', romaji: 'ne', tip: 'Mirip ぬ dengan garis tegak lurus.', example: 'ねこ (neko · kucing)' },
            { id: 'ja-h-no', char: 'の', romaji: 'no', tip: 'Partikel kepemilikan paling umum.', example: 'のむ (nomu · minum)' },
            { id: 'ja-h-ha', char: 'は', romaji: 'ha', tip: 'Dibaca "wa" saat jadi partikel topik.', example: 'はな (hana · bunga)' },
            { id: 'ja-h-hi', char: 'ひ', romaji: 'hi', tip: 'Bentuk seperti senyuman.', example: 'ひと (hito · orang)' },
            { id: 'ja-h-fu', char: 'ふ', romaji: 'fu', tip: 'Tiupan udara lembut antara "f" dan "h".', example: 'ふゆ (fuyu · musim dingin)' },
            { id: 'ja-h-he', char: 'へ', romaji: 'he', tip: 'Dibaca "e" saat jadi partikel arah.', example: 'へや (heya · kamar)' },
            { id: 'ja-h-ho', char: 'ほ', romaji: 'ho', tip: 'Mirip は dengan dua garis atas.', example: 'ほん (hon · buku)' },
            { id: 'ja-h-ma', char: 'ま', romaji: 'ma', tip: 'Konsonan m + a.', example: 'まち (machi · kota)' },
            { id: 'ja-h-mi', char: 'み', romaji: 'mi', tip: 'Mirip angka 21 sambung.', example: 'みず (mizu · air)' },
            { id: 'ja-h-mu', char: 'む', romaji: 'mu', tip: 'Konsonan m + u.', example: 'むし (mushi · serangga)' },
            { id: 'ja-h-me', char: 'め', romaji: 'me', tip: 'Mirip ぬ tanpa simpul akhir.', example: 'め (me · mata)' },
            { id: 'ja-h-mo', char: 'も', romaji: 'mo', tip: 'Partikel yang berarti "juga".', example: 'もり (mori · hutan)' },
            { id: 'ja-h-ya', char: 'や', romaji: 'ya', tip: 'Baris Y hanya memiliki 3 huruf.', example: 'やま (yama · gunung)' },
            { id: 'ja-h-yu', char: 'ゆ', romaji: 'yu', tip: 'Simbol pemandian air panas (onsen).', example: 'ゆき (yuki · salju)' },
            { id: 'ja-h-yo', char: 'よ', romaji: 'yo', tip: 'Sering dipakai di akhir kalimat.', example: 'よる (yoru · malam)' },
            { id: 'ja-h-ra', char: 'ら', romaji: 'ra', tip: 'R Jepang ringan antara "r" dan "l".', example: 'らいねん (rainen · tahun depan)' },
            { id: 'ja-h-ri', char: 'り', romaji: 'ri', tip: 'Dua garis melengkung tegak.', example: 'りんご (ringo · apel)' },
            { id: 'ja-h-ru', char: 'る', romaji: 'ru', tip: 'Berakhir lingkaran kecil.', example: 'くるま (kuruma · mobil)' },
            { id: 'ja-h-re', char: 'れ', romaji: 're', tip: 'Konsonan r + e.', example: 'れきし (rekishi · sejarah)' },
            { id: 'ja-h-ro', char: 'ろ', romaji: 'ro', tip: 'Mirip る tanpa lingkaran di ujung.', example: 'ろく (roku · enam)' },
            { id: 'ja-h-wa', char: 'わ', romaji: 'wa', tip: 'Konsonan w + a.', example: 'わたし (watashi · saya)' },
            { id: 'ja-h-wo', char: 'を', romaji: 'wo (o)', tip: 'Khusus partikel objek, dibaca "o".', example: 'みずをのむ (minum air)' },
            { id: 'ja-h-n', char: 'ん', romaji: 'n', tip: 'Satu-satunya konsonan berdiri sendiri.', example: 'ほん (hon · buku)' }
          ]
        },
        {
          id: 'katakana',
          label: 'Katakana (46)',
          cols: 5,
          chars: [
            { id: 'ja-k-a', char: 'ア', romaji: 'a', tip: 'Bentuk tegas bersudut.', example: 'アイス (aisu · es)' },
            { id: 'ja-k-i', char: 'イ', romaji: 'i', tip: 'Dua goresan miring.', example: 'インドネシア (Indonesia)' },
            { id: 'ja-k-u', char: 'ウ', romaji: 'u', tip: 'Mirip う versi kaku.', example: 'ウイルス (uirusu · virus)' },
            { id: 'ja-k-e', char: 'エ', romaji: 'e', tip: 'Seperti huruf kapital I tebal.', example: 'エアコン (eakon · AC)' },
            { id: 'ja-k-o', char: 'オ', romaji: 'o', tip: 'Bentuk silang dengan ekor kiri.', example: 'オレンジ (orenji · jeruk)' },
            { id: 'ja-k-ka', char: 'カ', romaji: 'ka', tip: 'Mirip か tanpa titik.', example: 'カメラ (kamera)' },
            { id: 'ja-k-ki', char: 'キ', romaji: 'ki', tip: 'Seperti kunci (key).', example: 'キロ (kiro · kilo)' },
            { id: 'ja-k-ku', char: 'ク', romaji: 'ku', tip: 'Sudut tajam miring.', example: 'クラス (kurasu · kelas)' },
            { id: 'ja-k-ke', char: 'ケ', romaji: 'ke', tip: 'Mirip huruf K.', example: 'ケーキ (keeki · kue)' },
            { id: 'ja-k-ko', char: 'コ', romaji: 'ko', tip: 'Seperti sudut kotak kanan.', example: 'コーヒー (koohii · kopi)' },
            { id: 'ja-k-sa', char: 'サ', romaji: 'sa', tip: 'Dua garis tegak menembus garis datar.', example: 'サラダ (sarada · salad)' },
            { id: 'ja-k-shi', char: 'シ', romaji: 'shi', tip: 'Goresan bawah naik ke kanan atas.', example: 'シャツ (shatsu · kemeja)' },
            { id: 'ja-k-su', char: 'ス', romaji: 'su', tip: 'Bentuk seperti kaki pelari.', example: 'スーパー (suupaa · supermarket)' },
            { id: 'ja-k-se', char: 'セ', romaji: 'se', tip: 'Mirip せ versi lurus.', example: 'セーター (seetaa · sweter)' },
            { id: 'ja-k-so', char: 'ソ', romaji: 'so', tip: 'Satu titik + garis turun dari atas.', example: 'ソファ (sofa)' },
            { id: 'ja-k-ta', char: 'タ', romaji: 'ta', tip: 'Mirip ク dengan garis pendek di tengah.', example: 'タクシー (takushii · taksi)' },
            { id: 'ja-k-chi', char: 'チ', romaji: 'chi', tip: 'Seperti angka 5 terbalik.', example: 'チーズ (chiizu · keju)' },
            { id: 'ja-k-tsu', char: 'ツ', romaji: 'tsu', tip: 'Dua titik tegak + garis turun (bedakan dari シ).', example: 'ツアー (tsuaa · tur)' },
            { id: 'ja-k-te', char: 'テ', romaji: 'te', tip: 'Seperti huruf T dengan garis atas.', example: 'テスト (tesuto · tes)' },
            { id: 'ja-k-to', char: 'ト', romaji: 'to', tip: 'Garis tegak dengan cabang kanan.', example: 'トイレ (toire · toilet)' },
            { id: 'ja-k-na', char: 'ナ', romaji: 'na', tip: 'Tanda tambah melengkung ke kiri.', example: 'ナイフ (naifu · pisau)' },
            { id: 'ja-k-ni', char: 'ニ', romaji: 'ni', tip: 'Dua garis datar sejajar.', example: 'ニュース (nyuusu · berita)' },
            { id: 'ja-k-nu', char: 'ヌ', romaji: 'nu', tip: 'Mirip ス dengan garis silang.', example: 'ヌードル (nuudoru · mi)' },
            { id: 'ja-k-ne', char: 'ネ', romaji: 'ne', tip: 'Bentuk bercabang empat.', example: 'ネット (netto · internet)' },
            { id: 'ja-k-no', char: 'ノ', romaji: 'no', tip: 'Satu garis miring sederhana.', example: 'ノート (nooto · buku catatan)' },
            { id: 'ja-k-ha', char: 'ハ', romaji: 'ha', tip: 'Dua garis membuka ke bawah.', example: 'ハンバーガー (burger)' },
            { id: 'ja-k-hi', char: 'ヒ', romaji: 'hi', tip: 'Garis L dengan palang kecil.', example: 'ヒント (hinto · petunjuk)' },
            { id: 'ja-k-fu', char: 'フ', romaji: 'fu', tip: 'Satu sudut melengkung.', example: 'フォーク (fooku · garpu)' },
            { id: 'ja-k-he', char: 'ヘ', romaji: 'he', tip: 'Hampir identik dengan Hiragana へ.', example: 'ヘルメット (helm)' },
            { id: 'ja-k-ho', char: 'ホ', romaji: 'ho', tip: 'Seperti salib dengan dua kaki.', example: 'ホテル (hoteru · hotel)' },
            { id: 'ja-k-ma', char: 'マ', romaji: 'ma', tip: 'Sudut atas dengan titik bawah.', example: 'マスク (masuku · masker)' },
            { id: 'ja-k-mi', char: 'ミ', romaji: 'mi', tip: 'Tiga garis miring sejajar.', example: 'ミルク (miruku · susu)' },
            { id: 'ja-k-mu', char: 'ム', romaji: 'mu', tip: 'Bentuk segitiga terbuka.', example: 'ムード (muudo · suasana)' },
            { id: 'ja-k-me', char: 'メ', romaji: 'me', tip: 'Garis silang seperti X.', example: 'メニュー (menyuu · menu)' },
            { id: 'ja-k-mo', char: 'モ', romaji: 'mo', tip: 'Mirip も versi kaku.', example: 'モデル (moderu · model)' },
            { id: 'ja-k-ya', char: 'ヤ', romaji: 'ya', tip: 'Mirip や tanpa titik.', example: 'ヤシ (yashi · kelapa)' },
            { id: 'ja-k-yu', char: 'ユ', romaji: 'yu', tip: 'Seperti sudut kotak dengan alas.', example: 'ユーロ (yuuro · euro)' },
            { id: 'ja-k-yo', char: 'ヨ', romaji: 'yo', tip: 'Seperti huruf E menghadap kiri.', example: 'ヨーグルト (yogurt)' },
            { id: 'ja-k-ra', char: 'ラ', romaji: 'ra', tip: 'Garis pendek di atas フ.', example: 'ラーメン (raamen)' },
            { id: 'ja-k-ri', char: 'リ', romaji: 'ri', tip: 'Dua garis tegak lurus.', example: 'リスト (risuto · daftar)' },
            { id: 'ja-k-ru', char: 'ル', romaji: 'ru', tip: 'Dua garis berlawanan arah.', example: 'ルール (ruuru · aturan)' },
            { id: 'ja-k-re', char: 'レ', romaji: 're', tip: 'Seperti tanda centang.', example: 'レストラン (restoran)' },
            { id: 'ja-k-ro', char: 'ロ', romaji: 'ro', tip: 'Bentuk kotak sempurna.', example: 'ロボット (robotto · robot)' },
            { id: 'ja-k-wa', char: 'ワ', romaji: 'wa', tip: 'Seperti ウ tanpa topi atas.', example: 'ワイン (wain · anggur)' },
            { id: 'ja-k-wo', char: 'ヲ', romaji: 'wo (o)', tip: 'Jarang dipakai, bunyi "o".', example: 'Partikel objek' },
            { id: 'ja-k-n', char: 'ン', romaji: 'n', tip: 'Satu titik + garis naik dari bawah (bedakan dari ソ).', example: 'パン (pan · roti)' }
          ]
        }
      ]
    },
    ko: {
      isNonLatin: true,
      title: 'Aksara Korea: Hangul (한글)',
      subtitle: 'Hangul dirancang sangat logis: gabungkan 14 konsonan dasar dan 10 vokal dasar menjadi blok suku kata yang langsung bisa dibaca.',
      tabs: [
        {
          id: 'vowels',
          label: 'Vokal Dasar & Gabungan (14)',
          cols: 5,
          chars: [
            { id: 'ko-v-a', char: '아 (ㅏ)', romaji: 'a', tip: 'Garis pendek ke kanan. Bunyi "a" seperti "api".', example: '아침 (achim · pagi)' },
            { id: 'ko-v-ya', char: '야 (ㅑ)', romaji: 'ya', tip: 'Dua garis ke kanan menambah bunyi "y".', example: '야구 (yagu · bisbol)' },
            { id: 'ko-v-eo', char: '어 (ㅓ)', romaji: 'eo', tip: 'Mulut terbuka santai seperti "o" pada "toko".', example: '어디 (eodi · di mana)' },
            { id: 'ko-v-yeo', char: '여 (ㅕ)', romaji: 'yeo', tip: 'Gabungan y + eo.', example: '여기 (yeogi · di sini)' },
            { id: 'ko-v-o', char: '오 (ㅗ)', romaji: 'o', tip: 'Garis ke atas, bibir dibulatkan maju.', example: '오늘 (oneul · hari ini)' },
            { id: 'ko-v-yo', char: '요 (ㅛ)', romaji: 'yo', tip: 'Dua garis ke atas, sering jadi akhiran sopan.', example: '요리 (yori · masakan)' },
            { id: 'ko-v-u', char: '우 (ㅜ)', romaji: 'u', tip: 'Garis menunjuk ke bawah.', example: '우유 (uyu · susu)' },
            { id: 'ko-v-yu', char: '유 (ㅠ)', romaji: 'yu', tip: 'Dua garis menunjuk ke bawah.', example: '유명 (yumyeong · terkenal)' },
            { id: 'ko-v-eu', char: '으 (ㅡ)', romaji: 'eu', tip: 'Seperti "e" pada kata "emas" dengan bibir datar.', example: '음식 (eumsik · makanan)' },
            { id: 'ko-v-i', char: '이 (ㅣ)', romaji: 'i', tip: 'Garis tegak lurus, bunyi "i".', example: '이름 (ireum · nama)' },
            { id: 'ko-v-ae', char: '애 (ㅐ)', romaji: 'ae', tip: 'Bunyi "e" terbuka seperti "ember".', example: '개 (gae · anjing)' },
            { id: 'ko-v-e', char: '에 (ㅔ)', romaji: 'e', tip: 'Di Korea modern bunyinya hampir sama dengan ㅐ.', example: '메뉴 (menyu · menu)' },
            { id: 'ko-v-wa', char: '와 (ㅘ)', romaji: 'wa', tip: 'Gabungan cepat ㅗ (o) + ㅏ (a).', example: '과일 (gwail · buah)' },
            { id: 'ko-v-wo', char: '워 (ㅝ)', romaji: 'wo', tip: 'Gabungan cepat ㅜ (u) + ㅓ (eo).', example: '고마워 (gomawo · makasih)' }
          ]
        },
        {
          id: 'consonants',
          label: 'Konsonan Dasar & Ganda (19)',
          cols: 5,
          chars: [
            { id: 'ko-c-g', char: 'ㄱ', romaji: 'g / k', tip: 'Awal kata agak "k" lembut, di tengah jadi "g".', example: '가방 (gabang · tas)' },
            { id: 'ko-c-n', char: 'ㄴ', romaji: 'n', tip: 'Bentuk lidah menyentuh gusi atas.', example: '나라 (nara · negara)' },
            { id: 'ko-c-d', char: 'ㄷ', romaji: 'd / t', tip: 'Antara "d" dan "t" tanpa hembusan kuat.', example: '다리 (dari · kaki/jembatan)' },
            { id: 'ko-c-r', char: 'ㄹ', romaji: 'r / l', tip: 'Di awal/tengah dibaca "r" ringan, di akhir (batchim) dibaca "l".', example: '라면 (ramyeon · mi)' },
            { id: 'ko-c-m', char: 'ㅁ', romaji: 'm', tip: 'Bentuk kotak seperti mulut (mouth).', example: '물 (mul · air)' },
            { id: 'ko-c-b', char: 'ㅂ', romaji: 'b / p', tip: 'Antara "b" dan "p" lembut.', example: '밥 (bap · nasi)' },
            { id: 'ko-c-s', char: 'ㅅ', romaji: 's / sh', tip: 'Menjadi "sy" lembut jika bertemu vokal ㅣ (시 = shi).', example: '사람 (saram · orang)' },
            { id: 'ko-c-ng', char: 'ㅇ', romaji: 'senyap / ng', tip: 'Tidak berbunyi di awal suku kata, dibaca "ng" di posisi akhir.', example: '안녕 (annyeong · hai)' },
            { id: 'ko-c-j', char: 'ㅈ', romaji: 'j / ch', tip: 'Bunyi "j" atau "c" lembut.', example: '집 (jip · rumah)' },
            { id: 'ko-c-ch', char: 'ㅊ', romaji: 'ch (hembus)', tip: 'Seperti ㅈ tetapi dengan hembusan udara kuat.', example: '차 (cha · teh/mobil)' },
            { id: 'ko-c-k', char: 'ㅋ', romaji: 'k (hembus)', tip: 'Seperti ㄱ dengan hembusan udara kuat.', example: '커피 (keopi · kopi)' },
            { id: 'ko-c-t', char: 'ㅌ', romaji: 't (hembus)', tip: 'Seperti ㄷ dengan hembusan udara kuat.', example: '택시 (taeksi · taksi)' },
            { id: 'ko-c-p', char: 'ㅍ', romaji: 'p (hembus)', tip: 'Seperti ㅂ dengan hembusan udara kuat.', example: '포장 (pojang · bungkus)' },
            { id: 'ko-c-h', char: 'ㅎ', romaji: 'h', tip: 'Seperti topi di atas lingkaran, bunyi "h".', example: '한국 (hanguk · Korea)' },
            { id: 'ko-c-kk', char: 'ㄲ', romaji: 'kk (tegang)', tip: 'K tegas tanpa hembusan napas.', example: '꽃 (kkot · bunga)' },
            { id: 'ko-c-tt', char: 'ㄸ', romaji: 'tt (tegang)', tip: 'T tegas seperti "t" pada "tahu".', example: '떡볶이 (tteokbokki)' },
            { id: 'ko-c-pp', char: 'ㅃ', romaji: 'pp (tegang)', tip: 'P tegas tanpa hembusan.', example: '빵 (ppang · roti)' },
            { id: 'ko-c-ss', char: 'ㅆ', romaji: 'ss (tajam)', tip: 'S lebih tajam dan panjang.', example: '쓰다 (sseuda · menulis)' },
            { id: 'ko-c-jj', char: 'ㅉ', romaji: 'jj (tegang)', tip: 'C tegas tanpa hembusan.', example: '진짜 (jinjja · benaran)' }
          ]
        }
      ]
    },
    ar: {
      isNonLatin: true,
      title: 'Aksara Arab: Hijaiyah & Harakat',
      subtitle: 'Bahasa Arab dibaca dari kanan ke kiri. Kenali 28 huruf Hijaiyah dan 6 tanda harakat dasar untuk membaca bunyi vokal.',
      tabs: [
        {
          id: 'hijaiyah',
          label: 'Huruf Hijaiyah (28)',
          cols: 4,
          chars: [
            { id: 'ar-1', char: 'ا', romaji: 'Alif (a)', tip: 'Garis tegak lurus, pemanjang bunyi "a".', example: 'أَنَا (ana · saya)' },
            { id: 'ar-2', char: 'ب', romaji: 'Ba (b)', tip: 'Satu titik di bawah.', example: 'بَيْت (bayt · rumah)' },
            { id: 'ar-3', char: 'ت', romaji: 'Ta (t)', tip: 'Dua titik di atas.', example: 'تَمْر (tamr · kurma)' },
            { id: 'ar-4', char: 'ث', romaji: 'Tsa (th)', tip: 'Tiga titik di atas, ujung lidah sentuh gigi atas.', example: 'ثَلَاثَة (tsalatsah · tiga)' },
            { id: 'ar-5', char: 'ج', romaji: 'Jim (j)', tip: 'Satu titik di tengah perut.', example: 'جَمِيل (jamil · indah)' },
            { id: 'ar-6', char: 'ح', romaji: 'Ha (h halus)', tip: 'Tanpa titik, bunyi "h" bersih dari tengah tenggorokan.', example: 'حَمْد (hamd · pujian)' },
            { id: 'ar-7', char: 'خ', romaji: 'Kha (kh)', tip: 'Satu titik di atas, bunyi "kh" seperti "khabar".', example: 'خُبْز (khubz · roti)' },
            { id: 'ar-8', char: 'د', romaji: 'Dal (d)', tip: 'Tidak menyambung ke huruf sesudahnya.', example: 'دَرْس (dars · pelajaran)' },
            { id: 'ar-9', char: 'ذ', romaji: 'Dzal (dz)', tip: 'Seperti د dengan satu titik di atas.', example: 'ذَهَب (dzahab · emas)' },
            { id: 'ar-10', char: 'ر', romaji: 'Ra (r)', tip: 'Bergetar jelas seperti "r" Indonesia.', example: 'رَحْمَة (rahmah · rahmat)' },
            { id: 'ar-11', char: 'ز', romaji: 'Zay (z)', tip: 'Seperti ر dengan satu titik di atas.', example: 'زَيْت (zayt · minyak)' },
            { id: 'ar-12', char: 'س', romaji: 'Sin (s)', tip: 'Tiga gigi tanpa titik, bunyi "s".', example: 'سَلَام (salam · damai)' },
            { id: 'ar-13', char: 'ش', romaji: 'Syin (sy)', tip: 'Seperti س dengan tiga titik di atas.', example: 'شُكْرًا (syukran · terima kasih)' },
            { id: 'ar-14', char: 'ص', romaji: 'Shad (sh tebal)', tip: 'Bunyi "s" tebal dengan lidah terangkat.', example: 'صَبَاح (shabah · pagi)' },
            { id: 'ar-15', char: 'ض', romaji: 'Dhad (dh tebal)', tip: 'Huruf khas bahasa Arab, "d" tebal.', example: 'ضَيْف (dhayf · tamu)' },
            { id: 'ar-16', char: 'ط', romaji: 'Tha (t tebal)', tip: 'Bunyi "t" tebal.', example: 'طَعَام (thaam · makanan)' },
            { id: 'ar-17', char: 'ظ', romaji: 'Zha (zh tebal)', tip: 'Seperti ط dengan satu titik di atas.', example: 'ظُهْر (zhuhr · siang)' },
            { id: 'ar-18', char: 'ع', romaji: 'Ain (\')', tip: 'Bunyi dari tenggorokan dalam.', example: 'عَرَبِيّ (arabi · Arab)' },
            { id: 'ar-19', char: 'غ', romaji: 'Ghain (gh)', tip: 'Seperti ع dengan satu titik, bunyi "gh".', example: 'غُرْفَة (ghurfah · kamar)' },
            { id: 'ar-20', char: 'ف', romaji: 'Fa (f)', tip: 'Satu titik di atas.', example: 'فُنْدُق (funduq · hotel)' },
            { id: 'ar-21', char: 'ق', romaji: 'Qaf (q)', tip: 'Dua titik di atas, bunyi "q" dari pangkal lidah.', example: 'قَهْوَة (qahwah · kopi)' },
            { id: 'ar-22', char: 'ك', romaji: 'Kaf (k)', tip: 'Bunyi "k" ringan seperti Indonesia.', example: 'كِتَاب (kitab · buku)' },
            { id: 'ar-23', char: 'ل', romaji: 'Lam (l)', tip: 'Bunyi "l" seperti Indonesia.', example: 'لَذِيذ (ladzidz · lezat)' },
            { id: 'ar-24', char: 'م', romaji: 'Mim (m)', tip: 'Bunyi "m".', example: 'مَسْجِد (masjid)' },
            { id: 'ar-25', char: 'ن', romaji: 'Nun (n)', tip: 'Mangkuk dengan satu titik di tengah.', example: 'نَعَم (naam · ya)' },
            { id: 'ar-26', char: 'ه', romaji: 'Ha (h)', tip: 'Bunyi "h" ringan dari dada.', example: 'هٰذَا (hadza · ini)' },
            { id: 'ar-27', char: 'و', romaji: 'Waw (w / u)', tip: 'Konsonan "w" atau pemanjang vokal "u".', example: 'وَقْت (waqt · waktu)' },
            { id: 'ar-28', char: 'ي', romaji: 'Ya (y / i)', tip: 'Dua titik di bawah, konsonan "y" atau pemanjang "i".', example: 'يَوْم (yawm · hari)' }
          ]
        },
        {
          id: 'harakat',
          label: 'Harakat Dasar (6)',
          cols: 3,
          chars: [
            { id: 'ar-h-1', char: 'بَ', romaji: 'Fathah (a)', tip: 'Garis miring di atas huruf memberi bunyi "a".', example: 'بَ = ba' },
            { id: 'ar-h-2', char: 'بِ', romaji: 'Kasrah (i)', tip: 'Garis miring di bawah huruf memberi bunyi "i".', example: 'بِ = bi' },
            { id: 'ar-h-3', char: 'بُ', romaji: 'Dhammah (u)', tip: 'Tanda seperti waw kecil di atas memberi bunyi "u".', example: 'بُ = bu' },
            { id: 'ar-h-4', char: 'بْ', romaji: 'Sukun (mati)', tip: 'Lingkaran kecil di atas mematikan vokal huruf.', example: 'أَبْ = ab' },
            { id: 'ar-h-5', char: 'بً', romaji: 'Tanwin (an/in/un)', tip: 'Harakat ganda menambah akhiran "-n".', example: 'شُكْرًا = syukran' },
            { id: 'ar-h-6', char: 'بّ', romaji: 'Syaddah (ganda)', tip: 'Tanda seperti "w" kecil menggandakan konsonan.', example: 'رَبّ = rabb' }
          ]
        }
      ]
    },
    ru: {
      isNonLatin: true,
      title: 'Aksara Rusia: Kiril (Кириллица)',
      subtitle: 'Banyak huruf Kiril terlihat mirip huruf Latin tetapi bunyinya berbeda (seperti В = V, Н = N, Р = R). Pelajari jebakan ini lebih dulu.',
      tabs: [
        {
          id: 'cyrillic-tricky',
          label: 'Mirip Latin & Jebakan (12)',
          cols: 4,
          chars: [
            { id: 'ru-1', char: 'А а', romaji: 'a', tip: 'Sama persis dengan "a" Latin.', example: 'да (da · ya)' },
            { id: 'ru-2', char: 'В в', romaji: 'v', tip: 'Jebakan! Bentuk seperti B, tapi dibaca "V".', example: 'вода (voda · air)' },
            { id: 'ru-3', char: 'Е е', romaji: 'ye', tip: 'Dibaca "ye" seperti pada "yes".', example: 'нет (nyet · tidak)' },
            { id: 'ru-4', char: 'К к', romaji: 'k', tip: 'Sama dengan "k" Latin.', example: 'кофе (kofe · kopi)' },
            { id: 'ru-5', char: 'М м', romaji: 'm', tip: 'Sama dengan "m" Latin.', example: 'мама (mama)' },
            { id: 'ru-6', char: 'Н н', romaji: 'n', tip: 'Jebakan! Bentuk seperti H, tapi dibaca "N".', example: 'ночь (noch · malam)' },
            { id: 'ru-7', char: 'О о', romaji: 'o / a', tip: 'Jika ditekan dibaca "o", jika tidak ditekan agak "a".', example: 'окно (akno · jendela)' },
            { id: 'ru-8', char: 'Р р', romaji: 'r', tip: 'Jebakan! Bentuk seperti P, tapi dibaca "R" bergetar.', example: 'привет (privet · hai)' },
            { id: 'ru-9', char: 'С с', romaji: 's', tip: 'Jebakan! Bentuk seperti C, tapi selalu dibaca "S".', example: 'спасибо (spasibo · makasih)' },
            { id: 'ru-10', char: 'Т т', romaji: 't', tip: 'Sama dengan "t" Latin.', example: 'там (tam · di sana)' },
            { id: 'ru-11', char: 'У у', romaji: 'u', tip: 'Jebakan! Bentuk seperti Y, tapi dibaca "U".', example: 'утро (utro · pagi)' },
            { id: 'ru-12', char: 'Х х', romaji: 'kh', tip: 'Jebakan! Bentuk seperti X, tapi dibaca "kh".', example: 'хорошо (khorosho · bagus)' }
          ]
        },
        {
          id: 'cyrillic-unique',
          label: 'Huruf Khas Kiril (21)',
          cols: 4,
          chars: [
            { id: 'ru-13', char: 'Б б', romaji: 'b', tip: 'Huruf "B" asli Rusia.', example: 'банк (bank)' },
            { id: 'ru-14', char: 'Г г', romaji: 'g', tip: 'Seperti tiang gantungan, dibaca "g".', example: 'город (gorod · kota)' },
            { id: 'ru-15', char: 'Д д', romaji: 'd', tip: 'Bentuk berkaki dua, dibaca "d".', example: 'дом (dom · rumah)' },
            { id: 'ru-16', char: 'Ё ё', romaji: 'yo', tip: 'Selalu mendapat tekanan bunyi "yo".', example: 'ёж (yozh · landak)' },
            { id: 'ru-17', char: 'Ж ж', romaji: 'zh', tip: 'Seperti "s" pada kata Inggris "measure".', example: 'жизнь (zhizn · hidup)' },
            { id: 'ru-18', char: 'З з', romaji: 'z', tip: 'Mirip angka 3, dibaca "z".', example: 'завтра (zavtra · besok)' },
            { id: 'ru-19', char: 'И и', romaji: 'i', tip: 'Seperti N terbalik, dibaca "i".', example: 'имя (imya · nama)' },
            { id: 'ru-20', char: 'Й й', romaji: 'y (pendek)', tip: 'Seperti И dengan topi, bunyi "y" singkat.', example: 'чай (chay · teh)' },
            { id: 'ru-21', char: 'Л л', romaji: 'l', tip: 'Seperti atap tenda, dibaca "l".', example: 'любовь (lyubov · cinta)' },
            { id: 'ru-22', char: 'П п', romaji: 'p', tip: 'Seperti gawang, dibaca "p".', example: 'пока (poka · dadah)' },
            { id: 'ru-23', char: 'Ф ф', romaji: 'f', tip: 'Lingkaran dibelah garis, dibaca "f".', example: 'фото (foto)' },
            { id: 'ru-24', char: 'Ц ц', romaji: 'ts', tip: 'Dibaca "ts" cepat.', example: 'центр (tsentr · pusat)' },
            { id: 'ru-25', char: 'Ч ч', romaji: 'ch', tip: 'Mirip angka 4, dibaca "c" seperti "cinta".', example: 'час (chas · jam)' },
            { id: 'ru-26', char: 'Ш ш', romaji: 'sh', tip: 'Tiga kaki, dibaca "sy".', example: 'школа (shkola · sekolah)' },
            { id: 'ru-27', char: 'Щ щ', romaji: 'shch', tip: 'Seperti Ш dengan ekor kecil, "sy" lebih halus.', example: 'борщ (borshch · sup)' },
            { id: 'ru-28', char: 'Ъ ъ', romaji: 'tanda keras', tip: 'Memisahkan bunyi konsonan agar tetap keras.', example: 'объект (obyekt)' },
            { id: 'ru-29', char: 'Ы ы', romaji: 'y (dalam)', tip: 'Bunyi "i" dari bagian belakang mulut.', example: 'мы (my · kami)' },
            { id: 'ru-30', char: 'Ь ь', romaji: 'tanda lunak', tip: 'Melembutkan konsonan sebelumnya.', example: 'день (den · hari)' },
            { id: 'ru-31', char: 'Э э', romaji: 'e', tip: 'Bunyi "e" murni seperti "ember".', example: 'это (eto · ini)' },
            { id: 'ru-32', char: 'Ю ю', romaji: 'yu', tip: 'Dibaca "yu".', example: 'юг (yug · selatan)' },
            { id: 'ru-33', char: 'Я я', romaji: 'ya', tip: 'Seperti R terbalik, dibaca "ya" (juga berarti "saya").', example: 'я (ya · saya)' }
          ]
        }
      ]
    },
    th: {
      isNonLatin: true,
      title: 'Aksara Thailand: Konsonan Inti & Vokal',
      subtitle: 'Aksara Thai ditulis bersambung tanpa spasi antar kata. Mulailah dari 18 konsonan yang paling sering muncul serta tanda vokal utamanya.',
      tabs: [
        {
          id: 'thai-cons',
          label: 'Konsonan Inti (18)',
          cols: 4,
          chars: [
            { id: 'th-1', char: 'ก', romaji: 'k / g (Ko Kai)', tip: 'Konsonan pertama, kelas tengah. Seperti "k" tanpa hembusan.', example: 'ไก่ (kai · ayam)' },
            { id: 'th-2', char: 'ข', romaji: 'kh (Kho Khai)', tip: 'Kelas tinggi, "k" berhembus.', example: 'ขอบคุณ (khop khun · terima kasih)' },
            { id: 'th-3', char: 'ค', romaji: 'kh (Kho Khwai)', tip: 'Kelas rendah, "k" berhembus.', example: 'ครับ (khrap · sopan pria)' },
            { id: 'th-4', char: 'ง', romaji: 'ng (Ngo Ngu)', tip: 'Bunyi "ng" seperti "ngopi".', example: 'เงิน (ngoen · uang)' },
            { id: 'th-5', char: 'จ', romaji: 'j / ch (Cho Chan)', tip: 'Kelas tengah, seperti "c" tanpa hembusan.', example: 'ใจ (jai · hati)' },
            { id: 'th-6', char: 'ด', romaji: 'd (Do Dek)', tip: 'Kelas tengah, bunyi "d".', example: 'ดี (di · baik)' },
            { id: 'th-7', char: 'ต', romaji: 't (To Tao)', tip: 'Kelas tengah, "t" tanpa hembusan.', example: 'ตลาด (talat · pasar)' },
            { id: 'th-8', char: 'ท', romaji: 'th (Tho Thahan)', tip: 'Kelas rendah, "t" berhembus.', example: 'ไทย (Thai)' },
            { id: 'th-9', char: 'น', romaji: 'n (No Nu)', tip: 'Bunyi "n".', example: 'น้ำ (nam · air)' },
            { id: 'th-10', char: 'บ', romaji: 'b (Bo Baimai)', tip: 'Kelas tengah, bunyi "b".', example: 'บ้าน (ban · rumah)' },
            { id: 'th-11', char: 'ป', romaji: 'p (Po Pla)', tip: 'Mirip บ dengan ekor panjang ke atas.', example: 'ไป (pai · pergi)' },
            { id: 'th-12', char: 'พ', romaji: 'ph (Pho Phan)', tip: 'Bunyi "p" berhembus.', example: 'พูด (phut · bicara)' },
            { id: 'th-13', char: 'ม', romaji: 'm (Mo Ma)', tip: 'Bunyi "m".', example: 'มาก (mak · sangat)' },
            { id: 'th-14', char: 'ร', romaji: 'r (Ro Ruea)', tip: 'Bunyi "r" (dalam obrolan santai sering terdengar "l").', example: 'ร้อน (ron · panas)' },
            { id: 'th-15', char: 'ล', romaji: 'l (Lo Ling)', tip: 'Bunyi "l".', example: 'ลา (la · pamit)' },
            { id: 'th-16', char: 'ว', romaji: 'w (Wo Waen)', tip: 'Bunyi "w".', example: 'สวัสดี (sawatdi · halo)' },
            { id: 'th-17', char: 'ส', romaji: 's (So Suea)', tip: 'Kelas tinggi, bunyi "s".', example: 'สวย (suai · cantik)' },
            { id: 'th-18', char: 'ห', romaji: 'h (Ho Hip)', tip: 'Bunyi "h", juga dipakai menaikkan nada konsonan rendah.', example: 'หิว (hiw · lapar)' }
          ]
        },
        {
          id: 'thai-vowels',
          label: 'Vokal & Nada (10)',
          cols: 4,
          chars: [
            { id: 'th-v-1', char: 'ะ', romaji: 'a (pendek)', tip: 'Ditulis di kanan konsonan.', example: 'ค่ะ (kha · sopan wanita)' },
            { id: 'th-v-2', char: 'า', romaji: 'aa (panjang)', tip: 'Ditulis di kanan konsonan.', example: 'มา (maa · datang)' },
            { id: 'th-v-3', char: 'ิ', romaji: 'i (pendek)', tip: 'Ditulis di atas konsonan.', example: 'กิน (kin · makan)' },
            { id: 'th-v-4', char: 'ี', romaji: 'ii (panjang)', tip: 'Seperti ิ dengan garis tegak kecil di atas.', example: 'ดี (dii · bagus)' },
            { id: 'th-v-5', char: 'ุ', romaji: 'u (pendek)', tip: 'Ditulis di bawah konsonan.', example: 'คุณ (khun · Anda)' },
            { id: 'th-v-6', char: 'ู', romaji: 'uu (panjang)', tip: 'Ditulis di bawah konsonan.', example: 'ดู (duu · melihat)' },
            { id: 'th-v-7', char: 'เ', romaji: 'ee (panjang)', tip: 'Ditulis di KIRI konsonan, tetapi dibaca setelahnya.', example: 'เก่ง (keng · pintar)' },
            { id: 'th-v-8', char: 'ไ', romaji: 'ai', tip: 'Ditulis di KIRI konsonan.', example: 'ไทย (Thai)' },
            { id: 'th-v-9', char: '่', romaji: 'Mai Ek (nada rendah)', tip: 'Tanda nada pertama di atas konsonan.', example: 'ไม่ (mai · tidak)' },
            { id: 'th-v-10', char: '้', romaji: 'Mai Tho (nada jatuh)', tip: 'Tanda nada kedua di atas konsonan.', example: 'นี้ (ni · ini)' }
          ]
        }
      ]
    },
    zh: {
      isNonLatin: true,
      title: 'Mandarin: 4 Nada Pinyin & Radikal Hanzi',
      subtitle: 'Sebelum menghafal kata Mandarin, pahami dulu 4 nada Pinyin (yang membedakan arti) serta 16 radikal pembentuk karakter Hanzi.',
      tabs: [
        {
          id: 'zh-tones',
          label: '4 Nada Pinyin (5)',
          cols: 5,
          chars: [
            { id: 'zh-t-1', char: 'mā (妈)', romaji: 'Nada 1 · Datar tinggi', tip: 'Suara tinggi, rata, dan stabil.', example: '妈妈 (māma · ibu)' },
            { id: 'zh-t-2', char: 'má (麻)', romaji: 'Nada 2 · Naik', tip: 'Seperti intonasi bertanya "Hah?".', example: '麻烦 (máfán · merepotkan)' },
            { id: 'zh-t-3', char: 'mǎ (马)', romaji: 'Nada 3 · Turun lalu naik', tip: 'Turun rendah dulu baru naik sedikit.', example: '马上 (mǎshàng · segera)' },
            { id: 'zh-t-4', char: 'mà (骂)', romaji: 'Nada 4 · Turun tajam', tip: 'Tegas dan singkat seperti menyuruh.', example: '谢谢 (xièxie · terima kasih)' },
            { id: 'zh-t-5', char: 'ma (吗)', romaji: 'Nada Netral · Ringan', tip: 'Singkat dan tanpa tekanan, sering dipakai di partikel.', example: '你好吗 (nǐ hǎo ma · apa kabar?)' }
          ]
        },
        {
          id: 'zh-radicals',
          label: 'Radikal Hanzi Inti (16)',
          cols: 4,
          chars: [
            { id: 'zh-r-1', char: '人 / 亻', romaji: 'rén · orang', tip: 'Muncul di kata tentang manusia (你 kamu, 他 dia).', example: '你好 (nǐ hǎo · halo)' },
            { id: 'zh-r-2', char: '口', romaji: 'kǒu · mulut', tip: 'Muncul di kata makan, minum, bicara (吃, 喝, 吗).', example: '喝茶 (hē chá · minum teh)' },
            { id: 'zh-r-3', char: '日', romaji: 'rì · matahari / hari', tip: 'Muncul di kata waktu dan cahaya (明, 时).', example: '明天 (míngtiān · besok)' },
            { id: 'zh-r-4', char: '月', romaji: 'yuè · bulan', tip: 'Juga melambangkan bagian tubuh (朋友 teman).', example: '朋友 (péngyou · teman)' },
            { id: 'zh-r-5', char: '水 / 氵', romaji: 'shuǐ · air', tip: 'Tiga tetes air di sisi kiri untuk cairan (茶, 海, 洗).', example: '热水 (rè shuǐ · air panas)' },
            { id: 'zh-r-6', char: '火 / 灬', romaji: 'huǒ · api', tip: 'Berkaitan dengan panas dan memasak (热, 烤).', example: '火锅 (huǒguō · hotpot)' },
            { id: 'zh-r-7', char: '木', romaji: 'mù · pohon / kayu', tip: 'Berkaitan dengan tumbuhan dan bahan kayu (林, 桌).', example: '树木 (shùmù · pepohonan)' },
            { id: 'zh-r-8', char: '女', romaji: 'nǚ · perempuan', tip: 'Muncul di kata keluarga & sifat baik (妈, 姐, 好).', example: '好 (hǎo · baik)' },
            { id: 'zh-r-9', char: '心 / 忄', romaji: 'xīn · hati / perasaan', tip: 'Muncul di kata emosi dan pikiran (想, 忙, 快).', example: '开心 (kāixīn · senang)' },
            { id: 'zh-r-10', char: '手 / 扌', romaji: 'shǒu · tangan', tip: 'Muncul di aksi tangan (打, 找, 拿).', example: '手机 (shǒujī · ponsel)' },
            { id: 'zh-r-11', char: '言 / 讠', romaji: 'yán · ucapan', tip: 'Muncul di kata bicara dan bahasa (说, 请, 谢).', example: '谢谢 (xièxie · makasih)' },
            { id: 'zh-r-12', char: '食 / 饣', romaji: 'shí · makanan', tip: 'Muncul di kata makan dan kenyang (饭, 饿, 饮).', example: '吃饭 (chīfàn · makan)' },
            { id: 'zh-r-13', char: '山', romaji: 'shān · gunung', tip: 'Bentuk tiga puncak gunung.', example: '山水 (shānshuǐ · pemandangan)' },
            { id: 'zh-r-14', char: '门', romaji: 'mén · pintu', tip: 'Bentuk daun pintu ganda (问 bertanya, 间 ruang).', example: '请问 (qǐngwèn · permisi tanya)' },
            { id: 'zh-r-15', char: '目', romaji: 'mù · mata', tip: 'Berkaitan dengan melihat (看, 睡).', example: '看见 (kànjiàn · melihat)' },
            { id: 'zh-r-16', char: '车', romaji: 'chē · kendaraan', tip: 'Muncul di kata transportasi (火车 kereta, 轻 ringan).', example: '出租车 (taksi)' }
          ]
        }
      ]
    }
  };

  const LATIN_NOTES = {
    en: {
      title: 'Bahasa Inggris Memakai Alfabet Latin (A sampai Z)',
      summary: 'Anda sudah mengenal seluruh hurufnya. Fokus awal cukup pada perbedaan ejaan dengan pelafalan (seperti bunyi "th" pada "think", huruf senyap pada "know", dan vokal panjang vs pendek).',
      highlights: [
        { symbol: 'th', sound: 'Lidah di antara gigi ("think" / "this")' },
        { symbol: 'kn-', sound: 'Huruf K senyap ("know" dibaca "no")' },
        { symbol: 'ph', sound: 'Dibaca "f" ("phone" dibaca "fon")' },
        { symbol: '-tion', sound: 'Dibaca "syen" ("station")' }
      ]
    },
    de: {
      title: 'Bahasa Jerman: Alfabet Latin + 4 Huruf Khusus',
      summary: 'Sebagian besar huruf sama dengan bahasa Indonesia, ditambah 3 huruf ber-umlaut (ä, ö, ü) dan Eszett (ß).',
      highlights: [
        { symbol: 'ä', sound: 'Seperti "e" terbuka ("Mädchen")' },
        { symbol: 'ö', sound: 'Bibir bulat "o" sambil mengucap "e" ("schön")' },
        { symbol: 'ü', sound: 'Bibir bulat "u" sambil mengucap "i" ("für")' },
        { symbol: 'ß', sound: 'Dibaca "ss" tajam ("Straße" = jalan)' }
      ]
    },
    es: {
      title: 'Bahasa Spanyol: Alfabet Latin + Huruf Ñ & Aksen',
      summary: 'Ejaan Spanyol sangat konsisten seperti bahasa Indonesia. Perhatikan huruf ñ, ll, j, dan tanda aksen tekanan.',
      highlights: [
        { symbol: 'ñ', sound: 'Dibaca "ny" ("mañana" = besok)' },
        { symbol: 'll', sound: 'Dibaca "y" ("me llamo" = nama saya)' },
        { symbol: 'j', sound: 'Dibaca "h/kh" ("jalapeño", "joven")' },
        { symbol: 'h', sound: 'Selalu senyap ("hola" dibaca "ola")' }
      ]
    },
    fr: {
      title: 'Bahasa Prancis: Alfabet Latin + Aksen & Huruf Akhir Senyap',
      summary: 'Perhatikan tanda aksen (é, è, ç) dan aturan umum bahwa banyak konsonan di akhir kata tidak dilafalkan.',
      highlights: [
        { symbol: 'é', sound: 'Bunyi "e" jelas ("café")' },
        { symbol: 'ç', sound: 'Dibaca "s" lembut ("français", "ça va")' },
        { symbol: 'oi', sound: 'Dibaca "wa" ("merci beaucoup", "au revoir")' },
        { symbol: 'ou', sound: 'Dibaca "u" ("bonjour")' }
      ]
    },
    nl: {
      title: 'Bahasa Belanda: Alfabet Latin + Gabungan Vokal Khas',
      summary: 'Banyak kosakata serapan yang akrab dengan bahasa Indonesia. Pelajari gabungan vokal ganda seperti oe, ij, dan ui.',
      highlights: [
        { symbol: 'oe', sound: 'Dibaca "u" ("goed" = bagus)' },
        { symbol: 'ij / ei', sound: 'Dibaca "ei" ("trein", "blij")' },
        { symbol: 'g / ch', sound: 'Bunyi "gh/kh" dari tenggorokan ("goedemorgen")' },
        { symbol: 'aa / oo', sound: 'Vokal panjang ("straat", "groot")' }
      ]
    }
  };

  global.LingoData = global.LingoData || {};
  global.LingoData.SCRIPT_DATA = SCRIPT_DATA;
  global.LingoData.LATIN_NOTES = LATIN_NOTES;
})(window);
