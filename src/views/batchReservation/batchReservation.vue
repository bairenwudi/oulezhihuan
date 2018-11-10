<style scope lang="less">
    @import './batchReservation.less';
</style>
<!--批量预定 -->
<template>
    <div class="formView">
         <h2>
            预订信息
        </h2>


        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" class="inputBox"> 

                <FormItem label="预订人" prop="adm_user_type">
                    <Input v-model="formValidate.adm_user_type" placeholder="请输入预订人"></Input>
                </FormItem>
        
                <FormItem>
                  <Button type="primary" @click="goToInfo">入住人信息</Button>
                </FormItem>  

                <FormItem label="预订人手机" prop="org_addr">
                    <Input v-model="formValidate.org_addr" placeholder="请输入预订人手机"></Input>
                </FormItem>

                <FormItem label="预定机构" prop="adm_phonenum">
                    <Input v-model="formValidate.adm_phonenum" placeholder="黄山基地" disabled ></Input>
                </FormItem>
        
                <FormItem label="机构手机" prop="adm_phonenum">
                    <Input v-model="formValidate.adm_phonenum" placeholder="13555415252" disabled ></Input>
                </FormItem>

                <FormItem label="目的地名称" prop="org_name" inline>
                    
                    <Select v-model="formValidate.org_name" placeholder="请选择" style="width:300px" >
                        <Option value="乐满地">乐满地</Option>
                        <Option value="黄山">黄山</Option>
                        <Option value="山东">山东</Option>
                    </Select>
                
                </FormItem>
                
                <FormItem prop="check_in_time" label="入离时间">              
                    <DatePicker type="datetimerange" placeholder="请选择日期"></DatePicker>
                </FormItem>

                <FormItem label="入住天数" prop="org_cover">
                    <Input v-model="formValidate.adm_phonenum" placeholder="12" disabled ></Input>
                </FormItem>

                <FormItem label="选择房型" prop="org_cover">
                    <CheckboxGroup v-model="room">
                       <Row>
                        <col>
                         <Checkbox label="大床房"></Checkbox>
                        </col>
                        <col>
                        <Input v-model="formValidate.adm_phonenum" placeholder="12" ></Input>间
                        </col>
                       </Row>
                        <Checkbox label="标准间"></Checkbox>
                        <Input v-model="formValidate.adm_phonenum" placeholder="12" ></Input>间
                        <Checkbox label="单人间"></Checkbox>
                        <Input v-model="formValidate.adm_phonenum" placeholder="12" ></Input>间
                    </CheckboxGroup>
                </FormItem>

                <FormItem label="订单金额" prop="org_pic_name">
                    <Input v-model="formValidate.adm_phonenum" placeholder="205元" disabled ></Input>
                </FormItem>

                <FormItem label="备注" prop="org_pic_name">
                    <Input v-model="formValidate.org_other_facilities" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
             </Form>
    
    </div>
</template>

<script>

import TableM from "../../common/table/table.vue";
import {
    batchReservationList, //批量预定列表
} from '../../api/lp-batchReservation/api.js'

export default {
  name: "batchReservationModel",

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
        room: [''],

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
                org_name:'',
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
        orderStatus: [
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
        destination:[
                    {
                        value: '北京',
                        label: '北京'
                    }
                ],
        institutionTitle:[
                    {
                        value: '退房完成',
                        label: '退房完成'
                    },
                ],
        roomType: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },                   
                ],
                model8:'',
        delDilaog: false,   // 控制删除弹出框
        
        delLoading: false,   // 控制删除按钮loading

        currentPageIndex: 1,    // 当前页

        columns: [    // 批量预定表头信息
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
    // 进入入住人信息详情
    goToInfo(params) {
        this.$router.push({
            path: '/batchReservationModel',
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
            this.$Message.info("Clicked ok");
            this.$refs[name].resetFields();
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

   // 执行上传的事件
    uploadClick() {
            
        },

    // 执行下载的事件
    downloadClick() {
            
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
                this.getUser(this.formInline ,pageIndex);  
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
     
    //批量预定列表 
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
        let { data } = await batchReservationList(params);
        console.log(data)
        this.total = data[0];
        console.log(this.total)
        // data.shift(0);
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

