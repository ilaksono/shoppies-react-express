export const UPDATE_OPTION = 'CHOOSE_NEW_SORT_OPTION';
export const GET_SUMM = 'GET_SUMMARY_DASHBOARD';
export const GET_TOP = "GET_TOP_DATA";
export const GET_COUNTRY = "GET_COUNTRY_DATA_FOR_PIE";
export const analysisReducer = (state, action) => {
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
