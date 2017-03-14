/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";


export default class Media extends Component {
  render(){
    if (!this.props.url) {
      return null;
    }
    return (
      <iframe
        className='media'
        src={this.props.url}
        width="560"
        height="315"></iframe>
    );
  }
}
