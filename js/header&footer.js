(function () {
  // "Home" is absolute (works from the detail pages too), the rest are
  // in-page anchors like the rest of the site
  const NAV_LINKS = [
    ["index.html", "Home"],
    ["#about", "About"],
    ["#areas", "Best Areas"],
    ["#discovery", "Discovery"],
    ["#gallery", "Gallery"],
  ];

  const navLinks = (className) =>
    NAV_LINKS.map(
      ([href, label]) => `<a href="${href}" class="${className}">${label}</a>`,
    ).join("");

  // ===== header =====

  const header = document.getElementById("header");

  if (header) {
    header.outerHTML = `
      <header class="site-header" id="siteHeader">
        <div class="container nav-container">
          <a href="#home" class="brand" aria-label="Live Love Assia home">
            <img
              src="Assia/liveloveassia.png"
              alt="Live Love Assia"
              class="brand-logo"
            />
          </a>

          <button
            class="menu-toggle"
            id="menuToggle"
            aria-label="Open navigation menu"
            aria-controls="navMenu"
            aria-expanded="false"
            type="button"
          >
            <i class="fa-solid fa-bars"></i>
          </button>

          <nav class="nav-menu" id="navMenu" aria-label="Main navigation">
            ${navLinks("nav-link")}
            <div class="gtranslate_wrapper"></div>
          </nav>
        </div>
      </header>
    `;

    // ===== language switcher =====

    window.gtranslateSettings = {
      default_language: "en",
      native_language_names: true,
      detect_browser_language: true,
      languages: ["en", "fr", "ar"],
      wrapper_selector: ".gtranslate_wrapper",
      flag_size: 24,
    };

    const gTranslateScript = document.createElement("script");
    gTranslateScript.src = "https://cdn.gtranslate.net/widgets/latest/flags.js";
    gTranslateScript.defer = true;
    document.head.appendChild(gTranslateScript);

    // the flags arrive late — keep the switcher inside the nav instead of
    // letting GTranslate float it over the page
    const keepSwitcherInline = (wrapper) => {
      if (!wrapper) {
        return;
      }

      wrapper
        .querySelectorAll(".gt_switcher_wrapper")
        .forEach((switcher) => switcher.removeAttribute("style"));
    };

    gTranslateScript.addEventListener("load", () =>
      keepSwitcherInline(document.querySelector(".gtranslate_wrapper")),
    );

    // fallback in case the widget renders after the script's load event
    let switcherChecks = 0;
    const switcherTimer = setInterval(() => {
      keepSwitcherInline(document.querySelector(".gtranslate_wrapper"));

      if (++switcherChecks > 20) {
        clearInterval(switcherTimer);
      }
    }, 500);
  }

  // ===== footer =====

  const footer = document.getElementById("footer");

  if (footer) {
    footer.outerHTML = `
      <footer class="site-footer" id="footer">
        <div class="container footer-main">
          <a href="index.html" class="brand footer-brand">
            <img
              src="Assia/liveloveassia.png"
              alt="Live Love Assia logo"
              class="brand-logo"
            />
          </a>

          <p>Discover the heart of Assia, Batroun District, Lebanon.</p>
          <div class="footer-links">
            ${navLinks("")}
          </div>
          <div class="footer-links">
            <a href="https://instagram.com/liveloveassia" target="_blank" rel="noopener"
              ><i class="fa-brands fa-instagram"></i> Instagram</a
            >
            <a href="tel:+9616705048">+961 6 705 048</a>
            </div>
        </div>

        <div class="container footer-bottom">
          <p>
            &copy; <span id="currentYear"></span> Live Love Assia. All rights
            reserved.
          </p>
          <div class="chedilex-footer-container"></div>
        </div>
      </footer>
    `;

    // the pages render the footer after their own script, so fill in the year here
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }

    // Chedilex credit (injects its own markup into .chedilex-footer-container)
    const chedilexScript = document.createElement("script");
    chedilexScript.src =
      "https://cdn.jsdelivr.net/gh/chedilex/chedilex-assets-footer@main/footer.js?v=1.0.2";
    document.body.appendChild(chedilexScript);
  }
})();
