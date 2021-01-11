import { useReducer } from 'react';
import axios from 'axios';
const init = {
  summary: {
    num_usr: 0,
    num_vot: 0,
    num_mov: 0
  },
  options: {
    votes: true,
    revenueA: false,
    revenueD: false
  },
  data: [],
  country: []
};
const UPDATE_OPTION = 'CHOOSE_NEW_SORT_OPTION';
const GET_SUMM = 'GET_SUMMARY_DASHBOARD';
const GET_TOP = "GET_TOP_DATA";
const GET_COUNTRY = "GET_COUNTRY_DATA_FOR_PIE";

const analysisReducer = (state, action) => {
  switch (action.type) {
    case GET_SUMM: {
      const {
        num_usr,
        num_mov,
        num_vot
      } = action;
      return {
        ...state, summary: {
          num_usr, num_mov, num_vot
        }
      };
    }
    case GET_TOP:
      return {
        ...state,
        data: action.data
      };
    case UPDATE_OPTION:
      return {
        ...state,
        options: {
          votes: false,
          revenueA: false,
          revenueD: false,
          [action.option]: true
        }
      };
    case GET_COUNTRY:
      return { ...state, country: action.data };
    default:
      return state;
  }
};


const useAnalysisData = () => {
  const [dash, dispatch] = useReducer(analysisReducer, init);
  const getSummary = async () => {
    try {
      const data = await axios
        .get('/api/dashboard/summary');
      const {
        num_usr,
        num_vot,
        num_mov
      } = data.data;
      dispatch({
        type: GET_SUMM,
        num_usr,
        num_vot,
        num_mov
      });
    } catch (er) {
      console.error(er);
    }
  };
  const chooseOption = (option) => {
    dispatch({ type: UPDATE_OPTION, option });
  };

  const getGraphData = async () => {
    const p = Object.keys(dash.options).find(key =>
      dash.options[key]
    );
    console.log(p);
    try {
      const data = await axios
        .get(`/api/dashboard/data?p=${p}`);
      console.log(data.data);
      dispatch({ type: GET_TOP, data: data.data });
    } catch (er) {
      console.error(er);
    }
  };
  const getCountryData = async () => {
    try {
      const data = await axios
        .get('/api/dashboard/pie');
      console.log(data.data);
      dispatch({ type: GET_COUNTRY, data: data.data });
    } catch (er) {
      console.error(er);
    }

  };

  return {
    dash,
    getSummary,
    chooseOption,
    getGraphData,
    getCountryData
  };
};
export default useAnalysisData;