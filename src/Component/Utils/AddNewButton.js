import React, {Component} from 'react';
import { Button } from '@material-ui/core';
import { withStyles, } from '@material-ui/core/styles';

const styles = theme => ({
   button: {
       background: '#1D8BF1',
   }
});

function AddNewButton(props) {
    const {name, classes} = props;

    return (
        <div>
            <Button variant='extendedFab' color='primary' aria-label='Add' className={classes.button}>
                {name}
            </Button>
        </div>
    )
}

export default withStyles(styles)(AddNewButton);