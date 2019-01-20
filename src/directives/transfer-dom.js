/**
 * 将 DOM 元素移到 body 标签下
 * v-transfer-dom
 */
export default {
  inserted(el) {
    el.parentNode.removeChild(el); // 从原本位置移除
    document.body.appendChild(el); // 添加到body下
  }
};
