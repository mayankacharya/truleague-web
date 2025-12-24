import React, { useEffect, useState } from "react";
import "./footer.css";
import footerLogo from "../../assets/OnlySVG/footer-logo.svg";
import emailIcon from "../../assets/OnlySVG/email.svg";

import twitterIcon from "../../assets/OnlySVG/twitor.svg";
import facebookIcon from "../../assets/OnlySVG/facebook.svg";
import instagramIcon from "../../assets/OnlySVG/insta1.svg";
import googleIcon from "../../assets/OnlySVG/google.svg";
import youtubeIcon from "../../assets/OnlySVG/youtube.svg";
import linkedinIcon from "../../assets/OnlySVG/linkdin.svg";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* =====================
     MOBILE FOOTER
     ===================== */
  if (isMobile) {
    return (
      <footer className="footer-mobile">
        <div className="footer-mobile-inner">

          <div className="mobile-top-center">
            <div className="mobile-logo">
              <img
                src={footerLogo}
                alt="TruLeague Logo"
                className="mobile-footer-logo"
              />
            </div>
          </div>

          <div className="footer-mobile-top">
            <div className="footer-mobile-left">
              <div className="mobile-section">
                <div className="mobile-heading">Contact Us</div>
                <div className="mobile-email">support@truleague.com</div>
              </div>

              <div className="mobile-section">
                <div className="mobile-heading">Connect with Us</div>

                <div className="mobile-socials">
                  {[twitterIcon, facebookIcon, instagramIcon, googleIcon, youtubeIcon, linkedinIcon].map(
                    (icon, i) => (
                      <img
                        key={i}
                        src={icon}
                        alt="social"
                        className="mobile-social-icon-img"
                      />
                    )
                  )}
                </div>

                <div className="mobile-legal-inline">
                  <span>Privacy Policy</span>
                  <span>Terms of Use</span>
                  <span>DPA</span>
                </div>
              </div>
            </div>

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

          <div className="mobile-divider" />

          <div className="mobile-bottom">
            ©2025 TruLeague. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }

  /* =====================
     WEB FOOTER
     ===================== */
  return (
    <footer className="footer-outer">
      <div className="footer-bg">
        <div className="footer-inner">

          <div className="footer-top">
            <div className="footer-left">
              <div className="footer-logo">
                <img
                  src={footerLogo}
                  alt="TruLeague Logo"
                  className="footer-logo-img"
                />
              </div>

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
                  <img src={emailIcon} alt="Email" className="email-icon" />
                  <span>support@truleague.com</span>
                </a>
              </div>

              {/* ✅ UPDATED SOCIAL BLOCK (SVG ICONS) */}
              <div className="social-block">
                <p className="footer-heading footer-heading--social">
                  Connect with Us
                </p>

                <div className="footer-socials">
                  {[
                    twitterIcon,
                    facebookIcon,
                    instagramIcon,
                    googleIcon,
                    youtubeIcon,
                    linkedinIcon,
                  ].map((icon, index) => (
                    <img
                      key={index}
                      src={icon}
                      alt="social"
                      className="social-icon-img"
                    />
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
