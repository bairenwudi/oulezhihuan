<style scope lang="less">
    @import './userManagement.less';
</style>
<!-- 用户管理 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>
            <FormItem prop="cus_account" label="账号" :label-width="50">
                <Input type="text" clearable v-model="formInline.cus_account" placeholder="请输入账号"></Input>
            </FormItem>

            <FormItem prop="cus_nick_name" label="昵称" :label-width="50">
                <Input type="text" clearable v-model="formInline.cus_nick_name" placeholder="请输入昵称"></Input>
            </FormItem>

            <FormItem prop="cus_phone_system" label="来源" :label-width="60">
               <Select v-model="formInline.cus_phone_system" clearable style="width:200px">
                 <Option 
                 v-for="item in systemStatus" 
                 :value="item.value" 
                 :key="item.value">
                 {{ item.label }}
                 </Option>
               </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click.stop="searchClick(formInline)">查询</Button>
            </FormItem>

            <!-- <FormItem>
                <i-switch v-model="loading"></i-switch>
                &nbsp;&nbsp;切换loading
            </FormItem> -->

        </Form>

        <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
    
    </div>
</template>

<script>

import TableM from "../../common/table/table.vue";
import {
    userManagementList, //用户管理列表
    userManagementSearch, //用户管理模糊查询
    
} from '../../api/lp-systemManagement/api.js'

export default {
  name: "userManagementModel",

  components: {
    TableM
  }, 
  data() {
    return {
        systemStatus:[
                    {
                        value: 'ios',
                        label: 'ios'
                    },
                    {
                        value: 'android',
                        label: 'android'
                    },                  
                ],
                model8:'',

        currentPageIndex: 1,    // 当前页

        columns: [    // 用户管理表头信息
            {
                title: "账号",
               render: (h, {row, index}) => {
                    return h('span', {
                    }, row.cus_account ? row.cus_account : `暂无${index}`)
                }
            },

            {
                title: "昵称",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.cus_nick_name ? row.cus_nick_name : `暂无${index}`)
                }
            },

            {
                title: "来源",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.p_system ? row.p_system : `暂无${index}`)     
                }
            },

            {
                title: "机型",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.p_type ? row.p_type : `暂无${index}`)
                }
            },

            {
                title: "版本",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.p_version ? row.p_version : `暂无${index}`)
                }
            },

            {
                title: "创建时间",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.cus_create_date ? row.cus_create_date : `暂无${index}`)
                }
            },

            {
                title: "上次登录",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.cus_last_login_date_live ? row.cus_last_login_date_live : `暂无${index}`)
                }
            },

        ],

        userData: [],   // 内容数据

        total: 0,   // 总页数

        formInline: {   // 定义表单对象
            cus_account: '', 
            cus_nick_name: '',
            p_system: ''
        },

        loading: false,  // 定义loading为true

        currentPage: 1   // 定义当前页
    };
  },

  methods: {

    resetTotal() {
        this.currentPage = 1;
        this.total = 1;
    },

    // 改变分页触发的事件
    pageChange(pageIndex) {
        // 改变当前页
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
        let { data } = await userManagementList(params);
        console.log(data)
        this.total = data[0].count;
        console.log(this.total)
        data.shift(0);
        this.userData = data;
        this.loading = false;
        console.log(data);
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

