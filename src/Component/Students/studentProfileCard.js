import React, { Component } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const styles = theme => {
    return {

    }
};

class StudentProfileCard extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Paper>

            </Paper>
        );
    }

}

export default withStyles(styles)(StudentProfileCard);