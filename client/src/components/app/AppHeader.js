import { Link } from "react-router-dom";
import useAuthActions from "../../components/auth/useAuthActions";
import BrandLogo from "../../assets/edmeda-logo-transparent_170x40.png";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import DropdownMenu from "../../components/misc/DropdownMenu";
import UserAvatar from "../../domain/User/UserAvatar";
import useNotify from "../notifications/useNotify";
import "./AppHeader.css";

export default function AppHeader() {
  const { userLoggedIn, logout, currentUserData } = useAuthActions();
  const { notifyInfo } = useNotify();

  let userTypeTagColor = null;
  switch (currentUserData?.user?.type) {
    case "Student":
      userTypeTagColor = "green";
      break;
    case "Teacher":
      userTypeTagColor = "dark-blue";
      break;
    case "Parent":
      userTypeTagColor = "blue";
      break;
    default:
      userTypeTagColor = "blue";
      break;
  }

  return (
    <header className="App__header">
      <nav className="AppNav">
        <div className="AppNav__Left">
          <Link
            className="NavItem NavItem--BtnIconOnly"
            to="#"
            onClick={(e) =>
              notifyInfo({
                title: "Patience you must have, my young padawan...",
                message: "...for this feature is not yet implemented",
                toastCntId: "appNotificationCnt",
              })
            }
          >
            <BsGrid3X3Gap className="NavItem__Icon appNavIcon" />
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
            className="NavItem NavItem--BtnIconOnly"
            to="../communities/new"
          >
            <FaPlus className="NavItem__Icon addIcon" />
          </Link>

          {/* <div className="NavItem NavItem--UserAvtar"> */}
          <DropdownMenu className="ddMenu ddMenue--UserAvatar">
            <li>
              <Link className="SubNavItem SubNavItem--UserProfileCard" to="#">
                <UserAvatar user={currentUserData.user} />
                <div className="User__Meta">
                  <span className="User__Name">
                    {currentUserData?.user?.fullName}
                  </span>
                  <span className={`User__Type tag ${userTypeTagColor}`}>
                    {currentUserData?.user?.type}
                  </span>
                </div>
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
          {/* </div> */}
        </div>
      </nav>
    </header>
  );
}
