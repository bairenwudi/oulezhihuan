<style scoped lang="less">
    @import './refundList.less';
</style>
<!-- 退款单 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>
            <FormItem prop="ord_id" label="订单号" :label-width="50">
                <Input type="text" v-model="formInline.ord_id" clearable placeholder="请输入订单号"></Input>
            </FormItem>

            <FormItem prop="ord_customer" label="预订人" :label-width="50">
                <Input type="text" v-model="formInline.ord_customer" clearable placeholder="请输入预订人"></Input>
            </FormItem>

            <FormItem prop="ord_phone_number" label="预订人手机" :label-width="75">
                <Input type="text" v-model="formInline.ord_phone_number" clearable placeholder="请输入预订人手机"></Input>
            </FormItem>

            <FormItem prop="ord_status" label="订单状态" :label-width="60">
               <Select v-model="formInline.ord_status" clearable style="width:200px">
                 <Option v-for="item in orderStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="room_name" label="房型名称" :label-width="60">
               <Select v-model="formInline.room_name" clearable style="width:200px">
                 <Option v-for="item in roomName" :value="item.room_name" :key="item.org_id">{{ item.room_name }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="check_time" label="入离时间" :label-width="60">              
             <DatePicker v-model="formInline.check_time" clearable format="yyyy-MM-dd" type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker>
            </FormItem>

            <FormItem prop="org_name" label="机构标题" :label-width="60">
               <Select v-model="formInline.org_name" clearable style="width:200px">
                 <Option v-for="item in RefundinstitutionTitle" :value="item.org_name" :key="item.adm_user_type">{{ item.org_name }}</Option>
               </Select>
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
    
    </div>
</template>

<script>

import TableM from "../../common/table/table.vue";
import {
    refundList, //退款单列表
    refundListSearch, //退款单模糊查询
    roomnameList, // 退款单-房间名称下拉框渲染
    RefundInstitutionalTitleList, //退款单-机构标题下拉框渲染
} from '../../api/lp-order/api.js'

// 年月日分秒时 补充时间格式 不够10 补充 0
import { formatTime } from "@/common/date/formatTime.js";

// 年月日 补充时间格式 不够10 补充 0
import { formatTimeDay } from "@/common/date/formatTime.js";

// 引入优化滚动插件
import VirtualList from 'vue-virtual-scroll-list'

export default {
  name: "refundListModel",

  components: {
    TableM,
    VirtualList
  }, 
  data() {
    return {
        orderStatus: [
                    // {
                    //     value: 0,
                    //     label: '待付款'
                    // },
                    // {
                    //     value: 1,
                    //     label: '待审核'
                    // },
                    // {
                    //     value: 2,
                    //     label: '已付款'
                    // },
                    // {
                    //     value: 3,
                    //     label: '已审核'
                    // },
                    // {
                    //     value: 4,
                    //     label: '申请退款'
                    // },
                    // {
                    //     value: 5,
                    //     label: '退款中'
                    // },
                    {
                        value: 6,
                        label: '退款成功'
                    }, 
                    {
                        value: 7,
                        label: '退款失败'
                    },
                    // {
                    //     value: 8,
                    //     label: '已入住'
                    // },
                    // {
                    //     value: 9,
                    //     label: '申请退房'
                    // },
                    // {
                    //     value: 10,
                    //     label: '退房中'
                    // },  
                    // {
                    //     value: 11,
                    //     label: '退房成功'
                    // },
                    // {
                    //     value: 12,
                    //     label: '退房失败'
                    // },
                    // {
                    //     value: 13,
                    //     label: '订单取消'
                    // },
                    // {
                    //     value: 14,
                    //     label: '订单完成'
                    // }                            
                ],
        RefundinstitutionTitle:[
                    {
                        adm_user_type : 3
                    },
                ],
        roomName: [],

        currentPageIndex: 1,    // 当前页

        columns: [    
            // 退款单表头信息
            {
                title: "订单号",
                key: "ord_id",
            },

            {
                title: "退款编号",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.third_code ? row.third_code : `暂无`)
                }
            },

            {
                title: "预订人",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_customer ? row.ord_customer : `暂无`)
                }
            },

            {
                title: "预订人手机",
                width: 100,
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.ord_phone_number ? row.ord_phone_number : `暂无`)     
                }
            },

            {
                title: "机构标题",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.org_name ? row.org_name : `暂无`)
                }
            },

            {
                title: "房型名称",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.room_name ? row.room_name : `暂无`)
                }
            },

            {
                title: "房间数量",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_room_numbers ? row.ord_room_numbers : `暂无`)
                }
            },

            {
                title: "预定天数",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_days ? row.ord_days : `暂无`)
                }
            },

            {
                title: "入住日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, this.dataFormatDay(row.check_in_time) || `暂无`)
                }
            },

            {
                title: "离开日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, this.dataFormatDay(row.check_out_time)|| `暂无`)
                }
            },

            {
                title: "申请退款日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, this.dataFormat(row.refund_time) || `暂无`)
                }
            },

            {
                title: "订单金额",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_amount ? row.ord_amount : `暂无`)
                }
            },

            {
                title: "订单状态",
                render: (h, {row, index}) => {
                    return h('span', {}, this.SetStatusFilter(row.ord_status) || "暂无");
                }
            },

            {
                title: "退款手续费",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.refund_formalities ? row. refund_formalities: `暂无`);
                }
            },

            {
                title: "退款滞纳金",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.refunds ? row.refunds : `暂无`)
                }
            },

            {
                title: "退款金额",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.refund_amount ? row.refund_amount : `暂无`)
                }
            },

            {
                title: "操作",
                key: "action",
                align: "center",
                render: (h, params) => {
                    return h("div", [
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
                    //     "同意"
                    // ),
                    h(
                        "Button",
                        {
                        props: {
                            type: "primary",
                            size: "small"
                        },
                        on: {
                            click: () => {
                                var Refund_ord_id = $(params.row).attr('ord_id')
                                localStorage.setItem('Refund_ord_id',Refund_ord_id)
                                // console.log($(params.row).attr('ord_id'));
                                // alert($(params.row).attr('ord_id'))
                                this.goToRefundInfo(params);
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
            ord_status: '', 
            org_name: '', 
            room_name: '',
            check_time: ''
        },

        loading: false,  // 定义loading为true

        currentPage: 1   // 定义当前页
    };
  },

  methods: {
    // 进入详情
    goToRefundInfo({ row }) {
        console.log(row);
        this.$router.push({
            path: '/RefundListinfoModel',
            query: {
                data: JSON.stringify(row)
            }
        })
    },


 // 转化时间-年月日分秒时
    dataFormat(time) {
        return formatTime(time);
    },

     // 转化时间-年月日
    dataFormatDay(time) {
        return formatTimeDay(time);
    },


    // 过滤订单状态
    SetStatusFilter(status) {
        switch(status) {
            // case 0:
            //     return '待付款';
            //     break;
            // case 1:
            //     return '待审核';
            //     break;
            // case 2:
            //     return '已付款';
            //     break;
            // case 3:
            //     return '已审核';
            //     break;
            // case 4:
            //     return '申请退款';
            //     break;
            // case 5:
            //     return '退款中';
            //     break;
            case 6:
                return '退款成功';
                break;
            case 7:
                return '退款失败';
                break;
            // case 8:
            //     return '已入住';
            //     break;
            // case 9:
            //     return '申请退房';
            //     break;
            // case 10:
            //     return '退房中';
            //     break;
            // case 11:
            //     return '退房成功';
            //     break;
            // case 12:
            //     return '退房失败';
            //     break;
            // case 13:
            //     return '订单取消';
            //     break;
            // case 14:
            //     return '订单完成';
            //     break;
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
    async RefundInstitutionalTitleListFun() {
        const { data } = await RefundInstitutionalTitleList();
        data.shift(0);
        this.RefundinstitutionTitle = data;
        console.log(this.RefundinstitutionTitle)
    },

    // 渲染房间名称下拉列表
    async roomnameListFun() {
        const { data } = await roomnameList();
        data.shift(0);
        this.roomName = data;
        console.log(this.roomName)
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
            adm_user_id
        };

         if (filter) {
        params = Object.assign(params, filter);
        if(filter.check_time[0] !== '') {
            params.check_in_time = this.dataFormatDay(filter.check_time[0].getTime());
            params.check_out_time = this.dataFormatDay(filter.check_time[1].getTime());
        }
      }

        this.loading = true;
        let { data } = await refundList(params);
        console.log(data)
        this.total = data.content.count;
        console.log(this.total)
        this.userData = data.content.list;
        this.loading = false;
        console.log(data);
    }
  },
  mounted() {
    this.getUser();
    this.roomnameListFun();
    this.RefundInstitutionalTitleListFun();
  }
};
</script>

