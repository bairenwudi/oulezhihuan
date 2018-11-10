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
                :transfer="false"
                :mask-closable="false"
                @on-ok="ModalConfirm('addForm')"
                @on-cancel="ModalReset('addForm')"
            >
            <Form ref="addForm" :model="addForm" :rules="addRules" :label-width="80">
                <FormItem label="设施名称" prop="facilities_name">
                    <Input v-model="addForm.facilities_name" placeholder="请输入banner名称"></Input>
                </FormItem>

                <FormItem label="设施图片" prop="upLoad" :label-width="85">
                    <div class="demo-upload-list" v-for="item in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                        ref="upload"
                        name="upLoad"
                        :show-upload-list="false"
                        :default-file-list="defaultImgList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        :data="dataFormData"
                        type="drag"
                        :action="actionUrl"
                        style="display: inline-block;width:58px;"
                    >
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal :transfer="false" title="View Image" v-model="visible">
                        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
            </Form>

            <div slot="footer" align="center">
                <Button type="primary" @click="ModalConfirm('addForm')" :loading="loading">确定</Button>
                <Button @click="ModalReset('addForm')" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>

     <!--  编辑提示框 -->
        <!-- <Modal v-model="editModal"
                title="编辑"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalReset('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="设施名称" prop="facilities_name">
                    <Input v-model="formValidate.facilities_name" placeholder="请输入banner名称"></Input>
                </FormItem>

                <FormItem label="设施图片" prop="upLoad" :label-width="85"> -->
                    <!-- <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        type="drag"
                        :action="actionUrl"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload> -->

                    <!-- <Modal title="View Image" v-model="visible">
                        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                    </Modal> -->
                <!-- </FormItem>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">确定</Button>
                    <Button @click="ModalReset('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
        </Modal> -->

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
    getBase, // 获取域名
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

        addForm: {
            facilities_name: '',
            upLoad: '',
        },

        addRules: {     // 定义表单的校验规则
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

        defaultImgList: [],

        imgName: '',

        visible: false,

        uploadList: [],

        actionUrl: '',
        
        dataFormData: {},

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
    // 默认手动上传
    handleUpload() {
        const check = this.uploadList.length < 5;
        if (!check) {
            this.$Notice.warning({
                title: 'Up to five pictures can be uploaded.'
            });
        }
        return check;
    },

    handleView (name) {
        this.imgName = name;
        this.visible = true;
    },

    handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },

    handleSuccess (response, file, fileList) {
        file.url = 'http://img.zcool.cn/community/01fbe655dfe31932f875a1328a500b.jpg@900w_1l_2o_100sh.jpg';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },

    handleFormatError (file) {
        this.$Notice.warning({
            title: 'The file format is incorrect',
            desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
    },

    handleMaxSize (file) {
        this.$Notice.warning({
            title: 'Exceeding file size limit',
            desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
    },

    handleBeforeUpload (res) {
        const check = this.uploadList.length < 1;
        if (this.uploadList.length < 1) {
            this.$Notice.warning({
                title: '请您上传一张图片'
            });
        } else {
            this.dataFormData.facilities_name = this.addForm.facilities_name;
        }
        return check;
    },

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
                // this.loading = true;
                this.addFormData = Object.assign({}, this[name]);
                this.handleBeforeUpload();
            }
        })
    },

    // 点击框取消按钮
    ModalReset(name) {
        this.$refs[name].resetFields();
        this.$Message.info("Clicked ok");
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
     
    //配套设施管理列表 
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
        let { data } = await supportingFacilitiesList(params);
        this.total = data[0].count;
        data.shift(0);
        this.userData = data;
        this.loading = false;
    }
  },
  mounted() {
    this.getUser();
    this.base = getBase().base2;
    this.actionUrl = `${this.base}/Facilities_managementController/save`;
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>

