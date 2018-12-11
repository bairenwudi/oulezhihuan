<template>
    <!-- 角色管理 -->
    <section class="live">
      <div style="margin-bottom: 15px;">
        <Button type="primary" @click="addRoleClick">添加角色</Button>
      </div>

      <div class="main-continer">
          <div class="ztreeView" v-if="isLoading">
            <ztree-component v-if="isSle" :data="folder" :isenable="true" :enable="enable" @clickNode="ztreeChange"></ztree-component>
          </div>
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

    <!-- 关联权限 dialog -->
    <Modal 
      v-model="appPermissionsDialog"
      title="关联权限"
      :mask-closable="false"
    >
        <div class="main-continer1">
          <div style="width: 100%">
            <tree-table :data="userRight" ref="multipleTable" @selsChange="selsChange">
              <template slot="column">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="名称" prop="label"></el-table-column>
                <el-table-column label="等级" prop="_level"></el-table-column>
              </template>
            </tree-table>
          </div>
        </div>

        <div slot="footer" align="center" style="margin-top: 20px">
          <Button @click="cencelClick">取消</Button>
          <Button type="primary" @click="confirmClick">确定</Button>
        </div>
    </Modal>


	</section>
</template>

<script>
import {
    OrganizationTree,
    getUserListPage,
    saveLiveRole,
    selectRolesForDepLive,
    updateByObjLive,
    deleteRoleByObjLive,
    updaterRight,
    selectUserRight,
    selectRightOfRole,
} from "@/api/lp-authorityManagement/api.js";
// 引入固定表头的table
import TableM from "@/common/table/table.vue";
// 引入ztree
import ztreeComponent from "@/common/ztree/zTree.vue";
// 引入树形表格
import treeTable from '@/common/TreeTable'

