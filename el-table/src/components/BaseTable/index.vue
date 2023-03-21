<template>
  <div class="baseTable">
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      :border="border"
      :row-class-name="rowClassName"
      :cell-style="tableCellStyle"
      :header-cell-style="tableHeaderCellStyle"
      :max-height="maxHeight"
      @row-click="rowClick"
      @selection-change="selectionChange"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        align="center"
        width="50"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in columnItems"
        :key="index"
        :show-overflow-tooltip="item.tooltip !== 'istooltip'"
        :sortable="item.sort"
        :width="item.width"
        :min-width="item.minWidth"
        :align="item.align"
        :fixed="item.fixed"
        :type="item.type"
        :prop="item.prop"
        :label="item.label"
      >
        <template v-slot="scope">
          <ex-slot
            v-if="item.render"
            :name="scope.$index"
            :render="item.render"
            :row="scope.row"
            :index="scope.$index"
            :column="item"
          />
          <span v-else-if="item.type === 'el-link'" class="tableLink">
            <span @click="item.handleClick(scope.row)">{{
              scope.row[item.prop] || scope.row[item.prop] === 0
                ? scope.row[item.prop]
                : '-'
            }}</span>
          </span>
          <el-tag
            v-else-if="item.type === 'el-tag'"
            :color="item.color"
            :type="item.tagType"
            :effect="item.effect ? item.effect : 'light'"
          >
            {{
              scope.row[item.prop] || scope.row[item.prop] === 0
                ? scope.row[item.prop]
                : '-'
            }}
          </el-tag>
          <span v-else-if="item.type === 'el-img'">
            <img
              v-if="scope.row[item.prop] !== ''"
              style="width: 50px; height: 50px"
              :src="scope.row[item.prop]"
            />
            <img
              v-else
              width="50px"
              height="50px"
              preview-src-list="@/assets/images/login.png"
              src="@/assets/images/login.png"
            />
          </span>
          <span v-else>{{
            scope.row[item.prop] || scope.row[item.prop] === 0
              ? scope.row[item.prop]
              : '-'
          }}</span>
        </template>
      </el-table-column>
      <slot />
    </el-table>

    <div v-if="showPageNation" class="mt-15 d-flex justify-content-end">
      <el-pagination
        background
        layout="->,total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        :page-sizes="[10, 20, 50]"
        :current-page="pageInfo.pageIndex"
        :page-size="pageInfo.pageSize"
        @size-change="sizeChangeHandle"
        @current-change="currentPageChangeHandle"
      />
    </div>
  </div>
</template>

<script>
// 自定义内容的组件
const exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index,
    };
    if (data.props.column) {
      params.column = data.props.column;
    }
    return data.props.render(h, params);
  },
};

export default {
  components: {
    exSlot,
  },
  props: {
    // table login
    loading: {
      type: Boolean,
      default: false,
    },
    // 分页数据
    pageInfo: {
      type: Object,
      default: () => ({
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      }),
    },
    border: {
      type: Boolean,
      default: true,
    },
    // 最大高度
    maxHeight: {
      type: [String, Number],
      default: '600px',
    },
    // 表头可选选项
    showSelection: {
      type: Boolean,
      default: false,
    },
    // 序号
    showIndex: {
      type: Boolean,
      default: false,
    },
    // 翻页显示
    showPageNation: {
      type: Boolean,
      default: false,
    },
    // 表头
    columnItems: {
      type: Array,
      default: () => [],
    },
    // 数据
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ids: [],
    };
  },
  watch: {
    tableData() {
      this.$nextTick(() => {
        // 当table-list修改时候，避免布局混乱，应该重触发element-table的布局
        this.$refs.table.doLayout();
      });
    },
  },
  methods: {
    // 翻页方法
    sizeChangeHandle(size) {
      this.$emit('pagination', { ...this.pageInfo, ...{ pageSize: size } });
    },
    // 翻页方法
    currentPageChangeHandle(currentPage) {
      this.$emit('current-change');
      this.$emit('pagination', {
        ...this.pageInfo,
        ...{ pageIndex: currentPage },
      });
    },
    // 选中可选表头
    selectionChange(selection) {
      this.$emit('selectionHandle', selection);
    },
    // 指定列表颜色,根据需求来.不需要可以不动代码
    rowClassName({ row }) {
      for (let i = 0; i < this.ids.length; i++) {
        const id = this.ids[i];
        if (row.id === id) {
          return 'current-row';
        }
      }
    },
    rowClick(row, column, event) {
      this.$emit('row-click', row, column, event);
      // 点击列表也能选中
      this.$refs.table.toggleRowSelection(row);
    },
    // 修改单元格样式
    tableCellStyle() {
      return 'border-color: #ededed';
    },
    // 修改表格头单元格样式
    tableHeaderCellStyle() {
      return 'border-color: #ededed';
    },
  },
};
</script>

<style lang="scss" scoped>
.valid-color {
  color: #2e3031;
}

.mt-15 {
  margin-top: 15px;
}

.invalid-color {
  color: #c4c4c4;
}

.baseTable {
  .el-tag {
    border-radius: 16px;
  }

  .el-table--border {
    border-color: #ededed;
  }

  .el-tag--success {
    background-color: #33a121;
    border-color: #33a121;
  }

  .el-tag--danger {
    background-color: #f44a45;
    border-color: #f44a45;
  }
  .el-tag--warning {
    background-color: #f68802;
    border-color: #f68802;
  }
}

::v-deep .current-row {
  background-color: #edf6ff;
}
</style>
