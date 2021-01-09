import { useReducer, useState } from 'react';
import axios from 'axios';
const AUTH = "AUTHORISE_USER";
const GET_RESULTS = "GET_SEARCH_RESULTS";

const appReducer = (state, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state, id: action.id,
        username: action.username
      };
    case GET_RESULTS:
      return {
        ...state, results: action.arr
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
  details: {}
};

const useAppState = () => {

  const [app, dispatch] = useReducer(appReducer, initApp);
  const [ready, setReady] = useState(true);
  const [autoResults, setAutoResults] = useState([]);

  const authoriseReg = async (email, username) => {
    try {
      const data = await axios
        .post('/api/users', { email, username });
      if (data) {
        const { username, id } = data.data;
        dispatch({
          type: AUTH,
          username,
          id
        });
        return id;
      } else
        return "Email already in use";

    } catch (er) {
      console.log(er);
    }
  };
  const loadUser = async (username, id) => {
    try {
      const data = await axios
        .get(`/api/users/${id}`);
      dispatch({ type: AUTH, username: data.username, id: data.id });
    } catch (er) {
      console.log(er);
    }
  };

  const getMovieDetails = async (id) => {
    try {
      const data = await axios.get(`/api/details/${id}`)
      console.log(data.data);
    } catch (er) {
      console.error(er);
    }
  };

  const authoriseLog = async (email) => {
    try {
      const data = await axios
        .post('/api/users', {
          email
        });
      const res = data[0];
      if (res) {
        dispatch({
          type: AUTH,
          email: res.email,
          username: res.username
        });
        return { id: Number(res.id), username: res.username };
      } else
        return "Invalid email";
    } catch (er) {
      console.log(er);
    }
  };

  const wait = () => {
    if (!ready) {
      const a = setTimeout(() => {
        if (!ready) {
          setReady(true);
          clearTimeout(a);
        }
      }, 500);
    }
  };

  const getSearchResults = async (s) => {
    try {

      const data = await axios.get(`/api/search?s=${s}`);
      // console.log(data)
      const arr = data.data;
      if (arr.length) {
        dispatch({ type: GET_RESULTS, arr });
      }
    } catch (er) {
      console.log(er);
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
    getSearchResults
  };
};
export default useAppState;