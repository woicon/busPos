<template>
    <div>
        <div class="head">
            <div class="ico ico-ok"></div>
            <div class="pay-title">收款成功</div>
        </div>
        <div class="lines">
            <div>
                <div> 收款金额</div>
                <div class="total">¥{{order.total}}</div>
            </div>
            <div>× {{order.psgnum}}张</div>
        </div>

        <div @click="backHome" class="button button-green">返回</div>
    </div>
</template>

<script>
export default {
  name: "paydetail",
  data() {
    return {};
  },
  created() {
    this.order = this.$route.query;
  },
  methods: {
    backHome() {
      this.$router.push({ path: "/home" });
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  text-align: center;
  padding: 50px 0;
}
.total {
  font-weight: 800;
  font-size: 18px;
}
.ico {
  font-size: 40px;
  color: #1aad19;
}
.pay-title {
  font-size: 14px;
  font-weight: 800;
  margin: 10px 0;
}
.lines {
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}
</style>
