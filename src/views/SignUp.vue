<template>
  <el-form class="container">
    <div class="sign-up">
      <div class="screen">
      <div class="tittle"><h1>ĐĂNG KÝ TÀI KHOẢN</h1></div>
        <el-form class="nav">
          <div class="email">
            <span class="email">Email</span>
            <el-input placeholder="Email" v-model="email" type="text"/>
          </div>
          <div class="password">
            <span class="password">Mật khẩu</span>
            <el-input placeholder="Password" v-model="password" type="password" />
          </div>
          <div class="password">
            <span class="password">Nhập lại mật khẩu</span>
            <el-input placeholder="Re-Password" v-model="rePassword" type="password"/>
          </div>
          <hr>
          <el-form-item>
            <el-button
              class="btn-signup"
              type="primary"
              style="width: 100%"
              @click="signup()"
              v-loading="loading">Đăng ký</el-button>
          </el-form-item>
          <el-form-item class="signup">
            <p>Đã có tài khoản? </p>
            <router-link to="/login">
              <p>Đăng nhập</p>
            </router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-form>
</template>
<script>
import authServices from '@/services/auth';
import userServices from '@/lib/userServices';

export default {
  name: 'SignUp',
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
      rePassword: '',
      loading: false,
    };
  },
  methods: {
    signup() {
      this.loading = true;
      authServices.register({
        email: this.email,
        password: this.password,
        password_confirmation: this.rePassword,
      }).then((response) => {
        userServices.updateUserData(response.data);
        this.$router.push('/login');
      }).catch(() => {
        this.loading = false;
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
    .tittle{
      margin-bottom: 50px;
    }
  }
</style>
