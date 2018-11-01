<style scope lang="less">
    @import './batchReservationOrder.less';
</style>

<template>
    <div class="formView">
        <Modal title="View Image" v-model="visible">
            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>

        <Form ref="formInline" :model="formInline" inline>

            <FormItem prop="reserve_persion_name" label="预订人" :label-width="50">
                <Input type="text" v-model="formInline.cus_nick_name" placeholder="请输入预订人"></Input>
            </FormItem>

            <FormItem prop="reserve_persion_phone" label="预订人手机" :label-width="75">
                <Input type="text" v-model="formInline.reserve_persion_phone" placeholder="请输入预订人手机"></Input>
            </FormItem>

             <FormItem prop="order_status" label="订单状态" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in orderStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

             <FormItem prop="reserve_destination" label="目的地" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in destination" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

             <FormItem prop="org_name" label="预定机构" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in institutionTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="begin_time" label="入离时间" :label-width="60">              
             <DatePicker type="datetimerange" placeholder="请选择" style="width: 300px"></DatePicker>
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
                title="新增"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="预订人" prop="cus_nick_name">
                    <Input v-model="formValidate.cus_nick_name" placeholder="请输入预订人"></Input>
                </FormItem>

                <FormItem label="预订人手机" prop="reserve_persion_phone" width='100'>
                    <Input v-model="formValidate.reserve_persion_phone" placeholder="请输入预订人手机"></Input>
                </FormItem>

                <FormItem label="预定机构" prop="org_name">
                    <Input v-model="formValidate.org_name" placeholder="请输入预订机构"></Input>
                </FormItem>

                <FormItem label="机构手机" prop="org_name">
                    <Input v-model="formValidate.org_name" placeholder="请输入机构手机"></Input>
                </FormItem>

                <FormItem label="目的地名称" prop="reserve_destination">
                    <Select v-model="formValidate.reserve_destination" placeholder="请选择">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>

                <FormItem label="入离时间" prop="Date">
                    <DatePicker @on-change="getFormatterTime" format="yyyy-MM-dd hh:ss:mm" v-model="formValidate.Date" type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>
                </FormItem>

                <!-- <FormItem label="Gender" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem> -->

                

                <FormItem label="入住天数" prop="org_name">
                    <Input v-model="formValidate.org_name" placeholder=""></Input>
                </FormItem>

                <FormItem label="选择房型" prop="interest">
                    <CheckboxGroup v-model="formValidate.interest">
                        <Checkbox label="大床"></Checkbox>
                        <Checkbox label="标准间"></Checkbox>
                        <Checkbox label="单人间"></Checkbox>
                    </CheckboxGroup>
                </FormItem>

                <FormItem label="订单金额" prop="org_name">
                    <Input v-model="formValidate.org_name" placeholder=""></Input>
                </FormItem>

                <FormItem label="备注" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </FormItem>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">提交</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
        </Modal>

     <!--  编辑提示框 -->
        <Modal v-model="editModal"
                title="编辑"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="预订人" prop="cus_nick_name">
                    <Input v-model="formValidate.cus_nick_name"　size:default placeholder="请输入预订人"></Input>
                </FormItem>

                <FormItem label="预订人手机" prop="reserve_persion_phone" width='100'>
                    <Input v-model="formValidate.reserve_persion_phone" placeholder="请输入预订人手机"></Input>
                </FormItem>

                <FormItem label="预定机构" prop="org_name">
                    <Input v-model="formValidate.org_name" placeholder="请输入预订机构"></Input>
                </FormItem>

                <FormItem label="机构手机" prop="org_name">
                    <Input v-model="formValidate.org_name" placeholder="请输入机构手机"></Input>
                </FormItem>

                <FormItem label="目的地名称" prop="reserve_destination">
                    <Select v-model="formValidate.reserve_destination" placeholder="请选择">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>

                <FormItem label="入离时间" prop="Date">
                    <DatePicker @on-change="getFormatterTime" format="yyyy-MM-dd hh:ss:mm" v-model="formValidate.Date" type="datetimerange" placeholder="请选择日期" style="width: 300px"></DatePicker>
                </FormItem>

                <!-- <FormItem label="Gender" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem> -->

                

                <FormItem label="入住天数" prop="org_name">
                    <Input v-model="formValidate.org_name" placeholder=""></Input>
                </FormItem>

                <FormItem label="选择房型" prop="interest">
                    <CheckboxGroup v-model="formValidate.interest">
                        <Checkbox label="大床"></Checkbox>
                        <Checkbox label="标准间"></Checkbox>
                        <Checkbox label="单人间"></Checkbox>
                    </CheckboxGroup>
                </FormItem>

                <FormItem label="订单金额" prop="org_name">
                    <Input v-model="formValidate.org_name" placeholder=""></Input>
                </FormItem>

                <FormItem label="备注" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </FormItem>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">提交</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
        </Modal>

    <!-- 删除提示框 -->
    <Modal v-model="delDilaog" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>提示</span>
        </p>
        <div style="text-align:center">
            <p>您确定要删除吗？</p>
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
    batchReservationOrderSearch //批量预定订单模糊查询
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
                    return h('span', {
                    }, row.ord_status ? row.ord_status : `暂无${index}`)
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
            startPos: filter ? 1 : this.currentPage
        };

        if (filter) {
            params = Object.assign(params, filter);
        };

        this.loading = true;
        let { data } = await batchReservationOrderList(params);
        console.log(data)
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

