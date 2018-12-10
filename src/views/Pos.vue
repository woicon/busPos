<template>
  <div class="pos">
    <div class="head">
      <div class="head-title">收款金额</div>
      <div class="num">
        <b>¥</b>
        <sub>{{order.posPrice}}</sub>
      </div>
    </div>
    <div class="keyborder bline">
      <div class="key" @click="touchKey">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>.</div>
        <div>0</div>
        <div class="ico-key"></div>
      </div>
      <div class="skey">
        <div class="ico ico-delnum" @click="delNum"></div>
        <div class="check" @click="createOrder">收款</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pos",
  data() {
    return {
      order: {
        appKey: sessionStorage.getItem("appKey"),
        sn: this.$android.getAndroidId(),
        psgNum: 1,
        orderSource: 3,
        posPrice: "0"
      }
    };
  },
  created() {},
  methods: {
    touchKey(e) {
      let total = this.order.posPrice;
      let num = e.target.innerText;
      let totals = total + num;
      let decimalReg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
      if (total == "0" && num != ".") {
        totals = num;
      } else if (num == "." && total == "0") {
        totals = "0.";
      } else if (!decimalReg.test(totals)) {
        totals = total;
      } else if (total.indexOf(".") != -1 && num == ".") {
        totals = total;
      }
      this.order.posPrice = totals;
      console.log(totals);
    },
    delNum() {
      let total = this.order.posPrice,
        totalsLength = total.length,
        newTotal = total.substring(0, totalsLength - 1);
      this.order.posPrice = newTotal == "" ? "0" : newTotal;
    },
    createOrder(params) {
      // 默认1 买票 2 取票 3 pos扫码支付
      if (this.order.posPrice > 0) {
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
      } else {
        this.$message("请输入收款金额！");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  background: #fff;
  margin: 20px;
  padding: 14px;
  &-title {
    font-size: 12px;
    color: #666;
  }
}
.pos {
  background: #fafafa;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

html {
  background: #fafafa;
  height: 100%;
}
@keyframes fades {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.1;
  }
}
.num {
  margin: 0;
  background: #fff;
  padding: 10px 0 0;
  font-size: 30px;
  color: #444;
  display: flex;
  align-items: center;

  sub {
    position: relative;
    font-size: 32px;
    &:after {
      position: absolute;
      right: -4px;
      top: 7px;
      bottom: 7px;
      width: 2px;
      background: #000;
      content: "";
      display: block;
      animation: fades 0.5s ease-in-out infinite;
    }
  }
  b {
    font-size: 20px;
    margin-right: 8px;
  }
}

.keyborder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  height: 240px;
  background: #fff;
}

.key {
  display: flex;
  flex-wrap: wrap;
  width: 75%;
  background: #fff;
  & > div {
    width: 33.33333333%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    font-size: 24px;
    position: relative;
    transition: 0.4s;
    &:hover {
      background: #eee;
    }
    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      display: block;
      width: 1px;
      transform: scaleX(0.5);
      border-right: 1px solid #ccc;
    }
    &:before {
      content: "";
      position: absolute;
      right: -50%;
      top: 0;
      left: -50%;
      display: block;
      height: 1px;
      transform: scale(0.5);
      border-top: 1px solid #ccc;
    }
  }
}

.skey {
  width: 25%;
  background: #fff;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ico {
    font-size: 22px;
    height: 60px;
    position: relative;
    &:hover {
      background: #eee;
    }
    &:after {
      content: "";
      position: absolute;
      right: -50%;
      top: 0;
      left: -50%;
      display: block;
      height: 1px;
      transform: scale(0.5);
      border-top: 1px solid #ccc;
    }
  }
  .check {
    height: 60 * 3px;
    font-size: 24px;
    font-weight: 800;
    padding: 0 10px;
    background: #1aad19;
    color: #fff;
  }
}
</style>
