/**
 * 常用的正则表达式
 */
export default {
  // 手机号
  isPhone: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
  // 邮箱
  isEmail: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  // 身份证
  isIDCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 是否在微信内置浏览器内打开(isWX.test(window.navigator.userAgent.toLowerCase()))
  isWX: /micromessenger/
};
