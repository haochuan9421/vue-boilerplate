import Vue from 'vue';
import _Message from './main.vue';

let instance;

const initInstance = () => {
  instance = new(Vue.extend(_Message))({
    el: document.createElement('div')
  });

  document.body.appendChild(instance.$el);
};

const Message = (options) => {
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }

    const defaultOptions = {
      show: true,
      type: 'success',
      message: '',
      showClose: true,
      duration: 3000
    };
    if (!options) {
      options = {};
    }

    if (typeof options === 'string') {
      options = { message: options };
    }

    Object.assign(instance, defaultOptions, {
      resolve,
      reject,
      ...options
    });
  });
};

Message.install = (_Vue) => {
  _Vue.prototype.$message = Message;
};
export default Message;
