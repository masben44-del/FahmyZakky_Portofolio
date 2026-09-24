/* Rincian harga Video AI — sumber: kalkulator biaya Rizky.
   Harga dalam Rupiah. Nilai rincian disimpan sebagai teks persis seperti hitungan aslinya. */

const NOTE_USD =
  "Acuan USD. Credit generate dan tools pendukung dibayar dalam USD, jadi hitungan memakai kurs acuan. Tools editing yang kami pakai juga langganan bulanan berbayar.";
const NOTE_CHANGE =
  "Harga dan biaya per credit dapat berubah sewaktu-waktu, mengikuti kebijakan harga platform/tools AI.";

export const OMNI = {
  id: "omni",
  name: "Omni Flash",
  range: "Rp225rb – Rp475rb",
  summary: "Cepat & hemat — video AI 30–60 detik untuk iklan produk, konten sosmed, dan company profile. Jadi dalam 1–3 hari kerja.",
  intro:
    "Setiap rupiah di paket Omni Flash dihitung dari biaya nyata: credit generate AI, tools pendukung, serta tenaga kerja & operasional. Berikut rinciannya per paket.",
  sameFastwork: true,
  packages: [
    {
      name: "30 detik", tier: "Ringkas", price: 225000,
      points: ["3 footage × 10 detik", "4 variasi + 1x revisi per footage", "Editing standar", "VO & musik dari jatah platform", "Estimasi 1–2 hari kerja"],
    },
    {
      name: "60 detik", tier: "Standar", price: 350000, featured: true,
      points: ["6 footage × 10 detik", "4 variasi + 1x revisi per footage", "Editing standar", "VO & musik dari jatah platform", "Estimasi 1–2 hari kerja"],
    },
    {
      name: "60 detik", tier: "Premium", price: 475000,
      points: ["6 footage × 10 detik", "4 variasi + 3x revisi per footage", "Karakter, environment & prop custom", "Motion graphic, multi-cut angle, transisi kompleks", "VO & musik custom", "Estimasi 2–3 hari kerja"],
    },
  ],
  columns: ["30 detik", "60 detik standar", "60 detik premium"],
  components: [
    {
      name: "Credit Generate AI",
      desc: "Tiap footage 10 detik, 15 credit per generate, @ ±Rp314/credit",
      cells: [["Rp70.763", "3 footage × 5x = 225 credit"], ["Rp141.525", "6 footage × 5x = 450 credit"], ["Rp198.135", "6 footage × 7x = 630 credit"]],
    },
    {
      name: "Konsep & Storyboard",
      desc: "Perencanaan alur cerita dan visual sebelum produksi",
      cells: [["Rp43.993", "tools Rp887 · TK Rp43.106"], ["Rp54.652", "tools Rp1.102 · TK Rp53.550"], ["Rp54.652", "tools Rp1.102 · TK Rp53.550"]],
    },
    {
      name: "Prompting Gambar & Video",
      desc: "Menyusun instruksi teknis ke AI untuk tiap footage. Paket Premium termasuk karakter, environment & prop custom.",
      cells: [["Rp43.993", "tools Rp887 · TK Rp43.106"], ["Rp76.911", "tools Rp1.551 · TK Rp75.360"], ["Rp76.911", "tools Rp1.551 · TK Rp75.360"]],
    },
    {
      name: "Editing",
      desc: "Standar: potong, susun, rapikan jadi video utuh. Premium: motion graphic, multi-cut angle, transisi kompleks.",
      cells: [["Rp66.251", "tools Rp1.861 · TK Rp64.390"], ["Rp76.912", "tools Rp2.161 · TK Rp74.751"], ["Rp125.591", "tools Rp3.529 · TK Rp122.062"]],
    },
    {
      name: "VO & Musik",
      desc: "Standar: jatah gratis platform. Premium: voice over & scoring musik custom.",
      cells: [["Gratis"], ["Gratis"], ["Rp19.711", "tools"]],
    },
  ],
  subtotals: [
    ["Credit & Tools Pendukung", ["Rp74.398", "Rp146.339", "Rp224.028"]],
    ["Tenaga Kerja & Operasional", ["Rp150.602", "Rp203.661", "Rp250.972"]],
  ],
  totals: ["Rp225.000", "Rp350.000", "Rp475.000"],
  notes: [
    "Kenapa 4x generate per footage? Sekali generate, AI belum tentu langsung menghasilkan footage yang sesuai brief. 4x adalah batas maksimal pengulangan untuk mendapatkan gerakan, komposisi, dan detail yang pas sebelum masuk tahap revisi.",
    "Revisi yang termasuk paket hanya revisi minor yang tidak mengubah konsep dari brief dan storyboard yang sudah disepakati (misalnya warna, timing, detail kecil). Perubahan di luar brief dan storyboard dihitung sebagai project baru.",
    NOTE_USD,
    NOTE_CHANGE,
  ],
  faq: [
    ["Berapa lama proses pengerjaan?", "Paket 30 detik dan 60 detik standar sekitar 1–2 hari kerja. Paket 60 detik premium sekitar 2–3 hari kerja, tergantung kecepatan review dari klien."],
    ["Berapa kali jatah revisi?", "Paket 30 detik dan 60 detik standar: 1x revisi per footage. Paket premium: 3x revisi per footage. Tidak ada biaya tambahan selama masih dalam jatah."],
    ["Apakah harga lewat Fastwork berbeda?", "Tidak. Harga paket Omni Flash sama, baik order langsung maupun lewat Fastwork."],
    ["Bisa request gaya visual tertentu?", "Bisa. Kirimkan referensi visual saat brief awal supaya storyboard dan prompt disesuaikan sejak tahap konsep."],
    ["Butuh karakter custom tapi di luar paket premium?", "Karakter, environment, dan prop custom termasuk di paket 60 detik premium. Untuk kebutuhan aset yang lebih kompleks, lihat paket Seedance 2.5."],
  ],
};

