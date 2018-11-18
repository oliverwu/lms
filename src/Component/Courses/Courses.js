import React, {PureComponent, Fragment} from 'react';
import CourseApi from './CourseApi';
import PageLoader from '../Utils/PageLoader';
import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'
import CourseCard from "./CourseCard";
import MenuBar from '../Layout/MenuBar';
import AppBar from '../Layout/AppBar';
import { connect } from 'react-redux';
import { handleReceivedALLCoursesData } from "../../Actions/CoursesActions";

const state = state => {
    return {
        allCourses: state.courses.allCourses,
        isLoading: state.courses.isLoading,
    }
};

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
        console.log('courses did mount')
        this.props.dispatch(handleReceivedALLCoursesData())
        // let courses = await CourseApi.getAllCourse();
        // try {
        //     courses && this.setState({
        //         isLoading: false,
        //         courses: courses,
        //     });
        // } catch (e) {
        //
        // }
    }


    render() {
        // const { isLoading } = this.state;
        const { allCourses, isLoading } = this.props;

        return (
            <Fragment>
                <AppBar/>
                {console.log(allCourses)}
                {console.log(isLoading)}
                <MenuBar selected='Courses' menu='Courses' name='course'>
                    {isLoading && <PageLoader/>}
                    {!isLoading && allCourses.length > 0 && this.renderCourseCards(allCourses)}
                    {/*{allCourses.length > 0 && this.renderCourseCards(allCourses)}*/}
                </MenuBar>
            </Fragment>

        );
    }
}


export default connect(state)(withStyles(styles)(Courses));
