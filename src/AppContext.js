import React from 'react';
import useAppState from 'hooks/useAppState';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  
  const {
    app,
    authoriseReg,
    authoriseLog,
    loadUser,
    getAutoResults,
    autoResults,
    resetAutoResults,
    getSearchResults
  } = useAppState();
  
  return (
    <AppContext.Provider value={{
      app,
      authoriseReg,
      authoriseLog,
      loadUser,
      getAutoResults,
      autoResults,
      resetAutoResults,
      getSearchResults
    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;