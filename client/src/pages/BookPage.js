import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Book from "../domain/Book/Book";
import axios from "axios";

export default function BookPage() {
  const params = useParams();
  const [resource, setResource] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `/api/books/${params.id}`;
    axios.get(url).then((res) => {
      setResource(res.data);
      setIsLoading(false);
    });
  }, [params.id]);

  return (
    <div className="App__Page App__ResourcePage">
      <h1 className="App__Page__Head">Book Details</h1>
      {isLoading || !resource ? (
        <div className="mt-2 fs-1_5">Holy cow! Can't load that book!</div>
      ) : (
        <Book book={resource} />
      )}
    </div>
  );
}
