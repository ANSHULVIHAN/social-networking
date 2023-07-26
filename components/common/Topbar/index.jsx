import React, { useState } from "react";
import { BiHomeHeart } from "react-icons/bi";
import InfoIcon from "@mui/icons-material/Info";
import { SiStoryblok } from "react-icons/Si";
import { MdOutlineGirl } from "react-icons/md";
//import { MdBoy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../ProfilePopup";
import LinkedinLogo from "../../../assets/1.png";
import "./index.scss";
import AccountBoxIcon from '@mui/icons-material/AccountBox';


export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const goToRoute = (route) => {
    navigate(route);
    setIsMenuOpen(false); // Close menu when navigating to a different route
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`topbar-main ${isMenuOpen ? "menu-open" : ""}`}>
      {popupVisible && (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      )}

      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />

      {/* Menu icon (three horizontal bars) for mobile */}
      <div className={`menu-icon ${isMenuOpen ? "menu-open" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Icons container for desktop */}
      <div className={`topbar-icons ${isMenuOpen ? "menu-open" : ""}`}>
        <BiHomeHeart size={30} className="react-icons1" onClick={() => goToRoute("/home")} />

        <InfoIcon size={30} className="react-icons1" onClick={() => goToRoute("/About")} />

        <SiStoryblok size={30} className="react-icons1" onClick={() => goToRoute("/Story")} />
        <MdOutlineGirl size={30} className="react-icons1" onClick={() => goToRoute("/Storygirl")} />

        <AccountBoxIcon size={30} className="react-icons1" onClick={() => goToRoute("/profile")} />
      </div>

      {/* Icons container for mobile (hidden by default) */}
      <div className="topbar-icons-mobile">
        <BiHomeHeart size={30} className="react-icons1" onClick={() => goToRoute("/home")} />

        <InfoIcon size={30} className="react-icons1" onClick={() => goToRoute("/About")} />

        <SiStoryblok size={30} className="react-icons1" onClick={() => goToRoute("/Story")} />
        <MdOutlineGirl size={30} className="react-icons1" onClick={() => goToRoute("/Storygirl")} />

        <AccountBoxIcon  size={30} className="react-icons1" onClick={() => goToRoute("/profile")} />
      </div>

      <img className="user-logo" src={currentUser?.imageLink} alt="user" onClick={displayPopup} />
    </div>
  );
}











/*

import React, { useState } from "react";
import { BiHomeHeart } from "react-icons/bi";
import InfoIcon from "@mui/icons-material/Info";
import { SiStoryblok } from "react-icons/Si";
import { MdOutlineGirl } from "react-icons/md";
import { MdBoy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../ProfilePopup";
import LinkedinLogo from "../../../assets/1.png";
import "./index.scss";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const goToRoute = (route) => {
    navigate(route);
    setIsMenuOpen(false); // Close menu when navigating to a different route
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`topbar-main ${isMenuOpen ? "menu-open" : ""}`}>
      {popupVisible && (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      )}

      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />

   
      <div className={`menu-icon ${isMenuOpen ? "menu-open" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

   
      <div className="topbar-icons-mobile">
        <BiHomeHeart size={30} className="react-icons1" onClick={() => goToRoute("/home")} />

        <InfoIcon size={30} className="react-icons1" onClick={() => goToRoute("/About")} />

        <SiStoryblok size={30} className="react-icons1" onClick={() => goToRoute("/Story")} />
        <MdOutlineGirl size={30} className="react-icons1" onClick={() => goToRoute("/Storyboy")} />

        <MdBoy size={30} className="react-icons1" onClick={() => goToRoute("/Storygirl")} />
      </div>


    
    

      <img className="user-logo" src={currentUser?.imageLink} alt="user" onClick={displayPopup} />
    </div>
  );
}










