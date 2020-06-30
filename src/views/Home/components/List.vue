<template>
  <div class="list-todos">
    <br>
    <div class="todo-header" style="float: right">
      <el-input
        v-model="input"
        @input="searchItems"
        size="mini"
        placeholder="Tìm kiếm"
        style="width: 65%; margin-right: 10px"></el-input>
      <el-button @click="handleCreate()" size="mini" type="success">Tạo mới</el-button>
    </div>
    <el-table
      :data="listTodos"
      style="width: 100%">
      <el-table-column label="Tên công việc">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <el-form
              class="form-edit"
              ref="form"
              v-if="scope.row.isCreating"
              :key="'edit-form'"
              :model="form"
              :rules="rules">
              <el-form-item
                prop="title">
                <el-input
                  class="form-title"
                  v-model="form.title"
                  size="small"
                  id="title-input"/>
              </el-form-item>
              <div v-loading="loading">
                <el-button class="btn-action" type="text" @click="handleSaveCreate()">
                  <el-icon class="el-icon-check" />
                </el-button>
                <el-button class="btn-action" type="text" @click="handleCancelForm()">
                  <el-icon class="el-icon-close" />
                </el-button>
              </div>
            </el-form>
            <router-link to>
              <span @click="openSmallTodos(scope.row)">{{ scope.row.title }}</span>
            </router-link>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" class="selecRight" align="right">
        <template slot-scope="scope">
          <el-row v-if="!scope.row.isCreating">
            <el-button @click="openEditPopUp(scope.row)" size="mini">Edit</el-button>
            <el-button
              @click="openDeletePopUp(scope.row)"
              size="mini"
              type="danger">Delete</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="5"
      :page-count="totalPage"
      @current-change="changePage"
      :current-page="currentPage">
    </el-pagination>
    <small-todos
      :data="selectedRow"
      :visible="visibleShowInfo"
      @close="visibleShowInfo = false">
    </small-todos>
    <edit-todos
      v-if="visibleShowEdit"
      :data="selectedRow"
      @close="visibleShowEdit = false;"
      :visible="visibleShowEdit">
    </edit-todos>
    <confirm-delete-popup
      :data="selectedRow"
      @confirm="handleDelete"
      @close="visibleDeletePopup = false"
      :visible="visibleDeletePopup">
    </confirm-delete-popup>
  </div>
</template>

<script>
import axios from 'axios';
import userServices from '@/lib/userServices';
import ConfirmDeletePopup from '@/components/ConfirmDelete.vue';
import EditTodos from '@/components/EditTodos.vue';
import smallTodos from './SmallToDos.vue';

export default {
  name: 'ToDosList',
  props: {
    data: Object,
    visible: Boolean,
  },
  components: {
    smallTodos,
    ConfirmDeletePopup,
    EditTodos,
  },
  data() {
    const validateTitle = (rule, value, callback) => {
      console.log('validateTitle', value, rule);
      if (value === '') {
        callback(new Error('Tiêu đề không được để trống.'));
      } else {
        callback();
      }
    };
    return {
      todos: [],
      listTodos: [],
      form: {
        title: '',
      },
      errors: {
        title: '',
      },
      rules: {
        title: [
          { validator: validateTitle, trigger: 'blur' },
        ],
      },
      selectedItem: {},
      input: '',
      selectedRow: null,
      visibleDeletePopup: false,
      visibleShowInfo: false,
      visibleShowEdit: false,
      currentPage: 1,
      totalPage: 0,
      loading: false,
    };
  },
  created() {
    this.getListTodo(this.currentPage, 10);
  },
  mounted() {
    this.getListTodo();
  },
  methods: {
    getListTodo() {
      axios({
        method: 'get',
        url: `https://mockup-api.herokuapp.com/api/v1/todos?page=${this.currentPage}&limit=10`,
        headers: {
          Authorization: userServices.userData().auth_token,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        this.listTodos = response.data;
        this.totalPage = parseInt(response.headers['x-total-pages'], 0);
        console.log(this.listTodos);
      });
    },

    handleCreate() {
      this.handleCancelForm();
      const newTitle = {
        title: '',
        isEditing: true,
        isCreating: true,
      };
      this.form.title = newTitle.title;
      this.listTodos.unshift(newTitle);
      this.$nextTick(() => {
        const input = document.getElementById('title-input');
        if (input) input.select();
      });
    },

    handleSaveCreate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('valid', valid);
        }
        axios({
          method: 'post',
          url: 'https://mockup-api.herokuapp.com/api/v1/todos',
          headers: {
            Authorization: userServices.userData().auth_token,
            'Content-Type': 'application/json',
          },
          data: {
            title: this.form.title,
          },
        }).then(() => {
          this.getListTodo();
        });
      });
    },

    openEditPopUp(todo) {
      this.selectedRow = todo;
      this.visibleShowEdit = true;
      this.$nextTick(() => {
        const input = document.getElementById('title-input');
        if (input) input.select();
      });
    },

    handleCancelForm() {
      const titleTodos = this.listTodos;
      const currentTodo = titleTodos.findIndex((t) => t.isEditing || t.isCreating);
      if (currentTodo < 0) {
        return;
      }
      if (titleTodos[currentTodo].isCreating) {
        titleTodos.splice(currentTodo, 1);
      }
      this.listTodos = titleTodos.map((item) => ({
        ...item,
        isEditing: false,
        isCreating: false,
      }));
    },

    openDeletePopUp(todo) {
      this.selectedRow = todo;
      this.visibleDeletePopup = true;
    },

    handleDelete(id) {
      axios({
        method: 'delete',
        url: `https://mockup-api.herokuapp.com/api/v1/todos/${id}`,
        headers: {
          Authorization: userServices.userData().auth_token,
          'Content-Type': 'application/json',
        },
      }).then(() => {
        this.visibleDeletePopup = false;
        this.getListTodo();
      });
    },

    openSmallTodos(todo) {
      this.selectedRow = todo;
      this.visibleShowInfo = true;
    },

    changePage(val) {
      this.currentPage = val;
      this.getListTodo();
    },

    async searchItems(keyword) {
      const response = await this.handleSearch(keyword, this.currentPage, 5);
      this.listTodos = response.data;
      this.totalPage = parseInt(response.headers['x-total-pages'], 0);
    },

    handleSearch(text) {
      return axios({
        method: 'get',
        url: `https://mockup-api.herokuapp.com/api/v1/todos/search?page=${this.currentPage}&limit=10&q=${text}`,
        headers: {
          Authorization: userServices.userData().auth_token,
          'Content-Type': 'application/json',
        },
      });
    },
  },
};
</script>

<style lang="scss">
.list-todos{
  width: 50%;
  margin: auto;
}
.el-icon-undefined{
  font-size: 20px;
}
.el-icon-close{
  color: red;
}
</style>
