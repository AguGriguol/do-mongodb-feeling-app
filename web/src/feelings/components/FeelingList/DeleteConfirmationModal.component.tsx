import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

type DialogType = {
  handleClose: () => void;
  deleteFeeling: () => void;
};

const DeleteConfirmationModal = ({ handleClose, deleteFeeling }: DialogType) => (
  <Dialog aria-describedby="confirmation-description" aria-labelledby="confirmation-title" keepMounted onClose={handleClose} open>
    <DialogTitle id="confirmation-title">Delete Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirmation-description">Do you want to delete the feeling?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={handleClose}>
        NO
      </Button>
      <Button color="primary" onClick={deleteFeeling}>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteConfirmationModal;
