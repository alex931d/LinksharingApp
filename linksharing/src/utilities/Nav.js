import { Link } from "react-router-dom";
import "./Nav.css";
import { useState, useEffect } from "react";
import largeLogo from "../images/logo-devlinks-large.svg";
import smallLogo from "../images/logo-devlinks-small.svg";
import linkLogo from "../images/link-solid(1).svg";
import profileLogo from "../images/user-solid.svg";
import { useIsAuthenticated } from "react-auth-kit";
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import { Tooltip } from "antd";
import viewIcon from "../images/eye-solid.svg";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./myProfile/ProfileModal";
import verticalMenuImg from "../images/ellipsis-solid.svg";
function Nav({ toggleMenu, profileInfo, devLinkId }) {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="menu">
      <div className="inner-menu">
        <nav className="center">
          <div className="logo-container">
          <Link to='/'>
            <img src={largeLogo} className="large-logo" alt="logo"></img>
            <img src={smallLogo} className="small-logo" alt="logo"></img>
            </Link>
          </div>

          {isAuthenticated() ? (
            <>
              <ul>
                <li>
                  <Link className="btn look-btn" to="/editor/links">
                    <img src={linkLogo} alt=""></img>
                    <span>links</span>
                  </Link>
                </li>
                <li>
                  <Link className="btn look-btn" to="/editor/profile">
                    <img src={profileLogo} alt=""></img>
                    <span>Profile details</span>
                  </Link>
                </li>
              </ul>
              <div className="last-link-menu">
                <Link className="btn look-btn" to={`/preview/${devLinkId}`}>
                  <img src={viewIcon} alt=""></img>
                  <span>Profile details</span>
                </Link>

                <div className="profile-modal-pic" onClick={toggleMenu}>
                <Tooltip title="open user menu">
                <svg style={{ width: '30px', height: '30px' }} dangerouslySetInnerHTML={{ __html: profileInfo.avatar }} />
                </Tooltip>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="last-link-menu">
                <Link className="btn login-btn" to={`/login`}>
                  <span>login</span>
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Nav;
