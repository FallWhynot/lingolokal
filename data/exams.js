/* LingoLokal: Official Exam Strategy Guides & Mini Try-Out Metadata (All 11 Languages) */
(function (global) {
  'use strict';

  const EXAM_DATA = {
    ja: {
      examName: 'JLPT (Japanese-Language Proficiency Test)',
      targetLevels: 'N5 -> N4 -> N3 -> N2 -> N1',
      passingNote: 'Skor lulus N5: minimal 80/180 dengan batas lulus per sesi (tidak boleh ada sesi di bawah ambang minimal).',
      sections: [
        { name: 'Kosakata & Kanji (Moji-Goi)', minutes: 20, weightPct: 30, tip: 'Jangan berhenti terlalu lama di satu Kanji yang asing; tandai lalu lanjut agar waktu cukup.' },
        { name: 'Tata Bahasa & Bacaan (Bunpou-Dokkai)', minutes: 40, weightPct: 40, tip: 'Baca pertanyaan dulu sebelum membaca paragraf bacaan agar langsung mencari kata kunci.' },
        { name: 'Menyimak (Choukai)', minutes: 30, weightPct: 30, tip: 'Catat angka, waktu, dan perubahan rencana di akhir dialog karena jawaban sering berbalik di kalimat terakhir.' }
      ],
      traps: [
        { title: 'Partikel は (wa) vs が (ga)', detail: 'は menandai topik umum, sedangkan が menyorot subjek baru atau jawaban spesifik atas pertanyaan.' },
        { title: 'Kalimat Negatif di Akhir Audio', detail: 'Pada sesi Choukai, pembicara sering menyetujui opsi A lalu berkata ちょっと... (chotto...) yang artinya menolak secara halus.' },
        { title: 'Kanji Berbentuk Mirip', detail: 'Perhatikan pasangan seperti 待 (tunggu) vs 持 (pegang) dan 休 (istirahat) vs 体 (tubuh).' },
        { title: 'Bentuk Sopan vs Bentuk Kamus di Tata Bahasa', detail: 'Beberapa pola seperti まえに memakai bentuk kamus, sedangkan あとで memakai bentuk -ta.' }
      ]
    },
    ko: {
      examName: 'TOPIK (Test of Proficiency in Korean)',
      targetLevels: 'TOPIK I (Level 1-2) & TOPIK II (Level 3-6)',
      passingNote: 'TOPIK I memiliki total 200 poin (Level 1 >= 80, Level 2 >= 140) tanpa tes menulis.',
      sections: [
        { name: 'Menyimak (듣기)', minutes: 40, weightPct: 50, tip: 'Manfaatkan jeda antar soal untuk membaca 4 opsi jawaban sebelum audio mulai diputar.' },
        { name: 'Membaca (읽기)', minutes: 60, weightPct: 50, tip: 'Kerjakan soal rambu, iklan, dan grafik cepat (maksimal 45 detik/soal) agar punya sisa waktu untuk teks panjang.' }
      ],
      traps: [
        { title: 'Akhiran Penghubung Mirip (-지만 vs -는데)', detail: '-지만 tegas menyatakan pertentangan, sedangkan -는데 bisa sekadar memberi latar belakang kalimat.' },
        { title: 'Perbedaan Bunyi Batchim (Konsonan Akhir)', detail: 'Saat menyimak, perhatikan hukum asimilasi bunyi seperti 합니다 dibaca hamnida.' },
        { title: 'Kalimat "Pilih yang TIDAK sesuai"', detail: 'Soal TOPIK sering menyelipkan kata 다른 것 (yang berbeda) atau 맞지 않는 것 (yang tidak tepat).' },
        { title: 'Partikel Lokasi 에 vs 에서', detail: '에 untuk keberadaan/tujuan (집에 가요), sedangkan 에서 untuk tempat aksi berlangsung (집에서 공부해요).' }
      ]
    },
    en: {
      examName: 'IELTS / TOEFL iBT',
      targetLevels: 'CEFR A2 -> B1 -> B2 -> C1',
      passingNote: 'Target umum studi/kerja: IELTS Band 6.5 atau TOEFL iBT 80+.',
      sections: [
        { name: 'Listening', minutes: 30, weightPct: 25, tip: 'Perhatikan kata penanda koreksi seperti "actually", "sorry, I meant", dan ejaan huruf/angka.' },
        { name: 'Reading', minutes: 60, weightPct: 25, tip: 'Gunakan skimming untuk ide utama dan scanning untuk nama/tahun; hindari membaca kata per kata.' },
        { name: 'Writing', minutes: 60, weightPct: 25, tip: 'Sisihkan 5 menit awal untuk kerangka paragraf dan 5 menit akhir untuk cek grammar & tenses.' },
        { name: 'Speaking', minutes: 14, weightPct: 25, tip: 'Jawab dengan pola Poin -> Alasan -> Contoh singkat agar alur bicara tidak terputus.' }
      ],
      traps: [
        { title: 'False vs Not Given (IELTS Reading)', detail: 'False berarti teks menyatakan sebaliknya; Not Given berarti informasinya memang tidak dibahas sama sekali.' },
        { title: 'Subject-Verb Agreement di Kalimat Panjang', detail: 'Pastikan verba mengikuti subjek utama, bukan kata benda yang menempel di frasa preposisi.' },
        { title: 'Sinonim & Parafrasa', detail: 'Kata di soal jarang sama persis dengan kata di teks; cari padanan maknanya.' },
        { title: 'Batas Jumlah Kata', detail: 'Perhatikan instruksi "NO MORE THAN TWO WORDS" agar jawaban benar tidak hangus karena kelebihan kata.' }
      ]
    },
    zh: {
      examName: 'HSK (Hanyu Shuiping Kaoshi)',
      targetLevels: 'HSK 1 -> HSK 2 -> HSK 3 -> HSK 4',
      passingNote: 'HSK 1-2 membutuhkan skor 120/200; HSK 3 membutuhkan 180/300.',
      sections: [
        { name: 'Menyimak (听力)', minutes: 25, weightPct: 40, tip: 'Fokus pada kata tanya di akhir audio (谁 siapa, 哪儿 di mana, 什么时候 kapan).' },
        { name: 'Membaca (阅读)', minutes: 30, weightPct: 40, tip: 'Cocokkan kata benda kunci dan kata penggolong (个, 本, 杯) saat menjodohkan kalimat.' },
        { name: 'Menulis (书写 - mulai HSK 3)', minutes: 15, weightPct: 20, tip: 'Pahami urutan struktur dasar Mandarin: Subjek + Waktu + Tempat + Verba + Objek.' }
      ],
      traps: [
        { title: 'Nada Berbeda, Arti Berubah Total', detail: 'Latih pembedaan pasangan nada seperti mǎi (买 beli) vs mài (卖 jual).' },
        { title: 'Urutan Kata Tempat Sebelum Verba', detail: 'Dalam Mandarin, "di rumah makan" (在家吃饭), bukan "makan di rumah".' },
        { title: 'Negasi 不 (bù) vs 没 (méi)', detail: '不 untuk kebiasaan/masa depan dan adjektiva; 没 untuk kejadian yang belum terjadi di masa lalu.' },
        { title: 'Karakter Mirip Radikal', detail: 'Bedakan 请 (tolong), 清 (jernih), dan 晴 (cerah) dari radikal sisi kirinya.' }
      ]
    },
    de: {
      examName: 'Goethe-Zertifikat',
      targetLevels: 'A1 -> A2 -> B1 -> B2',
      passingNote: 'Skor minimal lulus 60% dari total nilai di empat keterampilan utama.',
      sections: [
        { name: 'Lesen (Membaca)', minutes: 25, weightPct: 25, tip: 'Cari jadwal, alamat, dan jam buka terlebih dahulu pada soal pengumuman singkat.' },
        { name: 'Hören (Menyimak)', minutes: 20, weightPct: 25, tip: 'Perhatikan angka jam dan peron kereta yang sering disebut dua kali dengan revisi.' },
        { name: 'Schreiben (Menulis)', minutes: 20, weightPct: 25, tip: 'Pastikan seluruh 3 poin instruksi surat/email terjawab dan gunakan salam pembuka-penutup yang sesuai.' },
        { name: 'Sprechen (Berbicara)', minutes: 15, weightPct: 25, tip: 'Hafalkan frasa pembuka sopan: "Könnten Sie das bitte wiederholen?" jika kurang jelas.' }
      ],
      traps: [
        { title: 'Posisi Verba Kedua (V2 Rule)', detail: 'Jika kalimat diawali keterangan waktu (Heute...), verba tetap berada di posisi kedua sebelum subjek.' },
        { title: 'Gender Artikel (der / die / das)', detail: 'Selalu hafalkan kata benda bersama artikelnya agar tidak salah saat berubah ke Akkusativ (den).' },
        { title: 'Verba Terpisah (Trennbare Verben)', detail: 'Awalan seperti auf-, an-, mit- berpindah ke ujung paling belakang kalimat (Ich stehe um 7 Uhr auf).' },
        { title: 'Sie Formal vs sie Jamak', detail: 'Perhatikan konteks huruf kapital dan alur percakapan untuk membedakan Anda formal dengan mereka.' }
      ]
    },
    ar: {
      examName: 'TOAFL / ALPT (Arabic Proficiency)',
      targetLevels: 'Mubtadi (A1) -> Mutawassith (B1) -> Mutaqaddim (C1)',
      passingNote: 'Menilai pemahaman teks gundul/berharakat, struktur nahwu-sharaf, dan istima (menyimak).',
      sections: [
        { name: 'Istima (Menyimak)', minutes: 30, weightPct: 33, tip: 'Kenali dhamir (kata ganti) dan kata tanya pembuka (أين di mana, متى kapan, كم berapa).' },
        { name: 'Tarakib & Nahwu (Tata Bahasa)', minutes: 35, weightPct: 33, tip: 'Identifikasi jenis kalimat terlebih dulu: Jumlah Ismiyah (diawali isim) atau Fiiliyah (diawali fiil).' },
        { name: 'Qiraah (Membaca)', minutes: 45, weightPct: 34, tip: 'Gunakan pola akar 3 huruf (tsulatsi) untuk menebak makna kata turunan yang belum pernah dihafal.' }
      ],
      traps: [
        { title: 'Kesesuaian Mudzakkar & Muannats', detail: 'Kata sifat dan fiil harus selaras gender dengan subjeknya (perhatikan akhiran Ta Marbutah ة).' },
        { title: 'Urutan Kata Kanan ke Kiri', detail: 'Biasakan memindai struktur frasa Idhafah (kepemilikan) tanpa tertukar urutan diterangkan-menerangkan.' },
        { title: 'Perbedaan Madhi & Mudhari', detail: 'Cek awalan أ/ن/ي/ت untuk mengenali kata kerja kini/masa depan.' },
        { title: 'Huruf yang Mirip Bentuk Titiknya', detail: 'Hati-hati pada kelompok ب ت ث dan ج ح خ saat membaca cepat.' }
      ]
    },
    es: {
      examName: 'DELE (Diplomas de Español)',
      targetLevels: 'A1 -> A2 -> B1 -> B2',
      passingNote: 'Terbagi menjadi 2 blok nilai (Membaca+Menulis dan Menyimak+Berbicara); keduanya harus mencapai >= 30/50.',
      sections: [
        { name: 'Comprensión de lectura', minutes: 45, weightPct: 25, tip: 'Perhatikan catatan kaki, jadwal acara, dan iklan pendek dengan detail jam/harga.' },
        { name: 'Comprensión auditiva', minutes: 25, weightPct: 25, tip: 'Audio diputar 2 kali; putaran pertama untuk ide utama, putaran kedua untuk mengunci detail.' },
        { name: 'Expresión escrita', minutes: 25, weightPct: 25, tip: 'Jaga konsistensi gaya formal (usted) vs santai (tú) dalam satu surat.' },
        { name: 'Expresión oral', minutes: 15, weightPct: 25, tip: 'Gunakan kata penghubung sederhana seperti pero, porque, además, y también.' }
      ],
      traps: [
        { title: 'Ser vs Estar', detail: 'Ser untuk identitas, profesi, dan ciri permanen; Estar untuk lokasi dan kondisi sementara.' },
        { title: 'Por vs Para', detail: 'Para untuk tujuan dan tenggat waktu; Por untuk sebab, durasi, dan pertukaran.' },
        { title: 'Gender Kata Benda Pengecualian', detail: 'Kata seperti el problema dan el mapa maskulin meski berakhiran -a.' },
        { title: 'False Friends dengan Bahasa Inggris', detail: 'Embarazada berarti hamil (bukan malu); asistir berarti menghadiri (bukan membantu).' }
      ]
    },
    fr: {
      examName: 'DELF / DALF',
      targetLevels: 'A1 -> A2 -> B1 -> B2',
      passingNote: 'Minimal 50/100 total dengan nilai minimal 5/25 di setiap keterampilan.',
      sections: [
        { name: 'Compréhension orale', minutes: 20, weightPct: 25, tip: 'Biasakan telinga dengan liaison (penyambungan bunyi akhir) dan angka Prancis (70-99).' },
        { name: 'Compréhension écrite', minutes: 30, weightPct: 25, tip: 'Selalu kutip bukti singkat dari teks saat menjawab soal Benar/Salah (Vrai/Faux).' },
        { name: 'Production écrite', minutes: 30, weightPct: 25, tip: 'Hitung jumlah kata agar memenuhi batas minimal yang diminta soal.' },
        { name: 'Production orale', minutes: 15, weightPct: 25, tip: 'Pada role-play transaksi, siapkan sapaan Bonjour, Je voudrais..., dan Merci beaucoup.' }
      ],
      traps: [
        { title: 'Huruf Akhir Tidak Dibaca', detail: 'Dalam bentuk lisan, parle, parles, dan parlent berbunyi sama; perhatikan kata ganti subjeknya.' },
        { title: 'Angka 70, 80, 90', detail: 'Soixante-dix (70), quatre-vingts (80), dan quatre-vingt-dix (90) sering muncul di soal harga dan jam.' },
        { title: 'Tu vs Vous', detail: 'Gunakan vous saat berbicara dengan petugas, kasir, atau orang yang baru dikenal.' },
        { title: 'Negasi ne...pas', detail: 'Dalam percakapan cepat, kata "ne" sering menghilang; dengar kata "pas" untuk menangkap kalimat negatif.' }
      ]
    },
    nl: {
      examName: 'Inburgering / Staatsexamen NT2',
      targetLevels: 'A2 (Inburgering) -> B1 (NT2 I) -> B2 (NT2 II)',
      passingNote: 'Mencakup Lezen, Luisteren, Schrijven, dan Spreken dengan fokus situasi harian & kerja di Belanda.',
      sections: [
        { name: 'Lezen (Membaca)', minutes: 65, weightPct: 25, tip: 'Fokus pada surat resmi, formulir gemeente, dan pengumuman kerja.' },
        { name: 'Luisteren (Menyimak)', minutes: 45, weightPct: 25, tip: 'Dengarkan intonasi penekanan kata untuk menangkap informasi penting di percakapan cepat.' },
        { name: 'Schrijven (Menulis)', minutes: 40, weightPct: 25, tip: 'Tulis kalimat pendek yang jelas dan benar urutannya daripada kalimat panjang berisiko salah.' },
        { name: 'Spreken (Berbicara)', minutes: 30, weightPct: 25, tip: 'Latih menjawab pertanyaan langsung dalam 15 sampai 25 detik tanpa jeda panjang.' }
      ],
      traps: [
        { title: 'Artikel de vs het', detail: 'Semua kata benda jamak selalu memakai "de", sedangkan kata pengecil (-je) selalu "het".' },
        { title: 'Inversi Kata Kerja', detail: 'Sama seperti Jerman, setelah keterangan waktu/tempat di awal kalimat, verba mendahului subjek (Morgen ga ik...).' },
        { title: 'Aturan Stam+t pada Jij', detail: 'Jika "jij" berada di belakang kata kerja (Werk jij?), akhiran -t dihilangkan.' },
        { title: 'Kata Serapan Mirip Indonesia', detail: 'Banyak kata mirip (kantor/kantoor, gratis/gratis), namun hati-hati pada arti yang bergeser seperti "winkel" (toko).' }
      ]
    },
    ru: {
      examName: 'TORFL / TRKI (Test of Russian as a Foreign Language)',
      targetLevels: 'TEU (A1) -> TBU (A2) -> TRKI-1 (B1)',
      passingNote: 'Kelulusan membutuhkan minimal 66% di setiap subtes.',
      sections: [
        { name: 'Kosakata & Tata Bahasa', minutes: 45, weightPct: 30, tip: 'Cek akhiran kasus (Prepositional untuk lokasi, Accusative untuk objek langsung) sebelum memilih opsi.' },
        { name: 'Membaca (Чтение)', minutes: 45, weightPct: 25, tip: 'Kenali kata serapan internasional beraksara Sirilik untuk mempercepat pemahaman konteks.' },
        { name: 'Menyimak (Аудирование)', minutes: 30, weightPct: 25, tip: 'Perhatikan intonasi naik pada kalimat tanya Rusia karena susunan katanya sama dengan kalimat berita.' },
        { name: 'Menulis & Berbicara', minutes: 45, weightPct: 20, tip: 'Siapkan pola perkenalan diri, rutinitas harian, dan arah jalan.' }
      ],
      traps: [
        { title: 'Huruf Sirilik Jebakan (False Friends)', detail: 'В dibaca V, Н dibaca N, Р dibaca R, С dibaca S, dan Х dibaca Kh.' },
        { title: 'Reduksi Vokal O Tanpa Tekanan', detail: 'Huruf O yang tidak mendapat tekanan suku kata dibaca seperti A (молоко -> malako).' },
        { title: 'Perubahan Akhiran Kasus', detail: 'Kata benda berubah akhiran setelah preposisi в/на (в Москве, на работе).' },
        { title: 'Tidak Ada Kata Kerja "Adalah" di Masa Kini', detail: 'Kalimat "Saya mahasiswa" cukup ditulis Я студент (tanpa "am/is/are").' }
      ]
    },
    th: {
      examName: 'CU-TFL (Chulalongkorn University Proficiency Test of Thai)',
      targetLevels: 'Novice -> Intermediate -> Advanced',
      passingNote: 'Menguji Listening, Reading, Writing, dan Speaking dengan penekanan ketepatan nada dan register sopan.',
      sections: [
        { name: 'Menyimak (การฟัง)', minutes: 45, weightPct: 30, tip: 'Fokus pada konteks situasi dan partikel akhir (ไหม tanya, แล้ว selesai, นะ penekanan halus).' },
        { name: 'Membaca (การอ่าน)', minutes: 60, weightPct: 35, tip: 'Karena tulisan Thailand tidak memakai spasi antar kata, latih pemenggalan frasa lewat pola vokal depan (เ แ โ ไ ใ).' },
        { name: 'Menulis & Berbicara', minutes: 45, weightPct: 35, tip: 'Sesuaikan kata ganti dan partikel akhir ครับ/ค่ะ dengan lawan bicara.' }
      ],
      traps: [
        { title: 'Tanpa Spasi Antar Kata', detail: 'Spasi dalam bahasa Thailand menandai jeda antar klausa/kalimat, bukan pemisah tiap kata.' },
        { title: '5 Nada Mengubah Makna', detail: 'Suku kata yang sama (misal mai) bisa berarti baru, kayu, bakar, sutra, atau tidak.' },
        { title: 'Vokal Ditulis Sebelum Konsonan', detail: 'Vokal seperti เ (e) dan ไ (ai) ditulis di sebelah kiri konsonan, tetapi tetap dibaca setelah konsonan.' },
        { title: 'Konsonan Akhir Tidak Meledak', detail: 'Huruf ด/ต/จ/ส di akhir suku kata semuanya berbunyi hentian -t lembut.' }
      ]
    }
  };

  global.LingoData = global.LingoData || {};
  global.LingoData.EXAM_DATA = EXAM_DATA;
})(window);
