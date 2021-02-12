import React from 'react';
import './CSS/SpeechbubbleControlls.css';
import PropTypes from 'prop-types';
import Speechbubble from './Speechbubble.js';

class SpeechbubbleControlls extends React.Component {
  render() {
    return (
      <div>
        <Speechbubble text={this.props.text} />
      </div>
    );
  }
}

export default SpeechbubbleControlls;
SpeechbubbleControlls.propTypes = {
  text: PropTypes.string,
};
