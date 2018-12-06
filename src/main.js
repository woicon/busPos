// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* jshint esversion: 6 */
import Vue from "vue";
import App from "./App";
import router from "@/router";
import "./assets/style.less";
import api from "@/api";
import MobileMessage from 'mobile-message';
import MintUI from 'mint-ui';
Vue.use(MintUI);
console.log(MobileMessage);
Vue.use(MobileMessage);

Vue.prototype.$api = api;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('appKey')
  }
  let appKey = sessionStorage.getItem('appKey')
  console.log(appKey)
  if (!appKey && to.path != '/login') {
    // window.location.reload();
    next({
      path: '/login'
    });
    return;
  }
  next();
})

try {
  Vue.prototype.$sn = android.getAndroidId()
} catch (err) {
  Vue.prototype.$sn = 'testSn';
}

try {
  Vue.prototype.$android = android;
} catch (error) {
  Vue.prototype.$android = {
    //android调用js方法并传参(安卓把二维码传给JS)
    getCode(arg) {
      //获取到的二维码
      document.getElementById("code").innerHTML = (arg);
    },
    //调用安卓方法传参数：执行二维码扫码
    twoCode() {
      console.log('twoCode')
      //android.twoCode();
    },
    //调用安卓原生带返回值的方法
    getAndroidId() {
      return 'testSNgetAndroidId'
      console.log(getAndroidId)
    },
    //调用安卓方法传参数：执行打印
    print(arg) {
      //android.print(arg);
      console.log(print)
    },
  }
}

var vm = new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
