import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    circularProgress: {
        margin: '50px'
    }
};

class PageLoader extends React.Component{
    render() {
        return (
            <div>
                <CircularProgress className={this.props.classes.circularProgress}/>
                <h1>Loading...</h1>
            </div>
        );
    }
}


export default withStyles(styles)(PageLoader);