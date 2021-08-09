import "./HomePage.css";
import TeaserImage from "../assets/42460be23cc1d9abd1a45a44b16d1a8c.jpg";

export default function HomePage() {
  return (
    <div className="App__Page App__HomePage">
      <h1>Welcome to Bibliophilia - your personal Bookshelf</h1>
      <img src={TeaserImage} className="TeaserImage" />
      <h3>... developed by Chris during the neuefische bootcamp!</h3>
    </div>
  );
}
