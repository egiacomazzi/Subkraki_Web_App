import React from 'react';
import '../CSS/Subkraki.css';
import subkraki from '../data/Subkraki.png';
import PropTypes from 'prop-types';

class Subkraki extends React.Component {
  render() {
    const bigSubkrakiStyle = {
      height: 'auto',
    };
    const smallSubkrakiStyle = {
      width: '10vw',
      height: 'auto',
    };

    var subKrakiStyle;
    if (this.props.size == 'small') {
      subKrakiStyle = smallSubkrakiStyle;
    } else {
      subKrakiStyle = bigSubkrakiStyle;
    }

    return (
      <div className="Subkraki">
        <img src={subkraki} style={subKrakiStyle} />
      </div>
    );
  }
}
Subkraki.propTypes = {
  size: PropTypes.string,
};
export default Subkraki;
