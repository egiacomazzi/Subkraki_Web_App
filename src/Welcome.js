import React from 'react';
//import './CSS/Welcome.css';
import Subkraki from './Subkraki.js';
import SpeechbubbleControlls from './SpeechbubbleControlls.js';
//import history from './history.js';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introTextIndex: 0,
    };
    this.text = {
      intro: [
        'Hallo! Ich bin Subkraki und möchte mit dir das Subtrahieren üben.',
        'Ich erkläre dir nun, was du alles hier in der Unterwasserwelt machen kannst.',
        'Unten links kannst du den Zahlenraum auswählen, in dem du rechnen möchtest.',
        'Wähle deinen Zahlenraum direkt aus.',
        'Unten in der Mitte kannst du klicken, damit ich dir eine Aufgabe stelle.',
        'Unten rechts kannst du klicken, wenn du selber eine Aufgabe eingeben möchtest.',
        'Falls du Hilfe brauchst, kannst du jeder Zeit oben rechts klicken!',
        'Viel Spaß beim Rechnen!',
      ],
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
  }

  // TODO use this method to close the welcome speechbubble with an x at corner
  endWelcome() {
    this.props.history.push('/substactionpanel');
  }

  render() {
    // Component to render if next state schould be the substration panel
    if (this.state.introTextIndex === 7) {
      return (
        <div className="welcome">
          <SpeechbubbleControlls
            text={this.text.intro[this.state.introTextIndex]}
            nextText={() => this.endWelcome()}
            lastText={() => this.lastText()}
            beginning={this.state.introTextIndex === 0 ? true : false}
          />

          <Subkraki size="big" />
        </div>
      );
    } else {
      return (
        <div className="welcome">
          <SpeechbubbleControlls
            text={this.text.intro[this.state.introTextIndex]}
            nextText={() => this.nextText()}
            lastText={() => this.lastText()}
            beginning={this.state.introTextIndex === 0 ? true : false}
          />

          <Subkraki size="big" />
        </div>
      );
    }
  }
}

export default withRouter(Welcome);
Welcome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
