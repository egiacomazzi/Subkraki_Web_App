import React from 'react';
import '../CSS/SpeechbubbleControlls.css';
import PropTypes from 'prop-types';
import Speechbubble from './Speechbubble.js';
import Arrow from './Arrow.js';

class SpeechbubbleControlls extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

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
              highlighting={this.props.highlighting}
              subpanel_visibility={this.props.subpanel_visibility}
              close_func={this.props.close_func}
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
              highlighting={this.props.highlighting}
              subpanel_visibility={this.props.subpanel_visibility}
              close_func={this.props.close_func}
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
              highlighting={this.props.highlighting}
              subpanel_visibility={this.props.subpanel_visibility}
              close_func={this.props.close_func}
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
  highlighting: PropTypes.array,
  subpanel_visibility: PropTypes.string,
  close_func: PropTypes.func,
};
