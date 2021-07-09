import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'utils/theme/base';

const Root = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <h1>hhere i am </h1>
    </BrowserRouter>
  </ThemeProvider>
);

export default Root;
