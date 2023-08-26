import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

import "./About.scss";
import { client, urlFor } from "../../client";
import { Wrapper, MotionWrap } from '../../wrapper';


const About = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query)
      .then(data => {
        setAbout(data);
      })
  }, []);


  return (
    <>
      <h2 className="head-text">I Know That <span>Good Development</span><br /> means <span>Good Bussiness</span>
      </h2>

      <div className="app__profiles">
        {about.map((about, index) => (
          <motion.div
            key={about.title + index}
            className="app__profile-item"
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: .25, type: "tween" }}
          >
            <img
              src={urlFor(about.imgUrl)}
              alt={about.title}
            />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
          </motion.div>
        ))}
      </div>

    </>
  )
};

export default Wrapper(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);