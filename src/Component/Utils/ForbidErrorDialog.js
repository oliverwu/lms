import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from "react";
import {redirect} from "./Help";

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
        this.props.clearData();
        redirect('login');
    };


    render() {
        const { classes, } = this.props;

        return (
            <Dialog
                open={true}
                scroll='body'
            >
                <DialogTitle className={classes.error}>Error!!!</DialogTitle>
                <DialogContent className={classes.error}>
                    <DialogContentText className={classes.errorText}>
                        {`Error occurred while fetching the data!!!`}
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