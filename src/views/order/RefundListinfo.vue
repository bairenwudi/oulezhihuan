<style scope lang="less">
    @import './RefundListinfo.less';
</style>
<!-- 退款单详情 -->
<template>
    <div class="formView" >
        <h2>订单信息</h2>
        <Row>
            <Card class="TD-card" ref="refundInfoForm" :model="refundInfoForm">
                <div class="TD-view">
                    <dd>订单号：</dd>
                    <dt>{{refundInfoForm.ord_id}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单支付时间：</dd>
                    <dt>{{refundInfoForm.ord_payment_time}}</dt>
                </div>

                <div class="TD-view">
                    <dd>支付方式：</dd>
                    <dt>{{refundInfoForm.ord_payment}}</dt>
                </div>

                <div class="TD-view">
                    <dd>房间数量：</dd>
                    <dt>{{refundInfoForm.ord_room_numbers}}</dt>
                </div>

                <div class="TD-view">
                    <dd>机构标题：</dd>
                    <dt>{{refundInfoForm.org_name}}</dt>
                </div>

                <div class="TD-view">
                    <dd>下单日期：</dd>
                    <dt>{{this.dataFormat(refundInfoForm.ord_time)}}</dt>
                </div>

                <div class="TD-view">
                    <dd>入住日期：</dd>
                    <dt>{{this.dataFormat(refundInfoForm.check_in_time)}}</dt>
                </div>

                <div class="TD-view">
                    <dd>预定天数：</dd>
                    <dt>{{refundInfoForm.ord_days}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单状态：</dd>
                    <dt>{{SetStatusFilter(refundInfoForm.ord_status)}}</dt>
                </div>

                <div class="TD-view">
                    <dd>支付状态：</dd>
                    <dt>{{refundInfoForm.ord_payment_status === "1" ? `已支付` : `未支付`}}</dt>
                </div>

                <div class="TD-view">
                    <dd>离开日期：</dd>
                    <dt>{{this.dataFormat(refundInfoForm.check_out_time)}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单金额：</dd>
                    <dt>{{refundInfoForm.ord_amount}}</dt>
                </div>

                <div class="TD-view">
                    <dd>房间名称：</dd>
                    <dt>{{refundInfoForm.room_name}}</dt>
                </div>

                <div class="TD-view">
                    <dd>申请退款日期：</dd>
                    <dt>{{this.dataFormat(refundInfoForm.refund_time)}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退款金额：</dd>
                    <dt>{{refundInfoForm.refund_amount}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退款手续费：</dd>
                    <dt>{{refundInfoForm.refund_formalities}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退款滞纳金：</dd>
                    <dt>{{refundInfoForm.refunds}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退款原因：</dd>
                    <dt>{{refundInfoForm.refund_reason}}</dt>
                </div>

            </Card>
        </Row>
        <h2>订单明细</h2><br/>
          <TableM 
            :columns="columns" 
            :data="userData" 
            :loading="loading" 
            :current.async="currentPageIndex" 
            :total="total"
            @pageChange="pageChange">
          </TableM>
        <br/>
        <h2>预订人信息</h2>
          <Row>
            <Card class="TD-card" ref="refundInfoForm" :model="refundInfoForm">
                <div class="TD-view">
                    <dd>预订人姓名：</dd>
                    <dt>{{refundInfoForm.ord_customer}}</dt>
                </div>

                <div class="TD-view">
                    <dd>预订人手机：</dd>
                    <dt>{{refundInfoForm.ord_phone_number}}</dt>
                </div>

            </Card>
        </Row>
        <h2>入住人信息</h2><br/>
          <TableM 
            :columns="columns1" 
            :data="userData1" 
            :loading="loading" 
            :current.async="currentPageIndex" 
            :total="total" 
            @pageChange="pageChange">
          </TableM>

    </div>
</template>

<script>
import TableM from '../../common/table/table.vue';
import {
    RefundListinfo, //退款单详情列表-订单信息、订单明细、预订人信息
    RefundListCustomerinfo, // 退款单详情列表-入住人
}from '../../api/lp-order/api.js'

// 补充时间格式 不够10 补充 0
import { formatTime } from "@/common/date/formatTime.js";
// 引入优化滚动插件
import VirtualList from 'vue-virtual-scroll-list'

export default {
  name: "RefundListinfoModel",

  components: {
      TableM
  },
  data() {
    return {
        refundInfoForm:{
          
        },

        totalPrice : 0,

        currentPageIndex: 1,    // 当前页

        columns: [    // 订单明细表头信息
            {
                title: "日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, index === this.userData.length - 1 ? '总计' :this.dataFormat(row.ord_date) || `暂无`)
                }
            },
  
            {
                title: "数量",
                render: (h, {row, index}) => {
                    return h('span', {
                    },index === this.userData.length - 1 ? '' : row.ord_room_numbers ? row.ord_room_numbers : `暂无${index}`)
                }
            },

            {
                title: "价格",
                render: (h, {row, index}) => {
                    return h('span', {
                    },index === this.userData.length - 1 ? '' : row.ord_room_price ? row.ord_room_price : `暂无${index}`)
                }
            },

            {
                title: "退款手续费",
                render: (h, {row, index}) => {
                    return h('span', {
                    },index === this.userData.length - 1 ? '' : row.refund_formalities ? row.refund_formalities : `暂无${index}`)
                }
            },

            {
                title: "退款滞纳金",
                render: (h, {row, index}) => {
                    return h('span', {
                    },index === this.userData.length - 1 ? '' : row.refunds ? row.refunds : `暂无${index}`)
                }
            },

            {
                title: "退款金额",
                render: (h, {row, index}) => {
                    return h('span', {
                    },index === this.userData.length - 1 ? this.totalPrice : row.refund_amount ? row.refund_amount : `暂无${index}`)
                }
            }

        ],

        columns1: [    // 入住人信息表头信息
            {
                title: "姓名",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.acc_realname ? row.acc_realname : `暂无${index}`)
                }
            },
  
            {
                title: "证件类型",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, `身份证`)
                }
            },

            {
                title: "证件号码",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.acc_id_cardno ? row.acc_id_cardno : `暂无${index}`)
                }
            },

            {
                title: "联系电话",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.acc_phonenum ? row.acc_phonenum : `暂无${index}`)
                }
            }

        ],

        userData: [],   // 内容数据

        userData1: [],   // 内容数据

        loading: false,  // 定义loading为true
        
        total: 0,   // 总页数

    }
  },
  methods:{

    // 转化时间
    dataFormat(time) {
        return formatTime(time);
    },

    formatTime(date) {
      if(date === undefined){
        return '';
      }
      var date = new Date(date); //如果date为13位不需要乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return Y + M + D + h + m + s;
    },

    SetStatusFilter(status){
       switch(status){
           case 0:
             return '待付款';
             break;
           case 1:
                return '待审核';
                break;
            case 2:
                return '已付款';
                break;
            case 3:
                return '已审核';
                break;
            case 4:
                return '申请退款';
                break;
            case 5:
                return '退款中';
                break;
            case 6:
                return '退款成功';
                break;
            case 7:
                return '退款失败';
                break;
            case 8:
                return '已入住';
                break;
            case 9:
                return '申请退房';
                break;
            case 10:
                return '退房中';
                break;
            case 11:
                return '退房成功';
                break;
            case 12:
                return '退房失败';
                break;
            case 13:
                return '订单取消';
                break;
            case 14:
                return '订单完成';
                break;
            case 15:
                return '预订单';
                break;
            default:
                return '';
                break;
       }
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

    // 为了解决异步问题
    async getUser(filter, pageIndex = 1) {
        var ord_id = localStorage.getItem('Refund_ord_id')
        console.log(ord_id);
   
        let params = {
            pageSize: 10,
            startPos: filter ? pageIndex : this.currentPage,
            ord_id
        };

         if (filter) {
        params = Object.assign(params, filter);
        if(filter.check_time[0] !== '') {
            params.check_in_time = this.dataFormat(filter.check_time[0].getTime());
            params.check_out_time = this.dataFormat(filter.check_time[1].getTime());
        }
      }

        this.loading = true;
        let { data } = await RefundListinfo(params);
        console.log(data)
        // this.total = data[0].count;
        // console.log(this.total)
        // data.shift(0);
        this.userData = data.detail;
        console.log(this.userData);
        let total = 0;
        for(let i of this.userData) {
            total = total + (i.refund_amount - 0)
        }
        this.userData.push({});
        this.totalPrice = total;
        this.formInline = data.info;
        console.log(this.formInline);
        
        this.loading = false;

        RefundListCustomerinfo(params).then(res => {
        console.log(res)
        this.userData1 = res.data;
        });
        // // this.total = data[0].count;
        // // console.log(this.total)
        // // data.shift(0);
        // this.userData1 = data;
        // console.log(this.userData1);
        // this.loading = false;
        // console.log(data);
    }

        },
    mounted() {
        this.getUser();
        console.log(this.refundInfoForm = JSON.parse(this.$route.query.data));
        this.refundInfoForm = JSON.parse(this.$route.query.data)
   }
};
</script>

