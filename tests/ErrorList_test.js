/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React from "react";
import TestUtils from "react-addons-test-utils";
import chai from "chai";

import ErrorList from "../src/ErrorList";

let expect = chai.expect;


describe("ErrorList", function () {
  beforeEach(function () {
    this.data = {
      errors: [
        "Invalid name",
        "Invalid date"
      ]
    };

    this.errorList = TestUtils.renderIntoDocument(
      <ErrorList errors={this.data.errors} />
    );

    this.errors = TestUtils.scryRenderedDOMComponentsWithTag(this.errorList, "li");
  });

  it("should render nothing", function () {
    const errors = TestUtils.renderIntoDocument(
      <ErrorList />
    );
    expect(errors.textContent).to.be.empty;
    expect(errors.children).to.be.empty;
  });

  it("should render messages", function () {
    expect(this.errors).to.have.lengthOf(2);
    expect(this.errors[0].textContent).to.be.equal("Invalid name");
    expect(this.errors[1].textContent).to.be.equal("Invalid date");
  });
});
