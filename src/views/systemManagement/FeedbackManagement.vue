<style scope lang="less">
    @import './FeedbackManagement.less';
</style>
<!-- 意见反馈 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>

            <FormItem prop="cus_account" label="用户账号" :label-width="60">
                <Input type="text" clearable v-model="formInline.cus_account" placeholder="请输入用户账号"></Input>
            </FormItem>

            <FormItem prop="contact_phone" label="联系电话" :label-width="60">              
                <Input type="text" clearable v-model="formInline.contact_phone" placeholder="请输入联系电话"></Input>
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
    FeedbackList, //意见反馈列表
    FeedbackSearch, //意见反馈模糊查询
    getBase, // 获取域名
} from '../../api/lp-systemManagement/api.js'

export default {
  name: "FeedbackManagementModel",

  components: {
    TableM
  }, 
  data() {
    return {
        moreModal:false,

        value2: 0,

        currentPageIndex: 1,    // 当前页

        columns: [    // 意见反馈表头信息   

            {
                title: "用户账号",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.cus_account ? row.cus_account : `暂无${index}`)     
                }
            },

            {
                title: "联系电话",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.contact_phone ? row.contact_phone : `暂无${index}`)
                }
            },

            {
                title: "反馈内容",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.suggestion_details ? row.suggestion_details : `暂无${index}`)

                }
            },

            {
                title: "反馈图片",
                key: "action",
                align: "center",
                render: (h, {row, index}) => {
                    return h('img', 
                    {
                        attrs:{
                            src: this.imgFun(row)   
                        },
                        style:{
                            width: "80px",
                            height: "80px",
                            padding:"12px",
                            display:(this.imgFun(row) === "" ) ? "暂无" : "inline-block"
                        },    
                    }, 
                    )
                },
                
            },


            {
                title: "反馈时间",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.suggestion_time ? row.suggestion_time : `暂无${index}`)
                }
            },



            
        ],

        userData: [],   // 内容数据

        total: 0,   // 总页数

        formInline: {   // 定义表单对象
            cus_account: '',
            contact_phone: '',
        },

        loading: false,  // 定义loading为true

        currentPage: 1   // 定义当前页
    };
  },

  methods: {
    // 轮播图弹框
    moreClick(params) {
        this.moreModal = true;
        // this.visit = row.visit;
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
        let params = {
            pageSize: 10,
            startPos: filter ? pageIndex : this.currentPage
        };

        if (filter) {
            params = Object.assign(params, filter);
        };

        this.loading = true;
        let { data } = await FeedbackList(params);
        console.log(data)
        this.total = data.content.total;
        console.log(this.total)
        // data.shift(0);
        this.userData = data.content.list;
        this.loading = false;
        console.log(data);
    },

    // 处理带有盘符的img路径
     imgFun(val) {
      return this.imgUrlFormat(val.visit);
    },

    // 处理盘符
    imgUrlFormat(visit) {
      var showUrl = this.base + "/" + visit;
      console.log(getBase().base2);
      console.log(this.base);
      console.log(showUrl);
      
      return showUrl;
    },
    
    // 用来初始化一些变量值
    init() {
      this.base = getBase().base2;
    }

  },
  mounted() {
    this.getUser();
    this.init();
  }
};
</script>

