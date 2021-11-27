import { useRef } from "react";
import useDetectOutsideClick from "./useDetectOutsideClick";
import "./DropdownMenu.css";
import { Link } from "react-router-dom";

export function DropdownMenu(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    setIsActive(!isActive);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className={`Dropdown ${props.className ?? null}`}>
      <Link
        className={`Dropdown__Toggler  ${props.toggleLinkClassName ?? null}`}
        onClick={onClick}
        to="#"
      >
        {props.toggleIcon}
      </Link>

      <nav
        ref={dropdownRef}
        className={`Dropdown__Menu ${isActive ? "active" : "inactive"}`}
      >
        <ul className="Dropdown__Items">{props.children}</ul>
      </nav>
    </div>
  );
}

export function DropdownItem(props) {
  const { className, linkClassName, to, onClick } = props;

  return (
    <li className={`DropdownItem ${className ?? null}`}>
      <Link
        className={`DropdownItem__Link ${linkClassName ?? null}`}
        to={to ?? "#"}
        onClick={onClick}
      >
        {props.children}
      </Link>
    </li>
  );
}
