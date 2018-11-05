import React, {Component, PureComponent} from 'react';
import { TextField, MenuItem, Grid, Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import CourseApi from './CourseApi';

const styles = {
    root: {
        width: '600px',
    },

    gridFee: {
        paddingRight: '5px'
    },

    gridMaxStudents: {
        paddingLeft: '5px'
    },

    maxStudents: {
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

class Course extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            fee: '',
            maxStudents: 0,
            description: '',
            language: '',
        }
    }

    handleReset = () => {
        this.setState({
            title: '',
            fee: '',
            maxStudents: 0,
            description: '',
            language: '',
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
        const { title, fee, maxStudents, description } = this.state;
        console.log({title, fee, maxStudents, description})
    };

    handleDelete = () => {
        console.log('delete')
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id !== 'create');
        if (id !== 'create') {
            const { course, statusCode } = await CourseApi.getAllCourseById(id);
            console.log({course, statusCode});
            if (statusCode >= 200 && statusCode <= 300) {
                console.log(course);
                this.setState({
                    ...course
                })
            }
        }
    }

    render() {
        const { title, fee, maxStudents, description, language} = this.state;
        const { classes } = this.props;
        const { id } = this.props.match.params;

        return (
            <div>
                {console.log(1)}
                <form className={classes.root} onSubmit={this.handleSubmit}>
                    <TextField
                        label='Title'
                        id='course-title'
                        placeholder='Title'
                        fullWidth
                        name='title'
                        value={title}
                        margin='normal'
                        onChange={this.handleChange}
                    />
                    <Grid
                        container
                    >
                        <Grid
                            item xs={6} className={classes.gridFee}
                        >
                            <TextField
                                label='Fee($)'
                                id='course-fee'
                                type='number'
                                placeholder='Fee($)'
                                fullWidth
                                name='fee'
                                value={fee}
                                // margin='normal'
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.gridMaxStudents}>
                            <TextField
                                id="max-student"
                                select
                                label="Max Student"
                                fullWidth
                                // margin='normal'
                                className={classes.maxStudents}
                                value={maxStudents}
                                name='maxStudents'
                                onChange={this.handleChange}
                                // SelectProps={{
                                //     MenuProps: {
                                //         className: classes.menu,
                                //     },
                                // }}
                                helperText="Please select the number of max students"
                            >
                                {maxStudentsOptions.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <TextField
                        label="Description"
                        placeholder='Description for the course'
                        fullWidth
                        margin='normal'
                        name='description'
                        value={description}
                        onChange={this.handleChange}
                    />
                    <TextField
                        label='Language'
                        id='course-language'
                        placeholder='Language'
                        fullWidth
                        name='language'
                        value={language}
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
            </div>
        );
    }
}

export default withStyles(styles)(Course);