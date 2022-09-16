import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports.js";
import MovieTable from "./movieTable";
import Pagination from "./common/pagination";
import {
  getAllMovies,
  getMoviesCount,
  deleteMovie,
} from "../actions/movieAction";
import ListGroup from "./common/listGroup";
import { getAllGenres } from "../actions/genreAction";
import { ReactDOM } from "react-dom/client";

const Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(2);
  const [pageSize, setPageSize] = useState(3);
  const [title, setTitle] = useState("");
  const [totalMovies, setTotalMovies] = useState(10);
  const [genreName, setGenreName] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: 1 });

  const movies = useSelector((state) => state.movieReducer.movies);
  const genres = useSelector((state) => state.genreReducer.genres);
  const totalNumberOfMovies = useSelector(
    (state) => state.movieReducer.totalNumberOfMovies
  );
  console.log(totalNumberOfMovies);

  useEffect(() => {
    dispatch(getMoviesCount(title, genreName, navigate));
  }, [movies]);

  useEffect(() => {
    dispatch(getAllGenres());
    let genre = "";
    if (genreName !== "All Genres") {
      genre = genreName;
    }
    dispatch(
      getAllMovies(
        { currentPage, pageSize, title, genreName: genre, sortColumn },
        navigate
      )
    );
  }, []);

  const handleDelete = (id, navigate) => {
    setCurrentPage(1);
    dispatch(deleteMovie(id, navigate));
  };

  const handlePageChange = (page) => {
    let genre = "";
    if (genreName !== "All Genres") {
      genre = genreName;
    }
    setCurrentPage(page);

    dispatch(
      getAllMovies(
        { currentPage: page, pageSize, title, genreName: genre, sortColumn },
        navigate
      )
    );
  };

  const handleTitleChange = (event) => {
    const { value } = event.target;
    let genre = "";
    if (genreName !== "All Genres") {
      genre = genreName;
    }
    setTitle(value);
    dispatch(
      getAllMovies(
        { currentPage, pageSize, title: value, genreName: genre, sortColumn },
        navigate
      )
    );
  };
  const handleSort = (sortColumn) => {
    let genre = "";
    if (genreName !== "All Genres") {
      genre = genreName;
    }
    setSortColumn(sortColumn);

    console.log("sorting", sortColumn);
    dispatch(
      getAllMovies(
        { currentPage, pageSize, title, genreName: genre, sortColumn },
        navigate
      )
    );
  };

  const handleGenreSelection = (genre) => {
    if (genre === "All Genres") {
      genre = "";
    }
    setGenreName(genre);
    dispatch(
      getAllMovies(
        { currentPage, pageSize, title, genreName: genre, sortColumn },
        navigate
      )
    );
  };

  // const [movies, setMovies] = useState(getMovies());
  // console.log("movies" + movies);
  // let handleDelete = (movieId) => {
  //   const newMovies = movies.filter((m) => m._id !== movieId);
  //   setMovies(newMovies);
  console.log(movies);

  return (
    <div>
      <h2>Movies</h2>)
      <div className="row">
        <div className="col-3">
          <Link to="/movies/new" className="btn btn-primary btn-sm m-2">
            Add Movie
          </Link>
          <ListGroup
            listItems={[{ _id: "", name: "All Genres" }, ...genres]}
            onItemSelection={handleGenreSelection}
            selectedItem={genreName}
          />
        </div>
        <div className="col">
          {movies && movies.length > 0 ? (
            <React.Fragment>
              <input type="text" onChange={handleTitleChange}></input>
              <MovieTable
                movies={movies}
                onSort={handleSort}
                sortColumn={sortColumn}
                onDelete={handleDelete}
              />
            </React.Fragment>
          ) : (
            <p>No MOvies Found In the Database</p>
          )}
          <Pagination
            itemsCount={totalNumberOfMovies}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
export default Movies;
