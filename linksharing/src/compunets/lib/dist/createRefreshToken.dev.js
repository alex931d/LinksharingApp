"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshToken = void 0;

var _config = require("../../config/config");

var _reactAuthKit = require("react-auth-kit");

var refreshToken = (0, _reactAuthKit.createRefresh)({
  interval: 10,
  refreshApiCallback: function refreshApiCallback(param) {
    var response;
    return regeneratorRuntime.async(function refreshApiCallback$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_config.Axios.post("/api/refresh", param, {
              token: param.authToken
            }));

          case 3:
            response = _context.sent;
            console.log("Refreshing");
            return _context.abrupt("return", {
              isSuccess: true,
              newAuthToken: response.data.token,
              newAuthTokenExpireIn: 10,
              newRefreshTokenExpiresIn: 60
            });

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            return _context.abrupt("return", {
              isSuccess: false
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  }
});
exports.refreshToken = refreshToken;