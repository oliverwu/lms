import React, {PureComponent, Fragment} from 'react';
import { TextField, MenuItem, Grid, Button, FormHelperText } from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import MenuBar from '../Layout/MenuBar';
import {redirect, getValidationErrors, isNum} from "../Utils/Help";
import CreateSucceedDialog from "../Utils/CreateSucceedDialog";
import DeleteDialog from "../Utils/DeleteDialog";
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
import ForbidErrorDialog from "../Utils/ForbidErrorDialog";

const state = state => {
    return {
        course: state.course,
        courseDetailsForm: state.form.courseDetailsForm,
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

    buttonReset: {
        width: '60px',
        margin: '10px 0',
        paddingLeft: 0,
        paddingRight: 0,
        color: '#757575'
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
    { validationErrors, input, name, fullWidth, label, meta: { touched, error, dirty }, ...custom  },
) => (
    <Fragment>
        <TextField
            label={label}
            placeholder={label}
            fullWidth={fullWidth}
            margin='normal'
            {...input}
            {...custom}
        />
        {validationErrors[input.name] && <FormHelperText error>{validationErrors[input.name]}</FormHelperText>}
    </Fragment>
);

const renderSelectTextField = (
    { validationErrors, input, name, fullWidth, label, meta: { touched, error }, ...custom },
) => (
    <Fragment>
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
        {validationErrors[input.name] && <FormHelperText error>{validationErrors[input.name]}</FormHelperText>}
    </Fragment>
);


class CourseDetails extends PureComponent {
    constructor() {
        super();
        this.state = {
            deleteDialogStatus: false,
            createDialogSucceedStatus: false,
            validationErrors: '',
            forbidErrorDialogStatus: false,
        }
    }

    componentWillMount() {
        this.props.dispatch(clearCourseData())
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        if (isNum(id)) {
            await this.props.dispatch(handleReceivedCourseData(id));
            this.props.initialize(this.props.course.course)
            this.props.statusCode > 300 && this.setState({
                forbidErrorDialogStatus: true,
            })
        }
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const userInput = this.props.courseDetailsForm.values;
        try {
            await schema.validate(userInput, {
                abortEarly: false
            });
            const { id } = this.props.match.params;
            const { title, description, language } = userInput;
            const newCourse = {
                ...userInput,
                title: title.trim(),
                description: description.trim(),
                language: language.trim(),
            };
            if (id === 'create') {
                await this.props.dispatch(handleCreateCourseData(newCourse));
            } else if(isNum(id)) {
                await this.props.dispatch(handleUpdateCourseData({
                    ...newCourse,
                    id,
                }));
            }
            const statusCode = this.props.course.statusCode;
            statusCode > 300 && this.setState({
                forbidErrorDialogStatus: true,
            });
            statusCode === 200 && this.setState({
                createDialogSucceedStatus: true,
            })
        } catch (error) {
            console.log(error);
            const validationErrors = getValidationErrors(error);
            this.setState({
                validationErrors
            })
        }
    };

    handleDelete = async () => {
        const { id } = this.props.match.params;
        if (isNum(id)) {
            try {
                await this.props.dispatch(handleDeleteCourseData(id));
                const statusCode = this.props.course.statusCode;
                statusCode > 300 && this.setState({
                    forbidErrorDialogStatus: true,
                });
                if (statusCode === 204) {
                    redirect('courses');
                }
            } catch (e) {
                console.log(e)
            }
        }
    };

    handleForbidErrorDialogClose = () => {
        this.setState({
            forbidErrorDialogStatus: false,
        })
    };

    handleSucceedDialogClose = () => {
        this.setState({
            createDialogSucceedStatus: false,
        })
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
        const { deleteDialogStatus, createDialogSucceedStatus, validationErrors, forbidErrorDialogStatus } = this.state;
        const { classes, reset } = this.props;
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar selected='Courses' menu={id === 'create' ? 'CREATE NEW COURSE' : 'COURSE DETAILS'}>
                    <form className={classes.root} onSubmit={this.handleFormSubmit}>
                        <Grid container >
                            <Grid item xs={12} className={classes.textField}>
                                <Field
                                    name="title"
                                    component={renderTextField}
                                    label="Title"
                                    fullWidth={true}
                                    validationErrors={validationErrors}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.textField}>
                                <Field
                                    name="fee"
                                    component={renderTextField}
                                    label="Fee($)"
                                    fullWidth={true}
                                    validationErrors={validationErrors}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.textField}>
                                <Field
                                    name="maxStudent"
                                    component={renderSelectTextField}
                                    label="Max Student"
                                    fullWidth={true}
                                    validationErrors={validationErrors}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.textField}>
                                <Field
                                    name="description"
                                    component={renderTextField}
                                    label="Description"
                                    fullWidth={true}
                                    validationErrors={validationErrors}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.textField}>
                                <Field
                                    name="language"
                                    component={renderTextField}
                                    label="Language"
                                    fullWidth={true}
                                    validationErrors={validationErrors}
                                />
                            </Grid>
                        </Grid>
                        <div className={classes.buttons}>
                            <Button
                                color='default'
                                variant='text'
                                className={classes.buttonReset}
                                onClick={reset}
                            >
                                reset
                            </Button>
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
                        name='course'
                        url={`courses/${this.props.course.course.id}`}
                        createDialogSucceedStatus={createDialogSucceedStatus}
                        handleSucceedDialogClose={this.handleSucceedDialogClose}
                    />
                    <ForbidErrorDialog
                        forbidErrorDialogStatus = { forbidErrorDialogStatus }
                        statusCode={this.props.course.statusCode}
                        handleForbidErrorDialogClose={this.handleForbidErrorDialogClose}
                    />
                </MenuBar>
            </Fragment>

        );
    }
}

CourseDetails = reduxForm({
    form: 'courseDetailsForm', // a unique identifier for this form
})(withStyles(styles)(CourseDetails));

export default connect(state)(CourseDetails);



