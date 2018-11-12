import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, MenuItem, Menu, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteDialog from "../Utils/DeleteDialog";
import CourseApi from "./CourseApi";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

const styles = {

    paper: {
        display: 'flex',
        flexDirection: 'column',
        margin: '30px 15px',
        background: '#F4F3F3',
        borderRadius: '5px',
        width: '300px',
        height: '200px',
        color: 'black',
        '&:hover': {
            background: '#17977A',
            color: 'white',
            // cursor: 'grab',
        },
    },

    paperTitle: {
        background: 'rgba(0,0,0,0)',
        // width: '90px',
        height: '90px',
        padding: '15px 15px',
        textAlign:'left',
        marginTop: '-25px',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '10px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    icon: {
        width: '60px',
        height: '60px',
        padding: '10px',
        color: 'white',
        marginRight: '20px',
        background: '#C94251',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    },

    paperTitleText: {
        // color: 'black',
        marginTop: '10px',
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
    },
};

class MediaCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            deleteDialogStatus: false,
        }
    }


    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleDelete = () => {
        const { id } = this.props;
        CourseApi.deleteCourse(id).then(data => {
            this.setState({
                deleteDialogStatus: false,
            });
            window.location.reload();
        });

    };

    handleDeleteDialogOpen = () => {
        this.setState({
            deleteDialogStatus: true,
        })
    };

    handleDeleteDialogClose = () => {
        this.setState({
            deleteDialogStatus: false,
        })
    };



    render() {
        const { anchorEl, deleteDialogStatus } = this.state;
        const { classes, title, description, id } = this.props;
        const open = Boolean(anchorEl);

        return (
            <div>
                <Paper className={classes.paper}>
                    <div className={classes.paperTitle}>
                        <LocalLibraryIcon className={classes.icon}/>
                        <Typography component="h6" variant="h6" color='inherit' className={classes.paperTitleText}>
                            {title}
                        </Typography>
                    </div>

                    <Typography variant="subtitle1" color="inherit" className={classes.paperDescription}>
                        {description}
                    </Typography>
                    <div >
                        <IconButton
                            className={classes.detailsButton}
                            onClick={this.handleClick}
                            color='inherit'
                        >
                            <MoreVertIcon />
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
                            <MenuItem key='delete' onClick={this.handleDeleteDialogOpen}>Delete</MenuItem>
                            <Link to={`courses/${id}`} style={{textDecoration: 'none', width: '100%'}}>
                                <MenuItem key='details' >Details</MenuItem>
                            </Link>
                        </Menu>
                    </div>
                </Paper>
                <DeleteDialog
                    deleteDialogStatus={deleteDialogStatus}
                    handleDeleteDialogClose={this.handleDeleteDialogClose}
                    content='course'
                    handleDelete={this.handleDelete}
                />
            </div>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);