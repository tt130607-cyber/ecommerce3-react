export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ABOUT */}
        <div className="footer-column">
          <h4>About</h4>
          <p>
            В этом магазине вы сможете приобрести новейшую электронику
          </p>
        </div>

        {/* SUPPORT */}
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-column">
          <h4>Newsletter</h4>
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-input"
          />
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>© 2026 TechStore. All rights reserved.</p>
      </div>
    </footer>
  );
}