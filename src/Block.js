/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";
import {MegadraftPlugin, MegadraftIcons} from "megadraft";
const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;

import Button from "./components/Button";
import Media from "./media";


export default class Block extends Component {
  constructor(props) {
    super(props);

    this._onChangeInput = ::this._onChangeInput;
    this.embed = ::this.embed;

    this.actions = [
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

  _onChangeInput(field, e) {
    let input = this.state.input;
    input[field] = e.target.value;
    this.setState({ input: input });
  }

  embed(e) {
    let data = {
      url: this.state.input.url
    };
    this.setState(data);
    this.props.container.updateData(data);
  }

  render(){
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          <Media url={this.state.url} />
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder='URL'
            value={(this.state.url) ? this.state.url : null}
            onChange={this._onChangeInput.bind(this, "url")} />
        </BlockData>

        <BlockData>
          <Button
            label='Embed'
            onClick={this.embed.bind(this)} />
        </BlockData>
      </CommonBlock>
    );
  }
}
