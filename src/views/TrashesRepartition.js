import React from 'react';
import axios from 'axios';
import DoughnutChart from "../components/DoughnutChart";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import '../styles/styles.css';

class TrashesRepartition extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalT: 0,
            averageT: 0,
            minT: 0,
            maxT: 0
        };
    }

    componentDidMount() {
        let route = "http://localhost:8081/trashes/countByCommune";
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        let countByCommune = [];
        let totalT = 0;
        let minT=Number.MAX_SAFE_INTEGER;
        let maxT =Number.MIN_SAFE_INTEGER;
        try {
            axios.get(route, config)
                .then((response) => {
                    response.data.forEach( (element) => {
                        countByCommune.push({"commune":element.commune, "trashes":element.trashes });
                        totalT+=element.trashes;
                        if(element.trashes>maxT)maxT=element.trashes;
                        if(element.trashes<minT)minT=element.trashes;
                    });
                    let data = [];
                    countByCommune.forEach(item => data.push({
                        title: item.commune,
                        data: [{label: "Autre", value: totalT-item.trashes},{label: item.commune, value: item.trashes}]
                    }));
                    this.setState({ data });
                    let averageT = (totalT/countByCommune.length).toFixed(2);
                    this.setState({averageT});
                    this.setState({totalT});
                    this.setState({minT});
                    this.setState({maxT});
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
                 <Col sm={12} md={6}>
                     <span className={"title_stats"}>Nombre total de poubelles</span>
                     <span className={"subtitle_stats"}>{this.state.totalT}</span>
                     <span className={"title_stats"}>Nombre moyen de poubelles par ville</span>
                     <span className={"subtitle_stats"}>{this.state.averageT}</span>
                 </Col>
                 <Col sm={12} md={6}>
                     <span className={"title_stats"}>Nombre minimum de poubelles dans une ville</span>
                     <span className={"subtitle_stats"}>{this.state.minT}</span>
                     <span className={"title_stats"}>Nombre maximum de poubelles dans une ville</span>
                     <span className={"subtitle_stats"}>{this.state.maxT}</span>
                 </Col>
             </Row>
            <Row>
                {this.state.data.map((item, i) => {
                    return (
                        <Col sm="6  " md="3" className="sub chart-wrapper ">
                            <DoughnutChart
                                data={item.data}
                                title={item.title}
                                colors={['darkgrey', '#28a745']}
                            />
                        </Col>
                        )
                })}
            </Row>
         </Container>
        );
    }
}

export default TrashesRepartition;
