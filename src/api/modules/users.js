import Ajax from '@/api/Ajax';
// 开发时的接口地址和正式环境的可能并不一样，可在此根据环境变量设置不同的 baseURL
const axios = Ajax(process.env.NODE_ENV === 'development' ? '/users' : 'http://localhost:3000/users');

export default {
  /**
   * 获取人员列表
   * @param {Number} count 人员条数
   */
  getList(count) {
    return axios({
      method: 'get',
      url: '/list',
      params: { count }
    });
  }
};
