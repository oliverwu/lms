import React, { PureComponent } from 'react';
import {TextField, Grid, Button, Paper} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import LecturersApi from './LecturersApi';
import MenuBar from '../Layout/MenuBar';

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
            bibliography: ''
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

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, firstName, lastName, staffNumber, email, bibliography } = this.state;
        console.log({id, firstName, lastName, staffNumber, email, bibliography})
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
        const { firstName, lastName, staffNumber, email, bibliography } = this.state;
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
                        <TextField
                            label="Staff Number"
                            placeholder='Staff Number'
                            fullWidth
                            // margin='normal'
                            name='staffNumber'
                            value={staffNumber}
                            onChange={this.handleChange}
                        />
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
                            label='Bibliography'
                            placeholder='Bibliography'
                            fullWidth
                            name='bibliography'
                            value={bibliography}
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