export const SEEDANCE = {
  id: "seedance",
  name: "Seedance 2.5",
  range: "Rp2,9 – Rp5,3 juta",
  summary: "Kualitas sekelas film Hollywood — karakter, environment & prop custom, voice over dengan lipsync, dan editing lengkap untuk campaign besar & music video.",
  intro:
    "Video Seedance 2.5 dibuat dengan karakter, environment, dan prop custom, voice over dengan lipsync, dan editing lengkap. Berikut rincian biayanya per komponen untuk paket 30 detik dan 60 detik.",
  sameFastwork: false,
  packages: [
    {
      name: "30 detik", tier: "Sinematik", price: 2874526, fastwork: 3229804,
      points: ["Karakter, environment & prop custom", "8x generate per footage (5 iterasi + 3 revisi)", "Voice over custom dengan lipsync", "Motion graphic, masking & compositing", "Musik scoring custom"],
    },
    {
      name: "60 detik", tier: "Sinematik", price: 5329001, fastwork: 5987642, featured: true,
      points: ["Karakter, environment & prop custom", "8x generate per footage (5 iterasi + 3 revisi)", "Voice over custom dengan lipsync", "Motion graphic, masking & compositing", "Musik scoring custom", "Estimasi 4–5 hari kerja"],
    },
  ],
  durations: [
    { name: "30 detik", price: 2874526, fastwork: 3229804 },
    { name: "60 detik", price: 5329001, fastwork: 5987642 },
    { name: "90 detik", note: "Paket 60 + 30 detik", price: 8203527, fastwork: 9217446 },
    { name: "120 detik", note: "2 × paket 60 detik", price: 10658002, fastwork: 11975283 },
  ],
  columns: ["30 detik", "60 detik"],
  components: [
    {
      name: "Brief & Storyboard",
      desc: "Brainstorm konsep, shot list per footage, naskah dialog untuk lipsync",
      cells: [["Rp162.352", "tools Rp12.352 · TK Rp150.000"], ["Rp162.352", "tools Rp12.352 · TK Rp150.000"]],
    },
    {
      name: "Generate Gambar",
      desc: "Karakter, environment, dan prop custom: prompting, 8x generate per aset, sortir & QC gambar",
      cells: [["Rp398.246", "credit & tools Rp180.588 · TK Rp217.658"], ["Rp811.490", "credit & tools Rp376.175 · TK Rp435.315"]],
    },
    {
      name: "Generate & Review Video",
      desc: "Prompting, 8x generate per footage (5 iterasi + 3 revisi), review hasil terhadap brief",
      cells: [["Rp1.668.016", "credit & tools Rp1.329.438 · TK Rp338.578"], ["Rp3.436.347", "credit & tools Rp2.759.190 · TK Rp677.157"]],
    },
    {
      name: "Editing",
      desc: "Motion text, motion graphic, masking, compositing, finishing",
      cells: [["Rp373.010", "tools Rp23.851 · TK Rp349.159"], ["Rp497.346", "tools Rp31.801 · TK Rp465.545"]],
    },
    {
      name: "VO & Musik Custom",
      desc: "Suara custom sesuai karakter termasuk lipsync, plus scoring musik custom",
      cells: [["Rp86.398", "tools Rp22.914 · TK Rp63.484"], ["Rp172.794", "tools Rp45.827 · TK Rp126.967"]],
    },
    {
      name: "Revisi & Finalisasi",
      desc: "Revisi sesuai jatah, render final, export multi-format",
      cells: [["Rp186.504", "tools Rp11.925 · TK Rp174.579"], ["Rp248.672", "tools Rp15.900 · TK Rp232.772"]],
    },
  ],
  subtotals: [
    ["Credit & Tools Pendukung", ["Rp1.581.068", "Rp3.241.245"]],
    ["Tenaga Kerja & Operasional", ["Rp1.293.458", "Rp2.087.756"]],
  ],
  totals: ["Rp2.874.526", "Rp5.329.001"],
  credits: {
    rows: [
      {
        name: "Kebutuhan credit video",
        cells: [["30 detik × 7 credit/detik = 210 credit per generate × 8x = 1.680 credit"], ["60 detik × 7 credit/detik = 420 credit per generate × 8x = 3.360 credit"]],
      },
      { name: "Credit video, kuota langganan", cells: [["Rp1.312.969", "1.680 credit @ ±Rp781"], ["Rp1.406.753", "1.800 credit @ ±Rp781"]] },
      { name: "Credit video, top-up", cells: [["—"], ["Rp1.319.499", "1.560 credit @ ±Rp846"]] },
      {
        name: "Credit gambar (lumpsum)",
        cells: [["Rp170.000", "±208 credit (rata-rata ±4 aset × 8x × 6,5 credit)"], ["Rp355.000", "416 credit (rata-rata 8 aset: 2 karakter, 3 environment, 3 prop × 8x × 6,5 credit)"]],
      },
    ],
    total: ["Rp1.482.969", "Rp3.081.252"],
    note: "Kuota langganan (±Rp781/credit) dipakai lebih dulu. Kalau tidak cukup, sisanya dibeli lewat top-up (±Rp846/credit) dan dihitung sesuai credit yang terpakai, bukan harga paket top-up penuh.",
  },
  notes: [
    "Durasi kurang dari 60 detik memakai paket 30 detik. Lebih dari 60 detik dihitung kelipatan paket, misalnya 90 detik = 60 + 30 detik.",
    "Kenapa 8x generate per footage? Sekali generate, AI belum tentu langsung menghasilkan footage yang sesuai brief. Jatahnya 5 iterasi untuk mendapatkan hasil yang pas, ditambah 3 revisi.",
    "Jumlah aset custom berbeda tiap project. Credit gambar dihitung lumpsum berdasarkan rata-rata. Project dengan banyak karakter, environment, atau prop dikonsultasikan dulu.",
    "Revisi yang termasuk paket hanya revisi minor yang tidak mengubah konsep dari brief dan storyboard yang sudah disepakati. Perubahan di luar brief dan storyboard, misalnya ganti karakter, environment, atau alur cerita, dihitung sebagai project baru.",
    NOTE_USD,
    NOTE_CHANGE,
  ],
  faq: [
    ["Kenapa jauh lebih mahal dari Omni Flash?", "Seedance mencakup pembuatan karakter, environment, dan prop custom, 8x generate per footage, voice over dengan lipsync, dan editing lengkap (motion graphic, masking, compositing). Credit generate-nya saja sudah sekitar Rp3 juta untuk video 60 detik."],
    ["Berapa lama proses pengerjaan?", "Sekitar 4–5 hari kerja untuk video 60 detik, tergantung kecepatan respon dan review klien di tiap tahap."],
    ["Berapa kali jatah revisi?", "Setiap footage mendapat 5 iterasi + 3 revisi generate, plus revisi minor di tahap finalisasi. Tidak ada biaya tambahan selama masih dalam jatah."],
    ["Kenapa paket 30 detik bukan setengah harga 60 detik?", "Credit generate memang turun setengah, tapi storyboard tetap butuh usaha yang sama, dan editing tetap butuh persiapan (template motion, style, file project) berapa pun durasinya."],
    ["Kenapa harga via Fastwork lebih tinggi?", "Fastwork mengenakan potongan 11% ke penyedia jasa, bukan ke pembeli. Selisih ini kami masukkan ke harga listing supaya nilai yang kami terima sama dengan order langsung. Kualitas dan layanannya tidak berbeda."],
  ],
};
