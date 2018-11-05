import React, {Component, PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Avatar, TextField, Button } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LoginApi from './LoginApi';
import { redirect } from '../Utils/Help';

const styles = theme => {
    return {
        loginTop: {
            width: '100%',
            textAlign: 'center',
            height: '200px',
            background: '#3F9BE7',
            fontSize: '30px',
            color: 'white',
            lineHeight: '100px'
        },
        loginContainer: {
            position: 'relative',
            // top: '200px',
            width: '300px',
            height: '220px',
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
            left: '150px'
        },
        loginAvatarIcon: {
            width: '40px',
            height: '40px',
        },
        loginButton: {
            margin: '30px auto 20px',
            width: '100%',
            background: '#3F9BE7',
            color: 'white'
        }
    };
};

class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            userName: '',
            password: '',
        }
    }

    handleChange = (event) => {
        const { name, value} = event.target;
        console.log({name, value});
        this.setState({
            [name]: value,
        })
    };

    handleLogin = async (event) => {
        const { changeLoginStatus } = this.props;
        console.log(2);
        event.preventDefault();
        console.log(1);
        const { userName, password } = this.state;
        const data = await LoginApi.getToken(userName, password);
        if (data) {
            const { access_token, expire_time } = data;
            localStorage.setItem('accessToken', access_token);
            //
            redirect('dashboard')
        }
    };

    render() {
        const { classes } = this.props;
        const { userName, password} = this.state;

        return (
            <div>
                <div className={classes.loginTop}>Login LMS</div>
                <Paper className={classes.loginContainer}>
                    <div>
                        <Avatar className={classes.loginAvatar} >
                            <PermIdentityIcon className={classes.loginAvatarIcon}/>
                        </Avatar>
                    </div>
                    <form onSubmit={this.handleLogin}>
                        <TextField
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
                        <Button
                            className={classes.loginButton}
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Login);