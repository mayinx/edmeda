import {
  DropdownMenu,
  DropdownHeader,
  DropdownItem,
} from "../../../components/misc/DropdownMenu";
import UserAvatar from "../../../domain/User/UserAvatar";
import { FaSignOutAlt, FaUsers, FaUserAlt } from "react-icons/fa";
import useAuthActions from "../../../components/auth/useAuthActions";

export default function UserOptionsNavItem(props) {
  const { logout, currentUser } = useAuthActions();
  const cUser = currentUser();

  return (
    <DropdownMenu
      id="userDd"
      className="ddMenu--UserAvatar"
      toggleIcon={
        <UserAvatar
          user={cUser.user}
          className="NavItem__Icon userAvatarIcon"
          wrapper={false}
        />
      }
      toggleLinkClassName="NavItem NavItem--BtnIconOnly"
    >
      <DropdownHeader>
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
      </DropdownHeader>

      <DropdownItem
        caption={"My Edmeda Profile"}
        icon={<FaUserAlt />}
        to="/communities"
      ></DropdownItem>

      <DropdownItem
        caption={"MyCommunities"}
        icon={<FaUsers />}
        to="/communities"
      ></DropdownItem>

      <DropdownItem
        caption={"Logout"}
        icon={<FaSignOutAlt />}
        onClick={logout}
      />
    </DropdownMenu>
  );
}
