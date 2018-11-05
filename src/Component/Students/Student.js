import React, {Component, PureComponent} from 'react';
import { TextField, MenuItem, Grid, Button, Paper} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import StudentsApi from './StudentsApi';
import Layout from '../Layout/Layout';

const styles = {
    paper: {
        width: '600px',
        padding: '20px',
    },

    gridLeft: {
        paddingRight: '5px'
    },

    gridRight: {
        paddingLeft: '5px'
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


class Student extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: "",
            gender: '',
            DOB: 'dd/mm/yyyy',
            email: '',
            credit: ''
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

    handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, gender, DOB, email, credit } = this.state;
        console.log({firstName, lastName, gender, DOB, email, credit})
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id !== 'create');
        if (id !== 'create') {
            const { student, statusCode } = await StudentsApi.getStudentById(id);
            if (statusCode >= 200 && statusCode <= 300) {
                this.setState({
                    ...student
                })
            }
        }
    }

    render() {
        const { firstName, lastName, gender, DOB, email, credit } = this.state;
        const { classes } = this.props;
        const { id } = this.props.match.params;

        return (
            <Layout selected='Students' menu={id === 'create' ? 'CREATE NEW STUDENT' : 'STUDENT DETAILS'}>
                <Paper className={classes.paper}>
                    {console.log({ firstName, lastName, gender, DOB, email, credit })}
                    <form onSubmit={this.handleSubmit}>
                        <Grid
                            container
                        >
                            <Grid
                                item xs={6} className={classes.gridLeft}
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
                            </Grid>
                            <Grid item xs={6} className={classes.gridRight}>
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
                            </Grid>
                        </Grid>
                        <Grid
                            container
                        >
                            <Grid
                                item xs={6} className={classes.gridLeft}
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
                            </Grid>
                            <Grid item xs={6} className={classes.gridRight}>
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
                            </Grid>
                        </Grid>
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
            </Layout>
        );
    }
}

export default withStyles(styles)(Student);