import { useReducer, useState } from 'react';
import axios from 'axios';
const AUTH = "AUTHORISE_USER";
const appReducer = (state, action) => {
  switch (action.type) {
    case AUTH: {
      return {
        ...state, id: action.id,
        username: action.username
      };

    }
    default:
      return state;
  }
};
const initApp = {
  id: 0,
  username: '',
  noms: [],
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

  const getSearchResults = () => {

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

  return {
    app,
    authoriseReg,
    authoriseLog,
    loadUser,
    getAutoResults,
    autoResults
  };
};
export default useAppState;