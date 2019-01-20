<template>
  <div class="home">
    <ul>
      <li v-for="item in list" :key="item.id">{{item.name}}：{{item.city}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    // 获取 66 位 Mock 的人员信息
    this.$api.users.getList(66).then(res => {
      this.list = res;
      this.$message({
        message: '请求成功',
        duration: 1000
      });
    }).catch((error) => {
      if (error.message === 'Request failed with status code 504') {
        this.$message({
          type: 'danger',
          message: '请执行 npm start 启动后端接口',
          duration: 3000
        });
      }
    });
  }
};
</script>
