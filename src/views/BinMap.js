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
      pushPins : []
    }
  }

  removePopupMessage() {
    this.state.popupMessage = ""
  }

  componentDidMount(){
    let route = "http://localhost:8081/trashes/list";
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    let pushPinsUpdated = [];
    try {
      axios.get(route, config)
      .then((response) => {
        response.data.forEach( (element) => {
          pushPinsUpdated.push({
            "location":[parseFloat(element.latitude), parseFloat(element.longitude)], "option":{ color: 'green' }, "addHandler": {type : "click", callback: () => {window.location.href="/trash?id="+element.identifiant} }
          })
      })
        this.setState({pushPins : pushPinsUpdated});

        /*
      if (navigator.geolocation) {
        let position = navigator.geolocation.getCurrentPosition.coords
        console.log(position)
        /* pushPinsUpdated.push({
          "location":[parseFloat(position.latitude), parseFloat(position.longitude)], "option":{ color: 'blue' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        })  // NEED HTTPS TO IMPLEMENT GEOLOCATION API
      } else {
        this.state.popupMessage = "Votre navigateur ne supporte pas la geolocalisation"
      }
      */
      });
    }
    catch(error){
      this.setState({error})
    }
  }


  // componentDidUpdate(prevProps, prevState, snapshot){
  //   this.setState({pushPins : this.state.pushPinsTmp})
  // }

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
              <ReactBingmaps
                  bingmapKey = { this.state.bingmapKey }
                  center = {[ 45.743508, 4.846877]}
                  pushPins = { this.state.pushPins }
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
