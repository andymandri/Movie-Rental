import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = process.env.REACT_APP_API_URL + "movies";

export const getMoviesCount = (title, genreName, navigate) => (dispatch) => {
  //http://localhost:500/api/movies/count?title=mera// working api
  axios
    .get(apiEndPoint + "/count?title=" + title + "&genreName=" + genreName)
    .then((response) =>
      dispatch({
        type: actions.GET_MOVIES_COUNT,
        payload: { totalNumberOfMovies: response.data.totalNumberOfMovies },
      })
    )
    .catch((err) => {
      console.log(err);
      navigate("/error");
    });
};

// export const getAllMovies = () => (dispatch) => {
//   axios
//     .get(apiEndPoint)
//     .then((response) =>
//       dispatch({
//         type: actions.GET_ALL_MOVIES,
//         payload: { movies: response.data },
//       })
//     )
//     .catch((err) => console.log(err.message));
// };

export const getAllMovies = (data, navigate) => (dispatch) => {
  axios
    .post(apiEndPoint + "/pfs", data)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_MOVIES,
        payload: { movies: response.data },
      })
    )
    .catch(() => navigate("/error"));
};

export const deleteMovie = (id, navigate) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then(() => {
      let data = {
        currentPage: 1,
        pageSize: 5,
        genreName: "",
        title: "",
        sortColumn: { path: "title", order: 1 },
      };
      return axios.post(apiEndPoint + "/pfs", data);
    })
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_MOVIES,
        payload: { movies: response.data },
      })
    )
    .catch((err) => {
      console.log(err.message);
      navigate("/error");
    });
};

// export const addMovie = (movie) => (dispatch, getState) => {
//   axios
//     .post(apiEndPoint, movie, {
//       headers: { "x-auth-token": getState().loginReducer.token },
//     })
//     .then(() =>{
//     let data ={currentPage:1,pageSize:5,genreName:"",title:"",sortColumn:{path:"title",order:1}
//     axios.post(apiEndPoints+"pfs",data)
//     };
//     )
//     .catch((err) => console.log(err.message));
// };

export const addMovie = (movie, navigate) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, movie, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then(() => {
      let data = {
        currentPage: 1,
        pageSize: 5,
        genreName: "",
        title: "",
        sortColumn: { path: "title", order: 1 },
      };
      return axios.post(apiEndPoint + "/pfs", data);
    })
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_MOVIES,
        payload: { movies: response.data },
      })
    )
    .catch((err) => {
      console.log(err.message);
      navigate("/error");
    });
};

export const updateMovie = (movie) => (dispatch, getState) => {
  axios
    .put(apiEndPoint + "/" + movie._id, movie, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.UPDATE_MOVIE,
        payload: { movie: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};
