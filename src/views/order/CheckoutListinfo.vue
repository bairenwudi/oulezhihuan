<style scope lang="less">
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
                    <dt>{{checkoutInfoForm.ord_id}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单支付时间：</dd>
                    <dt>{{checkoutInfoForm.ord_payment_time}}</dt>
                </div>

                <div class="TD-view">
                    <dd>支付方式：</dd>
                    <dt>{{checkoutInfoForm.ord_payment}}</dt>
                </div>

                <div class="TD-view">
                    <dd>房间数量：</dd>
                    <dt>{{checkoutInfoForm.ord_room_numbers}}</dt>
                </div>

                <div class="TD-view">
                    <dd>机构标题：</dd>
                    <dt>{{checkoutInfoForm.org_name}}</dt>
                </div>

                <div class="TD-view">
                    <dd>下单日期：</dd>
                    <dt>{{checkoutInfoForm.ord_time}}</dt>
                </div>

                <div class="TD-view">
                    <dd>入住日期：</dd>
                    <dt>{{checkoutInfoForm.check_in_time}}</dt>
                </div>

                <div class="TD-view">
                    <dd>预定天数：</dd>
                    <dt>{{checkoutInfoForm.ord_days}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单状态：</dd>
                    <dt>{{checkoutInfoForm.ord_status}}</dt>
                </div>

                <div class="TD-view">
                    <dd>支付状态：</dd>
                    <dt>{{checkoutInfoForm.ord_payment}}</dt>
                </div>

                <div class="TD-view">
                    <dd>离开日期：</dd>
                    <dt>{{checkoutInfoForm.check_out_time}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单金额：</dd>
                    <dt>{{checkoutInfoForm.payment_status}}</dt>
                </div>


                <div class="TD-view">
                    <dd>房型名称：</dd>
                    <dt>{{checkoutInfoForm.room_type}}</dt>
                </div>

                <div class="TD-view">
                    <dd>申请退房日期：</dd>
                    <dt>{{checkoutInfoForm.refund_time}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退房金额：</dd>
                    <dt>{{checkoutInfoForm.refund_amount}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退房手续费：</dd>
                    <dt>{{checkoutInfoForm.refund_formalities}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退房滞纳金：</dd>
                    <dt>{{checkoutInfoForm.refunds}}</dt>
                </div>

                <div class="TD-view">
                    <dd>退房原因：</dd>
                    <dt>{{checkoutInfoForm.refund_reason}}</dt>
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
        <h2>预订人信息</h2>
          <Row>
            <Card class="TD-card" ref="checkoutInfoForm" :model="checkoutInfoForm">
                <div class="TD-view">
                    <dd>预订人姓名：</dd>
                    <dt>{{checkoutInfoForm.ord_customer}}</dt>
                </div>

                <div class="TD-view">
                    <dd>预订人手机：</dd>
                    <dt>{{checkoutInfoForm.ord_phone_number}}</dt>
                </div>

            </Card>
        </Row>
        <h2>入住人信息</h2><br/>
          <TableM 
            :columns="columns1" 
            :data="userData" 
            :loading="loading" 
            :current.async="currentPageIndex" 
            :total="total" 
            @pageChange="pageChange">
          </TableM>

    </div>
</template>

<script>
import TableM from '@/common/table/table.vue';
import {
    checkoutListinfo, //退房单详情列表-订单信息、订单明细、预订人信息
    checkoutListCustomerinfo, // 退房单详情列表-入住人
}from '../../api/lp-order/api.js'
export default {
  name: "CheckoutListinfoModel",
  components: {
      TableM
  },
  data() {
    return {
        checkoutInfoForm:{
          
        },

        currentPageIndex: 1,    // 当前页

        columns: [    // 订单明细表头信息
            {
                title: "日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_date ? row.ord_date : `暂无${index}`)
                }
            },
  
            {
                title: "数量",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_room_numbers ? row.ord_room_numbers : `暂无${index}`)
                }
            },

            {
                title: "价格",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.ord_room_price ? row.ord_room_price : `暂无${index}`)
                }
            },

            {
                title: "退房手续费",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.refund_formalities ? row.refund_formalities : `暂无${index}`)
                }
            },

            {
                title: "退房滞纳金",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.refunds ? row.refunds : `暂无${index}`)
                }
            },

            {
                title: "退房金额",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.refund_amount ? row.refund_amount : `暂无${index}`)
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
                    }, `身份证${index}`)
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

        loading: false,  // 定义loading为true
        
        total: 0,   // 总页数

    }
  },
  methods:{
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
        },
    mounted() {
        console.log(this.checkoutInfoForm = JSON.parse(this.$route.query.data));
        this.checkoutInfoForm = JSON.parse(this.$route.query.data)
    }
};
</script>

