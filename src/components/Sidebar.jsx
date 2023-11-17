import React, { useState } from "react";
import "./Sidebar.css";

import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import "@fortawesome/fontawesome-svg-core/styles.css";


// Import your content components here
import Dashboard from "../components/MainDash/MainDash";
import UserDetails from "../components/User Details/UserDetails";
import AccountCreation from "../components/AccountCreation";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  // Define content components corresponding to each tab
  const contentComponents = [Dashboard, UserDetails, AccountCreation];

  // Render the selected content component based on the 'selected' state
  const SelectedContent = contentComponents[selected];

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        {/* <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div> */}

        {/* Profile Icon and Text */}
        <div className="profile">
        <FontAwesomeIcon icon={faUser} size="2xl" />
  
</div>


        <div className="menu">
          {SidebarData.map((item, index) => (
            <div
              className={
                selected === index ? "menuItem active" : "menuItem"
              }
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          ))}
          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>

      {/* Render the selected content component */}
      <SelectedContent />
    </>
  );
};

export default Sidebar;
