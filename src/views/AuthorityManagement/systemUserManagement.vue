<style scoped lang="less">
    @import './systemUserManagement.less';
</style>
<!-- 系统用户 -->
<template>
    <div class="formView">

        <Form ref="formInline" :model="formInline" inline>

            <FormItem prop="adm_account" label="用户名" :label-width="50">
                <Input type="text" v-model="formInline.adm_account" placeholder="请输入用户名"></Input>
            </FormItem>

            <FormItem prop="adm_clerk" label="业务员编号" :label-width="75">
                <Input type="text" v-model="formInline.adm_clerk" placeholder="请输入业务员编号"></Input>
            </FormItem>

             <FormItem prop="adm_phonenum" label="手机号码" :label-width="60">
                <Input type="text" v-model="formInline.adm_phonenum" placeholder="请输入手机号码"></Input>
            </FormItem>

            <FormItem label="登录时间" prop="Date" :label-width="60">
                    <DatePicker @on-change="getFormatterTime" format="yyyy-MM-dd hh:ss:mm" v-model="formValidate.Date" type="datetimerange" placeholder="请选择日期" style="width: 300px"></DatePicker>
            </FormItem>

             <FormItem prop="department_name" label="所属机构" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in department_name" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

             <FormItem prop="adm_account_status" label="状态" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in Status" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

             <FormItem>
                <Button type="primary" @click="addClick">新增</Button>
            </FormItem>

            <FormItem>
                <Button type="primary" @click.stop="searchClick(formInline)">查询</Button>
            </FormItem>

            <!-- <FormItem>
                <i-switch v-model="loading"></i-switch>
                &nbsp;&nbsp;切换loading
            </FormItem> -->

        </Form>

        <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
        <!-- 新增提示框 -->
        <Modal v-model="addModal"
                title="新增系统用户"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="用户名" prop="adm_account">
                    <Input v-model="formValidate.adm_account" placeholder="请输入用户名"></Input>
                </FormItem>

                <FormItem label="密码" prop="adm_passwd">
                    <Input v-model="formValidate.adm_passwd" placeholder="请输入密码"></Input>
                </FormItem>

                <FormItem label="姓名" prop="adm_real_name">
                    <Input v-model="formValidate.adm_real_name" placeholder="请输入预订机构"></Input>
                </FormItem>

                <FormItem label="手机号码" prop="adm_phonenum">
                    <Input v-model="formValidate.adm_phonenum" placeholder="请输入机构手机"></Input>
                </FormItem>

                <FormItem label="验证码" prop="code">
                    <Input v-model="formValidate.code" placeholder="请输入验证码"></Input>
                </FormItem>

                <FormItem label="角色" prop="adm_role_ids">
                    <Button icon="ios-search" v-model="formValidate.adm_role_ids" class="role" @click="roleConfirm('formValidate')" :loading="loading">请选择角色</Button>
                </FormItem>

                <FormItem label="标签" prop="adm_user_type">
                    <Select v-model="formValidate.adm_user_type" placeholder="请选择">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>

                <FormItem label="支付宝账号" prop="adm_alipay" :labei-width="80">
                    <Input v-model="formValidate.adm_alipay" placeholder="请输入支付宝账号"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">保存</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

     <!--  编辑提示框 -->
        <Modal v-model="editModal"
                title="编辑系统用户"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="用户名" prop="adm_account">
                    <Input v-model="formValidate.adm_account" placeholder="请输入用户名"></Input>
                </FormItem>

                <FormItem label="密码" prop="adm_passwd">
                    <Input v-model="formValidate.adm_passwd" placeholder="请输入密码"></Input>
                </FormItem>

                <FormItem label="姓名" prop="adm_real_name">
                    <Input v-model="formValidate.adm_real_name" placeholder="请输入预订机构"></Input>
                </FormItem>

                <FormItem label="手机号码" prop="adm_phonenum">
                    <Input v-model="formValidate.adm_phonenum" placeholder="请输入机构手机"></Input>
                </FormItem>

                <FormItem label="验证码" prop="code">
                    <Input v-model="formValidate.code" placeholder="请输入验证码"></Input>
                </FormItem>

                <FormItem label="角色" prop="adm_role_ids">
                    <Input v-model="formValidate.adm_role_ids" placeholder="请输入角色"></Input>
                </FormItem>

                <FormItem label="标签" prop="adm_user_type">
                    <Select v-model="formValidate.adm_user_type" placeholder="请选择">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>

                <FormItem label="支付宝账号" prop="adm_alipay" :labei-width="100">
                    <Input v-model="formValidate.adm_alipay" placeholder="请输入支付宝账号"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">保存</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

    <!-- 删除提示框 -->
    <Modal v-model="delDilaog" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>提示</span>
        </p>
        <div style="text-align:center">
            <p>确定要删除吗？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="delLoading" @click="delConfrmClick">删除</Button>
        </div>
    </Modal>
    
    </div>
