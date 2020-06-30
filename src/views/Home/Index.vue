<template>
  <div id="main">
    <el-row class="header">
      <el-col :span="12">
        <h2>TODO LIST</h2>
      </el-col>
      <el-col :span="12">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ email }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button class="btn-logout" @click="handleLogout()">Đăng xuất</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <todos-list>
    </todos-list>
  </div>
</template>
<script>
import userServices from '@/lib/userServices';
import todosList from './components/List.vue';

export default {
  name: 'Main',
  components: {
    todosList,
  },
  data() {
    return {
      email: userServices.userData().email,
      selectingRow: null,
      visibleShowList: true,
    };
  },
  methods: {
    handleLogout() {
      userServices.signOut();
      this.$router.push('/login');
    },
  },

};
</script>
<style lang="scss">
#main{
  position: fixed;
  width: 100%;
  height: 100%;
  .header{
    height: 50px;
    background-color: rgba(75, 212, 189, 0.842);
    display: flex;
    text-align: center;
    align-items: center;
    h2{
      color: #fff;
    }
  }
  .el-dropdown-menu__item :hover{
    background-color: none;
  }
  .el-dropdown-link{
    cursor: pointer;
  }
  a{
    text-decoration: none;
    color: #044df5;
  }
  .form-title{
    padding-right: 10px;
  }
  .pagination{
    text-align: center;
    margin-top: 10px;
  }
  .form-edit{
    display: flex;
  }
}
</style>
