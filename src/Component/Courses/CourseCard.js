import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import DeleteDialog from "../Utils/DeleteDialog";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { connect } from 'react-redux';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import {clearCourseData, handleDeleteCourseData} from "../../Actions/CoursesActions";

const state = state => ({
   statusCode: state.course.statusCode,
});

const styles = theme => ({
    paper: {
        [theme.breakpoints.up('xs')]: {
            width: '290px',
            margin: '30px auto'
        },
        [theme.breakpoints.up('sm')]: {
            width: '300px',
            margin: '30px 15px',
        },
        display: 'flex',
        flexDirection: 'column',
        background: '#F4F3F3',
        borderRadius: '5px',
        position: 'relative',
        height: '200px',
        color: 'black',
        '&:hover': {
            background: '#17977A',
            color: 'white',
            cursor: 'grab',
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
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: '20px',
        marginBottom: '20px',
        width: '50px',
        height: '50px',
    },
});

class CourseCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            deleteDialogStatus: false,
        }
    }

    handleDelete = () => {
        const id = this.props.id;
        this.props.handleDeleteCourse(id);
    };

    handleDeleteDialogClose = () => {
        this.setState({
            deleteDialogStatus: false,
        })
    };

    handleDeleteClick = (e) => {
        e.preventDefault();
        this.setState({
            deleteDialogStatus: true,
        })
    };


    render() {
        const { deleteDialogStatus } = this.state;
        const { classes, title, description, id } = this.props;

        return (
            <Fragment>
                <Link to={`courses/${id}`} style={{textDecoration: 'none', width: '100%'}}>
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
                        <IconButton
                            className={classes.detailsButton}
                            onClick={this.handleDeleteClick}
                            color='inherit'
                        >
                            <DeleteOutline />
                        </IconButton>
                    </Paper>
                </Link>
                <DeleteDialog
                    deleteDialogStatus={deleteDialogStatus}
                    handleDeleteDialogClose={this.handleDeleteDialogClose}
                    content='course'
                    handleDelete={this.handleDelete}
                />
            </Fragment>
        );
    }
}

CourseCard.propTypes = {
    classes: PropTypes.object.isRequired,
};


CourseCard = withStyles(styles)(CourseCard);

export default connect(state)(CourseCard);