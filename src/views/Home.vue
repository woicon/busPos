<template>
  <div>
    <div class="head">
      <div @click="toPos">
        <i class="ico ico-cash"></i>收款
      </div>
      <div @click="scanCode">
        <input type="text" ref="orderId" hidden id="orderId" v-model="orderId">
        <i class="ico ico-buy"></i> 取票
      </div>
    </div>
    <div class="heads">
      <div class="toggle" @click="toggleCount">
        <div class="ico ico-mins" id="min"></div>
        <div class="value">{{order.psgNum}}</div>
        <div class="ico ico-add" id="add"></div>
      </div>
      <div class="buttons">
        <div class="button" @click="createOrder">购票</div>
      </div>
      <div class="info">请输入购票数量</div>
    </div>
    <!-- <div class="list">
                <div class="ico">
                    <div class="ico-paytype"></div>
                    <div>收款</div>
                </div>
                 <div class="ico">
                    <div class="ico-paytype"></div>
                    <div>收款</div>
                </div>
                    <div class="ico">
                    <div class="ico-paytype"></div>
                    <div>帮助</div>
                </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      order: {
        psgNum: 1,
        appKey: sessionStorage.getItem("appKey"),
        sn: this.$android.getAndroidId(),
        orderSource: 1
      },
      orderId: 2
    };
  },
  created() {
    this.order.appKey = sessionStorage.getItem("appKey");
    // this.$message(this.$android.getAndroidId());
  },
  destroyed() {
    this.$destroy();
  },
  watch: {
    orderId: {
      handler: function(code, oldVal) {
        console.log("watch", code, oldVal);
        // this.$message("code::" + code + ":::" + oldVal);
        this.createOrder({
          psgNum: 1,
          appKey: sessionStorage.getItem("appKey"),
          sn: this.$android.getAndroidId(),
          orderSource: 2,
          busKey: code,
          psgNum: 1
        });
      },
      deep: true
    }
  },
  methods: {
    createOrder(params) {
      // 默认1 买票 2 取票 3 pos扫码支付
      this.$api.createOrder(this.order).then(res => {
        console.log(res);
        if (res.data.orderstatus == 1) {
          this.$router.push({
            path: "/pay",
            query: res.data
          });
        } else {
          this.$message(res.errorMsg);
        }
      });
    },
    toPos() {
      this.$router.push({
        path: "/pos"
      });
    },
    scanCode(orderId) {
      this.$android.twoCode();
    },
    toggleCount(e) {
      let count = this.order.psgNum;
      switch (e.target.id) {
        case "add":
          this.order.psgNum = count + 1;
          break;
        case "min":
          this.order.psgNum = count > 0 ? count - 1 : count;
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  background: darken(#1aad19, 4%);
  padding: 40px 0;
  & > div {
    width: 50%;
    color: #fff;
  }
  i {
    font-size: 46px;
    display: block;
    margin-bottom: 6px;
  }
}

.heads {
  background: #1aad19;
  padding: 80px 60px 20px;
}

.button {
  border: 1px solid #fff;
  background: transparent;
  margin: 20px 0;
}

.buttons {
  margin-top: 40px;
}

.info {
  color: #fff;
  font-size: 13px;
  text-align: center;
}

.toggle {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: space-between;
  color: #fff;
  .value {
    font-size: 40px;
  }
  .ico {
    font-size: 44px;
    color: #fff;
    display: flex;
    align-items: center;
  }
}
</style>

