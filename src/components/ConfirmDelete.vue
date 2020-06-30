<template>
  <div class="dialogDelete">
    <el-dialog
      class="title-delete"
      width="30%"
      append-to-body
      title="Xóa tiêu đề"
      :visible="visible"
      v-if="visible"
      @close="handleClose">
      <el-row>
        <el-col>
          <div class="row-title">
            <p>Bạn có chắc chắn muốn xóa <strong>{{data.title}}</strong>?</p>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Hủy</el-button>
        <el-button v-loading="loading" type="primary" @click="confirmDelete()">Xác nhận</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'ConfirmDelete',
  props: {
    data: Object,
    visible: Boolean,
  },
  data() {
    return {
      ok: '',
      loading: false,
    };
  },
  methods: {
    confirmDelete() {
      this.$emit('confirm', this.data.id);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },

    handleClose() {
      this.$emit('close');
      this.ok = '';
    },
  },
};
</script>
<style lang="scss">
.dialogDelete{
  .el-dialog__header{
    border-bottom: 1px solid #80808069;
  }
}
</style>
