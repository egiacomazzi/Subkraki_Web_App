import React from 'react';
import '../CSS/Speechbubble.css';
import PropTypes from 'prop-types';
import CloseSpeechbubble from './CloseSpeechbubble';
import SubtractionPanel from '../SubtractionPanel/SubtractionPanel';

class Speechbubble extends React.Component {
  render() {
    if (!this.props.analogy) {
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
    } else {
      return (
        <div className="Speech">
          <div className="testimonial">
            <div className="bubble">
              <div className="bubbleText">
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
                    subpanel_visibility={this.props.subpanel_visibility}
                  />
                }
              </div>
            </div>
            <CloseSpeechbubble />
          </div>
        </div>
      );
    }
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
};
