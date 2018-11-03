import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Button, withWidth } from '@material-ui/core';
// import {MenuIcon, ChevronLeftIcon, CheronRightIcon, InboxIcon, MailIcon} from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Dashboard from '@material-ui/icons/Dashboard';
import Class from '@material-ui/icons/Class';
import LocalLibrary from '@material-ui/icons/LocalLibrary';
import People from '@material-ui/icons/People';
import { Link } from 'react-router-dom';

const drawerWidth = 240;


const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: document.documentElement.clientHeight + "px",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    textGrow: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class Layout extends Component {
    state = {
        open: true,
        currentWidth: '',
        selected: 'Dashboard',
        currentURL: '',
    };

    // handleSelected = (selected) => {
    //     // event.stopPropagation();
    //     this.setState({
    //         selected:selected,
    //     })
    // };

    // checkSelected = (option) => {
    //     this.setState({
    //         selected: option,
    //     })
    // };

    responsiveSidePanel = (width) => {
        if(width === 'xs' || width === 'sm') {
            this.setState({
                open: false,
            })
        } else {
            this.setState({
                open: true,
            })
        }
    }

    componentWillMount() {
        const { width } = this.props;
        this.responsiveSidePanel(width)
    }


    componentDidUpdate(prevProps, prevState) {
        const { width } = this.props;
        let URL = window.location.href;
        if (prevState.currentWidth !== this.props.width) {
            this.setState({
                currentWidth: this.props.width,
            });
            this.responsiveSidePanel(width)
        }

        if(prevState.currentURL !== URL) {
            this.setState({
                currentURL: URL,
            });
            if (URL.match('dashboard')) {
                this.setState({
                    selected: 'Dashboard',
                })
            } else if (URL.match('courses/create')) {
                this.setState({
                    selected: 'New course',
                })
            } else if (URL.match('courses/(\\d)')) {
                this.setState({
                    selected: 'Course details',
                })
            } else if (URL.match('students')) {
                this.setState({
                    selected: 'Students',
                })
            } else if (URL.match('courses')) {
                this.setState({
                    selected: 'Courses',
                })
            } else if (URL.match('lectures')) {
                this.setState({
                    selected: 'Lectures',
                })
            }

        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, children, width, theme } = this.props;
        const { selected } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" align='left' noWrap className={classes.textGrow}>
                            {selected}
                        </Typography>
                        <Typography variant="h6" color="inherit" noWrap>
                            <Button color="inherit">Login</Button>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.textGrow}>
                            LMS
                        </Typography>
                        <IconButton onClick={this.handleDrawerClose} className={classes.ChevronLeftButton}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                            <ListItem button selected={selected === 'Dashboard'} >
                                <ListItemIcon>{<Dashboard/>}</ListItemIcon>
                                <ListItemText primary='Dashboard' />
                            </ListItem>
                        </Link>
                        <Link to='/courses' style={{ textDecoration: 'none' }}>
                            <ListItem button selected={selected === 'Courses'} >
                                <ListItemIcon>{<LocalLibrary/>}</ListItemIcon>
                                <ListItemText primary='Courses' />
                            </ListItem>
                        </Link>
                        <Link to='/lectures' style={{ textDecoration: 'none' }}>
                            <ListItem button selected={selected === 'Lectures'} >
                                <ListItemIcon>{<Class/>}</ListItemIcon>
                                <ListItemText primary='Lectures' />
                            </ListItem>
                        </Link>
                        <Link to='/students'  style={{ textDecoration: 'none' }}>
                            <ListItem button selected={selected === 'Students'} >
                                <ListItemIcon>{<People/>}</ListItemIcon>
                                <ListItemText primary='Students' />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withWidth()(Layout));
