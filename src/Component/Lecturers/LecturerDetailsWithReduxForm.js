import React, { PureComponent, Fragment } from 'react';
import AppBar from '../Layout/AppBar';
import {TextField, Grid, Button, FormHelperText} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import MenuBar from '../Layout/MenuBar';
import { redirect, getValidationErrors } from "../Utils/Help";
import CreateSucceedDialog from "../Utils/CreateSucceedDialog";
import DeleteDialog from "../Utils/DeleteDialog";
import ErrorDialog from "../Utils/ErrorDialog";
import * as yup from "yup";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
    clearLecturerData,
    handleCreateLecturerData, handleDeleteLecturerData,
    handleReceivedLecturerData,
    handleUpdateLecturerData
} from "../../Actions/LecturersActions";

const state = state => ({
    lecturer: state.lecturer,
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
        .number()
        .max(65536)
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
    constructor(props) {
        super(props);
        this.state = {
            validationErrors: '',
            createDialogSucceedStatus: false,
            deleteDialogStatus: false,
            errorDialogStatus: false,
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
                name: `${firstName.trim()} ${lastName.trim()}`,
                staffNumber: staffNumber.trim(),
                email: email.trim(),
                bibliography: bibliography.trim(),
            };
            if (id === 'create') {
                await this.props.dispatch(handleCreateLecturerData(newLecturer));
                const statusCode = this.props.lecturer.statusCode;
                if (statusCode === 200) {
                    this.setState({
                        createDialogSucceedStatus: true
                    })
                } else if (statusCode > 300) {
                    this.setState({
                        errorDialogStatus: true,
                    })
                }
            } else {
                await this.props.dispatch(handleUpdateLecturerData({
                    ...newLecturer,
                    id,
                }));
                const statusCode = this.props.lecturer.statusCode;
                if (statusCode === 204) {
                    this.setState({
                        createDialogSucceedStatus: true
                    })
                } else if (statusCode > 300) {
                    this.setState({
                        errorDialogStatus: true,
                    })
                }
            }
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
        if (id !== 'create') {
            try {
                await this.props.dispatch(handleDeleteLecturerData(id));
                const statusCode = this.props.lecturer.statusCode;
                if (statusCode === 204) {
                    redirect('lecturers');
                    this.props.dispatch(clearLecturerData())
                }
            } catch (e) {
                console.log(e)
            }
        }
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

    handleErrorDialogClose = () => {
        this.setState({
            errorDialogStatus: false,
        })
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        if (id !== 'create') {
            await this.props.dispatch(handleReceivedLecturerData(id));
            this.props.initialize(this.props.lecturer.lecturer)
        }
    }

    render() {
        const { validationErrors, createDialogSucceedStatus, deleteDialogStatus, errorDialogStatus } = this.state;
        const { classes, reset } = this.props;
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar selected='Lecturers' menu={id === 'create' ? 'CREATE NEW LECTURER' : 'LECTURER DETAILS'}>
                    <form onSubmit={this.handleFormSubmit} className={classes.root}>
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
                    </form>
                    <CreateSucceedDialog
                        name='lecturer'
                        redirect={id === 'create'}
                        url='lecturers'
                        createDialogSucceedStatus={createDialogSucceedStatus}
                        handleSucceedDialogClose={this.handleSucceedDialogClose}
                    />
                    <DeleteDialog
                        handleDelete={this.handleDelete}
                        handleDeleteDialogClose={this.handleDeleteDialogClose}
                        deleteDialogStatus={deleteDialogStatus}
                        content='lecturer'
                    />
                    <ErrorDialog
                        content='lecturer'
                        errorDialogStatus={errorDialogStatus}
                        handleErrorDialogClose={this.handleErrorDialogClose}
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