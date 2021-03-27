import React from 'react';
import '../CSS/SubtractionPanel.css';
import ClickableNumber from './ClickableNumber.js';
import Number from './Number';
import InputNumber from './InputNumber';
import CorrectButton from './CorrectButton.js';
import RefreshButton from './RefreshButton.js';
import PropTypes from 'prop-types';
import { getAnalogy, getDiagnosis } from '../PrologConnector.js';

class SubtractionPanel extends React.Component {

  constructor(props) {
    super(props);

    // init states
    this.state = {
      corrections_crossedOut: new Array(this.props.minuend.length).fill(false),
      corrections_row: new Array(this.props.minuend.length).fill(null),
      result_row: new Array(this.props.minuend.length).fill(null),
      error_message: null,
      corrections_row_error: new Array(this.props.minuend.length).fill(false),
      result_row_error: new Array(this.props.minuend.length).fill(false),
    };

    this.resultOnChange = this.resultOnChange.bind(this);
    this.correctionsOnChange = this.correctionsOnChange.bind(this);
  }

  /**
   * Correct the submitted calculation and returns the analogy + diagnosis
   * @return {diagnosis, analogy}: diagnosis and analogy as arrays
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

  /**
   * Checks the result row for input errors and returns it
   * @returns {result, error_message} the result row as string array and a error_message
   */
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

  /**
   * Returns the subtrahend
   * @returns the subtrahend row as string array and a error_message
   */
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

  /**
   * Checks the minuend row for input errors and returns it
   * @returns the minuend row as string array and a error_message
   */
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

  /**
   * Checks the corrections row for input errors and returns it
   * @returns {corrections, error_message} the correction row as string array and a error_message
   */
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

  /**
   * Sets a error on a column i in the result row
   * @param {*} i: index of the column
   */
  setValidationErrorInResultRow(i) {
    let new_row = this.state.result_row_error;
    new_row[i] = true;
    this.setState({
      result_row_error: new_row,
    });
  }

  /**
   * Sets a error on a column i in the corrections row
   * @param {*} i: index of the column
   */
  setValidationErrorInCorrectionsRow(i) {
    let new_row = this.state.corrections_row_error.slice();
    new_row[i] = true;
    this.setState({
      corrections_row_error: new_row,
    });
  }


  /**
  * Changes a value and updates variables with a correction input
  * @param {SyntheticEvent} event: event triggered by a input
  */
  correctionsOnChange(event) {
    let value = event.target.value;
    let j = parseInt(event.target.classList[1].slice(-1));
    let new_row = this.state.corrections_row;
    new_row[j] = value;
    this.setState({ corrections_row: new_row });
  }


  /**
     * Updates variables when minuend column gets crossed out
     * @param {SyntheticEvent} event: event triggered by a click on minuend col
     */
  minuend_onClick(event, i) {
    event.preventDefault();
    let new_corrections_crossedOut = this.state.corrections_crossedOut.slice();
    new_corrections_crossedOut[i] = !new_corrections_crossedOut[i];

    let new_correction_row = this.state.corrections_row;
    new_correction_row[i] = NaN;

    this.setState({
      corrections_crossedOut: new_corrections_crossedOut,
      correction_row: new_correction_row,
    });
  }

  /**
   * Changes a value and updates variables with a new result input
   * @param {SyntheticEvent} event: event triggered by a input
   */
  resultOnChange(event) {
    let value = event.target.value;
    let j = parseInt(event.target.classList[1].slice(-1));
    let new_row = this.state.result_row;
    new_row[j] = value;
    this.setState({ result_row: new_row });
  }


  /**
   * Resets the inputs in the Subtractionpanel
   * @param {*} event: Event triggered by the refresh-button click
   */
  reset(event) {
    if (event != null)
      event.preventDefault();

    this.setState({
      corrections_crossedOut: new Array(this.props.minuend.length).slice().fill(false),
      corrections_row: new Array(this.props.minuend.length).slice().fill(NaN),
      result_row: new Array(this.props.minuend.length).slice().fill(NaN),
    });
  }

  //************** Render functions **************\\  

