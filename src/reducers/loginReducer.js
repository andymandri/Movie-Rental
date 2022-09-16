import * as actions from "../actions/actionTypes";

let loginReducer = (state = { token: "" }, action) => {
  switch (action.type) {
    case actions.LOGIN_USER:
      console.log(action.payload.token);
      return { token: action.payload.token };
    default:
      return state;
  }
};
export default loginReducer;
