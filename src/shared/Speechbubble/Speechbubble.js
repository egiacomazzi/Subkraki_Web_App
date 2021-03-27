import React from 'react';
import '../../CSS/Speechbubble.css';
import PropTypes from 'prop-types';
import CloseSpeechbubble from './CloseSpeechbubble.js';
import SubtractionPanel from '../../Calculate/SubtractionPanel/SubtractionPanel.js';

class Speechbubble extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * Checks if Speechbubble contains an analogy and returns the right content
   * @returns the content for the speechbubble
   */
  getBubbleContent() {
    if (!this.props.analogy)
      return <div className="bubbleText">{this.props.text}</div>;
    else
      return <div className="bubbleText">
        {this.props.text}
        {
          <SubtractionPanel
            subtrahend={this.props.sub}
            minuend={this.props.min}
            result={this.props.res}
            correction={this.props.cor}
            analogy={true}
            minuend_correction={this.props.min_cor}
            highlighting={this.props.highlighting}
            subpanel_visibility={
              this.props.subpanel_visibility
            }
          />
        }
      </div>;
  }

  /**
   * @returns the rendered Speechbubble
   */
  render() {
    let content = this.getBubbleContent();

    return (
      <div className="Speech">
        <div className="testimonial">
          <div className="bubble">
            {content}
          </div>
          <CloseSpeechbubble
            close_func={this.props.close_func} />
        </div>
      </div>
    );
  }
}

export default Speechbubble;
Speechbubble.propTypes = {
  text: PropTypes.string,
  analogy: PropTypes.bool,
  min: PropTypes.string,
  sub: PropTypes.string,
  res: PropTypes.array,
  cor: PropTypes.array,
  min_cor: PropTypes.array,
  highlighting: PropTypes.array,
  subpanel_visibility: PropTypes.string,
  close_func: PropTypes.func,
};
