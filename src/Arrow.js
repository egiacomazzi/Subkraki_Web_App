import React from 'react';
import './CSS/Arrow.css';
import PropTypes from 'prop-types';

class Arrow extends React.Component {
  render() {
    var left = false;
    if (this.props.class === 'leftway') {
      left = true;
    }
    const arrowDirection = left
      ? { transform: 'scaleX(-1)', left: '15%' }
      : { left: '75%' };

    return (
      <button
        className={['icon', this.props.class].join(' ')}
        onClick={this.props.onClick}
        style={arrowDirection}
      >
        <div className="arrow"></div>
      </button>
    );
  }
}

export default Arrow;
Arrow.propTypes = {
  class: PropTypes.string,
  onClick: PropTypes.func,
};
