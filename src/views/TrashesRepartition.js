import React from 'react';
import axios from 'axios';
import CustomChart from "../components/CustomChart";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import '../styles/styles.css';
import ViewTitle from "../components/ViewTitle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";

class TrashesRepartition extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalT: 0,
            averageT: 0,
            minT: 0,
            maxT: 0,
            generalTitle: "",
            generalData: []
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
                    let generalTitle = "Répartition des poubelles dans les communes du Grand Lyon"
                    let generalData = []
                    countByCommune.forEach(item => generalData.push({
                        label: item.commune,
                        value: item.trashes}
                    ));
                    let averageT = (totalT/countByCommune.length).toFixed(2);
                    this.setState({data,averageT,totalT,minT,maxT, generalTitle, generalData});
                });

        }
        catch(error){
            this.setState({error})
        }
    }

    moreDetails(){
        let bool=document.getElementById("moreDetails").classList.contains('hidden')
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
        return (
         <Container>
             <ViewTitle title={"Statistiques"}/>
             <Row>
                 <Col sm={12} md={6}>
                     <span className={"title_stats"}>Nombre total de poubelles</span>
                     <span className={"subtitle_stats"}>{this.state.totalT}</span>
                     <span className={"title_stats"}>Nombre moyen de poubelles par ville</span>
                     <span className={"subtitle_stats"}>{this.state.averageT}</span>
                 </Col>
                 <Col sm={12} md={6}>
                     <span className={"title_stats"}>Nombre min de poubelles dans une ville</span>
                     <span className={"subtitle_stats"}>{this.state.minT}</span>
                     <span className={"title_stats"}>Nombre max de poubelles dans une ville</span>
                     <span className={"subtitle_stats"}>{this.state.maxT}</span>
                 </Col>
             </Row>
             <Row>
                 <Col>
                     <span className={"title_stats"}>Détails nombre de poubelles par ville</span>
                 </Col>
             </Row>
             <Row>
                 <Col sm="12" className="sub chart-wrapper " style={{marginBottom: "50px"}}>
                     <CustomChart
                         data={this.state.generalData}
                         title={this.state.generalTitle}
                         colors={['#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745','#343a40', '#28a745']}
                         height={800}
                         type={"bar"}
                     />
                 </Col>
             </Row>
             <Row>
                 <Col>
                     <div id={"moreDetailsDown"} className={"moreDetails hidden"} onClick={() => this.moreDetails()}>
                         <FontAwesomeIcon icon={faAngleDown} className={"angleIcon"}/>
                         Voir plus de détails
                     </div>
                     <div id={"moreDetailsUp"} className={"moreDetails"} onClick={() => this.moreDetails()}>
                         <FontAwesomeIcon icon={faAngleUp} className={"angleIcon"}/>
                         Voir moins de détails
                     </div>
                 </Col>
             </Row>
             <div id={"moreDetails"} className={""}>
                 <Row>
                     {this.state.data.map((item, i) => {
                         return (
                             <Col sm="6  " md="3" className="sub chart-wrapper ">
                                 <CustomChart
                                     data={item.data}
                                     title={item.title}
                                     colors={['#343a40', '#28a745']}
                                     height={150}
                                     type={"doughnut"}
                                 />
                             </Col>
                         )
                     })}
                 </Row>
             </div>

         </Container>
        );
    }
}

export default TrashesRepartition;
