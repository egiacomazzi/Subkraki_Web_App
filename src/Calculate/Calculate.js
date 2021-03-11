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
      display: false,
      correct: null,
    };

    this.subtractionRef = React.createRef();

    this.text = {
      correct: ['Super! Du hast die Aufgabe richtig gelöst!'],
      noCorrection1digit: ['Wir rechnen ', ' und das ergibt '],
      noCorrectionMoredigits: [
        'Wir fangen bei den ',
        'an und rechnen ',
        'Jetzt rechnen wir die ',
        'stelle mit ',
      ],
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
      min: [],
      sub: [],
      res: [],
      cor: [],
    };
    this.diagnosis = {
      column: null,
      correct: null,
      correct_val: [],
      error: [],
      spec_error: [],
    };

    this.minuend = '';
    this.subtrahend = '';
    this.endAnalogy = false;
  }
  lastText() {
    if (this.state.analogyTextIndex == 0) {
      return;
    }
    if (this.endAnalogy) {
      this.endAnalogy = false;
    }
    this.setState({
      analogyTextIndex: this.state.analogyTextIndex - 1,
    });
  }

  nextText() {
    if (this.endAnalogy) {
      return;
    }
    this.setState({
      analogyTextIndex: this.state.analogyTextIndex + 1,
    });
  }

  endWelcome() {
    this.props.history.push('/substactionpanel');
  }
  // Function to return the String of "Jetzt rechnen wir..." with inputs at which column (stelle) the calculation of min-sub=res happens
  returnStringNoCorrection(stelle, min, sub, res) {
    var string =
      this.text.noCorrectionMoredigits[2] +
      stelle +
      this.text.noCorrectionMoredigits[3] +
      min +
      '-' +
      sub +
      '=' +
      res +
      '.';
    return string;
  }

  returnText() {
    if (this.state.correct) {
      return this.text.correct[0];
    } else {
      // first two texts needed for all analogies
      switch (this.state.analogyTextIndex) {
        case 0:
          return this.text.analogy[0];
        case 1:
          return this.text.analogy[1];
      }
      // Analogies with no corrections
      const equals = (a, b) =>
        JSON.stringify(a) === JSON.stringify(b);

      if (equals(this.analogy.min, this.analogy.cor)) {
        // no correction + 1 digit long
        if (this.analogy.min.length == 1) {
          switch (this.state.analogyTextIndex) {
            case 2:
              var stringNoCorr1Digit =
                this.text.noCorrection1digit[0] +
                this.analogy.min[0] +
                '-' +
                this.analogy.sub[0] +
                this.text.noCorrection1digit[1] +
                this.analogy.res[0] +
                '.';
              return stringNoCorr1Digit;
            case 3:
              var finalString = this.text.analogy[17];
              this.endAnalogy = true;
              return finalString;
          }
        } else {
          // no correction + 2-3 digit long
          switch (this.state.analogyTextIndex) {
            case 2:
              var einerIndex = this.analogy.min.length - 1;
              var string2multipleDigits =
                this.text.noCorrectionMoredigits[0] +
                'Einern ' +
                this.text.noCorrectionMoredigits[1] +
                this.analogy.min[einerIndex] +
                '-' +
                this.analogy.sub[einerIndex] +
                '=' +
                String(
                  Number(this.analogy.min[einerIndex]) -
                    Number(this.analogy.sub[einerIndex]),
                ) +
                '.';

              return string2multipleDigits;
            case 3:
              var zehnerIndex = this.analogy.min.length - 2;
              var string3multipleDigits = this.returnStringNoCorrection(
                'Zehner',
                this.analogy.min[zehnerIndex],
                this.analogy.sub[zehnerIndex],
                this.analogy.res[zehnerIndex],
              );

              return string3multipleDigits;
            case 4:
              var hunderterIndex = this.analogy.min.length - 3;
              console.log(hunderterIndex);

              if (hunderterIndex < 0) {
                finalString = this.text.analogy[17];
                this.endAnalogy = true;
                return finalString;
              }

              var string4multipleDigits = this.returnStringNoCorrection(
                'Hunderter',
                this.analogy.min[hunderterIndex],
                this.analogy.sub[hunderterIndex],
                this.analogy.res[hunderterIndex],
              );
              return string4multipleDigits;
            case 5:
              finalString = this.text.analogy[17];
              this.endAnalogy = true;
              return finalString;
          }
        }
      } else {
        //toooDOOOOOOOO
        // corrections need to be done
        switch (this.state.analogyTextIndex) {
          case 2:
            var string2 =
              this.text.analogy[2] +
              ' ' +
              '\r' +
              String(this.analogy.min).replace(/,/g, '') +
              '\r' +
              '- ' +
              String(this.analogy.sub).replace(/,/g, '');
            return string2;
          case 3:
            var string3 =
              this.text.analogy[3] +
              this.analogy.min[2] +
              '-' +
              this.analogy.sub[2] +
              ' ' +
              this.text.analogy[4] +
              ' ' +
              this.analogy.min[2] +
              ' ' +
              this.text.analogy[5] +
              ' ' +
              this.analogy.sub[2] +
              ' ' +
              this.text.analogy[6];
            return string3;
          case 4:
            var string4 =
              this.text.analogy[7] +
              ' ' +
              this.analogy.min[1] +
              this.text.analogy[8] +
              String(Number(this.analogy.min[1]) - 1) +
              this.text.analogy[9] +
              ' ' +
              this.analogy.min[2] +
              this.text.analogy[10] +
              String(Number(this.analogy.min[2]) + 10) +
              '.';
            return string4;
          case 5:
            var string5 =
              this.text.analogy[11] +
              ' ' +
              String(Number(this.analogy.min[2]) + 10) +
              '-' +
              this.analogy.sub[2] +
              ' ' +
              this.text.analogy[12] +
              ' ' +
              String(
                Number(this.analogy.min[2]) +
                  10 -
                  Number(this.analogy.sub[2]),
              ) +
              '.';
            return string5;
          case 6:
            var string6 =
              this.text.analogy[13] +
              ' ' +
              String(Number(this.analogy.min[1]) - 1) +
              '-' +
              this.analogy.sub[1] +
              ' ' +
              this.text.analogy[14] +
              ' ' +
              String(
                Number(this.analogy.min[1]) -
                  1 -
                  Number(this.analogy.sub[1]),
              ) +
              '.';
            return string6;
          case 7:
            var string7 =
              this.text.analogy[15] +
              ' ' +
              this.analogy.min[0] +
              '-' +
              this.analogy.sub[0] +
              '=' +
              String(
                Number(this.analogy.min[0]) -
                  Number(this.analogy.sub[0]),
              ) +
              ' ' +
              this.text.analogy[16];
            return string7;
          case 8:
            var string8 = this.text.analogy[17];
            return string8;
        }
      }
    }
  }

  async submit() {
    let r = await this.subtractionRef.current.getAnalogyAndDiagnosis();
    let analogy = r.analogy;
    let diagnosis = r.diagnosis;
    console.log(analogy);
    console.log(diagnosis);

    // set analogy example:
    if (!diagnosis.correct) {
      this.analogy.min = analogy.minuend.map(String);
      this.analogy.sub = analogy.subtrahend.map(String);
      this.analogy.cor = analogy.correction.map(String);
      this.analogy.res = analogy.result.map(String);
      this.diagnosis.correct = diagnosis.correct;
      this.analogyLength = this.analogy.min.length;
      this.digit = this.analogyLength;
    }
    this.setState({ correct: diagnosis.correct, display: true });
  }

  getRandomExample(min, max) {
    let minuend = Math.floor(min + Math.random() * (max - min));
    let subtrahend = Math.floor(1 + Math.random() * (minuend + 1));
    return { minuend: minuend, subtrahend: subtrahend };
  }

  render() {
    if (this.minuend == '') {
      const ex = this.getRandomExample(100, 999);
      this.minuend = ex.minuend.toString();
      this.subtrahend = ex.subtrahend.toString();
    }

    if (this.state.display) {
      return (
        <div className="calculate">
          <SubtractionPanel
            ref={this.subtractionRef}
            minuend={this.minuend}
            subtrahend={this.subtrahend}
            submit={() => this.submit()}
          />
          <AnalogyPanel
            error={this.props.error}
            text={this.returnText()}
            nextText={() => this.nextText()}
            lastText={() => this.lastText()}
            beginning={
              this.state.analogyTextIndex === 0 ? true : false
            }
            end={this.endAnalogy ? true : false}
            sub={String(this.analogy.sub).replace(/,/g, '')}
            min={String(this.analogy.min).replace(/,/g, '')}
          />
        </div>
      );
    } else {
      return (
        <div className="calculate">
          <SubtractionPanel
            ref={this.subtractionRef}
            minuend={this.minuend}
            subtrahend={this.subtrahend}
            digits="3"
            submit={() => this.submit()}
          />
        </div>
      );
    }
  }
}
export default withRouter(Calculate);
Calculate.propTypes = {
  error: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
