import * as actions from "../actions/actionTypes";

let rentalReducer = (state = { rentals: [] }, action) => {
  switch (action.type) {
    case actions.GET_ALL_RENTALS:
      return { rentals: [...action.payload.rentals] };

    case actions.ADD_RENTAL:
      return { rentals: [...state.rentals, action.payload.rental] };

    case actions.DELETE_RENTAL:
      let newRentals = state.rentals.filter(
        (rental) => rental._id !== action.payload.rental._id
      );
      return { rentals: newRentals };

    case actions.UPDATE_RENTAL:
      const index = state.rentals.findIndex(
        (rental) => rental._id === action.payload.rental._id
      );
      let updateRentals = [...state.rentals];
      updateRentals[index] = action.payload.rental;
      return { rentals: updateRentals };

    default:
      return state;
  }
};

export default rentalReducer;
