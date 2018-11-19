import React, {PureComponent, Fragment} from 'react';
import { TextField, MenuItem, Grid, Button, FormHelperText } from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import MenuBar from '../Layout/MenuBar';
import { redirect, getValidationErrors } from "../Utils/Help";
import CreateSucceedDialog from "../Utils/CreateSucceedDialog";
import DeleteDialog from "../Utils/DeleteDialog";
import ErrorDialog from "../Utils/ErrorDialog";
import * as yup from "yup";
import AppBar from "../Layout/AppBar";
import { Field, reduxForm } from 'redux-form';
import {
    clearCourseData,
    handleCreateCourseData,
    handleDeleteCourseData,
    handleReceivedCourseData,
    handleUpdateCourseData
} from "../../Actions/CoursesActions";
import { connect } from 'react-redux';

const state = state => {
    return {
        course: state.course,
        materialUiFormData: state.form.MaterialUiForm,
    }
};

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

const renderTextField = (
    { input, name, fullWidth, label, meta: { touched, error }, ...custom },
) => (
    <TextField
        label={label}
        placeholder={label}
        fullWidth={fullWidth}
        name={name}
        margin='normal'
        {...input}
        {...custom}
    />
);

const renderSelectTextField = (
    { input, name, fullWidth, label, meta: { touched, error }, ...custom },
) => (
    <TextField
        select
        label={label}
        placeholder={label}
        fullWidth={fullWidth}
        margin='normal'
        name={name}
        {...input}
        {...custom}
        onChange={(event) => input.onChange(event.target.value)}
        helperText="Please select the number of max students"
    >
        {maxStudentsOptions.map(option => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ))}
    </TextField>
);


class CourseDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            deleteDialogStatus: false,
            createDialogSucceedStatus: false,
            errorDialogStatus: false,
            validationErrors: ''
        }
    }




    handleDelete = async () => {
        const { id } = this.props.match.params;
        if (id !== 'create') {
            await this.props.dispatch(handleDeleteCourseData(id));
            const statusCode = this.props.course.statusCode;
            if (statusCode === 204) {
                redirect('courses');
                this.props.dispatch(clearCourseData());
            }
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
                await this.props.dispatch(handleReceivedCourseData(id));
                this.props.initialize(this.props.course.course)
            }
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const userInput = this.props.materialUiFormData.values;
        try {
            await schema.validate(userInput, {
                abortEarly: false
            });
            const { id } = this.props.match.params;
            if (id === 'create') {
                await this.props.dispatch(handleCreateCourseData(userInput));
                const statusCode = this.props.course.statusCode;
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
                const newCourse = {...userInput, id};
                await this.props.dispatch(handleUpdateCourseData(newCourse));
                const statusCode = this.props.course.statusCode;
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

    render() {
        const { deleteDialogStatus, createDialogSucceedStatus, errorDialogStatus, validationErrors } = this.state;
        const { classes, reset } = this.props;
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar selected='Courses' menu={id === 'create' ? 'CREATE NEW COURSE' : 'COURSE DETAILS'}>
                    <form className={classes.root} onSubmit={this.handleFormSubmit}>
                        <Grid
                            container
                        >
                            <Grid item xs={12} className={classes.textField}>
                                <Field
                                    name="title"
                                    component={renderTextField}
                                    label="Title"
                                    fullWidth={true}
                                />
                                {validationErrors.title && <FormHelperText error>{validationErrors.title}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.textField}>
                                <Field
                                    name="fee"
                                    component={renderTextField}
                                    label="Fee($)"
                                    fullWidth={true}
                                />
                                {validationErrors.fee && <FormHelperText error>{validationErrors.fee.slice(0, 27)}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.textField}>
                                <Field
                                    name="maxStudent"
                                    component={renderSelectTextField}
                                    label="Max Student"
                                    fullWidth={true}
                                />
                                {validationErrors.maxStudent && <FormHelperText error>{validationErrors.maxStudent}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12} className={classes.textField}>
                                <Field
                                    name="description"
                                    component={renderTextField}
                                    label="Description"
                                    fullWidth={true}
                                />
                                {validationErrors.description && <FormHelperText error>{validationErrors.description}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12} className={classes.textField}>
                                <Field
                                    name="language"
                                    component={renderTextField}
                                    label="Language"
                                    fullWidth={true}
                                />
                                {validationErrors.language && <FormHelperText error>{validationErrors.language}</FormHelperText>}
                            </Grid>
                        </Grid>
                        <div className={classes.buttons}>
                            <Button
                                color='default'
                                variant='text'
                                className={classes.buttonRest}
                                onClick={reset}
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

CourseDetails = reduxForm({
    form: 'MaterialUiForm', // a unique identifier for this form
})(withStyles(styles)(CourseDetails));

export default connect(state)(CourseDetails);



