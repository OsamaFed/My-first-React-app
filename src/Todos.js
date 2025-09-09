
import * as React from "react";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import {createTheme, ThemeProvider} from '@mui/material/styles'

export default function TodoItem({ text, comp, onDelete, onEdit, onCheck }) { 
  // ==================== Theme Configuration ====================
  const theme = createTheme({
    palette: {
      normal: { main: '#3E402C' },
      danger: { main: '#8B4A42' },
      success: { main: '#B9A990' },
      snackBarSuccess: { main: '#596A37'},
      primary: { main: '#3E402C' },
      secondary: { main: '#818D86' }
    },
    typography: { fontFamily: 'meow' },
  });

  // ==================== Component Render ====================
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          height: 70,
          background: comp 
            ? '#596A37' 
            : 'linear-gradient(135deg, #3E402C 0%, #818D86 100%)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 2,
          px: 2,
          mb: 1,
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(44, 95, 122, 0.15)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(62, 64, 44, 0.3)',
            background: comp 
              ? '#596A37' 
              : 'linear-gradient(135deg, #2C2E1A 0%, #6B776F 100%)',
          }
        }}
      >
        <h3 style={{ textDecoration: comp ? 'line-through' : 'none', transition: 'all 0.3s ease' }}>
          {text}
        </h3>
        
        <div style={{ textAlign: 'left', display: 'flex'}}>
          <IconButton 
            onClick={onCheck}
            size="small" 
            color="inherit"
            sx={{ color: comp ? '#4CAF50' : 'inherit' }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton onClick={onEdit} size="small" color="inherit">
            <EditIcon />
          </IconButton> 
          <IconButton onClick={onDelete} size="small" color="inherit">
            <DeleteIcon style={{color: '#E74C3C'}}/>
          </IconButton>
        </div>
      </Box>
    </ThemeProvider>
  );
}
