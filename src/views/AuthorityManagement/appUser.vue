<template>
    <!-- App用户管理 -->
    <section class="live">
        <div style="margin-bottom: 15px;">
            <Button type="primary" @click="addOrUpdateClick">新增</Button>
        </div>

        <div class="main-continer">
            <div class="tableView">
                <!-- 调取table模板例子 -->
                <TableM
                    :columns="rolesColumns"
                    :data="rolesList"
                    :loading="listLoading"
                    :total="total"
                    @pageChange="handleCurrentChange"
                >
                </TableM>
            </div>
        </div>

        <!-- 选择App权限 dialog -->
        <Modal 
            v-model="appPermissionsClickDialog"
            title="选择权限"
            :mask-closable="false"
        >
            <el-tree
                :data="permissionsList"
                show-checkbox
                :default-expand-all="false"
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps">
            </el-tree>

            <div slot="footer">
                <i-button @click="appPermissionsClickDialog = false">取 消</i-button>
                <i-button type="primary" @click="bindClick()">确 定</i-button>
            </div>
        </Modal>
	</section>
</template>


<script>
import { 
    getUserListPage,
    OrganizationTree,
    deleteCusOfRole,
    saveOrUpdateCusRole,
    selectCusRight,
    update,
} from "@/api/lp-authorityManagement/api.js";
// 引入固定表头的table
import TableM from "@/common/table/table.vue";
// 引入ztree
import ztreeComponent from "@/common/ztree/zTree.vue";

export default {
  data() {
    return {
        appPermissionsClickDialog: false,
        permissionsList: [],
        listLoading: false,
        listLoading1: false,
        checked: "",
        total: 0,
        page: 1,
        pageSize: 10,
        sels: [], //列表选中列
        folder: [],
        enable: false,
        filters: {
            username: "",
            nickname: "",
            source: {
                Ios: 1,
                Andiroid: 2
            }
        },
        rolesList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

        currentRow: [],

         rolesColumns: [
            {
                title: '角色',
                align: 'center',
                key: 'cus_role_name'
            },
            {
                title: '状态',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            <span style="margin-right: 10px">
                                <i-button type="info" onClick={ this.apppermissionsClick.bind(this, row) }>App权限</i-button>
                            </span>

                            <span style="margin-right: 10px">
                                <i-button type="primary" onClick={ this.addOrUpdateClick.bind(this, row) }>编辑</i-button>
                            </span>
                            <i-button type="error" onClick={ this.delClick.bind(this, row) }>删除</i-button>
                        </div>
                    )
                }
            },
        ]
    }
  },
  computed: {},
  methods: {
    // App权限
    apppermissionsClick(row) {
        this.currentRow = row;
        this.appPermissionsClickDialog = true;
        selectCusRight().then(res => {
            this.permissionsList = res.data;
        })
    },

    bindClick() {
        if (this.$refs.tree.getCheckedNodes().length < 1) {
            this.$message.warning('请选择一个权限');
            return false;
        };
        let arr = [];
        for (let i of this.$refs.tree.getCheckedNodes()) {
            arr.push(i.id);
        }
        arr = arr.join(',');
        let params = {
            cus_role_id: this.currentRow.cus_role_id,
            cus_right_ids: arr
        };
        update(params).then(res => {
            if (res.data > 0) {
                this.$message.success('成功');
                this.appPermissionsClickDialog = false;
                this.getrolesListFun();
            } else {
                this.$message.error(`${res.data.msg}`);
            }
        })
    },

    // 添加或修改app用户
    addOrUpdateClick(row) {
        let val;
        let cus_role_id;
        if (row.cus_role_id) {
            val = row.cus_role_name
            cus_role_id = row.cus_role_id
        }
        this.$prompt('角色', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
            inputValue: val,
            inputErrorMessage: '请填写完整'
        }).then(({ value }) => {
            if (val !== value) {
                let params = {
                    cus_role_name: value,
                    cus_role_id
                };
                params.cus_role_id === undefined ? delete params.cus_role_id : '';
                saveOrUpdateCusRole(params).then(res => {
                    if (res.data.code === 'success') {
                        this.$message.success('成功');
                        this.getrolesListFun();
                    } else {
                        this.$message.error(`${res.data.msg}`);
                    }
                });
            }
        })
    },

    // 删除
    delClick(row) {
        this.$confirm("确定要删除吗?", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            let params = {
                cus_role_id: row.cus_role_id
            };
            deleteCusOfRole(params).then(res => {
                console.log(res)
                if (res.data.code === 'success') {
                    this.$message.success('成功');
                    this.getrolesListFun();
                } else {
                    this.$message.error(`${res.data.code}`);
                }
            })
        })
    },

    // 分页改变事件
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    // 获取角色列表
    getrolesListFun() {
      getUserListPage({}).then(res => {
        this.rolesList = res.data;
        console.log(res)
        this.listLoading = false;
      });
    },
    // 获取组织结构数
    getOrganizationTreeFun() {
        OrganizationTree({}).then(res => {
            console.log(this);
            this.folder = res.data;
            setTimeout(() => {
                    
            this.enable = false;
            }, 1000)
        })
    },
    // 获取ztree改变的事件
    ztreeChange(e, treeid, treeNode, clickFlag) {
      console.log(e, treeid, treeNode, clickFlag);
    },
    handleCurrentChange3() {
        
    },
  },
  mounted() {
    this.getrolesListFun();
    this.getOrganizationTreeFun();
  },
  components: {
    TableM,
    ztreeComponent,
  }
};
</script>

<style scoped lang="less">
.main-continer {
  display: flex;
  flex-flow: row;
  width: 100%;
  .ztreeView {
    width: 15%;
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