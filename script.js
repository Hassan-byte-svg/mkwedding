const WEDDING_AT = new Date("2026-10-14T00:00:00+05:00").getTime();
const root = document.getElementById("countdown");

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

if (render()) {
  setInterval(render, 1000);
}
