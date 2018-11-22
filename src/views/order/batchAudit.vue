<style scope lang="less">
    @import './batchAudit.less';
</style>
<!--批量审核 -->
<template>
    <div class="formView">

        <Form ref="formInline" :model="formInline" inline>

            <FormItem prop="reserve_persion_name" label="预订人" :label-width="50">
                <Input type="text" v-model="formInline.reserve_persion_name" placeholder="请输入预订人"></Input>
            </FormItem>

            <FormItem prop="reserve_persion_phone" label="预订人手机" :label-width="75">
                <Input type="text" v-model="formInline.reserve_persion_phone" placeholder="请输入预订人手机"></Input>
            </FormItem>

             <FormItem prop="order_status" label="订单状态" :label-width="60">
               <Select v-model="formInline.order_status" clearable style="width:200px">
                 <Option v-for="item in orderStatus" :value="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="org_name" label="预定机构" :label-width="60">
               <Select v-model="formInline.org_name" clearable style="width:200px">
                 <Option v-for="item in batchinstitutionTitle" :value="item.org_name" :key="item.adm_user_type">{{ item.org_name }}</Option>
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
        @pageChange="pageChange">
        </TableM>
    
    </div>
</template>

<script>

import TableM from "../../common/table/table.vue";
import {
    batchAuditList,//批量审核列表
    batchAuditSearch,//批量审核模糊查询
    batchinstitutionTitleList,// 批量审核模糊查询-预定机构下拉列表渲染
    batchIdList//批量审核模糊查询-获取登录的id(adm_id)
} from '../../api/lp-order/api.js'

export default {
  name: "batchAuditModel",

  components: {
    TableM
  }, 
  data() {

    return {
        adm_id: "adm_user_id",

        addModal: false,
        
        editModal: false,

        visible: false,

        formValidate: {     // 定义新增表单的对象
                reserve_persion_name: "",
                reserve_persion_phone:'',
                ord_status: "",
                reserve_destination:'',
                org_name: "",
                check_time: ''
            },
        batchinstitutionTitle:[],

        orderStatus:[
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
            },
        ],

        destination:[],
        
        delDilaog: false,   // 控制删除弹出框
        
        delLoading: false,   // 控制删除按钮loading

        currentPageIndex: 1,    // 当前页

        columns: [    // 表头信息
            {
                title: "订单号",
                width: 120,
                key: "reserve_id",
            },

            {
                title: "预订人",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.reserve_person_name ? row.reserve_person_name : `暂无${index}`)
                }
            },

            {
                title: "预订人手机",
                width: 100,
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.reserve_persion_phone ? row.reserve_persion_phone : `暂无${index}`)     
                }
            },

            {
                title: "预定机构",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.org_name ? row.org_name : `暂无${index}`)
                }
            },

            {
                title: "目的地名称",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.reserve_destination ? row.reserve_destination : `暂无${index}`)
                }
            },

            {
                title: "申请日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.apply_date ? row.apply_date : `暂无${index}`)
                }
            },

            {
                title: "入住日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.begin_time ? row.begin_time : `暂无${index}`)
                }
            },

            {
                title: "离开日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.end_time ? row.end_time : `暂无${index}`)
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
                    return h('span', {}, this.SetStatusFilter(row.ord_status) || "暂无")
                }
            },

            {
                title: "操作",
                width: 200,
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
                            display:(params.row.order_status === 1) ? "inline-block":"none"
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
                        style:{
                            marginRight: "5px",
                            display:(params.row.order_status === 1) ? "none":"inline-block"
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
            cus_account: '',
            cus_nick_name: ''
        },

        loading: false,  // 定义loading为true

        currentPage: 1   // 定义当前页
    };
  },

  methods: {
    // 进入详情
    goToInfo(params) {
        this.$router.push({
            path: '/infoModel',
            data: params 
        })
    },

    
    // 过滤订单状态
    SetStatusFilter(status){
        switch(status){
            case 1:
              return '待审核';
              break;
            case 3:
              return '已审核';
              break;
            case 13:
              return '订单取消';
              break;
            case 15:
              return "预订单";
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

    // 获取时间
        getFormatterTime(val) {
            console.log(val);
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

    // 渲染预定机构下拉列表
    async batchinstitutionTitleFun() {
        const { data } = await batchinstitutionTitleList();
        data.shift(0);
        this.batchinstitutionTitle = Array.from(new Set(data));
        // console.log(arr)
    },

    // 获取登录的id(adm_id)
    async batchIdListFun() {
        const { data } = await batchIdList();
        console.log(1);
        data.shift(0);
        this.adm_id = data;
        console.log(this.adm_id)
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
     
    //批量审核订单列表 
    // 为了解决异步问题
    async getUser(filter) {
      var adm_user_id = JSON.parse(localStorage.getItem("user")).adm_user_id;
      let params = {
        pageSize: 10,
        startPos: filter ? 1 : this.currentPage,
        adm_user_id
      };

      if (filter) {
        params = Object.assign(params, filter);
        if (filter.check_time[0] !== "") {
          params.check_in_time = this.dataFormat(
            filter.check_time[0].getTime()
          );
          params.check_out_time = this.dataFormat(
            filter.check_time[1].getTime()
          );
        }
      }

      // this.loading = true;
      let { data } = await batchAuditList(params);
      this.total = data[0].count;
      var org_id = "";
      var org_name = "新郑";

      let param = {
        pageSize: 10,
        startPos: filter ? 1 : this.currentPage,
        org_name
      };
      let res = await batchAuditList(param);
      this.total = res.data[0].count;
      res.data.shift(0);
      this.userData = res.data;
      this.loading = false;
    }
  },
  mounted() {
    this.getUser();
    this.batchinstitutionTitleFun();
  }
};
</script>

