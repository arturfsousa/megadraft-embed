/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";

import {MegadraftPlugin, MegadraftIcons} from "megadraft";

import Button from "components/Button";
import Icon from "components/Icon";

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
      url: "",
      form: {
        url: ""
      }
    };
  }

  _handleEdit() {
    alert(JSON.stringify(this.props.data, null, 4));
  }

  _onChangeForm(field, e) {
    let form = this.state.form;
    form[field] = e.target.value;

    this.setState({ form: form });
  }

  _embed(e) {
    this.setState({
      url: this.state.form.url
    });
  }

  _renderEmbed() {
    if (this.state.url) {
      return (
        <iframe
          src={this.state.url}
          width="100%"
          height="400"></iframe>
      );
    }
  }

  render(){
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockData>
          <Icon type="facebook" />
          <Icon type="instagram" />
          <Icon type="twitter" />
          <Icon type="youtube" />
          <Icon type="playbuzz" />
        </BlockData>

        <BlockData>
          <BlockInput
            placeholder="URL"
            value={(this.state.url) ? this.state.url : null}
            onChange={this._onChangeForm.bind(this, "url")} />
        </BlockData>

        <BlockData>
          <Button onClick={this._embed.bind(this)} label="Embed" />
        </BlockData>

        <BlockContent className="embed">
          {this._renderEmbed()}
        </BlockContent>
      </CommonBlock>
    );
  }
}
