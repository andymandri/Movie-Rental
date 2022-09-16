import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, updateMovie } from "../actions/movieAction";

const MovieForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movieReducer.movies);
  const genres = useSelector((state) => state.genreReducer.genres);
  const schema = yup.object().shape({
    title: yup.string().min(5).max(255).required(),
    genreId: yup.string().required(),
    dailyRentalRate: yup.number().min(0).max(255).required(),
    numberInStock: yup.number().min(0).max(255).required(),
    liked: yup.boolean().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmitHandler = (data) => {
    console.log(data);
    if (data._id) {
      dispatch(updateMovie(data));
      navigate("/movies");
    } else {
      dispatch(addMovie(data));
      navigate("/movies");
    }
  };

  useEffect(() => {
    const movieId = params.movieId;
    if (!movieId) return;
    const movie = movies.find((movie) => movie._id === movieId);

    setValue("title", movie.title);
    setValue("_id", movie._id);
    setValue("genreId", movie.genre._id);
    setValue("numberInStock", movie.numberInStock);
    setValue("dailyRentalRate", movie.dailyRentalRate);
    setValue("liked", movie.liked);
  }, []);

  return (
    <div>
      <h1>Movie Forms</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="form-control"
            id="title"
          ></input>
          <p>{errors.title?.message}</p>
        </div>
        <div className="mb-">
          <label htmlFor="genreId" className="form-label">
            Genre
          </label>
          <select className="form-select" {...register("genreId")}>
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
          <br></br>
        </div>
        <div className="mb-3">
          <label htmlFor="dailyRentalRate" className="form-label">
            Rental Rate
          </label>
          <input
            type="number"
            id="dailyRentalRate"
            {...register("dailyRentalRate")}
            className="form-control"
          ></input>
          <p>{errors.dailyRentalRate?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="numberInStock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            id="numberInStock"
            {...register("numberInStock")}
            className="form-control"
          ></input>
          <p>{errors.numberInStock?.message}</p>
        </div>
        <div className="mb-3 form-check">
          <label htmlFor="liked" className="form-check-label">
            Like
          </label>
          <input
            type="checkbox"
            id="liked"
            {...register("liked")}
            className="form-check-input"
          ></input>
          <p>{errors.liked?.message}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
