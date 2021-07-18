import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing }) =>
  createStyles({
    root: {
      '& > *': {
        margin: spacing(1)
      }
    },
    input: {
      display: 'none'
    },
    label: {
      margin: 0
    }
  })
);
