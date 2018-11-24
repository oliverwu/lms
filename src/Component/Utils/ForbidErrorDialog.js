import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from "react";
import {redirect} from "./Help";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

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

class ForbidErrorDialog extends Component{

    handleForbidErrorDialogClose = () => {
        const { statusCode } = this.props;
        if (statusCode === 401) {
            this.props.clearData();
            redirect('login');
        } else {
            this.props.handleForbidErrorDialogClose();
        }
    };

    handleNoClose() {

    }


    render() {
        const { classes, statusCode, handleForbidErrorDialogClose, ForbidErrorDialogStatus} = this.props;

        return (
            <Dialog
                open={ForbidErrorDialogStatus}
                TransitionComponent={Transition}
                scroll= 'body'
                onClose={statusCode === 401 ? this.handleNoClose : handleForbidErrorDialogClose}
            >
                <DialogTitle className={classes.error}>Error!!!</DialogTitle>
                <DialogContent className={classes.error}>
                    <DialogContentText className={classes.errorText}>
                        {statusCode === 401 ? 'You login Token is expired, you need to log again!' : `Oops, Some error occurred, try to refresh your page or log again!!`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={this.handleForbidErrorDialogClose} color="primary">
                        Gotcha!
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ForbidErrorDialog);