import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'utils/theme/base';
import Routes from 'app/components/Routes';

const Root = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ThemeProvider>
);

export default Root;
