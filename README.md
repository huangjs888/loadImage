<!--
 * @Author: Huangjs
 * @Date: 2021-05-10 15:55:29
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-07-27 10:29:07
 * @Description: ******
-->
## loadImage
图片加载封装，带有进度的
### 使用方法
```javascript

import loadImage from '@huangjs888/load-image';

// 第二个参数为progress函数，传入，则使用ajax获取图片资源（ajax方式不适合跨域获取图片），不传，则直接Image对象
loadImage('http://xx/xxx/xx.jpg', (v) => {
  document.body.innerHTML = `<span>加载进度：${v * 100}%</span>`;
})
  .then((image) => {
    image.width = image.naturalWidth;
    image.height = image.naturalHeight;
    document.body.appendChild(image);
  })
  .catch(() => {
    document.body.innerHTML = '<span>加载图片失败！</span>';
  });

  
```
