import React, {Component, PureComponent} from 'react';
import { TextField, MenuItem, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import CourseApi from './CourseApi';
import MenuBar from '../Layout/MenuBar';
import {redirect} from "../Utils/Help";
import CreateSucceedDialog from "../Utils/CreateSucceedDialog";
import DeleteDialog from "../Utils/DeleteDialog";
import ErrorDialog from "../Utils/ErrorDialog";

const styles = {
    root: {
        width: '600px',
    },

    gridFee: {
        paddingRight: '5px'
    },

    gridMaxStudents: {
        paddingLeft: '5px'
    },

    maxStudents: {
        textAlign: 'left',
    },

    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    buttonRest: {
        width: '60px',
        margin: '10px 0',
        paddingLeft: 0
    },

    buttonDelete: {
        width: '100px',
        margin: '10px 10px',
    },

    noButtonDelete: {
        display: 'none',
    },

    buttonSubmit: {
        background: '#3F9BE7',
        width: '100px',
        margin: '10px 10px'
    },

};

const maxStudentsOptions = [10, 20, 30, 40, 50];

class CourseDetails extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            fee: '',
            maxStudent: 0,
            description: '',
            language: '',
            deleteDialogStatus: false,
            createDialogSucceedStatus: false,
            errorDialogStatus: false,
        }
    }

    handleReset = () => {
        this.setState({
            title: '',
            fee: '',
            maxStudent: 0,
            description: '',
            language: '',
        })
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, fee, maxStudent, description, language } = this.state;
        console.log({title, fee, maxStudent, description});
        const { id } = this.props.match.params;
        if (id === 'create') {
            const newCourse = {title, fee, maxStudent, description, language};
            CourseApi.createNewCourse(newCourse).then(statusCode => {
                if (statusCode === 200) {
                    this.setState({
                        createDialogSucceedStatus: true,
                    })
                } else if (statusCode > 300) {
                    this.setState({
                        errorDialogStatus: true,
                    })
                }
            });
        } else {
            const newCourse = {id, title, fee, maxStudent, description, language};
            console.log(newCourse);
            CourseApi.updateCourse(newCourse).then(statusCode => {
                if (statusCode === 204) {
                    this.setState({
                        createDialogSucceedStatus: true,
                    })
                } else if (statusCode > 300) {
                    this.setState({
                        errorDialogStatus: true,
                    })
                }
            })
        }
    };

    handleDelete = () => {
        const { id } = this.props.match.params;
        if (id !== 'create') {
            CourseApi.deleteCourse(id).then(data => redirect('courses'));
        }
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

    handleErrorDialogClose = () => {
        this.setState({
            errorDialogStatus: false,
        })
    };

    // async componentDidMount() {
    //     const { id } = this.props.match.params;
    //     if (id !== 'create') {
    //         const course  = await CourseApi.getAllCourseById(id);
    //         course && this.setState({
    //             ...course
    //         })
    //     }
    // }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id !== 'create') {
            this.getCourseById(id);
        }
    }

    getCourseById = (id) => {
        CourseApi.getCourseById(id).then(course => {
            course && this.setState({
                ...course
            })
        });
    };

    render() {
        const { title, fee, maxStudent, description, language, deleteDialogStatus, createDialogSucceedStatus, errorDialogStatus} = this.state;
        const { classes } = this.props;
        const { id } = this.props.match.params;

        return (
            <MenuBar selected='Courses' menu={id === 'create' ? 'CREATE NEW COURSE' : 'COURSE DETAILS'}>
                <form className={classes.root} onSubmit={this.handleSubmit}>
                    <TextField
                        label='Title'
                        id='course-title'
                        placeholder='Title'
                        fullWidth
                        name='title'
                        value={title}
                        margin='normal'
                        onChange={this.handleChange}
                    />
                    <Grid
                        container
                    >
                        <Grid
                            item xs={6} className={classes.gridFee}
                        >
                            <TextField
                                label='Fee($)'
                                id='course-fee'
                                type='number'
                                placeholder='Fee($)'
                                fullWidth
                                name='fee'
                                value={fee}
                                // margin='normal'
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.gridMaxStudents}>
                            <TextField
                                id="max-student"
                                select
                                label="Max Student"
                                fullWidth
                                // margin='normal'
                                className={classes.maxStudents}
                                value={maxStudent}
                                name='maxStudent'
                                onChange={this.handleChange}
                                // SelectProps={{
                                //     MenuProps: {
                                //         className: classes.menu,
                                //     },
                                // }}
                                helperText="Please select the number of max students"
                            >
                                {maxStudentsOptions.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <TextField
                        label="Description"
                        placeholder='Description for the course'
                        fullWidth
                        margin='normal'
                        name='description'
                        value={description}
                        onChange={this.handleChange}
                    />
                    <TextField
                        label='Language'
                        id='course-language'
                        placeholder='Language'
                        fullWidth
                        name='language'
                        value={language}
                        margin='normal'
                        onChange={this.handleChange}
                    />
                    <div className={classes.buttons}>
                        <Button
                            color='default'
                            variant='text'
                            className={classes.buttonRest}
                            onClick={this.handleReset}
                        >reset</Button>
                        <div>
                            <Button
                                color='secondary'
                                variant='extendedFab'
                                className={id === 'create' ? classes.noButtonDelete : classes.buttonDelete}
                                onClick={this.handleDeleteDialogOpen}
                            >Delete</Button>
                            <Button
                                type="submit"
                                color='primary'
                                variant='extendedFab'
                                className={classes.buttonSubmit}
                            >{id !== 'create' ? 'Save' : 'Create'}</Button>
                        </div>
                    </div>
                </form>
                <DeleteDialog
                    deleteDialogStatus={deleteDialogStatus}
                    handleDeleteDialogClose={this.handleDeleteDialogClose}
                    content='course'
                    handleDelete={this.handleDelete}
                />
                <CreateSucceedDialog
                    url='courses'
                    createDialogSucceedStatus={createDialogSucceedStatus}
                />
                <ErrorDialog
                    errorDialogStatus={errorDialogStatus}
                    handleErrorDialogClose={this.handleErrorDialogClose}
                    content='course'
                />
            </MenuBar>
        );
    }
}

export default withStyles(styles)(CourseDetails);