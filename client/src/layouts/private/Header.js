import { Link } from "react-router-dom";

import BrandLogo from "../../assets/edmeda-logo-transparent_170x40.png";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

import useNotify from "../../components/notifications/useNotify";
import "./Header.css";
import UserOptionsNavItem from "../shared/header/UserOptionsNavItem";

export default function AppHeader() {
  const { notifyInfo } = useNotify();

  return (
    <header className="Header Header--private">
      <nav className="AppNav">
        <div className="AppNav__Left">
          <Link
            className="NavItem NavItem--BtnIconOnly no-flicker"
            to="#"
            onClick={(e) =>
              notifyInfo({
                title: "Patience you must have, my young padawan...",
                message: "...for this feature is not yet implemented",
                toastCntId: "appNotificationCnt",
              })
            }
          >
            <BsGrid3X3Gap className="NavItem__Icon appNavIcon " />
          </Link>
        </div>

        <div className="AppNav__Center Brand">
          <Link className="NavItem NavItem--Brand" to="/communities">
            <img
              id="app_logo"
              src={BrandLogo}
              className="BrandLogo"
              alt="Edmeda Logo"
            />
          </Link>
        </div>

        <div className="AppNav__Right">
          <Link
            className="NavItem NavItem--BtnIconOnly NavItem--NewCommunityBtn"
            to="/communities/new"
          >
            <FaPlus className="NavItem__Icon addIcon " />
          </Link>

          <UserOptionsNavItem />
        </div>
      </nav>
    </header>
  );
}
