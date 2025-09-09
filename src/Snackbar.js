import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

// ==================== Snackbar Component ====================
export default function MySnackBar({ open, message, severity = 'success', onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1800}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      style={{ direction: 'rtl' }}
    >
      {/* Alert Message */}
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '60%',
          fontSize: '0.95rem',
          fontWeight: 'bold',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          '& .MuiAlert-icon': { fontSize: '1.2rem' },
          backgroundColor: severity === 'success' ? '#596A37' : 
                          severity === 'info' ? '#8E9FA5' : severity === 'warning' ? '#db9e65' : undefined,
          color: 'white', 
        }}
      >
      {message}
    </Alert>
  </Snackbar>
      );
}