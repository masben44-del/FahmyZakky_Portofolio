/* ============================================================
   Lensa 51 — central config. Edit here, the whole site updates.
   ============================================================ */

export const BRAND = {
  name: "Lensa 51",
  tagline: "Creative Studio",
  location: "Indonesia · Worldwide",
  year: "2026",
};

export const EMAIL = "masben44@gmail.com";
export const FASTWORK_PROFILE = "https://fastwork.id/user/fahmy22";

// WhatsApp resmi Lensa 51 (di website cukup ditulis "Admin")
export const WHATSAPP = {
  number: "081332650249",
  admin: "Admin",
  name: "Rizky Taufiqurrahman", // tampil di halaman Rincian Harga
  link: (text = "Halo Lensa 51, saya mau tanya soal project.") =>
    `https://wa.me/6281332650249?text=${encodeURIComponent(text)}`,
};

// Sosial media & kontak — tampil (logo + nama) di footer dan halaman Contact
export const SOCIALS = [
  { id: "whatsapp", name: "WhatsApp", href: WHATSAPP.link() },
  { id: "fastwork", name: "Fastwork", href: FASTWORK_PROFILE },
  { id: "email", name: "Email", href: `mailto:${EMAIL}` },
  { id: "instagram", name: "Instagram", href: "https://www.instagram.com/lensa_51" },
  { id: "tiktok", name: "TikTok", href: "https://www.tiktok.com/@lensa.51" },
  { id: "youtube", name: "YouTube", href: "https://www.youtube.com/@Lensa51" },
  { id: "linkedin", name: "LinkedIn", href: "https://www.linkedin.com/in/fahmy-zakky" },
];

// Estimasi USD untuk klien luar negeri. Ganti angka & tanggal kalau kurs di-update.
export const USD = { rate: 17807, date: "20 September 2026" };

export const idr = (n) => `Rp${n.toLocaleString("id-ID")}`;
export const usd = (n) => `≈ US$${Math.round(n / USD.rate).toLocaleString("en-US")}`;

/* ---------- Team ----------
   Keduanya memegang semua layanan; yang beda hanya jalur chat klien.
   photo: file di public/team/. Kosongkan ("") untuk placeholder inisial.
   slug : alamat halaman profil (#/slug) — isi profilnya di src/profiles.js */
const ALL_SERVICES = ["AI Cinematic & UGC", "Vibe Code Web", "Documents", "Client Handling"];

export const TEAM = [
  {
    slug: "fahmy-zakky",
    name: "Fahmy Zakky",
    initials: "FZ",
    role: "Co-Founder",
    focus: "AI Visual Artist",
    channel: "Fastwork",
    photo: "/team/fahmy.webp",
    bio: "AI visual artist dengan 200+ project komersial di Fastwork (rating 4,9/5). Memegang project dari brief sampai delivery di semua layanan Lensa 51.",
    skills: ALL_SERVICES,
  },
  {
    slug: "rizky-taufiqurrahman",
    name: "Rizky Taufiqurrahman",
    initials: "RT",
    role: "Co-Founder",
    focus: "AI Creative & Production",
    channel: "WhatsApp",
    photo: "/team/rizky.webp",
    bio: "Memegang project dari brief sampai delivery di semua layanan Lensa 51 — dengan standar kualitas yang sama di setiap video, website, dan dokumen.",
    skills: ALL_SERVICES,
  },
];

/* ---------- Bukti dari Fastwork (profil fahmy22) ---------- */
export const FASTWORK_STATS = {
  badge: "Gold Seller",
  rating: "4,9",
  orders: 174,
  customers: 104,
  repeat: 69,
  top: [
    { name: "Konten UGC AI", sold: 90, rating: "4,9" },
    { name: "Video Cinematic AI", sold: 81, rating: "4,9" },
    { name: "Dokumen Profesional AI", sold: 2, rating: "5,0" },
  ],
};

export const REVIEWS = [
  { name: "Hanif Karuna", date: "02/12/2025", rating: "5,0", text: "Kak fahmy bisa dipercaya, bisa update pekerjaan sebelum deadline yang diajukan. Saya dan tim Natal sangat puas dengan pekerjaan kak fahmi. Terima kasih banyak." },
  { name: "25szlahh", date: "29/03/2026", rating: "4,8", text: "Video bukan hanya sekedar gambar2 bergerak yang keren tapi yang terpenting bisa menghadirkan rasa di pemirsanya. Mas Fahmi bisa meningkatkan itu." },
  { name: "yiqvmxbo", date: "27/11/2025", rating: "5,0", text: "Freelancer bisa memahami apa yang ada dipikiran saya dan menuangkan dalam videonya. Fast response, bisa menerangkan proses dengan baik." },
  { name: "Akun anonim", date: "04/08/2026", rating: "5,0", text: "Terimakasih sudah membantu dengan baik dan sabar, memberikan penjelasan yang detail, recommended worker." },
  { name: "fajardwiiy", date: "02/02/2026", rating: "5,0", repeat: 3, text: "Sangat baik dan ramah dan bertanggungjawab sampai tahap akhir video, rekomended." },
  { name: "Akun anonim", date: "02/12/2025", rating: "5,0", text: "Keren, ngerti brief dengan baik, dan memberi masukan yang diperlukan. Semoga sukses terus kakak Fahmi." },
];

