import { combineReducers } from "redux";
import genreReducer from "./genreReducer";
import userReducer from "./userReducer";
import movieReducer from "./movieReducer";
import loginReducer from "./loginReducer";
import customerReducer from "./customerReducer";
import rentalReducer from "./rentalReducer";

export default combineReducers({
  genreReducer,
  movieReducer,
  userReducer,
  loginReducer,
  customerReducer,
  rentalReducer,
});
