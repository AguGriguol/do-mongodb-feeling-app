import { ReactNode } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './Title.styles';

export type TitleProps = {
  children: ReactNode;
};

const Title = ({ children }: TitleProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center" marginBottom={3} marginTop={[1, 0]}>
      <Typography className={classes.h1} variant="h1">
        {children}
      </Typography>
    </Box>
  );
};

export default Title;
