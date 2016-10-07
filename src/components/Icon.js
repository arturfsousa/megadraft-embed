import React, {Component} from "react";

export default class Icon extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <i className={`md-embed-icon md-embed-icon--${this.props.type}`} />
    );
  }
}
