import React from 'react';
import axios from 'axios';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import '../styles/styles.css';
import { ReactBingmaps } from 'react-bingmaps-plus';
import {Button} from 'react-bootstrap';

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
            maPosition: [45.7706136,4.8635859]
        };
        this.addDirections = this.addDirections.bind(this);
        this.trigger = this.trigger.bind(this);
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
    }

    loadDirectionOnMap(){
        console.log(this.state.maPosition)
        let newDirection = {
            "inputPanel": "inputPanel",
            "renderOptions": {"itineraryContainer": "itineraryContainer" },
            "requestOptions": {"routeMode": "walking", "maxRoutes": 1},
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
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <span className={"title_stats"}>Identifiant de la poubelle</span>
                        <span className={"subtitle_stats"}>{this.state.identifiant}</span>
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
                <Row>
                    <Col sm={12} className={"textCenter"}>
                        <Button variant="success" className={"margin15"} onClick={() => this.loadDirectionOnMap()}>Charger la direction sur la map</Button>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default TrashDetail;
