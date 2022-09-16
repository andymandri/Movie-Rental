import React, { Component } from "react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports.js";

import {
  deleteRental,
  getAllRentals,
  updateRental,
} from "../actions/rentalAction";

const Rentals = () => {
  const dispatch = useDispatch();
  const rentals = useSelector((state) => state.rentalReducer.rentals);
  useEffect(() => {
    dispatch(getAllRentals());
  }, []);

  return (
    <div>
      <h2>Rentals</h2>
      <div className="row">
        <div className="col-3">
          <Link to="/rentals/new" className="btn btn-primary btn-sm m-2">
            ADD RENTAL
          </Link>
        </div>
        <div className="col">
          {rentals && rentals.length > 0 ? (
            <table className="table table-stripped">
              <thead>
                <tr>
                  <th>CUSTOMER NAME</th>
                  <th>CUSTOMER PHONE</th>
                  <th>MOVIE TITLE</th>
                  <th>RENTAL FEE</th>
                  <th>DATE IN</th>
                  <th>DATE OUT</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((rental) => (
                  <tr key={rental._id}>
                    <td>{rental.customer.name}</td>
                    <td>{rental.customer.phone}</td>
                    <td>{rental.movie.title}</td>
                    <td>{rental.rentalFee}</td>
                    <td>{rental.dateIn}</td>
                    <td>{rental.dateOut}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          dispatch(
                            updateRental({
                              _id: rental._id,
                              dateIn: new Date(),
                            })
                          )
                        }
                      >
                        RETURN
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => dispatch(deleteRental(rental._id))}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Rentals Found In the Database</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rentals;
