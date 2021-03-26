import React from 'react';
import '../CSS/Welcome.css';
import Subkraki from '../shared/Subkraki.js';
import SpeechbubbleControlls from '../shared/SpeechbubbleControlls.js';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import welcomeTexts from '../data/welcomeTexts.json';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introTextIndex: 0,
    };
    this.text = {
      intro: welcomeTexts.welcome[0],
    };
  }

  lastText() {
    if (this.state.introTextIndex == 0) {
      return;
    }
    this.setState({
      introTextIndex: this.state.introTextIndex - 1,
    });
  }

  nextText() {
    this.setState({
      introTextIndex: this.state.introTextIndex + 1,
    });
    console.log(this.state.introTextIndex);
  }

  endWelcome() {
    this.props.history.push('/rechnen');
  }

  render() {
    return (
      <div className="welcome">
        <SpeechbubbleControlls
          text={this.text.intro[this.state.introTextIndex]}
          nextText={
            this.state.introTextIndex ===
            Object.keys(this.text.intro).length - 1
              ? () => this.endWelcome()
              : () => this.nextText()
          }
          lastText={() => this.lastText()}
          beginning={this.state.introTextIndex === 0 ? true : false}
          end={false}
          analogy={false}
        />
        <Subkraki />
      </div>
    );
  }
}

export default withRouter(Welcome);
Welcome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
