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
  const { logout, currentUser } = useAuthActions();
  const { notifyInfo } = useNotify();
  const cUser = currentUser();

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
                <UserAvatar user={cUser.user} />
                <div className="User__Meta">
                  <span className="User__Name">{cUser?.user?.fullName}</span>
                  <span
                    className={`User__Type tag ${global.config.user.typeTagColorFor(
                      cUser?.user?.type
                    )}`}
                  >
                    {cUser?.user?.type}
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
