const { PLATFORMS } = require('./platform');

export const generateMatchExp = (platform) => {
    switch (platform) {
        case PLATFORMS.GITHUB:
            return 'https://github.com/';

        case PLATFORMS.FRONTEND_MENTOR:
            return 'https://www.frontendmentor.io/profile/';

        case PLATFORMS.TWITTER:
            return 'https://twitter.com/';

        case PLATFORMS.LINKEDIN:
            return 'https://www.linkedin.com/in/';

        case PLATFORMS.YOUTUBE:
            return 'youtube.com/channel/';

        case PLATFORMS.FACEBOOK:
            return 'https://www.facebook.com/';

        case PLATFORMS.TWITCH:
            return 'https://www.twitch.tv/';

        case PLATFORMS.DEVTO:
            return 'https://dev.to/';

        case PLATFORMS.CODEWARS:
            return 'https://www.codewars.com/users/';

        case PLATFORMS.CODEPEN:
            return 'https://codepen.io/';

        case PLATFORMS.FREE_CODE_CAMP:
            return 'https://www.freecodecamp.org/';

        case PLATFORMS.GITLAB:
            return 'https://gitlab.com/';

        case PLATFORMS.HASHNODE:
            return 'https://hashnode.com/';

        case PLATFORMS.STACK_OVERFLOW:
            return 'https://stackoverflow.com/users/';

        default:
            return '';
    }
};
export const generatePath = (url, platform) => {
    const matchExp = generateMatchExp(platform);
    const trimmedUrl = url.trim();
  
    if (trimmedUrl.startsWith(matchExp)) {
      return trimmedUrl.slice(matchExp.length);
    }
  
    return '';
  };
export const urlIsValid = (url, platform) => {
    const matchExp = generateMatchExp(platform);
    const trimmedUrl = url.trim();
    const startsWithMatch = trimmedUrl.startsWith(matchExp);
    const urlPattern = /^https?:\/\/[^\s]+$/;
    const regexMatch = urlPattern.test(trimmedUrl);
    return startsWithMatch && regexMatch;
};