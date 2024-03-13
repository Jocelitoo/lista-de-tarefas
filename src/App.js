import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store/indexStore';
import { Header } from './components/Header/indexHeader';
import { RoutesFunction } from './routes/routes';
import { Footer } from './components/Footer/indexFooter';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './config/theme';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Header />
            <RoutesFunction />
            <Footer />
            <GlobalStyles />
            <ToastContainer autoClose={1500} className="toast-container" />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
