function ContactForm() {
  return (
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
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" />
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
  );
}

export default ContactForm;
