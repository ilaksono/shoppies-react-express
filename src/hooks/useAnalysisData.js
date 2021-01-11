import { useReducer } from 'react';
import axios from 'axios';
import * as B from 'reducers/analysisReducer';

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

const useAnalysisData = () => {
  const [dash, dispatch] =
    useReducer(B.analysisReducer, init);
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
        type: B.GET_SUMM,
        num_usr,
        num_vot,
        num_mov
      });
    } catch (er) {
      console.error(er);
    }
  };
  const chooseOption = (option) => {
    dispatch({ type: B.UPDATE_OPTION, option });
  };

  const getGraphData = async () => {
    const p = Object.keys(dash.options).find(key =>
      dash.options[key]
    );
    try {
      const data = await axios
        .get(`/api/dashboard/data?p=${p}`);
      dispatch({ type: B.GET_TOP, data: data.data });
    } catch (er) {
      console.error(er);
    }
  };
  const getCountryData = async () => {
    try {
      const data = await axios
        .get('/api/dashboard/pie');
      dispatch({ type: B.GET_COUNTRY, data: data.data });
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