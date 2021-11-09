import { Link } from "react-router-dom";
import useAuthActions from "../../../components/auth/useAuthActions";

import BrandLogo from "../../../assets/edmeda-logo-transparent_170x40.png";

import DropdownMenu from "../../../components/misc/DropdownMenu";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";
import { useEffect, useState } from "react";
// import { Counter } from "./../../../features/counter/Counter";

export default function Header() {
  const { userLoggedIn, register, login, logout } = useAuthActions();

  const [navToggled, setNavToggled] = useState(false);
  const [navToggleStateClass, setNavToggleStateClass] = useState(false);

  const toggleNav = () => {
    setNavToggled(!navToggled);
  };

  useEffect(() => {
    setNavToggleStateClass(navToggled ? "toggled" : null);
  }, [navToggled]);

  return (
    <header className="App__header RegistrationHeader">
      <nav className={`AppNav ${navToggleStateClass}`}>
        <div className="AppNav__Left Brand">
          <Link className="NavItem NavItem--Brand" to="/">
            <img
              id="app_logo"
              src={BrandLogo}
              className="BrandLogo"
              alt="Edmeda Logo"
            />
          </Link>
        </div>
        {/* <Counter /> */}
        <div className="AppNav__Center">
          <Link className="NavItem NavItem--Link" to="#">
            <span className="NavItem__Caption">Features</span>
          </Link>
          <Link className="NavItem NavItem--Link" to="#">
            <span className="NavItem__Caption">Use Cases</span>
          </Link>
          <Link className="NavItem NavItem--Link" to="#">
            <span className="NavItem__Caption">Praise</span>
          </Link>
          <Link className="NavItem NavItem--Link" to="#">
            <span className="NavItem__Caption">Plans</span>
          </Link>
        </div>
        <div className="AppNav__Right">
          {/* <Link class="NavItem NavItem--BtnIconOnly" to="#">
            <FaUserAlt className="NavItem__Icon userAvatarIcon" />
          </Link> */}
          {userLoggedIn() ? (
            <>
              {/* <Link class="NavItem NavItem--BtnIconOnly" to="#">
                <FaUserAlt className="NavItem__Icon userAvatarIcon" />
              </Link> */}

              <DropdownMenu>
                <li>
                  <Link className="SubNavItem" to="#">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="SubNavItem" to="/communities">
                    MyCommunities
                  </Link>
                </li>
                <li>
                  <Link className="SubNavItem" to="#" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                className="NavItem NavItem--Btn NavItem--LoginBtn"
                to="#"
                onClick={login}
              >
                <span className="NavItem__Caption">Login</span>
              </Link>

              <Link
                className="NavItem NavItem--Btn NavItem--SignUpBtn"
                to="#"
                onClick={register}
              >
                <span className="NavItem__Caption">Get Started</span>
              </Link>
            </>
          )}
          <Link
            onClick={toggleNav}
            className="NavItem NavItem--BtnIconOnly NavItem--ToggleNavBtn"
            to="#"
          >
            {navToggled ? (
              <FaTimes className="NavItem__Icon toggleNavIcon" />
            ) : (
              <FaBars className="NavItem__Icon toggleNavIcon" />
            )}
          </Link>
        </div>
      </nav>
      {/* <div className="NavOverlay"></div> */}
    </header>
  );
}
