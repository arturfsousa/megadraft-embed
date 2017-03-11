/*
 * Source
 * Parse entries to get a valid source media.
 * License: MIT
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 */

import validUrl from "valid-url";
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
    throw "Invalid source";
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
}


export default Source;
