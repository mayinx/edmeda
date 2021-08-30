import { Link } from "react-router-dom";
import useAuthActions from "../../../components/auth/useAuthActions";

// import BrandLogo from "../../assets/2973980108_ed69085414_o.jpg";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { ImRocket } from "react-icons/im";

import AuthOptions from "../../../components/auth/AuthOptions";

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
        <div className="AppNav__Left">
          {/* <img id="app_logo" src={BrandLogo} className="BrandLogo" alt=""></img> */}

          <Link class="NavItem NavItem--BtnIconOnly" to="#">
            <BsGrid3X3Gap className="NavItem__Icon appNavIcon" />
          </Link>
        </div>

        <div className="AppNav__Center">
          <Link class="NavItem NavItem--Link" to="#">
            <span className="NavItem__Caption">Features</span>
          </Link>
          <Link class="NavItem NavItem--Link" to="#">
            <span className="NavItem__Caption">Use Cases</span>
          </Link>
          <Link class="NavItem NavItem--Link" to="#">
            <span className="NavItem__Caption">Praise</span>
          </Link>
          <Link class="NavItem NavItem--Link" to="#">
            <span className="NavItem__Caption">Plans</span>
          </Link>
          <Link class="NavItem NavItem--Link" to="#">
            <span className="NavItem__Caption">FAQ</span>
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
                  <Link class="SubNavItem" to="#">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link class="SubNavItem" to="#" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                class="NavItem NavItem--Btn NavItem--LoginBtn"
                to="#"
                onClick={login}
              >
                <span className="NavItem__Caption">Login</span>
              </Link>

              <Link
                class="NavItem NavItem--Btn NavItem--SignUpBtn"
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
