import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const customTheme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          display: 'flex',
          flexDirection: 'column'
        },
        '#root': {
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        },
        '[role=main]': {
          flexGrow: 1,
          height: 'auto'
        }
      }
    }
  }
});

export const theme = responsiveFontSizes(customTheme);
