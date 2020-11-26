import React from 'react';
import './App.css';
import Container from "reactstrap/es/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ViewTitle from "./components/ViewTitle";
import {Image, Nav} from "react-bootstrap";
import locatrash_banner2_alpha from './assets/locatrash_banner2_alpha.png';

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem("token") != null) {
            this.setState({ loggedIn: true })
        }
    }

  render (){
    return (
      <Container>
          <ViewTitle title={"Accueil"}/>
          <Image className={"homeBanner"} src={locatrash_banner2_alpha} />
          <Row>
            <Col>
              <span className={"homeTitle"}>
                  Bienvenue sur <b className={"mainColor"}>LocaTrash</b>, l'application qui recense toutes les poubelles du Grand Lyon.
              </span>
            </Col>
          </Row>
          <Row>
              <Col>
                  {this.state.loggedIn ?
                      <React.Fragment>

                      </React.Fragment>
                      :
                      <React.Fragment>
                          <span className={"homeLoggedInfo"}>Veuillez <a href="signup" className={"mainColor"}>créer un compte</a> ou vous <a href="signin" className={"mainColor"}>connecter</a> afin d'accéder à la carte interactive.</span>
                      </React.Fragment>
                  }
              </Col>
          </Row>
          <Row>
              <Col>
                  <div className={"homeFunct"}>
                      <span className={"homeText"}>
                      Avec l'application web <b className={"mainColor"}>LocaTrash</b>, vous pouvez retouver les fonctionnalités suivantes :</span>
                      <ul className={"homeUl"}>
                          <li>Afficher les poubelles du Grand Lyon sur la map</li>
                          <li>Obtenir la liste des poubelles du Grand Lyon</li>
                          <li>Consulter les statistiques de la répartition des poubelles</li>
                          <li>Afficher les détails d'une poubelle</li>
                          <li>Afficher l'itinéraire de votre position actuelle à une poubelle</li>
                          <li>Ajouter une poubelle à vos poubelles favorites</li>
                          <li>Consulter la liste de vos poubelles favorites et les afficher sur la map</li>
                      </ul>
                  </div>

              </Col>
          </Row>
      </Container>
      )
  }
}

export default App;
