import React from 'react';
import CourseApi from './CourseApi';
import PageLoader from '../Utils/PageLoader';
import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'
import CourseCard from "./CourseCard";
import AddNewButton from '../Utils/AddNewButton';
import { Link } from 'react-router-dom';
import MenuBar from '../Layout/MenuBar';

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

    componentDidMount() {

    }

    async componentDidMount() {
        let courses = await CourseApi.getAllCourse();
        try {
            courses && this.setState({
                isLoading: false,
                courses: courses,
            });
        } catch (e) {

        }
    }

    // componentDidMount() {
    //     this.getAllCourse();
    // }
    //
    // getAllCourse = () => {
    //     CourseApi.getAllCourse().then(courses => {
    //         courses && this.setState({
    //             isLoading: false,
    //             courses: courses,
    //         });
    //     });
    // };

    render() {
        const {courses, isLoading} = this.state;
        const { classes } = this.props;

        return (
            <MenuBar selected='Courses' menu='Courses' name='course'>
                {isLoading && <PageLoader/>}
                {!isLoading && courses.length > 0 && this.renderCourseCards(courses)}
            </MenuBar>
        );
    }
}


export default withStyles(styles())(Courses);

// 123-456-789
// \d{3}-\d{3}-\d{3}