<style scope lang="less">
    @import './batchReservationOrder.less';
</style>
<!--批量预定订单 -->
<template>
    <div class="formView">

        <Form ref="formInline" :model="formInline" inline>

            <FormItem prop="reserve_persion_name" label="预订人" :label-width="50">
                <Input type="text" v-model="formInline.reserve_persion_name" placeholder="请输入预订人"></Input>
            </FormItem>

            <FormItem prop="reserve_persion_phone" label="预订人手机" :label-width="75">
                <Input type="text" v-model="formInline.reserve_persion_phone" placeholder="请输入预订人手机"></Input>
            </FormItem>

             <FormItem prop="order_status" label="订单状态" :label-width="60">
               <Select v-model="formInline.order_status" clearable style="width:200px">
                 <Option v-for="item in orderStatus" :value="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

             <FormItem prop="reserve_destination" label="目的地" :label-width="60">
               <Select v-model="formInline.reserve_destination" clearable style="width:200px">
                 <Option v-for="item in destinationTitle" :value="item.reserve_destination" :key="item.value">{{ item.reserve_destination }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="check_time" label="入离时间" :label-width="60">              
             <DatePicker v-model="formInline.check_time" format="yyyy-MM-dd" type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker>
            </FormItem>

             <FormItem>
                <Button type="primary" @click="addClick">新增</Button>
            </FormItem>

            <FormItem>
                <Button type="primary" @click.stop="searchClick(formInline)">查询</Button>
            </FormItem>

        </Form>

        <TableM 
        :columns="columns" 
        :data="userData" 
        :loading="loading" 
        :current.async="currentPageIndex" 
        :total="total" 
        @pageChange="pageChange">
        </TableM>

        <!-- 新增提示框 -->
        <Modal v-model="addModal"
                title="新增"
                :mask-closable="false"
                @on-ok="AddModalConfirm('addForm')"
                @on-cancel="AddModalReset('addForm')"
            >
            <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="100">
                <FormItem label="预订人" prop="reserve_person_name">
                    <Input v-model="addForm.reserve_person_name" placeholder="请输入预订人"></Input>
                </FormItem>

                <FormItem label="预订人手机" prop="reserve_persion_phone" width='100'>
                    <Input v-model="addForm.reserve_persion_phone" placeholder="请输入预订人手机"></Input>
                </FormItem>

                <FormItem label="预定机构" prop="org_name">
                    <Input v-model="addForm.org_name" placeholder="请输入预订机构"></Input>
                </FormItem>

                <FormItem label="机构手机" prop="org_name">
                    <Input v-model="addForm.org_name" placeholder="请输入机构手机"></Input>
                </FormItem>

                <FormItem label="目的地名称" prop="reserve_destination">
                    <Select v-model="addForm.reserve_destination" clearable style="width:200px">
                 <Option v-for="item in destinationTitle" :value="item.reserve_destination" :key="item.value">{{ item.reserve_destination }}</Option>
               </Select>
                </FormItem>

                <FormItem prop="check_time" label="入离时间" :label-width="60">              
                  <DatePicker v-model="addForm.check_time" clearable format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>

                <FormItem label="入住天数" prop="org_name">
                    <Input v-model="addForm.org_name" placeholder=""></Input>
                </FormItem>

                <FormItem label="选择房型" prop="interest">
                    <CheckboxGroup v-model="addForm.interest">
                        <Checkbox label="大床"></Checkbox>
                        <Checkbox label="标准间"></Checkbox>
                        <Checkbox label="单人间"></Checkbox>
                    </CheckboxGroup>
                </FormItem>

                <FormItem label="订单金额" prop="ord_amount">
                    <Input v-model="addForm.ord_amount" placeholder=""></Input>
                </FormItem>

                <FormItem label="备注" prop="desc">
                    <Input v-model="addForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </FormItem>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="AddModalConfirm('addForm')" >确定</Button>
                    <Button @click="AddModalReset('addForm')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

     <!--  编辑提示框 -->
        <Modal v-model="editModal"
                title="编辑"
                :mask-closable="false"
                @on-ok="EditModalConfirm('editForm')"
                @on-cancel="EditModalReset('editForm')"
            >
            <Form ref="editForm" :model="editForm" :rules="ruleValidate" :label-width="100">
                <FormItem label="预订人" prop="cus_nick_name">
                    <Input v-model="editForm.cus_nick_name"　size:default placeholder="请输入预订人"></Input>
                </FormItem>

                <FormItem label="预订人手机" prop="reserve_persion_phone" width='100'>
                    <Input v-model="editForm.reserve_persion_phone" placeholder="请输入预订人手机"></Input>
                </FormItem>

                <FormItem label="预定机构" prop="org_name">
                    <Input v-model="editForm.org_name" placeholder="请输入预订机构"></Input>
                </FormItem>

                <FormItem label="机构手机" prop="org_name">
                    <Input v-model="editForm.org_name" placeholder="请输入机构手机"></Input>
                </FormItem>

                <FormItem label="目的地名称" prop="reserve_destination">
                    <Select v-model="editForm.reserve_destination" placeholder="请选择">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>

                <FormItem prop="check_time" label="入离时间" :label-width="60">              
             <DatePicker v-model="formInline.check_time" clearable format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker>
            </FormItem>

                <FormItem label="入住天数" prop="org_name">
                    <Input v-model="editForm.org_name" placeholder=""></Input>
                </FormItem>

                <FormItem label="选择房型" prop="interest">
                    <CheckboxGroup v-model="editForm.interest">
                        <Checkbox label="大床"></Checkbox>
                        <Checkbox label="标准间"></Checkbox>
                        <Checkbox label="单人间"></Checkbox>
                    </CheckboxGroup>
                </FormItem>

                <FormItem label="订单金额" prop="ord_amount">
                    <Input v-model="editForm.ord_amount" placeholder=""></Input>
                </FormItem>

                <FormItem label="备注" prop="desc">
                    <Input v-model="editForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </FormItem>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="EditModalConfirm('editForm')" >确定</Button>
                    <Button @click="EditModalReset('editForm')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

        <!--  绑定提示框 -->
        <Modal v-model="bindingModal"
                title="绑定"
                :mask-closable="false"
                @on-ok="BindingModalConfirm('bindingForm')"
                @on-cancel="BindingModalReset('bindingForm')"
            >
            <template>
    <div class="formView">
         <h2>
            入住人信息
        </h2>
        <Form ref="formInline" :model="formInline" inline class="ClickButton">
            <FormItem>
                <Button type="primary" @click="addClickBinding">新增入住人</Button>
            </FormItem>

            <FormItem>
                <Button icon='' type="primary" @click="delClickBinding">删除</Button>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="downloadClick">下载</Button>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="uploadClick">导入Excel</Button>
            </FormItem>
        </Form>

        <TableM 
        :columns="columns1" 
        class="Table" 
        :data="userData" 
        :loading="loading" 
        :current.async="currentPageIndex" 
        :total="total" 
        @pageChange="pageChange">
        </TableM>
        <!-- 绑定-新增提示框 -->
        <Modal v-model="bindingaddModal"
                title="新增"
                :mask-closable="false"
                @on-ok="bindingAddModalConfirm('bindingAddForm')"
                @on-cancel="bindingAddModalCancel('bindingAddForm')"
            >
            <Form ref="bindingAddForm" :model="bindingAddForm" :rules="ruleValidate" :label-width="90">
                <FormItem label="姓名" prop="cus_nick_name">
                    <Input v-model="bindingAddForm.cus_nick_name" placeholder="请输入姓名"></Input>
                </FormItem>

                <FormItem label="身份证号码" prop="reserve_persion_phone">
                    <Input v-model="bindingAddForm.reserve_persion_phone" placeholder="请输入身份证号码"></Input>
                </FormItem>

                <FormItem label="证件类型" prop="reserve_persion_phone">
                    <Input v-model="bindingAddForm.reserve_persion_phone" placeholder="请输入证件类型" disabled></Input>
                </FormItem>

                <FormItem label="联系电话" prop="org_name">
                    <Input v-model="bindingAddForm.org_name" placeholder="请输入联系电话"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="bindingAddModalConfirm('bindingAddForm')" :loading="loading">确定</Button>
                    <Button @click="bindingAddModalCancel('bindingAddForm')" style="margin-left: 8px">重置</Button>
                </div>
        </Modal>

     <!--  绑定-编辑提示框 -->
        <Modal v-model="bindingeditModal"
                title="编辑"
                :mask-closable="false"
                @on-ok="bindingEditModalConfirm('bindingEditForm')"
                @on-cancel="bindingEditModalCancel('bindingEditForm')"
            >
            <Form ref="bindingEditForm" :model="bindingEditForm" :rules="ruleValidate" :label-width="90">
                <FormItem label="姓名" prop="cus_nick_name">
                    <Input v-model="bindingEditForm.cus_nick_name" placeholder="请输入姓名"></Input>
                </FormItem>

                <FormItem label="身份证号码" prop="reserve_persion_phone">
                    <Input v-model="bindingEditForm.reserve_persion_phone" placeholder="请输入身份证号码"></Input>
                </FormItem>

                <FormItem label="证件类型" prop="reserve_persion_phone">
                    <Input v-model="bindingEditForm.reserve_persion_phone" placeholder="请输入证件类型" disabled></Input>
                </FormItem>

                <FormItem label="联系电话" prop="org_name">
                    <Input v-model="bindingEditForm.org_name" placeholder="请输入联系电话"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="bindingEditModalConfirm('bindingEditForm')" :loading="loading">确定</Button>
                    <Button @click="bindingEditModalCancel('bindingEditForm')" style="margin-left: 8px">取消</Button>
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
            <Button type="error" size="large" long :loading="delLoading" @click="bindingdelConfrmClick">删除</Button>
        </div>
    </Modal>

    <div slot="footer" align="center">
        <Button type="primary" @click="BindingModalConfirm('bindingForm')" :loading="loading">确定</Button>
        <Button @click="BindingModalReset('bindingForm')" style="margin-left: 8px">取消</Button>
    </div>
    
    </div>
</template>
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
    batchReservationOrderList, //批量预定订单列表
    batchReservationOrderSearch, //批量预定订单模糊查询
    destinationTitleList,// 批量预定订单模糊查询-目的地下拉列表渲染
} from '../../api/lp-order/api.js'

