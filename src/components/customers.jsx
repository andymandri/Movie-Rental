import React, { Component } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports.js";
import { Link, NavLink } from "react-router-dom";
import { deleteCustomer, getAllCustomers } from "../actions/customerAction";

const Customers = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerReducer.customers);
  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);
  console.log(customers);

  return (
    <div>
      <h2>Customers</h2>
      <div className="row">
        <div className="col-3">
          <Link to="/customers/new" className="btn btn-primary btn-sm m-2">
            Add Customer
          </Link>
        </div>
        <div className="col">
          {customers && customers.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>isGold</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td>
                      <NavLink to={`/customers/${customer._id}`}>
                        {customer.name}
                      </NavLink>
                    </td>
                    <td>{customer.phone}</td>
                    <td>{customer.isGold ? "true" : "false"}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => dispatch(deleteCustomer(customer._id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No customer found in the database</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
