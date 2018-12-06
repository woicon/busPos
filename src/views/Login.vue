<template>
    <div class="login">
        <form @submit.prevent="login">
        <div class="line bline">
            <i class="ico-user"></i>
            <div>
                <input name="loginName" v-model="loginData.loginName" type="text" placeholder="请输入账号"></div>
        </div>
        <div class="line bline">
            <i class="ico-lock"></i>
            <div>
                <input name="loginPwd" v-model="loginData.loginPwd" type="password" placeholder="请输入密码"></div>
        </div>
        <input type="hidden" name="deviceSN" v-model="loginData.deviceSN">
        <button type="submit" class="button button-green">登录</button>
        </form>
    </div>
</template>

<script>
import md5 from "js-md5";
export default {
  name: "login",
  data() {
    return {
      loginData: {
        loginName: "gt001",
        loginPwd: "gt001",
        deviceSN: "es"
      }
    };
  },
  methods: {
    login(e) {
      console.log(e);
      this.loginData.loginPwd = md5(this.loginData.loginPwd);
      this.$api.login(this.loginData).then(res => {
        console.log(res);
        let data = res.data;
        if (data.status) {
          sessionStorage.setItem("appKey", data.data.appKey);
          this.$router.push({ path: "/home" });
        } else {
          alert(data.errorMsg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  margin: 90px 40px 0;
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
button.button {
  width: 100%;
  margin: 20px 0;
}
input {
  width: 100%;
}

.button {
  margin-top: 20px;
}
</style>

