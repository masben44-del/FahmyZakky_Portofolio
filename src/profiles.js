/* ============================================================
   Halaman profil / CV per anggota tim (#/<slug>).
   Bagian yang kosong otomatis tampil sebagai placeholder "segera diperbarui",
   jadi profil Rizky tinggal diisi begitu CV-nya ada.
   ============================================================ */
import { FASTWORK_PROFILE } from "./config.js";

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

  "rizky-taufiqurrahman": {
    title: "Co-Founder — AI Creative & Production",
    location: "Indonesia",
    links: [],
    stats: [],
    about: "",
    skills: [],
    experience: [],
    clients: [],
    works: [],
    languages: [],
    reviews: false,
    contact: { label: "WhatsApp Admin", whatsapp: true },
  },
};
