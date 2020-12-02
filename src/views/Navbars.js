import Navbar from 'react-bootstrap/Navbar'
import React from 'react';
import { Button, Nav, Form, FormControl } from 'react-bootstrap';
import '../App.css';
import '../styles/Navbar.css';
import '../styles/styles.css';
import locatrash_banner_alpha from '../assets/locatrash_banner_alpha.png'
import NavbarBrand from "react-bootstrap/NavbarBrand";
import { faChartBar, faHeart, faHome, faMapMarkedAlt, faSignInAlt, faSignOutAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    window.location.href='/';
  }

    render (){
      return (
        <div>
          <Navbar fixed="sticky" bg="success" variant="dark">
            <NavbarBrand href="/">
              <img src={locatrash_banner_alpha} style={{width:200}} />
            </NavbarBrand>
            <Nav className="mr-auto">
              <Nav.Link href="/"><FontAwesomeIcon icon={faHome} className={"iconNavbar"} />Accueil</Nav.Link>
              {this.state.loggedIn ?
              <React.Fragment>
                  <Nav.Link href="map"><FontAwesomeIcon icon={faMapMarkedAlt} className={"iconNavbar"} />Map</Nav.Link>
                  <Nav.Link href="stats"><FontAwesomeIcon icon={faChartBar} className={"iconNavbar"} />Statistiques</Nav.Link>
                </React.Fragment>
                  :
                  <React.Fragment>

                  </React.Fragment>
                }


            </Nav>
            <div className={"navbar-nav"}>
            {this.state.loggedIn ?

                <React.Fragment>
                  <Nav.Link href="favoris"><FontAwesomeIcon icon={faHeart} className={"iconNavbar"} />Mes favoris</Nav.Link>
                  <Nav.Link onClick={() => this.logout()}><FontAwesomeIcon icon={faSignOutAlt} className={"iconNavbar"} />Se deconnecter</Nav.Link>
                </React.Fragment>
                :
                <React.Fragment>
                  <Nav.Link href="signin"><FontAwesomeIcon icon={faSignInAlt} className={"iconNavbar"} />Se connecter</Nav.Link>
                  <Nav.Link href="signup"><FontAwesomeIcon icon={faUserPlus} className={"iconNavbar"} />Créer un compte</Nav.Link>
                </React.Fragment>

            }
            </div>
          </Navbar>
        </div>
      )
    }
  }

  export default Navbars;


