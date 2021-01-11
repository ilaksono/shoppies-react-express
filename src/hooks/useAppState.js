import { useReducer, useState } from 'react';
import axios from 'axios';
const AUTH = "AUTHORISE_USER";
const GET_RESULTS = "GET_SEARCH_RESULTS";
const GET_DETAILS = "GET_DETAILS_BY_IMDB_ID";
const LOGOUT = 'LOGOUT';
const LOGIN = 'LOGIN';
const UPDATE_LIST = 'UPDATE_NOMINATION_LIST';
const ERROR = "FETCH_DATA_ERROR";
const RESET_DETAIL = "RESET_MOVIE_SPECIFIC_DETAILS";
const appReducer = (state, action) => {
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
const initApp = {
  id: 0,
  username: '',
  noms: [],
  results: [],
  details: {},
  numRes: 0,
  lastIMDB: '',
  error: '',
  lastQuery: ''
};

const useAppState = () => {

  const [app, dispatch] = useReducer(appReducer, initApp);
  const [ready, setReady] = useState(true);
  const [autoResults, setAutoResults] = useState([]);

  const authoriseReg = async (email, username) => {
    try {
      const data = await axios
        .post('/api/users', { email, username });
      if (data.data) {
        const { username, id } = data.data[0];
        dispatch({
          type: AUTH,
          username,
          id
        });
        return id;
      } else {
        return "Email already in use";
      }
    } catch (er) {
      console.error(er);
      dispatch({ type: ERROR, msg: 'Could not find film' });
    }
  };

  const authoriseLog = async (email) => {
    try {
      const data = await axios
        .post('/api/users', {
          email
        });
      const res = data.data;
      if (res) {
        dispatch({
          type: LOGIN,
          username: res.username,
          noms: res.noms,
          id: res.id
        });
        return { id: Number(res.id), username: res.username };
      } else
        return "Invalid email";
    } catch (er) {
      console.log(er);
    }
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  const loadUser = async (u, i) => {
    try {
      const data = await axios
        .get(`/api/users/${i}`);
      const { username, id } = data.data.user;
      const { noms } = data.data;
      dispatch({
        type: AUTH,
        username,
        id: Number(id),
        noms
      });
    } catch (er) {
      console.log(er);
    }
  };
  const handleNominate = async (Title, Year, imdbID) => {
    await axios
      .post('/api/nominate', {
        user_id: app.id,
        Title,
        Year: Number(Year),
        imdbID
      });

  };
  const removeNomFromList = (imdbID) => {
    const cpy = [...app.noms];
    cpy.splice(cpy.findIndex(each =>
      each.imdbid === imdbID), 1);
    let json;
    if (app.details) {
      if (app.details.imdbID === imdbID) {
        json = { ...app.details, count: Number(app.details.count - 1) };
      }
    }
    dispatch({ type: UPDATE_LIST, cpy, json });
  };
  const addNomToList = (title, year, imdbid) => {
    const cpy = [...app.noms, { title, year, imdbid }];
    let json;
    if (app.details) {
      if (app.details.imdbID === imdbid) {
        json = { ...app.details, count: Number(app.details.count + 1) };
      }
    }
    dispatch({ type: UPDATE_LIST, cpy, json });
  };
  const resetDetails = () => {
    dispatch({ type: RESET_DETAIL });
  };

  const getMovieDetails = async (id) => {
    try {
      const data = await axios.get(`/api/details/${id}`);
      const {
        db,
        yt,
        omdb
      } = data.data;
      dispatch({
        type: GET_DETAILS,
        db, yt, omdb, id
      });
    } catch (er) {
      console.error(er);
    }
  };


  const wait = () => {
    if (!ready) {
      setTimeout(() => {
        if (!ready) {
          setReady(true);
        }
      }, 250);
    }
  };

  const getSearchResults = async (s, page = 1) => {
    try {
      const data = await axios
        .get(`/api/search?s=${s}&page=${page}`);
      const arr = data.data.Search;
      const numRes = Number(data.data.totalResults);
      if (arr.length) {
        dispatch({ type: GET_RESULTS, arr, numRes, s });
      } else {
        dispatch({ type: GET_RESULTS, arr: [], numRes: 0, s });
      }
    } catch (er) {
      dispatch({ type: ERROR, msg: 'Too many results' });

    }
  };

  const getAutoResults = async (s) => {
    try {
      if (ready) {
        await setReady(false);
        const arr = await axios
          .get(`/api/autocomplete?s=${s}`);
        setAutoResults(arr.data);
        await wait();
      } else {
        wait();
      }
      return;
    } catch (er) {
      console.log(er);
    }
  };
  const resetAutoResults = () => {
    setAutoResults([]);
  };

  return {
    app,
    authoriseReg,
    authoriseLog,
    loadUser,
    getAutoResults,
    autoResults,
    resetAutoResults,
    getSearchResults,
    handleNominate,
    getMovieDetails,
    logout,
    addNomToList,
    removeNomFromList,
    resetDetails
  };
};
export default useAppState;