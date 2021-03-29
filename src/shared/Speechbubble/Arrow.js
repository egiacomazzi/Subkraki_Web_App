import React from 'react';
import PropTypes from 'prop-types';

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
class Arrow extends React.Component {

  /**
   * @returns a rendered Arrow
   */
  render() {
    const arrowDirection =
      this.props.class === 'left' ? { transform: 'scaleX(-1)' } : {};

    return (
      <button
        className={this.props.class}
        onClick={this.props.onClick}
        style={arrowDirection}
      >
        <svg viewBox="0 0 984 351">
          <path
            d="M653.75 340.29C653.75 347.834 661.784 352.661 668.444 349.12L978.393 184.33C985.467 180.569 985.467 170.431 978.393 166.67L668.444 1.88023C661.784 -1.66102 653.75 3.16635 653.75 10.7099V56C653.75 61.5228 649.273 66 643.75 66H10C4.47715 66 0 70.4771 0 76V287C0 292.523 4.47713 297 9.99998 297H643.75C649.273 297 653.75 301.477 653.75 307V340.29Z"
            fill="var(--primary-lila)"
          />
        </svg>
      </button>
    );
  }
}

export default Arrow;
Arrow.propTypes = {
  class: PropTypes.string,
  onClick: PropTypes.func,
};
