import React from 'react';
import subkraki from '../data/Subkraki.png';
import PropTypes from 'prop-types';

class Subkraki extends React.Component {
  render() {
    let className = 'Subkraki';
    if (this.props.size == 'small') {
      className = className + '_small';
    }
    return (
      <div className={className}>
        <img src={subkraki} />
      </div>
    );
  }
}
Subkraki.propTypes = {
  size: PropTypes.string,
};
export default Subkraki;
