import React from 'react';
import '../CSS/CloseSpeechbubble.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class CloseSpeechbubble extends React.Component {

  close() {
    if (this.props.location.pathname == '/') {
      this.props.history.push('/substractionpanel');
    } else {//if (this.props.location.pathname == '/substractionpanel') {
      this.props.close_func();
    }
  }

  render() {
    const colour = 'var(--primary-lila)';
    return (
      <div className="CloseSpeech">
        <button
          className="buttonClose"
          onClick={() => this.close()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            enableBackground="new 0 0 40 40"
            color="black"
          >
            <line
              x1="15"
              y1="15"
              x2="25"
              y2="25"
              stroke={colour}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeMiterlimit="10"
            ></line>
            <line
              x1="25"
              y1="15"
              x2="15"
              y2="25"
              stroke={colour}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeMiterlimit="10"
            ></line>
            <circle
              className="circle"
              cx="20"
              cy="20"
              r="19"
              opacity="0"
              stroke={colour}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeMiterlimit="10"
            ></circle>
            <path
              d="M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z"
              className="progress"
              stroke={colour}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeMiterlimit="10"
              fill="none"
            ></path>
          </svg>
        </button>
      </div>
    );
  }
}

export default withRouter(CloseSpeechbubble);
CloseSpeechbubble.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
  close_func: PropTypes.func,
};
