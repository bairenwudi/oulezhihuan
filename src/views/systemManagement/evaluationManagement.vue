<style scoped lang="less">
    @import './evaluationManagement.less';
</style>
<!-- 评价设置 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>
            <FormItem prop="org_name" label="机构标题" :label-width="60">
               <Select v-model="formInline.org_name" clearable style="width:200px">
                 <Option v-for="item in evaluationinstitutionTitle" :value="item.org_name" :key="item.adm_user_type">{{ item.org_name }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="cus_account" label="账号" :label-width="50">
                <Input type="text" clearable v-model="formInline.cus_account" placeholder="请输入账号"></Input>
            </FormItem>

            <FormItem prop="cus_nick_name" label="昵称" :label-width="50">
                <Input type="text" clearable v-model="formInline.cus_nick_name" placeholder="请输入昵称"></Input>
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

    <!-- 删除提示框 -->
    <Modal v-model="delDilaog" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>提示</span>
        </p>
        <div style="text-align:center">
            <p>确定要删除吗？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="delLoading" @click="delConfrmClick">删除</Button>
        </div>
    </Modal>
    
    </div>
</template>

<script>

import TableM from "../../common/table/table.vue";
import {
    evaluationManagementList,//评价管理列表
    evaluationManagementDel,//评价管理删除
    evaluationManagementTop,//评价管理-置顶
    evaluationManagementTitleList,//评价管理模糊查询-机构标题下拉列表渲染
} from '../../api/lp-systemManagement/api.js'

export default {
  name: "evaluationManagementModel",

  components: {
    TableM
  }, 
  data() {
    
    return {
       evaluationinstitutionTitle:[

       ],
        
        visible: false,

        delDilaog: false,   // 控制删除弹出框
        
        delLoading: false,   // 控制删除按钮loading

        currentPageIndex: 1,    // 当前页

        columns: [    // 表头信息
            {
                title: "机构标题",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.facilities_name ? row.facilities_name : `暂无${index}`)
                }
            },

            {
                title: "账号",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.banner_title ? row.banner_title : `暂无${index}`)
                }
            }, 

            {
                title: "昵称",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.upLoad ? row.upLoad : `暂无${index}`)     
                }
            },

            {
                title: "评价内容",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.banner_title ? row.banner_title : `暂无${index}`)
                }
            }, 

            {
                title: "评价星级",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.upLoad ? row.upLoad : `暂无${index}`)     
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
                            marginRight: "5px"
                        },
                        on: {
                            click: () => {
                                this.topClick(params);
                            }
                        }
                        },
                        "置顶"
                    ),
                    h(
                        "Button",
                        {
                        props: {
                            type: "primary",
                            size: "small"
                        },
                        style: {
                            marginRight: "5px"
                        },
                        on: {
                            click: () => {
                                this.delClick(params);
                            }
                        }
                        },
                        "删除"
                    ),
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

    resetTotal() {
        this.currentPage = 1;
        this.total = 1;
    },

    // 执行删除的事件
    delClick(params) {
        console.log(params);
        this.delDilaog = true;
    },

    // 删除确定按钮
    delConfrmClick() {
        this.delLoading = true;
        setTimeout(() => {
            this.delDilaog = false;
            this.$Message.success('成功');
            console.log('我滚了');
        }, 1000)
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

    // 渲染机构标题下拉列表
    async evaluationinstitutionTitleListFun() {
        const { data } = await evaluationManagementTitleList();
        data.shift(0);
        this.evaluationinstitutionTitle = data;
        console.log(this.evaluationinstitutionTitle)
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
     
    //评价管理列表 
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
        let { data } = await evaluationManagementList(params);
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
    this.evaluationinstitutionTitleListFun();
  }
};
</script>

