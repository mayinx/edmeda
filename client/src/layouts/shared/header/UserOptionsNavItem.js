import {
  DropdownMenu,
  DropdownHeader,
  DropdownItem,
} from "../../../components/misc/DropdownMenu";
import UserAvatar from "../../../domain/User/UserAvatar";
import {
  FaSignOutAlt,
  FaUsers,
  FaUserAlt,
  FaRegEdit,
  FaPlus,
} from "react-icons/fa";

import useAuthActions from "../../../components/auth/useAuthActions";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import UserDataService from "../../../services/user";

import "./UserOptionsNavItem.css";

export default function UserOptionsNavItem(props) {
  const { logout, currentUser } = useAuthActions();
  const cUser = currentUser().user;
  const history = useHistory();

  const showUserProfile = (e, communityId, memberId) => {
    history.push(`/communities/${communityId}/members/${memberId}`);
    e.stopPropagation();
    e.preventDefault();
  };

  const editUserProfile = (e, communityId, memberId) => {
    // TODO: Refactor this into a pathes-module - e.g. editCommunitiesMembersPath(communityId, memberId)
    history.push(`/communities/${communityId}/members/${memberId}/edit`);
    e.stopPropagation();
    e.preventDefault();
  };

  const [tenantCommunity, setTenantCommunity] = useState({});

  useEffect(() => {
    UserDataService.tenantCommunity()
      .then((tenantCommunity) => {
        setTenantCommunity(tenantCommunity.data || {});
      })
      .catch((e) => console.log("uah - err: ", e));
  }, []);

  return (
    <DropdownMenu
      caption="Account"
      className="Dropdown--HeaderBarUserOptions"
      toggleIcon={
        <UserAvatar
          user={cUser}
          className="NavItem__Icon userAvatarIcon"
          wrapper={false}
        />
      }
      toggleLinkClassName="NavItem NavItem--BtnIconOnly"
    >
      <DropdownHeader>
        <UserAvatar user={cUser} />
        <div className="User__Meta">
          <span className="User__Name wrapword">{cUser?.fullName}</span>
          <span
            className={`User__Type tag ${global.config.user.typeTagColorFor(
              cUser?.type
            )}`}
          >
            {cUser?.type}
          </span>
        </div>
      </DropdownHeader>

      <DropdownItem
        caption={"My Edmeda Profile"}
        icon={<FaUserAlt />}
        // to="/communities"
        to="#"
        onClick={(e) => showUserProfile(e, tenantCommunity._id, cUser?.id)}
      ></DropdownItem>

      <DropdownItem
        caption={"Edit Profile"}
        icon={<FaRegEdit />}
        // to="/communities"
        to="#"
        onClick={(e) => editUserProfile(e, tenantCommunity._id, cUser?.id)}
      ></DropdownItem>

      <DropdownItem
        caption={"MyCommunities"}
        icon={<FaUsers />}
        to="/communities"
      ></DropdownItem>

      <DropdownItem
        caption={"New Community"}
        icon={<FaPlus />}
        to="/communities/new"
      ></DropdownItem>

      <DropdownItem
        caption={"Logout"}
        icon={<FaSignOutAlt />}
        onClick={logout}
      />
    </DropdownMenu>
  );
}
