
import './App.css';
import Todo from './Todolist';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from './contexts/SnackbarContext';
import TodosProvider from './contexts/TodosContext'

if (typeof window === 'undefined') {
  process.env.HOST = '0.0.0.0';
}

const Theme = createTheme({
  typography: {
    fontFamily: 'meow'
  },
  palette: {
    primary: {
      main: '#3E402C',
      light: '#B9A990',
      dark: '#2C2E1A',
    },
    secondary: {
      main: '#818D86',
      light: '#F0F0E5',
      dark: '#6B776F',
    },
    background: {
      default: '#F0F0E5',
      paper: '#F0F0E5',
    },
    text: {
      primary: '#3E402C',
      secondary: '#818D86',
    },
    success: {
      main: '#B9A990',
      light: '#F0F0E5',
      dark: '#A39379',
    },
    error: {
      main: '#8B4A42',
      light: '#C67B73',
      dark: '#6B2F28',
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <SnackbarProvider>
        <TodosProvider>
        <div className="App" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          direction: 'rtl',
          background: 'linear-gradient(135deg, #F0F0E5 0%, #B9A990 50%, #818D86 100%)',
        }}>
          <Todo />
        </div>          
          </TodosProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}



export default App;
