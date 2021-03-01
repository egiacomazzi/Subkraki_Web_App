import React from 'react';
import './CSS/Speechbubble.css';
import PropTypes from 'prop-types';

class Speechbubble extends React.Component {
  render() {
    return (
      <div className="Speech">
        <div className="testimonial">
          <div className="bubble">{this.props.text}</div>
        </div>
      </div>
    );
  }
}

export default Speechbubble;
Speechbubble.propTypes = {
  text: PropTypes.string,
};
