"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePlatformIcon = void 0;

var GitHubIcon = require("../../images/GitHubIcon");

var FreeCodeCampIcon = require("../../images/FreeCodeCampIcon");

var _require = require("../lib/platform"),
    PLATFORMS = _require.PLATFORMS;

var generatePlatformIcon = function generatePlatformIcon(platform) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  switch (platform) {
    case PLATFORMS.GITHUB:
      return GitHubIcon({
        color: color
      });

    case PLATFORMS.FREE_CODE_CAMP:
      return FreeCodeCampIcon({
        color: color
      });

    default:
      return null;
  }
};

exports.generatePlatformIcon = generatePlatformIcon;