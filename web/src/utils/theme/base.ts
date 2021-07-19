import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const customTheme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute'
        },
        '#root': {
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        },
        '[role=main]': {
          flexGrow: 1,
          height: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }
      }
    }
  }
});

export const theme = responsiveFontSizes(customTheme);
