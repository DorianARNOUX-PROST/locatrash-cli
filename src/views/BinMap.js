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
      directions: {
        "inputPanel": "inputPanel",
        "renderOptions": {"itineraryContainer": "itineraryContainer" },
        "requestOptions": {"routeMode": "walking", "maxRoutes": 1},
        "wayPoints": [
              {
                location: [45.7337532, 4.9092352],
                address: "BronCity"
              },
              {
                location: [ 45.743508, 4.846877],
                address: "Lyonzer"
              }
            ]
      }
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
    let pushPinsUpdated = [];
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pushPinsUpdated.push({
          "id": 1, "location":[parseFloat(position.coords.latitude), parseFloat(position.coords.longitude)], "option":{ color: 'blue' }, "addHandler": {type : "click", callback: () => {window.location.href="/trash" }}
        })
      })

    } else {
      this.state.popupMessage = "Votre navigateur ne supporte pas la geolocalisation"
    }
    try {
      axios.get(route, config)
        .then((response) => {
          this.setState({trashes : response.data})
        });
    }
    catch(error){
      this.setState({error})
    }
  }

  loadTrashes(){
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
            <Button variant="success" className={"margin15"} onClick={() => this.loadTrashes()}>Charger les poubelles sur la map</Button>
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
