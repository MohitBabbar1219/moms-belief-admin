import React from 'react';
import Aux from './../../hoc/Aux';
import {Alert} from "react-bootstrap";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecoder from 'jwt-decode';
import isAuthenticated from "../../utils/authStatus";

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: ""
  };

  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.push('/dashboard')
    }
  }

  onInputChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value});
  };

  onLoginFormSubmit = async (evt) => {
    evt.preventDefault();

    if (this.state.email.length < 5 || this.state.password.length < 6) {
      this.setState({errors: "Check email and password"});
      setTimeout(() => this.setState({errors: ""}), 3000);
    }
    this.initLogin();
  };

  initLogin = async () => {
    const newLogin = {
      email: this.state.email,
      password: this.state.password
    };

    const loginResponse = await axios.post('/api/users/login', newLogin);
    console.log(loginResponse.data);

    if (loginResponse.data.success !== true) {
      this.setState({errors: "Check email and password"});
      setTimeout(() => this.setState({errors: ""}), 3000);
      return;
    }

    let authToken = loginResponse.data.token;
    const decodedToken = jwtDecoder(authToken);
    console.log(decodedToken);
    localStorage.setItem("authToken", authToken);
    setAuthToken(authToken);
    this.props.history.push('/dashboard');
  };

  render() {
    return (<Aux>
      <section className="container">
        <h1 className="text-center p-4">Moms Belief Admin</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your Mom's Belief Admin account</p>
              <form onSubmit={this.onLoginFormSubmit}>
                <div className="form-group">
                  <input type="text" value={this.state.email} onChange={this.onInputChange}
                         className="form-control form-control-lg"
                         placeholder="Email Address" name="email"/>
                  {!!this.state.errors.email ? <p className="text-danger ml-2">{this.state.errors.email}</p> : null}
                </div>
                <div className="form-group">
                  <input type="password" value={this.state.password} onChange={this.onInputChange}
                         className="form-control form-control-lg"
                         placeholder="Password" name="password"/>
                  {!!this.state.errors.password ?
                    <p className="text-danger ml-2">{this.state.errors.password}</p> : null}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4"/>
              </form>
              <button onClick={() => console.log(isAuthenticated())}>sdlknsdkla</button>
            </div>
          </div>
        </div>
        {this.state.errors.length === 0 ? null :
          <Alert className="w-50 mx-auto mt-4" variant={'danger'}>{this.state.errors}</Alert>}
      </section>
    </Aux>);
  }
}

export default Login;