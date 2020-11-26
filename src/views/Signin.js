import React, { Component } from 'react';
import {Button, Image} from 'react-bootstrap';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import ViewTitle from "../components/ViewTitle";
import Container from "react-bootstrap/Container";


class Signin extends Component {



  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  signIn() {
    const logInUser = {
      email: this.state.email,
      password: this.state.password
    };
    let route = "http://localhost:8081/auth/login";
    try{
      axios.post(route, logInUser)
          .then((response) => {
            localStorage.setItem('token', response.data.token);
            window.location.href='/';
          })
    }
    catch(error) {
      this.setState({error})
    }
  }

  render() {
    return (
        <Container>
          <ViewTitle title={"Se connecter"}/>
          <div className="Login">
          <Form>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
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
            <Button variant="success" block size="lg" onClick={() => this.signIn()}>Se connecter</Button>
          </Form>
          </div>
        </Container>
    )
  }
}
export default Signin;
