/* ============================================================
   Halaman profil / CV per anggota tim (#/<slug>).
   Bagian yang kosong otomatis tampil sebagai placeholder "segera diperbarui".
   Opsional: email (ganti email global), extraServices, clients berkelompok
   ({ title, note, items }), dan proof ({ card, reviews }) untuk testimoni sendiri.
   ============================================================ */
import { FASTWORK_PROFILE } from "./config.js";

const RIZKY_FASTWORK = "https://fastwork.id/byob/eWoN90q4Y2?openExternalBrowser=1&source=byob";

export const PROFILES = {
  "fahmy-zakky": {
    title: "AI Visual Artist — AI-Generated Video & Image Production",
    location: "Bekasi, Jawa Barat, Indonesia",
    links: [],
    stats: [
      ["200+", "Project komersial selesai"],
      ["4,9/5", "Rating di Fastwork"],
      ["43%", "Klien kembali order"],
      ["2021", "Mulai sebagai video editor"],
    ],
    about:
      "AI video creator dengan 200+ project komersial di Fastwork.id — rating 4,9/5 dan 43% klien kembali order. Kliennya mulai dari instansi pemerintah, korporasi besar Indonesia, sampai brand consumer. Spesialis produksi video AI end-to-end: konsep, desain karakter, generate, color grading, hingga sound design. Latar belakang sebagai video editor tradisional (2021–2023) jadi fondasi post-production yang kuat.",
    skills: [
      { group: "Video Generation AI", items: ["Seedance 2.0 / 2.5", "Google Veo 3 / Veo 2", "Omni Flash", "Kling AI"] },
      { group: "Image Generation AI", items: ["Nano Banana Pro", "GPT Image 2", "Flux1"] },
      { group: "Audio & Music AI", items: ["Flow Music", "Suno — scoring & sound design"] },
      { group: "Post-Production", items: ["Adobe Premiere Pro", "After Effects", "CapCut Pro", "Filmora", "Python / Pillow"] },
      { group: "Proses Produksi", items: ["Prompt engineering", "Konsistensi karakter & visual", "Art direction", "Storyboard → delivery", "Manajemen revisi klien"] },
      { group: "Web", items: ["Vibe coding", "Landing page & website custom"] },
    ],
    experience: [
      {
        role: "Freelance AI Video Creator — Top-Rated Seller",
        org: "Fastwork.id",
        meta: "Remote · Indonesia · Sekarang",
        points: [
          "Top-ranked seller dengan 200+ order selesai, rating 4,9/5, dan 43% klien repeat order.",
          "Klien dari instansi pemerintah, korporasi besar, dan brand consumer — termasuk otomotif (campaign brand ambassador BYD), FMCG (Teh Botol Sosro, Skintific, Indomie), video company profile, dan video produk e-commerce.",
          "Menjalankan seluruh pipeline sendiri — script, storyboard, generate karakter & scene AI, editing, color grading, dan sound design — dengan workflow standar per jenis konten supaya kualitas dan waktu pengerjaan tetap konsisten.",
        ],
      },
      {
        role: "Content Creator",
        org: "Lensa51 — YouTube · Instagram · TikTok",
        meta: "Personal brand",
        points: [
          "Menulis, menyutradarai, dan memproduksi konten sinematik AI original — termasuk music video “Bad Habit” dan “Fresh Check” dengan kontinuitas multi-karakter dan lipsync yang akurat.",
          "Ruang kreatif untuk narrative AI filmmaking, melengkapi project klien.",
        ],
      },
      {
        role: "Video Editor",
        org: "Astro Digital",
        meta: "Indonesia · 2021–2023",
        points: [
          "Mengedit dan memproduksi konten video dengan Filmora, lalu beralih ke Adobe Premiere Pro & After Effects.",
          "Membangun fondasi cutting, pacing, warna, dan motion graphics yang kini menopang kualitas produksi AI.",
        ],
      },
    ],
    clients: ["BYD", "Teh Botol Sosro", "Skintific", "Indomie", "Instansi pemerintah", "Korporasi Indonesia"],
    works: [
      { url: "https://youtu.be/TzUFxBP254M", client: "Bad Habit", category: "AI Music Video" },
      { url: "https://youtu.be/AmxGOVHOL14", client: "Fresh Check", category: "AI Music Video" },
    ],
    worksNote: "Karya komisi lain (company profile dan project klien) tersedia atas permintaan — tidak semua deliverable klien dipublikasikan.",
    languages: ["Indonesia (native)", "Inggris (working proficiency)"],
    reviews: true,
    contact: { label: "Order via Fastwork", href: FASTWORK_PROFILE },
  },

  "rizky-taufiqurrohman": {
    title: "AI Video Director — Story-Driven AI Video & Content Production",
    location: "Jombang, Jawa Timur, Indonesia",
    email: "rizkybisnisonly@gmail.com",
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/rizky-taufiqurrohman-a060bb436" }],
    stats: [
      ["30+", "Project video selesai"],
      ["10+", "Klien korporat & institusi"],
      ["4", "Creator Partner Program"],
      ["2024", "Mulai AI video creator"],
    ],
    about:
      "30+ project video AI lintas company profile, campaign institusional, hingga music video naratif — untuk klien korporat, instansi pemerintah, dan brand consumer. Latar belakang teknik sipil dan pengalaman langsung di lapangan konstruksi membentuk cara kerja yang sistematis dan berorientasi solusi nyata; ketertarikan pada storytelling mendorong spesialisasi ke sisi AI video paling menantang — konsistensi karakter di multi-scene dan narasi yang benar-benar mengalir, bukan sekadar generate satu per satu.",
    extraServices: ["Social Media Strategy"],
    skills: [
      { group: "Video Generation AI", items: ["Seedance 2.0 / 2.5", "Omni Flash (Google Flow)", "Kling 3.0 Pro"] },
      { group: "Image Generation AI", items: ["Nano Banana Pro", "GPT Image"] },
      { group: "Audio & Music AI", items: ["ElevenLabs", "Suno — scoring & sound design"] },
      { group: "Post-Production", items: ["Adobe Premiere Pro", "After Effects", "CapCut Pro"] },
      { group: "Proses Produksi", items: ["Prompt engineering", "Konsistensi karakter & visual", "Art direction", "Storyboard → delivery", "Manajemen revisi klien"] },
      { group: "Web", items: ["Vibe coding", "Landing page & website custom"] },
    ],
    experience: [
      {
        role: "AI Video Creator — Freelance & Subcontract",
        org: "Fastwork · Upwork",
        meta: "Remote · Indonesia · Sekarang",
        points: [
          "30+ project video AI selesai — 26 project via subcontract, 4 project direct client.",
          "Klien dari instansi pemerintah, korporasi besar, dan brand consumer — termasuk company profile, campaign institusional, video produk, dan animasi 2D/3D.",
          "Menjalankan pipeline end-to-end — prompt engineering, generate karakter & scene AI, editing, color grading, hingga sound design.",
        ],
      },
      {
        role: "Co-Founder",
        org: "Lensa 51 — AI Video Agency",
        meta: "Indonesia · Sekarang",
        points: [
          "Membangun brand Lensa 51 bersama partner, spesialisasi produksi video AI end-to-end untuk kebutuhan company profile hingga music video/short movie.",
          "Memimpin sisi kreatif & strategi narasi — termasuk music video original dengan kontinuitas multi-karakter dan storytelling kompleks.",
        ],
      },
      {
        role: "Content Creator",
        org: "Personal Social Media",
        meta: "Sebelum AI video",
        points: [
          "Membangun akun AI-niche hingga 45,8K follower, dengan salah satu konten menembus 41,1 juta views secara organik.",
          "Menaikkan akun niche dari 600 ke 2.744 follower (+357%) murni lewat strategi konten AI-generated — bukti nyata kemampuan Social Media Strategy, bukan cuma klaim.",
          "Fondasi audience-first thinking yang kini diterapkan ke setiap project klien.",
        ],
      },
    ],
    clients: [
      {
        title: "Corporate & Institusi",
        note: "Project video institusional dikerjakan berkolaborasi dengan Fahmy Zakky.",
        items: ["PT Asahimas Chemical", "BULOG", "Antam", "Ditintelkam Polda Kalsel", "Dreamline", "Noktah Group", "SIMGROUP"],
      },
      {
        title: "Strategi Konten & AI Training",
        note: "Di luar produksi video — cakupan content strategy dan pelatihan corporate.",
        items: ["Content Strategy Tedy Handyman — Australia", "Pelatihan AI Konten Properti — Corporate"],
      },
      {
        title: "Creator Partner Program",
        items: ["Pippit AI", "Doratoon", "Kaze AI", "Lumeflow AI"],
      },
    ],
    works: [
      { url: "https://youtu.be/ojLaYNPbHDc", client: "Class of 2010", category: "AI Music Video", ratio: "21:9" },
      { url: "https://youtu.be/m4Trqf9Gor0", client: "Wedding Story", category: "AI Short Film", ratio: "21:9" },
    ],
    worksNote: "Karya komisi lain (company profile dan project klien) tersedia atas permintaan — tidak semua deliverable klien dipublikasikan.",
    languages: ["Indonesia (native)", "Inggris (working proficiency)"],
    proof: {
      card: {
        href: RIZKY_FASTWORK,
        top: "Lensa 51 · Co-Founder",
        badge: "30+ Project ✓",
        big: "30+",
        bigLabel: "Project video AI selesai",
        stats: [
          ["10+", "Klien korporat & institusi"],
          ["4", "Creator Partner Program"],
          ["2024", "Mulai AI video creator"],
        ],
        go: "Lihat portfolio lengkap",
      },
      reviews: [
        { name: "Nur Hidayati", role: "Klien TikTok · Konten budaya Jawa", text: "Sudah cukup hasilnya, cantik sekali kak 🙏 Sangat puas dengan hasil karya kakak" },
        { name: "Klien Anonim", role: "Video Karakter AI", text: "Tinggal benerin muka sama nambah VO doang, tapi layoutnya udah oke banget, konsisten" },
        { name: "Widya", role: "Klien", paraphrase: true, text: "Ramah, sabar, dan pengertian sepanjang proses — bahkan saat nego harga jauh di bawah standar." },
      ],
    },
    contact: { label: "Order via Fastwork", href: RIZKY_FASTWORK },
  },
};
