"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.hijackImage = hijackImage;
exports.loadImageBase = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/*
 * @Author: Huangjs
 * @Date: 2023-02-13 15:22:58
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-07-27 09:48:47
 * @Description: ******
 */

// 关于HTTP缓存问题：
// 1，直接使用new Image()，或者img元素，当相同的图片url再次访问，浏览器会直接使用缓存图片（强缓存），不会向后端发送任何请求，即使后端响应头设置了协商缓存字段要求协商缓存，浏览器依然使用的是强缓存，不会出现304。但是除非后端设置响应头Cache-Control为no-store，此时图片会重新请求。
// 2，这里使用ajax请求图片，会严格按照http缓存机制来，比如后端设置响应头Cache-Control为maxage=xxx，就会使用强缓存，后端响应头设置了协商缓存字段，就会使用协商缓存，会有304验证等。
// 3，这里面注意XMLHttpRequest在第二次请求协商缓存的时候，除非请求主动设置了协商缓存字段，此时响应才会真正返回304（且不会去读缓存数据），否则都会自动转换成200，并读取缓存数据返回。
// 4，HTTP缓存时存在disk或memory里的，靠浏览器默认去读取，ajax还会发一次304请求，如果不想这样浪费请求时间，并且确定图片不会变化，其实可以自己做缓存，可以将请求的数据（也可以转base64）存入到IndexDB，下次请求之前先从中取，没有再请求
/* const lastModified: { [key in string]: string } = {};
const etag: { [key in string]: string } = {}; */
var proxy = function proxy(url, progress) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onprogress = function (e) {
      if (e.lengthComputable) {
        typeof progress === 'function' && progress(e);
      }
    };
    xhr.onloadend = function (e) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        /* let modified = xhr.getResponseHeader('Last-Modified');
        if (modified) {
          lastModified[url] = modified;
        }
        modified = xhr.getResponseHeader('Etag');
        if (modified) {
          etag[url] = modified;
        } */
        // URL.createObjectURL对应资源此时是存在内存里，浏览器关闭或主动revoke会释放掉
        // resolve里面使用完url之后记得及时释放掉，释放内存后，地址就无效了
        resolve(URL.createObjectURL(xhr.response));
      } else {
        reject(e);
      }
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    /* if (lastModified[url]) {
      // 此种模式，http先是有个OPTIONS请求，再有一个304请求
      xhr.setRequestHeader('If-Modified-Since', lastModified[url]);
    }
    if (etag[url]) {
      // 此种模式，只有304请求
      xhr.setRequestHeader('If-None-Match', etag[url]);
    }
    xhr.setRequestHeader('Cache-Control', 'no-cache'); */
    xhr.send();
  });
};

// 对image.src进行劫持，一劳永逸
var isHijack = false;
function hijackImage() {
  if (isHijack) {
    return;
  }
  // 这里对HTMLImageElement元素的src进行重写，再设置src的时候使用ajax获取图片资源，目的是监听image的onprogress事件生效
  var _HTMLImageElement = HTMLImageElement,
    prototype = _HTMLImageElement.prototype;
  var descriptor = Object.getOwnPropertyDescriptor(prototype, 'src');
  if (descriptor) {
    isHijack = true;
    Object.defineProperty(prototype, 'src', _objectSpread(_objectSpread({}, descriptor), {}, {
      set: function set(value) {
        var _this = this;
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        if (descriptor.set) {
          var setter = descriptor.set;
          if (value && value.indexOf('blob:') !== 0) {
            proxy(value, this.onprogress).then(function (url) {
              var onload = _this.onload;
              _this.onload = function (e) {
                // 释放内存
                URL.revokeObjectURL(url);
                onload && onload.apply(this, [e]);
              };
              // 图片资源加载完成后会缓存，缓存数据丢给image原始src操作（这里就会多个数据转存的时间）
              setter.apply(_this, [url].concat(args));
            }).catch(function () {
              // 出现跨域等无法加载图片情况，会重新丢给image原始src操作
              setter.apply(_this, [value].concat(args));
            });
          } else {
            // blob图片直接丢给image原始src操作
            setter.apply(this, [value].concat(args));
          }
        }
      }
    }));
    return function () {
      isHijack = false;
      // 删除劫持
      Object.defineProperty(prototype, 'src', descriptor);
    };
  }
  return;
}

// 原始图片加载
var loadImageBase = function loadImageBase(url, progress) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    var off = function off() {
      image.onload = null;
      image.onprogress = null;
      image.onerror = null;
    };
    image.onload = function () {
      resolve(image);
      off();
    };
    image.onerror = function (e) {
      reject(e);
      off();
    };
    if (typeof progress === 'function') {
      image.onprogress = function (e) {
        return progress(e.loaded / e.total);
      };
    }
    image.src = url;
  });
};
exports.loadImageBase = loadImageBase;
function _default(url, progress) {
  // 加载图片需要进度条的使用proxy代理加载
  if (typeof progress === 'function') {
    return proxy(url, function (e) {
      return progress(e.loaded / e.total);
    }).then(function (_url) {
      return (
        // 该loadImageBase成功后会把then里return的image抛给外面调用者的then
        // 该loadImageBase失败后会先走下面catch的loadImageBase，而不是直接抛到外面调用者的catch
        loadImageBase(_url).then(function (image) {
          URL.revokeObjectURL(_url);
          return image;
        })
      );
    })
    // 该loadImageBase成功后会抛给外面调用者的then
    // 该loadImageBase失败后会抛到外面调用者的catch
    .catch(function () {
      return loadImageBase(url);
    });
  } else {
    return loadImageBase(url);
  }
}