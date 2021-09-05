import { Link } from "react-router-dom";
import useAuthActions from "../../components/auth/useAuthActions";
// import BrandLogo from "../../assets/2973980108_ed69085414_o.jpg";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
// import { FaUserAlt } from "react-icons/fa";

// import AuthOptions from "../auth/AuthOptions";

// import Modal from "../modal/Modal.js";
// import NewCommunityPage from "../../pages/communities/NewCommunityPage.js";
// import EditCommunityPage from "../../pages/communities/EditCommunityPage.js";

import DropdownMenu from "../../components/misc/DropdownMenu";
import "./AppHeader.css";
import UserAvatar from "../../domain/User/UserAvatar";
// const ADD_ACTION_FORM_ID = "newCommunity";
// const UPDATE_ACTION_FORM_ID = "editCommunity";

export default function AppHeader() {
  const { userLoggedIn, logout, currentUserData } = useAuthActions();

  return (
    <header className="App__header">
      {/* <img id="app_logo" src={BrandLogo} className="BrandLogo" alt=""></img> */}
      <div className="App__header_item mr-auto">
        <Link to="#">
          <BsGrid3X3Gap className="itemIcon appNavIcon" />
        </Link>
      </div>

      <div className="App__header_item">
        <Link to="../communities/new">
          <FaPlus className="itemIcon addIcon" />
        </Link>
      </div>
      <div className="App__header_item App__header_item--UserAvtar">
        <DropdownMenu>
          <li>
            <Link className="SubNavItem SubNavItem--UserProfileCard" to="#">
              <UserAvatar user={currentUserData.user} />
              <div className="User__Meta">
                <span className="User__Name">
                  {currentUserData?.user?.fullName}
                </span>
                <span className="User__Type">
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
      </div>
    </header>
  );
}
