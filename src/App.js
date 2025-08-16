import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// MATIRIAL UI
import Container from '@mui/material/Container';

// componant
import Header from './Componant/Header';
import Body from './Componant/Body';
import { WeatherDataProvider } from './Context/WeatherDataContext';
import { SearchTitleProvider } from './Context/SearchContext'
import LoadingProvider from './Context/LoadingContext';


const theme = createTheme({
  typography: {
    fontFamily: ['Poppins'],
  },
});

function App() {

  return (
      <LoadingProvider>
    <ThemeProvider theme={theme} >
        <SearchTitleProvider>
          <WeatherDataProvider>
            <div className="App" style={{ minHeight: '100vh', backgroundColor: '#0F305B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <Container maxWidth="lg" style={{ display: 'grid', gap: '20px', margin: '20px 0' }}>
                <Header />
                <Body />
              </Container>

            </div>
          </WeatherDataProvider>
        </SearchTitleProvider>
    </ThemeProvider>
      </LoadingProvider>
  );

}

export default App;
