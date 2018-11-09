import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React, {Component} from "react";

class DeleteDialog extends Component {



    render() {
        const {deleteDialogStatus, handleDeleteDialogClose, content, handleDelete } = this.props;

        return (
            <Dialog
                open={deleteDialogStatus}
                onClose={handleDeleteDialogClose}
                scroll='body'
            >
                <DialogTitle>Are you sure to continue</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Are you sure you want to delete this ${content}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="secondary" variant='contained'>
                        Yes
                    </Button>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DeleteDialog;

