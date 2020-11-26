import React from 'react';
import { ReactBingmaps } from 'react-bingmaps-plus';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import Popup from 'reactjs-popup';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ViewTitle from "../components/ViewTitle";
import Table from "react-bootstrap/Table";
import DoughnutChart from "../components/DoughnutChart";

class BinMap extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isVisible : true,
      bingmapKey: "Ak_-kDEjK1mCGeLhULqNo5zAk3HoOS3Z8NUlcJsOBLyaua-Hpbu3B9mv01BNmgdU",
      center: [45.743508, 4.846877],
      popupMessage: "",
      pushPins : [],
      trashes: [],
      maLat: 0,
      maLon: 0
    }
  }

  removePopupMessage() {
    this.state.popupMessage = ""
  }

  componentDidMount() {
    let route = "http://localhost:8081/trashes/list";
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    try {
      axios.get(route, config)
        .then((response) => {
          this.setState({trashes : response.data})
        });
    }
    catch(error){
      this.setState({error})
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

  loadTrashesOnMap(){
    let pushPinsUpdated = [];
    this.state.trashes.forEach( (element) => {
      pushPinsUpdated.push({
        "id": element.identifiant, "location":[parseFloat(element.latitude), parseFloat(element.longitude)], "option":{ color: 'green' }, "addHandler": {type : "click", callback: () => {window.location.href="/trash?id="+element.identifiant} }
      })
    })
    this.setState({pushPins : pushPinsUpdated})
  }



  render() {
    const popupMessage = this.state.popupMessage
    return (
      <Container>
        {popupMessage ?
          <Popup position="right center">
            <div>{popupMessage}</div>
            <Button variant="primary" onClick={() => this.removePopupMessage()}>Ok</Button>
          </Popup>
          : <div></div>
        }
        <ViewTitle title={"Map"}/>
        <Row>
          <Col sm={12}>
            <span className={"title_stats"}>Map des poubelles du GrandLyon</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className = "map-one">

              <ReactBingmaps
                  bingmapKey = { this.state.bingmapKey }
                  center = {this.state.center}
                  pushPins = { this.state.pushPins }
              >
              </ReactBingmaps>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className={"textCenter"}>
            <Button variant="success" className={"margin15"} onClick={() => this.loadTrashesOnMap()}>Charger les poubelles sur la map</Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className={"textCenter"}>
            <Button variant="success" className={"margin15"} onClick={() => this.goToNearestTrash()}>Poubelle la plus proche</Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <span className={"title_stats"}>Liste complète des poubelles du GrandLyon ({this.state.trashes.length} poubelles)</span>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Table>
              <thead>

              <tr>
                <th>#</th>
                <th>Adresse</th>
                <th>Ville</th>
                <th>GPS</th>
                <th>Favoris</th>
              </tr>
              </thead>
              <tbody>
              {this.state.trashes.map((item, i) => {
                let adresse="";
                if(item.numerodansvoie!=null) {
                  adresse+=item.numerodansvoie+" "
                }
                if(item.voie!=null) {
                  adresse+=item.voie
                }
                else{
                  adresse="-"
                }
                return (
                    <tr className={"clickable"} onClick={() => window.location.href="/trash?id="+item.identifiant}>
                      <th scope="row">{item.identifiant}</th>
                      <td>{adresse}</td>
                      <td>{item.commune}</td>
                      <td>[{item.latitude}, {item.longitude}]</td>
                      <td>-</td>
                    </tr>
                )
              })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BinMap;
