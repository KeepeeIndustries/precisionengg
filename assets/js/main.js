/* Precision Engineering — interactions
   Subtle only: sticky header, mobile nav, reveals, counters, form handling. */

(function () {
  "use strict";

  /* ---------- Sticky header shadow ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const navWrap = document.querySelector(".nav-wrap");
  if (toggle && navWrap) {
    toggle.addEventListener("click", () => {
      const open = navWrap.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Close when a link is chosen
    navWrap.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navWrap.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Services dropdown (touch / keyboard) ---------- */
  document.querySelectorAll(".has-sub > .nav__link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const li = link.parentElement;
      const isMobile = window.matchMedia("(max-width: 880px)").matches;
      // First tap opens the submenu on mobile; second tap follows the link.
      if (isMobile && !li.classList.contains("open")) {
        e.preventDefault();
        li.classList.add("open");
      }
    });
  });

  /* ---------- Scroll reveals ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          io.unobserve(el);
          const target = parseFloat(el.dataset.count);
          const decimals = (el.dataset.count.split(".")[1] || "").length;
          const dur = 1400;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (target * eased).toFixed(decimals);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => io.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.dataset.count));
  }

  /* ---------- Inquiry form ---------- */
  const form = document.querySelector("#inquiry-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const card = form.closest(".form-card");
      card.classList.add("sent");
      card.querySelector(".form-success").classList.add("show");
      card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
