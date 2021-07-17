import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ breakpoints, palette, spacing }) =>
  createStyles({
    root: {
      backgroundColor: palette.background.default,
      [breakpoints.up('sm')]: {
        backgroundColor: palette.background.paper,
        paddingBottom: spacing(3),
        paddingLeft: spacing(4),
        paddingRight: spacing(4),
        paddingTop: spacing(3)
      }
    }
  })
);