export default {
  name: "batchReservationOrderModel",

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
        adm_id: "adm_user_id",

        addModal: false,

        editModal: false,

        bindingModal:false,

        bindingaddModal:false,

        bindingeditModal:false,

        addForm: {              // 定义新增表单的对象
            reserve_persion_name: "",
            reserve_persion_phone:'',
            ord_status: "",
            reserve_destination:'',
            org_name: "",
            check_time: ''
        },

        bindingAddForm:{

        },

        editForm: {             // 定义编辑表单的对象
            facilities_name: "",
        },
        
        bindingEditForm:{

        },

        visible: false,

        orderStatus:[
            {
                value: 1,
                label: "待审核"
            },
            {
                value: 3,
                label: "已审核"
            },
            {
                value: 13,
                label: "取消订单"
            },
        ],

        destinationTitle:[],

        ruleValidate: {     // 定义表单的校验规则
        
                reserve_persion_name: [
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
        destination:[],
        
        delDilaog: false,   // 控制删除弹出框
        
        delLoading: false,   // 控制删除按钮loading

        currentPageIndex: 1,    // 当前页

        columns: [    // 表头信息
            {
                title: "订单号",
                width: 120,
                key: "reserve_id",
            },

            {
                title: "预订人",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.reserve_person_name ? row.reserve_person_name : `暂无${index}`)
                }
            },

            {
                title: "预订人手机",
                width: 100,
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.reserve_persion_phone ? row.reserve_persion_phone : `暂无${index}`)     
                }
            },

            {
                title: "预定机构",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.org_name ? row.org_name : `暂无${index}`)
                }
            },

            {
                title: "目的地名称",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.reserve_destination ? row.reserve_destination : `暂无${index}`)
                }
            },

            {
                title: "申请日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.apply_date ? row.apply_date : `暂无${index}`)
                }
            },

            {
                title: "入住日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.begin_time ? row.begin_time : `暂无${index}`)
                }
            },

            {
                title: "离开日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.end_time ? row.end_time : `暂无${index}`)
                }
            },

            {
                title: "订单金额",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_amount ? row.ord_amount : `暂无${index}`)
                }
            },

            {
                title: "订单状态",
                render: (h, {row, index}) => {
                    return h('span', {}, this.SetStatusFilter(row.ord_status) || "暂无")
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
                                this.bindingClick(params);
                            }
                        }
                        },
                        "绑定"
                    ),
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
                                this.submitClick(params);
                            }
                        }
                        },
                        "提交"
                    ),
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
                                this.delClick(params);
                            }
                        }
                        },
                        "删除"
                    ),
                    h(
                        "Button",
                        {
                        props: {
                            type: "primary",
                            size: "small"
                        },
                        on: {
                            click: () => {
                                this.goToInfo(params);
                            }
                        }
                        },
                        "详情"
                    )
                    ]);
                }
            }
        ],

        columns1: [    // 绑定-表头信息
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },

            {
                title: "姓名",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.reserve_person_name ? row.reserve_person_name : `暂无${index}`)
                }
            },

            {
                title: "证件类型",
                width: 100,
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.reserve_persion_phone ? row.reserve_persion_phone : `暂无${index}`)     
                }
            },

            {
                title: "身份证号码",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.org_name ? row.org_name : `暂无${index}`)
                }
            },

            {
                title: "联系电话",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.reserve_destination ? row.reserve_destination : `暂无${index}`)
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
                                this.editClickBinding(params);
                            }
                        }
                        },
                        "编辑"
                    ),
                    ]);
                }
            }
        ],

        userData: [],   // 内容数据

        total: 0,   // 总页数

        formInline: {   // 定义表单对象
            reserve_persion_name: "",
            reserve_persion_phone:'',
            ord_status: "",
            reserve_destination:'',
            org_name: "",
            check_time: ''
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

    
    // 过滤订单状态
    SetStatusFilter(status){
        switch(status){
            case 1:
              return '待审核';
              break;
            case 3:
              return '已审核';
              break;
            case 13:
              return '订单取消';
              break;
            default:
              return '';
              break;

        }
    },

    // 清除图片列表动作
    handleResetFile() {},

    resetTotal() {
        this.currentPage = 1;
        this.total = 1;
    },

    // 执行新增的事件
    addClick() {
      if (this.$refs["addForm"]) {
        this.$refs["addForm"].resetFields(); //清除diglog弹窗内数据
      }  
      this.addModal = true;  
        },

    // 点击确定按钮
        AddModalConfirm(name) {
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

 // 点击新增框取消按钮
    AddModalReset(name) {
      this.$refs[name].resetFields();
      this.handleResetFile();
      this.addModal = false;
    },

    // 执行table编辑的事件
    editClick(params) {
        this.editModal = true;
        console.log(params);
    },

    // 编辑取消事件
    EditModalReset(formName) {
      this.$refs[formName].resetFields();
      this.handleResetFile();
      this.editModal = false;
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

    // 绑定-执行新增的事件
    addClickBinding() {
      if (this.$refs["addForm"]) {
        this.$refs["addForm"].resetFields(); //清除diglog弹窗内数据
      }  
      this.bindingaddModal = true;  
        },

    // 绑定- 点击确定按钮
        bindingModalConfirm(name) {
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

 // 绑定- 点击取消按钮
    bindingModalCancel(name) {
      this.$refs[name].resetFields();
      this.handleResetFile();
      this.addModal = false;
    },
      

    // 绑定- 点击新增确定按钮
        bindingAddModalConfirm(name) {
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

 // 绑定- 点击新增框取消按钮
    bindingAddModalCancel(name) {
      this.$refs[name].resetFields();
      this.handleResetFile();
      this.addModal = false;
    },

    // 绑定- 执行table编辑的事件
    editClickBinding(params) {
        this.editModal = true;
        console.log(params);
    },

    // 绑定- 编辑取消事件
    bindingEditModalCancel(formName) {
      this.$refs[formName].resetFields();
      this.handleResetFile();
      this.editModal = false;
    },

    // 绑定- 执行删除的事件
    delClickBinding(params) {
        console.log(params);
        this.delDilaog = true;
    },

    // 绑定- 删除确定按钮
    bindingdelConfrmClick() {
        this.delLoading = true;
        setTimeout(() => {
            this.delDilaog = false;
            this.$Message.success('成功');
            console.log('我滚了');
        }, 1000)
    },

    downloadClick(){

    },

    uploadClick(){

    },

    // 获取时间
        getFormatterTime(val) {
            console.log(val);
        },

    // 改变分页触发的事件
    pageChange(pageIndex) {
        // 改变当前页
        this.currentPage = pageIndex;
        for (let i in this.formInline) {
            if (this.formInline[i] !== undefined || this.formInline[i] !== '') {
                this.getUser(this.formInline);  
                return false;
            }
        };
        this.getUser();
    },

    // 渲染目的地下拉列表
    async destinationTitleFun() {
        const { data } = await destinationTitleList();
        data.shift(0);
        this.destinationTitle = Array.from(new Set(data));
        // console.log(arr)
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
     
    //批量预定订单列表 
    // 为了解决异步问题
    async getUser(filter) {
        let params = {
            pageSize: 10,
            startPos: filter ? 1 : this.currentPage,
            adm_user_id: this.adm_id
        };

        if (filter) {
            params = Object.assign(params, filter);
            if(filter.check_time[0] !== '') {
                params.check_in_time = this.dataFormat(filter.check_time[0].getTime());
                params.check_out_time = this.dataFormat(filter.check_time[1].getTime());
            }
        }

        // this.loading = true;
        let { data } = await batchReservationOrderList(params);
        console.log(data)
        this.total = data[0].count;
        console.log(this.total)
        // data.shift(0);
        this.userData = data;
        this.loading = false;
        console.log(data);
    }
  },
  mounted() {
    this.getUser();
    this.destinationTitleFun();
  }
};
</script>

