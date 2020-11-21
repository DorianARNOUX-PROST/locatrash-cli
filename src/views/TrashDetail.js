import React from 'react';
import axios from 'axios';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import '../styles/styles.css';
import * as query from "leaflet/src/dom/DomUtil";

class TrashDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            trash: null,
        };
    }

    componentDidMount(){
        let id=new URLSearchParams(window.location.search).get('id');
        let route = "http://localhost:8081/trash/"+id;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        let trash = null;
        try {
            axios.get(route, config)
                .then((response) => {
                    trash = response.data.element;
                    console.log(trash);
                    this.setState(trash);
                });
        }
        catch(error){
            this.setState({error})
        }
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col>

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TrashDetail;
