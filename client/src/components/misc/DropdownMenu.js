import { useRef } from "react";
import useDetectOutsideClick from "./useDetectOutsideClick";
import "./DropdownMenu.css";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

export default function DropdownMenu(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div className="menu-container">
      {/* {props.triggerEl} */}
      {/* <button onClick={onClick} className="menu-trigger">
        <span>User</span>
        <img
          src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
          alt="User avatar"
        />
      </button> */}

      <Link
        className="NavItem NavItem--BtnIconOnly menu-trigger"
        onClick={onClick}
        to="#"
      >
        <FaUserAlt className="NavItem__Icon userAvatarIcon" />
      </Link>

      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>
          {/* {props.ddMenuItems} */}
          {props.children}
          {/* <li>
            <a href="/messages">Messages</a>
          </li>
          <li>
            <a href="/trips">Trips</a>
          </li>
          <li>
            <a href="/saved">Saved</a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}
