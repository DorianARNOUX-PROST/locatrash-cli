import React from 'react';
import axios from 'axios';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import '../styles/styles.css';
import { ReactBingmaps } from 'react-bingmaps-plus';
import {Button} from 'react-bootstrap';
import Popup from "reactjs-popup";
import {faAngleDown, faAngleUp, faHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as farHeart} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";

class TrashDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isVisible : true,
            bingmapKey: "Ak_-kDEjK1mCGeLhULqNo5zAk3HoOS3Z8NUlcJsOBLyaua-Hpbu3B9mv01BNmgdU",
            code_insee: "",
            codefuv: "",
            collecteur: "",
            commentaire: "",
            commune: "",
            datecreation: "",
            datemodifalpha: "",
            datemodifgeo: "",
            gestionnaire: "",
            gid: "",
            identifiant: "",
            implantation: "",
            latitude: "",
            longitude: "",
            numerodansvoie: "",
            observationlocalisante: "",
            referencemobilier: "",
            support: "",
            voie: "",
            direction: {},
            timeDirection: "",
            distanceDirection: "",
            maPosition: [],
            popupMessage: "LE CHIBRE",
            isFavorite: false,
            idFav: ""
        };
    }

    componentDidMount = () => {
        let id=new URLSearchParams(window.location.search).get('id');
        let route = "http://localhost:8081/trashes/trash/"+id;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        try {
            axios.get(route, config)
                .then((response) => {
                    this.setState({
                        code_insee : response.data.code_insee,
                        codefuv : response.data.codefuv,
                        collecteur : response.data.collecteur,
                        commentaire : response.data.commentaire,
                        commune : response.data.commune,
                        datecreation : response.data.datecreation,
                        datemodifalpha : response.data.datemodifalpha,
                        datemodifgeo : response.data.datemodifgeo,
                        gestionnaire : response.data.gestionnaire,
                        gid : response.data.gid,
                        identifiant : response.data.identifiant,
                        implantation : response.data.implantation,
                        latitude : response.data.latitude,
                        longitude : response.data.longitude,
                        numerodansvoie : response.data.numerodansvoie,
                        observationlocalisante : response.data.observationlocalisante,
                        referencemobilier : response.data.referencemobilier,
                        support : response.data.support,
                        voie : response.data.voie
                    });
                });
        }
        catch(error){
            this.setState({error})
        }

        route = "http://localhost:8081/favoris/list/"+localStorage.getItem("id");
        try {
            axios.get(route, config)
                .then((response) => {
                        response.data.forEach( (element) => {
                            if(element.trashId===id){
                                this.setState({ isFavorite: true, idFav: element.id})
                            }
                        })
                });
        }
        catch(error){
            this.setState({error})
        }

        const success = position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude, longitude);
            this.setState({maPosition: [latitude,longitude]});
        };

        const error = () => {
            console.log("Unable to retrieve your location");
            this.setState({maPosition: [45.7791677,4.8683428],popupMessage: "Votre navigateur ne supporte pas la geolocalisation"});
        };

        navigator.geolocation.getCurrentPosition(success, error);
    }

    loadTimeAndDistanceDirection(){
        let posA=this.state.maPosition[0]+","+this.state.maPosition[1]
        let posB=this.state.latitude+","+this.state.longitude
        let route = "http://dev.virtualearth.net/REST/v1/Routes/walking?wp.1="+posA+"&wp.2="+posB+"&maxSolutions=1&distanceUnit=km&key="+this.state.bingmapKey
        let time=0
        let distance=0
        try {
            axios.get(route)
                .then((response) => {
                    console.log(response.data)
                    time=this.clearTime(response.data.resourceSets[0].resources[0].travelDuration)
                    distance=this.clearDistance(response.data.resourceSets[0].resources[0].travelDistance)
                    this.setState({timeDirection: time, distanceDirection: distance})
                });
        }
        catch(error){
            this.setState({error})
        }
    }

    clearTime(time){
        console.log(time)
        let s,m,h
        s=time
        if(s>60){
            m=Math.trunc(s/60)
            s=s%60
            if(m>60){
                h=Math.trunc(m/60)
                m=m%60
                return h+ " heures, "+m+" minutes et "+s+" secondes"
            }
            else{
                return m+ " minutes et "+s+" secondes"
            }
        }
        else{
            return s+" secondes"
        }
    }

    clearDistance(dist){
        if(dist<1){
            return dist*1000+" mètres"
        }
        else{
            return dist+" kilomètres"
        }
    }

    hideShowItinerary(){
        document.getElementById("itineraryAfter").classList.remove('hidden');
        document.getElementById("itineraryBefore").classList.add('hidden');
    }

    loadDirectionOnMap(){
        console.log(this.state.maPosition)
        let newDirection = {
            "renderOptions": {"autoUpdateMapView": true},
            "requestOptions": {"routeMode": "walking", "maxRoutes": 1, "distanceUnit": "km", "routeDraggable": false},
            "wayPoints": [
                {
                    location: this.state.maPosition,
                    address: "Moi"
                },
                {
                    location: [ this.state.latitude, this.state.longitude],
                    address: "Poubelle"
                }
            ]
        };
        this.setState({direction : newDirection})
        this.loadTimeAndDistanceDirection()
        this.hideShowItinerary()
    }

    removeFav(){
        let trashId=new URLSearchParams(window.location.search).get('id');
        let route = "http://localhost:8081/favoris/remove/"+this.state.idFav;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        try {
            axios.delete(route, config)
                .then((response) => {
                    window.location.href="/trash?id="+trashId;
                });
        }
        catch(error){
            this.setState({error})
        }
    }

    addFav(){
        let trashId=new URLSearchParams(window.location.search).get('id');
        let route = "http://localhost:8081/favoris/add/"+localStorage.getItem("id")+"/"+trashId;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        try {
            console.log(route)
            console.log(config)
            axios.get(route, config)
                .then((response) => {
                    window.location.href="/trash?id="+trashId;
                });
        }
        catch(error){
            this.setState({error})
        }
    }

    moreDetails(){
        let bool=document.getElementById("moreDetails").classList.contains('hidden')
        //console.log("moreDetails :"+bool)
        if(bool){
            document.getElementById("moreDetails").classList.remove('hidden');
            document.getElementById("moreDetailsDown").classList.add('hidden');
            document.getElementById("moreDetailsUp").classList.remove('hidden');
        }
        else{
            document.getElementById("moreDetails").classList.add('hidden');
            document.getElementById("moreDetailsDown").classList.remove('hidden');
            document.getElementById("moreDetailsUp").classList.add('hidden');
        }
    }

    render() {
        const popupMessage = this.state.popupMessage
        return (
            <Container>
                {popupMessage ?
                    <Popup position="right center">
                        <div>{popupMessage}</div>
                        <Button variant="success" onClick={() => this.removePopupMessage()}>Ok</Button>
                    </Popup>
                    : <div></div>
                }
                <Row>
                    <Col sm={10}>
                        <span className={"title_stats"}>Identifiant de la poubelle</span>
                        <span className={"subtitle_stats"}>{this.state.identifiant}</span>
                    </Col>
                    <Col sm={2} style={{margin:"auto 0px"}}>
                        {this.state.isFavorite ?
                            <React.Fragment>
                                <FontAwesomeIcon className={"favButton"} icon={faHeart} onClick={() => this.removeFav()}/>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <FontAwesomeIcon className={"notFavButton"} icon={farHeart} onClick={() => this.addFav()}/>
                            </React.Fragment>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className = "map-one">
                            <ReactBingmaps
                            bingmapKey = { this.state.bingmapKey }
                            center = {[ 45.743508, 4.846877]}
                            directions = {this.state.direction}
                            >
                            </ReactBingmaps>

                        </div>
                    </Col>
                </Row>
                <Row id={"itineraryBefore"}>
                    <Col sm={12} className={"textCenter"}>
                        <Button variant="success" className={"margin15"} onClick={() => this.loadDirectionOnMap()}>Itinéraire</Button>
                    </Col>
                </Row>
                <Row id={"itineraryAfter"} className={"hidden"}>
                    <Col sm={12} className={"textCenter font150 margin15"}>
                        <div><span className={"mainColor"}>Temps : </span>{this.state.timeDirection}</div>
                        <div><span className={"mainColor"}>Distance : </span>{this.state.distanceDirection}</div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <span className={"desc_title"}>Numéro de voie</span>
                        <span className={"desc_content"}>{this.state.numerodansvoie==null ? "-" : this.state.numerodansvoie}</span>
                    </Col>
                    <Col sm={4}>
                        <span className={"desc_title"}>Voie</span>
                        <span className={"desc_content"}>{this.state.voie==null ? "-" : this.state.voie}</span>
                    </Col>
                    <Col sm={4}>
                        <span className={"desc_title"}>Commune</span>
                        <span className={"desc_content"}>{this.state.commune==null ? "-" : this.state.commune}</span>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <span className={"desc_title"}>Observation</span>
                        <span className={"desc_content"}>{this.state.observationlocalisante==null ? "-" : this.state.observationlocalisante}</span>
                    </Col>
                    <Col sm={4}>
                        <span className={"desc_title"}>Latitude</span>
                        <span className={"desc_content"}>{this.state.latitude==null ? "-" : this.state.latitude}</span>
                    </Col>
                    <Col sm={4}>
                        <span className={"desc_title"}>Longitude</span>
                        <span className={"desc_content"}>{this.state.longitude==null ? "-" : this.state.longitude}</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div id={"moreDetailsDown"} className={"moreDetails"} onClick={() => this.moreDetails()}>
                            <FontAwesomeIcon icon={faAngleDown} className={"angleIcon"}/>
                            Voir plus de détails
                        </div>
                        <div id={"moreDetailsUp"} className={"moreDetails hidden"} onClick={() => this.moreDetails()}>
                            <FontAwesomeIcon icon={faAngleUp} className={"angleIcon"}/>
                            Voir moins de détails
                        </div>
                    </Col>
                </Row>
                <div id={"moreDetails"} className={"hidden"}>
                    <Row>
                        <Col sm={4}>
                            <span className={"desc_title"}>Code INSEE</span>
                            <span className={"desc_content"}>{this.state.code_insee==null ? "-" : this.state.code_insee}</span>
                        </Col>
                        <Col sm={4}>
                            <span className={"desc_title"}>Code FUV</span>
                            <span className={"desc_content"}>{this.state.codefuv==null ? "-" : this.state.codefuv}</span>
                        </Col>
                        <Col sm={4}>
                            <span className={"desc_title"}>GID</span>
                            <span className={"desc_content"}>{this.state.gid==null ? "-" : this.state.gid}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <span className={"desc_title"}>Date création</span>
                            <span className={"desc_content"}>{this.state.datecreation==null ? "-" : this.state.datecreation}</span>
                        </Col>
                        <Col sm={4}>
                            <span className={"desc_title"}>Date modif alpha</span>
                            <span className={"desc_content"}>{this.state.datemodifalpha==null ? "-" : this.state.datemodifalpha}</span>
                        </Col>
                        <Col sm={4}>
                            <span className={"desc_title"}>Date modif geo</span>
                            <span className={"desc_content"}>{this.state.datemodifgeo==null ? "-" : this.state.datemodifgeo}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <span className={"desc_title"}>Collecteur</span>
                            <span className={"desc_content"}>{this.state.collecteur==null ? "-" : this.state.collecteur}</span>
                        </Col>
                        <Col sm={4}>
                            <span className={"desc_title"}>Gestionnaire</span>
                            <span className={"desc_content"}>{this.state.gestionnaire==null ? "-" : this.state.gestionnaire}</span>
                        </Col>
                        <Col sm={4}>
                            <span className={"desc_title"}>Support</span>
                            <span className={"desc_content"}>{this.state.support==null ? "-" : this.state.support}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <span className={"desc_title"}>Référence mobilier</span>
                            <span className={"desc_content"}>{this.state.referencemobilier==null ? "-" : this.state.referencemobilier}</span>
                        </Col>
                        <Col sm={4}>
                            <span className={"desc_title"}>Implantation</span>
                            <span className={"desc_content"}>{this.state.implantation==null ? "-" : this.state.implantation}</span>
                        </Col>
                        <Col sm={4}>
                            <span className={"desc_title"}>Commentaire</span>
                            <span className={"desc_content"}>{this.state.commentaire==null ? "-" : this.state.commentaire}</span>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

export default TrashDetail;
