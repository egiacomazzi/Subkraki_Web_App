import React from 'react';
import './CSS/Arrow.css';
import PropTypes from 'prop-types';

class Arrow extends React.Component {
  render() {
    var left = false;
    if (this.props.class === 'leftway') {
      left = true;
    }
    const arrowDirection = left ? { transform: 'scaleX(-1)' } : {};
    return (
      <button
        className={this.props.class}
        onClick={this.props.onClick}
      >
        <div className="icon" style={arrowDirection}>
          <div className="arrow"></div>
        </div>
      </button>
    );
  }
}

export default Arrow;
Arrow.propTypes = {
  class: PropTypes.string,
  onClick: PropTypes.func,
};
