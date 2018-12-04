import React, { PureComponent, Fragment } from 'react';
import AppBar from '../Layout/AppBar';
import {TextField, MenuItem, Grid, Button,  FormHelperText} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import StudentsApi from './StudentsApi';
import MenuBar from '../Layout/MenuBar';
import { redirect, getValidationErrors } from "../Utils/Help";
import CreateSucceedDialog from "../Utils/CreateSucceedDialog";
import DeleteDialog from "../Utils/DeleteDialog";
import ErrorDialog from "../Utils/ErrorDialog";
import * as yup from "yup";

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
    DOB: yup
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
        .max(500)
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

class StudentDetails extends PureComponent{
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: "",
            gender: '',
            DOB: 'dd/mm/yyyy',
            email: '',
            credit: '',
            validationErrors: '',
            createDialogSucceedStatus: false,
            errorDialogStatus: false,
            deleteDialogStatus: false,
        }
    }

    handleReset = () => {
        this.setState({
            firstName: '',
            lastName: "",
            gender: '',
            DOB: 'dd/mm/yyyy',
            email: '',
            credit: ''
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
        const { firstName, lastName, gender, DOB, email, credit } = this.state;
        const userInput = { firstName, lastName, gender, DOB, email, credit };

        try {
            await schema.validate(userInput, {
                abortEarly: false
            });
            const { id } = this.props.match.params;
            const newGender = genderMap.filter(item => {
                return gender === item.name;
            })[0].abbr;
            if ( id === 'create') {
                const newStudent = {firstName, lastName, gender:newGender, dateOfBirth:DOB, email, credit};
                const statusCode = await StudentsApi.createNewStudent(newStudent);
                if (statusCode === 200) {
                    this.setState({
                        createDialogSucceedStatus: true
                    })
                } else {
                    this.setState({
                        errorDialogStatus: true,
                    })
                }
            } else {
                const newStudent = {id, firstName, lastName, gender:newGender, dateOfBirth:DOB, email, credit};
                const statusCode = await StudentsApi.updateStudent(newStudent);
                if (statusCode === 204) {
                    this.setState({
                        createDialogSucceedStatus: true
                    })
                } else {
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

    handleSucceedDialogClose = () => {
        this.setState({
            createDialogSucceedStatus: false,
        })
    };

    handleErrorDialogClose = () => {
        this.setState({
            errorDialogStatus: false,
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

    handleDelete = async () => {
        const { id } = this.props.match.params;
        const statusCode = await StudentsApi.deleteStudent(id);
        redirect('students');
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id !== 'create') {
            this.getStudentById(id);
        }
    }

    getStudentById = (id) => {
        StudentsApi.getStudentById(id).then(student => {
            student && this.setState({
                ...student
            })
        });
    };


    render() {
        const { firstName, lastName, gender, DOB, email, credit, validationErrors, createDialogSucceedStatus, errorDialogStatus, deleteDialogStatus } = this.state;
        const { classes } = this.props;
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar selected='Students' menu={id === 'create' ? 'CREATE NEW STUDENT' : 'STUDENT DETAILS'}>
                    <form onSubmit={this.handleSubmit} className={classes.root}>
                        <Grid
                            container
                        >
                            <Grid
                                item xs={12} md={6} className={classes.textField}
                            >
                                <TextField
                                    label='First Name'
                                    id='student-firstName'
                                    placeholder='First Name'
                                    fullWidth
                                    name='firstName'
                                    value={firstName}
                                    margin='normal'
                                    onChange={this.handleChange}
                                />
                                {validationErrors.firstName && <FormHelperText error>{validationErrors.firstName}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.textField}>
                                <TextField
                                    id="student-lastName"
                                    label="Last Name"
                                    fullWidth
                                    placeholder='Last Name'
                                    margin='normal'
                                    // className={classes.maxStudents}
                                    value={lastName}
                                    name='lastName'
                                    onChange={this.handleChange}
                                >
                                </TextField>
                                {validationErrors.lastName && <FormHelperText error>{validationErrors.lastName}</FormHelperText>}
                            </Grid>
                        </Grid>
                        <Grid
                            container
                        >
                            <Grid
                                item xs={12} md={6} className={classes.textField}
                            >
                                <TextField
                                    label='Date of birth'
                                    id='student-DOB'
                                    type='date'
                                    // placeholder='Date of birth'
                                    fullWidth
                                    name='DOB'
                                    value={DOB}
                                    // margin='normal'
                                    onChange={this.handleChange}
                                />
                                {validationErrors.DOB && <FormHelperText error>{validationErrors.DOB}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.textField}>
                                <TextField
                                    id="student-gender"
                                    select
                                    label="Gender"
                                    fullWidth
                                    // margin='normal'
                                    className={classes.gender}
                                    value={gender}
                                    name='gender'
                                    onChange={this.handleChange}
                                    helperText="Please select the gender"
                                >
                                    {['Male', 'Female'].map(option => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {validationErrors.gender && <FormHelperText error>{validationErrors.gender}</FormHelperText>}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.textField}>
                            <TextField
                                label="Email"
                                placeholder='Email'
                                type='email'
                                fullWidth
                                // margin='normal'
                                name='email'
                                value={email}
                                onChange={this.handleChange}
                            />
                            {validationErrors.email && <FormHelperText error>{validationErrors.email}</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} className={classes.textField}>
                            <TextField
                                label='Credit'
                                id='student-credit'
                                placeholder='Credit'
                                fullWidth
                                name='credit'
                                value={credit}
                                margin='normal'
                                onChange={this.handleChange}
                            />
                            {validationErrors.credit && <FormHelperText error>{validationErrors.credit}</FormHelperText>}
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
                    <CreateSucceedDialog
                        name='student'
                        redirect={id === 'create'}
                        url='students'
                        createDialogSucceedStatus={createDialogSucceedStatus}
                        handleSucceedDialogClose={this.handleSucceedDialogClose}
                    />
                    <ErrorDialog
                        content='student'
                        errorDialogStatus={errorDialogStatus}
                        handleErrorDialogClose={this.handleErrorDialogClose}
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

export default withStyles(styles)(StudentDetails);