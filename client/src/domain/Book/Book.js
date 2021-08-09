import "./Book.css";
import { Link } from "react-router-dom";

import BookFallbackCover from "../../assets/The_Colour_of_Magic_(cover_art).jpg";

// TODO: Move that beauty here somewhere generic - dunno: 'src/Utils' f.i. - or iplemen it as useConditionalWrapper-custom hook or whatnot?
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default function Book({ book, as }) {
  const renderAsListItem = as && as === "ListItem";
  const bookCoverImgSrc = book?.cover ? book?.cover : BookFallbackCover;

  return (
    <section
      className={`Resource Book Book--${book.isRead ? "read" : "unread"} ${
        renderAsListItem && "Resource__ListItem Book__ListItem"
      }`}
      key={book.id}
      id={book.id}
    >
      <ConditionalWrapper
        condition={renderAsListItem}
        wrapper={(children) => (
          <Link to={`/books/${book._id}`}>{children}</Link>
        )}
      >
        <p className="Book__Cover-wrapper">
          <img src={bookCoverImgSrc} className="Book__Cover" alt="" />
        </p>
        <div className="book__meta">
          <h2>{book.title}</h2>

          <div>Author: {book.author}</div>
          <div>Genre: {book.genre}</div>
          {!renderAsListItem && (
            <div>
              Read:{" "}
              {book.isRead
                ? "Yep! Read And Proud!"
                : "Nope - still on my Bucket List!"}
            </div>
          )}
          {!renderAsListItem && <div>Book ID {book._id}</div>}
        </div>
      </ConditionalWrapper>
    </section>
  );
}
