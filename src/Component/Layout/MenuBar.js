import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, List, Typography, Hidden, Divider, ListItem, ListItemIcon, ListItemText }  from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ClassIcon from '@material-ui/icons/Class';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddNewButton from '../Utils/AddNewButton';

const drawerWidth = '240px';

const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    drawerContainer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    titleBar: {
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        padding: '0 20px',
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.up('xs')]: {
            // fontSize: '20px',
            marginRight: '5px'
        },
    },
    title: {
        [theme.breakpoints.up('sm')]: {
            marginRight: '20px',
        },
        [theme.breakpoints.up('xs')]: {
            marginRight: '0',
        },
    },
    panelTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        height: '60px',
        position: 'relative',
    },
    drawerPaper: {
        top: '60px',
        width: drawerWidth,
    },
    drawerPaperTemporary: {
        width: drawerWidth,
    },
    content: {
        position: 'relative',
        top: '60px',
        flexGrow: 1,
        width: '100%',
        overflowX: 'auto',
    },
    contentContainer: {
        padding: '10px 30px',
        width: '100%',
        overflowX: 'auto'
    }
});

class MenuBar extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, children, selected, menu, name } = this.props;

        const drawer = (
            <div>
                <div className={classes.panelTitle}>
                    <Typography variant="h6" noWrap>
                        Applications
                    </Typography>
                </div>
                <Divider />
                <List >
                    <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                        <ListItem button selected={selected === 'Dashboard'} >
                            <ListItemIcon>{<DashboardIcon/>}</ListItemIcon>
                            <ListItemText primary='Dashboard' />
                        </ListItem>
                    </Link>
                    <Link to='/courses' style={{ textDecoration: 'none' }}>
                        <ListItem button selected={selected === 'Courses'} >
                            <ListItemIcon>{<LocalLibraryIcon/>}</ListItemIcon>
                            <ListItemText primary='Courses' />
                        </ListItem>
                    </Link>
                    <Link to='/lecturers' style={{ textDecoration: 'none' }}>
                        <ListItem button selected={selected === 'Lecturers'} >
                            <ListItemIcon>{<ClassIcon/>}</ListItemIcon>
                            <ListItemText primary='Lecturers' />
                        </ListItem>
                    </Link>
                    <Link to='/students'  style={{ textDecoration: 'none' }}>
                        <ListItem button selected={selected === 'Students'} >
                            <ListItemIcon>{<PeopleIcon/>}</ListItemIcon>
                            <ListItemText primary='Students' />
                        </ListItem>
                    </Link>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <CssBaseline />
                <nav className={classes.drawerContainer}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            variant="temporary"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            className={classes.drawer}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                              keepMounted: true,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <div className={classes.content}>
                    <div className={classes.titleBar}>
                        <IconButton
                            // color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.title}>
                            {menu}
                        </Typography>
                        {name && <AddNewButton name={name}/>}
                    </div>
                    <Divider />
                    <div className={classes.contentContainer}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

MenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    // theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);
