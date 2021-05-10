import React from 'react';
import Login from './screens/Login/Login';
import {Route, withRouter, Switch} from 'react-router-dom';
import Dashboard from './screens/Dashboard/Dashboard';


function App() {
  return (
    <div >
        <Switch>
             <Route path = '/dashboard' component = {Dashboard}/>
             <Route path = '/' component = {Login}/>
        </Switch>
    </div>
  ); 
}

export default App;
