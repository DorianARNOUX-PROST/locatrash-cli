import React from 'react';
import { ReactBingmaps } from 'react-bingmaps-plus';
import axios from 'axios';
import {Button} from 'reactstrap';
import Popup from 'reactjs-popup';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ViewTitle from "../components/ViewTitle";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'

class Favoris extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            favoris: []
        }
    }

    removePopupMessage() {
        this.state.popupMessage = ""
    }

    componentDidMount() {
        let route = "http://localhost:8081/favoris/trashes/"+localStorage.getItem("id");
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        try {
            let favoris=[]
            axios.get(route, config)
                .then((response) => {
                    favoris = response.data
                    this.setState({favoris: favoris})
                });
        }
        catch(error){
            this.setState({error})
        }
    }

    removeFav(id){
        let route = "http://localhost:8081/favoris/remove/"+id;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        try {
            axios.delete(route, config)
                .then((response) => {
                    window.location.href="/favoris";
                });
        }
        catch(error){
            this.setState({error})
        }
    }

    goToTrash(id){
        window.location.href="/trash?id="+id;
    }

    render() {
        return (
            <Container>
                <ViewTitle title={"Mes favoris"}/>
                {this.state.favoris.length > 0 ?
                    <React.Fragment>
                        <Row>
                            <Col sm={12}>
                                <span className={"title_stats"}>Mes poubelles favorites ({this.state.favoris.length})</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Table>
                                    <thead>

                                    <tr>
                                        <th>Poubelle <FontAwesomeIcon icon="search" /></th>
                                        <th>Adresse</th>
                                        <th>Ville</th>
                                        <th>GPS</th>
                                        <th>Date d'ajout</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.favoris.map((item, i) => {
                                        let adresse="";
                                        if(item.trash.numerodansvoie!=null) {
                                            adresse+=item.trash.numerodansvoie+" "
                                        }
                                        if(item.trash.voie!=null) {
                                            adresse+=item.trash.voie
                                        }
                                        else{
                                            adresse="-"
                                        }
                                        return (
                                            <tr>
                                                <th>{item.trash.identifiant}</th>
                                                <td>{adresse}</td>
                                                <td>{item.trash.commune}</td>
                                                <td>[{item.trash.latitude}, {item.trash.longitude}]</td>
                                                <td>{item.date}</td>
                                                <td>
                                                    <Button style={{margin: "0px 10px 0px 0px"}} color={"success"} size="md" onClick={() => this.goToTrash(item.trash.identifiant)}><FontAwesomeIcon icon={faSearch} /></Button>
                                                    <Button color={"danger"} size="md" onClick={() => this.removeFav(item.id)}><FontAwesomeIcon icon={faTimes} /></Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Row>
                            <Col sm={12}>
                                <span className={"title_stats"}>Vous n'avez aucune poubelle dans vos favoris...</span>
                            </Col>
                        </Row>
                    </React.Fragment>
                }

            </Container>
        );
    }
}

export default Favoris;
