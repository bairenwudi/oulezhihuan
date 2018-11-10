<style scope lang="less">
    @import './informationManagement.less';
</style>
<!-- 信息管理 -->
<template>
    <div class="formView">

        <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
    
    </div>
</template>

<script>

import TableM from "../../common/table/table.vue";
import {
    informationManagementList
} from '../../api/lp-informationManagement/api.js'

export default {
  name: "informationManagementModel",

  components: {
    TableM
  }, 
  data() {
    return {
        currentPageIndex: 1,    // 当前页

        columns: [    // 信息管理表头信息 ！！！无相关字段
            {
                title: "短信类型",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.third_code ? row.third_code : `暂无${index}`)
                }
            },

            {
                title: "短信内容",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.third_code ? row.third_code : `暂无${index}`)
                }
            },

        ],

        userData: [],   // 内容数据

        total: 0,   // 总页数

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
        // this.currentPage = pageIndex;
        for (let i in this.formInline) {
            if (this.formInline[i] !== undefined || this.formInline[i] !== '') {
                this.getUser(this.formInline ,pageIndex);  
                return false;
            }
        };
        this.getUser();
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
        let { data } = await informationManagementList(params);
        this.total = data[0].count;
        console.log(this.total)
        this.userData = data;
        this.loading = false;
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

