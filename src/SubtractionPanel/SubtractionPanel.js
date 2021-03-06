import React from 'react';
import '../CSS/SubtractionPanel.css';
import ClickableNumber from './ClickableNumber.js';
import Number from './Number';
import ResultNumber from './ResultNumber';
import CorrectButton from './CorrectButton.js';
import RefreshButton from './RefreshButton.js';
import CorrectionNumber from './CorrectionNumber.js';
import PropTypes from 'prop-types';
import { getAnalogy, getDiagnosis } from '../PrologConnector.js';

class SubtractionPanel extends React.Component {
  constructor(props) {
    super(props);
    /* Stupidest ever way to initialise empyt array, but somehow new Array(digits)
            always gives an array of length 1.*/
    let emptyArray = [];
    for (let i = 0; i < this.props.digits; i++) {
      emptyArray.push(null);
    }
    this.state = {
      corrections_crossedOut: emptyArray.slice().fill(false),
      corrections_row: emptyArray.slice().fill(null),
      result_row: emptyArray.slice().fill(null),
      error_message: null,
      corrections_row_error: emptyArray.slice().fill(false),
      result_row_error: emptyArray.slice().fill(false),
    };
  }


  /**
  * Correct the submitted calculation and returns the analogy + diagnosis
  * @return   {diagnosis, analogy}  
  */
  async getAnalogyAndDiagnosis() {
    const result = this.getResult();
    if (result.error_message) {
      this.setState({
        error_message: result.error_message,
      });
      return;
    }
    this.setState({
      result_row_error: Array(this.props.digits).fill(false),
    });
    const corrections = this.getCorrections();
    if (corrections.error_message) {
      this.setState({
        error_message: corrections.error_message,
      });
      return;
    }
    this.setState({
      corrections_row_error: Array(this.props.digits).fill(false),
      error_message: null,
    });
    const minuend = this.getMinuend();
    const subtrahend = this.getSubtrahend();

    let diagnosis = await getDiagnosis(minuend, subtrahend, corrections.corrections, result.result);
    let analogy = {};
    if (!diagnosis.correct) {
      analogy = await getAnalogy(minuend, subtrahend, corrections.corrections, result.result);
    }

    return { diagnosis: diagnosis, analogy: analogy };
  }

  getResult() {
    let result = [];
    let error_message = null;
    for (let i = 0; i < this.props.digits; i++) {
      const value = document.getElementsByClassName('result' + i)[0]
        .value;
      if (value === '') {
        result.push(parseInt(0));
      } else {
        const num = parseInt(value);
        if (isNaN(num)) {
          error_message = 'Achtung: Gib nur Zahlen ein.';
          this.setValidationErrorInResultRow(i);
          break;
        }
        result.push(num);
      }
    }
    return { result: result, error_message: error_message };
  }

  //Das ist richtig benannt!
  getSubtrahend() {
    let subtrahend = [];
    for (let i = 0; i < this.props.digits; i++) {
      const value = document.getElementsByClassName('subtrahend' + i)[0]
        .textContent;
      if (value === '') {
        subtrahend.push(parseInt(0));
      } else {
        const num = parseInt(value);
        subtrahend.push(num);
      }
    }
    return subtrahend;
  }
  //Das ist richtig benannt!
  getMinuend() {
    let minuend = [];
    for (let i = 0; i < this.props.digits; i++) {
      const value = document.getElementsByClassName('minuend' + i)[0]
        .textContent;
      if (value === '') {
        minuend.push(parseInt(0));
      } else {
        const num = parseInt(value);
        minuend.push(num);
      }
    }
    return minuend;
  }

  getCorrections() {
    let corrections = [];
    let error_message = null;
    for (let i = 0; i < this.props.digits; i++) {
      if (this.state.corrections_crossedOut[i]) {
        const value = document.getElementsByClassName(
          'correction' + i,
        )[0].value;
        if (value === '') {
          error_message =
            'Achtung: Wenn du eine Zahl oben durchstreichst, musst du auch darüber eine andere Zahl eintragen.';
          this.setValidationErrorInCorrectionsRow(i);
          break;
        }
        const num = parseInt(value);
        if (isNaN(num)) {
          error_message = 'Achtung: Gib nur Zahlen ein.';
          this.setValidationErrorInCorrectionsRow(i);
          break;
        }
        corrections.push(num);
      } else {
        corrections.push(parseInt(this.props.subtrahend[i]));
      }
    }
    return { corrections: corrections, error_message: error_message };
  }



