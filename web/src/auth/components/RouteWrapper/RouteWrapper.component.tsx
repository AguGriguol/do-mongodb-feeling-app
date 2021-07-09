import { ReactNode } from 'react';
import { Box, Paper, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './RouteWrapper.styles';

export type RouteWrapperProps = {
  children: ReactNode;
};

const RouteWrapper = ({ children }: RouteWrapperProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const isAtLeastSmallViewport = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box bgcolor="transparent" margin="auto" marginBottom={[3, 5]} marginTop={10} width={[1, 400]}>
      <Paper className={classes.root} elevation={isAtLeastSmallViewport ? 1 : 0}>
        {children}
      </Paper>
    </Box>
  );
};

export default RouteWrapper;
