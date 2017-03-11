/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";

import {MegadraftPlugin, MegadraftIcons} from "megadraft";


const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;


export default class Block extends Component {
  constructor(props) {
    super(props);

    this._handleEdit = ::this._handleEdit;

    this.actions = [
      {"key": "edit", "icon": MegadraftIcons.EditIcon, "action": this._handleEdit},
      {"key": "delete", "icon": MegadraftIcons.DeleteIcon, "action": this.props.container.remove}
    ];

    this.state = {
      url: ""
    };
  }

  _handleEdit() {
    alert(JSON.stringify(this.props.data, null, 4));
  }

  _embed(e) {
    this.setState({
      url: this.state.url
    });
  }

  _renderEmbed() {
    if (this.state.url) {
      return (
        <iframe
          src={this.state.url}
          width="560"
          height="315"></iframe>
      );
    }
  }

  render(){
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          {this._renderEmbed()}
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder='URL'
            value={(this.state.url) ? this.state.url : null} />
        </BlockData>

        <BlockData>
          <button onClick={this._embed.bind(this)}>Embed</button>
        </BlockData>
      </CommonBlock>
    );
  }
}
