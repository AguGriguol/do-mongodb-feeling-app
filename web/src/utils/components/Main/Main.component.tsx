import { ReactNode } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './Main.styles';

export type MainProps = { children: ReactNode };

const Main = ({ children }: MainProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.main} component="main" display="flex" flexDirection="column" role="main">
      {children}
    </Box>
  );
};

export default Main;
