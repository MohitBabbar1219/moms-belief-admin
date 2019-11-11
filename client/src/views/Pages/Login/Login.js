import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import isAuthenticated from "../../../utils/authStatus";
import setAuthToken from "../../../utils/setAuthToken";

import jwtDecoder from 'jwt-decode';
import axios from "axios";

class Login extends Component {
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
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onLoginFormSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.onInputChange} autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onInputChange} autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" onClick={this.onLoginFormSubmit} className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
