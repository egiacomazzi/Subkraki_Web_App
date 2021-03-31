import React from "react";
import "../CSS/Impressum.css";

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
class Impressum extends React.Component {
  /**
   * @returns An Impressum link at the bottom left corner
   */
  render() {
    return (
      <div className="impressum">
        <a href="https://www.uni-bamberg.de/en/cogsys/">Impressum</a>
      </div>
    );
  }
}

export default Impressum;
