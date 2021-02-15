import React from 'react';
//import './CSS/Welcome.css';
import Subkraki from './Subkraki.js';
import SpeechbubbleControlls from './SpeechbubbleControlls.js';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introTextIndex: 0,
    };
  }
  nextText() {
    if (this.state.introTextIndex == 7) {
      return;
    }
    this.setState({
      introTextIndex: this.state.introTextIndex + 1,
    });
  }

  lastText() {
    if (this.state.introTextIndex == 0) {
      return;
    }
    this.setState({
      introTextIndex: this.state.introTextIndex - 1,
    });
  }

  render() {
    const text = {
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
    return (
      <div className="welcome">
        <SpeechbubbleControlls
          text={text.intro[this.state.introTextIndex]}
          nextText={() => this.nextText()}
          lastText={() => this.lastText()}
          beginning={this.state.introTextIndex === 0 ? true : false}
        />

        <Subkraki size="big" />
      </div>
    );
  }
}

export default Welcome;
