import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addCustomer, updateCustomer } from "../actions/customerAction";

const CustomerForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customers = useSelector((state) => state.customerReducer.customers);
  const schema = yup.object().shape({
    name: yup.string().min(3).max(50).required(),
    phone: yup.string().min(7).max(10).required(),
    isGold: yup.boolean(),
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
      dispatch(updateCustomer(data, navigate));
      navigate("/customers");
    } else {
      //add
      if (data.isGold == "True") {
        data.isGold = true;
      } else {
        data.isGold = false;
      }
      dispatch(addCustomer(data, navigate));
      navigate("/customers");
    }
  };

  useEffect(() => {
    const customerId = params.customerId;
    if (!customerId) return;
    const customer = customers.find((customer) => customer._id === customerId);
    setValue("name", customer.name);
    setValue("_id", customer._id);
    setValue("phone", customer.phone);
    setValue("isGold", customer.isGold);
  }, []);

  return (
    <div>
      <h2>CUSTOMER FORM </h2>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            NAME
          </label>
          <input
            type="text"
            {...register("name")}
            className="form-control"
            id="Name"
          ></input>
          <p>{errors.Name?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            PHONE
          </label>
          <input
            type="text"
            {...register("phone")}
            className="form-control"
            id="phone"
          ></input>
          <p>{errors.phone?.message}</p>
        </div>
        <div className="mb-3 form-check">
          <label htmlFor="isGold" className="form-check-label">
            Is Gold
          </label>
          <br></br>
          <select name="isGoldOpt" id="isGoldOpt" {...register("isGold")}>
            <option value=""></option>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
          <p>{errors.isGold?.message}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
