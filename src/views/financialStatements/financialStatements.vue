<style scope lang="less">
    @import './financialStatements.less';
</style>
<!-- 财务报表 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>

            <FormItem prop="org_name" label="机构标题" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in institutionTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="check_in_time" label="入离时间" :label-width="60">              
             <DatePicker type="datetimerange" placeholder="请选择日期" style="width: 300px"></DatePicker>
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
    financialStatementsList, //财务报表列表
    financialStatementsSearch, //财务报表模糊查询
} from '../../api/lp-financialStatements/api.js'

export default {
  name: "financialStatementsModel",

  components: {
    TableM
  }, 
  data() {
    return {
        institutionTitle:[
                    {
                        value: '退房完成',
                        label: '退房完成'
                    },
                ],
                model8:'',

        currentPageIndex: 1,    // 当前页

        columns: [    // 财务报表表头信息
            {
                title: "订单号",
                key: "ord_id",
            },

            {
                title: "预订人手机",
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
                title: "扣点",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.point_deduction ? row.point_deduction : `暂无${index}`)
                }
            },

            {
                title: "机构结算",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.org_balance ? row.org_balance : `暂无${index}`)
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
            org_name: '', //机构标题
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

    // 执行table编辑的事件
    editClick(params) {
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
        let { data } = await financialStatementsList(params);
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

