import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, MenuItem, Menu, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const styles = {
    root: {
        width: '100%',
        height: '200px',
        margin: '25px 10px',
    },

    paper: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        background: 'white',
        borderRadius: '5px',
        height: '180px'
    },

    paperTitle: {
        backgroundColor: '#1D8BF1',
        color: 'white',
        padding: '15px 15px',
        textAlign:'left',
        marginTop: '-20px',
        marginLeft: '20px',
        marginRight: '20px',
        borderRadius: '5px',
    },

    paperDescription: {
        height: '100px',
        textAlign:'left',
        padding: '0 35px'
    },

    detailsButton: {
        float: 'right',
        marginRight: '20px',
        marginBottom: '10px',
        background: '#1D8BF1',
        color: 'white'
        // position: 'absolute',
        // bottom:'10px',
        // width: '250'
        // width: '100px',
        // margin: '0 75px',
    },
};

class MediaCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
    }


    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const { classes, title, description, id } = this.props;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography component="h5" variant="h5"  gutterBottom className={classes.paperTitle}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" className={classes.paperDescription}>
                        {description}
                    </Typography>
                    <div >
                        <IconButton
                            className={classes.detailsButton}
                            onClick={this.handleClick}
                        >
                            <AddIcon />
                        </IconButton>
                        <Menu
                            open={open}
                            anchorEl={anchorEl}
                            onClose={this.handleClose}
                            PaperProps={{
                                style: {
                                    width: 200,
                                }
                            }}
                        >
                            <MenuItem key='delete' >Delete</MenuItem>
                            <Link to={`courses/${id}`} style={{textDecoration: 'none', width: '100%'}}>
                                <MenuItem key='details' >Details</MenuItem>
                            </Link>
                        </Menu>
                    </div>
                </Paper>
            </div>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);