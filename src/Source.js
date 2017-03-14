/*
 * Source
 * Parse entries to get a valid source media.
 * License: MIT
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 */

import validUrl from "valid-url";
import jsonp from "jsonp";
import constants from "./constants";


class Source {

  constructor(url, sources) {
    this.url = url;
    this.sources = {};
    this.id = null;
    this.name = null;
    this.config = {};
    this.setSources(sources);
  }

  setSources(sources) {
    if (!sources) {
      return;
    }
    sources.map((source) => {
      if (constants.SUPPORTED_SOURCES.hasOwnProperty(source)) {
        this.sources[source] = constants.SUPPORTED_SOURCES[source];
      }
    });
  }

  sourceParse() {
    for (let source in this.sources) {
      let config = this.sources[source];
      const match = config.pattern.exec(this.url);
      if (match && match.length === 2) {
        this.id = match[1];
        this.name = source;
        this.config = config;
        return;
      }
    }
    throw "Invalid media source";
  }

  isValid() {
    // Validate URL
    if (!validUrl.isUri(this.url)) {
      return false;
    }
    // Find source
    try {
      this.sourceParse();
      return true;
    } catch (e) {
      return false;
    }
  }

  load(callback) {
    if (!this.isValid()) {
      callback(true, null);
      return;
    }
    switch (this.config.fetch.type) {
      case "oembed":
        this.loadOembed(callback);
        break;
      default:
        callback(null, { url: this.url });
    }
  }

  loadOembed(callback) {
    let endPointUrl = this.config.fetch.endPoint + this.url;
    jsonp(endPointUrl, callback);
  }
}


export default Source;
