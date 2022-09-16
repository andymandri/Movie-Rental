import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Customers from "./components/customers";
import Genres from "./components/genres";
import Login from "./components/login";
import Error from "./components/error";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Register from "./components/register";
import GenreForm from "./components/genreForm";
import MovieForm from "./components/movieForm";
import CustomerForm from "./components/customerForm";
import RentalForm from "./components/rentalsForm";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Genres />}></Route>
            <Route path="customers" element={<Customers />}></Route>
            <Route path="genres" element={<Genres />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="genres/:genreId" element={<GenreForm />}></Route>
            <Route path="movies/:movieId" element={<MovieForm />}></Route>
            <Route
              path="customers/:customerId"
              element={<CustomerForm />}
            ></Route>
            <Route path="movies" element={<Movies />}></Route>
            <Route path="rentals" element={<Rentals />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="genres/new" element={<GenreForm />}></Route>
            <Route path="movies/new" element={<MovieForm />}></Route>
            <Route path="rentals/new" element={<RentalForm />}></Route>
            <Route path="customers/new" element={<CustomerForm />}></Route>
            <Route path="error" element={<Error />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
