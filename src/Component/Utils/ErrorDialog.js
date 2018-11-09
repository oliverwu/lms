import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from "react";

const styles = theme => {
    return {
        error: {
            background: '#F6595B',
        },
        errorText: {
            color: 'white'
        }
    }
};

class ErrorDialog extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        const { classes, errorDialogStatus, handleErrorDialogClose, content } = this.props;

        return (
            <Dialog
                open={errorDialogStatus}
                onClose={handleErrorDialogClose}
                scroll='body'
            >
                <DialogTitle className={classes.error}>Error!!!</DialogTitle>
                <DialogContent className={classes.error}>
                    <DialogContentText className={classes.errorText}>
                        {`Error occurred while saving the ${content}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleErrorDialogClose} color="primary">
                        Gotcha!
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ErrorDialog);