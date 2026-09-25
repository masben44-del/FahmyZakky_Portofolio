/* ============================================================
   Galeri contoh per model & style (halaman AI Cinematic & UGC).
   Style yang masih kosong tampil sebagai placeholder "segera" —
   tinggal tempel link YouTube-nya kalau videonya sudah di-upload.

   Item YouTube : { url, client, category, ratio? }
   Item lokal   : dari VIDEO.works (diputar langsung di website)
   ratio        : opsional. Default Shorts "9:16", video biasa "16:9".
                  Isi "21:9" untuk video ultra-wide (yang ada bar hitam atas-bawah).
   ============================================================ */
import { VIDEO } from "./config.js";

const brand = (name) => {
  const w = VIDEO.works.find((x) => x.name === name);
  return {
    src: w.src,
    poster: w.src.replace("/videos/", "/videos/posters/").replace(".mp4", ".jpg"),
    client: w.name,
    category: w.tag,
    ratio: w.ratio < 2 ? "16:9" : "21:9",
  };
};

export const EXPLORE = {
  omni: [
    {
      name: "Realistic",
      videos: [
        { url: "https://youtube.com/shorts/EPG7TKJFfX4", client: "BULOG", category: "Campaign" },
        { url: "https://youtu.be/jjdyTTUgeJ8", client: "Antam", category: "Company Profile" },
        { url: "https://youtube.com/shorts/a_CeUpqi2II", client: "Dreamline Dr. Spine", category: "Video Produk" },
        { url: "https://youtu.be/ihe-erBtHUg", client: "Kemenko", category: "Company Profile" },
        { url: "https://youtu.be/bDDz8HPdDnw", client: "Triage di Tempat Kerja", category: "Presentasi" },
      ],
    },
    {
      name: "Clay",
      videos: [
        { url: "https://youtu.be/X8fVD3SgyUQ", client: "Partai Demokrat", category: "Seminar Kebangsaan" },
      ],
    },
    {
      name: "Pixar",
      videos: [
        { url: "https://youtube.com/shorts/qYuFfMT4aT8", client: "Pesantren Darul Ulum Kalbar", category: "Promosi" },
        { url: "https://youtu.be/Mf1c1As338s", client: "Ditintelkam Polda Kalsel", category: "Izin Keramaian & SKCK" },
        { url: "https://youtu.be/loaUeKesmdU", client: "PLN × Danantara Indonesia", category: "Company Video" },
        { url: "https://youtube.com/shorts/3KNBU1mOVTA", client: "Super Briliant Kidz", category: "Promosi" },
        { url: "https://youtu.be/ngV8qtYJ4WQ", client: "Jagoti", category: "Explainer · K3 Safety" },
        { url: "https://youtu.be/GXAqBCz3hjE", client: "ILC Logistics × Itochu", category: "Company Profile" },
        { url: "https://youtu.be/OHrisQnwLCM", client: "Kerja+", category: "Explainer", ratio: "8:3" },
        { url: "https://youtu.be/YzFWUGTZoVU", client: "SJS — Sinar Jernih Suksesindo", category: "Company Profile" },
      ],
    },
    {
      name: "2D",
      videos: [
        { url: "https://youtube.com/shorts/NLzdRn9IcKE", client: "Music Video Lirik", category: "Music Video" },
        { url: "https://youtu.be/Yw56CHdG204", client: "TentangJawa — Diponegoro", category: "Edukasi Sejarah" },
        { url: "https://youtu.be/pycLZt9Dl5c", client: "Dunia Baru Ini Milik Kita", category: "Cyberpunk MV" },
      ],
    },
    {
      name: "3D Diorama",
      videos: [
        { url: "https://youtube.com/shorts/4d5CZ84cPmo", client: "Rahayu Swalayan", category: "Promosi Minimarket" },
      ],
    },
  ],
  seedance: [
    {
      name: "Realistic",
      videos: [
        { url: "https://youtu.be/AmxGOVHOL14", client: "Fresh Check", category: "AI Music Video" },
        brand("Lipstick"),
        { url: "https://youtu.be/TzUFxBP254M", client: "Bad Habit", category: "AI Music Video" },
        brand("Showreel"),
        { url: "https://youtu.be/ojLaYNPbHDc", client: "Class of 2010", category: "AI Music Video", ratio: "21:9" },
        brand("Herbafit"),
        brand("Rendang"),
        { url: "https://youtu.be/m4Trqf9Gor0", client: "Wedding Song & Love Story", category: "AI Music Video", ratio: "21:9" },
        brand("Beverage"),
        brand("Travel"),
        brand("Mi Goreng"),
      ],
    },
    { name: "Clay", videos: [] },
    {
      name: "Pixar",
      videos: [
        { url: "https://youtube.com/shorts/Yp7RWZC9X3k", client: "Birthday Story", category: "Short Story" },
        { url: "https://youtu.be/bfaxGZF2tB0", client: "Manasik Haji", category: "Edukasi" },
        { url: "https://youtube.com/shorts/Gydd4xSYpdQ", client: "Grandson and Grandma", category: "Short Story" },
        { url: "https://youtu.be/V0R1JZaJVG4", client: "ASC", category: "Company Profile" },
      ],
    },
    {
      name: "2D",
      videos: [{ url: "https://youtube.com/shorts/iX_m_D6KbKg", client: "MIA", category: "Story Telling" }],
    },
    { name: "3D Diorama", videos: [] },
  ],
};

/** Normalises an item into what the card & player need; null if the URL isn't YouTube. */
export function mediaOf(v) {
  const shorts = Boolean(v.url && /\/shorts\//.test(v.url));
  const [w, h] = (v.ratio || (shorts ? "9:16" : "16:9")).split(":").map(Number);
  const base = { ratio: `${w} / ${h}`, vertical: h > w };
  if (v.src) return { ...base, type: "video", src: v.src, thumb: v.poster, playerRatio: w / h };
  const m = v.url?.match(/(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|watch\?(?:.*&)?v=))([\w-]{11})/);
  if (!m) return null;
  return {
    ...base,
    type: "youtube",
    id: m[1],
    shorts,
    thumb: `https://i.ytimg.com/vi/${m[1]}/maxresdefault.jpg`,
    // YouTube letterboxes non-Shorts into 16:9 regardless of the source ratio
    playerRatio: shorts ? 9 / 16 : 16 / 9,
  };
}
