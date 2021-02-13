import React from 'react';
import '../CSS/SubtractionPanel.css'
import ClickableNumber from './ClickableNumber.js'
import Number from './Number'
import ResultNumber from './ResultNumber'
import CorrectButton from './CorrectButton.js'
import RefreshButton from './RefreshButton.js'
import CorrectionNumber from './CorrectionNumber.js'
import PropTypes from 'prop-types';



class SubtractionPanel extends React.Component  {
    constructor(props){
        super(props);
        /* Stupidest ever way to initialise empyt array, but somehow new Array(digits)
            always gives an array of length 1.*/
        let emptyArray = [];
        for (let i = 0; i < this.props.digits; i++) {
            emptyArray.push(null);
        }
        this.state = {
            corrections_crossedOut: emptyArray.slice().fill(false),
            corrections_row : emptyArray.slice().fill(null),
            result_row: emptyArray.slice().fill(0),
        }
    }

    submitCalculation(event){
        //FIXME: Should this function stop from refreshing page??? -> Event.preventDefault
        event.preventDefault();
        const result = this.getResult();
        const corrections = this.getCorrections();
        console.log({result: result, corrections: corrections});
        return {result: result, corrections: corrections};        
    }

    getResult(){
        let result = this.state.result_row.slice();
        for(let i = 0; i < this.props.digits; i++){
            result[i] = parseInt(document.getElementsByClassName("result"+i)[0].value);
        }
        this.setState({
            result_row: result,
        })
        return result;
    }

    getCorrections(){
        let corrections = [];
        for (let i = 0; i < this.props.digits; i++) {
            if(this.state.corrections_crossedOut[i]){
                corrections.push(parseInt(document.getElementsByClassName("correction"+i)[0].value));
            } else{
                corrections.push(this.props.subtrahend[i]);
            }
        }
        return corrections;
    }

    renderCorrections(){
        const corrections_display = [];
        for(let j = 0; j < this.props.digits; j++){
            const corr_className = "correction" + j;
            let display = "hidden";
            if(this.state.corrections_crossedOut[j]){
                display = "visible";
            }
            corrections_display.push(
                <CorrectionNumber 
                    key={corr_className} 
                    className={corr_className} 
                    visibility={display}/>
            )
        }
        return corrections_display;
    }

    renderSubtrahend(){
        var subtrahend_digits = [];
        const subtrahend_display = [];
        for(let i = 0; i < this.props.digits; i++){
            const sub_className = "subtrahend" + i;
            subtrahend_digits.push(this.props.subtrahend.slice(i, i+1));
            subtrahend_display.push(
                <ClickableNumber 
                    key={sub_className} 
                    className={sub_className} 
                    number={subtrahend_digits[i]} 
                    crossedOut={this.state.corrections_crossedOut[i]}
                    onClickHandler={(event) => this.subtrahend_onClick(event,i)}/>
            )
        }
        return subtrahend_display;
    }

    subtrahend_onClick(event, i){
        event.preventDefault();
        let new_corrections_crossedOut = this.state.corrections_crossedOut.slice();
        new_corrections_crossedOut[i] = !new_corrections_crossedOut[i];
        this.setState({
            corrections_crossedOut: new_corrections_crossedOut,
        });
    }

    renderMinuend(){
        var minuend_digits = [];
        const minuend_display = [];
        for(var i = 0; i < this.props.digits; i++){
            const min_className = "minuend" + i;
            minuend_digits.push(this.props.minuend.slice(i, i+1));
            minuend_display.push(
                <Number 
                    key={min_className}
                    className={min_className}
                    number={minuend_digits[i]}/>
            )
        }
        return minuend_display;
    }

    renderResult(){
        const result_display = [];
        for(var j = 0; j < this.props.digits; j++){
            const res_className = "result" + j;
            result_display.push(
                <ResultNumber 
                    key={res_className}
                    className={res_className} 
                    number={this.state.result_row[j]}/>
            )
        }
        return result_display;
    }

    /*Does not work yet properly -> result does not update. Maybe becasue only
    defaultValue in ResultNumber???*/
    refresh(event){
        event.preventDefault();
        let emptyArray = [];
        for (let i = 0; i < this.props.digits; i++) {
            emptyArray.push(null);
        }
        const new_result_row = this.state.result_row.slice().fill(0);
        this.setState({
            corrections_crossedOut: emptyArray.slice().fill(false),
            corrections_row : emptyArray.slice().fill(null),
            result_row: new_result_row,
        })
    }

    render(){    
        const corrections_display = this.renderCorrections();
        const subtrahend_display = this.renderSubtrahend();
        const minuend_display = this.renderMinuend();
        const result_display = this.renderResult();

        return(
            <div className="panel">
                <form>
                    <div className="grid-container">
                        {corrections_display}
                        {subtrahend_display}
                        
                        <div className="minus"> - </div>
                        {minuend_display}
                        <div className="line"></div>
                        
                        {result_display}
                        <CorrectButton className="check" onClick={(event) => this.submitCalculation(event)}/>
                        <RefreshButton className="refresh" onClick={(event) => this.refresh(event)}/>
                    </div>
                </form>
            </div>
        )
    }
}

SubtractionPanel.propTypes = {
    subtrahend: PropTypes.string,
    minuend: PropTypes.string,
    digits: PropTypes.string,
};
export default SubtractionPanel;