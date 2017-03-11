/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */
import chai from "chai";
let expect = chai.expect;

import Source from "../src/Source";


describe("Source", function () {
  const urls = {
    "twitter": "https://twitter.com/RedeGlobo/status/840532910696361984"
  };

  it("should have an URL prop", function () {
    const source = new Source(urls.twitter);
    expect(source.url).to.be.equal(urls.twitter);
  });

  it("should have an empty sources prop", function () {
    const source = new Source(urls.twitter);
    expect(source.sources).to.be.deep.equal({});
  });

  it("should have a sources prop config", function () {
    const source = new Source(urls.twitter, ["twitter"]);
    expect(source.sources).to.have.all.keys("twitter");
  });

  it("should not be valid in URL validation", function () {
    const source = new Source("ashio", Object.keys(urls));
    expect(source.isValid()).to.be.false;
  });

  it("should not be valid in source parse", function () {
    const url = "https://twitter.com/RedeGlobo/12/";
    const source = new Source(url, Object.keys(urls));
    expect(source.isValid()).to.be.false;
  });

  it("should not be valid if source not supported", function () {
    const source = new Source(urls.twitter, []);
    expect(source.isValid()).to.be.false;
  });

  it("should be valid", function () {
    const source = new Source(urls.twitter, Object.keys(urls));
    expect(source.isValid()).to.be.true;
  });

  it("should have a valid id", function () {
    const source = new Source(urls.twitter, Object.keys(urls));
    source.isValid();
    expect(source.id).to.be.equal("840532910696361984");
  });

  it("should have a valid name", function () {
    const source = new Source(urls.twitter, Object.keys(urls));
    source.isValid();
    expect(source.name).to.be.equal("twitter");
  });

  it("should have a valid config", function () {
    const source = new Source(urls.twitter, Object.keys(urls));
    source.isValid();
    expect(source.config).to.be.an("object");
  });

});
