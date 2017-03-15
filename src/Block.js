/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";
import {MegadraftPlugin, MegadraftIcons} from "megadraft";
import {convertFromHTML, ContentState, convertToRaw} from "draft-js";
const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;

import Button from "./components/Button";
import Media from "./Media";
import Source from "./Source";
import ErrorList from "./ErrorList";


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
        url: (props.data.url) ? props.data.url : "",
        errors: []
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
      url: this.state.url,
      input: {
        url: this.state.input.url,
        errors: []
      }
    };

    const source = new Source(data.input.url, ["twitter"]);
    source.load((err, media) => {
      if (err) {
        data.url = "";
        data.input.errors = [ "Invalid media source" ];
        this.setState(data);
        return;
      }

      // let bodyData = this.getBodyData(media.html);

      data.url = this.state.input.url;
      this.setState(data);
      this.props.container.updateData(data);
    });
  }

  getBodyData(html) {
    let bodyData = convertFromHTML(html);
    return convertToRaw(ContentState.createFromBlockArray(bodyData));
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
          <ErrorList errors={this.state.input.errors} />
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
