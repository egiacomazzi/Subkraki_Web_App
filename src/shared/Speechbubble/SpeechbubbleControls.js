import React from 'react';
import '../../CSS/SpeechbubbleControlls.css';
import PropTypes from 'prop-types';
import Speechbubble from './Speechbubble.js';
import Arrow from './Arrow.js';

class SpeechbubbleControlls extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * @returns the arrows depending on the state of the Speechbubble
   */
  getArrows() {
    let left_arrow, right_arrow = [];

    if (this.props.beginning) {
      if (!this.props.end)
        right_arrow = <Arrow class="right" onClick={this.props.nextText} />;

    } else if (this.props.end) {
      if (!this.props.beginning)
        left_arrow = <Arrow class="left" onClick={this.props.lastText} />;

    } else {
      right_arrow = <Arrow class="right" onClick={this.props.nextText} />;
      left_arrow = <Arrow class="left" onClick={this.props.lastText} />;
    }

    return { left_arrow: left_arrow, right_arrow: right_arrow };
  }

  /**
   * @returns the rendered Speechbubble with arrows
   */
  render() {
    let arrows = this.getArrows();

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
        {arrows.right_arrow}
        {arrows.left_arrow}
      </div>
    );
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
