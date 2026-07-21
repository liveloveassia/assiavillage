const header = document.getElementById("header");
if (header) {
  header.innerHTML = `
        <div class="container header-container">
            <div class="logo"><span>Live Love</span> Assia <span><sup style="font-size:10px;">Beta</sup></span> </div>
            <div class="menu-toggle" id="menuToggle">
                <i class="fas fa-bars"></i>
            </div>
            <nav id="navMenu">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="index.html#news">News & Announcements</a></li>
                    <li><a href="index.html#about">About</a></li>
                    <li><a href="index.html#areas">Best Areas</a></li>
                    <li><a href="index.html#discover">Discover</a></li>
                    <li><a href="index.html#gallery">More</a></li>
                    <li><div class="gtranslate_wrapper"></div></li>
                </ul>
            </nav>
        </div>
    `;

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
}

const footer = document.getElementById("footer");

if (footer) {
  // 1. Inject the HTML (without the script tag inside)
  footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>Live Love Assia</h3>
                    <p>Promoting the beauty and culture of Assia village in Batroun District, Lebanon.</p>
                    <div class="social-links">
                        <a href="https://instagram.com/liveloveassia"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                
                <div class="footer-column">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="index.html#about">About</a></li>
                        <li><a href="index.html#areas">Best Areas</a></li>
                        <li><a href="index.html#discover">Discover</a></li>
                        <li><a href="index.html#gallery">More</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> Assia Town, Batroun District, Lebanon</li>
                        <li><i class="fas fa-phone"></i><a href="tel:+9616705048"> +961 6 705 048</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="copyright">
                <p>&copy; 2026 Live Love Assia. All Rights Reserved.</p>
                <div style="display: flex; justify-content: flex-start; width: 100%;">
                    <div class="chedilex-footer-container"></div>
                </div>
            </div>
        </div>
    `;

  // 2. Dynamically load the Chedilex script AFTER the HTML is set
  const chedilexScript = document.createElement("script");
  chedilexScript.src =
    "https://cdn.jsdelivr.net/gh/chedilex/chedilex-assets-footer@main/footer.js?v=1.0.2";
  document.body.appendChild(chedilexScript);
}
