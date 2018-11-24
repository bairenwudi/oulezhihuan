<style scope lang="less">
    @import './AppOrderinfo.less';
</style>
<!-- App订单详情 -->
<template>
    <div class="formView">
        <h2>订单信息</h2>
        <Row>
            <Card class="TD-card" ref="appOrderInfoForm" :model="appOrderInfoForm">
                 <div class="TD-view">
                    <dd>订单号：</dd>
                    <dt>{{appOrderInfoForm.ord_id}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单支付时间：</dd>
                    <dt>{{appOrderInfoForm.ord_payment_time}}</dt>
                </div>

                <div class="TD-view">
                    <dd>支付方式：</dd>
                    <dt>{{appOrderInfoForm.ord_payment}}</dt>
                </div>

                <div class="TD-view">
                    <dd>房间数量：</dd>
                    <dt>{{appOrderInfoForm.ord_room_numbers}}</dt>
                </div>

                <div class="TD-view">
                    <dd>机构标题：</dd>
                    <dt>{{appOrderInfoForm.org_name}}</dt>
                </div>

                <div class="TD-view">
                    <dd>下单日期：</dd>
                    <dt>{{appOrderInfoForm.ord_time}}</dt>
                </div>

                <div class="TD-view">
                    <dd>入住日期：</dd>
                    <dt>{{appOrderInfoForm.check_in_time}}</dt>
                </div>

                <div class="TD-view">
                    <dd>预定天数：</dd>
                    <dt>{{appOrderInfoForm.ord_days}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单状态：</dd>
                    <dt>{{this.SetStatusFilter(appOrderInfoForm.ord_status)}}</dt>
                </div>

                <div class="TD-view">
                    <dd>支付状态：</dd>
                    <dt>{{appOrderInfoForm.ord_payment_status === "1" ? `已支付` : `未支付`}}</dt>
                </div>

                <div class="TD-view">
                    <dd>离开日期：</dd>
                    <dt>{{appOrderInfoForm.check_out_time}}</dt>
                </div>

                <div class="TD-view">
                    <dd>订单金额：</dd>
                    <dt>{{appOrderInfoForm.payment_status}}</dt>
                </div>

                <div class="TD-view">
                    <dd>房间名称：</dd>
                    <dt>{{appOrderInfoForm.room_name}}</dt>
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
            <Card class="TD-card" ref="appOrderInfoForm" :model="appOrderInfoForm">
                <div class="TD-view">
                    <dd>预订人姓名：</dd>
                    <dt>{{appOrderInfoForm.ord_customer}}</dt>
                </div>

                <div class="TD-view">
                    <dd>预订人手机：</dd>
                    <dt>{{appOrderInfoForm.ord_phone_number}}</dt>
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
import TableM from '@/common/table/table.vue';
import {
    appOrderListinfo,//App订单详情列表-订单信息、订单明细、预订人信息
    appOrderListCustomerinfo,// App订单详情列表-入住人
}from '../../api/lp-order/api.js'
export default {
  name: "AppOrderinfo",
  components: {
      TableM
  },
  data() {
    return {
        appOrderInfoForm:{
          
        },

        currentPageIndex: 1,    // 当前页

        columns: [    // 订单明细表头信息
            {
                title: "日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, this.dataFormat(row.ord_date) || `暂无${index}`)
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
        this.currentPage = pageIndex;
        for (let i in this.formInline) {
            if (this.formInline[i] !== undefined || this.formInline[i] !== '') {
                this.getUser(this.formInline);  
                return false;
            }
        };
        this.getUser();
    },

    // 为了解决异步问题
    async getUser(filter, pageIndex = 1) {
        var ord_id = localStorage.getItem('App_ord_id')
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
        let { data } = await appOrderListinfo(params);
        console.log(data)
        // this.total = data[0].count;
        // console.log(this.total)
        // data.shift(0);
        this.userData = data.detail;
        console.log(this.userData);
        this.loading = false;

        appOrderListCustomerinfo(params).then(res => {
        console.log(res)
        this.userData1 = res.data.content.list;
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
    mounted(){
        this.getUser();
        console.log(this.appOrderInfoForm = JSON.parse(this.$route.query.data));
        this.appOrderInfoForm = JSON.parse(this.$route.query.data)
    }
};
</script>

