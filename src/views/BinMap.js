import React from 'react';
import { ReactBingmaps } from 'react-bingmaps-plus';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import Popup from 'reactjs-popup';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class BinMap extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isVisible : true,
      bingmapKey: "Ak_-kDEjK1mCGeLhULqNo5zAk3HoOS3Z8NUlcJsOBLyaua-Hpbu3B9mv01BNmgdU",
      popupMessage: "",
      pushPins : [
        {
          "location":[13.0827, 80.2707], "option":{ color: 'red' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      directions: {
        "inputPanel": "inputPanel",
        "renderOptions": {"itineraryContainer": "itineraryContainer" },
        "requestOptions": {"routeMode": "driving", "maxRoutes": 2},
        "wayPoints": [
              {
                address: 'Chennai, Tamilnadu'
              },
              {
                address: 'Salem, Tamilnadu'
              },
              {
                address: 'Coimbatore, Tamilnadu'
              }
            ]
      }
    }
    this.loadBins = this.loadBins.bind(this);
    this.removePopupMessage = this.removePopupMessage.bind(this);
  }

  removePopupMessage() {
    this.state.popupMessage = ""
  }

  loadBins(){
    let route = "http://localhost:8081/trashes/list";
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    let pushPinsUpdated = [];
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude)
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
        response.data.forEach( (element) => {
          pushPinsUpdated.push({
            "id": element.identifiant, "location":[parseFloat(element.latitude), parseFloat(element.longitude)], "option":{ color: 'green' }, "addHandler": {type : "click", callback: () => {window.location.href="/trash?id="+element.identifiant} }
          })
      })
      

      this.setState({pushPins : pushPinsUpdated})
      console.log(this.state.pushPins)
      });
    }
    catch(error){
      this.setState({error})
    }
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
        <Row>
          <Col>
            <div className = "map-one">
              <Button variant="primary" onClick={() => this.loadBins()}>Charger les poubelles</Button>
              <ReactBingmaps
                  bingmapKey = "Ak_-kDEjK1mCGeLhULqNo5zAk3HoOS3Z8NUlcJsOBLyaua-Hpbu3B9mv01BNmgdU"
                  center = {[ 45.743508, 4.846877]}
                  pushPins = { this.state.pushPins }
                  directions = {this.state.directions}
              >
              </ReactBingmaps>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BinMap;
