import {Grid, List, ListItem, ListItemText, Popover} from "@material-ui/core";
import {Link} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ClassIcon from '@material-ui/icons/Class';
import PeopleIcon from '@material-ui/icons/People';
import React, { PureComponent, Fragment } from "react";

function getPopoverStyle() {
    return {
        top: `5px`,
        right: 0
    };
}

function getLecturersIconStyle() {
    const color = '#F7A247';
    return {
        background: color,
    }
}

function getStudentsIconStyle() {
    const color = '#20BFC1';
    return {
        background: color,
    }
}

const styles = theme => {
    return {
        navMenuIcon: {
            color: 'white',
        },
        navMenuPaper: {
            [theme.breakpoints.up('xs')]: {
                width: '280px',
            },
            [theme.breakpoints.up('sm')]: {
                width: '400px',
            },
            maxWidth: '400px',
            minHeight: '90px',
            padding: '20px',
        },
        navMenuElement: {
            width: '120px',
        },
        navMenuElementList: {
            '&:hover': {
                border: '1px solid #CDCFCF'
            },
            width: '100px',
            height: '100px',
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '10px',
        },
        navMenuElementButtonIcon: {
            width: '60px',
            height: '60px',
            padding: '10px',
            color: 'white',
            borderRadius: '50%',
            background: '#C94251',
        },
        navMenuElementButtonText: {
            padding: '0',
        }
    }
}

class NavPanel extends PureComponent {

    render() {
        const { classes, navMenuOpen, handleNavMenuClose } = this.props;

        return (
            <Fragment>
                <Popover
                    style={getPopoverStyle()}
                    open={navMenuOpen}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 55, left: 10000 }}
                    onClose={handleNavMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <List className={classes.navMenuPaper}>
                        <Grid container justify="flex-start"
                              alignItems="center">
                            <Link to={'/courses'} style={{ textDecoration: 'none' }}>
                                <Grid item xs={6} sm={4} className={classes.navMenuElement}>
                                    <ListItem className={classes.navMenuElementList} >
                                        <LocalLibraryIcon className={classes.navMenuElementButtonIcon}/>
                                        <ListItemText className={classes.navMenuElementButtonText}>Course</ListItemText>
                                    </ListItem>
                                </Grid>
                            </Link>
                            <Link to='/lecturers' style={{ textDecoration: 'none' }}>
                                <Grid item xs={6} sm={4} className={classes.navMenuElement}>
                                    <ListItem variant='text' className={classes.navMenuElementList}>
                                        <ClassIcon className={classes.navMenuElementButtonIcon} style={getLecturersIconStyle()}/>
                                        <ListItemText className={classes.navMenuElementButtonText}>Lecturers</ListItemText>
                                    </ListItem>
                                </Grid>
                            </Link>
                            <Link to='/students' style={{ textDecoration: 'none' }}>
                                <Grid item xs={6} sm={4} className={classes.navMenuElement}>
                                    <ListItem className={classes.navMenuElementList}>
                                        <PeopleIcon className={classes.navMenuElementButtonIcon} style={getStudentsIconStyle()}/>
                                        <ListItemText className={classes.navMenuElementButtonText}>Students</ListItemText>
                                    </ListItem>
                                </Grid>
                            </Link>
                        </Grid>
                    </List>
                </Popover>
            </Fragment>
        );
    }
}

export default withStyles(styles)(NavPanel);