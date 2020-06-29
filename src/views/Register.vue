/**
* @Author:Wang Jun
* @Date:2020/6/25/025 22:23
* @Description:注册页面
*/
<template>
  <div class="register">
    <base-nav :title="loginTitle"></base-nav>
    <!--注册页面标题-->
    <div class="register__title">{{ title }}</div>
    <form class="register__form">
      <!--用户名输入框-->
      <p class="form">
        <input
          class="register__form__username"
          type="text"
          placeholder="Username"
          v-model="username"
          @blur="checkName"
        />
      </p>
      <!--密码输入框-->
      <p class="form">
        <input
          class="register__form__userpwd"
          type="password"
          placeholder="Password"
          v-model="userpwd"
        />
      </p>
      <!--确认密码输入框-->
      <p class="form">
        <input
          class="register__form__confirm-userpwd"
          type="password"
          placeholder="Confirm password"
          v-model="userpwdConfirm"
          @blur="checkPasspwdConfirm"
        />
      </p>
    </form>
    <!--登录按钮-->
    <input
      type="submit"
      value="Log in"
      class="register__form__login"
      @click="jumpToLogin"
    />
    <!--注册按钮-->
    <input
      type="submit"
      value="Register"
      class="register__form__register"
      @click="register"
    />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
var isUserExist = true;
// eslint-disable-next-line no-unused-vars
var isPwdCorrect = true;
import BaseNav from "../components/BaseNav";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      title: "Register",
      loginTitle: "",
      username: "",
      userpwd: "",
      userpwdConfirm: ""
    };
  },
  components: {
    BaseNav
  },
  methods: {
    /*跳转到登陆页面*/
    jumpToLogin() {
      this.$router.push({ path: "/login" });
    },
    /*验证两次输入的密码是否一致*/
    checkPasspwdConfirm() {
      if (this.userpwd !== this.userpwdConfirm) {
        this.$notify({
          message: "密码不一致",
          type: "danger",
          duration: 1000
        });
        isPwdCorrect = false;
      } else {
        isPwdCorrect = true;
      }
    },
    /*验证用户名是否已存在*/
    checkName() {
      axios.get("http://localhost:3001/api/login").then(response => {
        // eslint-disable-next-line no-undef
        app.arr = response.data.data;
        // eslint-disable-next-line no-undef
        for (let i = 0; i < app.arr.length; i++) {
          // eslint-disable-next-line no-undef
          if (app.arr[i].username.trim() === this.username.trim()) {
            this.$notify({
              message: "用户名已存在",
              type: "danger",
              duration: 1000
            });
            isUserExist = false;
            break;
          } else {
            isUserExist = true;
          }
        }
      });
    },
    /*注册*/
    register() {
      if (isUserExist && isPwdCorrect) {
        axios
          .post("http://localhost:3001/api/register", {
            username: this.username,
            userpwd: this.userpwd,
            userpwdConfirm: this.userpwdConfirm
          })
          .then(response => {
            // eslint-disable-next-line no-undef
            app.message = response.data.message;
            if (response.data.message === "注册成功") {
              this.$dialog.alert({
                message: "注册成功，跳转到首页"
              });
              this.$store.commit("changeCurrentUserName", this.username);
              this.$router.push("/");
            }
          });
      } else {
        this.$dialog.alert({
          message: "用户名已存在或密码不一致"
        });
      }
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
.register {
  height: 100%;
  background-color: $theme-color;
  color: white;
  padding: 0 0.8rem 0;
  &__title {
    color: white;
    font-size: 1rem;
    margin-top: 2.5rem;
  }
  &__form {
    &__username,
    &__userpwd,
    &__confirm-userpwd {
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
    &__register {
      background-color: #42b983;
      color: white;
      margin-left: 0.3rem;
    }
  }
}
</style>
