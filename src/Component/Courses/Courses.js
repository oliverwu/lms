import React from 'react';
import CourseApi from './CourseApi';
import PageLoader from '../Utils/PageLoader';
import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'
import CourseCard from "./CourseCard";
import AddNewButton from '../Utils/AddNewButton';
import { Link } from 'react-router-dom';

const styles = theme => ({
    button: {
        float: 'right',
        marginRight: '10px',
    }
});

class Courses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            courses: [],
        }
    }

    renderCourseCards(courses) {
        return (
            <div>
                <Grid container
                      direction="row"
                >
                    {courses.map((course) => {
                        return (
                            <Grid item xs={12} md={4} lg={3} key={course.id}>
                                <Grid container
                                      direction="row"
                                      justify="center"
                                      alignItems="center">
                                    <CourseCard title = {course.title} description = {course.description} id={course.id}/>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        );
    }

    async componentDidMount() {
        let data = await CourseApi.getAllCourse();
        const {courses, statusCode} = data;
        if (statusCode >= 200 && statusCode <= 300) {
            courses && this.setState({
                isLoading: false,
                courses: data.courses,
            })
        }
    }

    render() {
        const {courses, isLoading} = this.state;
        const { classes } = this.props;

        return (
            <div >
                {!isLoading && <Link to='/courses/create' style={{textDecoration: 'none'}}>
                    <div className={classes.button}>
                        <AddNewButton name='Add new course' />
                    </div>
                </Link>}
                {/*Course {this.props.match.params.id !== 'create'}*/}
                {/*会包含路由里面的变量*/}
                {isLoading && <PageLoader/>}
                {!isLoading && courses.length > 0 && this.renderCourseCards(courses)}
            </div>
        );
    }
}


export default withStyles(styles())(Courses);

// 123-456-789
// \d{3}-\d{3}-\d{3}