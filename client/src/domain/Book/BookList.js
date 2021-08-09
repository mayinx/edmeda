import "./BookList.css";
import { useEffect, useState } from "react";
import Book from "./Book.js";
import { useScrollHandler } from "../../hooks/useScrollHandler.js";
import axios from "axios";

export default function BookList() {
  const pluralize = require("pluralize");

  const [resources, setResources] = useState([]);
  const [resourcesCount, setResourcesCount] = useState(0);
  const [totalPages, setTotalPages] = useState();
  // const [page, setPage] = useState(1);
  const [filterObject, setFilterObject] = useState({
    title: "",
    author: "",
    genre: "",
    isRead: "",
    page: 1,
  });

  const [reloadDataSet, setReloadDataSet] = useState(true);

  // book attributes/filters related states etc.
  const [bookGenres, setBookGenres] = useState([]);
  const [bookAuthors, setBookAuthors] = useState([]);

  // const [apiUrl, setApiUrl] = useState("");
  const apiBaseUri = "/api/books";

  // TOdo: Import that instead
  const sampleBookshelf = [
    {
      title: "The Ringworld Engineers",
      author: "Larry Niven",
      genre: "scifi",
      isRead: true,
    },
    {
      title: "The Ringworld Throne",
      author: "Larry Niven",
      genre: "scifi",
      isRead: true,
    },
    {
      title: "Ringworld's Children",
      author: "Larry Niven",
      genre: "scifi",
      isRead: true,
    },
    {
      title: "The Colour of Magic",
      author: "Terry Pratchett",
      genre: "fantasy",
      isRead: false,
    },
    {
      title: "Mort",
      author: "Terry Pratchett",
      genre: "fantasy",
      isRead: false,
    },
    {
      title: "Guards! Guards!",
      author: "Terry Pratchett",
      genre: "fantasy",
      isRead: false,
    },
    {
      title: "Moving Pictures",
      author: "Terry Pratchett",
      genre: "fantasy",
      isRead: false,
    },
    {
      title: "Night Watch",
      author: "Terry Pratchett",
      genre: "fantasy",
      isRead: false,
    },
    {
      title: "Daemon",
      author: "Daniel Suarez",
      genre: "techno thriller",
      isRead: false,
    },
    {
      title: "Freedom",
      author: "Daniel Suarez",
      genre: "techno thriller",
      isRead: false,
    },
    {
      title: "Kill Decision",
      author: "Daniel Suarez",
      genre: "techno thriller",
      isRead: false,
    },
    {
      title: "Change Agent",
      author: "Daniel Suarez",
      genre: "techno thriller",
      isRead: false,
    },
  ];

  // TODO: Refactor into custom hook 'useApiUrlCompiler' or similar
  function compileApiUri(baseUrl, filterObject) {
    let apiFilterParams = new URLSearchParams({});

    Object.entries(filterObject).forEach((filter) => {
      // console.log("filter", filter);
      if (filter && filter[1]) {
        apiFilterParams.append(filter[0], filter[1]);
      }
    });

    return apiFilterParams.toString()
      ? baseUrl + "/?" + apiFilterParams.toString()
      : baseUrl;
  }

  useEffect(() => {
    axios
      .get(compileApiUri(apiBaseUri, filterObject))
      .then((res) => {
        // console.log("received data:", res.data);

        setResources((prevResources) => {
          if (reloadDataSet) {
            setReloadDataSet(false);
            return res.data?.docs || [];
          } else {
            return [...prevResources, ...(res.data.docs || [])];
          }
        });
        // TODO!
        setTotalPages(res.data?.totalPages || 1);
        setResourcesCount(res.data?.totalDocs || 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filterObject]);

  function loadSampleBookshelf() {
    axios
      .post("/api/books", sampleBookshelf)
      .then(function (response) {
        // console.log(response);
        axios.get(apiBaseUri).then((res) => {
          // console.log("received data:", res.data);

          setResources(() => {
            return res.data?.docs || [];
          });
          // TODO!
          setTotalPages(res.data?.totalPages || 1);
          setResourcesCount(res.data?.totalDocs || 0);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function renderResources() {
    if (Array.isArray(resources) && resources.length) {
      return resources.map((book) => {
        return <Book book={book} as="ListItem" />;
      });
    } else {
      return (
        <div className="CollectionEmpty">
          <h2>Ups - looks like your Bookshelf is empty!</h2>
          <button
            onClick={loadSampleBookshelf}
            className="btn rounded green LoadSampleBookshelfButton"
          >
            No worries: Just preload it with some good stuff!
          </button>
        </div>
      );
    }
  }

  function handleLoadMore() {
    if (filterObject.page < totalPages) {
      setFilterObject({ ...filterObject, page: filterObject.page + 1 });
    }
  }

  useEffect(() => {
    axios.get("api/books/genres").then((res) => {
      setBookGenres(() => {
        return res.data || [];
      });
    });

    axios.get("api/books/authors").then((res) => {
      setBookAuthors(() => {
        return res.data || [];
      });
    });
  }, []); // TODO: introduce a 'resourceUpdated'-boolean as dependency here?!

  // function renderBookGenresOptionsForSelect() {
  //   return bookGenres.map((genre) => {
  //     return <option value={genre}>{genre}</option>;
  //   });
  // }

  // TODO: custom hook?
  function renderBookFilterOptionsForSelect(ary) {
    return ary.map((el) => {
      return <option value={el}>{el}</option>;
    });
  }

  // Custom Hook to determine if the filer bar should be sticky or not
  // const scroll = useScrollHandler(50, document.querySelector("main"));
  const scroll = useScrollHandler(
    50,
    "scrollTop",
    document.querySelector("main")
  );

  const filterBarClass = `ResourcesList__FilterBar BooksList__FilterBar ${
    scroll && "FilterBarSticky"
  }`;

  // uh - ah
  function handleFilterInputChange(e) {
    // console.log("fired filter + val:", e.target.name, e.target.value);
    setFilterObject({
      ...filterObject,
      [e.target.name]: e.target.value,
      page: 1,
    });

    setReloadDataSet(true);
  }

  // TODO: Extract ResourcesFilterBar-Component
  return (
    <section className="ResourcesList BookList">
      <div className={filterBarClass}>
        <div>
          <select
            id="is-read-filter"
            className="book-filter form-control"
            name="isRead"
            onChange={handleFilterInputChange}
          >
            <option select value="">
              -- all statuses --
            </option>
            <option value="true">Read</option>
            <option value="false">Unread</option>
          </select>

          <select
            id="genre-filter"
            className="book-filter form-control"
            name="genre"
            onChange={handleFilterInputChange}
          >
            <option select value="">
              -- all genre --
            </option>
            {renderBookFilterOptionsForSelect(bookGenres)}
          </select>

          <select
            id="author-filter"
            className="book-filter form-control"
            name="author"
            onChange={handleFilterInputChange}
          >
            <option select value="">
              -- all authors --
            </option>
            {renderBookFilterOptionsForSelect(bookAuthors)}
          </select>
        </div>
        <div className="ListItemsCount">
          {pluralize("Book", Number(resourcesCount), true)}
        </div>
        <input
          id="title-filter"
          type="text"
          className="book-filter form-control"
          name="title"
          placeholder="Book title"
          onChange={handleFilterInputChange}
        />
      </div>
      <div className="ResourcesList__Items BooksList__Items">
        {renderResources()}
      </div>
      {filterObject.page < totalPages && (
        <button
          className="BooksList__LoadMoreButton btn green rounded"
          onClick={handleLoadMore}
        >
          Load more Books!
        </button>
      )}
    </section>
  );
}
