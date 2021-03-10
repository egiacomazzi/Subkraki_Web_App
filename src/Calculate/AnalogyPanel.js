import React from 'react';
//import '../CSS/Welcome.css';
import Subkraki from '../shared/Subkraki.js';
import SpeechbubbleControlls from '../shared/SpeechbubbleControlls.js';
import '../CSS/AnalogyPanel.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class AnalogyPanel extends React.Component {
  render() {
    // Component to render if next state schould be the substration panel
    // if (this.props.introTextIndex === 7) {
    //   return (
    //     <div className="analogy">
    //       <SpeechbubbleControlls
    //         text={this.props.text}
    //         nextText={this.props.nextText}
    //         lastText={this.props.lastText}
    //         beginning={this.state.introTextIndex === 0 ? true : false}
    //       />

    //       <Subkraki size="big" />
    //     </div>
    //   );
    // } else {
    return (
      <div className="analogy">
        <SpeechbubbleControlls
          text={this.props.text}
          nextText={this.props.nextText}
          lastText={this.props.lastText}
          beginning={this.props.beginning}
          end={this.props.end}
          analogy={true}
          sub={this.props.sub}
          min={this.props.min}
          res={this.props.res}
          cor={this.props.cor}
        />

        <Subkraki size="big" />
      </div>
    );
  }
}
// }

export default withRouter(AnalogyPanel);
AnalogyPanel.propTypes = {
  text: PropTypes.string,
  nextText: PropTypes.func,
  lastText: PropTypes.func,
  beginning: PropTypes.bool,
  end: PropTypes.bool,
  sub: PropTypes.string,
  min: PropTypes.string,
  res: PropTypes.string,
  cor: PropTypes.string,
};
