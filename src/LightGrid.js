import React from 'react';
import LightCell from './LightCell';
import './LightGrid.css';
import uuid from 'uuid';

export default class LightGrid extends React.Component {
    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLights: 0.25

    }
    constructor(props){
        super(props);
        this.state = {
            hasWon: false,
            board: this.createGrid()
        };
    }
    
    createGrid() {
        const numLights = this.props.nrows * this.props.ncols;
        let arrayRandom = Array.from({length:numLights}).map(() => (Math.random() < this.props.chanceLights));;
        return arrayRandom;
    }
    toggleAdjacentLights(index) {
        let board = this.state.board;
        let hasWon = false;
        let lightOff = false;
        //flip cell
        
        board[index] =  !board[index];
        switch(index) {
            case 0: //Top left corner
                board[index+1] =  !board[index+1];
                board[index+5] =  !board[index+5];
            break;
            case 4:  //Top right corner
                board[index-1] =  !board[index-1];
                board[index+5] =  !board[index+5];
            break;
            case 20: //Bottom left corner
                board[index+1] =  !board[index+1];
                board[index-5] =  !board[index-5];
            break;
            case 24: //Bottom right corner
                board[index-1] =  !board[index-1];
                board[index-5] =  !board[index-5];
            break;
            case 1://first row middle cells
            case 2:
            case 3:
                board[index+1] =  !board[index+1];
                board[index-1] =  !board[index-1];
                board[index+5] =  !board[index+5];
            break;
            case 21://Bottow row middle cells
            case 22:
            case 23:
                board[index+1] =  !board[index+1];
                board[index-1] =  !board[index-1];
                board[index-5] =  !board[index-5];
            break;
            case 6: //Middle cells
            case 7: 
            case 8: 
            case 11: 
            case 12: 
            case 13: 
            case 16: 
            case 17: 
            case 18:
                board[index+1] =  !board[index+1];
                board[index-1] =  !board[index-1];
                board[index+5] =  !board[index+5];
                board[index-5] =  !board[index-5];
            break;
            case 5: //Side left column
            case 10:
            case 15:
                board[index+1] =  !board[index+1];
                board[index+5] =  !board[index+5];
                board[index-5] =  !board[index-5];
            break;
            case 9://Side right column
            case 14:
            case 19:
                board[index-1] =  !board[index-1];
                board[index+5] =  !board[index+5];
                board[index-5] =  !board[index-5];
            break;
            default: 
                board[index] =  !board[index];
        }     
        //Are all lights off? If yes, user won  
        hasWon = board.every(element => element === lightOff);
        
        this.setState({ board: board, hasWon: hasWon });
    }
    renderGrid() {
        let board = this.state.board;
        let arrayLights = Array.from(board).map((element,index) => (
            <LightCell key={uuid()} id ={index} isLit={element} toggleLights={() => this.toggleAdjacentLights(index)}/>
            ));
        return arrayLights;
    }
    render() {
        return (
            <div>
                {
                    this.state.hasWon ? 
                    <div className="winner">
                        <span className="neon-orange">YOU</span> 
                        <span className="neon-blue">WIN!</span>
                    </div> : 
                    <div>
                        <span className="neon-orange">Lights</span> 
                        <span className="neon-blue">Out</span>
                        <div className="LightGrid" >{this.renderGrid()}</div> 
                    </div>
                }
            </div>
        )
    }
}
  
