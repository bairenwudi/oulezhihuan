<template>
    <!-- app版本更新记录 -->
    <section class="live">

    <Form ref="filters" :model="filters" inline>
        <FormItem label="App类型" :label-width="80">
            <Select v-model="filters.app_type" clearable placeholder="请选择" style="width: 300px">
                <Option label="鸥乐直播" :value="1"></Option>
                <Option label="鸥乐置换" :value="2"></Option>
            </Select>
        </FormItem>

        <FormItem label="版本类型" :label-width="75">
            <Select v-model="filters.version_type" clearable placeholder="请选择" style="width: 300px">
                <Option label="安卓" :value="1"></Option>
                <Option label="苹果" :value="2"></Option>
            </Select>
        </FormItem>

        <FormItem label="申请时间" :label-width="75">
            <DatePicker 
                type="datetimerange" 
                format="yyyy-MM-dd HH:mm" 
                placeholder="选择开始时间和结束时间" 
                style="width: 300px"
                v-model="filters.applyForDate"
                clearable
            ></DatePicker>
        </FormItem>

        <FormItem align="center">
            <span style="margin-right: 10px">
                <Button type="primary" @click.stop="getUsersFun(filters, 1)">查询</Button>
            </span>
            <Button type="primary" @click.stop="addUserClick">新增</Button>
        </FormItem>
    </Form>

    <div class="main-continer">
        <div class="tableView">
            <!-- 调取table模板例子 -->
            <TableM
                :columns="appVersionColumns"
                :data="appVersionList"
                :loading="listLoading"
                :total="total"
                @pageChange="handleCurrentChange"
              >
            </TableM>
        </div>
    </div>
	</section>
</template>


<script>
import {
    Appsave,
    selectVersion,
    updateVersion,
    deleteVersion,
} from "@/api/lp-authorityManagement/api.js";
// 引入固定表头的table
import TableM from "@/common/table/table.vue";
// 补充时间格式 不够10 补充 0
import { formatTime } from "@/common/date/formatTime.js";

export default {
  data() {

    return {
        listLoading: false,

        total: 0,

        Apppage: 1,

        filters: {
            app_type: '',
            version_type: '',
            applyForDate: []
        },

        appVersionList: [],

        searchPage: 1,

        appVersionColumns: [
            {
                title: 'App类型',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            { row.app_type ? row.app_type === '1' ? '鸥乐直播' : '鸥乐置换' : '暂无' }
                        </div>
                    )
                }
            },

            {
                title: '版本名',
                align: 'center',
                key: 'version_num',
            },

            {
                title: '版本号',
                align: 'center',
                key: 'version_code',
            },

            {
                title: '版本类型',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            { row.version_type == '1' ? 'Android' : 'IOS' }
                        </div>
                    )
                }
            },

            {
                title: '升级描述',
                align: 'center',
                key: 'version_descr'
            },

            {
                title: '是否强制升级',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            { row.is_mandatory ? row.is_mandatory === '0' ? '不强制' : '强制' : '暂无' }
                        </div>
                    )
                }
            },

            {
                title: '是否升级',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            { row.is_open ? row.is_open === '0' ? '不开放' : '开放' : '暂无' }
                        </div>
                    )
                }
            },
            
            {
                title: 'URL地址',
                align: 'center',
                key: 'download_url'
            },

            {
                title: '创建时间',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            { row.create_time ? this.dataFormat(row.create_time.time) : '暂无' }
                        </div>
                    )
                }
            },

            {
                title: '操作',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            <i-button type="primary" onClick={ this.editClick.bind(this, row) }>编辑</i-button>
                        </div>
                    )
                }
            }
        ]
    };
  },

  computed: {},

  methods: {
    // 转化时间
    dataFormat(time) {
      return formatTime(time);
    },
    // 点击新增或者编辑确定按钮
    UserBtnClick(formName) {
        if(formName === 'addForm') {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    Appsave(this[formName]).then(res => {
                        if (res.data > 0) {
                            this.$message.success('成功');
                            this.getUsersFun();
                            this.addDialog = false;
                        } else if (res.data === -1) {
                            this.$message.warning('版本号重复');
                        } else {
                            this.$message.error(`${res.data.msg}`);
                        }
                    });
                };
            })
        } else {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    delete this[formName].create_time;
                    this[formName].id = 
                    updateVersion(this[formName]).then(res => {
                        if (res.data > 0) {
                            this.$message.success('成功');
                            this.getUsersFun();
                            this.editDialog = false;
                        } else if (res.data === -1) {
                            this.$message.warning('版本号重复');
                        } else {
                            this.$message.error(`${res.data.msg}`);
                        }
                    })
                }
            });
            
        }
    },
    
    // 新增用户按钮点击
    addUserClick() {
        this.addDialog = true;
        if (this.$refs['addForm']) {
            this.$refs['addForm'].resetFields();
        };
    },

    // 编辑进行保存按钮
    saveBtn() {
        updateAdminUser(this.editForm).then(res => {
            console.log(res);
            if (res.data > 0) {
                this.$message.success('成功');
                this.getUsersFun();
                this.editDialog = false;
            } else {
                this.$message.error(`${res.data.msg}`);
            }
        })
    },

    // 编辑
    editClick(row) {
        this.editDialog = true;
        if (this.$refs['editForm']) {
            this.$refs['editForm'].resetFields();
        };
        row.is_open = row.is_open - 0;
        row.is_mandatory = row.is_mandatory - 0;
        this.editForm = Object.assign(this.editForm, row);
        console.log(row);
    },

    // 删除
    delClick(row) {
        console.log(row)
    },

    // 改变分页事件
    handleCurrentChange(val) {
      this.Apppage = val;
      this.getUsersFun();
    },

    // 改变关联角色分页事件
    handleCurrentChange2(val) {

    },

    //获取用户列表
    getUsersFun(filters, type) {
        let filter = filters || '';
        let params = {
            startPos: type ? this.searchPage : this.Apppage
        };
        if (filters) {
            if (filter.applyForDate[0] != '') {
                filter.start_time = filter.applyForDate[0];
                filter.end_time = filter.applyForDate[1];
            } else {
                filter.start_time = '';
                filter.end_time = '';
            }
        };

        for (let i in filter) {
            if (filter[i] === '' || filter[i] === undefined) {
                delete filter[i]
            }
        };
        params = Object.assign(filter, params);
        selectVersion(params).then(res => {
            this.appVersionList = res.data.data;
            this.total = res.data.count;
        })
    },

    // 关联确定按钮 
    associatedBtnClick() {
        if (this.currentAssList.length < 1) {
            this.$message.warning('请选择角色名称');
            return false;
        };
        let arr = [];
        for (let i of this.currentAssList) {
            arr.push(i.adm_role_id);
        };
        arr = arr.join(',');
        let params = {
            adm_role_ids: arr,
            adm_user_id: this.currentAssRow.adm_user_id
        };
        updateUserOfRole(params).then(res => {
            console.log(res);
            if (res.data > 0) {
                this.$message.success('成功');
                this.getUsersFun();
                this.associatedDialog = false;
            } else {
                this.$message.error(`${res.data}`);
            }
        });
    },

  },
  mounted() {
      this.getUsersFun();
  },
  components: {
    TableM,
  }
};
</script>

<style scoped lang="less">
.associateView {
  display: flex;
  flex-flow: row;
  width: 100%;
  .ztreeView {
    width: 60%;
    height: auto;
    overflow-x: hidden;
    border: 1px solid #dcdfe6;
    border-right: 0px solid;
  }
  .tableView {
    width: 100%;
  }
}
</style>