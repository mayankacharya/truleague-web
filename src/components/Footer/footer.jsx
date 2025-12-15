import React from 'react';
import './footer.css';

const Footer = () => (
  <footer className="footer-outer">
    <div className="footer-bg">
      <div className="footer-inner">

        {/* TOP ROW */}
        <div className="footer-top">

          {/* LEFT SECTION */}
          <div className="footer-left">
            <div className="footer-logo-icon">🎓</div>

            <p className="footer-title">TruLeague</p>

            <nav className="footer-nav-links-left">
              {[
                'Home',
                'Our Solution',
                'For Students',
                'About Us',
                'Blogs',
                'Contact Us'
              ].map((item) => (
                <a key={item} href="#" className="footer-link">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* RIGHT SECTION */}
          <div className="footer-right">

            {/* CONTACT BLOCK */}
            <div className="contact-block">
              <p className="footer-heading">Contact Us</p>
              <a className="footer-contact-email" href="mailto:support@truleague.com">
                support@truleague.com
              </a>
            </div>

            {/* SOCIAL BLOCK */}
            <div className="social-block">
              <p className="footer-heading footer-heading--social">Connect with Us</p>

              <div className="footer-socials">
                {['X', 'f', 'in', 'ig', 'G', 'YT'].map((s) => (
                  <span key={s} className="social-icon">{s}</span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* DIVIDER */}
        <div className="footer-divider" />

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p className="copyright">©2025 TruLeague. All rights reserved.</p>
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

export default Footer;
