import React, { PureComponent, Fragment } from 'react';
import AppBar from '../Layout/AppBar';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {Card, Grid} from "@material-ui/core";
import MenuBar from '../Layout/MenuBar';
import CardContent from "@material-ui/core/CardContent/CardContent";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import Typography from "@material-ui/core/Typography/Typography";
import ClassIcon from '@material-ui/icons/Class';
import PeopleIcon from '@material-ui/icons/People';
import {Link} from "react-router-dom";

const styles = theme => {
    return {
        paper: {
            // width: '100%',
            width: '300px',
            height: '350px',
            margin: '20px',
            flexGrow: 1,
            textAlign: 'left',
            background: '#F4F3F3',
            '&:hover': {
                background: '#17977A',
                color: 'white',
                cursor: 'grab',
            },
            color: 'black'
        },
        iconWrapper: {
            height: '150px',
            width: '280px',
            margin: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#EBEBEB',
        },

        icon: {
            width: '70px',
            height: '70px',
            padding: '20px',
            color: 'white',
            borderRadius: '50%',
            background: '#C94251',
        },

        iconLecturers: {
            background: '#F7A247',
        },

        iconStudents: {
            background: '#20BFC1'
        },

        cardContent: {
            marginTop: '20px',
            height: '110px',
            textAlign: 'center',
            // color: 'black',
        },
    }
};

class Dashboard extends PureComponent {


    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar selected='Dashboard' menu='Dashboard' >
                    <Grid container
                          direction="row"
                          justify="flex-start"
                          alignItems="center">
                        <Grid item >
                            <Link to={'/courses'} style={{ textDecoration: 'none' }}>
                                <Card className={classes.paper}>
                                    <CardContent className={classes.iconWrapper}>
                                        <LocalLibraryIcon className={classes.icon}/>
                                    </CardContent>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h5" color='inherit'>
                                            Courses
                                        </Typography>
                                        <Typography variant='subtitle1' color='inherit'>
                                            All kinds of courses needed for IT industry
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={'/lecturers'} style={{ textDecoration: 'none' }}>
                                <Card className={classes.paper}>
                                    <CardContent className={classes.iconWrapper}>
                                        <ClassIcon className={classnames({[classes.icon]: true, [classes.iconLecturers]: true})}/>
                                    </CardContent>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h5" color='inherit'>
                                            Lecturers
                                        </Typography>
                                        <Typography variant='subtitle1' color='inherit'>
                                            Best lecturers in IT world
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                        <Grid item >
                            <Link to={'/students'} style={{ textDecoration: 'none' }}>
                                <Card className={classes.paper}>
                                    <CardContent className={classes.iconWrapper}>
                                        <PeopleIcon className={classnames({[classes.icon]: true, [classes.iconStudents]: true})}/>
                                    </CardContent>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h5" color='inherit'>
                                            Students
                                        </Typography>
                                        <Typography variant='subtitle1' color='inherit'>
                                            Hard-working and smart students
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    </Grid>
                </MenuBar>
            </Fragment>

        );
    }
}

export default withStyles(styles)(Dashboard);