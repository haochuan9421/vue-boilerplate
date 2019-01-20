<template>
  <div id="app">
    <ul class="nav">
      <router-link to="/" tag="li">首页</router-link>
      <router-link to="/about" tag="li">关于</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  color: $color-text;
  overflow: auto;
  @include scrollbar();

  .nav {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;

    li {
      display: inline-block;

      &.router-link-exact-active {
        color: $color-theme;
      }
    }
  }
}
</style>
