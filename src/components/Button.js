import React, {Component} from "react";

export default class Button extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="mg-embed-button mg-embed-button--blue  mg-embed-button--small" type="button" onClick={this.props.onClick}>
        {this.props.label}
      </button>
    );
  }
}
