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
        <ul className="Dropdown__Items">{props.children}</ul>
      </nav>
    </div>
  );
}

export function DropdownItem(props) {
  const { icon, caption, className, linkClassName, to, onClick } = props;

  // let itemInner = "";
  // itemInner += icon;
  // itemInner += caption;

  // console.log("yo: ", itemInner);

  return (
    <li className={`DropdownItem ${className ?? null}`}>
      <Link
        className={`DropdownItem__Link ${linkClassName ?? null}`}
        to={to ?? "#"}
        onClick={onClick}
      >
        {/* {props.children} */}

        <span>{icon}</span>
        <span>{caption}</span>
      </Link>
    </li>
  );
}