  setValidationErrorInResultRow(i) {
    let new_row = this.state.result_row_error.slice();
    new_row[i] = true;
    this.setState({
      result_row_error: new_row,
    });
  }

  setValidationErrorInCorrectionsRow(i) {
    let new_row = this.state.corrections_row_error.slice();
    new_row[i] = true;
    this.setState({
      corrections_row_error: new_row,
    });
  }

  renderCorrections() {
    const corrections_display = [];
    for (let j = 0; j < this.props.digits; j++) {
      const corr_className = 'correction' + j;
      let display = 'hidden';
      if (this.state.corrections_crossedOut[j]) {
        display = 'visible';
      }
      corrections_display.push(
        <CorrectionNumber
          key={corr_className}
          className={corr_className}
          visibility={display}
          error={this.state.corrections_row_error[j]}
        />,
      );
    }
    return corrections_display;
  }

  renderMinuend() {
    var minuend_digits = [];
    const minuend_display = [];
    for (let i = 0; i < this.props.digits; i++) {
      const min_className = 'minuend' + i;
      minuend_digits.push(this.props.minuend.slice(i, i + 1));
      minuend_display.push(
        <ClickableNumber
          key={min_className}
          className={min_className}
          number={minuend_digits[i]}
          crossedOut={this.state.corrections_crossedOut[i]}
          onClickHandler={(event) =>
            this.minuend_onClick(event, i)
          }
        />,
      );
    }
    return minuend_display;
  }

  minuend_onClick(event, i) {
    event.preventDefault();
    let new_corrections_crossedOut = this.state.corrections_crossedOut.slice();
    new_corrections_crossedOut[i] = !new_corrections_crossedOut[i];
    this.setState({
      corrections_crossedOut: new_corrections_crossedOut,
    });
  }

  renderSubtrahend() {
    var subtrahend_digits = [];
    const subtrahend_display = [];
    for (var i = 0; i < this.props.digits; i++) {
      const sub_className = 'subtrahend' + i;
      subtrahend_digits.push(this.props.subtrahend.slice(i, i + 1));
      subtrahend_display.push(
        <Number
          key={sub_className}
          className={sub_className}
          number={subtrahend_digits[i]}
        />,
      );
    }
    return subtrahend_display;
  }

  renderResult() {
    const result_display = [];
    for (var j = 0; j < this.props.digits; j++) {
      const res_className = 'result' + j;
      const num = parseInt(this.state.result_row[j]);
      result_display.push(
        <ResultNumber
          key={res_className}
          className={res_className}
          number={num}
          error={this.state.result_row_error[j]}
        />,
      );
    }
    return result_display;
  }

  /*Does not work yet properly -> result does not update. Maybe becasue only
    defaultValue in ResultNumber???*/
  refresh(event) {
    event.preventDefault();
    let emptyArray = [];
    for (let i = 0; i < this.props.digits; i++) {
      emptyArray.push(null);
    }
    const new_result_row = this.state.result_row.slice().fill(0);
    this.setState({
      corrections_crossedOut: emptyArray.slice().fill(false),
      corrections_row: emptyArray.slice().fill(null),
      result_row: new_result_row,
    });
  }

  renderErrorMessage() {
    if (this.state.error_message == null) {
      return [];
    } else {
      return (
        <div className="errorMessage">{this.state.error_message}</div>
      );
    }
  }

  render() {
    const corrections_display = this.renderCorrections();
    const minuend_display = this.renderMinuend();
    const subtrahend_display = this.renderSubtrahend();
    const result_display = this.renderResult();
    const error_message = this.renderErrorMessage();

    return (
      <div className="panel">
        <div className="grid-container">
          {corrections_display}

          {minuend_display}

          <div className="minus"> - </div>
          {subtrahend_display}
          <div className="line"></div>

          {result_display}
          <CorrectButton
            className="check panelControls"
            onClick={() => this.props.submit()}
          />
          <RefreshButton
            className="refresh panelControls"
            onClick={(event) => this.refresh(event)}
          />
          {error_message}
        </div>
      </div>
    );
  }
}

SubtractionPanel.propTypes = {
  subtrahend: PropTypes.string,
  minuend: PropTypes.string,
  digits: PropTypes.string,
  submit: PropTypes.func,
};
export default SubtractionPanel;
