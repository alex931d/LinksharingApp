"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaurlIsValid = void 0;

var _require = require('./mediaPlatform.js'),
    MEDIAPLATFORMS = _require.MEDIAPLATFORMS;

var generateMatchExp = function generateMatchExp(platform) {
  switch (platform) {
    case MEDIAPLATFORMS.YOUTUBE:
      return 'https://www.youtube.com/embed/';

    case MEDIAPLATFORMS.FACEBOOK:
      return 'https://www.facebook.com/plugins/';

    case MEDIAPLATFORMS.VIMEO:
      return 'https://player.vimeo.com/video/';

    default:
      return '';
  }
};

var MediaurlIsValid = function MediaurlIsValid(url, platform) {
  var matchExp = generateMatchExp(platform);
  var trimmedUrl = url.trim();
  var startsWithMatch = trimmedUrl.startsWith(matchExp);
  var urlPattern = /^https?:\/\/[^\s]+$/;
  var regexMatch = urlPattern.test(trimmedUrl);
  return startsWithMatch && regexMatch;
};

exports.MediaurlIsValid = MediaurlIsValid;