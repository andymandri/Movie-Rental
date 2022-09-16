import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = process.env.REACT_APP_API_URL + "customers";
export const getAllCustomers = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_CUSTOMERS,
        payload: { customers: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const deleteCustomer = (id, navigate) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.DELETE_CUSTOMER,
        payload: { customer: response.data },
      })
    )
    .catch((err) => navigate("/error"));
};

export const addCustomer = (customer, navigate) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, customer, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.ADD_CUSTOMER,
        payload: { customers: response.data },
      })
    )
    .catch((err) => navigate("/error"));
};

export const updateCustomer = (customer, navigate) => (dispatch, getState) => {
  axios
    .put(apiEndPoint + "/" + customer._id, customer, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.UPDATE_CUSTOMER,
        payload: { customer: response.data },
      })
    )
    .catch((err) => navigate("/error"));
};
