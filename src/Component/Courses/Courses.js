import React, {PureComponent, Fragment} from 'react';
import PageLoader from '../Utils/PageLoader';
import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'
import CourseCard from "./CourseCard";
import MenuBar from '../Layout/MenuBar';
import AppBar from '../Layout/AppBar';
import { connect } from 'react-redux';
import { handleReceivedCoursesData, clearCoursesData } from "../../Actions/CoursesActions";
import ForbidErrorDialog from '../Utils/ForbidErrorDialog';

const state = state => {
    return {
        courses: state.courses.courses,
        isLoading: state.courses.isLoading,
        statusCode: state.courses.statusCode,
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
            ForbidErrorDialogStatus: false,
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

    componentWillMount() {
        this.props.dispatch(clearCoursesData())
    }

    async componentDidMount() {
        await this.props.dispatch(handleReceivedCoursesData());
        this.props.statusCode > 300 && this.setState({
            ForbidErrorDialogStatus: true,
        })
    }

    handleForbidErrorDialogClose = () => {
        this.setState({
            ForbidErrorDialogStatus: false,
        })
    };

    clearData = () => {
        this.props.dispatch(clearCoursesData());
    };


    render() {
        const { courses, isLoading, statusCode } = this.props;
        const { ForbidErrorDialogStatus } = this.state;

        return (
            <Fragment>
                <AppBar/>
                {console.log(courses)}
                {console.log(isLoading)}
                <MenuBar selected='Courses' menu='Courses' name='course'>
                    {isLoading && <PageLoader/>}
                    {!isLoading && courses && this.renderCourseCards(courses)}
                </MenuBar>
                <ForbidErrorDialog
                    ForbidErrorDialogStatus = { ForbidErrorDialogStatus }
                    clearData = {this.clearData}
                    statusCode={statusCode}
                    handleForbidErrorDialogClose={this.handleForbidErrorDialogClose}
                />
            </Fragment>
        );
    }
}

Courses = withStyles(styles)(Courses);

export default connect(state)(Courses);
