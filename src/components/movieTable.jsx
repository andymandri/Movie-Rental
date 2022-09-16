import React from "react";

import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { deleteMovie } from "../actions/movieAction";
import TableHeader from "./tableHeaders";

const MovieTable = (props) => {
  const navigate = useNavigate();
  const { movies, onSort, sortColumn, onDelete } = props;
  const dispatch = useDispatch();

  const columns = [
    { path: "title", header: "title" },
    { path: "genre.name", header: "Genre" },
    { path: "numberInStock", header: "Stock" },
    { path: "dailyRentalRate ", header: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];

  return (
    <table className="table table-striped">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>
              <NavLink to={`/movies/${movie._id}`}>{movie.title}</NavLink>
            </td>
            <td>{movie.genre.name}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>{movie.numberInStock}</td>
            <td>
              {movie.liked ? (
                <i className="fa fa-heart"></i>
              ) : (
                <i className="fa fa-heart-o"></i>
              )}
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(movie._id, navigate)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
