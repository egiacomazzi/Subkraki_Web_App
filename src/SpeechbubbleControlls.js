import React from 'react';
import './CSS/SpeechbubbleControlls.css';
import PropTypes from 'prop-types';
import Speechbubble from './Speechbubble.js';
import Arrow from './Arrow.js';

class SpeechbubbleControlls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepNumber: 0,
    };
  }
  render() {
    return (
      <div className="SpeechbubbleControls">
        <Speechbubble text={this.props.text} />
        <Arrow class="rightway" />
      </div>
    );
  }
}

export default SpeechbubbleControlls;
SpeechbubbleControlls.propTypes = {
  text: PropTypes.string,
};
