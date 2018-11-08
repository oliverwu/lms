import React, {Component, PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Avatar, TextField, Button, CircularProgress, IconButton } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LoginApi from './LoginApi';
import classNames from 'classnames';
import { redirect } from '../Utils/Help';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const styles = theme => {
    return {
        loginTop: {
            width: '100%',
            textAlign: 'center',
            height: '200px',
            background: '#1D8BF1',
            fontSize: '30px',
            color: 'white',
            lineHeight: '100px'
        },
        loginContainer: {
            position: 'relative',
            // top: '200px',
            width: '330px',
            height: '330px',
            margin: '-70px auto 50px',
            padding: '30px',
            textAlign: 'center',
        },
        loginAvatar: {
            width: '60px',
            height: '60px',
            margin: '5px auto',
            background: '#DD0047',
            position: 'absolute',
            top: '-30px',
            left: '165px'
        },
        loginAvatarIcon: {
            width: '40px',
            height: '40px',
        },
        buttonWrapper: {
            margin: '30px auto 20px',
            width: '100%',
            position: 'relative'
        },
        button: {
            // margin: '30px auto 20px',
            width: '100%',
            // background: '#3F9BE7',
            color: 'white'
        },
        loginButton: {
            background: '#E0E0E0',
        },
        buttonProgress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px'
        },
        errorField: {
            display: 'flex',
            background: 'red',
            alignItems: 'center',
            margin: '20px 0 0',
            padding: '20px 10px',
        },
        errorMessage: {
            textAlign: 'left'
        },
        errorIcon: {
            color: 'white',
            marginRight: '10px'
        }
    };
};

class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            userName: '',
            password: '',
            isLoading: false,
            error: false
        }
    }

    handleChange = (event) => {
        const { name, value} = event.target;
        this.setState({
            [name]: value,
        })
    };

    handleLogin = async (event) => {
        event.preventDefault();
        const { isLoading} = this.state;
        this.setState({
            isLoading: !isLoading
        });
        const { userName, password } = this.state;
        const data = await LoginApi.getToken(userName, password);
        if (data) {
            const { access_token, expire_time } = data;
            localStorage.setItem('accessToken', access_token);
            redirect('dashboard');
        }
    };

    render() {
        const { classes } = this.props;
        const { userName, password, isLoading, error } = this.state;

        return (
            <div>
                <div className={classes.loginTop}>Login LMS</div>
                <Paper className={classes.loginContainer}>
                    <div>
                        <Avatar className={classes.loginAvatar} >
                            <PermIdentityIcon className={classes.loginAvatarIcon}/>
                        </Avatar>
                    </div>
                    <Paper className={classes.errorField}>
                        <IconButton className={classes.errorIcon}>
                            <PriorityHighIcon/>
                        </IconButton>
                        <p className={classes.errorMessage}>You could not be logged on to LMS. Make sure that your user name and password are correct, and try them again</p>
                    </Paper>
                    <form onSubmit={this.handleLogin}>
                        <TextField
                            error={error}
                            id='username'
                            label='User Name*'
                            name='userName'
                            value={userName}
                            placeholder='User Name'
                            fullWidth
                            margin='normal'
                            onChange={this.handleChange}
                        />
                        <TextField
                            error={error}
                            id='password'
                            label='Password*'
                            name='password'
                            value={password}
                            // placeholder='ppp'
                            type='password'
                            fullWidth
                            margin='normal'
                            onChange={this.handleChange}
                        />
                        <div className={classes.buttonWrapper}>
                            <Button
                                // className={classes.button}
                                className={classNames(classes.button, {[classes.loginButton]: isLoading})}
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
                                Login
                            </Button>
                            {isLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Login);