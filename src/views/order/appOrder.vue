<style scope lang="less">
    @import './appOrder.less';
</style>

<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>
            <FormItem prop="cus_account" label="账号" :label-width="50">
                <Input type="text" v-model="formInline.cus_account" placeholder="姓名"></Input>
            </FormItem>

            <FormItem prop="cus_nick_name" label="昵称" :label-width="50">
                <Input type="text" v-model="formInline.cus_nick_name" placeholder="电话"></Input>
            </FormItem>

            <FormItem prop="cus_nick_name" label="昵称" :label-width="50">
                <Input type="text" v-model="formInline.cus_nick_name" placeholder="电话"></Input>
            </FormItem>

            <FormItem>
                <Button type="primary" @click.stop="searchClick(formInline)">查询</Button>
            </FormItem>

            <FormItem>
                <i-switch v-model="loading"></i-switch>
                &nbsp;&nbsp;切换loading
            </FormItem>
        </Form>

        <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
    
    <!-- 删除提示框 -->
    <Modal v-model="delDilaog" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>提示</span>
        </p>
        <div style="text-align:center">
            <p>您确定要删除吗？</p>
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
    userManagementList
} from '../../api/lp-order/api.js'

export default {
  name: "appOrderModel",

  components: {
    TableM
  },

  data() {
    return {
        delDilaog: false,   // 控制删除弹出框

        delLoading: false,   // 控制删除按钮loading

        currentPageIndex: 1,    // 当前页

        columns: [    // 表头信息
            {
                title: "账号",
                key: "cus_account",
            },

            {
                title: "昵称",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.cus_cus_nick_name ? row.cus_cus_nick_name : `暂无${index}`)
                }
            },

            {
                title: "来源",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.p_system ? row.p_system : `暂无${index}`)
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
                title: "机型",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.p_type ? row.p_type : `暂无${index}`)
                }
            },

            {
                title: "操作",
                key: "action",
                width: 350,
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
                                this.editClick(params);
                            }
                        }
                        },
                        "编辑"
                    ),
                    h(
                        "Button",
                        {
                        props: {
                            type: "error",
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
                    h(
                        "Button",
                        {
                        props: {
                            type: "info",
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

        userData: [],   // 内容数据

        total: 0,   // 总页数

        formInline: {   // 定义表单对象
            cus_account: '',
            cus_nick_name: ''
        },

        ruleInline: {   // 定义规则对象
            cus_account: [
                { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            cus_nick_name: [
                { required: true, message: '请输入昵称', trigger: 'blur' }
                // { type: 'string', min: 11, message: '电话最多为11位', trigger: 'blur' }
            ]
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

    resetTotal() {
        this.currentPage = 1;
        this.total = 1;
    },

    // 执行table编辑的事件
    editClick(params) {
        console.log(params);
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
    async getUser(filter) {
        let params = {
            pageSize: 10,
            startPos: filter ? 1 : this.currentPage
        };

        if (filter) {
            params = Object.assign(params, filter);
        };

        this.loading = true;
        let { data } = await userManagementList(params);
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

