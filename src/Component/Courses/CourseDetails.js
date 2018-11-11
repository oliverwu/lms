import React, {PureComponent, Fragment} from 'react';
import { TextField, MenuItem, Grid, Button, FormHelperText } from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import CourseApi from './CourseApi';
import MenuBar from '../Layout/MenuBar';
import { redirect, getValidationErrors } from "../Utils/Help";
import CreateSucceedDialog from "../Utils/CreateSucceedDialog";
import DeleteDialog from "../Utils/DeleteDialog";
import ErrorDialog from "../Utils/ErrorDialog";
import * as yup from "yup";
import AppBar from "../Layout/AppBar";

const schema = yup.object().shape({
    title: yup
        .string()
        .max(50)
        .label("Title")
        .required(),
    language: yup
        .string()
        .max(50)
        .label("Language")
        .required(),
    fee: yup
        .number()
        .positive()
        .min(10)
        .max(1000)
        .label("Fee")
        .required(),
    maxStudent: yup
        .number()
        .positive()
        .min(10)
        .max(50)
        .label("Max students")
        .required(),
    description: yup
        .string()
        .max(250)
        .label("Description")
        .required(),
});


const styles = {
    root: {
        maxWidth: '600px',
    },

    textField: {
        padding: '0 5px',
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
            validationErrors: ''
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

    handleSubmit = async (e) => {
        e.preventDefault();
        const { title, fee, maxStudent, description, language } = this.state;

        const userInput = { title, fee, maxStudent, description, language };
        try {
            await schema.validate(userInput, {
                abortEarly: false
            });
            const { id } = this.props.match.params;
            if (id === 'create') {
                const newCourse = {title, fee, maxStudent, description, language};
                const statusCode = await CourseApi.createNewCourse(newCourse);
                if (statusCode === 200) {
                    this.setState({
                        createDialogSucceedStatus: true,
                    })
                } else if (statusCode > 300) {
                    this.setState({
                        errorDialogStatus: true,
                    })
                }
            } else {
                const newCourse = {id, title, fee, maxStudent, description, language};
                const statusCode = await CourseApi.updateCourse(newCourse);
                if (statusCode === 204) {
                    this.setState({
                        createDialogSucceedStatus: true,
                    })
                } else if (statusCode > 300) {
                    this.setState({
                        errorDialogStatus: true,
                    })
                }
            }
        } catch (error) {
            const validationErrors = getValidationErrors(error);
            this.setState({
                validationErrors
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

    async componentDidMount() {
        const { id } = this.props.match.params;
        if (id !== 'create') {
            const course  = await CourseApi.getCourseById(id);
            course && this.setState({
                ...course
            })
        }
    }


    render() {
        const { title, fee, maxStudent, description, language, deleteDialogStatus, createDialogSucceedStatus, errorDialogStatus, validationErrors} = this.state;
        const { classes } = this.props;
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar selected='Courses' menu={id === 'create' ? 'CREATE NEW COURSE' : 'COURSE DETAILS'}>
                    <form className={classes.root} onSubmit={this.handleSubmit}>
                        <Grid
                            container
                        >
                            <Grid item xs={12} className={classes.textField}>
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
                                {validationErrors.title && <FormHelperText error>{validationErrors.title}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.textField}>
                                <TextField
                                    label='Fee($)'
                                    id='course-fee'
                                    // type='number'
                                    placeholder='Fee($)'
                                    fullWidth
                                    name='fee'
                                    value={fee}
                                    margin='normal'
                                    onChange={this.handleChange}
                                />
                                {validationErrors.fee && <FormHelperText error>{validationErrors.fee.slice(0, 27)}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.textField}>
                                <TextField
                                    id="max-student"
                                    select
                                    label="Max Student"
                                    fullWidth
                                    margin='normal'
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
                                {validationErrors.maxStudent && <FormHelperText error>{validationErrors.maxStudent}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12} className={classes.textField}>
                                <TextField
                                    label="Description"
                                    placeholder='Description for the course'
                                    fullWidth
                                    margin='normal'
                                    name='description'
                                    value={description}
                                    onChange={this.handleChange}
                                />
                                {validationErrors.description && <FormHelperText error>{validationErrors.description}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12} className={classes.textField}>
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
                                {validationErrors.language && <FormHelperText error>{validationErrors.language}</FormHelperText>}
                            </Grid>
                        </Grid>
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
            </Fragment>

        );
    }
}

export default withStyles(styles)(CourseDetails);