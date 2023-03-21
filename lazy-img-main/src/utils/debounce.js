/**
 * @param {Function} fn 需要进行防抖操作的事件函数
 * @param {Number} duration 间隔时间
 * @returns {Function} 已进行防抖的函数
 */
export default function(fn, duration = 100) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, duration);
  };
}
