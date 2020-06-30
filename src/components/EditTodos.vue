<template>
  <el-dialog
    class="dialog-edit"
    :visible="visible"
    v-if="visible"
    append-to-body
    width="35%"
    @close="handleClose"
    title="Edit"
    style="text-align: center; display: block;">
    <div v-loading="loading">
      <el-row type="flex" align="middle">
      <el-form class="form-edit"
        ref="form"
        :model="form">
        <el-form-item>
          <el-input
            width="100%"
            class="form-title"
            v-model="form.title"
            size="small"
            id="title-input"/>
        </el-form-item>
      </el-form>
    </el-row>
    <el-form>
      <strong>Todos</strong>
    </el-form>
    <el-form
      v-for="item in listItems"
      :key="item.id"
      style="display: flex"
      :model="selectedItem"
      prop="title">
      <span v-if="!item.isCreating">{{ item.content }}</span>
        <el-input
          v-else
          prop="content"
          class="form-content"
          v-model="selectedItem.content"
          size="small"
          id="title-content-input"/>
      <div v-if="!item.isCreating" style="float: right">
        <el-button @click="handleEditItems(item)" class="btn-action" type="text">
          <el-icon class="el-icon-edit" />
        </el-button>
        <el-button @click="handleDeleteItems(item)" class="btn-action" type="text">
          <el-icon class="el-icon-delete" style="color: red"/>
        </el-button>
      </div>
      <div v-if="item.isCreating">
        <el-button
          class="btn-action"
          type="text"
          @click="handleSaveItem(item)">
          <el-icon class="el-icon-check" />
        </el-button>
        <el-button
          style="color: red"
          class="btn-action"
          type="text"
          @click="handleCancelFormItems()">
          <el-icon class="el-icon-close" />
        </el-button>
      </div>
    </el-form>
    <el-button type="text" style="float: left" @click="handleCreateItems()">Thêm item</el-button>
    </div>
    <template>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="updateTitle(data.id)">Lưu</el-button>
    </span>
    </template>
  </el-dialog>
</template>
<script>
import axios from 'axios';
import userServices from '@/lib/userServices';

export default {
  name: 'EditTodos',
  props: {
    data: Object,
    visible: Boolean,
  },
  data() {
    return {
      listItems: [],
      form: {
        title: '',
      },
      selectedItem: {
        content: '',
      },
      loading: false,
    };
  },
  beforeMount() {
    this.getListItems();
  },
  methods: {
    getListItems() {
      this.form.title = this.data.title;
      this.loading = true;
      axios({
        method: 'get',
        url: `https://mockup-api.herokuapp.com/api/v1/todos/${this.data.id}/items`,
        headers: {
          Authorization: userServices.userData().auth_token,
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        this.listItems = res.data.map((item) => ({ ...item, isCreating: false }));
        this.loading = false;
      });
    },

    updateTitle(id) {
      this.loading = true;
      axios({
        method: 'put',
        url: `https://mockup-api.herokuapp.com/api/v1/todos/${id}`,
        headers: {
          Authorization: userServices.userData().auth_token,
          'Content-Type': 'application/json',
        },
        data: {
          title: this.form.title,
        },
      }).then(() => {
        this.handleClose();
        this.$message({
          title: 'Thông báo',
          type: 'success',
          message: 'Cập nhật tiêu đề thành công.',
        });
        this.loading = false;
      });
    },

    handleClose() {
      this.$emit('close');
    },

    handleCreateItems() {
      this.handleCancelFormItems();
      const newItem = {
        content: '',
        isEditing: true,
        isCreating: true,
      };
      this.selectedItem.content = newItem.content;
      this.listItems.unshift(newItem);
      this.$nextTick(() => {
        const input = document.getElementById('title-content-input');
        if (input) input.select();
      });
    },

    handleSaveItem(item) {
      // this.loading = true;
      // edit
      if (item.id) {
        axios({
          method: 'put',
          url: `https://mockup-api.herokuapp.com/api/v1/todos/${this.data.id}/items/${item.id}`,
          headers: {
            Authorization: userServices.userData().auth_token,
            'Content-Type': 'application/json',
          },
          data: {
            content: item.content,
          },
        }).then(() => {
          this.loading = false;
          this.listItems = this.listItems.map((i) => ({
            ...i,
            content: i.id === item.id ? this.selectedItem.content : i.content,
            isCreating: false,
          }));
          this.$message({
            title: 'Thông báo',
            type: 'success',
            message: 'Cập nhật thành công.',
          });
        });
      } else {
        axios({
          method: 'post',
          url: `https://mockup-api.herokuapp.com/api/v1/todos/${this.data.id}/items`,
          headers: {
            Authorization: userServices.userData().auth_token,
            'Content-Type': 'application/json',
          },
          data: {
            content: this.selectedItem.content,
          },
        }).then((response) => {
          this.loading = false;
          this.listItems = this.listItems.map((i) => ({
            ...i,
            id: i.id ? i.id : response.id,
            isCreating: false,
          }));
          this.getListItems();
          this.$message({
            title: 'Thông báo',
            type: 'success',
            message: 'Thêm mới thành công.',
          });
        });
      }
    },

    handleEditItems(row) {
      this.handleCancelFormItems();
      this.selectedItem = row;
      this.listItems = this.listItems.map((i) => ({ ...i, isCreating: i.id === row.id }));
      this.$nextTick(() => {
        const input = document.getElementById('title-content-input');
        if (input) input.select();
      });
    },

    handleDeleteItems(item) {
      axios({
        method: 'delete',
        url: `https://mockup-api.herokuapp.com/api/v1/todos/${this.data.id}/items/${item.id}`,
        headers: {
          Authorization: userServices.userData().auth_token,
          'Content-Type': 'application/json',
        },
      }).then(() => {
        this.getListItems();
        this.$notify.success({
          title: 'Thông báo',
          type: 'success',
          message: 'Xóa thành công.',
        });
      });
    },

    handleCancelFormItems() {
      const currentItem = this.listItems.findIndex((c) => !c.id);
      if (currentItem >= 0) {
        this.listItems.splice(currentItem, 1);
      }
      this.selectedItem = {
        content: '',
      };
      this.listItems = this.listItems.map((item) => ({
        ...item,
        isEditing: false,
        isCreating: false,
      }));
    },
  },
};
</script>

<style lang="scss">
.dialog-edit {
  .el-dialog__body {
    padding: 0 20px;
  }
  .el-button--primary{
    width: 100%;
  }
  form.el-form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .form-content{
    width: 90%;
  }
}
.el-dialog__body{
  .el-form-item{
    width: 100%;
  }
}
</style>
