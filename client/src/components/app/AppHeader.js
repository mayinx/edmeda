import {
  Switch,
  Route,
  NavLink,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import Modal from "../modal/Modal.js";
import NewCommunityModalPage from "../../pages/NewCommunityModalPage.js";

// import BrandLogo from "../../assets/2973980108_ed69085414_o.jpg";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

export default function AppHeader() {
  // const location = useLocation();
  // const history = useHistory();
  const match = useRouteMatch();
  // let match = useRouteMatch("/newCommunity");
  console.log(match.url);
  // console.log(history);

  return (
    <header className="App__header">
      {/* <img id="app_logo" src={BrandLogo} className="BrandLogo" alt=""></img> */}
      <div className="App__header_item mr-auto">
        <BsGrid3X3Gap className="itemIcon appNavIcon" />
      </div>

      <div className="App__header_item">
        <Link to="newCommunity">
          <FaPlus className="itemIcon addIcon" />
        </Link>
      </div>
      <div className="App__header_item">
        <FaUserAlt className="itemIcon userAvatarIcon" />
      </div>
      <Route
        path="/newCommunity"
        render={() => {
          return (
            <Modal modalCaption="NewCommunity">
              <NewCommunityModalPage />
            </Modal>
          );
        }}
      />
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
