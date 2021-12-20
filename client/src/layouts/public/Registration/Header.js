import { Link } from "react-router-dom";
import useAuthActions from "../../../components/auth/useAuthActions";

import BrandLogo from "../../../assets/edmeda-logo-transparent_170x40.png";

import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";
import { useEffect, useState } from "react";
import UserOptionsNavItem from "../../shared/header/UserOptionsNavItem";
// import { Counter } from "./../../../features/counter/Counter";

export default function Header() {
  const { userLoggedIn, register, login } = useAuthActions();

  const [navToggled, setNavToggled] = useState(false);
  const [navToggleStateClass, setNavToggleStateClass] = useState(false);

  const toggleNav = () => {
    setNavToggled(!navToggled);
  };

  useEffect(() => {
    setNavToggleStateClass(navToggled ? "toggled" : null);
  }, [navToggled]);

  return (
    <header className="Header Header--public">
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
          {userLoggedIn() ? (
            <>
              <UserOptionsNavItem />
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
    </header>
  );
}
