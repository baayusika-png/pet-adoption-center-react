function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const fullname = event.target.fullname.value.trim();
    const phone = event.target.phone.value.trim();
    const email = event.target.email.value.trim();
    const subject = event.target.subject.value.trim();
    const message = event.target.message.value.trim();

    // Check empty fields
    if (
      fullname === "" ||
      phone === "" ||
      email === "" ||
      subject === "" ||
      message === ""
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    // Check email
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Success
    alert("Your message has been sent successfully!");

    // Reset form
    event.target.reset();
  };

  return (
    <div className="contact-form">
      <div className="form-card">
        <h2>Get in Touch</h2>

        <p className="subtitle">
          Our team is standing by to help you with anything you need.
        </p>

        <form id="contactForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input type="text" id="fullname" name="fullname" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>

            <textarea name="message" id="message"></textarea>
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
