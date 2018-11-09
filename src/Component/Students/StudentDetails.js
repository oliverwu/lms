import React, {Component, PureComponent} from 'react';
import {TextField, MenuItem, Grid, Button, Paper, FormHelperText} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import StudentsApi from './StudentsApi';
import MenuBar from '../Layout/MenuBar';
import { redirect, getValidationErrors } from "../Utils/Help";
import CreateSucceedDialog from "../Utils/CreateSucceedDialog";
import DeleteDialog from "../Utils/DeleteDialog";
import ErrorDialog from "../Utils/ErrorDialog";
import * as yup from "yup";
import CourseApi from "../Courses/CourseApi";

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
    paper: {
        maxWidth: '600px',
        padding: '20px',
    },

    textField: {
        padding: '0 5px',
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


class StudentDetails extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: "",
            gender: '',
            DOB: 'dd/mm/yyyy',
            email: '',
            credit: '',
            validationErrors: '',
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

        } catch (error) {
            const validationErrors = getValidationErrors(error);
            console.log(validationErrors);
            this.setState({
                validationErrors
            })
        }

        console.log({firstName, lastName, gender, DOB, email, credit})
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
        const { firstName, lastName, gender, DOB, email, credit, validationErrors } = this.state;
        const { classes } = this.props;
        const { id } = this.props.match.params;

        return (
            <MenuBar selected='Students' menu={id === 'create' ? 'CREATE NEW STUDENT' : 'STUDENT DETAILS'}>
                <Paper className={classes.paper}>
                    {console.log({ id, firstName, lastName, gender, DOB, email, credit })}
                    <form onSubmit={this.handleSubmit}>
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
                </Paper>
            </MenuBar>
        );
    }
}

export default withStyles(styles)(StudentDetails);