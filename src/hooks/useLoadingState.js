import {useReducer} from 'react';

const SET_SEARCH = 'SET_SEARCH_LOAD_BOOL'

const loadReducer = (state, action) => {
  switch(action.type) {
    case SET_SEARCH:
    return {...state, searchResults: action.bool}
    default:
      return state;
  }

}

const initLoad = {
  searchResults: false
}
const useLoadingState = () => {
  const [load, dispatch] = useReducer(loadReducer, initLoad);

  const setSearchLoad = (bool) => {
    dispatch({type: SET_SEARCH, bool});
  }

  return {
    load, 
    setSearchLoad
  }
}
export default useLoadingState;