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
        <div className="contact-form">
          <div className="form-card">
            <h2>Get in Touch</h2>
            <p className="subtitle">
              Our team is standing by to help you with anything you need.
            </p>
            <form id="contactForm">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullname" />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea name="message" id="mesage"></textarea>
              </div>

              <button className="send-btn" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="contact-info">
          <div className="info-box">
            <i class="bx bx-map"></i>
            <div>
              <h3>Address</h3>
              <p>Newroad, Pokhara</p>
              <p>Gandaki Province, Nepal</p>
            </div>
          </div>

          <div class="info-box">
            <i class="bx bx-phone"></i>
            <div>
              <h3>Call us Directly</h3>
              <p>+(977) 983546382</p>
            </div>
          </div>

          <div class="info-box">
            <i class="bx bx-envelope"></i>
            <div>
              <h3>Email Address</h3>
              <p>adoptMe@gmail.com</p>
            </div>
          </div>

          <div class="info-box">
            <i class="bx bx-globe"></i>
            <div>
              <h3>Follow Us</h3>
              <p>adoptMe-pkr</p>
            </div>
          </div>

          <div className="hours-card">
            <div className="hours-title">
              <i class="bx bx-time-five"></i>
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
