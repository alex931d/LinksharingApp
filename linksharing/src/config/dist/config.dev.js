"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Axios = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _axiosRateLimit = _interopRequireDefault(require("axios-rate-limit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === "[::1]" || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/);
var API_URL = isLocalhost ? "http://localhost:5000" : "https://linksharingapp.onrender.com/";

var axiosInstance = _axios["default"].create({
  withCredentials: true,
  baseURL: API_URL
});

var rateLimitConfig = {
  maxRequests: 5,
  perMilliseconds: 1000
};
var axiosWithRateLimit = (0, _axiosRateLimit["default"])(axiosInstance, rateLimitConfig);
var Axios = axiosWithRateLimit;
exports.Axios = Axios;