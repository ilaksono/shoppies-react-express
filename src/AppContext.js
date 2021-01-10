import React from 'react';
import useAppState from 'hooks/useAppState';
import useLoadingState from 'hooks/useLoadingState';
import usePagination from 'hooks/usePagination';
import useLoginModal from 'hooks/useLoginModal';
import useSnackbar from 'hooks/useSnackbar';
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {

  const {
    load,
    setSearchLoad
  } = useLoadingState();
  const {
    snack,
    setSnack
  } = useSnackbar();

  const {
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
    removeNomFromList
  } = useAppState();

  const {
    modal,
    setModal
  } = useLoginModal();
  const {
    page,
    goToPage,
    resetPagination
  } = usePagination();

  return (
    <AppContext.Provider value={{
      app,
      authoriseReg,
      authoriseLog,
      loadUser,
      getAutoResults,
      autoResults,
      resetAutoResults,
      getSearchResults,
      load,
      setSearchLoad,
      page,
      goToPage,
      resetPagination,
      handleNominate,
      modal,
      setModal,
      getMovieDetails,
      logout,
      snack,
      setSnack,
      addNomToList,
      removeNomFromList
    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;