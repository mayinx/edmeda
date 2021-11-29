import { useRef, useEffect } from "react";
import useDetectOutsideClick from "./useDetectOutsideClick";
import "./DropdownMenu.css";
import { Link } from "react-router-dom";

export function DropdownMenu(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const renderDdMenuHeader =
    props.children[0].type.name === DropdownHeader.name;
  const ddMenuItems = renderDdMenuHeader
    ? props.children.slice(1)
    : props.children;

  return (
    <div ref={dropdownRef} className={`Dropdown ${props.className ?? null}`}>
      <Link
        className={`Dropdown__Toggler  ${props.toggleLinkClassName ?? null}`}
        onClick={onClick}
        to={null}
      >
        {props.toggleIcon}
      </Link>

      <nav
        // ref={dropdownRef}
        id={`Dropdown__Menu_${props.id}`}
        className={`Dropdown__Menu ${isActive ? "active" : "inactive"}`}
      >
        {props.children[0].type.name === DropdownHeader.name && (
          <>{props.children[0]}</>
        )}
        <ul className="Dropdown__Items">{ddMenuItems}</ul>
      </nav>
    </div>
  );
}

export function DropdownHeader(props) {
  const { className, to, onClick } = props;

  return (
    <div
      className={`DropdownHeader ${className ?? null}`}
      to={to}
      onClick={onClick}
    >
      {props.children}
    </div>
  );
}

export function DropdownItem(props) {
  const { icon, caption, className, linkClassName, to, onClick } = props;

  return (
    <li className={`DropdownItem ${className ?? null}`}>
      <Link
        className={`DropdownItem__Link ${linkClassName ?? null}`}
        to={to ?? null}
        onClick={onClick}
      >
        {/* {props.children} */}
        <span>{icon}</span>
        <span>{caption}</span>
      </Link>
    </li>
  );
}
