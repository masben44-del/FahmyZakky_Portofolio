/* mailto: opens whatever desktop mail app is registered (often Outlook on
   Windows). On desktop we open Gmail's web composer instead; phones keep
   mailto so the native mail/Gmail app handles it. */

export function gmailUrl(mailto) {
  const u = new URL(mailto);
  const p = new URLSearchParams({ view: "cm", fs: "1", to: decodeURIComponent(u.pathname) });
  const subject = u.searchParams.get("subject");
  const body = u.searchParams.get("body");
  if (subject) p.set("su", subject);
  if (body) p.set("body", body);
  return `https://mail.google.com/mail/?${p}`;
}

const useGmail = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function openMail(mailto) {
  if (useGmail()) window.open(gmailUrl(mailto), "_blank", "noopener");
  else window.location.href = mailto;
}

export function initMailLinks() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="mailto:"]');
    if (!a || !useGmail()) return;
    e.preventDefault();
    openMail(a.getAttribute("href"));
  });
}
