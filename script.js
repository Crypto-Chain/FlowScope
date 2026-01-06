document.addEventListener("DOMContentLoaded", () => {
  // Current year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navActions = document.querySelector(".nav-actions");

  if (navToggle && navLinks && navActions) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
      navActions.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a, .nav-actions a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
        navActions.classList.remove("open");
      });
    });
  }

  // Live Signals Snapshot updates
  const signalRows = document.querySelectorAll(".hero-alert-list .alert-row");
  const signalPool = [
    { pair: "$NOVA / SOL", score: "88/100", vol: "$142k", pressure: "71%", tier: "Strong" },
    { pair: "$WAVE / SOL", score: "76/100", vol: "$58k", pressure: "64%", tier: "Solid" },
    { pair: "$FLUX / SOL", score: "91/100", vol: "$210k", pressure: "78%", tier: "Strong" },
    { pair: "$VOLT / SOL", score: "69/100", vol: "$34k", pressure: "59%", tier: "Stable" },
    { pair: "$LUNA / SOL", score: "83/100", vol: "$96k", pressure: "67%", tier: "Strong" },
    { pair: "$DRIFT / SOL", score: "72/100", vol: "$49k", pressure: "61%", tier: "Solid" },
    { pair: "$KITE / SOL", score: "79/100", vol: "$63k", pressure: "66%", tier: "Solid" }
  ];

  const usedPairs = new Set();
  const pickSignal = () => {
    let candidate;
    let attempts = 0;
    while (attempts < 6) {
      candidate = signalPool[Math.floor(Math.random() * signalPool.length)];
      if (!usedPairs.has(candidate.pair)) {
        usedPairs.add(candidate.pair);
        if (usedPairs.size > 4) {
          usedPairs.clear();
        }
        return candidate;
      }
      attempts += 1;
    }
    return candidate || signalPool[0];
  };

  const updateRow = (row) => {
    const data = pickSignal();
    const pairEl = row.querySelector(".alert-pair");
    const metaEl = row.querySelector(".alert-meta");
    const scoreEl = row.querySelector(".alert-score");
    const timeEl = row.querySelector(".alert-time");

    if (pairEl) pairEl.textContent = data.pair;
    if (metaEl) {
      metaEl.textContent = `Score ${data.score} - Buy pressure ${data.pressure}`;
    }
    if (scoreEl) scoreEl.textContent = data.tier;
    if (timeEl) {
      const minutes = Math.floor(Math.random() * 18) + 1;
      timeEl.textContent = `${minutes}m ago`;
    }

    row.classList.remove("is-updating");
    void row.offsetWidth;
    row.classList.add("is-updating");
  };

  if (signalRows.length) {
    setInterval(() => {
      const liveRows = Array.from(signalRows).filter((row) => !row.classList.contains("muted"));
      const row = liveRows[Math.floor(Math.random() * liveRows.length)];
      if (row) {
        updateRow(row);
      }
    }, 3200);
  }

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    revealItems.forEach((item) => {
      const delay = item.dataset.delay;
      if (delay) {
        item.style.setProperty("--reveal-delay", `${delay}ms`);
      }
      revealObserver.observe(item);
    });
  }

  // Mobile CTA bar
  const mobileCtaBar = document.querySelector(".mobile-cta-bar");
  if (mobileCtaBar) {
    let isTicking = false;
    const onScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 300;
          mobileCtaBar.classList.toggle("is-visible", shouldShow);
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
});
