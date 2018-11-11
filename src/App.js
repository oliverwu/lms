import React, { Component } from 'react';
import './App.css';
import Dashboard from './Component/Dashboard/Dashboard';
import {Route, Switch, Redirect, HashRouter as Router} from 'react-router-dom';
import Courses from "./Component/Courses/Courses";
import Students from './Component/Students/Students';
import NotFound from "./Component/Utils/NotFound";
import CourseDetails from './Component/Courses/CourseDetails';
import StudentDetails from './Component/Students/StudentDetails';
import Lecturers from './Component/Lecturers/Lecturers';
import Login from './Component/Login/Login';
import { MuiThemeProvider }  from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core';
import AppBar from "./Component/Layout/AppBar";
import LecturerDetails from "./Component/Lecturers/LecturerDetails";




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            themeColorBool: 'light',
        }
    }


    handleToggleTheme = () => {
        const {themeColorBool} = this.state;
        this.setState({
            themeColorBool: !themeColorBool,
        })
    };



    render() {
        const { themeColorBool } = this.state;
        const themeColor = themeColorBool ? 'light' : 'dark';

        const theme = createMuiTheme({
            typography: {
                useNextVariants: true,
            },
            palette: {
                type: themeColor,
                primary: {
                    main: '#1D8BF1',
                },
            },
            overrides: {
                MuiDrawer: {
                    modal: {
                        zIndex: 1230,
                    }
                },
            }
        });

        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <AppBar handleToggleTheme={this.handleToggleTheme}/>
                    <Router>
                        <Switch>
                            <Redirect exact path="/" to='/dashboard'/>
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/dashboard' component={Dashboard} />
                            <Route exact path='/courses/' component={Courses}/>
                            <Route exact path='/students' component={Students}/>
                            <Route exact path='/lecturers' component={Lecturers}/>
                            <Route exact path='/courses/:id(\d+|create)' component={CourseDetails}/>
                            <Route exact path='/students/:id(\d+|create)' component={StudentDetails} />
                            <Route exact path='/lecturers/:id(\d+|create)' component={LecturerDetails} />
                            <Route path='*' component={NotFound}/>
                        </Switch>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
  }
}

export default App;
