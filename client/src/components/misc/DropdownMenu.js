import { useRef } from "react";
import useDetectOutsideClick from "./useDetectOutsideClick";
import "./DropdownMenu.css";
import { Link } from "react-router-dom";

import UserAvatar from "../../domain/User/UserAvatar";

import AuthService from "../../services/auth";

export default function DropdownMenu(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  const currentUser = AuthService.currentUser();
  return (
    <div className={`menu-container ${props.className ?? null}`}>
      <Link
        className="NavItem NavItem--BtnIconOnly menu-trigger"
        onClick={onClick}
        to="#"
      >
        <UserAvatar
          user={currentUser.user}
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
