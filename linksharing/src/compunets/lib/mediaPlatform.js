export const MEDIAPLATFORMS = {
    VIMEO: 'Vimeo',
    YOUTUBE: 'Youtube',
    FACEBOOK: 'Facebook'
}
export const generateBackgroundColor = (platform) => {
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