<style scope lang="less">
    @import './supportingFacilities.less';
</style>
<!-- 评价设置 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>
            <FormItem prop="cus_account" label="基地名称" :label-width="50">
                <Input type="text" clearable v-model="formInline.cus_account" placeholder="请输入账号"></Input>
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
    supportingFacilitiesList, //评价设置列表
    supportingFacilitiesAdd,//评价设置添加
    supportingFacilitiesEdit,//评价设置编辑
    supportingFacilitiesDel,//评价设置删除
} from '../../api/lp-systemManagement/api.js'

export default {
  name: "supportingFacilitiesModel",

  components: {
    TableM
  }, 
  data() {
    var DateValdate = (rule, value, callback) => {
            if (value[0] === '') {
                return callback(new Error('请填写完整'));
            } else {
                callback();
            }
        };

    return {

        formValidate: {     // 定义新增表单的对象
                module: '',
                banner_title: '',
                upLoad: '',
                sort: [],
            },
        ruleValidate: {     // 定义表单的校验规则
                banner_title: [
                    { required: true, message: '请输入预订人', trigger: 'blur' }
                ],

                module: [
                    { required: true, type: 'array', min: 1, message: '所属模块选择', trigger: 'change' },
                    { type: 'array', max: 1, message: '至多选择一个', trigger: 'change' }
                ],

                sort: [
                    { required: true, message: '请输入排序', trigger: 'blur' },
                    { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
            },

        addModal: false,
        
        editModal: false,

        visible: false,

        delDilaog: false,   // 控制删除弹出框
        
        delLoading: false,   // 控制删除按钮loading

        currentPageIndex: 1,    // 当前页

        columns: [    // 表头信息
            {
                title: "基地名称",
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

    // 执行新增的事件
    addClick() {
            this.addModal = true;
        },

    // 点击确定按钮
        ModalConfirm(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    setTimeout(() => {
                        this.$Message.success('Success!');
                        this.Modal = false;
                        this.loading = false;
                    }, 1000)
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },

        // 点击框取消按钮
        ModalCancel(name) {
            this.$Message.info("Clicked ok");
            this.$refs[name].resetFields();
        },

    // 执行table编辑的事件
    editClick(params) {
        this.editModal = true;
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
     
    //Banner管理列表 
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
        let { data } = await supportingFacilitiesList(params);
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

