import * as actions from "../actions/actionTypes";

let userReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case actions.ADD_USER:
      return { users: [...state.users, action.payload.user] };
    default:
      return state;
  }
};
export default userReducer;
