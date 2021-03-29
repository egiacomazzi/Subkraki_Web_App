import React from 'react';
import SpeechbubbleControlls from '../../shared/Speechbubble/SpeechbubbleControls.js';
import '../../CSS/AnalogyPanel.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
class AnalogyPanel extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * @returns the rendered Analogypanel
   */
  render() {
    return (
      <div className="analogy">
        <SpeechbubbleControlls
          text={this.props.text}
          nextText={this.props.nextText}
          lastText={this.props.lastText}
          beginning={this.props.beginning}
          end={this.props.end}
          analogy={true}
          sub={this.props.sub}
          min={this.props.min}
          res={this.props.res}
          cor={this.props.cor}
          min_cor={this.props.min_cor}
          highlighting={this.props.highlighting}
          subpanel_visibility={this.props.subpanel_visibility}
          close_func={this.props.close_func}
        />
      </div>
    );
  }
}

export default withRouter(AnalogyPanel);
AnalogyPanel.propTypes = {
  text: PropTypes.string,
  nextText: PropTypes.func,
  lastText: PropTypes.func,
  beginning: PropTypes.bool,
  end: PropTypes.bool,
  sub: PropTypes.string,
  min: PropTypes.string,
  res: PropTypes.array,
  cor: PropTypes.array,
  min_cor: PropTypes.array,
  highlighting: PropTypes.array,
  subpanel_visibility: PropTypes.string,
  close_func: PropTypes.func,
};
