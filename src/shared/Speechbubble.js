import React from 'react';
import '../CSS/Speechbubble.css';
import PropTypes from 'prop-types';
import CloseSpeechbubble from './CloseSpeechbubble';

class Speechbubble extends React.Component {
  render() {
    return (
      <div className="Speech">
        <div className="testimonial">
          <div className="bubble">
            <div className="bubbleText">{this.props.text}</div>
          </div>
          <CloseSpeechbubble />
        </div>
      </div>
    );
  }
}

export default Speechbubble;
Speechbubble.propTypes = {
  text: PropTypes.string,
};
