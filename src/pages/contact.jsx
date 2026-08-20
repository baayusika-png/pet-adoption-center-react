import ContactForm from "../components/contactForm";
import { useEffect, useState } from "react";
import { getAdoptionCenter } from "../services/contactService";

import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaClock,
} from "react-icons/fa";

function Contact() {
  //Store the adoption center information received from the API.
  const [center, setCenter] = useState(null);

  //Fetch adoption center data when the contact page loads
  useEffect(() => {
    getAdoptionCenter()
      .then((data) => {
        //Store the API data in the state
        setCenter(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //Converts time from 24 hour format to 12 hour format
  function formatTime(time) {

    //Return empty string if time is not available
    if (!time) return "";

    //Split time into houe and minute
    const [hour, minute] = time.split(":");

    //Create a Date object to format the time
    const date = new Date();

    //Sets the hour and minute
    date.setHours(hour); 
    date.setMinutes(minute);

    //Return the formatted time
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

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

              <p>{center?.address}</p>

              <p>
                {center?.city}, {center?.state}, {center?.country}
              </p>
            </div>
          </div>

          <div className="info-box">
            <FaPhone />

            <div>
              <h3>Call us Directly</h3>

              <p>{center?.phone}</p>
            </div>
          </div>

          <div className="info-box">
            <FaEnvelope />

            <div>
              <h3>Email Address</h3>

              <p>{center?.email}</p>
            </div>
          </div>

          <div className="info-box">
            <FaGlobe />

            <div>
              <h3>Follow Us</h3>

              <p>{center?.website_url ? center.website_url : "AdoptMe"}</p>
            </div>
          </div>

          <div className="hours-card">
            <div className="hours-title">
              <FaClock />
              Visiting Hours
            </div>

            {center?.visiting_hours?.map((hour) => (
              <div className="hours-row" key={hour.id}>
                <span className="day">{hour.day}</span>

                <span className="time">
                  {hour.is_closed
                    ? "Closed"
                    : `${formatTime(hour.opening_time)} - ${formatTime(
                        hour.closing_time,
                      )}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
