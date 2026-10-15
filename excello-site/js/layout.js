/* Excello shared header + footer injection.
   Pulls route-current state from <body data-route="…">. */
(function () {
  const route = document.body.getAttribute('data-route') || '';

  const nav = [
    { href: '/',            label: 'Home',          key: 'home' },
    { href: '/projects/',   label: 'Projects',      key: 'projects' },
    { href: '/services/',   label: 'Services',      key: 'services' },
    { href: '/developments/', label: 'Developments', key: 'developments' },
    { href: '/team/',       label: 'About & Team',  key: 'team' },
    { href: '/insights/',   label: 'Insights',      key: 'insights' },
    { href: '/contact/',    label: 'Contact',       key: 'contact' },
  ];

  const navHtml = nav.map(n => {
    const current = n.key === route ? ' aria-current="page"' : '';
    return `<a href="${n.href}"${current}>${n.label}</a>`;
  }).join('');

  const mobileNavHtml = nav.map(n => {
    const current = n.key === route ? ' aria-current="page"' : '';
    return `<a href="${n.href}"${current}>${n.label}</a>`;
  }).join('');

  const header = `
    <a class="skip" href="#main">Skip to content</a>
    <header class="site-header" role="banner">
      <div class="site-header__inner">
        <a class="brand" href="/">EXCELLO <small>/ Design &amp; Build</small></a>
        <nav class="primary-nav" aria-label="Primary">${navHtml}</nav>
        <a class="header-cta" href="/contact/">Tell us about your dream</a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobileMenu">Menu</button>
      </div>
    </header>
    <aside class="mobile-menu" id="mobileMenu" aria-hidden="true" aria-label="Mobile menu">
      <div class="mobile-menu__top">
        <a class="brand" href="/">EXCELLO</a>
        <button class="menu-btn" type="button" data-close>Close</button>
      </div>
      <nav class="mobile-menu__nav" aria-label="Mobile primary">${mobileNavHtml}</nav>
      <div class="mobile-menu__actions">
        <a class="btn btn--block" href="/contact/">Tell us about your dream</a>
        <a class="btn btn--ghost btn--block" href="/developments/#free-check">Get a free quick land check</a>
      </div>
    </aside>
  `;

  const footer = `
    <footer class="site-footer" role="contentinfo" id="footer">
      <div class="wrap">
        <h2 class="footer-form__h">Tell us what you have in mind.</h2>
        <p class="footer-form__p">Where is your land, and what would you like to create? A few details are enough to begin.</p>
        <form class="form footer-form" id="enquiryForm" method="post" action="/api/enquiry" novalidate>
          <input type="hidden" name="source" value="footer">
          <input type="hidden" name="route" id="enquiryRoute" value="">
          <div class="form__row">
            <div class="field">
              <label for="ef-name">Your name</label>
              <input id="ef-name" name="name" type="text" autocomplete="name" required>
              <div class="field__err">Please add your name.</div>
            </div>
            <div class="field">
              <label for="ef-contact">Email or WhatsApp number</label>
              <input id="ef-contact" name="contact" type="text" autocomplete="email tel" required>
              <div class="field__err">Please share one preferred contact path.</div>
            </div>
          </div>
          <div class="field">
            <label for="ef-intent">What are you thinking of building?</label>
            <input id="ef-intent" name="intent" type="text" placeholder="A home, an apartment, a hotel, a cafe…">
          </div>
          <div class="field">
            <label for="ef-land">Where is your land? (optional)</label>
            <input id="ef-land" name="land" type="text" placeholder="Nearest town or GN area">
          </div>
          <div>
            <button class="btn btn--inverse" type="submit">Start a conversation</button>
          </div>
          <p class="form__msg" id="ef-msg" hidden></p>
          <p class="form__note">A WhatsApp draft is not a submitted enquiry. We confirm receipt once a human on our side has it.</p>
        </form>

        <div class="footer-cols">
          <div>
            <h4>Excello</h4>
            <p>Design, Development &amp; Build Consultation. Sri Lanka.</p>
            <p style="margin-top:10px">+94 77 022 2000<br>inquiry@excello.lk</p>
            <p style="margin-top:10px">No. 16, St Rita's Road,<br>Mount Lavinia, Sri Lanka</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="/services/">Services</a></li>
              <li><a href="/developments/">Developments</a></li>
              <li><a href="/projects/">Projects</a></li>
              <li><a href="/insights/">Insights</a></li>
            </ul>
          </div>
          <div>
            <h4>Useful</h4>
            <ul>
              <li><a href="/process/">Process</a></li>
              <li><a href="/team/">About &amp; Team</a></li>
              <li><a href="/tools/construction-cost-calculator-sri-lanka/">Cost calculator</a></li>
              <li><a href="/aathavan-availability/">Aathavan availability</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy-policy/">Privacy policy</a></li>
              <li><a href="/cookie-policy/">Cookie policy</a></li>
              <li><a href="/terms-and-conditions/">Terms &amp; conditions</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; <span id="yr"></span> Excello Developers (Pvt) Ltd.</span>
          <span>Site rebuild per 14 October 2026 master guide.</span>
        </div>
      </div>
    </footer>
  `;

  // Mount header at the start of body and footer at the end
  const headerMount = document.getElementById('header-root');
  const footerMount = document.getElementById('footer-root');
  if (headerMount) headerMount.outerHTML = header;
  else document.body.insertAdjacentHTML('afterbegin', header);
  if (footerMount) footerMount.outerHTML = footer;
  else document.body.insertAdjacentHTML('beforeend', footer);

  // Year
  const yrEl = document.getElementById('yr');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  // Record the current route into the enquiry hidden field
  const routeInput = document.getElementById('enquiryRoute');
  if (routeInput) routeInput.value = location.pathname;

  // Mobile menu
  const menu = document.getElementById('mobileMenu');
  const openBtns = document.querySelectorAll('.menu-btn:not([data-close])');
  const closeBtns = document.querySelectorAll('.menu-btn[data-close]');
  const openMenu = () => {
    menu.setAttribute('aria-hidden', 'false');
    openBtns.forEach(b => b.setAttribute('aria-expanded', 'true'));
    document.body.style.overflow = 'hidden';
    const first = menu.querySelector('a, button'); if (first) first.focus();
  };
  const closeMenu = () => {
    menu.setAttribute('aria-hidden', 'true');
    openBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));
    document.body.style.overflow = '';
    openBtns[0] && openBtns[0].focus();
  };
  openBtns.forEach(b => b.addEventListener('click', openMenu));
  closeBtns.forEach(b => b.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.getAttribute('aria-hidden') === 'false') closeMenu();
  });

  // Enquiry form — front-end only, mirror behaviour defined in the guide.
  const form = document.getElementById('enquiryForm');
  if (form) {
    const msg = document.getElementById('ef-msg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.hidden = true; msg.className = 'form__msg';
      // Simple required validation
      let hasErr = false;
      form.querySelectorAll('.field--err').forEach(f => f.classList.remove('field--err'));
      ['ef-name', 'ef-contact'].forEach(id => {
        const input = form.querySelector('#' + id);
        if (!input.value.trim()) { input.closest('.field').classList.add('field--err'); hasErr = true; }
      });
      if (hasErr) { msg.hidden = false; msg.classList.add('form__msg--err'); msg.textContent = 'Please check the highlighted fields.'; return; }

      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const r = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!r.ok) throw new Error('bad');
        msg.hidden = false; msg.classList.add('form__msg--ok');
        msg.textContent = 'Thanks. Your enquiry has been sent to Excello.';
        form.reset();
      } catch (_) {
        msg.hidden = false; msg.classList.add('form__msg--err');
        msg.textContent = 'Your enquiry could not be sent. Please try again, or contact us on WhatsApp.';
      }
    });
  }
})();
