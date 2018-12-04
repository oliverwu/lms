import React, { Component } from 'react';
import '../../App.css';
import Dashboard from '../Dashboard/Dashboard';
import {Route, Switch, Redirect, HashRouter as Router} from 'react-router-dom';
import Courses from "../Courses/Courses";
import Students from '../Students/Students';
import NotFound from "../Utils/NotFound";
import CourseDetails from '../Courses/CourseDetailsWithReduxForm';
import StudentDetails from '../Students/StudentDetailsWithReduxForm';
import Lecturers from '../Lecturers/Lecturers';
import Login from '../Login/Login';
import { MuiThemeProvider }  from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core';
import AppBar from "../Layout/AppBar";
import LecturerDetails from "../Lecturers/LecturerDetailsWithReduxForm";

class App extends Component {

    render() {

        const theme = createMuiTheme({
            typography: {
                useNextVariants: true,
            },
            palette: {
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
                    {/*<AppBar/>*/}
                    <Router>
                        <Switch>
                            <Redirect exact path="/" to='/login'/>
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
