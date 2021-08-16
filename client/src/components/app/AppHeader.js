import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

// import BrandLogo from "../../assets/2973980108_ed69085414_o.jpg";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

import Modal from "../modal/Modal.js";
import NewCommunityPage from "../../pages/community/NewCommunityPage.js";
import EditCommunityPage from "../../pages/community/EditCommunityPage.js";

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

      <Switch>
        <Route
          exact
          path="/communities/new"
          render={() => {
            return (
              <Modal
                modalCaption="New Community"
                crudAction="create"
                formId={ADD_ACTION_FORM_ID}
              >
                <NewCommunityPage formId={ADD_ACTION_FORM_ID} />
              </Modal>
            );
          }}
        />
        <Route
          exact
          path="/communities/edit/:id"
          render={() => {
            return (
              <Modal
                modalCaption="Edit Community"
                crudAction="update"
                formId={UPDATE_ACTION_FORM_ID}
              >
                <EditCommunityPage formId={UPDATE_ACTION_FORM_ID} />
              </Modal>
            );
          }}
        />
      </Switch>
    </header>
  );
}
