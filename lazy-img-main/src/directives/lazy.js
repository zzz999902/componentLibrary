import eventBus from '@/eventBus.js';
import debounce from '../utils/debounce';
import defaultGif from '@/assets/default.gif';

let imgs = [];

//调用setImage函数，就可以进行单张图片的加载
function setImage(img) {
  img.dom.src = defaultGif; // 先暂时使用默认图片
  const clientHeight = document.documentElement.clientHeight; //视口高度
  const rect = img.dom.getBoundingClientRect(); //图片的位置信息
  //取默认值150 是为了解决图片未加载成功时 高度缺失的问题
  const height = rect.height || 150; //图片的高度
  // 判断该图片是否在视口范围内
  if (-rect.top <= height && rect.top <= clientHeight) {
    // 在视口范围内 进行相关处理操作
    const tempImg = new Image(); //新建Image对象实例
    //改写onload事件
    tempImg.onload = function () {
      // 当图片加载完成之后
      img.dom.src = img.src; //替换img元素的src属性
    };
    tempImg.src = img.src;
    imgs = imgs.filter((i) => i !== img); //将已加载好的图片进行删除
  }
}

function handleScroll() {
  setImages();
}

// 调用setImages函数，就可以处理那些符合条件的图片
function setImages() {
  for (const img of imgs) {
    // 处理该图片
    setImage(img);
  }
}

//监听事件总线中的mainScroll事件，该事件触发时调用setImages函数来加载符合条件图片
eventBus.$on('mainScroll', debounce(handleScroll, 50));

export default {
  inserted(el, bindings) {
    //刚插入父节点时 收集img节点信息
    const img = {
      dom: el, //img 元素DOM节点
      src: bindings.value, //img的src属性值
    };
    imgs.push(img); //先将图片信息存储到imgs数组
    setImage(img); // 立即判断该图片是否要加载
  },
  unbind(el) {
    //解绑时 清空 imgs
    imgs = imgs.filter((img) => img.dom !== el);
  },
};
