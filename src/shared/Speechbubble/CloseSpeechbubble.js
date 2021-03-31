import React from "react";
import "../../CSS/CloseSpeechbubble.css";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
class CloseSpeechbubble extends React.Component {
  /**
   * Closes the Speechbubble and navigates to...
   * '/rechnen/' if we were on the welcome-page or...
   * just closes Speechbubble
   **/
  close() {
    if (this.props.location.pathname === "/")
      this.props.history.push("/rechnen");
    else this.props.close_func();
  }

  render() {
    const colour = "var(--primary-lila)";
    return (
      <div className="CloseSpeech">
        <button className="buttonClose" onClick={() => this.close()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 42 42">
            <line
              x1="12.5"
              y1="12.5"
              x2="27.5"
              y2="27.5"
              stroke={colour}
              strokeWidth="3"
              strokeLinecap="round"
              strokeMiterlimit="10"
            ></line>
            <line
              x1="27.5"
              y1="12.5"
              x2="12.5"
              y2="27.5"
              stroke={colour}
              strokeWidth="3"
              strokeLinecap="round"
              strokeMiterlimit="10"
            ></line>
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
  ownEx: PropTypes.func,
};
