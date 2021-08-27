import { Link, Route, Switch } from "react-router-dom";

// import BrandLogo from "../../assets/2973980108_ed69085414_o.jpg";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

// import Modal from "../modal/Modal.js";
// import NewCommunityPage from "../../pages/communities/NewCommunityPage.js";
// import EditCommunityPage from "../../pages/communities/EditCommunityPage.js";

const ADD_ACTION_FORM_ID = "newCommunity";
const UPDATE_ACTION_FORM_ID = "editCommunity";

export default function AppHeader() {
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
      <div className="App__header_item">
        <Link to="#">
          <FaUserAlt className="itemIcon userAvatarIcon" />
        </Link>
      </div>
    </header>
  );
}
