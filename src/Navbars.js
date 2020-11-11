import Navbar from 'react-bootstrap/Navbar'
import React from 'react';
import { Button, Nav, Form, FormControl } from 'react-bootstrap';
import './App.css';
import './Navbar.css';
import { Link, useHistory } from "react-router-dom";

class Navbars extends React.Component{

  constructor() {
    super()

    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.setState({ loggedIn: true })
    }
  }

  logout(){
    localStorage.removeItem("token")
    window.location.href='/';
  }

    render (){
      return (
        <div>
          <Navbar fixed="sticky" bg="primary" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href="/">Accueil</Nav.Link>
              {this.state.loggedIn ?
              <React.Fragment>
                  <Nav.Link href="map">Map</Nav.Link>
                  <Nav.Link onClick={() => this.logout()}>Se deconnecter</Nav.Link>
                </React.Fragment>
                  :
                  <React.Fragment>
                    <Nav.Link href="signin">Se connecter</Nav.Link>
                    <Nav.Link href="signup">Creer un compte</Nav.Link>
                  </React.Fragment>
                }
              
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar>
        </div>
      )
    }
  }

  export default Navbars;

  
