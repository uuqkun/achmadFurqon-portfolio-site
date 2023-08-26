import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { Tooltip } from "react-tooltip";

import { Wrapper, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";

const Skills = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const expQuery = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(expQuery)
      .then(data => {
        setExperience(data);
      });

    client.fetch(skillsQuery)
      .then(data => {
        setSkills(data);
      });
  }, [])


  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container app__flex">
        <motion.div
          className="app__skills-list"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="app__skills-exp"
        >
          {experience?.map((experience) => (
            <motion.div
              key={experience.year}
              className="app__skills-exp-item"
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>

              <motion.div className="app__skills-exp-works">
                {experience.works.map(work => (
                  <>
                    <motion.div
                      key={work.name}
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>

                    <Tooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </Tooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </>
  )
}

export default Wrapper(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);