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

    // Diese Arrays anpassen um Schritt für Schritt die Analogie durchzurechnen
    // Bei 3 Stellen: 0: hunderter, 1: zehner 2: einer
    this.curAnalogyResult = [];     // String array | NaN = leeres Feld
    this.curAnalogyCorrection = []; // String array | NaN = leeres Feld
    this.curAnalogyMinuendCor = []; // Bool array | false = nicht durchgestrichen

    this.text = {
      correct: ['Super! Du hast die Aufgabe richtig gelöst!'],
      noCorrection1digit: ['Wir rechnen ', ' und das ergibt '],
      noCorrectionMoredigits: [
        'Wir fangen bei den ',
        'an und rechnen ',
        'Jetzt rechnen wir die ',
        'stelle mit ',
      ],
      withCorrectionEinerstelleFalse: [
        'Wir fangen bei der Einerspalte ganz rechts an. Wir können nicht einfach ',
        ' rechnen, da ',
        ' kleiner als ',
        ' ist.',
        'Wir müssen uns 10 von der ',
        'spalte leihen. Wir ziehen 1 von den ',
        ' ab, also ',
        '-1 = ',
        ', und erhalten dafür 10 ',
        ', also ',
        '+10 = ',
      ],
      withCorrectionAbZehnerFalse: [
        'Wir fangen bei den ',
        ' an und rechnen ',
        'Weiter geht es in der ',
        'zeile. Wir können nicht einfach ',
        ' rechnen, da ',
        ' kleiner als ',
        ' ist.',
        'Wir müssen uns 10 von der ',
        'spalte leihen. Wir ziehen 1 von den ',
        ' ab, also ',
        '-1 = ',
        ', und erhalten dafür 10',
        ' also ',
        '+10 = ',
      ],
      analogy: [
        'Oh nein, es sieht so aus als sei dir ein Fehler passiert. Wenn du ihn selbst gefunden hast, korrigiere deine Eingabe.',
        'Ich zeige dir, wie ich eine ähnliche Aufgabe löse.',
        'Eine vergleichbare Aufgabe ist das hier:',
        'Wir fangen bei der Einerspalte ganz rechts an. Wir können nicht einfach ',
        'rechnen, da ',
        'kleiner als ',
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
    this.einerIndex = null;
    this.zehnerIndex = null;
    this.hunderterIndex = null;
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
  // "Jetzt rechnen wir die stellestelle mit min-sub=res.""
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
  // Produces followin Text
  // "Wir fangen bei der Einerspalte ganz rechts an.
  // Wir könne nicht einfach min[einerIndex]-sub[einerIndex] rechnen, da min[einerIndex] kleiner als sub[einerIndex] ist."
  returnStringStartEinerstelle() {
    var string1WithCorrection2Digits =
      this.text.withCorrectionEinerstelleFalse[0] +
      this.analogy.min[this.einerIndex] +
      '-' +
      this.analogy.sub[this.einerIndex] +
      this.text.withCorrectionEinerstelleFalse[1] +
      this.analogy.min[this.einerIndex] +
      this.text.withCorrectionEinerstelleFalse[2] +
      this.analogy.sub[this.einerIndex] +
      this.text.withCorrectionEinerstelleFalse[3];
    return string1WithCorrection2Digits;
  }
  // Produces following text
  // "Weiter geht es in der Zehnerzeile. Wir können nicht einfach min[zehnerIndex]-sub[zehnerIndex] rechnen,
  // da min[zehnerIndex] kleiner als sub[zehnerIndex] ist."
  returnStringZehnerstelle() {
    var string =
      this.text.withCorrectionAbZehnerFalse[2] +
      'Zehner' +
      this.text.withCorrectionAbZehnerFalse[3] +
      this.analogy.min[this.zehnerIndex] +
      '-' +
      this.analogy.sub[this.zehnerIndex] +
      this.text.withCorrectionAbZehnerFalse[4] +
      this.analogy.min[this.zehnerIndex] +
      this.text.withCorrectionAbZehnerFalse[5] +
      this.analogy.sub[this.zehnerIndex] +
      this.text.withCorrectionAbZehnerFalse[6];
    return string;
  }
  // Produces the following lines of text:
  // "Wir müssen uns 10 von der stelle2stelle leihen. Wir ziehen 1 von den stelle2n ab,
  // also min[index2]-1=cor[index2], und erhalten dafür 10 stelle1, also min[index1]+10=cor[index1]."
  returnStringCorrectionStep(
    stelle1,
    stelle2,
    index1,
    index2,
    min,
    sub,
    cor,
  ) {
    var string2WithCorrection2Digits =
      this.text.withCorrectionEinerstelleFalse[4] +
      stelle2 +
      this.text.withCorrectionEinerstelleFalse[5] +
      stelle2 +
      'n ' +
      this.text.withCorrectionEinerstelleFalse[6] +
      min[index2] +
      this.text.withCorrectionEinerstelleFalse[7] +
      cor[index2] +
      this.text.withCorrectionEinerstelleFalse[8] +
      stelle1 +
      this.text.withCorrectionEinerstelleFalse[9] +
      min[index1] +
      this.text.withCorrectionEinerstelleFalse[10] +
      cor[index1] +
      '.';
    return string2WithCorrection2Digits;
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
              // update analogy
              this.curAnalogyResult[0] = this.analogy.res[0];

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
              var string2multipleDigits =
                this.text.noCorrectionMoredigits[0] +
                'Einern ' +
                this.text.noCorrectionMoredigits[1] +
                this.analogy.min[this.einerIndex] +
                '-' +
                this.analogy.sub[this.einerIndex] +
                '=' +
                String(
                  Number(this.analogy.min[this.einerIndex]) -
                  Number(this.analogy.sub[this.einerIndex]),
                ) +
                '.';
              // update analogy
              this.curAnalogyResult[this.einerIndex] = this.analogy.res[this.einerIndex];

              return string2multipleDigits;
            case 3:
              var string3multipleDigits = this.returnStringNoCorrection(
                'Zehner',
                this.analogy.min[this.zehnerIndex],
                this.analogy.sub[this.zehnerIndex],
                this.analogy.res[this.zehnerIndex],
              );
              // update analogy
              this.curAnalogyResult[this.zehnerIndex] = this.analogy.res[this.zehnerIndex];

              return string3multipleDigits;
            case 4:
              if (this.hunderterIndex < 0) {
                finalString = this.text.analogy[17];
                this.endAnalogy = true;
                return finalString;
              }

              var string4multipleDigits = this.returnStringNoCorrection(
                'Hunderter',
                this.analogy.min[this.hunderterIndex],
                this.analogy.sub[this.hunderterIndex],
                this.analogy.res[this.hunderterIndex],
              );
              // update analogy
              this.curAnalogyResult[this.hunderterIndex] = this.analogy.res[this.hunderterIndex];

              return string4multipleDigits;
            case 5:
              finalString = this.text.analogy[17];
              this.endAnalogy = true;
              return finalString;
          }
        }
      } else {
        // corrections need to be done
        if (this.analogy.min.length === 2) {
          // corrections with 2 digit analogy
          switch (this.state.analogyTextIndex) {
            case 2:
              var string1WithCorrection2Digits = this.returnStringStartEinerstelle();
              return string1WithCorrection2Digits;
            case 3:
              var string2WithCorrection2Digits = this.returnStringCorrectionStep(
                'Einer',
                'Zehner',
                this.einerIndex,
                this.zehnerIndex,
                this.analogy.min,
                this.analogy.sub,
                this.analogy.cor,
              );

              // update analogy
              this.curAnalogyMinuendCor[this.einerIndex] = true;
              this.curAnalogyMinuendCor[this.zehnerIndex] = true;
              this.curAnalogyCorrection[this.einerIndex] = this.analogy.cor[this.einerIndex];
              this.curAnalogyCorrection[this.zehnerIndex] = this.analogy.cor[this.zehnerIndex];

              return string2WithCorrection2Digits;
            case 4:
              var string4withCorrection = this.returnStringNoCorrection(
                'Einer',
                this.analogy.cor[this.einerIndex],
                this.analogy.sub[this.einerIndex],
                this.analogy.res[this.einerIndex],
              );

              // update analogy
              this.curAnalogyResult[this.einerIndex] = this.analogy.res[this.einerIndex];

              return string4withCorrection;
            case 5:
              var string5withCorrection = this.returnStringNoCorrection(
                'Zehner',
                this.analogy.cor[this.zehnerIndex],
                this.analogy.sub[this.zehnerIndex],
                this.analogy.res[this.zehnerIndex],
              );

              // update analogy
              this.curAnalogyResult[this.zehnerIndex] = this.analogy.res[this.zehnerIndex];

              return string5withCorrection;
            case 6:
              finalString = this.text.analogy[17];
              this.endAnalogy = true;
              return finalString;
          }
        } else {
          //analogy with correction and more than 2 digits
          if (
            this.analogy.min[this.einerIndex] ===
            this.analogy.cor[this.einerIndex]
          ) {
            // Einerstelle does not need any correction but Zehner and Hunderter
            switch (this.state.analogyTextIndex) {
              case 2:
                var string2withCorrectioninBack =
                  this.text.withCorrectionAbZehnerFalse[0] +
                  'Einern ' +
                  this.text.withCorrectionAbZehnerFalse[1] +
                  this.analogy.min[this.einerIndex] +
                  '-' +
                  this.analogy.sub[this.einerIndex] +
                  '=' +
                  this.analogy.res[this.einerIndex] +
                  '.';

                // update analogy
                this.curAnalogyResult[this.einerIndex] = this.analogy.res[this.einerIndex];

                return string2withCorrectioninBack;
              case 3:
                var string3withCorrectioninBack = this.returnStringZehnerstelle();
                return string3withCorrectioninBack;
              case 4:
                var string4withCorrectioninBack = this.returnStringCorrectionStep(
                  'Zehner',
                  'Hunderter',
                  this.zehnerIndex,
                  this.hunderterIndex,
                  this.analogy.min,
                  this.analogy.sub,
                  this.analogy.cor,
                );

                // update analogy
                this.curAnalogyMinuendCor[this.zehnerIndex] = true;
                this.curAnalogyMinuendCor[this.hunderterIndex] = true;
                this.curAnalogyCorrection[this.zehnerIndex] = this.analogy.cor[this.zehnerIndex];
                this.curAnalogyCorrection[this.hunderterIndex] = this.analogy.cor[this.hunderterIndex];

                return string4withCorrectioninBack;
              case 5:
                var string5withCorrectioninBack = this.returnStringNoCorrection(
                  'Zehner',
                  this.analogy.cor[this.zehnerIndex],
                  this.analogy.sub[this.zehnerIndex],
                  this.analogy.res[this.zehnerIndex],
                );

                // update analogy
                this.curAnalogyResult[this.zehnerIndex] = this.analogy.res[this.zehnerIndex];

                return string5withCorrectioninBack;
              case 6:
                var string6withCorrectioninBack = this.returnStringNoCorrection(
                  'Hunderter',
                  this.analogy.cor[this.hunderterIndex],
                  this.analogy.sub[this.hunderterIndex],
                  this.analogy.res[this.hunderterIndex],
                );

                // update analogy
                this.curAnalogyResult[this.hunderterIndex] = this.analogy.res[this.hunderterIndex];

                return string6withCorrectioninBack;
              case 7:
                finalString = this.text.analogy[17];
                this.endAnalogy = true;
                return finalString;
            }
          } else if (
            this.analogy.min[this.zehnerIndex] ===
            this.analogy.cor[this.zehnerIndex]
          ) {
            //correction at Einer and Zehnerstelle only
            switch (this.state.analogyTextIndex) {
              case 2:
                var string2withCorrectioninFront = this.returnStringStartEinerstelle();
                return string2withCorrectioninFront;
              case 3:
                var string3withCorrectioninFront = this.returnStringCorrectionStep(
                  'Einer',
                  'Zehner',
                  this.einerIndex,
                  this.zehnerIndex,
                  this.analogy.min,
                  this.analogy.sub,
                  this.analogy.cor,
                );

                // update analogy
                this.curAnalogyMinuendCor[this.einerIndex] = true;
                this.curAnalogyMinuendCor[this.zehnerIndex] = true;
                this.curAnalogyCorrection[this.einerIndex] = this.analogy.cor[this.einerIndex];
                this.curAnalogyCorrection[this.zehnerIndex] = this.analogy.cor[this.zehnerIndex];

                return string3withCorrectioninFront;
              case 4:
                var string4withCorrectioninFront = this.returnStringNoCorrection(
                  'Einer',
                  this.analogy.cor[this.einerIndex],
                  this.analogy.sub[this.einerIndex],
                  this.analogy.res[this.einerIndex],
                );

                // update analogy
                this.curAnalogyResult[this.einerIndex] = this.analogy.res[this.einerIndex];

                return string4withCorrectioninFront;
              case 5:
                var string5withCorrectioninFront = this.returnStringNoCorrection(
                  'Zehner',
                  this.analogy.cor[this.zehnerIndex],
                  this.analogy.sub[this.zehnerIndex],
                  this.analogy.res[this.zehnerIndex],
                );

                // update analogy
                this.curAnalogyResult[this.zehnerIndex] = this.analogy.res[this.zehnerIndex];

                return string5withCorrectioninFront;
              case 6:
                var string6withCorrectioninFront = this.returnStringNoCorrection(
                  'Hunderter',
                  this.analogy.cor[this.hunderterIndex],
                  this.analogy.sub[this.hunderterIndex],
                  this.analogy.res[this.hunderterIndex],
                );

                // update analogy
                this.curAnalogyResult[this.hunderterIndex] = this.analogy.res[this.hunderterIndex];

                return string6withCorrectioninFront;
              case 7:
                finalString = this.text.analogy[17];
                this.endAnalogy = true;
                return finalString;
            }
          } else {
            // all minuend digits need a correction
            if (Number(this.analogy.min[this.zehnerIndex]) === 0) {
              // if zehner is 0 and einer needs to borough from zehner this special case happens
              //TODOOOOO besser machen, zu volle Sprechblase. Muss in einzelne Teile aufgeteilt werden.
              switch (this.state.analogyTextIndex) {
                case 2:
                  var string2withCorrectionAllZero = this.returnStringStartEinerstelle();
                  return string2withCorrectionAllZero;
                case 3:
                  var string3withCorrectionAllZero =
                    'Wir müssen uns 10 Einer von den Zehnern leihen. Um von der 0 etwas zu leihen, machen wir eine 10 aus ihr, indem wir uns einen Hunderter leihen. Wir rechnen also 5-1=4. ' +
                    'Dann können wir uns von den 10 Zehnern einen leihen, also 10-' +
                    this.analogy.min[this.zehnerIndex] +
                    '1=' +
                    this.analogy.cor[this.zehnerIndex];
                  ' rechnen und haben 10 Einer zur Verfügung, also 10+' +
                    this.analogy.min[this.einerIndex] +
                    '=' +
                    this.analogy.cor[this.einerIndex] +
                    '.';

                  // update analogy
                  this.curAnalogyMinuendCor[this.einerIndex] = true;
                  this.curAnalogyMinuendCor[this.zehnerIndex] = true;
                  this.curAnalogyMinuendCor[this.hunderterIndex] = true;
                  this.curAnalogyCorrection[this.einerIndex] = this.analogy.cor[this.einerIndex];
                  this.curAnalogyCorrection[this.zehnerIndex] = this.analogy.cor[this.zehnerIndex];
                  this.curAnalogyCorrection[this.hunderterIndex] = this.analogy.cor[this.hunderterIndex];

                  return string3withCorrectionAllZero;
                case 4:
                  var string4withCorrectionAllZero = this.returnStringNoCorrection(
                    'Einer',
                    this.analogy.cor[this.einerIndex],
                    this.analogy.sub[this.einerIndex],
                    this.analogy.res[this.einerIndex],
                  );

                  // update analogy
                  this.curAnalogyResult[this.einerIndex] = this.analogy.res[this.einerIndex];

                  return string4withCorrectionAllZero;
                case 5:
                  var string7withCorrectionAllZero = this.returnStringNoCorrection(
                    'Zehner',
                    this.analogy.cor[this.zehnerIndex],
                    this.analogy.sub[this.zehnerIndex],
                    this.analogy.res[this.zehnerIndex],
                  );

                  // update analogy
                  this.curAnalogyResult[this.zehnerIndex] = this.analogy.res[this.zehnerIndex];

                  return string7withCorrectionAllZero;
                case 8:
                  var string8withCorrectionAllZero = this.returnStringNoCorrection(
                    'Hunderter',
                    this.analogy.cor[this.hunderterIndex],
                    this.analogy.sub[this.hunderterIndex],
                    this.analogy.res[this.hunderterIndex],
                  );

                  // update analogy
                  this.curAnalogyResult[this.hunderterIndex] = this.analogy.res[this.hunderterIndex];

                  return string8withCorrectionAllZero;
                case 9:
                  finalString = this.text.analogy[17];
                  this.endAnalogy = true;
                  return finalString;
              }
            } else {
              // all three digits need correction but zehner is not 0
              switch (this.state.analogyTextIndex) {
                case 2:
                  var string2withCorrectionAll = this.returnStringStartEinerstelle();
                  return string2withCorrectionAll;
                case 3:
                  var string3withCorrectionAll = this.returnStringCorrectionStep(
                    'Einer',
                    'Zehner',
                    this.einerIndex,
                    this.zehnerIndex,
                    this.analogy.min,
                    this.analogy.sub,
                    this.analogy.cor,
                  );

                  // update analogy
                  this.curAnalogyMinuendCor[this.einerIndex] = true;
                  this.curAnalogyMinuendCor[this.zehnerIndex] = true;
                  this.curAnalogyCorrection[this.einerIndex] = this.analogy.cor[this.einerIndex];
                  this.curAnalogyCorrection[this.zehnerIndex] = this.analogy.cor[this.zehnerIndex];

                  return string3withCorrectionAll;
                case 4:
                  var string4withCorrectionAll = this.returnStringNoCorrection(
                    'Einer',
                    this.analogy.cor[this.einerIndex],
                    this.analogy.sub[this.einerIndex],
                    this.analogy.res[this.einerIndex],
                  );

                  // update analogy
                  this.curAnalogyResult[this.einerIndex] = this.analogy.res[this.einerIndex];

                  return string4withCorrectionAll;
                case 5:
                  var string5withCorrectionAll = this.returnStringZehnerstelle();
                  return string5withCorrectionAll;
                case 6:
                  var string6withCorrectionAll = this.returnStringCorrectionStep(
                    'Zehner',
                    'Hunderter',
                    this.zehnerIndex,
                    this.hunderterIndex,
                    this.analogy.min,
                    this.analogy.sub,
                    this.analogy.cor,
                  );

                  // update analogy
                  this.curAnalogyMinuendCor[this.zehnerIndex] = true;
                  this.curAnalogyMinuendCor[this.hunderterIndex] = true;
                  this.curAnalogyCorrection[this.zehnerIndex] = this.analogy.cor[this.zehnerIndex];
                  this.curAnalogyCorrection[this.hunderterIndex] = this.analogy.cor[this.hunderterIndex];

                  return string6withCorrectionAll;
                case 7:
                  var string7withCorrectionAll = this.returnStringNoCorrection(
                    'Zehner',
                    this.analogy.cor[this.zehnerIndex],
                    this.analogy.sub[this.zehnerIndex],
                    this.analogy.res[this.zehnerIndex],
                  );

                  // update analogy
                  this.curAnalogyResult[this.zehnerIndex] = this.analogy.res[this.zehnerIndex];

                  return string7withCorrectionAll;
                case 8:
                  var string8withCorrectionAll = this.returnStringNoCorrection(
                    'Hunderter',
                    this.analogy.cor[this.hunderterIndex],
                    this.analogy.sub[this.hunderterIndex],
                    this.analogy.res[this.hunderterIndex],
                  );

                  // update analogy
                  this.curAnalogyResult[this.hunderterIndex] = this.analogy.res[this.hunderterIndex];

                  return string8withCorrectionAll;
                case 9:
                  finalString = this.text.analogy[17];
                  this.endAnalogy = true;
                  return finalString;
              }
            }
          }
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
      this.analogy.res = analogy.result.map(String);
      this.analogy.cor = analogy.correction.map(String);
      this.diagnosis.correct = diagnosis.correct;
      this.einerIndex = this.analogy.min.length - 1;
      this.zehnerIndex = this.analogy.min.length - 2;
      this.hunderterIndex = this.analogy.min.length - 3;

      // Init analogy arrays
      this.curAnalogyResult = new Array(analogy.minuend.length);
      for (let i = 0; i < this.curAnalogyResult.length; i++)
        this.curAnalogyResult[i] = NaN;

      this.curAnalogyCorrection = new Array(analogy.correction.length);
      for (let i = 0; i < this.curAnalogyCorrection.length; i++)
        this.curAnalogyCorrection[i] = NaN;

      this.curAnalogyMinuendCor = new Array(analogy.subtrahend.length);
      for (let i = 0; i < this.curAnalogyMinuendCor.length; i++)
        this.curAnalogyMinuendCor[i] = false;

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
            res={this.curAnalogyResult}
            cor={this.curAnalogyCorrection}
            min_cor={this.curAnalogyMinuendCor}
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
