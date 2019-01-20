<template>
  <div class="http404">
    <div class="http404-pic">
      <img class="http404-pic__parent" src="./404.png" alt="404">
      <img class="http404-pic__child left" src="./404_cloud.png" alt="404">
      <img class="http404-pic__child mid" src="./404_cloud.png" alt="404">
      <img class="http404-pic__child right" src="./404_cloud.png" alt="404">
    </div>
    <div class="http404-tip">
      <div class="http404-tip__warning">抱歉!</div>
      <div class="http404-tip__headline">您访问的页面不存在......</div>
      <div class="http404-tip__info">请检查您输入的网址是否正确，点击下方按钮返回主页。</div>
      <router-link class="http404-tip__btn" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes cloudLeft {
  0% {
    top: 17px;
    left: 220px;
    opacity: 0;
  }
  20% {
    top: 33px;
    left: 188px;
    opacity: 1;
  }
  80% {
    top: 81px;
    left: 92px;
    opacity: 1;
  }
  100% {
    top: 97px;
    left: 60px;
    opacity: 0;
  }
}
@keyframes cloudMid {
  0% {
    top: 10px;
    left: 420px;
    opacity: 0;
  }
  20% {
    top: 40px;
    left: 360px;
    opacity: 1;
  }
  70% {
    top: 130px;
    left: 180px;
    opacity: 1;
  }
  100% {
    top: 160px;
    left: 120px;
    opacity: 0;
  }
}
@keyframes cloudRight {
  0% {
    top: 100px;
    left: 500px;
    opacity: 0;
  }
  20% {
    top: 120px;
    left: 460px;
    opacity: 1;
  }
  80% {
    top: 180px;
    left: 340px;
    opacity: 1;
  }
  100% {
    top: 200px;
    left: 300px;
    opacity: 0;
  }
}
@keyframes slideUp {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.http404{
  width: 70%;
  height: 350px;
  max-width: 1000px;
  min-width: 800px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 100px;
  &-pic {
    position: relative;
    float: left;
    width: 60%;
    overflow: hidden;
    &__parent {
      width: 100%;
    }
    &__child {
      position: absolute;
      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }
      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
    }
  }
  &-tip {
    position: relative;
    float: right;
    width: 40%;
    padding: 30px 0;
    overflow: hidden;
    text-align: left;
    &__warning {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__btn {
      display: block;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 18px;
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      line-height: 36px;
      opacity: 0;
      text-decoration: none;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
  }
}
</style>

<style lang="scss">
.ie9 {

  .http404-tip__warning,
  .http404-tip__headline,
  .http404-tip__info,
  .http404-tip__btn {
    opacity: 1 !important; // IE9不支持 animation
  }
}
</style>

