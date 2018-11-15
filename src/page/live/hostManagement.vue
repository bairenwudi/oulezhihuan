<template>
    <!-- 主播审核 -->
    <section class="live">
        <el-col :span="25" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="账号">
					<el-input v-model="filters.username" placeholder="请输入账号"></el-input>
				</el-form-item>
                <el-form-item label="直播状态">
					<el-select v-model="filters.state" placeholder="请选择">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="直播中" value="直播中"></el-option>
                        <el-option label="未直播" value="未直播"></el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="直播分类">
					<el-select v-model="filters.classification" placeholder="请选择">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="英雄联盟" value="英雄联盟"></el-option>
                        <el-option label="绝地求生" value="绝地求生"></el-option>
                        <el-option label="穿越火线" value="穿越火线"></el-option>
                        <el-option label="地下城与勇士" value="地下城与勇士"></el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="推荐人编号">
					<el-input v-model="filters.name" placeholder="请输入推荐人编号"></el-input>
				</el-form-item>
				<el-form-item>

                <el-form-item label="分组">
					<el-select v-model="filters.grouping" placeholder="请选择">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="分组1" value="分组1"></el-option>
                        <el-option label="分组2" value="分组2"></el-option>
                    </el-select>
				</el-form-item>
                <el-button type="primary" @click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <el-col :span="25" class="toolbar" style="padding-bottom: 0px">
            <div>
                <el-form :inline="true" :model="move">
                    <el-form-item label="移动到：">
                        <el-select v-model="move.to" placeholder="请选择">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="分组1" value="分组1"></el-option>
                            <el-option label="分组2" value="分组2"></el-option>
                            <el-option label="创建" value="创建"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="直播分类">
                        <el-select v-model="move.classification" placeholder="请选择">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="直播中" value="直播中"></el-option>
                            <el-option label="未直播" value="未直播"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="primary" @click="confirm">确定</el-button>
                </el-form>
            </div>
        </el-col>

        <!-- 调取table模板例子 -->
        <table-model :tableData="users" :checkbox="true" :total="total" :pageSize="pageSize" :listLoading="listLoading" @handleCurrentChange1="handleCurrentChange">
            <template slot="el-item">
                <!-- 如果想有chebox 复选框 参考下方注释 -->
                <el-table-column type="selection" width="55"></el-table-column>

                <!-- <el-table-column type="index" width="60"></el-table-column> -->

                <el-table-column align="center" prop="c_name" label="房型名称" width="100"></el-table-column>

                <el-table-column align="center" prop="create_date" label="数量" sortable></el-table-column>

                <el-table-column align="center" prop="hcm_id" label="价格" sortable></el-table-column>

                <el-table-column align="center" prop="hcm_sort" label="价格" sortable></el-table-column>

                <el-table-column align="center" prop="p_name" label="价格" sortable></el-table-column>

                <el-table-column align="center" prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary">详情</el-button>
                    </template>
                </el-table-column>
            </template>
        </table-model>

	</section>
</template>

<script>
import { getUserListPage } from '../../api/api.js';
// 引入固定表头的table
import tableModel from '../../common/table/table.vue';
export default {
  data() {
    return {
        radio: '',
        listLoading: false,
        checked: '',
        total: 0,
        page: 1,
        pageSize: 10,
        sels: [],   //列表选中列
        filters: {
            username: '',
            name: '',
            state: '',
            classification: '',
            grouping: ''
        },
        move: {
            to: '',
            classification: '',
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
      // 点击确定
      confirm() {

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
  },
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .el-radio {
        color: #fff;
    }
</style>