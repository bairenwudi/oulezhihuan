<template>
  <!-- 机构管理 -->
  <section class="live">
    <div style="margin-bottom: 15px;">
      <Button type="primary" @click="addClick">添加部门</Button>
    </div>

    <div class="main-continer">
        <div class="ztreeView">
            <ztree-component v-if="isZtreeShow" :data="folder" :isenable="true" :enable="enable" @clickNode="ztreeChange"></ztree-component>
        </div>
        <div class="tableView">
            <!-- 调取table模板例子 -->
            <TableM
              :columns="departmentColumns"
              :data="departmentList"
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
    ListOfInstitutions,
    OrganizationTree,
    selectDepH,
    Depsave,
    DepupdateById,
    DepdeleteById,
} from "@/api/lp-authorityManagement/api.js";
// 引入固定表头的table
import TableM from "@/common/table/table.vue";
// 引入ztree
import ztreeComponent from "@/common/ztree/zTree.vue";

export default {
  data() {
    return {
      listLoading: false,

      checked: "",

      total: 0,

      page: 1,

      pageSize: 10,

      sels: [], //列表选中列

      enable: false,

      filters: {
        username: "",
        nickname: "",
        source: {
          Ios: 1,
          Andiroid: 2
        }
      },

      ztreeIsShow: false,

      folder: [],

      departmentList: [],

      currentNode: [],

      isSle: true,

      isZtreeShow: false,

      departmentColumns: [
        {
          title: '等级',
          align: 'center',
          key: 'an_level'
        },

        {
          title: '部门名称',
          align: 'center',
          key: 'de_name'
        },

        {
          title: '操作',
          align: 'center',
          render: (h, { row, index }) => {
            return (
              <div>
                <span style="margin-right: 10px">
                  <i-button type="primary" onClick={ this.editClick.bind(this, row) }>编辑</i-button>
                </span>
                <i-button type="error" onClick={ this.delClick.bind(this, row) }>删除</i-button>
              </div>
            )
          }
        }
      ]
    };
  },
  computed: {},
  methods: {
    // 编辑
    editClick(row) {
      this.$prompt('部门', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputValue: row.de_name,
          inputErrorMessage: '请填写完整'
      }).then(({ value }) => {
        let params = {
          department_name: value,
          ancestor: this.currentNode.pId,
          department_id: row.de_id
        };
        DepupdateById(params).then(res =>{
          console.log(res);
          if (res.data >= 1) {
            this.$message.success('成功');
            this.folder = [];
            this.isSle = false;
            this.getOrganizationTreeFun();
            this.selectDepHFun(this.currentNode.id);
            setTimeout(() => {
              this.show();
            }, 100);
          } else {
            this.$message.error(`${res.data.msg}`);
          }
        })
      })
    },

    delClick(row) {
      this.$confirm("确定要删除吗?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
          let params = {
              department_id: row.de_id
          };
          DepdeleteById(params).then(res => {
            if (res.data === 2) {
              this.$message.warning(`有下属部门,不能删除`);
            } else if (res.data === 3) {
              this.$message.warning(`部门有角色,不能删除`);
            } else {
              this.$message.success('成功');
              this.selectDepHFun(this.currentNode.id);
              this.folder = [];
              this.isSle = false;
              this.getOrganizationTreeFun();
              setTimeout(() => {
                this.show();
              }, 100);
            }
          })
      })
    },

    // 改变分页事件
    handleCurrentChange(val) {
      this.page = val;
      this.selectDepHFun(this.currentNode.id);
    },

    // 获取右边的部门
    selectDepHFun(id) {
      let params = {
        an_id: id,
        startPos: this.page
      };
      selectDepH(params).then(res => {
        this.total = res.data.count;
        this.departmentList = res.data.data;
      })
    },
    
    // 添加部门
    addClick() {
      if (this.currentNode.length < 1) {
        this.$message.warning('请选择部门');
        return false;
      };
      this.$prompt('部门', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
            inputErrorMessage: '请填写完整'
        }).then(({ value }) => {
          let params = {
            department_name: value,
            ancestor: this.currentNode.id
          };
          Depsave(params).then(res => {
            if (res.data >= 1) {
              this.$message.success('成功');
              this.folder = [];
              this.isSle = false;
              this.getOrganizationTreeFun();
              setTimeout(() => {
                this.show();
              }, 100);
            } else {
              this.$message.error(`${res.data.msg}`);
            }
          })
        });
    },

    // 获取组织结构数
    getOrganizationTreeFun() {
      this.$nextTick(() => {
        OrganizationTree({}).then(res => {
          this.folder = res.data;
          this.isZtreeShow = true;
        })
      })
    },

    // 获取ztree改变的事件
    ztreeChange(e, treeid, treeNode, clickFlag) {
      this.selectDepHFun(treeNode.id);
      this.currentNode = treeNode;
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
    this.show();
  },
  created() {
    
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
  background: #fff;
  .ztreeView {
    width: 15%;
    height: 700PX;
    overflow-x: hidden;
    border: 1px solid #dcdfe6;
    border-right: 0px solid;
  }
  .tableView {
    width: 85%;
  }
}
</style>