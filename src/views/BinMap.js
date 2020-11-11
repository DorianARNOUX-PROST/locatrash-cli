import React from 'react';
import { ReactBingmaps } from 'react-bingmaps-plus';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import Popup from 'reactjs-popup';

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
    try {
      axios.get(route, config)
      .then((response) => {
        response.data.forEach( (element) => {
          pushPinsUpdated.push({
            "location":[parseFloat(element.latitude), parseFloat(element.longitude)], "option":{ color: 'green' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
          })
      })
      if (navigator.geolocation) {
        let position = navigator.geolocation.getCurrentPosition.coords
        console.log(position)
        /* pushPinsUpdated.push({
          "location":[parseFloat(position.latitude), parseFloat(position.longitude)], "option":{ color: 'blue' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        }) */ // NEED HTTPS TO IMPLEMENT GEOLOCATION API
      } else {
        this.state.popupMessage = "Votre navigateur ne supporte pas la geolocalisation"
      }

      this.setState({pushPins : pushPinsUpdated})
      });
    }
    catch(error){
      this.setState({error})
    }
  }



  render() {
    const popupMessage = this.state.popupMessage
    return (
      <div>
        {popupMessage ?
          <Popup position="right center">
            <div>{popupMessage}</div>
            <Button variant="primary" onClick={() => this.removePopupMessage()}>Ok</Button>
          </Popup>
          : <div></div>
        }

          <div className = "map-one">
          <Button variant="primary" onClick={() => this.loadBins()}>Charger les poubelles</Button>
          <ReactBingmaps
            bingmapKey = "Ak_-kDEjK1mCGeLhULqNo5zAk3HoOS3Z8NUlcJsOBLyaua-Hpbu3B9mv01BNmgdU"
            center = {[ 45.743508, 4.846877]}
            pushPins = { this.state.pushPins }
          >
          </ReactBingmaps>
        </div>
      </div>
    );
  }
}

export default BinMap;
