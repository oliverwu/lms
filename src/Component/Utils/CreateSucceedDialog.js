import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React, {Component} from "react";
import { redirect } from "./Help";

class CreateSucceedDialog extends Component {

    handleRedirect = () => {
        this.props.redirect ? redirect(this.props.url) : this.props.handleSucceedDialogClose();

    };

    render() {
        const { name, createDialogSucceedStatus, handleSucceedDialogClose } = this.props;

        return (
            <Dialog
                open={createDialogSucceedStatus}
                scroll='body'
                onClose={handleSucceedDialogClose}
            >
                <DialogTitle>Congratulation!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`This ${name} has already been saved.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleRedirect} color="primary" >
                        Gotcha :)
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default CreateSucceedDialog;