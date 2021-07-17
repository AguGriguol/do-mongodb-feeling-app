import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, List, Typography } from '@material-ui/core';
import { ErrorOutlineOutlined, AddCommentOutlined } from '@material-ui/icons';

import FeelingItem from 'feelings/components/FeelingItem';
import DeleteConfirmationModal from 'feelings/components/FeelingList/DeleteConfirmationModal.component';
import { useAppDispatch, useAppSelector } from 'app/root/hooks';
import { deleteFeeling, fetchFeelings } from 'feelings/ducks/feeling.slice';
import { Feeling } from 'feelings/models/feeling';
import { useStyles } from './FeelingList.styles';

const FeelingList = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const feelings = useAppSelector(state => state.feeling.feelings.entities);
  const status = useAppSelector(state => state.feeling.feelings.status);
  const feelingArray = Object.values(feelings) as Feeling[];

  const [feelingToDelete, setFeelingToDelete] = useState<Feeling | null>(null);

  useEffect(() => {
    void dispatch(fetchFeelings());
  }, [dispatch]);

  const handleCreateClick = () => {
    history.push('/new');
  };

  const deleteExistingFeeling = () => {
    if (feelingToDelete) void dispatch(deleteFeeling({ identifier: feelingToDelete._id}));
    setFeelingToDelete(null);
  };
  // TODO LOADING
  return (
    <Container className={classes.container}>
      <Box display="flex" justifyContent="space-between" marginBottom={4} marginTop={8}>
        <Box>
          <Typography component="h1" variant="h6">
            How you have been feeling
          </Typography>
          <Typography component="h2">Click on the feeling to see its details</Typography>
        </Box>
        <Button color="primary" onClick={handleCreateClick} variant="contained">
          Create feeling
        </Button>
      </Box>
      {status !== 'succeeded' &&
          <Box alignItems="center" display="flex" flexGrow={1} justifyContent="center">
            {status === 'searching' && <CircularProgress size={32}/>}
            {status === 'failed' &&
              <Box alignItems="center" display="flex" flexDirection="column" flexGrow={1} justifyContent="center">
                <ErrorOutlineOutlined className={classes.errorIcon} color="error"/>
                <Box>An Error has been occurred, please try later.</Box>
              </Box>
            }
          </Box>
      }
      {status === 'succeeded' && !!feelingArray.length &&
        <List>
          {feelingArray.map(feeling => (
            <FeelingItem feeling={feeling} key={feeling._id} onDeleteFeeling={feel => setFeelingToDelete(feel)}/>
          ))}
        </List>
      }
      {status === 'succeeded' && !feelingArray.length &&
        <Box alignItems="center" display="flex" flexDirection="column" flexGrow={1} justifyContent="center">
          <AddCommentOutlined className={classes.errorIcon} color="secondary"/>
          <Box>There are no feelings!</Box>
          <Box fontWeight="bold">How do you feel? Register your first feeling, tap on create feeling button</Box>
        </Box>
      }
      {!!feelingToDelete && (
        <DeleteConfirmationModal deleteFeeling={deleteExistingFeeling} handleClose={() => setFeelingToDelete(null)}/>
      )}
    </Container>
  );
};

export default FeelingList;
