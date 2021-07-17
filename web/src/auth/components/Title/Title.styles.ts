import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ typography }) =>
  createStyles({
    h1: {
      fontSize: typography.h6.fontSize,
      fontWeight: typography.fontWeightMedium
    }
  })
);
