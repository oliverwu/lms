import React, {Component} from 'react';
import { withStyles} from '@material-ui/core/styles';
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { redirect } from "../Utils/Help";


const styles = theme => {
    return {
        root: {
            width: '100%',
        },
        appBar: {
            height: '60px',
            // background: 'white',
        },
        title: {
            color: 'white',
            marginLeft: '30px'
        },
        grow: {
            flexGrow: 1,
        },
        accountIcon: {
            color: 'white'
        }
    }
};

class LMSAppBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
    }

    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
        })
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        })
    };

    handleLogout = () => {
        localStorage.removeItem('accessToken');
        redirect('login')
    };

    render() {
        const { classes } = this.props;
        const { anchorEl} = this.state;
        const open = Boolean(anchorEl);

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
                                className={classes.accountIcon}
                                onClick={this.handleClick}
                            >
                                <PersonIcon/>
                            </IconButton>
                            <Menu
                                open={open}
                                anchorEl={anchorEl}
                                onClose={this.handleClose}
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