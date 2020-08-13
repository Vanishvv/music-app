/**
* @Author:Wang Jun
* @Date:2020/6/25/025 22:23
* @Description:修改密码页面
*/
<template>
  <div class="edit-password">
    <base-nav></base-nav>
    <!--表单标题-->
    <div class="edit-password__title">{{ title }}</div>
    <form class="edit-password__form">
      <!--旧密码输入框-->
      <p class="form">
        <input
          class="edit-password__form__old-password"
          type="password"
          placeholder="Old Password"
          v-model="oldPassword"
          @blur="checkOldPassword"
        />
      </p>
      <!--新密码输入框-->
      <p class="form">
        <input
          class="edit-password__form__new-password"
          type="password"
          placeholder="New Password"
          v-model="newPassword"
        />
      </p>
      <!--新密码确认输入框-->
      <p class="form">
        <input
          class="edit-password__form__confirm-userpwd"
          type="password"
          placeholder="Confirm password"
          v-model="userpwdConfirm"
          @blur="checkPasspwdConfirm"
        />
      </p>
    </form>
    <!--修改密码按钮-->
    <input
      type="submit"
      value="Submit"
      class="edit-password__form__edit"
      @click="submit"
    />
  </div>
</template>

<script>
var isOldpwdCorrect = false;
var isPwdCorrect = false;
import BaseNav from "../components/BaseNav";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      title: "Edit Password",
      oldPassword: "",
      newPassword: "",
      userpwdConfirm: ""
    };
  },
  components: {
    BaseNav
  },
  methods: {
    /*验证两次输入的密码是否一致*/
    checkPasspwdConfirm() {
      if (this.newPassword !== this.userpwdConfirm) {
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
    /*验证旧密码是否正确*/
    checkOldPassword() {
      var username = localStorage.getItem("currentUserName");
      var oldpwd = this.oldPassword;
      axios.get("http://localhost:3001/api/login").then(response => {
        let res = response.data.data;
        let len = res.length;
        for (var i = 0; i < len; i++) {
          if (res[i].username.trim() === username.trim()) {
            if (res[i].userpwd.trim() === oldpwd.trim()) {
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
    /*修改密码函数*/
    submit() {
      if (isOldpwdCorrect && isPwdCorrect) {
        axios
          .post("http://localhost:3001/api/edit", {
            username: localStorage.getItem("currentUserName"),
            newpwd: this.newPassword,
            userpwdConfirm: this.userpwdConfirm
          })
          .then(response => {
            // eslint-disable-next-line no-undef
            let msg = response.data.message;
            if (msg === "修改密码成功") {
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
@mixin field($width, $font-size) {
  height: 1.2rem;
  width: $width;
  border-radius: 1rem;
  border: none;
  font-size: $font-size;
}
.edit-password {
  height: 100%;
  background-color: #c62f2f;
  color: white;
  padding: 0 0.8rem 0;
  &__title {
    color: white;
    font-size: 1rem;
    margin-top: 2.5rem;
  }
  &__form {
    &__old-password,
    &__new-password,
    &__confirm-userpwd {
      @include field(80%, 0.4rem);
      padding-left: 0.5rem;
      color: #333333;
    }
    &__edit {
      @include field(85%, 0.5rem);
      background-color: #42b983;
      color: white;
    }
  }
}
</style>
