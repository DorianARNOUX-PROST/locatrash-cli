import React from "react";
import '../styles/styles.css'

class ViewTitle extends React.Component {
    constructor(props) {
        super(props);
        this.title =this.props.title;
    }

    render() {
        return(
            <div className={"divViewTitle"}>
                {this.title}
            </div>
        );
    }
}
export default ViewTitle;
