<template>
  <el-table 
    :data="formatData"
    highlight-current-row
    @selection-change="selsChange"
    :row-style="showRow"
    v-loading="listLoading"
    v-bind="$attrs"
    ref="mulTable"
  >
   <el-table-column v-if="columns.length === 0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
      </template>
    </el-table-column>
    <slot name="column"></slot>
    <slot/>
  </el-table>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import treeToArray from './eval'
export default {
  name: 'TreeTable',
  props: {
    /* eslint-disable */
    data: {
      type: [Array, Object],
      required: true,
      sels: [], //列表选中列
    },
    multipleTable: {
      type: [String],
      required: false,
    },

    listLoading: {
      type: Boolean,
      default: false
    },

    columns: {
      type: Array,
      default: () => []
    },

    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  methods: {
    // 接受父组件选择select事件
    toggleSelection(rows) {
      if (rows) {
        if (this.$refs.mulTable) {
          rows.forEach(row => {
            this.$refs.mulTable.toggleRowSelection(row);
          });
        };
      }
    },
    // 发射checkbox选择事件
    selsChange(sels) {
      this.sels = sels;
      this.$emit("selsChange", this.sels);
    },
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.Children && record.Children.length > 0)
    }
  },
  mounted() {
  },
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style lang="less" rel="stylesheet/less" scoped>
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: #2196F3;
    margin-left: 18px;
    text-indent: 50px;
  }
</style>
