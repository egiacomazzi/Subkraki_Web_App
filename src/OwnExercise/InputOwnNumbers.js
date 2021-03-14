import React from 'react';

//import PropTypes from 'prop-types';

class InputOwnNumbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
    };
    this.errorText = null;
    this.returnSubMintoSub = this.returnSubMintoSub.bind(this);
  }
  returnSubMintoSub() {
    var minuend = document.getElementById('obereZahl').value;
    var subtrahend = document.getElementById('untereZahl').value;
    if (
      minuend == '' ||
      minuend == null ||
      subtrahend == '' ||
      subtrahend == null
    ) {
      this.errorText = 'Bitte gib die Zahlen ein.';
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
    } else {
      //TODO: hier müssen die Zahlen dann ans Substractionpanel übergeben werden und das Eine Aufgaben Ding wieder versteckt werden
      console.log(minuend, subtrahend);
    }
  }
  render() {
    if (!this.state.showError) {
      return (
        <div className="inputOwnEx">
          <div className="obereZahlText">Obere Zahl:</div>
          <input
            type="number"
            className="obereZahlInput"
            id="obereZahl"
          ></input>
          <div className="untereZahlText">Untere Zahl:</div>
          <input
            type="number"
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
      );
    } else {
      return (
        <div className="inputOwnEx">
          <div className="obereZahlText">Obere Zahl:</div>
          <input
            type="number"
            className="obereZahlInput"
            id="obereZahl"
          ></input>
          <div className="untereZahlText">Untere Zahl:</div>
          <input
            type="number"
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
      );
    }
  }
}

export default InputOwnNumbers;
