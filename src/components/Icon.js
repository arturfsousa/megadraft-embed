import React, {Component} from "react";

import classNames from "classnames";

export default class Icon extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let cssClasses = classNames(
      "md-embed-icon",
      `md-embed-icon--${this.props.type}`,
      { "md-embed-icon--selected": this.props.active }
    );

    return (
      <i className={cssClasses} onClick={this.props.onClick} />
    );
  }
}
