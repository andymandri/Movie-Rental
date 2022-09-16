import * as actions from "../actions/actionTypes";

let customerReducer = (state = { customers: [] }, action) => {
  switch (action.type) {
    case actions.GET_ALL_CUSTOMERS:
      return { customers: action.payload.customers };

    case actions.DELETE_CUSTOMER:
      let newCustomers = state.customers.filter(
        (customer) => customer._id !== action.payload.customer._id
      );
      return { customers: newCustomers };

    case actions.ADD_CUSTOMER:
      return { customers: [...state.customers, action.payload.customer] };

    case actions.UPDATE_CUSTOMER:
      const index = state.customers.findIndex(
        (customer) => customer._id === action.payload.customer._id
      );
      let updateCustomers = [...state.customers];
      updateCustomers[index] = action.payload.customer;
      return { customers: updateCustomers };
    default:
      return state;
  }
};

export default customerReducer;
