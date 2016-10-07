/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";

import {MegadraftPlugin, MegadraftIcons} from "megadraft";

import validUrl from "valid-url";

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
      "playbuzz",
      "map"
    ];

    this.state = {
      url: "",
      sourceType: "facebook",
      errors: [],
      twitId: null,
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

    if (this.state.sourceType === "twitter") {
      if (this.state.twitId && prevState.twitId != this.state.twitId) {
        window.twttr.widgets.createTweet(
          this.state.twitId,
          document.getElementById(`twit-${this.state.twitId}`)
        );
      }  else if (document.getElementById(`twit-${this.state.twitId}`)) {
        document.getElementById(`twit-${this.state.twitId}`).innerHTML = "";
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
    this.setState({ sourceType: sourceType, url: "" });
  }

  _embed(e) {
    let data = this._getValidatedData();

    this.setState({
      url: data.url,
      twitId: data.twitId
    });
  }

  _getValidatedData() {
    let url = this.state.form.url;
    let errors = [];

    url = url.trim();

    if (!validUrl.isUri(url)) {
      errors.push("Invalid URL");
    }

    let twitId = null;
    if (this.state.sourceType === "twitter") {
      var re = /\/(\d+)/;
      var matches = url.match(re);
      if (matches && matches.length >= 2) {
        twitId = matches[1];
      } else {
        errors.push("Invalid Twitter URL");
      }
    }

    this.setState({ errors: errors });

    return {
      url: url,
      twitId: twitId
    };
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
      case "playbuzz":
        return this._renderPlayBuzz();
      case "instagram":
        return this._renderInstagram();
      case "twitter":
        return this._renderTwitter();
      case "map":
        return this._renderMap();
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

  _renderPlayBuzz() {
    return (
      <div className="md-embed__media">
        <div className="pb_feed"
          data-game={this.state.url}
          data-recommend="false"
          data-game-info="false"
          data-comments="false"
          data-shares="false">
        </div>
      </div>
    );
  }

  _renderInstagram() {
    return (
      <div className="md-embed__media">
        <iframe className="md-embed__media__iframe"
          src={this.state.url + "/embed/"}></iframe>
      </div>
    );
  }

  _renderTwitter() {
    return (
      <div className="md-embed__media">
        <div id={`twit-${this.state.twitId}`}></div>
      </div>
    );
  }

  _renderMap() {
    return (
      <div className="md-embed__media">
        <iframe src="http://www.google.com/maps/embed/v1/place?q=Harrods,Brompton%20Rd,%20UK&zoom=17&key=AIzaSyCQNjrqDS3NHGmQJGHmTH39qWkuTwAZV48"></iframe>
      </div>
    );
  }

  _renderErrors() {
    if (this.state.errors.length) {
      return (
        <ul className="md-embed-errors">
        {this.state.errors.map((error, index) => {
          return (
            <li key={index}>{error}</li>
          );
        })}
        </ul>
      );
    }
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
          {this._renderErrors()}
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
