import React from 'react';
import PropTypes from 'prop-types';

class RefreshButton extends React.Component {
  render() {
    let className = this.props.className;
    return (
      <button className={className} onClick={this.props.onClick}>
        {/**FIXE: Wie kann man svg skalieren mit der Größe? */}
        <svg
          viewBox="0 0 71 71"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              stroke="#A8D0E6"
              fill="#A8D0E6"
              d="m35.5 7.999c-5.405 0-10.444 1.577-14.699 4.282l-5.75-5.75v16.11h16.11l-6.395-6.395c3.18-1.787 6.834-2.82 10.734-2.82 12.171 0 22.073 9.902 22.073 22.074 0 2.899-0.577 5.664-1.599 8.202l4.738 2.762c1.47-3.363 2.288-7.068 2.288-10.964 0-15.164-12.337-27.501-27.5-27.501z"
            />
            <path
              stroke="#A8D0E6"
              fill="#A8D0E6"
              d="m46.227 54.746c-3.179 1.786-6.826 2.827-10.726 2.827-12.171 0-22.073-9.902-22.073-22.073 0-2.739 0.524-5.35 1.439-7.771l-4.731-2.851c-1.375 3.271-2.136 6.858-2.136 10.622 0 15.164 12.336 27.5 27.5 27.5 5.406 0 10.434-1.584 14.691-4.289l5.758 5.759v-16.112h-16.111l6.389 6.388z"
            />
          </g>
        </svg>
      </button>
    );
  }
}
RefreshButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export default RefreshButton;
