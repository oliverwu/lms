import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React, {Component} from "react";
import { redirect } from "./Help";

class CreateSucceedDialog extends Component {

    handleRedirect = () => {
        redirect(this.props.url);
    };

    render() {
        const { createDialogSucceedStatus } = this.props;

        return (
            <Dialog
                open={createDialogSucceedStatus}
                scroll='body'
            >
                <DialogTitle>Congratulation!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This course has already been saved.
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