"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _reactAuthKit = require("react-auth-kit");

var _axios = _interopRequireDefault(require("axios"));

var _context7 = require("../../compunets/lib/context");

var _universalCookie = _interopRequireDefault(require("universal-cookie"));

var _reactToastify = require("react-toastify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var cookies = new _universalCookie["default"]();

var useAuth = function useAuth() {
  var contextData = (0, _react.useContext)(_context7.APIContext);
  var serverData = contextData.serverData,
      dataLoaded = contextData.dataLoaded,
      updateContextState = contextData.updateContextState;
  var signIn = (0, _reactAuthKit.useSignIn)();
  var signOut = (0, _reactAuthKit.useSignOut)();
  var isAuthenticated = (0, _reactAuthKit.useIsAuthenticated)();

  var _useAuthUser = (0, _reactAuthKit.useAuthUser)(),
      authState = _useAuthUser.authState;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      authData = _useState2[0],
      setAuthData = _useState2[1];

  (0, _react.useEffect)(function () {
    var checkAuthentication = function checkAuthentication() {
      var token, response;
      return regeneratorRuntime.async(function checkAuthentication$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              token = cookies.get('_auth');

              if (!token) {
                _context.next = 7;
                break;
              }

              _context.next = 5;
              return regeneratorRuntime.awrap((0, _axios["default"])('/api/protected', {
                method: 'POST'
              }));

            case 5:
              response = _context.sent;

              if (!response.data.success) {
                signOut();
                cookies.remove("jwt");

                _reactToastify.toast.error('no valid authentication token');
              }

            case 7:
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              signOut();

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 9]]);
    };

    checkAuthentication();
  }, [isAuthenticated(), signOut]);

  var login = function login(values, _ref) {
    var setSubmitting, response;
    return regeneratorRuntime.async(function login$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            setSubmitting = _ref.setSubmitting;
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/login', {
              email: values.email,
              password: values.password
            }));

          case 4:
            response = _context2.sent;

            if (response.status === 200) {
              _reactToastify.toast.success('Successfully logged in!');

              signIn({
                token: response.data.token,
                expiresIn: 3600,
                tokenType: "cookie",
                authState: {
                  isAuthenticated: true,
                  userdata: response.data.user,
                  devLinks: response.data.devlink
                }
              });
            } else if (response.status === 401) {
              _reactToastify.toast.error(response.data.message);
            } else {
              _reactToastify.toast.error(response.data.message);
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);

            _reactToastify.toast.error("Error: ".concat(_context2.t0.message));

          case 11:
            _context2.prev = 11;
            setSubmitting(false);
            return _context2.finish(11);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 8, 11, 14]]);
  };

  var logout = function logout(values) {
    var response;
    return regeneratorRuntime.async(function logout$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/logout', {
              email: values.email
            }));

          case 3:
            response = _context3.sent;

            if (response.status === 200) {
              signOut();
              cookies.remove("jwt");

              _reactToastify.toast.success('Successfully logged out');
            } else {
              _reactToastify.toast.error("Error: ".concat(response.data.error));
            }

            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            _reactToastify.toast.error("Error: ".concat(_context3.t0.message));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };

  var getPreviewData = function getPreviewData(id) {
    var response, devLinks;
    return regeneratorRuntime.async(function getPreviewData$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/getPreviewData', {
              id: id
            }));

          case 3:
            response = _context4.sent;

            if (response.status === 200) {
              devLinks = response.data.devLinks;

              _reactToastify.toast.success(response.data.message);

              updateContextState(devLinks);
              console.log(devLinks);
            } else if (response.status === 400) {
              _reactToastify.toast.error(response.data.message);
            } else {
              _reactToastify.toast.error(response.data.message);
            }

            _context4.next = 9;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };

  var closeTour = function closeTour(values) {
    var response;
    return regeneratorRuntime.async(function closeTour$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/closeTour', {
              id: values._id
            }));

          case 3:
            response = _context5.sent;

            if (response.status === 200) {
              _reactToastify.toast.success('tutorial has been closed!');
            } else if (response.status === 401) {
              _reactToastify.toast.error(response.data.message);
            } else {
              _reactToastify.toast.error(response.data.message);
            }

            _context5.next = 9;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };

  var signup = function signup(values, _ref2) {
    var setSubmitting, response;
    return regeneratorRuntime.async(function signup$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            setSubmitting = _ref2.setSubmitting;
            _context6.prev = 1;
            _context6.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/signup', {
              email: values.email,
              password: values.password
            }));

          case 4:
            response = _context6.sent;

            if (response.status === 200) {
              _reactToastify.toast.success('Successfully signed up!');

              signIn({
                token: response.data.token,
                expiresIn: 3600,
                tokenType: "cookie",
                authState: {
                  isAuthenticated: true,
                  userdata: response.data.user,
                  devLinks: response.data.devlink
                }
              });
            } else if (response.status === 401) {
              _reactToastify.toast.error(response.data.message);
            } else {
              _reactToastify.toast.error(response.data.message);
            }

            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](1);

            _reactToastify.toast.error("Error: ".concat(_context6.t0.message));

          case 11:
            _context6.prev = 11;
            setSubmitting(false);
            return _context6.finish(11);

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[1, 8, 11, 14]]);
  };

  return {
    authState: authState,
    login: login,
    signup: signup,
    closeTour: closeTour,
    getPreviewData: getPreviewData
  };
};

var _default = useAuth;
exports["default"] = _default;