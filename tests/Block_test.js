/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React from "react";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import sinon from "sinon";
import {MegadraftIcons} from "megadraft";

import Block from "../src/Block";
import Source from "../src/Source";

let expect = chai.expect;


describe("Block", function () {
  beforeEach(function () {
    this.data = {
      url: "https://twitter.com/RedeGlobo/status/840532910696361984"
    };

    this.input = {
      url: "https://twitter.com/RedeGlobo/status/840927628819288064"
    };

    this.updateData = sinon.spy();
    this.remove = sinon.spy();
    this.plugin = sinon.spy();
    this.loadOembed = sinon.stub(Source.prototype, "loadOembed").yields(null, {
      "some": "data"
    });

    this.block = TestUtils.renderIntoDocument(
      <Block container={this} blockProps={this} data={this.data} />
    );

    this.inputElement = TestUtils.scryRenderedDOMComponentsWithTag(this.block, "input")[0];
    this.buttonElement = TestUtils.scryRenderedDOMComponentsWithTag(this.block, "button")[0];
  });

  afterEach(function () {
    this.loadOembed.restore();
  });

  it("should have a delete action", function () {
    expect(this.block.actions).to.have.lengthOf(1);
    expect(this.block.actions).to.deep.equal([{
      "key": "delete",
      "icon": MegadraftIcons.DeleteIcon,
      "action": this.block.props.container.remove
    }]);
  });

  it("should load data from props", function () {
    expect(this.inputElement.value).to.be.equal(this.data.url);
  });

  it("should have a button with an Embed label", function () {
    expect(this.buttonElement.textContent).to.be.equal("Embed");
  });

  it("should update data from input without changing the main state value", function () {
    this.inputElement.value = this.input.url;
    TestUtils.Simulate.change(this.inputElement);
    expect(this.block.state.input.url).to.be.equal(this.input.url);
  });

  it("should update main state on button click", function () {
    this.inputElement.value = this.input.url;
    TestUtils.Simulate.change(this.inputElement);
    TestUtils.Simulate.click(this.buttonElement);
    expect(this.block.state.url).to.be.equal(this.input.url);
    expect(this.updateData.calledWith({
      url: this.input.url,
      input: {
        url: this.input.url,
        errors: []
      }
    })).to.be.true;
    expect(this.loadOembed.called).to.be.true;
  });

  it("should render a media component", function () {
    this.inputElement.value = this.input.url;
    TestUtils.Simulate.change(this.inputElement);
    TestUtils.Simulate.click(this.buttonElement);
    let media = TestUtils.findRenderedDOMComponentWithClass(this.block, "media");
    expect(media.src).to.be.equal(this.input.url);
  });

  it("should have no errors by default", function () {
    let errors = TestUtils.scryRenderedDOMComponentsWithClass(this.block, "md-embed-errors");
    expect(errors).to.be.empty;
  });

  it("should render errors for invalid sources", function () {
    const url = "https://some-invalid-url";
    this.inputElement.value = url;
    TestUtils.Simulate.change(this.inputElement);
    TestUtils.Simulate.click(this.buttonElement);

    let errors = TestUtils.findRenderedDOMComponentWithClass(this.block, "md-embed-errors");
    expect(errors.children).to.have.lengthOf(1);
    expect(errors.children[0].textContent).to.be.equal("Invalid media source");
  });

  it("should clean the main state for invalid sources", function () {
    const url = "https://some-invalid-url";
    this.inputElement.value = url;
    TestUtils.Simulate.change(this.inputElement);
    TestUtils.Simulate.click(this.buttonElement);
    expect(this.block.state.url).to.be.empty;
  });
});
