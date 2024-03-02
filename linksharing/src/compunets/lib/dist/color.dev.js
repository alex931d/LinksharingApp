"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateBackgroundColor = void 0;

var generateBackgroundColor = function generateBackgroundColor(platform) {
  switch (platform) {
    case 'GITHUB':
      return '#1A1A1A';

    case 'FRONTEND_MENTOR':
      return '#FFFFFF';

    case 'TWITTER':
      return '#43B7E9';

    case 'LINKEDIN':
      return '#2D68FF';

    case 'YOUTUBE':
      return '#EE3939';

    case 'FACEBOOK':
      return '#2442AC';

    case 'TWITCH':
      return '#EE3FC8';

    case 'DEVTO':
      return '#333333';

    case 'CODEWARS':
      return '#8A1A50';

    case 'CODEPEN':
      return '#333333';

    case 'FREE_CODE_CAMP':
      return '#302267';

    case 'GITLAB':
      return '#EB4925';

    case 'HASHNODE':
      return '#0330D1';

    case 'STACK_OVERFLOW':
      return '#EC7100';

    default:
      return 'var(--light-purple)';
  }
};

exports.generateBackgroundColor = generateBackgroundColor;