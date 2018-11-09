<style scope lang="less">
    @import './appOrder.less';
</style>
 <!-- App订单 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>
            <FormItem prop="ord_id" label="订单号" :label-width="50">
                <Input type="text" v-model="formInline.ord_id" placeholder="请输入订单号"></Input>
            </FormItem>

            <FormItem prop="ord_customer" label="预订人" :label-width="50">
                <Input type="text" v-model="formInline.ord_customer" placeholder="请输入预订人"></Input>
            </FormItem>

            <FormItem prop="ord_phone_number" label="预订人手机" :label-width="75">
                <Input type="text" v-model="formInline.ord_phone_number" placeholder="请输入预订人手机"></Input>
            </FormItem>

            <FormItem prop="ord_payment_status" label="支付状态" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in payStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="cus_nick_name" label="入离时间" :label-width="60">              
             <DatePicker type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker>
            </FormItem>

            <FormItem prop="ord_status" label="订单状态" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in orderStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="org_name" label="机构标题" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in institutionTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="room_name" label="房型" :label-width="50">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in roomType" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
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
    
    </div>
</template>

<script>

import TableM from "../../common/table/table.vue";
import {
    appOrderList, //App订单列表
    appOrderSearch, //App订单模糊查询
} from '../../api/lp-order/api.js'

export default {
  name: "appOrderModel",

  components: {
    TableM
  }, 
  data() {
    return {
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

        currentPageIndex: 1,    // 当前页

        columns: [    // App订单表头信息
            {
                title: "订单号",
                width: 120,
                key: "ord_id",
            },

            {
                title: "预订人",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_customer ? row.ord_customer : `暂无${index}`)
                }
            },

            {
                title: "预订人手机",
                width: 100,
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.ord_phone_number ? row.ord_phone_number : `暂无${index}`)     
                }
            },

            {
                title: "机构标题",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.org_name ? row.org_name : `暂无${index}`)
                }
            },

            {
                title: "房间名称",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.room_name ? row.room_name : `暂无${index}`)
                }
            },

            {
                title: "房间数量",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_room_numbers ? row.ord_room_numbers : `暂无${index}`)
                }
            },

            {
                title: "下单日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_time ? row.ord_time : `暂无${index}`)
                }
            },

            {
                title: "入住日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.check_in_time ? row.check_in_time : `暂无${index}`)
                }
            },

            {
                title: "离开日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.check_out_time ? row.check_out_time : `暂无${index}`)
                }
            },

            {
                title: "支付状态",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_payment_status ? row.ord_payment_status : `暂无${index}`)
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
                key: "action",
                align: "center",
                render: (h, params) => {
                    return h("div", [
                    h(
                        "Button",
                        {
                        props: {
                            type: "primary",
                            size: "medium"
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
            ord_id: '', 
            ord_customer: '',
            ord_phone_number: '', 
            ord_payment_status: '', 
            ord_status: '', 
            org_name: '', 
            room_name: ''
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
            path: '/AppOrderinfoModel',
            data: params 
        })
    },

    resetTotal() {
        this.currentPage = 1;
        this.total = 1;
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
        let { data } = await appOrderList(params);
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

