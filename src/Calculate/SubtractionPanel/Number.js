import React from 'react';
import '../../CSS/Numbers.css';
import PropTypes from 'prop-types';

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
class Number extends React.Component {
  ignore(event) {
    event.preventDefault();
  }

  render() {
    const number = parseInt(this.props.number, 10);
    let className = 'roundNumber ' + this.props.className;
    className = this.props.highlighted
      ? className + ' highlighted'
      : className;

    return (
      <button className={className} onClick={(e) => this.ignore(e)}>
        {number}
      </button>
    );
  }
}
Number.propTypes = {
  number: PropTypes.string,
  className: PropTypes.string,
  highlighted: PropTypes.bool,
};
export default Number;