export default {
  data() {
    return {
      listLoading: false,

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

      isSle: true,

      rolesList: [],

      currentRow: [],

      appPermissionsDialog: false,

      associatedPermissionsRow: [],

      userRight: [],

      selsRow: [],

      ztreeIsShow: false,

      isLoading: false,

      rolesColumns: [
        {
          title: '角色名称',
          key: 'adm_role_name',
          align: 'center',
        },

        {
          title: '角色ID',
          key: 'adm_role_id',
          align: 'center',
        },

        {
          title: '操作',
          width: 450,
          align: 'center',
          render: (h, { row, index }) => {
            return (
              <div>
                <span style="margin-right: 10px">
                  <i-button type="primary" icon="" onClick={ this.editClick.bind(this, row) }>编辑</i-button>
                </span>

                <span style="margin-right: 10px">
                  <i-button type="error" icon="" onClick={ this.delClick.bind(this, row) }>删除</i-button>
                </span>

                <i-button type="warning" icon="" onClick={ this.associatedPermissions.bind(this, row) }>关联权限</i-button>
              </div>
            )
          }
        },
      ]
    };
  },

  components: {
    TableM,
    ztreeComponent,
    treeTable,
  },

  computed: {},

  methods: {
    // 获取checked数据
    selsChange(val) {
      this.selsRow = val;
      console.log(val);
    },

    toggleSel(rows) {
      if(this.$refs.multipleTable) {
        this.$refs.multipleTable.toggleSelection(rows);
      };
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 获取权限数据
    async selectUserRightFun(user_id) {
      this.userRight = [];
      const res = await selectUserRight();
      this.userRight = res.data;
    },
    // 确定角色关联按钮
    confirmClick() {
      let arr = [];
      for (let i of this.selsRow) {
        arr.push(i.id);
      };

      let params = {
        adm_role_id: this.currentRow.adm_role_id,
        adm_right_ids: arr
      };

      console.log(params);
      updaterRight(params).then(res => {
        if (res.data === 1) {
            this.$Message.success('成功');
            this.appPermissionsDialog = false;
          } else {
            this.$Message.warning(`${res.data}`);
          }
      })
    },

    // 角色关联取消做清空动作
    cencelClick() {
      this.appPermissionsDialog = false;
    },
    // 角色关联权限
    async associatedPermissions(row) {
      this.selsRow = [];
      this.currentRow = row;
      this.userRight = [];
      let params1 = {
        adm_decription: 1
      }
      const res1 = await selectUserRight(params1);
      this.userRight = res1.data;
      const { data } = await OrganizationTree({});
      this.$set(this.folder, data);
      this.appPermissionsDialog = true;
      let params2 = {
        adm_role_id: row.adm_role_id
      };
      const res2 = await selectRightOfRole(params2);
      let arr = [];
      let arr1 = [];
      // 做一下遍历操作  把父级和子级的id遍历
      res2.data.forEach(item => {
        for (let i of this.userRight) {
          if (item.adm_right_id === i.id) {
            arr.push(i);
          }
        }
      });

      arr.forEach(item => {
        for (let i of item.Children) {
          for (let f of res2.data) {
            if (f.adm_right_id === i.id) {
              arr1.push(i);
            }
          }
        }
      });
      if(this.$refs.multipleTable) {
        this.$refs.multipleTable.toggleSelection(this._.concat(arr, arr1));
      };
    },
    // 编辑
    editClick(row) {
      this.$prompt('角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputValue: row.adm_role_name,
        inputErrorMessage: '请填写完整'
      }).then(({ value }) => {
        if (value === row.adm_role_name) {
          this.$Message.success('成功');
          return false;
        };
        let params = {
          department_id: row.department_id,
          adm_role_name: value,
          adm_role_id: row.adm_role_id
        };
        updateByObjLive(params).then(res => {
          if (res.data === -1) {
            this.$Message.warning('返回同一部门下名称重复');
          } else if (res.data === 0) {
            this.$Message.warning('失败');
          } else {
            this.folder = [];
            this.isSle = false;
            this.$Message.success('成功');
            this.getOrganizationTreeFun();
            this.getRightsFun();
            setTimeout(() => {
              this.show();
            }, 100);
          }
        })
      });
    },
    // 删除
    delClick(row) {
      this.$confirm("确定要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          department_id: this.currentRow.id,
          adm_role_name: row.adm_role_name,
          adm_role_id: row.adm_role_id
        };
        deleteRoleByObjLive(params).then(res => {
          if (res.data === 1) {
            this.folder = [];
            this.isSle = false;
            this.$Message.success('成功');
            this.addDialog = false;
            this.getOrganizationTreeFun();
            this.getRightsFun();
            setTimeout(() => {
              this.show();
            }, 100);
          } else if (res.data === 2) {
            this.$Message.warning('角色已被使用，不能删除');
          } else {
            this.$Message.warning(`${res.data}`);
          }
        })
      })
    },
    // 新增方法
    addRoleClick(user, mob) {
      if(this.currentRow.length <= 0) {
        this.$Message.warning('请选择部门');
        return false 
      }
      this.$prompt('角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: '请填写完整'
      }).then(({ value }) => {
        let params = {
          department_id: this.currentRow.id,
          adm_role_name: value,
        };
        saveLiveRole(params).then(res => {
          console.log(res)
          if (res.data === 1) {
            this.folder = [];
            this.isSle = false;
            this.$Message.success('成功');
            this.addDialog = false;
            this.getOrganizationTreeFun();
            this.getRightsFun();
            setTimeout(() => {
              this.show();
            }, 100);
          } else if (res.data === 0) {
            this.$Message.warning('失败');
          } else if (res.data === 2) {
            this.$Message.warning('同一部门下角色名称重复');
          } else {
            this.$Message.error(`${res.data}`);
          }
        })
      });
    },
    handleCurrentChange(val) {
      this.page = val;
    },

    // 获取组织结构数
    getOrganizationTreeFun() {
      this.$nextTick(() => {
        OrganizationTree({}).then(res => {
          this.folder = res.data;
          this.isLoading = true;
        })
      })
    },
    // 获取ztree改变的事件
    ztreeChange(e, treeid, treeNode, clickFlag) {
      this.currentRow = treeNode;
      this.getRightsFun();
    },

    // 获取ztree改变的事件(角色关联)
    ztreeChange1(e, treeid, treeNode, clickFlag) {
      this.associatedPermissionsRow = treeNode;
    },

    // 获取右面的对应角色
    getRightsFun() {
      let params = {
        department_id: this.currentRow.id
      };
      selectRolesForDepLive(params).then(res => {
        console.log(
          res.data.shift(0)
        );
        this.rolesList = res.data;
      })
    },

    // 用于异步展示ztree
    show() {
      this.isSle = false;
      this.isSle = true;
      this.ztreeIsShow = false;
      this.ztreeIsShow = true;
    },
  },
  mounted() {
    this.getOrganizationTreeFun();
    this.selectUserRightFun();
    this.show();
    
  }
};
</script>

<style scoped lang="less">
.main-continer {
  background: #fff;
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
    width: 85%;
  }
}
</style>