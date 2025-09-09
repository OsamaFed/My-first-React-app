
import React, { createContext, useContext, useState } from 'react';
import MySnackBar from '../Snackbar';

const SnackbarContext = createContext();

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarState({
      open: true,
      message,
      severity
    });
  };

  const hideSnackbar = () => {
    setSnackbarState(prev => ({
      ...prev,
      open: false
    }));
  };


  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <MySnackBar
        open={snackbarState.open}
        message={snackbarState.message}
        severity={snackbarState.severity}
        onClose={hideSnackbar}
      />
    </SnackbarContext.Provider>
  );
};

