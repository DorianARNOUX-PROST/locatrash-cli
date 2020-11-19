import React from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap";
import DoughnutChart from "../components/DoughnutChart";


function loadData() {

    let route = "http://localhost:8081/trashes/countByCommune";
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    let countByCommune = [];
    let totalTrashes = 0;
    try {
        axios.get(route, config)
            .then((response) => {
                response.data.forEach( (element) => {
                    countByCommune.push({"commune":element.commune, "trashes":element.trashes });
                    totalTrashes+=element.trashes;
                });
                //console.log("total = "+totalTrashes);
            });
        let data = [];
        countByCommune.forEach(item => data.push({
            title: item.commune,
            data: [{label: item.commune, value: item.trashes},{label: "Autre", value: totalTrashes-item.trashes}]
        }));
        //console.log(data);
        /*
        return new Promise(function(resolve, reject) {
            let script = document.createElement('script');
            script.src = src;

            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Script load error for ${src}`));

            document.head.append(script);
        });;

         */
    }
    catch(error){
        this.setState({error})
    }
}
    function chargeData(){
        let data = [];
        console.log(loadData())
        loadData().forEach(item => data.push({
            title: item.commune,
            data: [{label: item.commune, value: item.trashes},{label: "Autre", value: 166}]
        }));
        return data;
    }

    /*
    let data =[];
    data.push({
        title: 'Poubelles',
        data: [{label: "Reste", value: 200},{label: "Lyon", value: 100}]
    });
    data.push({
        title: 'Poubelles2',
        data: [{label: "Reste", value: 200},{label: "Lyon", value: 100}]
    });
        return data;

     */


class TrashesRepartition extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: loadData()
        };
    }


    componentDidMount() {
        this.setState({
            //data: loadData()
        });
    }

    render() {
        return (
            <div>

                {this.state.data.map((item, i) => {
                    return (
                        <div className="sub chart-wrapper ">
                            <DoughnutChart
                                data={item.data}
                                title={item.title}
                                colors={['darkgrey', '#28a745']}
                            />
                        </div>
                        )
                })}
            </div>
        );
    }
}

export default TrashesRepartition;
