import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import '../styles/form.css';


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

  signUp() {

    const user = {
      "name": this.state.name,
      "surname": this.state.surname,
      "email": this.state.email,
      "password": this.state.password,
    };

    console.log(user)

    let route = "http://localhost:8081/user/add";
    axios.post(route, user)
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
      <div className="form-inline">
        <h1>Créer un compte</h1>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="prénom"
            onChange={event => this.setState({name: event.target.value})}
          />
          <input
            className="form-control"
            type="text"
            placeholder="nom"
            onChange={event => this.setState({surname: event.target.value})}
          />
          <input
            className="form-control"
            type="text"
            placeholder="email"
            onChange={event => this.setState({email: event.target.value})}
          />
          <input
            className="form-control"
            type="password"
            placeholder="mot de passe"
            onChange={event => this.setState({password: event.target.value})}
          />
          <Button variant="dark" onClick={() => this.signUp()}>S'enregistrer</Button>
          <Button variant="dark" onClick={event =>  window.location.href='/signin'}>J'ai deja un compte</Button>


        </div>
        <div>{this.state.error.message}</div>
      </div>
    )
  }
}
export default Signup;
