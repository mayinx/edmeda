import { Switch, Route, NavLink } from "react-router-dom";
// import BrandLogo from "../../assets/2973980108_ed69085414_o.jpg";
import { FaBeer } from "react-icons/fa";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

export default function AppHeader() {
  return (
    <header className="App__header">
      {/* <img id="app_logo" src={BrandLogo} className="BrandLogo" alt=""></img> */}
      <div className="App__header_item mr-auto">
        <BsGrid3X3Gap className="itemIcon appNavIcon" />
      </div>

      <div className="App__header_item">
        <FaPlus className="itemIcon addIcon" />
      </div>
      <div className="App__header_item">
        <FaUserAlt className="itemIcon userAvatarIcon" />
      </div>

      {/* <nav className="App__nav">
        <ul>
          <li>
            <NavLink className="NavLink" exact={true} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="NavLink" to="/books">
              Books
            </NavLink>
          </li>
          <li>
            <NavLink className="NavLink" to="/favs">
              Favs
            </NavLink>
          </li>
        </ul>
      </nav> */}
    </header>
  );
}
