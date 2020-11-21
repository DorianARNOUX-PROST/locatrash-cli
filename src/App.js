import React from 'react';
import './App.css';
import Container from "reactstrap/es/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends React.Component{
  render (){
    return (
      <Container>
        <Row>
          <Col>
            Page d'accueil
          </Col>
        </Row>
      </Container>
      )
  }
}

export default App;
