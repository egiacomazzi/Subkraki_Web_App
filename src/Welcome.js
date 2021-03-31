import React from "react";
import "./CSS/Welcome.css";
import Subkraki from "./shared/Subkraki.js";
import SpeechbubbleControlls from "./shared/Speechbubble/SpeechbubbleControls.js";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import welcomeTexts from "./resources/welcomeTexts.json";

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introTextIndex: 0,
    };
    this.text = {
      intro: welcomeTexts.welcome[0],
    };
  }

  /**
   * Gets triggered by clicking the left arrow the Speechbubble,
   * and updates the texts for the Speechbubble
   */
  lastText() {
    if (this.state.introTextIndex === 0) {
      return;
    }
    this.setState({
      introTextIndex: this.state.introTextIndex - 1,
    });
  }

  /**
   * Gets triggered by clicking the right arrow the Speechbubble,
   * * and updates the texts for the Speechbubble
   */
  nextText() {
    this.setState({
      introTextIndex: this.state.introTextIndex + 1,
    });
  }

  /**
   * Ends the welcome page for the calculation page
   */
  endWelcome() {
    this.props.history.push("/rechnen");
  }

  /**
   * @returns The rendered Welcome component
   */
  render() {
    return (
      <div className="welcome">
        <SpeechbubbleControlls
          text={this.text.intro[this.state.introTextIndex]}
          nextText={
            this.state.introTextIndex ===
            Object.keys(this.text.intro).length - 1
              ? () => this.endWelcome()
              : () => this.nextText()
          }
          lastText={() => this.lastText()}
          beginning={this.state.introTextIndex === 0 ? true : false}
          end={false}
          analogy={false}
          subpanel_visibility={false}
        />
        <Subkraki />
      </div>
    );
  }
}

export default withRouter(Welcome);
Welcome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
