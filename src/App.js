import React from 'react';
import './App.css';
import Container from "reactstrap/es/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ViewTitle from "./components/ViewTitle";
import {Button, Image, Nav} from "react-bootstrap";
import locatrash_banner2_alpha from './assets/locatrash_banner2_alpha.png';
import axios from "axios";

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            username: "",
            maLat: 0,
            maLon: 0
        }
    }

    componentDidMount() {
        if (localStorage.getItem("token") != null) {
            this.setState({ loggedIn: true });
            this.setState({ username: localStorage.getItem("name")});
        }
        const success = position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude, longitude);
            this.setState({maLat : latitude, maLon : longitude});
        };
        const error = () => {
            console.log("Unable to retrieve your location");
            this.setState({maLat : 45.7791677, maLon : 4.8683428});
            this.setState({popupMessage: "Votre navigateur ne supporte pas la geolocalisation, localisation => Polytech Lyon"});
        };
        navigator.geolocation.getCurrentPosition(success, error);
    }

    goToNearestTrash(){
        let route = "http://localhost:8081/trashes/nearest/"+this.state.maLat+"/"+this.state.maLon;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        try {
            console.log("try")
            axios.get(route, config)
                .then((response) => {
                    window.location.href="/trash?id="+response.data
                });
        }
        catch(error){
            this.setState({error})
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
                          <span className={"homeLoggedInfo"}>Bonjour <span className={"mainColor"}>{this.state.username}</span>, nous sommes heureux de vous revoir.</span>
                          <div className={"textCenter"}><Button variant="success" className={"margin15"} onClick={() => this.goToNearestTrash()}>Trouver la poubelle la plus proche</Button></div>
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
