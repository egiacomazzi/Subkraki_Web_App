import React from 'react';
import '../CSS/Numbers.css';
import PropTypes from 'prop-types';

class Number extends React.Component  {    
    ignore(event){
        event.preventDefault();
    }
    
    render(){
        const number = parseInt(this.props.number, 10);
        let className = "roundNumber " + this.props.className;

        return(
            <button className={className} onClick={(e) => this.ignore(e)}>
                {number}
            </button>
        )
    }
}
Number.propTypes = {
    number: PropTypes.string,
    className: PropTypes.string,
};
export default Number;