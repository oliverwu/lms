import React, { Component } from 'react';
import './App.css';
import Dashboard from './Component/Dashboard/Dashboard';
import {Route, Switch, Redirect, HashRouter as Router} from 'react-router-dom';
import Courses from "./Component/Courses/Courses";
import Students from './Component/Students/Students';
import NotFound from "./Component/Utils/NotFound";
import Layout from './Component/Layout/Layout';
import Course from './Component/Courses/Course';
import Student from './Component/Students/Student';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <Layout>
                  <Switch>
                      {/*<Switch/> 作用就像开关一样，一次只显示一个页面  */}
                      <Redirect exact path="/" to='/dashboard'/>
                      {/*路由看到'/'就直接转向到'/Dashboard'去*/}
                      <Route exact path='/dashboard' component={Dashboard} />
                      <Route exact path='/courses/' component={Courses}/>
                      <Route exact path='/students' component={Students}/>
                      <Route exact path='/courses/:id(\d+|create)' component={Course}/>
                      <Route exact path='/students/:id(\d+|create)' component={Student} />
                      <Route path='*' component={NotFound}/>
                  </Switch>
              </Layout>
          </Router>

          {/*<Router>*/}
              {/*<div>*/}
                  {/*<ul>*/}
                      {/*<li>*/}
                          {/*<Link to='/dashboard'>Dashboard</Link>*/}
                      {/*</li>*/}
                      {/*<li>*/}
                          {/*<Link to='/course'>Course</Link>*/}
                      {/*</li>*/}
                  {/*</ul>*/}
                  {/*<Switch>*/}
                      {/*/!*<Switch/> 作用就像开关一样，一次只显示一个页面  *!/*/}
                      {/*<Redirect exact path="/" to='/dashboard'/>*/}
                      {/*/!*路由看到'/'就直接转向到'/Dashboard'去*!/*/}
                      {/*<Route exact path='/dashboard' component={Dashboard} />*/}
                      {/*<Route exact path='/course/' component={CourseList}/>*/}
                      {/*<Route path='*' component={NotFound}/>*/}
                  {/*</Switch>*/}
              {/*</div>*/}

          {/*</Router>*/}
      </div>
    );
  }
}

export default App;
