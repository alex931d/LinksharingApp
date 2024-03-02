const { MEDIAPLATFORMS } = require('./mediaPlatform.js');

const generateMatchExp = (platform) => {
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

export const MediaurlIsValid = (url, platform) => {
    const matchExp = generateMatchExp(platform);
    const trimmedUrl = url.trim();
    const startsWithMatch = trimmedUrl.startsWith(matchExp);
    const urlPattern = /^https?:\/\/[^\s]+$/;
    const regexMatch = urlPattern.test(trimmedUrl);
    return startsWithMatch && regexMatch;
};