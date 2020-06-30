<template slot-scope="scope">
  <el-dialog
    :data="listItems"
    class="dialog-SmallTodos"
    :visible="visible"
    v-if="visible"
    append-to-body
    width="18%"
    @close="handleClose"
    style="text-align: center; display: block;">
    <div class="title">
      <h2>{{ data.title }}</h2>
    </div>
    <div v-loading="loading">
      <strong style="float: left">Todos</strong><br>
      <div class="list-items">
        <el-form
          v-for="item in listItems"
          :key="item.id">
          <el-checkbox
            type="radio"
            v-model="item.done"
            @change="checkedItems(item)">{{ item.content }}</el-checkbox>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose()">Close</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from 'axios';
import userServices from '@/lib/userServices';

export default {
  name: 'SmallToDo',
  props: {
    data: Object,
    visible: Boolean,
  },
  data() {
    return {
      listItems: [],
      loading: false,
    };
  },
  watch: {
    visible: 'getListItems',
  },
  methods: {
    getListItems() {
      this.loading = true;
      axios({
        method: 'get',
        url: `https://mockup-api.herokuapp.com/api/v1/todos/${this.data.id}/items/`,
        headers: {
          Authorization: userServices.userData().auth_token,
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        this.listItems = res.data;
        this.loading = false;
      });
    },

    checkedItems(item) {
      this.loading = true;
      axios({
        method: 'put',
        url: `https://mockup-api.herokuapp.com/api/v1/todos/${this.data.id}/items/${item.id}`,
        headers: {
          Authorization: userServices.userData().auth_token,
          'Content-Type': 'application/json',
        },
        data: {
          done: item.done,
        },
      }).then(() => {
        this.loading = false;
      });
    },

    handleClose() {
      this.$emit('close');
    },
  },
};
</script>
<style lang="scss">
  .dialog-SmallTodos{
    display: block;
    text-align: center;
    .el-dialog__header{
      padding: 0;
    }
    .el-dialog__body{
      display: block;
    }
    .el-checkbox{
      float: left;
    }
    .el-button--primary{
      width: 100%;
    }
    .list-items{
      display: grid;
      margin-top: 15px;
      line-height: 2;
    }
  }
</style>
