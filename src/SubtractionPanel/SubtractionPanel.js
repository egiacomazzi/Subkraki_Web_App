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
    for (let i = 0; i < this.props.minuend.length; i++) {
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
      result_row_error: Array(this.props.minuend.length).fill(false),
    });
    const corrections = this.getCorrections();
    if (corrections.error_message) {
      this.setState({
        error_message: corrections.error_message,
      });
      return;
    }
    this.setState({
      corrections_row_error: Array(this.props.minuend.length).fill(
        false,
      ),
      error_message: null,
    });
    const minuend = this.getMinuend();
    const subtrahend = this.getSubtrahend();

    let diagnosis = await getDiagnosis(
      minuend,
      subtrahend,
      corrections.corrections,
      result.result,
    );
    let analogy = {};
    if (!diagnosis.correct) {
      analogy = await getAnalogy(
        minuend,
        subtrahend,
        corrections.corrections,
        result.result,
      );
    }

    return { diagnosis: diagnosis, analogy: analogy };
  }

  getResult() {
    let result = [];
    let error_message = null;
    for (let i = 0; i < this.props.minuend.length; i++) {
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

  getSubtrahend() {
    let subtrahend = [];
    for (let i = 0; i < this.props.minuend.length; i++) {
      const value = document.getElementsByClassName(
        'subtrahend' + i,
      )[0].textContent;
      if (value === '') {
        subtrahend.push(parseInt(0));
      } else {
        const num = parseInt(value);
        subtrahend.push(num);
      }
    }
    return subtrahend;
  }

  getMinuend() {
    let minuend = [];
    for (let i = 0; i < this.props.minuend.length; i++) {
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
    for (let i = 0; i < this.props.minuend.length; i++) {
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
        corrections.push(parseInt(this.props.minuend[i]));
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
    for (let j = 0; j < this.props.minuend.length; j++) {
      var corr_className = 'correction' + j;
      let highlighted = false;
      if (this.props.highlighting[j] == 1) {
        highlighted = true;
      }

      let display = 'hidden';
      if (
        this.state.corrections_crossedOut[j] ||
        (this.props.analogy &&
          isNaN(this.props.correction[j]) == false)
      ) {
        display = 'visible';
      }
      if (!this.props.analogy)
        corrections_display.push(
          <CorrectionNumber
            key={corr_className}
            className={corr_className}
            visibility={display}
            error={this.state.corrections_row_error[j]}
            enabled={true}
          />,
        );
      else
        corrections_display.push(
          <ResultNumber
            key={corr_className}
            className={corr_className}
            visibility={display}
            number={parseInt(this.props.correction[j])}
            enabled={false}
            highlighted={highlighted}
          />,
        );
    }
    return corrections_display;
  }

  renderMinuend() {
    var minuend_digits = [];
    const minuend_display = [];
    for (let i = 0; i < this.props.minuend.length; i++) {
      let min_className = 'minuend' + i;
      let highlighted = false;
      if (this.props.highlighting[i] == 1) {
        highlighted = true;
      }
      minuend_digits.push(this.props.minuend.slice(i, i + 1));

      if (!this.props.analogy)
        minuend_display.push(
          <ClickableNumber
            key={min_className}
            className={min_className}
            number={minuend_digits[i]}
            crossedOut={this.state.corrections_crossedOut[i]}
            onClickHandler={(event) => this.minuend_onClick(event, i)}
            highlighted={false}
          />,
        );
      else
        minuend_display.push(
          <ClickableNumber
            key={min_className}
            className={min_className}
            number={minuend_digits[i]}
            crossedOut={this.props.minuend_correction[i]}
            highlighted={highlighted}
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
    for (var i = 0; i < this.props.minuend.length; i++) {
      const sub_className = 'subtrahend' + i;
      let highlighted = false;
      if (this.props.highlighting[i] == 1) {
        highlighted = true;
      }

      if (
        this.props.minuend.length - i <=
        this.props.subtrahend.length
      )
        subtrahend_digits.push(
          this.props.subtrahend.charAt(
            this.props.subtrahend.length -
              this.props.minuend.length +
              i,
          ),
        );
      else subtrahend_digits.push('0'); //TODO: hier noch die 0 abändern

      subtrahend_display.push(
        <Number
          key={sub_className}
          className={sub_className}
          number={subtrahend_digits[i]}
          highlighted={highlighted}
        />,
      );
    }
    return subtrahend_display;
  }

  renderResult() {
    const result_display = [];
    for (var j = 0; j < this.props.minuend.length; j++) {
      const res_className = 'result' + j;
      let highlighted = false;
      if (this.props.highlighting[j] == 1) {
        highlighted = true;
      }

      if (!this.props.analogy)
        result_display.push(
          <ResultNumber
            key={res_className}
            className={res_className}
            number={parseInt(this.state.result_row[j])}
            error={this.state.result_row_error[j]}
            enabled={true}
            highlighted={false}
          />,
        );
      else
        result_display.push(
          <ResultNumber
            key={res_className}
            className={res_className}
            number={parseInt(this.props.result[j])}
            error={this.state.result_row_error[j]}
            enabled={false}
            highlighted={highlighted}
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
    for (let i = 0; i < this.props.minuend.length; i++) {
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
    if (!this.props.analogy) {
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
    } else {
      return (
        <div className="panel">
          <div className="grid-container">
            {corrections_display}
            {subtrahend_display}

            <div className="minus"> - </div>
            {minuend_display}
            <div className="line"></div>

            {result_display}
          </div>
        </div>
      );
    }
  }
}

SubtractionPanel.propTypes = {
  subtrahend: PropTypes.string,
  minuend: PropTypes.string,
  analogy: PropTypes.bool,
  submit: PropTypes.func,
  result: PropTypes.array,
  correction: PropTypes.array,
  minuend_correction: PropTypes.array,
  highlighting: PropTypes.array,
};
export default SubtractionPanel;
