/**
 * @Author:Wang Jun
 * @Date:2020/6/25/025 22:22
 * @Description:登录页面
 */
<template>
  <div class="login">
    <base-nav :title="loginTitle"></base-nav>
    <div class="login__title">{{ title }}</div>
    <form class="login__form">
      <p class="form">
        <input
          class="login__form__username"
          type="text"
          id="user"
          placeholder="Username"
          name="username"
          v-model="username"
        />
      </p>
      <p class="form">
        <input
          class="login__form__userpwd"
          type="password"
          id="passwd"
          placeholder="Password"
          name="userpwd"
          v-model="userpwd"
        />
      </p>
    </form>
    <input
      type="submit"
      value="Log in"
      class="login__form__login"
      style="margin-right: 10px;"
      @click="login"
    />
    <input
      type="submit"
      value="Register"
      class="login__form__register"
      style="margin-right: 10px;"
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
    jumpToRegister() {
      this.$router.push({ path: "/register" });
    },
    login() {
      var username = this.username;
      var userpwd = this.userpwd;
      var flag = false;
      axios.get("http://localhost:3001/api/login").then(response => {
        // eslint-disable-next-line no-undef
        app.arr = response.data.data;
        // eslint-disable-next-line no-undef
        for (var i = 0; i < app.arr.length; i++) {
          // eslint-disable-next-line no-undef
          if (app.arr[i].username.trim() === username.trim()) {
            flag = true;
            // eslint-disable-next-line no-undef
            if (app.arr[i].userpwd.trim() === userpwd.trim()) {
              this.$dialog.alert({
                message: "登录成功，跳转到首页"
              });
              this.$store.commit('changeCurrentUserName', this.username);
              this.$router.push("/");
            } else {
              this.$dialog.alert({
                message: "用户名或密码错误"
              });
            }
          }
        }
        if (flag == false) {
          console.log("用户名不存在");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  background-color: #c62f2f;
  color: white;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  &__title {
    margin-top: 2.5rem;
    color: white;
    font-size: 1rem;
  }
  &__form {
    &__username,
    &__userpwd {
      border-radius: 1rem;
      border: none;
      height: 1.3rem;
      width: 80%;
      padding-left: 0.5rem;
      font-size: 0.4rem;
      color: #333333;
    }
    &__login,
    &__register {
      background-color: white;
      color: #c62f2f;
      width: 40%;
      height: 1.2rem;
      border: none;
      border-radius: 1rem;
      font-size: 0.5rem;
    }
    &__login {
      background-color: #42b983;
      color: white;
    }
  }
}
</style>
