import { Route } from "react-router-dom";
import AppHeader from "./AppHeader";
import MyCommunitiesPage from "../../pages/communities/MyCommunitiesPage";
import "./CommunitiesLayout.css";

import Modal from "../../components/modal/Modal.js";
import NewCommunityPage from "../../pages/communities/NewCommunityPage.js";
import EditCommunityPage from "../../pages/communities/EditCommunityPage.js";
import CommunityMembersPage from "../../pages/communities/CommunityMembersPage.js";
import CommunityMemberPage from "../../pages/communities/CommunityMembers/ShowPage.js";
import EditCommunityMemberPage from "../../pages/communities/CommunityMembers/EditPage.js";
import { useState } from "react";
import { useContext } from "react";
import ModalContext from "../../contexts/ModalContext";
import CommunityContext from "../../contexts/CommunityContext";

export default function CommunitiesLayout() {
  const CREATE_ACTION_FORM_ID = "newCommunity";
  const CREATE_ACTION_NEW_MEMBER_FORM_ID = "newCommunityMember";
  const UPDATE_ACTION_FORM_ID = "editCommunity";

  const [currentCommunity, setCurrentCommunity] = useState({});

  const [membersPageBottomBarToggled, toggleMembersPageBottomBar] = useState(
    false
  );
  const [
    communityMembersModalHeader,
    setCommunityMembersModalHeader,
  ] = useState("Community Members (0)");
  // const [communityMemberModalHeader, setCommunityMemberModalHeader] = useState(
  //   "Community Member"
  // );
  const [
    editCommunityMemberModalHeader,
    setEditCommunityMemberModalHeader,
  ] = useState("Edit Community Member");

  const { modalCaption, setModalCaption } = useContext(ModalContext);
  return (
    <>
      <CommunityContext.Provider
        value={{ currentCommunity, setCurrentCommunity }}
      >
        <AppHeader className="CommunitiesHeader" />
        <main className="CommunitiesLayout">
          {/* <Switch> */}
          <Route exact path="/communities" component={MyCommunitiesPage} />
          <Route exact path="/communities/:id/edit">
            <Modal
              modalCaption="Edit Community"
              crudAction="update"
              formId={UPDATE_ACTION_FORM_ID}
              // goBackTo="/communities"
            >
              <EditCommunityPage formId={UPDATE_ACTION_FORM_ID} />
            </Modal>
          </Route>
          <Route exact path="/communities/:id/members">
            <Modal
              // modalCaption={communityMembersModalHeader}
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
                setModalHeader={setCommunityMembersModalHeader}
              />
            </Modal>
          </Route>
          <Route exact path="/communities/:id/members/:memberId">
            <Modal
              modalCaption="Member Profile"
              crudAction="update"
              formId={UPDATE_ACTION_FORM_ID}
            >
              <CommunityMemberPage formId={UPDATE_ACTION_FORM_ID} />
            </Modal>
          </Route>
          <Route exact path="/communities/:id/members/:memberId/edit">
            <Modal
              modalCaption={editCommunityMemberModalHeader}
              crudAction="update"
              formId={UPDATE_ACTION_FORM_ID}
            >
              <EditCommunityMemberPage
                formId={UPDATE_ACTION_FORM_ID}
                setModalHeader={setEditCommunityMemberModalHeader}
              />
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
