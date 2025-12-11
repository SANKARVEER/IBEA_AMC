import React from 'react';


function Contact() {
  return (
    <>
     <section id="contact" className="section section-alt">
        <h2>Request an AMC Quote</h2>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Form submitted (connect this to your backend or email).');
          }}
        >
          <div className="form-row">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="tel" name="phone" placeholder="Phone Number" required />
          </div>
          <div className="form-row">
            <input type="email" name="email" placeholder="Email Address" required />
            <input type="text" name="building" placeholder="Building / Location" required />
          </div>
          <div className="form-row">
            <select name="plan" defaultValue="">
              <option value="" disabled>
                Select AMC Plan
              </option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div className="form-row">
            <textarea
              name="message"
              rows="4"
              placeholder="Tell us about your lift (capacity, floors, usage)…"
            />
          </div>
          <button type="submit" className="primary-btn">
            Submit Enquiry
          </button>
        </form>
      </section>
    </>
  );
}

export default  Contact ;
