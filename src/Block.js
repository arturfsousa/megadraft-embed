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
      {
        "key": "edit",
        "icon": MegadraftIcons.EditIcon,
        "action": this._handleEdit
      },
      {
        "key": "delete",
        "icon": MegadraftIcons.DeleteIcon,
        "action": this.props.container.remove
      }
    ];

    this.state = {
      url: (props.data.url) ? props.data.url : "",
      input: {
        url: (props.data.url) ? props.data.url : ""
      }
    };
  }

  _handleEdit() {
    alert(JSON.stringify(this.state, null, 4));
  }

  _onChangeInput(field, e) {
    let input = this.state.input;
    input[field] = e.target.value;
    this.setState({ input: input });
  }

  _embed(e) {
    this.setState({
      url: this.state.input.url
    });
    this.props.container.updateData({
      url: this.state.input.url
    });
  }

  _renderEmbed() {
    if (!this.state.url) {
      return;
    }

    return (
      <iframe
        src={this.state.url}
        width="560"
        height="315"></iframe>
    );
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
            value={(this.state.url) ? this.state.url : null}
            onChange={this._onChangeInput.bind(this, "url")} />
        </BlockData>

        <BlockData>
          <button onClick={this._embed.bind(this)}>Embed</button>
        </BlockData>
      </CommonBlock>
    );
  }
}
