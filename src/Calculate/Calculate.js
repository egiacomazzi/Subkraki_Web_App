import React from 'react';
import PropTypes from 'prop-types';
import SubtractionPanel from '../SubtractionPanel/SubtractionPanel.js';
import AnalogyPanel from './AnalogyPanel.js';
import { withRouter } from 'react-router-dom';
import '../CSS/Calculate.css';

class Calculate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: 'error1',
      analogyTextIndex: 0,
    };
    this.text = {
      analogy: [
        'Oh nein, es sieht so aus als sei dir ein Fehler passiert. Wenn du ihn selbst gefunden hast, korrigiere deine Eingabe.',
        'Ich zeige dir, wie ich eine ähnliche Aufgabe löse.',
        'Eine vergleichbare Aufgabe ist das hier:',
        'Wir fangen bei der Einerspalte ganz rechts an. Wir können nicht einfach ',
        'rechnen, da',
        'kleiner als',
        'ist',
        '- 1 = ',
        ', und erhalten dafür 10 Einer, also ',
        '+ 10 = ',
        'Nun können wir in der Einerspalte',
        'rechnen und das ergibt',
        'In der Zehnerspalte können wir nun einfach',
        'rechnen. Das ergibt',
        'In der Hunderterspalte können wir einfach',
        'rechnen.',
        'Tadaaa! Wir haben unser Ergebnis. Probiere es gleich nochmal mit deiner Aufgabe.',
      ],
    };
  }
  lastText() {
    if (this.state.analogyTextIndex == 0) {
      return;
    }
    this.setState({
      introTextIndex: this.state.analogyTextIndex - 1,
    });
  }

  nextText() {
    this.setState({
      introTextIndex: this.state.analogyTextIndex + 1,
    });
    console.log(this.state.analogyTextIndex);
  }

  endWelcome() {
    this.props.history.push('/substactionpanel');
  }

  render() {
    return (
      <div className="calculate">
        <SubtractionPanel subtrahend="777" minuend="456" digits="3" />
        <AnalogyPanel
          error={this.props.error}
          text={this.text.analogy[this.state.analogyTextIndex]}
          nextText={() => this.nextText()}
          lastText={() => this.lastText()}
          beginning={this.state.introTextIndex === 0 ? true : false}
        />
      </div>
    );
  }
}
export default withRouter(Calculate);
Calculate.propTypes = {
  error: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
