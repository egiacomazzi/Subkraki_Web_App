import React from 'react';
import './CSS/Arrow.css';
import PropTypes from 'prop-types';

class Arrow extends React.Component {
  render() {
    return (
      <button className={this.props.class}>
        <div className="icon">
          <div className="arrow"></div>
        </div>
      </button>
    );
  }
}

export default Arrow;
Arrow.propTypes = {
  class: PropTypes.string,
};
