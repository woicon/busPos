<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div class="footer">
      <router-link to="/home" tag="div">
        <div class="ico ico-order"></div>首页
      </router-link>
      <router-link to="/report" tag="div">
        <div class="ico ico-report"></div>报表
      </router-link>
      <router-link to="/pos" tag="div">
        <div class="ico ico-pos"></div>收款
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout"
};
</script>
<style scoped lang="less">
.footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  text-align: center;
  background: #fff;
  .ico {
    font-size: 24px;
  }
  & > div {
    width: 33.3333333%;
    font-size: 11px;
    color: #666;
  }
  .router-link-active {
    color: #1aad19;
  }
}
</style>
