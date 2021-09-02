import { Route, Switch } from "react-router-dom";
import AppHeader from "../../components/app/AppHeader";
import MyCommunitiesPage from "../../pages/communities/MyCommunitiesPage";
import "./CommunitiesLayout.css";

import Modal from "../../components/modal/Modal.js";
import NewCommunityPage from "../../pages/communities/NewCommunityPage.js";
import EditCommunityPage from "../../pages/communities/EditCommunityPage.js";
import CommunityMembersPage from "../../pages/communities/CommunityMembersPage.js";
import { useState } from "react";

export default function CommunitiesLayout() {
  const CREATE_ACTION_FORM_ID = "newCommunity";
  const CREATE_ACTION_NEW_MEMBER_FORM_ID = "newCommunityMember";
  const UPDATE_ACTION_FORM_ID = "editCommunity";

  const [membersPageBottomBarToggled, toggleMembersPageBottomBar] = useState(
    false
  );

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
        <Route exact path="/communities/:id/members">
          <Modal
            modalCaption="Community Members"
            crudAction="custom"
            formId={CREATE_ACTION_NEW_MEMBER_FORM_ID}
            goBackTo="/communities"
            modalFooterActions={
              <button
                className="btn rounded green newResourceBtn createCommunityMemberBtn"
                onClick={() => toggleMembersPageBottomBar(true)}
              >
                Add Member
              </button>
            }
          >
            <CommunityMembersPage
              formId={CREATE_ACTION_NEW_MEMBER_FORM_ID}
              toggleBottomBar={toggleMembersPageBottomBar}
              bottomBarToggled={membersPageBottomBarToggled}
            />
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
