import React from "react";
import BookingForm from "./BookingForm";
import "./App.css";

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">Vidhu Turfs</div>
        <ul className="nav-links">
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#booking">Book Now</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Vidhu Turfs</h1>
        <p>Book your turf slots easily and enjoy quality playtime!</p>
        <a href="#booking" className="btn-hero">Book Now</a>
      </section>

      {/* Gallery */}
      <section id="gallery" className="gallery-section">
        <h2>Our Turf Gallery</h2>
        <div className="gallery-grid">
          <img src="/images/gallery1.jpg" alt="Turf 1" />
          <img src="/images/gallery2.jpg" alt="Turf 2" />
          <img src="/images/gallery3.jpg" alt="Turf 3" />
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking">
        <BookingForm />
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About Vidhu Turfs</h2>
        <p>
          Vidhu Turfs is a premium sports facility in Madurai, providing high-quality
          natural and artificial turf for football, cricket, and other sports.
          Our mission is to give players a safe, clean, and enjoyable environment to
          play and practice.
        </p>

        <div className="about-content">
          <div className="about-text">
            <h3>Why Choose Us?</h3>
            <ul>
              <li>High-quality natural/artificial turf maintained regularly</li>
              <li>Available from 9 AM to 9 PM for flexible bookings</li>
              <li>Safe, well-lit, and secure facility for all age groups</li>
              <li>Easy online booking with instant confirmation</li>
              <li>Friendly staff to assist you during your visit</li>
            </ul>
          </div>
          <div className="about-image">
           
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer / Contact Section */}
<footer id="contact" className="footer">
  <h3>Contact & Support</h3>
  <div className="contact-table">
    <div className="contact-row">
      <div className="contact-role">Owner:</div>
      <div className="contact-name">Darin Vidhu</div>
      <div className="contact-phone">+91 98765 43210</div>
      <div className="contact-email">owner@vidhuturfs.com</div>
    </div>
    <div className="contact-row">
      <div className="contact-role">Technical Support:</div>
      <div className="contact-name">Soundar</div>
      <div className="contact-phone">+91 91234 56789</div>
      <div className="contact-email">support@vidhuturfs.com</div>
    </div>
    <div className="contact-row">
      <div className="contact-role">Technical Assistance:</div>
      <div className="contact-name">Boobalan</div>
      <div className="contact-phone">+91 92345 67890</div>
      <div className="contact-email">tech@vidhuturfs.com</div>
    </div>
  </div>
  <p>© 2025 Vidhu Turfs. All Rights Reserved.</p>
  </footer>

    </div>
  );
}

export default App;
