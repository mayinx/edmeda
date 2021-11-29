import { useRef } from "react";
import useDetectOutsideClick from "../../components/misc/useDetectOutsideClick";
import "./HeaderUserDropdownMenu.css";
import { Link } from "react-router-dom";

import UserAvatar from "../../domain/User/UserAvatar";

import AuthService from "../../services/auth";

export default function HeaderUserDropdownMenu(props) {
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
          className="NavItem__Icon userAvatarIcon"
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
