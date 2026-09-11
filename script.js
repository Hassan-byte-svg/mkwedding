const WEDDING_AT = new Date("2026-10-16T00:00:00+05:00").getTime();
const root = document.getElementById("countdown");
const doors = document.getElementById("doors");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let opened = false;

function pad(n) {
  return String(n).padStart(2, "0");
}

function render() {
  const diff = WEDDING_AT - Date.now();

  if (diff <= 0) {
    root.innerHTML =
      '<p class="today">Today is the day. We look forward to celebrating with you.</p>';
    return false;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  root.innerHTML = [
    ["Days", days],
    ["Hours", hours],
    ["Minutes", minutes],
    ["Seconds", seconds],
  ]
    .map(
      ([label, value]) =>
        `<div class="cell"><div class="num">${pad(value)}</div><div class="unit">${label}</div></div>`,
    )
    .join("");

  return true;
}

function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -12%" },
  );

  items.forEach((el) => observer.observe(el));
}

function openInvitation() {
  if (opened) return;
  opened = true;
  document.body.classList.add("opened");
  document.body.classList.remove("locked");
  doors.setAttribute("aria-hidden", "true");
  doors.removeAttribute("tabindex");
  window.setTimeout(() => {
    doors.style.display = "none";
  }, 1650);
}

if (reduceMotion) {
  opened = true;
  document.body.classList.add("opened");
  document.body.classList.remove("locked");
  doors.style.display = "none";
} else {
  doors.addEventListener("pointerdown", openInvitation);
  doors.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openInvitation();
    }
  });
}

if (render()) {
  setInterval(render, 1000);
}

revealOnScroll();
