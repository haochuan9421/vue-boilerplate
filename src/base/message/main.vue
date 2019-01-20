<template>
  <transition name="message-fade">
    <div :class="['message', 'clearfix', type]" v-show="show">
      <div class="left"><i :class="['iconfont', `icon-${type}`]"></i></div>
      <div class="left">{{message}}</div>
      <div class="right"><i class="iconfont icon-close" @click="close"></i></div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      type: 'success',
      message: '',
      showClose: true,
      duration: 3000,
      timer: null
    };
  },
  methods: {
    close () {
      this.show = false;
      this.resolve();
      clearTimeout(this.timer);
    }
  },
  watch:{
    show(newValue) {
      if(newValue && this.duration) {
        this.timer = setTimeout(() => {
          this.close();
        }, this.duration);
      }
    }
  }
};
</script>

<style lang="scss">
.message{
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  width: 380px;
  margin: auto;
  padding: 15px 45px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 2018;
  transition: all 0.3s;
  &.success{
    color: $color-success;
    border: 1px solid $color-success-light;
    background-color: $color-success-lighter;
  }
  &.warning{
    color: $color-warning;
    border: 1px solid $color-warning-light;
    background-color: $color-warning-lighter;
  }
  &.danger{
    color: $color-danger;
    border: 1px solid $color-danger-light;
    background-color: $color-danger-lighter;
  }
  &.info{
    color: $color-info;
    border: 1px solid $color-info-light;
    background-color: $color-info-lighter;
  }
  > div{
    &:nth-of-type(1), &:nth-of-type(3){
      width: 45px;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      i{
        width: 16px;
        height: 16px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
    &:nth-of-type(1){
      left: 0;
    }
    &:nth-of-type(2){
      word-break: break-all;
    }
    &:nth-of-type(3){
      right: 0;
      i{
        cursor: pointer;
        color: #cccccc;
        &:hover{
          color: #999999;
        }
      }
    }
  }
}
.message-fade-enter,
.message-fade-leave-active {
  opacity: 0;
  transform: translate(0, -100%);
}
</style>