/*
import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../../assets/1.png";
import { BiHomeHeart } from "react-icons/bi";
import InfoIcon from '@mui/icons-material/Info';
import { MdOutlineGirl } from 'react-icons/md';
import { MdBoy } from 'react-icons/md';
import { SiStoryblok } from 'react-icons/Si';
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../ProfilePopup";
import "./index.scss";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  let navigate = useNavigate();

  const goToRoute = (route) => {
    navigate(route);
    setIsSearch(false); // Close search when navigating to a different route
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  useEffect(() => {
    let debounced = setTimeout(() => {

    }, 1000);

    return () => clearTimeout(debounced);
  }, []);

  return (
    <div className="topbar-main">
      
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : null}

      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />

      <div className="react-icons">
        <BiHomeHeart
          size={30}
          className="react-icons1"
          onClick={() => goToRoute("/home")}
        />

        <InfoIcon
          size={30}
          className="react-icons1"
          onClick={() => goToRoute("/About")}
        />

        <SiStoryblok
          size={30}
          className="react-icons1"
          onClick={() => goToRoute("/Story")}
        />
        <MdOutlineGirl
          size={30}
          className="react-icons1"
          onClick={() => goToRoute("/Storyboy")}
        />

        <MdBoy
          size={30}
          className="react-icons1"
          onClick={() => goToRoute("/Storygirl")}
        />
      </div>

      <img
        className="user-logo"
        src={currentUser?.imageLink}
        alt="user"
        onClick={displayPopup}
      />




    </div>
  
  );
}




/*import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../../assets/1.png";
import { BiHomeHeart } from "react-icons/bi";
import InfoIcon from '@mui/icons-material/Info';
import { MdOutlineGirl } from 'react-icons/md';
import { MdBoy } from 'react-icons/md';
import { SiStoryblok } from 'react-icons/Si';
import { useNavigate } from "react-router-dom";
//import { getAllUsers } from "../../../api/FirestoreAPI";
import ProfilePopup from "../ProfilePopup";
import "./index.scss";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  let navigate = useNavigate();

  const goToRoute = (route) => {
    navigate(route);
   // setIsSearch(false); // Close search when navigating to a different route
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };


 

  useEffect(() => {
    let debounced = setTimeout(() => {
     
    }, 1000);

    return () => clearTimeout(debounced);
  }, []);





  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : null}

      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />

      {isSearch ? (
        <div className="search-bar">
      
        </div>
      ) : (
        <div className="react-icons">
          <BiHomeHeart
            size={30}
            className="react-icons1"
            onClick={() => goToRoute("/home")}
          />

          <InfoIcon
            size={30}
            className="react-icons1"
            onClick={() => goToRoute("/About")}
          />

          <SiStoryblok
            size={30}
            className="react-icons1"
            onClick={() => goToRoute("/Story")}
          />
          <MdOutlineGirl
            size={30}
            className="react-icons1"
            onClick={() => goToRoute("/Storyboy")}
          />

          <MdBoy
            size={30}
            className="react-icons1"
            onClick={() => goToRoute("/Storygirl")}
          />
        </div>
      )}

      <img
        className="user-logo"
        src={currentUser?.imageLink}
        alt="user"
        onClick={displayPopup}
      />
   
    </div>
  );
}





/*import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../../assets/1.png";
import {  BiHomeHeart}   from "react-icons/bi";
import InfoIcon from '@mui/icons-material/Info';
import{MdOutlineGirl} from 'react-icons/md';
import{MdBoy} from 'react-icons/md';
import {SiStoryblok} from 'react-icons/Si';

import { useNavigate } from "react-router-dom";

import { getAllUsers } from "../../../api/FirestoreAPI";
import ProfilePopup from "../ProfilePopup";
import "./index.scss";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  
 

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

<img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
      {isSearch ? (
        <SearchUsers
       
        />
      ) : (
        <div className="react-icons">
      
      <BiHomeHeart
            size={30}
            className="react-icons1"
            onClick={() => goToRoute("/home")}
          />

        <InfoIcon 
            size={30}
            className="react-icons1"
            onClick={() => goToRoute("/About")}
          />

          
        <SiStoryblok
            size={30}
            className="react-icons1"
            onClick={() => goToRoute("/Story")}
          />
         <MdOutlineGirl
            size={30}
            className="react-icons1"
            onClick={() => goToRoute("/Storyboy")}
          />

          <MdBoy
            size={30}
            className="react-icons1"
            onClick={() => goToRoute("/Storygirl")}
          />


       
        </div>
      )}
      <img
        className="user-logo"
        src={currentUser?.imageLink}
        alt="user"
        onClick={displayPopup}
      />

 
    </div>
  );
}*/