  /**
   * Configures and renders the correction row as InputNumber 
   * @returns   The InputNumber's to represent the correction row
   */
  renderCorrections() {
    const corrections_display = [];

    for (let j = 0; j < this.props.minuend.length; j++) {

      let highlighted = false;
      if (this.props.highlighting[j] == 1)
        highlighted = true;

      let number;
      let func = null;
      let enabled = false;
      let display = 'hidden';

      if (!this.props.analogy) {
        number = parseInt(this.state.corrections_row[j]);
        func = this.correctionsOnChange;
        enabled = true;
        if (this.state.corrections_crossedOut[j])
          display = 'visible';
      } else {
        number = parseInt(this.props.correction[j]);
        if (isNaN(this.props.correction[j]) == false)
          display = 'visible'
      }

      corrections_display.push(
        <InputNumber
          key={'correction' + j}
          className={'correction' + j}
          visibility={display}
          error={this.state.corrections_row_error[j]}
          enabled={enabled}
          number={number}
          onChangeFunc={func}
          highlighted={highlighted}
        />
      );
    }
    return corrections_display;
  }

  /**
   * Configures and renders the minuend row as ClickableNumber 
   * @returns   The ClickableNumber's to represent the minuend row
   */
  renderMinuend() {
    const minuend_display = [];

    for (let i = 0; i < this.props.minuend.length; i++) {

      let highlighted = false;
      if (this.props.highlighting[i] == 1)
        highlighted = true;

      let number = this.props.minuend.slice(i, i + 1);
      let crossedOut, func;
      if (!this.props.analogy) {
        crossedOut = this.state.corrections_crossedOut[i];
        func = (event) => this.minuend_onClick(event, i);
      } else {
        crossedOut = this.props.minuend_correction[i];
        func = null;
      }

      minuend_display.push(
        <ClickableNumber
          key={'minuend' + i}
          className={'minuend' + i}
          number={number}
          crossedOut={crossedOut}
          onClickHandler={func}
          highlighted={highlighted}
        />,
      );
    }
    return minuend_display;
  }

  /**
   * Configures and renders the subtrahend row as Number 
   * @returns   The Number's to represent the subtrahend row
   */
  renderSubtrahend() {
    const subtrahend_display = [];

    for (var i = 0; i < this.props.minuend.length; i++) {

      let highlighted = false;
      if (this.props.highlighting[i] == 1)
        highlighted = true;

      let number = '0';
      if (this.props.minuend.length - i <= this.props.subtrahend.length)
        number =
          this.props.subtrahend.charAt(
            this.props.subtrahend.length - this.props.minuend.length + i,
          );
      else
        number = '0';

      subtrahend_display.push(
        <Number
          key={'subtrahend' + i}
          className={'subtrahend' + i}
          number={number}
          highlighted={highlighted}
        />,
      );
    }
    return subtrahend_display;
  }

  /**
   * Configures and renders the result row as InputNumber 
   * @returns   The InputNumber's to represent the result row
   */
  renderResult() {
    const result_display = [];

    for (var j = 0; j < this.props.minuend.length; j++) {
      let highlighted = false;
      if (this.props.highlighting[j] == 1)
        highlighted = true;

      let number = NaN;
      let func;
      if (!this.props.analogy) {
        number = parseInt(this.state.result_row[j]);
        func = this.resultOnChange;
      } else {
        number = parseInt(this.props.result[j]);
        func = null;
      }

      result_display.push(
        <InputNumber
          key={'result' + j}
          className={'result' + j}
          number={parseInt(number)}
          error={this.state.result_row_error[j]}
          enabled={true}
          highlighted={highlighted}
          onChangeFunc={func}
        />);
    }

    return result_display;
  }

  /**
   * Renders a error message, if an error occurrs
   * @returns a div element with the error message, or nothing if no error occurred.
   */
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

    let style = { visibility: this.props.subpanel_visibility };

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
              onClick={(event) => this.reset(event)}
            />
            {error_message}
          </div>
        </div>
      );
    } else {
      return (
        <div className="panel" style={style}>
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
  subpanel_visibility: PropTypes.string,
};
export default SubtractionPanel;
