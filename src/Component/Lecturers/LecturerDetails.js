import React, { PureComponent, Fragment } from 'react';
import AppBar from '../Layout/AppBar';
import {TextField, Grid, Button, FormHelperText} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import MenuBar from '../Layout/MenuBar';
import {redirect, getValidationErrors, isNum} from "../Utils/Help";
import CreateSucceedDialog from "../Utils/CreateSucceedDialog";
import DeleteDialog from "../Utils/DeleteDialog";
import * as yup from "yup";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
    clearLecturerData,
    handleCreateLecturerData, handleDeleteLecturerData,
    handleReceivedLecturerData,
    handleUpdateLecturerData
} from "../../Actions/LecturersActions";
import PageLoader from "../Utils/PageLoader";
import ForbidErrorDialog from "../Utils/ForbidErrorDialog";

const state = state => ({
    lecturer: state.lecturer.lecturer,
    isLoading: state.lecturer.isLoading,
    statusCode: state.lecturer.statusCode,
    lecturerDetailsForm: state.form.lecturerDetailsForm,
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
    staffNumber: yup
        .string()
        .max(50)
        .label("Staff Number")
        .required(),
    email: yup
        .string()
        .email()
        .label("Email")
        .required(),
    bibliography: yup
        .string()
        .max(250)
        .label("Bibliography")
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

class LecturerDetails extends PureComponent{
    constructor() {
        super();
        this.state = {
            validationErrors: '',
            createDialogSucceedStatus: false,
            deleteDialogStatus: false,
            forbidErrorDialogStatus: false,
        }
    }

    componentWillMount() {
        this.props.dispatch(clearLecturerData());
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        if (isNum(id)) {
            await this.props.dispatch(handleReceivedLecturerData(id));
            this.props.initialize(this.props.lecturer);
            this.props.statusCode > 300 && this.setState({
                forbidErrorDialogStatus: true,
            })
        }
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const userInput = this.props.lecturerDetailsForm.values;
        try {
            await schema.validate(userInput, {
                abortEarly: false
            });
            const { id } = this.props.match.params;
            const { firstName, lastName, staffNumber, email, bibliography } = userInput;
            const newLecturer = {
                ...userInput,
                name: `${firstName.trim()} ${lastName.trim()}`,
                staffNumber: staffNumber.trim(),
                email: email.trim(),
                bibliography: bibliography.trim(),
            };
            if (id === 'create') {
                await this.props.dispatch(handleCreateLecturerData(newLecturer));
            } else {
                await this.props.dispatch(handleUpdateLecturerData(newLecturer));
            }
            const statusCode = this.props.statusCode;
            statusCode > 300 && this.setState({
                forbidErrorDialogStatus: true,
            });
            statusCode === 200 && this.setState({
                createDialogSucceedStatus: true,
            })
        } catch (error) {
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
                await this.props.dispatch(handleDeleteLecturerData(id));
                const statusCode = this.props.lecturer.statusCode;
                statusCode > 300 && this.setState({
                    forbidErrorDialogStatus: true,
                });
                if (statusCode === 204) {
                    redirect('lecturers');
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

    handleDeleteDialogClose = () => {
        this.setState({
            deleteDialogStatus: false,
        })
    };

    handleDeleteDialogOpen = () => {
        this.setState({
            deleteDialogStatus: true,
        })
    };

    render() {
        const { validationErrors, createDialogSucceedStatus, deleteDialogStatus, forbidErrorDialogStatus } = this.state;
        const { classes, reset, isLoading, statusCode } = this.props;
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar selected='Lecturers' menu={id === 'create' ? 'CREATE NEW LECTURER' : 'LECTURER DETAILS'}>
                    {isLoading && isNum(id) && <PageLoader/>}
                    {(!isLoading || !isNum(id)) && <form onSubmit={this.handleFormSubmit} className={classes.root}>
                        <Grid container >
                            <Grid item xs={12} md={6} className={classes.textField} >
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
                        <Grid item xs={12} className={classes.textField}>
                            <Field
                                name="staffNumber"
                                component={renderTextField}
                                label="Staff Number"
                                fullWidth={true}
                                validationErrors={validationErrors}
                            />
                        </Grid >
                        <Grid item xs={12} className={classes.textField}>
                            <Field
                                name="email"
                                component={renderTextField}
                                label="Email"
                                fullWidth={true}
                                validationErrors={validationErrors}
                            />
                        </Grid >
                        <Grid item xs={12} className={classes.textField}>
                            <Field
                                name="bibliography"
                                component={renderTextField}
                                label="Bibliography"
                                fullWidth={true}
                                validationErrors={validationErrors}
                            />
                        </Grid >
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
                        name='lecturer'
                        url={`lecturers/${this.props.lecturer.id}`}
                        createDialogSucceedStatus={createDialogSucceedStatus}
                        handleSucceedDialogClose={this.handleSucceedDialogClose}
                    />
                    <DeleteDialog
                        handleDelete={this.handleDelete}
                        handleDeleteDialogClose={this.handleDeleteDialogClose}
                        deleteDialogStatus={deleteDialogStatus}
                        content='lecturer'
                    />
                    <ForbidErrorDialog
                        forbidErrorDialogStatus = { forbidErrorDialogStatus }
                        statusCode={ statusCode }
                        handleForbidErrorDialogClose={this.handleForbidErrorDialogClose}
                    />
                </MenuBar>
            </Fragment>
        );
    }
}

LecturerDetails = reduxForm({
    form: 'lecturerDetailsForm', // a unique identifier for this form
})(withStyles(styles)(LecturerDetails));

export default connect(state)(LecturerDetails);