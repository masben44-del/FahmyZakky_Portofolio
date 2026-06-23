/* ============================================================
   Central config — edit these, the whole site updates.
   Pricing mirrors Fastwork (fahmy22). All amounts in IDR.
   ============================================================ */

export const FASTWORK_PROFILE = "https://fastwork.id/user/fahmy22";
export const EMAIL = "masben44@gmail.com";

/* ---------- Web design portfolio: the 6 live sites ---------- */
export const PROJECTS = [
  { name: "Rora", num: "01", tag: "Athletic Footwear", year: "2026", url: "https://rora-dj1.pages.dev/" },
  { name: "Arcova", num: "02", tag: "Commercial Property", year: "2026", url: "https://arcova.pages.dev/" },
  { name: "Veyron", num: "03", tag: "Luxury Jewelry", year: "2026", url: "https://veyron-4iu.pages.dev/" },
  { name: "Lumora", num: "04", tag: "Skincare", year: "2026", url: "https://lm-6bv.pages.dev/" },
  { name: "Nexora", num: "05", tag: "Digital Agency", year: "2026", url: "https://fe-9u2.pages.dev/" },
  { name: "Forge", num: "06", tag: "Fitness Platform", year: "2026", url: "https://we-4ii.pages.dev/" },
];

/* ---------- Web Design service ---------- */
export const WEB = {
  fastwork: "https://fastwork.id/user/fahmy22/web-development-85779931",
  packages: [
    {
      name: "Basic", price: "Rp1.000.000", unit: "/ project",
      meta: "2 hari · 1x revisi",
      points: ["1 halaman landing page", "Custom code (bukan template)", "Mobile responsive", "Loading cepat"],
    },
    {
      name: "Standard", price: "Rp1.500.000", unit: "/ project", featured: true,
      meta: "3 hari · 2x revisi",
      points: ["Sampai 3 halaman", "Home, About, Services", "Custom code", "Fully responsive"],
    },
    {
      name: "Premium", price: "Rp2.500.000", unit: "/ project",
      meta: "4 hari · 3x revisi",
      points: ["Sampai 5 halaman", "Animasi & interaksi", "Full source code", "Custom code"],
    },
  ],
};

/* ---------- Video AI — split into 2 sub-services ---------- */
export const VIDEO_CINEMATIC = {
  label: "Cinematic",
  fastwork: "https://fastwork.id/user/fahmy22/ai-video-42033348",
  tagline: "Company profile & storytelling berkualitas sinema — Omni Flash & Seedance 2.0, tanpa ribet shooting.",
  packages: [
    {
      name: "Omni Flash", price: "Rp350.000", unit: "/ menit",
      meta: "2–3 hari · 1x revisi",
      points: ["720p (upscale 1080p)", "Gerak dinamis", "Cocok TikTok / Reels / Shorts", "Durasi fleksibel"],
    },
    {
      name: "Seedance 2.0", price: "Rp2.400.000", unit: "/ menit", featured: true,
      meta: "2 hari · 1x revisi",
      points: ["1080p native", "Multi-cut generation", "Karakter konsisten", "Native audio sync + kontrol kamera"],
    },
  ],
};

export const VIDEO_UGC = {
  label: "UGC",
  fastwork: "https://fastwork.id/user/fahmy22/ai-video-79882198",
  tagline: "Konten UGC AI viral-ready untuk produk & e-commerce — TikTok, Shopee, affiliate. Natural & engaging.",
  packages: [
    {
      name: "Omni Flash", price: "Rp350.000", unit: "/ menit",
      meta: "2–3 hari · 1x revisi · 30 dtk = Rp175.000",
      points: ["720p UGC style", "Voice-over natural", "Hak komersial", "Siap upload"],
    },
    {
      name: "Seedance 2.0", price: "Rp2.400.000", unit: "/ menit", featured: true,
      meta: "3–5 hari · 1x revisi",
      points: ["1080p sinematik", "Multi-cut", "Karakter konsisten", "Voice-over natural + hak komersial"],
    },
  ],
};

/* ---------- Documents service ---------- */
export const DOCUMENTS = {
  fastwork: "https://fastwork.id/user/fahmy22/presentation-19809039",
  packages: [
    {
      name: "Basic", price: "Rp50.000", unit: "/ paket",
      meta: "1 hari · 3x revisi",
      points: ["1 dokumen profesional", "PPT / Word / Excel / PDF", "Diskusi unlimited", "Respon cepat"],
    },
    {
      name: "Standard", price: "Rp90.000", unit: "/ paket", featured: true,
      meta: "1 hari · 3x revisi",
      points: ["2 dokumen profesional", "Kombinasi bebas", "Diskusi unlimited", "Respon cepat"],
    },
    {
      name: "Premium", price: "Rp120.000", unit: "/ paket",
      meta: "1 hari · 3x revisi",
      points: ["3 dokumen profesional", "Kombinasi bebas", "Konsultasi gratis", "Respon cepat"],
    },
  ],
};
