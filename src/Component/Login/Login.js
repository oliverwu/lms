import React, {Component, PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Avatar, TextField, Button, CircularProgress, IconButton } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LoginApi from './LoginApi';
import { redirect } from '../Utils/Help';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import classNames from 'classnames';

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
            width: '330px',
            height: '330px',
            margin: '-70px auto 50px',
            padding: '30px',
            textAlign: 'center',
        },
        noErrorLoginContainer: {
            height: '230px'
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
        noErrorField: {
            display: 'none',
        },
        errorField: {
            display: 'flex',
            background: '#D9484A',
            alignItems: 'center',
            margin: '20px 0 0',
            padding: '20px 10px',
        },
        errorMessage: {
            textAlign: 'left',

        },
        errorIcon: {
            color: 'white',
            marginRight: '10px',
            background: '#F6595B'
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
        const { error } = this.state;
        if (error) {
            this.setState({
                error: !error,
            })
        }
        const { name, value} = event.target;
        this.setState({
            [name]: value,
        })
    };

    handleLogin = async (event) => {
        event.preventDefault();
        const { isLoading, error} = this.state;
        this.setState({
            isLoading: !isLoading
        });
        const { userName, password } = this.state;
        const data = await LoginApi.getToken(userName, password);
        console.log(data);
        if (data) {
            const { access_token } = data;
            localStorage.setItem('accessToken', access_token);
            redirect('dashboard');
        } else {
            this.setState({
                error: !error,
                isLoading: false,
            })
        }
    };

    render() {
        const { classes } = this.props;
        const { userName, password, isLoading, error } = this.state;

        return (
            <div>
                <div className={classes.loginTop}>Login LMS</div>
                <Paper className={classNames(classes.loginContainer, {[classes.noErrorLoginContainer]: !error})}>
                    <div>
                        <Avatar className={classes.loginAvatar} >
                            <PermIdentityIcon className={classes.loginAvatarIcon}/>
                        </Avatar>
                    </div>
                    <Paper className={classNames({[classes.errorField]: error}, {[classes.noErrorField]: !error})}>
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
                            type='password'
                            fullWidth
                            margin='normal'
                            onChange={this.handleChange}
                        />
                        <div className={classes.buttonWrapper}>
                            <Button
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