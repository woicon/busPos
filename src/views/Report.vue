<template>
  <div id="report" class="report">
    <div class="reports">
      <div class="date bline">
        <div class="date-title">收款汇总</div>
        {{nowDate}}
      </div>
      <div class="list">
        <div>
          收款金额
          <span class="price">{{detail.payPrice}}元</span>
        </div>
        <div>
          售票数
          <span>{{detail.psgNum}}张</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detail: {},
      nowDate: null
    };
  },
  created() {
    this.currentOrders();
    Date.prototype.Format = function(fmt) {
      //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
    this.nowDate = new Date().Format("yyyy-MM-dd");
  },
  methods: {
    currentOrders() {
      let params = {};
      this.$api
        .currentOrders({
          appKey: sessionStorage.getItem("appKey")
        })
        .then(res => {
          console.log(res);
          this.detail = res.data;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.report {
  background: #f1f1f1;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.price {
  font-size: 20px;
  color: tomato;
}
.reports {
  background: #fff;
  margin: 30px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.list {
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    padding: 10px 0;
  }
}
.date {
  font-size: 20px;
  margin-bottom: 14px;
  color: #666;
  padding-bottom: 14px;
  &-title {
    font-size: 13px;
    margin-bottom: 4px;
    color: #444;
    font-weight: 800;
  }
}
</style>
