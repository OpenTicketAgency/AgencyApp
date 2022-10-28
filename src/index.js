"use strict";

const OpenTicketAgency = require("./OpenTicketAgency.js");

const Craft = require("@craftkit/craft-uikit");
window.Craft = Craft;

module.exports = OpenTicketAgency.default || OpenTicketAgency;
