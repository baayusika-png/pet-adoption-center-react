import ContactForm from "../components/contactForm";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaClock,
} from "react-icons/fa";

function Contact() {
  return (
    <>
      <section className="contact-hero">
        <span className="contact-badge">Get In Touch</span>
        <h2>We'd Love to Hear From You</h2>
        <p>
          Whether you are looking to adopt, volunteer or just have question
          regard adoption our team is here to help you every step of the way.
        </p>
      </section>

      <section className="contact-section">
        <ContactForm />

        <div className="contact-info">
          <div className="info-box">
             <FaMapMarkerAlt />
            <div>
              <h3>Address</h3>
              <p>Newroad, Pokhara</p>
              <p>Gandaki Province, Nepal</p>
            </div>
          </div>

          <div class="info-box">
            <FaPhone />
            <div>
              <h3>Call us Directly</h3>
              <p>+(977) 983546382</p>
            </div>
          </div>

          <div class="info-box">
              <FaEnvelope />
            <div>
              <h3>Email Address</h3>
              <p>adoptMe@gmail.com</p>
            </div>
          </div>

          <div class="info-box">
            <FaGlobe />
            <div>
              <h3>Follow Us</h3>
              <p>adoptMe-pkr</p>
            </div>
          </div>

          <div className="hours-card">
            <div className="hours-title">
                <FaClock />
              Visiting Hours
            </div>

            <div className="hours-row">
              <span class="day">Monday - Friday</span>
              <span class="time">9:00 AM - 6:00 PM</span>
            </div>

            <div class="hours-row">
              <span class="day">Saturday</span>
              <span class="time">10:00 AM - 4:00 PM</span>
            </div>
            <div class="hours-row">
              <span class="day">Sunday</span>
              <span class="time">Closed</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
