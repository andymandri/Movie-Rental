import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = process.env.REACT_APP_API_URL + "users";

// export const addUser = (user) => ({
//   type: actions.ADD_USER,
//   payload: {
//     user,
//   },
// });

export const registerUser = (user) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, user)
    .then((response) =>
      dispatch({
        type: actions.ADD_USER,
        payload: { user: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};
