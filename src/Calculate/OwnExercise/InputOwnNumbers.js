import React from "react";
import PropTypes from "prop-types";
import "../../CSS/InputOwnNumbers.css";
import { withRouter } from "react-router-dom";
import CloseSpeechbubble from "../../shared/Speechbubble/CloseSpeechbubble.js";
import inputOwnTexts from "../../resources/inputOwnTexts.json";

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
class InputOwnNumbers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
    };

    this.errorText = null;
    this.returnSubMintoSub = this.returnSubMintoSub.bind(this);
    this.text = inputOwnTexts.instructions;
  }

  /**
   * Checks if inputs are valid numbers and sets error message if invalid
   * and submits the minuend and subtrahend to OwnExercise.js
   */
  returnSubMintoSub() {
    var minuend = document.getElementById("obereZahl").value;
    var subtrahend = document.getElementById("untereZahl").value;

    // Regex to check if input consists only of numbers
    let numregex = /^\d+$/;

    if (
      minuend === "" ||
      minuend == null ||
      subtrahend === "" ||
      subtrahend == null
    ) {
      this.errorText = inputOwnTexts.enterNumbers;
      this.setState({
        showError: true,
      });
    } else if (!numregex.test(minuend) || !numregex.test(subtrahend)) {
      this.errorText = inputOwnTexts.enterOnlyNumbers;
      this.setState({
        showError: true,
      });
    } else if (Number(minuend) < Number(subtrahend)) {
      this.errorText = inputOwnTexts.subtrahendBiggerThanMinuend;
      this.setState({
        showError: true,
      });
    } else if (Number(minuend) > 999 || Number(subtrahend) > 999) {
      this.errorText = inputOwnTexts.numbersTooLong;
      this.setState({
        showError: true,
      });
    } else {
      this.props.submit(minuend, subtrahend);
    }
  }

  render() {
    let errortext = [];
    if (this.state.showError)
      errortext = <p className="errorText">{this.errorText}</p>;

    return (
      <div className="inputOwnEx">
        <div className="inputOwnExBubble">
          <div className="ownExText">{this.text}</div>
          <div className="obereZahlText">Obere Zahl:</div>

          <input
            maxLength="3"
            max="999"
            className="obereZahlInput"
            id="obereZahl"
          ></input>

          <div className="untereZahlText">Untere Zahl:</div>

          <input
            maxLength="3"
            max="999"
            className="untereZahlInput"
            id="untereZahl"
          ></input>

          {errortext}

          <button
            className="eigeneAufgabeSubmit"
            onClick={this.returnSubMintoSub}
          >
            Los
          </button>
        </div>
        <CloseSpeechbubble close_func={this.props.close_func} />
      </div>
    );
  }
}

InputOwnNumbers.propTypes = {
  submit: PropTypes.func,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  close_func: PropTypes.func,
};
export default withRouter(InputOwnNumbers);
