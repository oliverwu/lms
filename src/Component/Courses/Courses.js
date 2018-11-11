import React, {PureComponent, Fragment} from 'react';
import CourseApi from './CourseApi';
import PageLoader from '../Utils/PageLoader';
import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'
import CourseCard from "./CourseCard";
import MenuBar from '../Layout/MenuBar';
import AppBar from '../Layout/AppBar';


const styles = theme => ({
    button: {
        float: 'right',
        marginRight: '10px',
    }
});

class Courses extends PureComponent{
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
                      justify="flex-start"
                      alignItems="center"
                >
                    {courses.map((course) => {
                        return (
                            <Grid item key={course.id}>
                                <CourseCard title = {course.title} description = {course.description} id={course.id}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        );
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


    render() {
        const {courses, isLoading,} = this.state;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar selected='Courses' menu='Courses' name='course'>
                    {isLoading && <PageLoader/>}
                    {!isLoading && courses.length > 0 && this.renderCourseCards(courses)}
                </MenuBar>
            </Fragment>

        );
    }
}


export default withStyles(styles)(Courses);
