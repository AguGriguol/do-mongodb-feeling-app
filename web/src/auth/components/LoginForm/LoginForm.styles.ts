import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      height: 42,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
);
