import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRental } from "../actions/rentalAction";
import { getAllCustomers } from "../actions/customerAction";
import { getAllMovies } from "../actions/movieAction";
import { useEffect } from "react";

const RentalForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movieReducer.movies);
  const customers = useSelector((state) => state.customerReducer.customers);
  const schema = yup.object().shape({
    customerId: yup.string().required(),
    movieId: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmitHandler = (data) => {
    console.log(data);
    dispatch(addRental(data));
    navigate("/rentals");
  };
  useEffect(() => {
    dispatch(getAllMovies());
    dispatch(getAllCustomers());
  }, []);

  return (
    <div>
      <h1>Rental Form</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-3">
          <label htmlFor="selectMovie" className="form-label">
            SELECT MOVIE
          </label>
          <select
            className="form-select"
            {...register("movieId")}
            id="selectMovie"
          >
            <option value=""></option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
          <p>{errors.movieId?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="selectCustomer" className="form-label">
            SELECT CUSTOMER
          </label>
          <select
            className="form-select"
            {...register("customerId")}
            id="selectCustomer"
          >
            <option value=""></option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </select>
          <p>{errors.customerId?.message}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RentalForm;
