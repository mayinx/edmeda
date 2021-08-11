import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import AppHeader from "./AppHeader.js";
// import HomePage from "../../pages/HomePage.js";
// import AboutPage from "../../pages/AboutPage.js";
import MyCommunitiesPage from "../../pages/MyCommunitiesPage.js";
import FavsPage from "../../pages/FavsPage.js";
import BooksPage from "../../pages/BooksPage.js";
import BookPage from "../../pages/BookPage.js";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <Switch>
          <Route exact path="/" component={MyCommunitiesPage} />
          <Route exact path="/communities" component={MyCommunitiesPage} />
          <Route path="/books/:id" component={BookPage} />
          <Route path="/books" component={BooksPage} />
          {/* <Route path="/about" component={AboutPage} /> */}
          <Route path="/favs" component={FavsPage} />
          <Route path="*">
            <h2>404 - Sorry, but this page could not be found!</h2>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
