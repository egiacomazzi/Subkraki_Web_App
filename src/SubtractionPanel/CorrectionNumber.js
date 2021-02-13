import React from 'react';
import '../CSS/Numbers.css'
import '../CSS/ResultNumber.css';
import PropTypes from 'prop-types';


class CorrectionNumber extends React.Component  {    
    
    render(){
        //FIXME: ExceptionHandling if this.props.number is not parseable into a number
        let className = "roundNumber resultNumber " + this.props.className;
        let visibility = {visibility: this.props.visibility}
        return(
            <input type="number" min="0" max="9" className={className} style={visibility}></input>
        )
    }
}
CorrectionNumber.propTypes = {
    visibility: PropTypes.string,
    className: PropTypes.string,
};
export default CorrectionNumber;