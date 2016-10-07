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

    this.sources = [
      "facebook",
      "instagram",
      "twitter",
      "youtube",
      "playbuzz"
    ];

    this.state = {
      url: "",
      sourceType: "facebook",
      form: {
        url: ""
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sourceType === "facebook") {
      window.fbAsyncInit = function() {
        FB.init({
          xfbml: true,
          version: "v2.8"
        });
        window.FB = FB;
        window.FB.XFBML.parse();
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, "script", "facebook-jssdk"));

      if (window.FB) {
        window.FB.XFBML.parse();
      }
    }
  }

  _handleEdit() {
    alert(JSON.stringify(this.props.data, null, 4));
  }

  _onChangeForm(field, e) {
    let form = this.state.form;
    form[field] = e.target.value;

    this.setState({ form: form });
  }

  _setSourceType(sourceType, e) {
    this.setState({ sourceType: sourceType });
  }

  _embed(e) {
    this.setState({
      url: this.state.form.url
    });
  }

  _renderSources() {
    return this.sources.map((sourceType, index) => {
      return (
        <Icon
          key={index}
          type={sourceType}
          onClick={this._setSourceType.bind(this, sourceType)}
          active={sourceType === this.state.sourceType} />
      );
    });
  }

  _renderEmbed() {
    if (!this.state.url) {
      return null;
    }

    switch (this.state.sourceType) {
      case "youtube":
        return this._renderYoutube();
      case "facebook":
        return this._renderFacebook();
    }
  }

  _renderYoutube() {
    return (
      <div className="md-embed__media">
        <iframe className="md-embed__media__iframe"
          src={this.state.url}></iframe>
      </div>
    );
  }

  _renderFacebook() {
    return (
      <div className="md-embed__media">
        <div
          className="fb-post"
          data-href={this.state.url}
          data-width="500"></div>
      </div>
    );
  }

  render(){
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockData>
          {this._renderSources()}
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
