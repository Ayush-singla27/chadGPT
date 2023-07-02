import {React,useContext} from "react";
import "./Sidenav.css";
import { UserContext } from '../contexts/user.context';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark,faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function showMenu() {
  var menu = document.getElementById("navcont");
  console.log(menu);
  menu.style.visibility = "visible";
}

function closeMenu() {
  var menu = document.getElementById("navcont");
  console.log(menu);
  menu.style.visibility = "hidden";
}

function Sidenav({ func }) {
  const { logOutUser } = useContext(UserContext);
  const logOut = async () => {
    await logOutUser();
    window.location.reload(true);
    return;
  }
  return (
    <div> 
      <div className="hamburg" onClick={showMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="sidenav" id="navcont">
        <div className="snCont1 snContent">
          <p>ChadGPT</p>
          <div className="cross" onClick={closeMenu}>
            {/* <i class="fas fa-regular fa-xmark"></i> */}
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="snCont2 snContent">
          <Link to="/">Home</Link>
          <Link to="/camera">interpreter</Link>
          {/* <Link to="/contact">About Us</Link> */}
          <Link to="/details">SpeechGPT</Link>
          {/* <Link to="/help">Help</Link> */}
          {/* <Link to="/about">About Us</Link> */}
          <Link onClick={logOut} to="/">Log Out</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
// my name is aman garg and the value of a+b is equal to the va
