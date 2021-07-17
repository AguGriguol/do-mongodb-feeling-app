import { useHistory } from 'react-router-dom';
import { Avatar, Box, CircularProgress, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { Feeling } from 'feelings/models/feeling';
import { useStyles } from './FeelingItem.styles';

type FeelingItemType = {
  feeling: Feeling;
  onDeleteFeeling: (feeling: Feeling) => void;
};

const FeelingItem = ({ feeling, onDeleteFeeling }: FeelingItemType) => {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = () => {
    history.push('/new');
  };

  const deleteFeeling = (evt: any, feel: Feeling) => {
    evt.stopPropagation();
    onDeleteFeeling(feel);
  };

  return (
    <Box marginY={2}>
      <Paper className={classes.paper} onClick={handleClick}>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={`/assets/${feeling.feelingType.code}.png`} />
          </ListItemAvatar>
          <ListItemText primary={feeling.title} secondary={`${feeling.shortDescription} - ${new Date(feeling.created).toLocaleDateString('en-US')}`} />
          <ListItemSecondaryAction>
            {feeling?.deleteStatus === 'deleting' &&
              <CircularProgress size={28}/>
            }
            {feeling?.deleteStatus !== 'deleting' &&
              <IconButton aria-label="comments" edge="end" onClick={evt => deleteFeeling(evt, feeling)}>
                <DeleteOutline color="secondary"/>
              </IconButton>
            }
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
    </Box>
  );
};

export default FeelingItem;
