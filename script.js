const navToggle = document.querySelector("#navToggle");
const navMenu = document.querySelector("#navMenu");
const scrollProgress = document.querySelector("#scrollProgress");
const toast = document.querySelector("#toast");

navToggle.addEventListener("click", () => {
  const opened = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(opened));
  navToggle.setAttribute("aria-label", opened ? "Close navigation menu" : "Open navigation menu");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections gently as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Show reading progress at the top of the page.
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  scrollProgress.style.width = `${percentage}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

document.querySelector("#year").textContent = new Date().getFullYear();

// Placeholder links explain what needs to be added, instead of navigating to nowhere.
document.querySelectorAll(".placeholder-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    toast.textContent = "Replace this placeholder with your real project or certificate link.";
    toast.classList.add("show");
    window.clearTimeout(link.toastTimer);
    link.toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
  });
});
