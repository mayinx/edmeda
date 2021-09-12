import { Link } from "react-router-dom";
import useAuthActions from "../../../components/auth/useAuthActions";

import BrandLogo from "../../../assets/edmeda-logo-transparent_170x40.png";
// import { BsGrid3X3Gap } from "react-icons/bs";
// import { FaPlus } from "react-icons/fa";
// import { FaUserAlt } from "react-icons/fa";
// import { ImRocket } from "react-icons/im";

// import AuthOptions from "../../../components/auth/AuthOptions";

// import Modal from "../modal/Modal.js";
// import NewCommunityPage from "../../pages/communities/NewCommunityPage.js";
// import EditCommunityPage from "../../pages/communities/EditCommunityPage.js";

import DropdownMenu from "../../../components/misc/DropdownMenu";
import "./Header.css";

// const ADD_ACTION_FORM_ID = "newCommunity";
// const UPDATE_ACTION_FORM_ID = "editCommunity";

export default function Header() {
  const { userLoggedIn, register, login, logout } = useAuthActions();

  return (
    <header className="App__header RegistrationHeader">
      <nav className="AppNav">
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

          {userLoggedIn ? (
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
        </div>
      </nav>
    </header>
  );
}
