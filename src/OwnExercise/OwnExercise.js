import React from 'react';
import { withRouter } from 'react-router-dom';
import Speechbubble from '../shared/Speechbubble';
import InputOwnNumbers from './InputOwnNumbers';

//import PropTypes from 'prop-types';

class OwnExercise extends React.Component {
  render() {
    console.log('hello');

    return (
      <div>
        <Speechbubble
          text="Gib hier die Zahlen für deine eigene Aufgabe ein. Achte darauf, dass die obere Zahl größer ist als die untere."
          analogy={false}
        />
        <InputOwnNumbers />
      </div>
    );
  }
}
export default withRouter(OwnExercise);
