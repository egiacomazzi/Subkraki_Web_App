import React from 'react';
import '../CSS/Numbers.css'
import PropTypes from 'prop-types';


class CorrectionNumber extends React.Component  {    
    
    render(){
        let className = "roundNumber " + this.props.className;
        let border = 'transparent 0.1vw solid';
        if(this.props.error){
            border = 'rgb(255, 0, 111) 0.1vw solid';
        }
        let style = {visibility: this.props.visibility, border: border};
        return(
            <input type="text" maxLength="2" className={className} style={style}></input>
        )
    }
}
CorrectionNumber.propTypes = {
    visibility: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.bool,
};
export default CorrectionNumber;