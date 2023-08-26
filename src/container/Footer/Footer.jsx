import React, { useState } from 'react';

import "./Footer.scss";
import { images } from "../../constants";
import { Wrapper, MotionWrap } from "../../wrapper";
import { client } from "../../client";


const Footer = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { username, email, message } = formData;


  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {
    setIsLoading(true);

    const contact = {
      _type: "contact",
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
      .then((res) => {
        setIsLoading(false);
        setIsFormSubmitted(true);
      })
      .catch(err => console.log(err))

  }
  return (
    <>
      <h2 className="head-text">Chat With Me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a
            href="mailto:achmadfurqonrachmadie@gmail.com"
            className="p-text">
            achmadfurqonrachmadie@gmail.com
          </a>
        </div>

        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a
            href="tel: +62 813 9232 7330"
            className="p-text">
            +62 813 9232 7330
          </a>
        </div>
      </div>

      {!isFormSubmitted ?
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Your Name"
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Your Email"
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              name="message"
              value={message}
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>{isLoading ? "Sending" : "Send"}</button>
        </div> :
        <div>
          <h3 className="head-text">Thank You for Getting In Touch</h3>
        </div>}
    </>
  )
}

export default Wrapper(
  MotionWrap(Footer, "app__footer"),
  "footer",
  "app__whitebg"
);