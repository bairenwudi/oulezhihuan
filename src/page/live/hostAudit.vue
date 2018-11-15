<template>
    <!-- 主播审核 -->
    <section class="live">
        <el-col :span="25" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="账号">
					<el-input v-model="filters.username" placeholder="请输入账号"></el-input>
				</el-form-item>
                <el-form-item label="审核状态">
					<el-select v-model="filters.state" placeholder="请选择状态">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="审核通过" value="审核通过"></el-option>
                        <el-option label="审核不通过" value="审核不通过"></el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="姓名">
					<el-input v-model="filters.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item>

                <el-form-item label="活动时间">
                    <el-date-picker
                        v-model="filters.date1"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00']"
                        placeholder="选择开始时间和结束时间"
                        :picker-options="pickerBeginDateBefore">
                    </el-date-picker>
                </el-form-item>

                <el-button type="primary" @click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <!-- 调取table模板例子 -->
        <table-model :tableData="users" :checkbox="true" :total="total" :pageSize="pageSize" :listLoading="listLoading" @handleCurrentChange1="handleCurrentChange">
            <template slot="el-item">
                <!-- 如果想有chebox 复选框 参考下方注释 -->
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->

                <!-- <el-table-column type="index" width="60"></el-table-column> -->

                <el-table-column align="center" prop="c_name" label="房型名称"></el-table-column>

                <el-table-column align="center" prop="create_date" label="数量" sortable></el-table-column>

                <el-table-column align="center" prop="hcm_id" label="价格" sortable></el-table-column>

                <el-table-column align="center" prop="hcm_sort" label="价格" sortable></el-table-column>

                <el-table-column align="center" prop="p_name" label="价格" sortable></el-table-column>

                <el-table-column align="center" prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary">详情</el-button>
                        <el-button type="primary">审核通过</el-button>
                    </template>
                </el-table-column>
            </template>
        </table-model>


        <table-lock-model :tableData="users" :checkbox="false" :listLoading="listLoading" @handleCurrentChange1="handleCurrentChange">
            <template slot="el-item">
                <!-- 如果想有chebox 复选框 参考下方注释 -->
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <!-- 如果想有radio 单选框 参考下方注释 -->
                <el-table-column align="center" prop="" label="" :sortable="false" width="50">
                    <template slot-scope="scope">
                        <label for="radio" @click="RadioChange(scope.$index, scope.row)">
                            <el-radio class="radio" v-model="radio" :label="scope.$index"></el-radio>
                        </label>
                    </template>
                </el-table-column>
                <!-- <el-table-column type="index" width="60"></el-table-column> -->

                <el-table-column align="center" prop="c_name" label="房型名称" :sortable="false" width="100"></el-table-column>

                <el-table-column align="center" prop="create_date" label="数量" :sortable="true"></el-table-column>

                <el-table-column align="center" prop="hcm_id" label="价格" sortable></el-table-column>

                <el-table-column align="center" prop="hcm_sort" label="价格" sortable></el-table-column>

                <el-table-column align="center" prop="p_name" label="价格" sortable></el-table-column>
            </template>
        </table-lock-model>

	</section>
</template>

<script>
import { getUserListPage } from '../../api/api.js';
// 引入带有分页的table
import tableModel from '../../common/table/table.vue';
// 引入固定表头的table
import tableLockModel from '../../common/table/tableLock.vue';
export default {
  data() {
    return {
        input: '',
        ztree: [],
        radio: '',
        listLoading: false,
        total: 0,
        pageSize: 10,
        checked: '',
        page: 1,
        sels: [],   //列表选中列
        filters: {
            username: '',
            name: '',
            state: '',
            date1: '',
            date2: ''
        },
        users: [],
        pickerBeginDateBefore:{
            disabledDate(time) {
                return time.getTime() < Date.now();
            }
        }
    }
  },
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
        console.log(selsChange);
      },
      batchRemove () {
        console.log(batchRemove);
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
        this.listLoading = false;
        getUserListPage(para).then((res) => {
            this.total = res.data[0].count;
            this.users = res.data;
            console.log(res.data.shift(0));
            this.listLoading = false;
        });
      },
      // 点击单选框
      RadioChange(index, row) {
        //  console.log(index, row);
      }
  },
  mounted () {
    this.getUsers();
  },
  components: {
    tableModel,
    tableLockModel
  },
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .el-radio {
        color: #fff;
    }
</style>