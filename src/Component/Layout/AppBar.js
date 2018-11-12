import React, {Component} from 'react';
import { withStyles} from '@material-ui/core/styles';
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, Avatar  } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { redirect } from "../Utils/Help";
import NavPanel from "./NavPanel";
import githubIcon from './GitHub-Mark-Light-32px.png';


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
        navMenuIcon: {
            color: 'white',
        },

        githubIcon: {
            color: 'white',
            width: '25px',
        }
    }
};

class LMSAppBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            accountMenuAnchorEl: null,
            navMenuAnchorEl: null,
            navMenuChecked: false
        }
    }

    handleClickAccountIcon = (event) => {
        this.setState({
            accountMenuAnchorEl: event.currentTarget,
        })
    };

    handleClickNavMenuIcon = (event) => {
        this.setState({
            navMenuAnchorEl: event.currentTarget,
        })
    };

    handleAccountMenuClose = () => {
        this.setState({
            accountMenuAnchorEl: null,
        })
    };

    handleNavMenuClose = () => {
        this.setState({
            navMenuAnchorEl: null,
        })
    };

    handleLogout = () => {
        localStorage.removeItem('accessToken');
        redirect('login')
    };

    handleClickGithubIcon = () => {
        window.location.href = 'https://github.com/oliverwu/lms'
    };

    render() {
        const { classes } = this.props;
        const { accountMenuAnchorEl, navMenuAnchorEl } = this.state;
        const accountMenuOpen = Boolean(accountMenuAnchorEl);
        const navMenuOpen = Boolean(navMenuAnchorEl);

        return (
            <div className={classes.root}>
                <AppBar position='static' className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6"  className={classes.title}>
                            LMS Platform
                        </Typography>
                        <div className={classes.grow}/>
                        <IconButton
                            onClick={this.handleClickGithubIcon}
                        >
                            <img src={githubIcon} className={classes.githubIcon}/>
                        </IconButton>
                        <div>
                            <IconButton
                                className={classes.navMenuIcon}
                                onClick={this.handleClickNavMenuIcon}
                            >
                                <ViewModuleIcon/>
                            </IconButton>
                            <NavPanel
                                navMenuOpen={navMenuOpen}
                                navMenuAnchorEl={navMenuAnchorEl}
                                handleNavMenuClose={this.handleNavMenuClose}
                            />
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