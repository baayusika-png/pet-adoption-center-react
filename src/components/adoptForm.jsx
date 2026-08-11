function AdoptForm() {
  return (
    <section className="adopt-form">
      <div className="form-card">
        <h2>Adoption Form</h2>

        <form id="adoptForm">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" />
            </div>

            <div className="form-group">
              <label htmlFor="pet">Preferred Pet</label>
              <select id="pet">
                <option value="">Select a pet</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="rabbit">Rabbit</option>
                <option value="hamster">Hamster</option>
                <option value="guineaPig">Guinea Pig</option>
              </select>
            </div>
          </div>

          <div className="form-group full width">
            <label htmlFor="reason">
              Why would you like to adopt this pet? (Optional)
            </label>
            <textarea id="reason"></textarea>
          </div>

          <div class="question">
            <span>Have you owned a pet before?(Yes/No)</span>
            <div class="options">
              <label>
                <input type="radio" name="ownedPet" /> Yes
              </label>
              <label>
                <input type="radio" name="ownedPet" /> No
              </label>
            </div>
          </div>

          <div class="question">
            <span>Do you currently have any pets?(Yes/No)</span>
            <div class="options">
              <label>
                <input type="radio" name="currentPets" /> Yes
              </label>
              <label>
                <input type="radio" name="currentPets" /> No
              </label>
            </div>
          </div>

          <div class="question">
            <span>Do you have enough space for a pet? (Yes/No)</span>
            <div class="options">
              <label>
                <input type="radio" name="space" /> Yes
              </label>
              <label>
                <input type="radio" name="space" /> No
              </label>
            </div>
          </div>

          <div class="confirm-row">
            <input type="checkbox" id="confirm" />
            <p>
              I confirm that the information provided is accurate and understand
              that submitting this application does not guarantee adoption.
            </p>
          </div>

          <button type="submit" class="submit-btn">
            Submit Application Form
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdoptForm;
