import React from 'react';
import './App.css';
import Container from "reactstrap/es/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ViewTitle from "./components/ViewTitle";

class App extends React.Component{
  render (){
    return (
      <Container>
          <ViewTitle title={"Accueil"}/>
        <Row>
          <Col>
            Veuillez créer un compte ou vous connecter afin d'accéder à la carte interactive.
          </Col>
        </Row>
      </Container>
      )
  }
}

export default App;
