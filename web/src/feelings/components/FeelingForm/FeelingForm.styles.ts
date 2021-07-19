import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      width: 100,
      height: 100,
      margin: 24
    },
    button: {
      marginBottom: 24
    },
    loading: {
      height: 42,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    image: {
      maxWidth: '100%',
      height: 'auto'
    }
  })
);
