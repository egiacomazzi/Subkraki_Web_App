import React from 'react';
import '../CSS/Numbers.css'
import PropTypes from 'prop-types';


class ResultNumber extends React.Component  {    
    
    render(){
        //FIXME: ExceptionHandling if this.props.number is not parseable into a number
        let className = "roundNumber " + this.props.className;
        let number = this.props.number;
        if(isNaN(number)){
            number="";
        }
        let border = {border: 'transparent 0.1vw solid'};
        if(this.props.error){
            border = {border: 'rgb(255, 0, 111) 0.1vw solid'};
        }
        return(
            <input type="text" maxLength="2" defaultValue={number} className={className} style={border}></input>
        )
    }
}
ResultNumber.propTypes = {
    number: PropTypes.number,
    className: PropTypes.string,
    error: PropTypes.bool,
};
export default ResultNumber;