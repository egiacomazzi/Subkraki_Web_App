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
        'ist.',
        'Wir müssen uns 10 von der Zehnerspalte leihen. Wir ziehen 1 von den Zehnern ab, also',
        '-1 = ',
        ', und erhalten dafür 10 Einer, also ',
        '+10 = ',
        'Nun können wir in der Einerspalte',
        'rechnen und das ergibt',
        'In der Zehnerspalte können wir nun einfach',
        'rechnen. Das ergibt',
        'In der Hunderterspalte können wir einfach',
        'rechnen.',
        'Tadaaa! Wir haben unser Ergebnis. Probiere es gleich nochmal mit deiner Aufgabe.',
      ],
    };
    this.analogy = {
      sub: ['2', '7', '5'],
      min: ['1', '5', '6'],
    };
  }
  lastText() {
    if (this.state.analogyTextIndex == 0) {
      return;
    }
    this.setState({
      analogyTextIndex: this.state.analogyTextIndex - 1,
    });
  }

  nextText() {
    if (this.state.analogyTextIndex == 8) {
      return;
    }
    this.setState({
      analogyTextIndex: this.state.analogyTextIndex + 1,
    });
    console.log(this.state.analogyTextIndex);
  }

  endWelcome() {
    this.props.history.push('/substactionpanel');
  }

  returnText() {
    switch (this.state.analogyTextIndex) {
      case 0:
        return this.text.analogy[0];
      case 1:
        return this.text.analogy[1];
      case 2:
        var string2 =
          this.text.analogy[2] +
          ' ' +
          '\r' +
          String(this.analogy.sub).replace(/,/g, '') +
          '\r' +
          '- ' +
          String(this.analogy.min).replace(/,/g, '');
        return string2;
      case 3:
        var string3 =
          this.text.analogy[3] +
          this.analogy.sub[2] +
          '-' +
          this.analogy.min[2] +
          ' ' +
          this.text.analogy[4] +
          ' ' +
          this.analogy.sub[2] +
          ' ' +
          this.text.analogy[5] +
          ' ' +
          this.analogy.min[2] +
          ' ' +
          this.text.analogy[6];
        return string3;
      case 4:
        var string4 =
          this.text.analogy[7] +
          ' ' +
          this.analogy.sub[1] +
          this.text.analogy[8] +
          String(Number(this.analogy.sub[1]) - 1) +
          this.text.analogy[9] +
          ' ' +
          this.analogy.sub[2] +
          this.text.analogy[10] +
          String(Number(this.analogy.sub[2]) + 10) +
          '.';
        return string4;
      case 5:
        var string5 =
          this.text.analogy[11] +
          ' ' +
          String(Number(this.analogy.sub[2]) + 10) +
          '-' +
          this.analogy.min[2] +
          ' ' +
          this.text.analogy[12] +
          ' ' +
          String(
            Number(this.analogy.sub[2]) +
              10 -
              Number(this.analogy.min[2]),
          ) +
          '.';
        return string5;
      case 6:
        var string6 =
          this.text.analogy[13] +
          ' ' +
          String(Number(this.analogy.sub[1]) - 1) +
          '-' +
          this.analogy.min[1] +
          ' ' +
          this.text.analogy[14] +
          ' ' +
          String(
            Number(this.analogy.sub[1]) -
              1 -
              Number(this.analogy.min[1]),
          ) +
          '.';
        return string6;
      case 7:
        var string7 =
          this.text.analogy[15] +
          ' ' +
          this.analogy.sub[0] +
          '-' +
          this.analogy.min[0] +
          '=' +
          String(
            Number(this.analogy.sub[0]) - Number(this.analogy.min[0]),
          ) +
          ' ' +
          this.text.analogy[16];
        return string7;
      case 8:
        var string8 = this.text.analogy[17];
        return string8;
    }
  }

  render() {
    return (
      <div className="calculate">
        <SubtractionPanel subtrahend="777" minuend="456" digits="3" />
        <AnalogyPanel
          error={this.props.error}
          text={this.returnText()}
          nextText={() => this.nextText()}
          lastText={() => this.lastText()}
          beginning={this.state.analogyTextIndex === 0 ? true : false}
          end={this.state.analogyTextIndex === 8 ? true : false}
          sub={String(this.analogy.sub).replace(/,/g, '')}
          min={String(this.analogy.min).replace(/,/g, '')}
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
