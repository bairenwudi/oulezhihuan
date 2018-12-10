<template>
    <!-- 用户管理 -->
    <section class="live">

        <Form ref="filters" :model="filters" inline>
            <FormItem label="用户名" :label-width="50">
                <Input type="text" clearable v-model="filters.adm_account" placeholder="请输入用户名"></Input>
            </FormItem>

            <FormItem label="业务员编号" :label-width="75">
                <Input type="text" clearable v-model="filters.adm_clerk" placeholder="请输入业务员编号"></Input>
            </FormItem>

            <FormItem label="手机号码" :label-width="75">
                <Input type="text" clearable v-model="filters.adm_phonenum" placeholder="请输入手机号码号"></Input>
            </FormItem>

            <FormItem label="登陆时间" :label-width="75">
                <DatePicker 
                    type="datetimerange" 
                    format="yyyy-MM-dd HH:mm" 
                    placeholder="选择开始时间和结束时间" 
                    style="width: 300px"
                    v-model="filters.adm_last_login"
                    clearable
                ></DatePicker>
            </FormItem>

            <FormItem label="所属机构" :label-width="80">
                <Select v-model="filters.department_name" clearable placeholder="请选择" style="width:300px">
                    <Option v-for="(item, index) in allDepList" :key="index" :label="item.department_name" :value="item.department_id"></Option>
                </Select>
            </FormItem>

            <FormItem label="状态" :label-width="50">
                <Select v-model="filters.adm_account_status" clearable placeholder="请选择" style="width:300px">
                    <Option label="全部" :value="''"></Option>
                    <Option label="冻结" :value="0"></Option>
                    <Option label="正常" :value="1"></Option>
                </Select>
            </FormItem>

            <FormItem align="center">
                <span style="margin-right: 10px">
                    <Button type="primary" @click.stop="getUsersFun(filters, 1)">查询</Button>
                </span>
                <Button type="primary" @click.stop="addUserClick">新增</Button>
            </FormItem>
        </Form>

    <div class="main-continer">
        <!-- 编辑 dialog -->
        <Modal 
            v-model="editDialog"
            title="编辑用户"
            :mask-closable="false"
        >
            <Form ref="editForm" :model="editForm" :rules="editRule" :label-width="100">
                <FormItem label="用户名：" prop="adm_account">
                    <span class="separator-center">
                        {{ editForm.adm_account || '暂无' }}
                    </span>
                </FormItem>

                <FormItem label="密码：" prop="adm_passwd">
                    <Input type="password" clearable v-model="editForm.adm_passwd" placeholder="请输入密码"></Input>
                </FormItem>

                <FormItem label="姓名：" prop="adm_real_name">
                    <Input type="text" clearable v-model="editForm.adm_real_name" placeholder="请输入姓名"></Input>
                </FormItem>

                <FormItem label="手机号：" prop="adm_phonenum">
                    {{ editForm.adm_phonenum ? editForm.adm_phonenum : '暂无' }}
                </FormItem>

                <FormItem label="状态："  prop="adm_account_status">
                    <Select v-model="editForm.adm_account_status" placeholder="请选择">
                        <Option label="全部" :value="''"></Option>
                        <Option label="冻结" :value="0"></Option>
                        <Option label="正常" :value="1"></Option>
                    </Select>
                </FormItem>

                <FormItem label="支付宝账号："  prop="adm_alipay">
                    <Input type="text" clearable v-model="editForm.adm_alipay" placeholder="请输入支付宝账号"></Input>
                </FormItem>
            </Form>

            <div slot="footer" align="center">
                <Button @click="clearActionFun('editForm', 'editDialog')">取 消</Button>
                <Button type="primary" @click="saveBtn('editForm')">确 定</Button>
            </div>
        </Modal>

        <!-- 新增 dialog -->
        <Modal 
            v-model="addDialog"
            title="新增用户"
            :mask-closable="false"
        >
            <Form ref="addForm" :model="addForm" :rules="addRule" :label-width="100">
                <FormItem label="用户名：" prop="adm_account">
                    <Input type="text" clearable v-model="addForm.adm_account" placeholder="请输入用户名"></Input>
                </FormItem>

                <FormItem label="密码："  prop="adm_passwd">
                    <Input type="password" clearable v-model="addForm.adm_passwd" placeholder="请输入密码"></Input>
                </FormItem>

                <FormItem label="姓名：" prop="adm_real_name">
                    <Input type="text" clearable v-model="addForm.adm_real_name" placeholder="请输入姓名"></Input>
                </FormItem>

                <FormItem label="手机号：" prop="adm_phonenum">
                    <Input type="text" clearable v-model="addForm.adm_phonenum" placeholder="请输入手机号"></Input>
                </FormItem>

                <FormItem label="状态："  prop="adm_account_status">
                    <Select v-model="addForm.adm_account_status" placeholder="请选择">
                        <Option label="全部" :value="''"></Option>
                        <Option label="冻结" :value="0"></Option>
                        <Option label="正常" :value="1"></Option>
                    </Select>
                </FormItem>

                <FormItem label="支付宝账号："  prop="adm_alipay">
                    <Input type="text" clearable v-model="addForm.adm_alipay" placeholder="请输入支付宝账号"></Input>
                </FormItem>
            </Form>

            <div slot="footer" align="center">
                <Button @click="clearActionFun('addForm', 'addDialog')">取 消</Button>
                <Button type="primary" @click="addUserBtnClick('addForm')">确 定</Button>
            </div>
        </Modal>

        <!-- 关联角色 dialog -->
        <Modal 
            v-model="associatedDialog"
            title="关联角色"
            width="1000"
            :mask-closable="false"
        >
            <div class="associateView">
                <div class="ztreeView">
                    <ztree-component v-if="isZtreeShow" :data="folder" :isenable="true" :enable="enable" @clickNode="ztreeChange"></ztree-component>
                </div>
                <div class="tableView">
                    <TableM
                        :columns="rolesColumn"
                        :data="rolesList"
                        :loading="listLoading"
                        :total="ztreetotal"
                        @pageChange="handleCurrentChange2"
                        @selectChange="associatedChange"
                    >
                    </TableM>
                </div>
            </div>

            <div slot="footer" align="center">
                <Button @click="associatedDialog = false">取 消</Button>
                <Button type="primary" @click="associatedBtnClick">确 定</Button>
            </div>
        </Modal>

        <div class="tableView">
            <!-- 调取table模板例子 -->
            <TableM
                :columns="usersColumns"
                :data="users"
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
    userList,
    selectAllDep,
    updateAdminUser,
    getDepZTreeFun,
    selectRolesForDep,
    selectDepZTree,
    updateUserOfRole,
    userSave,
} from "@/api/lp-authorityManagement/api.js";
// 引入固定表头的table
import TableM from "@/common/table/table.vue";
// 引入ztree
import ztreeComponent from "@/common/ztree/zTree.vue";

