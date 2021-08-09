import BookList from "../domain/Book/BookList.js";

export default function AboutPage() {
  return (
    <div className="App__Page App__FavoriteResourcesPage">
      <h1 className="App__Page__Head">Your Favorite Books</h1>
      <BookList />
    </div>
  );
}
