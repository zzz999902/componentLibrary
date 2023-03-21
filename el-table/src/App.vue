<template>
  <div id="app">
    <BaseTable
      ref="table"
      show-selection
      showIndex
      showPageNation
      :columnItems="columnItems"
      :tableData="ProductBomList"
      :pageInfo="pageInfo"
      @selectionHandle="selectionChangeHandle"
      :loading="loading"
      @pagination="pagchange"
      @currentChange="pagchange"
      :maxHeight="1000"
    >
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="{ row }">
          <el-button type="text" @click="deleteRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </BaseTable>
    <BaseDialog
      :visible="disableMaterialVisible"
      :title="enableOrDisableTitle"
      width="500px"
      @cancelDialog="cancelDisableDialog"
      @confirmDialog="confirmEnableOrDisableDialog"
    >
      <span class="disableContent">是否继续当前操作？</span>
    </BaseDialog>
  </div>
</template>

<script>
import BaseTable from './components/BaseTable/index.vue';
import BaseDialog from './components/BaseDialog/index.vue';
import { ProductBomList, columnItems } from './config/index';
export default {
  components: { BaseTable, BaseDialog },
  data() {
    return {
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      loading: false,
      columnItems: columnItems(this.handleCLick),
      ProductBomList,
      // 弹窗
      disableMaterialVisible: false,
      enableOrDisableTitle: '弹窗',
      deleteId: '',
    };
  },
  methods: {
    // 删除
    deleteRow(row) {
      console.log('删除', row);
      this.deleteId = row;
      this.disableMaterialVisible = true;
    },
    // name点击
    handleCLick(row) {
      console.log(row, '拿到name的数据可进行操作');
    },
    // 被选中的table列
    selectionChangeHandle(e) {
      console.log('多选框', e);
    },
    // 翻页
    pagchange(e) {
      this.pageInfo = e;
    },
    // 弹窗
    cancelDisableDialog() {
      this.disableMaterialVisible = false;
    },
    // 操作弹窗
    async confirmEnableOrDisableDialog() {
      try {
        // await getIncontactaction(this.deleteId); // 发送请求
        this.$message({
          message: '撤回成功',
          type: 'success',
        });
        this.disableMaterialVisible = false;
        // this.getAreaList(); //刷新列表
      } catch (error) {
        this.$message.error(error);
      }
    },
  },
};
</script>

<style>
#app {
  width: 100%;
  margin: 0 auto;
}
</style>
