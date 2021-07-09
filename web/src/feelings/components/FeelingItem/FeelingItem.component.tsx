import { useHistory } from 'react-router-dom';
import { Box, ListItem, ListItemText, Paper } from '@material-ui/core';

const FeelingItem = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/new');
  };

  return (
    <Box marginY={2}>
      <Paper onClick={handleClick}>
        <ListItem>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
      </Paper>
    </Box>
  );
};

export default FeelingItem;
