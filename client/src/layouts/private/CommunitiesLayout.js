import { Route } from "react-router-dom";
import Header from "./Header";
import MyCommunitiesPage from "../../pages/communities/MyCommunitiesPage";
import "./CommunitiesLayout.css";

import Modal from "../../components/modal/Modal.js";
import NewCommunityPage from "../../pages/communities/NewCommunityPage.js";
import EditCommunityPage from "../../pages/communities/EditCommunityPage.js";
import CommunityMembersPage from "../../pages/communities/CommunityMembersPage.js";
import CommunityMemberPage from "../../pages/communities/CommunityMembers/ShowPage.js";
import EditCommunityMemberPage from "../../pages/communities/CommunityMembers/EditPage.js";
import { useState } from "react";

import CommunityContext from "../../contexts/CommunityContext";

export default function CommunitiesLayout() {
  const CREATE_ACTION_FORM_ID = "newCommunity";
  const CREATE_ACTION_NEW_MEMBER_FORM_ID = "newCommunityMember";
  const UPDATE_ACTION_FORM_ID = "editCommunity";

  const [currentCommunity, setCurrentCommunity] = useState({});

  const [membersPageBottomBarToggled, toggleMembersPageBottomBar] = useState(
    false
  );

  return (
    <>
      <CommunityContext.Provider
        value={{ currentCommunity, setCurrentCommunity }}
      >
        <Header className="CommunitiesHeader" />
        <main className="CommunitiesLayout">
          {/* <Switch> */}
          <Route exact path="/communities" component={MyCommunitiesPage} />
          <Route exact path="/communities/:id/edit">
            <Modal
              crudAction="update"
              formId={UPDATE_ACTION_FORM_ID}
              // goBackTo="/communities"
            >
              <EditCommunityPage formId={UPDATE_ACTION_FORM_ID} />
            </Modal>
          </Route>
          <Route exact path="/communities/:id/members">
            <Modal
              crudAction="custom"
              formId={CREATE_ACTION_NEW_MEMBER_FORM_ID}
              // goBackTo="/communities"
              modalFooterActions={
                <button
                  className="btn rounded green newResourceBtn createCommunityMemberBtn"
                  onClick={() =>
                    toggleMembersPageBottomBar(!membersPageBottomBarToggled)
                  }
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
          <Route exact path="/communities/:id/members/:memberId">
            <Modal
              modalCaption="Member Profile"
              crudAction="read"
              // formId={UPDATE_ACTION_FORM_ID}
              showCrudActions={false}
            >
              {/* <CommunityMemberPage formId={UPDATE_ACTION_FORM_ID} /> */}
              <CommunityMemberPage />
            </Modal>
          </Route>
          <Route exact path="/communities/:id/members/:memberId/edit">
            <Modal crudAction="update" formId={UPDATE_ACTION_FORM_ID}>
              <EditCommunityMemberPage formId={UPDATE_ACTION_FORM_ID} />
            </Modal>
          </Route>
          <Route exact path="/communities/new">
            <Modal
              modalCaption="New Community"
              crudAction="create"
              formId={CREATE_ACTION_FORM_ID}
              // goBackTo="/communities"
            >
              <NewCommunityPage formId={CREATE_ACTION_FORM_ID} />
            </Modal>
          </Route>
          {/* </Switch> */}
        </main>
      </CommunityContext.Provider>
    </>
  );
}
