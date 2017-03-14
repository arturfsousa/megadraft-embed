/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React from "react";
import TestUtils from "react-addons-test-utils";
import chai from "chai";

import Media from "../src/Media";

let expect = chai.expect;


describe("Media", function () {
  beforeEach(function () {
    this.data = {
      url: "https://twitter.com/RedeGlobo/status/840532910696361984"
    };

    this.media = TestUtils.renderIntoDocument(
      <Media url={this.data.url} />
    );

    this.iframe = TestUtils.findRenderedDOMComponentWithClass(this.media, "media");
  });

  it("should have a URL src from props", function () {
    expect(this.iframe.src).to.equal(this.data.url);
  });

  it("should render nothing", function () {
    const media = TestUtils.renderIntoDocument(
      <Media />
    );
    expect(media.textContent).to.be.empty;
    expect(media.children).to.be.empty;
  });
});
