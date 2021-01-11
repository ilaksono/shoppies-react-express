
export const AUTH = "AUTHORISE_USER";
export const GET_RESULTS = "GET_SEARCH_RESULTS";
export const GET_DETAILS = "GET_DETAILS_BY_IMDB_ID";
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const UPDATE_LIST = 'UPDATE_NOMINATION_LIST';
export const ERROR = "FETCH_DATA_ERROR";
export const RESET_DETAIL = "RESET_MOVIE_SPECIFIC_DETAILS";
export const appReducer = (state, action) => {
  switch (action.type) {
    case AUTH: {
      return {
        ...state, id: action.id,
        username: action.username,
        noms: action.noms || [],
        error: ''
      };
    }
    case RESET_DETAIL:
      return { ...state, details: {} };
    case LOGIN:
      return {
        ...state,
        id: action.id,
        username: action.username,
        noms: action.noms,
        error: ''
      };
    case GET_RESULTS:
      return {
        ...state, results: action.arr, numRes: action.numRes,
        error: '',
        lastQuery: action.s

      };
    case GET_DETAILS:
      return {
        ...state, lastIMDB: action.id,
        details: {
          ...action.omdb, yt: action.yt,
          count: action.db || 0
        },
        error: ''
      };

    case ERROR:
      return { ...state, error: action.msg };
    case UPDATE_LIST:
      return {
        ...state, noms: action.cpy,
        details: action.json || state.details,
        error: ''
      };
    case LOGOUT:
      return {
        ...state, id: 0, username: '', noms: [],
        error: ''
      };
    default:
      return state;
  }
};
