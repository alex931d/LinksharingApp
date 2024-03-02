"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateBackgroundColor = exports.MEDIAPLATFORMS = void 0;
var MEDIAPLATFORMS = {
  VIMEO: 'Vimeo',
  YOUTUBE: 'Youtube',
  FACEBOOK: 'Facebook'
};
exports.MEDIAPLATFORMS = MEDIAPLATFORMS;

var generateBackgroundColor = function generateBackgroundColor(platform) {
  switch (platform) {
    case 'VIMEO':
      return '#19b7ea';

    case 'YOUTUBE':
      return '#EE3939';

    case 'FACEBOOK':
      return '#2442AC';

    default:
      return 'var(--light-purple)';
  }
};

exports.generateBackgroundColor = generateBackgroundColor;