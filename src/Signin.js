import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';


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

  signIn() {

    const user = {
      "email": this.state.email,
      "password": this.state.password,
    };

    let route = "http://localhost:8081/auth/login";
    axios.post(route, user)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
    })
    .catch(function (error) {
      
    });
    window.location.href='/map';
  }

  render() {
    return (
      <div className="form-inline">
        <h1>Se connecter</h1>
        <div className="form-group">
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
          <Button variant="dark" onClick={() => this.signIn()}>Se connecter</Button>
        </div>
        <div>{this.state.error.message}</div>
      </div>
    )
  }
}
export default Signin;