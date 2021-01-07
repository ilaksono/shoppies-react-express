import { useReducer } from 'react';
import axios from 'axios';
const AUTH = "AUTHORISE_USER";
const appReducer = (state, action) => {
  switch (action.type) {
    case AUTH: {


    }
    default:
      return state;
  }
};
const initApp = {
  email: '',
  noms: []
};

const useAppState = () => {

  const [app, dispatch] = useReducer(appReducer, initApp);


  const authoriseUser = async (email) => {
    try {
      axios
      .post('/')
    } catch (er) {
      console.log(er);
    }
  };

  return {
    app
  };
};
export default useAppState;