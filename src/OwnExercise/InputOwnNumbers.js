import React from 'react';

//import PropTypes from 'prop-types';

class InputOwnNumbers extends React.Component {
  returnSubMintoSub() {
    var minuend = document.getElementById('obereZahl').value;
    var subtrahend = document.getElementById('untereZahl').value;
    if (
      minuend == '' ||
      minuend == null ||
      subtrahend == '' ||
      subtrahend == null
    ) {
      console.log('input bitte');
    }
    if (Number(minuend) < Number(subtrahend)) {
      console.log('Oben muss größer als unten sein');
    }
    console.log(minuend, subtrahend);
  }
  render() {
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
  }
}

export default InputOwnNumbers;
