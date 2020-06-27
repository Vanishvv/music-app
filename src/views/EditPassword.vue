/**
* @Author:Wang Jun
* @Date:2020/6/25/025 22:23
* @Description:修改密码页面
*/
<template>
  <div class="edit-password">
    <base-nav :title="loginTitle"></base-nav>
    <div class="edit-password__title">{{ title }}</div>
    <form class="edit-password__form">
      <p class="form">
        <input
          class="edit-password__form__old-password"
          type="password"
          id="old-password"
          placeholder="Old Password"
          name="userpwd"
          v-model="oldPassword"
          @blur="checkOldPassword"
        />
      </p>
      <p class="form">
        <input
          class="edit-password__form__new-password"
          type="password"
          id="new-password"
          placeholder="New Password"
          v-model="newPassword"
        />
      </p>
      <p class="form">
        <input
          class="edit-password__form__confirm-userpwd"
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
      value="Submit"
      class="edit-password__form__edit"
      style="margin-right: 10px;"
      @click="submit"
    />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
var isOldpwdCorrect = false;
// eslint-disable-next-line no-unused-vars
var isPwdCorrect = false;
import BaseNav from "../components/BaseNav";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      title: "Edit Password",
      loginTitle: "",
      oldPassword: "",
      newPassword: "",
      userpwdConfirm: ""
    };
  },
  components: {
    BaseNav
  },
  methods: {
    checkPasspwdConfirm() {
      if (this.newPassword != this.userpwdConfirm) {
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
    checkOldPassword() {
      var username = this.$store.state.currentUserName;
      var oldpwd = this.oldPassword;
      axios.get("http://localhost:3001/api/login").then(response => {
        // eslint-disable-next-line no-undef
        app.arr = response.data.data;
        // eslint-disable-next-line no-undef
        for (var i = 0; i < app.arr.length; i++) {
          // eslint-disable-next-line no-undef
          if (app.arr[i].username.trim() === username.trim()) {
            // eslint-disable-next-line no-undef
            if (app.arr[i].userpwd.trim() === oldpwd.trim()) {
              isOldpwdCorrect = true;
              this.$notify({
                message: "旧密码正确",
                type: "success",
                duration: 1000
              });
            } else {
              this.$notify({
                message: "旧密码错误",
                type: "danger",
                duration: 1000
              });
            }
          }
        }
      });
    },
    submit() {
      if (isOldpwdCorrect && isPwdCorrect) {
        axios
          .post("http://localhost:3001/api/edit", {
            username: this.$store.state.currentUserName,
            newpwd: this.newPassword,
            userpwdConfirm: this.userpwdConfirm
          })
          .then(response => {
            // eslint-disable-next-line no-undef
            app.message = response.data.message;
            if (response.data.message == "修改密码成功") {
              this.$dialog.alert({
                message: "修改密码成功，跳转到首页"
              });
              this.$router.push("/");
            }
          });
      } else {
        this.$dialog.alert({
          message: "旧密码错误"
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.edit-password {
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
    &__old-password,
    &__new-password,
    &__confirm-userpwd {
      border-radius: 1rem;
      border: none;
      height: 1.3rem;
      width: 80%;
      padding-left: 0.5rem;
      font-size: 0.4rem;
      color: #333333;
    }
    &__edit {
      background-color: white;
      background-color: #42b983;
      color: white;
      width: 80%;
      height: 1.2rem;
      border: none;
      border-radius: 1rem;
      font-size: 0.5rem;
    }
  }
}
</style>
