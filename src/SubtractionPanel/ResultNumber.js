import React from 'react';
import '../CSS/Numbers.css'
import '../CSS/ResultNumber.css';
import PropTypes from 'prop-types';


class ResultNumber extends React.Component  {    
    
    render(){
        //FIXME: ExceptionHandling if this.props.number is not parseable into a number
        const number = parseInt(this.props.number, 10);
        let className = "roundNumber resultNumber " + this.props.className;
        return(
            <input type="number" min="0" max="9" defaultValue={number} className={className}></input>
        )
    }
}
ResultNumber.propTypes = {
    number: PropTypes.string,
    className: PropTypes.string,
};
export default ResultNumber;