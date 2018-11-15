<template>
    <section class="table">
        <!--列表-->
        <!-- :data 接收父组件传过来的数据 -->
        <!-- v-loading 接收父组件的变量来控制loading... -->
        <!-- :checkbox 如果父组件写了的话 就会有批量删除 -->
		<el-table :data="tableData" height="250" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <template>
        <slot name="el-item"></slot>
      </template>
		</el-table>

    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" v-if="checkbox" @click="batchRemove" :disabled="this.sels.length === 0 ">批量删除</el-button>
		</el-col>
	</section>
</template>

<script>
export default {
  name: 'tableLock',
  data() {
    return {
        sels: [],   //列表选中列
    }
  },
  props: ['tableData', 'checkbox', 'listLoading'],
  computed: {
  },
  methods: {
      selsChange () {
        console.log('selsChange');
      }
  },
  mounted () {
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>