<template>
  <el-dialog
    class="base-dialog"
    :width="width"
    :visible.sync="visible"
    :close-on-press-escape="closeOnPressEscape"
    :before-close="cancelDialog"
    :close-on-click-modal="closeOnClickModal"
  >
    <template slot="title">
      <span class="dialog-title">{{ title }}</span>
    </template>

    <slot />
    <div slot="footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button
        v-loading="confirmLoading"
        type="primary"
        @click="confirmDialog"
      >{{ confirmBtnText }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '40%'
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    confirmLoading: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$emit('openDialog')
  },
  methods: {
    cancelDialog() {
      this.$emit('cancelDialog')
    },
    confirmDialog() {
      this.$emit('confirmDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-title {
  border-bottom: 3px solid rgba(20, 132, 255, 1);
  font-weight: bold;
  padding: 5px 0;
  font-size: 16px;
}
</style>
<style lang="scss">
.base-dialog {
  .el-form {
    margin-right: 20px;
    .el-textarea__inner {
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, Arial, sans-serif;
      color: #606266;
      font-size: 14px;
    }
  }
}
</style>
