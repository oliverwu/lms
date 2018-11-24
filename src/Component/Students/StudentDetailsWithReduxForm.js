import React, { PureComponent, Fragment } from 'react';
import AppBar from '../Layout/AppBar';
import {TextField, MenuItem, Grid, Button,  FormHelperText} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import MenuBar from '../Layout/MenuBar';
import {redirect, getValidationErrors, isNum} from "../Utils/Help";
import CreateSucceedDialog from "../Utils/CreateSucceedDialog";
import DeleteDialog from "../Utils/DeleteDialog";
import * as yup from "yup";
import {Field, reduxForm} from "redux-form";
import { connect } from 'react-redux';
import {
    clearStudentData,
    handleCreateStudentData, handleDeleteStudentData,
    handleReceivedStudentData,
    handleUpdateStudentData
} from "../../Actions/StudentsActions";
import ForbidErrorDialog from "../Utils/ForbidErrorDialog";
import PageLoader from "../Utils/PageLoader";

const state = state => ({
    student: state.student,
    isLoading: state.student.isLoading,
    statusCode: state.student.statusCode,
    studentDetailsForm: state.form.studentDetailsForm,
});

const schema = yup.object().shape({
    firstName: yup
        .string()
        .max(30)
        .label("First Name")
        .required(),
    lastName: yup
        .string()
        .max(30)
        .label("Last Name")
        .required(),
    dateOfBirth: yup
        .date()
        .max(new Date())
        .label("Date of Birth")
        .required(),
    gender: yup
        .string()
        .label("Gender")
        .required(),
    email: yup
        .string()
        .email()
        .label("Email")
        .required(),
    credit: yup
        .number()
        .positive()
        .max(5000)
        .label("Credit")
        .required(),
});

const styles = {
    root: {
        maxWidth: '600px',
    },

    textField: {
        padding: '0 5px',
        textAlign:'left'
    },

    gender: {
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

const genderMap = [
    {
        abbr: 'M',
        name: 'Male'
    },
    {
        abbr: 'F',
        name: 'Female'
    }
];

const renderTextField = (
    { validationErrors, input, name, type, fullWidth, label, meta: { touched, error, dirty }, ...custom  },
) => (
    <Fragment>
        <TextField
            type={type}
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
            {['Male', 'Female'].map(option => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
        {validationErrors[input.name] && <FormHelperText error>{validationErrors[input.name]}</FormHelperText>}
    </Fragment>
);


class StudentDetails extends PureComponent{
    constructor() {
        super();
        this.state = {
            validationErrors: '',
            createDialogSucceedStatus: false,
            forbidErrorDialogStatus: false,
            deleteDialogStatus: false,
        }
    }

    componentWillMount() {
        this.props.dispatch(clearStudentData());
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        if (isNum(id)) {
            await this.props.dispatch(handleReceivedStudentData(id));
            this.props.initialize(this.props.student.student);
            this.props.statusCode > 300 && this.setState({
                forbidErrorDialogStatus: true,
            })
        } else {
            this.props.initialize({
                dateOfBirth: 'dd/mm/yyyy',
            });
        }
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const userInput = this.props.studentDetailsForm.values;
        try {
            await schema.validate(userInput, {
                abortEarly: false
            });
            const { id } = this.props.match.params;
            const { firstName, lastName, email } = userInput;

            const gender = genderMap.filter(item => {
                return userInput.gender === item.name;
            })[0].abbr;
            const newStudent = {
                ...userInput,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                gender,
            };
            if ( id === 'create') {
                console.log(newStudent);
                await this.props.dispatch(handleCreateStudentData(newStudent));
            } else if(isNum(id)){
                console.log(newStudent);
                await this.props.dispatch(handleUpdateStudentData(newStudent));
            }
            const statusCode = this.props.student.statusCode;
            console.log(statusCode);
            statusCode > 300 && this.setState({
                forbidErrorDialogStatus: true,
            });
            statusCode === 200 && this.setState({
                createDialogSucceedStatus: true,
            })
        } catch (error) {
            const validationErrors = getValidationErrors(error);
            console.log(validationErrors);
            this.setState({
                validationErrors
            })
        }
    };

    handleDelete = async () => {
        const { id } = this.props.match.params;
        if (isNum(id)) {
            try {
                console.log(id);
                await this.props.dispatch(handleDeleteStudentData(id));
                const statusCode = this.props.statusCode;
                statusCode > 300 && this.setState({
                    forbidErrorDialogStatus: true,
                });
                if (statusCode === 204) {
                    redirect('students');
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


    handleDeleteDialogClose= () => {
        this.setState({
            deleteDialogStatus: false,
        })
    };

    handleDeleteDialogOpen= () => {
        this.setState({
            deleteDialogStatus: true,
        })
    };

    render() {
        const { validationErrors, createDialogSucceedStatus, forbidErrorDialogStatus, deleteDialogStatus } = this.state;
        const { classes, reset, isLoading, statusCode } = this.props;
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar selected='Students' menu={id === 'create' ? 'CREATE NEW STUDENT' : 'STUDENT DETAILS'}>
                    {isLoading && <PageLoader/>}
                    {!isLoading && <form onSubmit={this.handleFormSubmit} className={classes.root}>
                        <Grid container >
                            <Grid
                                item xs={12} md={6} className={classes.textField}
                            >
                                <Field
                                    name="firstName"
                                    component={renderTextField}
                                    label="First Name"
                                    fullWidth={true}
                                    validationErrors={validationErrors}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.textField}>
                                <Field
                                    name="lastName"
                                    component={renderTextField}
                                    label="Last Name"
                                    fullWidth={true}
                                    validationErrors={validationErrors}
                                />
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid
                                item xs={12} md={6} className={classes.textField}
                            >
                                <Field
                                    name="dateOfBirth"
                                    component={renderTextField}
                                    label="Date of birth"
                                    fullWidth={true}
                                    type='date'
                                    validationErrors={validationErrors}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.textField}>
                                <Field
                                    name="gender"
                                    component={renderSelectTextField}
                                    label="Gender"
                                    fullWidth={true}
                                    validationErrors={validationErrors}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.textField}>
                            <Field
                                name="email"
                                component={renderTextField}
                                label="Email"
                                type='email'
                                fullWidth={true}
                                validationErrors={validationErrors}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.textField}>
                            <Field
                                name="credit"
                                component={renderTextField}
                                label="Credit"
                                fullWidth={true}
                                validationErrors={validationErrors}
                            />
                        </Grid>
                        <div className={classes.buttons}>
                            <Button
                                color='default'
                                variant='text'
                                className={classes.buttonReset}
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
                    </form>}
                    <CreateSucceedDialog
                        name='student'
                        url={`students/${this.props.student.student.id}`}
                        createDialogSucceedStatus={createDialogSucceedStatus}
                        handleSucceedDialogClose={this.handleSucceedDialogClose}
                    />
                    <ForbidErrorDialog
                        forbidErrorDialogStatus = { forbidErrorDialogStatus }
                        statusCode={ statusCode }
                        handleForbidErrorDialogClose={this.handleForbidErrorDialogClose}
                    />
                    <DeleteDialog
                        deleteDialogStatus={deleteDialogStatus}
                        handleDeleteDialogClose={this.handleDeleteDialogClose}
                        content='student'
                        handleDelete={this.handleDelete}
                    />
                </MenuBar>
            </Fragment>

        );
    }
}

StudentDetails = reduxForm({
    form: 'studentDetailsForm', // a unique identifier for this form
})(withStyles(styles)(StudentDetails));

export default connect(state)(StudentDetails);