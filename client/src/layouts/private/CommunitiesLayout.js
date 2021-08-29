import { Route, Switch } from "react-router-dom";
import AppHeader from "../../components/app/AppHeader";
import MyCommunitiesPage from "../../pages/communities/MyCommunitiesPage";
import "./CommunitiesLayout.css";

import Modal from "../../components/modal/Modal.js";
import NewCommunityPage from "../../pages/communities/NewCommunityPage.js";
import EditCommunityPage from "../../pages/communities/EditCommunityPage.js";

export default function CommunitiesLayout() {
  const CREATE_ACTION_FORM_ID = "newCommunity";
  const UPDATE_ACTION_FORM_ID = "editCommunity";

  return (
    <>
      <AppHeader className="CommunitiesHeader" />
      <main className="CommunitiesLayout">
        {/* <Switch> */}

        <Route exact path="/communities" component={MyCommunitiesPage} />
        <Route exact path="/communities/:id/edit">
          <Modal
            modalCaption="Edit Community"
            crudAction="update"
            formId={UPDATE_ACTION_FORM_ID}
            goBackTo="/communities"
          >
            <EditCommunityPage formId={UPDATE_ACTION_FORM_ID} />
          </Modal>
        </Route>
        <Route exact path="/communities/new">
          <Modal
            modalCaption="New Community"
            crudAction="create"
            formId={CREATE_ACTION_FORM_ID}
            goBackTo="/communities"
          >
            <NewCommunityPage formId={CREATE_ACTION_FORM_ID} />
          </Modal>
        </Route>
        {/* </Switch> */}
      </main>
    </>
  );
}