/* ---------- Web Design ---------- */
export const WEB = {
  orderUrl: "https://fastwork.id/user/fahmy22/web-development-85779931",
  orderLabel: "Order via Fastwork",
  // img: screenshot website di public/work/ (1440x900, .webp)
  projects: [
    { name: "Rora", tag: "Athletic Footwear", year: "2026", url: "https://rora-dj1.pages.dev/", img: "/work/rora.webp" },
    { name: "Arcova", tag: "Commercial Property", year: "2026", url: "https://arcova.pages.dev/", img: "/work/arcova.webp" },
    { name: "Veyron", tag: "Luxury Jewelry", year: "2026", url: "https://veyron-4iu.pages.dev/", img: "/work/veyron.webp" },
    { name: "Lumora", tag: "Skincare", year: "2026", url: "https://lm-6bv.pages.dev/", img: "/work/lumora.webp" },
    { name: "Nexora", tag: "Digital Agency", year: "2026", url: "https://fe-9u2.pages.dev/", img: "/work/nexora.webp" },
    { name: "Forge", tag: "Fitness Platform", year: "2026", url: "https://we-4ii.pages.dev/", img: "/work/forge.webp" },
  ],
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

/* ---------- AI Video ---------- */
export const VIDEO = {
  fastworkUrl: "https://fastwork.id/byob/v1enTMz3Hq?openExternalBrowser=1&source=byob",
  driveUrl: "https://drive.google.com/drive/folders/1iIFDAzuxnDcyrahVFNTkWw3-OS6SIJNG?usp=drive_link",
  showreel: "/videos/showreel.mp4",
  // Karya di halaman AI Cinematic (geser horizontal). File di public/videos/.
  // ratio: lebar ÷ tinggi video (21:9 ≈ 2.333, 16:9 ≈ 1.778)
  works: [
    { name: "Showreel", tag: "Brand Reel", src: "/videos/showreel.mp4", ratio: 2.333 },
    { name: "Lipstick", tag: "Beauty Commercial", src: "/videos/lipstick.mp4", ratio: 2.333 },
    { name: "Herbafit", tag: "Product Launch", src: "/videos/herbafit.mp4", ratio: 1.778 },
    { name: "Rendang", tag: "F&B Commercial", src: "/videos/rendang.mp4", ratio: 2.333 },
    { name: "Beverage", tag: "F&B Commercial", src: "/videos/clip-1.mp4", ratio: 2.333 },
    { name: "Travel", tag: "Travel & Tourism", src: "/videos/travel.mp4", ratio: 2.333 },
    { name: "Mi Goreng", tag: "F&B Commercial", src: "/videos/clip-2.mp4", ratio: 2.333 },
  ],
};

/* ---------- Documents ---------- */
export const DOCUMENTS = {
  orderUrl: "https://fastwork.id/user/fahmy22/presentation-19809039",
  orderLabel: "Order via Fastwork",
  types: [
    { name: "Presentation", desc: "Pitch deck, company profile, materi training — PPT yang clean & meyakinkan." },
    { name: "Word", desc: "Proposal, SOP, surat & CV profesional yang rapi dan siap kirim." },
    { name: "Excel", desc: "Dashboard, proyeksi keuangan & spreadsheet otomatis yang gampang dibaca." },
    { name: "PDF", desc: "Dokumen final siap cetak / kirim, layout konsisten dan profesional." },
  ],
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

export const SERVICES = [
  {
    id: "ai-cinematic", num: "01", name: "AI Cinematic & UGC",
    short: "Video iklan sinematik & konten UGC dengan AI untuk brand, company, dan UMKM.",
    tags: ["Brand & Company", "UMKM", "Omni Flash · Seedance"],
  },
  {
    id: "vibe-code", num: "02", name: "Vibe Code Web Design",
    short: "Website custom lewat vibe coding — cepat, responsive, penuh motion, bukan template.",
    tags: ["Landing Page", "Company Website", "Custom Code"],
  },
  {
    id: "documents", num: "03", name: "Documents",
    short: "PPT, Word, Excel & PDF profesional yang bikin brand kamu kredibel.",
    tags: ["Pitch Deck", "Proposal", "Dashboard"],
  },
];

// Layanan berikutnya — tampil di Home sebagai "Coming soon"
export const COMING_SOON = [
  { name: "AI Translator", desc: "Terjemahan halaman web, buku, dan dokumen dengan AI — cepat dan tetap natural.", for: "Penerbit · Bisnis · Akademik" },
  { name: "AI Voice Over", desc: "Voice over natural untuk iklan, video, dan presentasi dalam berbagai bahasa & karakter suara.", for: "Brand · Kreator · E-learning" },
  { name: "AI Image", desc: "Pembuatan gambar & photoshoot produk dengan AI — tanpa studio, tanpa sesi foto.", for: "UMKM · Brand · E-commerce" },
  { name: "AI MV", desc: "Video klip musik dengan visual AI sinematik yang mengikuti lagu dan cerita.", for: "Musisi · Label · Produser" },
  { name: "AI Movie", desc: "Film pendek dan produksi cerita sinematik berbasis AI.", for: "Filmmaker · Rumah produksi" },
  { name: "AI Wedding", desc: "Konten AI untuk kebutuhan pernikahan — video, visual, dan momen spesial klien.", for: "Pasangan · Wedding organizer" },
  { name: "AI Music", desc: "Musik & instrumen original dengan AI — untuk company, konten, atau karya pribadi.", for: "Company · Kreator · Musisi" },
];
