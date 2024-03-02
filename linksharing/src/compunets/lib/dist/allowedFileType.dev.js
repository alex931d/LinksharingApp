"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateBackgroundColorForFileTypes = exports.FILETYPES = void 0;
var FILETYPES = {
  PDF: 'application/pdf',
  WORD: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  DOC: 'application/vnd.google-apps.document'
};
exports.FILETYPES = FILETYPES;

var generateBackgroundColorForFileTypes = function generateBackgroundColorForFileTypes(type) {
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
};

exports.generateBackgroundColorForFileTypes = generateBackgroundColorForFileTypes;