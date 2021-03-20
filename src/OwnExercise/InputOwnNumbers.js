import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/InputOwnNumbers.css';
import { withRouter } from 'react-router-dom';

class InputOwnNumbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
    };
    this.errorText = null;
    this.returnSubMintoSub = this.returnSubMintoSub.bind(this);
    this.text =
      'Gib hier die Zahlen für deine eigene Aufgabe ein. Achte darauf, dass die obere Zahl größer ist als die untere.';
  }

  returnSubMintoSub() {
    var minuend = document.getElementById('obereZahl').value;
    var subtrahend = document.getElementById('untereZahl').value;
    if (isNaN(minuend) || isNaN(subtrahend)) {
      this.errorText =
        'Du hast Buchstaben eingegeben. Bitte gib nur Zahlen ein.';
      this.setState({
        showError: true,
      });
    } else if (
      minuend == '' ||
      minuend == null ||
      subtrahend == '' ||
      subtrahend == null
    ) {
      this.errorText = 'Bitte gib Zahlen ein.';
      this.setState({
        showError: true,
      });
      console.log('input bitte');
    } else if (Number(minuend) < Number(subtrahend)) {
      this.errorText =
        'Die obere Zahl muss größer sein als die untere. Probiere es nochmal.';
      console.log('Oben muss größer als unten sein');
      this.setState({
        showError: true,
      });
    } else if (Number(minuend) > 999 || Number(subtrahend) > 999) {
      this.errorText = 'Bitte gib nur Zahlen bis 999 ein.';
      console.log('Bitte gib nur Zahlen bis 999 ein.');
      this.setState({
        showError: true,
      });
    } else {
      //TODO: hier müssen die Zahlen dann ans Substractionpanel übergeben werden und das Eine Aufgaben Ding wieder versteckt werden
      this.props.submit(minuend, subtrahend);
    }
  }
  render() {
    if (!this.state.showError) {
      return (
        <div className="inputOwnEx">
          <div className="inputOwnExBubble">
            <div className="ownExText">{this.text}</div>
            <div className="obereZahlText">Obere Zahl:</div>
            <input
              //type="number"
              maxLength="3"
              className="obereZahlInput"
              id="obereZahl"
            ></input>
            <div className="untereZahlText">Untere Zahl:</div>
            <input
              //type="number"
              maxLength="3"
              className="untereZahlInput"
              id="untereZahl"
            ></input>
            <button
              className="eigeneAufgabeSubmit"
              onClick={this.returnSubMintoSub}
            >
              Los
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="inputOwnEx">
          <div className="inputOwnExBubble">
            <div className="ownExText">{this.text}</div>
            <div className="obereZahlText">Obere Zahl:</div>
            <input
              //type="number"
              maxLength="3"
              max="999"
              className="obereZahlInput"
              id="obereZahl"
            ></input>
            <div className="untereZahlText">Untere Zahl:</div>
            <input
              // type="number"
              maxLength="3"
              max="999"
              className="untereZahlInput"
              id="untereZahl"
            ></input>
            <p className="errorText">{this.errorText}</p>

            <button
              className="eigeneAufgabeSubmit"
              onClick={this.returnSubMintoSub}
            >
              Los
            </button>
          </div>
        </div>
      );
    }
  }
}

InputOwnNumbers.propTypes = {
  submit: PropTypes.func,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};
export default withRouter(InputOwnNumbers);
