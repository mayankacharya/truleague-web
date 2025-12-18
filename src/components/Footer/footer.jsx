import React, { useEffect, useState } from "react";
import "./footer.css";   // 👈 tumhara existing web css
// import "./footer-mobile.css"; // 👈 mobile ke liye naya

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* =====================
     MOBILE FOOTER (FIGMA)
     ===================== */
  if (isMobile) {
    return (
      <footer className="footer-mobile">
        <div className="footer-mobile-inner">

          {/* TOP CENTER */}
          <div className="mobile-top-center">
            <div className="mobile-logo">🎓</div>
            <div className="mobile-brand">TruLeague</div>
          </div>

          {/* MAIN GRID */}
          <div className="footer-mobile-top">

            {/* LEFT COLUMN */}
            <div className="footer-mobile-left">

              <div className="mobile-section">
                <div className="mobile-heading">Contact Us</div>
                <div className="mobile-email">
                  support@truleague.com
                </div>
              </div>

              <div className="mobile-section">
                <div className="mobile-heading">Connect with Us</div>

                <div className="mobile-socials">
                  {["X", "f", "IG", "G", "YT", "in"].map((i) => (
                    <span key={i} className="mobile-social-icon">
                      {i}
                    </span>
                  ))}
                </div>

                {/* ✅ FIGMA: LEGAL LINKS UNDER SOCIAL ICONS */}
                <div className="mobile-legal-inline">
                  <span>Privacy Policy</span>
                  <span>Terms of Use</span>
                  <span>DPA</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="footer-mobile-right">
              {[
                "Home",
                "Our Solution",
                "For Students",
                "About Us",
                "Blog",
                "Contact Us",
              ].map((item) => (
                <div key={item} className="mobile-link">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="mobile-divider" />

          {/* BOTTOM */}
          <div className="mobile-bottom">
            ©2025 TruLeague. All rights reserved.
          </div>

        </div>
      </footer>
    );
  }




  /* =====================
     WEB FOOTER (AS IT IS)
     ===================== */
  return (
    <footer className="footer-outer">
      <div className="footer-bg">
        <div className="footer-inner">

          <div className="footer-top">

            <div className="footer-left">
              <div className="footer-logo-icon">🎓</div>
              <p className="footer-title">TruLeague</p>

              <nav className="footer-nav-links-left">
                {[
                  "Home",
                  "Our Solution",
                  "For Students",
                  "About Us",
                  "Blogs",
                  "Contact Us",
                ].map((item) => (
                  <a key={item} href="#" className="footer-link">
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="footer-right">
              <div className="contact-block">
                <p className="footer-heading">Contact Us</p>
                <a
                  className="footer-contact-email"
                  href="mailto:support@truleague.com"
                >
                  support@truleague.com
                </a>
              </div>

              <div className="social-block">
                <p className="footer-heading footer-heading--social">
                  Connect with Us
                </p>
                <div className="footer-socials">
                  {["X", "f", "in", "ig", "G", "YT"].map((s) => (
                    <span key={s} className="social-icon">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <p>©2025 TruLeague. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">DPA</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
