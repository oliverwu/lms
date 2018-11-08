import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
        background: 'white',
        // boxShadow: '0px 10px 47px -9px rgba(0,0,0,0.75)'
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        marginRight: '20px',

    },
    panelTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        height: '60px',
        position: 'relative',
        background: 'white'
        // boxShadow: '0px 10px 47px -9px rgba(0,0,0,0.75)'
    },
    drawerPaper: {
        backgroundColor: '#F9F9F9',
        top: '60px',
        width: drawerWidth,
    },

    content: {
        flexGrow: 1,
    },
    contentContainer: {
        padding: '10px 30px',
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
        const { classes, theme, children, selected, menu, name } = this.props;

        const drawer = (
            <div>
                <div className={classes.panelTitle}>
                    <Typography variant="h6" noWrap>
                        Services
                    </Typography>
                </div>
                <Divider />
                <List >
                    <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                        <ListItem button selected={selected === 'Dashboard'} >
                            <ListItemIcon>{<DashboardIcon/>}</ListItemIcon>
                            <ListItemText primary='Dashboard' />
                            {/*<Typography variant="subtitle1" style={{color: 'white', }} align='center' noWrap >*/}
                                {/*Dashboard*/}
                            {/*</Typography>*/}
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
                    {/* The implementation can be swap with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            // container={this.props.container}
                            variant="temporary"
                            // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            className={classes.drawer}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            // ModalProps={{
                            //   keepMounted: true, // Better open performance on mobile.
                            // }}
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
                            color="inherit"
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