export default {
  data() {
    let isEmpty = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写完整'));
        } else {
            callback();
        }
    };
    
    // 验证手机号
    let isPhoneEmpty = (rule, value, callback) => {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!value) {
            return callback(new Error('请填写完整'));
        } else if (!reg.test(value)) {
            return callback(new Error('手机号格式错误'));
        } else {
            callback();
        }
    };

    // 检测用户名是否为6到20位
    let userNameregValid = (rule, value, callback) => {
        let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{6,20}$/;
        console.log(value)
        if(!value) {
            return callback(new Error('请填写完整'));
        } else if (!reg.test(value)) {
            return callback(new Error('用户名必须为6~20位'));
        } else {
            callback()
        }
    };

    // 检测密码是否为6到20位
    let passWordregValid = (rule, value, callback) => {
        let reg = /^\w{6,20}$/;
        if(!value) {
            return callback(new Error('请填写完整'));
        } else if (!reg.test(value)) {
            return callback(new Error('密码必须为6~20位'));
        } else {
            callback()
        }
    };

    
    return {
        listLoading: false,

        checked: "",

        total: 0,

        page: 1,

        sels: [], //列表选中列

        folder: [],

        enable: false,

        filters: {
            adm_account: '',
            adm_clerk: '',
            adm_phonenum: '',
            adm_last_login: '',
            department_name: '',
            adm_account_status: '',
            start_time: '',
            end_time: ''
        },

        users: [],

        allDepList: [],

        rolesList: [],

        editDialog: false,

        addDialog: false,

        associatedDialog: false,

        isZtreeShow: false,

        ztreetotal: 1,

        ztreePage: 1,

        editForm: {
            adm_passwd: '',
            adm_real_name: '',
            adm_phonenum: '',
            adm_account_status: '',
            adm_alipay: ''
        },

        editRule: {
            adm_real_name: [
                { validator: isEmpty, trigger: 'blur' }
            ],
            adm_phonenum: [
                { validator: isEmpty, trigger: 'blur' }
            ],
            adm_alipay: [
                { validator: isEmpty, trigger: 'blur' }
            ]
        },

        addForm: {
            adm_account: '',
            adm_passwd: '',
            adm_real_name: '',
            adm_phonenum: '',
            adm_account_status: '',
            adm_alipay: ''
        },

        addRule: {
            adm_account: [
                { validator: userNameregValid, trigger: 'blur' }
            ],
            adm_passwd: [
                { validator: passWordregValid, trigger: 'blur' }
            ],
            adm_real_name: [
                { validator: isEmpty, trigger: 'blur' }
            ],
            adm_phonenum: [
                { validator: isPhoneEmpty, trigger: 'blur' }
            ],
            adm_alipay: [
                { validator: isEmpty, trigger: 'blur' }
            ]
        },
    
        currentRow: [],

        currentAssList: [],

        currentAssRow: [],

        usersColumns: [
            {
                title: '用户名',
                render: (h, { row, index }) => {
                    return (
                        <span>{ row.adm_account || '暂无' }</span>
                    );
                }
            },

            {
                title: '手机号码',
                render: (h, { row, index }) => {
                    return (
                        <span>{ row.adm_phonenum || '暂无' }</span>
                    );
                }
            },

            {
                title: '真实姓名',
                render: (h, { row, index }) => {
                    return (
                        <span>{ row.adm_real_name || '暂无' }</span>
                    );
                }
            },

            {
                title: '角色',
                render: (h, { row, index }) => {
                    return (
                        <span>{ row.adm_role_name || '暂无' }</span>
                    );
                }
            },

            {
                title: '所属机构',
                render: (h, { row, index }) => {
                    return (
                        <span>{ row.department_name || '暂无' }</span>
                    );
                }
            },

            {
                title: '业务员编号',
                render: (h, { row, index }) => {
                    return (
                        <span>{ row.adm_clerk || '暂无' }</span>
                    );
                }
            },

            {
                title: '支付宝账号',
                render: (h, { row, index }) => {
                    return (
                        <span>{ row.adm_alipay || '暂无' }</span>
                    );
                }
            },

            {
                title: '最近登录时间',
                render: (h, { row, index }) => {
                    return (
                        <span>{ row.adm_last_login || '暂无' }</span>
                    );
                }
            },

            {
                title: '状态',
                render: (h, { row, index }) => {
                    return (
                        <span>{ row.adm_account_status === 0 ? '冻结' : '正常' }</span>
                    );
                }
            },

            {
                title: '操作',
                width: 250,
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div class="ibutton-sparator">
                            <span style="margin-right: 10px">
                                <i-button type="primary" onClick={ this.editClick.bind(this, {row}) }>编辑</i-button>
                            </span>
                            <i-button type="warning" onClick={ this.AssociationRoleClick.bind(this, {row}) }>关联角色</i-button>
                        </div>
                    );
                }
            },
        ],
        rolesColumn: [
            {
                type: 'selection',
                width: 100
            },
            {
                title: '角色名称',
                key: 'adm_role_name'
            }
        ]
    };
  },
  computed: {},
  methods: {
    // 点击新增确定按钮
    addUserBtnClick() {
        this.$refs['addForm'].validate(valid => {
            if (valid) {
                userSave(this.addForm).then(res => {
                    if (res.data.code === 'error') {
                        this.$Message.error(`${res.data.content.msg}`);
                    } else {
                        this.$Message.success('成功');
                        this.getUsersFun();
                        this.clearActionFun('addForm', 'addDialog');
                        this.addDialog = false;
                    }
                });
            };
        })
    },

    clearActionFun(formName, dialog) {
        if(this.$refs[formName]) {
            this.$refs[formName].resetFields();
        }
        this[dialog] = false;
    },
    
    // 新增用户按钮点击
    addUserClick() {
        this.addDialog = true;
        if (this.$refs['addForm']) {
            this.$refs['addForm'].resetFields();
        };
    },
    // 关联角色
    AssociationRoleClick({row}) {
        this.currentAssRow = row;
        console.log(this.currentAssRow)
        this.associatedDialog = true;
    },

    // 编辑进行保存按钮
    saveBtn() {
        this.$refs['editForm'].validate(valid => {
            if (valid) {
                if (this.editForm.adm_passwd === '') delete this.editForm.adm_passwd;
                updateAdminUser(this.editForm).then(res => {
                    if (res.data > 0) {
                        this.$Message.success('成功');
                        this.getUsersFun();
                        this.editDialog = false;
                    } else {
                        this.$Message.error(`${res.data.msg}`);
                    }
                })
            }
        });
    },

    // 编辑
    editClick({row}) {
        this.editDialog = true;
        if (this.$refs['editForm']) {
            this.$refs['editForm'].resetFields();
        };
        this.editForm = Object.assign(this.editForm, row);
    },

    // 删除
    delClick(row) {
        console.log(row)
    },

    // 改变分页事件
    handleCurrentChange(val) {
      this.page = val;
      this.getUsersFun();
    },

    // 改变关联角色分页事件
    handleCurrentChange2(val) {
      this.ztreePage = val;
      this.getRole(this.currentRow.id, this.ztreePage);
    },

    //获取用户列表
    getUsersFun(filters, type) {
      let filter = filters || '';
      let indexPage = 1;
      let params = {
        startPos: type === 1 ? indexPage : this.page,
      };
      if (filters) {
        if (filter.adm_last_login[0] != '') {
            filter.start_time = filter.adm_last_login[0];
            filter.end_time = filter.adm_last_login[1];
        } else {
            filter.start_time = '';
            filter.end_time = '';
        }
        params = Object.assign(params, filters)
      }
      userList(params).then(res => {
        this.total = res.data[0].count;
        console.log(
            res.data.shift(0)
        );
        this.users = res.data;
        console.log(this.users);
        this.listLoading = false;
      });
    },

    // 获取ztree改变的事件
    ztreeChange(e, treeid, treeNode, clickFlag) {
        this.currentRow = treeNode;
        this.getRole(treeNode.id, this.ztreePage);
    },

    // 获取右面的角色
    getRole(treeNode, page) {
        let params = {
            startPos: page,
            department_id: treeNode
        };
        selectRolesForDep(params).then(res => {
            this.ztreetotal = res.data[0].count;
            console.log(
                res.data.shift(0)
            );
            this.rolesList = res.data;
        })
    },

    // 右面角色选择时储存对象
    associatedChange(val) {
        this.currentAssList = val;
    },

    // 关联确定按钮 
    associatedBtnClick() {
        if (this.currentAssList.length < 1) {
            this.$Message.warning('请选择角色名称');
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
                this.$Message.success('成功');
                this.getUsersFun();
                this.associatedDialog = false;
            } else {
                this.$Message.error(`${res.data}`);
            }
        });
    },

    // 获取组织结构数
    getDepZTreeFun() {
        selectDepZTree({}).then(res => {
            this.folder = res.data;
            this.isZtreeShow = true;
        });
    },

    // 点击确定
    confirm() {},

    // 点击单选框
    RadioChange(index, row) {},

    // 获取所有的机构
    getAllDepFun() {
        selectAllDep({}).then(res => {
            console.log(res);
            this.allDepList = res.data;
        })
    }
  },
  mounted() {
    this.getUsersFun();
    this.getAllDepFun();
    this.getDepZTreeFun();
  },
  components: {
    TableM,
    ztreeComponent,
  }
};
</script>

<style scoped lang="less">
.associateView {
  display: flex;
  flex-flow: row;
  width: 100%;
  .ztreeView {
    width: 40%;
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