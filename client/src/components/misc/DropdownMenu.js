import { useRef } from "react";
import useDetectOutsideClick from "./useDetectOutsideClick";
import "./DropdownMenu.css";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import UserAvatar from "../../domain/User/UserAvatar";
import useAuthActions from "../auth/useAuthActions";

export default function DropdownMenu(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  const { currentUserData } = useAuthActions();
  return (
    <div className={`menu-container ${props.className ?? null}`}>
      <Link
        className="NavItem NavItem--BtnIconOnly menu-trigger"
        onClick={onClick}
        to="#"
      >
        <UserAvatar
          user={currentUserData.user}
          avatarClassName="NavItem__Icon userAvatarIcon"
          wrapper={false}
        />
      </Link>

      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>{props.children}</ul>
      </nav>
    </div>
  );
}
