import { Switch, Route, NavLink } from "react-router-dom";
import BrandLogo from "../../assets/2973980108_ed69085414_o.jpg";

export default function AppHeader() {
  return (
    <header className="App__header">
      <img id="app_logo" src={BrandLogo} className="BrandLogo" alt=""></img>

      <nav className="App__nav">
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
          {/* <li>
              <NavLink className="NavLink" to="/about">
                About
              </NavLink>
            </li> */}
          <li>
            <NavLink className="NavLink" to="/favs">
              Favs
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
