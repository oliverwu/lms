import React, {PureComponent, Fragment} from 'react';
import PageLoader from '../Utils/PageLoader';
import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'
import CourseCard from "./CourseCard";
import MenuBar from '../Layout/MenuBar';
import AppBar from '../Layout/AppBar';
import { connect } from 'react-redux';
import { handleReceivedALLCoursesData, clearCoursesData } from "../../Actions/CoursesActions";
import ForbidErrorDialog from '../Utils/ForbidErrorDialog';

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
    },
    coursesCardGrid: {
        [theme.breakpoints.up('xs')]: {
            width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
            width: '330px'
        },
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
        const { classes } = this.props;

        return (
            <div>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                >
                    {courses.map((course) => {
                        return (
                            <Grid item key={course.id} className={classes.coursesCardGrid}>
                                <CourseCard title = {course.title} description = {course.description} id={course.id}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        );
    }

    componentDidMount() {
        this.props.dispatch(handleReceivedALLCoursesData())
    }

    clearData = () => {
        this.props.dispatch(clearCoursesData());
    };


    render() {
        const { allCourses, isLoading } = this.props;

        return (
            <Fragment>
                <AppBar/>
                {console.log(allCourses)}
                {console.log(isLoading)}
                <MenuBar selected='Courses' menu='Courses' name='course'>
                    {isLoading && <PageLoader/>}
                    {!isLoading && !allCourses && <ForbidErrorDialog clearData = {this.clearData} />}
                    {!isLoading && allCourses && this.renderCourseCards(allCourses)}
                </MenuBar>
            </Fragment>
        );
    }
}

Courses = withStyles(styles)(Courses);

export default connect(state)(Courses);
