<style scope lang="less">
    @import './hotCityManagement.less';
</style>
<!-- 热门城市管理 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>

             <FormItem>
                <Button type="primary" @click="addClick">新增</Button>
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
                <FormItem label="省份" prop="p_name" :label-width="85">
                    <Select v-model="formValidate.p_name" placeholder="请选择">
                        <Option value="1">春晚</Option>
                        <Option value="2">8强</Option>
                    </Select>
                </FormItem>

                <FormItem label="城市" prop="c_name" :label-width="85">
                    <Select v-model="formValidate.c_name" placeholder="请选择">
                        <Option value="1">春晚</Option>
                        <Option value="2">8强</Option>
                    </Select>
                </FormItem>

                <FormItem label="排序" prop="hcm_sort">
                    <Input v-model="formValidate.hcm_sort" placeholder="请输入排序"></Input>
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
                <FormItem label="省份" prop="p_name" :label-width="85">
                    <Select v-model="formValidate.p_name" placeholder="请选择">
                        <Option value="1">春晚</Option>
                        <Option value="2">8强</Option>
                    </Select>
                </FormItem>

                <FormItem label="城市" prop="c_name" :label-width="85">
                    <Select v-model="formValidate.c_name" placeholder="请选择">
                        <Option value="1">春晚</Option>
                        <Option value="2">8强</Option>
                    </Select>
                </FormItem>

                <FormItem label="排序" prop="hcm_sort">
                    <Input v-model="formValidate.hcm_sort" placeholder="请输入排序"></Input>
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
    hotCityManagementList, //热门城市管理列表
    hotCityManagementAdd,//热门城市管理添加
    hotCityManagementEdit,//热门城市管理编辑
    hotCityManagementDel,//热门城市管理删除
} from '../../api/lp-systemManagement/api.js'

export default {
  name: "hotCityManagementModel",

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
                p_name: '',
                c_name: '',
                hcm_sort: '',
            },
        ruleValidate: {     // 定义表单的校验规则
                p_name: [
                    { required: true, message: '请输入选择省份', trigger: 'change' }
                ],

                c_name: [
                    { required: true, message: '请输入选择城市', trigger: 'change' }
                ],

                hcm_sort: [
                    { required: true, message: '请输入排序', trigger: 'blur' },
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
                title: "省份",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.p_name ? row.p_name : `暂无${index}`)
                }
            },

            {
                title: "城市",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.c_name ? row.c_name : `暂无${index}`)
                }
            }, 

            {
                title: "排序",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.hcm_sort ? row.hcm_sort : `暂无${index}`)     
                }
            },

            {
                title: "创建时间",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.create_date ? row.create_date : `暂无${index}`)
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
            p_name: '',
            c_name: '',
            hcm_sort: ''
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
     
    //热门城市管理列表 
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
        let { data } = await hotCityManagementList(params);
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

