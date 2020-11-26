import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import '../styles/form.css';
import Form from "react-bootstrap/Form";
import ViewTitle from "../components/ViewTitle";
import locatrash_banner2_alpha from "../assets/locatrash_banner2_alpha.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "reactstrap/es/Container";


class Signup extends Component {



  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
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

  signUp() {

    const user = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password,
    };

    let route = "localhost:8081/user/add";
    axios.post(route, { user })
    .then((response) => {
      console.log(response);
      console.log(response.data);
    })
    .catch(error => {
      this.setState({error})
    });
  }

  render() {
    return (
      <Container>
          <ViewTitle title={"Creer un compte"}/>
          <div className="Login">
          <Form onSubmit={this.signUp()}>
            <Form.Group size="lg" controlId="prenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                  autoFocus
                  type="text"
                  placeholder="Prénom"
                  onChange={event => this.setState({name: event.target.value})}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                  autoFocus
                  type="text"
                  placeholder="Nom"
                  onChange={event => this.setState({surname: event.target.value})}
              />
            </Form.Group>
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
            <Button variant="success" block size="lg" type="submit" disabled={!this.validateForm()}>Creer mon compte</Button>
            <Button variant="success" block size="lg" onClick={event =>  window.location.href='/signin'}>J'ai deja un compte</Button>
          </Form>
          </div>
        </Container>
    )
  }
}
export default Signup;