</template>

<script>

import TableM from "../../common/table/table.vue";
import {
    systemUserManagementList, //系统用户列表
    systemUserManagementSearch, //系统用户模糊查询
    systemUserManagementAdd, //系统用户添加
    systemUserManagementAddRole,//系统用户添加-角色
    systemUserManagementRoleList,//系统用户添加-角色列表
} from '../../api/lp-AuthorityManagement/api.js'

export default {
  name: "systemUserManagementModel",

  components: {
    TableM
  }, 
  data() {
    var DateValdate = (rule, value, callback) => {
            if (value[0] === '') {
                return callback(new Error('请填写完整'));
            } else {
                callback();
            }
        };

    return {
        addModal: false,
        
        editModal: false,

        visible: false,

        formValidate: {     // 定义新增表单的对象
                name: '',
                city: '',
                gender: '',
                interest: [],
                Date: [],
                time: '',
                desc: '',
                cus_nick_name:'',
                reserve_persion_phone:'',
                department_name:'',
                reserve_destination:'', 
                getFormatterTime:'',
            },
        
        payStatus:[
                    {
                        value: '已支付',
                        label: '已支付'
                    },
                    {
                        value: '未支付',
                        label: '未支付'
                    },                  
                ],
                ruleValidate: {     // 定义表单的校验规则
                cus_nick_name: [
                    { required: true, message: '请输入预订人', trigger: 'blur' }
                ],

                reserve_persion_phone: [
                    { required: true, message: '请输入预订人手机', trigger: 'blur' }
                ],

                org_name: [
                    { required: true, message: '请输入预定机构', trigger: 'blur' }
                ],

                reserve_destination: [
                    { required: true, type: 'array', min: 1, message: '请选择目的地', trigger: 'change' },
                    { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                ],

                interest: [
                    { required: true, type: 'array', min: 1, message: '请选择房型', trigger: 'change' },
                    { type: 'array', max: 1, message: '至多选择一个', trigger: 'change' }
                ],

                Date: [
                    { validator: DateValdate, trigger: 'change' }
                ],

                time: [
                    { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                ],

                desc: [
                    { required: true, message: '请输入备注', trigger: 'blur' },
                    { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
            },
        org_name: [
                    {
                        value: '申请退房',
                        label: '申请退房'
                    },
                    {
                        value: '退房中',
                        label: '退房中'
                    },
                    {
                        value: '退房完成',
                        label: '退房完成'
                    },                  
                ],
        Status:[
                    {
                        value: '北京',
                        label: '北京'
                    }
                ],
                model8:'',
        delDilaog: false,   // 控制删除弹出框
        
        delLoading: false,   // 控制删除按钮loading

        currentPageIndex: 1,    // 当前页

        columns: [    // 系统用户管理表头信息

            {
                title: "用户名",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.adm_account ? row.adm_account : `暂无${index}`)
                }
            },

            {
                title: "手机号码",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.adm_phonenum ? row.adm_phonenum : `暂无${index}`)     
                }
            },

            {
                title: "姓名",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.adm_real_name ? row.adm_real_name : `暂无${index}`)
                }
            },

            {
                title: "角色",
                width: 180,
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.adm_role_name ? row.adm_role_name : `暂无${index}`)
                }
            },

            {
                title: "所属机构",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.department_name ? row.department_name : `暂无${index}`)
                }
            },

            {
                title: "业务员编号",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.adm_clerk ? row.adm_clerk : `暂无${index}`)
                }
            },

            {
                title: "支付宝",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.adm_alipay ? row.adm_alipay : `暂无${index}`)
                }
            },

            {
                title: "最近登录时间",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.adm_last_login ? row.adm_last_login : `暂无${index}`)
                }
            },

            {
                title: "标签",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.adm_user_type ? row.adm_user_type : `暂无${index}`)
                }
            },

            {
                title: "状态",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.adm_account_status ? row.adm_account_status : `暂无${index}`)
                }
            },

            {
                title: "操作",
                width: 200,
                key: "action",
                align: "center",
                render: (h, params) => {
                    return h("div", [
                    h(
                        "Button",
                        {
                        props: {
                            type: "primary",
                            size: "small"
                        },
                        style: {
                            marginRight: "5px"
                        },
                        on: {
                            click: () => {
                                this.editClick(params);
                            }
                        }
                        },
                        "编辑"
                    ),
                    // h(
                    //     "Button",
                    //     {
                    //     props: {
                    //         type: "primary",
                    //         size: "small"
                    //     },
                    //     style: {
                    //         marginRight: "5px"
                    //     },
                    //     on: {
                    //         click: () => {
                    //             this.delClick(params);
                    //         }
                    //     }
                    //     },
                    //     "删除"
                    // ),
                    // h(
                    //     "Button",
                    //     {
                    //     props: {
                    //         type: "primary",
                    //         size: "small"
                    //     },
                    //     on: {
                    //         click: () => {
                    //             this.goToInfo(params);
                    //         }
                    //     }
                    //     },
                    //     "详情"
                    // )
                    ]);
                }
            }
        ],

        userData: [],   // 内容数据

        total: 0,   // 总页数

        formInline: {   // 定义表单对象
            cus_account: '',
            cus_nick_name: ''
        },

        ruleInline: {   // 定义规则对象
            cus_account: [
                { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            cus_nick_name: [
                { required: true, message: '请输入昵称', trigger: 'blur' }
                // { type: 'string', min: 11, message: '电话最多为11位', trigger: 'blur' }
            ]
        },

        loading: false,  // 定义loading为true

        currentPage: 1   // 定义当前页
    };
  },

  methods: {
    // 进入详情
    goToInfo(params) {
        this.$router.push({
            path: '/infoModel',
            data: params 
        })
    },

    resetTotal() {
        this.currentPage = 1;
        this.total = 1;
    },

    // 执行新增的事件
    addClick() {
            this.addModal = true;
        },

    // 点击确定按钮
        ModalConfirm(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    setTimeout(() => {
                        this.$Message.success('Success!');
                        this.Modal = false;
                        this.loading = false;
                    }, 1000)
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },

        // 点击框取消按钮
        ModalCancel(name) {
            // this.$Message.info("Clicked ok");
            // this.$refs[name].resetFields();
            this.addModal = false;
        },

    // 执行table编辑的事件
    editClick(params) {
        this.editModal = true;
        console.log(params);
    },

    // 执行删除的事件
    delClick(params) {
        console.log(params);
        this.delDilaog = true;
    },

    // 删除确定按钮
    delConfrmClick() {
        this.delLoading = true;
        setTimeout(() => {
            this.delDilaog = false;
            this.$Message.success('成功');
            console.log('我滚了');
        }, 1000)
    },

    // 获取时间
        getFormatterTime(val) {
            console.log(val);
        },

    // 改变分页触发的事件
    pageChange(pageIndex) {
        // 改变当前页
        // this.currentPage = pageIndex;
        for (let i in this.formInline) {
            if (this.formInline[i] !== undefined || this.formInline[i] !== '') {
                this.getUser(this.formInline, pageIndex);  
                return false;
            }
        };
        this.getUser();
    },

    searchClick(filter) {
        this.resetTotal();
        if (filter) {
            for (let i in filter) {
                if (filter[i] === undefined || filter[i] === '') {
                    delete filter[i];
                }
            };
        };
        this.getUser(filter);
    },

    // 为了解决异步问题
    async getUser(filter, pageIndex = 1) {
        let params = {
            pageSize: 10,
            startPos: filter ? pageIndex : this.currentPage
        };

        if (filter) {
            params = Object.assign(params, filter);
        };

        this.loading = true;
        let { data } = await systemUserManagementList(params);
        this.total = data[0].count;
        console.log(this.total)
        data.shift(0);
        this.userData = data;
        this.loading = false;
        console.log(data);
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

