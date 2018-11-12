import {Grid, List, ListItem, ListItemText, Popover} from "@material-ui/core";
import {Link} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ClassIcon from '@material-ui/icons/Class';
import PeopleIcon from '@material-ui/icons/People';
import React, { PureComponent, Fragment } from "react";

function getPopoverStyle() {
    const top = 5;

    return {
        top: `${top}px`,
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
            minWidth: '240px',
            // minWidth: 240,
            // maxWidth: 600,
            minHeight: '90px',
            padding: '20px',
        },
        navMenuElement: {
            width: '200px',
        },
        navMenuElementButton: {
            '&:hover': {
                background: '#17977A'
            },
            minWidth: '200px',
            height: '50px',
            borderRadius: 0,
        },
        navMenuElementButtonIcon: {
            marginRight: '10px',
            width: '40px',
            height: '40px',
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
    constructor(props) {
        super(props);

    }

    render() {
        const { classes, navMenuOpen, navMenuAnchorEl, handleNavMenuClose } = this.props;

        return (
            <Fragment>
                <Popover
                    style={getPopoverStyle()}
                    open={navMenuOpen}
                    anchorEl={navMenuAnchorEl}
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
                        <Grid container spacing={8} justify="center"
                              alignItems="center">
                            <Link to={'/courses'} style={{ textDecoration: 'none' }}>
                                <Grid item xs={12} sm={4} className={classes.navMenuElement}>
                                    <ListItem className={classes.navMenuElementButton} >
                                        <LocalLibraryIcon className={classes.navMenuElementButtonIcon}/>
                                        <ListItemText className={classes.navMenuElementButtonText}>Course</ListItemText>
                                    </ListItem>
                                </Grid>
                            </Link>
                            <Link to='/lecturers' style={{ textDecoration: 'none' }}>
                                <Grid item xs={12} sm={4} className={classes.navMenuElement}>
                                    <ListItem variant='text' className={classes.navMenuElementButton}>
                                        <ClassIcon className={classes.navMenuElementButtonIcon} style={getLecturersIconStyle()}/>
                                        <ListItemText className={classes.navMenuElementButtonText}>Lecturers</ListItemText>
                                    </ListItem>
                                </Grid>
                            </Link>
                            <Link to='/students' style={{ textDecoration: 'none' }}>
                                <Grid item xs={12} sm={4} className={classes.navMenuElement}>
                                    <ListItem className={classes.navMenuElementButton}>
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