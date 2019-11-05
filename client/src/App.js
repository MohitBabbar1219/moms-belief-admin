import React from 'react';
import Login from "./screens/Login";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import isAuthenticated from "./utils/authStatus";
import Dashboard from "./screens/Dashboard";
import Home from "./screens/Home";
import AboutUs from "./screens/AboutUs";
import HomeBasedProgram from "./screens/HomeBasedProgram";
import SchoolScreen from "./screens/School";
import Centers from "./screens/Centers";
import SpotlightCenter from "./screens/SpotlightCenter";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/login' exact component={Login} />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/home' exact component={Home} />
          <Route path='/about-us' exact component={AboutUs} />
          <Route path='/home-based-program' exact component={HomeBasedProgram} />
          <Route path='/schools' exact component={SchoolScreen} />
          <Route path='/centers' exact component={Centers} />
          <Route path='/centers/:centerUrl' exact component={SpotlightCenter} />
          {isAuthenticated() ? null : <Redirect to='/login' />}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
