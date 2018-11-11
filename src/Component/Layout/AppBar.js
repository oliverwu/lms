import React, {Component} from 'react';
import { withStyles} from '@material-ui/core/styles';
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, Popover, Paper, Grid, Button} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { redirect } from "../Utils/Help";

import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ClassIcon from '@material-ui/icons/Class';
import PeopleIcon from '@material-ui/icons/People';

function getPopoverStyle() {
    const top = 5;

    return {
        top: `${top}px`,
    };
}

const styles = theme => {
    return {
        root: {
            width: '100%',
        },
        appBar: {
            height: '60px',
            position: 'relative',
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
            width: 500,
            height: 200,
            padding: '20px',
            textAlign: 'center'
        },
        viewModuleElement: {
            '&:hover': {
                background: 'lightGreen'
            }
        },
        viewModuleElementIconButton: {

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
        console.log(event.currentTarget);
        this.setState({
            viewModuleAnchorEl: event.currentTarget,
        })
    };
    handleClickToggleThemeIcon = () => {
        this.props.handleToggleTheme();
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
                                <Paper className={classes.viewModulePaper}>
                                    <Grid container spacing={16} justify="center"
                                          alignItems="center">
                                        <Grid item xs={4} className={classes.viewModuleElement}>
                                            <Button className={classes.viewModuleElementIconButton}>
                                                <LocalLibraryIcon/>
                                                <Typography>Course</Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <LocalLibraryIcon/> Course
                                        </Grid>
                                        <Grid item xs={4}>
                                            <LocalLibraryIcon/> Course
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Popover>
                        </div>
                        <IconButton
                            className={classes.toggleThemeIcon}
                            onClick={this.handleClickToggleThemeIcon}
                        >
                            <InvertColorsIcon/>
                        </IconButton>
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