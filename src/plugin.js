/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import {MegadraftIcons} from "megadraft";

import Button from "./Button";
import Block from "./Block";
import constants from "./constants";


export default {
  type: constants.PLUGIN_TYPE,
  buttonComponent: Button,
  blockComponent: Block,
  options: {
    defaultDisplay: "",
    displayOptions: []
  }
};
