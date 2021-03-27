import React from 'react';
import '../CSS/Numbers.css';
import PropTypes from 'prop-types';

class InputNumber extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let className = 'roundNumber ' + this.props.className;
    className = this.props.highlighted
      ? className + ' highlighted'
      : className;

    if (isNaN(this.props.enabled)) this.props.enabled = true;

    let number = this.props.number;

    if (isNaN(number)) {
      number = "";
    }

    let style = {
      border: 'transparent 0.1vw solid',
      visibility: this.props.visibility,
    };

    // change border on error
    if (this.props.error)
      style = { border: 'rgb(255, 0, 111) 0.1vw solid' };


    return (
      <input
        type="text"
        maxLength="2"
        value={number}
        className={className}
        style={style}
        onChange={this.props.onChangeFunc}
        readOnly={!this.props.enabled}
      ></input>
    );
  }
}

InputNumber.propTypes = {
  number: PropTypes.number,
  className: PropTypes.string,
  error: PropTypes.bool,
  enabled: PropTypes.bool,
  visibility: PropTypes.string,
  highlighted: PropTypes.bool,
  onChangeFunc: PropTypes.func,
};
export default InputNumber;
