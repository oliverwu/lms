import React, { PureComponent } from 'react';
import {TextField, Grid, Button, Paper, FormHelperText} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import LecturersApi from './LecturersApi';
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
    paper: {
        maxWidth: '600px',
        padding: '20px',
    },

    textField: {
        padding: '0 5px',
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

class CourseDetails extends PureComponent{
    constructor() {
        super();
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            staffNumber: '',
            email: '',
            bibliography: '',
            validationErrors: ''
        }
    }

    handleReset = () => {
        this.setState({
            firstName: '',
            lastName: '',
            staffNumber: '',
            email: '',
            bibliography: ''
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
        const { firstName, lastName, staffNumber, email, bibliography } = this.state;
        const userInput = { firstName, lastName, staffNumber, email, bibliography };
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


        console.log({ firstName, lastName, staffNumber, email, bibliography})
    };

    handleDelete = () => {
        console.log('delete');
    };


    componentDidMount() {
        const { id } = this.props.match.params;
        if (id !== 'create') {
            this.getLecturerById(id);
        }
    }

    getLecturerById = (id) => {
        LecturersApi.getLecturerById(id).then(lecturer => {
            lecturer && this.setState({
                ...lecturer
            })
        });
    };

    render() {
        const { firstName, lastName, staffNumber, email, bibliography, validationErrors } = this.state;
        const { classes } = this.props;
        const { id } = this.props.match.params;

        return (
            <MenuBar selected='Lecturers' menu={id === 'create' ? 'CREATE NEW LECTURER' : 'LECTURER DETAILS'}>
                <Paper className={classes.paper}>
                    {console.log({ id, firstName, lastName, staffNumber, email, bibliography })}
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
                        <Grid item xs={12} className={classes.textField}>
                            <TextField
                                label="Staff Number"
                                placeholder='Staff Number'
                                fullWidth
                                // margin='normal'
                                name='staffNumber'
                                value={staffNumber}
                                onChange={this.handleChange}
                            />
                            {validationErrors.staffNumber && <FormHelperText error>{validationErrors.staffNumber}</FormHelperText>}
                        </Grid >
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
                        </Grid >
                        <Grid item xs={12} className={classes.textField}>
                            <TextField
                                label='Bibliography'
                                placeholder='Bibliography'
                                fullWidth
                                name='bibliography'
                                value={bibliography}
                                margin='normal'
                                onChange={this.handleChange}
                            />
                            {validationErrors.bibliography && <FormHelperText error>{validationErrors.bibliography}</FormHelperText>}
                        </Grid >
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
                                    onClick={this.handleDelete}
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

export default withStyles(styles)(CourseDetails);