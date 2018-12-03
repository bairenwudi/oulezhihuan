<style scoped lang="less">
    @import './info.less';
</style>

<template>
    <div class="formView">
        <h2>订单信息</h2>
        <Row>
            <Card class="TD-card">
                <div class="TD-view">
                    <dd>订单号：</dd>
                    <dt>201816556461654654</dt>
                </div>

                <div class="TD-view">
                    <dd>订单支付时间：</dd>
                    <dt>8080.80.80 80:80:80</dt>
                </div>

                <div class="TD-view">
                    <dd>支付方式：</dd>
                    <dt>支付宝</dt>
                </div>

                <div class="TD-view">
                    <dd>房间数量：</dd>
                    <dt>12</dt>
                </div>

                <div class="TD-view">
                    <dd>机构标题：</dd>
                    <dt>桂林乐满地</dt>
                </div>

                <div class="TD-view">
                    <dd>下单日期：</dd>
                    <dt>8080.80.80</dt>
                </div>

                <div class="TD-view">
                    <dd>入住日期：</dd>
                    <dt>8080.80.80</dt>
                </div>

                <div class="TD-view">
                    <dd>预定天数：</dd>
                    <dt>3</dt>
                </div>

                <div class="TD-view">
                    <dd>订单状态：</dd>
                    <dt>订单完成</dt>
                </div>

                <div class="TD-view">
                    <dd>支付状态：</dd>
                    <dt>已付款</dt>
                </div>

                <div class="TD-view">
                    <dd>离店日期：</dd>
                    <dt>8080.80.80</dt>
                </div>

                <div class="TD-view">
                    <dd>订单金额：</dd>
                    <dt>888.888元</dt>
                </div>

                <div class="TD-view">
                    <dd>房型名称：</dd>
                    <dt>大床房</dt>
                </div>

            </Card>
        </Row>
        <h2>订单明细</h2>
          <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
        <h2>预订人信息</h2>
          <Row>
            <Card class="TD-card">
                <div class="TD-view">
                    <dd>预订人姓名：</dd>
                    <dt>哈哈哈哈哈</dt>
                </div>

                <div class="TD-view">
                    <dd>预订人手机：</dd>
                    <dt>13588556699</dt>
                </div>

            </Card>
        </Row>
        <h2>入住人信息</h2>
          <TableM :columns="columns1" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>

    </div>
</template>

<script>
import TableM from '@/common/table/table.vue'
export default {
  name: "info",
  components: {
      TableM
  },
  data() {
    return {
        currentPageIndex: 1,    // 当前页

        columns: [    // 订单明细表头信息
            {
                title: "日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.reserve_destination ? row.reserve_destination : `暂无`)
                }
            },
  
            {
                title: "数量",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.room_name ? row.room_name : `暂无`)
                }
            },

            {
                title: "价格",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.room_type_sort ? row.room_type_sort : `暂无`)
                }
            }

        ],

        columns1: [    // 入住人信息表头信息
            {
                title: "姓名",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.reserve_destination ? row.reserve_destination : `暂无`)
                }
            },
  
            {
                title: "证件类型",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.room_name ? row.room_name : `暂无`)
                }
            },

            {
                title: "证件号码",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.room_type_sort ? row.room_type_sort : `暂无`)
                }
            },

            {
                title: "联系电话",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.room_type_sort ? row.room_type_sort : `暂无`)
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
        this.currentPage = pageIndex;
        for (let i in this.formInline) {
            if (this.formInline[i] !== undefined || this.formInline[i] !== '') {
                this.getUser(this.formInline);  
                return false;
            }
        };
        this.getUser();
    },
        }
};
</script>

