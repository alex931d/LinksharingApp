"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProfile = void 0;

var _config = require("../../config/config");

var _reactToastify = require("react-toastify");

var updateProfile = function updateProfile(devLinkId, profile, file) {
  var promise = new Promise(function _callee(resolve, reject) {
    var formData, response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            formData = new FormData();
            formData.append('id', devLinkId);
            formData.append('profile', JSON.stringify(profile));

            if (file) {
              formData.append('profileBlob', file);
            }

            _context.next = 7;
            return regeneratorRuntime.awrap(_config.Axios.post('/api/updateProfile', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }));

          case 7:
            response = _context.sent;

            if (response.status === 200) {
              resolve();
            } else if (response.status === 500) {
              reject(new Error('bad request!'));
            } else {
              reject(new Error('Server error!'));
            }

            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 11]]);
  });

  _reactToastify.toast.promise(promise, {
    pending: 'updating links...',
    success: 'Successfully submitted!',
    error: function error(_error) {
      return "Error: ".concat(_error.message);
    }
  });

  promise.then(function () {});
};

exports.updateProfile = updateProfile;