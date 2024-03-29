import React from 'react';
import '../../CSS/Numbers.css';
import '../../CSS/ClickableNumber.css';
import '../../CSS/ColorScheme.css';
import PropTypes from 'prop-types';

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
class ClickableNumber extends React.Component {
  render() {
    const number = parseInt(this.props.number, 10);
    let className = 'clickableNumber roundNumber ';
    if (this.props.highlighted) {
      className = className + 'highlighted';
    }

    let x;
    if (this.props.crossedOut) {
      x = (
        <div onClick={this.props.onClickHandler} className="X">
          X
        </div>
      );
    }
    return (
      <div className={this.props.className}>
        <button
          className={className}
          onClick={this.props.onClickHandler}
        >
          {number}
        </button>
        {x}
      </div>
    );
  }
}
ClickableNumber.propTypes = {
  number: PropTypes.string,
  className: PropTypes.string,
  crossedOut: PropTypes.bool,
  onClickHandler: PropTypes.func,
  highlighted: PropTypes.bool,
};
export default ClickableNumber;
