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

/* ---------- Video AI — 2 sub-services, pricing mirrors Fiverr (USD) ----------
   Order buttons point to the Fiverr gigs (lieblinglieblin).                 */

// Gig 1 — AI Video Ads / Commercial
export const VIDEO_COMMERCIAL = {
  label: "Commercial",
  fiverr: "https://www.fiverr.com/lieblinglieblin/produce-stunning-ai-video-ads-commercial-for-your-brand",
  tagline: "Video ads sinematik buat brand & produk — hook kuat, siap tayang di TikTok, Reels & Shorts.",
  packages: [
    {
      name: "Basic", price: "$50", unit: "/ video",
      meta: "15 detik · 2 hari · 1x revisi",
      points: ["Video ads 15 detik", "Karakter konsisten", "10 shots", "Untuk brand / produk"],
    },
    {
      name: "Standard", price: "$100", unit: "/ video", featured: true,
      meta: "30 detik · 3 hari · 1x revisi",
      points: ["Video ads 30 detik", "Prompt / workflow delivery", "Karakter konsisten", "15 shots"],
    },
    {
      name: "Premium", price: "$150", unit: "/ video",
      meta: "60 detik · 4 hari · 1x revisi",
      points: ["Video ads 60 detik", "Video editing", "Prompt / workflow delivery", "20 shots"],
    },
  ],
};

// Gig 2 — AI Company Profile / Cinematic
export const VIDEO_PROFILE = {
  label: "Company Profile",
  fiverr: "https://www.fiverr.com/lieblinglieblin/create-ai-company-profile-video-for-your-business",
  tagline: "Company profile cinematic AI — storytelling brand kamu dalam 1–3 menit, tanpa ribet shooting.",
  packages: [
    {
      name: "Basic", price: "$150", unit: "/ video",
      meta: "1 menit · 3 hari · 1x revisi",
      points: ["Company profile 1 menit", "Cinematic AI", "15 shots", "Untuk brand kamu"],
    },
    {
      name: "Standard", price: "$250", unit: "/ video", featured: true,
      meta: "2 menit · 5 hari · 2x revisi",
      points: ["Company profile 2 menit", "Cinematic AI", "20 shots", "2x revisi"],
    },
    {
      name: "Premium", price: "$350", unit: "/ video",
      meta: "3 menit · 7 hari · 3x revisi",
      points: ["Company profile 3 menit", "Cinematic AI", "25 shots", "3x revisi"],
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

/* ---------- Video AI: showreel (file video lokal di /public/videos) ----------
   Taruh file video di folder:  public/videos/
   Kasih nama PERSIS seperti di "src" bawah ini (atau ganti nama di sini).
   Tips: tiap file usahakan < 25 MB (compress dulu kalau besar).            */
export const VIDEO_REEL = [
  { src: "/videos/showreel.mp4", label: "Showreel", big: true },
  { src: "/videos/clip-1.mp4", label: "Clip 01" },
  { src: "/videos/clip-2.mp4", label: "Clip 02" },
];

// 👇 GANTI dengan link folder Google Drive project video kamu
//    (set sharing: "Anyone with the link" biar klien bisa buka)
export const VIDEO_PROJECTS_URL = "https://drive.google.com/drive/folders/1iIFDAzuxnDcyrahVFNTkWw3-OS6SIJNG?usp=drive_link";
