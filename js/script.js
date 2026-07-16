/* ==========================================================================
   OUTLOOK MEN'S HAIR DRESSER — script.js
   Vanilla JS only. No frameworks, no build step.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------- WhatsApp admin number ----------------
     Replace with the salon owner's WhatsApp-enabled number if it changes. */
  const ADMIN_NUMBER = "919750777440";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initLoader();
    initScrollProgress();
    initNavbar();
    initMobileMenu();
    initScrollSpy();
    initParticles();
    initReveal();
    initCounters();
    initGalleryFilter();
    initLightbox();
    initTestimonialSlider();
    initFormValidationAndBooking();
    initBackToTop();
    initRipple();
    initSmoothAnchors();
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  /* ---------------- Loader ---------------- */
  function initLoader() {
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("hidden"), 400);
    });
    // Fallback in case 'load' already fired
    if (document.readyState === "complete") {
      setTimeout(() => loader.classList.add("hidden"), 400);
    }
  }

  /* ---------------- Scroll progress bar ---------------- */
  function initScrollProgress() {
    const bar = document.getElementById("scroll-progress");
    window.addEventListener("scroll", () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = scrolled + "%";
    }, { passive: true });
  }

  /* ---------------- Sticky navbar ---------------- */
  function initNavbar() {
    const nav = document.getElementById("navbar");
    const toggle = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
  }

  /* ---------------- Mobile hamburger menu ---------------- */
  function initMobileMenu() {
    const btn = document.getElementById("hamburger");
    const menu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("menuOverlay");

    function close() {
      btn.classList.remove("active");
      menu.classList.remove("open");
      overlay.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
    function open() {
      btn.classList.add("active");
      menu.classList.add("open");
      overlay.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }

    btn.addEventListener("click", () => {
      btn.classList.contains("active") ? close() : open();
    });
    overlay.addEventListener("click", close);
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  }

  /* ---------------- Scroll-spy for nav links ---------------- */
  function initScrollSpy() {
    const sections = document.querySelectorAll("main section[id], .hero[id]");
    const links = document.querySelectorAll(".nav-links a");
    if (!("IntersectionObserver" in window)) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(s => obs.observe(s));
  }

  /* ---------------- Hero floating particles ---------------- */
  function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    function makeParticles() {
      const count = Math.min(46, Math.floor(w / 26));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.6,
        speed: Math.random() * 0.35 + 0.08,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.15
      }));
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217,168,87,${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }

    resize();
    makeParticles();
    tick();
    window.addEventListener("resize", () => { resize(); makeParticles(); });
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal, .reveal-stagger");
    if (!("IntersectionObserver" in window)) {
      items.forEach(i => i.classList.add("in"));
      return;
    }
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(i => obs.observe(i));
  }

  /* ---------------- Counter animation ---------------- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    function animate(el) {
      const target = parseFloat(el.dataset.counter);
      const decimals = parseInt(el.dataset.decimal || "0", 10);
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => obs.observe(c));
  }

  /* ---------------- Gallery filter ---------------- */
  function initGalleryFilter() {
    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".gallery-item");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        items.forEach(item => {
          const show = filter === "all" || item.dataset.cat === filter;
          item.classList.toggle("hide", !show);
        });
      });
    });
  }

  /* ---------------- Lightbox ---------------- */
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("lightboxClose");

    document.querySelectorAll(".gallery-item img").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
      });
    });

    function close() { lightbox.classList.remove("open"); }
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------------- Testimonial slider (auto-sliding) ---------------- */
  function initTestimonialSlider() {
    const slides = document.querySelectorAll(".testi-slide");
    const dotsWrap = document.getElementById("testiDots");
    if (!slides.length) return;

    let current = 0;
    let timer;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "testi-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show testimonial " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll(".testi-dot");

    function goTo(i) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = i;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }
    function next() { goTo((current + 1) % slides.length); }

    function start() { timer = setInterval(next, 5000); }
    function stop() { clearInterval(timer); }

    start();
    dotsWrap.addEventListener("mouseenter", stop);
    dotsWrap.addEventListener("mouseleave", start);
  }

  /* ---------------- Form validation + WhatsApp booking ---------------- */
  function initFormValidationAndBooking() {
    const form = document.getElementById("bookingForm");
    const successMsg = document.getElementById("formSuccess");
    if (!form) return;

    function setError(fieldName, message) {
      const field = form.querySelector(`[data-field="${fieldName}"]`);
      if (!field) return;
      field.classList.toggle("error", !!message);
      const msgEl = field.querySelector(".err-msg");
      if (msgEl) msgEl.textContent = message || "";
    }

    function validate(data) {
      let valid = true;

      if (!data.name.trim()) { setError("name", "Please enter your name."); valid = false; }
      else setError("name", "");

      const phoneDigits = data.phone.replace(/\D/g, "");
      if (phoneDigits.length !== 10) { setError("phone", "Enter a valid 10-digit phone number."); valid = false; }
      else setError("phone", "");

      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        setError("email", "Enter a valid email address."); valid = false;
      } else setError("email", "");

      if (!data.service) { setError("service", "Please choose a service."); valid = false; }
      else setError("service", "");

      if (!data.date) { setError("date", "Please choose a date."); valid = false; }
      else setError("date", "");

      if (!data.time) { setError("time", "Please choose a time."); valid = false; }
      else setError("time", "");

      return valid;
    }

    function formatDate(value) {
      if (!value) return "";
      const d = new Date(value + "T00:00:00");
      return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    }
    function formatTime(value) {
      if (!value) return "";
      const [h, m] = value.split(":").map(Number);
      const period = h >= 12 ? "PM" : "AM";
      const h12 = ((h + 11) % 12) + 1;
      return `${h12}:${String(m).padStart(2, "0")} ${period}`;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        service: form.service.value,
        date: form.date.value,
        time: form.time.value,
        message: form.message.value
      };

      if (!validate(data)) return;

      const lines = [
        "NEW APPOINTMENT",
        "",
        "Customer Name:",
        data.name.trim(),
        "",
        "Phone:",
        data.phone.trim(),
        "",
        "Service:",
        data.service,
        "",
        "Date:",
        formatDate(data.date),
        "",
        "Time:",
        formatTime(data.time)
      ];

      if (data.email.trim()) lines.push("", "Email:", data.email.trim());
      if (data.message.trim()) lines.push("", "Message:", data.message.trim());

      const text = encodeURIComponent(lines.join("\n"));
      const url = `https://wa.me/${ADMIN_NUMBER}?text=${text}`;

      successMsg.classList.add("show");
      window.open(url, "_blank", "noopener");

      setTimeout(() => {
        form.reset();
        successMsg.classList.remove("show");
      }, 4000);
    });
  }

  /* ---------------- Back to top ---------------- */
  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
      btn.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------------- Button ripple effect ---------------- */
  function initRipple() {
    document.querySelectorAll("[data-ripple]").forEach(btn => {
      btn.addEventListener("click", function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
        this.style.position = this.style.position || "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }

  /* ---------------- Smooth scroll for in-page anchors ---------------- */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const navHeight = document.getElementById("navbar").offsetHeight;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }

})();
