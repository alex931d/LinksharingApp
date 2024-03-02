export const FILETYPES = {
    PDF: 'application/pdf',
    WORD: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    DOC: 'application/vnd.google-apps.document'
}
export const generateBackgroundColorForFileTypes = (type) =>{
    switch (type) {
        case 'application/pdf':
            return '#f40f02';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                   return '#2b579a';
                case 'application/vnd.google-apps.document':
             return '#4285F4';
        default:
            return 'var(--light-purple)';
    }
}