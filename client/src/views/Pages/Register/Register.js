import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {withRouter} from "react-router-dom";
import isAuthenticated from "../../../utils/authStatus";
import axios from "axios";
import jwtDecoder from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";

class Register extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    password2: '',
    errors: ""
  };


  onInputChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value});
  };

  onLoginFormSubmit = async (evt) => {
    evt.preventDefault();

    if (this.state.email.length < 5 || this.state.password.length < 6 || this.state.name.length < 2) {
      this.setState({errors: "Check email, password (min 6 character) and name (min 2 characters)"});
      setTimeout(() => this.setState({errors: ""}), 3000);
      return;
    }

    if (this.state.password !== this.state.password2) {
      this.setState({errors: "Both passwords must match"});
      setTimeout(() => this.setState({errors: ""}), 3000);
      return;
    }

    this.initRegister();
  };

  initRegister = async () => {
    const newLogin = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      name: this.state.name,
    };

    let loginResponse;
    try {
      loginResponse = await axios.post('/api/users/register', newLogin)
    } catch (e) {
      this.setState({errors: "Check email, password (min 6 character) and name (min 2 characters)"});
      setTimeout(() => this.setState({errors: ""}), 3000);
      return;
    }
    console.log(loginResponse.data);

    this.props.history.push('/login');
  };


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.onInputChange} autoComplete="username"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.onInputChange} autoComplete="email"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" value={this.state.password} onChange={this.onInputChange} placeholder="Password" autoComplete="new-password"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password2" value={this.state.password2} onChange={this.onInputChange} placeholder="Repeat password" autoComplete="new-password"/>
                    </InputGroup>
                    <Button onClick={this.onLoginFormSubmit} color="success" >Create Account</Button>
                    <Button onClick={() => this.props.history.push('/login')} color="primary" >Login</Button>
                  </Form>
                  {this.state.errors.length > 0 ? <div className="alert alert-danger w-100 mt-3" role="alert">{this.state.errors}</div> : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Register);
