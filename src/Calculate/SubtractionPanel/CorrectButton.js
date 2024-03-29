import React from 'react';
import PropTypes from 'prop-types';

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
class CorrectButton extends React.Component {
  render() {
    let className = this.props.className;

    return (
      <button className={className} onClick={this.props.onClick}>
        {/**FIXE: Wie kann man svg skalieren mit der Größe? */}
        <svg
          viewBox="0 0 71 71"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <line
            x1="12.6673"
            y1="35.9767"
            x2="27.91"
            y2="49.7936"
            stroke="var(--light-blue)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <line
            x1="62.9747"
            y1="26.8035"
            x2="29.9588"
            y2="51.1372"
            stroke="var(--light-blue)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }
}

CorrectButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export default CorrectButton;
