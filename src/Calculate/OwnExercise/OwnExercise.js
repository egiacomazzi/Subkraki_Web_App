import React from 'react';
import { withRouter } from 'react-router-dom';
import InputOwnNumbers from './InputOwnNumbers.js';
import Subkraki from '../../shared/Subkraki.js';
import '../../CSS/OwnExercise.css';
import PropTypes from 'prop-types';

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
class OwnExercise extends React.Component {

  /**
   * Gets minuend and subtrahend from InputOwnNumbers.js and
   * submits it to Calculate.js
   * @param {int} minuend   Minuend of the own exercise
   * @param {int} subtrahend    Subtrahend of the own exercise
   */
  returnExercise(minuend, subtrahend) {
    this.props.returnEx(minuend, subtrahend);
  }

  render() {
    return (
      <div className="ownEx">
        {/* <Speechbubble
          text="Gib hier die Zahlen für deine eigene Aufgabe ein. Achte darauf, dass die obere Zahl größer ist als die untere."
          analogy={false}
        /> */}
        <InputOwnNumbers
          submit={(min, sub) => this.returnExercise(min, sub)}
          close_func={this.props.close_func}
        />
        <Subkraki />
      </div>
    );
  }
}

OwnExercise.propTypes = {
  returnEx: PropTypes.func,
  close_func: PropTypes.func,
};
export default withRouter(OwnExercise);
