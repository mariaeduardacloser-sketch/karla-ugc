const videos = document.querySelectorAll(".video-card");
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const closeModal = document.querySelector(".modal-close");

// Animações de entrada ao rolar
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Pré-visualização suave dos vídeos
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target.querySelector("video");
    if (!video) return;
    if (entry.isIntersecting) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}, { threshold: 0.35 });

videos.forEach(card => {
  videoObserver.observe(card);

  card.addEventListener("click", () => {
    const source = card.dataset.video;
    const title = card.dataset.title;
    modalVideo.src = source;
    modalTitle.textContent = title;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    modalVideo.play().catch(() => {});
  });
});

function closeVideoModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  document.body.classList.remove("menu-open");
}

closeModal.addEventListener("click", closeVideoModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeVideoModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeVideoModal();
});

// Cursor elegante apenas no desktop
const cursor = document.querySelector(".cursor");
if (cursor && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll("a, button, .video-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "42px";
      cursor.style.height = "42px";
      cursor.style.background = "rgba(216,212,201,.18)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "18px";
      cursor.style.height = "18px";
      cursor.style.background = "transparent";
    });
  });
}

// Evita que links internos pulem de forma brusca
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
