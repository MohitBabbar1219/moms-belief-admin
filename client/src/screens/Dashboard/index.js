import React from 'react';
import Aux from './../../hoc/Aux';
import NavBar from "../../components/NavBar";

class Dashboard extends React.Component {
  render() {
    return (<Aux>
      <NavBar/>
      <h1 className="container py-4">Dashboard</h1>
    </Aux>);
  }
}

export default Dashboard;