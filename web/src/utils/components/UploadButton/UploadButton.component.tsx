import { ChangeEvent } from 'react';
import { Box, Button } from '@material-ui/core';
import { useStyles } from './UploadButton.styles';

export type UploadButtonProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const UploadButton = ({ onChange }: UploadButtonProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <input accept="image/*" className={classes.input} id="contained-button-file" onChange={onChange} type="file" />
      <label htmlFor="contained-button-file">
        <Button color="primary" component="span" variant="contained">
          Upload
        </Button>
      </label>
    </Box>
  );
};

export default UploadButton;
