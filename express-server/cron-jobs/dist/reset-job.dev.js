"use strict";

var cron = require('node-cron');

var _require = require('../models/dbSchema.cjs'),
    User = _require.User,
    DevLinks = _require.DevLinks,
    AuditLog = _require.AuditLog,
    Settings = _require.Settings,
    GlobalResets = _require.GlobalResets;

var resetAfterOneMonthCronJob = function resetAfterOneMonthCronJob() {
  var setting;
  return regeneratorRuntime.async(function resetAfterOneMonthCronJob$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Settings.findOne());

        case 2:
          setting = _context4.sent;

          if (setting.enableResetUsersOneMonthCronJob === true || null || undefined) {
            cron.schedule('0 0 1 * *', function _callee3() {
              var currentDate, futureDate, dateOneMonthAgo, usersToReset, resetLog;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.prev = 0;
                      currentDate = new Date();
                      futureDate = new Date(currentDate); // Calculate the date one month ago

                      dateOneMonthAgo = new Date();
                      dateOneMonthAgo.setMonth(dateOneMonthAgo.getMonth() - 1); // Find users with a lastReset date over one month ago

                      _context3.next = 7;
                      return regeneratorRuntime.awrap(User.find({
                        $or: [{
                          lastReset: {
                            $lt: dateOneMonthAgo
                          }
                        }]
                      }));

                    case 7:
                      usersToReset = _context3.sent;
                      // Reset devLinks for users to reset
                      usersToReset.forEach(function _callee2(user) {
                        var devLinksToReset;
                        return regeneratorRuntime.async(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _context2.next = 2;
                                return regeneratorRuntime.awrap(DevLinks.find({
                                  _id: {
                                    $in: user.devLinks
                                  }
                                }));

                              case 2:
                                devLinksToReset = _context2.sent;
                                devLinksToReset.forEach(function _callee(devLink) {
                                  return regeneratorRuntime.async(function _callee$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          devLink.items = [];
                                          _context.next = 3;
                                          return regeneratorRuntime.awrap(devLink.save());

                                        case 3:
                                        case "end":
                                          return _context.stop();
                                      }
                                    }
                                  });
                                }); // Update lastReset to the current date

                                user.lastReset = currentDate;
                                _context2.next = 7;
                                return regeneratorRuntime.awrap(user.save());

                              case 7:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        });
                      });
                      resetLog = new GlobalResets({
                        note: "".concat(usersToReset.length, " users has been resetted successfully next planned reset at ").concat(futureDate.setMonth(currentDate.getMonth() + 1))
                      });
                      _context3.next = 12;
                      return regeneratorRuntime.awrap(resetLog.save());

                    case 12:
                      console.log("".concat(usersToReset.length, " users reset successfully."));
                      _context3.next = 18;
                      break;

                    case 15:
                      _context3.prev = 15;
                      _context3.t0 = _context3["catch"](0);
                      console.error('Error in cron job:', _context3.t0);

                    case 18:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, null, null, [[0, 15]]);
            });
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  resetAfterOneMonthCronJob: resetAfterOneMonthCronJob
};