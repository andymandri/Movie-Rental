import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addGenre, updateGenre } from "../actions/genreAction";

const GenreForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genreReducer.genres);
  const schema = yup.object().shape({
    name: yup.string().min(3).max(50).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmitHandler = (data) => {
    console.log(data);
    if (data._id) {
      //update
      dispatch(updateGenre(data, navigate));
      navigate("/genres");
    } else {
      //add

      dispatch(addGenre(data, navigate));
      navigate("/genres");
    }
  };

  useEffect(() => {
    const genreId = params.genreId;
    if (!genreId) return;
    const genre = genres.find((genre) => genre._id === genreId);
    setValue("name", genre.name);
    setValue("_id", genre._id);
  }, []);

  return (
    <div>
      <h2>Genre Form</h2>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="form-control"
            id="name"
          ></input>
          <p>{errors.name?.message}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GenreForm;
