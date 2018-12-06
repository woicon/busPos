<template>
    <div class="pays">
        <div class="pay">
            <input type="text" id="payCode" v-model="payCode">
            <div class="heads">
                <div class="heads-title">收款金额</div>
                <div class="heads-total">{{order.payprice}}</div>
                <div class="head-source">×{{order.psgnum}}张</div>
            </div>
            <div id="qrcode" class="qrcode">
            </div>
            <div class="info">{{payType[currentPay]}}
                <div>用户扫码支付</div>
            </div>

            <div class="buttons">
                <div @click="scanCode" class="button" :class="[currentPay == 'WXPAY' ? 'button-green' : 'button-blue']"><i class="ico ico-scan"></i>扫描用户二维码收款</div>
            </div>

            <div class="toggle" @click="togglePay">
                <div v-for='(item, index) in payType' :id='index' :class='{active:currentPay == index}' :key='index'>
                    <i class="ico" :class="[index == 'WXPAY' ? 'ico-wxpay' : 'ico-alipay' ]"></i>{{item}}
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import QRCode from "qrcodejs2";
export default {
  name: "login",
  data() {
    return {
      imgParams: {
        appKey: sessionStorage.getItem("appKey"), //	是	string	登陆返回appKey
        orderId: 1,
        channel: "WXPAY"
      },
      total: "90.00",
      order: {},
      currentPay: "WXPAY",
      payType: {
        WXPAY: "微信收款",
        ALIPAY: "支付宝收款"
      },
      payCode: "null"
    };
  },

  created() {
    this.getPayImage();
    this.busorderDetail();
    this.order = this.$route.query;
    this.imgParams.orderId = this.$route.query.orderId;
  },

  watch: {
    payCode: function(code, oldVal) {
      this.$message("code::" + code + ":::" + oldVal);
      this.scanByUser(code);
    }
  },
  updated() {
    this.$message(
      "appppppp:::" +
        document.getElementById("payCode").innerHTML +
        "::::::" +
        this.payCode
    );
  },
  methods: {
    qrcode(text) {
      console.log(this.ewm);
      let qrcode = new QRCode("qrcode", {
        width: 150,
        height: 150, // 高度
        text: text // 二维码内容
      });
    },

    togglePay(e) {
      console.log(e);
      this.currentPay = e.target.id;
      this.getPayImage();
    },
    scanByUser(arg) {
      if (arg) {
        this.$message("CODE::", arg);
        let params = {
          appKey: sessionStorage.getItem("appKey"),
          authCode: this.payCode,
          orderId: this.$route.query.orderId
        };
        this.$api.scanByUser(params).then(res => {
          console.log(res);
          this.$message(JSON.stringify(res));
          if (res.status) {
            this.toDetail();
          } else {
            this.$message(res.errorMsg);
          }
        });
      }
    },
    getPayImage() {
      let params = Object.assign(this.imgParams, {
        channel: this.currentPay
      });
      this.$api.getPayImage(params).then(res => {
        console.log(res);
        this.ewm = res.data.imageUrl;
        document.getElementById("qrcode").innerHTML = "";
        this.qrcode(res.data.imageUrl);
      });
    },
    scanCode(orderId) {
      this.$android.twoCode();
    },
    toDetail() {
      let query = {
        total: this.order.payprice,
        psgnum: this.order.psgnum
      };
      this.$router.push({ path: "/paydetail", query: query });
    },
    busorderDetail() {
      let params = this.imgParams;
      this.$api.busorderDetail(params).then(res => {
        console.log(res);
        if (res.data.orderStatus == 2) {
          this.toDetail();
        } else {
          setTimeout(() => {
            this.busorderDetail();
          }, 4000);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.pays {
  background: #f1f1f1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.head-source {
  font-size: 12px;
}

.heads {
  text-align: center;
  margin-bottom: 20px;
  padding: 30px 0 10px;
  &-title {
    color: #666;
    font-size: 12px;
  }
  &-total {
    font-weight: 800;
    font-size: 32px;
  }
}

.info {
  font-size: 14px;
  margin-top: 10px;
  color: #888;
  text-align: center;
}

.pay {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  margin: 10% 20px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.toggle {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  &:before {
    content: "";
    display: block;
    border-top: 1px solid #eee;
    position: absolute;
    left: -50%;
    right: -50%;
    top: 0;
    transform: scaleX(0.5);
    height: 1px;
  }
  & > div {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    color: #999;
    padding: 15px 0;
    position: relative;
    &#WXPAY.active {
      color: #1aad19;
    }
    &#ALIPAY.active {
      color: #108ee9;
    }
    &:first-child::after {
      content: "";
      display: block;
      border-right: 1px solid #eee;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 1px;
      transform: scaleY(0.5);
    }
  }
  .ico {
    font-size: 22px;
  }
}

.qrcode {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
}

.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  i {
    font-size: 20px;
    margin-right: 8px;
    color: #666;
  }
  & > div {
    width: 100%;
  }
}

.buttons {
  margin: 20px 20px 0;
  width: 100%;
  padding: 0 20px;
}

.button {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  .ico {
  }
}

.ico {
  margin-right: 10px;
  font-size: 20px;
}

input {
  width: 100%;
}

.button {
  margin-top: 20px;
}
</style>

