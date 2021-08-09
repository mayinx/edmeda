import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import AppHeader from "./AppHeader.js";
import HomePage from "../../pages/HomePage.js";
// import AboutPage from "../../pages/AboutPage.js";
import FavsPage from "../../pages/FavsPage.js";
import BooksPage from "../../pages/BooksPage.js";
import BookPage from "../../pages/BookPage.js";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/books/:id" component={BookPage} />
          <Route path="/books" component={BooksPage} />
          {/* <Route path="/about" component={AboutPage} /> */}
          <Route path="/favs" component={FavsPage} />
          <Route path="*">
            <h2>
              404 - Sorry, my friend of horror, but this page could not be
              found!
            </h2>
          </Route>
        </Switch>
      </main>
      <footer>
        <div>Made with love for books by Chris</div>
      </footer>
    </div>
  );
}

export default App;
