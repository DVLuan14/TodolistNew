<template>
  <el-form>
    <div class="sign-up">
        <div class="tittle"><h1>ĐĂNG KÝ</h1></div>
      <div class="screen">
        <div class="nav">
          <div class="email">
            <span class="email">Email</span>
            <el-input v-model="email" type="text"/>
          </div>
          <div class="password">
            <span class="password">Mật khẩu</span>
            <el-input v-model="password" type="password" />
          </div>
          <div class="password">
            <span class="password">Nhập lại mật khẩu</span>
            <el-input v-model="rePassword" type="password"/>
          </div>
          <hr>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="signup">Đăng ký</el-button>
          </el-form-item>
          <el-form-item class="signup">
            <p>Đã có tài khoản? </p>
            <router-link to="/login">
              <p>Đăng nhập</p>
              </router-link>
          </el-form-item>
          <div class="footer"><p>Coppyright @2020</p></div>
        </div>
      </div>
    </div>
  </el-form>
</template>
<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
      rePassword: '',
    };
  },
  methods: {
    signup() {
      axios.post(`https://mockup-api.herokuapp.com/auth/signup?email=${this.email}&password=${this.password}&password_confirmation=${this.rePassword}`, {
        Headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>
<style lang="scss" >
  @import "@/assets/stylesheets/signup.scss";
  .signup{
    display: flex;
    justify-content: center;
    a{
      margin: 0 5px;
    }
  }
</style>
