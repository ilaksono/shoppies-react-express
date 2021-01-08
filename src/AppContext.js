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
    autoResults
  } = useAppState();
  
  return (
    <AppContext.Provider value={{
      app,
      authoriseReg,
      authoriseLog,
      loadUser,
      getAutoResults,
      autoResults
    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;