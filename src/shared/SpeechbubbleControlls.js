import React from 'react';
import '../CSS/SpeechbubbleControlls.css';
import PropTypes from 'prop-types';
import Speechbubble from './Speechbubble.js';
import Arrow from './Arrow.js';
import CloseSpeechbubble from './CloseSpeechbubble.js';

class SpeechbubbleControlls extends React.Component {
  render() {
    if (this.props.beginning) {
      return (
        <div className="SpeechbubbleControls">
          <Speechbubble text={this.props.text} />
          <CloseSpeechbubble />
          <Arrow class="right" onClick={this.props.nextText} />
        </div>
      );
    } else {
      return (
        <div className="SpeechbubbleControls">
          <Speechbubble text={this.props.text} />
          <CloseSpeechbubble />
          <Arrow class="right" onClick={this.props.nextText} />
          <Arrow class="left" onClick={this.props.lastText} />
        </div>
      );
    }
  }
}

export default SpeechbubbleControlls;
SpeechbubbleControlls.propTypes = {
  text: PropTypes.string,
  nextText: PropTypes.func,
  lastText: PropTypes.func,
  beginning: PropTypes.bool,
};
