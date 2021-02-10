import React from 'react';
import './CSS/Number.css';
import PropTypes from 'prop-types';

class Number extends React.Component  {    
    render(){
        const number = parseInt(this.props.number, 10);
        return(
            <button className="roundButton">
                {number}
            </button>
        )
    }
}
Number.propTypes = {
    number: PropTypes.number,
};
export default Number;