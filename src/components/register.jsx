import React, { Component } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../actions/userAction";
const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().min(5).max(50).required(),
    email: yup.string().min(5).max(255).required().email(),
    password: yup.string().min(5).max(255).required(),
    isAdmin: yup.boolean(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmitHandler = (data) => {
    console.log(data);
    dispatch(registerUser(data));
    navigate("/login");
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="form-control"
          ></input>
          <p>{errors.name?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="form-control"
          ></input>
          <p>{errors.email?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="form-control"
          ></input>
          <p>{errors.password?.message}</p>
        </div>
        <div className="mb-3 form-check">
          <label htmlFor="isAdmin" className="form-check-label">
            Admin
          </label>
          <input
            type="checkbox"
            id="isAdmin"
            {...register("isAdmin")}
            className="form-check-input"
          ></input>
          <p>{errors.isAdmin?.message}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
