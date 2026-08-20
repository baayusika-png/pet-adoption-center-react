function AdoptForm() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const pet = form.pet.value;
    const confirm = form.confirm.checked;

    if (name === "" || email === "" || phone === "" || pet === "") {
      alert("Please fill in all the required fields.");
      return;
    }

    if (!confirm) {
      alert("Please agree to the confirmation before submitting.");
      return;
    }
    alert("Your adoption application has been submitted successfully!");

    form.reset();
  };

  return (
    <section className="adopt-form">
      <div className="form-card">
        <h2>Adoption Form</h2>

        <form id="adoptForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" />
            </div>

            <div className="form-group">
              <label htmlFor="pet">Preferred Pet</label>
              <select id="pet" name="pet">
                <option value="">Select a pet</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="rabbit">Rabbit</option>
                <option value="hamster">Hamster</option>
                <option value="guineaPig">Guinea Pig</option>
                <option value="turtle">Turtle</option>
                <option value="bird">Birds</option>
                <option value="fish">Fish</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="reason">
              Why would you like to adopt this pet? (Optional)
            </label>
            <textarea id="reason" name="reason"></textarea>
          </div>

          <div className="question">
            <span>Have you owned a pet before? (Yes/No)</span>

            <div className="options">
              <label>
                <input type="radio" name="ownedPet" value="yes" />
                Yes
              </label>

              <label>
                <input type="radio" name="ownedPet" value="no" />
                No
              </label>
            </div>
          </div>

          <div className="question">
            <span>Do you currently have any pets? (Yes/No)</span>

            <div className="options">
              <label>
                <input type="radio" name="currentPets" value="yes" />
                Yes
              </label>

              <label>
                <input type="radio" name="currentPets" value="no" />
                No
              </label>
            </div>
          </div>

          <div className="question">
            <span>Do you have enough space for a pet? (Yes/No)</span>

            <div className="options">
              <label>
                <input type="radio" name="space" value="yes" />
                Yes
              </label>

              <label>
                <input type="radio" name="space" value="no" />
                No
              </label>
            </div>
          </div>

          <div className="confirm-row">
            <input type="checkbox" id="confirm" name="confirm" />

            <p>
              I confirm that the information provided is accurate and understand
              that submitting this application does not guarantee adoption.
            </p>
          </div>

          <button type="submit" className="submit-btn">
            Submit Application Form
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdoptForm;
