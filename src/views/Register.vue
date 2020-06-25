/**
* @Author:Wang Jun
* @Date:2020/6/25/025 22:23
* @Description:注册页面
*/
<template>
  <div class="register">
    <base-nav :title="loginTitle"></base-nav>
    <div class="register__title">{{ title }}</div>
    <form class="register__form">
      <p class="form">
        <input
          class="register__form__username"
          type="text"
          id="user"
          placeholder="Username"
          name="username"
          v-model="username"
          @blur="checkName"
        />
      </p>
      <p class="form">
        <input
          class="register__form__userpwd"
          type="password"
          id="passwd"
          placeholder="Password"
          name="userpwd"
          v-model="userpwd"
        />
      </p>
      <p class="form">
        <input
          class="register__form__confirm-userpwd"
          type="password"
          id="passwd-confirm"
          placeholder="Confirm password"
          v-model="userpwdConfirm"
          @blur="checkPasspwdConfirm"
        />
      </p>
    </form>
    <input
      type="submit"
      value="Log in"
      class="register__form__login"
      style="margin-right: 10px;"
      @click="jumpToLogin"
    />
    <input
      type="submit"
      value="Register"
      class="register__form__register"
      style="margin-right: 10px;"
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
    jumpToLogin() {
      this.$router.push({ path: "/login" });
    },
    checkPasspwdConfirm() {
      if (this.userpwd != this.userpwdConfirm) {
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
    checkName() {
      axios.get("http://localhost:3001/api/login").then(response => {
        // eslint-disable-next-line no-undef
        app.arr = response.data.data;
        // eslint-disable-next-line no-undef
        for (let i = 0; i < app.arr.length; i++) {
          // eslint-disable-next-line no-undef
          if (app.arr[i].username.trim() == this.username.trim()) {
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
    register() {
      if (isUserExist && isPwdCorrect) {
        axios
          .post("http://localhost:3001/api/register", {
            username: this.username,
            userpwd: this.userpwd,
            userpwdConfirm: this.userpwdConfirm
          })
          .then(response => {
            console.log(response.data);
            // eslint-disable-next-line no-undef
            app.message = response.data.message;
            if (response.data.message == "注册成功") {
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
.register {
  height: 100%;
  background-color: #c62f2f;
  color: white;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  &__title {
    color: white;
    font-size: 1rem;
    margin-top: 2.5rem;
  }
  &__form {
    &__username,
    &__userpwd,
    &__confirm-userpwd {
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
    &__register {
      background-color: #42b983;
      color: white;
    }
  }
}
</style>
