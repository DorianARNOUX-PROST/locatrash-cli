import React from "react";
import Chart from "chart.js"

class CustomChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.height = this.props.height
        this.type = this.props.type
    }

    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map(d => d.label);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
        this.myChart.update();
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: this.props.type,
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: this.props.title
                },
                legend: {
                    display: false
                }
            },
            data: {
                labels: this.props.data.map(d => d.label),
                datasets: [{
                    data: this.props.data.map(d => d.value),
                    backgroundColor: this.props.colors
                }]
            }
        });

    }


    render() {
        return <canvas height={this.height} ref={this.canvasRef} />;
    }
}
export default CustomChart;
