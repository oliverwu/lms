import React, {Component} from 'react';
import { withStyles} from '@material-ui/core/styles';
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, Popover,  Grid, List, ListItemText,  ListItem} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { redirect } from "../Utils/Help";
import { Link } from 'react-router-dom';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ClassIcon from '@material-ui/icons/Class';
import PeopleIcon from '@material-ui/icons/People';

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
        root: {
            width: '100%',
        },
        appBar: {
            height: '60px',
            position: 'fixed',
            top: 0,
            zIndex: 1250,
        },
        title: {
            color: 'white',
            marginLeft: '30px'
        },
        grow: {
            flexGrow: 1,
        },
        accountMenuIcon: {
            color: 'white',
        },
        toggleThemeIcon: {
            color: 'white',
        },
        ViewModuleIcon: {
            color: 'white',
        },
        viewModulePaper: {
            minWidth: '240px',
            // minWidth: 240,
            // maxWidth: 600,
            minHeight: '90px',
            padding: '20px',
        },
        viewModuleElement: {
            width: '200px',
        },
        viewModuleElementButton: {
            '&:hover': {
                background: '#17977A'
            },
            minWidth: '200px',
            height: '50px',
            borderRadius: 0,
        },
        viewModuleElementButtonIcon: {
            marginRight: '10px',
            width: '40px',
            height: '40px',
            padding: '10px',
            color: 'white',
            borderRadius: '50%',
            background: '#C94251',
        },
        viewModuleElementButtonText: {
            padding: '0',
        }

    }
};

class LMSAppBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            accountMenuAnchorEl: null,
            viewModuleAnchorEl: null,
            viewModuleChecked: false
        }
    }

    handleClickAccountIcon = (event) => {
        this.setState({
            accountMenuAnchorEl: event.currentTarget,
        })
    };

    handleClickViewModuleIcon = (event) => {
        this.setState({
            viewModuleAnchorEl: event.currentTarget,
        })
    };

    handleAccountMenuClose = () => {
        this.setState({
            accountMenuAnchorEl: null,
        })
    };

    handleViewModuleClose = () => {
        this.setState({
            viewModuleAnchorEl: null,
        })
    };

    handleLogout = () => {
        localStorage.removeItem('accessToken');
        redirect('login')
    };

    render() {
        const { classes } = this.props;
        const { accountMenuAnchorEl, viewModuleAnchorEl } = this.state;
        const accountMenuOpen = Boolean(accountMenuAnchorEl);
        const viewModuleOpen = Boolean(viewModuleAnchorEl);

        return (
            <div className={classes.root}>
                <AppBar position='static' className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6"  className={classes.title}>
                            LMS Platform
                        </Typography>
                        <div className={classes.grow}/>
                        <div>
                            <IconButton
                                className={classes.ViewModuleIcon}
                                onClick={this.handleClickViewModuleIcon}
                            >
                                <ViewModuleIcon/>
                            </IconButton>
                            <Popover
                                style={getPopoverStyle()}
                                open={viewModuleOpen}
                                anchorEl={viewModuleAnchorEl}
                                onClose={this.handleViewModuleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <List className={classes.viewModulePaper}>
                                    <Grid container spacing={8} justify="center"
                                          alignItems="center">
                                        <Link to={'/courses'} style={{ textDecoration: 'none' }}>
                                            <Grid item xs={12} sm={4} className={classes.viewModuleElement}>
                                                <ListItem className={classes.viewModuleElementButton} >
                                                    <LocalLibraryIcon className={classes.viewModuleElementButtonIcon}/>
                                                    <ListItemText className={classes.viewModuleElementButtonText}>Course</ListItemText>
                                                </ListItem>
                                            </Grid>
                                        </Link>
                                        <Link to='/lecturers' style={{ textDecoration: 'none' }}>
                                            <Grid item xs={12} sm={4} className={classes.viewModuleElement}>
                                                <ListItem variant='text' className={classes.viewModuleElementButton}>
                                                    <ClassIcon className={classes.viewModuleElementButtonIcon} style={getLecturersIconStyle()}/>
                                                    <ListItemText className={classes.viewModuleElementButtonText}>Lecturers</ListItemText>
                                                </ListItem>
                                            </Grid>
                                        </Link>
                                        <Link to='/students' style={{ textDecoration: 'none' }}>
                                            <Grid item xs={12} sm={4} className={classes.viewModuleElement}>
                                                <ListItem className={classes.viewModuleElementButton}>
                                                    <PeopleIcon className={classes.viewModuleElementButtonIcon} style={getStudentsIconStyle()}/>
                                                    <ListItemText className={classes.viewModuleElementButtonText}>Students</ListItemText>
                                                </ListItem>
                                            </Grid>
                                        </Link>

                                    </Grid>
                                </List>
                            </Popover>
                        </div>
                        <div>
                            <IconButton
                                className={classes.accountMenuIcon}
                                onClick={this.handleClickAccountIcon}
                            >
                                <PersonIcon/>
                            </IconButton>
                            <Menu
                                open={accountMenuOpen}
                                anchorEl={accountMenuAnchorEl}
                                onClose={this.handleAccountMenuClose}
                                PaperProps={{
                                    style: {
                                        width: 200,
                                    }
                                }}
                            >
                                <MenuItem key='delete' >Account</MenuItem>
                                <MenuItem key='details' onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(LMSAppBar);