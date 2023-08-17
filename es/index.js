function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/*
 * @Author: Huangjs
 * @Date: 2023-02-13 15:22:58
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-08-17 11:38:49
 * @Description: ******
 */

// 关于HTTP缓存问题：
// 1，直接使用new Image()，或者img元素，当相同的图片url再次访问，浏览器会直接使用缓存图片（强缓存），不会向后端发送任何请求，即使后端响应头设置了协商缓存字段要求协商缓存，浏览器依然使用的是强缓存，不会出现304。但是除非后端设置响应头Cache-Control为no-store，此时图片会重新请求。
// 2，这里使用ajax请求图片，会严格按照http缓存机制来，比如后端设置响应头Cache-Control为maxage=xxx，就会使用强缓存，后端响应头设置了协商缓存字段，就会使用协商缓存，会有304验证等。
// 3，这里面注意XMLHttpRequest在第二次请求协商缓存的时候，除非请求主动设置了协商缓存字段，此时响应才会真正返回304（且不会去读缓存数据），否则都会自动转换成200，并读取缓存数据返回。
// 4，HTTP缓存时存在disk或memory里的，靠浏览器默认去读取，ajax还会发一次304请求，如果不想这样浪费请求时间，并且确定图片不会变化，其实可以自己做缓存，可以将请求的数据（也可以转base64）存入到IndexDB，下次请求之前先从中取，没有再请求
/* const lastModified: { [key in string]: string } = {};
const etag: { [key in string]: string } = {}; */
const proxy = function proxy(url, progress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onprogress = e => {
      if (e.lengthComputable) {
        typeof progress === 'function' && progress(e);
      }
    };
    xhr.onloadend = e => {
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
let isHijack = false;
export function hijackImage() {
  if (isHijack) {
    return;
  }
  // 这里对HTMLImageElement元素的src进行重写，再设置src的时候使用ajax获取图片资源，目的是监听image的onprogress事件生效
  const {
    prototype
  } = HTMLImageElement;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, 'src');
  if (descriptor) {
    isHijack = true;
    Object.defineProperty(prototype, 'src', _extends({}, descriptor, {
      set: function set(value, ...args) {
        if (descriptor.set) {
          const setter = descriptor.set;
          if (value && value.indexOf('blob:') !== 0) {
            proxy(value, this.onprogress).then(url => {
              const onload = this.onload;
              this.onload = function (e) {
                // 释放内存
                URL.revokeObjectURL(url);
                onload && onload.apply(this, [e]);
              };
              // 图片资源加载完成后会缓存，缓存数据丢给image原始src操作（这里就会多个数据转存的时间）
              setter.apply(this, [url, ...args]);
            }).catch(() => {
              // 出现跨域等无法加载图片情况，会重新丢给image原始src操作
              setter.apply(this, [value, ...args]);
            });
          } else {
            // blob图片直接丢给image原始src操作
            setter.apply(this, [value, ...args]);
          }
        }
      }
    }));
    return () => {
      isHijack = false;
      // 删除劫持
      Object.defineProperty(prototype, 'src', descriptor);
    };
  }
  return;
}

// 原始图片加载
export const loadImageBase = function loadImageBase(url, progress) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const off = () => {
      image.onload = null;
      image.onprogress = null;
      image.onerror = null;
    };
    image.onload = () => {
      resolve(image);
      off();
    };
    image.onerror = e => {
      reject(e);
      off();
    };
    if (typeof progress === 'function') {
      image.onprogress = e => progress(e.loaded / e.total);
    }
    image.src = url;
  });
};
export default function (url, progress) {
  // 加载图片需要进度条的使用proxy代理加载
  if (typeof progress === 'function') {
    return proxy(url, e => progress(e.loaded / e.total)).then(_url =>
    // 该loadImageBase成功后会把then里return的image抛给外面调用者的then
    // 该loadImageBase失败后会先走下面catch的loadImageBase，而不是直接抛到外面调用者的catch
    loadImageBase(_url).then(image => {
      URL.revokeObjectURL(_url);
      return image;
    }))
    // 该loadImageBase成功后会抛给外面调用者的then
    // 该loadImageBase失败后会抛到外面调用者的catch
    .catch(() => loadImageBase(url));
  } else {
    return loadImageBase(url);
  }
}