import { useHistory } from 'react-router-dom';
import { Box, Button, Container, List, Typography } from '@material-ui/core';
import FeelingItem from 'feelings/components/FeelingItem';

const FeelingList = () => {
  const history = useHistory();

  const handleCreateClick = () => {
    history.push('/new');
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" marginBottom={4} marginTop={8}>
        <Box>
          <Typography component="h1" variant="h6">How you have been feeling</Typography>
          <Typography component="h2">Click on the feeling to see its details</Typography>
        </Box>
        <Button color="primary" onClick={handleCreateClick} variant="contained">Create feeling</Button>
      </Box>
      <List>
        <FeelingItem />
        <FeelingItem />
        <FeelingItem />
        <FeelingItem />
      </List>
    </Container>
  );
};

export default FeelingList;
