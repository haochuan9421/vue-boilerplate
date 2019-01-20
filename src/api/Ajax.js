// axios 封装：可以在此做一些诸如错误提示，添加全局请求参数，防止重复请求等的封装...
import axios from 'axios';
import Message from 'base/message';

const CancelToken = axios.CancelToken;
const requestPool = new Map(); // 请求池

/**
 * 错误处理函数
 * @param {Error} error
 */
function errorHandler(error) {
  Message({
    type: 'danger',
    message: error.message || '未知错误'
  });
  return Promise.reject(error);
}

function Ajax(baseURL) {
  const _axios = axios.create({ baseURL });

  _axios.interceptors.request.use(config => {
    // 防止重复发起同一个请求
    let requestType = config.method.toLowerCase();
    if (requestType === 'post' || requestType === 'put') {
      let uniqueCode = requestType + config.baseURL + config.url;
      if (requestPool.get(uniqueCode)) { // 取消重复请求
        config.cancelToken = new CancelToken(cancel => cancel('请不要重复提交请求！'));
      } else {
        requestPool.set(uniqueCode, true);
      }
    }

    return config;
  }, errorHandler);

  _axios.interceptors.response.use(response => {
    // 剔除请求池中完成的请求
    let requestType = response.config.method.toLowerCase();
    if (requestType === 'post' || requestType === 'put') {
      let uniqueCode = requestType + response.config.url;
      requestPool.delete(uniqueCode);
    }

    // 请求结果判断
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      return errorHandler(new Error(response.data.msg));
    }
  }, errorHandler);

  return _axios;
}

export default Ajax;
