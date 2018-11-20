<style scope lang="less">
@import "./appOrder.less";
</style>
 <!-- App订单 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>
            <FormItem prop="ord_id" label="订单号" :label-width="50">
                <Input type="text" clearable v-model="formInline.ord_id" placeholder="请输入订单号"></Input>
            </FormItem>

            <FormItem prop="ord_customer" label="预订人" :label-width="50">
                <Input type="text" clearable v-model="formInline.ord_customer" placeholder="请输入预订人"></Input>
            </FormItem>

            <FormItem prop="ord_phone_number" label="预订人手机" :label-width="75">
                <Input type="text" clearable v-model="formInline.ord_phone_number" placeholder="请输入预订人手机"></Input>
            </FormItem>

            <FormItem prop="ord_payment_status" label="支付状态" :label-width="60">
               <Select v-model="formInline.ord_payment_status" clearable style="width:200px">
                 <Option v-for="item in payStatus" :value="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="check_time" label="入离时间" :label-width="60">              
             <!-- <DatePicker v-model="formInline.check_time" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker> -->
              <DatePicker v-model="formInline.check_time" format="yyyy-MM-dd" type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker>
            </FormItem>

            <FormItem prop="ord_status" label="订单状态" :label-width="60">
               <Select v-model="formInline.ord_status" clearable style="width:200px">
                 <Option v-for="item in orderStatus" :value="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <!-- <FormItem prop="org_name" label="机构标题" :label-width="60">
               <Select v-model="formInline.org_name" clearable style="width:200px">
                 <Option v-for="(item, index) in AppinstitutionTitle" :key="index" :value="item.ord_id" :label="item.org_name"></Option>
               </Select>
            </FormItem> -->

            <FormItem prop="org_name" label="机构标题" :label-width="60">
               <Select v-model="formInline.org_name" clearable style="width:200px">
                 <Option v-for="item in AppinstitutionTitle" :value="item.org_name" :key="item.adm_user_type">{{ item.org_name }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="room_type" label="房型名称" :label-width="60">
                <Select v-model="formInline.room_type" clearable style="width:200px">
                    <virtual-list :size="30" :remain="5">
                        <Option v-for="item in roomType" :value="item.room_type" :key="item.org_id">{{ item.room_type }}</Option>
                    </virtual-list>
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
import TableM from "@/common/table/table.vue";
import {
  appOrderList, // App订单列表
  appOrderSearch, // App订单模糊查询
  roomtypeList, // App订单-房间类型下拉框渲染
  AppInstitutionalTitleList, //App订单-机构标题下拉框渲染
} from "../../api/lp-order/api.js";

// 补充时间格式 不够10 补充 0
import { formatTime } from "@/common/date/formatTime.js";
// 引入优化滚动插件
import VirtualList from 'vue-virtual-scroll-list'

export default {
  name: "appOrderModel",

  components: {
    TableM,
    VirtualList
  },
  data() {
    return {
      payStatus: [
        {
          value: 1,
          label: "已支付"
        },
        {
          value: 0,
          label: "未支付"
        }
      ],

      orderStatus: [
        {
          value: 0,
          label: "待付款"
        },
        {
          value: 1,
          label: "待审核"
        },
        {
          value: 2,
          label: "已付款"
        },
        {
          value: 3,
          label: "已审核"
        },
        {
          value: 4,
          label: "申请退款"
        },
        {
          value: 5,
          label: "退款中"
        },
        {
          value: 6,
          label: "退款成功"
        },
        {
          value: 7,
          label: "退款失败"
        },
        {
          value: 8,
          label: "已入住"
        },
        {
          value: 9,
          label: "申请退房"
        },
        {
          value: 10,
          label: "退房中"
        },
        {
          value: 11,
          label: "退房成功"
        },
        {
          value: 12,
          label: "退房失败"
        },
        {
          value: 13,
          label: "订单取消"
        },
        {
          value: 14,
          label: "订单完成"
        }
      ],
      
      AppinstitutionTitle: [
        {
          org_name: '',
          adm_user_type : 3
        },
      ],

      roomType: [],

      currentPageIndex: 1, // 当前页

      columns: [
        // App订单表头信息
        {
          title: "订单号",
          width: 120,
          key: "ord_id"
        },

        {
          title: "预订人",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.ord_customer ? row.ord_customer : `暂无${index}`
            );
          }
        },

        {
          title: "预订人手机",
          width: 100,
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.ord_phone_number ? row.ord_phone_number : `暂无${index}`
            );
          }
        },

        {
          title: "机构标题",
          render: (h, { row, index }) => {
            return h("span", {}, row.org_name ? row.org_name : `暂无${index}`);
          }
        },

        {
          title: "房型名称",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.room_type ? row.room_type : `暂无${index}`
            );
          }
        },

        {
          title: "房间数量",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.ord_room_numbers ? row.ord_room_numbers : `暂无${index}`
            );
          }
        },

        {
          title: "下单日期",
          render: (h, { row, index }) => {
            return h("span", {}, row.ord_time ? row.ord_time : `暂无${index}`);
          }
        },

        {
          title: "入住日期",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.check_in_time ? row.check_in_time : `暂无${index}`
            );
          }
        },

        {
          title: "离开日期",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.check_out_time ? row.check_out_time : `暂无${index}`
            );
          }
        },

        {
          title: "支付状态",
          render: (h, { row, index }) => {
            return h(
              "span",
              {
                // }, row.ord_payment_status ? row.ord_payment_status : `暂无${index}`)
              },
              row.ord_payment_status === "1" ? `已支付` : `未支付`
            );
          }
        },

        {
          title: "订单金额",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.ord_amount ? row.ord_amount : `暂无${index}`
            );
          }
        },

        {
          title: "订单状态",
          render: (h, { row, index }) => {
            return h("span", {}, this.SetStatusFilter(row.ord_status) || "暂无");
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

      userData: [], // 内容数据

      total: 0, // 总页数

      formInline: {
        // 定义表单对象
        ord_id: "",
        ord_customer: "",
        ord_phone_number: "",
        ord_payment_status: "",
        ord_status: "",
        org_name: "",
        room_type: "",
        check_time: ''
      },

      loading: false, // 定义loading为true

      currentPage: 1 // 定义当前页
    };
  },

  methods: {
    // 进入详情
    goToInfo({ row }) {
      this.$router.push({
        path: "/AppOrderinfoModel",
        query: {
          data: JSON.stringify(row)
        }
      });
    },

    // 转化时间
    dataFormat(time) {
        return formatTime(time);
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
                return '退房中';
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

    resetTotal() {
      this.currentPage = 1;
      this.total = 1;
    },

    // 改变分页触发的事件
    pageChange(pageIndex) {
      // 改变当前页
      // this.currentPage = pageIndex;
      for (let i in this.formInline) {
        if (this.formInline[i] !== undefined || this.formInline[i] !== "") {
          this.getUser(this.formInline, pageIndex);
          return false;
        }
      }
      this.getUser();
    },

    // 渲染机构标题下拉列表
    async AppInstitutionalTitleListFun() {
        const { data } = await AppInstitutionalTitleList();
        data.shift(0);
        this.AppinstitutionTitle = Array.from(new Set(data));
        // console.log(arr)
    },

    // 渲染房间类型下拉列表
    async roomtypeListFun() {
        const { data } = await roomtypeList();
        data.shift(0);
        this.roomType = data;
        console.log(this.roomType)
    },

    // 模糊查询
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

    // 为了解决异步问题
    async getUser(filter, pageIndex = 1) {
      let params = {
        pageSize: 10,
        startPos: filter ? pageIndex : this.currentPage
      };

      if (filter) {
        params = Object.assign(params, filter);
        if(filter.check_time[0] !== '') {
            params.check_in_time = this.dataFormat(filter.check_time[0].getTime());
            params.check_out_time = this.dataFormat(filter.check_time[1].getTime());
        }
      }

      console.log(params)
      this.loading = true;
      let { data } = await appOrderList(params);
      console.log(data);
      this.total = data[0].count;
      console.log(this.total);
      data.shift(0);
      this.userData = data;
      this.loading = false;
      console.log(data);
    }
  },
  mounted() {
    this.getUser();
    this.roomtypeListFun();
    this.AppInstitutionalTitleListFun();
  }
};
</script>

