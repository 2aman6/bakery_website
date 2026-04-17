  /* ========== DATA ========== */
  const MENU = [
    {
      title: "Cakes", emoji: "🎂",
      items: [
        { name: "Classic Chocolate Cake", price: "Rs. 1,800", desc: "Rich cocoa sponge with silky chocolate ganache.", emoji: "🍫" },
        { name: "Vanilla Bean Cake",      price: "Rs. 1,600", desc: "Light, fluffy vanilla layers with buttercream.",        emoji: "🤍" },
        { name: "Red Velvet Cake",        price: "Rs. 2,000", desc: "Velvety crumb topped with cream cheese frosting.",     emoji: "❤️" },
      ]
    },
    {
      title: "Cupcakes", emoji: "🧁",
      items: [
        { name: "Choco Swirl Cupcake", price: "Rs. 180", desc: "Moist chocolate cupcake with whipped swirl.",        emoji: "🍫" },
        { name: "Strawberry Dream",    price: "Rs. 200", desc: "Fresh strawberry frosting on vanilla base.",          emoji: "🍓" },
        { name: "Salted Caramel",      price: "Rs. 220", desc: "Buttery caramel drizzle with a hint of sea salt.",    emoji: "🍯" },
      ]
    },
    {
      title: "Cookies", emoji: "🍪",
      items: [
        { name: "Choco Chip Cookies", price: "Rs. 120", desc: "Crisp edges, gooey center, loaded with chips.",         emoji: "🍫" },
        { name: "Oatmeal Raisin",     price: "Rs. 100", desc: "Wholesome oats with sweet juicy raisins.",              emoji: "🌾" },
        { name: "Double Fudge",       price: "Rs. 150", desc: "Extra-rich chocolate cookies with fudge chunks.",       emoji: "🖤" },
      ]
    },
    {
      title: "Brownies", emoji: "🍫",
      items: [
        { name: "Classic Fudge Brownie", price: "Rs. 250", desc: "Dense, fudgy and intensely chocolatey.", emoji: "🍫" },
        { name: "Walnut Brownie",        price: "Rs. 280", desc: "Topped with toasted walnut pieces.",     emoji: "🌰" },
        { name: "Nutella Stuffed",       price: "Rs. 320", desc: "A molten heart of hazelnut goodness.",   emoji: "✨" },
      ]
    },
    {
      title: "Breads", emoji: "🍞",
      items: [
        { name: "Soft Milk Bread",    price: "Rs. 220", desc: "Pillowy soft, perfect for breakfast.",          emoji: "🥛" },
        { name: "Garlic Herb Loaf",   price: "Rs. 280", desc: "Aromatic garlic and fresh herbs baked in.",     emoji: "🧄" },
        { name: "Whole Wheat Bread",  price: "Rs. 250", desc: "Hearty, healthy, freshly milled wheat.",        emoji: "🌾" },
      ]
    },
  ];

  function waLink(msg) {
    return `https://wa.me/923216226533?text=${encodeURIComponent(msg)}`;
  }

  /* ========== NAVBAR SCROLL ========== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ========== MOBILE MENU ========== */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;
  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    menuToggle.textContent = menuOpen ? '✕' : '☰';
  });
  function closeMobileMenu() {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    menuToggle.textContent = '☰';
  }

  /* ========== LOGO HOVER ========== */
  const logoEmoji = document.getElementById('logo-emoji');
  logoEmoji.addEventListener('mouseenter', () => {
    logoEmoji.style.animation = 'logoPulse 0.5s ease';
  });
  logoEmoji.addEventListener('animationend', () => {
    logoEmoji.style.animation = '';
  });

  /* ========== HERO SLIDESHOW ========== */
  const slides     = document.querySelectorAll('.hero-slide');
  const dotsWrap   = document.getElementById('slide-dots');
  const barEl      = document.getElementById('slideshow-bar');
  let currentSlide = 0;
  const SLIDE_DUR  = 5000; // ms per slide

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i+1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });

  function goToSlide(idx) {
    slides[currentSlide].classList.remove('active');
    dotsWrap.children[currentSlide].classList.remove('active');
    currentSlide = idx;
    slides[currentSlide].classList.add('active');
    dotsWrap.children[currentSlide].classList.add('active');
    resetBar();
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  // Animate progress bar
  function resetBar() {
    barEl.style.transition = 'none';
    barEl.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        barEl.style.transition = `width ${SLIDE_DUR}ms linear`;
        barEl.style.width = '100%';
      });
    });
  }
  resetBar();
  setInterval(nextSlide, SLIDE_DUR);

  /* ========== FLOATING PARTICLES ========== */
  const particleContainer = document.getElementById('particles');
  const EMOJIS = ['🍪','🧁','🎂','🍫','🌸','✨','🍰','🥐'];

  function spawnParticle() {
    const el = document.createElement('span');
    el.className = 'particle';
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const size  = 0.9 + Math.random() * 0.8;
    const left  = 5 + Math.random() * 90;
    const dur   = 8 + Math.random() * 10;
    const delay = Math.random() * 4;
    el.style.cssText = `
      left: ${left}%;
      bottom: -5%;
      font-size: ${size}rem;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;
    particleContainer.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay) * 1000);
  }

  // Spawn particles continuously
  for (let i = 0; i < 8; i++) spawnParticle();
  setInterval(spawnParticle, 1800);

  /* ========== MENU SECTION ========== */
  let activeCategory = 0;

  function renderPills() {
    const container = document.getElementById('cat-pills');
    container.innerHTML = '';
    MENU.forEach((cat, i) => {
      const btn = document.createElement('button');
      btn.className = 'cat-pill' + (i === activeCategory ? ' active' : '');
      btn.style.cssText = `
        padding:0.5rem 1.25rem; border-radius:9999px; font-size:0.875rem;
        font-weight:500; cursor:pointer; font-family:'Inter',sans-serif;
        border:1px solid ${i === activeCategory ? 'transparent' : '#fde68a'};
        background:${i === activeCategory ? '#f43f5e' : '#fff'};
        color:${i === activeCategory ? '#fff' : '#78350f'};
      `;
      btn.innerHTML = `<span style="margin-right:0.25rem;">${cat.emoji}</span>${cat.title}`;
      btn.addEventListener('click', () => {
        activeCategory = i;
        renderPills();
        renderMenuGrid();
        spawnConfetti(btn);
      });
      container.appendChild(btn);
    });
  }

  function renderMenuGrid() {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';
    const cat = MENU[activeCategory];
    cat.items.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'menu-card card-animate';
      card.style.cssText = `
        background:#fff; border-radius:1rem; padding:1.5rem;
        box-shadow:0 2px 8px rgba(0,0,0,0.05);
        border:1px solid rgba(253,230,138,0.5);
        animation-delay:${idx * 0.1}s;
      `;
      card.innerHTML = `
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:0.75rem;">
          <div class="card-emoji" style="width:3.5rem;height:3.5rem;border-radius:1rem;background:linear-gradient(135deg,#ffe4e6,#fef3c7);display:flex;align-items:center;justify-content:center;font-size:1.75rem;">${item.emoji}</div>
          <span class="price-badge" style="color:#78350f;font-weight:600;padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.8rem;">${item.price}</span>
        </div>
        <h3 class="font-serif" style="font-size:1.15rem;font-weight:700;color:#1c0a00;margin-bottom:0.5rem;">${item.name}</h3>
        <p style="color:rgba(120,53,15,0.75);font-size:0.85rem;line-height:1.6;margin-bottom:1rem;">${item.desc}</p>
        <a href="${waLink(`Hi! I'd like to order: ${item.name} (${item.price}).`)}"
           target="_blank" rel="noreferrer" class="wa-order-link"
           style="display:inline-flex;align-items:center;gap:0.35rem;color:#f43f5e;font-weight:600;font-size:0.85rem;text-decoration:none;">
          Order via WhatsApp <span class="wa-arrow">→</span>
        </a>
      `;
      grid.appendChild(card);
    });
  }

  renderPills();
  renderMenuGrid();

  /* ========== CONFETTI BURST ========== */
  function spawnConfetti(el) {
    const rect   = el.getBoundingClientRect();
    const colors = ['#f43f5e','#fb923c','#fbbf24','#34d399','#60a5fa','#c084fc'];
    for (let i = 0; i < 10; i++) {
      const dot = document.createElement('div');
      dot.className = 'confetti-piece';
      dot.style.cssText = `
        left: ${rect.left + rect.width/2 + (Math.random()-0.5)*40}px;
        top:  ${rect.top  + window.scrollY}px;
        background: ${colors[Math.floor(Math.random()*colors.length)]};
        animation-delay: ${Math.random()*0.2}s;
        transform: translateX(${(Math.random()-0.5)*60}px);
        position:fixed; z-index:9999;
      `;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 1000);
    }
  }

  /* ========== SCROLL REVEAL (IntersectionObserver) ========== */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate section heading underline
        const heading = entry.target.querySelector('.section-heading-line');
        if (heading) setTimeout(() => heading.classList.add('line-visible'), 400);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObs.observe(el));

  // Also observe headings directly
  document.querySelectorAll('.section-heading-line').forEach(h => {
    const hObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { h.classList.add('line-visible'); hObs.unobserve(h); }
      });
    }, { threshold: 0.5 });
    hObs.observe(h);
  });

  /* ========== CUSTOMER COUNTER (about badge) ========== */
  const custEl = document.getElementById('cust-count');
  let counted  = false;
  const custObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      animateCounter(custEl, 0, 1000, 1500, '+');
      custObs.disconnect();
    }
  }, { threshold: 0.5 });
  custObs.observe(document.getElementById('about-badge'));

  function animateCounter(el, from, to, duration, suffix) {
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(from + (to - from) * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ========== RESPONSIVE GRIDS ========== */
  function setupAboutGrid() {
    const grid   = document.getElementById('about-grid');
    const visual = document.getElementById('about-visual');
    const text   = document.getElementById('about-text');
    if (window.innerWidth >= 1024) {
      grid.style.gridTemplateColumns = '1fr 1fr';
      visual.style.order = '1'; text.style.order = '2';
    } else {
      grid.style.gridTemplateColumns = '1fr';
      visual.style.order = '2'; text.style.order = '1';
    }
  }

  function setupContactGrid() {
    const grid = document.getElementById('contact-grid');
    grid.style.gridTemplateColumns = window.innerWidth >= 1024 ? '1fr 1fr' : '1fr';
  }

  function setupFooterGrid() {
    const grid = document.getElementById('footer-grid');
    grid.style.gridTemplateColumns = window.innerWidth >= 768 ? '1fr 1fr 1fr' : '1fr';
  }

  function setupFeaturesGrid() {
    const grid = document.getElementById('features-grid');
    grid.style.gridTemplateColumns = window.innerWidth < 500 ? '1fr' : '1fr 1fr';
  }

  function runAllResponsive() {
    setupAboutGrid();
    setupContactGrid();
    setupFooterGrid();
    setupFeaturesGrid();
  }

  runAllResponsive();
  window.addEventListener('resize', runAllResponsive);

  /* ========== FOOTER YEAR ========== */
  document.getElementById('footer-year').textContent = new Date().getFullYear();