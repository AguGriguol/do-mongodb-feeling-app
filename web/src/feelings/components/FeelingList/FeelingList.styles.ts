import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    },
    errorIcon: {
      height: 82,
      width: 82
    }
  })
);
