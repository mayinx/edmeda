import { useRef } from "react";
import useDetectOutsideClick from "./useDetectOutsideClick";
import "./DropdownMenu.css";
import { Link } from "react-router-dom";
// import { FaRegTimesCircle } from "react-icons/fa";

export function DropdownMenu(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const { children, className, caption, toggleLinkClassName } = props;

  const renderDropdowndHeader = children[0].type.name === DropdownHeader.name;
  const ddMenuItems = renderDropdowndHeader ? children.slice(1) : children;

  return (
    <div
      ref={dropdownRef}
      className={`Dropdown ${className ?? null} ${
        isActive ? "Dropdown--active" : "Dropdown--inactive"
      } ${caption ? "Dropdown--with-caption" : ""}`}
    >
      <Link
        className={`Dropdown__Toggler  ${toggleLinkClassName ?? null}`}
        onClick={onClick}
        to={null}
      >
        {props.toggleIcon}
      </Link>

      <nav className={`Dropdown__Menu`}>
        {caption && <div className="DropdownTitleBar">{caption}</div>}
        {renderDropdowndHeader && <>{children[0]}</>}
        <ul className="Dropdown__Items">{ddMenuItems}</ul>
      </nav>
    </div>
  );
}

export function DropdownHeader(props) {
  const { className, to, onClick } = props;

  return (
    <div
      className={`Dropdown__Header ${className ?? null}`}
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
    <li className={`Dropdown__Item ${className ?? null}`}>
      <Link
        className={`Dropdown__ItemLink ${linkClassName ?? null}`}
        to={to ?? null}
        onClick={onClick}
      >
        {/* {props.children} */}
        <span className="Dropdown__ItemIcon">{icon}</span>
        <span className="Dropdown__ItemCaption">{caption}</span>
      </Link>
    </li>
  );
}
