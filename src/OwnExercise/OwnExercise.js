import React from 'react';
import { withRouter } from 'react-router-dom';
//import Speechbubble from '../shared/Speechbubble';
import InputOwnNumbers from './InputOwnNumbers';
import PropTypes from 'prop-types';

class OwnExercise extends React.Component {
  returnExercise(minuend, subtrahend) {
    this.props.returnEx(minuend, subtrahend);
  }

  render() {
    console.log('hello');

    return (
      <div>
        {/* <Speechbubble
          text="Gib hier die Zahlen für deine eigene Aufgabe ein. Achte darauf, dass die obere Zahl größer ist als die untere."
          analogy={false}
        /> */}
        <InputOwnNumbers
          submit={(min, sub) => this.returnExercise(min, sub)}
        />
      </div>
    );
  }
}

OwnExercise.propTypes = {
  returnEx: PropTypes.func,
};
export default withRouter(OwnExercise);
