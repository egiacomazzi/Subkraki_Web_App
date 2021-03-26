import React from 'react';
import '../CSS/Welcome.css';
import Subkraki from '../shared/Subkraki.js';
import SpeechbubbleControlls from '../shared/SpeechbubbleControlls.js';
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
        'Herzlichen Willkommen in der Unterwasserwelt!',
        //'Unten links kannst du den Zahlenraum auswählen, in dem du rechnen möchtest.',
        //'Wähle deinen Zahlenraum direkt aus.',
        //'Oben in der Mitte kannst du klicken, damit ich dir eine Aufgabe stelle.',
        //'Unten rechts kannst du klicken, wenn du selber eine Aufgabe eingeben möchtest.',
        //'Falls du Hilfe brauchst, kannst du jeder Zeit oben rechts klicken!',
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
    console.log(this.state.introTextIndex);
  }

  endWelcome() {
    this.props.history.push('/substractionpanel');
  }

  render() {
    return (
      <div className="welcome">
        <SpeechbubbleControlls
          text={this.text.intro[this.state.introTextIndex]}
          nextText={
            this.state.introTextIndex === this.text.intro.length - 1
              ? () => this.endWelcome()
              : () => this.nextText()
          }
          lastText={() => this.lastText()}
          beginning={this.state.introTextIndex === 0 ? true : false}
          end={false}
          analogy={false}
        />

        <Subkraki size="big" />
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
