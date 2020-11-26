import React, { Component } from 'react';
import {Button, Image} from 'react-bootstrap';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import ViewTitle from "../components/ViewTitle";
import locatrash_banner2_alpha from "../assets/locatrash_banner2_alpha.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "reactstrap/es/Container";


class Signin extends Component {



  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  signIn() {

    const user = {
      "email": this.state.email,
      "password": this.state.password,
    };

    let route = "http://localhost:8081/auth/login";
    axios.post(route, user)
    .then((response) => {
      console.log(response);
      localStorage.setItem('token', response.data.token);
      window.location.href='/';
    })
    .catch(function (error) {

    });
  }

  render() {
    return (
        <Container>
          <ViewTitle title={"Se connecter"}/>
          <div className="Login">
          <Form onSubmit={this.signIn()}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                  autoFocus
                  type="text"
                  placeholder="Email"
                  onChange={event => this.setState({email: event.target.value})}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Mot de passe"
                  onChange={event => this.setState({password: event.target.value})}
              />
            </Form.Group>
            <Button variant="success" block size="lg" type="submit" disabled={!this.validateForm()}>Se connecter</Button>
          </Form>
          </div>
        </Container>
    )
  }
}
export default Signin;
