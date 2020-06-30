/**
* @Author:Wang Jun
* @Date:2020/6/25/025 22:22
* @Description:登录页面
*/
<template>
  <div class="login">
    <base-nav :title="loginTitle"></base-nav>
    <!--表单标题-->
    <div class="login__title">{{ title }}</div>
    <form class="login__form">
      <!--用户名输入框-->
      <p class="form">
        <input
          class="login__form__username"
          type="text"
          placeholder="Username"
          v-model="username"
        />
      </p>
      <!--密码输入框-->
      <p class="form">
        <input
          class="login__form__userpwd"
          type="password"
          placeholder="Password"
          v-model="userpwd"
        />
      </p>
    </form>
    <!--登录按钮-->
    <input
      type="submit"
      value="Log in"
      class="login__form__login"
      @click="login"
    />
    <!--注册按钮-->
    <input
      type="submit"
      value="Register"
      class="login__form__register"
      @click="jumpToRegister"
    />
  </div>
</template>

<script>
import BaseNav from "../components/BaseNav";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      title: "Log In",
      loginTitle: "",
      username: "",
      userpwd: ""
    };
  },
  components: {
    BaseNav
  },
  methods: {
    /*跳转到注册页面*/
    jumpToRegister() {
      this.$router.push({ path: "/register" });
    },
    /*登录函数*/
    login() {
      var username = this.username;
      var userpwd = this.userpwd;
      var flag = false;
      axios.get("http://localhost:3001/api/login").then(response => {
        let res = response.data.data;
        let len=res.length;
        for (var i = 0; i < len; i++) {
          if (res[i].username.trim() === username.trim()) {
            flag = true;
            if (res[i].userpwd.trim() === userpwd.trim()) {
              this.$dialog.alert({
                message: "登录成功，跳转到首页"
              });
              this.$store.commit("changeCurrentUserName", this.username);
              this.$router.push("/");
            } else {
              this.$dialog.alert({
                message: "用户名或密码错误"
              });
            }
          }
        }
        if (flag === false) {
          this.$dialog.alert({
            message: "用户名不存在"
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@mixin field($width, $font-size) {
  height: 1.2rem;
  width: $width;
  border-radius: 1rem;
  border: none;
  font-size: $font-size;
}
$theme-color: #c62f2f;
.login {
  height: 100%;
  background-color: $theme-color;
  color: white;
  padding: 0 0.8rem 0;
  &__title {
    margin-top: 2.5rem;
    color: white;
    font-size: 1rem;
  }
  &__form {
    &__username,
    &__userpwd {
      @include field(80%, 0.4rem);
      padding-left: 0.5rem;
      color: #333333;
    }
    &__login,
    &__register {
      @include field(40%, 0.5rem);
      background-color: white;
      color: $theme-color;
    }
    &__login {
      background-color: #42b983;
      color: white;
      margin-right: 0.3rem;
    }
  }
}
</style>
