<style scoped lang="less">
@import "./batchAudit.less";
</style>
<!--批量审核 -->
<template>
    <div class="formView">

        <Form ref="formInline" :model="formInline" inline>

            <FormItem prop="reserve_person_name" label="预订人" :label-width="50">
                <Input type="text" v-model="formInline.reserve_person_name" placeholder="请输入预订人"></Input>
            </FormItem>
            
            <FormItem prop="reserve_persion_phone" label="预订人手机" :label-width="75">
                <Input type="text" v-model="formInline.reserve_persion_phone" placeholder="请输入预订人手机"></Input>
            </FormItem>

             <FormItem prop="order_status" label="订单状态" :label-width="60">
               <Select v-model="formInline.order_status" clearable style="width:200px">
                 <Option v-for="(item,index) in orderStatus" :key="index" :value="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="yu_org_name" label="预定机构" :label-width="60">
               <Select v-model="formInline.yu_org_name" clearable style="width:200px">
                 <Option v-for="(item,index) in batchinstitutionTitle" :value="item.org_name" :key="index">{{ item.org_name }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="check_time" label="入离时间" :label-width="60">              
             <DatePicker v-model="formInline.check_time" format="yyyy-MM-dd" type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker>
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
          @pageChange="pageChange"
        >
        </TableM>
    
    </div>
</template>

<script>
import TableM from "../../common/table/table.vue";
import {
  batchCheckoutList, //批量审核列表
  batchinstitutionTitleList, // 批量审核模糊查询-预定机构下拉列表渲染
} from "../../api/lp-order/api.js";

export default {
  name: "batchAuditModel",

  components: {
    TableM
  },
  data() {
    return {
      addModal: false,

      editModal: false,

      visible: false,

      formValidate: {
        // 定义新增表单的对象
        reserve_person_name: "",
        reserve_persion_phone: "",
        ord_status: "",
        reserve_destination: "",
        yu_org_name: "",
        check_time: ""
      },
      batchinstitutionTitle: [],

      orderStatus: [
        {
          value: 1,
          label: "待审核"
        },
        {
          value: 3,
          label: "已审核"
        },
        {
          value: 13,
          label: "取消订单"
        }
      ],

      destination: [],

      delDilaog: false, // 控制删除弹出框

      delLoading: false, // 控制删除按钮loading

      currentPageIndex: 1, // 当前页

      columns: [
        // 表头信息
        {
          title: "订单号",
          width: 260,
          key: "reserve_id"
        },

        {
          title: "预订人",
          width: 140,

          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.reserve_person_name ? row.reserve_person_name : `暂无`
            );
          }
        },

        {
          title: "预订人手机",
          width: 140,
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.reserve_persion_phone
                ? row.reserve_persion_phone
                : `暂无`
            );
          }
        },

        {
          title: "预定机构",
          width: 140,
          render: (h, { row, index }) => {
            return h("span", {}, row.yu_org_name ? row.yu_org_name : `暂无`);
          }
        },

        {
          title: "目的地名称",
          width: 140,
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.org_name ? row.org_name : `暂无`
            );
          }
        },

        {
          title: "申请日期",
          width: 140,
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              this.formatTime(row.reserver_time) || "暂无"

            );
          }
        },

        {
          title: "入住日期",
          width: 140,
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.begin_time ? row.begin_time : `暂无`
            );
          }
        },

        {
          title: "离开日期",
          width: 140,
          render: (h, { row, index }) => {
            return h("span", {}, row.end_time ? row.end_time : `暂无`);
          }
        },

        {
          title: "订单金额",
          width: 140,

          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.ord_amount ? `￥${row.ord_amount}` : `暂无`
            );
          }
        },

        {
          title: "订单状态",
          width: 140,

          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              this.SetStatusFilter(row.order_status) || "暂无"
            );
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
                  style: {
                    marginRight: "5px",
                    display:
                      params.row.order_status === 1 ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.goToDealingInfo(params);
                    }
                  }
                },
                "处理"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display:
                      params.row.order_status === 1 ? "none" : "inline-block"
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

      userData: [], // 内容数据

      total: 0, // 总页数

      formInline: {
        // 定义表单对象
        reserve_person_name: "",
        reserve_persion_phone: "",
        orderStatus: "",
        yu_org_name: "",
        check_time: "",
      },

      loading: false, // 定义loading为true

      currentPage: 1 // 定义当前页
    };
  },

  methods: {
    // 进入处理后  点击详情
    goToInfo(params) {
      console.log(params);
      const { reserve_id } = params.row;
      this.$router.push({
        path: "/order/batchOrderDeal",
        query: {
          data: JSON.stringify(reserve_id)
        }
      });
    },
    // 进入申请受理  点击处理
    goToDealingInfo(params) {
      console.log(params);
      const { reserve_id } = params.row;
      this.$router.push({
        path: "/order/applyDeal",
        query: {
          data: JSON.stringify(reserve_id)
        }
      });
    },

    // 过滤订单状态
    SetStatusFilter(status) {
      switch (status) {
        case 1:
          return "待审核";
          break;
        case 3:
          return "已审核";
          break;
        case 13:
          return "订单取消";
          break;
        case 15:
          return "预订单";
          break;
        default:
          return "";
          break;
      }
    },

    resetTotal() {
      this.currentPage = 1;
      this.total = 1;
    },

    // 获取时间
    getFormatterTime(val) {
      console.log(val);
    },
    dataFormat(time) {
        return this.formatTime(time);
    },
    // 改变分页触发的事件
    pageChange(pageIndex) {
      // 改变当前页
      console.log(pageIndex);
      this.currentPage = pageIndex;
      for (let i in this.formInline) {
        if ((this.formInline[i] !== undefined || this.formInline[i] !== "") && this.formInline.check_time[0] !== '') {
          this.getUser(this.formInline);
          return false;
        }
      }
      this.getUser();
    },

    // 渲染预定机构下拉列表
    async batchinstitutionTitleFun() {
      const { data } = await batchinstitutionTitleList();
      data.shift(0);
      console.log(data);
      
      this.batchinstitutionTitle = data;
    },


    formatTime(date) {
      if(!date){
        return ""
      }
      var date = new Date(date); //如果date为13位不需要乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      // var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      // var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return Y + M + D;
    },
    searchClick(filter) {
      this.resetTotal();
      if (filter) {
        for (let i in filter) {
          if (filter[i] === undefined || filter[i] === "") {
            delete filter[i];
          }
        }
      }
      this.getUser(filter);
    },

    //批量审核订单列表
    // 为了解决异步问题
    async getUser(filter) {
      console.log(filter);
      var adm_user_id = JSON.parse(localStorage.getItem("user")).adm_user_id;
      let params = {
        pageSize: 10,
        startPos: filter ? 1 : this.currentPage,
        adm_user_id
      };

      if (filter) {
        params = Object.assign(params, filter);
        if (filter.check_time[0] !== "") {
          params.begin_time = this.dataFormat(filter.check_time[0].getTime());
          params.end_time = this.dataFormat(filter.check_time[1].getTime());
        }
        delete params.check_time
      }

      // this.loading = true;
      let { data } = await batchCheckoutList(params);
      console.log(data);
      
      this.total = data.content.count;
      this.userData = data.content.list;
    }
  },
  mounted() {
    this.getUser();
    this.batchinstitutionTitleFun();
  }
};
</script>

