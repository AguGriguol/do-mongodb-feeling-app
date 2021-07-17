import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'utils/theme/base';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import Routes from 'app/components/Routes';

import { store } from 'app/root/store';

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);

export default Root;
