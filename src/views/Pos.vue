<template>
    <div class="pos">
        <div class="head">
            <div class="num">
                {{total}}
            </div>
        </div>
        <div class="keyborder">
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
                <div class="check" @click="creatOrder">收款</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Pos",
  data() {
    return {
      total: 0
    };
  },
  created() {
    this.$message("hello world!");
  },
  methods: {
    touchKey(e) {
      console.log(e);
      let total = this.total;
      let num = e.target.innerText;
      console.log(num);
      let decimalReg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
      let _total = `${total}${num}`;
      console.log(_total);
      let nums = total == "0" ? total : num;
      console.log(nums);
      let totals =
        total == "0"
          ? nums != "."
            ? nums
            : "0."
          : decimalReg.test(_total)
            ? _total
            : total;

      this.total = totals;
      console.log(totals);
    },
    delNum() {},
    creatOrder() {}
  }
};
</script>

<style lang="less" scoped>
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

.num {
  margin: 50px 20px;
  background: #fff;
  padding: 10px 20px;
  font-size: 30px;
  color: #444;
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
  bottom: 0;
  height: 200px;
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
    height: 55px;
    font-size: 24px;
    position: relative;
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
    height: 55px;
    position: relative;
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
    height: 55 * 3px;
    font-size: 24px;
    font-weight: 800;
    padding: 0 10px;
    background: #1aad19;
    color: #fff;
  }
}
</style>
