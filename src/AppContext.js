import React from 'react';
import useAppState from 'hooks/useAppState';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  
  const {
    app,
    authoriseReg,
    authoriseLog
  } = useAppState();
  
  return (
    <AppContext.Provider value={{
      app,
      authoriseReg,
      authoriseLog
    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;