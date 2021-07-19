import { Box, CircularProgress, Container, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useHistory, useParams } from 'react-router-dom';

import FeelingForm from 'feelings/components/FeelingForm';
import { useAppSelector, useDidMountEffect } from 'app/root/hooks';
import { ErrorOutlineOutlined } from '@material-ui/icons';
import { useStyles } from './CreateFeeling.styles';

type QuizParams = {
  identifier: string;
};

const CreateFeeling = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();
  const { identifier } = useParams<QuizParams>();
  const upsertStatus = useAppSelector(state => state.feeling.feelingUpsertStatus);
  const fetchStatus = useAppSelector(state => state.feeling.feelingFecthStatus);

  useDidMountEffect(() => {
    if (upsertStatus === 'failed') enqueueSnackbar('An error has been occurred, please try again later.', { variant: 'error'});
    else if (upsertStatus === 'succeeded') {
      enqueueSnackbar('Feeling has been saved successfully.', { variant: 'success'});
      history.goBack();
    }
  },[upsertStatus]);

  return (
    <Container className={classes.container}>
      {fetchStatus === 'searching' &&
        <Box alignItems="center" display="flex" flexGrow={1} height={42} justifyContent="center" marginBottom={24}>
          <CircularProgress size={24}/>
        </Box>
      }
      {fetchStatus === 'failed' &&
        <Box alignItems="center" display="flex" flexDirection="column" flexGrow={1} justifyContent="center">
          <ErrorOutlineOutlined className={classes.errorIcon} color="error"/>
          <Box>An Error has been occurred, please try later.</Box>
        </Box>
      }
      {fetchStatus !== 'searching' &&
        <>
          <Box marginBottom={4} marginTop={8}>
            <Typography component="h1" variant="h6">{identifier !== 'new' ? 'Update your feeling' : 'Create a feeling'}</Typography>
          </Box>
          <FeelingForm />
        </>
      }
    </Container>
  );
};

export default CreateFeeling;
