import React from 'react';
import subkraki from '../resources/Subkraki.png';
import PropTypes from 'prop-types';

class Subkraki extends React.Component {

  /**
   * @returns a extremly cute octopus with the name Subkraki
   * a brave and helpful companion, with the ultimative goal to educate kids
   * If you poke him on the head, he will slap you 16 times, 2 times for each arm.
   *
                                                  ,
                                                ,o
                                                :o
                      _....._                  `:o
                    .'       ``-.                \o
                    /  _      _   \                \o
                  :  /*\    /*\   )                ;o
                  |  \_/    \_/   /                ;o
                  (       U      /                 ;o
                    \  (\_____/) /                  /o
                    \   \_m_/  (                  /o
                      \         (                ,o:
                      )          \,           .o;o'           ,o'o'o.
                    ./          /\o;o,,,,,;o;o;''         _,-o,-'''-o:o.
    .             ./o./)        \    'o'o'o''         _,-'o,o'         o
    o           ./o./ /       .o \.              __,-o o,o'
    \o.       ,/o /  /o/)     | o o'-..____,,-o'o o_o-'
    `o:o...-o,o-' ,o,/ |     \   'o.o_o_o_o,o--''
    .,  ``o-o'  ,.oo/   'o /\.o`.
    `o`o-....o'o,-'   /o /   \o \.                       ,o..         o
      ``o-o.o--      /o /      \o.o--..          ,,,o-o'o.--o:o:o,,..:o
                    (oo(          `--o.o`o---o'o'o,o,-'''        o'o'o
                      \ o\              ``-o-o''''
      ,-o;o           \o \
      /o/               )o )
    (o(               /o /                
      \o\.       ...-o'o /             
        \o`o`-o'o o,o,--'       
          ```o--'''                       
   */
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
