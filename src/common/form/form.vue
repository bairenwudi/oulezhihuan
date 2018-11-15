<template>
    <!-- 主播审核 -->
    <section class="live">
        <!--列表-->
		<el-table :data="formData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <template>
                <slot name="el-item"></slot>
            </template>
		</el-table>

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length === 0 ">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->
	</section>
</template>

<script>
import { getUserListPage } from '../../api/api.js';
export default {
  name: 'formRule',
  data() {
    return {
        input: '',
        listLoading: false,
        total: 0,
        pageSize: 10,
        page: 1,
        sels: [],   //列表选中列
        filters: {
            name: '',
            state: '',
            date1: '',
            date2: ''
        },
        formRule: [
            {
                tab:'姓名',
                sortable: true
            },
            {
                tab:'年龄',
                sortable: true
            },
            {
                tab:'性别',
                sortable: false
            }
        ],
        num: 1
    }
  },
  props: ['formData'],
  computed: {

  },
  methods: {
      getUsers() {
          // do something...
      },
      handleAdd() {
          // do something...
      },
      handleEdit (index, row) {
        console.log(index, row);
      },
      handleDel (index, row) {
        console.log(index, row);
      },
      selsChange () {
        console.log('selsChange');
      },
      batchRemove () {
        console.log('batchRemove');
      },
      handleCurrentChange (page) {
        console.log(page);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      //获取用户列表
      getUsers() {
        let para = {
           startPos: this.page,
        };
        this.listLoading = true;
        getUserListPage(para).then((res) => {
            this.total = res.data[0].count;
            this.users = res.data;
            console.log(res.data.shift(0));
            this.listLoading = false;
        });
      },
      backUser () {
        for (let p of this.users) {
            for (let i in p) {
                return i;
            }
        }
      }
  },
  mounted () {
    // this.getUsers();
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>