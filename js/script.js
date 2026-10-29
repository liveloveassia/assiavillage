/* Live Love Assia — main javascript */

document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // elements
  const preloader = document.getElementById("preloader");
  const progressBar = document.getElementById("loaderProgressBar");
  const percentage = document.getElementById("loaderPercentage");
  const progressContainer = document.querySelector(".loader-progress");

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const siteHeader = document.getElementById("siteHeader");

  const readMoreBtn = document.getElementById("readMoreBtn");
  const additionalContent = document.getElementById("additionalContent");

  // NOTE: backToTop is fetched AFTER we create it (see bottom of file)
  let backToTop = null;
  const currentYear = document.getElementById("currentYear");

  // ===== page loader =====

  if (preloader && progressBar && percentage) {
    body.classList.add("loading");

    let progress = 0;
    let pageLoaded = document.readyState === "complete";
    let loaderFinished = false;

    const updateProgress = (value) => {
      progress = Math.min(100, Math.max(progress, value));

      progressBar.style.width = `${progress}%`;
      percentage.textContent = `${Math.floor(progress)}%`;

      if (progressContainer) {
        progressContainer.setAttribute(
          "aria-valuenow",
          String(Math.floor(progress)),
        );
      }
    };

    const loadingInterval = setInterval(() => {
      if (loaderFinished || pageLoaded) {
        return;
      }

      if (progress < 90) {
        const increment = Math.max(0.3, (90 - progress) * 0.06);
        updateProgress(progress + increment);
      }
    }, 100);

    const finishLoading = () => {
      if (loaderFinished) {
        return;
      }

      pageLoaded = true;
      loaderFinished = true;

      clearInterval(loadingInterval);
      updateProgress(100);

      setTimeout(() => {
        preloader.classList.add("hidden");
        body.classList.remove("loading");

        setTimeout(() => {
          preloader.style.display = "none";
        }, 700);
      }, 300);
    };

    if (pageLoaded) {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, {
        once: true,
      });
    }

    window.addEventListener("pageshow", (event) => {
      if (event.persisted && !loaderFinished) {
        finishLoading();
      }
    });
  }

  // ===== mobile menu =====

  const closeMenu = () => {
    if (!menuToggle || !navMenu) {
      return;
    }

    navMenu.classList.remove("active");
    body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    const icon = menuToggle.querySelector("i");

    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");

      body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );

      const icon = menuToggle.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
      }
    });

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("active") &&
        siteHeader &&
        !siteHeader.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  // ===== smooth scrolling =====

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();
      closeMenu();

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  // ===== scroll reveal =====

  const animatedElements = document.querySelectorAll(
    ".reveal, .area-card, .place-card, .destination-card, .gallery-card, .about-image, .about-text",
  );

  if ("IntersectionObserver" in window) {
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
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    animatedElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    animatedElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // ===== read more / read less =====

  if (readMoreBtn && additionalContent) {
    additionalContent.hidden = true;
    readMoreBtn.setAttribute("aria-expanded", "false");

    const updateReadMoreButton = (isExpanded) => {
      readMoreBtn.innerHTML = isExpanded
        ? 'Read Less <i class="fa-solid fa-arrow-up"></i>'
        : 'Read More <i class="fa-solid fa-arrow-right"></i>';

      readMoreBtn.setAttribute("aria-expanded", String(isExpanded));
    };

    readMoreBtn.addEventListener("click", () => {
      const isExpanded = readMoreBtn.getAttribute("aria-expanded") === "true";

      additionalContent.hidden = isExpanded;

      updateReadMoreButton(!isExpanded);
    });
  }

  // ===== header + back to top on scroll =====

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    if (backToTop) {
      backToTop.classList.toggle("visible", scrollPosition > 500);
    }

    updateActiveNavigation();
  };

  // ===== active nav link =====

  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  const sections = document.querySelectorAll("main section[id]");

  const updateActiveNavigation = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= 150) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href");

      const isActive = targetId === `#${currentSection}`;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  handleScroll();

  // ===== back to top button =====

  // Create the button and add it to the page
  const backToTopBtn = document.createElement("button");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.id = "backToTop";
  backToTopBtn.type = "button";
  backToTopBtn.setAttribute("aria-label", "Back to top");
  backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(backToTopBtn);

  // Now grab the reference and wire it up
  backToTop = backToTopBtn;

  backToTop.addEventListener("click", () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  });

  // Re-run handleScroll so the button shows immediately if the page loads scrolled
  handleScroll();

  // ===== copyright year =====

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
