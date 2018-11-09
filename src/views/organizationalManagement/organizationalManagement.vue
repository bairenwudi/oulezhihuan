<style scope lang="less">
    @import './organizationalManagement.less';
</style>
 <!-- 机构管理 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>

            <FormItem prop="org_name" label="机构标题" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in institutionTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="province_name" label="省份" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in provinceTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="city_name" label="城市" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in cityTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="org_status" label="状态" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in statusTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="adm_user_type" label="标签" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in typeTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
    
    <!-- 删除提示框 -->
    <!-- <Modal v-model="delDilaog" width="360">
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
    </Modal> -->
    
    </div>
</template>

<script>

import TableM from "../../common/table/table.vue";
import {
    organizationalManagementList
} from '../../api/lp-organizational/api.js'

export default {
  name: "organizationalManagementModel",

  components: {
    TableM
  }, 
  data() {
    return {
       
            institutionTitle:[
                        {
                            value: '海南',
                            label: '海南'
                        },
                    ],
    
            provinceTitle:[
                        {
                            value: '北京',
                            label: '北京'
                        },
                    ],
            cityTitle:[
                        {
                            value: '北京',
                            label: '北京'
                        },
                    ],
            
            statusTitle: [
                    {
                        value: '申请退房',
                        label: '申请退房'
                    },
                    {
                        value: '退房中',
                        label: '退房中'
                    },
                    {
                        value: '退房完成',
                        label: '退房完成'
                    },                  
                ],
            typeTitle: [
                    {
                        value: '1',
                        label: '基地'
                    },
                    {
                        value: '2',
                        label: '个人'
                    },
                    {
                        value: '3',
                        label: '旅行社'
                    },
                                    
                ],
                model8:'',
        delDilaog: false,   // 控制删除弹出框
        
        delLoading: false,   // 控制删除按钮loading

        currentPageIndex: 1,    // 当前页

        columns: [    // 机构管理表头信息
            {
                        type: 'selection',
                        width: 60,
                        align: 'center'
            },

            {
                title: "机构标题",
                key: "org_name",
            },

            {
                title: "省份",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.province_name ? row.province_name : `暂无${index}`)
                }
            },

            {
                title: "城市",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.city_name ? row.city_name : `暂无${index}`)
                }
            },

            {
                title: "手机号码",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.adm_phonenum ? row.adm_phonenum : `暂无${index}`)     
                }
            },

            {
                title: "上线时间",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.org_login_time ? row.org_login_time : `暂无${index}`)
                }
            },

            {
                title: "状态",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.org_status ? row.org_status : `暂无${index}`)
                }
            },

            {
                title: "标签",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.adm_user_type ? row.adm_user_type : `暂无${index}`)
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
                                // this.editClick(params);
                                this.goToInfo(params);
                            }
                        }
                        },
                        "编辑"
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
                                this.onlineClick(params);
                            }
                        }
                        },
                        "上线"
                    ),
                    // h(
                    //     "Button",
                    //     {
                    //     props: {
                    //         type: "primary",
                    //         size: "small"
                    //     },
                    //     on: {
                    //         click: () => {
                    //             this.goToInfo(params);
                    //         }
                    //     }
                    //     },
                    //     "详情"
                    // )
                    ]);
                }
            }
        ],

        userData: [],   // 内容数据

        total: 0,   // 总页数

        formInline: {   // 定义表单对象
            cus_account: '',
            cus_nick_name: '',
            org_status:'',
            adm_user_type:'',
            adm_city_code:'',
            adm_province_code:'',
            org_name:''
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
    // 进入编辑详情
    goToEditInfo(params) {
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
        let { data } = await organizationalManagementList(params);
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

