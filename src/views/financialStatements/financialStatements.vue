<style scope lang="less">
    @import './financialStatements.less';
</style>
<!-- 财务报表 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>

            <FormItem prop="org_name" label="机构标题" :label-width="60">
               <Select v-model="formInline.org_name" clearable style="width:200px">
                 <Option v-for="item in financialinstitutionTitle" :value="item.org_name" :key="item.adm_user_type">{{ item.org_name }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="check_time" label="入离时间" :label-width="60">              
             <DatePicker v-model="formInline.check_time" clearable format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker>
            </FormItem>

            <FormItem>
                <Button type="primary" @click.stop="searchClick(formInline)">查询</Button>
            </FormItem>

            

        </Form>

        <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>

    </div>
</template>

<script>

import TableM from "../../common/table/table.vue";
import {
    financialStatementsList, //财务报表列表
    financialStatementsSearch, //财务报表模糊查询
    financialInstitutionalTitleList //财务报表-机构标题下拉框渲染
} from '../../api/lp-financialStatements/api.js'

// 补充时间格式 不够10 补充 0
import { formatTime } from "@/common/date/formatTime.js";
// 引入优化滚动插件
import VirtualList from 'vue-virtual-scroll-list'

export default {
  name: "financialStatementsModel",

  components: {
    TableM,
    VirtualList
  }, 
  data() {
    return {
        adm_id: "adm_user_id",

        financialinstitutionTitle:[
                    {
                        adm_user_type : 3
                    },
                ],

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
                title: "房型名称",
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
                    return h('span', {}, this.SetStatusFilter(row.ord_status) || "暂无");
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
                                if (params.row.ord_status === 6) {
                                    this.goToRefundInfo(params)
                                } else
                                if (params.row.ord_status === 11) {
                                    this.goToCheckoutInfo(params)
                                } else {
                                    this.goToInfo(params)
                                }
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
            check_time: ''
        },

        loading: false,  // 定义loading为true

        currentPage: 1   // 定义当前页
    };
  },

  methods: {
    // 进入App详情
    goToInfo({ row }) {
        this.$router.push({
            path: '/AppOrderinfoModel',
            qyery:{
              data: JSON.stringify(row)
            }
             
        });
    },

    // 进入退款单详情
    goToRefundInfo({ row }){
        this.$router.push({
           path : './RefundListinfoModel',
           query:{
               data:JSON.stringify(row)
           }
       });  
    },

    //进入退房单详情
    goToCheckoutInfo({ row }){
       this.$router.push({
           path: '/CheckoutListinfoModel',
           query:{
               data:JSON.stringify(row)
           }
       })
    },

    // 转化时间
    dataFormat(time) {
        return formatTime(time);
    },

    // 过滤订单状态
    SetStatusFilter(status) {
        switch(status) {
            case 6:
                return '退款成功';
                break;
            case 11:
                return '退房成功';
                break;
            case 14:
                return '订单完成';
                break;
            default:
                return '';
                break;
        }
    },

    resetTotal() {
        this.currentPage = 1;
        this.total = 1;
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

    // 渲染机构标题下拉列表
    async financialInstitutionalTitleListFun() {
        const { data } = await financialInstitutionalTitleList();
        data.shift(0);
        this.financialinstitutionTitle = data;
        console.log(this.financialinstitutionTitle)
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
        var adm_user_id = JSON.parse(localStorage.getItem("user")).adm_user_id;
        let params = {
            pageSize: 10,
            startPos: filter ? pageIndex : this.currentPage,
            // adm_user_id
        };

        if (filter) {
            params = Object.assign(params, filter);
            if(filter.check_time[0] !== '') {
                params.check_in_time = this.dataFormat(filter.check_time[0].getTime());
                params.check_out_time = this.dataFormat(filter.check_time[1].getTime());
        }
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
    this.financialInstitutionalTitleListFun();
  }
};
</script>

