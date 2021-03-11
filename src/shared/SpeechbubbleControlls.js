import React from 'react';
import '../CSS/SpeechbubbleControlls.css';
import PropTypes from 'prop-types';
import Speechbubble from './Speechbubble.js';
import Arrow from './Arrow.js';

class SpeechbubbleControlls extends React.Component {
  render() {
    if (!this.props.analogy) {
      if (this.props.beginning) {
        return (
          <div className="SpeechbubbleControls">
            <Speechbubble text={this.props.text} />
            <Arrow class="right" onClick={this.props.nextText} />
          </div>
        );
      } else if (this.props.end) {
        return (
          <div className="SpeechbubbleControls">
            <Speechbubble text={this.props.text} />
            <Arrow class="left" onClick={this.props.lastText} />
          </div>
        );
      } else {
        return (
          <div className="SpeechbubbleControls">
            <Speechbubble text={this.props.text} />
            <Arrow class="right" onClick={this.props.nextText} />
            <Arrow class="left" onClick={this.props.lastText} />
          </div>
        );
      }
    } else {
      if (this.props.beginning) {
        return (
          <div className="SpeechbubbleControls">
            <Speechbubble
              text={this.props.text}
              sub={this.props.sub}
              min={this.props.min}
              res={this.props.res}
              cor={this.props.cor}
              analogy={this.props.analogy}
              min_cor={this.props.min_cor}
            />
            <Arrow class="right" onClick={this.props.nextText} />
          </div>
        );
      } else if (this.props.end) {
        return (
          <div className="SpeechbubbleControls">
            <Speechbubble
              text={this.props.text}
              sub={this.props.sub}
              min={this.props.min}
              res={this.props.res}
              cor={this.props.cor}
              analogy={this.props.analogy}
              min_cor={this.props.min_cor}
            />
            <Arrow class="left" onClick={this.props.lastText} />
          </div>
        );
      } else {
        return (
          <div className="SpeechbubbleControls">
            <Speechbubble
              text={this.props.text}
              sub={this.props.sub}
              min={this.props.min}
              res={this.props.res}
              cor={this.props.cor}
              analogy={this.props.analogy}
              min_cor={this.props.min_cor}
            />{' '}
            <Arrow class="right" onClick={this.props.nextText} />
            <Arrow class="left" onClick={this.props.lastText} />
          </div>
        );
      }
    }
  }
}

export default SpeechbubbleControlls;
SpeechbubbleControlls.propTypes = {
  text: PropTypes.string,
  nextText: PropTypes.func,
  lastText: PropTypes.func,
  beginning: PropTypes.bool,
  end: PropTypes.bool,
  analogy: PropTypes.bool,
  sub: PropTypes.string,
  min: PropTypes.string,
  res: PropTypes.array,
  cor: PropTypes.array,
  min_cor: PropTypes.array,
};
