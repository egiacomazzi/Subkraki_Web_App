import React from "react";
import PropTypes from "prop-types";
import SubtractionPanel from "./SubtractionPanel/SubtractionPanel.js";
import AnalogyPanel from "./Analogy/AnalogyPanel.js";
import { withRouter } from "react-router-dom";
import "../CSS/Calculate.css";
import Subkraki from "../shared/Subkraki";
import OwnExercise from "./OwnExercise/OwnExercise.js";
import { getText } from "./Analogy/AnalogyExplanation.js";

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
class Calculate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "error1",
      analogyTextIndex: 0,
      display: false,
      correct: null,
      ownExerciseDisplay: false,
      rend: 0,
    };
    this.openOwnExercise = this.openOwnExercise.bind(this);
    this.createRandomExercise = this.createRandomExercise.bind(this);
    this.hideAnalogyPanel = this.hideAnalogyPanel.bind(this);

    this.subtractionRef = React.createRef();

    // Diese Arrays anpassen um Schritt für Schritt die Analogie durchzurechnen
    // Bei 3 Stellen: 0: hunderter, 1: zehner 2: einer
    this.curAnalogyResult = []; // String array | NaN = leeres Feld
    this.curAnalogyCorrection = []; // String array | NaN = leeres Feld
    this.curAnalogyMinuendCor = []; // Bool array | false = nicht durchgestrichen

    this.analogySubPanelVisibility = "hidden";

    this.refresh = false;

    this.analogy = {
      min: [],
      sub: [],
      res: [],
      cor: [],
    };
    this.diagnosis = {
      column: null,
      correct: null,
      correct_val: [],
      error: [],
      spec_error: [],
    };

    this.minuend = "";
    this.subtrahend = "";
    this.beginningAnalogy = true;
    this.endAnalogy = false;
    this.einerIndex = null;
    this.zehnerIndex = null;
    this.hunderterIndex = null;

    this.styling = [0, 0, 0];
  }

  /**
   * Changes the variables for the AnalogyPanel
   * if the left arrow was clicked in SpeechbubbleControls
   */
  lastText() {
    if (this.state.analogyTextIndex === 0) {
      return;
    }
    if (this.endAnalogy) {
      this.endAnalogy = false;
    }
    this.setState({
      analogyTextIndex: this.state.analogyTextIndex - 1,
    });
  }

  /**
   * Changes the variables for the AnalogyPanel
   * if the right arrow was clicked in SpeechbubbleControls
   */
  nextText() {
    if (this.endAnalogy) {
      return;
    }
    this.setState({
      analogyTextIndex: this.state.analogyTextIndex + 1,
    });
  }

  /**
   * Sets necessary variables and returns the text for the AnalogyPanel
   * @returns the text for the AnalogyPanel
   */
  returnText() {
    var jsonObj = getText(
      this.analogy,
      this.state.analogyTextIndex,
      this.state.correct,
      this.beginningAnalogy,
      this.endAnalogy,
      this.analogySubPanelVisibility
    );
    // set variables which were changed in getText to new value
    this.analogy = jsonObj.analogy;
    this.endAnalogy = jsonObj.endAnalogy;
    this.beginningAnalogy = jsonObj.beginningAnalogy;
    this.analogySubPanelVisibility = jsonObj.analogySubPanelVisibility;
    this.styling = jsonObj.styling;

    this.einerIndex = jsonObj.einerIndex;
    this.zehnerIndex = jsonObj.zehnerIndex;
    this.hunderterIndex = jsonObj.hunderterIndex;

    // updates analogypanel numbers and crosses
    this.curAnalogyMinuendCor[this.hunderterIndex] =
      jsonObj.updateCorrectionsAndResultObj.crossHunderter;
    this.curAnalogyMinuendCor[this.zehnerIndex] =
      jsonObj.updateCorrectionsAndResultObj.crossZehner;
    this.curAnalogyMinuendCor[this.einerIndex] =
      jsonObj.updateCorrectionsAndResultObj.crossEiner;

    this.curAnalogyCorrection[this.hunderterIndex] =
      jsonObj.updateCorrectionsAndResultObj.corHunderter == null
        ? NaN
        : jsonObj.updateCorrectionsAndResultObj.corHunderter;
    this.curAnalogyCorrection[this.zehnerIndex] =
      jsonObj.updateCorrectionsAndResultObj.corZehner == null
        ? NaN
        : jsonObj.updateCorrectionsAndResultObj.corZehner;
    this.curAnalogyCorrection[this.einerIndex] =
      jsonObj.updateCorrectionsAndResultObj.corEiner == null
        ? NaN
        : jsonObj.updateCorrectionsAndResultObj.corEiner;

    this.curAnalogyResult[this.hunderterIndex] =
      jsonObj.updateCorrectionsAndResultObj.resHunderter;
    this.curAnalogyResult[this.zehnerIndex] =
      jsonObj.updateCorrectionsAndResultObj.resZehner;
    this.curAnalogyResult[this.einerIndex] =
      jsonObj.updateCorrectionsAndResultObj.resEiner;

    return jsonObj.text;
  }

  /**
   * Called when the submit button is clicked,
   * gets the analogy and diagnosis for the submitted solution and
   * sets the variables for the AnalogyPanel accordingly
   */
  async submit() {
    let r = await this.subtractionRef.current.getAnalogyAndDiagnosis();
    if (typeof r === "undefined") return;

    let analogy = r.analogy;
    let diagnosis = r.diagnosis;
    console.log(analogy);
    console.log(diagnosis);

    // set analogy example:
    if (!diagnosis.correct) {
      this.analogy.min = analogy.minuend.map(String);
      this.analogy.sub = analogy.subtrahend.map(String);
      this.analogy.res = analogy.result.map(String);
      this.analogy.cor = analogy.correction.map(String);
      this.diagnosis.correct = diagnosis.correct;

      // Init analogy arrays
      this.curAnalogyResult = new Array(analogy.minuend.length);
      for (let i = 0; i < this.curAnalogyResult.length; i++)
        this.curAnalogyResult[i] = NaN;

      this.curAnalogyCorrection = new Array(analogy.correction.length);
      for (let i = 0; i < this.curAnalogyCorrection.length; i++)
        this.curAnalogyCorrection[i] = NaN;

      this.curAnalogyMinuendCor = new Array(analogy.subtrahend.length);
      for (let i = 0; i < this.curAnalogyMinuendCor.length; i++)
        this.curAnalogyMinuendCor[i] = false;
      this.setState({
        analogyTextIndex: 0,
      });
    }
    this.setState({
      correct: diagnosis.correct,
      display: true,
    });
  }

  /**
   * Creates a random exercise from 100 to 999
   */
  createRandomExercise() {
    this.minuend = Math.floor(100 + Math.random() * (999 - 100)).toString();
    this.subtrahend = Math.floor(
      1 + Math.random() * (this.minuend - 1)
    ).toString();

    if (this.subtractionRef.current != null)
      this.subtractionRef.current.reset(null);

    this.setState({
      rend: this.state.rend + 1,
    });
  }

  /**
   * Sets the variables for the user's exercise
   * @param {string} min: Minuend
   * @param {string} sub: Subtrahend
   */
  getOwnExercise(min, sub) {
    this.minuend = min;
    this.subtrahend = sub;

    if (this.subtractionRef.current != null)
      this.subtractionRef.current.refresh(null);

    this.setState({
      ownExerciseDisplay: false,
    });
  }

  /******** Control Components  *********/

  hideAnalogyPanel() {
    this.setState({ display: false });
  }
  openOwnExercise() {
    this.setState({
      ownExerciseDisplay: true,
    });
  }
  closeOwnExercise() {
    this.setState({
      ownExerciseDisplay: false,
    });
  }

  /**
   * @returns the rendered Calculate component
   */
  render() {
    // create a random exercise if there's no exercise
    if (this.minuend === "") this.createRandomExercise();

    if (this.state.display) {
      return (
        <div className="calculate">
          <SubtractionPanel
            ref={this.subtractionRef}
            minuend={this.minuend}
            subtrahend={this.subtrahend}
            submit={() => this.submit()}
            highlighting={[0, 0, 0]}
          />
          <AnalogyPanel
            error={this.props.error}
            text={this.returnText()}
            nextText={() => this.nextText()}
            lastText={() => this.lastText()}
            beginning={this.beginningAnalogy ? true : false}
            end={this.endAnalogy ? true : false}
            sub={String(this.analogy.sub).replace(/,/g, "")}
            min={String(this.analogy.min).replace(/,/g, "")}
            res={this.curAnalogyResult}
            cor={this.curAnalogyCorrection}
            min_cor={this.curAnalogyMinuendCor}
            highlighting={this.styling}
            subpanel_visibility={this.analogySubPanelVisibility}
            close_func={this.hideAnalogyPanel}
          />
          <Subkraki size="small" />
        </div>
      );
    } else if (this.state.ownExerciseDisplay) {
      return (
        <OwnExercise
          returnEx={(min, sub) => this.getOwnExercise(min, sub)}
          close_func={() => this.closeOwnExercise()}
        />
      );
    } else {
      return (
        <div className="calculate">
          <SubtractionPanel
            ref={this.subtractionRef}
            minuend={this.minuend}
            subtrahend={this.subtrahend}
            submit={() => this.submit()}
            highlighting={[0, 0, 0]}
          />
          <Subkraki />
          <div className="buttonContainer">
            <button
              className="ownExerciseButton"
              onClick={this.openOwnExercise}
            >
              Eigene Aufgabe
            </button>
            <button
              className="randomExerciseButton"
              onClick={this.createRandomExercise}
            >
              Neue Aufgabe
            </button>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Calculate);
Calculate.propTypes = {
  error: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
