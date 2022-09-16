import * as actions from "../actions/actionTypes";

let movieReducer = (state = { movies: [], totalNumberOfMovies: 0 }, action) => {
  switch (action.type) {
    case actions.GET_ALL_MOVIES:
      return { ...state, movies: action.payload.movies };

    case actions.GET_MOVIES_COUNT:
      return {
        ...state,
        totalNumberOfMovies: action.payload.totalNumberOfMovies,
      };
    case actions.DELETE_MOVIE:
      let newMovies = state.movies.filter(
        (movie) => movie._id !== action.payload.movie._id
      );
      return { ...state, movies: newMovies };

    case actions.ADD_MOVIE:
      return { ...state, movies: [...state.movies, action.payload.movie] };

    case actions.UPDATE_MOVIE:
      const index = state.movies.findIndex(
        (movie) => movie._id === action.payload.movie._id
      );
      let updateMovies = [...state.movies];
      updateMovies[index] = action.payload.movie;
      return { ...state, movies: updateMovies };
    default:
      return state;
  }
};
export default movieReducer;
