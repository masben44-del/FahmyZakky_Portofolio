import { EMAIL, WHATSAPP, FASTWORK_PROFILE } from "../config.js";
import { ARROW, pageHero, socialList } from "../partials.js";
import { openMail } from "../mail.js";

export const title = "Contact";

const SERVICES = ["AI Cinematic & UGC", "Vibe Code Web Design", "Documents", "Layanan AI lainnya"];
const BUDGETS = ["< Rp1 jt", "Rp1–3 jt", "Rp3–5 jt", "> Rp5 jt"];
const NOTE = "Brief otomatis terisi di WhatsApp atau Gmail — tinggal tekan kirim. Untuk Fastwork, brief disalin otomatis lalu tinggal ditempel di chat.";

const chips = (name, list, type) =>
  list.map((v) => `
    <label class="pick">
      <input type="${type}" name="${name}" value="${v}" />
      <span>${v}</span>
    </label>`).join("");

export function render() {
  return `
    ${pageHero({
      index: "(Contact — 05)",
      lines: ["Let's talk", "~about your brand."],
    })}

    <section class="contact">
      <form class="brief" data-brief data-fade novalidate>
        <span class="label">(Project brief)</span>

        <div class="field">
          <label for="b-name">Nama / brand</label>
          <input id="b-name" name="name" type="text" placeholder="Nama kamu atau nama brand" required />
        </div>

        <fieldset class="field">
          <legend>Layanan yang dibutuhkan</legend>
          <div class="picks">${chips("service", SERVICES, "checkbox")}</div>
        </fieldset>

        <fieldset class="field">
          <legend>Perkiraan budget</legend>
          <div class="picks">${chips("budget", BUDGETS, "radio")}</div>
        </fieldset>

        <div class="field">
          <label for="b-msg">Ceritakan project kamu</label>
          <textarea id="b-msg" name="message" rows="4" placeholder="Tujuan, referensi, deadline…"></textarea>
        </div>

        <div class="brief__actions">
          <button type="submit" class="btn btn--lime" value="whatsapp" data-link><span>Kirim via WhatsApp</span>${ARROW}</button>
          <button type="submit" class="btn btn--ghost" value="fastwork" data-link><span>Kirim via Fastwork</span>${ARROW}</button>
          <button type="submit" class="btn btn--ghost" value="email" data-link><span>Kirim via email</span>${ARROW}</button>
        </div>
        <p class="brief__note" data-brief-note>${NOTE}</p>
      </form>

      <aside class="channels" data-fade>
        <span class="label">(Hubungi kami)</span>
        ${socialList("socials--big", { arrow: true })}
      </aside>
    </section>
  `;
}

export function setup(root) {
  const form = root.querySelector("[data-brief]");
  const note = root.querySelector("[data-brief-note]");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    if (!name) {
      form.querySelector("#b-name").focus();
      form.classList.add("is-invalid");
      return;
    }
    const body = [
      `Halo Lensa 51, saya ${name}.`,
      `Layanan: ${data.getAll("service").join(", ") || "-"}`,
      `Budget: ${data.get("budget") || "-"}`,
      "",
      (data.get("message") || "").toString(),
    ].join("\n");

    const via = e.submitter?.value;
    if (via === "email") {
      const subject = encodeURIComponent(`Project baru — ${name}`);
      openMail(`mailto:${EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`);
    } else if (via === "fastwork") {
      // Fastwork has no way to prefill its chat, so hand the brief over via the clipboard
      let copied = true;
      try {
        await navigator.clipboard.writeText(body);
      } catch {
        copied = false;
      }
      window.open(FASTWORK_PROFILE, "_blank", "noopener");
      note.textContent = copied
        ? "✓ Brief sudah disalin — tinggal tempel (Ctrl+V / tahan & tempel) di chat Fastwork."
        : "Brief belum bisa disalin otomatis di browser ini — salin manual dari kolom di atas, lalu tempel di chat Fastwork.";
      note.classList.add("is-done");
    } else {
      window.open(WHATSAPP.link(body), "_blank", "noopener");
    }
  });
  form.addEventListener("input", () => {
    form.classList.remove("is-invalid");
    note.textContent = NOTE;
    note.classList.remove("is-done");
  });
}
