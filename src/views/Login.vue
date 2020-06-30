<template>
  <el-form>
    <div class="login">
      <div class="screen">
        <div class="tittle"><h1>ĐĂNG NHẬP</h1></div>
        <el-form class="navsi">
          <el-form-item
            prop="email"
            label="Email*"
            class="email"
            :rules="rules">
            <el-input v-model="email" type="text"/>
          </el-form-item >
          <el-form-item
            prop="password"
            label="Password"
            class="password">
            <el-input v-model="password" type="password"/>
          </el-form-item>
          <hr>
          <el-form-item v-loading="loading">
            <el-button type="primary" style="width: 100%" @click="signIn()">Đăng nhập</el-button>
          </el-form-item>
          <el-form-item class="signup">
            <p>Chưa có tài khoản?</p>
            <router-link style="margin-left: 5px" to="/sign-up">
              <p> Đăng ký</p>
            </router-link>
          </el-form-item>
          <div class="footersi"><p>Coppyright @2020</p></div>
        </el-form>
      </div>
    </div>
  </el-form>
</template>
<script>
import axios from 'axios';
import userServices from '@/lib/userServices';

export default {
  name: 'Login',
  data() {
    return {
      email: 'admin@example.com',
      password: 'password',
      rules: {
        email: '',
      },
      loading: false,
    };
  },
  methods: {
    signIn() {
      this.loading = true;
      axios({
        method: 'post',
        url: `https://mockup-api.herokuapp.com/auth/signin?email=${this.email}&password=${this.password}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        userServices.updateUserData(response.data);
        this.$router.push('/');
      }).catch((e) => {
        this.loading = false;
        this.errors.push(e);
      });
    },
  },
};
</script>
<style lang="scss">
  @import "@/assets/stylesheets/login.scss";
  .signup .el-form-item__content{
    display: flex;
    justify-content: center;
    a{
      text-decoration: none;
      color:#007bff;
    }
  }
</style>
