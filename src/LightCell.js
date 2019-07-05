import React from 'react';
import './LightCell.css';

export default class LightCell extends React.Component {
 
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.toggleLights();
    }
    render(){
        let classes = this.props.isLit ? "LightCell lightOn" : "LightCell"
        return(
            <div 
            className={classes}
            onClick={this.handleClick}
            >
            </div>
        )
    }
    
}