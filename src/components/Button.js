import React, {Component} from "react";

export default class Button extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="md-embed-button md-embed-button--blue  md-embed-button--small" type="button" onClick={this.props.onClick}>
        {this.props.label}
      </button>
    );
  }
}
