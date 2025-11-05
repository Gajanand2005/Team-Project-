import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const alertBox = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
  };

  return (
    <AppContext.Provider value={{ alert, alertBox }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
