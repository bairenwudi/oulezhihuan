<style scoped lang="less">
    @import './CheckoutListinfo.less';
</style>
<!-- 退房单详情 -->
<template>
    <div class="formView">
        <h2>订单信息</h2>
        <Row>
            <Card class="TD-card" ref="checkoutInfoForm" :model="checkoutInfoForm">
                <div class="TD-view">
                    <dd>订单号：</dd>
                    <dt>{{checkoutInfoForm.ord_id  || '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单支付时间：</dd>
                    <dt>{{checkoutInfoForm.ord_payment_time ? this.dataFormat(checkoutInfoForm.ord_payment_time) : '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>支付方式：</dd>
                    <dt>{{checkoutInfoForm.ord_payment === "1"? `支付宝` : checkoutInfoForm.ord_payment === "2"? `微信` : `暂无`}}</dt>
                </div>

                <div class="TD-view">
                    <dd>房间数量：</dd>
                    <dt>{{checkoutInfoForm.ord_room_numbers || '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>机构标题：</dd>
                    <dt>{{checkoutInfoForm.org_name || '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>下单日期：</dd>
                    <dt>{{checkoutInfoForm.ord_time ? this.dataFormat(checkoutInfoForm.ord_time) : '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>入住日期：</dd>
                    <dt>{{checkoutInfoForm.check_in_time ? this.dataFormatDay(checkoutInfoForm.check_in_time) : '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>预定天数：</dd>
                    <dt>{{checkoutInfoForm.ord_days || '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>剩余入住天数：</dd>
                    <dt>{{checkoutInfoForm.ord_days || '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单状态：</dd>
                    <dt>{{checkoutInfoForm.ord_status ? this.SetStatusFilter(checkoutInfoForm.ord_status) : '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>支付状态：</dd>
                    <dt>{{checkoutInfoForm.ord_payment_status === "1" ? `已支付` : `未支付`}}</dt>
                </div>

                <div class="TD-view">
                    <dd>离开日期：</dd>
                    <dt>{{checkoutInfoForm.check_out_time ? this.dataFormatDay(checkoutInfoForm.check_out_time) : '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单金额：</dd>
                    <dt>{{checkoutInfoForm.ord_amount || '暂无'}}</dt>
                </div>


                <div class="TD-view">
                    <dd>房型名称：</dd>
                    <dt>{{checkoutInfoForm.room_name || '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>申请退房日期：</dd>
                    <dt>{{checkoutInfoForm.refund_time ? this.dataFormat(checkoutInfoForm.refund_time) : '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退房金额：</dd>
                    <dt>{{checkoutInfoForm.refund_amount || '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退房手续费：</dd>
                    <dt>{{checkoutInfoForm.refund_formalities || '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退房滞纳金：</dd>
                    <dt>{{checkoutInfoForm.refunds || '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退房原因：</dd>
                    <dt>{{checkoutInfoForm.refund_reason || '暂无'}}</dt>
                </div>

            </Card>
        </Row>
        <h2>订单明细</h2><br/>
          <TableM 
            :columns="columns" 
            :data="userData" 
            :height="280"
            :loading="loading">
          </TableM>
        <h2>预订人信息</h2>
          <Row>
            <Card class="TD-card" ref="checkoutInfoForm" :model="checkoutInfoForm">
                <div class="TD-view">
                    <dd>预订人姓名：</dd>
                    <dt>{{checkoutInfoForm.ord_customer  || '暂无'}}</dt>
                </div>

                <div class="TD-view">
                    <dd>预订人手机：</dd>
                    <dt>{{checkoutInfoForm.ord_phone_number  || '暂无'}}</dt>
                </div>

            </Card>
        </Row>
        <h2>入住人信息</h2><br/>
          <TableM 
            :columns="columns1"
            :height="280"
            :data="userData1" 
            :loading="loading">
          </TableM>

    </div>
</template>

<script>
import TableM from '@/common/table/tableLock.vue';
import {
    checkoutListinfo, //退房单详情列表-订单信息、订单明细、预订人信息
    checkoutListCustomerinfo, // 退房单详情列表-入住人
}from '../../api/lp-order/api.js'

// 年月日分秒时 补充时间格式 不够10 补充 0
import { formatTime } from "@/common/date/formatTime.js";

// 年月日 补充时间格式 不够10 补充 0
import { formatTimeDay } from "@/common/date/formatTime.js";

// 剩余入住天数
import { DateDiff } from "@/common/date/formatTime.js";

// 引入优化滚动插件
import VirtualList from 'vue-virtual-scroll-list'

export default {
  name: "CheckoutListinfoModel",
  components: {
      TableM
  },
  data() {
    return {
        checkoutInfoForm:{ },

        currentPageIndex: 1,    // 当前页

        totalPrice: 0,

        columns: [    // 订单明细表头信息
            {
                title: "日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, index === this.userData.length - 1 ? '总计' : row.ord_date ? this.dataFormatDay(row.ord_date) : `暂无`)
                }
            },
  
            {
                title: "数量",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, index === this.userData.length - 1 ? '' : row.ord_room_numbers ? row.ord_room_numbers : `暂无`)
                }
            },

            {
                title: "价格",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, index === this.userData.length - 1 ? '' : row.ord_room_price ? row.ord_room_price : `暂无`)
                }
            },

            {
                title: "退房手续费",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, index === this.userData.length - 1 ? '' : row.refund_formalities ? row.refund_formalities : `暂无`)
                }
            },

            {
                title: "退房滞纳金",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, index === this.userData.length - 1 ? '' : row.refunds ? row.refunds : `暂无`)
                }
            },

            {
                title: "退房金额",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, index === this.userData.length - 1 ? this.totalPrice : row.refund_amount ? row.refund_amount : `暂无`)
                }
            }

        ],

         columns1: [    // 入住人信息表头信息
            {
                title: "姓名",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.acc_realname ? row.acc_realname : `暂无`)
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
                    }, row.acc_id_cardno ? row.acc_id_cardno : `暂无`)
                }
            },

            {
                title: "联系电话",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.acc_phonenum ? row.acc_phonenum : `暂无`)
                }
            }

        ],

        userData: [],   // 内容数据

        userData1: [],   // 内容数据

        loading: false,  // 定义loading为true
        
        // total: 0,   // 总页数

    }
  },

  
  computed: {            
    // countNum:function(){
    //     return Number(this.oneNum) ++        
    //    }
  },

  methods:{
    
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
            default:
                return '';
                break;
        }
    },

            // 改变分页触发的事件
    // pageChange(pageIndex) {
    //     // 改变当前页
    //     // this.currentPage = pageIndex;
    //     for (let i in this.formInline) {
    //         if (this.formInline[i] !== undefined || this.formInline[i] !== '') {
    //             this.getUser(this.formInline, pageIndex);  
    //             return false;
    //         }
    //     };
    //     this.getUser();
    // },

    // 为了解决异步问题
    async getUser(filter) {
        var ord_id = localStorage.getItem('Checkout_ord_id')
        console.log(ord_id);
   
        let params = {
            // pageSize: 10,
            // startPos: filter ? pageIndex : this.currentPage,
            ord_id
        };

         if (filter) {
        params = Object.assign(params, filter);
        if(filter.check_time[0] !== '') {
            params.check_in_time = this.dataFormatDay(filter.check_time[0].getTime());
            params.check_out_time = this.dataFormatDay(filter.check_time[1].getTime());
        }
      }

        // this.loading = true;
        let { data } = await checkoutListinfo(params);
        console.log(data)
        // this.total = data[0].count;
        // console.log(this.total)
        // data.shift(0);
        this.userData = data.detail;
        
        let total = 0;
        for(let i of this.userData) {
            total = total + (i.refund_amount - 0)
        }
        this.userData.push({});
        this.totalPrice = total;

        this.checkoutInfoForm = data.info[0];
        console.log(this.checkoutInfoForm);        
        
        this.loading = false;

        checkoutListCustomerinfo(params).then(res => {
        console.log(res)
        this.userData1 = res.data.content.list;
        console.log(this.userData1)
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
        console.log(this.checkoutInfoForm = JSON.parse(this.$route.query.data));
        this.checkoutInfoForm = JSON.parse(this.$route.query.data)
    }
};
</script>

