<template>
  <div class="app-container">
    <div style="margin-bottom: 15px;">
      <Button type="primary" @click="showAddDialogClick">新增权限</Button>
    </div>

    <tree-table :data="data" :listLoading="listLoading">
      <template slot="column">
        <el-table-column align="center" prop="" label="" :sortable="false" width="30">
            <template slot-scope="scope">
                <label for="radio">
                    <el-radio class="radio" v-model="rightsRadio" :label="scope.row.id" @change="getRowInfo(scope.row)"></el-radio>
                </label>
            </template>
        </el-table-column>

        <el-table-column label="名称" prop="label"></el-table-column>

        <el-table-column label="等级" prop="_level"></el-table-column>

        <el-table-column
          align="center"
          label="操作">
              <template slot-scope="scope">
                <Button type="primary" @click="editShowDialogClick(scope.row)">编 辑</Button>
                <Button type="error" @click="delClick(scope.row)">删 除</Button>
              </template>
        </el-table-column>

      </template>
    </tree-table>

    <!-- 增加权限 dialog -->
    <Modal 
      v-model="addDialog"
      title="新增权限"
      :mask-closable="false"
    >
      <Form ref="addForm" :model="addForm" :rules="addRule" :label-width="100">
        <FormItem label="权限名称：" prop="adm_right_name">
          <Input type="text" clearable v-model="addForm.adm_right_name" placeholder="请输入权限名称"></Input>
        </FormItem>

        <FormItem label="路由名称：" prop="adm_url">
          <Input type="text" clearable v-model="addForm.adm_url" placeholder="请输入路由名称"></Input>
        </FormItem>

        <FormItem label="Vue组件：" prop="vue_component">
          <Input type="text" clearable v-model="addForm.vue_component" placeholder="请输入Vue组件"></Input>
        </FormItem>

        <FormItem label="属于：" prop="adm_decription">
            <Select v-model="addForm.adm_decription" placeholder="请选择">
              <Option :value="2" label="直播"></Option>
              <Option :value="1" label="置换"></Option>
              <Option :value="3" label="商城"></Option>
            </Select>
        </FormItem>
      </Form>

      <div slot="footer" algin="center">
        <Button @click="addDialog = false">取 消</Button>
        <Button type="primary" @click="addSaveClick('addForm')">确 定</Button>
      </div>
    </Modal>

    <!-- 编辑权限 dialog -->

    <Modal 
      v-model="editDialog"
      title="编辑权限"
      :mask-closable="false"
    >
      <Form ref="editForm" :model="editForm" :rules="editRule" :label-width="100">
        <FormItem label="权限名称：" prop="adm_right_name">
          <Input type="text" clearable v-model="editForm.adm_right_name" placeholder="请输入权限名称"></Input>
        </FormItem>

        <FormItem label="路由名称：" prop="adm_url">
          <Input type="text" clearable v-model="editForm.adm_url" placeholder="请输入路由名称"></Input>
        </FormItem>

        <FormItem label="Vue组件：" prop="vue_component">
          <Input type="text" clearable v-model="editForm.vue_component" placeholder="请输入Vue组件"></Input>
        </FormItem>

        <FormItem label="属于：" prop="adm_decription">
            <Select v-model="editForm.adm_decription" placeholder="请选择">
              <Option :value="2" label="直播"></Option>
              <Option :value="1" label="置换"></Option>
              <Option :value="3" label="商城"></Option>
            </Select>
        </FormItem>
      </Form>

      <div slot="footer" algin="center">
        <Button @click="editDialog = false">取 消</Button>
        <Button type="primary" @click="editSaveClick('editForm')">确 定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/common/TreeTable'

import {
  selectUserRight,
  saveUserRight,
  updateUserRight,
  deleteUserRight,
} from '@/api/lp-authorityManagement/api.js';


export default {
  data() {
    let isEmpty = (rule, value, callback) => {
      if(!value) {
        return callback(new Error('请您填写完整'))
      } else {
        callback();
      }
    };
    return {
      data: [],

      rightsRadio: '',

      currentRow: [],

      currentEditRow: [],

      addDialog: false,

      listLoading: true,

      addForm: {
        adm_right_name: '',
        vue_component: '',
        adm_url: '',
        adm_decription: 2
      },

      addRule: {
        adm_right_name: [
          { validator: isEmpty, trigger: 'blur' },
        ],
        adm_url: [
          { validator: isEmpty, trigger: 'blur' },
        ],
        vue_component: [
          { validator: isEmpty, trigger: 'blur' },
        ]
      },

      editDialog: false,

      editForm: {
        adm_right_name: '',
        vue_component: '',
        adm_decription: 2,
        adm_url: ''
      },

      editRule: {
        adm_right_name: [
          { validator: isEmpty, trigger: 'blur' },
        ],
        adm_url: [
          { validator: isEmpty, trigger: 'blur' },
        ],
        vue_component: [
          { validator: isEmpty, trigger: 'blur' },
        ]
      },
    }
  },

  components: { 
    treeTable
  },

  methods: {
    // 点击编辑按钮
    editShowDialogClick(row) {
      console.log(row)
      this.editDialog = true;
      this.currentEditRow = row;
      this.editForm.adm_right_name = row.label;
      this.editForm.adm_url = row.adm_url;
      this.editForm.vue_component = row.vue_component;
    },

    // 编辑保存按钮
    editSaveClick() {
      this.$refs['editForm'].validate(valid => {
        if (valid) {
          let params = {
            adm_right_id: this.currentEditRow.id,
            adm_right_name: this.editForm.adm_right_name,
            vue_component: this.editForm.vue_component,
            adm_decription: this.editForm.adm_decription,
            adm_url: this.editForm.adm_url
          };

          updateUserRight(params).then(res => {
            if (res.data >= 1) {
              this.$Message.success('成功');
              this.editDialog = false;
              this.selectUserRightFun();
            } else if (res.data >= -1) {
              this.$Message.warning('权限名称重复');
            } else {
              this.$Message.error(`${res.data}`);
            }
          })
        }
      });
    },

    // 获取当前的对象
    getRowInfo(row) {
      this.currentRow = row;
    },

    // 删除
    delClick(row) {
      this.$confirm("确定要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          adm_right_id: row.id
        };
        deleteUserRight(params).then(res => {
          if (res.data >= 1) {
            this.$Message.success('成功');
            this.selectUserRightFun();
          } else {
            this.$Message.error(`有角色绑定当前权限，不能删除`);
          }
        })
      });
    },

    // 获取权限数据
    selectUserRightFun() {
      this.listLoading = true;
      let params = {
        adm_user_id: JSON.parse(localStorage.user).adm_user_id,
        adm_decription: 2
      };
      selectUserRight(params).then(res => {
        this.data = res.data;
        this.listLoading = false;
      })
    },

    // 显示添加权限dialog
    showAddDialogClick() {
      this.addDialog = true;
    },

    // 添加权限
    addSaveClick() {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          let Id;
          this.currentRow ? Id = this.currentRow.id : Id = '';
          let params;
          if (Id !== '') {
            params = {
              adm_right_id: Id
            }
            this.addForm = Object.assign(this.addForm, params);
          };

          saveUserRight(this.addForm).then(res => {
            if (res.data >= 1) {
              this.$Message.success('成功');
              this.addDialog = false;
              this.selectUserRightFun();
            } else if (res.data >= -1) {
              this.$Message.warning('权限名称重复');
            }  else {
              this.$Message.error(`${res.data}`);
            }
          })
        }
      })
    },
  },

  mounted() {
    this.selectUserRightFun();
  },
}
</script>
