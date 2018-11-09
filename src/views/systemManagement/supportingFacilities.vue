<style scope lang="less">
    @import './supportingFacilities.less';
</style>
 <!-- 配套设施管理 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>

             <FormItem>
                <Button type="primary" @click="addClick">新增</Button>
            </FormItem>

             <FormItem>
                <Button type="primary" @click="delClick">删除</Button>
            </FormItem>
        </Form>

        <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
        <!-- 新增提示框 -->
        <Modal v-model="addModal"
                title="新增"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="设施名称" prop="facilities_name">
                    <Input v-model="formValidate.facilities_name" placeholder="请输入banner名称"></Input>
                </FormItem>

                <FormItem label="设施图片" prop="upLoad" :label-width="85">
                    
                </FormItem>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">确定</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
        </Modal>

     <!--  编辑提示框 -->
        <Modal v-model="editModal"
                title="编辑"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="设施名称" prop="facilities_name">
                    <Input v-model="formValidate.facilities_name" placeholder="请输入banner名称"></Input>
                </FormItem>

                <FormItem label="设施图片" prop="upLoad" :label-width="85">
                    
                </FormItem>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">确定</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
        </Modal>

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
    supportingFacilitiesList, //配套设施管理列表
    supportingFacilitiesAdd,//配套设施管理添加
    supportingFacilitiesEdit,//配套设施管理编辑
    supportingFacilitiesDel,//配套设施管理删除
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
                facilities_name: '',
                upLoad: '',
            },
        ruleValidate: {     // 定义表单的校验规则
                facilities_name: [
                    { required: true, message: '请输入预订人', trigger: 'blur' }
                ],
            },

        addModal: false,
        
        editModal: false,

        visible: false,

        delDilaog: false,   // 控制删除弹出框
        
        delLoading: false,   // 控制删除按钮loading

        currentPageIndex: 1,    // 当前页

        columns: [    // 配套设施表头信息
            {
                        type: 'selection',
                        width: 60,
                        align: 'center'
            },

            {
                title: "设施名称",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.facilities_name ? row.facilities_name : `暂无${index}`)
                }
            },

            {
                title: "设施图片",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.upLoad ? row.upLoad : `暂无${index}`)
                }
            }, 

            {
                title: "上传时间",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.facilities_time ? row.facilities_time : `暂无${index}`)     
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
                                this.editClick(params);
                            }
                        }
                        },
                        "编辑"
                    ),
                    // h(
                    //     "Button",
                    //     {
                    //     props: {
                    //         type: "primary",
                    //         size: "small"
                    //     },
                    //     style: {
                    //         marginRight: "5px"
                    //     },
                    //     on: {
                    //         click: () => {
                    //             this.delClick(params);
                    //         }
                    //     }
                    //     },
                    //     "删除"
                    // ),
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
     
    //配套设施管理列表 
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

