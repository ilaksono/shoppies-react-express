import { useReducer } from 'react';
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

  const authoriseReg = async (email, username) => {
    try {
      const data = await axios
        .post('/api/users', { email, username });
      if (data) {
        const { username, id } = data.data;
        return dispatch({
          type: AUTH,
          username,
          id
        });
      } else
        return "Email already in use";

    } catch (er) {
      console.log(er);
    }
  };
  const loadUser = async (id) => {
    try {
      const data = await axios
        .get(`/api/users/${id}`);
        dispatch({type: AUTH, username: data.username, id: data.id})
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
      if (data[0]) {
        dispatch({
          type: AUTH,
          email: data.email,
          username: data.username
        });
      } else
        return "Invalid email";

    } catch (er) {
      console.log(er);
    }
  };

  return {
    app,
    authoriseReg,
    authoriseLog
  };
};
export default useAppState;