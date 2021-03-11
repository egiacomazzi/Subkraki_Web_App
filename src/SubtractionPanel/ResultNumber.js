import React from 'react';
import '../CSS/Numbers.css';
import PropTypes from 'prop-types';

class ResultNumber extends React.Component {
  render() {
    //FIXME: ExceptionHandling if this.props.number is not parseable into a number
    let className = 'roundNumber ' + this.props.className;
    let number = this.props.number;
    if (isNaN(number)) {
      number = '';
    }
    let style = { border: 'transparent 0.1vw solid', visibility: this.props.visibility, };
    if (this.props.error) {
      style = { border: 'rgb(255, 0, 111) 0.1vw solid', visibility: this.props.visibility, };
    }
    if (isNaN(this.props.enabled))
      this.props.enabled = true;

    return (
      <input
        type="text"
        maxLength="2"
        defaultValue={number}
        className={className}
        style={style}
        readOnly={!this.props.enabled}
      ></input>
    );
  }
}
ResultNumber.propTypes = {
  number: PropTypes.number,
  className: PropTypes.string,
  error: PropTypes.bool,
  enabled: PropTypes.bool,
  visibility: PropTypes.string,
};
export default ResultNumber;
