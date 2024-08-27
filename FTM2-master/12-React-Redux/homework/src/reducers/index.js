import {
  ADD_MOVIE_FAVORITE,
  REMOVE_MOVIE_FAVORITE,
  RESET_DETAIL,
  GET_MOVIES,
  GET_MOVIE_DETAIL,
} from "../actions/index.js";
const initialState = {
  moviesFavourites: [],
  moviesLoaded: [],
  movieDetail: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavourites: [...state.moviesFavourites, action.payload],
      };
    case REMOVE_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    case RESET_DETAIL:
      return {
        ...state,
        movieDetail: {},
      };
    case GET_MOVIES:
      return {
        ...state,
        moviesLoaded: action.payload.Search,
      };
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };

    default:
      return state;
  }
}
