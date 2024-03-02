"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLinks = exports.addItem = exports.removeItem = void 0;

var _reactToastify = require("react-toastify");

var _config = require("../../config/config");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var removeItem = function removeItem(index, items, update, setIsEditing) {
  update(function (prevItems) {
    return prevItems.filter(function (_, i) {
      return i !== index;
    });
  });

  _reactToastify.toast.success('succesfully removed!', {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
  });

  setIsEditing(true);
};

exports.removeItem = removeItem;

var addItem = function addItem(currentType, items, update, setIsEditing) {
  if (items.length < 5) {
    var newId = items.length > 0 ? Math.max.apply(Math, _toConsumableArray(items.map(function (item) {
      return item.id;
    }))) + 1 : 1;
    var item = null;

    switch (currentType) {
      case 'links':
        item = {
          id: newId,
          itemType: 'links',
          font_family: "",
          font_size: 0,
          foreground: null,
          link_color: null,
          platform: 'New Platform',
          url: 'https://example.com'
        };
        break;

      case 'medias':
        item = {
          id: newId,
          itemType: 'medias',
          font_family: "",
          font_size: 0,
          foreground: "var(--light-purple)",
          link_color: "var(--background-color)",
          platform: 'Youtube',
          type: 'video',
          url: 'https://www.youtube.com/embed/2JyW4yAyTl0'
        };
        break;

      case 'notes':
        item = {
          id: newId,
          itemType: 'notes',
          font_family: "",
          font_size: 0,
          foreground: "var(--light-purple)",
          link_color: "var(--background-color)",
          content: 'this is a description'
        };
        break;

      case 'files':
        item = {
          id: newId,
          itemType: 'files',
          font_family: "",
          font_size: 0,
          foreground: "var(--light-purple)",
          link_color: "var(--background-color)",
          name: '',
          url: '',
          file: null
        };
        break;

      default:
        break;
    }

    update(function (prevLinks) {
      return [].concat(_toConsumableArray(prevLinks || []), [item]);
    });
    setIsEditing(true);

    _reactToastify.toast.success('succesfully added!', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
  } else {
    _reactToastify.toast.error('maximum 5 links!', {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
  }
};

exports.addItem = addItem;

var updateLinks = function updateLinks(devLinkId, settings, items, e) {
  var promise;
  return regeneratorRuntime.async(function updateLinks$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          promise = new Promise(function _callee(resolve, reject) {
            var formData, itemIds, i, response;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    formData = new FormData();
                    e.preventDefault();
                    itemIds = [];
                    formData.append('items', JSON.stringify(items));
                    formData.append('settings', JSON.stringify(settings));
                    formData.append('id', devLinkId);

                    for (i = 0; i < items.length; i++) {
                      if (items[i].itemType === 'files' && items[i].file) {
                        formData.append('files', items[i].file, "".concat(items[i].id, "_").concat(items[i].name));
                        itemIds.push(items[i].id);
                      }
                    }

                    formData.append('itemIds', JSON.stringify(itemIds));
                    _context.next = 11;
                    return regeneratorRuntime.awrap(_config.Axios.put('/api/updateLinks', formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                    }));

                  case 11:
                    response = _context.sent;

                    if (response.status === 200) {
                      resolve();
                    } else if (response.status === 500) {
                      reject(new Error('bad request!'));
                    } else {
                      reject(new Error('Server error!'));
                    }

                    _context.next = 18;
                    break;

                  case 15:
                    _context.prev = 15;
                    _context.t0 = _context["catch"](0);
                    reject(_context.t0);

                  case 18:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[0, 15]]);
          });

          _reactToastify.toast.promise(promise, {
            pending: 'updating links...',
            success: 'Successfully submitted!',
            error: function error(_error) {
              return "Error: ".concat(_error.message);
            }
          });

          promise.then(function () {});

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.updateLinks = updateLinks;